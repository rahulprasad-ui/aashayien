export interface ISitemapField {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export const responseSitemap = (fields: ISitemapField[]) => {
  const schema = 'http://www.sitemaps.org/schemas/sitemap/0.9'

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${schema}">
  ${fields
    .map(
      (field) => `
  <url>
    <loc>${field.loc}</loc>
    <lastmod>${field.lastmod}</lastmod>
    <changefreq>${field.changefreq || 'daily'}</changefreq>
    <priority>${field.priority || 0.7}</priority>
  </url>`,
    )
    .join('')}
</urlset>`

  return new Response(content, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
