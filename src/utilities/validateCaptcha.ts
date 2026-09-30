import type { PayloadRequest } from 'payload'
import { APIError } from 'payload'
import crypto from 'crypto'

export const verifyCaptcha = async (captcha: {
  value?: string
  hash?: string
  type?: 'system' | 'google'
}) => {
  const { value, hash, type = 'system' } = captcha || {}

  if (type === 'google') {
    if (!value) {
      throw new APIError('reCAPTCHA token is missing.', 400)
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is missing')
      throw new APIError('reCAPTCHA configuration error.', 500)
    }

    try {
      const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${value}`,
        {
          method: 'POST',
        },
      )
      const verifyData = await verifyRes.json()

      if (!verifyData.success) {
        throw new APIError('Invalid reCAPTCHA', 400)
      }
    } catch (err) {
      console.error('reCAPTCHA verification failed', err)
      if (err instanceof APIError) throw err
      throw new APIError('reCAPTCHA verification failed.', 500)
    }
  } else {
    // System Captcha
    if (!value || !hash) {
      throw new APIError('CAPTCHA is invalid or missing.', 400)
    }

    const secret = process.env.PAYLOAD_SECRET || 'secret-key'
    const expectedHash = crypto
      .createHmac('sha256', secret)
      .update(value.toString().toUpperCase())
      .digest('hex')

    if (hash !== expectedHash) {
      throw new APIError('Invalid Captcha', 400)
    }
  }

  return true
}

export const validateCaptcha = async ({
  data,
  req,
}: {
  data: any
  req: PayloadRequest
}): Promise<any> => {
  // 1. Fetch the related Form to see if it even uses a Captcha
  const formId = typeof data.form === 'object' ? data.form.id : data.form

  if (formId) {
    try {
      const form = await req.payload.findByID({
        collection: 'forms',
        id: formId,
      })

      // Helper to check for captcha block in fields
      const hasCaptchaInfo = (fields: any[]): boolean => {
        return fields.some((field) => {
          if (field.blockType === 'captcha') return true
          if (field.fields) return hasCaptchaInfo(field.fields)
          return false
        })
      }

      const hasCaptcha = form.fields && hasCaptchaInfo(form.fields)

      // If the form definition doesn't include a captcha, skip validation
      if (!hasCaptcha) {
        return data
      }
    } catch (e) {
      // If we can't find the form, we can't verify if captcha is required.
      console.error('Error fetching form for captcha validation', e)
    }
  }

  const captchaEntry = data?.submissionData?.find(
    (f: any) =>
      f.value &&
      typeof f.value === 'object' &&
      ('hash' in f.value || f.value.type === 'google'),
  )

  if (!captchaEntry) {
    throw new APIError('CAPTCHA is invalid or missing.', 400)
  }

  await verifyCaptcha(captchaEntry.value)

  // Clean up the submission data to store simpler value
  captchaEntry.value = 'Verified'

  return data
}
