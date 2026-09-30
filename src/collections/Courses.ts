import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { imageUploadWithDisplay } from '@/fields/imageDisplaySettings'
import { revalidateCourse, revalidateDelete } from './Courses/hooks/revalidateCourse'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'status'],
    group: 'Academics',
    components: {
      beforeList: ['@/components/GenericListHeader#GenericListHeader'],
    },
  },

  access: {
    create: moduleAccess('courses', 'create'),
    delete: moduleAccess('courses', 'delete'),
    read: publicReadOrModuleAccess('courses'),
    update: moduleAccess('courses', 'update'),
  },
  endpoints: [
    {
      path: '/sync-classplus',
      method: 'post',
      handler: async (req) => {
        const { syncClassplus } = await import('./Courses/endpoints/syncClassplus')
        return syncClassplus(req)
      },
    },
  ],
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Course Details',
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
              index: true,
              admin: {
                position: 'sidebar',
                components: {
                  Field: '@/components/SlugField#SlugField',
                },
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
              name: 'classplusId',
              type: 'number',
              index: true,
              admin: {
                readOnly: true,
                position: 'sidebar',
              },
            },
            {
              name: 'showGeneratedContent',
              type: 'checkbox',
              label: 'Show Generated Content',
              defaultValue: true,
              admin: {
                description:
                  'Toggle to show/hide extra content generated during sync (features, highlights, etc.)',
                position: 'sidebar',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'category',
              type: 'select',
              options: [
                { label: 'Foundation Course', value: 'foundation' },
                { label: 'State Judiciary Courses', value: 'state-judiciary' },
                { label: 'APO / ADPO Courses', value: 'apo-adpo' },
                { label: 'Test Series', value: 'test-series' },
                { label: 'Live Courses (Legacy)', value: 'live' },
                { label: 'Recorded Courses (Legacy)', value: 'recorded' },
                { label: 'Other', value: 'other' },
              ],
              required: true,
              defaultValue: 'foundation',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'courseMode',
              type: 'select',
              options: [
                { label: 'Online', value: 'online' },
                { label: 'Offline', value: 'offline' },
                { label: 'Hybrid', value: 'hybrid' },
              ],
              required: true,
              defaultValue: 'online',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'targetStates',
              type: 'select',
              hasMany: true,
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
            {
              name: 'isPopular',
              type: 'checkbox',
              label: 'Is Popular?',
              admin: {
                position: 'sidebar',
              },
            },

            {
              name: 'isBestSeller',
              type: 'checkbox',
              label: 'Is Best Seller?',
              admin: {
                position: 'sidebar',
              },
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
                  name: 'price',
                  type: 'text',
                  label: 'Current Price (e.g. ₹99,999)',
                  required: true,
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'originalPrice',
                  type: 'text',
                  label: 'Original Price (e.g. ₹1,49,999)',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'discount',
                  type: 'text',
                  label: 'Discount Label (e.g. 33% OFF)',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
            ...imageUploadWithDisplay({
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
            }),
            {
              type: 'group',
              name: 'instructor',
              label: 'Instructor Details',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'bio',
                  type: 'textarea',
                },
                ...imageUploadWithDisplay({
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                }),
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'duration',
                  type: 'text',
                  label: 'Duration (e.g. 2 Years)',
                  admin: { width: '25%' },
                },
                {
                  name: 'lecturesCount',
                  type: 'number',
                  label: 'Total Lectures (Approx)',
                  admin: { width: '25%' },
                },
                {
                  name: 'language',
                  type: 'text',
                  defaultValue: 'Hindi & English',
                  admin: { width: '25%' },
                },
                {
                  name: 'level',
                  type: 'text',
                  defaultValue: 'Beginner to Advanced',
                  admin: { width: '25%' },
                },
              ],
            },
            {
              name: 'features',
              type: 'array',
              label: 'Key Features (Appears in List View)',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                },
              ],
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'Highlights (Icons section)',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    components: {
                      Field: '@/components/IconPicker',
                    },
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
            {
              name: 'learningOutcomes',
              type: 'array',
              label: "What You'll Learn",
              fields: [
                {
                  name: 'outcome',
                  type: 'text',
                },
              ],
            },
            {
              name: 'curriculum',
              type: 'array',
              label: 'Course Curriculum',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'lessonsCount',
                      type: 'number',
                      label: 'Number of Lessons',
                    },
                    {
                      name: 'duration',
                      type: 'text',
                      label: 'Duration (e.g. 60 hours)',
                    },
                  ],
                },
                {
                  name: 'topics',
                  type: 'array',
                  fields: [
                    {
                      name: 'topic',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'demoVideos',
              type: 'array',
              label: 'Demo / Sample Videos',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'YouTube URL', value: 'youtube' },
                    { label: 'Upload Video', value: 'upload' },
                  ],
                  defaultValue: 'youtube',
                  required: true,
                },
                {
                  name: 'youtubeUrl',
                  type: 'text',
                  label: 'YouTube URL',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'youtube',
                  },
                },
                {
                  name: 'videoFile',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Video File',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'upload',
                  },
                },
                {
                  name: 'duration',
                  type: 'text',
                  label: 'Duration (e.g. 15:30)',
                },
                {
                  name: 'topic',
                  type: 'text',
                  label: 'Topic/Subject Name',
                },
                ...imageUploadWithDisplay({
                  name: 'thumbnail',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Video Thumbnail',
                }),
              ],
            },
            {
              name: 'enrollmentLink',
              type: 'text',
              label: 'External Enrollment Link',
              admin: {
                description: 'If set, the "Enroll Now" button will link here.',
              },
            },
            {
              name: 'faqs',
              type: 'array',
              label: 'FAQs',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'reviews',
              type: 'array',
              label: 'Student Reviews',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'rating',
                  type: 'number',
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                  required: true,
                },
                {
                  name: 'date',
                  type: 'date',
                  label: 'Date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                      displayFormat: 'dd/MM/yyyy',
                    },
                  },
                  required: true,
                },
                {
                  name: 'comment',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Contact Support (Optional)',
              admin: {
                description: 'Override global contact info for this course.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'phone',
                      type: 'text',
                      label: 'Phone Number',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'whatsapp',
                      type: 'text',
                      label: 'WhatsApp Number',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCourse],
    afterDelete: [revalidateDelete],
  },
}
