import dotenv from 'dotenv'
import path from 'path'
import { getPayload } from 'payload'
// import { seed } from './src/endpoints/seed' // Dynamically import this too to be safe, though less critical if it doesn't use envs at top level

// Load .env file (try .env.local or .env)
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function runSeed() {
  console.log('Starting seed...')
  // Dynamically import config to ensure env vars are loaded first
  const { default: config } = await import('./src/payload.config')
  const { seed } = await import('./src/endpoints/seed')

  const payload = await getPayload({ config })

  try {
    // Create a mock request with disableRevalidate context to prevent Next.js cache errors
    const req = {
      payload,
      context: { disableRevalidate: true },
    } as any

    await seed({ payload, req })
    console.log('Seed completed successfully.')
    process.exit(0)
  } catch (err) {
    console.error('Seed failed', err)
    process.exit(1)
  }
}

runSeed()
