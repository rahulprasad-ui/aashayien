import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateCourse: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating course: ${doc.title}`)

    revalidatePath('/courses')
    revalidatePath(`/courses/${doc.slug}`)
    revalidatePath('/')
    revalidateTag('collection_courses')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted course: ${doc?.title}`)

    revalidatePath('/courses')
    revalidatePath(`/courses/${doc?.slug}`)
    revalidatePath('/')
    revalidateTag('collection_courses')
  }
  return doc
}
