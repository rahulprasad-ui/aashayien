import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Blog } from '@/components/aashayien/Blog'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'
import { Pagination } from '@/components/Pagination'

const POSTS_PER_PAGE = 12

type BlogSearchParams = {
  category?: string
  page?: string
}

const getBlogPageHref = (page: number, category?: string) => {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/blog?${query}` : '/blog'
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>
}): Promise<Metadata> {
  const blogData = await getCachedGlobal('blog', 1)()
  const { category, page } = await searchParams
  const meta = await generateMeta({ doc: blogData as any, slug: 'blog' })
  const currentPage = Number(page) > 1 ? Number(page) : 1

  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      canonical: `${getServerSideURL()}${getBlogPageHref(currentPage, category)}`,
    },
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>
}) {
  const payload = await getPayload({ config: configPromise })
  const { category = 'all', page } = await searchParams
  const currentPage = Number(page) > 1 ? Number(page) : 1

  const blogData: any = await payload.findGlobal({
    slug: 'blog',
  })

  // Fetch categories
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  const selectedCategory = categories.docs.find((cat) => cat.slug === category)
  const where =
    selectedCategory && category !== 'all'
      ? {
          categories: {
            in: [selectedCategory.id],
          },
        }
      : undefined

  // Fetch posts
  const posts = await payload.find({
    collection: 'posts',
    limit: POSTS_PER_PAGE,
    page: currentPage,
    sort: '-createdAt',
    depth: 1,
    overrideAccess: false,
    where,
  })

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/blog`}
        doc={blogData}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'WebPage',
            mode: 'guided',
          },
        ]}
      />
      <Blog
        blogData={blogData}
        categoriesData={categories.docs}
        initialCategory={selectedCategory?.slug || 'all'}
        postsData={posts.docs}
      />
      {posts.totalPages > 1 && posts.page && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Pagination
            page={posts.page}
            totalPages={posts.totalPages}
            getPageHref={(pageNumber) => getBlogPageHref(pageNumber, selectedCategory?.slug)}
          />
        </div>
      )}
    </main>
  )
}
