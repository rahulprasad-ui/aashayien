'use server'

import { revalidateTag, revalidatePath } from 'next/cache'

export async function revalidateAll() {
  console.log('Manual revalidate all triggered')

  const tags = [
    'global_header',
    'global_branding',
    'global_home',
    'global_footer',
    'global_course',
    'global_success-stories-page',
    'global_free-study',
    'global_syllabus-vacancy',
    'global_blog',
    'global_events-page',
    'global_books-page',
    'global_about-us',
    'global_contact-page',
    'global_notes-page',
    'global_previous-year-questions-page',
  ]

  tags.forEach((tag) => {
    console.log(`Revalidating tag: ${tag}`)
    revalidateTag(tag)
  })

  // Also revalidate the root layout to be sure
  revalidatePath('/', 'layout')
  revalidatePath('/admin', 'layout')

  return { success: true }
}
