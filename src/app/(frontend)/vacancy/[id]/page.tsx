import { VacancyDetail } from '@/components/aashayien/VacancyDetail'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

import { generateMeta } from '@/utilities/generateMeta'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  // Try to find by ID
  let vacancy: any = null
  try {
    vacancy = await payload.findByID({
      collection: 'vacancies',
      id: id,
    })
  } catch (e) {
    // If ID is not UUID, might be state code
  }

  // If not found by ID, try finding by state code
  if (!vacancy) {
    const result = await payload.find({
      collection: 'vacancies',
      where: {
        'state.code': { equals: id },
      },
      limit: 1,
      sort: '-date',
    })
    if (result.totalDocs > 0) vacancy = result.docs[0]
  }

  if (!vacancy) return { title: 'Vacancy Not Found' }

  return generateMeta({ doc: vacancy, slug: 'vacancy/' + id })
}

export default async function VacancyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  let vacancy = null
  try {
    vacancy = await payload.findByID({
      collection: 'vacancies',
      id: id,
      depth: 2, // Populate state
    })
  } catch (e) {
    // Ignore error, try alternate
  }

  if (!vacancy) {
    const result = await payload.find({
      collection: 'vacancies',
      where: {
        'state.code': { equals: id },
      },
      limit: 1,
      sort: '-date',
      depth: 2,
    })
    if (result.totalDocs > 0) vacancy = result.docs[0]
  }

  if (!vacancy) {
    return notFound()
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

  return (
    <main>
      <VacancyDetail vacancyData={vacancy} gatingConfig={gatingConfig} />
    </main>
  )
}
