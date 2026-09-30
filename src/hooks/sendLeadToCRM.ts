import type { CollectionAfterChangeHook } from 'payload'
import type { Form } from '@/payload-types'

export const sendLeadToCRM: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
  collection,
}) => {
  if (operation !== 'create') {
    return doc
  }

  try {
    const url = process.env.TELECRM_URL
    const accessToken = process.env.TELECRM_ACCESS_TOKEN

    if (!url || !accessToken) {
      req.payload.logger.warn('TELECRM_URL or TELECRM_ACCESS_TOKEN is missing. Skipping CRM sync.')
      return doc
    }

    let name = ''
    let email = ''
    let phone = ''
    let city = ''
    const source = 'Website Leads'

    // Only process website form submissions; skip enrollments/webhooks completely
    if (
      collection.slug !== 'forms' &&
      collection.slug !== 'form-submissions' &&
      !(doc.form && doc.submissionData)
    ) {
      return doc
    }

    // Fail closed: do not send anything unless the parent form explicitly enables CRM.
    const formId = typeof doc.form === 'object' ? doc.form?.id : doc.form

    if (!formId) {
      req.payload.logger.info('Form submission has no form ID. Skipping CRM sync.')
      return doc
    }

    const form = (await req.payload.findByID({
      collection: 'forms',
      id: formId,
      depth: 0,
      req,
    })) as unknown as Form & { enableCRM?: boolean | null }

    if (!form?.enableCRM) {
      req.payload.logger.info(`CRM disabled for form "${form?.title}". Skipping CRM sync.`)
      return doc
    }

    if (Array.isArray(doc.submissionData)) {
      for (const data of doc.submissionData) {
        const fieldName = data.field?.toLowerCase() || ''
        const fieldValue = typeof data.value === 'string' ? data.value : ''

        if (fieldName.includes('name')) name = fieldValue
        else if (fieldName.includes('email')) email = fieldValue
        else if (fieldName.includes('phone') || fieldName.includes('mobile')) phone = fieldValue
        else if (fieldName.includes('city')) city = fieldValue
      }
    }

    req.payload.logger.info(
      `Sending lead to CRM: ${name} (${email}, ${phone}) from ${collection.slug}`,
    )

    const payload = {
      fields: {
        name,
        phone,
        email,
        rating: 3,
        status: 'Fresh',
        assignee: 'support@alec.co.in',
        property1: phone,
        city,
        source,
      },
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const telecrmRequestId =
      response.headers.get('x-request-id') ||
      response.headers.get('apigw-requestid') ||
      ''

    let crmStatus = ''
    const crmRequestId = telecrmRequestId

    if (!response.ok) {
      const errorText = await response.text()
      crmStatus = `Failed (${response.status})`
      req.payload.logger.error(`CRM API error (${response.status}): ${errorText}`)
    } else {
      crmStatus = telecrmRequestId ? `Synced (${telecrmRequestId})` : 'Synced to TeleCRM'
      req.payload.logger.info(
        `Successfully sent lead to CRM. TeleCRM Request ID: ${telecrmRequestId}`,
      )
    }

    if (doc.id) {
      try {
        const sourceId = String(doc.id)
        const existingLead = await req.payload.find({
          collection: 'leads',
          where: {
            sourceId: { equals: sourceId },
          },
          depth: 0,
          limit: 1,
          overrideAccess: true,
          req,
        })

        if (existingLead.docs[0]?.id) {
          await req.payload.update({
            collection: 'leads',
            id: existingLead.docs[0].id,
            data: {
              crmStatus,
              crmRequestId,
            },
            overrideAccess: true,
            req,
          })
        }
      } catch (err) {
        req.payload.logger.error(`Failed to update lead CRM status: ${err}`)
      }
    }
  } catch (error) {
    req.payload.logger.error(`Error sending lead to CRM: ${error}`)
  }

  return doc
}
