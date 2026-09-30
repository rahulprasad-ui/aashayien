import type { GlobalConfig } from 'payload'

import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'
import { link } from '@/fields/link'
import { LinkBlock } from './blocks/LinkBlock'
import { DropdownBlock } from './blocks/DropdownBlock'
import { MegaMenuBlock } from './blocks/MegaMenuBlock'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: publicReadOrModuleAccess('header'),
    update: moduleAccess('header', 'update'),
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'navigation',
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'blocks',
              blocks: [LinkBlock, DropdownBlock, MegaMenuBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'actions',
          label: 'Actions',
          fields: [
            {
              name: 'actions',
              type: 'array',
              fields: [
                link({
                  appearances: false,
                }),
                {
                  name: 'style',
                  type: 'select',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                  ],
                  defaultValue: 'primary',
                },
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Header/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
        {
          name: 'contactInfo',
          label: 'Contact Info',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Phone Number',
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp Number/Link (Legacy)',
              admin: {
                description: 'Use Social Links instead for new entries.',
              },
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Address (Legacy)',
              admin: {
                description: 'Use Social Links with "Address/Location" instead for new entries.',
              },
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social & Other Links (Icons Only)',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter', value: 'twitter' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Telegram', value: 'telegram' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Link URL',
                  required: true,
                },
              ],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
