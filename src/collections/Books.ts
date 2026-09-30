import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { revalidateBook, revalidateDelete } from './Books/hooks/revalidateBook'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'price', 'isFree'],
    group: 'Study Resources',
  },
  access: {
    create: moduleAccess('books', 'create'),
    delete: moduleAccess('books', 'delete'),
    read: publicReadOrModuleAccess('books'),
    update: moduleAccess('books', 'update'),
  },
  hooks: {
    afterChange: [revalidateBook],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                position: 'sidebar',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return data.title
                        .toLowerCase()
                        .replace(/ /g, '-')
                        .replace(/[^\w-]+/g, '')
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'author',
              type: 'text',
              required: true,
            },
            {
              name: 'category',
              type: 'select',
              options: [
                { label: 'Criminal Law', value: 'criminal-law' },
                { label: 'Civil Law', value: 'civil-law' },
                { label: 'Constitutional Law', value: 'constitution' },
                { label: 'Mains Answer Writing', value: 'mains' },
                { label: 'Current Affairs', value: 'current-affairs' },
                { label: 'State-Specific', value: 'state-specific' },
                { label: 'Free E-books', value: 'free' },
              ],
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'longDescription',
              type: 'textarea', // Changed to textarea for now since the UI uses it as a block of text
              label: 'Long Description (About This Book)',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'isFree',
              type: 'checkbox',
              defaultValue: false,
              label: 'Is this a free book?',
            },
            {
              name: 'buyLink',
              type: 'text',
              label: 'Buy Link (Amazon, Flipkart, etc.)',
              admin: {
                description: 'Full URL for external purchasing',
              },
            },
            {
              name: 'tags',
              type: 'array',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                },
              ],
            },
            {
              name: 'supportWhatsApp',
              type: 'text',
              label: 'Support WhatsApp Number',
              defaultValue: '919111198177',
              admin: {
                description: 'Format: 91XXXXXXXXXX (without +)',
              },
            },
          ],
        },
        {
          label: 'Pricing & Rating',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'text',
                  label: 'Price Label (e.g. ₹599)',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'originalPrice',
                  type: 'text',
                  label: 'Original Price Label (e.g. ₹999)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'priceValue',
              type: 'number',
              label: 'Price Value (for filtering)',
              required: true,
              defaultValue: 0,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'rating',
                  type: 'number',
                  admin: { width: '50%' },
                  defaultValue: 4.8,
                },
                {
                  name: 'reviews',
                  type: 'number',
                  admin: { width: '50%' },
                  defaultValue: 0,
                },
              ],
            },
          ],
        },
        {
          label: 'Specifications',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'pages', type: 'number', admin: { width: '50%' } },
                { name: 'language', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'edition', type: 'text', admin: { width: '50%' } },
                { name: 'isbn', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'publisher', type: 'text', admin: { width: '50%' } },
                { name: 'publicationDate', type: 'date', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'format', type: 'text', admin: { width: '50%' } },
                { name: 'fileSize', type: 'text', admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Key Features',
              fields: [{ name: 'feature', type: 'text' }],
            },
            {
              name: 'tableOfContents',
              type: 'array',
              label: 'Table of Contents',
              fields: [
                { name: 'chapter', type: 'text', required: true },
                { name: 'pages', type: 'text' },
                {
                  name: 'topics',
                  type: 'array',
                  fields: [{ name: 'topic', type: 'text' }],
                },
              ],
            },
            {
              name: 'whatYouWillLearn',
              type: 'array',
              fields: [{ name: 'item', type: 'text' }],
            },
            {
              name: 'requirements',
              type: 'array',
              fields: [{ name: 'item', type: 'text' }],
            },
            {
              name: 'targetAudience',
              type: 'array',
              fields: [{ name: 'item', type: 'text' }],
            },
            {
              name: 'whyChooseThisBook',
              type: 'array',
              label: 'Why Choose This Book Points',
              fields: [{ name: 'point', type: 'text' }],
            },
            {
              name: 'guarantees',
              type: 'array',
              label: 'Book Guarantees (e.g. Free Delivery)',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Truck', value: 'truck' },
                    { label: 'Shield', value: 'shield' },
                    { label: 'Clock', value: 'clock' },
                    { label: 'Check', value: 'check' },
                  ],
                },
                { name: 'text', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Author Info',
          fields: [
            {
              name: 'authorBio',
              type: 'textarea',
            },
            {
              name: 'authorImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Reviews',
          fields: [
            {
              name: 'studentReviews',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'achievement', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'rating', type: 'number', defaultValue: 5 },
                { name: 'comment', type: 'textarea' },
                { name: 'date', type: 'date' },
              ],
            },
          ],
        },
        {
          label: 'Related',
          fields: [
            {
              name: 'relatedBooks',
              type: 'relationship',
              relationTo: 'books',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}
