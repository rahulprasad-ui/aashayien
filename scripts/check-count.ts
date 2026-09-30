import dotenv from 'dotenv'
import path from 'path'
import { getPayload } from 'payload'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })

const run = async () => {
  const payloadConfig = await import('../src/payload.config').then(m => m.default)
  const payload = await getPayload({ config: payloadConfig })

  const { totalDocs } = await payload.count({
    collection: 'enrollments',
  })
  console.log('Total enrollments:', totalDocs)
  process.exit(0)
}
run()
