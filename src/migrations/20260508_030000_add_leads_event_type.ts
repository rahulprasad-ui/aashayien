import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF to_regclass('public.leads') IS NOT NULL THEN
        ALTER TABLE "leads"
          ADD COLUMN IF NOT EXISTS "event_type" varchar;

        UPDATE "leads"
        SET "event_type" = "enrollments"."event_type"::text::"enum_leads_event_type"
        FROM "enrollments"
        WHERE "leads"."source" = 'dashboard'
          AND "leads"."source_id" = "enrollments"."id"::text
          AND "leads"."event_type" IS NULL
          AND "enrollments"."event_type" IS NOT NULL;

        CREATE INDEX IF NOT EXISTS "leads_event_type_idx"
          ON "leads" USING btree ("event_type");
      END IF;

      IF to_regclass('public.enrollments') IS NOT NULL THEN
        CREATE INDEX IF NOT EXISTS "enrollments_event_type_idx"
          ON "enrollments" USING btree ("event_type");
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "enrollments_event_type_idx";
    DROP INDEX IF EXISTS "leads_event_type_idx";

    DO $$
    BEGIN
      IF to_regclass('public.leads') IS NOT NULL THEN
        ALTER TABLE "leads"
          DROP COLUMN IF EXISTS "event_type";
      END IF;
    END $$;
  `)
}
