import { responseSitemap } from '@/utilities/responseSitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { isNoindexDoc } from '@/utilities/seoRobots'

const getPagesSitemap = async () => {
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  const dateFallback = new Date().toISOString()
  const listingPageSize = 12
  const getTotalPages = (totalDocs: number) => Math.ceil(totalDocs / listingPageSize)
  const getPagedEntries = (path: string, totalPages: number) => {
    const entries = []

    for (let page = 2; page <= totalPages; page++) {
      entries.push({
        loc: `${SITE_URL}${path}${path.includes('?') ? '&' : '?'}page=${page}`,
        lastmod: dateFallback,
      })
    }

    return entries
  }

  const defaultSitemap = [
    {
      loc: `${SITE_URL}/search`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/blog`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/posts`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/about-us`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/courses`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/events`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/free-study-online`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/notes-guides`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/previous-year-questions`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/success-stories`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/syllabus-vacancy`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/books`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/privacy-policy`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/terms-conditions`,
      lastmod: dateFallback,
    },
    {
      loc: `${SITE_URL}/refund-policy`,
      lastmod: dateFallback,
    },
  ]

  try {
    const [postsCount, coursesCount, booksCount, categories] = await Promise.all([
      payload.count({
        collection: 'posts',
        overrideAccess: true,
        where: {
          _status: {
            equals: 'published',
          },
        },
      }),
      payload.count({
        collection: 'courses',
        overrideAccess: true,
      }),
      payload.count({
        collection: 'books',
        overrideAccess: true,
      }),
      payload.find({
        collection: 'categories',
        depth: 0,
        limit: 100,
        overrideAccess: true,
        pagination: false,
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
    ])

    const blogCategorySitemap = categories.docs
      .filter((category) => Boolean(category.slug))
      .map((category) => ({
        loc: `${SITE_URL}/blog?category=${category.slug}`,
        lastmod: category.updatedAt || dateFallback,
      }))

    const courseFilters = [
      'foundation',
      'state-judiciary',
      'apo-adpo',
      'test-series',
      'live',
      'recorded',
      'other',
    ]
    const courseFilterSitemap = courseFilters.map((filter) => ({
      loc: `${SITE_URL}/courses?filter=${filter}`,
      lastmod: dateFallback,
    }))

    const bookFilters = [
      'free',
      'criminal-law',
      'civil-law',
      'constitution',
      'mains',
      'current-affairs',
      'state-specific',
    ]
    const bookFilterSitemap = bookFilters.map((filter) => ({
      loc: `${SITE_URL}/books?filter=${filter}`,
      lastmod: dateFallback,
    }))

    const paginatedListingSitemap = [
      ...Array.from({ length: Math.max(0, getTotalPages(postsCount.totalDocs) - 1) }, (_, index) => ({
        loc: `${SITE_URL}/posts/page/${index + 2}`,
        lastmod: dateFallback,
      })),
      ...getPagedEntries('/blog', getTotalPages(postsCount.totalDocs)),
      ...getPagedEntries('/courses', getTotalPages(coursesCount.totalDocs)),
      ...getPagedEntries('/books', getTotalPages(booksCount.totalDocs)),
    ]

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: true,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    const sitemap = results.docs
      ? results.docs
          .filter((page) => !isNoindexDoc(page))
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [
      ...defaultSitemap,
      ...blogCategorySitemap,
      ...courseFilterSitemap,
      ...bookFilterSitemap,
      ...paginatedListingSitemap,
      ...sitemap,
    ]
  } catch (error) {
    console.error('Error generating pages sitemap:', error)
    return defaultSitemap
  }
}

export async function GET() {
  const sitemap = await getPagesSitemap()

  return responseSitemap(sitemap)
}
