import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { defaultLexical } from '../../fields/defaultLexical'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'

// Block imports
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { FAQ } from '../../blocks/FAQ/config'
import { ClatPgBlockConfig } from '../../blocks/ClatPgBlock/config'
import { SectionBlock } from '../../blocks/SectionBlock/config'
import { PostsBlock } from '../../blocks/PostsBlock/config'
import { EventsBlock } from '../../blocks/EventsBlock/config'
import { NotificationsBlock } from '../../blocks/NotificationsBlock/config'
import { CoursesBlock } from '../../blocks/CoursesBlock/config'
import { SliderBlock } from '../../blocks/SliderBlock/config'
import { CustomBlock } from '../../blocks/CustomBlock/config'
import { SuccessStoriesBlock } from '../../blocks/SuccessStoriesBlock/config'

export const DynamicPages: CollectionConfig = {
  slug: 'dynamic-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content Management',
    components: {
      beforeList: ['@/components/GenericListHeader#GenericListHeader'],
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
      validate: false, // Allows saving drafts with validation errors
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'showPageTitle',
      type: 'checkbox',
      label: 'Show Page Title on Page',
      defaultValue: true,
      admin: {
        description: 'Toggle ON/OFF to show or hide the page title heading on the page hero/header.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pageSubtitle',
      type: 'text',
      label: 'Page Subtitle',
    },
    {
      name: 'pageDescription',
      type: 'richText',
      editor: defaultLexical,
      label: 'Page Description',
    },
    {
      name: 'pageImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Page Image',
    },
    {
      name: 'pageBgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Page Background Image',
    },
    {
      name: 'enablePageButton',
      type: 'checkbox',
      label: 'Enable Button in Page Title / Hero Section',
      defaultValue: false,
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.enablePageButton),
      },
      fields: [
        {
          name: 'pageButtonText',
          type: 'text',
          label: 'Button Text (e.g. Enroll Now)',
          defaultValue: 'Enroll Now',
          admin: { width: '50%' },
        },
        {
          name: 'pageButtonLink',
          type: 'text',
          label: 'Button Link / URL (e.g. /courses or https://...)',
          admin: { width: '50%' },
        },
      ],
    },
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
        // New content blocks
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
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
