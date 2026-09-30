import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_media_block_media_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_media_block_media_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_pages_blocks_clat_pg_block_trust_cards_icon" AS ENUM('trophy', 'users', 'file-text', 'target', 'heart', 'heart-handshake', 'book', 'book-open', 'shield', 'clock');
  CREATE TYPE "public"."enum_pages_blocks_clat_pg_block_exam_tabs_icon" AS ENUM('book', 'graduation', 'calendar', 'scale', 'file');
  CREATE TYPE "public"."mode" AS ENUM('guided', 'custom');
  CREATE TYPE "public"."stype" AS ENUM('FAQPage', 'Article', 'BlogPosting', 'WebPage', 'Course', 'Product', 'BreadcrumbList', 'Organization', 'EducationalOrganization', 'WebSite', 'AboutPage', 'ContactPage', 'Event');
  CREATE TYPE "public"."faq_src" AS ENUM('auto', 'custom');
  CREATE TYPE "public"."bc_src" AS ENUM('auto', 'custom');
  CREATE TYPE "public"."enum_pages_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_pages_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_media_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_media_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum__pages_v_blocks_clat_pg_block_trust_cards_icon" AS ENUM('trophy', 'users', 'file-text', 'target', 'heart', 'heart-handshake', 'book', 'book-open', 'shield', 'clock');
  CREATE TYPE "public"."enum__pages_v_blocks_clat_pg_block_exam_tabs_icon" AS ENUM('book', 'graduation', 'calendar', 'scale', 'file');
  CREATE TYPE "public"."enum__pages_v_version_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__pages_v_version_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_posts_hero_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_posts_hero_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_posts_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_posts_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum__posts_v_version_hero_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum__posts_v_version_hero_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum__posts_v_version_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__posts_v_version_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_media_display_size" AS ENUM('thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'all');
  CREATE TYPE "public"."enum_categories_group" AS ENUM('blogs', 'current-affairs', 'judgments');
  CREATE TYPE "public"."enum_users_module_permissions_module" AS ENUM('users', 'pages', 'posts', 'courses', 'books', 'events', 'faqs', 'media', 'categories', 'resources', 'resource-categories', 'notes', 'previous-year-questions', 'syllabus-states', 'vacancies', 'success-stories', 'popups', 'forms', 'form-submissions', 'enrollments', 'mentorship-bookings', 'webhook-logs', 'schema-templates', 'redirects', 'search', 'header', 'footer', 'branding', 'home', 'course', 'success-stories-page', 'free-study', 'syllabus-vacancy-global', 'blog', 'events-page', 'books-page', 'about-us', 'contact-page', 'notes-page', 'previous-year-questions-page');
  CREATE TYPE "public"."enum_courses_demo_videos_thumbnail_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_courses_demo_videos_thumbnail_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_courses_course_mode" AS ENUM('online', 'offline', 'hybrid');
  CREATE TYPE "public"."enum_courses_thumbnail_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_courses_thumbnail_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_courses_instructor_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_courses_instructor_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_courses_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_courses_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_success_stories_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_success_stories_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_success_stories_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_success_stories_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_resources_testimonials_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_resources_testimonials_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_resources_resource_type" AS ENUM('video', 'pdf', 'guide', 'judgement', 'pyq');
  CREATE TYPE "public"."enum_resources_difficulty" AS ENUM('Beginner', 'Intermediate', 'Advanced', 'Beginner to Intermediate');
  CREATE TYPE "public"."enum_resources_language" AS ENUM('Hindi', 'English', 'Hindi + English');
  CREATE TYPE "public"."enum_resources_thumbnail_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_resources_thumbnail_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_resources_instructor_photo_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_resources_instructor_photo_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_syllabus_states_type" AS ENUM('judiciary', 'adpo');
  CREATE TYPE "public"."enum_syllabus_states_popularity" AS ENUM('high', 'medium', 'low');
  CREATE TYPE "public"."enum_events_category" AS ENUM('webinar', 'seminar', 'scholarship', 'workshop');
  CREATE TYPE "public"."enum_events_host_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_events_host_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_events_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_events_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_events_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_events_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_books_guarantees_icon" AS ENUM('truck', 'shield', 'clock', 'check');
  CREATE TYPE "public"."enum_books_category" AS ENUM('criminal-law', 'civil-law', 'constitution', 'mains', 'current-affairs', 'state-specific', 'free');
  CREATE TYPE "public"."enum_books_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_books_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_popups_size" AS ENUM('md', 'lg');
  CREATE TYPE "public"."enum_popups_image_position" AS ENUM('left', 'right', 'top');
  CREATE TYPE "public"."enum_popups_display_rules_condition" AS ENUM('all', 'home', 'path');
  CREATE TYPE "public"."enum_popups_display_rules_frequency" AS ENUM('once', 'session', 'always');
  CREATE TYPE "public"."enum_popups_display_rules_trigger_type" AS ENUM('delay', 'scroll', 'exit');
  CREATE TYPE "public"."enum_vacancies_tag" AS ENUM('Vacancy', 'Syllabus', 'Important', 'Result');
  CREATE TYPE "public"."enum_vacancies_status" AS ENUM('Active', 'Upcoming', 'Closed');
  CREATE TYPE "public"."enum_vacancies_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_vacancies_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_enrollments_event_type" AS ENUM('AI_POWERED_LEADS', 'USER_SIGNS_UP_ON_THE_APP', 'USER_BUYS_COURSE', 'USER_DROPS_FROM_PAYMENT_PAGE');
  CREATE TYPE "public"."enum_notes_category" AS ENUM('criminal-law', 'civil-law', 'constitution', 'contracts', 'evidence', 'current-affairs');
  CREATE TYPE "public"."enum_notes_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_notes_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_previous_year_questions_category" AS ENUM('prelims', 'mains', 'state-judiciary', 'higher-judiciary', 'adpo', 'interview');
  CREATE TYPE "public"."enum_previous_year_questions_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_previous_year_questions_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_mentorship_bookings_status" AS ENUM('pending', 'confirmed', 'cancelled');
  CREATE TYPE "public"."enum_schema_templates_applies_to" AS ENUM('site', 'pages', 'posts', 'courses', 'success-stories', 'books', 'events', 'vacancies', 'notes', 'previous-year-questions', 'home', 'course', 'success-stories-page', 'free-study', 'blog', 'events-page', 'books-page', 'about-us', 'contact-page', 'notes-page', 'previous-year-questions-page', 'syllabus-vacancy-global');
  CREATE TYPE "public"."enum_leads_type" AS ENUM('form', 'dashboard');
  CREATE TYPE "public"."enum_leads_source" AS ENUM('form', 'dashboard');
  CREATE TYPE "public"."enum_leads_event_type" AS ENUM('AI_POWERED_LEADS', 'USER_SIGNS_UP_ON_THE_APP', 'USER_BUYS_COURSE', 'USER_DROPS_FROM_PAYMENT_PAGE');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_cta_links_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_content_columns_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_media_block_media_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_media_block_media_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_clat_pg_block_trust_cards_icon" AS ENUM('trophy', 'users', 'file-text', 'target', 'heart', 'heart-handshake', 'book', 'book-open', 'shield', 'clock');
  CREATE TYPE "public"."enum_dynamic_pages_blocks_clat_pg_block_exam_tabs_icon" AS ENUM('book', 'graduation', 'calendar', 'scale', 'file');
  CREATE TYPE "public"."enum_dynamic_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_cta_links_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_content_columns_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_media_block_media_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_media_block_media_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_clat_pg_block_trust_cards_icon" AS ENUM('trophy', 'users', 'file-text', 'target', 'heart', 'heart-handshake', 'book', 'book-open', 'shield', 'clock');
  CREATE TYPE "public"."enum__dynamic_pages_v_blocks_clat_pg_block_exam_tabs_icon" AS ENUM('book', 'graduation', 'calendar', 'scale', 'file');
  CREATE TYPE "public"."enum__dynamic_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_forms_blocks_captcha_captcha_type" AS ENUM('google');
  CREATE TYPE "public"."enum_header_contact_info_social_links_platform" AS ENUM('instagram', 'facebook', 'linkedin', 'twitter', 'youtube', 'telegram');
  CREATE TYPE "public"."enum_footer_courses_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_footer_free_resources_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_footer_company_links_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_branding_captcha_captcha_type" AS ENUM('google');
  CREATE TYPE "public"."enum_home_slides_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_home_slides_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_home_slides_secondary_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_slides_secondary_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_home_lead_features_icon" AS ENUM('users', 'messageSquare', 'sparkles', 'bookOpen');
  CREATE TYPE "public"."enum_home_trust_indicators_icon" AS ENUM('award', 'users', 'trophy', 'userCheck');
  CREATE TYPE "public"."enum_home_founder_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_home_founder_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_home_results_fetch_type" AS ENUM('custom', 'latest', 'topRanked');
  CREATE TYPE "public"."enum_home_app_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_home_app_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_home_final_c_t_a_primary_c_t_a_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_final_c_t_a_primary_c_t_a_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_home_final_c_t_a_secondary_c_t_a_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_final_c_t_a_secondary_c_t_a_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_home_events_fetch_type" AS ENUM('custom', 'latest');
  CREATE TYPE "public"."enum_home_blog_judgments_fetch_type" AS ENUM('custom', 'latest');
  CREATE TYPE "public"."enum_home_blog_judgments_view_all_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_blog_judgments_view_all_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_home_testimonials_fetch_type" AS ENUM('custom', 'latest');
  CREATE TYPE "public"."enum_home_testimonials_view_all_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_home_testimonials_view_all_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_home_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_home_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_course_community_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_course_community_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_course_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_course_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_success_stories_page_counselling_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_success_stories_page_counselling_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_success_stories_page_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_success_stories_page_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_free_study_featured_states_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_free_study_featured_states_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_free_study_features_icon" AS ENUM('book', 'scale', 'document');
  CREATE TYPE "public"."enum_free_study_pan_india_background_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_free_study_pan_india_background_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_free_study_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_free_study_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_syllabus_vacancy_global_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_syllabus_vacancy_global_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_blog_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_blog_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_events_page_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_events_page_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_books_page_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_books_page_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_about_us_story_stats_gradient" AS ENUM('red', 'amber', 'rose', 'orange');
  CREATE TYPE "public"."enum_about_us_values_list_icon" AS ENUM('Heart', 'Shield', 'Star', 'Users', 'TrendingUp', 'Trophy');
  CREATE TYPE "public"."enum_about_us_features_list_icon" AS ENUM('Award', 'BookOpen', 'Target', 'Clock', 'Scale', 'Users');
  CREATE TYPE "public"."enum_about_us_legacy_stats_color" AS ENUM('red', 'amber', 'rose', 'orange');
  CREATE TYPE "public"."enum_about_us_director_image_display_preset" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og', 'custom');
  CREATE TYPE "public"."enum_about_us_director_image_display_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_about_us_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_about_us_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_contact_page_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_contact_page_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_notes_page_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_notes_page_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_previous_year_questions_page_meta_index_directive" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_previous_year_questions_page_meta_follow_directive" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_clat_pg_global_trust_cards_icon" AS ENUM('trophy', 'users', 'file-text', 'target', 'heart', 'heart-handshake', 'book', 'book-open', 'shield', 'clock');
  CREATE TYPE "public"."enum_clat_pg_global_exam_tabs_icon" AS ENUM('book', 'graduation', 'calendar', 'scale', 'file');
  CREATE TABLE "pages_blocks_clat_pg_block_hero_slides_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"highlight" varchar,
  	"button_text" varchar,
  	"hero_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_lead_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_trust_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_clat_pg_block_trust_cards_icon" DEFAULT 'trophy'
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_custom_courses_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_custom_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"tags" varchar,
  	"price" varchar,
  	"original_price" varchar,
  	"discount" varchar,
  	"image_id" integer,
  	"button_text" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_exam_tabs_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bullet" varchar
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_exam_tabs_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_exam_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_id" varchar,
  	"title" varchar,
  	"icon" "enum_pages_blocks_clat_pg_block_exam_tabs_icon" DEFAULT 'book',
  	"summary" varchar
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_yt_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"youtube_id" varchar,
  	"category" varchar,
  	"duration" varchar,
  	"custom_thumbnail_id" integer
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block_custom_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_clat_pg_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_hero" boolean DEFAULT true,
  	"show_lead_form" boolean DEFAULT true,
  	"show_trust_indicators" boolean DEFAULT true,
  	"show_course_cards" boolean DEFAULT true,
  	"show_demo_banner" boolean DEFAULT true,
  	"show_exam_info_tabs" boolean DEFAULT true,
  	"show_yt_slider" boolean DEFAULT true,
  	"show_faq_accordion" boolean DEFAULT true,
  	"form_id" integer,
  	"lead_badge" varchar DEFAULT 'CLAT PG 2027 / 2028 ADMISSIONS OPEN',
  	"lead_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses',
  	"lead_description" varchar DEFAULT 'Unlock top NLU ranks with Aashayein Judiciary''s dedicated CLAT PG (LL.M.) program. Get access to live interactive sessions, expert law faculty, 24/7 doubt clearing, exhaustive study material, and full-length exam standard mock tests.',
  	"counseling_button_text" varchar DEFAULT 'Book Free Counselling',
  	"brochure_button_text" varchar DEFAULT 'Download Brochure',
  	"brochure_url" varchar DEFAULT '/CLAT_PG.docx',
  	"trust_eyebrow" varchar DEFAULT 'WHY CHOOSE US',
  	"trust_title" varchar DEFAULT 'The Bridge to Your Dream NLU',
  	"trust_subtitle" varchar DEFAULT 'Why Aashayein Judiciary is India''s most trusted learning platform for CLAT PG & LL.M Preparation.',
  	"courses_badge" varchar DEFAULT 'CLAT PG PROGRAMS',
  	"courses_title" varchar DEFAULT 'CLAT PG Courses Designed for Your Success',
  	"courses_subtitle" varchar DEFAULT 'Choose the program that fits your preparation timeline and goals',
  	"courses_button_text" varchar DEFAULT 'View Course Details',
  	"demo_badge" varchar DEFAULT 'DEMO CLASS',
  	"demo_title" varchar DEFAULT 'Book Free Class of Online CLAT PG Coaching!',
  	"demo_description" varchar DEFAULT 'Experience our high-yielding passage analysis methodology, expert NLU faculty guidance, and interactive doubt resolution first-hand.',
  	"demo_button_text" varchar DEFAULT 'BOOK YOUR SPOT NOW',
  	"demo_button_url" varchar,
  	"demo_background_image_id" integer,
  	"exam_info_title" varchar DEFAULT 'Information About CLAT PG Exam',
  	"exam_info_subtitle" varchar DEFAULT 'Everything you need to know about eligibility, exam structure, syllabus, dates, and opportunities.',
  	"yt_badge" varchar DEFAULT 'FREE VIDEO LECTURES & STRATEGY',
  	"yt_title" varchar DEFAULT 'Watch CLAT PG Masterclasses',
  	"yt_subtitle" varchar DEFAULT 'Free strategy sessions, landmark judgment analyses, and subject-wise lectures by Aashayein Judiciary experts.',
  	"faq_badge" varchar DEFAULT 'FREQUENTLY ASKED QUESTIONS',
  	"faq_title" varchar DEFAULT 'CLAT PG Coaching FAQs',
  	"faq_subtitle" varchar DEFAULT 'Frequently asked questions about CLAT PG preparation, eligibility, and online coaching at Aashayein Judiciary.',
  	"meta_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses | Aashayein Judiciary',
  	"meta_description" varchar DEFAULT 'Join Aashayein Judiciary for top CLAT PG (LL.M.) online coaching. Get expert NLU mentors, live interactive classes, subject-wise test series, and 1:1 guidance.',
  	"meta_keywords" varchar DEFAULT 'CLAT PG Online Coaching, Best CLAT PG Coaching 2027, CLAT LLM Online Classes, CLAT PG Mock Test Series, Aashayein Judiciary CLAT PG, AILET PG Coaching',
  	"og_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "sdata_overrides_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "sdata_overrides_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"item" varchar
  );
  
  CREATE TABLE "sdata_overrides_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "sdata" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"placement_order" numeric DEFAULT 0,
  	"mode" "mode" DEFAULT 'guided' NOT NULL,
  	"schema_type" "stype" NOT NULL,
  	"custom_name" varchar,
  	"source_template_id" integer,
  	"overrides_name" varchar,
  	"overrides_description" varchar,
  	"overrides_url" varchar,
  	"overrides_schema_id" varchar,
  	"overrides_image" varchar,
  	"overrides_headline" varchar,
  	"overrides_author_name" varchar,
  	"overrides_date_published" varchar,
  	"overrides_date_modified" varchar,
  	"overrides_publisher_name" varchar,
  	"overrides_publisher_logo" varchar,
  	"overrides_article_section" varchar,
  	"overrides_provider_name" varchar,
  	"overrides_provider_url" varchar,
  	"overrides_faq_source" "faq_src" DEFAULT 'auto',
  	"overrides_breadcrumb_source" "bc_src" DEFAULT 'auto',
  	"overrides_logo_url" varchar,
  	"overrides_telephone" varchar,
  	"overrides_street_address" varchar,
  	"overrides_postal_code" varchar,
  	"overrides_address_locality" varchar,
  	"overrides_address_region" varchar,
  	"overrides_address_country" varchar,
  	"overrides_sku" varchar,
  	"overrides_brand" varchar,
  	"overrides_price" varchar,
  	"overrides_price_currency" varchar DEFAULT 'INR',
  	"overrides_availability" varchar,
  	"overrides_rating_value" varchar,
  	"overrides_review_count" varchar,
  	"overrides_start_date" varchar,
  	"overrides_end_date" varchar,
  	"overrides_event_status" varchar,
  	"overrides_event_attendance_mode" varchar,
  	"overrides_location_name" varchar,
  	"overrides_location_address" varchar,
  	"overrides_organizer_name" varchar,
  	"overrides_organizer_url" varchar,
  	"overrides_potential_search_target" varchar,
  	"overrides_custom_type" varchar,
  	"custom_j_s_o_n" jsonb
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_hero_slides_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"highlight" varchar,
  	"button_text" varchar,
  	"hero_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_lead_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_trust_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__pages_v_blocks_clat_pg_block_trust_cards_icon" DEFAULT 'trophy',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_custom_courses_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_custom_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"tags" varchar,
  	"price" varchar,
  	"original_price" varchar,
  	"discount" varchar,
  	"image_id" integer,
  	"button_text" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_exam_tabs_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bullet" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_exam_tabs_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_exam_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_id" varchar,
  	"title" varchar,
  	"icon" "enum__pages_v_blocks_clat_pg_block_exam_tabs_icon" DEFAULT 'book',
  	"summary" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_yt_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"youtube_id" varchar,
  	"category" varchar,
  	"duration" varchar,
  	"custom_thumbnail_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block_custom_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clat_pg_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_hero" boolean DEFAULT true,
  	"show_lead_form" boolean DEFAULT true,
  	"show_trust_indicators" boolean DEFAULT true,
  	"show_course_cards" boolean DEFAULT true,
  	"show_demo_banner" boolean DEFAULT true,
  	"show_exam_info_tabs" boolean DEFAULT true,
  	"show_yt_slider" boolean DEFAULT true,
  	"show_faq_accordion" boolean DEFAULT true,
  	"form_id" integer,
  	"lead_badge" varchar DEFAULT 'CLAT PG 2027 / 2028 ADMISSIONS OPEN',
  	"lead_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses',
  	"lead_description" varchar DEFAULT 'Unlock top NLU ranks with Aashayein Judiciary''s dedicated CLAT PG (LL.M.) program. Get access to live interactive sessions, expert law faculty, 24/7 doubt clearing, exhaustive study material, and full-length exam standard mock tests.',
  	"counseling_button_text" varchar DEFAULT 'Book Free Counselling',
  	"brochure_button_text" varchar DEFAULT 'Download Brochure',
  	"brochure_url" varchar DEFAULT '/CLAT_PG.docx',
  	"trust_eyebrow" varchar DEFAULT 'WHY CHOOSE US',
  	"trust_title" varchar DEFAULT 'The Bridge to Your Dream NLU',
  	"trust_subtitle" varchar DEFAULT 'Why Aashayein Judiciary is India''s most trusted learning platform for CLAT PG & LL.M Preparation.',
  	"courses_badge" varchar DEFAULT 'CLAT PG PROGRAMS',
  	"courses_title" varchar DEFAULT 'CLAT PG Courses Designed for Your Success',
  	"courses_subtitle" varchar DEFAULT 'Choose the program that fits your preparation timeline and goals',
  	"courses_button_text" varchar DEFAULT 'View Course Details',
  	"demo_badge" varchar DEFAULT 'DEMO CLASS',
  	"demo_title" varchar DEFAULT 'Book Free Class of Online CLAT PG Coaching!',
  	"demo_description" varchar DEFAULT 'Experience our high-yielding passage analysis methodology, expert NLU faculty guidance, and interactive doubt resolution first-hand.',
  	"demo_button_text" varchar DEFAULT 'BOOK YOUR SPOT NOW',
  	"demo_button_url" varchar,
  	"demo_background_image_id" integer,
  	"exam_info_title" varchar DEFAULT 'Information About CLAT PG Exam',
  	"exam_info_subtitle" varchar DEFAULT 'Everything you need to know about eligibility, exam structure, syllabus, dates, and opportunities.',
  	"yt_badge" varchar DEFAULT 'FREE VIDEO LECTURES & STRATEGY',
  	"yt_title" varchar DEFAULT 'Watch CLAT PG Masterclasses',
  	"yt_subtitle" varchar DEFAULT 'Free strategy sessions, landmark judgment analyses, and subject-wise lectures by Aashayein Judiciary experts.',
  	"faq_badge" varchar DEFAULT 'FREQUENTLY ASKED QUESTIONS',
  	"faq_title" varchar DEFAULT 'CLAT PG Coaching FAQs',
  	"faq_subtitle" varchar DEFAULT 'Frequently asked questions about CLAT PG preparation, eligibility, and online coaching at Aashayein Judiciary.',
  	"meta_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses | Aashayein Judiciary',
  	"meta_description" varchar DEFAULT 'Join Aashayein Judiciary for top CLAT PG (LL.M.) online coaching. Get expert NLU mentors, live interactive classes, subject-wise test series, and 1:1 guidance.',
  	"meta_keywords" varchar DEFAULT 'CLAT PG Online Coaching, Best CLAT PG Coaching 2027, CLAT LLM Online Classes, CLAT PG Mock Test Series, Aashayein Judiciary CLAT PG, AILET PG Coaching',
  	"og_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sdata_v_overrides_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sdata_v_overrides_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sdata_v_overrides_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sdata_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"placement_order" numeric DEFAULT 0,
  	"mode" "mode" DEFAULT 'guided',
  	"schema_type" "stype",
  	"custom_name" varchar,
  	"source_template_id" integer,
  	"overrides_name" varchar,
  	"overrides_description" varchar,
  	"overrides_url" varchar,
  	"overrides_schema_id" varchar,
  	"overrides_image" varchar,
  	"overrides_headline" varchar,
  	"overrides_author_name" varchar,
  	"overrides_date_published" varchar,
  	"overrides_date_modified" varchar,
  	"overrides_publisher_name" varchar,
  	"overrides_publisher_logo" varchar,
  	"overrides_article_section" varchar,
  	"overrides_provider_name" varchar,
  	"overrides_provider_url" varchar,
  	"overrides_faq_source" "faq_src" DEFAULT 'auto',
  	"overrides_breadcrumb_source" "bc_src" DEFAULT 'auto',
  	"overrides_logo_url" varchar,
  	"overrides_telephone" varchar,
  	"overrides_street_address" varchar,
  	"overrides_postal_code" varchar,
  	"overrides_address_locality" varchar,
  	"overrides_address_region" varchar,
  	"overrides_address_country" varchar,
  	"overrides_sku" varchar,
  	"overrides_brand" varchar,
  	"overrides_price" varchar,
  	"overrides_price_currency" varchar DEFAULT 'INR',
  	"overrides_availability" varchar,
  	"overrides_rating_value" varchar,
  	"overrides_review_count" varchar,
  	"overrides_start_date" varchar,
  	"overrides_end_date" varchar,
  	"overrides_event_status" varchar,
  	"overrides_event_attendance_mode" varchar,
  	"overrides_location_name" varchar,
  	"overrides_location_address" varchar,
  	"overrides_organizer_name" varchar,
  	"overrides_organizer_url" varchar,
  	"overrides_potential_search_target" varchar,
  	"overrides_custom_type" varchar,
  	"custom_j_s_o_n" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "media_display_size" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_media_display_size",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_module_permissions_module" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_users_module_permissions_module",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_module_permissions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"read" boolean DEFAULT false,
  	"create" boolean DEFAULT false,
  	"update" boolean DEFAULT false,
  	"delete" boolean DEFAULT false
  );
  
  CREATE TABLE "courses_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "courses_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"comment" varchar NOT NULL
  );
  
  CREATE TABLE "resources_overview_what_you_will_learn" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "resources_overview_key_topics_covered_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  CREATE TABLE "resources_overview_key_topics_covered" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"duration" varchar
  );
  
  CREATE TABLE "resources_study_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"type" varchar DEFAULT 'PDF Document',
  	"pages" varchar,
  	"file_id" integer,
  	"external_file_url" varchar
  );
  
  CREATE TABLE "resources_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"achievement" varchar,
  	"rating" numeric DEFAULT 5,
  	"comment" varchar NOT NULL,
  	"image_id" integer,
  	"image_display_preset" "enum_resources_testimonials_image_display_preset" DEFAULT 'original',
  	"image_display_custom_width" numeric,
  	"image_display_custom_height" numeric,
  	"image_display_fit" "enum_resources_testimonials_image_display_fit" DEFAULT 'cover'
  );
  
  CREATE TABLE "resources_related_exams" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"exam" varchar
  );
  
  CREATE TABLE "resources_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"resources_id" integer
  );
  
  CREATE TABLE "syllabus_states_prelims_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"questions" numeric
  );
  
  CREATE TABLE "syllabus_states_syllabus_topics_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar NOT NULL
  );
  
  CREATE TABLE "syllabus_states_syllabus_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar NOT NULL
  );
  
  CREATE TABLE "syllabus_states_important_books" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"subject" varchar NOT NULL
  );
  
  CREATE TABLE "syllabus_states_preparation_tips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tip" varchar NOT NULL
  );
  
  CREATE TABLE "syllabus_states" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_syllabus_states_type" DEFAULT 'judiciary' NOT NULL,
  	"name" varchar NOT NULL,
  	"full_name" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"vacancies" varchar,
  	"popularity" "enum_syllabus_states_popularity" DEFAULT 'medium',
  	"prelims_total_marks" numeric,
  	"prelims_duration" varchar,
  	"prelims_total_questions" numeric,
  	"prelims_negative_marking" varchar,
  	"mains_total_marks" numeric,
  	"mains_duration" varchar,
  	"mains_papers" numeric,
  	"mains_description" varchar,
  	"downloads_syllabus" varchar,
  	"downloads_syllabus_file_id" integer,
  	"downloads_pyq" varchar,
  	"downloads_pyq_file_id" integer,
  	"downloads_notification" varchar,
  	"downloads_notification_file_id" integer,
  	"syllabus_url" varchar,
  	"syllabus_file_id" integer,
  	"vacancy_url" varchar,
  	"pyq_url" varchar,
  	"eligibility_age" varchar,
  	"eligibility_qualification" varchar,
  	"eligibility_nationality" varchar,
  	"eligibility_attempts" varchar,
  	"exam_dates_notification" timestamp(3) with time zone,
  	"exam_dates_prelims_exam" timestamp(3) with time zone,
  	"exam_dates_mains_exam" timestamp(3) with time zone,
  	"exam_dates_interview" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "events_agenda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"topic" varchar,
  	"speaker" varchar
  );
  
  CREATE TABLE "events_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_events_category",
  	"date" timestamp(3) with time zone,
  	"event_date_time" timestamp(3) with time zone,
  	"time" timestamp(3) with time zone,
  	"host" varchar,
  	"host_title" varchar,
  	"host_image_id" integer,
  	"host_image_display_preset" "enum_events_host_image_display_preset" DEFAULT 'original',
  	"host_image_display_custom_width" numeric,
  	"host_image_display_custom_height" numeric,
  	"host_image_display_fit" "enum_events_host_image_display_fit" DEFAULT 'cover',
  	"seats_available" numeric,
  	"total_seats" numeric,
  	"image_id" integer,
  	"image_display_preset" "enum_events_image_display_preset" DEFAULT 'original',
  	"image_display_custom_width" numeric,
  	"image_display_custom_height" numeric,
  	"image_display_fit" "enum_events_image_display_fit" DEFAULT 'cover',
  	"description" varchar,
  	"full_description" jsonb,
  	"is_online" boolean,
  	"is_free" boolean,
  	"location" varchar,
  	"register_url" varchar,
  	"language" varchar DEFAULT 'Hindi & English',
  	"platform" varchar,
  	"prerequisites" varchar,
  	"fees" varchar,
  	"brochure_file_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_events_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_events_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "books_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "books_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "books_table_of_contents_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  CREATE TABLE "books_table_of_contents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"chapter" varchar NOT NULL,
  	"pages" varchar
  );
  
  CREATE TABLE "books_what_you_will_learn" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "books_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "books_target_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "books_why_choose_this_book" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "books_guarantees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_books_guarantees_icon",
  	"text" varchar
  );
  
  CREATE TABLE "books_student_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"achievement" varchar,
  	"image_id" integer,
  	"rating" numeric DEFAULT 5,
  	"comment" varchar,
  	"date" timestamp(3) with time zone
  );
  
  CREATE TABLE "books" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"category" "enum_books_category" NOT NULL,
  	"description" varchar NOT NULL,
  	"long_description" varchar,
  	"image_id" integer NOT NULL,
  	"is_free" boolean DEFAULT false,
  	"buy_link" varchar,
  	"support_whats_app" varchar DEFAULT '919111198177',
  	"price" varchar NOT NULL,
  	"original_price" varchar,
  	"price_value" numeric DEFAULT 0 NOT NULL,
  	"rating" numeric DEFAULT 4.8,
  	"reviews" numeric DEFAULT 0,
  	"pages" numeric,
  	"language" varchar,
  	"edition" varchar,
  	"isbn" varchar,
  	"publisher" varchar,
  	"publication_date" timestamp(3) with time zone,
  	"format" varchar,
  	"file_size" varchar,
  	"author_bio" varchar,
  	"author_image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_books_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_books_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "books_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"books_id" integer
  );
  
  CREATE TABLE "popups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"is_active" boolean DEFAULT false,
  	"image_id" integer NOT NULL,
  	"description" varchar NOT NULL,
  	"size" "enum_popups_size" DEFAULT 'md',
  	"image_position" "enum_popups_image_position" DEFAULT 'left',
  	"form_id" integer NOT NULL,
  	"display_rules_condition" "enum_popups_display_rules_condition" DEFAULT 'all',
  	"display_rules_path" varchar,
  	"display_rules_frequency" "enum_popups_display_rules_frequency" DEFAULT 'once',
  	"display_rules_trigger_type" "enum_popups_display_rules_trigger_type" DEFAULT 'delay',
  	"display_rules_delay" numeric DEFAULT 4,
  	"display_rules_scroll_percentage" numeric DEFAULT 50,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vacancies_breakdown" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"seats" numeric
  );
  
  CREATE TABLE "vacancies_important_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"date" varchar
  );
  
  CREATE TABLE "vacancies_application_fee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"fee" varchar
  );
  
  CREATE TABLE "vacancies_qualifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "vacancies_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "vacancies_selection_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stage" varchar,
  	"description" varchar,
  	"duration" varchar,
  	"type" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "vacancies_how_to_apply" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar
  );
  
  CREATE TABLE "vacancies_required_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"document" varchar
  );
  
  CREATE TABLE "vacancies_important_instructions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"instruction" varchar
  );
  
  CREATE TABLE "vacancies_additional_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "vacancies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"tag" "enum_vacancies_tag" NOT NULL,
  	"status" "enum_vacancies_status" DEFAULT 'Active',
  	"total_vacancies" numeric,
  	"salary" varchar,
  	"last_date" varchar,
  	"state_id" integer,
  	"description" varchar,
  	"official_links_notification" varchar,
  	"official_links_apply" varchar,
  	"official_links_official_website" varchar,
  	"pdf_upload_id" integer,
  	"link" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_vacancies_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_vacancies_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "webhook_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" varchar,
  	"method" varchar,
  	"headers" jsonb,
  	"query" jsonb,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "enrollments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_type" "enum_enrollments_event_type",
  	"name" varchar,
  	"email" varchar,
  	"phone_number" varchar,
  	"course_name" varchar,
  	"lead_type" varchar,
  	"source" varchar,
  	"log_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "notes_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "notes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" "enum_notes_category" NOT NULL,
  	"description" varchar NOT NULL,
  	"file_id" integer,
  	"external_download_link" varchar,
  	"pages" numeric,
  	"download_count" numeric DEFAULT 0,
  	"upload_date" timestamp(3) with time zone NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"is_free" boolean DEFAULT true,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_notes_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_notes_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "previous_year_questions_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "previous_year_questions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" "enum_previous_year_questions_category" NOT NULL,
  	"exam_name" varchar,
  	"year" varchar,
  	"description" varchar NOT NULL,
  	"file_id" integer,
  	"external_download_link" varchar,
  	"pages" numeric,
  	"downloads" numeric DEFAULT 0,
  	"upload_date" timestamp(3) with time zone NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"is_free" boolean DEFAULT true,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_previous_year_questions_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_previous_year_questions_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mentorship_bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"appointment_date" timestamp(3) with time zone NOT NULL,
  	"appointment_time" timestamp(3) with time zone NOT NULL,
  	"session_duration" numeric DEFAULT 5 NOT NULL,
  	"status" "enum_mentorship_bookings_status" DEFAULT 'pending',
  	"meeting_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "schema_templates_applies_to" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_schema_templates_applies_to",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "schema_templates_template_config_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "schema_templates_template_config_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"item" varchar
  );
  
  CREATE TABLE "schema_templates_template_config_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "schema_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"placement_order" numeric DEFAULT 0,
  	"mode" "mode" DEFAULT 'guided' NOT NULL,
  	"schema_type" "stype" NOT NULL,
  	"template_config_name" varchar,
  	"template_config_description" varchar,
  	"template_config_url" varchar,
  	"template_config_schema_id" varchar,
  	"template_config_image" varchar,
  	"template_config_headline" varchar,
  	"template_config_author_name" varchar,
  	"template_config_date_published" varchar,
  	"template_config_date_modified" varchar,
  	"template_config_publisher_name" varchar,
  	"template_config_publisher_logo" varchar,
  	"template_config_article_section" varchar,
  	"template_config_provider_name" varchar,
  	"template_config_provider_url" varchar,
  	"template_config_faq_source" "faq_src" DEFAULT 'auto',
  	"template_config_breadcrumb_source" "bc_src" DEFAULT 'auto',
  	"template_config_logo_url" varchar,
  	"template_config_telephone" varchar,
  	"template_config_street_address" varchar,
  	"template_config_postal_code" varchar,
  	"template_config_address_locality" varchar,
  	"template_config_address_region" varchar,
  	"template_config_address_country" varchar,
  	"template_config_sku" varchar,
  	"template_config_brand" varchar,
  	"template_config_price" varchar,
  	"template_config_price_currency" varchar DEFAULT 'INR',
  	"template_config_availability" varchar,
  	"template_config_rating_value" varchar,
  	"template_config_review_count" varchar,
  	"template_config_start_date" varchar,
  	"template_config_end_date" varchar,
  	"template_config_event_status" varchar,
  	"template_config_event_attendance_mode" varchar,
  	"template_config_location_name" varchar,
  	"template_config_location_address" varchar,
  	"template_config_organizer_name" varchar,
  	"template_config_organizer_url" varchar,
  	"template_config_potential_search_target" varchar,
  	"template_config_custom_type" varchar,
  	"custom_j_s_o_n" jsonb,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"type" "enum_leads_type" NOT NULL,
  	"source" "enum_leads_source" NOT NULL,
  	"source_id" varchar NOT NULL,
  	"event_type" "enum_leads_event_type",
  	"form_type" varchar,
  	"form_id" integer,
  	"status" varchar,
  	"lead_date" timestamp(3) with time zone,
  	"raw_data" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dynamic_pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_dynamic_pages_blocks_cta_links_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_dynamic_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "dynamic_pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_dynamic_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_dynamic_pages_blocks_content_columns_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_dynamic_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "dynamic_pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"media_display_preset" "enum_dynamic_pages_blocks_media_block_media_display_preset" DEFAULT 'original',
  	"media_display_custom_width" numeric,
  	"media_display_custom_height" numeric,
  	"media_display_fit" "enum_dynamic_pages_blocks_media_block_media_display_fit" DEFAULT 'cover',
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_dynamic_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_dynamic_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_hero_slides_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"highlight" varchar,
  	"button_text" varchar,
  	"hero_image_id" integer
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_lead_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_trust_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_dynamic_pages_blocks_clat_pg_block_trust_cards_icon" DEFAULT 'trophy'
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_custom_courses_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_custom_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"tags" varchar,
  	"price" varchar,
  	"original_price" varchar,
  	"discount" varchar,
  	"image_id" integer,
  	"button_text" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bullet" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_id" varchar,
  	"title" varchar,
  	"icon" "enum_dynamic_pages_blocks_clat_pg_block_exam_tabs_icon" DEFAULT 'book',
  	"summary" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_yt_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"youtube_id" varchar,
  	"category" varchar,
  	"duration" varchar,
  	"custom_thumbnail_id" integer
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block_custom_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "dynamic_pages_blocks_clat_pg_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_hero" boolean DEFAULT true,
  	"show_lead_form" boolean DEFAULT true,
  	"show_trust_indicators" boolean DEFAULT true,
  	"show_course_cards" boolean DEFAULT true,
  	"show_demo_banner" boolean DEFAULT true,
  	"show_exam_info_tabs" boolean DEFAULT true,
  	"show_yt_slider" boolean DEFAULT true,
  	"show_faq_accordion" boolean DEFAULT true,
  	"form_id" integer,
  	"lead_badge" varchar DEFAULT 'CLAT PG 2027 / 2028 ADMISSIONS OPEN',
  	"lead_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses',
  	"lead_description" varchar DEFAULT 'Unlock top NLU ranks with Aashayein Judiciary''s dedicated CLAT PG (LL.M.) program. Get access to live interactive sessions, expert law faculty, 24/7 doubt clearing, exhaustive study material, and full-length exam standard mock tests.',
  	"counseling_button_text" varchar DEFAULT 'Book Free Counselling',
  	"brochure_button_text" varchar DEFAULT 'Download Brochure',
  	"brochure_url" varchar DEFAULT '/CLAT_PG.docx',
  	"trust_eyebrow" varchar DEFAULT 'WHY CHOOSE US',
  	"trust_title" varchar DEFAULT 'The Bridge to Your Dream NLU',
  	"trust_subtitle" varchar DEFAULT 'Why Aashayein Judiciary is India''s most trusted learning platform for CLAT PG & LL.M Preparation.',
  	"courses_badge" varchar DEFAULT 'CLAT PG PROGRAMS',
  	"courses_title" varchar DEFAULT 'CLAT PG Courses Designed for Your Success',
  	"courses_subtitle" varchar DEFAULT 'Choose the program that fits your preparation timeline and goals',
  	"courses_button_text" varchar DEFAULT 'View Course Details',
  	"demo_badge" varchar DEFAULT 'DEMO CLASS',
  	"demo_title" varchar DEFAULT 'Book Free Class of Online CLAT PG Coaching!',
  	"demo_description" varchar DEFAULT 'Experience our high-yielding passage analysis methodology, expert NLU faculty guidance, and interactive doubt resolution first-hand.',
  	"demo_button_text" varchar DEFAULT 'BOOK YOUR SPOT NOW',
  	"demo_button_url" varchar,
  	"demo_background_image_id" integer,
  	"exam_info_title" varchar DEFAULT 'Information About CLAT PG Exam',
  	"exam_info_subtitle" varchar DEFAULT 'Everything you need to know about eligibility, exam structure, syllabus, dates, and opportunities.',
  	"yt_badge" varchar DEFAULT 'FREE VIDEO LECTURES & STRATEGY',
  	"yt_title" varchar DEFAULT 'Watch CLAT PG Masterclasses',
  	"yt_subtitle" varchar DEFAULT 'Free strategy sessions, landmark judgment analyses, and subject-wise lectures by Aashayein Judiciary experts.',
  	"faq_badge" varchar DEFAULT 'FREQUENTLY ASKED QUESTIONS',
  	"faq_title" varchar DEFAULT 'CLAT PG Coaching FAQs',
  	"faq_subtitle" varchar DEFAULT 'Frequently asked questions about CLAT PG preparation, eligibility, and online coaching at Aashayein Judiciary.',
  	"meta_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses | Aashayein Judiciary',
  	"meta_description" varchar DEFAULT 'Join Aashayein Judiciary for top CLAT PG (LL.M.) online coaching. Get expert NLU mentors, live interactive classes, subject-wise test series, and 1:1 guidance.',
  	"meta_keywords" varchar DEFAULT 'CLAT PG Online Coaching, Best CLAT PG Coaching 2027, CLAT LLM Online Classes, CLAT PG Mock Test Series, Aashayein Judiciary CLAT PG, AILET PG Coaching',
  	"og_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "dynamic_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"page_subtitle" varchar,
  	"page_description" jsonb,
  	"page_image_id" integer,
  	"page_bg_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_dynamic_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "dynamic_pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"courses_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__dynamic_pages_v_blocks_cta_links_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__dynamic_pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__dynamic_pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__dynamic_pages_v_blocks_content_columns_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__dynamic_pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"media_display_preset" "enum__dynamic_pages_v_blocks_media_block_media_display_preset" DEFAULT 'original',
  	"media_display_custom_width" numeric,
  	"media_display_custom_height" numeric,
  	"media_display_fit" "enum__dynamic_pages_v_blocks_media_block_media_display_fit" DEFAULT 'cover',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__dynamic_pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__dynamic_pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"highlight" varchar,
  	"button_text" varchar,
  	"hero_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_lead_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_trust_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__dynamic_pages_v_blocks_clat_pg_block_trust_cards_icon" DEFAULT 'trophy',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"tags" varchar,
  	"price" varchar,
  	"original_price" varchar,
  	"discount" varchar,
  	"image_id" integer,
  	"button_text" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bullet" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_id" varchar,
  	"title" varchar,
  	"icon" "enum__dynamic_pages_v_blocks_clat_pg_block_exam_tabs_icon" DEFAULT 'book',
  	"summary" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_yt_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"youtube_id" varchar,
  	"category" varchar,
  	"duration" varchar,
  	"custom_thumbnail_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v_blocks_clat_pg_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_hero" boolean DEFAULT true,
  	"show_lead_form" boolean DEFAULT true,
  	"show_trust_indicators" boolean DEFAULT true,
  	"show_course_cards" boolean DEFAULT true,
  	"show_demo_banner" boolean DEFAULT true,
  	"show_exam_info_tabs" boolean DEFAULT true,
  	"show_yt_slider" boolean DEFAULT true,
  	"show_faq_accordion" boolean DEFAULT true,
  	"form_id" integer,
  	"lead_badge" varchar DEFAULT 'CLAT PG 2027 / 2028 ADMISSIONS OPEN',
  	"lead_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses',
  	"lead_description" varchar DEFAULT 'Unlock top NLU ranks with Aashayein Judiciary''s dedicated CLAT PG (LL.M.) program. Get access to live interactive sessions, expert law faculty, 24/7 doubt clearing, exhaustive study material, and full-length exam standard mock tests.',
  	"counseling_button_text" varchar DEFAULT 'Book Free Counselling',
  	"brochure_button_text" varchar DEFAULT 'Download Brochure',
  	"brochure_url" varchar DEFAULT '/CLAT_PG.docx',
  	"trust_eyebrow" varchar DEFAULT 'WHY CHOOSE US',
  	"trust_title" varchar DEFAULT 'The Bridge to Your Dream NLU',
  	"trust_subtitle" varchar DEFAULT 'Why Aashayein Judiciary is India''s most trusted learning platform for CLAT PG & LL.M Preparation.',
  	"courses_badge" varchar DEFAULT 'CLAT PG PROGRAMS',
  	"courses_title" varchar DEFAULT 'CLAT PG Courses Designed for Your Success',
  	"courses_subtitle" varchar DEFAULT 'Choose the program that fits your preparation timeline and goals',
  	"courses_button_text" varchar DEFAULT 'View Course Details',
  	"demo_badge" varchar DEFAULT 'DEMO CLASS',
  	"demo_title" varchar DEFAULT 'Book Free Class of Online CLAT PG Coaching!',
  	"demo_description" varchar DEFAULT 'Experience our high-yielding passage analysis methodology, expert NLU faculty guidance, and interactive doubt resolution first-hand.',
  	"demo_button_text" varchar DEFAULT 'BOOK YOUR SPOT NOW',
  	"demo_button_url" varchar,
  	"demo_background_image_id" integer,
  	"exam_info_title" varchar DEFAULT 'Information About CLAT PG Exam',
  	"exam_info_subtitle" varchar DEFAULT 'Everything you need to know about eligibility, exam structure, syllabus, dates, and opportunities.',
  	"yt_badge" varchar DEFAULT 'FREE VIDEO LECTURES & STRATEGY',
  	"yt_title" varchar DEFAULT 'Watch CLAT PG Masterclasses',
  	"yt_subtitle" varchar DEFAULT 'Free strategy sessions, landmark judgment analyses, and subject-wise lectures by Aashayein Judiciary experts.',
  	"faq_badge" varchar DEFAULT 'FREQUENTLY ASKED QUESTIONS',
  	"faq_title" varchar DEFAULT 'CLAT PG Coaching FAQs',
  	"faq_subtitle" varchar DEFAULT 'Frequently asked questions about CLAT PG preparation, eligibility, and online coaching at Aashayein Judiciary.',
  	"meta_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses | Aashayein Judiciary',
  	"meta_description" varchar DEFAULT 'Join Aashayein Judiciary for top CLAT PG (LL.M.) online coaching. Get expert NLU mentors, live interactive classes, subject-wise test series, and 1:1 guidance.',
  	"meta_keywords" varchar DEFAULT 'CLAT PG Online Coaching, Best CLAT PG Coaching 2027, CLAT LLM Online Classes, CLAT PG Mock Test Series, Aashayein Judiciary CLAT PG, AILET PG Coaching',
  	"og_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dynamic_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_page_subtitle" varchar,
  	"version_page_description" jsonb,
  	"version_page_image_id" integer,
  	"version_page_bg_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__dynamic_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_dynamic_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"courses_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "header_contact_info_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_header_contact_info_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_courses_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "footer_free_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_free_resources_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "footer_company_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_company_links_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "home_experience_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_lead_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_lead_features_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_trust_indicators_icon" NOT NULL,
  	"label" varchar NOT NULL,
  	"sub_label" varchar NOT NULL
  );
  
  CREATE TABLE "home_resources_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "free_study_featured_states" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"abbr" varchar NOT NULL,
  	"code" varchar,
  	"image_id" integer NOT NULL,
  	"image_display_preset" "enum_free_study_featured_states_image_display_preset" DEFAULT 'original',
  	"image_display_custom_width" numeric,
  	"image_display_custom_height" numeric,
  	"image_display_fit" "enum_free_study_featured_states_image_display_fit" DEFAULT 'cover',
  	"color" varchar DEFAULT 'from-slate-900 to-slate-800'
  );
  
  CREATE TABLE "free_study_other_states" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"abbr" varchar NOT NULL
  );
  
  CREATE TABLE "free_study_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_free_study_features_icon" DEFAULT 'book'
  );
  
  CREATE TABLE "syllabus_vacancy_global_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "syllabus_vacancy_global_common_subjects_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar NOT NULL,
  	"subjects" varchar NOT NULL
  );
  
  CREATE TABLE "syllabus_vacancy_global_prelims_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subject" varchar NOT NULL,
  	"topics" varchar NOT NULL
  );
  
  CREATE TABLE "syllabus_vacancy_global_mains_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paper_name" varchar NOT NULL,
  	"subject" varchar NOT NULL,
  	"topics" varchar NOT NULL
  );
  
  CREATE TABLE "syllabus_vacancy_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_text" varchar DEFAULT 'Complete Resource Hub for Judiciary Aspirants',
  	"title" varchar DEFAULT 'State-wise Judiciary Syllabus, Vacancy & Previous Papers',
  	"description" varchar DEFAULT 'Download comprehensive study material, check latest vacancies, and access previous year question papers for all major state judiciary exams.',
  	"common_subjects_title" varchar DEFAULT 'Subjects in Judiciary Exams Syllabus',
  	"common_subjects_description" varchar DEFAULT 'Here''s a list of common subjects included in the Judiciary syllabus across most states:',
  	"prelims_title" varchar DEFAULT 'Judiciary Exam Syllabus 2025 (Prelims)',
  	"prelims_description" varchar DEFAULT 'Here is the syllabus for the Judiciary Prelims Exam, divided into specific subjects:',
  	"mains_title" varchar DEFAULT 'Judiciary Exam Syllabus 2025 (Mains)',
  	"mains_description" varchar DEFAULT 'Here''s the syllabus for the Judiciary Mains Exam presented in tabular form:',
  	"enroll_cta_title" varchar DEFAULT 'Start Your Preparation',
  	"enroll_cta_description" varchar DEFAULT 'Join 50,000+ successful aspirants with expert guidance and comprehensive study material',
  	"enroll_cta_button_text" varchar DEFAULT 'Enroll Now',
  	"enroll_cta_button_url" varchar DEFAULT '/courses',
  	"demo_cta_title" varchar DEFAULT 'Book Free Demo Class',
  	"demo_cta_description" varchar DEFAULT 'Experience our teaching methodology and course structure from expert faculty',
  	"demo_cta_button_text" varchar DEFAULT 'Book Free Demo',
  	"demo_cta_button_url" varchar DEFAULT 'https://forms.gle/PFwih1FLnubDcZD38',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_syllabus_vacancy_global_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_syllabus_vacancy_global_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Judiciary Insights & Resources' NOT NULL,
  	"hero_description" varchar DEFAULT 'Expert articles, preparation strategies, legal updates, and success stories to guide your judiciary exam journey.' NOT NULL,
  	"newsletter_title" varchar DEFAULT 'Weekly Legal Updates' NOT NULL,
  	"newsletter_description" varchar DEFAULT 'Get expert articles, case law updates, and preparation tips delivered to your inbox.' NOT NULL,
  	"cta_title" varchar DEFAULT 'Start Your Journey' NOT NULL,
  	"cta_description" varchar DEFAULT 'Join thousands of successful judiciary aspirants with expert guidance.' NOT NULL,
  	"cta_button_text" varchar DEFAULT 'Enroll Now' NOT NULL,
  	"cta_link" varchar DEFAULT '/courses' NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_blog_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_blog_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "events_page_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "events_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Events & Webinars',
  	"hero_description" varchar DEFAULT 'Join our exclusive webinars, seminars, and scholarship tests to accelerate your judiciary preparation journey with expert guidance from Nitesh Pahuja Sir.',
  	"hero_badge_text" varchar DEFAULT 'Upcoming Events & Opportunities',
  	"brochure_title" varchar DEFAULT 'Get Event Schedule Brochure',
  	"brochure_file_id" integer,
  	"brochure_download_link" varchar,
  	"contact_info_help_title" varchar DEFAULT 'Need Help?',
  	"contact_info_phone" varchar DEFAULT '+91 96679 21888',
  	"contact_info_whatsapp" varchar DEFAULT '919667921888',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_events_page_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_events_page_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "books_page_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "books_page_app_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "books_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge_text" varchar DEFAULT 'Premium Study Materials',
  	"hero_title" varchar DEFAULT 'Expert-Curated Books for Judiciary Exams',
  	"hero_description" varchar DEFAULT 'Comprehensive study materials, practice books, and free e-books designed by experts to help you ace your judiciary examination.',
  	"app_section_badge_text" varchar DEFAULT 'Mobile App',
  	"app_section_title" varchar DEFAULT 'Download Our App for Free Test Series',
  	"app_section_description" varchar DEFAULT 'Get access to free test series, daily practice questions, live classes, and personalized study materials on the go.',
  	"app_section_play_store_link" varchar DEFAULT 'https://play.google.com',
  	"app_section_app_store_link" varchar DEFAULT 'https://www.apple.com/app-store',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_books_page_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_books_page_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_us_story_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"gradient" "enum_about_us_story_stats_gradient" DEFAULT 'red'
  );
  
  CREATE TABLE "about_us_mission_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_us_vision_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_us_values_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_about_us_values_list_icon" DEFAULT 'Heart'
  );
  
  CREATE TABLE "about_us_features_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_about_us_features_list_icon" DEFAULT 'Award'
  );
  
  CREATE TABLE "about_us_legacy_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"color" "enum_about_us_legacy_stats_color" DEFAULT 'red'
  );
  
  CREATE TABLE "about_us" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar DEFAULT 'About Aashayein Judiciary',
  	"hero_title" varchar DEFAULT 'Shaping Future Judiciary Officers',
  	"hero_description" varchar DEFAULT 'Empowering aspiring judiciary officers with comprehensive coaching, expert guidance, and unwavering support to achieve their dreams of serving justice.',
  	"story_badge" varchar DEFAULT 'Our Story',
  	"story_title" varchar DEFAULT 'A Decade of Excellence in Judiciary Coaching',
  	"story_content" jsonb,
  	"director_badge" varchar DEFAULT 'Director''s Message',
  	"director_name" varchar DEFAULT 'Nitesh Sir',
  	"director_title" varchar DEFAULT 'Founder & Director, Aashayein Judiciary',
  	"director_image_id" integer,
  	"director_image_display_preset" "enum_about_us_director_image_display_preset" DEFAULT 'original',
  	"director_image_display_custom_width" numeric,
  	"director_image_display_custom_height" numeric,
  	"director_image_display_fit" "enum_about_us_director_image_display_fit" DEFAULT 'cover',
  	"director_quote" varchar DEFAULT 'Our mission is to make judiciary accessible to every deserving student in India.',
  	"director_content" jsonb,
  	"mission_title" varchar DEFAULT 'Our Mission',
  	"mission_description" varchar DEFAULT 'To provide comprehensive, accessible, and result-oriented judiciary coaching that empowers every aspirant to achieve their dream of serving the Indian judicial system. We are committed to:',
  	"vision_title" varchar DEFAULT 'Our Vision',
  	"vision_description" varchar DEFAULT 'To be India''s most trusted and innovative judiciary coaching institution, recognized for excellence in education, student success, and contribution to the judicial system. We envision:',
  	"values_badge" varchar DEFAULT 'Core Values',
  	"values_title" varchar DEFAULT 'The Principles That Guide Us',
  	"values_description" varchar DEFAULT 'Our values are the foundation of everything we do, shaping our approach to teaching, student engagement, and institutional growth.',
  	"features_badge" varchar DEFAULT 'What Sets Us Apart',
  	"features_title" varchar DEFAULT 'The Aashayein Advantage',
  	"features_description" varchar DEFAULT 'Discover what makes Aashayein Judiciary the preferred choice for thousands of judiciary aspirants across India.',
  	"commitment_title" varchar DEFAULT 'Our Commitment to Your Success',
  	"commitment_description" varchar DEFAULT 'At Aashayein Judiciary, we don''t just prepare you for an examination – we prepare you for a career in judiciary. Every student receives comprehensive support, personalized attention, and unwavering guidance throughout their journey.',
  	"commitment_cta1_text" varchar DEFAULT 'Start Your Journey',
  	"commitment_cta1_link" varchar DEFAULT '/courses',
  	"commitment_cta2_text" varchar DEFAULT 'Contact Us',
  	"commitment_cta2_link" varchar DEFAULT 'https://wa.me/8595173178?text=Hello%20Aashayein%20Judiciary,%20I%20would%20like%20to%20know%20more%20about%20your%20coaching%20programs',
  	"legacy_badge" varchar DEFAULT 'Our Legacy & Impact',
  	"legacy_title" varchar DEFAULT 'Building a Legacy of Excellence',
  	"legacy_description" varchar DEFAULT 'Over the years, Aashayein Judiciary has created a lasting impact on the Indian judicial system through our successful students.',
  	"join_title" varchar DEFAULT 'Join Us in Your Journey to Judiciary',
  	"join_description" varchar DEFAULT 'Whether you''re just starting your preparation or looking to refine your strategy, Aashayein Judiciary is here to support you every step of the way. Let''s work together to turn your aspirations into achievements.',
  	"join_cta1_text" varchar DEFAULT 'Enroll Now',
  	"join_cta1_link" varchar DEFAULT '/courses',
  	"join_cta2_text" varchar DEFAULT 'Watch Free Content',
  	"join_cta2_link" varchar DEFAULT 'https://www.youtube.com/@alecbadshah',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_about_us_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_about_us_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Get in Touch' NOT NULL,
  	"hero_subtitle" varchar DEFAULT 'Have questions about our judiciary courses? We represent the most effective way to help needed to be done.',
  	"map_url" varchar DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9866635848523!2d77.1356877755866!3d28.630159475666014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03b290cbbf6b%3A0xc666870b20163353!2sAashayein%20Judiciary%20Coaching!5e0!3m2!1sen!2sin!4v1709664478819!5m2!1sen!2sin',
  	"faq_title" varchar DEFAULT 'Frequently Asked Questions',
  	"form_title" varchar DEFAULT 'Send Us a Message',
  	"form_description" varchar DEFAULT 'Fill out the form below and our team will get back to you within 24 hours.',
  	"contact_form_id" integer,
  	"quick_support_title" varchar DEFAULT 'Need Immediate Help?',
  	"quick_support_description" varchar DEFAULT 'Chat with our counselors on WhatsApp for instant support and course guidance.',
  	"quick_support_button_label" varchar DEFAULT 'Chat on WhatsApp',
  	"visit_us_title" varchar DEFAULT 'Visit Our Campus',
  	"visit_us_description" varchar DEFAULT 'Meet our faculty, explore our facilities, and get personalized counseling.',
  	"visit_us_button_label" varchar DEFAULT 'Book Appointment',
  	"cta_title" varchar DEFAULT 'Join 50,000+ Successful Aspirants',
  	"cta_description" varchar DEFAULT 'Start your judiciary preparation journey with expert guidance and comprehensive study material.',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_contact_page_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_contact_page_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer
  );
  
  CREATE TABLE "notes_page_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "notes_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge_text" varchar DEFAULT 'Free Study Material',
  	"hero_title" varchar DEFAULT 'Notes & Study Guides',
  	"hero_description" varchar DEFAULT 'Comprehensive notes and guides prepared by experts to help you excel in judiciary examinations. Download free PDFs covering all important subjects and recent amendments.',
  	"enable_gating" boolean DEFAULT false,
  	"gating_popup_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_notes_page_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_notes_page_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "previous_year_questions_page_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "previous_year_questions_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge_text" varchar DEFAULT 'Free Question Papers',
  	"hero_title" varchar DEFAULT 'Previous Year Questions',
  	"hero_description" varchar DEFAULT 'Download previous year question papers from various judiciary examinations across India. Practice with authentic papers to understand exam patterns and improve your preparation.',
  	"enable_gating" boolean DEFAULT false,
  	"gating_popup_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical_u_r_l" varchar,
  	"meta_index_directive" "enum_previous_year_questions_page_meta_index_directive" DEFAULT 'index',
  	"meta_follow_directive" "enum_previous_year_questions_page_meta_follow_directive" DEFAULT 'follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "clat_pg_global_hero_slides_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "clat_pg_global_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"highlight" varchar,
  	"button_text" varchar,
  	"hero_image_id" integer
  );
  
  CREATE TABLE "clat_pg_global_lead_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "clat_pg_global_trust_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_clat_pg_global_trust_cards_icon" DEFAULT 'trophy'
  );
  
  CREATE TABLE "clat_pg_global_custom_courses_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "clat_pg_global_custom_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"tags" varchar,
  	"price" varchar,
  	"original_price" varchar,
  	"discount" varchar,
  	"image_id" integer,
  	"button_text" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "clat_pg_global_exam_tabs_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bullet" varchar
  );
  
  CREATE TABLE "clat_pg_global_exam_tabs_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "clat_pg_global_exam_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_clat_pg_global_exam_tabs_icon" DEFAULT 'book',
  	"summary" varchar
  );
  
  CREATE TABLE "clat_pg_global_yt_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"youtube_id" varchar NOT NULL,
  	"category" varchar,
  	"duration" varchar,
  	"custom_thumbnail_id" integer
  );
  
  CREATE TABLE "clat_pg_global_custom_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "clat_pg_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_hero" boolean DEFAULT true,
  	"show_lead_form" boolean DEFAULT true,
  	"show_trust_indicators" boolean DEFAULT true,
  	"show_course_cards" boolean DEFAULT true,
  	"show_demo_banner" boolean DEFAULT true,
  	"show_exam_info_tabs" boolean DEFAULT true,
  	"show_yt_slider" boolean DEFAULT true,
  	"show_faq_accordion" boolean DEFAULT true,
  	"form_id" integer,
  	"lead_badge" varchar DEFAULT 'CLAT PG 2027 / 2028 ADMISSIONS OPEN',
  	"lead_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses',
  	"lead_description" varchar DEFAULT 'Unlock top NLU ranks with Aashayein Judiciary''s dedicated CLAT PG (LL.M.) program. Get access to live interactive sessions, expert law faculty, 24/7 doubt clearing, exhaustive study material, and full-length exam standard mock tests.',
  	"counseling_button_text" varchar DEFAULT 'Book Free Counselling',
  	"brochure_button_text" varchar DEFAULT 'Download Brochure',
  	"brochure_url" varchar DEFAULT '/CLAT_PG.docx',
  	"trust_eyebrow" varchar DEFAULT 'WHY CHOOSE US',
  	"trust_title" varchar DEFAULT 'The Bridge to Your Dream NLU',
  	"trust_subtitle" varchar DEFAULT 'Why Aashayein Judiciary is India''s most trusted learning platform for CLAT PG & LL.M Preparation.',
  	"courses_badge" varchar DEFAULT 'CLAT PG PROGRAMS',
  	"courses_title" varchar DEFAULT 'CLAT PG Courses Designed for Your Success',
  	"courses_subtitle" varchar DEFAULT 'Choose the program that fits your preparation timeline and goals',
  	"courses_button_text" varchar DEFAULT 'View Course Details',
  	"demo_badge" varchar DEFAULT 'DEMO CLASS',
  	"demo_title" varchar DEFAULT 'Book Free Class of Online CLAT PG Coaching!',
  	"demo_description" varchar DEFAULT 'Experience our high-yielding passage analysis methodology, expert NLU faculty guidance, and interactive doubt resolution first-hand.',
  	"demo_button_text" varchar DEFAULT 'BOOK YOUR SPOT NOW',
  	"demo_button_url" varchar,
  	"demo_background_image_id" integer,
  	"exam_info_title" varchar DEFAULT 'Information About CLAT PG Exam',
  	"exam_info_subtitle" varchar DEFAULT 'Everything you need to know about eligibility, exam structure, syllabus, dates, and opportunities.',
  	"yt_badge" varchar DEFAULT 'FREE VIDEO LECTURES & STRATEGY',
  	"yt_title" varchar DEFAULT 'Watch CLAT PG Masterclasses',
  	"yt_subtitle" varchar DEFAULT 'Free strategy sessions, landmark judgment analyses, and subject-wise lectures by Aashayein Judiciary experts.',
  	"faq_badge" varchar DEFAULT 'FREQUENTLY ASKED QUESTIONS',
  	"faq_title" varchar DEFAULT 'CLAT PG Coaching FAQs',
  	"faq_subtitle" varchar DEFAULT 'Frequently asked questions about CLAT PG preparation, eligibility, and online coaching at Aashayein Judiciary.',
  	"meta_title" varchar DEFAULT 'Best CLAT PG Online Coaching: 2027/28 Courses | Aashayein Judiciary',
  	"meta_description" varchar DEFAULT 'Join Aashayein Judiciary for top CLAT PG (LL.M.) online coaching. Get expert NLU mentors, live interactive classes, subject-wise test series, and 1:1 guidance.',
  	"meta_keywords" varchar DEFAULT 'CLAT PG Online Coaching, Best CLAT PG Coaching 2027, CLAT LLM Online Classes, CLAT PG Mock Test Series, Aashayein Judiciary CLAT PG, AILET PG Coaching',
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "clat_pg_global_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"courses_id" integer,
  	"faqs_id" integer
  );
  
  ALTER TABLE "footer_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_popular_courses" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer_popular_courses" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'simple'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'simple', 'highImpact');
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'simple'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'simple'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'simple', 'highImpact');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'simple'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "courses" ALTER COLUMN "category" SET DATA TYPE text;
  ALTER TABLE "courses" ALTER COLUMN "category" SET DEFAULT 'foundation'::text;
  DROP TYPE "public"."enum_courses_category";
  CREATE TYPE "public"."enum_courses_category" AS ENUM('foundation', 'state-judiciary', 'apo-adpo', 'test-series', 'live', 'recorded', 'other');
  ALTER TABLE "courses" ALTER COLUMN "category" SET DEFAULT 'foundation'::"public"."enum_courses_category";
  ALTER TABLE "courses" ALTER COLUMN "category" SET DATA TYPE "public"."enum_courses_category" USING "category"::"public"."enum_courses_category";
  DROP INDEX "_pages_v_autosave_idx";
  DROP INDEX "_posts_v_autosave_idx";
  ALTER TABLE "header_blocks_link" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "header_blocks_dropdown_items" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "header_blocks_mega_menu_columns_links" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "header_actions_actions" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "footer_bottom_nav_links" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "popular_courses_title" SET DEFAULT 'Courses Overview';
  ALTER TABLE "home" ALTER COLUMN "popular_courses_subtitle" SET DEFAULT 'ALEC Major Course Offerings';
  ALTER TABLE "home" ALTER COLUMN "popular_courses_view_all_link_label" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "success_stories_view_all_link_label" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "resources_title" SET DEFAULT 'Free Study Material';
  ALTER TABLE "home" ALTER COLUMN "resources_subtitle" SET DEFAULT 'Study Resources';
  ALTER TABLE "home" ALTER COLUMN "resources_description" SET DEFAULT 'Access high-quality previous year papers, preparation guides, and important judgements absolutely free. Start your judiciary journey with expert guidance.';
  ALTER TABLE "home" ALTER COLUMN "resources_view_all_link_label" DROP NOT NULL;
  ALTER TABLE "course" ALTER COLUMN "app_link" SET DEFAULT '/courses';
  ALTER TABLE "success_stories_page" ALTER COLUMN "cta_enroll_button_link" SET DEFAULT '/courses';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "media_display_preset" "enum_pages_blocks_media_block_media_display_preset" DEFAULT 'original';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "media_display_custom_width" numeric;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "media_display_custom_height" numeric;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "media_display_fit" "enum_pages_blocks_media_block_media_display_fit" DEFAULT 'cover';
  ALTER TABLE "pages" ADD COLUMN "hero_badge_text" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_canonical_u_r_l" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_index_directive" "enum_pages_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "pages" ADD COLUMN "meta_follow_directive" "enum_pages_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "pages_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "media_display_preset" "enum__pages_v_blocks_media_block_media_display_preset" DEFAULT 'original';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "media_display_custom_width" numeric;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "media_display_custom_height" numeric;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "media_display_fit" "enum__pages_v_blocks_media_block_media_display_fit" DEFAULT 'cover';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_badge_text" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_canonical_u_r_l" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_index_directive" "enum__pages_v_version_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_follow_directive" "enum__pages_v_version_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "_pages_v_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "posts" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "posts" ADD COLUMN "hero_image_display_preset" "enum_posts_hero_image_display_preset" DEFAULT 'original';
  ALTER TABLE "posts" ADD COLUMN "hero_image_display_custom_width" numeric;
  ALTER TABLE "posts" ADD COLUMN "hero_image_display_custom_height" numeric;
  ALTER TABLE "posts" ADD COLUMN "hero_image_display_fit" "enum_posts_hero_image_display_fit" DEFAULT 'cover';
  ALTER TABLE "posts" ADD COLUMN "meta_canonical_u_r_l" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_index_directive" "enum_posts_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "posts" ADD COLUMN "meta_follow_directive" "enum_posts_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_hero_image_display_preset" "enum__posts_v_version_hero_image_display_preset" DEFAULT 'original';
  ALTER TABLE "_posts_v" ADD COLUMN "version_hero_image_display_custom_width" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_hero_image_display_custom_height" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_hero_image_display_fit" "enum__posts_v_version_hero_image_display_fit" DEFAULT 'cover';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_canonical_u_r_l" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_index_directive" "enum__posts_v_version_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_follow_directive" "enum__posts_v_version_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "categories" ADD COLUMN "group" "enum_categories_group" DEFAULT 'blogs';
  ALTER TABLE "users" ADD COLUMN "super_admin" boolean DEFAULT false;
  ALTER TABLE "courses_demo_videos" ADD COLUMN "thumbnail_display_preset" "enum_courses_demo_videos_thumbnail_display_preset" DEFAULT 'original';
  ALTER TABLE "courses_demo_videos" ADD COLUMN "thumbnail_display_custom_width" numeric;
  ALTER TABLE "courses_demo_videos" ADD COLUMN "thumbnail_display_custom_height" numeric;
  ALTER TABLE "courses_demo_videos" ADD COLUMN "thumbnail_display_fit" "enum_courses_demo_videos_thumbnail_display_fit" DEFAULT 'cover';
  ALTER TABLE "courses" ADD COLUMN "classplus_id" numeric;
  ALTER TABLE "courses" ADD COLUMN "show_generated_content" boolean DEFAULT true;
  ALTER TABLE "courses" ADD COLUMN "course_mode" "enum_courses_course_mode" DEFAULT 'online' NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "thumbnail_display_preset" "enum_courses_thumbnail_display_preset" DEFAULT 'original';
  ALTER TABLE "courses" ADD COLUMN "thumbnail_display_custom_width" numeric;
  ALTER TABLE "courses" ADD COLUMN "thumbnail_display_custom_height" numeric;
  ALTER TABLE "courses" ADD COLUMN "thumbnail_display_fit" "enum_courses_thumbnail_display_fit" DEFAULT 'cover';
  ALTER TABLE "courses" ADD COLUMN "instructor_image_display_preset" "enum_courses_instructor_image_display_preset" DEFAULT 'original';
  ALTER TABLE "courses" ADD COLUMN "instructor_image_display_custom_width" numeric;
  ALTER TABLE "courses" ADD COLUMN "instructor_image_display_custom_height" numeric;
  ALTER TABLE "courses" ADD COLUMN "instructor_image_display_fit" "enum_courses_instructor_image_display_fit" DEFAULT 'cover';
  ALTER TABLE "courses" ADD COLUMN "contact_info_phone" varchar;
  ALTER TABLE "courses" ADD COLUMN "contact_info_whatsapp" varchar;
  ALTER TABLE "courses" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "courses" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "courses" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "courses" ADD COLUMN "meta_canonical_u_r_l" varchar;
  ALTER TABLE "courses" ADD COLUMN "meta_index_directive" "enum_courses_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "courses" ADD COLUMN "meta_follow_directive" "enum_courses_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "success_stories" ADD COLUMN "image_display_preset" "enum_success_stories_image_display_preset" DEFAULT 'original';
  ALTER TABLE "success_stories" ADD COLUMN "image_display_custom_width" numeric;
  ALTER TABLE "success_stories" ADD COLUMN "image_display_custom_height" numeric;
  ALTER TABLE "success_stories" ADD COLUMN "image_display_fit" "enum_success_stories_image_display_fit" DEFAULT 'cover';
  ALTER TABLE "success_stories" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "success_stories" ADD COLUMN "meta_canonical_u_r_l" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "meta_index_directive" "enum_success_stories_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "success_stories" ADD COLUMN "meta_follow_directive" "enum_success_stories_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "resources" ADD COLUMN "resource_type" "enum_resources_resource_type" DEFAULT 'video' NOT NULL;
  ALTER TABLE "resources" ADD COLUMN "download_link" varchar;
  ALTER TABLE "resources" ADD COLUMN "difficulty" "enum_resources_difficulty";
  ALTER TABLE "resources" ADD COLUMN "language" "enum_resources_language";
  ALTER TABLE "resources" ADD COLUMN "thumbnail_display_preset" "enum_resources_thumbnail_display_preset" DEFAULT 'original';
  ALTER TABLE "resources" ADD COLUMN "thumbnail_display_custom_width" numeric;
  ALTER TABLE "resources" ADD COLUMN "thumbnail_display_custom_height" numeric;
  ALTER TABLE "resources" ADD COLUMN "thumbnail_display_fit" "enum_resources_thumbnail_display_fit" DEFAULT 'cover';
  ALTER TABLE "resources" ADD COLUMN "instructor_name" varchar;
  ALTER TABLE "resources" ADD COLUMN "instructor_title" varchar;
  ALTER TABLE "resources" ADD COLUMN "instructor_bio" varchar;
  ALTER TABLE "resources" ADD COLUMN "instructor_photo_id" integer;
  ALTER TABLE "resources" ADD COLUMN "instructor_photo_display_preset" "enum_resources_instructor_photo_display_preset" DEFAULT 'original';
  ALTER TABLE "resources" ADD COLUMN "instructor_photo_display_custom_width" numeric;
  ALTER TABLE "resources" ADD COLUMN "instructor_photo_display_custom_height" numeric;
  ALTER TABLE "resources" ADD COLUMN "instructor_photo_display_fit" "enum_resources_instructor_photo_display_fit" DEFAULT 'cover';
  ALTER TABLE "resources" ADD COLUMN "instructor_external_photo_url" varchar;
  ALTER TABLE "resources" ADD COLUMN "overview_introduction" varchar;
  ALTER TABLE "resources" ADD COLUMN "contact_info_phone" varchar;
  ALTER TABLE "resources" ADD COLUMN "contact_info_whatsapp" varchar;
  ALTER TABLE "resources" ADD COLUMN "cta_title" varchar DEFAULT 'Want More Detailed Study?';
  ALTER TABLE "resources" ADD COLUMN "cta_description" varchar DEFAULT 'Get access to comprehensive courses, test series, and personalized mentorship';
  ALTER TABLE "resources" ADD COLUMN "cta_button_text" varchar DEFAULT 'Explore Paid Courses';
  ALTER TABLE "resources" ADD COLUMN "cta_button_link" varchar DEFAULT '/courses';
  ALTER TABLE "resources" ADD COLUMN "stats_total_views" varchar DEFAULT '45K+';
  ALTER TABLE "resources" ADD COLUMN "stats_students_enrolled" varchar DEFAULT '12K+';
  ALTER TABLE "resources" ADD COLUMN "stats_average_rating" varchar DEFAULT '4.8/5';
  ALTER TABLE "resources" ADD COLUMN "stats_downloads" varchar DEFAULT '8.5K+';
  ALTER TABLE "forms_blocks_captcha" ADD COLUMN "captcha_type" "enum_forms_blocks_captcha_captcha_type" DEFAULT 'google' NOT NULL;
  ALTER TABLE "forms" ADD COLUMN "enable_c_r_m" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "syllabus_states_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "books_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "popups_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "vacancies_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "webhook_logs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "enrollments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "notes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "previous_year_questions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mentorship_bookings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "schema_templates_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "leads_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "dynamic_pages_id" integer;
  ALTER TABLE "header" ADD COLUMN "contact_info_phone" varchar;
  ALTER TABLE "header" ADD COLUMN "contact_info_whatsapp" varchar;
  ALTER TABLE "header" ADD COLUMN "contact_info_address" varchar;
  ALTER TABLE "footer" ADD COLUMN "app_links_android" varchar;
  ALTER TABLE "footer" ADD COLUMN "app_links_ios" varchar;
  ALTER TABLE "branding" ADD COLUMN "search_console_google_site_verification" varchar;
  ALTER TABLE "branding" ADD COLUMN "search_console_dns_txt_record" varchar;
  ALTER TABLE "branding" ADD COLUMN "analytics_ga4_measurement_id" varchar;
  ALTER TABLE "branding" ADD COLUMN "analytics_google_tag_manager_id" varchar;
  ALTER TABLE "branding" ADD COLUMN "analytics_conversion_head_script" varchar;
  ALTER TABLE "branding" ADD COLUMN "analytics_conversion_body_script" varchar;
  ALTER TABLE "branding" ADD COLUMN "enroll_button_label" varchar DEFAULT 'Enroll Now';
  ALTER TABLE "branding" ADD COLUMN "enroll_button_link" varchar DEFAULT '/courses' NOT NULL;
  ALTER TABLE "branding" ADD COLUMN "contact_info_phone" varchar DEFAULT '+919111198177';
  ALTER TABLE "branding" ADD COLUMN "contact_info_whatsapp" varchar DEFAULT '919111198177';
  ALTER TABLE "branding" ADD COLUMN "sticky_c_t_a_is_active" boolean DEFAULT false;
  ALTER TABLE "branding" ADD COLUMN "sticky_c_t_a_label" varchar DEFAULT 'Book Free Demo';
  ALTER TABLE "branding" ADD COLUMN "sticky_c_t_a_link" varchar DEFAULT '/contact';
  ALTER TABLE "branding" ADD COLUMN "conversions_show_floating_buttons" boolean DEFAULT true;
  ALTER TABLE "branding" ADD COLUMN "conversions_show_whatsapp" boolean DEFAULT true;
  ALTER TABLE "branding" ADD COLUMN "conversions_show_call" boolean DEFAULT true;
  ALTER TABLE "branding" ADD COLUMN "conversions_whatsapp_number" varchar;
  ALTER TABLE "branding" ADD COLUMN "conversions_call_number" varchar;
  ALTER TABLE "branding" ADD COLUMN "conversions_brochure_id" integer;
  ALTER TABLE "branding" ADD COLUMN "captcha_captcha_type" "enum_branding_captcha_captcha_type" DEFAULT 'google';
  ALTER TABLE "home_slides" ADD COLUMN "image_display_preset" "enum_home_slides_image_display_preset" DEFAULT 'original';
  ALTER TABLE "home_slides" ADD COLUMN "image_display_custom_width" numeric;
  ALTER TABLE "home_slides" ADD COLUMN "image_display_custom_height" numeric;
  ALTER TABLE "home_slides" ADD COLUMN "image_display_fit" "enum_home_slides_image_display_fit" DEFAULT 'cover';
  ALTER TABLE "home_slides" ADD COLUMN "secondary_link_type" "enum_home_slides_secondary_link_type" DEFAULT 'none';
  ALTER TABLE "home_slides" ADD COLUMN "secondary_link_new_tab" boolean;
  ALTER TABLE "home_slides" ADD COLUMN "secondary_link_url" varchar;
  ALTER TABLE "home_slides" ADD COLUMN "secondary_link_appearance" "enum_home_slides_secondary_link_appearance" DEFAULT 'default';
  ALTER TABLE "home" ADD COLUMN "founder_section_title" varchar DEFAULT 'Meet The Visionary Behind Aashayien';
  ALTER TABLE "home" ADD COLUMN "founder_section_subtitle" varchar DEFAULT 'About Our Founder';
  ALTER TABLE "home" ADD COLUMN "founder_image_id" integer NOT NULL;
  ALTER TABLE "home" ADD COLUMN "founder_image_display_preset" "enum_home_founder_image_display_preset" DEFAULT 'thumbnail';
  ALTER TABLE "home" ADD COLUMN "founder_image_display_custom_width" numeric;
  ALTER TABLE "home" ADD COLUMN "founder_image_display_custom_height" numeric;
  ALTER TABLE "home" ADD COLUMN "founder_image_display_fit" "enum_home_founder_image_display_fit" DEFAULT 'cover';
  ALTER TABLE "home" ADD COLUMN "founder_name" varchar DEFAULT 'Anil Khanna' NOT NULL;
  ALTER TABLE "home" ADD COLUMN "founder_role" varchar DEFAULT 'Founder & Chief Mentor';
  ALTER TABLE "home" ADD COLUMN "founder_intro" varchar DEFAULT 'Leading authority in legal education with over 20 years of experience in mentoring judiciary aspirants.';
  ALTER TABLE "home" ADD COLUMN "founder_c_t_a_label" varchar DEFAULT 'Learn More About Anil Sir';
  ALTER TABLE "home" ADD COLUMN "founder_c_t_a_link" varchar DEFAULT '/about-us';
  ALTER TABLE "home" ADD COLUMN "updates_title" varchar DEFAULT 'Latest Notifications & Updates';
  ALTER TABLE "home" ADD COLUMN "updates_subtitle" varchar DEFAULT 'Stay Informed';
  ALTER TABLE "home" ADD COLUMN "updates_description" varchar DEFAULT 'Keep track of the latest judiciary exam notifications and upcoming academy events.';
  ALTER TABLE "home" ADD COLUMN "mentee_count_text" varchar DEFAULT 'Join 5000+ students already being mentored.';
  ALTER TABLE "home" ADD COLUMN "results_title" varchar DEFAULT 'Our Achievers';
  ALTER TABLE "home" ADD COLUMN "results_subtitle" varchar DEFAULT 'Celebrating Excellence in Judiciary';
  ALTER TABLE "home" ADD COLUMN "results_description" varchar DEFAULT 'Meet our students who have turned their dreams into reality with dedication and right guidance.';
  ALTER TABLE "home" ADD COLUMN "results_fetch_type" "enum_home_results_fetch_type" DEFAULT 'latest';
  ALTER TABLE "home" ADD COLUMN "results_limit" numeric DEFAULT 6;
  ALTER TABLE "home" ADD COLUMN "app_image_display_preset" "enum_home_app_image_display_preset" DEFAULT 'original';
  ALTER TABLE "home" ADD COLUMN "app_image_display_custom_width" numeric;
  ALTER TABLE "home" ADD COLUMN "app_image_display_custom_height" numeric;
  ALTER TABLE "home" ADD COLUMN "app_image_display_fit" "enum_home_app_image_display_fit" DEFAULT 'cover';
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_title" varchar DEFAULT 'Start Your Journey Towards Becoming a Judge';
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_description" varchar DEFAULT 'Join ALEC’s expert-led judiciary preparation programs and get the mentorship needed to succeed.';
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_primary_c_t_a_type" "enum_home_final_c_t_a_primary_c_t_a_type" DEFAULT 'none';
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_primary_c_t_a_new_tab" boolean;
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_primary_c_t_a_url" varchar;
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_primary_c_t_a_label" varchar;
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_primary_c_t_a_appearance" "enum_home_final_c_t_a_primary_c_t_a_appearance" DEFAULT 'default';
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_secondary_c_t_a_type" "enum_home_final_c_t_a_secondary_c_t_a_type" DEFAULT 'none';
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_secondary_c_t_a_new_tab" boolean;
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_secondary_c_t_a_url" varchar;
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_secondary_c_t_a_label" varchar;
  ALTER TABLE "home" ADD COLUMN "final_c_t_a_secondary_c_t_a_appearance" "enum_home_final_c_t_a_secondary_c_t_a_appearance" DEFAULT 'default';
  ALTER TABLE "home" ADD COLUMN "events_title" varchar;
  ALTER TABLE "home" ADD COLUMN "events_subtitle" varchar;
  ALTER TABLE "home" ADD COLUMN "events_description" varchar;
  ALTER TABLE "home" ADD COLUMN "events_fetch_type" "enum_home_events_fetch_type" DEFAULT 'latest';
  ALTER TABLE "home" ADD COLUMN "events_limit" numeric DEFAULT 3;
  ALTER TABLE "home" ADD COLUMN "blog_judgments_title" varchar DEFAULT 'Knowledge Hub for Judiciary Aspirants';
  ALTER TABLE "home" ADD COLUMN "blog_judgments_subtitle" varchar DEFAULT 'Blog & Insights';
  ALTER TABLE "home" ADD COLUMN "blog_judgments_description" varchar DEFAULT 'Deep dive into legal concepts, landmark judgments, and expert preparation strategies.';
  ALTER TABLE "home" ADD COLUMN "blog_judgments_fetch_type" "enum_home_blog_judgments_fetch_type" DEFAULT 'latest';
  ALTER TABLE "home" ADD COLUMN "blog_judgments_limit" numeric DEFAULT 3;
  ALTER TABLE "home" ADD COLUMN "blog_judgments_view_all_link_type" "enum_home_blog_judgments_view_all_link_type" DEFAULT 'none';
  ALTER TABLE "home" ADD COLUMN "blog_judgments_view_all_link_new_tab" boolean;
  ALTER TABLE "home" ADD COLUMN "blog_judgments_view_all_link_url" varchar;
  ALTER TABLE "home" ADD COLUMN "blog_judgments_view_all_link_label" varchar;
  ALTER TABLE "home" ADD COLUMN "blog_judgments_view_all_link_appearance" "enum_home_blog_judgments_view_all_link_appearance" DEFAULT 'default';
  ALTER TABLE "home" ADD COLUMN "testimonials_title" varchar DEFAULT 'Student Testimonials';
  ALTER TABLE "home" ADD COLUMN "testimonials_subtitle" varchar DEFAULT 'Strengthening credibility through real feedback';
  ALTER TABLE "home" ADD COLUMN "testimonials_description" varchar;
  ALTER TABLE "home" ADD COLUMN "testimonials_fetch_type" "enum_home_testimonials_fetch_type" DEFAULT 'latest';
  ALTER TABLE "home" ADD COLUMN "testimonials_limit" numeric DEFAULT 6;
  ALTER TABLE "home" ADD COLUMN "testimonials_view_all_link_type" "enum_home_testimonials_view_all_link_type" DEFAULT 'none';
  ALTER TABLE "home" ADD COLUMN "testimonials_view_all_link_new_tab" boolean;
  ALTER TABLE "home" ADD COLUMN "testimonials_view_all_link_url" varchar;
  ALTER TABLE "home" ADD COLUMN "testimonials_view_all_link_label" varchar;
  ALTER TABLE "home" ADD COLUMN "testimonials_view_all_link_appearance" "enum_home_testimonials_view_all_link_appearance" DEFAULT 'default';
  ALTER TABLE "home" ADD COLUMN "visibility_hero" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_trust_indicators" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_achievers" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_lead_capture" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_founder" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_why_choose_us" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_courses" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_resources" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_notifications" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_events" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_testimonials" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_blog" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_faq" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "visibility_final_c_t_a" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "home" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "home" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "home" ADD COLUMN "meta_canonical_u_r_l" varchar;
  ALTER TABLE "home" ADD COLUMN "meta_index_directive" "enum_home_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "home" ADD COLUMN "meta_follow_directive" "enum_home_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "home_rels" ADD COLUMN "vacancies_id" integer;
  ALTER TABLE "home_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "home_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "course" ADD COLUMN "community_image_display_preset" "enum_course_community_image_display_preset" DEFAULT 'original';
  ALTER TABLE "course" ADD COLUMN "community_image_display_custom_width" numeric;
  ALTER TABLE "course" ADD COLUMN "community_image_display_custom_height" numeric;
  ALTER TABLE "course" ADD COLUMN "community_image_display_fit" "enum_course_community_image_display_fit" DEFAULT 'cover';
  ALTER TABLE "course" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "course" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "course" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "course" ADD COLUMN "meta_canonical_u_r_l" varchar;
  ALTER TABLE "course" ADD COLUMN "meta_index_directive" "enum_course_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "course" ADD COLUMN "meta_follow_directive" "enum_course_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "course_rels" ADD COLUMN "success_stories_id" integer;
  ALTER TABLE "success_stories_page" ADD COLUMN "judiciary_section_title" varchar DEFAULT 'Judiciary Services';
  ALTER TABLE "success_stories_page" ADD COLUMN "judiciary_section_description" varchar DEFAULT 'Our students who cracked Civil Judge Junior Division exams across various states.';
  ALTER TABLE "success_stories_page" ADD COLUMN "adpo_section_title" varchar DEFAULT 'ADPO/APO Selections';
  ALTER TABLE "success_stories_page" ADD COLUMN "adpo_section_description" varchar DEFAULT 'Outstanding performance in Assistant District Public Prosecution Officer exams.';
  ALTER TABLE "success_stories_page" ADD COLUMN "mains_section_title" varchar DEFAULT 'Mains Excellence';
  ALTER TABLE "success_stories_page" ADD COLUMN "mains_section_description" varchar DEFAULT 'Top scorers in Mains examination who demonstrated exceptional legal writing skills.';
  ALTER TABLE "success_stories_page" ADD COLUMN "test_series_section_title" varchar DEFAULT 'Test Series Toppers';
  ALTER TABLE "success_stories_page" ADD COLUMN "test_series_section_description" varchar DEFAULT 'Consistent performers in our All India and State-specific Test Series.';
  ALTER TABLE "success_stories_page" ADD COLUMN "interview_section_title" varchar DEFAULT 'Interview Success';
  ALTER TABLE "success_stories_page" ADD COLUMN "interview_section_description" varchar DEFAULT 'Candidates who scored exceptional marks in the interview stage through our guidance.';
  ALTER TABLE "success_stories_page" ADD COLUMN "counselling_image_display_preset" "enum_success_stories_page_counselling_image_display_preset" DEFAULT 'original';
  ALTER TABLE "success_stories_page" ADD COLUMN "counselling_image_display_custom_width" numeric;
  ALTER TABLE "success_stories_page" ADD COLUMN "counselling_image_display_custom_height" numeric;
  ALTER TABLE "success_stories_page" ADD COLUMN "counselling_image_display_fit" "enum_success_stories_page_counselling_image_display_fit" DEFAULT 'cover';
  ALTER TABLE "success_stories_page" ADD COLUMN "visibility_judiciary" boolean DEFAULT true;
  ALTER TABLE "success_stories_page" ADD COLUMN "visibility_adpo" boolean DEFAULT true;
  ALTER TABLE "success_stories_page" ADD COLUMN "visibility_mains" boolean DEFAULT true;
  ALTER TABLE "success_stories_page" ADD COLUMN "visibility_test_series" boolean DEFAULT true;
  ALTER TABLE "success_stories_page" ADD COLUMN "visibility_interview" boolean DEFAULT true;
  ALTER TABLE "success_stories_page" ADD COLUMN "visibility_counselling" boolean DEFAULT true;
  ALTER TABLE "success_stories_page" ADD COLUMN "visibility_brochure" boolean DEFAULT true;
  ALTER TABLE "success_stories_page" ADD COLUMN "visibility_final_c_t_a" boolean DEFAULT true;
  ALTER TABLE "success_stories_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "success_stories_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "success_stories_page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "success_stories_page" ADD COLUMN "meta_canonical_u_r_l" varchar;
  ALTER TABLE "success_stories_page" ADD COLUMN "meta_index_directive" "enum_success_stories_page_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "success_stories_page" ADD COLUMN "meta_follow_directive" "enum_success_stories_page_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "free_study" ADD COLUMN "pan_india_title" varchar DEFAULT 'Pan India Reach';
  ALTER TABLE "free_study" ADD COLUMN "pan_india_subtitle" varchar DEFAULT 'From Himalayas to Coastlines';
  ALTER TABLE "free_study" ADD COLUMN "pan_india_description" varchar DEFAULT 'Comprehensive judiciary exam preparation across 14+ Indian states with state-specific syllabus, local laws, and expert guidance from Nitesh Pahuja Sir.';
  ALTER TABLE "free_study" ADD COLUMN "pan_india_background_id" integer;
  ALTER TABLE "free_study" ADD COLUMN "pan_india_background_display_preset" "enum_free_study_pan_india_background_display_preset" DEFAULT 'original';
  ALTER TABLE "free_study" ADD COLUMN "pan_india_background_display_custom_width" numeric;
  ALTER TABLE "free_study" ADD COLUMN "pan_india_background_display_custom_height" numeric;
  ALTER TABLE "free_study" ADD COLUMN "pan_india_background_display_fit" "enum_free_study_pan_india_background_display_fit" DEFAULT 'cover';
  ALTER TABLE "free_study" ADD COLUMN "pan_india_stats_states_count" varchar DEFAULT '14+';
  ALTER TABLE "free_study" ADD COLUMN "pan_india_stats_videos_count" varchar DEFAULT '1000+';
  ALTER TABLE "free_study" ADD COLUMN "pan_india_stats_views_count" varchar DEFAULT '10M+';
  ALTER TABLE "free_study" ADD COLUMN "enable_gating" boolean DEFAULT true;
  ALTER TABLE "free_study" ADD COLUMN "gating_popup_id" integer;
  ALTER TABLE "free_study" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "free_study" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "free_study" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "free_study" ADD COLUMN "meta_canonical_u_r_l" varchar;
  ALTER TABLE "free_study" ADD COLUMN "meta_index_directive" "enum_free_study_meta_index_directive" DEFAULT 'index';
  ALTER TABLE "free_study" ADD COLUMN "meta_follow_directive" "enum_free_study_meta_follow_directive" DEFAULT 'follow';
  ALTER TABLE "pages_blocks_clat_pg_block_hero_slides_features" ADD CONSTRAINT "pages_blocks_clat_pg_block_hero_slides_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_hero_slides" ADD CONSTRAINT "pages_blocks_clat_pg_block_hero_slides_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_hero_slides" ADD CONSTRAINT "pages_blocks_clat_pg_block_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_lead_features" ADD CONSTRAINT "pages_blocks_clat_pg_block_lead_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_trust_cards" ADD CONSTRAINT "pages_blocks_clat_pg_block_trust_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_custom_courses_features" ADD CONSTRAINT "pages_blocks_clat_pg_block_custom_courses_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block_custom_courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_custom_courses" ADD CONSTRAINT "pages_blocks_clat_pg_block_custom_courses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_custom_courses" ADD CONSTRAINT "pages_blocks_clat_pg_block_custom_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_exam_tabs_bullets" ADD CONSTRAINT "pages_blocks_clat_pg_block_exam_tabs_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_exam_tabs_details" ADD CONSTRAINT "pages_blocks_clat_pg_block_exam_tabs_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_exam_tabs" ADD CONSTRAINT "pages_blocks_clat_pg_block_exam_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_yt_videos" ADD CONSTRAINT "pages_blocks_clat_pg_block_yt_videos_custom_thumbnail_id_media_id_fk" FOREIGN KEY ("custom_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_yt_videos" ADD CONSTRAINT "pages_blocks_clat_pg_block_yt_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block_custom_faqs" ADD CONSTRAINT "pages_blocks_clat_pg_block_custom_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block" ADD CONSTRAINT "pages_blocks_clat_pg_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block" ADD CONSTRAINT "pages_blocks_clat_pg_block_demo_background_image_id_media_id_fk" FOREIGN KEY ("demo_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block" ADD CONSTRAINT "pages_blocks_clat_pg_block_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clat_pg_block" ADD CONSTRAINT "pages_blocks_clat_pg_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sdata_overrides_faq_items" ADD CONSTRAINT "sdata_overrides_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sdata"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sdata_overrides_breadcrumbs" ADD CONSTRAINT "sdata_overrides_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sdata"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sdata_overrides_same_as" ADD CONSTRAINT "sdata_overrides_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sdata"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sdata" ADD CONSTRAINT "sdata_source_template_id_schema_templates_id_fk" FOREIGN KEY ("source_template_id") REFERENCES "public"."schema_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sdata" ADD CONSTRAINT "sdata_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."previous_year_questions_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_hero_slides_features" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_hero_slides_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_hero_slides" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_hero_slides_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_hero_slides" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_lead_features" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_lead_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_trust_cards" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_trust_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_custom_courses_features" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_custom_courses_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block_custom_courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_custom_courses" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_custom_courses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_custom_courses" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_custom_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_exam_tabs_bullets" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_exam_tabs_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_exam_tabs_details" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_exam_tabs_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_exam_tabs" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_exam_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_yt_videos" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_yt_videos_custom_thumbnail_id_media_id_fk" FOREIGN KEY ("custom_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_yt_videos" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_yt_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_custom_faqs" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_custom_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_demo_background_image_id_media_id_fk" FOREIGN KEY ("demo_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clat_pg_block" ADD CONSTRAINT "_pages_v_blocks_clat_pg_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sdata_v_overrides_faq_items" ADD CONSTRAINT "_sdata_v_overrides_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sdata_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sdata_v_overrides_breadcrumbs" ADD CONSTRAINT "_sdata_v_overrides_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sdata_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sdata_v_overrides_same_as" ADD CONSTRAINT "_sdata_v_overrides_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sdata_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sdata_v" ADD CONSTRAINT "_sdata_v_source_template_id_schema_templates_id_fk" FOREIGN KEY ("source_template_id") REFERENCES "public"."schema_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sdata_v" ADD CONSTRAINT "_sdata_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_display_size" ADD CONSTRAINT "media_display_size_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_module_permissions_module" ADD CONSTRAINT "users_module_permissions_module_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users_module_permissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_module_permissions" ADD CONSTRAINT "users_module_permissions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_faqs" ADD CONSTRAINT "courses_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_reviews" ADD CONSTRAINT "courses_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_overview_what_you_will_learn" ADD CONSTRAINT "resources_overview_what_you_will_learn_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_overview_key_topics_covered_topics" ADD CONSTRAINT "resources_overview_key_topics_covered_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources_overview_key_topics_covered"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_overview_key_topics_covered" ADD CONSTRAINT "resources_overview_key_topics_covered_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_study_materials" ADD CONSTRAINT "resources_study_materials_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources_study_materials" ADD CONSTRAINT "resources_study_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_testimonials" ADD CONSTRAINT "resources_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources_testimonials" ADD CONSTRAINT "resources_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_related_exams" ADD CONSTRAINT "resources_related_exams_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_states_prelims_subjects" ADD CONSTRAINT "syllabus_states_prelims_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."syllabus_states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_states_syllabus_topics_topics" ADD CONSTRAINT "syllabus_states_syllabus_topics_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."syllabus_states_syllabus_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_states_syllabus_topics" ADD CONSTRAINT "syllabus_states_syllabus_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."syllabus_states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_states_important_books" ADD CONSTRAINT "syllabus_states_important_books_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."syllabus_states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_states_preparation_tips" ADD CONSTRAINT "syllabus_states_preparation_tips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."syllabus_states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_states" ADD CONSTRAINT "syllabus_states_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "syllabus_states" ADD CONSTRAINT "syllabus_states_downloads_syllabus_file_id_media_id_fk" FOREIGN KEY ("downloads_syllabus_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "syllabus_states" ADD CONSTRAINT "syllabus_states_downloads_pyq_file_id_media_id_fk" FOREIGN KEY ("downloads_pyq_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "syllabus_states" ADD CONSTRAINT "syllabus_states_downloads_notification_file_id_media_id_fk" FOREIGN KEY ("downloads_notification_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "syllabus_states" ADD CONSTRAINT "syllabus_states_syllabus_file_id_media_id_fk" FOREIGN KEY ("syllabus_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_tags" ADD CONSTRAINT "events_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_agenda" ADD CONSTRAINT "events_agenda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_benefits" ADD CONSTRAINT "events_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_host_image_id_media_id_fk" FOREIGN KEY ("host_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_brochure_file_id_media_id_fk" FOREIGN KEY ("brochure_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "books_tags" ADD CONSTRAINT "books_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_features" ADD CONSTRAINT "books_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_table_of_contents_topics" ADD CONSTRAINT "books_table_of_contents_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_table_of_contents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_table_of_contents" ADD CONSTRAINT "books_table_of_contents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_what_you_will_learn" ADD CONSTRAINT "books_what_you_will_learn_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_requirements" ADD CONSTRAINT "books_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_target_audience" ADD CONSTRAINT "books_target_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_why_choose_this_book" ADD CONSTRAINT "books_why_choose_this_book_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_guarantees" ADD CONSTRAINT "books_guarantees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_student_reviews" ADD CONSTRAINT "books_student_reviews_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "books_student_reviews" ADD CONSTRAINT "books_student_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books" ADD CONSTRAINT "books_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "books" ADD CONSTRAINT "books_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "books" ADD CONSTRAINT "books_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "books_rels" ADD CONSTRAINT "books_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_rels" ADD CONSTRAINT "books_rels_books_fk" FOREIGN KEY ("books_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "popups" ADD CONSTRAINT "popups_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "popups" ADD CONSTRAINT "popups_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancies_breakdown" ADD CONSTRAINT "vacancies_breakdown_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_important_dates" ADD CONSTRAINT "vacancies_important_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_application_fee" ADD CONSTRAINT "vacancies_application_fee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_qualifications" ADD CONSTRAINT "vacancies_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_benefits" ADD CONSTRAINT "vacancies_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_selection_process" ADD CONSTRAINT "vacancies_selection_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_how_to_apply" ADD CONSTRAINT "vacancies_how_to_apply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_required_documents" ADD CONSTRAINT "vacancies_required_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_important_instructions" ADD CONSTRAINT "vacancies_important_instructions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_additional_links" ADD CONSTRAINT "vacancies_additional_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_state_id_syllabus_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."syllabus_states"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_pdf_upload_id_media_id_fk" FOREIGN KEY ("pdf_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes_tags" ADD CONSTRAINT "notes_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "previous_year_questions_tags" ADD CONSTRAINT "previous_year_questions_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."previous_year_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "previous_year_questions" ADD CONSTRAINT "previous_year_questions_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "previous_year_questions" ADD CONSTRAINT "previous_year_questions_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "schema_templates_applies_to" ADD CONSTRAINT "schema_templates_applies_to_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."schema_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schema_templates_template_config_faq_items" ADD CONSTRAINT "schema_templates_template_config_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schema_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schema_templates_template_config_breadcrumbs" ADD CONSTRAINT "schema_templates_template_config_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schema_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schema_templates_template_config_same_as" ADD CONSTRAINT "schema_templates_template_config_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schema_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_cta_links" ADD CONSTRAINT "dynamic_pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_cta" ADD CONSTRAINT "dynamic_pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_content_columns" ADD CONSTRAINT "dynamic_pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_content" ADD CONSTRAINT "dynamic_pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_media_block" ADD CONSTRAINT "dynamic_pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_media_block" ADD CONSTRAINT "dynamic_pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_archive" ADD CONSTRAINT "dynamic_pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_form_block" ADD CONSTRAINT "dynamic_pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_form_block" ADD CONSTRAINT "dynamic_pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_faq_questions" ADD CONSTRAINT "dynamic_pages_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_faq" ADD CONSTRAINT "dynamic_pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_hero_slides_features" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_hero_slides_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_hero_slides" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_hero_slides_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_hero_slides" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_lead_features" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_lead_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_trust_cards" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_trust_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_custom_courses_features" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_custom_courses_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block_custom_courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_custom_courses" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_custom_courses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_custom_courses" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_custom_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs_bullets" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_exam_tabs_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs_details" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_exam_tabs_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_exam_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_yt_videos" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_yt_videos_custom_thumbnail_id_media_id_fk" FOREIGN KEY ("custom_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_yt_videos" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_yt_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_custom_faqs" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_custom_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_demo_background_image_id_media_id_fk" FOREIGN KEY ("demo_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block" ADD CONSTRAINT "dynamic_pages_blocks_clat_pg_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages" ADD CONSTRAINT "dynamic_pages_page_image_id_media_id_fk" FOREIGN KEY ("page_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages" ADD CONSTRAINT "dynamic_pages_page_bg_image_id_media_id_fk" FOREIGN KEY ("page_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dynamic_pages_rels" ADD CONSTRAINT "dynamic_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_rels" ADD CONSTRAINT "dynamic_pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_rels" ADD CONSTRAINT "dynamic_pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_rels" ADD CONSTRAINT "dynamic_pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_rels" ADD CONSTRAINT "dynamic_pages_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dynamic_pages_rels" ADD CONSTRAINT "dynamic_pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_cta_links" ADD CONSTRAINT "_dynamic_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_cta" ADD CONSTRAINT "_dynamic_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_content_columns" ADD CONSTRAINT "_dynamic_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_content" ADD CONSTRAINT "_dynamic_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_media_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_media_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_archive" ADD CONSTRAINT "_dynamic_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_form_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_form_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_faq_questions" ADD CONSTRAINT "_dynamic_pages_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_faq" ADD CONSTRAINT "_dynamic_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_features" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_hero_slides" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_hero_slides" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_lead_features" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_lead_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_trust_cards" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_trust_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_features" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block_custom_courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_courses" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_courses" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_bullets" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_details" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_yt_videos" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_yt_videos_custom_thumbnail_id_media_id_fk" FOREIGN KEY ("custom_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_yt_videos" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_yt_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_faqs" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_custom_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v_blocks_clat_pg_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_demo_background_image_id_media_id_fk" FOREIGN KEY ("demo_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block" ADD CONSTRAINT "_dynamic_pages_v_blocks_clat_pg_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v" ADD CONSTRAINT "_dynamic_pages_v_parent_id_dynamic_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v" ADD CONSTRAINT "_dynamic_pages_v_version_page_image_id_media_id_fk" FOREIGN KEY ("version_page_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v" ADD CONSTRAINT "_dynamic_pages_v_version_page_bg_image_id_media_id_fk" FOREIGN KEY ("version_page_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_rels" ADD CONSTRAINT "_dynamic_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_dynamic_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_rels" ADD CONSTRAINT "_dynamic_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_rels" ADD CONSTRAINT "_dynamic_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_rels" ADD CONSTRAINT "_dynamic_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_rels" ADD CONSTRAINT "_dynamic_pages_v_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dynamic_pages_v_rels" ADD CONSTRAINT "_dynamic_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_contact_info_social_links" ADD CONSTRAINT "header_contact_info_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_courses" ADD CONSTRAINT "footer_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_free_resources" ADD CONSTRAINT "footer_free_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_company_links" ADD CONSTRAINT "footer_company_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_experience_highlights" ADD CONSTRAINT "home_experience_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_lead_features" ADD CONSTRAINT "home_lead_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_trust_indicators" ADD CONSTRAINT "home_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_resources_features" ADD CONSTRAINT "home_resources_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "free_study_featured_states" ADD CONSTRAINT "free_study_featured_states_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "free_study_featured_states" ADD CONSTRAINT "free_study_featured_states_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."free_study"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "free_study_other_states" ADD CONSTRAINT "free_study_other_states_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."free_study"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "free_study_features" ADD CONSTRAINT "free_study_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."free_study"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_vacancy_global_stats" ADD CONSTRAINT "syllabus_vacancy_global_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."syllabus_vacancy_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_vacancy_global_common_subjects_list" ADD CONSTRAINT "syllabus_vacancy_global_common_subjects_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."syllabus_vacancy_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_vacancy_global_prelims_list" ADD CONSTRAINT "syllabus_vacancy_global_prelims_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."syllabus_vacancy_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_vacancy_global_mains_list" ADD CONSTRAINT "syllabus_vacancy_global_mains_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."syllabus_vacancy_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "syllabus_vacancy_global" ADD CONSTRAINT "syllabus_vacancy_global_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_page_faqs" ADD CONSTRAINT "events_page_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_page" ADD CONSTRAINT "events_page_brochure_file_id_media_id_fk" FOREIGN KEY ("brochure_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_page" ADD CONSTRAINT "events_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "books_page_stats" ADD CONSTRAINT "books_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_page_app_section_features" ADD CONSTRAINT "books_page_app_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_page" ADD CONSTRAINT "books_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_us_story_stats" ADD CONSTRAINT "about_us_story_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_mission_points" ADD CONSTRAINT "about_us_mission_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_vision_points" ADD CONSTRAINT "about_us_vision_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_values_list" ADD CONSTRAINT "about_us_values_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_features_list" ADD CONSTRAINT "about_us_features_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_legacy_stats" ADD CONSTRAINT "about_us_legacy_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us" ADD CONSTRAINT "about_us_director_image_id_media_id_fk" FOREIGN KEY ("director_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_us" ADD CONSTRAINT "about_us_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_contact_form_id_forms_id_fk" FOREIGN KEY ("contact_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_rels" ADD CONSTRAINT "contact_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_rels" ADD CONSTRAINT "contact_page_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes_page_hero_stats" ADD CONSTRAINT "notes_page_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notes_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes_page" ADD CONSTRAINT "notes_page_gating_popup_id_popups_id_fk" FOREIGN KEY ("gating_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes_page" ADD CONSTRAINT "notes_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "previous_year_questions_page_hero_stats" ADD CONSTRAINT "previous_year_questions_page_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."previous_year_questions_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "previous_year_questions_page" ADD CONSTRAINT "previous_year_questions_page_gating_popup_id_popups_id_fk" FOREIGN KEY ("gating_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "previous_year_questions_page" ADD CONSTRAINT "previous_year_questions_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clat_pg_global_hero_slides_features" ADD CONSTRAINT "clat_pg_global_hero_slides_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_hero_slides" ADD CONSTRAINT "clat_pg_global_hero_slides_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clat_pg_global_hero_slides" ADD CONSTRAINT "clat_pg_global_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_lead_features" ADD CONSTRAINT "clat_pg_global_lead_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_trust_cards" ADD CONSTRAINT "clat_pg_global_trust_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_custom_courses_features" ADD CONSTRAINT "clat_pg_global_custom_courses_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global_custom_courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_custom_courses" ADD CONSTRAINT "clat_pg_global_custom_courses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clat_pg_global_custom_courses" ADD CONSTRAINT "clat_pg_global_custom_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_exam_tabs_bullets" ADD CONSTRAINT "clat_pg_global_exam_tabs_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_exam_tabs_details" ADD CONSTRAINT "clat_pg_global_exam_tabs_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global_exam_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_exam_tabs" ADD CONSTRAINT "clat_pg_global_exam_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_yt_videos" ADD CONSTRAINT "clat_pg_global_yt_videos_custom_thumbnail_id_media_id_fk" FOREIGN KEY ("custom_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clat_pg_global_yt_videos" ADD CONSTRAINT "clat_pg_global_yt_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_custom_faqs" ADD CONSTRAINT "clat_pg_global_custom_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clat_pg_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global" ADD CONSTRAINT "clat_pg_global_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clat_pg_global" ADD CONSTRAINT "clat_pg_global_demo_background_image_id_media_id_fk" FOREIGN KEY ("demo_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clat_pg_global" ADD CONSTRAINT "clat_pg_global_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clat_pg_global_rels" ADD CONSTRAINT "clat_pg_global_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."clat_pg_global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_rels" ADD CONSTRAINT "clat_pg_global_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clat_pg_global_rels" ADD CONSTRAINT "clat_pg_global_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_clat_pg_block_hero_slides_features_order_idx" ON "pages_blocks_clat_pg_block_hero_slides_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_hero_slides_features_parent_id_idx" ON "pages_blocks_clat_pg_block_hero_slides_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_hero_slides_order_idx" ON "pages_blocks_clat_pg_block_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_hero_slides_parent_id_idx" ON "pages_blocks_clat_pg_block_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_hero_slides_hero_image_idx" ON "pages_blocks_clat_pg_block_hero_slides" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_clat_pg_block_lead_features_order_idx" ON "pages_blocks_clat_pg_block_lead_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_lead_features_parent_id_idx" ON "pages_blocks_clat_pg_block_lead_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_trust_cards_order_idx" ON "pages_blocks_clat_pg_block_trust_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_trust_cards_parent_id_idx" ON "pages_blocks_clat_pg_block_trust_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_custom_courses_features_order_idx" ON "pages_blocks_clat_pg_block_custom_courses_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_custom_courses_features_parent_id_idx" ON "pages_blocks_clat_pg_block_custom_courses_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_custom_courses_order_idx" ON "pages_blocks_clat_pg_block_custom_courses" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_custom_courses_parent_id_idx" ON "pages_blocks_clat_pg_block_custom_courses" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_custom_courses_image_idx" ON "pages_blocks_clat_pg_block_custom_courses" USING btree ("image_id");
  CREATE INDEX "pages_blocks_clat_pg_block_exam_tabs_bullets_order_idx" ON "pages_blocks_clat_pg_block_exam_tabs_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_exam_tabs_bullets_parent_id_idx" ON "pages_blocks_clat_pg_block_exam_tabs_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_exam_tabs_details_order_idx" ON "pages_blocks_clat_pg_block_exam_tabs_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_exam_tabs_details_parent_id_idx" ON "pages_blocks_clat_pg_block_exam_tabs_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_exam_tabs_order_idx" ON "pages_blocks_clat_pg_block_exam_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_exam_tabs_parent_id_idx" ON "pages_blocks_clat_pg_block_exam_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_yt_videos_order_idx" ON "pages_blocks_clat_pg_block_yt_videos" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_yt_videos_parent_id_idx" ON "pages_blocks_clat_pg_block_yt_videos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_yt_videos_custom_thumbnail_idx" ON "pages_blocks_clat_pg_block_yt_videos" USING btree ("custom_thumbnail_id");
  CREATE INDEX "pages_blocks_clat_pg_block_custom_faqs_order_idx" ON "pages_blocks_clat_pg_block_custom_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_custom_faqs_parent_id_idx" ON "pages_blocks_clat_pg_block_custom_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_order_idx" ON "pages_blocks_clat_pg_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_clat_pg_block_parent_id_idx" ON "pages_blocks_clat_pg_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clat_pg_block_path_idx" ON "pages_blocks_clat_pg_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_clat_pg_block_form_idx" ON "pages_blocks_clat_pg_block" USING btree ("form_id");
  CREATE INDEX "pages_blocks_clat_pg_block_demo_background_image_idx" ON "pages_blocks_clat_pg_block" USING btree ("demo_background_image_id");
  CREATE INDEX "pages_blocks_clat_pg_block_og_image_idx" ON "pages_blocks_clat_pg_block" USING btree ("og_image_id");
  CREATE INDEX "sdata_overrides_faq_items_order_idx" ON "sdata_overrides_faq_items" USING btree ("_order");
  CREATE INDEX "sdata_overrides_faq_items_parent_id_idx" ON "sdata_overrides_faq_items" USING btree ("_parent_id");
  CREATE INDEX "sdata_overrides_breadcrumbs_order_idx" ON "sdata_overrides_breadcrumbs" USING btree ("_order");
  CREATE INDEX "sdata_overrides_breadcrumbs_parent_id_idx" ON "sdata_overrides_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "sdata_overrides_same_as_order_idx" ON "sdata_overrides_same_as" USING btree ("_order");
  CREATE INDEX "sdata_overrides_same_as_parent_id_idx" ON "sdata_overrides_same_as" USING btree ("_parent_id");
  CREATE INDEX "sdata_order_idx" ON "sdata" USING btree ("_order");
  CREATE INDEX "sdata_parent_id_idx" ON "sdata" USING btree ("_parent_id");
  CREATE INDEX "sdata_source_template_20_idx" ON "sdata" USING btree ("source_template_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_hero_slides_features_order_idx" ON "_pages_v_blocks_clat_pg_block_hero_slides_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_hero_slides_features_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_hero_slides_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_hero_slides_order_idx" ON "_pages_v_blocks_clat_pg_block_hero_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_hero_slides_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_hero_slides_hero_image_idx" ON "_pages_v_blocks_clat_pg_block_hero_slides" USING btree ("hero_image_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_lead_features_order_idx" ON "_pages_v_blocks_clat_pg_block_lead_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_lead_features_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_lead_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_trust_cards_order_idx" ON "_pages_v_blocks_clat_pg_block_trust_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_trust_cards_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_trust_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_custom_courses_features_order_idx" ON "_pages_v_blocks_clat_pg_block_custom_courses_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_custom_courses_features_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_custom_courses_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_custom_courses_order_idx" ON "_pages_v_blocks_clat_pg_block_custom_courses" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_custom_courses_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_custom_courses" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_custom_courses_image_idx" ON "_pages_v_blocks_clat_pg_block_custom_courses" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_exam_tabs_bullets_order_idx" ON "_pages_v_blocks_clat_pg_block_exam_tabs_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_exam_tabs_bullets_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_exam_tabs_bullets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_exam_tabs_details_order_idx" ON "_pages_v_blocks_clat_pg_block_exam_tabs_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_exam_tabs_details_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_exam_tabs_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_exam_tabs_order_idx" ON "_pages_v_blocks_clat_pg_block_exam_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_exam_tabs_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_exam_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_yt_videos_order_idx" ON "_pages_v_blocks_clat_pg_block_yt_videos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_yt_videos_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_yt_videos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_yt_videos_custom_thumbnail_idx" ON "_pages_v_blocks_clat_pg_block_yt_videos" USING btree ("custom_thumbnail_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_custom_faqs_order_idx" ON "_pages_v_blocks_clat_pg_block_custom_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_custom_faqs_parent_id_idx" ON "_pages_v_blocks_clat_pg_block_custom_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_order_idx" ON "_pages_v_blocks_clat_pg_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_parent_id_idx" ON "_pages_v_blocks_clat_pg_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_path_idx" ON "_pages_v_blocks_clat_pg_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_form_idx" ON "_pages_v_blocks_clat_pg_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_demo_background_image_idx" ON "_pages_v_blocks_clat_pg_block" USING btree ("demo_background_image_id");
  CREATE INDEX "_pages_v_blocks_clat_pg_block_og_image_idx" ON "_pages_v_blocks_clat_pg_block" USING btree ("og_image_id");
  CREATE INDEX "_sdata_v_overrides_faq_items_order_idx" ON "_sdata_v_overrides_faq_items" USING btree ("_order");
  CREATE INDEX "_sdata_v_overrides_faq_items_parent_id_idx" ON "_sdata_v_overrides_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_sdata_v_overrides_breadcrumbs_order_idx" ON "_sdata_v_overrides_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_sdata_v_overrides_breadcrumbs_parent_id_idx" ON "_sdata_v_overrides_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_sdata_v_overrides_same_as_order_idx" ON "_sdata_v_overrides_same_as" USING btree ("_order");
  CREATE INDEX "_sdata_v_overrides_same_as_parent_id_idx" ON "_sdata_v_overrides_same_as" USING btree ("_parent_id");
  CREATE INDEX "_sdata_v_order_idx" ON "_sdata_v" USING btree ("_order");
  CREATE INDEX "_sdata_v_parent_id_idx" ON "_sdata_v" USING btree ("_parent_id");
  CREATE INDEX "_sdata_v_source_template_1_idx" ON "_sdata_v" USING btree ("source_template_id");
  CREATE INDEX "media_display_size_order_idx" ON "media_display_size" USING btree ("order");
  CREATE INDEX "media_display_size_parent_idx" ON "media_display_size" USING btree ("parent_id");
  CREATE INDEX "users_module_permissions_module_order_idx" ON "users_module_permissions_module" USING btree ("order");
  CREATE INDEX "users_module_permissions_module_parent_idx" ON "users_module_permissions_module" USING btree ("parent_id");
  CREATE INDEX "users_module_permissions_order_idx" ON "users_module_permissions" USING btree ("_order");
  CREATE INDEX "users_module_permissions_parent_id_idx" ON "users_module_permissions" USING btree ("_parent_id");
  CREATE INDEX "courses_faqs_order_idx" ON "courses_faqs" USING btree ("_order");
  CREATE INDEX "courses_faqs_parent_id_idx" ON "courses_faqs" USING btree ("_parent_id");
  CREATE INDEX "courses_reviews_order_idx" ON "courses_reviews" USING btree ("_order");
  CREATE INDEX "courses_reviews_parent_id_idx" ON "courses_reviews" USING btree ("_parent_id");
  CREATE INDEX "resources_overview_what_you_will_learn_order_idx" ON "resources_overview_what_you_will_learn" USING btree ("_order");
  CREATE INDEX "resources_overview_what_you_will_learn_parent_id_idx" ON "resources_overview_what_you_will_learn" USING btree ("_parent_id");
  CREATE INDEX "resources_overview_key_topics_covered_topics_order_idx" ON "resources_overview_key_topics_covered_topics" USING btree ("_order");
  CREATE INDEX "resources_overview_key_topics_covered_topics_parent_id_idx" ON "resources_overview_key_topics_covered_topics" USING btree ("_parent_id");
  CREATE INDEX "resources_overview_key_topics_covered_order_idx" ON "resources_overview_key_topics_covered" USING btree ("_order");
  CREATE INDEX "resources_overview_key_topics_covered_parent_id_idx" ON "resources_overview_key_topics_covered" USING btree ("_parent_id");
  CREATE INDEX "resources_study_materials_order_idx" ON "resources_study_materials" USING btree ("_order");
  CREATE INDEX "resources_study_materials_parent_id_idx" ON "resources_study_materials" USING btree ("_parent_id");
  CREATE INDEX "resources_study_materials_file_idx" ON "resources_study_materials" USING btree ("file_id");
  CREATE INDEX "resources_testimonials_order_idx" ON "resources_testimonials" USING btree ("_order");
  CREATE INDEX "resources_testimonials_parent_id_idx" ON "resources_testimonials" USING btree ("_parent_id");
  CREATE INDEX "resources_testimonials_image_idx" ON "resources_testimonials" USING btree ("image_id");
  CREATE INDEX "resources_related_exams_order_idx" ON "resources_related_exams" USING btree ("_order");
  CREATE INDEX "resources_related_exams_parent_id_idx" ON "resources_related_exams" USING btree ("_parent_id");
  CREATE INDEX "resources_rels_order_idx" ON "resources_rels" USING btree ("order");
  CREATE INDEX "resources_rels_parent_idx" ON "resources_rels" USING btree ("parent_id");
  CREATE INDEX "resources_rels_path_idx" ON "resources_rels" USING btree ("path");
  CREATE INDEX "resources_rels_resources_id_idx" ON "resources_rels" USING btree ("resources_id");
  CREATE INDEX "syllabus_states_prelims_subjects_order_idx" ON "syllabus_states_prelims_subjects" USING btree ("_order");
  CREATE INDEX "syllabus_states_prelims_subjects_parent_id_idx" ON "syllabus_states_prelims_subjects" USING btree ("_parent_id");
  CREATE INDEX "syllabus_states_syllabus_topics_topics_order_idx" ON "syllabus_states_syllabus_topics_topics" USING btree ("_order");
  CREATE INDEX "syllabus_states_syllabus_topics_topics_parent_id_idx" ON "syllabus_states_syllabus_topics_topics" USING btree ("_parent_id");
  CREATE INDEX "syllabus_states_syllabus_topics_order_idx" ON "syllabus_states_syllabus_topics" USING btree ("_order");
  CREATE INDEX "syllabus_states_syllabus_topics_parent_id_idx" ON "syllabus_states_syllabus_topics" USING btree ("_parent_id");
  CREATE INDEX "syllabus_states_important_books_order_idx" ON "syllabus_states_important_books" USING btree ("_order");
  CREATE INDEX "syllabus_states_important_books_parent_id_idx" ON "syllabus_states_important_books" USING btree ("_parent_id");
  CREATE INDEX "syllabus_states_preparation_tips_order_idx" ON "syllabus_states_preparation_tips" USING btree ("_order");
  CREATE INDEX "syllabus_states_preparation_tips_parent_id_idx" ON "syllabus_states_preparation_tips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "syllabus_states_code_idx" ON "syllabus_states" USING btree ("code");
  CREATE INDEX "syllabus_states_image_idx" ON "syllabus_states" USING btree ("image_id");
  CREATE INDEX "syllabus_states_downloads_downloads_syllabus_file_idx" ON "syllabus_states" USING btree ("downloads_syllabus_file_id");
  CREATE INDEX "syllabus_states_downloads_downloads_pyq_file_idx" ON "syllabus_states" USING btree ("downloads_pyq_file_id");
  CREATE INDEX "syllabus_states_downloads_downloads_notification_file_idx" ON "syllabus_states" USING btree ("downloads_notification_file_id");
  CREATE INDEX "syllabus_states_syllabus_file_idx" ON "syllabus_states" USING btree ("syllabus_file_id");
  CREATE INDEX "syllabus_states_updated_at_idx" ON "syllabus_states" USING btree ("updated_at");
  CREATE INDEX "syllabus_states_created_at_idx" ON "syllabus_states" USING btree ("created_at");
  CREATE INDEX "events_tags_order_idx" ON "events_tags" USING btree ("_order");
  CREATE INDEX "events_tags_parent_id_idx" ON "events_tags" USING btree ("_parent_id");
  CREATE INDEX "events_agenda_order_idx" ON "events_agenda" USING btree ("_order");
  CREATE INDEX "events_agenda_parent_id_idx" ON "events_agenda" USING btree ("_parent_id");
  CREATE INDEX "events_benefits_order_idx" ON "events_benefits" USING btree ("_order");
  CREATE INDEX "events_benefits_parent_id_idx" ON "events_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_host_image_idx" ON "events" USING btree ("host_image_id");
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX "events_brochure_file_idx" ON "events" USING btree ("brochure_file_id");
  CREATE INDEX "events_meta_meta_image_idx" ON "events" USING btree ("meta_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "books_tags_order_idx" ON "books_tags" USING btree ("_order");
  CREATE INDEX "books_tags_parent_id_idx" ON "books_tags" USING btree ("_parent_id");
  CREATE INDEX "books_features_order_idx" ON "books_features" USING btree ("_order");
  CREATE INDEX "books_features_parent_id_idx" ON "books_features" USING btree ("_parent_id");
  CREATE INDEX "books_table_of_contents_topics_order_idx" ON "books_table_of_contents_topics" USING btree ("_order");
  CREATE INDEX "books_table_of_contents_topics_parent_id_idx" ON "books_table_of_contents_topics" USING btree ("_parent_id");
  CREATE INDEX "books_table_of_contents_order_idx" ON "books_table_of_contents" USING btree ("_order");
  CREATE INDEX "books_table_of_contents_parent_id_idx" ON "books_table_of_contents" USING btree ("_parent_id");
  CREATE INDEX "books_what_you_will_learn_order_idx" ON "books_what_you_will_learn" USING btree ("_order");
  CREATE INDEX "books_what_you_will_learn_parent_id_idx" ON "books_what_you_will_learn" USING btree ("_parent_id");
  CREATE INDEX "books_requirements_order_idx" ON "books_requirements" USING btree ("_order");
  CREATE INDEX "books_requirements_parent_id_idx" ON "books_requirements" USING btree ("_parent_id");
  CREATE INDEX "books_target_audience_order_idx" ON "books_target_audience" USING btree ("_order");
  CREATE INDEX "books_target_audience_parent_id_idx" ON "books_target_audience" USING btree ("_parent_id");
  CREATE INDEX "books_why_choose_this_book_order_idx" ON "books_why_choose_this_book" USING btree ("_order");
  CREATE INDEX "books_why_choose_this_book_parent_id_idx" ON "books_why_choose_this_book" USING btree ("_parent_id");
  CREATE INDEX "books_guarantees_order_idx" ON "books_guarantees" USING btree ("_order");
  CREATE INDEX "books_guarantees_parent_id_idx" ON "books_guarantees" USING btree ("_parent_id");
  CREATE INDEX "books_student_reviews_order_idx" ON "books_student_reviews" USING btree ("_order");
  CREATE INDEX "books_student_reviews_parent_id_idx" ON "books_student_reviews" USING btree ("_parent_id");
  CREATE INDEX "books_student_reviews_image_idx" ON "books_student_reviews" USING btree ("image_id");
  CREATE UNIQUE INDEX "books_slug_idx" ON "books" USING btree ("slug");
  CREATE INDEX "books_image_idx" ON "books" USING btree ("image_id");
  CREATE INDEX "books_author_image_idx" ON "books" USING btree ("author_image_id");
  CREATE INDEX "books_meta_meta_image_idx" ON "books" USING btree ("meta_image_id");
  CREATE INDEX "books_updated_at_idx" ON "books" USING btree ("updated_at");
  CREATE INDEX "books_created_at_idx" ON "books" USING btree ("created_at");
  CREATE INDEX "books_rels_order_idx" ON "books_rels" USING btree ("order");
  CREATE INDEX "books_rels_parent_idx" ON "books_rels" USING btree ("parent_id");
  CREATE INDEX "books_rels_path_idx" ON "books_rels" USING btree ("path");
  CREATE INDEX "books_rels_books_id_idx" ON "books_rels" USING btree ("books_id");
  CREATE INDEX "popups_image_idx" ON "popups" USING btree ("image_id");
  CREATE INDEX "popups_form_idx" ON "popups" USING btree ("form_id");
  CREATE INDEX "popups_updated_at_idx" ON "popups" USING btree ("updated_at");
  CREATE INDEX "popups_created_at_idx" ON "popups" USING btree ("created_at");
  CREATE INDEX "vacancies_breakdown_order_idx" ON "vacancies_breakdown" USING btree ("_order");
  CREATE INDEX "vacancies_breakdown_parent_id_idx" ON "vacancies_breakdown" USING btree ("_parent_id");
  CREATE INDEX "vacancies_important_dates_order_idx" ON "vacancies_important_dates" USING btree ("_order");
  CREATE INDEX "vacancies_important_dates_parent_id_idx" ON "vacancies_important_dates" USING btree ("_parent_id");
  CREATE INDEX "vacancies_application_fee_order_idx" ON "vacancies_application_fee" USING btree ("_order");
  CREATE INDEX "vacancies_application_fee_parent_id_idx" ON "vacancies_application_fee" USING btree ("_parent_id");
  CREATE INDEX "vacancies_qualifications_order_idx" ON "vacancies_qualifications" USING btree ("_order");
  CREATE INDEX "vacancies_qualifications_parent_id_idx" ON "vacancies_qualifications" USING btree ("_parent_id");
  CREATE INDEX "vacancies_benefits_order_idx" ON "vacancies_benefits" USING btree ("_order");
  CREATE INDEX "vacancies_benefits_parent_id_idx" ON "vacancies_benefits" USING btree ("_parent_id");
  CREATE INDEX "vacancies_selection_process_order_idx" ON "vacancies_selection_process" USING btree ("_order");
  CREATE INDEX "vacancies_selection_process_parent_id_idx" ON "vacancies_selection_process" USING btree ("_parent_id");
  CREATE INDEX "vacancies_how_to_apply_order_idx" ON "vacancies_how_to_apply" USING btree ("_order");
  CREATE INDEX "vacancies_how_to_apply_parent_id_idx" ON "vacancies_how_to_apply" USING btree ("_parent_id");
  CREATE INDEX "vacancies_required_documents_order_idx" ON "vacancies_required_documents" USING btree ("_order");
  CREATE INDEX "vacancies_required_documents_parent_id_idx" ON "vacancies_required_documents" USING btree ("_parent_id");
  CREATE INDEX "vacancies_important_instructions_order_idx" ON "vacancies_important_instructions" USING btree ("_order");
  CREATE INDEX "vacancies_important_instructions_parent_id_idx" ON "vacancies_important_instructions" USING btree ("_parent_id");
  CREATE INDEX "vacancies_additional_links_order_idx" ON "vacancies_additional_links" USING btree ("_order");
  CREATE INDEX "vacancies_additional_links_parent_id_idx" ON "vacancies_additional_links" USING btree ("_parent_id");
  CREATE INDEX "vacancies_state_idx" ON "vacancies" USING btree ("state_id");
  CREATE INDEX "vacancies_pdf_upload_idx" ON "vacancies" USING btree ("pdf_upload_id");
  CREATE INDEX "vacancies_meta_meta_image_idx" ON "vacancies" USING btree ("meta_image_id");
  CREATE INDEX "vacancies_updated_at_idx" ON "vacancies" USING btree ("updated_at");
  CREATE INDEX "vacancies_created_at_idx" ON "vacancies" USING btree ("created_at");
  CREATE INDEX "webhook_logs_updated_at_idx" ON "webhook_logs" USING btree ("updated_at");
  CREATE INDEX "webhook_logs_created_at_idx" ON "webhook_logs" USING btree ("created_at");
  CREATE INDEX "enrollments_event_type_idx" ON "enrollments" USING btree ("event_type");
  CREATE INDEX "enrollments_updated_at_idx" ON "enrollments" USING btree ("updated_at");
  CREATE INDEX "enrollments_created_at_idx" ON "enrollments" USING btree ("created_at");
  CREATE INDEX "notes_tags_order_idx" ON "notes_tags" USING btree ("_order");
  CREATE INDEX "notes_tags_parent_id_idx" ON "notes_tags" USING btree ("_parent_id");
  CREATE INDEX "notes_file_idx" ON "notes" USING btree ("file_id");
  CREATE INDEX "notes_meta_meta_image_idx" ON "notes" USING btree ("meta_image_id");
  CREATE INDEX "notes_updated_at_idx" ON "notes" USING btree ("updated_at");
  CREATE INDEX "notes_created_at_idx" ON "notes" USING btree ("created_at");
  CREATE INDEX "previous_year_questions_tags_order_idx" ON "previous_year_questions_tags" USING btree ("_order");
  CREATE INDEX "previous_year_questions_tags_parent_id_idx" ON "previous_year_questions_tags" USING btree ("_parent_id");
  CREATE INDEX "previous_year_questions_file_idx" ON "previous_year_questions" USING btree ("file_id");
  CREATE INDEX "previous_year_questions_meta_meta_image_idx" ON "previous_year_questions" USING btree ("meta_image_id");
  CREATE INDEX "previous_year_questions_updated_at_idx" ON "previous_year_questions" USING btree ("updated_at");
  CREATE INDEX "previous_year_questions_created_at_idx" ON "previous_year_questions" USING btree ("created_at");
  CREATE INDEX "mentorship_bookings_updated_at_idx" ON "mentorship_bookings" USING btree ("updated_at");
  CREATE INDEX "mentorship_bookings_created_at_idx" ON "mentorship_bookings" USING btree ("created_at");
  CREATE INDEX "schema_templates_applies_to_order_idx" ON "schema_templates_applies_to" USING btree ("order");
  CREATE INDEX "schema_templates_applies_to_parent_idx" ON "schema_templates_applies_to" USING btree ("parent_id");
  CREATE INDEX "schema_templates_template_config_faq_items_order_idx" ON "schema_templates_template_config_faq_items" USING btree ("_order");
  CREATE INDEX "schema_templates_template_config_faq_items_parent_id_idx" ON "schema_templates_template_config_faq_items" USING btree ("_parent_id");
  CREATE INDEX "schema_templates_template_config_breadcrumbs_order_idx" ON "schema_templates_template_config_breadcrumbs" USING btree ("_order");
  CREATE INDEX "schema_templates_template_config_breadcrumbs_parent_id_idx" ON "schema_templates_template_config_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "schema_templates_template_config_same_as_order_idx" ON "schema_templates_template_config_same_as" USING btree ("_order");
  CREATE INDEX "schema_templates_template_config_same_as_parent_id_idx" ON "schema_templates_template_config_same_as" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "schema_templates_key_idx" ON "schema_templates" USING btree ("key");
  CREATE INDEX "schema_templates_updated_at_idx" ON "schema_templates" USING btree ("updated_at");
  CREATE INDEX "schema_templates_created_at_idx" ON "schema_templates" USING btree ("created_at");
  CREATE INDEX "leads_name_idx" ON "leads" USING btree ("name");
  CREATE INDEX "leads_email_idx" ON "leads" USING btree ("email");
  CREATE INDEX "leads_phone_idx" ON "leads" USING btree ("phone");
  CREATE INDEX "leads_type_idx" ON "leads" USING btree ("type");
  CREATE INDEX "leads_source_idx" ON "leads" USING btree ("source");
  CREATE INDEX "leads_source_id_idx" ON "leads" USING btree ("source_id");
  CREATE INDEX "leads_event_type_idx" ON "leads" USING btree ("event_type");
  CREATE INDEX "leads_form_type_idx" ON "leads" USING btree ("form_type");
  CREATE INDEX "leads_form_idx" ON "leads" USING btree ("form_id");
  CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");
  CREATE INDEX "leads_lead_date_idx" ON "leads" USING btree ("lead_date");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "dynamic_pages_blocks_cta_links_order_idx" ON "dynamic_pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_cta_links_parent_id_idx" ON "dynamic_pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_cta_order_idx" ON "dynamic_pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_cta_parent_id_idx" ON "dynamic_pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_cta_path_idx" ON "dynamic_pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_content_columns_order_idx" ON "dynamic_pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_content_columns_parent_id_idx" ON "dynamic_pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_content_order_idx" ON "dynamic_pages_blocks_content" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_content_parent_id_idx" ON "dynamic_pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_content_path_idx" ON "dynamic_pages_blocks_content" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_media_block_order_idx" ON "dynamic_pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_media_block_parent_id_idx" ON "dynamic_pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_media_block_path_idx" ON "dynamic_pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_media_block_media_idx" ON "dynamic_pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "dynamic_pages_blocks_archive_order_idx" ON "dynamic_pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_archive_parent_id_idx" ON "dynamic_pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_archive_path_idx" ON "dynamic_pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_form_block_order_idx" ON "dynamic_pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_form_block_parent_id_idx" ON "dynamic_pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_form_block_path_idx" ON "dynamic_pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_form_block_form_idx" ON "dynamic_pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "dynamic_pages_blocks_faq_questions_order_idx" ON "dynamic_pages_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_faq_questions_parent_id_idx" ON "dynamic_pages_blocks_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_faq_order_idx" ON "dynamic_pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_faq_parent_id_idx" ON "dynamic_pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_faq_path_idx" ON "dynamic_pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_hero_slides_features_order_idx" ON "dynamic_pages_blocks_clat_pg_block_hero_slides_features" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_hero_slides_features_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_hero_slides_features" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_hero_slides_order_idx" ON "dynamic_pages_blocks_clat_pg_block_hero_slides" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_hero_slides_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_hero_slides_hero_imag_idx" ON "dynamic_pages_blocks_clat_pg_block_hero_slides" USING btree ("hero_image_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_lead_features_order_idx" ON "dynamic_pages_blocks_clat_pg_block_lead_features" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_lead_features_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_lead_features" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_trust_cards_order_idx" ON "dynamic_pages_blocks_clat_pg_block_trust_cards" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_trust_cards_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_trust_cards" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_custom_courses_features_order_idx" ON "dynamic_pages_blocks_clat_pg_block_custom_courses_features" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_custom_courses_features_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_custom_courses_features" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_custom_courses_order_idx" ON "dynamic_pages_blocks_clat_pg_block_custom_courses" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_custom_courses_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_custom_courses" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_custom_courses_image_idx" ON "dynamic_pages_blocks_clat_pg_block_custom_courses" USING btree ("image_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_exam_tabs_bullets_order_idx" ON "dynamic_pages_blocks_clat_pg_block_exam_tabs_bullets" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_exam_tabs_bullets_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_exam_tabs_bullets" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_exam_tabs_details_order_idx" ON "dynamic_pages_blocks_clat_pg_block_exam_tabs_details" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_exam_tabs_details_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_exam_tabs_details" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_exam_tabs_order_idx" ON "dynamic_pages_blocks_clat_pg_block_exam_tabs" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_exam_tabs_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_exam_tabs" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_yt_videos_order_idx" ON "dynamic_pages_blocks_clat_pg_block_yt_videos" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_yt_videos_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_yt_videos" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_yt_videos_custom_thum_idx" ON "dynamic_pages_blocks_clat_pg_block_yt_videos" USING btree ("custom_thumbnail_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_custom_faqs_order_idx" ON "dynamic_pages_blocks_clat_pg_block_custom_faqs" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_custom_faqs_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block_custom_faqs" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_order_idx" ON "dynamic_pages_blocks_clat_pg_block" USING btree ("_order");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_parent_id_idx" ON "dynamic_pages_blocks_clat_pg_block" USING btree ("_parent_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_path_idx" ON "dynamic_pages_blocks_clat_pg_block" USING btree ("_path");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_form_idx" ON "dynamic_pages_blocks_clat_pg_block" USING btree ("form_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_demo_background_image_idx" ON "dynamic_pages_blocks_clat_pg_block" USING btree ("demo_background_image_id");
  CREATE INDEX "dynamic_pages_blocks_clat_pg_block_og_image_idx" ON "dynamic_pages_blocks_clat_pg_block" USING btree ("og_image_id");
  CREATE UNIQUE INDEX "dynamic_pages_slug_idx" ON "dynamic_pages" USING btree ("slug");
  CREATE INDEX "dynamic_pages_page_image_idx" ON "dynamic_pages" USING btree ("page_image_id");
  CREATE INDEX "dynamic_pages_page_bg_image_idx" ON "dynamic_pages" USING btree ("page_bg_image_id");
  CREATE INDEX "dynamic_pages_updated_at_idx" ON "dynamic_pages" USING btree ("updated_at");
  CREATE INDEX "dynamic_pages_created_at_idx" ON "dynamic_pages" USING btree ("created_at");
  CREATE INDEX "dynamic_pages__status_idx" ON "dynamic_pages" USING btree ("_status");
  CREATE INDEX "dynamic_pages_rels_order_idx" ON "dynamic_pages_rels" USING btree ("order");
  CREATE INDEX "dynamic_pages_rels_parent_idx" ON "dynamic_pages_rels" USING btree ("parent_id");
  CREATE INDEX "dynamic_pages_rels_path_idx" ON "dynamic_pages_rels" USING btree ("path");
  CREATE INDEX "dynamic_pages_rels_pages_id_idx" ON "dynamic_pages_rels" USING btree ("pages_id");
  CREATE INDEX "dynamic_pages_rels_posts_id_idx" ON "dynamic_pages_rels" USING btree ("posts_id");
  CREATE INDEX "dynamic_pages_rels_categories_id_idx" ON "dynamic_pages_rels" USING btree ("categories_id");
  CREATE INDEX "dynamic_pages_rels_courses_id_idx" ON "dynamic_pages_rels" USING btree ("courses_id");
  CREATE INDEX "dynamic_pages_rels_faqs_id_idx" ON "dynamic_pages_rels" USING btree ("faqs_id");
  CREATE INDEX "_dynamic_pages_v_blocks_cta_links_order_idx" ON "_dynamic_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_cta_links_parent_id_idx" ON "_dynamic_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_cta_order_idx" ON "_dynamic_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_cta_parent_id_idx" ON "_dynamic_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_cta_path_idx" ON "_dynamic_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_content_columns_order_idx" ON "_dynamic_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_content_columns_parent_id_idx" ON "_dynamic_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_content_order_idx" ON "_dynamic_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_content_parent_id_idx" ON "_dynamic_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_content_path_idx" ON "_dynamic_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_media_block_order_idx" ON "_dynamic_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_media_block_parent_id_idx" ON "_dynamic_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_media_block_path_idx" ON "_dynamic_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_media_block_media_idx" ON "_dynamic_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_dynamic_pages_v_blocks_archive_order_idx" ON "_dynamic_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_archive_parent_id_idx" ON "_dynamic_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_archive_path_idx" ON "_dynamic_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_form_block_order_idx" ON "_dynamic_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_form_block_parent_id_idx" ON "_dynamic_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_form_block_path_idx" ON "_dynamic_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_form_block_form_idx" ON "_dynamic_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_dynamic_pages_v_blocks_faq_questions_order_idx" ON "_dynamic_pages_v_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_faq_questions_parent_id_idx" ON "_dynamic_pages_v_blocks_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_faq_order_idx" ON "_dynamic_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_faq_parent_id_idx" ON "_dynamic_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_faq_path_idx" ON "_dynamic_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_features_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_features" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_features_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_features" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_hero_slides" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_hero_i_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_hero_slides" USING btree ("hero_image_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_lead_features_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_lead_features" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_lead_features_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_lead_features" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_trust_cards_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_trust_cards" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_trust_cards_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_trust_cards" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_features_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_features" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_features_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_features" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_custom_courses" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_custom_courses" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_ima_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_custom_courses" USING btree ("image_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_bullets_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_bullets" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_bullets_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_bullets" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_details_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_details" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_details_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_details" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_yt_videos_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_yt_videos" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_yt_videos_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_yt_videos" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_yt_videos_custom_t_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_yt_videos" USING btree ("custom_thumbnail_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_custom_faqs_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_custom_faqs" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_custom_faqs_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block_custom_faqs" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_order_idx" ON "_dynamic_pages_v_blocks_clat_pg_block" USING btree ("_order");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_parent_id_idx" ON "_dynamic_pages_v_blocks_clat_pg_block" USING btree ("_parent_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_path_idx" ON "_dynamic_pages_v_blocks_clat_pg_block" USING btree ("_path");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_form_idx" ON "_dynamic_pages_v_blocks_clat_pg_block" USING btree ("form_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_demo_background_im_idx" ON "_dynamic_pages_v_blocks_clat_pg_block" USING btree ("demo_background_image_id");
  CREATE INDEX "_dynamic_pages_v_blocks_clat_pg_block_og_image_idx" ON "_dynamic_pages_v_blocks_clat_pg_block" USING btree ("og_image_id");
  CREATE INDEX "_dynamic_pages_v_parent_idx" ON "_dynamic_pages_v" USING btree ("parent_id");
  CREATE INDEX "_dynamic_pages_v_version_version_slug_idx" ON "_dynamic_pages_v" USING btree ("version_slug");
  CREATE INDEX "_dynamic_pages_v_version_version_page_image_idx" ON "_dynamic_pages_v" USING btree ("version_page_image_id");
  CREATE INDEX "_dynamic_pages_v_version_version_page_bg_image_idx" ON "_dynamic_pages_v" USING btree ("version_page_bg_image_id");
  CREATE INDEX "_dynamic_pages_v_version_version_updated_at_idx" ON "_dynamic_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_dynamic_pages_v_version_version_created_at_idx" ON "_dynamic_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_dynamic_pages_v_version_version__status_idx" ON "_dynamic_pages_v" USING btree ("version__status");
  CREATE INDEX "_dynamic_pages_v_created_at_idx" ON "_dynamic_pages_v" USING btree ("created_at");
  CREATE INDEX "_dynamic_pages_v_updated_at_idx" ON "_dynamic_pages_v" USING btree ("updated_at");
  CREATE INDEX "_dynamic_pages_v_latest_idx" ON "_dynamic_pages_v" USING btree ("latest");
  CREATE INDEX "_dynamic_pages_v_autosave_idx" ON "_dynamic_pages_v" USING btree ("autosave");
  CREATE INDEX "_dynamic_pages_v_rels_order_idx" ON "_dynamic_pages_v_rels" USING btree ("order");
  CREATE INDEX "_dynamic_pages_v_rels_parent_idx" ON "_dynamic_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_dynamic_pages_v_rels_path_idx" ON "_dynamic_pages_v_rels" USING btree ("path");
  CREATE INDEX "_dynamic_pages_v_rels_pages_id_idx" ON "_dynamic_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_dynamic_pages_v_rels_posts_id_idx" ON "_dynamic_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_dynamic_pages_v_rels_categories_id_idx" ON "_dynamic_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "_dynamic_pages_v_rels_courses_id_idx" ON "_dynamic_pages_v_rels" USING btree ("courses_id");
  CREATE INDEX "_dynamic_pages_v_rels_faqs_id_idx" ON "_dynamic_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "header_contact_info_social_links_order_idx" ON "header_contact_info_social_links" USING btree ("_order");
  CREATE INDEX "header_contact_info_social_links_parent_id_idx" ON "header_contact_info_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_courses_order_idx" ON "footer_courses" USING btree ("_order");
  CREATE INDEX "footer_courses_parent_id_idx" ON "footer_courses" USING btree ("_parent_id");
  CREATE INDEX "footer_free_resources_order_idx" ON "footer_free_resources" USING btree ("_order");
  CREATE INDEX "footer_free_resources_parent_id_idx" ON "footer_free_resources" USING btree ("_parent_id");
  CREATE INDEX "footer_company_links_order_idx" ON "footer_company_links" USING btree ("_order");
  CREATE INDEX "footer_company_links_parent_id_idx" ON "footer_company_links" USING btree ("_parent_id");
  CREATE INDEX "home_experience_highlights_order_idx" ON "home_experience_highlights" USING btree ("_order");
  CREATE INDEX "home_experience_highlights_parent_id_idx" ON "home_experience_highlights" USING btree ("_parent_id");
  CREATE INDEX "home_lead_features_order_idx" ON "home_lead_features" USING btree ("_order");
  CREATE INDEX "home_lead_features_parent_id_idx" ON "home_lead_features" USING btree ("_parent_id");
  CREATE INDEX "home_trust_indicators_order_idx" ON "home_trust_indicators" USING btree ("_order");
  CREATE INDEX "home_trust_indicators_parent_id_idx" ON "home_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "home_resources_features_order_idx" ON "home_resources_features" USING btree ("_order");
  CREATE INDEX "home_resources_features_parent_id_idx" ON "home_resources_features" USING btree ("_parent_id");
  CREATE INDEX "free_study_featured_states_order_idx" ON "free_study_featured_states" USING btree ("_order");
  CREATE INDEX "free_study_featured_states_parent_id_idx" ON "free_study_featured_states" USING btree ("_parent_id");
  CREATE INDEX "free_study_featured_states_image_idx" ON "free_study_featured_states" USING btree ("image_id");
  CREATE INDEX "free_study_other_states_order_idx" ON "free_study_other_states" USING btree ("_order");
  CREATE INDEX "free_study_other_states_parent_id_idx" ON "free_study_other_states" USING btree ("_parent_id");
  CREATE INDEX "free_study_features_order_idx" ON "free_study_features" USING btree ("_order");
  CREATE INDEX "free_study_features_parent_id_idx" ON "free_study_features" USING btree ("_parent_id");
  CREATE INDEX "syllabus_vacancy_global_stats_order_idx" ON "syllabus_vacancy_global_stats" USING btree ("_order");
  CREATE INDEX "syllabus_vacancy_global_stats_parent_id_idx" ON "syllabus_vacancy_global_stats" USING btree ("_parent_id");
  CREATE INDEX "syllabus_vacancy_global_common_subjects_list_order_idx" ON "syllabus_vacancy_global_common_subjects_list" USING btree ("_order");
  CREATE INDEX "syllabus_vacancy_global_common_subjects_list_parent_id_idx" ON "syllabus_vacancy_global_common_subjects_list" USING btree ("_parent_id");
  CREATE INDEX "syllabus_vacancy_global_prelims_list_order_idx" ON "syllabus_vacancy_global_prelims_list" USING btree ("_order");
  CREATE INDEX "syllabus_vacancy_global_prelims_list_parent_id_idx" ON "syllabus_vacancy_global_prelims_list" USING btree ("_parent_id");
  CREATE INDEX "syllabus_vacancy_global_mains_list_order_idx" ON "syllabus_vacancy_global_mains_list" USING btree ("_order");
  CREATE INDEX "syllabus_vacancy_global_mains_list_parent_id_idx" ON "syllabus_vacancy_global_mains_list" USING btree ("_parent_id");
  CREATE INDEX "syllabus_vacancy_global_meta_meta_image_idx" ON "syllabus_vacancy_global" USING btree ("meta_image_id");
  CREATE INDEX "blog_meta_meta_image_idx" ON "blog" USING btree ("meta_image_id");
  CREATE INDEX "events_page_faqs_order_idx" ON "events_page_faqs" USING btree ("_order");
  CREATE INDEX "events_page_faqs_parent_id_idx" ON "events_page_faqs" USING btree ("_parent_id");
  CREATE INDEX "events_page_brochure_brochure_file_idx" ON "events_page" USING btree ("brochure_file_id");
  CREATE INDEX "events_page_meta_meta_image_idx" ON "events_page" USING btree ("meta_image_id");
  CREATE INDEX "books_page_stats_order_idx" ON "books_page_stats" USING btree ("_order");
  CREATE INDEX "books_page_stats_parent_id_idx" ON "books_page_stats" USING btree ("_parent_id");
  CREATE INDEX "books_page_app_section_features_order_idx" ON "books_page_app_section_features" USING btree ("_order");
  CREATE INDEX "books_page_app_section_features_parent_id_idx" ON "books_page_app_section_features" USING btree ("_parent_id");
  CREATE INDEX "books_page_meta_meta_image_idx" ON "books_page" USING btree ("meta_image_id");
  CREATE INDEX "about_us_story_stats_order_idx" ON "about_us_story_stats" USING btree ("_order");
  CREATE INDEX "about_us_story_stats_parent_id_idx" ON "about_us_story_stats" USING btree ("_parent_id");
  CREATE INDEX "about_us_mission_points_order_idx" ON "about_us_mission_points" USING btree ("_order");
  CREATE INDEX "about_us_mission_points_parent_id_idx" ON "about_us_mission_points" USING btree ("_parent_id");
  CREATE INDEX "about_us_vision_points_order_idx" ON "about_us_vision_points" USING btree ("_order");
  CREATE INDEX "about_us_vision_points_parent_id_idx" ON "about_us_vision_points" USING btree ("_parent_id");
  CREATE INDEX "about_us_values_list_order_idx" ON "about_us_values_list" USING btree ("_order");
  CREATE INDEX "about_us_values_list_parent_id_idx" ON "about_us_values_list" USING btree ("_parent_id");
  CREATE INDEX "about_us_features_list_order_idx" ON "about_us_features_list" USING btree ("_order");
  CREATE INDEX "about_us_features_list_parent_id_idx" ON "about_us_features_list" USING btree ("_parent_id");
  CREATE INDEX "about_us_legacy_stats_order_idx" ON "about_us_legacy_stats" USING btree ("_order");
  CREATE INDEX "about_us_legacy_stats_parent_id_idx" ON "about_us_legacy_stats" USING btree ("_parent_id");
  CREATE INDEX "about_us_director_image_idx" ON "about_us" USING btree ("director_image_id");
  CREATE INDEX "about_us_meta_meta_image_idx" ON "about_us" USING btree ("meta_image_id");
  CREATE INDEX "contact_page_contact_form_idx" ON "contact_page" USING btree ("contact_form_id");
  CREATE INDEX "contact_page_meta_meta_image_idx" ON "contact_page" USING btree ("meta_image_id");
  CREATE INDEX "contact_page_rels_order_idx" ON "contact_page_rels" USING btree ("order");
  CREATE INDEX "contact_page_rels_parent_idx" ON "contact_page_rels" USING btree ("parent_id");
  CREATE INDEX "contact_page_rels_path_idx" ON "contact_page_rels" USING btree ("path");
  CREATE INDEX "contact_page_rels_faqs_id_idx" ON "contact_page_rels" USING btree ("faqs_id");
  CREATE INDEX "notes_page_hero_stats_order_idx" ON "notes_page_hero_stats" USING btree ("_order");
  CREATE INDEX "notes_page_hero_stats_parent_id_idx" ON "notes_page_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "notes_page_gating_popup_idx" ON "notes_page" USING btree ("gating_popup_id");
  CREATE INDEX "notes_page_meta_meta_image_idx" ON "notes_page" USING btree ("meta_image_id");
  CREATE INDEX "previous_year_questions_page_hero_stats_order_idx" ON "previous_year_questions_page_hero_stats" USING btree ("_order");
  CREATE INDEX "previous_year_questions_page_hero_stats_parent_id_idx" ON "previous_year_questions_page_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "previous_year_questions_page_gating_popup_idx" ON "previous_year_questions_page" USING btree ("gating_popup_id");
  CREATE INDEX "previous_year_questions_page_meta_meta_image_idx" ON "previous_year_questions_page" USING btree ("meta_image_id");
  CREATE INDEX "clat_pg_global_hero_slides_features_order_idx" ON "clat_pg_global_hero_slides_features" USING btree ("_order");
  CREATE INDEX "clat_pg_global_hero_slides_features_parent_id_idx" ON "clat_pg_global_hero_slides_features" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_hero_slides_order_idx" ON "clat_pg_global_hero_slides" USING btree ("_order");
  CREATE INDEX "clat_pg_global_hero_slides_parent_id_idx" ON "clat_pg_global_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_hero_slides_hero_image_idx" ON "clat_pg_global_hero_slides" USING btree ("hero_image_id");
  CREATE INDEX "clat_pg_global_lead_features_order_idx" ON "clat_pg_global_lead_features" USING btree ("_order");
  CREATE INDEX "clat_pg_global_lead_features_parent_id_idx" ON "clat_pg_global_lead_features" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_trust_cards_order_idx" ON "clat_pg_global_trust_cards" USING btree ("_order");
  CREATE INDEX "clat_pg_global_trust_cards_parent_id_idx" ON "clat_pg_global_trust_cards" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_custom_courses_features_order_idx" ON "clat_pg_global_custom_courses_features" USING btree ("_order");
  CREATE INDEX "clat_pg_global_custom_courses_features_parent_id_idx" ON "clat_pg_global_custom_courses_features" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_custom_courses_order_idx" ON "clat_pg_global_custom_courses" USING btree ("_order");
  CREATE INDEX "clat_pg_global_custom_courses_parent_id_idx" ON "clat_pg_global_custom_courses" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_custom_courses_image_idx" ON "clat_pg_global_custom_courses" USING btree ("image_id");
  CREATE INDEX "clat_pg_global_exam_tabs_bullets_order_idx" ON "clat_pg_global_exam_tabs_bullets" USING btree ("_order");
  CREATE INDEX "clat_pg_global_exam_tabs_bullets_parent_id_idx" ON "clat_pg_global_exam_tabs_bullets" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_exam_tabs_details_order_idx" ON "clat_pg_global_exam_tabs_details" USING btree ("_order");
  CREATE INDEX "clat_pg_global_exam_tabs_details_parent_id_idx" ON "clat_pg_global_exam_tabs_details" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_exam_tabs_order_idx" ON "clat_pg_global_exam_tabs" USING btree ("_order");
  CREATE INDEX "clat_pg_global_exam_tabs_parent_id_idx" ON "clat_pg_global_exam_tabs" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_yt_videos_order_idx" ON "clat_pg_global_yt_videos" USING btree ("_order");
  CREATE INDEX "clat_pg_global_yt_videos_parent_id_idx" ON "clat_pg_global_yt_videos" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_yt_videos_custom_thumbnail_idx" ON "clat_pg_global_yt_videos" USING btree ("custom_thumbnail_id");
  CREATE INDEX "clat_pg_global_custom_faqs_order_idx" ON "clat_pg_global_custom_faqs" USING btree ("_order");
  CREATE INDEX "clat_pg_global_custom_faqs_parent_id_idx" ON "clat_pg_global_custom_faqs" USING btree ("_parent_id");
  CREATE INDEX "clat_pg_global_form_idx" ON "clat_pg_global" USING btree ("form_id");
  CREATE INDEX "clat_pg_global_demo_background_image_idx" ON "clat_pg_global" USING btree ("demo_background_image_id");
  CREATE INDEX "clat_pg_global_og_image_idx" ON "clat_pg_global" USING btree ("og_image_id");
  CREATE INDEX "clat_pg_global_rels_order_idx" ON "clat_pg_global_rels" USING btree ("order");
  CREATE INDEX "clat_pg_global_rels_parent_idx" ON "clat_pg_global_rels" USING btree ("parent_id");
  CREATE INDEX "clat_pg_global_rels_path_idx" ON "clat_pg_global_rels" USING btree ("path");
  CREATE INDEX "clat_pg_global_rels_courses_id_idx" ON "clat_pg_global_rels" USING btree ("courses_id");
  CREATE INDEX "clat_pg_global_rels_faqs_id_idx" ON "clat_pg_global_rels" USING btree ("faqs_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_instructor_photo_id_media_id_fk" FOREIGN KEY ("instructor_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_syllabus_states_fk" FOREIGN KEY ("syllabus_states_id") REFERENCES "public"."syllabus_states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_books_fk" FOREIGN KEY ("books_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_popups_fk" FOREIGN KEY ("popups_id") REFERENCES "public"."popups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacancies_fk" FOREIGN KEY ("vacancies_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_webhook_logs_fk" FOREIGN KEY ("webhook_logs_id") REFERENCES "public"."webhook_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enrollments_fk" FOREIGN KEY ("enrollments_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_previous_year_questions_fk" FOREIGN KEY ("previous_year_questions_id") REFERENCES "public"."previous_year_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mentorship_bookings_fk" FOREIGN KEY ("mentorship_bookings_id") REFERENCES "public"."mentorship_bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_schema_templates_fk" FOREIGN KEY ("schema_templates_id") REFERENCES "public"."schema_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dynamic_pages_fk" FOREIGN KEY ("dynamic_pages_id") REFERENCES "public"."dynamic_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_conversions_brochure_id_media_id_fk" FOREIGN KEY ("conversions_brochure_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_founder_image_id_media_id_fk" FOREIGN KEY ("founder_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_vacancies_fk" FOREIGN KEY ("vacancies_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "course" ADD CONSTRAINT "course_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_rels" ADD CONSTRAINT "course_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_page" ADD CONSTRAINT "success_stories_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "free_study" ADD CONSTRAINT "free_study_pan_india_background_id_media_id_fk" FOREIGN KEY ("pan_india_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "free_study" ADD CONSTRAINT "free_study_gating_popup_id_popups_id_fk" FOREIGN KEY ("gating_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "free_study" ADD CONSTRAINT "free_study_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_rels_courses_id_idx" ON "pages_rels" USING btree ("courses_id");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_rels_courses_id_idx" ON "_pages_v_rels" USING btree ("courses_id");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "courses_classplus_id_idx" ON "courses" USING btree ("classplus_id");
  CREATE INDEX "courses_meta_meta_image_idx" ON "courses" USING btree ("meta_image_id");
  CREATE INDEX "success_stories_meta_meta_image_idx" ON "success_stories" USING btree ("meta_image_id");
  CREATE INDEX "resources_instructor_instructor_photo_idx" ON "resources" USING btree ("instructor_photo_id");
  CREATE INDEX "payload_locked_documents_rels_syllabus_states_id_idx" ON "payload_locked_documents_rels" USING btree ("syllabus_states_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_books_id_idx" ON "payload_locked_documents_rels" USING btree ("books_id");
  CREATE INDEX "payload_locked_documents_rels_popups_id_idx" ON "payload_locked_documents_rels" USING btree ("popups_id");
  CREATE INDEX "payload_locked_documents_rels_vacancies_id_idx" ON "payload_locked_documents_rels" USING btree ("vacancies_id");
  CREATE INDEX "payload_locked_documents_rels_webhook_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("webhook_logs_id");
  CREATE INDEX "payload_locked_documents_rels_enrollments_id_idx" ON "payload_locked_documents_rels" USING btree ("enrollments_id");
  CREATE INDEX "payload_locked_documents_rels_notes_id_idx" ON "payload_locked_documents_rels" USING btree ("notes_id");
  CREATE INDEX "payload_locked_documents_rels_previous_year_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("previous_year_questions_id");
  CREATE INDEX "payload_locked_documents_rels_mentorship_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("mentorship_bookings_id");
  CREATE INDEX "payload_locked_documents_rels_schema_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("schema_templates_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_dynamic_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("dynamic_pages_id");
  CREATE INDEX "branding_conversions_conversions_brochure_idx" ON "branding" USING btree ("conversions_brochure_id");
  CREATE INDEX "home_founder_image_idx" ON "home" USING btree ("founder_image_id");
  CREATE INDEX "home_meta_meta_image_idx" ON "home" USING btree ("meta_image_id");
  CREATE INDEX "home_rels_vacancies_id_idx" ON "home_rels" USING btree ("vacancies_id");
  CREATE INDEX "home_rels_events_id_idx" ON "home_rels" USING btree ("events_id");
  CREATE INDEX "home_rels_media_id_idx" ON "home_rels" USING btree ("media_id");
  CREATE INDEX "course_meta_meta_image_idx" ON "course" USING btree ("meta_image_id");
  CREATE INDEX "course_rels_success_stories_id_idx" ON "course_rels" USING btree ("success_stories_id");
  CREATE INDEX "success_stories_page_meta_meta_image_idx" ON "success_stories_page" USING btree ("meta_image_id");
  CREATE INDEX "free_study_pan_india_background_idx" ON "free_study" USING btree ("pan_india_background_id");
  CREATE INDEX "free_study_gating_popup_idx" ON "free_study" USING btree ("gating_popup_id");
  CREATE INDEX "free_study_meta_meta_image_idx" ON "free_study" USING btree ("meta_image_id");
  ALTER TABLE "_pages_v" DROP COLUMN "autosave";
  ALTER TABLE "_posts_v" DROP COLUMN "autosave";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_footer_popular_courses_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_footer_popular_courses_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
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
  
  ALTER TABLE "pages_blocks_clat_pg_block_hero_slides_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_lead_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_trust_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_custom_courses_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_custom_courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_exam_tabs_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_exam_tabs_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_exam_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_yt_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block_custom_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clat_pg_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sdata_overrides_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sdata_overrides_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sdata_overrides_same_as" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sdata" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_hero_slides_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_lead_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_trust_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_custom_courses_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_custom_courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_exam_tabs_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_exam_tabs_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_exam_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_yt_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block_custom_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clat_pg_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sdata_v_overrides_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sdata_v_overrides_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sdata_v_overrides_same_as" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sdata_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_display_size" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_module_permissions_module" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_module_permissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources_overview_what_you_will_learn" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources_overview_key_topics_covered_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources_overview_key_topics_covered" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources_study_materials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources_related_exams" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_states_prelims_subjects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_states_syllabus_topics_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_states_syllabus_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_states_important_books" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_states_preparation_tips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_states" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_agenda" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_table_of_contents_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_table_of_contents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_what_you_will_learn" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_target_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_why_choose_this_book" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_guarantees" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_student_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "popups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_breakdown" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_important_dates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_application_fee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_qualifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_selection_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_how_to_apply" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_required_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_important_instructions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies_additional_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vacancies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "webhook_logs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "enrollments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notes_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "previous_year_questions_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "previous_year_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mentorship_bookings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schema_templates_applies_to" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schema_templates_template_config_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schema_templates_template_config_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schema_templates_template_config_same_as" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schema_templates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "leads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_hero_slides_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_lead_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_trust_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_custom_courses_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_custom_courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_yt_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block_custom_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_blocks_clat_pg_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dynamic_pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_lead_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_trust_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_yt_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_blocks_clat_pg_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dynamic_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_contact_info_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_free_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_company_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_experience_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_lead_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_trust_indicators" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_resources_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "free_study_featured_states" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "free_study_other_states" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "free_study_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_vacancy_global_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_vacancy_global_common_subjects_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_vacancy_global_prelims_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_vacancy_global_mains_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "syllabus_vacancy_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_page_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_page_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_page_app_section_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_us_story_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_us_mission_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_us_vision_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_us_values_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_us_features_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_us_legacy_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notes_page_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notes_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "previous_year_questions_page_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "previous_year_questions_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_hero_slides_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_lead_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_trust_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_custom_courses_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_custom_courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_exam_tabs_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_exam_tabs_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_exam_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_yt_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_custom_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clat_pg_global_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_clat_pg_block_hero_slides_features" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_hero_slides" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_lead_features" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_trust_cards" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_custom_courses_features" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_custom_courses" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_exam_tabs_bullets" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_exam_tabs_details" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_exam_tabs" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_yt_videos" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block_custom_faqs" CASCADE;
  DROP TABLE "pages_blocks_clat_pg_block" CASCADE;
  DROP TABLE "sdata_overrides_faq_items" CASCADE;
  DROP TABLE "sdata_overrides_breadcrumbs" CASCADE;
  DROP TABLE "sdata_overrides_same_as" CASCADE;
  DROP TABLE "sdata" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_hero_slides_features" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_hero_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_lead_features" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_trust_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_custom_courses_features" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_custom_courses" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_exam_tabs_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_exam_tabs_details" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_exam_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_yt_videos" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block_custom_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_clat_pg_block" CASCADE;
  DROP TABLE "_sdata_v_overrides_faq_items" CASCADE;
  DROP TABLE "_sdata_v_overrides_breadcrumbs" CASCADE;
  DROP TABLE "_sdata_v_overrides_same_as" CASCADE;
  DROP TABLE "_sdata_v" CASCADE;
  DROP TABLE "media_display_size" CASCADE;
  DROP TABLE "users_module_permissions_module" CASCADE;
  DROP TABLE "users_module_permissions" CASCADE;
  DROP TABLE "courses_faqs" CASCADE;
  DROP TABLE "courses_reviews" CASCADE;
  DROP TABLE "resources_overview_what_you_will_learn" CASCADE;
  DROP TABLE "resources_overview_key_topics_covered_topics" CASCADE;
  DROP TABLE "resources_overview_key_topics_covered" CASCADE;
  DROP TABLE "resources_study_materials" CASCADE;
  DROP TABLE "resources_testimonials" CASCADE;
  DROP TABLE "resources_related_exams" CASCADE;
  DROP TABLE "resources_rels" CASCADE;
  DROP TABLE "syllabus_states_prelims_subjects" CASCADE;
  DROP TABLE "syllabus_states_syllabus_topics_topics" CASCADE;
  DROP TABLE "syllabus_states_syllabus_topics" CASCADE;
  DROP TABLE "syllabus_states_important_books" CASCADE;
  DROP TABLE "syllabus_states_preparation_tips" CASCADE;
  DROP TABLE "syllabus_states" CASCADE;
  DROP TABLE "events_tags" CASCADE;
  DROP TABLE "events_agenda" CASCADE;
  DROP TABLE "events_benefits" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "books_tags" CASCADE;
  DROP TABLE "books_features" CASCADE;
  DROP TABLE "books_table_of_contents_topics" CASCADE;
  DROP TABLE "books_table_of_contents" CASCADE;
  DROP TABLE "books_what_you_will_learn" CASCADE;
  DROP TABLE "books_requirements" CASCADE;
  DROP TABLE "books_target_audience" CASCADE;
  DROP TABLE "books_why_choose_this_book" CASCADE;
  DROP TABLE "books_guarantees" CASCADE;
  DROP TABLE "books_student_reviews" CASCADE;
  DROP TABLE "books" CASCADE;
  DROP TABLE "books_rels" CASCADE;
  DROP TABLE "popups" CASCADE;
  DROP TABLE "vacancies_breakdown" CASCADE;
  DROP TABLE "vacancies_important_dates" CASCADE;
  DROP TABLE "vacancies_application_fee" CASCADE;
  DROP TABLE "vacancies_qualifications" CASCADE;
  DROP TABLE "vacancies_benefits" CASCADE;
  DROP TABLE "vacancies_selection_process" CASCADE;
  DROP TABLE "vacancies_how_to_apply" CASCADE;
  DROP TABLE "vacancies_required_documents" CASCADE;
  DROP TABLE "vacancies_important_instructions" CASCADE;
  DROP TABLE "vacancies_additional_links" CASCADE;
  DROP TABLE "vacancies" CASCADE;
  DROP TABLE "webhook_logs" CASCADE;
  DROP TABLE "enrollments" CASCADE;
  DROP TABLE "notes_tags" CASCADE;
  DROP TABLE "notes" CASCADE;
  DROP TABLE "previous_year_questions_tags" CASCADE;
  DROP TABLE "previous_year_questions" CASCADE;
  DROP TABLE "mentorship_bookings" CASCADE;
  DROP TABLE "schema_templates_applies_to" CASCADE;
  DROP TABLE "schema_templates_template_config_faq_items" CASCADE;
  DROP TABLE "schema_templates_template_config_breadcrumbs" CASCADE;
  DROP TABLE "schema_templates_template_config_same_as" CASCADE;
  DROP TABLE "schema_templates" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "dynamic_pages_blocks_cta_links" CASCADE;
  DROP TABLE "dynamic_pages_blocks_cta" CASCADE;
  DROP TABLE "dynamic_pages_blocks_content_columns" CASCADE;
  DROP TABLE "dynamic_pages_blocks_content" CASCADE;
  DROP TABLE "dynamic_pages_blocks_media_block" CASCADE;
  DROP TABLE "dynamic_pages_blocks_archive" CASCADE;
  DROP TABLE "dynamic_pages_blocks_form_block" CASCADE;
  DROP TABLE "dynamic_pages_blocks_faq_questions" CASCADE;
  DROP TABLE "dynamic_pages_blocks_faq" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_hero_slides_features" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_hero_slides" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_lead_features" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_trust_cards" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_custom_courses_features" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_custom_courses" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs_bullets" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs_details" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_exam_tabs" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_yt_videos" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block_custom_faqs" CASCADE;
  DROP TABLE "dynamic_pages_blocks_clat_pg_block" CASCADE;
  DROP TABLE "dynamic_pages" CASCADE;
  DROP TABLE "dynamic_pages_rels" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_content" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_faq_questions" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_hero_slides_features" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_hero_slides" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_lead_features" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_trust_cards" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_courses_features" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_courses" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_bullets" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs_details" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_exam_tabs" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_yt_videos" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block_custom_faqs" CASCADE;
  DROP TABLE "_dynamic_pages_v_blocks_clat_pg_block" CASCADE;
  DROP TABLE "_dynamic_pages_v" CASCADE;
  DROP TABLE "_dynamic_pages_v_rels" CASCADE;
  DROP TABLE "header_contact_info_social_links" CASCADE;
  DROP TABLE "footer_courses" CASCADE;
  DROP TABLE "footer_free_resources" CASCADE;
  DROP TABLE "footer_company_links" CASCADE;
  DROP TABLE "home_experience_highlights" CASCADE;
  DROP TABLE "home_lead_features" CASCADE;
  DROP TABLE "home_trust_indicators" CASCADE;
  DROP TABLE "home_resources_features" CASCADE;
  DROP TABLE "free_study_featured_states" CASCADE;
  DROP TABLE "free_study_other_states" CASCADE;
  DROP TABLE "free_study_features" CASCADE;
  DROP TABLE "syllabus_vacancy_global_stats" CASCADE;
  DROP TABLE "syllabus_vacancy_global_common_subjects_list" CASCADE;
  DROP TABLE "syllabus_vacancy_global_prelims_list" CASCADE;
  DROP TABLE "syllabus_vacancy_global_mains_list" CASCADE;
  DROP TABLE "syllabus_vacancy_global" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "events_page_faqs" CASCADE;
  DROP TABLE "events_page" CASCADE;
  DROP TABLE "books_page_stats" CASCADE;
  DROP TABLE "books_page_app_section_features" CASCADE;
  DROP TABLE "books_page" CASCADE;
  DROP TABLE "about_us_story_stats" CASCADE;
  DROP TABLE "about_us_mission_points" CASCADE;
  DROP TABLE "about_us_vision_points" CASCADE;
  DROP TABLE "about_us_values_list" CASCADE;
  DROP TABLE "about_us_features_list" CASCADE;
  DROP TABLE "about_us_legacy_stats" CASCADE;
  DROP TABLE "about_us" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_rels" CASCADE;
  DROP TABLE "notes_page_hero_stats" CASCADE;
  DROP TABLE "notes_page" CASCADE;
  DROP TABLE "previous_year_questions_page_hero_stats" CASCADE;
  DROP TABLE "previous_year_questions_page" CASCADE;
  DROP TABLE "clat_pg_global_hero_slides_features" CASCADE;
  DROP TABLE "clat_pg_global_hero_slides" CASCADE;
  DROP TABLE "clat_pg_global_lead_features" CASCADE;
  DROP TABLE "clat_pg_global_trust_cards" CASCADE;
  DROP TABLE "clat_pg_global_custom_courses_features" CASCADE;
  DROP TABLE "clat_pg_global_custom_courses" CASCADE;
  DROP TABLE "clat_pg_global_exam_tabs_bullets" CASCADE;
  DROP TABLE "clat_pg_global_exam_tabs_details" CASCADE;
  DROP TABLE "clat_pg_global_exam_tabs" CASCADE;
  DROP TABLE "clat_pg_global_yt_videos" CASCADE;
  DROP TABLE "clat_pg_global_custom_faqs" CASCADE;
  DROP TABLE "clat_pg_global" CASCADE;
  DROP TABLE "clat_pg_global_rels" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_courses_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_faqs_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_courses_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_faqs_fk";
  
  ALTER TABLE "courses" DROP CONSTRAINT "courses_meta_image_id_media_id_fk";
  
  ALTER TABLE "success_stories" DROP CONSTRAINT "success_stories_meta_image_id_media_id_fk";
  
  ALTER TABLE "resources" DROP CONSTRAINT "resources_instructor_photo_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_syllabus_states_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_books_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_popups_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_vacancies_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_webhook_logs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_enrollments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_notes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_previous_year_questions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mentorship_bookings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_schema_templates_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_leads_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_dynamic_pages_fk";
  
  ALTER TABLE "branding" DROP CONSTRAINT "branding_conversions_brochure_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_founder_image_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_meta_image_id_media_id_fk";
  
  ALTER TABLE "home_rels" DROP CONSTRAINT "home_rels_vacancies_fk";
  
  ALTER TABLE "home_rels" DROP CONSTRAINT "home_rels_events_fk";
  
  ALTER TABLE "home_rels" DROP CONSTRAINT "home_rels_media_fk";
  
  ALTER TABLE "course" DROP CONSTRAINT "course_meta_image_id_media_id_fk";
  
  ALTER TABLE "course_rels" DROP CONSTRAINT "course_rels_success_stories_fk";
  
  ALTER TABLE "success_stories_page" DROP CONSTRAINT "success_stories_page_meta_image_id_media_id_fk";
  
  ALTER TABLE "free_study" DROP CONSTRAINT "free_study_pan_india_background_id_media_id_fk";
  
  ALTER TABLE "free_study" DROP CONSTRAINT "free_study_gating_popup_id_popups_id_fk";
  
  ALTER TABLE "free_study" DROP CONSTRAINT "free_study_meta_image_id_media_id_fk";
  
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "courses" ALTER COLUMN "category" SET DATA TYPE text;
  ALTER TABLE "courses" ALTER COLUMN "category" SET DEFAULT 'live'::text;
  DROP TYPE "public"."enum_courses_category";
  CREATE TYPE "public"."enum_courses_category" AS ENUM('live', 'recorded', 'test-series', 'other');
  ALTER TABLE "courses" ALTER COLUMN "category" SET DEFAULT 'live'::"public"."enum_courses_category";
  ALTER TABLE "courses" ALTER COLUMN "category" SET DATA TYPE "public"."enum_courses_category" USING "category"::"public"."enum_courses_category";
  DROP INDEX "pages_rels_courses_id_idx";
  DROP INDEX "pages_rels_faqs_id_idx";
  DROP INDEX "_pages_v_rels_courses_id_idx";
  DROP INDEX "_pages_v_rels_faqs_id_idx";
  DROP INDEX "courses_classplus_id_idx";
  DROP INDEX "courses_meta_meta_image_idx";
  DROP INDEX "success_stories_meta_meta_image_idx";
  DROP INDEX "resources_instructor_instructor_photo_idx";
  DROP INDEX "payload_locked_documents_rels_syllabus_states_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_books_id_idx";
  DROP INDEX "payload_locked_documents_rels_popups_id_idx";
  DROP INDEX "payload_locked_documents_rels_vacancies_id_idx";
  DROP INDEX "payload_locked_documents_rels_webhook_logs_id_idx";
  DROP INDEX "payload_locked_documents_rels_enrollments_id_idx";
  DROP INDEX "payload_locked_documents_rels_notes_id_idx";
  DROP INDEX "payload_locked_documents_rels_previous_year_questions_id_idx";
  DROP INDEX "payload_locked_documents_rels_mentorship_bookings_id_idx";
  DROP INDEX "payload_locked_documents_rels_schema_templates_id_idx";
  DROP INDEX "payload_locked_documents_rels_leads_id_idx";
  DROP INDEX "payload_locked_documents_rels_dynamic_pages_id_idx";
  DROP INDEX "branding_conversions_conversions_brochure_idx";
  DROP INDEX "home_founder_image_idx";
  DROP INDEX "home_meta_meta_image_idx";
  DROP INDEX "home_rels_vacancies_id_idx";
  DROP INDEX "home_rels_events_id_idx";
  DROP INDEX "home_rels_media_id_idx";
  DROP INDEX "course_meta_meta_image_idx";
  DROP INDEX "course_rels_success_stories_id_idx";
  DROP INDEX "success_stories_page_meta_meta_image_idx";
  DROP INDEX "free_study_pan_india_background_idx";
  DROP INDEX "free_study_gating_popup_idx";
  DROP INDEX "free_study_meta_meta_image_idx";
  ALTER TABLE "header_blocks_link" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "header_blocks_dropdown_items" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "header_blocks_mega_menu_columns_links" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "header_actions_actions" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "footer_bottom_nav_links" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "popular_courses_title" SET DEFAULT 'Popular Courses';
  ALTER TABLE "home" ALTER COLUMN "popular_courses_subtitle" SET DEFAULT 'Choose Your Path to Success';
  ALTER TABLE "home" ALTER COLUMN "popular_courses_view_all_link_label" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "success_stories_view_all_link_label" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "resources_title" DROP DEFAULT;
  ALTER TABLE "home" ALTER COLUMN "resources_subtitle" DROP DEFAULT;
  ALTER TABLE "home" ALTER COLUMN "resources_description" DROP DEFAULT;
  ALTER TABLE "home" ALTER COLUMN "resources_view_all_link_label" SET NOT NULL;
  ALTER TABLE "course" ALTER COLUMN "app_link" SET DEFAULT 'https://rzp.io/rzp/aashayein';
  ALTER TABLE "success_stories_page" ALTER COLUMN "cta_enroll_button_link" SET DEFAULT 'https://rzp.io/rzp/aashayein';
  ALTER TABLE "_pages_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_popular_courses" ADD CONSTRAINT "footer_popular_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_popular_courses_order_idx" ON "footer_popular_courses" USING btree ("_order");
  CREATE INDEX "footer_popular_courses_parent_id_idx" ON "footer_popular_courses" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "media_display_preset";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "media_display_custom_width";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "media_display_custom_height";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "media_display_fit";
  ALTER TABLE "pages" DROP COLUMN "hero_badge_text";
  ALTER TABLE "pages" DROP COLUMN "meta_canonical_u_r_l";
  ALTER TABLE "pages" DROP COLUMN "meta_index_directive";
  ALTER TABLE "pages" DROP COLUMN "meta_follow_directive";
  ALTER TABLE "pages_rels" DROP COLUMN "courses_id";
  ALTER TABLE "pages_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "media_display_preset";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "media_display_custom_width";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "media_display_custom_height";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "media_display_fit";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_badge_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_canonical_u_r_l";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_index_directive";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_follow_directive";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "courses_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "posts" DROP COLUMN "excerpt";
  ALTER TABLE "posts" DROP COLUMN "featured";
  ALTER TABLE "posts" DROP COLUMN "hero_image_display_preset";
  ALTER TABLE "posts" DROP COLUMN "hero_image_display_custom_width";
  ALTER TABLE "posts" DROP COLUMN "hero_image_display_custom_height";
  ALTER TABLE "posts" DROP COLUMN "hero_image_display_fit";
  ALTER TABLE "posts" DROP COLUMN "meta_canonical_u_r_l";
  ALTER TABLE "posts" DROP COLUMN "meta_index_directive";
  ALTER TABLE "posts" DROP COLUMN "meta_follow_directive";
  ALTER TABLE "_posts_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN "version_featured";
  ALTER TABLE "_posts_v" DROP COLUMN "version_hero_image_display_preset";
  ALTER TABLE "_posts_v" DROP COLUMN "version_hero_image_display_custom_width";
  ALTER TABLE "_posts_v" DROP COLUMN "version_hero_image_display_custom_height";
  ALTER TABLE "_posts_v" DROP COLUMN "version_hero_image_display_fit";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_canonical_u_r_l";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_index_directive";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_follow_directive";
  ALTER TABLE "categories" DROP COLUMN "group";
  ALTER TABLE "users" DROP COLUMN "super_admin";
  ALTER TABLE "courses_demo_videos" DROP COLUMN "thumbnail_display_preset";
  ALTER TABLE "courses_demo_videos" DROP COLUMN "thumbnail_display_custom_width";
  ALTER TABLE "courses_demo_videos" DROP COLUMN "thumbnail_display_custom_height";
  ALTER TABLE "courses_demo_videos" DROP COLUMN "thumbnail_display_fit";
  ALTER TABLE "courses" DROP COLUMN "classplus_id";
  ALTER TABLE "courses" DROP COLUMN "show_generated_content";
  ALTER TABLE "courses" DROP COLUMN "course_mode";
  ALTER TABLE "courses" DROP COLUMN "thumbnail_display_preset";
  ALTER TABLE "courses" DROP COLUMN "thumbnail_display_custom_width";
  ALTER TABLE "courses" DROP COLUMN "thumbnail_display_custom_height";
  ALTER TABLE "courses" DROP COLUMN "thumbnail_display_fit";
  ALTER TABLE "courses" DROP COLUMN "instructor_image_display_preset";
  ALTER TABLE "courses" DROP COLUMN "instructor_image_display_custom_width";
  ALTER TABLE "courses" DROP COLUMN "instructor_image_display_custom_height";
  ALTER TABLE "courses" DROP COLUMN "instructor_image_display_fit";
  ALTER TABLE "courses" DROP COLUMN "contact_info_phone";
  ALTER TABLE "courses" DROP COLUMN "contact_info_whatsapp";
  ALTER TABLE "courses" DROP COLUMN "meta_title";
  ALTER TABLE "courses" DROP COLUMN "meta_description";
  ALTER TABLE "courses" DROP COLUMN "meta_image_id";
  ALTER TABLE "courses" DROP COLUMN "meta_canonical_u_r_l";
  ALTER TABLE "courses" DROP COLUMN "meta_index_directive";
  ALTER TABLE "courses" DROP COLUMN "meta_follow_directive";
  ALTER TABLE "success_stories" DROP COLUMN "image_display_preset";
  ALTER TABLE "success_stories" DROP COLUMN "image_display_custom_width";
  ALTER TABLE "success_stories" DROP COLUMN "image_display_custom_height";
  ALTER TABLE "success_stories" DROP COLUMN "image_display_fit";
  ALTER TABLE "success_stories" DROP COLUMN "meta_title";
  ALTER TABLE "success_stories" DROP COLUMN "meta_description";
  ALTER TABLE "success_stories" DROP COLUMN "meta_image_id";
  ALTER TABLE "success_stories" DROP COLUMN "meta_canonical_u_r_l";
  ALTER TABLE "success_stories" DROP COLUMN "meta_index_directive";
  ALTER TABLE "success_stories" DROP COLUMN "meta_follow_directive";
  ALTER TABLE "resources" DROP COLUMN "resource_type";
  ALTER TABLE "resources" DROP COLUMN "download_link";
  ALTER TABLE "resources" DROP COLUMN "difficulty";
  ALTER TABLE "resources" DROP COLUMN "language";
  ALTER TABLE "resources" DROP COLUMN "thumbnail_display_preset";
  ALTER TABLE "resources" DROP COLUMN "thumbnail_display_custom_width";
  ALTER TABLE "resources" DROP COLUMN "thumbnail_display_custom_height";
  ALTER TABLE "resources" DROP COLUMN "thumbnail_display_fit";
  ALTER TABLE "resources" DROP COLUMN "instructor_name";
  ALTER TABLE "resources" DROP COLUMN "instructor_title";
  ALTER TABLE "resources" DROP COLUMN "instructor_bio";
  ALTER TABLE "resources" DROP COLUMN "instructor_photo_id";
  ALTER TABLE "resources" DROP COLUMN "instructor_photo_display_preset";
  ALTER TABLE "resources" DROP COLUMN "instructor_photo_display_custom_width";
  ALTER TABLE "resources" DROP COLUMN "instructor_photo_display_custom_height";
  ALTER TABLE "resources" DROP COLUMN "instructor_photo_display_fit";
  ALTER TABLE "resources" DROP COLUMN "instructor_external_photo_url";
  ALTER TABLE "resources" DROP COLUMN "overview_introduction";
  ALTER TABLE "resources" DROP COLUMN "contact_info_phone";
  ALTER TABLE "resources" DROP COLUMN "contact_info_whatsapp";
  ALTER TABLE "resources" DROP COLUMN "cta_title";
  ALTER TABLE "resources" DROP COLUMN "cta_description";
  ALTER TABLE "resources" DROP COLUMN "cta_button_text";
  ALTER TABLE "resources" DROP COLUMN "cta_button_link";
  ALTER TABLE "resources" DROP COLUMN "stats_total_views";
  ALTER TABLE "resources" DROP COLUMN "stats_students_enrolled";
  ALTER TABLE "resources" DROP COLUMN "stats_average_rating";
  ALTER TABLE "resources" DROP COLUMN "stats_downloads";
  ALTER TABLE "forms_blocks_captcha" DROP COLUMN "captcha_type";
  ALTER TABLE "forms" DROP COLUMN "enable_c_r_m";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "syllabus_states_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "books_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "popups_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "vacancies_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "webhook_logs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "enrollments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "notes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "previous_year_questions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mentorship_bookings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "schema_templates_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "leads_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "dynamic_pages_id";
  ALTER TABLE "header" DROP COLUMN "contact_info_phone";
  ALTER TABLE "header" DROP COLUMN "contact_info_whatsapp";
  ALTER TABLE "header" DROP COLUMN "contact_info_address";
  ALTER TABLE "footer" DROP COLUMN "app_links_android";
  ALTER TABLE "footer" DROP COLUMN "app_links_ios";
  ALTER TABLE "branding" DROP COLUMN "search_console_google_site_verification";
  ALTER TABLE "branding" DROP COLUMN "search_console_dns_txt_record";
  ALTER TABLE "branding" DROP COLUMN "analytics_ga4_measurement_id";
  ALTER TABLE "branding" DROP COLUMN "analytics_google_tag_manager_id";
  ALTER TABLE "branding" DROP COLUMN "analytics_conversion_head_script";
  ALTER TABLE "branding" DROP COLUMN "analytics_conversion_body_script";
  ALTER TABLE "branding" DROP COLUMN "enroll_button_label";
  ALTER TABLE "branding" DROP COLUMN "enroll_button_link";
  ALTER TABLE "branding" DROP COLUMN "contact_info_phone";
  ALTER TABLE "branding" DROP COLUMN "contact_info_whatsapp";
  ALTER TABLE "branding" DROP COLUMN "sticky_c_t_a_is_active";
  ALTER TABLE "branding" DROP COLUMN "sticky_c_t_a_label";
  ALTER TABLE "branding" DROP COLUMN "sticky_c_t_a_link";
  ALTER TABLE "branding" DROP COLUMN "conversions_show_floating_buttons";
  ALTER TABLE "branding" DROP COLUMN "conversions_show_whatsapp";
  ALTER TABLE "branding" DROP COLUMN "conversions_show_call";
  ALTER TABLE "branding" DROP COLUMN "conversions_whatsapp_number";
  ALTER TABLE "branding" DROP COLUMN "conversions_call_number";
  ALTER TABLE "branding" DROP COLUMN "conversions_brochure_id";
  ALTER TABLE "branding" DROP COLUMN "captcha_captcha_type";
  ALTER TABLE "home_slides" DROP COLUMN "image_display_preset";
  ALTER TABLE "home_slides" DROP COLUMN "image_display_custom_width";
  ALTER TABLE "home_slides" DROP COLUMN "image_display_custom_height";
  ALTER TABLE "home_slides" DROP COLUMN "image_display_fit";
  ALTER TABLE "home_slides" DROP COLUMN "secondary_link_type";
  ALTER TABLE "home_slides" DROP COLUMN "secondary_link_new_tab";
  ALTER TABLE "home_slides" DROP COLUMN "secondary_link_url";
  ALTER TABLE "home_slides" DROP COLUMN "secondary_link_appearance";
  ALTER TABLE "home" DROP COLUMN "founder_section_title";
  ALTER TABLE "home" DROP COLUMN "founder_section_subtitle";
  ALTER TABLE "home" DROP COLUMN "founder_image_id";
  ALTER TABLE "home" DROP COLUMN "founder_image_display_preset";
  ALTER TABLE "home" DROP COLUMN "founder_image_display_custom_width";
  ALTER TABLE "home" DROP COLUMN "founder_image_display_custom_height";
  ALTER TABLE "home" DROP COLUMN "founder_image_display_fit";
  ALTER TABLE "home" DROP COLUMN "founder_name";
  ALTER TABLE "home" DROP COLUMN "founder_role";
  ALTER TABLE "home" DROP COLUMN "founder_intro";
  ALTER TABLE "home" DROP COLUMN "founder_c_t_a_label";
  ALTER TABLE "home" DROP COLUMN "founder_c_t_a_link";
  ALTER TABLE "home" DROP COLUMN "updates_title";
  ALTER TABLE "home" DROP COLUMN "updates_subtitle";
  ALTER TABLE "home" DROP COLUMN "updates_description";
  ALTER TABLE "home" DROP COLUMN "mentee_count_text";
  ALTER TABLE "home" DROP COLUMN "results_title";
  ALTER TABLE "home" DROP COLUMN "results_subtitle";
  ALTER TABLE "home" DROP COLUMN "results_description";
  ALTER TABLE "home" DROP COLUMN "results_fetch_type";
  ALTER TABLE "home" DROP COLUMN "results_limit";
  ALTER TABLE "home" DROP COLUMN "app_image_display_preset";
  ALTER TABLE "home" DROP COLUMN "app_image_display_custom_width";
  ALTER TABLE "home" DROP COLUMN "app_image_display_custom_height";
  ALTER TABLE "home" DROP COLUMN "app_image_display_fit";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_title";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_description";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_primary_c_t_a_type";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_primary_c_t_a_new_tab";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_primary_c_t_a_url";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_primary_c_t_a_label";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_primary_c_t_a_appearance";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_secondary_c_t_a_type";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_secondary_c_t_a_new_tab";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_secondary_c_t_a_url";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_secondary_c_t_a_label";
  ALTER TABLE "home" DROP COLUMN "final_c_t_a_secondary_c_t_a_appearance";
  ALTER TABLE "home" DROP COLUMN "events_title";
  ALTER TABLE "home" DROP COLUMN "events_subtitle";
  ALTER TABLE "home" DROP COLUMN "events_description";
  ALTER TABLE "home" DROP COLUMN "events_fetch_type";
  ALTER TABLE "home" DROP COLUMN "events_limit";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_title";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_subtitle";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_description";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_fetch_type";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_limit";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_view_all_link_type";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_view_all_link_new_tab";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_view_all_link_url";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_view_all_link_label";
  ALTER TABLE "home" DROP COLUMN "blog_judgments_view_all_link_appearance";
  ALTER TABLE "home" DROP COLUMN "testimonials_title";
  ALTER TABLE "home" DROP COLUMN "testimonials_subtitle";
  ALTER TABLE "home" DROP COLUMN "testimonials_description";
  ALTER TABLE "home" DROP COLUMN "testimonials_fetch_type";
  ALTER TABLE "home" DROP COLUMN "testimonials_limit";
  ALTER TABLE "home" DROP COLUMN "testimonials_view_all_link_type";
  ALTER TABLE "home" DROP COLUMN "testimonials_view_all_link_new_tab";
  ALTER TABLE "home" DROP COLUMN "testimonials_view_all_link_url";
  ALTER TABLE "home" DROP COLUMN "testimonials_view_all_link_label";
  ALTER TABLE "home" DROP COLUMN "testimonials_view_all_link_appearance";
  ALTER TABLE "home" DROP COLUMN "visibility_hero";
  ALTER TABLE "home" DROP COLUMN "visibility_trust_indicators";
  ALTER TABLE "home" DROP COLUMN "visibility_achievers";
  ALTER TABLE "home" DROP COLUMN "visibility_lead_capture";
  ALTER TABLE "home" DROP COLUMN "visibility_founder";
  ALTER TABLE "home" DROP COLUMN "visibility_why_choose_us";
  ALTER TABLE "home" DROP COLUMN "visibility_courses";
  ALTER TABLE "home" DROP COLUMN "visibility_resources";
  ALTER TABLE "home" DROP COLUMN "visibility_notifications";
  ALTER TABLE "home" DROP COLUMN "visibility_events";
  ALTER TABLE "home" DROP COLUMN "visibility_testimonials";
  ALTER TABLE "home" DROP COLUMN "visibility_blog";
  ALTER TABLE "home" DROP COLUMN "visibility_faq";
  ALTER TABLE "home" DROP COLUMN "visibility_final_c_t_a";
  ALTER TABLE "home" DROP COLUMN "meta_title";
  ALTER TABLE "home" DROP COLUMN "meta_description";
  ALTER TABLE "home" DROP COLUMN "meta_image_id";
  ALTER TABLE "home" DROP COLUMN "meta_canonical_u_r_l";
  ALTER TABLE "home" DROP COLUMN "meta_index_directive";
  ALTER TABLE "home" DROP COLUMN "meta_follow_directive";
  ALTER TABLE "home_rels" DROP COLUMN "vacancies_id";
  ALTER TABLE "home_rels" DROP COLUMN "events_id";
  ALTER TABLE "home_rels" DROP COLUMN "media_id";
  ALTER TABLE "course" DROP COLUMN "community_image_display_preset";
  ALTER TABLE "course" DROP COLUMN "community_image_display_custom_width";
  ALTER TABLE "course" DROP COLUMN "community_image_display_custom_height";
  ALTER TABLE "course" DROP COLUMN "community_image_display_fit";
  ALTER TABLE "course" DROP COLUMN "meta_title";
  ALTER TABLE "course" DROP COLUMN "meta_description";
  ALTER TABLE "course" DROP COLUMN "meta_image_id";
  ALTER TABLE "course" DROP COLUMN "meta_canonical_u_r_l";
  ALTER TABLE "course" DROP COLUMN "meta_index_directive";
  ALTER TABLE "course" DROP COLUMN "meta_follow_directive";
  ALTER TABLE "course_rels" DROP COLUMN "success_stories_id";
  ALTER TABLE "success_stories_page" DROP COLUMN "judiciary_section_title";
  ALTER TABLE "success_stories_page" DROP COLUMN "judiciary_section_description";
  ALTER TABLE "success_stories_page" DROP COLUMN "adpo_section_title";
  ALTER TABLE "success_stories_page" DROP COLUMN "adpo_section_description";
  ALTER TABLE "success_stories_page" DROP COLUMN "mains_section_title";
  ALTER TABLE "success_stories_page" DROP COLUMN "mains_section_description";
  ALTER TABLE "success_stories_page" DROP COLUMN "test_series_section_title";
  ALTER TABLE "success_stories_page" DROP COLUMN "test_series_section_description";
  ALTER TABLE "success_stories_page" DROP COLUMN "interview_section_title";
  ALTER TABLE "success_stories_page" DROP COLUMN "interview_section_description";
  ALTER TABLE "success_stories_page" DROP COLUMN "counselling_image_display_preset";
  ALTER TABLE "success_stories_page" DROP COLUMN "counselling_image_display_custom_width";
  ALTER TABLE "success_stories_page" DROP COLUMN "counselling_image_display_custom_height";
  ALTER TABLE "success_stories_page" DROP COLUMN "counselling_image_display_fit";
  ALTER TABLE "success_stories_page" DROP COLUMN "visibility_judiciary";
  ALTER TABLE "success_stories_page" DROP COLUMN "visibility_adpo";
  ALTER TABLE "success_stories_page" DROP COLUMN "visibility_mains";
  ALTER TABLE "success_stories_page" DROP COLUMN "visibility_test_series";
  ALTER TABLE "success_stories_page" DROP COLUMN "visibility_interview";
  ALTER TABLE "success_stories_page" DROP COLUMN "visibility_counselling";
  ALTER TABLE "success_stories_page" DROP COLUMN "visibility_brochure";
  ALTER TABLE "success_stories_page" DROP COLUMN "visibility_final_c_t_a";
  ALTER TABLE "success_stories_page" DROP COLUMN "meta_title";
  ALTER TABLE "success_stories_page" DROP COLUMN "meta_description";
  ALTER TABLE "success_stories_page" DROP COLUMN "meta_image_id";
  ALTER TABLE "success_stories_page" DROP COLUMN "meta_canonical_u_r_l";
  ALTER TABLE "success_stories_page" DROP COLUMN "meta_index_directive";
  ALTER TABLE "success_stories_page" DROP COLUMN "meta_follow_directive";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_title";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_subtitle";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_description";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_background_id";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_background_display_preset";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_background_display_custom_width";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_background_display_custom_height";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_background_display_fit";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_stats_states_count";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_stats_videos_count";
  ALTER TABLE "free_study" DROP COLUMN "pan_india_stats_views_count";
  ALTER TABLE "free_study" DROP COLUMN "enable_gating";
  ALTER TABLE "free_study" DROP COLUMN "gating_popup_id";
  ALTER TABLE "free_study" DROP COLUMN "meta_title";
  ALTER TABLE "free_study" DROP COLUMN "meta_description";
  ALTER TABLE "free_study" DROP COLUMN "meta_image_id";
  ALTER TABLE "free_study" DROP COLUMN "meta_canonical_u_r_l";
  ALTER TABLE "free_study" DROP COLUMN "meta_index_directive";
  ALTER TABLE "free_study" DROP COLUMN "meta_follow_directive";
  DROP TYPE "public"."enum_pages_blocks_media_block_media_display_preset";
  DROP TYPE "public"."enum_pages_blocks_media_block_media_display_fit";
  DROP TYPE "public"."enum_pages_blocks_clat_pg_block_trust_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_clat_pg_block_exam_tabs_icon";
  DROP TYPE "public"."mode";
  DROP TYPE "public"."stype";
  DROP TYPE "public"."faq_src";
  DROP TYPE "public"."bc_src";
  DROP TYPE "public"."enum_pages_meta_index_directive";
  DROP TYPE "public"."enum_pages_meta_follow_directive";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_media_display_preset";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_media_display_fit";
  DROP TYPE "public"."enum__pages_v_blocks_clat_pg_block_trust_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_clat_pg_block_exam_tabs_icon";
  DROP TYPE "public"."enum__pages_v_version_meta_index_directive";
  DROP TYPE "public"."enum__pages_v_version_meta_follow_directive";
  DROP TYPE "public"."enum_posts_hero_image_display_preset";
  DROP TYPE "public"."enum_posts_hero_image_display_fit";
  DROP TYPE "public"."enum_posts_meta_index_directive";
  DROP TYPE "public"."enum_posts_meta_follow_directive";
  DROP TYPE "public"."enum__posts_v_version_hero_image_display_preset";
  DROP TYPE "public"."enum__posts_v_version_hero_image_display_fit";
  DROP TYPE "public"."enum__posts_v_version_meta_index_directive";
  DROP TYPE "public"."enum__posts_v_version_meta_follow_directive";
  DROP TYPE "public"."enum_media_display_size";
  DROP TYPE "public"."enum_categories_group";
  DROP TYPE "public"."enum_users_module_permissions_module";
  DROP TYPE "public"."enum_courses_demo_videos_thumbnail_display_preset";
  DROP TYPE "public"."enum_courses_demo_videos_thumbnail_display_fit";
  DROP TYPE "public"."enum_courses_course_mode";
  DROP TYPE "public"."enum_courses_thumbnail_display_preset";
  DROP TYPE "public"."enum_courses_thumbnail_display_fit";
  DROP TYPE "public"."enum_courses_instructor_image_display_preset";
  DROP TYPE "public"."enum_courses_instructor_image_display_fit";
  DROP TYPE "public"."enum_courses_meta_index_directive";
  DROP TYPE "public"."enum_courses_meta_follow_directive";
  DROP TYPE "public"."enum_success_stories_image_display_preset";
  DROP TYPE "public"."enum_success_stories_image_display_fit";
  DROP TYPE "public"."enum_success_stories_meta_index_directive";
  DROP TYPE "public"."enum_success_stories_meta_follow_directive";
  DROP TYPE "public"."enum_resources_testimonials_image_display_preset";
  DROP TYPE "public"."enum_resources_testimonials_image_display_fit";
  DROP TYPE "public"."enum_resources_resource_type";
  DROP TYPE "public"."enum_resources_difficulty";
  DROP TYPE "public"."enum_resources_language";
  DROP TYPE "public"."enum_resources_thumbnail_display_preset";
  DROP TYPE "public"."enum_resources_thumbnail_display_fit";
  DROP TYPE "public"."enum_resources_instructor_photo_display_preset";
  DROP TYPE "public"."enum_resources_instructor_photo_display_fit";
  DROP TYPE "public"."enum_syllabus_states_type";
  DROP TYPE "public"."enum_syllabus_states_popularity";
  DROP TYPE "public"."enum_events_category";
  DROP TYPE "public"."enum_events_host_image_display_preset";
  DROP TYPE "public"."enum_events_host_image_display_fit";
  DROP TYPE "public"."enum_events_image_display_preset";
  DROP TYPE "public"."enum_events_image_display_fit";
  DROP TYPE "public"."enum_events_meta_index_directive";
  DROP TYPE "public"."enum_events_meta_follow_directive";
  DROP TYPE "public"."enum_books_guarantees_icon";
  DROP TYPE "public"."enum_books_category";
  DROP TYPE "public"."enum_books_meta_index_directive";
  DROP TYPE "public"."enum_books_meta_follow_directive";
  DROP TYPE "public"."enum_popups_size";
  DROP TYPE "public"."enum_popups_image_position";
  DROP TYPE "public"."enum_popups_display_rules_condition";
  DROP TYPE "public"."enum_popups_display_rules_frequency";
  DROP TYPE "public"."enum_popups_display_rules_trigger_type";
  DROP TYPE "public"."enum_vacancies_tag";
  DROP TYPE "public"."enum_vacancies_status";
  DROP TYPE "public"."enum_vacancies_meta_index_directive";
  DROP TYPE "public"."enum_vacancies_meta_follow_directive";
  DROP TYPE "public"."enum_enrollments_event_type";
  DROP TYPE "public"."enum_notes_category";
  DROP TYPE "public"."enum_notes_meta_index_directive";
  DROP TYPE "public"."enum_notes_meta_follow_directive";
  DROP TYPE "public"."enum_previous_year_questions_category";
  DROP TYPE "public"."enum_previous_year_questions_meta_index_directive";
  DROP TYPE "public"."enum_previous_year_questions_meta_follow_directive";
  DROP TYPE "public"."enum_mentorship_bookings_status";
  DROP TYPE "public"."enum_schema_templates_applies_to";
  DROP TYPE "public"."enum_leads_type";
  DROP TYPE "public"."enum_leads_source";
  DROP TYPE "public"."enum_leads_event_type";
  DROP TYPE "public"."enum_dynamic_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_dynamic_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_dynamic_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_dynamic_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_dynamic_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_dynamic_pages_blocks_media_block_media_display_preset";
  DROP TYPE "public"."enum_dynamic_pages_blocks_media_block_media_display_fit";
  DROP TYPE "public"."enum_dynamic_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_dynamic_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_dynamic_pages_blocks_clat_pg_block_trust_cards_icon";
  DROP TYPE "public"."enum_dynamic_pages_blocks_clat_pg_block_exam_tabs_icon";
  DROP TYPE "public"."enum_dynamic_pages_status";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_media_block_media_display_preset";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_media_block_media_display_fit";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_clat_pg_block_trust_cards_icon";
  DROP TYPE "public"."enum__dynamic_pages_v_blocks_clat_pg_block_exam_tabs_icon";
  DROP TYPE "public"."enum__dynamic_pages_v_version_status";
  DROP TYPE "public"."enum_forms_blocks_captcha_captcha_type";
  DROP TYPE "public"."enum_header_contact_info_social_links_platform";
  DROP TYPE "public"."enum_footer_courses_link_type";
  DROP TYPE "public"."enum_footer_free_resources_link_type";
  DROP TYPE "public"."enum_footer_company_links_link_type";
  DROP TYPE "public"."enum_branding_captcha_captcha_type";
  DROP TYPE "public"."enum_home_slides_image_display_preset";
  DROP TYPE "public"."enum_home_slides_image_display_fit";
  DROP TYPE "public"."enum_home_slides_secondary_link_type";
  DROP TYPE "public"."enum_home_slides_secondary_link_appearance";
  DROP TYPE "public"."enum_home_lead_features_icon";
  DROP TYPE "public"."enum_home_trust_indicators_icon";
  DROP TYPE "public"."enum_home_founder_image_display_preset";
  DROP TYPE "public"."enum_home_founder_image_display_fit";
  DROP TYPE "public"."enum_home_results_fetch_type";
  DROP TYPE "public"."enum_home_app_image_display_preset";
  DROP TYPE "public"."enum_home_app_image_display_fit";
  DROP TYPE "public"."enum_home_final_c_t_a_primary_c_t_a_type";
  DROP TYPE "public"."enum_home_final_c_t_a_primary_c_t_a_appearance";
  DROP TYPE "public"."enum_home_final_c_t_a_secondary_c_t_a_type";
  DROP TYPE "public"."enum_home_final_c_t_a_secondary_c_t_a_appearance";
  DROP TYPE "public"."enum_home_events_fetch_type";
  DROP TYPE "public"."enum_home_blog_judgments_fetch_type";
  DROP TYPE "public"."enum_home_blog_judgments_view_all_link_type";
  DROP TYPE "public"."enum_home_blog_judgments_view_all_link_appearance";
  DROP TYPE "public"."enum_home_testimonials_fetch_type";
  DROP TYPE "public"."enum_home_testimonials_view_all_link_type";
  DROP TYPE "public"."enum_home_testimonials_view_all_link_appearance";
  DROP TYPE "public"."enum_home_meta_index_directive";
  DROP TYPE "public"."enum_home_meta_follow_directive";
  DROP TYPE "public"."enum_course_community_image_display_preset";
  DROP TYPE "public"."enum_course_community_image_display_fit";
  DROP TYPE "public"."enum_course_meta_index_directive";
  DROP TYPE "public"."enum_course_meta_follow_directive";
  DROP TYPE "public"."enum_success_stories_page_counselling_image_display_preset";
  DROP TYPE "public"."enum_success_stories_page_counselling_image_display_fit";
  DROP TYPE "public"."enum_success_stories_page_meta_index_directive";
  DROP TYPE "public"."enum_success_stories_page_meta_follow_directive";
  DROP TYPE "public"."enum_free_study_featured_states_image_display_preset";
  DROP TYPE "public"."enum_free_study_featured_states_image_display_fit";
  DROP TYPE "public"."enum_free_study_features_icon";
  DROP TYPE "public"."enum_free_study_pan_india_background_display_preset";
  DROP TYPE "public"."enum_free_study_pan_india_background_display_fit";
  DROP TYPE "public"."enum_free_study_meta_index_directive";
  DROP TYPE "public"."enum_free_study_meta_follow_directive";
  DROP TYPE "public"."enum_syllabus_vacancy_global_meta_index_directive";
  DROP TYPE "public"."enum_syllabus_vacancy_global_meta_follow_directive";
  DROP TYPE "public"."enum_blog_meta_index_directive";
  DROP TYPE "public"."enum_blog_meta_follow_directive";
  DROP TYPE "public"."enum_events_page_meta_index_directive";
  DROP TYPE "public"."enum_events_page_meta_follow_directive";
  DROP TYPE "public"."enum_books_page_meta_index_directive";
  DROP TYPE "public"."enum_books_page_meta_follow_directive";
  DROP TYPE "public"."enum_about_us_story_stats_gradient";
  DROP TYPE "public"."enum_about_us_values_list_icon";
  DROP TYPE "public"."enum_about_us_features_list_icon";
  DROP TYPE "public"."enum_about_us_legacy_stats_color";
  DROP TYPE "public"."enum_about_us_director_image_display_preset";
  DROP TYPE "public"."enum_about_us_director_image_display_fit";
  DROP TYPE "public"."enum_about_us_meta_index_directive";
  DROP TYPE "public"."enum_about_us_meta_follow_directive";
  DROP TYPE "public"."enum_contact_page_meta_index_directive";
  DROP TYPE "public"."enum_contact_page_meta_follow_directive";
  DROP TYPE "public"."enum_notes_page_meta_index_directive";
  DROP TYPE "public"."enum_notes_page_meta_follow_directive";
  DROP TYPE "public"."enum_previous_year_questions_page_meta_index_directive";
  DROP TYPE "public"."enum_previous_year_questions_page_meta_follow_directive";
  DROP TYPE "public"."enum_clat_pg_global_trust_cards_icon";
  DROP TYPE "public"."enum_clat_pg_global_exam_tabs_icon";`)
}
