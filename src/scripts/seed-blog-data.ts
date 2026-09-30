import { getPayload } from 'payload'
import configPromise from '@payload-config'
import path from 'path'
import fs from 'fs'

const seedBlogData = async () => {
  try {
    const payload = await getPayload({ config: configPromise })
    console.log('--- Seeding Blog Data ---')

    // 1. Media
    let mediaId
    const existingMedia = await payload.find({
      collection: 'media',
      where: { filename: { equals: 'placeholder.jpg' } },
    })

    if (existingMedia.docs.length > 0) {
      mediaId = existingMedia.docs[0].id
      console.log('Found existing media:', mediaId)
    } else {
      const filePath = path.resolve(process.cwd(), 'public/placeholder.jpg')
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath)
        const media = await payload.create({
          collection: 'media',
          data: { alt: 'Placeholder' },
          file: {
            data: fileBuffer,
            name: 'placeholder.jpg',
            mimetype: 'image/jpeg',
            size: fileBuffer.length,
          },
        })
        mediaId = media.id
        console.log('Created new media:', mediaId)
      } else {
        console.warn('public/placeholder.jpg not found, skipping media creation')
      }
    }

    // 2. Categories
    const categoriesToSeed = [
      { title: 'Legal Insights', group: 'blogs' },
      { title: 'Weekly Roundup', group: 'current-affairs' },
      { title: 'Recent Verdicts', group: 'judgments' },
    ]

    const categoryIds: Record<string, string | number> = {}

    for (const cat of categoriesToSeed) {
      const existing = await payload.find({
        collection: 'categories',
        where: { title: { equals: cat.title } },
      })
      if (existing.docs.length > 0) {
        categoryIds[cat.group] = existing.docs[0].id
        console.log(`Found existing category: ${cat.title}`)
      } else {
        // @ts-expect-error: seed script loose typing
        const created = await payload.create({
          collection: 'categories',
          data: { title: cat.title, group: cat.group as any },
        })
        categoryIds[cat.group] = created.id
        console.log(`Created category: ${cat.title}`)
      }
    }

    // 3. Posts
    const postsToSeed = [
      {
        title: 'How to Prepare for Judiciary Exams',
        excerpt: 'A comprehensive guide to cracking the judiciary exams with smart strategies.',
        featured: true,
        categoryGroup: 'blogs',
        content: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'This is a sample blog post about preparation strategies.',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
      },
      {
        title: 'Supreme Court Landmark Judgments 2024',
        excerpt: 'Analyze the most important judgments delivered by the SC this year.',
        featured: false,
        categoryGroup: 'judgments',
        content: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Detailed analysis of recent judgments...',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
      },
      {
        title: 'Weekly Current Affairs - Jan Week 4',
        excerpt: 'Stay updated with these crucial legal developments.',
        featured: false,
        categoryGroup: 'current-affairs',
        content: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Current affairs updates...',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
      },
    ]

    for (const post of postsToSeed) {
      const existing = await payload.find({
        collection: 'posts',
        where: { title: { equals: post.title } },
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'posts',
          data: {
            title: post.title,
            excerpt: post.excerpt,
            featured: post.featured,
            categories: categoryIds[post.categoryGroup] ? [categoryIds[post.categoryGroup]] : [],
            content: post.content,
            heroImage: mediaId,
            // valid slug generation usually handled by hook, but we can rely on it or auto-gen
          } as any,
        })
        console.log(`Created post: ${post.title}`)
      } else {
        console.log(`Post already exists: ${post.title}`)
      }
    }

    console.log('Seeding completed successfully.')
  } catch (error) {
    console.error('Seeding failed:', error)
  }
  process.exit(0)
}

seedBlogData()
