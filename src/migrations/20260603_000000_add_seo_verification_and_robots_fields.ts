import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const seoTables = [
  'pages',
  'posts',
  'courses',
  'success_stories',
  'books',
  'events',
  'vacancies',
  'notes',
  'previous_year_questions',
  'home',
  'course',
  'success_stories_page',
  'free_study',
  'blog',
  'events_page',
  'books_page',
  'about_us',
  'contact_page',
  'notes_page',
  'previous_year_questions_page',
  'syllabus_vacancy_global',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "branding"
      ADD COLUMN IF NOT EXISTS "search_console_google_site_verification" varchar,
      ADD COLUMN IF NOT EXISTS "search_console_dns_txt_record" varchar,
      ADD COLUMN IF NOT EXISTS "analytics_ga4_measurement_id" varchar,
      ADD COLUMN IF NOT EXISTS "analytics_google_tag_manager_id" varchar,
      ADD COLUMN IF NOT EXISTS "analytics_conversion_head_script" varchar,
      ADD COLUMN IF NOT EXISTS "analytics_conversion_body_script" varchar;
  `)

  for (const table of seoTables) {
    await db.execute(sql.raw(`
      ALTER TABLE "${table}"
        ADD COLUMN IF NOT EXISTS "meta_index_directive" varchar DEFAULT 'index',
        ADD COLUMN IF NOT EXISTS "meta_follow_directive" varchar DEFAULT 'follow';
    `))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "branding"
      DROP COLUMN IF EXISTS "search_console_google_site_verification",
      DROP COLUMN IF EXISTS "search_console_dns_txt_record",
      DROP COLUMN IF EXISTS "analytics_ga4_measurement_id",
      DROP COLUMN IF EXISTS "analytics_google_tag_manager_id",
      DROP COLUMN IF EXISTS "analytics_conversion_head_script",
      DROP COLUMN IF EXISTS "analytics_conversion_body_script";
  `)

  for (const table of seoTables) {
    await db.execute(sql.raw(`
      ALTER TABLE "${table}"
        DROP COLUMN IF EXISTS "meta_index_directive",
        DROP COLUMN IF EXISTS "meta_follow_directive";
    `))
  }
}
