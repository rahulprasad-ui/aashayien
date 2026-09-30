import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { imageDisplayFieldName, imageDisplaySettingsField, imageUploadWithDisplay } from '@/fields/imageDisplaySettings'
import { revalidateEvent, revalidateDelete } from './Events/hooks/revalidateEvent'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'seatsAvailable'],
    group: 'Academics',
  },
  access: {
    create: moduleAccess('events', 'create'),
    delete: moduleAccess('events', 'delete'),
    read: publicReadOrModuleAccess('events'),
    update: moduleAccess('events', 'update'),
  },
  hooks: {
    afterChange: [revalidateEvent],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Webinar', value: 'webinar' },
        { label: 'Seminar', value: 'seminar' },
        { label: 'Scholarship Test', value: 'scholarship' },
        { label: 'Workshop', value: 'workshop' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      label: 'Event Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd/M/yyyy',
        },
      },
    },
    {
      name: 'eventDateTime', // Actual date object for sorting
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd/M/yyyy',
        },
      },
    },
    {
      name: 'time',
      type: 'date',
      label: 'Event Time',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm a',
        },
      },
    },
    {
      name: 'host',
      type: 'text',
    },
    {
      name: 'hostTitle',
      type: 'text',
    },
    ...imageUploadWithDisplay({
      name: 'hostImage',
      type: 'upload',
      relationTo: 'media',
    }),
    {
      name: 'seatsAvailable',
      type: 'number',
    },
    {
      name: 'totalSeats',
      type: 'number',
    },
    ...imageUploadWithDisplay({
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    }),
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'fullDescription',
      type: 'richText', // Using default editor
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isOnline',
          type: 'checkbox',
          label: 'Is Online?',
        },
        {
          name: 'isFree',
          type: 'checkbox',
          label: 'Is Free?',
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        condition: (_, siblingData) => !siblingData?.isOnline,
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'agenda',
      type: 'array',
      fields: [
        {
          name: 'time',
          type: 'text',
        },
        {
          name: 'topic',
          type: 'text',
        },
        {
          name: 'speaker',
          type: 'text',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'benefit',
          type: 'text',
        },
      ],
    },
    {
      name: 'registerUrl',
      type: 'text',
      label: 'Registration URL',
    },
    {
      name: 'language',
      type: 'text',
      defaultValue: 'Hindi & English',
    },
    {
      name: 'platform',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.isOnline,
      },
    },
    {
      name: 'prerequisites',
      type: 'text',
    },
    {
      name: 'fees',
      type: 'text',
      admin: {
        condition: (_, siblingData) => !siblingData?.isFree,
      },
    },
    {
      name: 'brochureFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Brochure PDF',
    },
  ],
}
