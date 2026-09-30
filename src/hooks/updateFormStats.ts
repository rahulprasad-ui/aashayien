import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const updateFormStatsAfterChange: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  const { payload } = req
  if (operation === 'create' || operation === 'update') {
    const formId = typeof doc.form === 'object' ? doc.form.id : doc.form

    if (formId) {
      // Use limit: 1 to efficiently get totalDocs without fetching all records
      const submissions = await payload.find({
        collection: 'form-submissions',
        where: {
          form: {
            equals: formId,
          },
        },
        limit: 1,
        depth: 0,
        req,
      })

      const updateData: any = {
        submissionCount: submissions.totalDocs,
        lastSubmissionDate: new Date().toISOString(),
      }

      await payload.update({
        collection: 'forms',
        id: formId,
        data: updateData,
        req,
        context: {
          disableRevalidate: true,
        },
      })
    }
  }

  return doc
}

export const updateFormStatsAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  const { payload } = req
  const formId = typeof doc.form === 'object' ? doc.form.id : doc.form

  if (formId) {
    const submissions = await payload.find({
      collection: 'form-submissions',
      where: {
        form: {
          equals: formId,
        },
      },
      limit: 1,
      depth: 0,
      req,
    })

    const updateData: any = {
      submissionCount: submissions.totalDocs,
    }

    await payload.update({
      collection: 'forms',
      id: formId,
      data: updateData,
      req,
      context: {
        disableRevalidate: true,
      },
    })
  }

  return doc
}
