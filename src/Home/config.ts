import { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'
import { link } from '@/fields/link'
import { simpleLexical } from '@/fields/simpleLexical'
import { imageDisplayFieldName, imageDisplaySettingsField, imageUploadWithDisplay } from '@/fields/imageDisplaySettings'
import { revalidateHome } from './hooks/revalidateHome'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home',
  access: {
    read: publicReadOrModuleAccess('home'),
    update: moduleAccess('home', 'update'),
  },
  admin: {
    group: 'Site Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Carousel',
          fields: [
            {
              name: 'slides',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                ...imageUploadWithDisplay({
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                }),
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'New Slide',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                link({
                  disableLabel: true,
                  overrides: {
                    name: 'link',
                    label: 'Primary CTA Button',
                  },
                }),
                link({
                  disableLabel: true,
                  overrides: {
                    name: 'secondaryLink',
                    label: 'Secondary CTA Button',
                  },
                }),
                {
                  name: 'features',
                  type: 'array',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Founder Section',
          fields: [
            {
              name: 'founderSectionTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'Meet The Visionary Behind Aashayien',
            },
            {
              name: 'founderSectionSubtitle',
              type: 'text',
              label: 'Section Subtitle',
              defaultValue: 'About Our Founder',
            },
            {
              name: 'founderImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Founder Image',
            },
            imageDisplaySettingsField({
              name: imageDisplayFieldName('founderImage'),
              label: 'Founder Image Display Settings',
              defaultPreset: 'thumbnail',
            }),
            {
              name: 'founderName',
              type: 'text',
              required: true,
              label: 'Founder Name',
              defaultValue: 'Anil Khanna',
            },
            {
              name: 'founderRole',
              type: 'text',
              label: 'Founder Role',
              defaultValue: 'Founder & Chief Mentor',
            },
            {
              name: 'founderIntro',
              type: 'textarea',
              label: 'Introduction',
              defaultValue:
                'Leading authority in legal education with over 20 years of experience in mentoring judiciary aspirants.',
            },
            {
              name: 'experienceHighlights',
              type: 'array',
              label: 'Experience Highlights',
              minRows: 1,
              maxRows: 6,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'founderCTA',
              type: 'group',
              label: 'CTA Button',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: 'Learn More About Anil Sir',
                },
                {
                  name: 'link',
                  type: 'text',
                  defaultValue: '/about-us',
                },
              ],
            },
          ],
        },
        {
          label: 'Notifications & Updates',
          fields: [
            {
              name: 'updatesTitle',
              type: 'text',
              label: 'Title',
              defaultValue: 'Latest Notifications & Updates',
            },
            {
              name: 'updatesSubtitle',
              type: 'text',
              label: 'Subtitle',
              defaultValue: 'Stay Informed',
            },
            {
              name: 'updatesDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Keep track of the latest judiciary exam notifications and upcoming academy events.',
            },
            {
              name: 'featuredNotifications',
              type: 'relationship',
              relationTo: 'vacancies',
              hasMany: true,
              label: 'Featured Notifications',
              admin: {
                description:
                  'Select specific notifications to show. If empty, latest 4 will be shown.',
              },
            },
            {
              name: 'featuredEvents',
              type: 'relationship',
              relationTo: 'events',
              hasMany: true,
              label: 'Featured Events',
              admin: {
                description: 'Select specific events to show. If empty, latest 4 will be shown.',
              },
            },
          ],
        },
        {
          label: 'Lead Form',
          fields: [
            {
              name: 'leadTitle',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'leadDescription',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'leadForm',
              type: 'relationship',
              relationTo: 'forms',
              label: 'Form',
              hasMany: false,
            },
            {
              name: 'leadFeatures',
              type: 'array',
              label: 'Features (Left Side)',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Users', value: 'users' },
                    { label: 'Message Square', value: 'messageSquare' },
                    { label: 'Sparkles', value: 'sparkles' },
                    { label: 'Book Open', value: 'bookOpen' },
                  ],
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'menteeCountText',
              type: 'text',
              label: 'Mentee Count Text',
              defaultValue: 'Join 5000+ students already being mentored.',
            },
            {
              name: 'mentorAvatars',
              type: 'relationship',
              relationTo: 'media',
              hasMany: true,
              label: 'Mentor Avatars',
            },
          ],
        },
        {
          label: 'Trust Indicators',
          fields: [
            {
              name: 'trustIndicators',
              type: 'array',
              label: 'Indicators',
              minRows: 1,
              maxRows: 4,
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Award', value: 'award' },
                    { label: 'Users', value: 'users' },
                    { label: 'Trophy', value: 'trophy' },
                    { label: 'User Check', value: 'userCheck' },
                  ],
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subLabel',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Student Results',
          fields: [
            {
              name: 'resultsTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'Our Achievers',
            },
            {
              name: 'resultsSubtitle',
              type: 'text',
              label: 'Subtitle',
              defaultValue: 'Celebrating Excellence in Judiciary',
            },
            {
              name: 'resultsDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Meet our students who have turned their dreams into reality with dedication and right guidance.',
            },
            {
              name: 'resultsFetchType',
              type: 'radio',
              label: 'How to fetch achievers?',
              options: [
                { label: 'Manual Selection', value: 'custom' },
                { label: 'Latest Added', value: 'latest' },
                { label: 'Top Ranked', value: 'topRanked' },
              ],
              defaultValue: 'latest',
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'featuredResults',
              type: 'relationship',
              relationTo: 'success-stories',
              hasMany: true,
              label: 'Select Achievers',
              admin: {
                condition: (_, siblingData) => siblingData?.resultsFetchType === 'custom',
              },
            },
            {
              name: 'resultsLimit',
              type: 'number',
              defaultValue: 6,
              label: 'Number of achievers to show',
              admin: {
                condition: (_, siblingData) => siblingData?.resultsFetchType !== 'custom',
              },
            },
          ],
        },
        {
          label: 'Exclusive Community',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'communityTitle',
                  type: 'text',
                  label: 'Title',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'communitySubtitle',
                  type: 'text',
                  label: 'Subtitle',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'communityDescription',
              type: 'richText',
              label: 'Description',
              editor: simpleLexical,
            },
            {
              name: 'appImage',
              type: 'upload',
              relationTo: 'media',
              label: 'App Image',
            },
            imageDisplaySettingsField({
              name: imageDisplayFieldName('appImage'),
              label: 'App Image Display Settings',
            }),
            {
              name: 'floatingStats',
              type: 'group',
              label: 'Floating Stats',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'stat1Value',
                      type: 'text',
                      label: 'Stat 1 Value',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'stat1Label',
                      type: 'text',
                      label: 'Stat 1 Label',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'stat2Value',
                      type: 'text',
                      label: 'Stat 2 Value',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'stat2Label',
                      type: 'text',
                      label: 'Stat 2 Label',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'communityFeatures',
              type: 'array',
              label: 'Features',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon',
                  admin: {
                    components: {
                      Field: '@/components/IconPicker',
                    },
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'appLink',
                  type: 'text',
                  label: 'App Link',
                },
                {
                  name: 'telegramLink',
                  type: 'text',
                  label: 'Telegram Link',
                },
                {
                  name: 'youtubeLink',
                  type: 'text',
                  label: 'YouTube Link',
                },
              ],
            },
            {
              name: 'communityBottomStats',
              type: 'array',
              label: 'Bottom Stats',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                },
                {
                  name: 'label',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Why Choose Us',
          fields: [
            {
              name: 'whyChooseUsTitle',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'whyChooseUsDescription',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'whyChooseUsCards',
              type: 'array',
              label: 'Cards',
              defaultValue: [
                {
                  title: 'Expert Faculty',
                  description:
                    'Learn from highly experienced mentors who have a proven track record.',
                  icon: 'Users',
                },
                {
                  title: 'Structured Curriculum',
                  description:
                    'Comprehensive study materials and a well-planned syllabus for guaranteed success.',
                  icon: 'BookOpen',
                },
                {
                  title: 'Regular Mentorship',
                  description:
                    'Get personalized attention and guidance to overcome your challenges.',
                  icon: 'MessageSquare',
                },
                {
                  title: 'Result-Oriented Preparation',
                  description:
                    'Focused teaching methods designed to help you clear judiciary exams.',
                  icon: 'Trophy',
                },
              ],
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon',
                  admin: {
                    components: {
                      Field: '@/components/IconPicker',
                    },
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
              ],
            },
            {
              name: 'whyChooseUsStats',
              type: 'array',
              label: 'Bottom Stats',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Value',
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                },
              ],
            },
          ],
        },

        {
          label: 'Sections',
          fields: [
            {
              name: 'popularCourses',
              type: 'group',
              label: 'Courses Overview Section',
              admin: {
                description: 'Manage the "Courses Overview" section on the home page.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'Courses Overview',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Section Subtitle',
                  defaultValue: 'ALEC Major Course Offerings',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Section Description',
                },
                {
                  name: 'fetchType',
                  type: 'radio',
                  label: 'How to fetch courses?',
                  options: [
                    { label: 'Manual Selection', value: 'custom' },
                    { label: 'Latest Added', value: 'latest' },
                    { label: 'Most Viewed', value: 'mostViewed' },
                  ],
                  defaultValue: 'latest',
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'selectedCourses',
                  type: 'relationship',
                  relationTo: 'courses',
                  hasMany: true,
                  label: 'Select Courses',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType === 'custom',
                  },
                },
                {
                  name: 'limit',
                  type: 'number',
                  defaultValue: 3,
                  label: 'Number of courses to show',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType !== 'custom',
                  },
                },
                link({
                  overrides: {
                    name: 'viewAllLink',
                    label: 'View All Button',
                  },
                }),
              ],
            },
            {
              name: 'successStories',
              type: 'group',
              label: 'Success Stories Section',
              admin: {
                description: 'Manage the "Success Stories" section on the home page.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'Success Stories',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Section Subtitle',
                  defaultValue: 'Join the Ranks of Successful Judiciary Aspirants',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Section Description',
                },
                {
                  name: 'fetchType',
                  type: 'radio',
                  label: 'How to fetch stories?',
                  options: [
                    { label: 'Manual Selection', value: 'custom' },
                    { label: 'Latest Added', value: 'latest' },
                    { label: 'Most Viewed', value: 'mostViewed' },
                  ],
                  defaultValue: 'latest',
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'selectedStories',
                  type: 'relationship',
                  relationTo: 'success-stories',
                  hasMany: true,
                  label: 'Select Stories',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType === 'custom',
                  },
                },
                {
                  name: 'limit',
                  type: 'number',
                  defaultValue: 3,
                  label: 'Number of stories to show',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType !== 'custom',
                  },
                },
                link({
                  overrides: {
                    name: 'viewAllLink',
                    label: 'View All Button',
                  },
                }),
              ],
            },
            {
              name: 'faqs',
              type: 'group',
              label: 'FAQs Section',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                {
                  name: 'selectedFaqs',
                  type: 'relationship',
                  relationTo: 'faqs',
                  hasMany: true,
                  label: 'Select FAQs',
                },
              ],
            },
            {
              name: 'finalCTA',
              type: 'group',
              label: 'Final CTA Section',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  defaultValue: 'Start Your Journey Towards Becoming a Judge',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  defaultValue:
                    'Join ALEC’s expert-led judiciary preparation programs and get the mentorship needed to succeed.',
                },
                link({
                  overrides: {
                    name: 'primaryCTA',
                    label: 'Primary CTA Button (e.g., Get Mentorship)',
                  },
                }),
                link({
                  overrides: {
                    name: 'secondaryCTA',
                    label: 'Secondary CTA Button (e.g., Download Brochure)',
                  },
                }),
              ],
            },
            {
              name: 'resources',
              type: 'group',
              label: 'Free Study Material Section',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  defaultValue: 'Free Study Material',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtitle',
                  defaultValue: 'Study Resources',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  defaultValue:
                    'Access high-quality previous year papers, preparation guides, and important judgements absolutely free. Start your judiciary journey with expert guidance.',
                },
                {
                  name: 'fetchType',
                  type: 'radio',
                  label: 'How to fetch resources?',
                  options: [
                    { label: 'Manual Selection', value: 'custom' },
                    { label: 'Latest Added', value: 'latest' },
                    { label: 'Most Viewed', value: 'mostViewed' },
                  ],
                  defaultValue: 'latest',
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'selectedResources',
                  type: 'relationship',
                  relationTo: 'resources',
                  hasMany: true,
                  label: 'Select Resources',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType === 'custom',
                  },
                },
                {
                  name: 'features',
                  type: 'array',
                  label: 'Resource Features',
                  fields: [
                    {
                      name: 'icon',
                      type: 'text',
                      label: 'Icon',
                      admin: {
                        components: {
                          Field: '@/components/IconPicker',
                        },
                      },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'limit',
                  type: 'number',
                  defaultValue: 3,
                  label: 'Number of resources to show',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType !== 'custom',
                  },
                },
                link({
                  overrides: {
                    name: 'viewAllLink',
                    label: 'View All Button',
                  },
                }),
              ],
            },
            {
              name: 'events',
              type: 'group',
              label: 'Events Section',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtitle',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                {
                  name: 'fetchType',
                  type: 'radio',
                  label: 'How to fetch events?',
                  options: [
                    { label: 'Manual Selection', value: 'custom' },
                    { label: 'Latest Added', value: 'latest' },
                  ],
                  defaultValue: 'latest',
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'selectedEvents',
                  type: 'relationship',
                  relationTo: 'events',
                  hasMany: true,
                  label: 'Select Events',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType === 'custom',
                  },
                },
                {
                  name: 'limit',
                  type: 'number',
                  defaultValue: 3,
                  label: 'Number of events to show',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType !== 'custom',
                  },
                },
              ],
            },
            {
              name: 'blogJudgments',
              type: 'group',
              label: 'Blog / Knowledge Hub Section',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'Knowledge Hub for Judiciary Aspirants',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Section Subtitle',
                  defaultValue: 'Blog & Insights',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Section Description',
                  defaultValue:
                    'Deep dive into legal concepts, landmark judgments, and expert preparation strategies.',
                },
                {
                  name: 'fetchType',
                  type: 'radio',
                  label: 'How to fetch articles?',
                  options: [
                    { label: 'Manual Selection', value: 'custom' },
                    { label: 'Latest Added', value: 'latest' },
                  ],
                  defaultValue: 'latest',
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'selectedPosts',
                  type: 'relationship',
                  relationTo: 'posts',
                  hasMany: true,
                  label: 'Select Posts',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType === 'custom',
                  },
                },
                {
                  name: 'limit',
                  type: 'number',
                  defaultValue: 3,
                  label: 'Number of articles to show',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType !== 'custom',
                  },
                },
                link({
                  overrides: {
                    name: 'viewAllLink',
                    label: 'View All Button',
                  },
                }),
              ],
            },
            {
              name: 'testimonials',
              type: 'group',
              label: 'Student Testimonials Section',
              admin: {
                description: 'Manage the "Student Testimonials" slider section on the home page.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'Student Testimonials',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Section Subtitle',
                  defaultValue: 'Strengthening credibility through real feedback',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Section Description',
                },
                {
                  name: 'fetchType',
                  type: 'radio',
                  label: 'How to fetch testimonials?',
                  options: [
                    { label: 'Manual Selection', value: 'custom' },
                    { label: 'Latest Added', value: 'latest' },
                  ],
                  defaultValue: 'latest',
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'selectedTestimonials',
                  type: 'relationship',
                  relationTo: 'success-stories',
                  hasMany: true,
                  label: 'Select Testimonials',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType === 'custom',
                    description: 'Select success stories that have testimonial quotes.',
                  },
                },
                {
                  name: 'limit',
                  type: 'number',
                  defaultValue: 6,
                  label: 'Number of testimonials to show',
                  admin: {
                    condition: (_, siblingData) => siblingData?.fetchType !== 'custom',
                  },
                },
                link({
                  overrides: {
                    name: 'viewAllLink',
                    label: 'View All Button',
                  },
                }),
              ],
            },
          ],
        },
        {
          label: 'Section Visibility',
          fields: [
            {
              name: 'visibility',
              type: 'group',
              label: 'Show/Hide Sections',
              admin: {
                description: 'Toggle sections on/off for the landing page.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'hero',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Hero Carousel',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'trustIndicators',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Trust Indicators',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'achievers',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Student Results (Achievers)',
                      admin: { width: '33%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'leadCapture',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Lead Capture Form',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'founder',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Founder Section',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'whyChooseUs',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Why Choose Us',
                      admin: { width: '33%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'courses',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Popular Courses',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'resources',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Free Study Material',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'notifications',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Latest Notifications',
                      admin: { width: '33%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'events',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Latest Events',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'testimonials',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Student Testimonials',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'blog',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Blog & Judgments',
                      admin: { width: '33%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'faq',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'FAQ Section',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'finalCTA',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Final CTA Section',
                      admin: { width: '33%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
}
