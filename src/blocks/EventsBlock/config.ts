import type { Block } from 'payload'

export const EventsBlock: Block = {
  slug: 'eventsBlock',
  interfaceName: 'EventsBlock',
  labels: {
    singular: 'Events Section',
    plural: 'Events Sections',
  },
  imageURL: '/block-previews/events.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/events.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Subheading (Badge)',
      defaultValue: 'Events & Webinars',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Section Description',
    },
    {
      name: 'populateBy',
      type: 'select',
      label: 'Display Mode',
      defaultValue: 'latest',
      options: [
        { label: 'Latest Events (Auto)', value: 'latest' },
        { label: 'Specific Selection', value: 'selection' },
      ],
    },
    {
      name: 'selectedEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      label: 'Select Specific Events',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Events to Show',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy !== 'selection',
      },
    },
    {
      name: 'viewAllLink',
      type: 'text',
      label: 'View All URL (e.g. /events)',
      defaultValue: '/events',
    },
  ],
}
