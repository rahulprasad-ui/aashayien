import type { CollectionConfig } from 'payload'

import { moduleAccess } from '@/access/rbac'
import { schemaTemplateFields } from '@/seo/structuredData/fields'

export const SchemaTemplates: CollectionConfig = {
  slug: 'schema-templates',
  labels: {
    singular: 'Schema Template',
    plural: 'Schema Templates',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Settings',
    defaultColumns: ['title', 'key', 'schemaType', 'mode', 'enabled'],
  },
  access: {
    create: moduleAccess('schema-templates', 'create'),
    delete: moduleAccess('schema-templates', 'delete'),
    read: moduleAccess('schema-templates', 'read'),
    update: moduleAccess('schema-templates', 'update'),
  },
  fields: schemaTemplateFields(),
}
