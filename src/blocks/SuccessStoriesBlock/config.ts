import type { Block } from 'payload'

export const SuccessStoriesBlock: Block = {
  slug: 'successStoriesBlock',
  interfaceName: 'SuccessStoriesBlock',
  labels: {
    singular: 'Success Stories Section',
    plural: 'Success Stories Sections',
  },
  imageURL: '/block-previews/success-stories.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/success-stories.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Our Success Stories',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Subheading (Badge)',
      defaultValue: 'Toppers & Selections',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Section Description',
      defaultValue: 'Meet our shining stars who cleared prestigious Judicial and ADPO examinations.',
    },
    {
      name: 'categoryFilter',
      dbName: 'cat_fltr',
      type: 'select',
      label: 'Category Filter',
      defaultValue: 'all',
      options: [
        { label: 'All Categories', value: 'all' },
        { label: 'Judiciary', value: 'judiciary' },
        { label: 'ADPO', value: 'adpo' },
        { label: 'Mains', value: 'mains' },
        { label: 'Test Series', value: 'test-series' },
        { label: 'Interview', value: 'interview' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy !== 'selection',
      },
    },
    {
      name: 'populateBy',
      dbName: 'pop_by',
      type: 'select',
      label: 'Display Mode',
      defaultValue: 'latest',
      options: [
        { label: 'Top / Rank Wise Stories (Auto)', value: 'latest' },
        { label: 'Specific Selection', value: 'selection' },
      ],
    },
    {
      name: 'selectedStories',
      type: 'relationship',
      relationTo: 'success-stories',
      hasMany: true,
      label: 'Select Specific Success Stories',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Stories to Show',
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
      label: 'View All URL (e.g. /success-stories)',
      defaultValue: '/success-stories',
    },
  ],
}
                                                       


