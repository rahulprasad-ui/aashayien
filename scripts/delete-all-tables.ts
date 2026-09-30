import { Client } from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.development
dotenv.config({ path: path.resolve(__dirname, '../.env.development') })

const dropAllTables = async () => {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set in .env.development')
    process.exit(1)
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
  })

  try {
    await client.connect()
    console.log('Connected to database.')

    // Fetch all table names in the public schema
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE';
    `)

    const tables = res.rows.map((row) => row.table_name)

    if (tables.length === 0) {
      console.log('No tables found in public schema.')
      return
    }

    console.log(`Found ${tables.length} tables to delete:`)
    tables.forEach((t) => console.log(` - ${t}`))

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question(
      '\nAre you sure you want to delete ALL these tables? (yes/no): ',
      async (answer) => {
        if (answer.toLowerCase() === 'yes') {
          console.log('\nDeleting tables...')

          for (const table of tables) {
            try {
              console.log(`Dropping table "${table}"...`)
              await client.query(`DROP TABLE IF EXISTS "public"."${table}" CASCADE;`)
            } catch (err) {
              console.error(`Failed to drop table "${table}":`, err)
            }
          }

          console.log('\nAll tables deleted successfully.')
        } else {
          console.log('Operation cancelled.')
        }

        rl.close()
        await client.end()
      },
    )
  } catch (err) {
    console.error('Error connecting to database:', err)
    await client.end()
  }
}

dropAllTables()
