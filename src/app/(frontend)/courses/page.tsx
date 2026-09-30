import { Courses, type CourseTopRanker } from '@/components/aashayien/Courses'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Suspense } from 'react'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'
import { Pagination } from '@/components/Pagination'

const COURSES_PER_PAGE = 12
const validCourseFilters = [
  'foundation',
  'state-judiciary',
  'apo-adpo',
  'test-series',
  'live',
  'recorded',
  'other',
] as const

type CoursesSearchParams = {
  filter?: string
  page?: string
}

const coursePageBaseSelect = {
  heroTitle: true,
  heroSubtitle: true,
  heroStats: true,
  offerStrip: true,
  helpWidget: true,
  counsellingWidget: true,
  communityTitle: true,
  communityDescription: true,
  communityImage: true,
  communityImageDisplay: true,
  telegramLink: true,
  appLink: true,
  faqTitle: true,
  selectedFaqs: true,
  meta: true,
} as const

const fallbackCoursePageData = {
  heroTitle: 'Transform Your Judiciary Dreams Into Reality',
  heroSubtitle:
    "India's most comprehensive judiciary exam preparation with expert faculty, proven teaching methodology, and a track record of top rankers",
  heroStats: [],
  offerStrip: {
    isActive: false,
  },
  helpWidget: {
    title: 'Need Help Choosing?',
    description: 'Get FREE counseling from our experts',
    whatsappLink:
      'https://wa.me/919111198177?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20courses',
    callNumber: '+919111198177',
    availabilityText: 'Available Mon-Sat, 9 AM - 8 PM',
  },
  counsellingWidget: {
    buttonText: 'Get Free Counselling',
  },
  communityTitle: 'Join Our Free Community',
  communityDescription:
    'Get daily current affairs, judgment summaries, and free study materials. Connect with Nitesh Sir and thousands of aspiring judicial officers!',
  telegramLink: 'https://t.me/aashayeinjudiciary',
  appLink: '/courses',
  faqTitle: 'Frequently Asked Questions',
  selectedFaqs: [],
}

const getCoursesPageHref = (page: number, filter?: string) => {
  const params = new URLSearchParams()
  if (filter) params.set('filter', filter)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/courses?${query}` : '/courses'
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<CoursesSearchParams>
}): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const { filter, page } = await searchParams

  let coursePageData: Record<string, unknown> | null = null

  try {
    coursePageData = (await payload.findGlobal({
      slug: 'course',
      depth: 1,
      select: {
        meta: true,
      },
    })) as unknown as Record<string, unknown>
  } catch {
    coursePageData = null
  }

  const meta = await generateMeta({ doc: coursePageData as any, slug: 'courses' })
  const currentPage = Number(page) > 1 ? Number(page) : 1

  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      canonical: `${getServerSideURL()}${getCoursesPageHref(currentPage, filter)}`,
    },
  }
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<CoursesSearchParams>
}) {
  const payload = await getPayload({ config: configPromise })
  const { filter, page } = await searchParams
  const currentPage = Number(page) > 1 ? Number(page) : 1
  const selectedFilter = validCourseFilters.includes(filter as any) ? filter : undefined

  const coursesResult = await payload.find({
    collection: 'courses',
    limit: COURSES_PER_PAGE,
    page: currentPage,
    sort: '-createdAt',
    overrideAccess: false,
    where: selectedFilter
      ? {
          category: {
            equals: selectedFilter,
          },
        }
      : undefined,
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      duration: true,
      price: true,
      originalPrice: true,
      discount: true,
      features: true,
      thumbnail: true,
      targetStates: true,
      instructor: true,
      updatedAt: true,
      createdAt: true,
    },
  })

  let coursePageData: any = fallbackCoursePageData

  try {
    coursePageData = await payload.findGlobal({
      slug: 'course',
      depth: 2,
      select: coursePageBaseSelect,
    })
  } catch (error) {
    payload.logger.warn(
      `Course Page global is unavailable. Rendering fallback course page content. ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }

  let topRankers: CourseTopRanker[] = []

  try {
    const courseTopRankersData: any = await payload.findGlobal({
      slug: 'course',
      depth: 2,
      select: {
        topRankers: true,
      },
    })

    topRankers = Array.isArray(courseTopRankersData?.topRankers)
      ? courseTopRankersData.topRankers
          .filter((story: unknown): story is any => Boolean(story) && typeof story === 'object')
          .map((story: any) => ({
            id: story.id,
            name: story.name,
            rank: story.rank,
            rankDisplay: story.rankDisplay,
            exam: story.exam,
            year: story.year,
            image: story.image && typeof story.image === 'object' ? story.image : null,
          }))
      : []
  } catch (error) {
    payload.logger.warn(
      `Course Top Rankers are unavailable. Skipping sidebar rankers. ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }

  const coursePageViewData = {
    ...fallbackCoursePageData,
    ...coursePageData,
    topRankers,
  }

  return (
    <main>
      <Suspense fallback={null}>
        <DocumentStructuredDataRenderer
          currentUrl={`${getServerSideURL()}/courses`}
          doc={coursePageViewData}
          fallbackItems={[
            {
              enabled: true,
              schemaType: 'WebPage',
              mode: 'guided',
            },
          ]}
        />
      </Suspense>
      <Suspense fallback={<div>Loading courses...</div>}>
        <Courses
          courses={coursesResult.docs}
          pageData={coursePageViewData}
          initialCategory={selectedFilter}
        />
      </Suspense>
      {coursesResult.totalPages > 1 && coursesResult.page && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Pagination
            page={coursesResult.page}
            totalPages={coursesResult.totalPages}
            getPageHref={(pageNumber) => getCoursesPageHref(pageNumber, selectedFilter)}
          />
        </div>
      )}
    </main>
  )
}
