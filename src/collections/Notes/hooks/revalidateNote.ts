import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateNote: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating note: ${doc.title}`)

    revalidatePath('/notes-guides')
    revalidatePath('/free-study-online')
    revalidateTag('collection_notes')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted note: ${doc?.title}`)

    revalidatePath('/notes-guides')
    revalidatePath('/free-study-online')
    revalidateTag('collection_notes')
  }
  return doc
}
