import { SyllabusVacancy } from '@/components/aashayien/SyllabusVacancy'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Branding } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { SchemaOrg } from '@/components/SEO/SchemaOrg'

export async function generateMetadata(): Promise<Metadata> {
  const syllabusGlobal: any = await getCachedGlobal('syllabus-vacancy-global', 1)()
  return generateMeta({ doc: syllabusGlobal as any, slug: 'syllabus-vacancy' })
}

export default async function SyllabusVacancyPage() {
  const payload = await getPayload({ config: configPromise })

  const syllabusGlobal = await payload.findGlobal({
    slug: 'syllabus-vacancy-global',
  })

  const statesResult = await payload.find({
    collection: 'syllabus-states',
    limit: 100,
    sort: 'name',
  })

  const vacanciesResult = await payload.find({
    collection: 'vacancies',
    limit: 100,
    sort: '-date',
    depth: 2, // To get state image
  })

  const brandingResult: Branding = (await getCachedGlobal('branding', 1)()) as Branding

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
      <SchemaOrg
        type="WebPage"
        data={{
          name: syllabusGlobal?.meta?.title || 'Syllabus & Vacancies | Aashayein Judiciary',
          description: syllabusGlobal?.meta?.description,
        }}
      />
      <SyllabusVacancy
        cmsData={syllabusGlobal}
        cmsStates={statesResult.docs}
        vacancies={vacanciesResult.docs}
        branding={brandingResult}
        gatingConfig={gatingConfig}
      />
    </main>
  )
}
