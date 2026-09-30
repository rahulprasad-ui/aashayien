import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const addStructuredDataConfigColumns = (
  table: string,
  prefix: 'overrides' | 'cfg' | 'template_config',
) =>
  sql.raw(`
  DO $$
  BEGIN
    IF to_regclass('public.${table}') IS NOT NULL THEN
      ALTER TABLE "${table}"
        ADD COLUMN IF NOT EXISTS "${prefix}_name" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_description" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_url" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_schema_id" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_image" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_headline" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_author_name" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_date_published" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_date_modified" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_publisher_name" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_publisher_logo" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_article_section" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_provider_name" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_provider_url" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_faq_source" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_breadcrumb_source" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_logo_url" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_telephone" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_street_address" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_postal_code" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_address_locality" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_address_region" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_address_country" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_sku" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_brand" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_price" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_price_currency" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_availability" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_rating_value" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_review_count" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_start_date" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_end_date" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_event_status" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_event_attendance_mode" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_location_name" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_location_address" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_organizer_name" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_organizer_url" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_potential_search_target" varchar,
        ADD COLUMN IF NOT EXISTS "${prefix}_custom_type" varchar;
    END IF;
  END $$;
`)

const dropStructuredDataConfigColumns = (
  table: string,
  prefix: 'overrides' | 'cfg' | 'template_config',
) =>
  sql.raw(`
  DO $$
  BEGIN
    IF to_regclass('public.${table}') IS NOT NULL THEN
      ALTER TABLE "${table}"
        DROP COLUMN IF EXISTS "${prefix}_custom_type",
        DROP COLUMN IF EXISTS "${prefix}_potential_search_target",
        DROP COLUMN IF EXISTS "${prefix}_organizer_url",
        DROP COLUMN IF EXISTS "${prefix}_organizer_name",
        DROP COLUMN IF EXISTS "${prefix}_location_address",
        DROP COLUMN IF EXISTS "${prefix}_location_name",
        DROP COLUMN IF EXISTS "${prefix}_event_attendance_mode",
        DROP COLUMN IF EXISTS "${prefix}_event_status",
        DROP COLUMN IF EXISTS "${prefix}_end_date",
        DROP COLUMN IF EXISTS "${prefix}_start_date",
        DROP COLUMN IF EXISTS "${prefix}_review_count",
        DROP COLUMN IF EXISTS "${prefix}_rating_value",
        DROP COLUMN IF EXISTS "${prefix}_availability",
        DROP COLUMN IF EXISTS "${prefix}_price_currency",
        DROP COLUMN IF EXISTS "${prefix}_price",
        DROP COLUMN IF EXISTS "${prefix}_brand",
        DROP COLUMN IF EXISTS "${prefix}_sku",
        DROP COLUMN IF EXISTS "${prefix}_address_country",
        DROP COLUMN IF EXISTS "${prefix}_address_region",
        DROP COLUMN IF EXISTS "${prefix}_address_locality",
        DROP COLUMN IF EXISTS "${prefix}_postal_code",
        DROP COLUMN IF EXISTS "${prefix}_street_address",
        DROP COLUMN IF EXISTS "${prefix}_telephone",
        DROP COLUMN IF EXISTS "${prefix}_logo_url",
        DROP COLUMN IF EXISTS "${prefix}_breadcrumb_source",
        DROP COLUMN IF EXISTS "${prefix}_faq_source",
        DROP COLUMN IF EXISTS "${prefix}_provider_url",
        DROP COLUMN IF EXISTS "${prefix}_provider_name",
        DROP COLUMN IF EXISTS "${prefix}_article_section",
        DROP COLUMN IF EXISTS "${prefix}_publisher_logo",
        DROP COLUMN IF EXISTS "${prefix}_publisher_name",
        DROP COLUMN IF EXISTS "${prefix}_date_modified",
        DROP COLUMN IF EXISTS "${prefix}_date_published",
        DROP COLUMN IF EXISTS "${prefix}_author_name",
        DROP COLUMN IF EXISTS "${prefix}_headline",
        DROP COLUMN IF EXISTS "${prefix}_image",
        DROP COLUMN IF EXISTS "${prefix}_schema_id",
        DROP COLUMN IF EXISTS "${prefix}_url",
        DROP COLUMN IF EXISTS "${prefix}_description",
        DROP COLUMN IF EXISTS "${prefix}_name";
    END IF;
  END $$;
`)

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF to_regclass('public.sdata') IS NOT NULL THEN
        ALTER TABLE "sdata"
          ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true,
          ADD COLUMN IF NOT EXISTS "placement_order" numeric DEFAULT 0,
          ADD COLUMN IF NOT EXISTS "mode" varchar DEFAULT 'guided',
          ADD COLUMN IF NOT EXISTS "schema_type" varchar,
          ADD COLUMN IF NOT EXISTS "custom_name" varchar,
          ADD COLUMN IF NOT EXISTS "source_template_id" integer,
          ADD COLUMN IF NOT EXISTS "custom_j_s_o_n" jsonb;
      END IF;

      IF to_regclass('public.schema_templates') IS NOT NULL THEN
        ALTER TABLE "schema_templates"
          ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true,
          ADD COLUMN IF NOT EXISTS "placement_order" numeric DEFAULT 0,
          ADD COLUMN IF NOT EXISTS "mode" varchar DEFAULT 'guided',
          ADD COLUMN IF NOT EXISTS "schema_type" varchar,
          ADD COLUMN IF NOT EXISTS "custom_j_s_o_n" jsonb;
      END IF;
    END $$;
  `)

  await db.execute(addStructuredDataConfigColumns('sdata', 'overrides'))
  await db.execute(addStructuredDataConfigColumns('_sdata_v', 'overrides'))
  await db.execute(addStructuredDataConfigColumns('schema_templates', 'cfg'))
  await db.execute(addStructuredDataConfigColumns('schema_templates', 'template_config'))

  await db.execute(sql`
    DO $$
    BEGIN
      IF to_regtype('public.apply_to') IS NOT NULL
        AND to_regclass('public.apply_to') IS NULL THEN
        ALTER TYPE "apply_to" RENAME TO "apply_to_enum_old";
      END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS "sdata_overrides_faq_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar NOT NULL,
      "answer" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "sdata_overrides_breadcrumbs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "item" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "sdata_overrides_same_as" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "url" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "schema_templates_cfg_faq_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar NOT NULL,
      "answer" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "schema_templates_cfg_breadcrumbs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "item" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "schema_templates_cfg_same_as" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "url" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "schema_templates_apply_to" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "apply_to" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "schema_templates_applies_to" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL
    );

    ALTER TABLE "schema_templates_applies_to"
      ADD COLUMN IF NOT EXISTS "order" integer,
      ADD COLUMN IF NOT EXISTS "parent_id" integer;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'schema_templates_applies_to'
          AND column_name = '_order'
      ) THEN
        EXECUTE 'UPDATE "schema_templates_applies_to" SET "order" = COALESCE("order", "_order")';
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'schema_templates_applies_to'
          AND column_name = '_parent_id'
      ) THEN
        EXECUTE 'UPDATE "schema_templates_applies_to" SET "parent_id" = COALESCE("parent_id", "_parent_id")';
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "sdata_overrides_faq_items_order_idx"
      ON "sdata_overrides_faq_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "sdata_overrides_faq_items_parent_id_idx"
      ON "sdata_overrides_faq_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "sdata_overrides_breadcrumbs_order_idx"
      ON "sdata_overrides_breadcrumbs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "sdata_overrides_breadcrumbs_parent_id_idx"
      ON "sdata_overrides_breadcrumbs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "sdata_overrides_same_as_order_idx"
      ON "sdata_overrides_same_as" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "sdata_overrides_same_as_parent_id_idx"
      ON "sdata_overrides_same_as" USING btree ("_parent_id");

    CREATE INDEX IF NOT EXISTS "schema_templates_cfg_faq_items_order_idx"
      ON "schema_templates_cfg_faq_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "schema_templates_cfg_faq_items_parent_id_idx"
      ON "schema_templates_cfg_faq_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "schema_templates_cfg_breadcrumbs_order_idx"
      ON "schema_templates_cfg_breadcrumbs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "schema_templates_cfg_breadcrumbs_parent_id_idx"
      ON "schema_templates_cfg_breadcrumbs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "schema_templates_cfg_same_as_order_idx"
      ON "schema_templates_cfg_same_as" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "schema_templates_cfg_same_as_parent_id_idx"
      ON "schema_templates_cfg_same_as" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "schema_templates_apply_to_order_idx"
      ON "schema_templates_apply_to" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "schema_templates_apply_to_parent_id_idx"
      ON "schema_templates_apply_to" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "apply_to_order_idx"
      ON "apply_to" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "apply_to_parent_id_idx"
      ON "apply_to" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "schema_templates_applies_to_order_idx"
      ON "schema_templates_applies_to" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "schema_templates_applies_to_parent_id_idx"
      ON "schema_templates_applies_to" USING btree ("parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "apply_to";
    DROP TABLE IF EXISTS "schema_templates_applies_to";
    DROP TABLE IF EXISTS "schema_templates_cfg_same_as";
    DROP TABLE IF EXISTS "schema_templates_apply_to";
    DROP TABLE IF EXISTS "schema_templates_cfg_breadcrumbs";
    DROP TABLE IF EXISTS "schema_templates_cfg_faq_items";
    DROP TABLE IF EXISTS "sdata_overrides_same_as";
    DROP TABLE IF EXISTS "sdata_overrides_breadcrumbs";
    DROP TABLE IF EXISTS "sdata_overrides_faq_items";
  `)

  await db.execute(dropStructuredDataConfigColumns('schema_templates', 'cfg'))
  await db.execute(dropStructuredDataConfigColumns('schema_templates', 'template_config'))
  await db.execute(dropStructuredDataConfigColumns('_sdata_v', 'overrides'))
  await db.execute(dropStructuredDataConfigColumns('sdata', 'overrides'))

  await db.execute(sql`
    DO $$
    BEGIN
      IF to_regclass('public.schema_templates') IS NOT NULL THEN
        ALTER TABLE "schema_templates"
          DROP COLUMN IF EXISTS "custom_j_s_o_n",
          DROP COLUMN IF EXISTS "schema_type",
          DROP COLUMN IF EXISTS "mode",
          DROP COLUMN IF EXISTS "placement_order",
          DROP COLUMN IF EXISTS "enabled";
      END IF;

      IF to_regclass('public.sdata') IS NOT NULL THEN
        ALTER TABLE "sdata"
          DROP COLUMN IF EXISTS "custom_j_s_o_n",
          DROP COLUMN IF EXISTS "source_template_id",
          DROP COLUMN IF EXISTS "custom_name",
          DROP COLUMN IF EXISTS "schema_type",
          DROP COLUMN IF EXISTS "mode",
          DROP COLUMN IF EXISTS "placement_order",
          DROP COLUMN IF EXISTS "enabled";
      END IF;
    END $$;
  `)
}
