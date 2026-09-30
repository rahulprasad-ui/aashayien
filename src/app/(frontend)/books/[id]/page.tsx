import { BookDetail } from '@/components/aashayien/BookDetail'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { generateMeta } from '@/utilities/generateMeta'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs: books } = await payload.find({
    collection: 'books',
    where: {
      slug: {
        equals: id,
      },
    },
  })

  const book = books[0] || (await payload.findByID({ collection: 'books', id }).catch(() => null))

  if (!book) {
    return {
      title: 'Book Not Found | Aashayein Judiciary',
    }
  }

  return generateMeta({ doc: book, slug: `books/${book.slug || id}` })
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs: books } = await payload.find({
    collection: 'books',
    where: {
      slug: {
        equals: id,
      },
    },
  })

  const book = books[0] || (await payload.findByID({ collection: 'books', id }).catch(() => null))

  if (!book) {
    return notFound()
  }

  // Fetch similar books automatically if manual ones aren't set
  let relatedBooks: any[] = []
  if (book.relatedBooks && book.relatedBooks.length > 0) {
    relatedBooks = book.relatedBooks
  } else {
    const { docs: similarBooks } = await payload.find({
      collection: 'books',
      where: {
        and: [
          {
            id: {
              not_equals: book.id,
            },
          },
          {
            category: {
              equals: book.category,
            },
          },
        ],
      },
      limit: 3,
    })
    relatedBooks = similarBooks

    // Deep fallback: fetch any other books if category match is empty
    if (relatedBooks.length === 0) {
      const { docs: fallbackBooks } = await payload.find({
        collection: 'books',
        where: {
          id: {
            not_equals: book.id,
          },
        },
        limit: 3,
      })
      relatedBooks = fallbackBooks
    }
  }

  const freeStudyGlobal = await payload.findGlobal({
    slug: 'free-study',
    depth: 2,
  })

  const gatingConfig = {
    enableGating: freeStudyGlobal?.enableGating,
    gatingPopup:
      typeof freeStudyGlobal?.gatingPopup === 'object' ? freeStudyGlobal.gatingPopup : null,
  }

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/books/${book.slug}`}
        doc={book as any}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'Product',
            mode: 'guided',
            overrides: {
              name: '{{title}}',
              description: '{{description}}',
              image: '{{image}}',
              sku: '{{sku}}',
              brand: '{{siteTitle}}',
              price: '{{price}}',
              priceCurrency: 'INR',
              ratingValue: '{{rating}}',
              reviewCount: '{{reviews}}',
            },
          },
        ]}
      />
      <BookDetail
        book={book as any}
        relatedBooksOverride={relatedBooks as any}
        gatingConfig={gatingConfig}
      />
    </main>
  )
}
