import React, { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { DynamicPageHero } from '@/heros/DynamicPageHero'
import type { DynamicPage } from '@/payload-types'

export const dynamic = 'force-dynamic'

const queryFirstDynamicPage = cache(async (): Promise<DynamicPage | null> => {
  const payload = await getPayload({ config })
  const dynamicPagesData = await payload.find({
    collection: 'dynamic-pages',
    draft: true,
    limit: 1,
  })

  return dynamicPagesData.docs[0] || null
})

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await queryFirstDynamicPage()

  if (!pageData) {
    return {
      title: 'Dynamic Pages',
    }
  }

  return {
    title: pageData.title,
    description: pageData.pageSubtitle || undefined,
  }
}

export default async function DemoPage() {
  const pageData = await queryFirstDynamicPage()

  if (!pageData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">No Dynamic Pages Found</h1>
        <p className="text-slate-600">Please go to Payload Admin &rarr; Dynamic Pages and create a page.</p>
      </div>
    )
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


