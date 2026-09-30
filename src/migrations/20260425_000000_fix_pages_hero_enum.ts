import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'enum_pages_hero_type'
      ) THEN
        ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE IF NOT EXISTS 'simple';
      END IF;

      IF EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'enum__pages_v_version_hero_type'
      ) THEN
        ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE IF NOT EXISTS 'simple';
      END IF;

      IF EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'enum_courses_category'
      ) THEN
        ALTER TYPE "public"."enum_courses_category" ADD VALUE IF NOT EXISTS 'foundation';
        ALTER TYPE "public"."enum_courses_category" ADD VALUE IF NOT EXISTS 'state-judiciary';
        ALTER TYPE "public"."enum_courses_category" ADD VALUE IF NOT EXISTS 'apo-adpo';
      END IF;
    END $$;

    UPDATE "pages"
    SET "hero_type" = 'simple'
    WHERE "hero_type" IN ('lowImpact', 'mediumImpact');

    UPDATE "_pages_v"
    SET "version_hero_type" = 'simple'
    WHERE "version_hero_type" IN ('lowImpact', 'mediumImpact');

    ALTER TABLE "pages"
      ALTER COLUMN "hero_type" SET DEFAULT 'simple';

    ALTER TABLE "_pages_v"
      ALTER COLUMN "version_hero_type" SET DEFAULT 'simple';

    ALTER TABLE "courses"
      ALTER COLUMN "category" SET DEFAULT 'foundation';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "pages"
    SET "hero_type" = 'highImpact'
    WHERE "hero_type" = 'simple';

    UPDATE "_pages_v"
    SET "version_hero_type" = 'highImpact'
    WHERE "version_hero_type" = 'simple';

    ALTER TABLE "pages"
      ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact';

    ALTER TABLE "_pages_v"
      ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact';

    ALTER TABLE "courses"
      ALTER COLUMN "category" SET DEFAULT 'live';
  `)
}
