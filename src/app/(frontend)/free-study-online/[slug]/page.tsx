import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FreeStudyDetail } from '@/components/aashayien/FreeStudyDetail'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'resources',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const resource = result.docs[0]

  if (!resource) {
    return {
      title: 'Resource Not Found | Aashayein Judiciary',
    }
  }

  return {
    title: `${resource.title} | Aashayein Judiciary`,
    description:
      resource.description ||
      'Access free judiciary exam study materials, video lectures, and expert guidance.',
  }
}

export default async function FreeStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const [resourceResult, freeStudyGlobal] = await Promise.all([
    payload.find({
      collection: 'resources',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'free-study',
    }),
  ])

  const result = resourceResult

  const resource = result.docs[0]

  if (!resource) {
    notFound()
  }

  return (
    <main>
      <FreeStudyDetail
        resource={resource}
        gatingConfig={
          freeStudyGlobal
            ? {
                enableGating: freeStudyGlobal.enableGating || false,
                gatingPopup: (freeStudyGlobal.gatingPopup as any) || undefined,
              }
            : undefined
        }
      />
    </main>
  )
}
