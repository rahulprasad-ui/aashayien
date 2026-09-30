import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PreviousYearQuestionsComponent } from '@/components/aashayien/PreviousYearQuestionsComponent'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateMetadata(): Promise<Metadata> {
  const pageData: any = await getCachedGlobal('previous-year-questions-page', 1)()
  return generateMeta({ doc: pageData as any, slug: 'previous-year-questions' })
}

export default async function PreviousYearQuestions() {
  const payload = await getPayload({ config: configPromise })

  const [papersResult, pageResult, freeStudyGlobal]: [any, any, any] = await Promise.all([
    payload.find({
      collection: 'previous-year-questions',
      limit: 100, // Or implement pagination
      sort: '-uploadDate',
    }),
    payload.findGlobal({
      slug: 'previous-year-questions-page',
    }),
    payload.findGlobal({
      slug: 'free-study',
      depth: 2,
    }),
  ])

  const gatingConfig = {
    enableGating: freeStudyGlobal?.enableGating,
    gatingPopup:
      typeof freeStudyGlobal?.gatingPopup === 'object' ? freeStudyGlobal.gatingPopup : null,
  }

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/previous-year-questions`}
        doc={pageResult}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'WebPage',
            mode: 'guided',
          },
        ]}
      />
      <PreviousYearQuestionsComponent
        papers={papersResult.docs}
        pageData={pageResult}
        gatingConfig={gatingConfig}
      />
    </main>
  )
}
