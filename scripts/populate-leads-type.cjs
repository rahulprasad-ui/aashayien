const { Client } = require('pg')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set.')
  process.exit(1)
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
})

async function main() {
  await client.connect()

  await client.query('ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "type" varchar')
  await client.query(`
    UPDATE "leads"
    SET "type" = "source"
    WHERE ("type" IS NULL OR "type" = '')
      AND "source" IS NOT NULL
  `)

  const result = await client.query(`
    SELECT "type", COUNT(*)::int AS "count"
    FROM "leads"
    GROUP BY "type"
    ORDER BY "type"
  `)

  console.log(JSON.stringify(result.rows, null, 2))
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await client.end()
  })
