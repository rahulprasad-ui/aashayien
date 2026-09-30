import { getPayload } from 'payload'
import configPromise from '@payload-config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
  path: path.resolve(dirname, '../.env.development'),
})

const checkHome = async () => {
  const payload = await getPayload({ config: configPromise })

  try {
    const home = await payload.findGlobal({
      slug: 'home',
    })

    console.log('Home Global Data:', JSON.stringify(home, null, 2))
  } catch (error) {
    console.error('Error fetching Home global:', error)
  }

  process.exit(0)
}

checkHome()
