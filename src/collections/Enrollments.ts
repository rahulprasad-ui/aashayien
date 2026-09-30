import type { CollectionConfig } from 'payload'
import { moduleAccess, publicCreateOrModuleAccess } from '../access/rbac'
import { deleteEnrollmentLead, syncEnrollmentLead } from '@/hooks/syncUnifiedLeads'
import { enrollmentEventTypeOptions } from './enrollmentEventTypes'
// import { sendLeadToCRM } from '../hooks/sendLeadToCRM'

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'eventType', 'courseName', 'logDate'],
    group: 'Academics',
  },
  access: {
    create: publicCreateOrModuleAccess('enrollments'),
    read: moduleAccess('enrollments', 'read'),
    update: moduleAccess('enrollments', 'update'),
    delete: moduleAccess('enrollments', 'delete'),
  },
  hooks: {
    afterChange: [syncEnrollmentLead],
    afterDelete: [deleteEnrollmentLead],
    // afterChange: [sendLeadToCRM],
  },
  fields: [
    {
      name: 'eventType',
      type: 'select',
      index: true,
      admin: {
        description: 'Type of event (e.g. USER_SIGNS_UP_ON_THE_APP)',
      },
      options: [...enrollmentEventTypeOptions],
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Student Name',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Student Email',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      admin: {
        description: 'Student Phone Number',
      },
    },
    {
      name: 'courseName',
      type: 'text',
      admin: {
        description: 'Course Name',
      },
    },
    {
      name: 'leadType',
      type: 'text',
      admin: {
        description: 'Type of lead',
      },
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Source of the data',
      },
    },
    {
      name: 'logDate',
      type: 'date',
      admin: {
        description: 'Date of the event',
      },
    },
  ],
}
