import { Block } from 'payload'
import { link } from '@/fields/link'

export const MegaMenuBlock: Block = {
  slug: 'mega-menu',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
  ],
}
