import dotenv from 'dotenv'
import path from 'path'
import { getPayload } from 'payload'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function run() {
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

  try {
    const existingAdmins = await payload.find({
      collection: 'users',
      where: {
        email: { equals: 'admin@aashayein.com' }
      },
      limit: 1,
    })

    if (existingAdmins.totalDocs > 0) {
      await payload.update({
        collection: 'users',
        id: existingAdmins.docs[0].id,
        data: {
          password: 'password',
          superAdmin: true
        }
      })
      console.log('Password for admin@aashayein.com has been reset to "password".')
    } else {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@aashayein.com',
          password: 'password',
          superAdmin: true,
          name: 'Demo Admin'
        }
      })
      console.log('Created admin@aashayein.com with password "password".')
    }
    process.exit(0)
  } catch (err) {
    console.error('Failed to update admin', err)
    process.exit(1)
  }
}

run()
