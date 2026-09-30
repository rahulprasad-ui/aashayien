import dotenv from 'dotenv'
import path from 'path'
import { getPayload } from 'payload'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })

const run = async () => {
  const payloadConfig = await import('../src/payload.config').then(m => m.default)
  const payload = await getPayload({ config: payloadConfig })

  const leads = await payload.find({
    collection: 'leads',
    limit: 5,
    sort: '-createdAt'
  })
  
  console.log('Latest Leads from DB:', leads.docs.map(l => l.name))
  process.exit(0)
}
run()
