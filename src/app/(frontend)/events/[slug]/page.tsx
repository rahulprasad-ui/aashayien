import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { EventDetail } from '@/components/aashayien/EventDetail'
import { Metadata } from 'next'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import type { EventsPage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Args = {
  params: Promise<{
    slug: string
  }>
}

import { generateMeta } from '@/utilities/generateMeta'

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const event = result.docs[0]

  return generateMeta({ doc: event, slug: 'events/' + slug })
}

import { getServerSideURL } from '@/utilities/getURL'

export default async function EventPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const event = result.docs[0]

  if (!event) {
    notFound()
  }

  const freeStudyGlobal = await payload.findGlobal({
    slug: 'free-study',
    depth: 2,
  })

  const gatingConfig = {
    enableGating: freeStudyGlobal?.enableGating,
    gatingPopup:
      typeof freeStudyGlobal?.gatingPopup === 'object' ? freeStudyGlobal.gatingPopup : null,
  }

  const eventsPageData: EventsPage = (await getCachedGlobal('events-page', 1)()) as EventsPage

  return (
    <>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/events/${event.slug}`}
        doc={{
          ...event,
          publishedAt: event.date,
          location: event.location || 'Online',
        }}
        fallbackItems={[
          {
            enabled: true,
            mode: 'custom',
            schemaType: 'Event',
            customJSON: {
              '@type': 'Event',
              name: '{{title}}',
              description: '{{description}}',
              image: '{{image}}',
              startDate: '{{publishedAt}}',
              location: {
                '@type': 'Place',
                name: '{{location}}',
              },
              url: '{{url}}',
            },
          },
        ]}
      />
      <EventDetail event={event} gatingConfig={gatingConfig} eventsPageData={eventsPageData} />
    </>
  )
}
