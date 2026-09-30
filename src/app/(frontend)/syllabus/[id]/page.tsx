import { SyllabusDetail } from '@/components/aashayien/SyllabusDetail'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'syllabus-states',
    where: {
      code: {
        equals: id,
      },
    },
  })

  if (result.totalDocs === 0) {
    return {
      title: 'Syllabus Not Found - Aashayein Judiciary',
    }
  }

  const state = result.docs[0]
  return {
    title: `${state.fullName} Syllabus & Exam Pattern - Aashayein Judiciary`,
    description: state.description,
  }
}

export default async function SyllabusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'syllabus-states',
    where: {
      code: {
        equals: id,
      },
    },
  })

  const freeStudyGlobal = await payload.findGlobal({
    slug: 'free-study',
    depth: 2,
  })

  const gatingConfig = {
    enableGating: freeStudyGlobal?.enableGating,
    gatingPopup:
      typeof freeStudyGlobal?.gatingPopup === 'object' ? freeStudyGlobal.gatingPopup : null,
  }

  if (result.totalDocs === 0) {
    return notFound()
  }

  return (
    <main>
      <SyllabusDetail syllabusData={result.docs[0]} gatingConfig={gatingConfig} />
    </main>
  )
}
