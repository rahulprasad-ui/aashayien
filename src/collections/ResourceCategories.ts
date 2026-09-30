import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { slugField } from 'payload'

export const ResourceCategories: CollectionConfig = {
  slug: 'resource-categories',
  admin: {
    useAsTitle: 'title',
    group: 'Study Resources',
  },
  access: {
    create: moduleAccess('resource-categories', 'create'),
    delete: moduleAccess('resource-categories', 'delete'),
    read: publicReadOrModuleAccess('resource-categories'),
    update: moduleAccess('resource-categories', 'update'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
  ],
}
