import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateSuccessStory: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating success story: ${doc.name}`)

    revalidatePath('/success-stories')
    revalidatePath(`/success-stories/${doc.slug}`)
    revalidateTag('collection_success-stories')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted success story: ${doc?.name}`)

    revalidatePath('/success-stories')
    revalidatePath(`/success-stories/${doc?.slug}`)
    revalidateTag('collection_success-stories')
  }
  return doc
}
