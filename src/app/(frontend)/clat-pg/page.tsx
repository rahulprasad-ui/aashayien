import React from 'react'
import type { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ClatPgBlock } from '@/blocks/ClatPgBlock/Component'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  let globalData: any = null
  try {
    globalData = await getCachedGlobal('clat-pg-global' as any, 2)()
  } catch (err) {
    globalData = {}
  }

  const title =
    globalData?.metaTitle ||
    'Best CLAT PG Online Coaching: 2027/28 Courses | Aashayein Judiciary'

  const description =
    globalData?.metaDescription ||
    'Join Aashayein Judiciary for top CLAT PG (LL.M.) online coaching. Get expert NLU mentors, live interactive classes, subject-wise test series, and 1:1 guidance.'

  const keywordsString = globalData?.metaKeywords || ''
  const keywords = keywordsString
    ? keywordsString.split(',').map((k: string) => k.trim())
    : [
        'CLAT PG Online Coaching',
        'Best CLAT PG Coaching 2027',
        'CLAT LLM Online Classes',
        'CLAT PG Mock Test Series',
        'Aashayein Judiciary CLAT PG',
        'AILET PG Coaching',
      ]

  const ogImageUrl =
    typeof globalData?.ogImage === 'object' && globalData?.ogImage?.url
      ? globalData.ogImage.url
      : undefined

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://aashayeinjudiciary.com/clat-pg',
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
  }
}

export default async function ClatPgLandingPage() {
  let globalData: any = null
  try {
    globalData = await getCachedGlobal('clat-pg-global' as any, 2)()
  } catch (err) {
    globalData = {}
  }

  // Course & Organization JSON-LD Schema for Google Rich Results
  const courseSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        name: 'Aashayein Judiciary',
        url: 'https://aashayeinjudiciary.com',
        description: 'Premier online coaching institute for Judiciary & CLAT PG LL.M entrance examinations.',
      },
      {
        '@type': 'Course',
        name: 'CLAT PG Online Master Foundation Batch 2027/2028',
        description:
          'Comprehensive 1-Year Live Classroom & Online Coaching for CLAT LL.M & AILET PG. Includes passage-based analysis, mock test series, and 1:1 mentorship.',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Aashayein Judiciary',
        },
      },
    ],
  }

  return (
    <article className="min-h-screen bg-white dark:bg-neutral-900 text-slate-900 dark:text-white">
      {/* Inject Google JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <ClatPgBlock {...(globalData || {})} />
    </article>
  )
}
