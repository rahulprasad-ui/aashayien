import type { PayloadRequest } from 'payload'
import { APIError } from 'payload'

const WINDOW_MS = 60 * 1000
const MAX_SUBMISSIONS_PER_WINDOW = 5

const submissionsByKey = new Map<string, { count: number; resetAt: number }>()

const getClientIP = (req: PayloadRequest) => {
  const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIP = req.headers.get('x-real-ip')?.trim()

  return forwardedFor || realIP || 'unknown'
}

export const rateLimitFormSubmission = async ({
  data,
  req,
}: {
  data?: any
  req: PayloadRequest
}) => {
  const formId = typeof data?.form === 'object' ? data.form.id : data?.form || 'unknown-form'
  const key = `${getClientIP(req)}:${formId}`
  const now = Date.now()
  const current = submissionsByKey.get(key)

  if (!current || current.resetAt <= now) {
    submissionsByKey.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    })

    return data
  }

  if (current.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    throw new APIError('Too many form submissions. Please try again later.', 429)
  }

  current.count += 1
  return data
}
