import type { Payload, PayloadRequest } from 'payload'

export const seedNotesPage = async (payload: Payload, req: PayloadRequest) => {
  payload.logger.info('Seeding Notes Page Global...')

  await payload.updateGlobal({
    slug: 'notes-page',
    data: {
      hero: {
        badgeText: 'Free Study Material',
        title: 'Notes & Study Guides',
        description:
          'Comprehensive notes and guides prepared by experts to help you excel in judiciary examinations. Download free PDFs covering all important subjects and recent amendments.',
      },
    },
    req,
  })

  payload.logger.info('Notes Page Global seeding completed.')
}
