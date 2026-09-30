import type { Payload, PayloadRequest } from 'payload'

const notesData = [
  {
    title: 'Complete IPC Notes 2025',
    category: 'criminal-law',
    description:
      'Comprehensive notes on Indian Penal Code with all sections, latest amendments, and important case laws. Perfect for judiciary exams preparation.',
    pages: 250,
    downloadCount: 15420,
    uploadDate: '2025-01-15T12:00:00.000Z',
    rating: 4.9,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['IPC', 'Criminal Law', 'Amendments 2024'],
  },
  {
    title: 'CrPC Quick Revision Notes',
    category: 'criminal-law',
    description:
      'Concise notes covering Code of Criminal Procedure with flowcharts, important provisions, and recent amendments for last-minute revision.',
    pages: 180,
    downloadCount: 12350,
    uploadDate: '2025-01-10T12:00:00.000Z',
    rating: 4.8,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['CrPC', 'Quick Revision', 'Flowcharts'],
  },
  {
    title: 'Constitutional Law Essentials',
    category: 'constitution',
    description:
      'Essential notes on Constitution of India covering fundamental rights, DPSP, important articles, and landmark constitutional judgments.',
    pages: 320,
    downloadCount: 18900,
    uploadDate: '2025-01-05T12:00:00.000Z',
    rating: 4.9,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Constitution', 'Fundamental Rights', 'DPSP'],
  },
  {
    title: 'CPC Complete Guide 2025',
    category: 'civil-law',
    description:
      'Detailed notes on Civil Procedure Code with order-wise analysis, important provisions, and practical applications with examples.',
    pages: 280,
    downloadCount: 11200,
    uploadDate: '2024-12-28T12:00:00.000Z',
    rating: 4.7,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['CPC', 'Civil Procedure', 'Order-wise'],
  },
  {
    title: 'Contract Act Study Material',
    category: 'contracts',
    description:
      'Comprehensive notes on Indian Contract Act covering all sections, case laws, illustrations, and comparative analysis with practical examples.',
    pages: 200,
    downloadCount: 9870,
    uploadDate: '2024-12-20T12:00:00.000Z',
    rating: 4.8,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Contract Act', 'Case Laws', 'Illustrations'],
  },
  {
    title: 'Evidence Act Notes with Case Laws',
    category: 'evidence',
    description:
      'Detailed notes on Indian Evidence Act with section-wise explanation, important case laws, and practice questions for better understanding.',
    pages: 220,
    downloadCount: 10500,
    uploadDate: '2024-12-15T12:00:00.000Z',
    rating: 4.8,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Evidence Act', 'Case Laws', 'Practice Questions'],
  },
  {
    title: 'Current Affairs for Judiciary (Jan 2025)',
    category: 'current-affairs',
    description:
      'Monthly compilation of important current affairs, recent judgments, amendments, and legal developments relevant for judiciary exams.',
    pages: 80,
    downloadCount: 8900,
    uploadDate: '2025-01-01T12:00:00.000Z',
    rating: 4.6,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Current Affairs', 'Monthly', '2025'],
  },
  {
    title: 'Limitation Act Complete Notes',
    category: 'civil-law',
    description:
      'Complete notes on Limitation Act with schedule analysis, important provisions, exceptions, and frequently asked questions.',
    pages: 120,
    downloadCount: 7650,
    uploadDate: '2024-12-25T12:00:00.000Z',
    rating: 4.7,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Limitation Act', 'Schedule', 'FAQs'],
  },
  {
    title: 'Transfer of Property Act Guide',
    category: 'civil-law',
    description:
      'Comprehensive guide to Transfer of Property Act covering all chapters, important sections, case laws, and conceptual clarity.',
    pages: 190,
    downloadCount: 6800,
    uploadDate: '2024-12-18T12:00:00.000Z',
    rating: 4.6,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['TPA', 'Property Law', 'Concepts'],
  },
  {
    title: 'Specific Relief Act Notes',
    category: 'civil-law',
    description:
      'Detailed notes on Specific Relief Act with remedies, important sections, case laws, and comparison with other civil laws.',
    pages: 110,
    downloadCount: 5900,
    uploadDate: '2024-12-10T12:00:00.000Z',
    rating: 4.5,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Specific Relief', 'Remedies', 'Comparison'],
  },
  {
    title: 'Law of Torts Comprehensive Notes',
    category: 'civil-law',
    description:
      'Complete notes on Law of Torts covering all essential torts, defenses, remedies, and landmark judgments with practical applications.',
    pages: 160,
    downloadCount: 7200,
    uploadDate: '2024-12-05T12:00:00.000Z',
    rating: 4.7,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Torts', 'Defenses', 'Remedies'],
  },
  {
    title: 'Important Amendments 2024',
    category: 'current-affairs',
    description:
      'Complete compilation of all important legal amendments made in 2024 across various laws with detailed analysis and implications.',
    pages: 95,
    downloadCount: 11200,
    uploadDate: '2024-11-30T12:00:00.000Z',
    rating: 4.8,
    isFree: true,
    externalDownloadLink: 'https://pdfobject.com/pdf/sample.pdf',
    tags: ['Amendments', '2024', 'Analysis'],
  },
]

export const seedNotes = async (payload: Payload, req: PayloadRequest) => {
  payload.logger.info('Seeding Notes...')

  const categoryLabels: Record<string, string> = {
    'criminal-law': 'Criminal Law',
    'civil-law': 'Civil Law',
    'constitution': 'Constitution',
    contracts: 'Contract & Tort',
    evidence: 'Evidence Act',
    'current-affairs': 'Current Affairs',
  }

  const categoryDocMap: Record<string, string | number> = {}

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
      categoryDocMap[slug] = existing.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'resource-categories',
        data: {
          title,
          slug,
        },
        req,
      })
      categoryDocMap[slug] = created.id
    }
  }

  for (const note of notesData) {
    const existingNote = await payload.find({
      collection: 'notes',
      where: {
        title: {
          equals: note.title,
        },
      },
      limit: 1,
      req,
    })

    if (existingNote.docs.length > 0) {
      payload.logger.info(`Note "${note.title}" already exists. Skipping.`)
      continue
    }

    const catId = categoryDocMap[note.category]

    await payload.create({
      collection: 'notes',
      data: {
        ...note,
        category: (catId || note.category) as any,
        tags: note.tags.map((tag) => ({ tag })),
      },
      req,
    })

    payload.logger.info(`Created note: "${note.title}"`)
  }

  payload.logger.info('Notes seeding completed.')
}
