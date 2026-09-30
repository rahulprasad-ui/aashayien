import { getServerSideURL } from '@/utilities/getURL'

type UnknownRecord = Record<string, any>

export type ResolvedStructuredData = Record<string, unknown>

export type StructuredDataContext = {
  doc?: UnknownRecord | null
  currentUrl?: string
  branding?: UnknownRecord | null
  footer?: UnknownRecord | null
  schemaItems?: UnknownRecord[] | null
}

const ABSOLUTE_URL = /^https?:\/\//i
const TOKEN_PATTERN = /\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g

const toAbsoluteUrl = (value?: string | null) => {
  if (!value) return undefined
  if (ABSOLUTE_URL.test(value)) return value

  const serverUrl = getServerSideURL().replace(/\/$/, '')
  return value.startsWith('/') ? `${serverUrl}${value}` : `${serverUrl}/${value}`
}

const toAbsoluteId = (value?: string | null, baseUrl?: string) => {
  if (!value) return undefined
  if (ABSOLUTE_URL.test(value)) return value

  const siteUrl = getServerSideURL().replace(/\/$/, '')
  const resolvedBaseUrl = (baseUrl || siteUrl).replace(/\/$/, '')

  if (value.startsWith('#')) return `${resolvedBaseUrl}${value}`
  if (value.startsWith('/')) return `${siteUrl}${value}`

  return `${siteUrl}/${value}`
}

const titleCase = (value: string) =>
  value
    .split(/[-_/]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const isPlainObject = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const stripEmpty = <T>(value: T): T | undefined => {
  if (Array.isArray(value)) {
    const cleaned = value
      .map((entry) => stripEmpty(entry))
      .filter((entry) => entry !== undefined && entry !== null)

    return (cleaned.length ? cleaned : undefined) as T | undefined
  }

  if (isPlainObject(value)) {
    const cleaned = Object.entries(value).reduce<UnknownRecord>((acc, [key, entry]) => {
      const nextValue = stripEmpty(entry)
      if (nextValue !== undefined && nextValue !== null && nextValue !== '') {
        acc[key] = nextValue
      }
      return acc
    }, {})

    return (Object.keys(cleaned).length ? cleaned : undefined) as T | undefined
  }

  return value === '' ? undefined : value
}

const getMediaUrl = (value: unknown): string | undefined => {
  if (!value) return undefined
  if (typeof value === 'string') return toAbsoluteUrl(value)
  if (isPlainObject(value) && typeof value.url === 'string') return toAbsoluteUrl(value.url)
  return undefined
}

const getByPath = (object: UnknownRecord, path: string) =>
  path.split('.').reduce<unknown>((current, key) => {
    if (!current || typeof current !== 'object') return undefined
    return (current as UnknownRecord)[key]
  }, object)

const interpolateValue = (value: unknown, context: UnknownRecord): unknown => {
  if (typeof value === 'string') {
    return value.replace(TOKEN_PATTERN, (_, token: string) => {
      const resolved = getByPath(context, token)
      return resolved == null ? '' : String(resolved)
    })
  }

  if (Array.isArray(value)) {
    return value.map((entry) => interpolateValue(entry, context))
  }

  if (isPlainObject(value)) {
    return Object.entries(value).reduce<UnknownRecord>((acc, [key, entry]) => {
      acc[key] = interpolateValue(entry, context)
      return acc
    }, {})
  }

  return value
}

const pickString = (...values: unknown[]) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return undefined
}

const getArray = (value: unknown) => (Array.isArray(value) ? value : [])

const getAuthorName = (doc?: UnknownRecord | null, siteTitle?: string) => {
  const populatedAuthor = getArray(doc?.populatedAuthors)[0]
  if (isPlainObject(populatedAuthor) && populatedAuthor.name) return String(populatedAuthor.name)

  const author = getArray(doc?.authors)[0]
  if (isPlainObject(author) && author.name) return String(author.name)

  if (isPlainObject(doc?.instructor) && doc?.instructor?.name) return String(doc.instructor.name)
  if (doc?.name) return String(doc.name)

  return siteTitle
}

const extractFaqItems = (
  value: unknown,
  seen = new Set<unknown>(),
): { question: string; answer: string }[] => {
  if (!value || seen.has(value)) return []
  if (typeof value === 'object') seen.add(value)

  if (Array.isArray(value)) {
    const directItems = value
      .filter(isPlainObject)
      .map((entry) => ({
        question: pickString(entry.question, entry.title),
        answer: pickString(entry.answer, entry.description),
      }))
      .filter((entry): entry is { question: string; answer: string } =>
        Boolean(entry.question && entry.answer),
      )

    if (directItems.length) return directItems

    return value.flatMap((entry) => extractFaqItems(entry, seen))
  }

  if (isPlainObject(value)) {
    return Object.values(value).flatMap((entry) => extractFaqItems(entry, seen))
  }

  return []
}

const buildBreadcrumbs = (doc: UnknownRecord | null | undefined, currentUrl?: string) => {
  const resolvedUrl = currentUrl || getServerSideURL()
  const path = resolvedUrl.replace(getServerSideURL(), '').replace(/^\/+/, '')
  const segments = path ? path.split('/') : []
  const crumbs = [{ name: 'Home', item: getServerSideURL() }]
  let runningPath = ''

  segments.forEach((segment, index) => {
    runningPath += `/${segment}`
    const isLast = index === segments.length - 1
    crumbs.push({
      name: isLast
        ? pickString(doc?.title, doc?.name, doc?.meta?.title, titleCase(segment)) ||
          titleCase(segment)
        : titleCase(segment),
      item: `${getServerSideURL()}${runningPath}`,
    })
  })

  return crumbs
}

const buildContext = ({
  doc,
  currentUrl,
  branding,
  footer,
}: StructuredDataContext): UnknownRecord => {
  const siteTitle = pickString(branding?.siteMeta?.title, 'Aashayein Judiciary')
  const siteUrl = getServerSideURL()
  const slug = pickString(doc?.slug)
  const url = pickString(currentUrl, slug ? `${siteUrl}/${slug}` : siteUrl)
  const image =
    getMediaUrl(doc?.meta?.image) ||
    getMediaUrl(doc?.heroImage) ||
    getMediaUrl(doc?.thumbnail) ||
    getMediaUrl(doc?.image)
  const logoUrl = getMediaUrl(branding?.brandAssets?.logo)
  const faqItems = extractFaqItems(doc)

  return {
    title: pickString(doc?.title, doc?.name),
    name: pickString(doc?.name, doc?.title),
    metaTitle: pickString(doc?.meta?.title),
    description: pickString(
      doc?.meta?.description,
      doc?.excerpt,
      doc?.subtitle,
      doc?.detailedDescription,
    ),
    metaDescription: pickString(doc?.meta?.description),
    excerpt: pickString(doc?.excerpt),
    subtitle: pickString(doc?.subtitle),
    slug,
    url,
    canonicalURL: pickString(doc?.meta?.canonicalURL, url),
    image,
    publishedAt: pickString(
      doc?.publishedAt,
      doc?.date,
      doc?.year ? `${doc.year}-01-01` : undefined,
    ),
    updatedAt: pickString(doc?.updatedAt),
    authorName: getAuthorName(doc, siteTitle),
    providerName: pickString(doc?.instructor?.name, siteTitle),
    providerUrl: siteUrl,
    productBrand: siteTitle,
    price: pickString(doc?.priceValue?.toString?.(), doc?.price),
    priceCurrency: pickString(doc?.priceCurrency),
    availability: pickString(doc?.availability),
    sku: pickString(doc?.isbn, doc?.slug),
    rating: pickString(doc?.rating?.toString?.()),
    reviews: pickString(doc?.reviews?.toString?.(), doc?.studentReviews?.length?.toString?.()),
    startDate: pickString(doc?.eventDateTime, doc?.date, doc?.startDate),
    endDate: pickString(doc?.endDate),
    eventAttendanceMode:
      doc?.isOnline === true
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : doc?.isOnline === false
          ? 'https://schema.org/OfflineEventAttendanceMode'
          : undefined,
    eventStatus: pickString(doc?.eventStatus),
    locationName: pickString(doc?.location?.name, doc?.locationName),
    locationAddress: pickString(doc?.location?.address, doc?.location, doc?.locationAddress),
    organizerName: pickString(doc?.host, doc?.organizerName, siteTitle),
    organizerUrl: siteUrl,
    siteTitle,
    siteDescription: pickString(branding?.siteMeta?.description),
    siteUrl,
    logoUrl,
    telephone: pickString(branding?.contactInfo?.phone, footer?.contactInfo?.phone),
    streetAddress: undefined,
    addressLocality: undefined,
    addressRegion: undefined,
    addressCountry: undefined,
    postalCode: undefined,
    sameAs: getArray(footer?.socialLinks)
      .map((social) => (isPlainObject(social) ? pickString(social.url) : undefined))
      .filter(Boolean),
    faqItems,
    breadcrumbs: buildBreadcrumbs(doc, currentUrl),
  }
}

const mergeConfig = (templateConfig?: UnknownRecord | null, overrides?: UnknownRecord | null) => ({
  ...(templateConfig || {}),
  ...(overrides || {}),
})

const buildGuidedSchema = (
  schemaType: string,
  config: UnknownRecord,
  context: UnknownRecord,
): ResolvedStructuredData | undefined => {
  const resolvedConfig = interpolateValue(config, context) as UnknownRecord
  const fallbackType = pickString(resolvedConfig.customType, schemaType)
  const resolvedName = pickString(
    resolvedConfig.name,
    context.metaTitle,
    context.title,
    context.siteTitle,
  )
  const resolvedDescription = pickString(
    resolvedConfig.description,
    context.metaDescription,
    context.description,
  )
  const resolvedUrl = toAbsoluteUrl(
    pickString(resolvedConfig.url, context.canonicalURL, context.url),
  )
  const resolvedImage = toAbsoluteUrl(pickString(resolvedConfig.image, context.image))
  const schemaId = (fallback: string) =>
    toAbsoluteId(
      pickString(resolvedConfig.schemaId, fallback),
      resolvedUrl || context.url || context.siteUrl,
    )

  switch (schemaType) {
    case 'FAQPage': {
      const faqItems =
        resolvedConfig.faqSource === 'custom'
          ? getArray(resolvedConfig.faqItems)
          : getArray(context.faqItems)

      if (!faqItems.length) return undefined

      const mainEntity = faqItems.filter(isPlainObject).map((item) => ({
        '@type': 'Question',
        name: pickString(item.question),
        acceptedAnswer: {
          '@type': 'Answer',
          text: pickString(item.answer),
        },
      }))

      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': schemaId('#faq'),
        name: resolvedName,
        description: resolvedDescription,
        url: resolvedUrl,
        mainEntity,
      })
    }
    case 'Article':
    case 'BlogPosting':
      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': schemaType,
        '@id': schemaId(schemaType === 'BlogPosting' ? '#blogposting' : '#article'),
        headline: pickString(resolvedConfig.headline, resolvedName, context.title, context.name),
        description: resolvedDescription,
        image: resolvedImage,
        datePublished: pickString(resolvedConfig.datePublished, context.publishedAt),
        dateModified: pickString(
          resolvedConfig.dateModified,
          context.updatedAt,
          context.publishedAt,
        ),
        author: pickString(resolvedConfig.authorName, context.authorName)
          ? {
              '@type': 'Person',
              name: pickString(resolvedConfig.authorName, context.authorName),
            }
          : undefined,
        publisher: pickString(resolvedConfig.publisherName, context.siteTitle)
          ? {
              '@type': 'Organization',
              name: pickString(resolvedConfig.publisherName, context.siteTitle),
              logo: pickString(resolvedConfig.publisherLogo, context.logoUrl)
                ? {
                    '@type': 'ImageObject',
                    url: toAbsoluteUrl(pickString(resolvedConfig.publisherLogo, context.logoUrl)),
                  }
                : undefined,
            }
          : undefined,
        articleSection: pickString(resolvedConfig.articleSection),
        mainEntityOfPage: resolvedUrl,
        url: resolvedUrl,
      })
    case 'WebPage':
    case 'AboutPage':
    case 'ContactPage':
      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': schemaType,
        '@id': schemaId('#webpage'),
        name: resolvedName,
        description: resolvedDescription,
        image: resolvedImage,
        url: resolvedUrl,
      })
    case 'WebSite':
      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': schemaId('#website'),
        name: resolvedName,
        description: resolvedDescription,
        url: resolvedUrl,
        potentialAction: pickString(resolvedConfig.potentialSearchTarget)
          ? {
              '@type': 'SearchAction',
              target: pickString(resolvedConfig.potentialSearchTarget),
              'query-input': 'required name=search_term_string',
            }
          : undefined,
      })
    case 'Course':
      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': 'Course',
        '@id': schemaId('#course'),
        name: resolvedName,
        description: resolvedDescription,
        image: resolvedImage,
        provider: pickString(resolvedConfig.providerName, context.providerName, context.siteTitle)
          ? {
              '@type': 'Organization',
              name: pickString(
                resolvedConfig.providerName,
                context.providerName,
                context.siteTitle,
              ),
              sameAs: toAbsoluteUrl(pickString(resolvedConfig.providerUrl, context.providerUrl)),
            }
          : undefined,
        url: resolvedUrl,
      })
    case 'Product':
      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': schemaId('#product'),
        name: resolvedName,
        description: resolvedDescription,
        image: resolvedImage,
        sku: pickString(resolvedConfig.sku, context.sku),
        brand: pickString(resolvedConfig.brand, context.productBrand)
          ? {
              '@type': 'Brand',
              name: pickString(resolvedConfig.brand, context.productBrand),
            }
          : undefined,
        offers: pickString(resolvedConfig.price, context.price)
          ? {
              '@type': 'Offer',
              price: pickString(resolvedConfig.price, context.price),
              priceCurrency: pickString(resolvedConfig.priceCurrency, context.priceCurrency, 'INR'),
              availability: pickString(resolvedConfig.availability, context.availability),
              url: resolvedUrl,
            }
          : undefined,
        aggregateRating: pickString(resolvedConfig.ratingValue, context.rating)
          ? {
              '@type': 'AggregateRating',
              ratingValue: pickString(resolvedConfig.ratingValue, context.rating),
              reviewCount: pickString(resolvedConfig.reviewCount, context.reviews),
            }
          : undefined,
        url: resolvedUrl,
      })
    case 'Event':
      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': 'Event',
        '@id': schemaId('#event'),
        name: resolvedName,
        description: resolvedDescription,
        image: resolvedImage,
        url: resolvedUrl,
        startDate: pickString(resolvedConfig.startDate, context.startDate),
        endDate: pickString(resolvedConfig.endDate, context.endDate),
        eventStatus: pickString(resolvedConfig.eventStatus, context.eventStatus),
        eventAttendanceMode: pickString(
          resolvedConfig.eventAttendanceMode,
          context.eventAttendanceMode,
        ),
        location: pickString(
          resolvedConfig.locationName,
          context.locationName,
          resolvedConfig.locationAddress,
          context.locationAddress,
        )
          ? {
              '@type': 'Place',
              name: pickString(resolvedConfig.locationName, context.locationName),
              address: pickString(resolvedConfig.locationAddress, context.locationAddress),
            }
          : undefined,
        organizer: pickString(resolvedConfig.organizerName, context.organizerName)
          ? {
              '@type': 'Organization',
              name: pickString(resolvedConfig.organizerName, context.organizerName),
              url: toAbsoluteUrl(pickString(resolvedConfig.organizerUrl, context.organizerUrl)),
            }
          : undefined,
      })
    case 'BreadcrumbList': {
      const breadcrumbs =
        resolvedConfig.breadcrumbSource === 'custom'
          ? getArray(resolvedConfig.breadcrumbs)
          : getArray(context.breadcrumbs)

      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': schemaId('#breadcrumb'),
        itemListElement: breadcrumbs.filter(isPlainObject).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: pickString(item.name),
          item: toAbsoluteUrl(pickString(item.item)),
        })),
      })
    }
    case 'Organization':
    case 'EducationalOrganization': {
      const configuredSameAs = getArray(resolvedConfig.sameAs)
        .map((entry) => (isPlainObject(entry) ? pickString(entry.url) : pickString(entry)))
        .filter(Boolean)
      const fallbackSameAs = getArray(context.sameAs).filter(Boolean)
      const address = stripEmpty({
        '@type': 'PostalAddress',
        streetAddress: pickString(resolvedConfig.streetAddress),
        addressLocality: pickString(resolvedConfig.addressLocality),
        addressRegion: pickString(resolvedConfig.addressRegion),
        postalCode: pickString(resolvedConfig.postalCode),
        addressCountry: pickString(resolvedConfig.addressCountry),
      })

      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': schemaType,
        '@id': schemaId('#organization'),
        name: resolvedName,
        description: resolvedDescription,
        url: resolvedUrl || context.siteUrl,
        logo: toAbsoluteUrl(pickString(resolvedConfig.logoUrl, context.logoUrl)),
        telephone: pickString(resolvedConfig.telephone, context.telephone),
        sameAs: configuredSameAs.length ? configuredSameAs : fallbackSameAs,
        address,
      })
    }
    default:
      return stripEmpty({
        '@context': 'https://schema.org',
        '@type': fallbackType,
        '@id': schemaId(`#${String(fallbackType || 'schema').toLowerCase()}`),
        name: resolvedName,
        description: resolvedDescription,
        image: resolvedImage,
        url: resolvedUrl,
      })
  }
}

const resolveCustomSchema = (
  customJSON: unknown,
  context: UnknownRecord,
): ResolvedStructuredData | undefined => {
  if (!customJSON) return undefined
  const resolved = interpolateValue(customJSON, context)
  if (!isPlainObject(resolved)) return undefined

  return stripEmpty({
    '@context': 'https://schema.org',
    ...resolved,
  })
}

const resolveStructuredDataItem = (
  item: UnknownRecord,
  context: UnknownRecord,
): { order: number; schema?: ResolvedStructuredData } => {
  const template = isPlainObject(item.sourceTemplate) ? item.sourceTemplate : undefined
  const schemaType = pickString(item.schemaType, template?.schemaType) || 'WebPage'
  const mode = pickString(item.mode, template?.mode, 'guided')
  const config = mergeConfig(template?.templateConfig, item.overrides)
  const schema =
    mode === 'custom'
      ? resolveCustomSchema(item.customJSON ?? template?.customJSON, context)
      : buildGuidedSchema(schemaType, config, context)

  return {
    order: Number(item.placementOrder ?? template?.placementOrder ?? 0),
    schema,
  }
}

export const resolveStructuredData = ({
  doc,
  currentUrl,
  branding,
  footer,
  schemaItems,
}: StructuredDataContext): ResolvedStructuredData[] => {
  const context = buildContext({ doc, currentUrl, branding, footer })
  const items = getArray(schemaItems)
    .filter(isPlainObject)
    .filter((item) => item.enabled !== false)
    .map((item) => resolveStructuredDataItem(item, context))
    .sort((a, b) => a.order - b.order)
    .map((entry) => entry.schema)
    .filter(Boolean) as ResolvedStructuredData[]

  return items
}
