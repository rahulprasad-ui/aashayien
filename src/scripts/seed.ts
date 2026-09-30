import dotenv from 'dotenv'
import path from 'path'
import { createLocalReq } from 'payload'

dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })

const runSeed = async () => {
  try {
    const { getPayload } = await import('payload')
    const { default: configPromise } = await import('@payload-config')
    const { seed } = await import('@/endpoints/seed')

    const payload = await getPayload({ config: configPromise })

    // Create a local request with a mock user context if needed, or let Payload handle it.
    // Since we are running locally, we usually have full access, but the seed function expects a req.
    // We try to find the admin user first to pass as context.

    let user
    try {
      const existingAdmin = await payload.find({
        collection: 'users',
        where: { email: { equals: 'admin@aashayein.com' } },
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

    console.log('Starting standalone seed...')
    await seed({ payload, req })
    console.log('Standalone seed finished successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Standalone seed failed:', error)
    process.exit(1)
  }
}

runSeed()
