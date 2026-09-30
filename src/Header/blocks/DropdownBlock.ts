import { Block } from 'payload'
import { link } from '@/fields/link'

export const DropdownBlock: Block = {
  slug: 'dropdown',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
