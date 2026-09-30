'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import Image from 'next/image'
import type { Post, Category, Blog as BlogType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

// Props Interface
interface BlogProps {
  blogData: BlogType
  categoriesData: Category[]
  initialCategory?: string
  postsData: Post[]
}

export function Blog({ blogData, categoriesData, initialCategory = 'all', postsData }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  // Helper to get image URL - checks meta image first, then heroImage as fallback
  const getImageUrl = (post: Post) => {
    const metaImage = post.meta?.image
    const heroImage = post.heroImage

    // Try meta image first
    if (metaImage && typeof metaImage === 'object' && 'url' in metaImage && metaImage.url) {
      return getMediaUrl(metaImage.url)
    }
    if (metaImage && typeof metaImage === 'string') return getMediaUrl(metaImage)

    // Fallback to heroImage
    if (heroImage && typeof heroImage === 'object' && 'url' in heroImage && heroImage.url) {
      return getMediaUrl(heroImage.url)
    }
    if (heroImage && typeof heroImage === 'string') return getMediaUrl(heroImage)

    return '/placeholder.jpg'
  }

  // Filter Posts
  const filteredPosts = postsData.filter((post) => {
    const postCategories =
      post.categories?.map((cat) => (typeof cat === 'object' ? cat.slug : cat)) || []

    // Check Category Match
    if (selectedCategory === 'all') {
      return true
    }
    return postCategories.includes(selectedCategory)
  })

  // Sort: Featured first, then by date (assuming postsData is already sorted by date from server, but featured logic is local)
  // Actually, let's keep array order but prioritize featured?
  // The UI splits them into "Featured" and "Latest".

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section (PW Store Style) */}
      <div className="pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {blogData.heroTitle || 'Aashayien Blog'}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {blogData.heroDescription || "Your daily source for legal updates, case laws, and judiciary exam preparation."}
          </p>
        </div>
      </div>

      {/* Categories / Tags Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-6">
          <h2 className="text-blue-600 font-bold text-lg mb-4">#OurPopularCategories</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#ED1F24] border-[#ED1F24] text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#ED1F24] hover:text-[#ED1F24]'
              }`}
            >
              All Categories
            </Link>
            {categoriesData.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug || ''}`}
                onClick={() => setSelectedCategory(cat.slug || '')}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-[#ED1F24] border-[#ED1F24] text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-[#ED1F24] hover:text-[#ED1F24]'
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {selectedCategory === 'all' 
              ? 'All Articles' 
              : categoriesData.find((c) => c.slug === selectedCategory)?.title || 'Articles'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} getImageUrl={getImageUrl} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Sub-component for individual blog cards
function BlogCard({ post, getImageUrl }: { post: Post; getImageUrl: (p: Post) => string }) {
  const postCategory = post.categories?.[0]
  const categoryName = typeof postCategory === 'object' ? postCategory.title : 'Blog'

  // Format date
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  return (
    <Link
      href={`/blog/${post.slug || post.id}`}
      className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={getImageUrl(post)}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-[#ED1F24] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#ED1F24] transition-colors leading-tight">
          {post.title}
        </h3>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-sm text-slate-500 font-medium">{date}</span>
          <div className="text-[#ED1F24] group-hover:translate-x-1 transition-transform">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
