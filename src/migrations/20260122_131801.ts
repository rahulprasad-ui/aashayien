import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_courses_target_states" AS ENUM('Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Rajasthan', 'Delhi', 'Maharashtra', 'Gujarat', 'Punjab', 'Haryana', 'Uttarakhand', 'Jharkhand', 'Chhattisgarh', 'All States');
  CREATE TYPE "public"."enum_courses_demo_videos_type" AS ENUM('youtube', 'upload');
  CREATE TYPE "public"."enum_courses_category" AS ENUM('live', 'recorded', 'test-series', 'other');
  CREATE TYPE "public"."enum_success_stories_category" AS ENUM('judiciary', 'adpo', 'mains', 'test-series', 'interview');
  CREATE TYPE "public"."enum_success_stories_state" AS ENUM('Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Rajasthan', 'Delhi', 'Maharashtra', 'Gujarat', 'Punjab', 'Haryana', 'Uttarakhand', 'Jharkhand', 'Chhattisgarh', 'All States');
  CREATE TYPE "public"."enum_forms_blocks_checkbox_column_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_country_column_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_email_column_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_number_column_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_select_column_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_state_column_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_text_column_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_textarea_column_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_header_blocks_link_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_header_blocks_dropdown_items_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_header_blocks_mega_menu_columns_links_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_header_actions_actions_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_header_actions_actions_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'instagram', 'youtube', 'linkedin', 'telegram');
  CREATE TYPE "public"."enum_footer_popular_courses_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_footer_bottom_nav_links_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_slides_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_slides_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_home_popular_courses_fetch_type" AS ENUM('custom', 'latest', 'mostViewed');
  CREATE TYPE "public"."enum_home_success_stories_fetch_type" AS ENUM('custom', 'latest', 'mostViewed');
  ALTER TYPE "public"."enum_pages_hero_links_link_type" ADD VALUE 'none' BEFORE 'reference';
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_type" ADD VALUE 'none' BEFORE 'reference';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_type" ADD VALUE 'none' BEFORE 'reference';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_type" ADD VALUE 'none' BEFORE 'reference';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_type" ADD VALUE 'none' BEFORE 'reference';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_type" ADD VALUE 'none' BEFORE 'reference';
  ALTER TYPE "public"."enum_footer_nav_items_link_type" ADD VALUE 'none' BEFORE 'reference';
  CREATE TABLE "courses_target_states" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_courses_target_states",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "courses_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "courses_learning_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"outcome" varchar
  );
  
  CREATE TABLE "courses_curriculum_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  CREATE TABLE "courses_curriculum" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"lessons_count" numeric,
  	"duration" varchar
  );
  
  CREATE TABLE "courses_demo_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"type" "enum_courses_demo_videos_type" DEFAULT 'youtube' NOT NULL,
  	"youtube_url" varchar,
  	"video_file_id" integer,
  	"duration" varchar,
  	"topic" varchar,
  	"thumbnail_id" integer
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"subtitle" varchar,
  	"category" "enum_courses_category" DEFAULT 'live' NOT NULL,
  	"is_popular" boolean,
  	"is_best_seller" boolean,
  	"views" numeric DEFAULT 0,
  	"price" varchar NOT NULL,
  	"original_price" varchar,
  	"discount" varchar,
  	"thumbnail_id" integer NOT NULL,
  	"instructor_name" varchar NOT NULL,
  	"instructor_title" varchar,
  	"instructor_bio" varchar,
  	"instructor_image_id" integer,
  	"duration" varchar,
  	"lectures_count" numeric,
  	"language" varchar DEFAULT 'Hindi & English',
  	"level" varchar DEFAULT 'Beginner to Advanced',
  	"enrollment_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "success_stories_journey_custom_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"course_name" varchar
  );
  
  CREATE TABLE "success_stories_story_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"challenge" varchar
  );
  
  CREATE TABLE "success_stories_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"period" varchar,
  	"event" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "success_stories_tips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "success_stories_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "success_stories_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"resource" varchar
  );
  
  CREATE TABLE "success_stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_success_stories_category" NOT NULL,
  	"achievement" varchar,
  	"views" numeric DEFAULT 0,
  	"rank" numeric NOT NULL,
  	"rank_display" varchar,
  	"year" numeric,
  	"exam" varchar,
  	"state" "enum_success_stories_state",
  	"image_id" integer NOT NULL,
  	"video_url" varchar,
  	"student_info_current_position" varchar,
  	"student_info_location" varchar,
  	"student_info_education" varchar,
  	"journey_total_attempts" numeric,
  	"journey_preparation_duration" varchar,
  	"journey_batch_year" varchar,
  	"story_introduction" varchar,
  	"story_turning_point" varchar,
  	"story_preparation_prelims" varchar,
  	"story_preparation_mains" varchar,
  	"story_preparation_interview" varchar,
  	"testimonial_quote" varchar,
  	"testimonial_highlight" varchar,
  	"detailed_description" varchar,
  	"score" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "success_stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"courses_id" integer
  );
  
  CREATE TABLE "forms_blocks_captcha" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"required" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "header_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_blocks_link_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "header_blocks_dropdown_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_blocks_dropdown_items_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header_blocks_dropdown" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "header_blocks_mega_menu_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_blocks_mega_menu_columns_links_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header_blocks_mega_menu_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "header_blocks_mega_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "header_actions_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_actions_actions_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"style" "enum_header_actions_actions_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_popular_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_popular_courses_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_bottom_nav_links_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "home_slides_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar DEFAULT 'New Slide' NOT NULL,
  	"description" varchar,
  	"link_type" "enum_home_slides_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_home_slides_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "home_community_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "home_community_bottom_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "home_why_choose_us_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "home_why_choose_us_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"lead_title" varchar,
  	"lead_description" varchar,
  	"lead_form_id" integer,
  	"community_title" varchar,
  	"community_subtitle" varchar,
  	"community_description" jsonb,
  	"app_image_id" integer,
  	"floating_stats_stat1_value" varchar,
  	"floating_stats_stat1_label" varchar,
  	"floating_stats_stat2_value" varchar,
  	"floating_stats_stat2_label" varchar,
  	"app_link" varchar,
  	"telegram_link" varchar,
  	"youtube_link" varchar,
  	"why_choose_us_title" varchar,
  	"why_choose_us_description" varchar,
  	"popular_courses_title" varchar DEFAULT 'Popular Courses' NOT NULL,
  	"popular_courses_description" varchar,
  	"popular_courses_fetch_type" "enum_home_popular_courses_fetch_type" DEFAULT 'latest',
  	"popular_courses_limit" numeric DEFAULT 3,
  	"success_stories_title" varchar DEFAULT 'Success Stories' NOT NULL,
  	"success_stories_description" varchar,
  	"success_stories_fetch_type" "enum_home_success_stories_fetch_type" DEFAULT 'latest',
  	"success_stories_limit" numeric DEFAULT 3,
  	"faqs_title" varchar,
  	"faqs_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"courses_id" integer,
  	"success_stories_id" integer,
  	"faqs_id" integer
  );
  
  ALTER TABLE "payload_folders_folder_type" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  ALTER TABLE "media" DROP CONSTRAINT "media_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_folders_fk";
  
  DROP INDEX "media_folder_idx";
  DROP INDEX "payload_locked_documents_rels_payload_folders_id_idx";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_type" SET DEFAULT 'none';
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_type" SET DEFAULT 'none';
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_type" SET DEFAULT 'none';
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_type" SET DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_type" SET DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_type" SET DEFAULT 'none';
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'none';
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN "column_width" "enum_forms_blocks_checkbox_column_width";
  ALTER TABLE "forms_blocks_country" ADD COLUMN "column_width" "enum_forms_blocks_country_column_width";
  ALTER TABLE "forms_blocks_email" ADD COLUMN "column_width" "enum_forms_blocks_email_column_width";
  ALTER TABLE "forms_blocks_number" ADD COLUMN "column_width" "enum_forms_blocks_number_column_width";
  ALTER TABLE "forms_blocks_select" ADD COLUMN "column_width" "enum_forms_blocks_select_column_width";
  ALTER TABLE "forms_blocks_state" ADD COLUMN "column_width" "enum_forms_blocks_state_column_width";
  ALTER TABLE "forms_blocks_state" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "column_width" "enum_forms_blocks_text_column_width";
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "column_width" "enum_forms_blocks_textarea_column_width";
  ALTER TABLE "forms" ADD COLUMN "submission_count" numeric DEFAULT 0;
  ALTER TABLE "forms" ADD COLUMN "last_submission_date" timestamp(3) with time zone;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "success_stories_id" integer;
  ALTER TABLE "footer" ADD COLUMN "brand_description" varchar DEFAULT 'India''s premier judiciary coaching platform helping thousands of aspirants achieve their dreams of becoming judicial officers.';
  ALTER TABLE "footer" ADD COLUMN "contact_info_address" varchar DEFAULT '123 Legal District, New Delhi - 110001, India';
  ALTER TABLE "footer" ADD COLUMN "contact_info_phone" varchar DEFAULT '+91 123 456 7890';
  ALTER TABLE "footer" ADD COLUMN "contact_info_email" varchar DEFAULT 'info@aashayeinjudiciary.com';
  ALTER TABLE "footer" ADD COLUMN "contact_info_office_hours" varchar DEFAULT 'Mon - Sat: 9:00 AM - 6:00 PM
  Sunday: Closed';
  ALTER TABLE "footer" ADD COLUMN "bottom_nav_copyright" varchar DEFAULT '© 2024 Aashayein Judiciary. All rights reserved.';
  ALTER TABLE "courses_target_states" ADD CONSTRAINT "courses_target_states_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_features" ADD CONSTRAINT "courses_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_highlights" ADD CONSTRAINT "courses_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_learning_outcomes" ADD CONSTRAINT "courses_learning_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_curriculum_topics" ADD CONSTRAINT "courses_curriculum_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_curriculum"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_curriculum" ADD CONSTRAINT "courses_curriculum_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_demo_videos" ADD CONSTRAINT "courses_demo_videos_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_demo_videos" ADD CONSTRAINT "courses_demo_videos_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_demo_videos" ADD CONSTRAINT "courses_demo_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_image_id_media_id_fk" FOREIGN KEY ("instructor_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_journey_custom_courses" ADD CONSTRAINT "success_stories_journey_custom_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_story_challenges" ADD CONSTRAINT "success_stories_story_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_timeline" ADD CONSTRAINT "success_stories_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_tips" ADD CONSTRAINT "success_stories_tips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_stats" ADD CONSTRAINT "success_stories_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_resources" ADD CONSTRAINT "success_stories_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_rels" ADD CONSTRAINT "success_stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_rels" ADD CONSTRAINT "success_stories_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_captcha" ADD CONSTRAINT "forms_blocks_captcha_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_blocks_link" ADD CONSTRAINT "header_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_blocks_dropdown_items" ADD CONSTRAINT "header_blocks_dropdown_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_blocks_dropdown"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_blocks_dropdown" ADD CONSTRAINT "header_blocks_dropdown_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_blocks_mega_menu_columns_links" ADD CONSTRAINT "header_blocks_mega_menu_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_blocks_mega_menu_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_blocks_mega_menu_columns" ADD CONSTRAINT "header_blocks_mega_menu_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_blocks_mega_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_blocks_mega_menu" ADD CONSTRAINT "header_blocks_mega_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_actions_actions" ADD CONSTRAINT "header_actions_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_popular_courses" ADD CONSTRAINT "footer_popular_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_nav_links" ADD CONSTRAINT "footer_bottom_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_slides_features" ADD CONSTRAINT "home_slides_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_slides" ADD CONSTRAINT "home_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_slides" ADD CONSTRAINT "home_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_community_features" ADD CONSTRAINT "home_community_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_community_bottom_stats" ADD CONSTRAINT "home_community_bottom_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_why_choose_us_cards" ADD CONSTRAINT "home_why_choose_us_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_why_choose_us_stats" ADD CONSTRAINT "home_why_choose_us_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_lead_form_id_forms_id_fk" FOREIGN KEY ("lead_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_app_image_id_media_id_fk" FOREIGN KEY ("app_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_target_states_order_idx" ON "courses_target_states" USING btree ("order");
  CREATE INDEX "courses_target_states_parent_idx" ON "courses_target_states" USING btree ("parent_id");
  CREATE INDEX "courses_features_order_idx" ON "courses_features" USING btree ("_order");
  CREATE INDEX "courses_features_parent_id_idx" ON "courses_features" USING btree ("_parent_id");
  CREATE INDEX "courses_highlights_order_idx" ON "courses_highlights" USING btree ("_order");
  CREATE INDEX "courses_highlights_parent_id_idx" ON "courses_highlights" USING btree ("_parent_id");
  CREATE INDEX "courses_learning_outcomes_order_idx" ON "courses_learning_outcomes" USING btree ("_order");
  CREATE INDEX "courses_learning_outcomes_parent_id_idx" ON "courses_learning_outcomes" USING btree ("_parent_id");
  CREATE INDEX "courses_curriculum_topics_order_idx" ON "courses_curriculum_topics" USING btree ("_order");
  CREATE INDEX "courses_curriculum_topics_parent_id_idx" ON "courses_curriculum_topics" USING btree ("_parent_id");
  CREATE INDEX "courses_curriculum_order_idx" ON "courses_curriculum" USING btree ("_order");
  CREATE INDEX "courses_curriculum_parent_id_idx" ON "courses_curriculum" USING btree ("_parent_id");
  CREATE INDEX "courses_demo_videos_order_idx" ON "courses_demo_videos" USING btree ("_order");
  CREATE INDEX "courses_demo_videos_parent_id_idx" ON "courses_demo_videos" USING btree ("_parent_id");
  CREATE INDEX "courses_demo_videos_video_file_idx" ON "courses_demo_videos" USING btree ("video_file_id");
  CREATE INDEX "courses_demo_videos_thumbnail_idx" ON "courses_demo_videos" USING btree ("thumbnail_id");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_thumbnail_idx" ON "courses" USING btree ("thumbnail_id");
  CREATE INDEX "courses_instructor_instructor_image_idx" ON "courses" USING btree ("instructor_image_id");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "success_stories_journey_custom_courses_order_idx" ON "success_stories_journey_custom_courses" USING btree ("_order");
  CREATE INDEX "success_stories_journey_custom_courses_parent_id_idx" ON "success_stories_journey_custom_courses" USING btree ("_parent_id");
  CREATE INDEX "success_stories_story_challenges_order_idx" ON "success_stories_story_challenges" USING btree ("_order");
  CREATE INDEX "success_stories_story_challenges_parent_id_idx" ON "success_stories_story_challenges" USING btree ("_parent_id");
  CREATE INDEX "success_stories_timeline_order_idx" ON "success_stories_timeline" USING btree ("_order");
  CREATE INDEX "success_stories_timeline_parent_id_idx" ON "success_stories_timeline" USING btree ("_parent_id");
  CREATE INDEX "success_stories_tips_order_idx" ON "success_stories_tips" USING btree ("_order");
  CREATE INDEX "success_stories_tips_parent_id_idx" ON "success_stories_tips" USING btree ("_parent_id");
  CREATE INDEX "success_stories_stats_order_idx" ON "success_stories_stats" USING btree ("_order");
  CREATE INDEX "success_stories_stats_parent_id_idx" ON "success_stories_stats" USING btree ("_parent_id");
  CREATE INDEX "success_stories_resources_order_idx" ON "success_stories_resources" USING btree ("_order");
  CREATE INDEX "success_stories_resources_parent_id_idx" ON "success_stories_resources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "success_stories_slug_idx" ON "success_stories" USING btree ("slug");
  CREATE INDEX "success_stories_image_idx" ON "success_stories" USING btree ("image_id");
  CREATE INDEX "success_stories_updated_at_idx" ON "success_stories" USING btree ("updated_at");
  CREATE INDEX "success_stories_created_at_idx" ON "success_stories" USING btree ("created_at");
  CREATE INDEX "success_stories_rels_order_idx" ON "success_stories_rels" USING btree ("order");
  CREATE INDEX "success_stories_rels_parent_idx" ON "success_stories_rels" USING btree ("parent_id");
  CREATE INDEX "success_stories_rels_path_idx" ON "success_stories_rels" USING btree ("path");
  CREATE INDEX "success_stories_rels_courses_id_idx" ON "success_stories_rels" USING btree ("courses_id");
  CREATE INDEX "forms_blocks_captcha_order_idx" ON "forms_blocks_captcha" USING btree ("_order");
  CREATE INDEX "forms_blocks_captcha_parent_id_idx" ON "forms_blocks_captcha" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_captcha_path_idx" ON "forms_blocks_captcha" USING btree ("_path");
  CREATE INDEX "header_blocks_link_order_idx" ON "header_blocks_link" USING btree ("_order");
  CREATE INDEX "header_blocks_link_parent_id_idx" ON "header_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "header_blocks_link_path_idx" ON "header_blocks_link" USING btree ("_path");
  CREATE INDEX "header_blocks_dropdown_items_order_idx" ON "header_blocks_dropdown_items" USING btree ("_order");
  CREATE INDEX "header_blocks_dropdown_items_parent_id_idx" ON "header_blocks_dropdown_items" USING btree ("_parent_id");
  CREATE INDEX "header_blocks_dropdown_order_idx" ON "header_blocks_dropdown" USING btree ("_order");
  CREATE INDEX "header_blocks_dropdown_parent_id_idx" ON "header_blocks_dropdown" USING btree ("_parent_id");
  CREATE INDEX "header_blocks_dropdown_path_idx" ON "header_blocks_dropdown" USING btree ("_path");
  CREATE INDEX "header_blocks_mega_menu_columns_links_order_idx" ON "header_blocks_mega_menu_columns_links" USING btree ("_order");
  CREATE INDEX "header_blocks_mega_menu_columns_links_parent_id_idx" ON "header_blocks_mega_menu_columns_links" USING btree ("_parent_id");
  CREATE INDEX "header_blocks_mega_menu_columns_order_idx" ON "header_blocks_mega_menu_columns" USING btree ("_order");
  CREATE INDEX "header_blocks_mega_menu_columns_parent_id_idx" ON "header_blocks_mega_menu_columns" USING btree ("_parent_id");
  CREATE INDEX "header_blocks_mega_menu_order_idx" ON "header_blocks_mega_menu" USING btree ("_order");
  CREATE INDEX "header_blocks_mega_menu_parent_id_idx" ON "header_blocks_mega_menu" USING btree ("_parent_id");
  CREATE INDEX "header_blocks_mega_menu_path_idx" ON "header_blocks_mega_menu" USING btree ("_path");
  CREATE INDEX "header_actions_actions_order_idx" ON "header_actions_actions" USING btree ("_order");
  CREATE INDEX "header_actions_actions_parent_id_idx" ON "header_actions_actions" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_popular_courses_order_idx" ON "footer_popular_courses" USING btree ("_order");
  CREATE INDEX "footer_popular_courses_parent_id_idx" ON "footer_popular_courses" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_nav_links_order_idx" ON "footer_bottom_nav_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_nav_links_parent_id_idx" ON "footer_bottom_nav_links" USING btree ("_parent_id");
  CREATE INDEX "home_slides_features_order_idx" ON "home_slides_features" USING btree ("_order");
  CREATE INDEX "home_slides_features_parent_id_idx" ON "home_slides_features" USING btree ("_parent_id");
  CREATE INDEX "home_slides_order_idx" ON "home_slides" USING btree ("_order");
  CREATE INDEX "home_slides_parent_id_idx" ON "home_slides" USING btree ("_parent_id");
  CREATE INDEX "home_slides_image_idx" ON "home_slides" USING btree ("image_id");
  CREATE INDEX "home_community_features_order_idx" ON "home_community_features" USING btree ("_order");
  CREATE INDEX "home_community_features_parent_id_idx" ON "home_community_features" USING btree ("_parent_id");
  CREATE INDEX "home_community_bottom_stats_order_idx" ON "home_community_bottom_stats" USING btree ("_order");
  CREATE INDEX "home_community_bottom_stats_parent_id_idx" ON "home_community_bottom_stats" USING btree ("_parent_id");
  CREATE INDEX "home_why_choose_us_cards_order_idx" ON "home_why_choose_us_cards" USING btree ("_order");
  CREATE INDEX "home_why_choose_us_cards_parent_id_idx" ON "home_why_choose_us_cards" USING btree ("_parent_id");
  CREATE INDEX "home_why_choose_us_stats_order_idx" ON "home_why_choose_us_stats" USING btree ("_order");
  CREATE INDEX "home_why_choose_us_stats_parent_id_idx" ON "home_why_choose_us_stats" USING btree ("_parent_id");
  CREATE INDEX "home_lead_form_idx" ON "home" USING btree ("lead_form_id");
  CREATE INDEX "home_app_image_idx" ON "home" USING btree ("app_image_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_pages_id_idx" ON "home_rels" USING btree ("pages_id");
  CREATE INDEX "home_rels_posts_id_idx" ON "home_rels" USING btree ("posts_id");
  CREATE INDEX "home_rels_courses_id_idx" ON "home_rels" USING btree ("courses_id");
  CREATE INDEX "home_rels_success_stories_id_idx" ON "home_rels" USING btree ("success_stories_id");
  CREATE INDEX "home_rels_faqs_id_idx" ON "home_rels" USING btree ("faqs_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_success_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("success_stories_id");
  ALTER TABLE "media" DROP COLUMN "folder_id";
  ALTER TABLE "forms_blocks_checkbox" DROP COLUMN "width";
  ALTER TABLE "forms_blocks_country" DROP COLUMN "width";
  ALTER TABLE "forms_blocks_email" DROP COLUMN "width";
  ALTER TABLE "forms_blocks_number" DROP COLUMN "width";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "width";
  ALTER TABLE "forms_blocks_state" DROP COLUMN "width";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "width";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "width";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_folders_id";
  ALTER TABLE "branding" DROP COLUMN "site_meta_copyright";
  DROP TYPE "public"."enum_forms_blocks_checkbox_width";
  DROP TYPE "public"."enum_forms_blocks_country_width";
  DROP TYPE "public"."enum_forms_blocks_email_width";
  DROP TYPE "public"."enum_forms_blocks_number_width";
  DROP TYPE "public"."enum_forms_blocks_select_width";
  DROP TYPE "public"."enum_forms_blocks_state_width";
  DROP TYPE "public"."enum_forms_blocks_text_width";
  DROP TYPE "public"."enum_forms_blocks_textarea_width";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_forms_blocks_checkbox_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_country_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_email_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_number_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_select_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_state_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_text_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_forms_blocks_textarea_width" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "courses_target_states" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_learning_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_curriculum_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_curriculum" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_demo_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_journey_custom_courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_story_challenges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_tips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_captcha" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_blocks_link" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_blocks_dropdown_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_blocks_dropdown" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_blocks_mega_menu_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_blocks_mega_menu_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_blocks_mega_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_actions_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_popular_courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_bottom_nav_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_slides_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_community_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_community_bottom_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_why_choose_us_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_why_choose_us_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "courses_target_states" CASCADE;
  DROP TABLE "courses_features" CASCADE;
  DROP TABLE "courses_highlights" CASCADE;
  DROP TABLE "courses_learning_outcomes" CASCADE;
  DROP TABLE "courses_curriculum_topics" CASCADE;
  DROP TABLE "courses_curriculum" CASCADE;
  DROP TABLE "courses_demo_videos" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "success_stories_journey_custom_courses" CASCADE;
  DROP TABLE "success_stories_story_challenges" CASCADE;
  DROP TABLE "success_stories_timeline" CASCADE;
  DROP TABLE "success_stories_tips" CASCADE;
  DROP TABLE "success_stories_stats" CASCADE;
  DROP TABLE "success_stories_resources" CASCADE;
  DROP TABLE "success_stories" CASCADE;
  DROP TABLE "success_stories_rels" CASCADE;
  DROP TABLE "forms_blocks_captcha" CASCADE;
  DROP TABLE "header_blocks_link" CASCADE;
  DROP TABLE "header_blocks_dropdown_items" CASCADE;
  DROP TABLE "header_blocks_dropdown" CASCADE;
  DROP TABLE "header_blocks_mega_menu_columns_links" CASCADE;
  DROP TABLE "header_blocks_mega_menu_columns" CASCADE;
  DROP TABLE "header_blocks_mega_menu" CASCADE;
  DROP TABLE "header_actions_actions" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_popular_courses" CASCADE;
  DROP TABLE "footer_bottom_nav_links" CASCADE;
  DROP TABLE "home_slides_features" CASCADE;
  DROP TABLE "home_slides" CASCADE;
  DROP TABLE "home_community_features" CASCADE;
  DROP TABLE "home_community_bottom_stats" CASCADE;
  DROP TABLE "home_why_choose_us_cards" CASCADE;
  DROP TABLE "home_why_choose_us_stats" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_courses_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_success_stories_fk";
  
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_pages_hero_links_link_type";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_pages_hero_links_link_type" USING "link_type"::"public"."enum_pages_hero_links_link_type";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_pages_blocks_cta_links_link_type";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_pages_blocks_cta_links_link_type" USING "link_type"::"public"."enum_pages_blocks_cta_links_link_type";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_pages_blocks_content_columns_link_type";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_type" USING "link_type"::"public"."enum_pages_blocks_content_columns_link_type";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__pages_v_version_hero_links_link_type";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__pages_v_version_hero_links_link_type" USING "link_type"::"public"."enum__pages_v_version_hero_links_link_type";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__pages_v_blocks_cta_links_link_type";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__pages_v_blocks_cta_links_link_type" USING "link_type"::"public"."enum__pages_v_blocks_cta_links_link_type";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__pages_v_blocks_content_columns_link_type";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_type" USING "link_type"::"public"."enum__pages_v_blocks_content_columns_link_type";
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_footer_nav_items_link_type";
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_footer_nav_items_link_type" USING "link_type"::"public"."enum_footer_nav_items_link_type";
  DROP INDEX "payload_locked_documents_rels_courses_id_idx";
  DROP INDEX "payload_locked_documents_rels_faqs_id_idx";
  DROP INDEX "payload_locked_documents_rels_success_stories_id_idx";
  ALTER TABLE "media" ADD COLUMN "folder_id" integer;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN "width" "enum_forms_blocks_checkbox_width" DEFAULT '12';
  ALTER TABLE "forms_blocks_country" ADD COLUMN "width" "enum_forms_blocks_country_width" DEFAULT '12';
  ALTER TABLE "forms_blocks_email" ADD COLUMN "width" "enum_forms_blocks_email_width" DEFAULT '12';
  ALTER TABLE "forms_blocks_number" ADD COLUMN "width" "enum_forms_blocks_number_width" DEFAULT '12';
  ALTER TABLE "forms_blocks_select" ADD COLUMN "width" "enum_forms_blocks_select_width" DEFAULT '12';
  ALTER TABLE "forms_blocks_state" ADD COLUMN "width" "enum_forms_blocks_state_width" DEFAULT '12';
  ALTER TABLE "forms_blocks_text" ADD COLUMN "width" "enum_forms_blocks_text_width" DEFAULT '12';
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "width" "enum_forms_blocks_textarea_width" DEFAULT '12';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_folders_id" integer;
  ALTER TABLE "branding" ADD COLUMN "site_meta_copyright" varchar DEFAULT '© {year} All rights reserved.';
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  ALTER TABLE "forms_blocks_checkbox" DROP COLUMN "column_width";
  ALTER TABLE "forms_blocks_country" DROP COLUMN "column_width";
  ALTER TABLE "forms_blocks_email" DROP COLUMN "column_width";
  ALTER TABLE "forms_blocks_number" DROP COLUMN "column_width";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "column_width";
  ALTER TABLE "forms_blocks_state" DROP COLUMN "column_width";
  ALTER TABLE "forms_blocks_state" DROP COLUMN "placeholder";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "column_width";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "column_width";
  ALTER TABLE "forms" DROP COLUMN "submission_count";
  ALTER TABLE "forms" DROP COLUMN "last_submission_date";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "courses_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "success_stories_id";
  ALTER TABLE "footer" DROP COLUMN "brand_description";
  ALTER TABLE "footer" DROP COLUMN "contact_info_address";
  ALTER TABLE "footer" DROP COLUMN "contact_info_phone";
  ALTER TABLE "footer" DROP COLUMN "contact_info_email";
  ALTER TABLE "footer" DROP COLUMN "contact_info_office_hours";
  ALTER TABLE "footer" DROP COLUMN "bottom_nav_copyright";
  DROP TYPE "public"."enum_courses_target_states";
  DROP TYPE "public"."enum_courses_demo_videos_type";
  DROP TYPE "public"."enum_courses_category";
  DROP TYPE "public"."enum_success_stories_category";
  DROP TYPE "public"."enum_success_stories_state";
  DROP TYPE "public"."enum_forms_blocks_checkbox_column_width";
  DROP TYPE "public"."enum_forms_blocks_country_column_width";
  DROP TYPE "public"."enum_forms_blocks_email_column_width";
  DROP TYPE "public"."enum_forms_blocks_number_column_width";
  DROP TYPE "public"."enum_forms_blocks_select_column_width";
  DROP TYPE "public"."enum_forms_blocks_state_column_width";
  DROP TYPE "public"."enum_forms_blocks_text_column_width";
  DROP TYPE "public"."enum_forms_blocks_textarea_column_width";
  DROP TYPE "public"."enum_header_blocks_link_link_type";
  DROP TYPE "public"."enum_header_blocks_dropdown_items_link_type";
  DROP TYPE "public"."enum_header_blocks_mega_menu_columns_links_link_type";
  DROP TYPE "public"."enum_header_actions_actions_link_type";
  DROP TYPE "public"."enum_header_actions_actions_style";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_footer_popular_courses_link_type";
  DROP TYPE "public"."enum_footer_bottom_nav_links_link_type";
  DROP TYPE "public"."enum_home_slides_link_type";
  DROP TYPE "public"."enum_home_slides_link_appearance";
  DROP TYPE "public"."enum_home_popular_courses_fetch_type";
  DROP TYPE "public"."enum_home_success_stories_fetch_type";`)
}
