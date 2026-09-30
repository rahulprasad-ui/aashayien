import { PayloadHandler } from 'payload'
import { sql } from 'drizzle-orm'
import { hasModulePermission } from '@/access/rbac'

export const syncClassplus: PayloadHandler = async (req) => {
  if (!hasModulePermission(req.user, 'courses', 'update')) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const token = process.env.CLASSPLUS_TOKEN || 'YOUR_CLASSPLUS_TOKEN'
  const orgId = process.env.CLASSPLUS_ORG_ID || '11443'

  try {
    const classplusUrl =
      'https://api.classplusapp.com/v2/course/preview/similar/eyJ0dXRvcklkIjpudWxsLCJvcmdJZCI6MTE0NDMsImNhdGVnb3J5SWQiOm51bGx9?tabCategoryId=1&limit=100&offset=0'

    const response = await fetch(classplusUrl, {
      method: 'GET',
      headers: {
        'x-access-token': token,
        orgid: orgId,
        accept: 'application/json',
        'user-agent': 'okhttp/4.9.1',
      },
    })

    if (!response.ok) {
      return Response.json(
        { error: `Classplus API returned ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    if (data.status !== 'success' || !data.data || !data.data.coursesData) {
      return Response.json({ error: 'Invalid response from Classplus API', data }, { status: 400 })
    }

    const coursesData = data.data.coursesData
    let syncedCount = 0

    for (const course of coursesData) {
      const { id, name, description, price, finalPrice, singlePaymentLink, imageUrl, categories } =
        course
      console.log(`Processing course ${id} - ${name}`)
      let existing: { docs: any[] } = { docs: [] }
      try {
        const db = (req.payload.db as any).drizzle as any
        if (db && db.execute) {
          const res = await db.execute(
            sql`SELECT id, thumbnail_id FROM courses WHERE classplus_id = ${id} OR slug = ${`classplus-${id}`} LIMIT 1`,
          )
          if (res.rows && res.rows.length > 0) {
            existing.docs = [{ id: res.rows[0].id, thumbnail: res.rows[0].thumbnail_id }]
          }
        } else {
          // Fallback if db.execute isn't available
          existing = await req.payload.find({
            collection: 'courses',
            where: {
              or: [{ classplusId: { equals: id } }, { slug: { equals: `classplus-${id}` } }],
            },
            limit: 1,
            select: {
              id: true,
              thumbnail: true,
            },
          })
        }
      } catch (findErr: any) {
        console.error(`Error in FIND for ${id}:`, findErr)
        throw findErr
      }

      let mediaId: number | null = null

      // Handle image upload if provided
      if (imageUrl) {
        try {
          const imgRes = await fetch(imageUrl)
          if (imgRes.ok) {
            const arrayBuffer = await imgRes.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const fileName = imageUrl.split('/').pop() || `course-${id}.jpg`
            const existingThumbnail = existing.docs[0]?.thumbnail

            // Extract mediaId if it exists
            const existingMediaId =
              typeof existingThumbnail === 'number'
                ? existingThumbnail
                : typeof existingThumbnail === 'object' && existingThumbnail !== null
                  ? (existingThumbnail as any).id
                  : null

            if (!existingMediaId) {
              // Create new media
              const uploadedMedia = await req.payload.create({
                collection: 'media',
                data: { alt: name || 'Course Thumbnail' },
                file: {
                  data: buffer,
                  name: fileName,
                  mimetype: imgRes.headers.get('content-type') || 'image/jpeg',
                  size: buffer.length,
                },
              })
              mediaId = uploadedMedia.id as number
            } else {
              // Update existing media
              const updatedMedia = await req.payload.update({
                collection: 'media',
                id: existingMediaId,
                data: { alt: name || 'Course Thumbnail' },
                file: {
                  data: buffer,
                  name: fileName,
                  mimetype: imgRes.headers.get('content-type') || 'image/jpeg',
                  size: buffer.length,
                },
              })
              mediaId = updatedMedia.id as number
            }
          }
        } catch (imgError: any) {
          console.error(`Error in IMAGE for ${id}:`, imgError)
        }
      }

      // Helper to generate a clean slug
      const slugify = (text: string) =>
        text
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')

      // Helper to generate relevant mock data based on course title
      const generateMockData = (title: string) => {
        const isLaw = /judiciary|law|app|clat|llb|evidence|ipc|cpc|crpc/i.test(title)
        const isMock = /mock|test|series/i.test(title)

        if (isLaw) {
          return {
            features: [
              { feature: 'Comprehensive Legal Coverage' },
              { feature: 'Live Interactive Sessions' },
              { feature: 'PDF Notes & Resources' },
              { feature: isMock ? 'Special Mock Test Analysis' : 'Expert Legal Insights' },
            ],
            highlights: [
              { title: 'Expert Faculty', description: 'Learn from top legal experts' },
              { title: 'Resource Rich', description: 'Extensive study materials provided' },
            ],
            learningOutcomes: [
              { outcome: 'Master core legal concepts' },
              { outcome: 'Prepare for competitive legal exams' },
              { outcome: 'Practical legal applications' },
            ],
            curriculum: [
              {
                title: 'Phase 1: Foundation',
                topics: [{ topic: 'Understanding the Legal Framework' }],
              },
              {
                title: 'Phase 2: Core Subjects',
                topics: [{ topic: 'Deep Dive into IPC & Evidence Act' }],
              },
            ],
          }
        }

        return {
          features: [{ feature: 'High quality content' }, { feature: 'Expert guidance' }],
          highlights: [{ title: 'Best in class', description: 'Premium course material' }],
          learningOutcomes: [
            { outcome: 'Learn key concepts' },
            { outcome: 'Apply knowledge effectively' },
          ],
          curriculum: [{ title: 'Module 1', topics: [{ topic: 'Introductory concepts' }] }],
        }
      }

      const mockData = generateMockData(name)

      // Map course data
      const coursePayload = {
        title: name,
        classplusId: id,
        slug: slugify(name), // SEO friendly slug from name
        price: finalPrice ? `₹${finalPrice}` : price ? `₹${price}` : '₹0',
        originalPrice: price && finalPrice && price !== finalPrice ? `₹${price}` : undefined,
        category: 'live' as const,
        // https://ndagj.courses.store/ - use this link
        enrollmentLink: `https://ndagj.courses.store/${id}`,
        instructor: {
          name: 'Nitesh Sir',
          title: 'Senior Legal Expert',
          bio: 'Expert in Judiciary and Competitive Exams with years of experience.',
        },
        courseMode: 'online' as const,
        thumbnail: mediaId as number,
        showGeneratedContent: true,
        // Using generated mock data
        features: mockData.features,
        highlights: mockData.highlights,
        learningOutcomes: mockData.learningOutcomes,
        curriculum: mockData.curriculum,
        demoVideos: [],
        faqs: [
          {
            question: 'Is this course suitable for beginners?',
            answer: 'Yes, this course starts from basics and goes to advanced levels.',
          },
        ],
        reviews: [
          {
            name: 'Happy Student',
            rating: 5,
            comment: 'Great course by Nitesh Sir!',
            date: new Date().toISOString(),
          },
        ],
      }

      // We enforce thumbnail logic since thumbnail is required for Courses
      // If thumbnail creation failed, we skip this course or attach a default one?
      // Since it's required, we have to provide a valid mediaId. If we don't have one, we MUST skip or throw.
      if (!coursePayload.thumbnail) {
        console.warn(`Skipping course ${id} because thumbnail upload failed or is missing.`)
        continue
      }

      try {
        // Delete arrays before update/create to let Payload handle defaults natively without _uuid/find query bug
        const finalPayload = { ...coursePayload }
        delete (finalPayload as any).features
        delete (finalPayload as any).highlights
        delete (finalPayload as any).learningOutcomes
        delete (finalPayload as any).curriculum
        delete (finalPayload as any).demoVideos
        delete (finalPayload as any).faqs
        delete (finalPayload as any).reviews

        if (existing.docs.length > 0) {
          console.log(`Updating existing course ${existing.docs[0].id}`)

          try {
            await req.payload.update({
              collection: 'courses',
              id: existing.docs[0].id,
              data: finalPayload,
              draft: false,
            })
          } catch (updateErr: any) {
            console.warn(
              `Update failed for ${existing.docs[0].id}, attempting wipe and recreate:`,
              updateErr.message,
            )
            // If the row relations are corrupted internally by drizzle, update throws errors. Wipe the row manually and recreate.
            const db = (req.payload.db as any).drizzle as any
            if (db && db.execute) {
              await db.execute(sql`DELETE FROM courses WHERE id = ${existing.docs[0].id}`)
            }
            await req.payload.create({
              collection: 'courses',
              data: finalPayload,
              draft: false,
            })
          }
        } else {
          console.log(`Creating new course ${coursePayload.title}`)

          await req.payload.create({
            collection: 'courses',
            data: finalPayload,
            draft: false,
          })
        }
      } catch (upsertErr: any) {
        console.error(`Error in UPSERT for ${id}:`, upsertErr)
        throw upsertErr
      }

      syncedCount++
    }

    return Response.json({ success: true, syncedCount, total: coursesData.length })
  } catch (error: any) {
    console.error('Final error syncing Classplus courses:', error)
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 })
  }
}
