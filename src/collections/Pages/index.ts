import type { CollectionConfig } from 'payload'

import { publishedOrModuleAccess } from '../../access/authenticatedOrPublished'
import { moduleAccess } from '../../access/rbac'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { FAQ } from '../../blocks/FAQ/config'
import { ClatPgBlockConfig } from '../../blocks/ClatPgBlock/config'
import { SuccessStoriesBlock } from '../../blocks/SuccessStoriesBlock/config'
import { SectionBlock } from '../../blocks/SectionBlock/config'
import { PostsBlock } from '../../blocks/PostsBlock/config'
import { EventsBlock } from '../../blocks/EventsBlock/config'
import { NotificationsBlock } from '../../blocks/NotificationsBlock/config'
import { CoursesBlock } from '../../blocks/CoursesBlock/config'
import { SliderBlock } from '../../blocks/SliderBlock/config'
import { CustomBlock } from '../../blocks/CustomBlock/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: moduleAccess('pages', 'create'),
    delete: moduleAccess('pages', 'delete'),
    read: publishedOrModuleAccess('pages'),
    update: moduleAccess('pages', 'update'),
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    group: 'Content Management',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
    useAsTitle: 'title',
    components: {
      beforeList: ['@/components/GenericListHeader#GenericListHeader'],
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'showPageTitle',
      type: 'checkbox',
      label: 'Show Page Title on Page',
      defaultValue: true,
      admin: {
        description: 'Toggle ON/OFF to show or hide the page title in the page header.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                SectionBlock,
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                FAQ,
                ClatPgBlockConfig,
                PostsBlock,
                EventsBlock,
                NotificationsBlock,
                CoursesBlock,
                SuccessStoriesBlock,
                SliderBlock,
                CustomBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: false,
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
