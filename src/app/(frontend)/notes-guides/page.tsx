import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NotesGuidesComponent } from '@/components/aashayien/NotesGuidesComponent'
import type { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const pageData: any = await getCachedGlobal('notes-page', 1)()
  return generateMeta({ doc: pageData as any, slug: 'notes-guides' })
}

export default async function NotesGuidesPage() {
  const payload = await getPayload({ config: configPromise })

  const [notesResult, categoriesResult, pageData, freeStudyGlobal]: [any, any, any, any] =
    await Promise.all([
      payload.find({
        collection: 'notes',
        limit: 1000,
        sort: '-uploadDate',
        depth: 2,
      }),
      payload.find({
        collection: 'resource-categories',
        limit: 100,
        sort: 'title',
      }),
      payload.findGlobal({
        slug: 'notes-page',
        depth: 2,
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
        currentUrl={`${getServerSideURL()}/notes-guides`}
        doc={pageData}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'WebPage',
            mode: 'guided',
          },
        ]}
      />
      <NotesGuidesComponent
        notes={notesResult.docs}
        resourceCategories={categoriesResult.docs}
        pageData={pageData}
        gatingConfig={gatingConfig}
      />
    </main>
  )
}
