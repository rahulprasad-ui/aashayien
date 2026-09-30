import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { revalidateVacancy, revalidateDelete } from './Vacancies/hooks/revalidateVacancy'

export const Vacancies: CollectionConfig = {
  slug: 'vacancies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'tag', 'state'],
    group: 'Academics',
  },
  labels: {
    singular: 'Notification',
    plural: 'Notifications',
  },
  access: {
    create: moduleAccess('vacancies', 'create'),
    delete: moduleAccess('vacancies', 'delete'),
    read: publicReadOrModuleAccess('vacancies'),
    update: moduleAccess('vacancies', 'update'),
  },
  hooks: {
    afterChange: [revalidateVacancy],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Notification Title',
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      label: 'Date (List View)',
      admin: {
        description: 'e.g., 5th Jan 2025 - Shown on the card',
      },
    },
    {
      name: 'tag',
      type: 'select',
      required: true,
      options: [
        { label: 'Vacancy', value: 'Vacancy' },
        { label: 'Syllabus', value: 'Syllabus' },
        { label: 'Important', value: 'Important' },
        { label: 'Result', value: 'Result' },
      ],
      label: 'Tag',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Upcoming', value: 'Upcoming' },
        { label: 'Closed', value: 'Closed' },
      ],
      defaultValue: 'Active',
    },
    {
      name: 'totalVacancies',
      type: 'number',
      label: 'Total Vacancies',
    },
    {
      name: 'salary',
      type: 'text',
      label: 'Salary / Pay Scale',
    },
    {
      name: 'lastDate',
      type: 'text',
      label: 'Last Date (Display)',
    },
    {
      name: 'state',
      type: 'relationship',
      relationTo: 'syllabus-states',
      label: 'Related State',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'officialLinks',
      type: 'group',
      fields: [
        { name: 'notification', type: 'text', label: 'Notification URL' },
        { name: 'apply', type: 'text', label: 'Apply URL' },
        { name: 'officialWebsite', type: 'text', label: 'Official Website URL' },
      ],
    },
    {
      name: 'breakdown',
      type: 'array',
      label: 'Vacancy Breakdown',
      fields: [
        { name: 'category', type: 'text', label: 'Category' },
        { name: 'seats', type: 'number', label: 'Seats' },
      ],
    },
    {
      name: 'importantDates',
      type: 'array',
      label: 'Important Dates',
      fields: [
        { name: 'label', type: 'text', label: 'Event Name' },
        { name: 'date', type: 'text', label: 'Date' },
      ],
    },
    {
      name: 'applicationFee',
      type: 'array',
      label: 'Application Fee',
      fields: [
        { name: 'category', type: 'text', label: 'Category' },
        { name: 'fee', type: 'text', label: 'Fee Amount' },
      ],
    },
    {
      name: 'qualifications',
      type: 'array',
      label: 'Eligibility / Qualifications',
      fields: [{ name: 'point', type: 'text', label: 'Qualification Point' }],
    },
    {
      name: 'pdfUpload',
      type: 'upload',
      relationTo: 'media',
      label: 'Upload PDF Notification',
    },
    // Keep 'link' for backward compatibility or direct download
    {
      name: 'link',
      type: 'text',
      label: 'Download/External Link (Legacy)',
      admin: {
        condition: (data, siblingData) => !siblingData?.officialLinks?.notification,
      },
    },
    // New Fields for Detailed View
    {
      name: 'benefits',
      type: 'array',
      label: 'Other Benefits',
      fields: [
        {
          name: 'benefit',
          type: 'text',
        },
      ],
      admin: {
        description: 'e.g., DA, HRA, Medical Facilities',
      },
    },
    {
      name: 'selectionProcess',
      type: 'array',
      label: 'Selection Process',
      fields: [
        { name: 'stage', type: 'text', label: 'Stage Name (e.g., Prelims)' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'type', type: 'text', label: 'Type (e.g., MCQ, Descriptive)' },
        { name: 'note', type: 'text', label: 'Note/Badge (e.g., Qualifying)' },
      ],
    },
    {
      name: 'howToApply',
      type: 'array',
      label: 'How to Apply Steps',
      fields: [
        {
          name: 'step',
          type: 'textarea',
          label: 'Step Description',
        },
      ],
    },
    {
      name: 'requiredDocuments',
      type: 'array',
      label: 'Required Documents',
      fields: [
        {
          name: 'document',
          type: 'text',
          label: 'Document Name',
        },
      ],
    },
    {
      name: 'importantInstructions',
      type: 'array',
      label: 'Important Instructions',
      fields: [
        {
          name: 'instruction',
          type: 'textarea',
          label: 'Instruction',
        },
      ],
    },
    {
      name: 'additionalLinks',
      type: 'array',
      label: 'Additional Important Links',
      fields: [
        { name: 'title', type: 'text', label: 'Link Title' },
        { name: 'url', type: 'text', label: 'URL' },
      ],
    },
  ],
}
