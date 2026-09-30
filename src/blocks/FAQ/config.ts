import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  imageURL: '/block-previews/faq.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/faq.svg',
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          admin: {
            width: '60%',
          },
        },
        {
          name: 'titleAlignment',
          type: 'select',
          label: 'Title Alignment',
          defaultValue: 'left',
          options: [
            { label: 'Left aligned', value: 'left' },
            { label: 'Center aligned', value: 'center' },
            { label: 'Right aligned', value: 'right' },
          ],
          admin: {
            width: '40%',
          },
        },
      ],
    },
    {
      name: 'selectedFaqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      label: 'Select FAQs from Collection',
    },
    {
      name: 'questions',
      type: 'array',
      label: 'Custom Questions & Answers (Optional)',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
