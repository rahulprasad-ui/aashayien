import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateVacancy: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating vacancy: ${doc.title}`)

    revalidatePath(`/vacancy/${doc.id}`)
    revalidatePath('/syllabus-vacancy')
    revalidatePath('/')
    revalidateTag('collection_vacancies')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted vacancy: ${doc?.title}`)

    revalidatePath(`/vacancy/${doc?.id}`)
    revalidatePath('/syllabus-vacancy')
    revalidatePath('/')
    revalidateTag('collection_vacancies')
  }
  return doc
}
