import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { revalidateNote, revalidateDelete } from './Notes/hooks/revalidateNote'

export const Notes: CollectionConfig = {
  slug: 'notes',
  labels: {
    singular: 'Note',
    plural: 'Notes',
  },
  access: {
    create: moduleAccess('notes', 'create'),
    delete: moduleAccess('notes', 'delete'),
    read: publicReadOrModuleAccess('notes'),
    update: moduleAccess('notes', 'update'),
  },
  hooks: {
    afterChange: [revalidateNote],
    afterDelete: [revalidateDelete],
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
      type: 'relationship',
      relationTo: 'resource-categories',
      required: true,
      admin: {
        description: 'Select category from Resource Categories',
      },
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
      label: 'Note File (PDF)',
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
      name: 'downloadCount',
      type: 'number',
      label: 'Download Count', // Could be manual for now to match design
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
