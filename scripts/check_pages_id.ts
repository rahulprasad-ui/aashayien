import { getPayload } from 'payload'
import config from '../src/payload.config'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
  path: path.resolve(dirname, '../.env.development'),
})

const checkPages = async () => {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
  })

  console.log('Pages found:', pages.totalDocs)
  if (pages.docs.length > 0) {
    console.log('First page keys:', Object.keys(pages.docs[0]))
    console.log('First page ID:', pages.docs[0].id)
  } else {
    console.log('No pages found.')
  }

  process.exit(0)
}

checkPages()
