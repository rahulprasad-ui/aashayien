import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'
import type { Branding } from '../payload-types'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | any | null
  slug?: string
}): Promise<Metadata> => {
  const { doc, slug: slugOverride } = args
  const branding: Branding = (await getCachedGlobal('branding', 1)()) as Branding

  const ogImage = getImageURL(doc?.meta?.image || branding?.brandAssets?.ogImage)

  const siteTitle = branding?.siteMeta?.title || 'Aashayein Judiciary'
  let title = doc?.meta?.title || siteTitle

  if (doc?.meta?.title && !doc.meta.title.includes(siteTitle)) {
    title = `${doc.meta.title} | ${siteTitle}`
  }

  const slug = slugOverride || doc?.slug
  const indexDirective = (doc?.meta as any)?.indexDirective
  const followDirective = (doc?.meta as any)?.followDirective

  return {
    description: doc?.meta?.description || branding?.siteMeta?.description,
    keywords: (doc?.meta as any)?.keywords,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || branding?.siteMeta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(slug) ? slug.join('/') : slug || '/',
      siteName: siteTitle,
    }),
    title: {
      absolute: title,
    },
    robots: {
      follow: followDirective !== 'nofollow',
      index: indexDirective !== 'noindex',
    },
    alternates: {
      canonical:
        (doc?.meta as any)?.canonicalURL ||
        (slug
          ? `${getServerSideURL()}/${Array.isArray(slug) ? slug.join('/') : slug}`
          : getServerSideURL()),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: doc?.meta?.description || branding?.siteMeta?.description,
      images: ogImage ? [ogImage] : [],
      creator: '@AashayeinJudic1', // Replace with actual handle if known, or make configurable
      site: '@AashayeinJudic1',
    },
  }
}
