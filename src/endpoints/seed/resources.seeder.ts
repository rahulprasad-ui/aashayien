import { type Payload, type PayloadRequest } from 'payload'

const videos = [
  // New Criminal Laws by Nitesh Sir (3 videos)
  {
    title: 'BNS (Bharatiya Nyaya Sanhita) Complete Overview',
    description:
      'Comprehensive analysis of new Bharatiya Nyaya Sanhita replacing IPC. Essential for all judiciary aspirants.',
    category: 'new-criminal-laws',
    duration: '1:15:20',
    views: '245K',
    uploadDate: '2024-01-10',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    tags: ['BNS', 'Criminal Law'],
  },
  {
    title: 'BNSS (Bharatiya Nagarik Suraksha Sanhita) Explained',
    description: 'Deep dive into BNSS replacing CrPC. All important changes and sections covered.',
    category: 'new-criminal-laws',
    duration: '1:05:45',
    views: '198K',
    uploadDate: '2024-01-15',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
    tags: ['BNSS', 'Criminal Procedure'],
  },
  {
    title: 'BSA (Bharatiya Sakshya Adhiniyam) Complete Guide',
    description:
      'Complete coverage of BSA replacing Indian Evidence Act with examples and case laws.',
    category: 'new-criminal-laws',
    duration: '58:30',
    views: '176K',
    uploadDate: '2024-01-20',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800',
    tags: ['BSA', 'Evidence Law'],
  },

  // Minor Laws (6 videos)
  {
    title: 'POCSO Act - Protection of Children Complete Analysis',
    description: 'Complete guide to POCSO Act with landmark judgments and practical applications.',
    category: 'minor-laws',
    duration: '42:15',
    views: '134K',
    uploadDate: '2024-02-01',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    tags: ['POCSO', 'Child Protection'],
  },
  {
    title: 'IT Act - Information Technology Act Explained',
    description: 'Cyber laws and IT Act provisions essential for modern judiciary exams.',
    category: 'minor-laws',
    duration: '38:50',
    views: '112K',
    uploadDate: '2024-02-05',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800',
    tags: ['IT Act', 'Cyber Law'],
  },
  {
    title: 'POSH Act - Prevention of Sexual Harassment at Workplace',
    description: 'Complete coverage of POSH Act with case studies and practical scenarios.',
    category: 'minor-laws',
    duration: '35:20',
    views: '98K',
    uploadDate: '2024-02-10',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    tags: ['POSH', 'Workplace Law'],
  },
  {
    title: 'DV Act - Domestic Violence Act Complete Guide',
    description:
      'Protection of Women from Domestic Violence Act with important provisions and judgments.',
    category: 'minor-laws',
    duration: '40:10',
    views: '125K',
    uploadDate: '2024-02-15',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
    tags: ['DV Act', 'Women Protection'],
  },
  {
    title: 'JJ Act - Juvenile Justice Act Explained',
    description: 'Juvenile Justice (Care and Protection of Children) Act with recent amendments.',
    category: 'minor-laws',
    duration: '36:45',
    views: '89K',
    uploadDate: '2024-02-20',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800',
    tags: ['JJ Act', 'Juvenile Justice'],
  },
  {
    title: 'Consumer Protection Act - Complete Overview',
    description: 'Consumer Protection Act 2019 with all important provisions and case laws.',
    category: 'minor-laws',
    duration: '33:30',
    views: '76K',
    uploadDate: '2024-02-25',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    tags: ['Consumer Law'],
  },

  // Local Laws (4 videos)
  {
    title: 'Rajasthan Rent Control Act - Complete Analysis',
    description: 'RJS specific rent control provisions essential for Rajasthan Judiciary exams.',
    category: 'local-laws',
    duration: '45:20',
    views: '156K',
    uploadDate: '2024-03-01',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800',
    tags: ['Rajasthan', 'Rent Control'],
  },
  {
    title: 'HP Rent Control Act - Himachal Pradesh',
    description: 'Himachal Pradesh Rent Control provisions for HJS aspirants.',
    category: 'local-laws',
    duration: '38:15',
    views: '92K',
    uploadDate: '2024-03-05',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    tags: ['Himachal', 'Rent Control'],
  },
  {
    title: 'CG Rent Control Act - Chhattisgarh',
    description: 'Chhattisgarh specific rent control laws for judiciary preparation.',
    category: 'local-laws',
    duration: '40:50',
    views: '78K',
    uploadDate: '2024-03-10',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
    tags: ['Chhattisgarh', 'Rent Control'],
  },
  {
    title: 'Court Fees Act - All States Coverage',
    description: 'Court Fees Act provisions applicable across different states with examples.',
    category: 'local-laws',
    duration: '35:40',
    views: '145K',
    uploadDate: '2024-03-15',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800',
    tags: ['Court Fees'],
  },

  // Landmark Judgments (6 videos)
  {
    title: 'Kesavananda Bharati vs State of Kerala - Basic Structure Doctrine',
    description:
      'Most important landmark judgment establishing basic structure doctrine of Constitution.',
    category: 'landmark-judgments',
    duration: '1:12:30',
    views: '289K',
    uploadDate: '2024-03-20',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    tags: ['Landmark', 'Constitutional Law'],
  },
  {
    title: 'Maneka Gandhi vs Union of India - Article 21 Expansion',
    description:
      'Landmark case that expanded scope of Article 21 - Right to Life and Personal Liberty.',
    category: 'landmark-judgments',
    duration: '52:20',
    views: '234K',
    uploadDate: '2024-03-25',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800',
    tags: ['Landmark', 'Fundamental Rights'],
  },
  {
    title: 'Vishaka vs State of Rajasthan - Sexual Harassment Guidelines',
    description: 'Vishaka guidelines on sexual harassment at workplace before POSH Act.',
    category: 'landmark-judgments',
    duration: '48:15',
    views: '187K',
    uploadDate: '2024-04-01',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    tags: ['Landmark', 'Women Rights'],
  },
  {
    title: 'Navtej Singh Johar vs Union of India - Section 377',
    description: 'Historic judgment decriminalizing consensual homosexual acts - Section 377 IPC.',
    category: 'landmark-judgments',
    duration: '55:40',
    views: '267K',
    uploadDate: '2024-04-05',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
    tags: ['Landmark', 'LGBTQ Rights'],
  },
  {
    title: 'K.S. Puttaswamy vs Union of India - Right to Privacy',
    description:
      'Landmark judgment declaring Right to Privacy as fundamental right under Article 21.',
    category: 'landmark-judgments',
    duration: '1:05:25',
    views: '298K',
    uploadDate: '2024-04-10',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800',
    tags: ['Landmark', 'Privacy'],
  },
  {
    title: 'Shreya Singhal vs Union of India - Section 66A IT Act',
    description: 'Section 66A of IT Act struck down as unconstitutional - freedom of speech case.',
    category: 'landmark-judgments',
    duration: '50:10',
    views: '176K',
    uploadDate: '2024-04-15',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    tags: ['Landmark', 'IT Law'],
  },

  // 10 Common Laws by Nitesh Sir (9 videos)
  {
    title: 'CRPC - Criminal Procedure Code Complete Coverage',
    description: 'Complete CrPC for judiciary exams with important sections and case laws.',
    category: 'common-laws',
    duration: '2:15:30',
    views: '456K',
    uploadDate: '2024-04-20',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800',
    tags: ['CrPC', 'Criminal Procedure'],
  },
  {
    title: 'CPC - Civil Procedure Code Detailed Analysis',
    description: 'Complete Civil Procedure Code with practical examples and landmark judgments.',
    category: 'common-laws',
    duration: '2:05:45',
    views: '412K',
    uploadDate: '2024-04-25',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    tags: ['CPC', 'Civil Procedure'],
  },
  {
    title: 'IEA - Indian Evidence Act Complete Guide',
    description: 'Evidence Act with all sections, illustrations and important case laws.',
    category: 'common-laws',
    duration: '1:55:20',
    views: '389K',
    uploadDate: '2024-05-01',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
    tags: ['Evidence Act'],
  },
  {
    title: 'IPC - Indian Penal Code Comprehensive Coverage',
    description: 'Complete IPC with all important sections for judiciary prelims and mains.',
    category: 'common-laws',
    duration: '2:30:15',
    views: '534K',
    uploadDate: '2024-05-05',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800',
    tags: ['IPC', 'Criminal Law'],
  },
  {
    title: 'COI - Constitution of India Complete Analysis',
    description: 'Indian Constitution with all articles, schedules and important amendments.',
    category: 'common-laws',
    duration: '3:15:40',
    views: '678K',
    uploadDate: '2024-05-10',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    tags: ['Constitution'],
  },
  {
    title: 'SRA - Specific Relief Act Detailed Study',
    description: 'Specific Relief Act with remedies, injunctions and important case laws.',
    category: 'common-laws',
    duration: '1:25:30',
    views: '267K',
    uploadDate: '2024-05-15',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800',
    tags: ['SRA', 'Civil Law'],
  },
  {
    title: 'LA - Limitation Act Complete Coverage',
    description: 'Limitation Act with all schedules and time periods for different suits.',
    category: 'common-laws',
    duration: '1:18:20',
    views: '234K',
    uploadDate: '2024-05-20',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    tags: ['Limitation Act'],
  },
  {
    title: 'TPA - Transfer of Property Act Explained',
    description: 'Transfer of Property Act with all chapters and important provisions.',
    category: 'common-laws',
    duration: '1:45:50',
    views: '312K',
    uploadDate: '2024-05-25',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
    tags: ['TPA', 'Property Law'],
  },
  {
    title: 'ICA - Indian Contract Act Complete Guide',
    description: 'Contract Act 1872 with all sections, case laws and practical examples.',
    category: 'common-laws',
    duration: '1:52:35',
    views: '398K',
    uploadDate: '2024-05-30',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800',
    tags: ['Contract Act'],
  },

  // State-wise Complete Playlist (9 videos for different states)
  {
    title: 'UP Judiciary Complete Playlist - Uttar Pradesh PCS-J',
    description: 'Complete video series for UP Judiciary exam covering all subjects in Hindi.',
    category: 'state-wise-playlist',
    duration: 'Playlist',
    views: '567K',
    uploadDate: '2024-06-01',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    tags: ['UP', 'Hindi'],
  },
  {
    title: 'MP Judiciary Complete Playlist - Madhya Pradesh',
    description: 'Madhya Pradesh Judiciary exam complete preparation in Hindi.',
    category: 'state-wise-playlist',
    duration: 'Playlist',
    views: '445K',
    uploadDate: '2024-06-05',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800',
    tags: ['MP', 'Hindi'],
  },
  {
    title: 'Bihar Judiciary Complete Playlist - BPSC',
    description: 'Bihar Judicial Services complete video series covering all topics.',
    category: 'state-wise-playlist',
    duration: 'Playlist',
    views: '489K',
    uploadDate: '2024-06-10',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    tags: ['Bihar', 'Hindi'],
  },
  {
    title: 'Rajasthan Judiciary Complete Playlist - RJS',
    description: 'Rajasthan Judicial Service complete preparation with all subjects.',
    category: 'state-wise-playlist',
    duration: 'Playlist',
    views: '523K',
    uploadDate: '2024-06-15',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
    tags: ['Rajasthan', 'Hindi'],
  },
  {
    title: 'Jharkhand Judiciary Complete Playlist',
    description: 'Jharkhand Judicial Services complete video coverage in Hindi.',
    category: 'state-wise-playlist',
    duration: 'Playlist',
    views: '298K',
    uploadDate: '2024-06-20',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800',
    tags: ['Jharkhand', 'Hindi'],
  },
  {
    title: 'Haryana Judiciary Complete Playlist - HJS',
    description: 'Haryana Judicial Service exam complete preparation series.',
    category: 'state-wise-playlist',
    duration: 'Playlist',
    views: '387K',
    uploadDate: '2024-06-25',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    tags: ['Haryana', 'Hindi'],
  },
  {
    title: 'Himachal Pradesh Judiciary Complete Playlist',
    description: 'HP Judicial Services complete video series for all subjects.',
    category: 'state-wise-playlist',
    duration: 'Playlist',
    views: '256K',
    uploadDate: '2024-06-30',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800',
    tags: ['Himachal', 'Hindi'],
  },
  {
    title: 'Delhi Judiciary Complete Playlist - DSLSA',
    description: 'Delhi Judicial Services complete preparation covering all topics.',
    category: 'state-wise-playlist',
    duration: 'Playlist',
    views: '612K',
    uploadDate: '2024-07-05',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    tags: ['Delhi', 'Hindi'],
  },
  {
    title: 'Chhattisgarh Judiciary Complete Playlist',
    description: 'Chhattisgarh Judicial Services complete video coverage in Hindi.',
    category: 'state-wise-playlist',
    duration: 'Playlist',
    views: '234K',
    uploadDate: '2024-07-10',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
    tags: ['Chhattisgarh', 'Hindi'],
  },

  // Top Shorts (3 videos)
  {
    title: 'Quick Revision - Important IPC Sections #Shorts',
    description: '60 seconds quick revision of most important IPC sections for exam.',
    category: 'top-shorts',
    duration: '0:58',
    views: '892K',
    uploadDate: '2024-07-15',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800',
    tags: ['Shorts', 'Quick Revision'],
  },
  {
    title: 'Constitutional Amendments in 1 Minute #Shorts',
    description: 'Important Constitutional amendments you must know for judiciary exam.',
    category: 'top-shorts',
    duration: '0:55',
    views: '756K',
    uploadDate: '2024-07-20',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    tags: ['Shorts', 'Constitution'],
  },
  {
    title: 'Study Tips for Judiciary Aspirants #Shorts',
    description: 'Quick study tips and motivation for judiciary exam preparation.',
    category: 'top-shorts',
    duration: '0:45',
    views: '1.2M',
    uploadDate: '2024-07-25',
    youtubeId: 'dQw4w9WgXcQ',
    externalThumbnailUrl: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800',
    tags: ['Shorts', 'Study Tips'],
  },
]

const categoryLabels = {
  'new-criminal-laws': 'New Criminal Laws by Nitesh Sir',
  'minor-laws': 'Minor Laws',
  'local-laws': 'Local Laws',
  'landmark-judgments': 'Landmark Judgments',
  'common-laws': '10 Common Laws by Nitesh Sir',
  'state-wise-playlist': 'State-wise Complete Playlist',
  'top-shorts': 'Top Shorts',
  'criminal-law': 'Criminal Law',
  'civil-law': 'Civil Law',
  'constitution': 'Constitution',
  'contracts': 'Contract & Tort',
  'evidence': 'Evidence Act',
  'current-affairs': 'Current Affairs',
}

export const seedResources = async (payload: Payload, req: PayloadRequest) => {
  payload.logger.info('Seeding Resources...')

  // 1. Create/Update Categories
  const categoryDocs: Record<string, string | number> = {}

  for (const [slug, title] of Object.entries(categoryLabels)) {
    const existing = await payload.find({
      collection: 'resource-categories',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      req,
    })

    if (existing.docs.length > 0) {
      categoryDocs[slug] = existing.docs[0].id
    } else {
      const newCat = await payload.create({
        collection: 'resource-categories',
        data: {
          title,
          slug,
        },
        req,
      })
      categoryDocs[slug] = newCat.id
    }
  }

  // 2. Create Videos
  for (const video of videos) {
    const catId = categoryDocs[video.category]
    if (!catId) {
      payload.logger.warn(`Category ${video.category} not found for video ${video.title}`)
      continue
    }

    const existingVideo = await payload.find({
      collection: 'resources',
      where: {
        title: { equals: video.title },
      },
      limit: 1,
      req,
    })

    if (existingVideo.docs.length > 0) {
      continue
    }

    await payload.create({
      collection: 'resources',
      data: {
        title: video.title,
        description: video.description,
        category: catId,
        duration: video.duration,
        views: video.views,
        uploadDate: video.uploadDate,
        youtubeId: video.youtubeId,
        externalThumbnailUrl: video.externalThumbnailUrl,
        tags: video.tags.map((t) => ({ tag: t })),
      } as any,
      req,
    })
  }

  // 3. Seed FreeStudy Global
  payload.logger.info('Seeding FreeStudy Global...')
  await payload.updateGlobal({
    slug: 'free-study',
    data: {
      hero: {
        badgeText: 'Free Study Resources',
        title: 'Free Study Online',
        subtitle:
          'Access our complete library of free video lectures, case law analysis, study tips, and expert guidance for judiciary exam preparation by Nitesh Pahuja Sir.',
      },
      brochure: {
        buttonText: 'Download Brochure',
      },
    } as any,
    req,
  })

  payload.logger.info('Resources Seeding Completed.')
}
