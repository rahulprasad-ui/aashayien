import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateSyllabusState: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating syllabus state: ${doc.name}`)

    revalidatePath('/syllabus-vacancy')
    revalidatePath('/')
    revalidateTag('collection_syllabus-states')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted syllabus state: ${doc?.name}`)

    revalidatePath('/syllabus-vacancy')
    revalidatePath('/')
    revalidateTag('collection_syllabus-states')
  }
  return doc
}
