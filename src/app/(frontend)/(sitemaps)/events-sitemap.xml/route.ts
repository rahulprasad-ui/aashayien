import { responseSitemap } from '@/utilities/responseSitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { isNoindexDoc } from '@/utilities/seoRobots'

const getEventsSitemap = async () => {
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  try {
    const results = await payload.find({
      collection: 'events',
      depth: 0,
      limit: 1000,
      pagination: false,
      overrideAccess: true,
      // No drafts supported in Events
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((doc) => !isNoindexDoc(doc))
          .filter((doc) => Boolean(doc?.slug))
          .map((doc) => ({
            loc: `${SITE_URL}/events/${doc?.slug}`,
            lastmod: doc.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  } catch (error) {
    console.error('Error generating events sitemap:', error)
    return []
  }
}

export async function GET() {
  const sitemap = await getEventsSitemap()
  return responseSitemap(sitemap)
}
