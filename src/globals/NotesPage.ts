import type { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'

export const NotesPage: GlobalConfig = {
  slug: 'notes-page',
  label: 'Notes & Guides Page',
  access: {
    read: publicReadOrModuleAccess('notes-page'),
    update: moduleAccess('notes-page', 'update'),
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
              fields: [
                {
                  name: 'badgeText',
                  type: 'text',
                  defaultValue: 'Free Study Material',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Notes & Study Guides',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Comprehensive notes and guides prepared by experts to help you excel in judiciary examinations. Download free PDFs covering all important subjects and recent amendments.',
                },
                {
                  name: 'stats',
                  type: 'array',
                  label: 'Hero Stats',
                  minRows: 1,
                  maxRows: 3,
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      label: 'Value (e.g., 100+)',
                      required: true,
                    },
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Label (e.g., Study Notes)',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'enableGating',
              type: 'checkbox',
              label: 'Enable Gating for Downloads',
              defaultValue: false,
            },
            {
              name: 'gatingPopup',
              type: 'relationship',
              relationTo: 'popups',
              label: 'Gating Popup',
              admin: {
                condition: (data) => Boolean(data?.enableGating),
              },
            },
          ],
        },
      ],
    },
  ],
}
