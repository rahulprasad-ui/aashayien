import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users_module_permissions"
      ALTER COLUMN "module" DROP NOT NULL;

    CREATE TABLE IF NOT EXISTS "users_module_permissions_module" (
      "order" integer NOT NULL,
      "parent_id" varchar NOT NULL,
      "value" varchar NOT NULL
    );

    ALTER TABLE "users_module_permissions_module"
      ALTER COLUMN "value" TYPE varchar USING "value"::text;

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

    CREATE INDEX IF NOT EXISTS "users_module_permissions_module_order_idx"
      ON "users_module_permissions_module" USING btree ("order");

    CREATE INDEX IF NOT EXISTS "users_module_permissions_module_parent_id_idx"
      ON "users_module_permissions_module" USING btree ("parent_id");

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
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "users_module_permissions"
    SET "module" = "users_module_permissions_module"."value"
    FROM "users_module_permissions_module"
    WHERE "users_module_permissions_module"."parent_id" = "users_module_permissions"."id"
      AND "users_module_permissions_module"."order" = 1
      AND "users_module_permissions"."module" IS NULL;

    DROP TABLE IF EXISTS "users_module_permissions_module" CASCADE;

    ALTER TABLE "users_module_permissions"
      ALTER COLUMN "module" SET NOT NULL;
  `)
}
