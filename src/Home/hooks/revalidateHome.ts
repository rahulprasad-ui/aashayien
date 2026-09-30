import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateHome: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  payload.logger.info(`Revalidating home trigger. DisableRevalidate: ${context.disableRevalidate}`)

  if (!context.disableRevalidate) {
    payload.logger.info(`Executing revalidation for home`)

    revalidateTag('global_home')
    revalidatePath('/', 'layout')
    revalidatePath('/', 'page')
  }

  return doc
}
