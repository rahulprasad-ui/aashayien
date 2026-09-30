import { CourseDetail } from '@/components/aashayien/CourseDetail'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import type { Branding } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

// Next.js 15: params is a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    select: {
      title: true,
      subtitle: true,
      meta: true,
    },
  })

  const course = courses[0]

  return generateMeta({ doc: course, slug: 'courses/' + slug })
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  let course = courses[0]

  if (!course) {
    const { docs: coursesById } = await payload.find({
      collection: 'courses',
      where: {
        id: {
          equals: slug,
        },
      },
      limit: 1,
    })
    if (coursesById.length > 0) {
      course = coursesById[0]
    } else {
      return notFound()
    }
  }

  const brandingData: Branding = (await getCachedGlobal('branding', 1)()) as Branding

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/courses/${course.slug}`}
        doc={course}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'Course',
            mode: 'guided',
          },
          {
            enabled: true,
            schemaType: 'FAQPage',
            mode: 'guided',
          },
        ]}
      />
      <CourseDetail course={course} branding={brandingData} />
    </main>
  )
}
