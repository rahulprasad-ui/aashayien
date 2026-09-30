import config from './payload.config'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'

const run = async () => {
  try {
    const payload = await getPayload({ config })

    // We need to access the db adapter directly.
    // However, payload.db might abstract it.
    // For postgres adapter, payload.db.drizzle should be exposed if we cast it or inspect it.
    // But safely, we can try to use raw query if exposed.

    console.log('Running manual migration...')

    const items = ['text', 'email', 'number', 'textarea']

    for (const item of items) {
      const tableName = `forms_blocks_${item}`
      try {
        await payload.db.drizzle.execute(
          sql.raw(`ALTER TABLE "${tableName}" ADD COLUMN IF NOT EXISTS "placeholder" varchar;`),
        )
        console.log(`Added placeholder to ${tableName}`)
      } catch (e) {
        console.error(`Error altering ${tableName}:`, e)
      }
    }

    console.log('Done!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
