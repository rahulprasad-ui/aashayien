import { Block } from 'payload'
import { link } from '@/fields/link'

export const LinkBlock: Block = {
  slug: 'link',
  fields: [
    link({
      appearances: false,
    }),
  ],
}
