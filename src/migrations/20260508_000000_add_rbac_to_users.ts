import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "super_admin" boolean DEFAULT false;

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

    CREATE INDEX IF NOT EXISTS "users_module_permissions_order_idx"
      ON "users_module_permissions" USING btree ("_order");

    CREATE INDEX IF NOT EXISTS "users_module_permissions_parent_id_idx"
      ON "users_module_permissions" USING btree ("_parent_id");

    UPDATE "users"
    SET "super_admin" = true
    WHERE NOT EXISTS (
      SELECT 1 FROM "users" WHERE "super_admin" = true
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "users_module_permissions" CASCADE;

    ALTER TABLE "users"
      DROP COLUMN IF EXISTS "super_admin";
  `)
}
