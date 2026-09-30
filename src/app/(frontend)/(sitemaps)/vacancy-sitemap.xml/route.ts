import { responseSitemap } from '@/utilities/responseSitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { isNoindexDoc } from '@/utilities/seoRobots'

const getVacancySitemap = async () => {
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  try {
    const results = await payload.find({
      collection: 'vacancies',
      depth: 0,
      limit: 1000,
      pagination: false,
      overrideAccess: true,
      // No drafts supported in Vacancies
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((doc) => !isNoindexDoc(doc))
          .map((doc) => ({
            loc: `${SITE_URL}/vacancy/${doc?.id}`,
            lastmod: doc.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  } catch (error) {
    console.error('Error generating vacancy sitemap:', error)
    return []
  }
}

export async function GET() {
  const sitemap = await getVacancySitemap()
  return responseSitemap(sitemap)
}
