import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const SectionBlock: Block = {
  slug: 'sectionBlock',
  interfaceName: 'SectionBlock',
  labels: {
    singular: 'Section',
    plural: 'Sections',
  },
  imageURL: '/block-previews/section.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/section.svg',
    },
  },
  fields: [
    {
      name: 'orderNo',
      type: 'number',
      label: 'Order Number',
      admin: {
        description: 'Order in which this section appears (lowest first)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'textAlignment',
          type: 'select',
          label: 'Text Alignment',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Image Position',
          defaultValue: 'right',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            width: '50%',
            condition: (_, siblingData) => Boolean(siblingData?.image),
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Section Subtitle',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Content',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Section Image',
          admin: { width: '50%' },
        },
        {
          name: 'bgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'bgColor',
      type: 'text',
      label: 'Background Color (Optional)',
      admin: {
        description: 'E.g., #ffffff or rgba(255,255,255,0.5)',
      },
    },
  ],
}
