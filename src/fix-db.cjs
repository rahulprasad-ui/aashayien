/* eslint-disable @typescript-eslint/no-require-imports */
const connectionString = 'postgres://postgres:postgres@127.0.0.1:5432/aashayein'

const queries = [
  'ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "placeholder" varchar;',
  'ALTER TABLE "forms_blocks_email" ADD COLUMN IF NOT EXISTS "placeholder" varchar;',
  'ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "placeholder" varchar;',
  'ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "placeholder" varchar;',
]

async function run() {
  // Try pg
  try {
    console.log('Attempting with pg...')
    const { Client } = require('pg')
    const client = new Client({ connectionString })
    await client.connect()
    console.log('Connected with pg')
    for (const q of queries) {
      await client.query(q)
      console.log('Executed:', q)
    }
    await client.end()
    console.log('Done with pg')
    return
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log('pg module not found')
    } else {
      console.log('pg failed: ' + e.message)
    }
  }

  // Try postgres
  try {
    console.log('Attempting with postgres...')
    const postgres = require('postgres')
    const sql = postgres(connectionString)
    console.log('Connected with postgres')
    for (const q of queries) {
      await sql.unsafe(q)
      console.log('Executed:', q)
    }
    await sql.end()
    console.log('Done with postgres')
    return
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log('postgres module not found')
    } else {
      console.log('postgres failed: ' + e.message)
    }
  }

  console.log('Could not run queries. Drivers not found locally.')
}

run()
