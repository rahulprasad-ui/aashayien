import { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'
import { imageDisplayFieldName, imageDisplaySettingsField } from '@/fields/imageDisplaySettings'
import { link } from '@/fields/link'
import { simpleLexical } from '@/fields/simpleLexical'

export const Course: GlobalConfig = {
  slug: 'course',
  label: 'Course Page',
  access: {
    read: publicReadOrModuleAccess('course'),
    update: moduleAccess('course', 'update'),
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
              required: true,
              defaultValue: 'Transform Your Judiciary Dreams Into Reality',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              label: 'Subtitle',
              defaultValue:
                "India's most comprehensive judiciary exam preparation with expert faculty, proven teaching methodology, and a track record of top rankers",
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
                  required: true,
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
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                  required: true,
                },
              ],
            },
            {
              name: 'offerStrip',
              type: 'group',
              label: 'Offer Strip',
              fields: [
                {
                  name: 'text',
                  type: 'richText',
                  label: 'Offer Text',
                  editor: simpleLexical,
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  label: 'Show Offer Strip',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Sidebar',
          fields: [
            {
              name: 'topRankers',
              type: 'relationship',
              relationTo: 'success-stories',
              hasMany: true,
              label: 'Top Rankers',
              admin: {
                description: 'Select success stories to show in the Courses page left sidebar.',
              },
            },
            {
              name: 'helpWidget',
              type: 'group',
              label: 'Help Widget',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  defaultValue: 'Need Help Choosing?',
                },
                {
                  name: 'description',
                  type: 'text',
                  label: 'Description',
                  defaultValue: 'Get FREE counseling from our experts',
                },
                {
                  name: 'whatsappLink',
                  type: 'text',
                  label: 'WhatsApp Link',
                  defaultValue:
                    'https://wa.me/919111198177?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20courses',
                },
                {
                  name: 'callNumber',
                  type: 'text',
                  label: 'Call Number',
                  defaultValue: '+919111198177',
                },
                {
                  name: 'availabilityText',
                  type: 'text',
                  label: 'Availability Text',
                  defaultValue: 'Available Mon-Sat, 9 AM - 8 PM',
                },
              ],
            },
            {
              name: 'counsellingWidget',
              type: 'group',
              label: 'Counselling Widget',
              fields: [
                {
                  name: 'buttonText',
                  type: 'text',
                  label: 'Button Text',
                  defaultValue: 'Get Free Counselling',
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Button Link',
                  // defaultValue: '#', // Or trigger a modal? Currently hardcoded button.
                },
              ],
            },
          ],
        },
        {
          label: 'Community',
          fields: [
            {
              name: 'communityTitle',
              type: 'text',
              label: 'Title',
              defaultValue: 'Join Our Free Community',
            },
            {
              name: 'communityDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Get daily current affairs, judgment summaries, and free study materials. Connect with Nitesh Sir and thousands of aspiring judicial officers!',
            },
            {
              name: 'communityImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
            },
            imageDisplaySettingsField({
              name: imageDisplayFieldName('communityImage'),
              label: 'Community Image Display Settings',
            }),
            {
              name: 'telegramLink',
              type: 'text',
              label: 'Telegram Link',
              defaultValue: 'https://t.me/aashayeinjudiciary',
            },
            {
              name: 'appLink',
              type: 'text',
              label: 'App Download Link',
              defaultValue: '/courses',
            },
          ],
        },
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'Frequently Asked Questions',
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
      ],
    },
  ],
}
