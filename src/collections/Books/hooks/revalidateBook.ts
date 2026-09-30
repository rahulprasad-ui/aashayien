import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateBook: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating book: ${doc.title}`)

    revalidatePath('/books')
    revalidatePath(`/books/${doc.slug}`)
    revalidateTag('collection_books')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted book: ${doc?.title}`)

    revalidatePath('/books')
    revalidatePath(`/books/${doc?.slug}`)
    revalidateTag('collection_books')
  }
  return doc
}
