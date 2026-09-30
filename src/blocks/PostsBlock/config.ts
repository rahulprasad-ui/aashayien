import type { Block } from 'payload'

export const PostsBlock: Block = {
  slug: 'postsBlock',
  interfaceName: 'PostsBlock',
  labels: {
    singular: 'Posts / Blog Section',
    plural: 'Posts / Blog Sections',
  },
  imageURL: '/block-previews/posts.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/posts.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Latest Articles',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Subheading (Badge)',
      defaultValue: 'Blog & Articles',
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
        { label: 'Latest Posts (Auto)', value: 'latest' },
        { label: 'Specific Selection', value: 'selection' },
      ],
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Select Specific Posts / Articles',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Posts to Show',
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
      label: 'View All URL (e.g. /blog)',
      defaultValue: '/blog',
    },
  ],
}
