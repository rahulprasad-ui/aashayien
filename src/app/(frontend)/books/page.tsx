import { Books } from '@/components/aashayien/Books'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { BooksPage as BooksPageType } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Suspense } from 'react'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'
import { Pagination } from '@/components/Pagination'

const BOOKS_PER_PAGE = 12
const validBookFilters = [
  'free',
  'criminal-law',
  'civil-law',
  'constitution',
  'mains',
  'current-affairs',
  'state-specific',
] as const

type BooksSearchParams = {
  filter?: string
  page?: string
}

const getBooksPageHref = (page: number, filter?: string) => {
  const params = new URLSearchParams()
  if (filter) params.set('filter', filter)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/books?${query}` : '/books'
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<BooksSearchParams>
}): Promise<Metadata> {
  const booksData = (await getCachedGlobal('books-page', 1)()) as BooksPageType
  const { filter, page } = await searchParams
  const meta = await generateMeta({ doc: booksData as any, slug: 'books' })
  const currentPage = Number(page) > 1 ? Number(page) : 1

  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      canonical: `${getServerSideURL()}${getBooksPageHref(currentPage, filter)}`,
    },
  }
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<BooksSearchParams>
}) {
  const payload = await getPayload({ config: configPromise })
  const { filter, page } = await searchParams
  const currentPage = Number(page) > 1 ? Number(page) : 1
  const selectedFilter = validBookFilters.includes(filter as any) ? filter : undefined

  const booksResult = await payload.find({
    collection: 'books',
    limit: BOOKS_PER_PAGE,
    page: currentPage,
    sort: '-createdAt',
    overrideAccess: false,
    where: selectedFilter
      ? {
          category: {
            equals: selectedFilter,
          },
        }
      : undefined,
  })

  const booksPageData: any = await payload.findGlobal({
    slug: 'books-page',
  })

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/books`}
        doc={booksPageData}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'WebPage',
            mode: 'guided',
          },
        ]}
      />
      <Suspense fallback={<div>Loading books...</div>}>
        <Books
          books={booksResult.docs as any}
          pageData={booksPageData as any}
          initialCategory={selectedFilter}
        />
      </Suspense>
      {booksResult.totalPages > 1 && booksResult.page && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Pagination
            page={booksResult.page}
            totalPages={booksResult.totalPages}
            getPageHref={(pageNumber) => getBooksPageHref(pageNumber, selectedFilter)}
          />
        </div>
      )}
    </main>
  )
}
