import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_dynamic_pages_blocks_section_block_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_section_block_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_posts_block_populate_by" AS ENUM('latest', 'selection');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_events_block_populate_by" AS ENUM('latest', 'selection');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_notifications_block_populate_by" AS ENUM('latest', 'selection');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_courses_block_populate_by" AS ENUM('latest', 'selection');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_custom_block_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_custom_block_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_custom_block_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_section_block_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_section_block_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_posts_block_populate_by" AS ENUM('latest', 'selection');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_events_block_populate_by" AS ENUM('latest', 'selection');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_notifications_block_populate_by" AS ENUM('latest', 'selection');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_courses_block_populate_by" AS ENUM('latest', 'selection');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_custom_block_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_custom_block_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_custom_block_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TABLE "dynamic_pages_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order_no" numeric,
  	"text_alignment" "enum_dynamic_pages_blocks_section_block_text_alignment" DEFAULT 'left',
  	"image_position" "enum_dynamic_pages_blocks_section_block_image_position" DEFAULT 'right',
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"bg_image_id" integer,
  	"bg_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_posts_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Latest Articles',
  	"subheading" varchar DEFAULT 'Blog & Articles',
  	"description" varchar,
  	"populate_by" "enum_dynamic_pages_blocks_posts_block_populate_by" DEFAULT 'latest',
  	"limit" numeric DEFAULT 6,
  	"view_all_link" varchar DEFAULT '/blog',
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_events_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"subheading" varchar DEFAULT 'Events & Webinars',
  	"description" varchar,
  	"populate_by" "enum_dynamic_pages_blocks_events_block_populate_by" DEFAULT 'latest',
  	"limit" numeric DEFAULT 6,
  	"view_all_link" varchar DEFAULT '/events',
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_notifications_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Notifications & Updates',
  	"subheading" varchar DEFAULT 'Latest Updates',
  	"description" varchar,
  	"show_vacancies" boolean DEFAULT true,
  	"show_syllabus" boolean DEFAULT true,
  	"show_events" boolean DEFAULT true,
  	"populate_by" "enum_dynamic_pages_blocks_notifications_block_populate_by" DEFAULT 'latest',
  	"limit" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_courses_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Courses',
  	"subheading" varchar DEFAULT 'Judiciary Preparation',
  	"description" varchar,
  	"populate_by" "enum_dynamic_pages_blocks_courses_block_populate_by" DEFAULT 'latest',
  	"limit" numeric DEFAULT 6,
  	"view_all_link" varchar DEFAULT '/courses',
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_slider_block_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"caption" varchar,
  	"link" varchar,
  	"link_label" varchar DEFAULT 'Learn More'
  );
  
  CREATE TABLE "dynamic_pages_blocks_slider_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"auto_play" boolean DEFAULT true,
  	"auto_play_interval" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_custom_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"content" jsonb,
  	"raw_html" varchar,
  	"background_color" varchar DEFAULT '#ffffff',
  	"text_alignment" "enum_dynamic_pages_blocks_custom_block_text_alignment" DEFAULT 'left',
  	"padding_top" "enum_dynamic_pages_blocks_custom_block_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_dynamic_pages_blocks_custom_block_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"order_no" numeric,
  	"text_alignment" "enum__dynamic_pages_v_blocks_section_block_text_alignment" DEFAULT 'left',
  	"image_position" "enum__dynamic_pages_v_blocks_section_block_image_position" DEFAULT 'right',
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"bg_image_id" integer,
  	"bg_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_posts_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Latest Articles',
  	"subheading" varchar DEFAULT 'Blog & Articles',
  	"description" varchar,
  	"populate_by" "enum__dynamic_pages_v_blocks_posts_block_populate_by" DEFAULT 'latest',
  	"limit" numeric DEFAULT 6,
  	"view_all_link" varchar DEFAULT '/blog',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_events_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"subheading" varchar DEFAULT 'Events & Webinars',
  	"description" varchar,
  	"populate_by" "enum__dynamic_pages_v_blocks_events_block_populate_by" DEFAULT 'latest',
  	"limit" numeric DEFAULT 6,
  	"view_all_link" varchar DEFAULT '/events',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_notifications_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Notifications & Updates',
  	"subheading" varchar DEFAULT 'Latest Updates',
  	"description" varchar,
  	"show_vacancies" boolean DEFAULT true,
  	"show_syllabus" boolean DEFAULT true,
  	"show_events" boolean DEFAULT true,
  	"populate_by" "enum__dynamic_pages_v_blocks_notifications_block_populate_by" DEFAULT 'latest',
  	"limit" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_courses_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Courses',
  	"subheading" varchar DEFAULT 'Judiciary Preparation',
  	"description" varchar,
  	"populate_by" "enum__dynamic_pages_v_blocks_courses_block_populate_by" DEFAULT 'latest',
  	"limit" numeric DEFAULT 6,
  	"view_all_link" varchar DEFAULT '/courses',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_slider_block_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"caption" varchar,
  	"link" varchar,
  	"link_label" varchar DEFAULT 'Learn More',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_slider_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"auto_play" boolean DEFAULT true,
  	"auto_play_interval" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_custom_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"content" jsonb,
  	"raw_html" varchar,
  	"background_color" varchar DEFAULT '#ffffff',
  	"text_alignment" "enum__dynamic_pages_v_blocks_custom_block_text_alignment" DEFAULT 'left',
  	"padding_top" "enum__dynamic_pages_v_blocks_custom_block_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum__dynamic_pages_v_blocks_custom_block_padding_bottom" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "dynamic_pages_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "dynamic_pages_rels" ADD COLUMN "vacancies_id" integer;
  ALTER TABLE "dynamic_pages_rels" ADD COLUMN "syllabus_states_id" integer;
  ALTER TABLE "_dynamic_pages_v_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "_dynamic_pages_v_rels" ADD COLUMN "vacancies_id" integer;
  ALTER TABLE "_dynamic_pages_v_rels" ADD COLUMN "syllabus_states_id" integer;
  ALTER TABLE "dynamic_pages_blocks_section_block" ADD CONSTRAINT "dynamic_pages_blocks_section_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_section_block" ADD CONSTRAINT "dynamic_pages_blocks_section_block_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_section_block" ADD CONSTRAINT "dynamic_pages_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_posts_block" ADD CONSTRAINT "dynamic_pages_blocks_posts_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_events_block" ADD CONSTRAINT "dynamic_pages_blocks_events_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_notifications_block" ADD CONSTRAINT "dynamic_pages_blocks_notifications_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_courses_block" ADD CONSTRAINT "dynamic_pages_blocks_courses_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_slider_block_slides" ADD CONSTRAINT "dynamic_pages_blocks_slider_block_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_slider_block_slides" ADD CONSTRAINT "dynamic_pages_blocks_slider_block_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_slider_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_slider_block" ADD CONSTRAINT "dynamic_pages_blocks_slider_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_custom_block" ADD CONSTRAINT "dynamic_pages_blocks_custom_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_section_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_section_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_section_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_section_block_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_section_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_posts_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_posts_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_events_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_events_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_notifications_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_notifications_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_courses_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_courses_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_slider_block_slides" ADD CONSTRAINT "_dynamic_pages_v_blocks_slider_block_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_slider_block_slides" ADD CONSTRAINT "_dynamic_pages_v_blocks_slider_block_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_slider_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_slider_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_slider_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_custom_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_custom_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "dynamic_pages_blocks_section_block_order_idx" ON "dynamic_pages_blocks_section_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_section_block_parent_id_idx" ON "dynamic_pages_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_section_block_path_idx" ON "dynamic_pages_blocks_section_block" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_section_block_image_idx" ON "dynamic_pages_blocks_section_block" USING btree ("image_id");
  CREATE INDEX "dynamic_pages_blocks_section_block_bg_image_idx" ON "dynamic_pages_blocks_section_block" USING btree ("bg_image_id");
  CREATE INDEX "dynamic_pages_blocks_posts_block_order_idx" ON "dynamic_pages_blocks_posts_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_posts_block_parent_id_idx" ON "dynamic_pages_blocks_posts_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_posts_block_path_idx" ON "dynamic_pages_blocks_posts_block" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_events_block_order_idx" ON "dynamic_pages_blocks_events_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_events_block_parent_id_idx" ON "dynamic_pages_blocks_events_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_events_block_path_idx" ON "dynamic_pages_blocks_events_block" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_notifications_block_order_idx" ON "dynamic_pages_blocks_notifications_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_notifications_block_parent_id_idx" ON "dynamic_pages_blocks_notifications_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_notifications_block_path_idx" ON "dynamic_pages_blocks_notifications_block" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_courses_block_order_idx" ON "dynamic_pages_blocks_courses_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_courses_block_parent_id_idx" ON "dynamic_pages_blocks_courses_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_courses_block_path_idx" ON "dynamic_pages_blocks_courses_block" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_slider_block_slides_order_idx" ON "dynamic_pages_blocks_slider_block_slides" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_slider_block_slides_parent_id_idx" ON "dynamic_pages_blocks_slider_block_slides" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_slider_block_slides_image_idx" ON "dynamic_pages_blocks_slider_block_slides" USING btree ("image_id");
  CREATE INDEX "dynamic_pages_blocks_slider_block_order_idx" ON "dynamic_pages_blocks_slider_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_slider_block_parent_id_idx" ON "dynamic_pages_blocks_slider_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_slider_block_path_idx" ON "dynamic_pages_blocks_slider_block" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_custom_block_order_idx" ON "dynamic_pages_blocks_custom_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_custom_block_parent_id_idx" ON "dynamic_pages_blocks_custom_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_custom_block_path_idx" ON "dynamic_pages_blocks_custom_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_section_block_order_idx" ON "_dynamic_pages_v_blocks_section_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_section_block_parent_id_idx" ON "_dynamic_pages_v_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_section_block_path_idx" ON "_dynamic_pages_v_blocks_section_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_section_block_image_idx" ON "_dynamic_pages_v_blocks_section_block" USING btree ("image_id");
  CREATE INDEX "_dynamic_pages_v_blocks_section_block_bg_image_idx" ON "_dynamic_pages_v_blocks_section_block" USING btree ("bg_image_id");
  CREATE INDEX "_dynamic_pages_v_blocks_posts_block_order_idx" ON "_dynamic_pages_v_blocks_posts_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_posts_block_parent_id_idx" ON "_dynamic_pages_v_blocks_posts_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_posts_block_path_idx" ON "_dynamic_pages_v_blocks_posts_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_events_block_order_idx" ON "_dynamic_pages_v_blocks_events_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_events_block_parent_id_idx" ON "_dynamic_pages_v_blocks_events_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_events_block_path_idx" ON "_dynamic_pages_v_blocks_events_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_notifications_block_order_idx" ON "_dynamic_pages_v_blocks_notifications_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_notifications_block_parent_id_idx" ON "_dynamic_pages_v_blocks_notifications_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_notifications_block_path_idx" ON "_dynamic_pages_v_blocks_notifications_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_courses_block_order_idx" ON "_dynamic_pages_v_blocks_courses_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_courses_block_parent_id_idx" ON "_dynamic_pages_v_blocks_courses_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_courses_block_path_idx" ON "_dynamic_pages_v_blocks_courses_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_slider_block_slides_order_idx" ON "_dynamic_pages_v_blocks_slider_block_slides" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_slider_block_slides_parent_id_idx" ON "_dynamic_pages_v_blocks_slider_block_slides" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_slider_block_slides_image_idx" ON "_dynamic_pages_v_blocks_slider_block_slides" USING btree ("image_id");
  CREATE INDEX "_dynamic_pages_v_blocks_slider_block_order_idx" ON "_dynamic_pages_v_blocks_slider_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_slider_block_parent_id_idx" ON "_dynamic_pages_v_blocks_slider_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_slider_block_path_idx" ON "_dynamic_pages_v_blocks_slider_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_custom_block_order_idx" ON "_dynamic_pages_v_blocks_custom_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_custom_block_parent_id_idx" ON "_dynamic_pages_v_blocks_custom_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_custom_block_path_idx" ON "_dynamic_pages_v_blocks_custom_block" USING btree ("_path");
  ALTER TABLE "dynamic_pages_rels" ADD CONSTRAINT "dynamic_pages_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_rels" ADD CONSTRAINT "dynamic_pages_rels_vacancies_fk" FOREIGN KEY ("vacancies_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_rels" ADD CONSTRAINT "dynamic_pages_rels_syllabus_states_fk" FOREIGN KEY ("syllabus_states_id") REFERENCES "public"."syllabus_states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_rels" ADD CONSTRAINT "_dynamic_pages_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_rels" ADD CONSTRAINT "_dynamic_pages_v_rels_vacancies_fk" FOREIGN KEY ("vacancies_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_rels" ADD CONSTRAINT "_dynamic_pages_v_rels_syllabus_states_fk" FOREIGN KEY ("syllabus_states_id") REFERENCES "public"."syllabus_states"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "dynamic_pages_rels_events_id_idx" ON "dynamic_pages_rels" USING btree ("events_id");
  CREATE INDEX "dynamic_pages_rels_vacancies_id_idx" ON "dynamic_pages_rels" USING btree ("vacancies_id");
  CREATE INDEX "dynamic_pages_rels_syllabus_states_id_idx" ON "dynamic_pages_rels" USING btree ("syllabus_states_id");
  CREATE INDEX "_dynamic_pages_v_rels_events_id_idx" ON "_dynamic_pages_v_rels" USING btree ("events_id");
  CREATE INDEX "_dynamic_pages_v_rels_vacancies_id_idx" ON "_dynamic_pages_v_rels" USING btree ("vacancies_id");
  CREATE INDEX "_dynamic_pages_v_rels_syllabus_states_id_idx" ON "_dynamic_pages_v_rels" USING btree ("syllabus_states_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dynamic_pages_blocks_section_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_posts_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_events_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_notifications_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_courses_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_slider_block_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_slider_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_custom_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_section_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_posts_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_events_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_notifications_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_courses_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_slider_block_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_slider_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_custom_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "dynamic_pages_blocks_section_block" CASCADE;
  DROP TABLE "dynamic_pages_blocks_posts_block" CASCADE;
  DROP TABLE "dynamic_pages_blocks_events_block" CASCADE;
  DROP TABLE "dynamic_pages_blocks_notifications_block" CASCADE;
  DROP TABLE "dynamic_pages_blocks_courses_block" CASCADE;
  DROP TABLE "dynamic_pages_blocks_slider_block_slides" CASCADE;
  DROP TABLE "dynamic_pages_blocks_slider_block" CASCADE;
  DROP TABLE "dynamic_pages_blocks_custom_block" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_section_block" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_posts_block" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_events_block" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_notifications_block" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_courses_block" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_slider_block_slides" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_slider_block" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_custom_block" CASCADE;
  ALTER TABLE "dynamic_pages_rels" DROP CONSTRAINT "dynamic_pages_rels_events_fk";
  
  ALTER TABLE "dynamic_pages_rels" DROP CONSTRAINT "dynamic_pages_rels_vacancies_fk";
  
  ALTER TABLE "dynamic_pages_rels" DROP CONSTRAINT "dynamic_pages_rels_syllabus_states_fk";
  
  ALTER TABLE "_dynamic_pages_v_rels" DROP CONSTRAINT "_dynamic_pages_v_rels_events_fk";
  
  ALTER TABLE "_dynamic_pages_v_rels" DROP CONSTRAINT "_dynamic_pages_v_rels_vacancies_fk";
  
  ALTER TABLE "_dynamic_pages_v_rels" DROP CONSTRAINT "_dynamic_pages_v_rels_syllabus_states_fk";
  
  DROP INDEX "dynamic_pages_rels_events_id_idx";
  DROP INDEX "dynamic_pages_rels_vacancies_id_idx";
  DROP INDEX "dynamic_pages_rels_syllabus_states_id_idx";
  DROP INDEX "_dynamic_pages_v_rels_events_id_idx";
  DROP INDEX "_dynamic_pages_v_rels_vacancies_id_idx";
  DROP INDEX "_dynamic_pages_v_rels_syllabus_states_id_idx";
  ALTER TABLE "dynamic_pages_rels" DROP COLUMN "events_id";
  ALTER TABLE "dynamic_pages_rels" DROP COLUMN "vacancies_id";
  ALTER TABLE "dynamic_pages_rels" DROP COLUMN "syllabus_states_id";
  ALTER TABLE "_dynamic_pages_v_rels" DROP COLUMN "events_id";
  ALTER TABLE "_dynamic_pages_v_rels" DROP COLUMN "vacancies_id";
  ALTER TABLE "_dynamic_pages_v_rels" DROP COLUMN "syllabus_states_id";
  DROP TYPE "public"."enum_dynamic_pages_blocks_section_block_text_alignment";
  DROP TYPE "public"."enum_dynamic_pages_blocks_section_block_image_position";
  DROP TYPE "public"."enum_dynamic_pages_blocks_posts_block_populate_by";
  DROP TYPE "public"."enum_dynamic_pages_blocks_events_block_populate_by";
  DROP TYPE "public"."enum_dynamic_pages_blocks_notifications_block_populate_by";
  DROP TYPE "public"."enum_dynamic_pages_blocks_courses_block_populate_by";
  DROP TYPE "public"."enum_dynamic_pages_blocks_custom_block_text_alignment";
  DROP TYPE "public"."enum_dynamic_pages_blocks_custom_block_padding_top";
  DROP TYPE "public"."enum_dynamic_pages_blocks_custom_block_padding_bottom";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_section_block_text_alignment";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_section_block_image_position";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_posts_block_populate_by";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_events_block_populate_by";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_notifications_block_populate_by";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_courses_block_populate_by";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_custom_block_text_alignment";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_custom_block_padding_top";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_custom_block_padding_bottom";`)
}
