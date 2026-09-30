import type { Block } from 'payload'

export const NotificationsBlock: Block = {
  slug: 'notificationsBlock',
  interfaceName: 'NotificationsBlock',
  labels: {
    singular: 'Notifications Section',
    plural: 'Notifications Sections',
  },
  imageURL: '/block-previews/notifications.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/notifications.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Notifications & Updates',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Subheading (Badge)',
      defaultValue: 'Latest Updates',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Section Description',
    },
    {
      name: 'showVacancies',
      type: 'checkbox',
      label: 'Show Vacancies / Notifications',
      defaultValue: true,
    },
    {
      name: 'showSyllabus',
      type: 'checkbox',
      label: 'Show Syllabus Downloads',
      defaultValue: true,
    },
    {
      name: 'showEvents',
      type: 'checkbox',
      label: 'Show Events Column',
      defaultValue: true,
    },
    {
      name: 'populateBy',
      type: 'select',
      label: 'Display Mode',
      defaultValue: 'latest',
      options: [
        { label: 'Latest Items (Auto)', value: 'latest' },
        { label: 'Specific Selection', value: 'selection' },
      ],
    },
    {
      name: 'selectedVacancies',
      type: 'relationship',
      relationTo: 'vacancies',
      hasMany: true,
      label: 'Select Specific Vacancies / Notifications',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection' && siblingData?.showVacancies !== false,
      },
    },
    {
      name: 'selectedSyllabuses',
      type: 'relationship',
      relationTo: 'syllabus-states',
      hasMany: true,
      label: 'Select Specific Syllabus States',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection' && siblingData?.showSyllabus !== false,
      },
    },
    {
      name: 'selectedEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      label: 'Select Specific Events',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection' && siblingData?.showEvents !== false,
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Items per Column',
      defaultValue: 5,
      min: 1,
      max: 20,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy !== 'selection',
      },
    },
  ],
}
