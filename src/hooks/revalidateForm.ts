import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateForm: CollectionAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating form: ${doc.title}`)

    // Revalidate home page (via tag used in getCachedGlobal)
    revalidateTag('global_home')
    revalidatePath('/')

    // Revalidate contact page
    revalidatePath('/contact')

    // Revalidate any page that might be using this form via FormBlock
    const pages = await payload.find({
      collection: 'pages',
      where: {
        'layout.form': {
          equals: doc.id,
        },
      },
      depth: 0,
      limit: 0,
    })

    pages.docs.forEach((page: any) => {
      const path = page.slug === 'home' ? '/' : `/${page.slug}`
      payload.logger.info(`Revalidating page using form: ${path}`)
      revalidatePath(path)
    })
  }

  return doc
}

export const revalidateFormDelete: CollectionAfterDeleteHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating form on delete: ${doc?.title}`)

    revalidateTag('global_home')
    revalidatePath('/')
    revalidatePath('/contact')

    // Find and revalidate pages using this form
    const pages = await payload.find({
      collection: 'pages',
      where: {
        'layout.form': {
          equals: doc?.id,
        },
      },
      depth: 0,
      limit: 0,
    })

    pages.docs.forEach((page: any) => {
      const path = page.slug === 'home' ? '/' : `/${page.slug}`
      payload.logger.info(`Revalidating page using form (delete): ${path}`)
      revalidatePath(path)
    })
  }

  return doc
}
