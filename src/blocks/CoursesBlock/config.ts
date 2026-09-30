import type { Block } from 'payload'

export const CoursesBlock: Block = {
  slug: 'coursesBlock',
  interfaceName: 'CoursesBlock',
  labels: {
    singular: 'Courses Section',
    plural: 'Courses Sections',
  },
  imageURL: '/block-previews/courses.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/courses.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Our Courses',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Subheading (Badge)',
      defaultValue: 'Judiciary Preparation',
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
        { label: 'Latest Courses (Auto)', value: 'latest' },
        { label: 'Specific Selection', value: 'selection' },
      ],
    },
    {
      name: 'selectedCourses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      label: 'Select Specific Courses',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Courses to Show',
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
      label: 'View All URL (e.g. /courses)',
      defaultValue: '/courses',
    },
  ],
}
