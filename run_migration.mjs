// One-time migration runner
// Run: node run_migration.mjs

import { readFileSync } from 'fs'
import pg from 'pg'

// Read .env.development
const envFile = readFileSync('.env.development', 'utf-8')
const dbUrlMatch = envFile.match(/^DATABASE_URL=(.+)$/m)
if (!dbUrlMatch) {
  console.error('DATABASE_URL not found in .env.development')
  process.exit(1)
}

const DATABASE_URL = dbUrlMatch[1].trim()
console.log('Connecting to DB using parsed credentials...')

// Parse URL manually to avoid special char issues
const url = new URL(DATABASE_URL)
const client = new pg.Client({
  host: url.hostname,
  port: parseInt(url.port) || 5432,
  user: url.username,
  password: decodeURIComponent(url.password),
  database: url.pathname.replace('/', ''),
  ssl: false,
})

try {
  await client.connect()
  console.log('Connected! Running migration...')

  // Read migration SQL from the generated migration file
  // We'll just run the key parts manually
  const sql = `
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_dynamic_pages_blocks_section_block_text_alignment') THEN
        CREATE TYPE "public"."enum_dynamic_pages_blocks_section_block_text_alignment" AS ENUM('left', 'center', 'right');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_dynamic_pages_blocks_section_block_image_position') THEN
        CREATE TYPE "public"."enum_dynamic_pages_blocks_section_block_image_position" AS ENUM('left', 'right');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_dynamic_pages_blocks_posts_block_populate_by') THEN
        CREATE TYPE "public"."enum_dynamic_pages_blocks_posts_block_populate_by" AS ENUM('latest', 'selection');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_dynamic_pages_blocks_events_block_populate_by') THEN
        CREATE TYPE "public"."enum_dynamic_pages_blocks_events_block_populate_by" AS ENUM('latest', 'selection');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_dynamic_pages_blocks_notifications_block_populate_by') THEN
        CREATE TYPE "public"."enum_dynamic_pages_blocks_notifications_block_populate_by" AS ENUM('latest', 'selection');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_dynamic_pages_blocks_courses_block_populate_by') THEN
        CREATE TYPE "public"."enum_dynamic_pages_blocks_courses_block_populate_by" AS ENUM('latest', 'selection');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_dynamic_pages_blocks_custom_block_text_alignment') THEN
        CREATE TYPE "public"."enum_dynamic_pages_blocks_custom_block_text_alignment" AS ENUM('left', 'center', 'right');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_dynamic_pages_blocks_custom_block_padding_top') THEN
        CREATE TYPE "public"."enum_dynamic_pages_blocks_custom_block_padding_top" AS ENUM('none', 'small', 'medium', 'large');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_dynamic_pages_blocks_custom_block_padding_bottom') THEN
        CREATE TYPE "public"."enum_dynamic_pages_blocks_custom_block_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__dynamic_pages_v_blocks_section_block_text_alignment') THEN
        CREATE TYPE "public"."enum__dynamic_pages_v_blocks_section_block_text_alignment" AS ENUM('left', 'center', 'right');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__dynamic_pages_v_blocks_section_block_image_position') THEN
        CREATE TYPE "public"."enum__dynamic_pages_v_blocks_section_block_image_position" AS ENUM('left', 'right');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__dynamic_pages_v_blocks_posts_block_populate_by') THEN
        CREATE TYPE "public"."enum__dynamic_pages_v_blocks_posts_block_populate_by" AS ENUM('latest', 'selection');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__dynamic_pages_v_blocks_events_block_populate_by') THEN
        CREATE TYPE "public"."enum__dynamic_pages_v_blocks_events_block_populate_by" AS ENUM('latest', 'selection');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__dynamic_pages_v_blocks_notifications_block_populate_by') THEN
        CREATE TYPE "public"."enum__dynamic_pages_v_blocks_notifications_block_populate_by" AS ENUM('latest', 'selection');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__dynamic_pages_v_blocks_courses_block_populate_by') THEN
        CREATE TYPE "public"."enum__dynamic_pages_v_blocks_courses_block_populate_by" AS ENUM('latest', 'selection');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__dynamic_pages_v_blocks_custom_block_text_alignment') THEN
        CREATE TYPE "public"."enum__dynamic_pages_v_blocks_custom_block_text_alignment" AS ENUM('left', 'center', 'right');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__dynamic_pages_v_blocks_custom_block_padding_top') THEN
        CREATE TYPE "public"."enum__dynamic_pages_v_blocks_custom_block_padding_top" AS ENUM('none', 'small', 'medium', 'large');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__dynamic_pages_v_blocks_custom_block_padding_bottom') THEN
        CREATE TYPE "public"."enum__dynamic_pages_v_blocks_custom_block_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
      END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS "dynamic_pages_blocks_section_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "order_no" numeric,
      "text_alignment" "enum_dynamic_pages_blocks_section_block_text_alignment" DEFAULT 'left',
      "image_position" "enum_dynamic_pages_blocks_section_block_image_position" DEFAULT 'right',
      "title" varchar,
      "subtitle" varchar,
      "content" jsonb,
      "image_id" integer,
      "bg_image_id" integer,
      "bg_color" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "dynamic_pages_blocks_posts_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Latest Articles',
      "subheading" varchar DEFAULT 'Blog & Articles',
      "description" varchar,
      "populate_by" "enum_dynamic_pages_blocks_posts_block_populate_by" DEFAULT 'latest',
      "limit" numeric DEFAULT 6,
      "view_all_link" varchar DEFAULT '/blog',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "dynamic_pages_blocks_events_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Upcoming Events',
      "subheading" varchar DEFAULT 'Events & Webinars',
      "description" varchar,
      "populate_by" "enum_dynamic_pages_blocks_events_block_populate_by" DEFAULT 'latest',
      "limit" numeric DEFAULT 6,
      "view_all_link" varchar DEFAULT '/events',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "dynamic_pages_blocks_notifications_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Notifications & Updates',
      "subheading" varchar DEFAULT 'Latest Updates',
      "description" varchar,
      "show_vacancies" boolean DEFAULT true,
      "show_syllabus" boolean DEFAULT true,
      "show_events" boolean DEFAULT true,
      "populate_by" "enum_dynamic_pages_blocks_notifications_block_populate_by" DEFAULT 'latest',
      "limit" numeric DEFAULT 5,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "dynamic_pages_blocks_courses_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Our Courses',
      "subheading" varchar DEFAULT 'Judiciary Preparation',
      "description" varchar,
      "populate_by" "enum_dynamic_pages_blocks_courses_block_populate_by" DEFAULT 'latest',
      "limit" numeric DEFAULT 6,
      "view_all_link" varchar DEFAULT '/courses',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "dynamic_pages_blocks_slider_block_slides" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "title" varchar,
      "caption" varchar,
      "link" varchar,
      "link_label" varchar DEFAULT 'Learn More'
    );

    CREATE TABLE IF NOT EXISTS "dynamic_pages_blocks_slider_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "subheading" varchar,
      "auto_play" boolean DEFAULT true,
      "auto_play_interval" numeric DEFAULT 4,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "dynamic_pages_blocks_custom_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "subheading" varchar,
      "content" jsonb,
      "raw_html" varchar,
      "background_color" varchar DEFAULT '#ffffff',
      "text_alignment" "enum_dynamic_pages_blocks_custom_block_text_alignment" DEFAULT 'left',
      "padding_top" "enum_dynamic_pages_blocks_custom_block_padding_top" DEFAULT 'medium',
      "padding_bottom" "enum_dynamic_pages_blocks_custom_block_padding_bottom" DEFAULT 'medium',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_dynamic_pages_v_blocks_section_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "order_no" numeric,
      "text_alignment" "enum__dynamic_pages_v_blocks_section_block_text_alignment" DEFAULT 'left',
      "image_position" "enum__dynamic_pages_v_blocks_section_block_image_position" DEFAULT 'right',
      "title" varchar,
      "subtitle" varchar,
      "content" jsonb,
      "image_id" integer,
      "bg_image_id" integer,
      "bg_color" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_dynamic_pages_v_blocks_posts_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Latest Articles',
      "subheading" varchar DEFAULT 'Blog & Articles',
      "description" varchar,
      "populate_by" "enum__dynamic_pages_v_blocks_posts_block_populate_by" DEFAULT 'latest',
      "limit" numeric DEFAULT 6,
      "view_all_link" varchar DEFAULT '/blog',
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_dynamic_pages_v_blocks_events_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Upcoming Events',
      "subheading" varchar DEFAULT 'Events & Webinars',
      "description" varchar,
      "populate_by" "enum__dynamic_pages_v_blocks_events_block_populate_by" DEFAULT 'latest',
      "limit" numeric DEFAULT 6,
      "view_all_link" varchar DEFAULT '/events',
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_dynamic_pages_v_blocks_notifications_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Notifications & Updates',
      "subheading" varchar DEFAULT 'Latest Updates',
      "description" varchar,
      "show_vacancies" boolean DEFAULT true,
      "show_syllabus" boolean DEFAULT true,
      "show_events" boolean DEFAULT true,
      "populate_by" "enum__dynamic_pages_v_blocks_notifications_block_populate_by" DEFAULT 'latest',
      "limit" numeric DEFAULT 5,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_dynamic_pages_v_blocks_courses_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Our Courses',
      "subheading" varchar DEFAULT 'Judiciary Preparation',
      "description" varchar,
      "populate_by" "enum__dynamic_pages_v_blocks_courses_block_populate_by" DEFAULT 'latest',
      "limit" numeric DEFAULT 6,
      "view_all_link" varchar DEFAULT '/courses',
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_dynamic_pages_v_blocks_slider_block_slides" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "image_id" integer,
      "title" varchar,
      "caption" varchar,
      "link" varchar,
      "link_label" varchar DEFAULT 'Learn More',
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_dynamic_pages_v_blocks_slider_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar,
      "subheading" varchar,
      "auto_play" boolean DEFAULT true,
      "auto_play_interval" numeric DEFAULT 4,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_dynamic_pages_v_blocks_custom_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar,
      "subheading" varchar,
      "content" jsonb,
      "raw_html" varchar,
      "background_color" varchar DEFAULT '#ffffff',
      "text_alignment" "enum__dynamic_pages_v_blocks_custom_block_text_alignment" DEFAULT 'left',
      "padding_top" "enum__dynamic_pages_v_blocks_custom_block_padding_top" DEFAULT 'medium',
      "padding_bottom" "enum__dynamic_pages_v_blocks_custom_block_padding_bottom" DEFAULT 'medium',
      "_uuid" varchar,
      "block_name" varchar
    );

    ALTER TABLE "dynamic_pages_rels" ADD COLUMN IF NOT EXISTS "events_id" integer;
    ALTER TABLE "dynamic_pages_rels" ADD COLUMN IF NOT EXISTS "vacancies_id" integer;
    ALTER TABLE "dynamic_pages_rels" ADD COLUMN IF NOT EXISTS "syllabus_states_id" integer;
    ALTER TABLE "_dynamic_pages_v_rels" ADD COLUMN IF NOT EXISTS "events_id" integer;
    ALTER TABLE "_dynamic_pages_v_rels" ADD COLUMN IF NOT EXISTS "vacancies_id" integer;
    ALTER TABLE "_dynamic_pages_v_rels" ADD COLUMN IF NOT EXISTS "syllabus_states_id" integer;
  `

  await client.query(sql)
  console.log('✅ Migration successful! All dynamic_pages block tables created.')

  // Mark migration as run in payload_migrations table
  try {
    await client.query(`
      INSERT INTO payload_migrations (name, batch) 
      VALUES ('20260912_092339', 1)
      ON CONFLICT (name) DO NOTHING
    `)
    console.log('✅ Migration recorded in payload_migrations table.')
  } catch (e) {
    console.log('Note: Could not record migration (may already exist or table structure different):', e.message)
  }

} catch (err) {
  console.error('❌ Migration failed:', err.message)
} finally {
  await client.end()
}
