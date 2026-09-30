import type { Payload, PayloadRequest } from 'payload'

const papersData = [
  {
    title: 'UPJSE Prelims 2024 Question Paper',
    category: 'prelims',
    examName: 'UP Higher Judicial Service',
    year: '2024',
    description:
      'Complete question paper of UPJSE Prelims examination 2024 with all 150 questions covering constitutional law, criminal law, civil law, and evidence.',
    pages: 45,
    downloads: 18900,
    uploadDate: '2025-01-10T12:00:00.000Z',
    rating: 4.9,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['UPJSE', 'Prelims', '2024'],
  },
  {
    title: 'Delhi HJS Mains 2023 Paper - Civil Law',
    category: 'mains',
    examName: 'Delhi Higher Judicial Service',
    year: '2023',
    description:
      'Delhi HJS Mains 2023 Civil Law paper including CPC, Limitation Act, Transfer of Property Act, and Specific Relief Act with detailed questions.',
    pages: 32,
    downloads: 15400,
    uploadDate: '2025-01-05T12:00:00.000Z',
    rating: 4.8,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Delhi HJS', 'Mains', 'Civil Law'],
  },
  {
    title: 'Rajasthan JS Prelims 2024 Question Paper',
    category: 'prelims',
    examName: 'Rajasthan Judicial Service',
    year: '2024',
    description:
      'Complete prelims question paper for Rajasthan Judicial Service 2024 with 200 objective questions and detailed answer key.',
    pages: 50,
    downloads: 21500,
    uploadDate: '2024-12-28T12:00:00.000Z',
    rating: 4.9,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Rajasthan', 'Prelims', '2024'],
  },
  {
    title: 'MP JS Mains 2023 - Criminal Law Paper',
    category: 'mains',
    examName: 'Madhya Pradesh Judicial Service',
    year: '2023',
    description:
      'MP Judicial Service Mains 2023 Criminal Law paper covering IPC, CrPC, Evidence Act with case law based questions and analysis.',
    pages: 38,
    downloads: 13200,
    uploadDate: '2024-12-22T12:00:00.000Z',
    rating: 4.7,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['MP JS', 'Mains', 'Criminal Law'],
  },
  {
    title: 'Maharashtra JS Prelims 2024',
    category: 'state-judiciary',
    examName: 'Maharashtra Judicial Service',
    year: '2024',
    description:
      'Maharashtra Judicial Service Prelims 2024 complete question paper with 200 questions and detailed explanations for key questions.',
    pages: 48,
    downloads: 19800,
    uploadDate: '2024-12-18T12:00:00.000Z',
    rating: 4.8,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Maharashtra', 'Prelims', '2024'],
  },
  {
    title: 'Bihar JS Prelims 2023 Question Paper',
    category: 'state-judiciary',
    examName: 'Bihar Judicial Service',
    year: '2023',
    description:
      'Bihar Judicial Service Prelims 2023 paper with 150 questions covering all subjects including state-specific amendments and local laws.',
    pages: 42,
    downloads: 14600,
    uploadDate: '2024-12-12T12:00:00.000Z',
    rating: 4.6,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Bihar', 'Prelims', '2023'],
  },
  {
    title: 'UPJSE Mains 2023 - Constitutional Law',
    category: 'mains',
    examName: 'UP Higher Judicial Service',
    year: '2023',
    description:
      'UPJSE Mains 2023 Constitutional Law paper with questions on fundamental rights, DPSP, emergency provisions, and landmark judgments.',
    pages: 35,
    downloads: 12800,
    uploadDate: '2024-12-08T12:00:00.000Z',
    rating: 4.7,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['UPJSE', 'Mains', 'Constitution'],
  },
  {
    title: 'ADPO Prelims 2024 Question Paper',
    category: 'adpo',
    examName: 'Assistant District Public Prosecutor',
    year: '2024',
    description:
      'ADPO Prelims 2024 examination paper with 100 questions focused on criminal law, prosecution procedures, and procedural aspects.',
    pages: 28,
    downloads: 9500,
    uploadDate: '2024-12-02T12:00:00.000Z',
    rating: 4.5,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['ADPO', 'Prelims', '2024'],
  },
  {
    title: 'Karnataka JS Mains 2023 - Civil Law',
    category: 'state-judiciary',
    examName: 'Karnataka Judicial Service',
    year: '2023',
    description:
      'Karnataka JS Mains 2023 Civil Law paper covering CPC, Evidence Act, Contract Act, and Karnataka-specific civil laws.',
    pages: 40,
    downloads: 11200,
    uploadDate: '2024-11-25T12:00:00.000Z',
    rating: 4.6,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Karnataka', 'Mains', 'Civil Law'],
  },
  {
    title: 'Delhi HJS Interview Questions 2024',
    category: 'interview',
    examName: 'Delhi Higher Judicial Service',
    year: '2024',
    description:
      'Compilation of frequently asked interview questions in Delhi HJS 2024 with suggested answers and key points to remember.',
    pages: 25,
    downloads: 8900,
    uploadDate: '2024-11-20T12:00:00.000Z',
    rating: 4.8,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Delhi HJS', 'Interview', '2024'],
  },
  {
    title: 'Gujarat JS Prelims 2024',
    category: 'state-judiciary',
    examName: 'Gujarat Judicial Service',
    year: '2024',
    description:
      'Gujarat Judicial Service Prelims 2024 complete paper with 150 questions and detailed solutions for better understanding.',
    pages: 44,
    downloads: 13700,
    uploadDate: '2024-11-15T12:00:00.000Z',
    rating: 4.7,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Gujarat', 'Prelims', '2024'],
  },
  {
    title: 'All India HJS Prelims 2023 Paper',
    category: 'higher-judiciary',
    examName: 'Higher Judicial Service',
    year: '2023',
    description:
      'Higher Judicial Service Prelims 2023 question paper with advanced level questions on constitutional law, administrative law, and jurisprudence.',
    pages: 52,
    downloads: 16300,
    uploadDate: '2024-11-10T12:00:00.000Z',
    rating: 4.9,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['HJS', 'Higher Judiciary', '2023'],
  },
]

export const seedPreviousYearQuestions = async (payload: Payload, req: PayloadRequest) => {
  payload.logger.info('Seeding Previous Year Questions...')

  // Seed Global Page Data
  try {
    await payload.updateGlobal({
      slug: 'previous-year-questions-page',
      data: {
        hero: {
          title: 'Previous Year Questions',
          badgeText: 'Free Question Papers',
          description:
            'Download previous year question papers from various judiciary examinations across India. Practice with authentic papers to understand exam patterns and improve your preparation.',
        },
        enableGating: false,
      },
      req,
    })
    payload.logger.info('Seeded Previous Year Questions Page Global.')
  } catch (error) {
    payload.logger.error(`Error seeding Previous Year Questions Page Global: ${error}`)
  }

  // Seed Collection Data
  for (const paper of papersData) {
    const existingPaper = await payload.find({
      collection: 'previous-year-questions',
      where: {
        title: {
          equals: paper.title,
        },
      },
      limit: 1,
      req,
    })

    if (existingPaper.docs.length > 0) {
      payload.logger.info(`Paper "${paper.title}" already exists. Skipping.`)
      continue
    }

    await payload.create({
      collection: 'previous-year-questions',
      data: {
        ...paper,
        category: paper.category as any,
        tags: paper.tags.map((tag) => ({ tag })),
      },
      req,
    })

    payload.logger.info(`Created paper: "${paper.title}"`)
  }

  payload.logger.info('Previous Year Questions seeding completed.')
}
