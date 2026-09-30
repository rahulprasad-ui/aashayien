import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env') })
dotenv.config({ path: path.resolve(dirname, '../.env.development') })

const EMPTY_VALUE = '-'

const normalizeText = (value: unknown): string => {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

const getSubmissionValue = (submissionData: any[] | null | undefined, patterns: RegExp[]) => {
  const item = submissionData?.find((entry) =>
    patterns.some((pattern) => pattern.test(normalizeText(entry?.field))),
  )

  return normalizeText(item?.value)
}

const submissionDataToDetails = (submissionData: any[] | null | undefined) =>
  Object.fromEntries(
    (submissionData || [])
      .filter((entry) => entry?.field)
      .map((entry) => [entry.field, normalizeText(entry.value) || EMPTY_VALUE]),
  )

const getFormMeta = (form: any) => ({
  formId: typeof form === 'object' && form !== null ? form.id : form,
  formTitle: typeof form === 'object' && form !== null ? form.title : form ? `Form ${form}` : 'Form',
})

const formatEventType = (eventType: string) =>
  eventType
    ? eventType
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : 'Dashboard Lead'

const upsertLead = async ({ data, payload, source, sourceId }: any) => {
  const existing = await payload.find({
    collection: 'leads',
    where: {
      and: [{ source: { equals: source } }, { sourceId: { equals: String(sourceId) } }],
    },
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]?.id) {
    await payload.update({
      collection: 'leads',
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    })
    return 'updated'
  }

  await payload.create({
    collection: 'leads',
    data,
    overrideAccess: true,
  })
  return 'created'
}

const eachDoc = async (payload: any, collection: string, depth: number, cb: (doc: any) => Promise<void>) => {
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const result = await payload.find({
      collection,
      depth,
      limit: 100,
      page,
      overrideAccess: true,
    })

    for (const doc of result.docs) {
      await cb(doc)
    }

    hasNextPage = result.hasNextPage
    page += 1
  }
}

const main = async () => {
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })
  const counts = {
    created: 0,
    updated: 0,
    formSubmissions: 0,
    enrollments: 0,
  }

  await eachDoc(payload, 'form-submissions', 1, async (submission) => {
    const { formId, formTitle } = getFormMeta(submission.form)
    const submissionData = submission.submissionData
    const name =
      getSubmissionValue(submissionData, [/^name$/i, /full.?name/i]) ||
      getSubmissionValue(submissionData, [/first.?name/i]) ||
      EMPTY_VALUE
    const email = getSubmissionValue(submissionData, [/email/i])
    const phone =
      getSubmissionValue(submissionData, [/phone/i, /mobile/i, /whatsapp/i]) || EMPTY_VALUE
    const status =
      getSubmissionValue(submissionData, [/^status$/i, /lead.?status/i]) || 'New Submission'

    const result = await upsertLead({
      payload,
    source: 'form',
    sourceId: submission.id,
      data: {
        title: `${name} - ${formTitle}`,
        type: 'form',
        source: 'form',
        sourceId: String(submission.id),
        name,
        email: email || undefined,
        phone,
        formType: formTitle,
        form: formId,
        status,
        leadDate: submission.createdAt,
        rawData: submissionDataToDetails(submissionData),
      },
    })

    counts[result as 'created' | 'updated'] += 1
    counts.formSubmissions += 1
  })

  await eachDoc(payload, 'enrollments', 0, async (enrollment) => {
    const eventType = normalizeText(enrollment.eventType)
    const leadType = normalizeText(enrollment.leadType)
    const status = leadType || formatEventType(eventType)
    const name = normalizeText(enrollment.name) || EMPTY_VALUE
    const formType = normalizeText(enrollment.courseName) || 'Dashboard'

    const result = await upsertLead({
      payload,
      source: 'dashboard',
      sourceId: enrollment.id,
      data: {
        title: `${name} - ${formType}`,
        type: 'dashboard',
        source: 'dashboard',
        sourceId: String(enrollment.id),
        name,
        email: normalizeText(enrollment.email) || undefined,
        phone: normalizeText(enrollment.phoneNumber) || EMPTY_VALUE,
        formType,
        status,
        leadDate: enrollment.logDate || enrollment.createdAt,
        rawData: {
          eventType: eventType ? formatEventType(eventType) : EMPTY_VALUE,
          courseName: formType,
          leadType: leadType || EMPTY_VALUE,
          source: normalizeText(enrollment.source) || EMPTY_VALUE,
        },
      },
    })

    counts[result as 'created' | 'updated'] += 1
    counts.enrollments += 1
  })

  console.log(`Backfilled leads: ${counts.created} created, ${counts.updated} updated`)
  console.log(`Sources processed: ${counts.formSubmissions} form submissions, ${counts.enrollments} enrollments`)
  process.exit(0)
}

main().catch((error) => {
  console.error('Lead backfill failed:', error)
  process.exit(1)
})
