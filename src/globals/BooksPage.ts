import { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'

export const BooksPage: GlobalConfig = {
  slug: 'books-page',
  label: 'Books Page',
  access: {
    read: publicReadOrModuleAccess('books-page'),
    update: moduleAccess('books-page', 'update'),
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
                  name: 'badgeText',
                  type: 'text',
                  defaultValue: 'Premium Study Materials',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Expert-Curated Books for Judiciary Exams',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Comprehensive study materials, practice books, and free e-books designed by experts to help you ace your judiciary examination.',
                },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Stats Banner',
              maxRows: 4,
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'appSection',
              type: 'group',
              label: 'Download App Section',
              fields: [
                {
                  name: 'badgeText',
                  type: 'text',
                  defaultValue: 'Mobile App',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Download Our App for Free Test Series',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Get access to free test series, daily practice questions, live classes, and personalized study materials on the go.',
                },
                {
                  name: 'features',
                  type: 'array',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'playStoreLink',
                  type: 'text',
                  defaultValue: 'https://play.google.com',
                },
                {
                  name: 'appStoreLink',
                  type: 'text',
                  defaultValue: 'https://www.apple.com/app-store',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
