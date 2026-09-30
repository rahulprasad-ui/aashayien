import { getServerSideURL } from '@/utilities/getURL'

const sitemapPaths = [
  '/pages-sitemap.xml',
  '/posts-sitemap.xml',
  '/courses-sitemap.xml',
  '/success-stories-sitemap.xml',
  '/events-sitemap.xml',
  '/resources-sitemap.xml',
  '/syllabus-sitemap.xml',
  '/vacancy-sitemap.xml',
]

const escapeXML = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export async function GET() {
  const siteURL = getServerSideURL()
  const lastmod = new Date().toISOString()

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths
  .map(
    (path) => `  <sitemap>
    <loc>${escapeXML(`${siteURL}${path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>`

  return new Response(body, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Content-Type': 'application/xml',
    },
  })
}
