import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "services_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "services_locales" ADD COLUMN "duration" varchar;
  UPDATE "services_locales" SET "price" = "services"."price", "duration" = "services"."duration" FROM "services" WHERE "services_locales"."_parent_id" = "services"."id";
  ALTER TABLE "services" DROP COLUMN "price";
  ALTER TABLE "services" DROP COLUMN "duration";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ADD COLUMN "price" varchar;
  ALTER TABLE "services" ADD COLUMN "duration" varchar;
  ALTER TABLE "services_locales" DROP COLUMN "price";
  ALTER TABLE "services_locales" DROP COLUMN "duration";`)
}
