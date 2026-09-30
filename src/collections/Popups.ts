import type { CollectionConfig } from 'payload'
import { revalidateTag, revalidatePath } from 'next/cache'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const Popups: CollectionConfig = {
  slug: 'popups',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'updatedAt'],
    group: 'Marketing',
  },
  access: {
    read: publicReadOrModuleAccess('popups'),
    create: moduleAccess('popups', 'create'),
    update: moduleAccess('popups', 'update'),
    delete: moduleAccess('popups', 'delete'),
  },
  hooks: {
    afterChange: [
      () => {
        revalidateTag('popups_active')
        revalidatePath('/', 'layout')
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('popups_active')
        revalidatePath('/', 'layout')
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      validate: (value: string | null | undefined) => {
        if (!value || !value.trim()) {
          return 'Title is required'
        }
        return true
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      validate: (value: string | null | undefined) => {
        if (!value || !value.trim()) {
          return 'Description is required'
        }
        return true
      },
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'md',
      options: [
        {
          label: 'Medium',
          value: 'md',
        },
        {
          label: 'Large',
          value: 'lg',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Top',
          value: 'top',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Attached Form',
      required: true,
    },
    {
      name: 'displayRules',
      type: 'group',
      label: 'Display Rules',
      fields: [
        {
          name: 'condition',
          type: 'select',
          defaultValue: 'all',
          options: [
            {
              label: 'Show on all pages',
              value: 'all',
            },
            {
              label: 'Home page only',
              value: 'home',
            },
            {
              label: 'Specific path',
              value: 'path',
            },
          ],
        },
        {
          name: 'path',
          type: 'text',
          label: 'Specific Path (e.g. /courses)',
          admin: {
            condition: (_, { condition }) => condition === 'path',
          },
          validate: (value: string | null | undefined, { siblingData }: any) => {
            if (siblingData?.condition === 'path' && (!value || !value.trim())) {
              return 'Path is required when condition is Specific path'
            }
            return true
          },
        },
        {
          name: 'frequency',
          type: 'select',
          label: 'Frequency',
          defaultValue: 'once',
          options: [
            {
              label: 'Once Forever',
              value: 'once',
            },
            {
              label: 'Once Per Session',
              value: 'session',
            },
            {
              label: 'Always (Every Page Load)',
              value: 'always',
            },
          ],
        },
        {
          name: 'triggerType',
          type: 'select',
          label: 'Trigger Type',
          defaultValue: 'delay',
          options: [
            {
              label: 'Timed Delay',
              value: 'delay',
            },
            {
              label: 'Scroll Percentage',
              value: 'scroll',
            },
            {
              label: 'Exit Intent',
              value: 'exit',
            },
          ],
        },
        {
          name: 'delay',
          type: 'number',
          label: 'Delay (seconds)',
          defaultValue: 4,
          min: 0,
          admin: {
            condition: (_, { triggerType }) => triggerType === 'delay',
          },
        },
        {
          name: 'scrollPercentage',
          type: 'number',
          label: 'Scroll Percentage (0-100)',
          defaultValue: 50,
          min: 0,
          max: 100,
          admin: {
            condition: (_, { triggerType }) => triggerType === 'scroll',
          },
        },
      ],
    },
  ],
}
