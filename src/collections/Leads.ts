import type { CollectionConfig } from 'payload'
import { hasModulePermission, isSuperAdmin } from '@/access/rbac'
import { enrollmentEventTypeOptions } from './enrollmentEventTypes'

const canReadUnifiedLeads = ({ req: { user } }: any): boolean => {
  return (
    isSuperAdmin(user) ||
    hasModulePermission(user, 'form-submissions', 'read') ||
    hasModulePermission(user, 'enrollments', 'read')
  )
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  defaultSort: '-createdAt',
  labels: {
    singular: 'Lms dashbaord',
    plural: 'Lms dashbaord',
  },
  admin: {
    group: 'Leads',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'type', 'eventType', 'formType', 'crmStatus', 'status', 'leadDate'],
    description: 'Unified leads synced from dashboard leads and form submissions.',
    listSearchableFields: ['name', 'email', 'phone', 'type', 'eventType', 'formType', 'status'],
  },
  access: {
    create: () => false,
    read: canReadUnifiedLeads,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      index: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      index: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      index: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      required: true,
      index: true,
      options: [
        { label: 'Form', value: 'form' },
        { label: 'Enrollments', value: 'dashboard' },
      ],
    },
    {
      name: 'source',
      type: 'select',
      label: 'Source',
      required: true,
      index: true,
      admin: {
        hidden: true,
      },
      options: [
        { label: 'Form', value: 'form' },
        { label: 'Dashboard', value: 'dashboard' },
      ],
    },
    {
      name: 'sourceId',
      type: 'text',
      label: 'Source ID',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'eventType',
      type: 'select',
      label: 'Event Type',
      index: true,
      admin: {
        description: 'Enrollment event type for LMS dashboard filters.',
      },
      options: [...enrollmentEventTypeOptions],
    },
    {
      name: 'formType',
      type: 'text',
      label: 'Form / Course',
      index: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Form',
      index: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'form',
      },
    },
    {
      name: 'status',
      type: 'text',
      label: 'Status',
      index: true,
    },
    {
      name: 'leadDate',
      type: 'date',
      label: 'Date',
      index: true,
      admin: {
        date: {
          displayFormat: 'dd MMM yyyy HH:mm',
        },
      },
    },
    {
      name: 'crmStatus',
      type: 'text',
      label: 'CRM Status',
      index: true,
      admin: {
        description: 'Status of TeleCRM push and transaction verification',
      },
    },
    {
      name: 'crmRequestId',
      type: 'text',
      label: 'TeleCRM Request ID',
      index: true,
      admin: {
        description: 'Unique TeleCRM API Gateway transaction ID',
      },
    },
    {
      name: 'rawData',
      type: 'json',
      label: 'Complete Information',
    },
  ],
}
