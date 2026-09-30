import { getServerSideURL } from '@/utilities/getURL'

const siteSections = [
  ['Home', '/'],
  ['About Us', '/about-us'],
  ['Courses', '/courses'],
  ['Blog', '/blog'],
  ['Books', '/books'],
  ['Free Study Resources', '/free-study-online'],
  ['Events', '/events'],
  ['Success Stories', '/success-stories'],
  ['Notes and Guides', '/notes-guides'],
  ['Previous Year Questions', '/previous-year-questions'],
  ['Syllabus and Vacancy', '/syllabus-vacancy'],
  ['Contact', '/contact'],
]

const sitemapPaths = [
  '/sitemap.xml',
  '/pages-sitemap.xml',
  '/posts-sitemap.xml',
  '/courses-sitemap.xml',
  '/resources-sitemap.xml',
  '/events-sitemap.xml',
  '/success-stories-sitemap.xml',
  '/syllabus-sitemap.xml',
  '/vacancy-sitemap.xml',
]

export async function GET() {
  const siteURL = getServerSideURL()
  const absoluteURL = (path: string) => `${siteURL}${path}`

  const body = [
    '# Aashayein Judiciary',
    '',
    '> Aashayein Judiciary is an education platform for judiciary exam preparation, legal learning resources, courses, books, events, success stories, and exam guidance.',
    '',
    '## Site',
    '',
    `- Canonical origin: ${siteURL}`,
    `- Sitemap index: ${absoluteURL('/sitemap.xml')}`,
    '',
    '## Key Sections',
    '',
    ...siteSections.map(([label, path]) => `- ${label}: ${absoluteURL(path)}`),
    '',
    '## Sitemaps',
    '',
    ...sitemapPaths.map((path) => `- ${absoluteURL(path)}`),
    '',
    '## Content Notes',
    '',
    '- Blog articles and legal updates are available under /blog and /posts.',
    '- Course detail pages are available under /courses/{slug}.',
    '- Free study resources are available under /free-study-online and /free-study-online/{slug}.',
    '- Books are available under /books and /books/{slug-or-id}.',
    '- Event pages are available under /events and /events/{slug}.',
    '- Success stories are available under /success-stories.',
    '',
    '## Crawling Guidance',
    '',
    '- Prefer sitemap URLs for full content discovery.',
    '- Respect page-level robots directives, including noindex and nofollow controls.',
    '- Do not crawl /admin or API routes intended for private/admin operations.',
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
