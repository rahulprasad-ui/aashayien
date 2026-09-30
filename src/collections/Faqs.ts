import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { revalidateFaq, revalidateDelete } from './Faqs/hooks/revalidateFaq'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  access: {
    create: moduleAccess('faqs', 'create'),
    delete: moduleAccess('faqs', 'delete'),
    read: publicReadOrModuleAccess('faqs'),
    update: moduleAccess('faqs', 'update'),
  },
  admin: {
    useAsTitle: 'question',
    group: 'Content Management',
    components: {
      beforeList: ['@/components/GenericListHeader#GenericListHeader'],
    },
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Answer',
    },
  ],
  hooks: {
    afterChange: [revalidateFaq],
    afterDelete: [revalidateDelete],
  },
}
