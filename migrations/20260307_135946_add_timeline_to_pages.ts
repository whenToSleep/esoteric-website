import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL
  );
  
  CREATE TABLE "pages_timeline_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_timeline" ADD CONSTRAINT "pages_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_timeline_locales" ADD CONSTRAINT "pages_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_timeline"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_timeline_order_idx" ON "pages_timeline" USING btree ("_order");
  CREATE INDEX "pages_timeline_parent_id_idx" ON "pages_timeline" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_timeline_locales_locale_parent_id_unique" ON "pages_timeline_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_timeline" CASCADE;
  DROP TABLE "pages_timeline_locales" CASCADE;`)
}
