import type { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'

export const SyllabusVacancyGlobal: GlobalConfig = {
  slug: 'syllabus-vacancy-global',
  label: 'Syllabus & Vacancy',
  access: {
    read: publicReadOrModuleAccess('syllabus-vacancy-global'),
    update: moduleAccess('syllabus-vacancy-global', 'update'),
  },
  admin: {
    group: 'Site Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'badgeText',
              type: 'text',
              defaultValue: 'Complete Resource Hub for Judiciary Aspirants',
            },
            {
              name: 'title',
              type: 'text',
              defaultValue: 'State-wise Judiciary Syllabus, Vacancy & Previous Papers',
            },
            {
              name: 'description',
              type: 'textarea',
              defaultValue:
                'Download comprehensive study material, check latest vacancies, and access previous year question papers for all major state judiciary exams.',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Hero Stats',
              minRows: 3,
              maxRows: 3,
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
              ],
            },
          ],
        },
        {
          label: 'Common Subjects',
          fields: [
            {
              name: 'commonSubjectsTitle',
              type: 'text',
              defaultValue: 'Subjects in Judiciary Exams Syllabus',
            },
            {
              name: 'commonSubjectsDescription',
              type: 'textarea',
              defaultValue:
                "Here's a list of common subjects included in the Judiciary syllabus across most states:",
            },
            {
              name: 'commonSubjectsList',
              type: 'array',
              label: 'Subjects List',
              fields: [
                {
                  name: 'category',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subjects',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Prelims Syllabus',
          fields: [
            {
              name: 'prelimsTitle',
              type: 'text',
              defaultValue: 'Judiciary Exam Syllabus 2025 (Prelims)',
            },
            {
              name: 'prelimsDescription',
              type: 'textarea',
              defaultValue:
                'Here is the syllabus for the Judiciary Prelims Exam, divided into specific subjects:',
            },
            {
              name: 'prelimsList',
              type: 'array',
              label: 'Prelims Topics',
              fields: [
                {
                  name: 'subject',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'topics',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Mains Syllabus',
          fields: [
            {
              name: 'mainsTitle',
              type: 'text',
              defaultValue: 'Judiciary Exam Syllabus 2025 (Mains)',
            },
            {
              name: 'mainsDescription',
              type: 'textarea',
              defaultValue:
                "Here's the syllabus for the Judiciary Mains Exam presented in tabular form:",
            },
            {
              name: 'mainsList',
              type: 'array',
              label: 'Mains Topics',
              fields: [
                {
                  name: 'paperName',
                  type: 'text',
                  required: true,
                  label: 'Paper Name (e.g. Paper I)',
                },
                {
                  name: 'subject',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'topics',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Call to Actions',
          fields: [
            {
              name: 'enrollCta',
              type: 'group',
              label: 'Enroll CTA (Left)',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Start Your Preparation' },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Join 50,000+ successful aspirants with expert guidance and comprehensive study material',
                },
                { name: 'buttonText', type: 'text', defaultValue: 'Enroll Now' },
                {
                  name: 'buttonUrl',
                  type: 'text',
                  defaultValue: '/courses',
                },
              ],
            },
            {
              name: 'demoCta',
              type: 'group',
              label: 'Demo CTA (Right)',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Book Free Demo Class' },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Experience our teaching methodology and course structure from expert faculty',
                },
                { name: 'buttonText', type: 'text', defaultValue: 'Book Free Demo' },
                {
                  name: 'buttonUrl',
                  type: 'text',
                  defaultValue: 'https://forms.gle/PFwih1FLnubDcZD38',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
