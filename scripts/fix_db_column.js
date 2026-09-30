const { Client } = require('pg')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

// Load .env.production manually
const envPath = path.resolve(process.cwd(), '.env.production')
const envConfig = dotenv.parse(fs.readFileSync(envPath))

const client = new Client({
  connectionString: envConfig.DATABASE_URL,
})

async function migrate() {
  try {
    await client.connect()
    console.log('Connected to database...')

    console.log('Adding gating_popup_id column...')
    await client.query(`ALTER TABLE free_study ADD COLUMN IF NOT EXISTS gating_popup_id integer;`)

    console.log('Success! Column added.')
  } catch (err) {
    console.error('Error executing migration:', err)
  } finally {
    await client.end()
  }
}

migrate()
