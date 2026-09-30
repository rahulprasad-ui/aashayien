import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CustomBlock: Block = {
  slug: 'customBlock',
  interfaceName: 'CustomBlock',
  labels: {
    singular: 'Custom Content / HTML',
    plural: 'Custom Content / HTML Blocks',
  },
  imageURL: '/block-previews/custom.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/custom.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading (Optional)',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Badge / Subheading (Optional)',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Rich Text Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'rawHtml',
      type: 'textarea',
      label: 'Custom HTML / Embed Code (Optional)',
      admin: {
        description:
          'Paste raw HTML, iframes, or embed codes here. This will be rendered as-is. Use with caution.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color',
          defaultValue: '#ffffff',
          admin: {
            width: '50%',
            description: 'E.g., #f9fafb or rgba(0,0,0,0.05)',
          },
        },
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
      ],
    },
    {
      name: 'paddingTop',
      type: 'select',
      label: 'Padding Top',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      name: 'paddingBottom',
      type: 'select',
      label: 'Padding Bottom',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
  ],
}
