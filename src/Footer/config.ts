import type { GlobalConfig } from 'payload'

import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: publicReadOrModuleAccess('footer'),
    update: moduleAccess('footer', 'update'),
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand & Socials',
          fields: [
            {
              name: 'brandDescription',
              type: 'textarea',
              label: 'Brand Description',
              defaultValue:
                "India's premier judiciary coaching platform helping thousands of aspirants achieve their dreams of becoming judicial officers.",
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Telegram', value: 'telegram' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'appLinks',
              type: 'group',
              label: 'App Store Links',
              fields: [
                {
                  name: 'android',
                  type: 'text',
                  label: 'Play Store URL',
                },
                {
                  name: 'ios',
                  type: 'text',
                  label: 'App Store URL',
                },
              ],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'courses',
              type: 'array',
              label: 'Courses',
              fields: [
                link({
                  appearances: false,
                }),
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel',
                },
              },
            },
            {
              name: 'freeResources',
              type: 'array',
              label: 'Free Resources',
              fields: [
                link({
                  appearances: false,
                }),
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel',
                },
              },
            },
            {
              name: 'companyLinks',
              type: 'array',
              label: 'About & Information',
              fields: [
                link({
                  appearances: false,
                }),
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
        {
          label: 'Contact Info',
          name: 'contactInfo',
          fields: [
            {
              name: 'address',
              type: 'textarea',
              defaultValue: '123 Legal District, New Delhi - 110001, India',
            },
            {
              name: 'phone',
              type: 'text',
              defaultValue: '+91 123 456 7890',
            },
            {
              name: 'email',
              type: 'text',
              defaultValue: 'info@aashayeinjudiciary.com',
            },
            {
              name: 'officeHours',
              type: 'textarea',
              defaultValue: 'Mon - Sat: 9:00 AM - 6:00 PM\nSunday: Closed',
            },
          ],
        },
        {
          label: 'Bottom Bar',
          name: 'bottomNav',
          fields: [
            {
              name: 'copyright',
              type: 'text',
              defaultValue: '© 2024 Aashayein Judiciary. All rights reserved.',
              admin: {
                description: 'Use {year} to insert the current year automatically',
              },
            },
            {
              name: 'links',
              type: 'array',
              label: 'Legal Pages',
              fields: [
                link({
                  appearances: false,
                }),
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
