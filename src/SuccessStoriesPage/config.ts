import { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'
import { imageDisplayFieldName, imageDisplaySettingsField } from '@/fields/imageDisplaySettings'

export const SuccessStoriesPage: GlobalConfig = {
  slug: 'success-stories-page',
  label: 'Success Stories',
  access: {
    read: publicReadOrModuleAccess('success-stories-page'),
    update: moduleAccess('success-stories-page', 'update'),
  },
  admin: {
    group: 'Site Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Title',
              defaultValue: 'Celebrating Excellence & Achievement',
              required: true,
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Meet our brilliant students who achieved their dreams with dedication, hard work, and the right guidance. Their success is our pride.',
            },
            {
              name: 'heroStats',
              type: 'array',
              label: 'Hero Stats',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon (Lucide Icon Name)',
                  admin: {
                    components: {
                      Field: '@/components/IconPicker',
                    },
                  },
                },
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
              name: 'judiciarySection',
              type: 'group',
              label: 'Judiciary Services',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'Judiciary Services',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  defaultValue:
                    'Our students who cracked Civil Judge Junior Division exams across various states.',
                },
              ],
            },
            {
              name: 'adpoSection',
              type: 'group',
              label: 'ADPO/APO Selections',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'ADPO/APO Selections',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  defaultValue:
                    'Outstanding performance in Assistant District Public Prosecution Officer exams.',
                },
              ],
            },
            {
              name: 'mainsSection',
              type: 'group',
              label: 'Mains Excellence',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'Mains Excellence',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  defaultValue:
                    'Top scorers in Mains examination who demonstrated exceptional legal writing skills.',
                },
              ],
            },
            {
              name: 'testSeriesSection',
              type: 'group',
              label: 'Test Series Toppers',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'Test Series Toppers',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  defaultValue:
                    'Consistent performers in our All India and State-specific Test Series.',
                },
              ],
            },
            {
              name: 'interviewSection',
              type: 'group',
              label: 'Interview Success',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'Interview Success',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  defaultValue:
                    'Candidates who scored exceptional marks in the interview stage through our guidance.',
                },
              ],
            },
          ],
        },
        {
          label: 'Counselling',
          fields: [
            {
              name: 'counsellingImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
            },
            imageDisplaySettingsField({
              name: imageDisplayFieldName('counsellingImage'),
              label: 'Counselling Image Display Settings',
            }),
            {
              name: 'counsellingTitle',
              type: 'text',
              label: 'Title',
              defaultValue: 'Get Free Personalized Counselling',
            },
            {
              name: 'counsellingDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Not sure which course is right for you? Book a free one-on-one counselling session with our expert mentors. Get personalized guidance based on your preparation level, target exam, and career goals.',
            },
            {
              name: 'counsellingChecklist',
              type: 'array',
              label: 'Checklist Items',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Item Text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'counsellingButtonText',
                  type: 'text',
                  label: 'Button Text',
                  defaultValue: 'Book Free Counselling Now',
                },
                {
                  name: 'counsellingButtonLink',
                  type: 'text',
                  label: 'Button Link',
                  defaultValue:
                    'https://wa.me/919667898146?text=I%20want%20to%20book%20a%20free%20counselling%20session',
                },
              ],
            },
          ],
        },
        {
          label: 'Brochure',
          fields: [
            {
              name: 'brochureTitle',
              type: 'text',
              label: 'Title',
              defaultValue: 'Download Our Success Stories Brochure',
            },
            {
              name: 'brochureDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                "Get detailed insights into our students' success journeys, course details, and preparation strategies. Download our comprehensive brochure now!",
            },
            {
              name: 'brochureButtonText',
              type: 'text',
              label: 'Button Text',
              defaultValue: 'Download Brochure',
            },
          ],
        },
        {
          label: 'Final CTA',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              label: 'Title',
              defaultValue: 'Be The Next Success Story',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Join thousands of successful aspirants who achieved their dreams with Aashayein Judiciary. Your journey to success starts here.',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'ctaEnrollButtonText',
                  type: 'text',
                  label: 'Enroll Button Text',
                  defaultValue: 'Enroll Now',
                },
                {
                  name: 'ctaEnrollButtonLink',
                  type: 'text',
                  label: 'Enroll Button Link',
                  defaultValue: '/courses',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'ctaTalkButtonText',
                  type: 'text',
                  label: 'Talk Button Text',
                  defaultValue: 'Talk to Us',
                },
                {
                  name: 'ctaTalkButtonLink',
                  type: 'text',
                  label: 'Talk Button Link',
                  defaultValue: 'https://wa.me/919667898146',
                },
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
                description: 'Toggle sections on/off for the success stories page.',
              },
              fields: [
                {
                  name: 'judiciary',
                  type: 'checkbox',
                  label: 'Judiciary Services',
                  defaultValue: true,
                },
                {
                  name: 'adpo',
                  type: 'checkbox',
                  label: 'ADPO/APO Selections',
                  defaultValue: true,
                },
                {
                  name: 'mains',
                  type: 'checkbox',
                  label: 'Mains Excellence',
                  defaultValue: true,
                },
                {
                  name: 'testSeries',
                  type: 'checkbox',
                  label: 'Test Series Toppers',
                  defaultValue: true,
                },
                {
                  name: 'interview',
                  type: 'checkbox',
                  label: 'Interview Success',
                  defaultValue: true,
                },
                {
                  name: 'counselling',
                  type: 'checkbox',
                  label: 'Counselling Section',
                  defaultValue: true,
                },
                {
                  name: 'brochure',
                  type: 'checkbox',
                  label: 'Brochure Section',
                  defaultValue: true,
                },
                {
                  name: 'finalCTA',
                  type: 'checkbox',
                  label: 'Final CTA Section',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
