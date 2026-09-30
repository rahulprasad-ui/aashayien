import { type Payload, type PayloadRequest } from 'payload'

export const seedPosts = async (
  payload: Payload,
  req: PayloadRequest,
  {
    heroImageId,
    postImageId,
  }: {
    heroImageId: string | number
    postImageId: string | number
  },
) => {
  payload.logger.info('Seeding Categories...')

  const categoriesData = [
    { title: 'Judiciary Blogs', slug: 'judiciary-blogs', group: 'blogs' },
    { title: 'Landmark Judgments', slug: 'landmark-judgments', group: 'judgments' },
    { title: 'Current Affairs', slug: 'current-affairs', group: 'current-affairs' },
  ] as const

  const categoryDocs: Record<string, string | number> = {}

  for (const cat of categoriesData) {
    const doc = await payload.create({
      collection: 'categories',
      data: cat,
      req,
    })
    categoryDocs[cat.slug] = doc.id
  }

  payload.logger.info('Seeding Posts...')

  const postsData = [
    {
      title: 'How to Prepare for Judiciary Exams 2025',
      slug: 'judiciary-preparation-2025',
      excerpt:
        'A comprehensive guide for beginners to start their judiciary journey with confidence.',
      categories: [categoryDocs['judiciary-blogs']],
      heroImage: heroImageId,
      publishedAt: new Date().toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The journey to becoming a judicial officer requires dedication, strategic planning, and the right guidance. In this blog post, we discuss the essential steps every aspirant should take.',
                },
              ],
            },
          ],
        },
      },
      _status: 'published',
    },
    {
      title: 'Understanding the Basic Structure Doctrine',
      slug: 'basic-structure-doctrine',
      excerpt:
        'Analyzing the landmark Kesavananda Bharati case and its impact on Indian Constitution.',
      categories: [categoryDocs['landmark-judgments']],
      heroImage: postImageId,
      publishedAt: new Date().toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The Basic Structure doctrine is one of the most important developments in Indian constitutional law. Established in the Kesavananda Bharati judgment, it limits the amending power of Parliament.',
                },
              ],
            },
          ],
        },
      },
      _status: 'published',
    },
    {
      title: 'Latest Updates in Criminal Law Reforms 2024',
      slug: 'criminal-law-reforms-2024',
      excerpt: 'Key changes in BNS, BNSS, and BSA explained for competitive exams.',
      categories: [categoryDocs['judiciary-blogs'], categoryDocs['current-affairs']],
      heroImage: heroImageId,
      publishedAt: new Date().toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The new criminal laws have brought significant changes to the Indian legal landscape. Understanding these changes is crucial for anyone preparing for legal examinations.',
                },
              ],
            },
          ],
        },
      },
      _status: 'published',
    },
    {
      title: 'Landmark Judgment on Right to Privacy',
      slug: 'right-to-privacy-judgment',
      excerpt:
        'Justice K.S. Puttaswamy (Retd.) vs Union of India: A revolutionary step for fundamental rights.',
      categories: [categoryDocs['landmark-judgments']],
      heroImage: postImageId,
      publishedAt: new Date().toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The Supreme Court of India unanimously recognized the Right to Privacy as a fundamental right under the Constitution. This judgment has far-reaching implications for digital rights and personal liberty.',
                },
              ],
            },
          ],
        },
      },
      _status: 'published',
    },
  ]

  for (const post of postsData) {
    await payload.create({
      collection: 'posts',
      data: post as any,
      req,
    })
  }

  payload.logger.info('Posts and Categories Seeding Completed.')
}
