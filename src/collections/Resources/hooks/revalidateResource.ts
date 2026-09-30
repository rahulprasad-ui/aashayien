import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateResource: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating resource: ${doc.title}`)

    revalidatePath('/free-study-online')
    revalidatePath('/')
    revalidateTag('collection_resources')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted resource: ${doc?.title}`)

    revalidatePath('/free-study-online')
    revalidatePath('/')
    revalidateTag('collection_resources')
  }
  return doc
}
