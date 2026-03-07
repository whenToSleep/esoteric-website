import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_categories" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "service_categories" ADD CONSTRAINT "service_categories_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "service_categories_hero_image_idx" ON "service_categories" USING btree ("hero_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_categories" DROP CONSTRAINT "service_categories_hero_image_id_media_id_fk";
  
  DROP INDEX "service_categories_hero_image_idx";
  ALTER TABLE "service_categories" DROP COLUMN "hero_image_id";`)
}
