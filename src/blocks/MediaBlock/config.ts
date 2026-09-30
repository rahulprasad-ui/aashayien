import type { Block } from 'payload'
import { imageUploadWithDisplay } from '@/fields/imageDisplaySettings'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  imageURL: '/block-previews/media.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/media.svg',
    },
  },
  fields: [
    ...imageUploadWithDisplay({
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    }),
  ],
}
