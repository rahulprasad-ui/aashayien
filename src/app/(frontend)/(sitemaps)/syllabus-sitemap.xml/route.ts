import { responseSitemap } from '@/utilities/responseSitemap'
import { getPayload } from 'payload'
import config from '@payload-config'

const getSyllabusSitemap = async () => {
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  try {
    const results = await payload.find({
      collection: 'syllabus-states',
      depth: 0,
      limit: 1000,
      pagination: false,
      overrideAccess: true,
      // No drafts supported in SyllabusStates
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((doc) => Boolean(doc?.code))
          .map((doc) => ({
            loc: `${SITE_URL}/syllabus/${doc?.code}`,
            lastmod: doc.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  } catch (error) {
    console.error('Error generating syllabus sitemap:', error)
    return []
  }
}

export async function GET() {
  const sitemap = await getSyllabusSitemap()
  return responseSitemap(sitemap)
}
