import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
// import { Payload, Plugin } from 'payload'
import type { Field } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { structuredDataItemFields } from '@/seo/structuredData/fields'
import { seoCollectionSlugs, seoGlobalSlugs } from '@/seo/structuredData/config'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { validateCaptcha } from '@/utilities/validateCaptcha'
import { revalidateForm, revalidateFormDelete } from '@/hooks/revalidateForm'
import { updateFormStatsAfterChange, updateFormStatsAfterDelete } from '@/hooks/updateFormStats'
import { trimSubmissionData } from '@/hooks/trimSubmissionData'
import { sendLeadToCRM } from '@/hooks/sendLeadToCRM'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'
import { deleteFormSubmissionLead, syncFormSubmissionLead } from '@/hooks/syncUnifiedLeads'
import { rateLimitFormSubmission } from '@/hooks/rateLimitFormSubmission'
import { anyone } from '@/access/anyone'

const generateTitle: GenerateTitle<Post | Page | any> = ({ doc }) => {
  return doc?.title || doc?.name || 'Aashayein Judiciary'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

const robotsControlFields: Field[] = [
  {
    name: 'indexDirective',
    type: 'select',
    label: 'Search Indexing',
    defaultValue: 'index',
    options: [
      { label: 'Index', value: 'index' },
      { label: 'Noindex', value: 'noindex' },
    ],
    admin: {
      description: 'Choose whether search engines can include this page in search results.',
    },
  },
  {
    name: 'followDirective',
    type: 'select',
    label: 'Link Crawling',
    defaultValue: 'follow',
    options: [
      { label: 'Follow', value: 'follow' },
      { label: 'Nofollow', value: 'nofollow' },
    ],
    admin: {
      description: 'Choose whether search engines can follow links on this page.',
    },
  },
]

export const plugins = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      access: {
        create: moduleAccess('redirects', 'create'),
        read: moduleAccess('redirects', 'read'),
        update: moduleAccess('redirects', 'update'),
        delete: moduleAccess('redirects', 'delete'),
      },
      admin: {
        group: 'Settings',
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    collections: [...seoCollectionSlugs].filter(
      (slug) => !['events', 'vacancies', 'notes', 'previous-year-questions'].includes(slug),
    ),
    globals: [...seoGlobalSlugs],
    uploadsCollection: 'media',
    tabbedUI: true,
    fields: ({ defaultFields }) => [
      ...defaultFields.filter(Boolean),
      {
        name: 'canonicalURL',
        type: 'text',
        label: 'Canonical URL',
        admin: {
          description:
            'Custom canonical URL for this page. If left empty, it will be generated automatically.',
        },
      },
      ...robotsControlFields,
      ...structuredDataItemFields(),
    ],
    generateTitle,
    generateURL,
  }),
  seoPlugin({
    collections: ['events', 'vacancies', 'notes', 'previous-year-questions'],
    uploadsCollection: 'media',
    tabbedUI: false,
    fields: ({ defaultFields }) => [
      ...defaultFields.filter(Boolean),
      {
        name: 'canonicalURL',
        type: 'text',
        label: 'Canonical URL',
        admin: {
          description:
            'Custom canonical URL for this page. If left empty, it will be generated automatically.',
        },
      },
      ...robotsControlFields,
      ...structuredDataItemFields(),
    ],
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      access: {
        create: anyone,
        read: moduleAccess('form-submissions', 'read'),
        update: moduleAccess('form-submissions', 'update'),
        delete: moduleAccess('form-submissions', 'delete'),
      },
      admin: {
        group: 'Leads',
        hidden: true,
        // defaultColumns: ['id', 'form', 'createdAt'],
      },
      hooks: {
        beforeValidate: [rateLimitFormSubmission, trimSubmissionData],
        beforeChange: [validateCaptcha],
        afterChange: [updateFormStatsAfterChange, syncFormSubmissionLead, sendLeadToCRM],
        afterDelete: [updateFormStatsAfterDelete, deleteFormSubmissionLead],
      },
    },
    formOverrides: {
      access: {
        create: moduleAccess('forms', 'create'),
        read: publicReadOrModuleAccess('forms'),
        update: moduleAccess('forms', 'update'),
        delete: moduleAccess('forms', 'delete'),
      },
      admin: {
        group: 'Leads',
        defaultColumns: ['id', 'title', 'submissionCount', 'lastSubmissionDate', 'enableCRM'],
        components: {
          beforeList: ['@/components/FormsListHeader#FormsListHeader'],
          views: {
            edit: {
              // Add a new tab for "Submissions"
              // Notes: 'Default' is the standard Edit View.
              Default: {
                Component: '@/components/FormSubmissionsView#FormSubmissionsView',
                path: '/submissions',
                tab: {
                  label: 'Submissions',
                  href: '/submissions',
                },
              },
            },
          },
        },
      },
      hooks: {
        afterChange: [revalidateForm],
        afterDelete: [revalidateFormDelete],
      },

      fields: ({ defaultFields }) => {
        const difficultyOptions = [
          { label: '1 Column', value: '1' },
          { label: '2 Columns', value: '2' },
          { label: '3 Columns', value: '3' },
          { label: '4 Columns', value: '4' },
          { label: '5 Columns', value: '5' },
          { label: '6 Columns (Half Width)', value: '6' },
          { label: '7 Columns', value: '7' },
          { label: '8 Columns', value: '8' },
          { label: '9 Columns', value: '9' },
          { label: '10 Columns', value: '10' },
          { label: '11 Columns', value: '11' },
          { label: '12 Columns (Full Width)', value: '12' },
        ]

        const mapFields = (fields: any[]): any[] => {
          return fields.map((field) => {
            if ('name' in field && field.name === 'width') {
              return {
                ...field,
                name: 'columnWidth', // Rename to columnWidth to avoid conflict
                type: 'select',
                label: 'Column Width',
                options: difficultyOptions,
              }
            }

            if ('fields' in field && Array.isArray(field.fields)) {
              return {
                ...field,
                fields: mapFields(field.fields),
              }
            }

            if (field.type === 'tabs' && 'tabs' in field && Array.isArray(field.tabs)) {
              return {
                ...field,
                tabs: field.tabs.map((tab: any) => ({
                  ...tab,
                  fields: mapFields(tab.fields),
                })),
              }
            }

            return field
          })
        }

        const mappedFields = defaultFields.map((field) => {
          if ('name' in field && field.name === 'fields' && field.type === 'blocks') {
            const modifiedBlocks = field.blocks.map((block) => {
              const blocksWithPlaceholder = ['text', 'email', 'number', 'textarea', 'state']

              let newFields = mapFields(block.fields)

              if (blocksWithPlaceholder.includes(block.slug)) {
                const hasPlaceholder = newFields.some((f: any) => f.name === 'placeholder')
                if (!hasPlaceholder) {
                  const requiredIndex = newFields.findIndex((f: any) => f.name === 'required')
                  const placeholderField = {
                    name: 'placeholder',
                    type: 'text',
                    label: 'Placeholder',
                  }

                  if (requiredIndex >= 0) {
                    newFields = [
                      ...newFields.slice(0, requiredIndex),
                      placeholderField,
                      ...newFields.slice(requiredIndex),
                    ]
                  } else {
                    newFields = [...newFields, placeholderField]
                  }
                }
              }

              return {
                ...block,
                fields: newFields,
              }
            })
            return {
              ...field,
              blocks: [
                ...modifiedBlocks,
                {
                  slug: 'captcha',
                  labels: {
                    singular: 'Captcha',
                    plural: 'Captchas',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Label',
                    },
                    {
                      name: 'captchaType',
                      type: 'select',
                      label: 'Captcha Type',
                      defaultValue: 'google',
                      options: [{ label: 'Google reCAPTCHA', value: 'google' }],
                      required: true,
                    },
                    {
                      name: 'required',
                      type: 'checkbox',
                      label: 'Required',
                      defaultValue: true,
                    },
                  ],
                },
              ],
            }
          }

          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })

        return [
          ...(mappedFields as any[]).map((field) => {
            if ('name' in field && field.name === 'title') {
              return {
                ...field,
                validate: async (value: string | null | undefined, options: any) => {
                  const title = value?.trim()

                  if (!title) {
                    return true
                  }

                  const existingForms = await options.req.payload.find({
                    collection: 'forms',
                    where: {
                      title: {
                        equals: title,
                      },
                    },
                    depth: 0,
                    limit: 2,
                    overrideAccess: false,
                    req: options.req,
                    select: {
                      id: true,
                    },
                  })

                  const currentID = options.id ? String(options.id) : undefined
                  const hasDuplicate = existingForms.docs.some((form: any) => {
                    return String(form.id) !== currentID
                  })

                  return hasDuplicate ? 'Form name already exists' : true
                },
              }
            }

            return field
          }),
          {
            name: 'submissionCount',
            type: 'number',
            label: 'Submissions',
            admin: {
              readOnly: true,
              position: 'sidebar',
              components: {
                Cell: '@/components/ViewSubmissionsLink#SubmissionsCountCell',
              },
            },
            defaultValue: 0,
          },
          {
            name: 'lastSubmissionDate',
            type: 'date',
            label: 'Last Update Date',
            admin: {
              readOnly: true,
              position: 'sidebar',
              date: {
                displayFormat: 'dd MMM yyyy HH:mm',
              },
            },
          },
          {
            name: 'enableCRM',
            type: 'checkbox',
            label: 'Send Leads to CRM',
            defaultValue: false,
            admin: {
              position: 'sidebar',
              components: {
                Cell: '@/components/FormCRMToggleCell#FormCRMToggleCell',
              },
              description:
                'When enabled, form submissions will be automatically forwarded to TeleCRM.',
            },
          },
        ]
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      access: {
        create: moduleAccess('search', 'create'),
        read: moduleAccess('search', 'read'),
        update: moduleAccess('search', 'update'),
        delete: moduleAccess('search', 'delete'),
      },
      admin: {
        group: 'Website',
      },
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
