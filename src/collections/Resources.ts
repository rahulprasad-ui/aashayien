import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { imageUploadWithDisplay } from '@/fields/imageDisplaySettings'
import { slugField } from 'payload'
import { revalidateResource, revalidateDelete } from './Resources/hooks/revalidateResource'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    group: 'Study Resources',
  },
  access: {
    create: moduleAccess('resources', 'create'),
    delete: moduleAccess('resources', 'delete'),
    read: publicReadOrModuleAccess('resources'),
    update: moduleAccess('resources', 'update'),
  },
  hooks: {
    afterChange: [revalidateResource],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'resource-categories',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'resourceType',
                  type: 'select',
                  required: true,
                  defaultValue: 'video',
                  options: [
                    { label: 'Video Lecture', value: 'video' },
                    { label: 'PDF Document', value: 'pdf' },
                    { label: 'Preparation Guide', value: 'guide' },
                    { label: 'Important Judgement', value: 'judgement' },
                    { label: 'Previous Year Paper', value: 'pyq' },
                  ],
                  admin: { width: '50%' },
                },
                {
                  name: 'downloadLink',
                  type: 'text',
                  label: 'Download Link (for PDFs/Guides)',
                  admin: { 
                    width: '50%',
                    condition: (data) => data.resourceType !== 'video'
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'youtubeId',
                  type: 'text',
                  label: 'YouTube Video URL/ID',
                  admin: {
                    width: '50%',
                    condition: (data) => data.resourceType === 'video'
                  },
                },
                {
                  name: 'duration',
                  type: 'text',
                  admin: {
                    description: 'e.g. 1:15:20',
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'views',
                  type: 'text',
                  label: 'Views Count (Under Title)',
                  admin: {
                    description: 'e.g. 45,234',
                    width: '50%',
                  },
                },
                {
                  name: 'uploadDate',
                  type: 'date',
                  label: 'Publication Date',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'difficulty',
                  type: 'select',
                  options: [
                    { label: 'Beginner', value: 'Beginner' },
                    { label: 'Intermediate', value: 'Intermediate' },
                    { label: 'Advanced', value: 'Advanced' },
                    { label: 'Beginner to Intermediate', value: 'Beginner to Intermediate' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'language',
                  type: 'select',
                  options: [
                    { label: 'Hindi', value: 'Hindi' },
                    { label: 'English', value: 'English' },
                    { label: 'Hindi + English', value: 'Hindi + English' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            ...imageUploadWithDisplay({
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
            }),
            {
              name: 'externalThumbnailUrl',
              type: 'text',
              admin: {
                description:
                  'Use this for external images (e.g. Unsplash) if no media is uploaded.',
              },
            },
          ],
        },
        {
          label: 'Instructor',
          fields: [
            {
              name: 'instructor',
              type: 'group',
              fields: [
                {
                  name: 'name',
                  type: 'text',
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
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                }),
                {
                  name: 'externalPhotoUrl',
                  type: 'text',
                  label: 'External Photo URL',
                  admin: {
                    description: 'Fallback if no photo uploaded',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Curriculum',
          fields: [
            {
              name: 'overview',
              type: 'group',
              fields: [
                {
                  name: 'introduction',
                  type: 'textarea',
                },
                {
                  name: 'whatYouWillLearn',
                  type: 'array',
                  fields: [
                    {
                      name: 'point',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'keyTopicsCovered',
                  type: 'array',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                    },
                    {
                      name: 'duration',
                      type: 'text',
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
              ],
            },
          ],
        },
        {
          label: 'Study Materials',
          fields: [
            {
              name: 'studyMaterials',
              type: 'array',
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
                      name: 'type',
                      type: 'text',
                      defaultValue: 'PDF Document',
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'pages',
                      type: 'text',
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'externalFileUrl',
                  type: 'text',
                  label: 'External File URL (Optional)',
                },
              ],
            },
          ],
        },
        {
          label: 'Support & CTA',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Support Contact (Optional)',
              admin: {
                description: 'Override global contact info for this resource.',
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
            {
              name: 'cta',
              type: 'group',
              label: 'Call to Action Block',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Want More Detailed Study?',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Get access to comprehensive courses, test series, and personalized mentorship',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonText',
                      type: 'text',
                      defaultValue: 'Explore Paid Courses',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'buttonLink',
                      type: 'text',
                      defaultValue: '/courses',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'stats',
              type: 'group',
              label: 'Resource Stats',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'totalViews',
                      type: 'text',
                      defaultValue: '45K+',
                      admin: { width: '25%' },
                    },
                    {
                      name: 'studentsEnrolled',
                      type: 'text',
                      defaultValue: '12K+',
                      admin: { width: '25%' },
                    },
                    {
                      name: 'averageRating',
                      type: 'text',
                      defaultValue: '4.8/5',
                      admin: { width: '25%' },
                    },
                    {
                      name: 'downloads',
                      type: 'text',
                      defaultValue: '8.5K+',
                      admin: { width: '25%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'achievement',
                  type: 'text',
                  admin: { description: 'e.g. Civil Judge (MP)' },
                },
                {
                  name: 'rating',
                  type: 'number',
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                },
                {
                  name: 'comment',
                  type: 'textarea',
                  required: true,
                },
                ...imageUploadWithDisplay({
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                }),
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'relatedResources',
              type: 'relationship',
              relationTo: 'resources',
              hasMany: true,
              label: 'Related Videos/Resources',
            },
          ],
        },
        {
          label: 'Meta/SEO',
          fields: [
            {
              name: 'relatedExams',
              type: 'array',
              fields: [
                {
                  name: 'exam',
                  type: 'text',
                },
              ],
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
            slugField(),
          ],
        },
      ],
    },
  ],
}
