import type { CollectionConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import {
  revalidateSyllabusState,
  revalidateDelete,
} from './SyllabusStates/hooks/revalidateSyllabusState'

export const SyllabusStates: CollectionConfig = {
  slug: 'syllabus-states',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'fullName', 'code', 'type', 'popularity'],
    group: 'Academics',
  },
  access: {
    create: moduleAccess('syllabus-states', 'create'),
    delete: moduleAccess('syllabus-states', 'delete'),
    read: publicReadOrModuleAccess('syllabus-states'),
    update: moduleAccess('syllabus-states', 'update'),
  },
  hooks: {
    afterChange: [revalidateSyllabusState],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'judiciary',
      options: [
        { label: 'Judiciary', value: 'judiciary' },
        { label: 'ADPO', value: 'adpo' },
      ],
      label: 'Exam Type',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Info',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'State Name (Short)',
              admin: { description: 'e.g., UP, MP' },
            },
            {
              name: 'fullName',
              type: 'text',
              required: true,
              label: 'Full State/Exam Name',
              admin: { description: 'e.g., Uttar Pradesh Judiciary (UPPCS-J)' },
            },
            {
              name: 'code',
              type: 'text',
              required: true,
              unique: true,
              label: 'State Code (Slug)',
              admin: { description: 'Unique identifier used in URL e.g., up, mp, rj' },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Description',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'State Image',
            },
            {
              name: 'vacancies',
              type: 'text',
              label: 'Number of Vacancies',
              admin: { description: 'e.g., 400+' },
            },
            {
              name: 'popularity',
              type: 'select',
              options: [
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' },
              ],
              defaultValue: 'medium',
              label: 'Popularity',
            },
          ],
        },
        {
          label: 'Exam Pattern',
          fields: [
            {
              name: 'prelims',
              type: 'group',
              label: 'Exam Pattern - Prelims',
              fields: [
                { name: 'totalMarks', type: 'number', label: 'Total Marks' },
                { name: 'duration', type: 'text', label: 'Duration' },
                { name: 'totalQuestions', type: 'number', label: 'Total Questions' },
                { name: 'negativeMarking', type: 'text', label: 'Negative Marking' },
                {
                  name: 'subjects',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'questions', type: 'number', label: 'Questions Count' },
                  ],
                },
              ],
            },
            {
              type: 'ui',
              name: 'mainsDivider',
              admin: {
                components: {
                  Field: '@/components/Admin/Divider',
                },
              },
            },
            {
              name: 'mains',
              type: 'group',
              label: 'Exam Pattern - Mains',
              fields: [
                { name: 'totalMarks', type: 'number', label: 'Total Marks' },
                { name: 'duration', type: 'text', label: 'Duration' },
                { name: 'papers', type: 'number', label: 'Number of Papers' },
                { name: 'description', type: 'textarea', label: 'Description' },
              ],
            },
          ],
        },
        {
          label: 'Syllabus',
          fields: [
            {
              name: 'syllabusTopics',
              type: 'array',
              label: 'Detailed Syllabus Topics',
              fields: [
                { name: 'category', type: 'text', required: true, label: 'Topic Category' },
                {
                  name: 'topics',
                  type: 'array',
                  label: 'Topics',
                  fields: [{ name: 'topic', type: 'text', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'Resources',
          fields: [
            {
              name: 'importantBooks',
              type: 'array',
              label: 'Recommended Books',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'author', type: 'text', required: true },
                { name: 'subject', type: 'text', required: true },
              ],
            },
            {
              name: 'preparationTips',
              type: 'array',
              label: 'Preparation Tips',
              fields: [{ name: 'tip', type: 'textarea', required: true }],
            },
            {
              name: 'downloads',
              type: 'group',
              label: 'Download Links',
              fields: [
                { name: 'syllabus', type: 'text', label: 'Syllabus URL' },
                { name: 'syllabusFile', type: 'upload', relationTo: 'media', label: 'Upload Syllabus PDF' },
                { name: 'pyq', type: 'text', label: 'PYQ URL' },
                { name: 'pyqFile', type: 'upload', relationTo: 'media', label: 'Upload PYQ PDF' },
                { name: 'notification', type: 'text', label: 'Notification URL' },
                { name: 'notificationFile', type: 'upload', relationTo: 'media', label: 'Upload Notification PDF' },
              ],
            },
            {
              name: 'syllabusUrl',
              type: 'text',
              label: 'Legacy Syllabus URL',
              admin: { description: 'Legacy Link to Google Form or PDF' },
            },
            {
              name: 'syllabusFile',
              type: 'upload',
              relationTo: 'media',
              label: 'Legacy Syllabus File (Upload)',
            },
            {
              name: 'vacancyUrl',
              type: 'text',
              label: 'Legacy Vacancy URL',
              admin: { description: 'Legacy Link to Google Form or PDF' },
            },
            {
              name: 'pyqUrl',
              type: 'text',
              label: 'Legacy PYQ URL',
              admin: { description: 'Link to Previous Year Papers' },
            },
          ],
        },
        {
          label: 'Eligibility & Dates',
          fields: [
            {
              name: 'eligibility',
              type: 'group',
              label: 'Eligibility Criteria',
              fields: [
                { name: 'age', type: 'text', label: 'Age Limit' },
                { name: 'qualification', type: 'text', label: 'Qualification' },
                { name: 'nationality', type: 'text', label: 'Nationality' },
                { name: 'attempts', type: 'text', label: 'Attempts' },
              ],
            },
            {
              name: 'examDates',
              type: 'group',
              label: 'Exam Dates',
              fields: [
                { name: 'notification', type: 'date', label: 'Notification Date' },
                { name: 'prelimsExam', type: 'date', label: 'Prelims Date' },
                { name: 'mainsExam', type: 'date', label: 'Mains Date' },
                { name: 'interview', type: 'date', label: 'Interview Date' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
