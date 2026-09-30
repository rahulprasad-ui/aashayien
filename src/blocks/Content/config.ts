import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'contentType',
    type: 'select',
    defaultValue: 'richText',
    label: 'Column Content Type',
    options: [
      { label: 'Rich Text', value: 'richText' },
      { label: 'Blog Posts / Articles', value: 'posts' },
      { label: 'Events & Webinars', value: 'events' },
      { label: 'Courses', value: 'courses' },
      { label: 'Notifications / Vacancies', value: 'notifications' },
      { label: 'Media (Image / Video)', value: 'media' },
      { label: 'Form', value: 'form' },
    ],
  },
  {
    name: 'sectionTitle',
    type: 'text',
    label: 'Section / Column Heading (Optional)',
    admin: {
      description: 'Custom heading for this column (e.g. "Judiciary Foundation Course", "Latest Updates")',
    },
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
    admin: {
      condition: (_, siblingData) => !siblingData?.contentType || siblingData?.contentType === 'richText',
    },
  },
  {
    type: 'row',
    fields: [
      {
        name: 'limit',
        type: 'number',
        defaultValue: 3,
        label: 'Item Limit',
        admin: {
          width: '50%',
          condition: (_, siblingData) =>
            ['posts', 'events', 'courses', 'notifications'].includes(siblingData?.contentType),
          description: 'Number of items to show in this column (default: 3)',
        },
      },
      {
        name: 'viewAllLabel',
        type: 'text',
        label: 'Button / Link Label',
        defaultValue: 'View All',
        admin: {
          width: '50%',
          condition: (_, siblingData) =>
            ['posts', 'events', 'courses', 'notifications'].includes(siblingData?.contentType),
          description: 'Editable label for the button (e.g. "View All", "Explore Courses")',
        },
      },
    ],
  },
  {
    name: 'customViewAllLink',
    type: 'text',
    label: 'Custom Button Target URL (Optional)',
    admin: {
      condition: (_, siblingData) =>
        ['posts', 'events', 'courses', 'notifications'].includes(siblingData?.contentType),
      description: 'Override default link target (e.g. "/courses" or "https://...")',
    },
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    label: 'Media File',
    admin: {
      condition: (_, siblingData) => siblingData?.contentType === 'media',
    },
  },
  {
    name: 'form',
    type: 'relationship',
    relationTo: 'forms',
    label: 'Form',
    admin: {
      condition: (_, siblingData) => siblingData?.contentType === 'form',
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Enable Button / Link',
    admin: {
      condition: (_, siblingData) => !siblingData?.contentType || siblingData?.contentType === 'richText',
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return (
            Boolean(siblingData?.enableLink) &&
            (!siblingData?.contentType || siblingData?.contentType === 'richText')
          )
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  imageURL: '/block-previews/content.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/content.svg',
    },
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
