import { getPayload } from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const envPath = path.resolve(dirname, '../.env.development')

// 1. Load Environment Variables explicitly BEFORE importing config
console.log('Loading env from:', envPath)
dotenv.config({
  path: envPath,
})

// Fallback if dotenv fails
if (!process.env.PAYLOAD_SECRET) {
  console.warn('PAYLOAD_SECRET not found in env, using fallback.')
  process.env.PAYLOAD_SECRET = '795c60a66d0bb081fa454124'
}

console.log('PAYLOAD_SECRET set:', !!process.env.PAYLOAD_SECRET)

const fixHomeData = async () => {
  try {
    // 2. Dynamic import of config to ensure env vars are ready
    // We assume @payload-config alias resolves to the config file default export
    // In many Payload setups with tsx, we might need to import the file directly if alias fails in this context,
    // but usually tsx handles tsconfig paths if configured.
    // Let's try importing the file directly to be safe as aliases can be tricky in standalone scripts.
    const configPath = path.resolve(dirname, '../src/payload.config.ts')
    console.log('Importing config from:', configPath)

    // We need to use valid file URL for dynamic import on Windows
    const configUrl = `file://${configPath.replace(/\\/g, '/')}`
    const configModule = await import(configUrl)
    const configPromise = configModule.default

    const payload = await getPayload({ config: configPromise })
    payload.logger.info('Starting Home Global Fix...')

    // 1. Fetch Courses
    const courses = await payload.find({
      collection: 'courses',
      limit: 3,
    })
    payload.logger.info(`Found ${courses.docs.length} courses`)

    // 2. Fetch Success Stories
    const stories = await payload.find({
      collection: 'success-stories',
      limit: 3,
    })
    payload.logger.info(`Found ${stories.docs.length} success stories`)

    // 3. Update Home Global
    const home = await payload.updateGlobal({
      slug: 'home',
      data: {
        sections: {
          popularCourses: {
            title: 'Popular Courses',
            description: 'Explore our top-rated courses.',
            fetchType: 'custom',
            selectedCourses: courses.docs.map((doc) => doc.id),
          },
          successStories: {
            title: 'Success Stories',
            description: 'See what our students are achieving.',
            fetchType: 'custom',
            selectedStories: stories.docs.map((doc) => doc.id),
          },
          faqs: {
            title: 'Frequently Asked Questions',
            description: 'Common queries answered.',
          },
        },
      } as any,
      context: { disableRevalidate: true },
    })

    payload.logger.info('Successfully updated Home Global!')
    process.exit(0)
  } catch (error) {
    console.error('Error fixing Home global:', error)
    process.exit(1)
  }
}

fixHomeData()
