import { responseSitemap } from '@/utilities/responseSitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { isNoindexDoc } from '@/utilities/seoRobots'

const getSuccessStoriesSitemap = async () => {
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  try {
    const results = await payload.find({
      collection: 'success-stories',
      depth: 0,
      limit: 1000,
      pagination: false,
      overrideAccess: true,
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      .filter((doc) => !isNoindexDoc(doc))
      .map((doc) => ({
        loc: `${SITE_URL}/success-stories/${doc.id}`, // Success Stories use ID
        lastmod: doc.updatedAt || dateFallback,
      }))

    return sitemap
  } catch (error) {
    console.error('Error generating success stories sitemap:', error)
    return []
  }
}

export async function GET() {
  const sitemap = await getSuccessStoriesSitemap()

  return responseSitemap(sitemap)
}
