import type { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'

export const PreviousYearQuestionsPage: GlobalConfig = {
  slug: 'previous-year-questions-page',
  label: 'Previous Year Questions',
  access: {
    read: publicReadOrModuleAccess('previous-year-questions-page'),
    update: moduleAccess('previous-year-questions-page', 'update'),
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
                  defaultValue: 'Free Question Papers',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Previous Year Questions',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Download previous year question papers from various judiciary examinations across India. Practice with authentic papers to understand exam patterns and improve your preparation.',
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
                      label: 'Value (e.g., 50+)',
                      required: true,
                    },
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Label (e.g., Question Papers)',
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
