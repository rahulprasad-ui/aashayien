import type { CollectionConfig } from 'payload'
import { moduleAccess, publicCreateOrModuleAccess } from '../access/rbac'

export const WebhookLogs: CollectionConfig = {
  slug: 'webhook-logs',
  admin: {
    useAsTitle: 'source',
    defaultColumns: ['source', 'method', 'createdAt'],
    group: 'System',
  },
  access: {
    create: publicCreateOrModuleAccess('webhook-logs'),
    read: moduleAccess('webhook-logs', 'read'),
    update: moduleAccess('webhook-logs', 'update'),
    delete: moduleAccess('webhook-logs', 'delete'),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create' && doc.body) {
          try {
            const body = doc.body
            const eventType = body.eventType || body.event_type

            // Check if it's a relevant event (has student data)
            // We can check if specific fields exist
            if (eventType || body.name || body.email || body.number) {
              await req.payload.create({
                collection: 'enrollments',
                data: {
                  eventType: eventType,
                  name: body.name,
                  email: body.email,
                  phoneNumber: body.number,
                  courseName: body.coursename || body.course_name,
                  leadType: body.leadtype || body.lead_type,
                  source: doc.source || (doc.query && doc.query.source),
                  logDate: doc.createdAt, // Using system reception time for reliability
                },
                req,
              })
            }
          } catch (error) {
            console.error('Error creating enrollment from webhook log:', error)
          }
        }
      },
    ],
  },
  endpoints: [
    {
      path: '/migrate',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
          const fs = await import('fs')
          const path = await import('path')

          const backupPath = path.resolve(process.cwd(), 'backups/webhook_logs.json')
          if (!fs.existsSync(backupPath)) {
            return Response.json({ error: 'Backup file not found' }, { status: 404 })
          }

          const logs = JSON.parse(fs.readFileSync(backupPath, 'utf8'))
          let successCount = 0
          let skipCount = 0
          let errorCount = 0

          for (const log of logs) {
            if (!log.body) {
              skipCount++
              continue
            }

            const body = log.body
            const eventType = body.eventType || body.event_type

            if (eventType || body.name || body.email || body.number) {
              try {
                let logDate = log.created_at

                if (body.createdatetime) {
                  const parts = body.createdatetime.split(' ')
                  if (parts.length === 2) {
                    const [datePart, timePart] = parts
                    const [day, month, year] = datePart.split('-')
                    const [hour, minute, second] = timePart.split(':')
                    const dt = new Date(
                      parseInt(year),
                      parseInt(month) - 1,
                      parseInt(day),
                      parseInt(hour),
                      parseInt(minute),
                      parseInt(second),
                    )
                    if (!isNaN(dt.getTime())) {
                      logDate = dt.toISOString()
                    }
                  }
                }

                await req.payload.create({
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
                  req,
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

          return Response.json({
            success: true,
            created: successCount,
            skipped: skipCount,
            errors: errorCount,
          })
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 500 })
        }
      },
    },
  ],
  fields: [
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Source of the webhook (e.g. "stripe", "razorpay")',
      },
    },
    {
      name: 'method',
      type: 'text',
      admin: {
        description: 'HTTP Method (POST, GET, etc.)',
      },
    },
    {
      name: 'headers',
      type: 'json',
      admin: {
        description: 'Request Headers',
      },
    },
    {
      name: 'query',
      type: 'json',
      admin: {
        description: 'URL Query Parameters',
      },
    },
    {
      name: 'body',
      type: 'json',
      admin: {
        description: 'Request Body',
      },
    },
  ],
}
