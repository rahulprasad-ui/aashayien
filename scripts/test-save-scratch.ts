import dotenv from 'dotenv'
dotenv.config({ path: '.env.development' })
import pg from 'pg'

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
})

async function dropOldTables() {
  try {
    await client.connect()
    console.log('Connected to PostgreSQL database.')

    await client.query(`DROP TABLE IF EXISTS "ss_blk" CASCADE;`)
    await client.query(`DROP TABLE IF EXISTS "_ss_blk_v" CASCADE;`)
    console.log('Dropped old ss_blk and _ss_blk_v tables successfully!')
  } catch (err) {
    console.error('Error executing query:', err)
  } finally {
    await client.end()
    process.exit(0)
  }
}

dropOldTables()
