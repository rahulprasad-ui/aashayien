import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateClatPgGlobal: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  payload.logger.info(`Revalidating clat-pg-global trigger. DisableRevalidate: ${context.disableRevalidate}`)

  if (!context.disableRevalidate) {
    payload.logger.info('Executing revalidation for clat-pg-global')

    revalidateTag('global_clat-pg-global')
    revalidatePath('/clat-pg', 'page')
  }

  return doc
}
