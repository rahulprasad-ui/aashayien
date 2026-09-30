import dotenv from 'dotenv'
import path from 'path'
import { createLocalReq } from 'payload'
import { seedPreviousYearQuestions } from './endpoints/seed/previous-year-questions.seeder'

dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })

const runSeed = async () => {
  try {
    const { getPayload } = await import('payload')
    const { default: configPromise } = await import('@payload-config')

    const payload = await getPayload({ config: configPromise })

    // Helper to get admin user for context if needed
    let user
    try {
      const existingAdmin = await payload.find({
        collection: 'users',
        where: { email: { equals: 'admin@aashayein.com' } },
        limit: 1,
      })
      if (existingAdmin.docs.length > 0) {
        user = existingAdmin.docs[0]
      }
    } catch (e) {
      // Ignore
    }

    const req = await createLocalReq(
      {
        user: user ? { ...user, collection: 'users' } : undefined,
        context: { disableRevalidate: true },
      },
      payload,
    )

    console.log('Starting standalone Previous Year Questions seed...')

    await seedPreviousYearQuestions(payload, req)

    console.log('Standalone Previous Year Questions seed finished successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Standalone Previous Year Questions seed failed:', error)
    process.exit(1)
  }
}

runSeed()
