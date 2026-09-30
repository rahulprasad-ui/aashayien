const { Client } = require('pg')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

const root = process.cwd()

for (const file of ['.env', '.env.development', '.env.production']) {
  const envPath = path.resolve(root, file)
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false })
  }
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set in .env, .env.development, or .env.production')
  process.exit(1)
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
})

async function main() {
  await client.connect()

  try {
    await client.query('BEGIN')

    await client.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'forms_blocks_captcha'
            AND column_name = 'captcha_type'
        ) THEN
          UPDATE "forms_blocks_captcha"
          SET "captcha_type" = 'google'
          WHERE "captcha_type"::text = 'system'
             OR "captcha_type" IS NULL
             OR "captcha_type"::text NOT IN ('google');
        END IF;
      END $$;
    `)

    await client.query(`
      ALTER TABLE "users"
        ADD COLUMN IF NOT EXISTS "super_admin" boolean DEFAULT false;
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS "users_module_permissions" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "module" varchar NOT NULL,
        "read" boolean DEFAULT false,
        "create" boolean DEFAULT false,
        "update" boolean DEFAULT false,
        "delete" boolean DEFAULT false
      );
    `)

    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'users_module_permissions_parent_id_fk'
        ) THEN
          ALTER TABLE "users_module_permissions"
            ADD CONSTRAINT "users_module_permissions_parent_id_fk"
            FOREIGN KEY ("_parent_id")
            REFERENCES "public"."users"("id")
            ON DELETE cascade
            ON UPDATE no action;
        END IF;
      END $$;
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS "users_module_permissions_order_idx"
        ON "users_module_permissions" USING btree ("_order");
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS "users_module_permissions_parent_id_idx"
        ON "users_module_permissions" USING btree ("_parent_id");
    `)

    await client.query(`
      ALTER TABLE "users_module_permissions"
        ALTER COLUMN "module" DROP NOT NULL;
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS "users_module_permissions_module" (
        "order" integer NOT NULL,
        "parent_id" varchar NOT NULL,
        "value" varchar NOT NULL
      );
    `)

    await client.query(`
      ALTER TABLE "users_module_permissions_module"
        ALTER COLUMN "value" TYPE varchar USING "value"::text;
    `)

    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'users_module_permissions_module_parent_id_fk'
        ) THEN
          ALTER TABLE "users_module_permissions_module"
            ADD CONSTRAINT "users_module_permissions_module_parent_id_fk"
            FOREIGN KEY ("parent_id")
            REFERENCES "public"."users_module_permissions"("id")
            ON DELETE cascade
            ON UPDATE no action;
        END IF;
      END $$;
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS "users_module_permissions_module_order_idx"
        ON "users_module_permissions_module" USING btree ("order");
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS "users_module_permissions_module_parent_id_idx"
        ON "users_module_permissions_module" USING btree ("parent_id");
    `)

    await client.query(`
      INSERT INTO "users_module_permissions_module" ("order", "parent_id", "value")
      SELECT 1, "id", "module"
      FROM "users_module_permissions"
      WHERE "module" IS NOT NULL
        AND NOT EXISTS (
          SELECT 1
          FROM "users_module_permissions_module"
          WHERE "users_module_permissions_module"."parent_id" = "users_module_permissions"."id"
            AND "users_module_permissions_module"."value"::text = "users_module_permissions"."module"::text
        );
    `)

    await client.query(`
      UPDATE "users"
      SET "super_admin" = true
      WHERE NOT EXISTS (
        SELECT 1 FROM "users" WHERE "super_admin" = true
      );
    `)

    await client.query(`
      INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at")
      SELECT '20260508_000000_add_rbac_to_users',
             COALESCE((SELECT MAX("batch") FROM "payload_migrations"), 0) + 1,
             NOW(),
             NOW()
      WHERE EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = 'payload_migrations'
      )
      AND NOT EXISTS (
        SELECT 1
        FROM "payload_migrations"
        WHERE "name" = '20260508_000000_add_rbac_to_users'
      );
    `)

    await client.query(`
      INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at")
      SELECT '20260508_010000_make_rbac_modules_multi_select',
             COALESCE((SELECT MAX("batch") FROM "payload_migrations"), 0) + 1,
             NOW(),
             NOW()
      WHERE EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = 'payload_migrations'
      )
      AND NOT EXISTS (
        SELECT 1
        FROM "payload_migrations"
        WHERE "name" = '20260508_010000_make_rbac_modules_multi_select'
      );
    `)

    await client.query('COMMIT')
    console.log('RBAC migration applied successfully.')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('RBAC migration failed:', error)
    process.exitCode = 1
  } finally {
    await client.end()
  }
}

main()
