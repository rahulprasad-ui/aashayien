import React from 'react'

export type SchemaType =
  | 'Organization'
  | 'WebSite'
  | 'WebPage'
  | 'BlogPosting'
  | 'Article'
  | 'Product'
  | 'Course'
  | 'BreadcrumbList'
  | 'Event'
  | 'AboutPage'
  | 'ContactPage'
  | 'EducationalOrganization'

type LegacySchemaProps = {
  type: SchemaType
  data: Record<string, any>
  schema?: never
  schemas?: never
}

type ResolvedSchemaProps = {
  type?: never
  data?: never
  schema?: Record<string, any> | null
  schemas?: Record<string, any>[] | null
}

type SchemaOrgProps = LegacySchemaProps | ResolvedSchemaProps

export const SchemaOrg: React.FC<SchemaOrgProps> = ({ type, data, schema, schemas }) => {
  const resolvedSchemas = schemas || (schema ? [schema] : [])
  const legacySchema =
    type && data
      ? [
          {
            '@context': 'https://schema.org',
            '@type': type,
            ...data,
          },
        ]
      : []

  return (
    <>
      {[...legacySchema, ...resolvedSchemas].filter(Boolean).map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  )
}
