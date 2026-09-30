import { getPayload } from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs/promises'
import { seedResources } from './src/endpoints/seed/resources.seeder'

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function seedLocalFile(payload: any, filename: string, alt: string) {
  const filePath = path.resolve(process.cwd(), 'src/endpoints/seed', filename)
  try {
    const data = await fs.readFile(filePath)
    const extension = filename.split('.').pop() || ''
    let mimetype = `image/${extension}`

    if (extension === 'jpg') mimetype = 'image/jpeg'
    else if (extension === 'ico') mimetype = 'image/x-icon'
    else if (extension === 'webp') mimetype = 'image/webp'

    console.log(`Seeding media: ${filename} (${mimetype})...`)

    return await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        name: filename,
        data,
        mimetype,
        size: data.byteLength,
      },
    })
  } catch (err) {
    console.warn(`Failed to seed media ${filename}`, err)
    return null
  }
}

const updateHomeGlobal = async () => {
  // Dynamically import config to ensure env vars are loaded first
  const { default: configPromise } = await import('./src/payload.config')

  const payload = await getPayload({ config: configPromise })

  console.log('Seeding Resources (Safe Mode)...')
  // Create a mock request
  const req = { payload, context: { disableRevalidate: true } } as any
  await seedResources(payload, req)

  console.log('Updating Home Global Resources Section...')

  try {
    const existingHome = await payload.findGlobal({
      slug: 'home',
    })

    // Repair Logic due to validation errors
    const updates: any = { ...existingHome }

    // 1. Repair Slides (needs at least 1)
    if (!updates.slides || updates.slides.length === 0) {
      console.log('Repairing missing slides...')
      const media = await payload.find({ collection: 'media', limit: 1 })

      let sliderImageId
      if (media.docs.length > 0) {
        sliderImageId = media.docs[0].id
      } else {
        console.log('No media found, seeding slider1.jpg...')
        const newMedia = await seedLocalFile(payload, 'slider1.jpg', 'Hero Slider')
        if (newMedia) sliderImageId = newMedia.id
      }

      if (sliderImageId) {
        updates.slides = [
          {
            title: 'Default Slide',
            image: sliderImageId,
            features: [{ text: 'Feature 1' }],
          },
        ]
      } else {
        console.warn('CRITICAL: Could not find or create media for slides.')
      }
    }

    // 2. Repair Popular Courses Link
    if (!updates.popularCourses) updates.popularCourses = {}
    if (!updates.popularCourses.viewAllLink) updates.popularCourses.viewAllLink = {}
    if (!updates.popularCourses.viewAllLink.label) {
      updates.popularCourses.viewAllLink.label = 'View All Courses'
      updates.popularCourses.viewAllLink.url = '/courses'
      updates.popularCourses.viewAllLink.type = 'custom'
    }

    // 3. Repair Success Stories Link
    if (!updates.successStories) updates.successStories = {}
    if (!updates.successStories.viewAllLink) updates.successStories.viewAllLink = {}
    if (!updates.successStories.viewAllLink.label) {
      updates.successStories.viewAllLink.label = 'View All Success Stories'
      updates.successStories.viewAllLink.url = '/success-stories'
      updates.successStories.viewAllLink.type = 'custom'
    }

    // 4. Set Resources Section
    updates.resources = {
      title: 'Free Study Resources',
      subtitle: 'Expert Guidance For Free',
      description: 'Access our complete library of free video lectures.',
      fetchType: 'latest',
      limit: 6,
      viewAllLink: {
        type: 'custom',
        url: '/free-study-online',
        label: 'View All Resources',
      },
    }

    await payload.updateGlobal({
      slug: 'home',
      data: updates,
      context: { disableRevalidate: true },
    })

    console.log('Successfully updated Home Global!')
    process.exit(0)
  } catch (error) {
    console.error('Failed to update Home Global:', JSON.stringify(error, null, 2))
    process.exit(1)
  }
}

updateHomeGlobal()
