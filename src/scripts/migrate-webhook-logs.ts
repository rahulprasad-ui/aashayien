import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const run = async () => {
    // Load environment variables
    dotenv.config({ path: path.resolve(dirname, '../../.env.development') })
    dotenv.config({ path: path.resolve(dirname, '../../.env') })

    let payload
    let logs

    try {
        console.log('Importing config...')
        // Dynamically import config
        const { default: configPromise } = await import('../payload.config')
        console.log('Initializing Payload...')
        payload = await getPayload({ config: configPromise })

        const backupFilePath = path.resolve('d:\\payload\\aashayien\\backups\\webhook_logs.json')
        
        if (!fs.existsSync(backupFilePath)) {
            console.error(`Backup file not found at ${backupFilePath}`)
            process.exit(1)
        }

        console.log('Reading logs...')
        logs = JSON.parse(fs.readFileSync(backupFilePath, 'utf-8'))
        console.log(`Found ${logs.length} logs. Starting migration...`)
    } catch (err) {
        console.error('Initialization Error:', err)
        process.exit(1)
    }

    let successCount = 0
    let skipCount = 0
    let errorCount = 0

    if (!logs || !payload) {
         console.error('Failed to initialize logs or payload')
         process.exit(1)
    }

    for (const log of logs) {
        if (!log.body) {
            skipCount++
            continue
        }

        const body = log.body
        const eventType = body.eventType || body.event_type

        // Check if it's a relevant event
        if (eventType || body.name || body.email || body.number) {
            try {
                // Determine date
                let logDate = log.created_at
                
                if (body.createdatetime) {
                // Simple parse attempt for DD-MM-YYYY HH:mm:ss
                const parts = body.createdatetime.split(' ');
                if (parts.length === 2) {
                    const [datePart, timePart] = parts;
                    const [day, month, year] = datePart.split('-');
                    const [hour, minute, second] = timePart.split(':');
                    const dt = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
                    if (!isNaN(dt.getTime())) {
                        logDate = dt.toISOString();
                    }
                }
                }

                await payload.create({
                    collection: 'enrollments',
                    data: {
                    eventType: eventType,
                    name: body.name,
                    email: body.email,
                    phoneNumber: body.number,
                    courseName: body.coursename || body.course_name,
                    leadType: body.leadtype || body.lead_type,
                    source: log.source || (log.query && log.query.source),
                    logDate: logDate, 
                    },
                })
                successCount++
            } catch (e) {
                console.error(`Failed to migrate log ${log.id}:`, e)
                errorCount++
            }
        } else {
            skipCount++
        }
    }

    console.log(`Migration complete.`)
    console.log(`Created: ${successCount}`)
    console.log(`Skipped (no student data): ${skipCount}`)
    console.log(`Errors: ${errorCount}`)
    
    process.exit(0)
}

run()
