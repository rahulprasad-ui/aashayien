import { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'
import { imageDisplayFieldName, imageDisplaySettingsField } from '@/fields/imageDisplaySettings'
import { revalidateAboutUs } from './hooks/revalidateAboutUs'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  label: 'About Us',
  access: {
    read: publicReadOrModuleAccess('about-us'),
    update: moduleAccess('about-us', 'update'),
  },
  admin: {
    group: 'Site Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroBadge',
              type: 'text',
              defaultValue: 'About Aashayein Judiciary',
            },
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'Shaping Future Judiciary Officers',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue:
                'Empowering aspiring judiciary officers with comprehensive coaching, expert guidance, and unwavering support to achieve their dreams of serving justice.',
            },
          ],
        },
        {
          label: 'Our Story',
          fields: [
            {
              name: 'storyBadge',
              type: 'text',
              defaultValue: 'Our Story',
            },
            {
              name: 'storyTitle',
              type: 'text',
              defaultValue: 'A Decade of Excellence in Judiciary Coaching',
            },
            {
              name: 'storyContent',
              type: 'richText',
              // Simple default value structure for Lexical, or just empty if complex defaults are hard
            },
            {
              name: 'storyStats',
              type: 'array',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'gradient',
                  type: 'select',
                  options: [
                    { label: 'Red', value: 'red' },
                    { label: 'Amber', value: 'amber' },
                    { label: 'Rose', value: 'rose' },
                    { label: 'Orange', value: 'orange' },
                  ],
                  defaultValue: 'red',
                },
              ],
            },
          ],
        },
        {
          label: 'Director',
          fields: [
            {
              name: 'directorBadge',
              type: 'text',
              defaultValue: 'Director\'s Message',
            },
            {
              name: 'directorName',
              type: 'text',
              defaultValue: 'Nitesh Sir',
            },
            {
              name: 'directorTitle',
              type: 'text',
              defaultValue: 'Founder & Director, Aashayein Judiciary',
            },
            {
              name: 'directorImage',
              type: 'upload',
              relationTo: 'media',
            },
            imageDisplaySettingsField({
              name: imageDisplayFieldName('directorImage'),
              label: 'Director Image Display Settings',
            }),
            {
              name: 'directorQuote',
              type: 'textarea',
              defaultValue: 'Our mission is to make judiciary accessible to every deserving student in India.',
            },
            {
              name: 'directorContent',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Mission & Vision',
          fields: [
            {
              name: 'missionTitle',
              type: 'text',
              defaultValue: 'Our Mission',
            },
            {
              name: 'missionDescription',
              type: 'textarea',
              defaultValue:
                'To provide comprehensive, accessible, and result-oriented judiciary coaching that empowers every aspirant to achieve their dream of serving the Indian judicial system. We are committed to:',
            },
            {
              name: 'missionPoints',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'visionTitle',
              type: 'text',
              defaultValue: 'Our Vision',
            },
            {
              name: 'visionDescription',
              type: 'textarea',
              defaultValue:
                "To be India's most trusted and innovative judiciary coaching institution, recognized for excellence in education, student success, and contribution to the judicial system. We envision:",
            },
            {
              name: 'visionPoints',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          label: 'Core Values',
          fields: [
            {
              name: 'valuesBadge',
              type: 'text',
              defaultValue: 'Core Values',
            },
            {
              name: 'valuesTitle',
              type: 'text',
              defaultValue: 'The Principles That Guide Us',
            },
            {
              name: 'valuesDescription',
              type: 'textarea',
              defaultValue:
                'Our values are the foundation of everything we do, shaping our approach to teaching, student engagement, and institutional growth.',
            },
            {
              name: 'valuesList',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Heart', value: 'Heart' },
                    { label: 'Shield', value: 'Shield' },
                    { label: 'Star', value: 'Star' },
                    { label: 'Users', value: 'Users' },
                    { label: 'TrendingUp', value: 'TrendingUp' },
                    { label: 'Trophy', value: 'Trophy' },
                  ],
                  defaultValue: 'Heart',
                },
              ],
            },
          ],
        },
        {
          label: 'What Sets Us Apart',
          fields: [
            {
              name: 'featuresBadge',
              type: 'text',
              defaultValue: 'What Sets Us Apart',
            },
            {
              name: 'featuresTitle',
              type: 'text',
              defaultValue: 'The Aashayein Advantage',
            },
            {
              name: 'featuresDescription',
              type: 'textarea',
              defaultValue:
                'Discover what makes Aashayein Judiciary the preferred choice for thousands of judiciary aspirants across India.',
            },
            {
              name: 'featuresList',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Award', value: 'Award' },
                    { label: 'BookOpen', value: 'BookOpen' },
                    { label: 'Target', value: 'Target' },
                    { label: 'Clock', value: 'Clock' },
                    { label: 'Scale', value: 'Scale' },
                    { label: 'Users', value: 'Users' },
                  ],
                  defaultValue: 'Award',
                },
              ],
            },
          ],
        },
        {
          label: 'Our Commitment',
          fields: [
            {
              name: 'commitmentTitle',
              type: 'text',
              defaultValue: 'Our Commitment to Your Success',
            },
            {
              name: 'commitmentDescription',
              type: 'textarea',
              defaultValue:
                "At Aashayein Judiciary, we don't just prepare you for an examination – we prepare you for a career in judiciary. Every student receives comprehensive support, personalized attention, and unwavering guidance throughout their journey.",
            },
            {
              name: 'commitmentCta1Text',
              type: 'text',
              defaultValue: 'Start Your Journey',
            },
            {
              name: 'commitmentCta1Link',
              type: 'text',
              defaultValue: '/courses',
            },
            {
              name: 'commitmentCta2Text',
              type: 'text',
              defaultValue: 'Contact Us',
            },
            {
              name: 'commitmentCta2Link',
              type: 'text',
              defaultValue:
                'https://wa.me/8595173178?text=Hello%20Aashayein%20Judiciary,%20I%20would%20like%20to%20know%20more%20about%20your%20coaching%20programs',
            },
          ],
        },
        {
          label: 'Legacy & Impact',
          fields: [
            {
              name: 'legacyBadge',
              type: 'text',
              defaultValue: 'Our Legacy & Impact',
            },
            {
              name: 'legacyTitle',
              type: 'text',
              defaultValue: 'Building a Legacy of Excellence',
            },
            {
              name: 'legacyDescription',
              type: 'textarea',
              defaultValue:
                'Over the years, Aashayein Judiciary has created a lasting impact on the Indian judicial system through our successful students.',
            },
            {
              name: 'legacyStats',
              type: 'array',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'color',
                  type: 'select',
                  options: [
                    { label: 'Red', value: 'red' },
                    { label: 'Amber', value: 'amber' },
                    { label: 'Rose', value: 'rose' },
                    { label: 'Orange', value: 'orange' },
                  ],
                  defaultValue: 'red',
                },
              ],
            },
          ],
        },
        {
          label: 'Join Us',
          fields: [
            {
              name: 'joinTitle',
              type: 'text',
              defaultValue: 'Join Us in Your Journey to Judiciary',
            },
            {
              name: 'joinDescription',
              type: 'textarea',
              defaultValue:
                "Whether you're just starting your preparation or looking to refine your strategy, Aashayein Judiciary is here to support you every step of the way. Let's work together to turn your aspirations into achievements.",
            },
            {
              name: 'joinCta1Text',
              type: 'text',
              defaultValue: 'Enroll Now',
            },
            {
              name: 'joinCta1Link',
              type: 'text',
              defaultValue: '/courses',
            },
            {
              name: 'joinCta2Text',
              type: 'text',
              defaultValue: 'Watch Free Content',
            },
            {
              name: 'joinCta2Link',
              type: 'text',
              defaultValue: 'https://www.youtube.com/@alecbadshah',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAboutUs],
  },
}
