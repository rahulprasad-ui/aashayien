import dotenv from 'dotenv'
import path from 'path'
import { getPayload } from 'payload'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })

const run = async () => {
  const payloadConfig = await import('../src/payload.config').then(m => m.default)
  const payload = await getPayload({ config: payloadConfig })

  try {
    const newEnrollment = await payload.create({
      collection: 'enrollments',
      data: {
        eventType: 'USER_SIGNS_UP_ON_THE_APP',
        name: 'Test Dynamic Lead',
        email: 'testdynamic@example.com',
        phoneNumber: '9999999999',
        courseName: 'Dashboard',
        leadType: 'Enrollments',
        source: 'dashboard',
        logDate: new Date().toISOString(),
      }
    })
    console.log('Created enrollment:', newEnrollment.id)
    
    // Wait a second for hooks to complete just in case
    await new Promise(r => setTimeout(r, 1000))
    
    const leads = await payload.find({
      collection: 'leads',
      where: {
        email: {
          equals: 'testdynamic@example.com'
        }
      }
    })
    
    console.log('Found leads:', leads.docs.length)
  } catch(e) {
    console.error(e)
  }
  process.exit(0)
}
run()
