import type { CollectionConfig } from 'payload'

import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: moduleAccess('categories', 'create'),
    delete: moduleAccess('categories', 'delete'),
    read: publicReadOrModuleAccess('categories'),
    update: moduleAccess('categories', 'update'),
  },
  admin: {
    useAsTitle: 'title',
    components: {
      beforeList: ['@/components/GenericListHeader#GenericListHeader'],
    },
    group: 'Content Management',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'group',
      type: 'select',
      options: [
        { label: 'Blogs', value: 'blogs' },
        { label: 'Weekly / Monthly Current Affair', value: 'current-affairs' },
        { label: 'Judgments', value: 'judgments' },
      ],
      label: 'Group',
      defaultValue: 'blogs',
    },
    slugField({
      position: undefined,
    }),
  ],
}
