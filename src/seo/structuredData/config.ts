export const structuredDataSchemaTypes = [
  'FAQPage',
  'Article',
  'BlogPosting',
  'WebPage',
  'Course',
  'Product',
  'BreadcrumbList',
  'Organization',
  'EducationalOrganization',
  'WebSite',
  'AboutPage',
  'ContactPage',
  'Event',
] as const

export type StructuredDataSchemaType = (typeof structuredDataSchemaTypes)[number]

export const seoCollectionSlugs = [
  'pages',
  'posts',
  'courses',
  'success-stories',
  'books',
  'events',
  'vacancies',
  'notes',
  'previous-year-questions',
] as const

export const seoGlobalSlugs = [
  'home',
  'course',
  'success-stories-page',
  'free-study',
  'blog',
  'events-page',
  'books-page',
  'about-us',
  'contact-page',
  'notes-page',
  'previous-year-questions-page',
  'syllabus-vacancy-global',
] as const

export const structuredDataApplyTargets = ['site', ...seoCollectionSlugs, ...seoGlobalSlugs] as const

export type StructuredDataApplyTarget = (typeof structuredDataApplyTargets)[number]

export const structuredDataModeOptions = [
  { label: 'Guided Builder', value: 'guided' },
  { label: 'Custom JSON', value: 'custom' },
] as const
