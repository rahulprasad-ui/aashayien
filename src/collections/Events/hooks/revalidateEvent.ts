import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateEvent: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating event: ${doc.title}`)

    revalidatePath('/events')
    revalidatePath(`/events/${doc.slug}`)
    revalidatePath('/')
    revalidateTag('collection_events')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted event: ${doc?.title}`)

    revalidatePath('/events')
    revalidatePath(`/events/${doc?.slug}`)
    revalidatePath('/')
    revalidateTag('collection_events')
  }
  return doc
}
