import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'

import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'

const webpFormatOptions = {
  format: 'webp',
  options: {
    effort: 4,
    quality: 82,
  },
} as const

export const Media: CollectionConfig = {
  slug: 'media',
  // folders: true,
  access: {
    create: moduleAccess('media', 'create'),
    delete: moduleAccess('media', 'delete'),
    read: publicReadOrModuleAccess('media'),
    update: moduleAccess('media', 'update'),
  },
  admin: {
    group: 'Content Management',
    components: {
      beforeList: ['@/components/GenericListHeader#GenericListHeader'],
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      admin: {
        description:
          'Describe the image for accessibility and SEO. Leave empty only for decorative images.',
      },
    },
    {
      name: 'displaySize',
      type: 'select',
      label: 'Image Size / Usage',
      hasMany: true,
      admin: {
        hidden: true,
        description: 'Is image ka intended use kya hai? (multiple select kar sakte ho)',
        position: 'sidebar',
      },
      options: [
        {
          label: '🖼️ Thumbnail (300px) — Cards, Lists',
          value: 'thumbnail',
        },
        {
          label: '⬛ Square (500×500px) — Profile, Icons',
          value: 'square',
        },
        {
          label: '📱 Small (600px) — Mobile Hero',
          value: 'small',
        },
        {
          label: '💻 Medium (900px) — Blog, Content',
          value: 'medium',
        },
        {
          label: '🖥️ Large (1400px) — Desktop Banner',
          value: 'large',
        },
        {
          label: '📺 XLarge (1920px) — Full Width Hero',
          value: 'xlarge',
        },
        {
          label: '🔗 OG Image (1200×630px) — Social Share',
          value: 'og',
        },
        {
          label: '🌐 All Sizes',
          value: 'all',
        },
      ],
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(process.cwd(), 'public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    formatOptions: webpFormatOptions,
    resizeOptions: {
      withoutEnlargement: true,
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        formatOptions: webpFormatOptions,
        withoutEnlargement: true,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        formatOptions: webpFormatOptions,
        withoutEnlargement: true,
      },
      {
        name: 'small',
        width: 600,
        formatOptions: webpFormatOptions,
        withoutEnlargement: true,
      },
      {
        name: 'medium',
        width: 900,
        formatOptions: webpFormatOptions,
        withoutEnlargement: true,
      },
      {
        name: 'large',
        width: 1400,
        formatOptions: webpFormatOptions,
        withoutEnlargement: true,
      },
      {
        name: 'xlarge',
        width: 1920,
        formatOptions: webpFormatOptions,
        withoutEnlargement: true,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        formatOptions: webpFormatOptions,
        withoutEnlargement: true,
      },
    ],
  },
}
