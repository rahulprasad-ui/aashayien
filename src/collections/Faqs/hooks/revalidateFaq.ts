import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateFaq: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating FAQ: ${doc.question}`)

    revalidatePath('/')
    revalidatePath('/', 'layout')
    revalidateTag('collection_faqs')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted FAQ: ${doc?.question}`)

    revalidatePath('/')
    revalidatePath('/', 'layout')
    revalidateTag('collection_faqs')
  }
  return doc
}
