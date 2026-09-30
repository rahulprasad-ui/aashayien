import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_popular_courses_view_all_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_popular_courses_view_all_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_home_success_stories_view_all_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_success_stories_view_all_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_home_resources_fetch_type" AS ENUM('custom', 'latest', 'mostViewed');
  CREATE TYPE "public"."enum_home_resources_view_all_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_resources_view_all_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "resources_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"category_id" integer NOT NULL,
  	"duration" varchar,
  	"views" varchar,
  	"upload_date" timestamp(3) with time zone,
  	"youtube_id" varchar,
  	"thumbnail_id" integer,
  	"external_thumbnail_url" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resource_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "course_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "course" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Transform Your Judiciary Dreams Into Reality' NOT NULL,
  	"hero_subtitle" varchar DEFAULT 'India''s most comprehensive judiciary exam preparation with expert faculty, proven teaching methodology, and a track record of top rankers',
  	"offer_strip_text" jsonb,
  	"offer_strip_is_active" boolean DEFAULT true,
  	"help_widget_title" varchar DEFAULT 'Need Help Choosing?',
  	"help_widget_description" varchar DEFAULT 'Get FREE counseling from our experts',
  	"help_widget_whatsapp_link" varchar DEFAULT 'https://wa.me/919111198177?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20courses',
  	"help_widget_call_number" varchar DEFAULT '+919111198177',
  	"help_widget_availability_text" varchar DEFAULT 'Available Mon-Sat, 9 AM - 8 PM',
  	"counselling_widget_button_text" varchar DEFAULT 'Get Free Counselling',
  	"counselling_widget_link" varchar,
  	"community_title" varchar DEFAULT 'Join Our Free Community',
  	"community_description" varchar DEFAULT 'Get daily current affairs, judgment summaries, and free study materials. Connect with Nitesh Sir and thousands of aspiring judicial officers!',
  	"community_image_id" integer,
  	"telegram_link" varchar DEFAULT 'https://t.me/aashayeinjudiciary',
  	"app_link" varchar DEFAULT 'https://rzp.io/rzp/aashayein',
  	"faq_title" varchar DEFAULT 'Frequently Asked Questions',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "course_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer
  );
  
  CREATE TABLE "success_stories_page_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "success_stories_page_counselling_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "success_stories_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Celebrating Excellence & Achievement' NOT NULL,
  	"hero_description" varchar DEFAULT 'Meet our brilliant students who achieved their dreams with dedication, hard work, and the right guidance. Their success is our pride.',
  	"counselling_image_id" integer,
  	"counselling_title" varchar DEFAULT 'Get Free Personalized Counselling',
  	"counselling_description" varchar DEFAULT 'Not sure which course is right for you? Book a free one-on-one counselling session with our expert mentors. Get personalized guidance based on your preparation level, target exam, and career goals.',
  	"counselling_button_text" varchar DEFAULT 'Book Free Counselling Now',
  	"counselling_button_link" varchar DEFAULT 'https://wa.me/919667898146?text=I%20want%20to%20book%20a%20free%20counselling%20session',
  	"brochure_title" varchar DEFAULT 'Download Our Success Stories Brochure',
  	"brochure_description" varchar DEFAULT 'Get detailed insights into our students'' success journeys, course details, and preparation strategies. Download our comprehensive brochure now!',
  	"brochure_button_text" varchar DEFAULT 'Download Brochure',
  	"cta_title" varchar DEFAULT 'Be The Next Success Story',
  	"cta_description" varchar DEFAULT 'Join thousands of successful aspirants who achieved their dreams with Aashayein Judiciary. Your journey to success starts here.',
  	"cta_enroll_button_text" varchar DEFAULT 'Enroll Now',
  	"cta_enroll_button_link" varchar DEFAULT 'https://rzp.io/rzp/aashayein',
  	"cta_talk_button_text" varchar DEFAULT 'Talk to Us',
  	"cta_talk_button_link" varchar DEFAULT 'https://wa.me/919667898146',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "free_study" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_text" varchar DEFAULT 'Free Study Resources',
  	"title" varchar DEFAULT 'Free Study Online',
  	"subtitle" varchar DEFAULT 'Access our complete library of free video lectures, case law analysis, study tips, and expert guidance for judiciary exam preparation by Nitesh Pahuja Sir.',
  	"brochure_file_id" integer,
  	"button_text" varchar DEFAULT 'Download Brochure',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "home" ALTER COLUMN "popular_courses_title" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "success_stories_title" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "resource_categories_id" integer;
  ALTER TABLE "home" ADD COLUMN "popular_courses_subtitle" varchar DEFAULT 'Choose Your Path to Success';
  ALTER TABLE "home" ADD COLUMN "popular_courses_view_all_link_type" "enum_home_popular_courses_view_all_link_type" DEFAULT 'none';
  ALTER TABLE "home" ADD COLUMN "popular_courses_view_all_link_new_tab" boolean;
  ALTER TABLE "home" ADD COLUMN "popular_courses_view_all_link_url" varchar;
  ALTER TABLE "home" ADD COLUMN "popular_courses_view_all_link_label" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN "popular_courses_view_all_link_appearance" "enum_home_popular_courses_view_all_link_appearance" DEFAULT 'default';
  ALTER TABLE "home" ADD COLUMN "success_stories_subtitle" varchar DEFAULT 'Join the Ranks of Successful Judiciary Aspirants';
  ALTER TABLE "home" ADD COLUMN "success_stories_view_all_link_type" "enum_home_success_stories_view_all_link_type" DEFAULT 'none';
  ALTER TABLE "home" ADD COLUMN "success_stories_view_all_link_new_tab" boolean;
  ALTER TABLE "home" ADD COLUMN "success_stories_view_all_link_url" varchar;
  ALTER TABLE "home" ADD COLUMN "success_stories_view_all_link_label" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN "success_stories_view_all_link_appearance" "enum_home_success_stories_view_all_link_appearance" DEFAULT 'default';
  ALTER TABLE "home" ADD COLUMN "resources_title" varchar;
  ALTER TABLE "home" ADD COLUMN "resources_subtitle" varchar;
  ALTER TABLE "home" ADD COLUMN "resources_description" varchar;
  ALTER TABLE "home" ADD COLUMN "resources_fetch_type" "enum_home_resources_fetch_type" DEFAULT 'latest';
  ALTER TABLE "home" ADD COLUMN "resources_limit" numeric DEFAULT 3;
  ALTER TABLE "home" ADD COLUMN "resources_view_all_link_type" "enum_home_resources_view_all_link_type" DEFAULT 'none';
  ALTER TABLE "home" ADD COLUMN "resources_view_all_link_new_tab" boolean;
  ALTER TABLE "home" ADD COLUMN "resources_view_all_link_url" varchar;
  ALTER TABLE "home" ADD COLUMN "resources_view_all_link_label" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN "resources_view_all_link_appearance" "enum_home_resources_view_all_link_appearance" DEFAULT 'default';
  ALTER TABLE "home_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "resources_tags" ADD CONSTRAINT "resources_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_category_id_resource_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."resource_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_hero_stats" ADD CONSTRAINT "course_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "course" ADD CONSTRAINT "course_community_image_id_media_id_fk" FOREIGN KEY ("community_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_rels" ADD CONSTRAINT "course_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "course_rels" ADD CONSTRAINT "course_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_page_hero_stats" ADD CONSTRAINT "success_stories_page_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_page_counselling_checklist" ADD CONSTRAINT "success_stories_page_counselling_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_page" ADD CONSTRAINT "success_stories_page_counselling_image_id_media_id_fk" FOREIGN KEY ("counselling_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "free_study" ADD CONSTRAINT "free_study_brochure_file_id_media_id_fk" FOREIGN KEY ("brochure_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "resources_tags_order_idx" ON "resources_tags" USING btree ("_order");
  CREATE INDEX "resources_tags_parent_id_idx" ON "resources_tags" USING btree ("_parent_id");
  CREATE INDEX "resources_category_idx" ON "resources" USING btree ("category_id");
  CREATE INDEX "resources_thumbnail_idx" ON "resources" USING btree ("thumbnail_id");
  CREATE UNIQUE INDEX "resources_slug_idx" ON "resources" USING btree ("slug");
  CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE UNIQUE INDEX "resource_categories_slug_idx" ON "resource_categories" USING btree ("slug");
  CREATE INDEX "resource_categories_updated_at_idx" ON "resource_categories" USING btree ("updated_at");
  CREATE INDEX "resource_categories_created_at_idx" ON "resource_categories" USING btree ("created_at");
  CREATE INDEX "course_hero_stats_order_idx" ON "course_hero_stats" USING btree ("_order");
  CREATE INDEX "course_hero_stats_parent_id_idx" ON "course_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "course_community_image_idx" ON "course" USING btree ("community_image_id");
  CREATE INDEX "course_rels_order_idx" ON "course_rels" USING btree ("order");
  CREATE INDEX "course_rels_parent_idx" ON "course_rels" USING btree ("parent_id");
  CREATE INDEX "course_rels_path_idx" ON "course_rels" USING btree ("path");
  CREATE INDEX "course_rels_faqs_id_idx" ON "course_rels" USING btree ("faqs_id");
  CREATE INDEX "success_stories_page_hero_stats_order_idx" ON "success_stories_page_hero_stats" USING btree ("_order");
  CREATE INDEX "success_stories_page_hero_stats_parent_id_idx" ON "success_stories_page_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "success_stories_page_counselling_checklist_order_idx" ON "success_stories_page_counselling_checklist" USING btree ("_order");
  CREATE INDEX "success_stories_page_counselling_checklist_parent_id_idx" ON "success_stories_page_counselling_checklist" USING btree ("_parent_id");
  CREATE INDEX "success_stories_page_counselling_image_idx" ON "success_stories_page" USING btree ("counselling_image_id");
  CREATE INDEX "free_study_brochure_file_idx" ON "free_study" USING btree ("brochure_file_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resource_categories_fk" FOREIGN KEY ("resource_categories_id") REFERENCES "public"."resource_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_resource_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("resource_categories_id");
  CREATE INDEX "home_rels_resources_id_idx" ON "home_rels" USING btree ("resources_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "resources_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resource_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "course_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "course" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "course_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_page_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_page_counselling_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "free_study" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "resources_tags" CASCADE;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "resource_categories" CASCADE;
  DROP TABLE "course_hero_stats" CASCADE;
  DROP TABLE "course" CASCADE;
  DROP TABLE "course_rels" CASCADE;
  DROP TABLE "success_stories_page_hero_stats" CASCADE;
  DROP TABLE "success_stories_page_counselling_checklist" CASCADE;
  DROP TABLE "success_stories_page" CASCADE;
  DROP TABLE "free_study" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_resources_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_resource_categories_fk";
  
  ALTER TABLE "home_rels" DROP CONSTRAINT "home_rels_resources_fk";
  
  DROP INDEX "payload_locked_documents_rels_resources_id_idx";
  DROP INDEX "payload_locked_documents_rels_resource_categories_id_idx";
  DROP INDEX "home_rels_resources_id_idx";
  ALTER TABLE "home" ALTER COLUMN "popular_courses_title" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "success_stories_title" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "resources_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "resource_categories_id";
  ALTER TABLE "home" DROP COLUMN "popular_courses_subtitle";
  ALTER TABLE "home" DROP COLUMN "popular_courses_view_all_link_type";
  ALTER TABLE "home" DROP COLUMN "popular_courses_view_all_link_new_tab";
  ALTER TABLE "home" DROP COLUMN "popular_courses_view_all_link_url";
  ALTER TABLE "home" DROP COLUMN "popular_courses_view_all_link_label";
  ALTER TABLE "home" DROP COLUMN "popular_courses_view_all_link_appearance";
  ALTER TABLE "home" DROP COLUMN "success_stories_subtitle";
  ALTER TABLE "home" DROP COLUMN "success_stories_view_all_link_type";
  ALTER TABLE "home" DROP COLUMN "success_stories_view_all_link_new_tab";
  ALTER TABLE "home" DROP COLUMN "success_stories_view_all_link_url";
  ALTER TABLE "home" DROP COLUMN "success_stories_view_all_link_label";
  ALTER TABLE "home" DROP COLUMN "success_stories_view_all_link_appearance";
  ALTER TABLE "home" DROP COLUMN "resources_title";
  ALTER TABLE "home" DROP COLUMN "resources_subtitle";
  ALTER TABLE "home" DROP COLUMN "resources_description";
  ALTER TABLE "home" DROP COLUMN "resources_fetch_type";
  ALTER TABLE "home" DROP COLUMN "resources_limit";
  ALTER TABLE "home" DROP COLUMN "resources_view_all_link_type";
  ALTER TABLE "home" DROP COLUMN "resources_view_all_link_new_tab";
  ALTER TABLE "home" DROP COLUMN "resources_view_all_link_url";
  ALTER TABLE "home" DROP COLUMN "resources_view_all_link_label";
  ALTER TABLE "home" DROP COLUMN "resources_view_all_link_appearance";
  ALTER TABLE "home_rels" DROP COLUMN "resources_id";
  DROP TYPE "public"."enum_home_popular_courses_view_all_link_type";
  DROP TYPE "public"."enum_home_popular_courses_view_all_link_appearance";
  DROP TYPE "public"."enum_home_success_stories_view_all_link_type";
  DROP TYPE "public"."enum_home_success_stories_view_all_link_appearance";
  DROP TYPE "public"."enum_home_resources_fetch_type";
  DROP TYPE "public"."enum_home_resources_view_all_link_type";
  DROP TYPE "public"."enum_home_resources_view_all_link_appearance";`)
}
