import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SuccessStoryDetail } from '@/components/aashayien/SuccessStoryDetail'
import { notFound } from 'next/navigation'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs: stories } = await payload.find({
    collection: 'success-stories',
    where: {
      slug: {
        equals: id,
      },
    },
    limit: 1,
  })

  const story = stories[0]

  return generateMeta({ doc: story })
}

export default async function SuccessStoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs: stories } = await payload.find({
    collection: 'success-stories',
    where: {
      slug: {
        equals: id,
      },
    },
    limit: 1,
  })

  const story = stories[0]

  if (!story) {
    notFound()
  }

  // Fetch related stories (same category, excluding current)
  const { docs: relatedStories } = await payload.find({
    collection: 'success-stories',
    where: {
      category: {
        equals: story.category,
      },
      id: {
        not_equals: story.id,
      },
    },
    limit: 3,
  })

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/success-stories/${story.slug}`}
        doc={story}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'Article',
            mode: 'guided',
            overrides: {
              headline: '{{name}} - Success Story',
              authorName: '{{name}}',
            },
          },
        ]}
      />
      <SuccessStoryDetail story={story} relatedStories={relatedStories} />
    </main>
  )
}
