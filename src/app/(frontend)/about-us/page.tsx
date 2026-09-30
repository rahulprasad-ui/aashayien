import { AboutUsComponent } from '@/components/aashayien/AboutUs'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

import { AboutUs as AboutUsType } from '@/payload-types'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const aboutUsData: AboutUsType = await getCachedGlobal('about-us', 1)()
  return generateMeta({ doc: aboutUsData as any, slug: 'about-us' })
}
import React, { Suspense } from 'react'

export default async function AboutUsPage() {
  const aboutUsData: any = await getCachedGlobal('about-us', 1)()

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/about-us`}
        doc={aboutUsData}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'AboutPage',
            mode: 'guided',
          },
        ]}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <AboutUsComponent data={aboutUsData} />
      </Suspense>
    </main>
  )
}
