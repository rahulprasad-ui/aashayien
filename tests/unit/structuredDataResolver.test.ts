import { describe, expect, it } from 'vitest'

import { resolveStructuredData } from '@/seo/structuredData/resolver'

const branding = {
  siteMeta: {
    title: 'Aashayein Judiciary',
    description: 'Site description',
  },
  brandAssets: {
    logo: {
      url: '/logo.png',
    },
  },
  contactInfo: {
    phone: '+919111198177',
  },
}

const footer = {
  socialLinks: [{ url: 'https://youtube.com/example' }],
}

describe('resolveStructuredData', () => {
  it('uses auto-bound document values when guided fields are empty', () => {
    const schemas = resolveStructuredData({
      doc: {
        title: 'Post Title',
        slug: 'post-title',
        meta: {
          description: 'Post description',
        },
        publishedAt: '2026-04-25',
      },
      currentUrl: 'https://example.com/posts/post-title',
      branding,
      footer,
      schemaItems: [
        {
          enabled: true,
          schemaType: 'BlogPosting',
          mode: 'guided',
          overrides: {},
        },
      ],
    })

    expect(schemas).toHaveLength(1)
    expect(schemas[0]).toMatchObject({
      '@type': 'BlogPosting',
      headline: 'Post Title',
      description: 'Post description',
      url: 'https://example.com/posts/post-title',
    })
  })

  it('prefers document overrides over template defaults', () => {
    const schemas = resolveStructuredData({
      doc: {
        title: 'Original Title',
        slug: 'original-title',
      },
      currentUrl: 'https://example.com/original-title',
      branding,
      footer,
      schemaItems: [
        {
          enabled: true,
          schemaType: 'Article',
          mode: 'guided',
          sourceTemplate: {
            schemaType: 'Article',
            mode: 'guided',
            templateConfig: {
              headline: 'Template Headline',
            },
          },
          overrides: {
            headline: 'Document Headline',
          },
        },
      ],
    })

    expect(schemas[0]).toMatchObject({
      '@type': 'Article',
      headline: 'Document Headline',
    })
  })

  it('keeps template and local items together in placement order', () => {
    const schemas = resolveStructuredData({
      doc: {
        title: 'Page Title',
      },
      currentUrl: 'https://example.com/page-title',
      branding,
      footer,
      schemaItems: [
        {
          enabled: true,
          schemaType: 'WebPage',
          mode: 'guided',
          placementOrder: 20,
          overrides: {
            name: 'Second Schema',
          },
        },
        {
          enabled: true,
          schemaType: 'Organization',
          mode: 'guided',
          placementOrder: 10,
          sourceTemplate: {
            schemaType: 'Organization',
            mode: 'guided',
            templateConfig: {
              name: 'First Schema',
            },
          },
        },
      ],
    })

    expect(schemas.map((schema) => schema['@type'])).toEqual(['Organization', 'WebPage'])
    expect(schemas[0]).toMatchObject({ name: 'First Schema' })
    expect(schemas[1]).toMatchObject({ name: 'Second Schema' })
  })

  it('passes through custom JSON with token interpolation', () => {
    const schemas = resolveStructuredData({
      doc: {
        title: 'Interpolated',
      },
      currentUrl: 'https://example.com/interpolated',
      branding,
      footer,
      schemaItems: [
        {
          enabled: true,
          mode: 'custom',
          customJSON: {
            '@type': 'WebPage',
            name: '{{title}}',
            url: '{{url}}',
          },
        },
      ],
    })

    expect(schemas[0]).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Interpolated',
      url: 'https://example.com/interpolated',
    })
  })

  it('omits empty optional values and resolves faq data automatically', () => {
    const schemas = resolveStructuredData({
      doc: {
        title: 'FAQ Page',
        questions: [
          {
            question: 'What is this?',
            answer: 'A test.',
          },
        ],
      },
      currentUrl: 'https://example.com/faq',
      branding,
      footer,
      schemaItems: [
        {
          enabled: true,
          schemaType: 'FAQPage',
          mode: 'guided',
          overrides: {},
        },
      ],
    })

    expect(schemas[0]).toMatchObject({
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is this?',
        },
      ],
    })
    expect(schemas[0]).not.toHaveProperty('image')
  })

  it('skips faq schema when no faq items are available', () => {
    const schemas = resolveStructuredData({
      doc: {
        title: 'No FAQ Page',
      },
      currentUrl: 'https://example.com/no-faq',
      branding,
      footer,
      schemaItems: [
        {
          enabled: true,
          schemaType: 'FAQPage',
          mode: 'guided',
          overrides: {},
        },
      ],
    })

    expect(schemas).toEqual([])
  })

  it('builds product schema from book-like document values', () => {
    const schemas = resolveStructuredData({
      doc: {
        title: 'Evidence Act Guide',
        description: 'A practical guide.',
        slug: 'evidence-act-guide',
        priceValue: 499,
        rating: 4.8,
        reviews: 120,
        isbn: 'ISBN-123',
        image: {
          url: '/book.jpg',
        },
      },
      currentUrl: 'https://example.com/books/evidence-act-guide',
      branding,
      footer,
      schemaItems: [
        {
          enabled: true,
          schemaType: 'Product',
          mode: 'guided',
          overrides: {
            ratingValue: '{{rating}}',
            reviewCount: '{{reviews}}',
          },
        },
      ],
    })

    expect(schemas[0]).toMatchObject({
      '@type': 'Product',
      name: 'Evidence Act Guide',
      sku: 'ISBN-123',
      offers: {
        price: '499',
        priceCurrency: 'INR',
      },
      aggregateRating: {
        ratingValue: '4.8',
        reviewCount: '120',
      },
    })
  })
})
