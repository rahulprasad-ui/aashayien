import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { resolveStructuredData } from '@/seo/structuredData/resolver'
import { getServerSideURL } from '@/utilities/getURL'
import { SchemaOrg } from './SchemaOrg'

type StructuredDataRendererProps = {
  currentUrl: string
  doc?: Record<string, any> | null
  schemaItems?: Record<string, any>[] | null
  fallbackItems?: Record<string, any>[] | null
}

const defaultSitewideSchemaItems: Record<string, any>[] = []

const sortStructuredDataValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((entry) => sortStructuredDataValue(entry))
  }

  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortStructuredDataValue((value as Record<string, unknown>)[key])
        return acc
      }, {})
  }

  return value
}

const createStructuredDataKey = (schema: Record<string, any>) =>
  JSON.stringify(sortStructuredDataValue(schema))

const getStructuredDataTypes = (schema: Record<string, any>) => {
  const type = schema?.['@type']

  if (Array.isArray(type)) return type.map(String)
  if (typeof type === 'string') return [type]

  return []
}

const isOrganizationIdentitySchema = (schema: Record<string, any>) =>
  getStructuredDataTypes(schema).some(
    (type) => type === 'Organization' || type === 'EducationalOrganization',
  )

const createStructuredDataIdentityKey = (schema: Record<string, any>) => {
  if (isOrganizationIdentitySchema(schema)) return 'identity:organization'

  const schemaId = schema?.['@id']
  if (typeof schemaId === 'string' && schemaId.trim()) return `id:${schemaId.trim()}`

  return createStructuredDataKey(schema)
}

const dedupeStructuredDataSchemas = <T extends Record<string, any>>(schemas: T[]) => {
  const seen = new Set<string>()

  return schemas.filter((schema) => {
    const key = createStructuredDataIdentityKey(schema)

    if (seen.has(key)) return false

    seen.add(key)
    return true
  })
}

const appliesToSite = (doc: Record<string, any>) => {
  const appliesTo = doc.appliesTo

  if (!Array.isArray(appliesTo)) return false

  return appliesTo.some((entry) => {
    if (typeof entry === 'string') return entry === 'site'
    if (entry && typeof entry === 'object') return (entry as Record<string, unknown>).value === 'site'

    return false
  })
}

async function getSitewideStructuredData() {
  const payload = await getPayload({ config: configPromise })
  const branding = await getCachedGlobal('branding', 1)()
  const footer = await getCachedGlobal('footer', 1)()
  let docs: Record<string, any>[] = []

  try {
    const result = await payload.find({
      collection: 'schema-templates',
      depth: 0,
      limit: 100,
      pagination: false,
      where: {
        enabled: {
          equals: true,
        },
      },
    })

    docs = (result.docs as Record<string, any>[]).filter(appliesToSite)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    if (message.includes('schema_templates') || message.includes('apply_to')) {
      payload.logger.warn(`Structured data templates are unavailable. Skipping site schema. ${message}`)
    } else {
      throw error
    }
  }

  const schemaItems = docs.length > 0 ? docs : defaultSitewideSchemaItems
  const schemas = dedupeStructuredDataSchemas(
    resolveStructuredData({
      currentUrl: getServerSideURL(),
      branding,
      footer,
      schemaItems,
    }),
  )

  return {
    schemas,
    branding,
    footer,
  }
}

export async function DocumentStructuredDataRenderer({
  currentUrl,
  doc,
  schemaItems,
  fallbackItems,
}: StructuredDataRendererProps) {
  const { schemas: sitewideSchemas, branding, footer } = await getSitewideStructuredData()
  const documentItems = schemaItems || doc?.meta?.structuredData
  const activeItems = [...(documentItems || []), ...(fallbackItems || [])]
  const schemas = resolveStructuredData({
    doc,
    currentUrl,
    branding,
    footer,
    schemaItems: activeItems,
  })
  const sitewideSchemaKeys = new Set(
    sitewideSchemas.map((schema) => createStructuredDataIdentityKey(schema)),
  )
  const dedupedSchemas = dedupeStructuredDataSchemas(
    schemas.filter((schema) => !sitewideSchemaKeys.has(createStructuredDataIdentityKey(schema))),
  )

  return <SchemaOrg schemas={dedupedSchemas} />
}

export async function SitewideStructuredDataRenderer() {
  const { schemas } = await getSitewideStructuredData()

  return <SchemaOrg schemas={schemas} />
}
