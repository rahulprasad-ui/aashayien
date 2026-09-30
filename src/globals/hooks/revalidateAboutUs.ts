import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateAboutUs: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  payload.logger.info(`Revalidating about-us trigger. DisableRevalidate: ${context.disableRevalidate}`)

  if (!context.disableRevalidate) {
    payload.logger.info('Executing revalidation for about-us')

    revalidateTag('global_about-us')
    revalidatePath('/about-us', 'page')
  }

  return doc
}
