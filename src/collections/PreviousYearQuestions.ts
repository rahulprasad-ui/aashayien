import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'

export const PreviousYearQuestions: CollectionConfig = {
  slug: 'previous-year-questions',
  labels: {
    singular: 'Previous Year Question',
    plural: 'Previous Year Questions',
  },
  access: {
    create: moduleAccess('previous-year-questions', 'create'),
    delete: moduleAccess('previous-year-questions', 'delete'),
    read: publicReadOrModuleAccess('previous-year-questions'),
    update: moduleAccess('previous-year-questions', 'update'),
  },
  admin: {
    useAsTitle: 'title',
    group: 'Study Resources',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Prelims', value: 'prelims' },
        { label: 'Mains', value: 'mains' },
        { label: 'State Judiciary', value: 'state-judiciary' },
        { label: 'Higher Judiciary', value: 'higher-judiciary' },
        { label: 'ADPO', value: 'adpo' },
        { label: 'Interview', value: 'interview' },
      ],
    },
    {
      name: 'examName',
      type: 'text',
      label: 'Exam Name',
    },
    {
      name: 'year',
      type: 'text',
      label: 'Year',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Question Paper File (PDF)',
    },
    {
      name: 'externalDownloadLink',
      type: 'text',
      label: 'External Download Link (Optional)',
      admin: {
        description: 'If provided, this link will be used instead of the uploaded file.',
      },
    },
    {
      name: 'pages',
      type: 'number',
      label: 'Page Count',
    },
    {
      name: 'downloads',
      type: 'number',
      label: 'Download Count',
      defaultValue: 0,
    },
    {
      name: 'uploadDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'isFree',
      type: 'checkbox',
      label: 'Is Free',
      defaultValue: true,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}
