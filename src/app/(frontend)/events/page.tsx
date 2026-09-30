import { Events } from '@/components/aashayien/Events'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import React, { Suspense } from 'react'

import type { EventsPage as EventsPageType } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const pageData: EventsPageType = (await getCachedGlobal('events-page', 1)()) as EventsPageType
  return generateMeta({ doc: pageData as any })
}

export default async function EventsPage() {
  const payload = await getPayload({ config })
  const pageData: EventsPageType = (await getCachedGlobal(
    'events-page',
    1,
  )()) as unknown as EventsPageType

  const eventsResult = await payload.find({
    collection: 'events',
    limit: 100, // Fetch ample number of events
    sort: '-eventDateTime', // Sort by date descending
  })

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Events pageData={pageData} events={eventsResult.docs} />
      </Suspense>
    </main>
  )
}
