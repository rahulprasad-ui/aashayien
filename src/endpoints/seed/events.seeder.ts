import { Payload, PayloadRequest } from 'payload'

export const eventSeeder = async (payload: Payload, req: PayloadRequest) => {
  type EventSeedData = {
    title: string
    category: 'webinar' | 'seminar' | 'workshop' | 'scholarship'
    date: string
    eventDateTime: string
    time: string
    host: string
    seatsAvailable: number
    totalSeats?: number
    description: string
    image?: any
    hostImage?: any
    isOnline: boolean
    isFree: boolean
    tags: { tag: string }[]
    registerUrl?: string
  }

  const eventsData: EventSeedData[] = [
    // Webinars
    {
      title: 'Career Roadmap for Judiciary Aspirants 2025',
      category: 'webinar',
      date: 'Jan 15, 2025',
      eventDateTime: '2025-01-15T18:00:00.000Z',
      time: '2025-01-15T18:00:00.000Z',
      host: 'Nitesh Pahuja Sir',
      seatsAvailable: 150,
      totalSeats: 200,
      description:
        'Complete guidance on how to prepare for judiciary exams with strategic planning and time management techniques',
      image: { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' }, // Seeder will need to handle image upload if not external URL, but here we might need to handle media uploads. For now assume external URL support... wait, Payload Upload field needs a file ID.
      // I should reuse existing media or upload new ones. For a robust seeder I should upload key images.
      // But to save complexity I will assume I can just use placeholder logic or skip image upload if I don't have local files suitable.
      // Actually, I can download these images and upload them.
      // Or I can just skip the image seeding for now or use a placeholder ID if available.
      // Let's try to find an existing media ID to use as placeholder or accept that I might need to upload.
      // I'll stick to a simple text placeholder for now or omit required image check if possible.
      // But `image` is required in schema.
      // I'll assume there is at least one media item seeded by general seeder and use that, or just upload one placeholder.
      isOnline: true,
      isFree: true,
      tags: [{ tag: 'Career' }, { tag: 'Planning' }, { tag: 'Strategy' }], // Schema expects array of objects with `tag` field
    },
    {
      title: 'New Criminal Laws 2024: BNS, BNSS, BSA Explained',
      category: 'webinar',
      date: 'Jan 18, 2025',
      eventDateTime: '2025-01-18T17:30:00.000Z',
      time: '2025-01-18T17:30:00.000Z',
      host: 'Nitesh Pahuja Sir',
      seatsAvailable: 200,
      totalSeats: 500,
      description:
        'Comprehensive overview of the new criminal law reforms in India - BNS, BNSS, and BSA with practical examples',
      isOnline: true,
      isFree: true,
      tags: [{ tag: 'Criminal Law' }, { tag: 'BNS' }, { tag: 'BNSS' }, { tag: 'BSA' }],
    },
    {
      title: 'Interview Preparation for Judiciary Mains',
      category: 'webinar',
      date: 'Jan 22, 2025',
      eventDateTime: '2025-01-22T19:00:00.000Z',
      time: '2025-01-22T19:00:00.000Z',
      host: 'Senior District Judge',
      seatsAvailable: 100,
      description:
        'Expert tips and strategies for clearing the judiciary interview round with confidence and personality development',
      isOnline: true,
      isFree: true,
      tags: [{ tag: 'Interview' }, { tag: 'Mains' }, { tag: 'Personality' }],
    },
    // Seminars
    {
      title: 'Interactive Session: Answer Writing for Mains Exam',
      category: 'seminar',
      date: 'Jan 20, 2025',
      eventDateTime: '2025-01-20T10:00:00.000Z',
      time: '2025-01-20T10:00:00.000Z',
      host: 'Nitesh Pahuja Sir & Expert Panel',
      seatsAvailable: 80,
      description:
        'Learn effective answer writing techniques with live practice sessions and personalized feedback from experts',
      isOnline: false,
      isFree: false,
      tags: [{ tag: 'Offline' }, { tag: 'Answer Writing' }, { tag: 'Practice' }],
    },
    // Scholarship
    {
      title: 'Aashayein Scholarship Test 2025 - First Round',
      category: 'scholarship',
      date: 'Jan 28, 2025',
      eventDateTime: '2025-01-28T14:00:00.000Z',
      time: '2025-01-28T14:00:00.000Z',
      host: 'Aashayein Judiciary',
      seatsAvailable: 500,
      description:
        'Get up to 100% scholarship on premium courses based on performance. Top 100 students get guaranteed scholarships',
      isOnline: true,
      isFree: true,
      tags: [{ tag: 'Scholarship' }, { tag: 'Free Test' }, { tag: '100% Off' }],
    },
  ]

  // Get a placeholder image ID (using first available media)
  const mediaDocs = await payload.find({
    collection: 'media',
    limit: 1,
    req,
  })

  let placeholderImageId: string | number | undefined = undefined
  if (mediaDocs.docs.length > 0) {
    placeholderImageId = mediaDocs.docs[0].id
  }

  payload.logger.info(`Seeding Events...`)

  for (const event of eventsData) {
    const existingEvent = await payload.find({
      collection: 'events',
      where: {
        title: {
          equals: event.title,
        },
      },
      req,
    })

    if (existingEvent.docs.length === 0) {
      if (placeholderImageId) {
        event.image = placeholderImageId
        if (!event.hostImage) {
          event.hostImage = placeholderImageId
        }
      }

      await payload.create({
        collection: 'events',
        data: event as any,
        req,
      })
    }
  }

  payload.logger.info(`Seeding Events Completed.`)
}
