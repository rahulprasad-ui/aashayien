import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
// Dynamically import config to ensure env vars are loaded first

const filename = fileURLToPath(import.meta.url)

const dirname = path.dirname(filename)

const run = async () => {
  dotenv.config({ path: path.resolve(dirname, '../.env.development') })

  // Also try default .env as fallback
  dotenv.config({ path: path.resolve(dirname, '../.env') })

  // Dynamically import config
  const { default: configPromise } = await import('./payload.config')
  const { seedPrivacyPolicy } = await import('./endpoints/seed/privacy-policy.seeder')

  const payload = await getPayload({ config: configPromise })

  try {
    const req = {
      payload,
      user: undefined,
      locale: 'en',
      fallbackLocale: 'en',
      context: {
        disableRevalidate: true,
      },
    } as any

    await seedPrivacyPolicy(payload, req)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
