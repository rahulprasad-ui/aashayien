import { BlogDetail } from '@/components/aashayien/BlogDetail'
import { Media } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

import { generateMeta } from '@/utilities/generateMeta'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    overrideAccess: false,
  })

  const post = posts.docs[0]

  if (!post) {
    return {
      title: 'Blog Post Not Found | Aashayein Judiciary',
    }
  }

  return generateMeta({ doc: post, slug: 'blog/' + slug })
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    overrideAccess: false,
  })

  if (!posts.docs.length) {
    return notFound()
  }

  const post = posts.docs[0]

  // Fetch related posts (simple implementation: latest 3 excluding current)
  // In future: filter by category
  const relatedPosts = await payload.find({
    collection: 'posts',
    where: {
      id: {
        not_equals: post.id,
      },
    },
    limit: 3,
    sort: '-publishedAt',
    overrideAccess: false,
  })

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/blog/${post.slug}`}
        doc={post}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'BlogPosting',
            mode: 'guided',
          },
        ]}
      />
      <BlogDetail post={post} relatedPosts={relatedPosts.docs} />
    </main>
  )
}
