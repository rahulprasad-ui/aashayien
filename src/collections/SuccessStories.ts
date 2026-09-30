import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { imageUploadWithDisplay } from '@/fields/imageDisplaySettings'
import {
  revalidateSuccessStory,
  revalidateDelete,
} from './SuccessStories/hooks/revalidateSuccessStory'

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rank', 'exam', 'year', 'state'],
    group: 'Academics',

    components: {
      beforeList: ['@/components/SuccessStoriesListHeader#SuccessStoriesListHeader'],
    },
    preview: (doc) => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/success-stories/${doc.slug}`
    },
  },
  access: {
    create: moduleAccess('success-stories', 'create'),
    delete: moduleAccess('success-stories', 'delete'),
    read: publicReadOrModuleAccess('success-stories'),
    update: moduleAccess('success-stories', 'update'),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Story Details',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: {
                position: 'sidebar',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.name) {
                      return data.name
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
              name: 'category',
              type: 'select',
              options: [
                { label: 'Judiciary', value: 'judiciary' },
                { label: 'ADPO', value: 'adpo' },
                { label: 'Mains', value: 'mains' },
                { label: 'Test Series', value: 'test-series' },
                { label: 'Interview', value: 'interview' },
              ],
              required: true,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'achievement',
              type: 'text',
              label: 'Achievement (e.g. UPPCS-J 2024)',
            },
            {
              name: 'views',
              type: 'number',
              label: 'Views',
              defaultValue: 0,
              admin: {
                position: 'sidebar',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'rank',
                  type: 'number',
                  label: 'Rank (Number for sorting)',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'rankDisplay',
                  type: 'text',
                  label: 'Rank Display (e.g. AIR 12)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'year',
                  type: 'number',
                  label: 'Year',
                  admin: { width: '50%' },
                },
                {
                  name: 'exam',
                  type: 'text',
                  label: 'Exam Name',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'state',
              type: 'select',
              options: [
                'Uttar Pradesh',
                'Madhya Pradesh',
                'Bihar',
                'Rajasthan',
                'Delhi',
                'Maharashtra',
                'Gujarat',
                'Punjab',
                'Haryana',
                'Uttarakhand',
                'Jharkhand',
                'Chhattisgarh',
                'All States',
              ],
              admin: {
                position: 'sidebar',
              },
            },
            ...imageUploadWithDisplay({
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            }),
            {
              name: 'videoUrl',
              type: 'text',
              label: 'Video URL (YouTube)',
            },
            {
              type: 'group',
              name: 'studentInfo',
              label: 'Student Information',
              fields: [
                {
                  name: 'currentPosition',
                  type: 'text',
                  label: 'Current Position',
                },
                {
                  name: 'location',
                  type: 'text',
                  label: 'Location',
                },
                {
                  name: 'education',
                  type: 'text',
                  label: 'Education',
                },
              ],
            },
            {
              type: 'group',
              name: 'journey',
              label: 'Journey Overview',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'totalAttempts',
                      type: 'number',
                      label: 'Total Attempts',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'preparationDuration',
                      type: 'text',
                      label: 'Preparation Duration',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'batchYear',
                      type: 'text',
                      label: 'Batch Year',
                      admin: { width: '33%' },
                    },
                  ],
                },
                {
                  name: 'enrolledCourses',
                  type: 'relationship',
                  relationTo: 'courses',
                  hasMany: true,
                  label: 'Enrolled Courses (System)',
                },
                {
                  name: 'customCourses',
                  type: 'array',
                  label: 'Custom Courses (Manual Entry)',
                  fields: [
                    {
                      name: 'courseName',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              type: 'group',
              name: 'story',
              label: 'The Success Story',
              fields: [
                {
                  name: 'introduction',
                  type: 'textarea',
                  label: 'Introduction',
                },
                {
                  name: 'challenges',
                  type: 'array',
                  label: 'Challenges Faced',
                  fields: [
                    {
                      name: 'challenge',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'turningPoint',
                  type: 'textarea',
                  label: 'The Turning Point',
                },
                {
                  type: 'group',
                  name: 'preparation',
                  label: 'Preparation Strategy',
                  fields: [
                    {
                      name: 'prelims',
                      type: 'textarea',
                      label: 'Prelims Strategy',
                    },
                    {
                      name: 'mains',
                      type: 'textarea',
                      label: 'Mains Strategy',
                    },
                    {
                      name: 'interview',
                      type: 'textarea',
                      label: 'Interview Preparation',
                    },
                  ],
                },
              ],
            },
            {
              name: 'timeline',
              type: 'array',
              label: 'Journey Timeline',
              fields: [
                {
                  name: 'period',
                  type: 'text',
                  label: 'Period (e.g. June 2022)',
                },
                {
                  name: 'event',
                  type: 'text',
                  label: 'Event',
                },
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    components: {
                      Field: '@/components/IconPicker',
                    },
                  },
                },
              ],
            },
            {
              name: 'tips',
              type: 'array',
              label: 'Tips for Aspirants',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    components: {
                      Field: '@/components/IconPicker',
                    },
                  },
                },
              ],
            },
            {
              type: 'group',
              name: 'testimonial',
              label: 'Testimonial',
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                  label: 'Quote',
                },
                {
                  name: 'highlight',
                  type: 'text',
                  label: 'Highlight',
                },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Detailed Stats (Scorecard)',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label (e.g. Prelims Score)',
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Value (e.g. 142/200)',
                },
              ],
            },
            {
              name: 'resources',
              type: 'array',
              label: 'Resources Used',
              fields: [
                {
                  name: 'resource',
                  type: 'text',
                },
              ],
            },
            {
              name: 'detailedDescription',
              type: 'textarea',
              label: 'Short Detailed Description (For List Hover)',
            },
            {
              name: 'score',
              type: 'text',
              label: 'Overall Score (For List View)',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSuccessStory],
    afterDelete: [revalidateDelete],
  },
}
