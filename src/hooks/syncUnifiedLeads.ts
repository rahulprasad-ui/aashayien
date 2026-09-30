import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

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

const upsertLead = async ({ data, req, source, sourceId }: any) => {
  const existing = await req.payload.find({
    collection: 'leads',
    where: {
      and: [{ source: { equals: source } }, { sourceId: { equals: String(sourceId) } }],
    },
    depth: 0,
    limit: 1,
    overrideAccess: true,
    req,
  })

  if (existing.docs[0]?.id) {
    await req.payload.update({
      collection: 'leads',
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
      req,
    })
    return
  }

  await req.payload.create({
    collection: 'leads',
    data,
    overrideAccess: true,
    req,
  })
}

const deleteLead = async ({ req, source, sourceId }: any) => {
  await req.payload.delete({
    collection: 'leads',
    where: {
      and: [{ source: { equals: source } }, { sourceId: { equals: String(sourceId) } }],
    },
    overrideAccess: true,
    req,
  })
}

export const syncFormSubmissionLead: CollectionAfterChangeHook = async ({ doc, req }) => {
  const { formId, formTitle } = getFormMeta((doc as any).form)
  const submissionData = (doc as any).submissionData
  const name =
    getSubmissionValue(submissionData, [/^name$/i, /full.?name/i]) ||
    getSubmissionValue(submissionData, [/first.?name/i]) ||
    EMPTY_VALUE
  const email = getSubmissionValue(submissionData, [/email/i])
  const phone =
    getSubmissionValue(submissionData, [/phone/i, /mobile/i, /whatsapp/i]) || EMPTY_VALUE
  const status =
    getSubmissionValue(submissionData, [/^status$/i, /lead.?status/i]) || 'New Submission'

  await upsertLead({
    req,
    source: 'form',
    sourceId: (doc as any).id,
    data: {
      title: `${name} - ${formTitle}`,
      type: 'form',
      source: 'form',
      sourceId: String((doc as any).id),
      name,
      email: email || undefined,
      phone,
      formType: formTitle,
      form: formId,
      status,
      leadDate: (doc as any).createdAt,
      rawData: submissionDataToDetails(submissionData),
    },
  })

  return doc
}

export const deleteFormSubmissionLead: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await deleteLead({ req, source: 'form', sourceId: (doc as any).id })
  return doc
}

export const syncEnrollmentLead: CollectionAfterChangeHook = async ({ doc, req }) => {
  const eventType = normalizeText((doc as any).eventType)
  const leadType = normalizeText((doc as any).leadType)
  const status = leadType || formatEventType(eventType)
  const name = normalizeText((doc as any).name) || EMPTY_VALUE
  const formType = normalizeText((doc as any).courseName) || 'Dashboard'

  await upsertLead({
    req,
    source: 'dashboard',
    sourceId: (doc as any).id,
    data: {
      title: `${name} - ${formType}`,
      type: 'dashboard',
      source: 'dashboard',
      sourceId: String((doc as any).id),
      name,
      email: normalizeText((doc as any).email) || undefined,
      phone: normalizeText((doc as any).phoneNumber) || EMPTY_VALUE,
      formType,
      eventType: eventType || undefined,
      status,
      leadDate: (doc as any).logDate || (doc as any).createdAt,
      rawData: {
        eventType: eventType || EMPTY_VALUE,
        courseName: formType,
        leadType: leadType || EMPTY_VALUE,
        source: normalizeText((doc as any).source) || EMPTY_VALUE,
      },
    },
  })

  return doc
}

export const deleteEnrollmentLead: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await deleteLead({ req, source: 'dashboard', sourceId: (doc as any).id })
  return doc
}
