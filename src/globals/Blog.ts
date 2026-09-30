import type { GlobalConfig } from 'payload'

import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'

export const Blog: GlobalConfig = {
  slug: 'blog',
  access: {
    read: publicReadOrModuleAccess('blog'),
    update: moduleAccess('blog', 'update'),
  },
  admin: {
    group: 'Site Pages',
  },
  label: 'Blog Page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              defaultValue: 'Judiciary Insights & Resources',
              label: 'Title',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Expert articles, preparation strategies, legal updates, and success stories to guide your judiciary exam journey.',
              label: 'Description',
            },
          ],
        },
        {
          label: 'Sidebar',
          fields: [
            {
              name: 'newsletterTitle',
              type: 'text',
              required: true,
              defaultValue: 'Weekly Legal Updates',
              label: 'Newsletter Title',
            },
            {
              name: 'newsletterDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Get expert articles, case law updates, and preparation tips delivered to your inbox.',
              label: 'Newsletter Description',
            },
            {
              name: 'ctaTitle',
              type: 'text',
              required: true,
              defaultValue: 'Start Your Journey',
              label: 'CTA Title',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Join thousands of successful judiciary aspirants with expert guidance.',
              label: 'CTA Description',
            },
            {
              name: 'ctaButtonText',
              type: 'text',
              required: true,
              defaultValue: 'Enroll Now',
              label: 'CTA Button Text',
            },
            {
              name: 'ctaLink',
              type: 'text',
              required: true,
              defaultValue: '/courses',
              label: 'CTA Link',
            },
          ],
        },
      ],
    },
  ],
}
