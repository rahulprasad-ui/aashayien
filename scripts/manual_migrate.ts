import { getPayload } from 'payload'
import { up } from '../src/migrations/20260122_131801'

import { sql } from '@payloadcms/db-postgres'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env file
const envPath = path.resolve(__dirname, '../.env')
const devEnvPath = path.resolve(__dirname, '../.env.development')
console.log('Loading .env from:', envPath)
console.log('Loading .env.development from:', devEnvPath)

dotenv.config({ path: envPath })
dotenv.config({ path: devEnvPath })

console.log('PAYLOAD_SECRET present:', !!process.env.PAYLOAD_SECRET)

const migrate = async () => {
  try {
    // Import config dynamically to ensure env vars are loaded first
    const { default: configPromise } = await import('../src/payload.config')
    const payload = await getPayload({ config: configPromise })

    console.log('Dropping conflicting tables...')
    await payload.db.drizzle.execute(sql`
        DROP TABLE IF EXISTS "home" CASCADE;
        DROP TABLE IF EXISTS "home_rels" CASCADE;
        DROP TABLE IF EXISTS "home_slides" CASCADE;
        DROP TABLE IF EXISTS "home_slides_features" CASCADE;
        DROP TABLE IF EXISTS "home_community_features" CASCADE;
        DROP TABLE IF EXISTS "home_community_bottom_stats" CASCADE;
        DROP TABLE IF EXISTS "home_why_choose_us_cards" CASCADE;
        DROP TABLE IF EXISTS "home_why_choose_us_stats" CASCADE;
        
        DROP TABLE IF EXISTS "courses" CASCADE;
        DROP TABLE IF EXISTS "courses_target_states" CASCADE;
        DROP TABLE IF EXISTS "courses_features" CASCADE;
        DROP TABLE IF EXISTS "courses_highlights" CASCADE;
        DROP TABLE IF EXISTS "courses_learning_outcomes" CASCADE;
        DROP TABLE IF EXISTS "courses_curriculum" CASCADE;
        DROP TABLE IF EXISTS "courses_curriculum_topics" CASCADE;
        DROP TABLE IF EXISTS "courses_demo_videos" CASCADE;
        
        DROP TABLE IF EXISTS "success_stories" CASCADE;
        DROP TABLE IF EXISTS "success_stories_rels" CASCADE;
        DROP TABLE IF EXISTS "success_stories_journey_custom_courses" CASCADE;
        DROP TABLE IF EXISTS "success_stories_story_challenges" CASCADE;
        DROP TABLE IF EXISTS "success_stories_timeline" CASCADE;
        DROP TABLE IF EXISTS "success_stories_tips" CASCADE;
        DROP TABLE IF EXISTS "success_stories_stats" CASCADE;
        DROP TABLE IF EXISTS "success_stories_resources" CASCADE;
        
        DROP TABLE IF EXISTS "faqs" CASCADE;
        
        DROP TABLE IF EXISTS "header" CASCADE;
        DROP TABLE IF EXISTS "header_blocks_link" CASCADE;
        DROP TABLE IF EXISTS "header_blocks_dropdown" CASCADE;
        DROP TABLE IF EXISTS "header_blocks_dropdown_items" CASCADE;
        DROP TABLE IF EXISTS "header_blocks_mega_menu" CASCADE;
        DROP TABLE IF EXISTS "header_blocks_mega_menu_columns" CASCADE;
        DROP TABLE IF EXISTS "header_blocks_mega_menu_columns_links" CASCADE;
        DROP TABLE IF EXISTS "header_actions_actions" CASCADE;
        
        DROP TABLE IF EXISTS "footer" CASCADE;
        DROP TABLE IF EXISTS "footer_social_links" CASCADE;
        DROP TABLE IF EXISTS "footer_popular_courses" CASCADE;
        DROP TABLE IF EXISTS "footer_bottom_nav_links" CASCADE;
    `)
    console.log('Tables dropped.')

    console.log('Running migration up...')

    await up({
      db: payload.db,
      payload,
      req: {} as any,
    })

    console.log('Migration completed successfully.')

    const migrationName = '20260122_131801'

    // Check if migration exists using raw SQL
    // Using payload.db.drizzle.execute because the PostgresAdapter underlying drizzle instance accepts custom SQL
    const checkResult = await payload.db.drizzle.execute(
      sql`SELECT * FROM "payload_migrations" WHERE name = ${migrationName}`,
    )

    if (checkResult.rows.length === 0) {
      console.log('Inserting migration record...')
      await payload.db.drizzle.execute(sql`
            INSERT INTO "payload_migrations" (name, batch, created_at, updated_at)
            VALUES (${migrationName}, 1, NOW(), NOW())
        `)
      console.log('Marked migration as executed in DB.')
    } else {
      console.log('Migration record already exists.')
    }

    process.exit(0)
  } catch (err) {
    console.error('Migration failed:', err)
    process.exit(1)
  }
}

migrate()
