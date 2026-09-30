import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { getHomeSeederData } from './home.seeder'
import { getCourseSeederData } from './course.seeder'
import { getCoursePageSeederData } from './course-page.seeder'
import { getSuccessStoriesPageSeederData } from './success-stories-page.seeder'
import { successStorySeederData } from './success-story.seeder'
import { headerSeederData } from './header.seeder'
import { footerSeederData } from './footer.seeder'
import { getBrandingSeederData } from './branding.seeder'
import { faqSeederData } from './faq.seeder'
import { formSeederData } from './form.seeder'
import { seedResources } from './resources.seeder'
import { eventSeeder } from './events.seeder'
import { seedPosts } from './posts.seeder'
import { booksSeederData, booksPageSeederData } from './books.seeder'
import { aboutUsSeederData } from './about-us.seeder'
import { seedSyllabusStates } from './syllabus-states.seeder'
import { seedVacancies } from './vacancies.seeder'
import { seedNotes } from './notes.seeder'
import { seedNotesPage } from './notes-page.seeder'
import { seedPreviousYearQuestions } from './previous-year-questions.seeder'
import { seedPrivacyPolicy } from './privacy-policy.seeder'
import { seedExtraGlobals } from './extra-globals.seeder'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  try {
    // 1. Reset Globals to release references
    payload.logger.info(`— Resetting globals...`)
    const globalsToReset: GlobalSlug[] = [
      'branding',
      'home',
      'header',
      'footer',
      'course',
      'success-stories-page',
      'books-page',
      'about-us',
      'free-study',
      'syllabus-vacancy-global',
      'blog',
      'events-page',
      'contact-page',
      'notes-page',
      'previous-year-questions-page',
    ]
    for (const slug of globalsToReset) {
      try {
        await payload.updateGlobal({
          slug,
          data: {} as any,
          req,
        })
      } catch (err) {
        // Validation might fail, ignoring
      }
    }

    // 2. Clear collections (in order)
    payload.logger.info(`— Clearing collections...`)
    const collectionsToClear: CollectionSlug[] = [
      'form-submissions',
      'success-stories',
      'courses',
      'posts',
      'pages',
      'categories',
      'faqs',
      'forms',
      'media',
      'resources',
      'resource-categories',
      'books',
      'vacancies',
      'syllabus-states',
      'popups',
      'webhook-logs',
      'enrollments',
      'notes',
      'previous-year-questions',
      'events',
    ]

    for (const collection of collectionsToClear) {
      try {
        payload.logger.info(`  — Clearing ${collection}...`)
        await payload.db.deleteMany({ collection, req, where: {} })
      } catch (err) {
        payload.logger.warn(`  — Could not clear ${collection}`)
      }
    }

    // 3. Handle Admin User
    payload.logger.info(`— Checking admin user...`)
    const existingAdmin = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@aashayein.com',
        },
      },
      req,
    })

    if (existingAdmin.docs.length === 0) {
      payload.logger.info(`— Creating demo admin...`)
      await payload.create({
        collection: 'users',
        data: {
          name: 'Demo Admin',
          email: 'admin@aashayein.com',
          password: 'password',
        },
        req,
      })
    }

    // 4. Seed NEW Media from local files
    payload.logger.info(`— Seeding local media...`)
    const logoDoc = await seedLocalFile(payload, req, 'logo.webp', 'Aashayein Logo')

    let faviconDoc
    try {
      faviconDoc = await seedLocalFile(payload, req, 'favicon.ico', 'Aashayein Favicon')
    } catch (err) {
      payload.logger.warn(`  — Favicon failed, using logo fallback.`)
      faviconDoc = logoDoc
    }

    const slider1Doc = await seedLocalFile(payload, req, 'slider1.jpg', 'Hero Slider 1', logoDoc)
    const imageHero1Doc = await seedLocalFile(
      payload,
      req,
      'image-hero1.webp',
      'Judiciary Coaching 1',
      logoDoc,
    )
    const imagePost1Doc = await seedLocalFile(
      payload,
      req,
      'image-post1.webp',
      'Community App',
      logoDoc,
    )

    // 5. Seed dependent collections
    payload.logger.info(`— Seeding forms...`)
    const formDocs = []
    let heroForm
    try {
      for (const formData of formSeederData) {
        try {
          const form = await payload.create({
            collection: 'forms',
            data: formData,
            req,
          })
          formDocs.push(form)
        } catch (e) {
          payload.logger.error({ msg: 'Failed to seed a form', err: e })
        }
      }
      heroForm = formDocs.find((f) => f.title === 'Hero Lead Form')
    } catch (e) {
      payload.logger.error({ msg: 'Error in form seeding block', err: e })
    }

    payload.logger.info(`— Seeding FAQs...`)
    const faqDocs = []
    for (const faq of faqSeederData) {
      const doc = await payload.create({
        collection: 'faqs',
        data: faq,
        req,
      })
      faqDocs.push(doc)
    }

    payload.logger.info(`— Seeding Success Stories...`)
    for (const story of successStorySeederData) {
      try {
        await payload.create({
          collection: 'success-stories',
          data: {
            ...story,
            image: imageHero1Doc.id,
          },
          req,
        })
      } catch (err) {
        payload.logger.error({
          msg: `Failed to create success story: ${story.name}`,
          err,
          data: story,
        })
      }
    }

    payload.logger.info(`— Seeding Courses...`)
    const coursesData = getCourseSeederData({
      thumbnail: imageHero1Doc as any,
      instructorImage: imagePost1Doc as any,
    })
    for (const course of coursesData) {
      await payload.create({
        collection: 'courses',
        data: course,
        req,
      })
    }

    payload.logger.info(`— Seeding Books...`)
    const booksData = booksSeederData(imageHero1Doc.id, imagePost1Doc.id)
    const createdBooks: Record<string, string | number> = {}

    for (const book of booksData) {
      const doc = await payload.create({
        collection: 'books',
        data: book as any,
        req,
      })
      createdBooks[book.slug] = doc.id
    }

    payload.logger.info(`— Seeding Posts and Categories...`)
    await seedPosts(payload, req, {
      heroImageId: imageHero1Doc.id,
      postImageId: imagePost1Doc.id,
    })

    // 6. Update Globals
    payload.logger.info(`— Updating Branding global...`)
    const brandingData = getBrandingSeederData({
      logo: logoDoc as any,
      favicon: faviconDoc as any,
    })
    await payload.updateGlobal({
      slug: 'branding',
      data: brandingData as any,
      req,
    })

    payload.logger.info(`— Updating Home global...`)
    const homeData = getHomeSeederData({
      carouselImages: [slider1Doc as any, imageHero1Doc as any],
      appImage: imagePost1Doc as any,
      selectedFaqs: faqDocs.map((f) => f.id),
    })
    await payload.updateGlobal({
      slug: 'home',
      data: {
        ...homeData,
        leadForm: heroForm?.id,
      } as any,
      req,
    })

    payload.logger.info(`— Updating Header global...`)
    await payload.updateGlobal({
      slug: 'header',
      data: headerSeederData as any,
      req,
    })

    payload.logger.info(`— Updating Footer global...`)
    await payload.updateGlobal({
      slug: 'footer',
      data: footerSeederData as any,
      req,
    })

    payload.logger.info(`— Updating Course global...`)
    const coursePageData = getCoursePageSeederData({
      communityImage: imageHero1Doc as any,
      selectedFaqs: faqDocs.map((f) => f.id),
    })
    await payload.updateGlobal({
      slug: 'course',
      data: coursePageData as any,
      req,
    })

    payload.logger.info(`— Updating Success Stories Page global...`)
    const successStoriesPageData = getSuccessStoriesPageSeederData()
    await payload.updateGlobal({
      slug: 'success-stories-page',
      data: successStoriesPageData as any,
      req,
    })

    payload.logger.info(`— Updating Books Page global...`)
    await payload.updateGlobal({
      slug: 'books-page',
      data: booksPageSeederData as any,
      req,
    })

    payload.logger.info(`— Updating About Us global...`)
    await payload.updateGlobal({
      slug: 'about-us',
      data: aboutUsSeederData as any,
      req,
    })

    await seedSyllabusStates(payload, req)
    await seedVacancies(payload, req)
    await seedResources(payload, req)
    await eventSeeder(payload, req)
    await seedNotes(payload, req)
    await seedNotesPage(payload, req)
    await seedPreviousYearQuestions(payload, req)
    await seedPrivacyPolicy(payload, req)
    await seedExtraGlobals(payload, req)

    payload.logger.info('Seeded database successfully!')
  } catch (err) {
    if (err instanceof Error) {
      payload.logger.error(`Seeding failed: ${err.message}`)
      if ((err as any).data) {
        payload.logger.error(`Validation data: ${JSON.stringify((err as any).data, null, 2)}`)
      }
    } else {
      payload.logger.error('Seeding failed with an unknown error')
    }
    throw err
  }
}

async function seedLocalFile(
  payload: Payload,
  req: PayloadRequest,
  filename: string,
  alt: string,
  fallbackDoc?: any,
) {
  const filePath = path.resolve(dirname, filename)
  try {
    // 1. Check if file already exists using explicit find
    let existingFile
    try {
      existingFile = await payload.find({
        collection: 'media',
        where: {
          filename: {
            equals: filename,
          },
        },
        limit: 1,
        // req, // Removing req to avoid Drizzle context issues
      })
    } catch (e) {
      existingFile = { docs: [] }
    }

    if (existingFile.docs.length > 0) {
      payload.logger.info(
        `  — Media ${filename} already exists, reusing: ${existingFile.docs[0].id}`,
      )
      return existingFile.docs[0]
    }

    const data = await fs.readFile(filePath)
    const extension = filename.split('.').pop() || ''
    let mimetype = `image/${extension}`

    if (extension === 'jpg') mimetype = 'image/jpeg'
    else if (extension === 'ico') mimetype = 'image/x-icon'
    else if (extension === 'webp') mimetype = 'image/webp'

    payload.logger.info(`  — Seeding media: ${filename} (${mimetype})...`)

    try {
      return await payload.create({
        collection: 'media',
        data: { alt },
        file: {
          name: filename,
          data,
          mimetype,
          size: data.byteLength,
        },
        // req, // Potentially causing context issues with Drizzle in some versions/setups
        overrideAccess: true,
      })
    } catch (err) {
      payload.logger.warn(`    — First attempt failed for ${filename}, retrying...`)
      try {
        return await payload.create({
          collection: 'media',
          data: { alt },
          file: {
            name: filename,
            data,
            mimetype,
            size: data.byteLength,
          },
          overrideAccess: true,
        })
      } catch (retryErr) {
        if (fallbackDoc) {
          payload.logger.warn(`    — Failed to seed ${filename}, using fallback (logo).`)
          return fallbackDoc
        }
        throw retryErr
      }
    }
  } catch (err) {
    if (fallbackDoc) {
      payload.logger.warn(`    — Failed to read/seed ${filename}, using fallback (logo).`)
      return fallbackDoc
    }
    payload.logger.error(
      `  — Failed to seed media ${filename}: ${err instanceof Error ? err.message : 'Unknown error'}`,
    )
    throw err
  }
}
