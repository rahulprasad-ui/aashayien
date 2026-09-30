import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ImageWithFallback } from '@/components/aashayien/ImageWithFallback'
import { Calendar, ExternalLink } from 'lucide-react'
import type { Post } from '@/payload-types'

type PostsBlockProps = {
  heading?: string | null
  subheading?: string | null
  description?: string | null
  populateBy?: 'latest' | 'selection' | null
  selectedPosts?: (Post | number | string)[] | null
  limit?: number | null
  viewAllLink?: string | null
}

export const PostsBlockComponent: React.FC<PostsBlockProps> = async ({
  heading = 'Latest Articles',
  subheading = 'Blog & Articles',
  description,
  populateBy = 'latest',
  selectedPosts,
  limit = 6,
  viewAllLink = '/blog',
}) => {
  let posts: Post[] = []

  if (populateBy === 'selection' && selectedPosts && selectedPosts.length > 0) {
    posts = selectedPosts.map((item) => (typeof item === 'object' ? item : null)).filter(Boolean) as Post[]
  }

  if (posts.length === 0) {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'posts',
      limit: limit ?? 6,
      sort: '-createdAt',
      overrideAccess: false,
      depth: 1,
    })
    posts = res.docs as Post[]
  }

  if (!posts || posts.length === 0) return null

  return (
    <section className="py-3 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          {subheading && (
            <div className="inline-block px-6 py-2 bg-red-100 rounded-full mb-4">
              <span className="text-[#ED1F24] font-bold text-sm">{subheading}</span>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            {heading}
          </h2>
          {description && <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>}
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => {
            const image = typeof post.heroImage === 'object' ? post.heroImage : null
            return (
              <a
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100 flex flex-col"
              >
                {image?.url && (
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={image.url}
                      alt={image.alt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-[#ED1F24] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-slate-500 text-sm pt-4">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* View All */}
        {viewAllLink && (
          <div className="text-center mt-10">
            <a
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#ED1F24] text-white rounded-xl hover:bg-[#d11b20] transition-colors font-bold shadow-lg"
            >
              View All Articles <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
