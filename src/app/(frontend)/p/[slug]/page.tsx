import React, { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { DynamicPageHero } from '@/heros/DynamicPageHero'
import { notFound } from 'next/navigation'
import type { DynamicPage } from '@/payload-types'

export const dynamic = 'force-dynamic'

export type Args = {
  params: Promise<{
    slug: string
  }>
}

const queryDynamicPageBySlug = cache(async (slug: string): Promise<DynamicPage | null> => {
  const payload = await getPayload({ config })
  const dynamicPagesData = await payload.find({
    collection: 'dynamic-pages',
    draft: true,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  return dynamicPagesData.docs[0] || null
})

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const pageData = await queryDynamicPageBySlug(decodedSlug)

  if (!pageData) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: pageData.title,
    description: pageData.pageSubtitle || undefined,
  }
}

export default async function DynamicDemoPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const pageData = await queryDynamicPageBySlug(decodedSlug)

  if (!pageData) {
    return notFound()
  }

  const {
    title,
    showPageTitle,
    pageSubtitle,
    pageDescription,
    pageImage,
    pageBgImage,
    enablePageButton,
    pageButtonText,
    pageButtonLink,
    layout,
  } = pageData as DynamicPage & {
    showPageTitle?: boolean | null
    enablePageButton?: boolean | null
    pageButtonText?: string | null
    pageButtonLink?: string | null
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dynamic-page-container">
      <DynamicPageHero
        title={title}
        showPageTitle={showPageTitle}
        pageSubtitle={pageSubtitle}
        pageDescription={pageDescription}
        pageImage={pageImage}
        pageBgImage={pageBgImage}
        enablePageButton={enablePageButton}
        pageButtonText={pageButtonText}
        pageButtonLink={pageButtonLink}
      />

      {/* Render the dynamic blocks */}
      <RenderBlocks blocks={layout} />
    </div>
  )
}


