import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts"
      ADD COLUMN IF NOT EXISTS "hero_image_display_preset" varchar,
      ADD COLUMN IF NOT EXISTS "hero_image_display_custom_width" numeric,
      ADD COLUMN IF NOT EXISTS "hero_image_display_custom_height" numeric,
      ADD COLUMN IF NOT EXISTS "hero_image_display_fit" varchar;

    ALTER TABLE "_posts_v"
      ADD COLUMN IF NOT EXISTS "version_hero_image_display_preset" varchar,
      ADD COLUMN IF NOT EXISTS "version_hero_image_display_custom_width" numeric,
      ADD COLUMN IF NOT EXISTS "version_hero_image_display_custom_height" numeric,
      ADD COLUMN IF NOT EXISTS "version_hero_image_display_fit" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts"
      DROP COLUMN IF EXISTS "hero_image_display_preset",
      DROP COLUMN IF EXISTS "hero_image_display_custom_width",
      DROP COLUMN IF EXISTS "hero_image_display_custom_height",
      DROP COLUMN IF EXISTS "hero_image_display_fit";

    ALTER TABLE "_posts_v"
      DROP COLUMN IF EXISTS "version_hero_image_display_preset",
      DROP COLUMN IF EXISTS "version_hero_image_display_custom_width",
      DROP COLUMN IF EXISTS "version_hero_image_display_custom_height",
      DROP COLUMN IF EXISTS "version_hero_image_display_fit";
  `)
}
