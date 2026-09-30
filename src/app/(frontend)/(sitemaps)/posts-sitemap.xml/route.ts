import { responseSitemap } from '@/utilities/responseSitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { isNoindexDoc } from '@/utilities/seoRobots'

const getPostsSitemap = async () => {
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  try {
    const results = await payload.find({
      collection: 'posts',
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

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((post) => !isNoindexDoc(post))
          .filter((post) => Boolean(post?.slug))
          .map((post) => ({
            loc: `${SITE_URL}/posts/${post?.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  } catch (error) {
    console.error('Error generating posts sitemap:', error)
    return []
  }
}

export async function GET() {
  const sitemap = await getPostsSitemap()

  return responseSitemap(sitemap)
}
