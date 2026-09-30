import { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'

export const EventsPage: GlobalConfig = {
  slug: 'events-page',
  label: 'Events Page',
  access: {
    read: publicReadOrModuleAccess('events-page'),
    update: moduleAccess('events-page', 'update'),
  },
  admin: {
    group: 'Site Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero Section',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Events & Webinars',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Join our exclusive webinars, seminars, and scholarship tests to accelerate your judiciary preparation journey with expert guidance from Nitesh Pahuja Sir.',
                },
                {
                  name: 'badgeText',
                  type: 'text',
                  defaultValue: 'Upcoming Events & Opportunities',
                },
              ],
            },
            {
              name: 'brochure',
              type: 'group',
              label: 'Sidebar Brochure Section',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Get Event Schedule Brochure',
                },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Brochure File',
                },
                {
                  name: 'downloadLink',
                  type: 'text', // External link fallback or if they prefer a link
                  label: 'Download Link (Alternative to file)',
                },
              ],
            },
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Sidebar Contact / Help Section',
              fields: [
                {
                  name: 'helpTitle',
                  type: 'text',
                  label: 'Help Widget Title',
                  defaultValue: 'Need Help?',
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Support Phone Number',
                  defaultValue: '+91 96679 21888',
                },
                {
                  name: 'whatsapp',
                  type: 'text',
                  label: 'WhatsApp Number (without + or spaces)',
                  defaultValue: '919667921888',
                },
              ],
            },
            {
              name: 'faqs',
              type: 'array',
              label: 'FAQs',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
