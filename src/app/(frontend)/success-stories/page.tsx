import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SuccessStories } from '@/components/aashayien/SuccessStories'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { SuccessStoriesPage as SuccessStoriesPageType } from '@/payload-types'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateMetadata(): Promise<Metadata> {
  const successStoriesPageData = (await getCachedGlobal(
    'success-stories-page',
    1,
  )()) as SuccessStoriesPageType
  return generateMeta({ doc: successStoriesPageData as any, slug: 'success-stories' })
}

export default async function SuccessStoriesPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: stories } = await payload.find({
    collection: 'success-stories',
    limit: 1000,
    sort: 'rank',
  })

  const successStoriesPageData: any = await payload.findGlobal({
    slug: 'success-stories-page',
  })

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/success-stories`}
        doc={successStoriesPageData}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'WebPage',
            mode: 'guided',
          },
        ]}
      />
      <SuccessStories stories={stories} pageData={successStoriesPageData} />
    </main>
  )
}
