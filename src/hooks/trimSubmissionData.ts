import type { CollectionBeforeValidateHook } from 'payload'

export const trimSubmissionData: CollectionBeforeValidateHook = async ({ data }) => {
  if (data?.submissionData && Array.isArray(data.submissionData)) {
    data.submissionData = (data.submissionData as any[])
      .filter((entry) => entry.field && entry.field !== 'undefined') // Filter out invalid fields
      .map((entry) => {
        if (typeof entry.value === 'string') {
          return {
            ...entry,
            value: entry.value.trim(),
          }
        }
        return entry
      })
  }

  return data
}
