import type { Field } from 'payload'

import {
  structuredDataApplyTargets,
  structuredDataModeOptions,
  structuredDataSchemaTypes,
} from './config'

const schemaTypeOptions = structuredDataSchemaTypes.map((value) => ({
  label: value,
  value,
}))

const appliesToOptions = structuredDataApplyTargets.map((value) => ({
  label: value === 'site' ? 'Sitewide' : value,
  value,
}))

const guidedOnly = (_: unknown, siblingData?: Record<string, unknown>) =>
  siblingData?.mode === 'guided'
const customOnly = (_: unknown, siblingData?: Record<string, unknown>) =>
  siblingData?.mode === 'custom'

const tokenDescription =
  'Tokens supported, e.g. {{title}}, {{metaTitle}}, {{description}}, {{url}}, {{image}}, {{siteTitle}}.'

export const structuredDataConfigFields = (name: string, label: string): Field =>
  ({
    name,
    dbName: name === 'overrides' ? 'ovr' : name === 'templateConfig' ? 'cfg' : name,
    type: 'group',
    label,
    admin: {
      condition: guidedOnly,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'name',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'description',
            type: 'textarea',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'url',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'schemaId',
            type: 'text',
            label: '@id',
            admin: {
              width: '50%',
              description: 'Optional JSON-LD @id. Tokens supported.',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'image',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'headline',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'authorName',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'datePublished',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'dateModified',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'publisherName',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'publisherLogo',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        name: 'articleSection',
        type: 'text',
        admin: {
          description: tokenDescription,
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'providerName',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'providerUrl',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        name: 'faqSource',
        dbName: 'faq_src',
        type: 'select',
        defaultValue: 'auto',
        options: [
          { label: 'Auto Detect From Document', value: 'auto' },
          { label: 'Custom FAQ Items', value: 'custom' },
        ],
      },
      {
        name: 'faqItems',
        type: 'array',
        admin: {
          condition: (_data, siblingData) => siblingData?.faqSource === 'custom',
        },
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
        name: 'breadcrumbSource',
        dbName: 'bc_src',
        type: 'select',
        defaultValue: 'auto',
        options: [
          { label: 'Auto Generate', value: 'auto' },
          { label: 'Custom Breadcrumbs', value: 'custom' },
        ],
      },
      {
        name: 'breadcrumbs',
        type: 'array',
        admin: {
          condition: (_data, siblingData) => siblingData?.breadcrumbSource === 'custom',
        },
        fields: [
          {
            name: 'name',
            type: 'text',
            required: true,
          },
          {
            name: 'item',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'logoUrl',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'telephone',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'streetAddress',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'postalCode',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'addressLocality',
            type: 'text',
            admin: {
              width: '34%',
              description: tokenDescription,
            },
          },
          {
            name: 'addressRegion',
            type: 'text',
            admin: {
              width: '33%',
              description: tokenDescription,
            },
          },
          {
            name: 'addressCountry',
            type: 'text',
            admin: {
              width: '33%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        name: 'sameAs',
        type: 'array',
        fields: [
          {
            name: 'url',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'sku',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'brand',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'price',
            type: 'text',
            admin: {
              width: '34%',
              description: tokenDescription,
            },
          },
          {
            name: 'priceCurrency',
            type: 'text',
            defaultValue: 'INR',
            admin: {
              width: '33%',
              description: tokenDescription,
            },
          },
          {
            name: 'availability',
            type: 'text',
            admin: {
              width: '33%',
              description: 'Example: https://schema.org/InStock. Tokens supported.',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'ratingValue',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'reviewCount',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'startDate',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'endDate',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'eventStatus',
            type: 'text',
            admin: {
              width: '50%',
              description: 'Example: https://schema.org/EventScheduled. Tokens supported.',
            },
          },
          {
            name: 'eventAttendanceMode',
            type: 'text',
            admin: {
              width: '50%',
              description:
                'Example: https://schema.org/OnlineEventAttendanceMode. Tokens supported.',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'locationName',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'locationAddress',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'organizerName',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
          {
            name: 'organizerUrl',
            type: 'text',
            admin: {
              width: '50%',
              description: tokenDescription,
            },
          },
        ],
      },
      {
        name: 'potentialSearchTarget',
        type: 'text',
        admin: {
          description: tokenDescription,
        },
      },
      {
        name: 'customType',
        type: 'text',
        admin: {
          description:
            'Optional explicit @type when you want guided fields with a different schema type.',
        },
      },
    ],
  }) as Field

export const structuredDataItemFields = (): Field[] => [
  {
    name: 'structuredData',
    dbName: 'sdata',
    type: 'array',
    label: 'Structured Data',
    labels: {
      singular: 'Schema Item',
      plural: 'Schema Items',
    },
    admin: {
      description:
        'Attach reusable schema templates or create local JSON-LD entries for this document.',
      initCollapsed: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'enabled',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              width: '20%',
            },
          },
          {
            name: 'placementOrder',
            type: 'number',
            defaultValue: 0,
            admin: {
              width: '20%',
            },
          },
          {
            name: 'mode',
            dbName: 'mode',
            type: 'select',
            defaultValue: 'guided',
            options: structuredDataModeOptions as unknown as { label: string; value: string }[],
            required: true,
            admin: {
              width: '30%',
            },
          },
          {
            name: 'schemaType',
            dbName: 'stype',
            type: 'select',
            required: true,
            options: schemaTypeOptions,
            admin: {
              width: '30%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'customName',
            type: 'text',
            admin: {
              width: '50%',
            },
          },
          {
            name: 'sourceTemplate',
            type: 'relationship',
            relationTo: 'schema-templates',
            admin: {
              width: '50%',
              description: 'Optional reusable template to merge with this document-specific entry.',
            },
          },
        ],
      },
      structuredDataConfigFields('overrides', 'Field Overrides'),
      {
        name: 'customJSON',
        type: 'json',
        label: 'Custom JSON-LD',
        admin: {
          condition: customOnly,
          description: 'Advanced mode. JSON values can still use tokens like {{title}}.',
        },
      },
    ],
  },
]

export const schemaTemplateFields = (): Field[] => [
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'key',
    type: 'text',
    required: true,
    unique: true,
    index: true,
  },
  {
    type: 'row',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          width: '20%',
        },
      },
      {
        name: 'placementOrder',
        type: 'number',
        defaultValue: 0,
        admin: {
          width: '20%',
        },
      },
      {
        name: 'mode',
        dbName: 'mode',
        type: 'select',
        defaultValue: 'guided',
        options: structuredDataModeOptions as unknown as { label: string; value: string }[],
        required: true,
        admin: {
          width: '30%',
        },
      },
      {
        name: 'schemaType',
        dbName: 'stype',
        type: 'select',
        required: true,
        options: schemaTypeOptions,
        admin: {
          width: '30%',
        },
      },
    ],
  },
  {
    name: 'appliesTo',
    type: 'select',
    hasMany: true,
    required: true,
    options: appliesToOptions,
  },
  structuredDataConfigFields('templateConfig', 'Template Configuration'),
  {
    name: 'customJSON',
    type: 'json',
    label: 'Custom JSON-LD',
    admin: {
      condition: customOnly,
      description: 'Advanced mode. JSON values can still use tokens like {{title}}.',
    },
  },
  {
    name: 'notes',
    type: 'textarea',
  },
]
