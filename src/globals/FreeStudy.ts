import { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'
import { imageDisplayFieldName, imageDisplaySettingsField, imageUploadWithDisplay } from '@/fields/imageDisplaySettings'
import { revalidateHome } from '@/Home/hooks/revalidateHome'

export const FreeStudy: GlobalConfig = {
  slug: 'free-study',
  label: 'Free Resources',
  access: {
    read: publicReadOrModuleAccess('free-study'),
    update: moduleAccess('free-study', 'update'),
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
              name: 'badgeText',
              type: 'text',
              defaultValue: 'Free Study Resources',
            },
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Free Study Online',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue:
                'Access our complete library of free video lectures, case law analysis, study tips, and expert guidance for judiciary exam preparation by Nitesh Pahuja Sir.',
            },
          ],
        },
        {
          label: 'Pan India Section',
          fields: [
            {
              name: 'enablePanIndiaSection',
              type: 'checkbox',
              label: 'Enable Pan India Section',
              defaultValue: true,
            },
            {
              name: 'panIndiaCTA',
              type: 'group',
              label: 'CTA Panel (e.g. Access All Playlists)',
              admin: {
                condition: (_, siblingData) => siblingData?.enablePanIndiaSection,
              },
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Access All Playlists' },
                { name: 'description', type: 'textarea', defaultValue: 'State-wise organized lectures for every judiciary exam' },
                { name: 'buttonText', type: 'text', defaultValue: 'View Details' },
                { name: 'buttonUrl', type: 'text', defaultValue: 'https://www.youtube.com/@AashayeinJudiciary' },
              ]
            },
            {
              name: 'panIndiaBadgeText',
              type: 'text',
              defaultValue: 'Coverage',
              label: 'Badge Text (e.g. Coverage)',
            },
            {
              name: 'panIndiaTitle',
              type: 'text',
              defaultValue: 'Pan India Reach',
            },
            {
              name: 'panIndiaSubtitle',
              type: 'text',
              defaultValue: 'From Himalayas to Coastlines',
            },
            {
              name: 'panIndiaDescription',
              type: 'textarea',
              defaultValue:
                'Comprehensive judiciary exam preparation across 14+ Indian states with state-specific syllabus, local laws, and expert guidance from Nitesh Pahuja Sir.',
            },
            {
              name: 'panIndiaBackground',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
            },
            imageDisplaySettingsField({
              name: imageDisplayFieldName('panIndiaBackground'),
              label: 'Background Image Display Settings',
            }),
            {
              name: 'panIndiaStats',
              type: 'group',
              fields: [
                { name: 'statesCount', type: 'text', defaultValue: '14+' },
                { name: 'videosCount', type: 'text', defaultValue: '1000+' },
                { name: 'viewsCount', type: 'text', defaultValue: '10M+' },
              ],
            },
            {
              name: 'featuredStates',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'abbr', type: 'text', required: true, label: 'Abbreviation (e.g. UP)' },
                { name: 'code', type: 'text', label: 'Exam Code (e.g. UPPCS-J)' },
                ...imageUploadWithDisplay({
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                }),
                {
                  name: 'color',
                  type: 'text',
                  defaultValue: 'from-slate-900 to-slate-800',
                  admin: {
                    description: 'Tailwind gradient classes (e.g. from-slate-900 to-slate-800)',
                  },
                },
              ],
            },
            {
              name: 'enableOtherStates',
              type: 'checkbox',
              label: 'Enable Other States Section',
              defaultValue: true,
            },
            {
              name: 'otherStatesTitle',
              type: 'text',
              defaultValue: 'More States Covered',
              admin: {
                condition: (_, siblingData) => siblingData?.enableOtherStates,
              },
            },
            {
              name: 'otherStates',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'abbr', type: 'text', required: true },
              ],
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Book (Local Laws)', value: 'book' },
                    { label: 'Scale (Judgments)', value: 'scale' },
                    { label: 'Document (Patterns)', value: 'document' },
                  ],
                  defaultValue: 'book',
                },
              ],
            },
          ],
        },
        {
          label: 'Brochure CTA',
          fields: [
            {
              name: 'brochureFile',
              type: 'upload',
              relationTo: 'media',
              label: 'Brochure File',
            },
            {
              name: 'buttonText',
              type: 'text',
              defaultValue: 'Download Brochure',
            },
            {
              name: 'enableGating',
              type: 'checkbox',
              label: 'Enable Lead Form for Download',
              defaultValue: true,
            },
            {
              name: 'gatingPopup',
              type: 'relationship',
              relationTo: 'popups',
              label: 'Lead Generation Popup',
              admin: {
                condition: (_, siblingData) => siblingData?.enableGating,
              },
            },
          ],
        },
      ],
    },
  ],
}
