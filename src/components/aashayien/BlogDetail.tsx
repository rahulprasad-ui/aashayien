'use client'

import React from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Tag,
  TrendingUp,
  Eye,
  ThumbsUp,
  Award,
  BookOpen,
} from 'lucide-react'
import Image from 'next/image'
import type { Post } from '@/payload-types'
import { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { format } from 'date-fns'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { ImageWithFallback } from './ImageWithFallback'

interface BlogDetailProps {
  post: Post
  relatedPosts: Post[]
}

export function BlogDetail({ post, relatedPosts }: BlogDetailProps) {
  // Helper to get image URL
  const getImageUrl = (image: string | Media | null | undefined | number) => {
    if (!image) return '/placeholder.jpg'
    if (typeof image === 'string') return getMediaUrl(image)
    if (typeof image === 'number') return '/placeholder.jpg'
    return getMediaUrl(image.url || '/placeholder.jpg')
  }

  // Get Author info
  const author = post.populatedAuthors?.[0]
  const authorName = author?.name || 'Aashayein Team'
  const authorImage = '/placeholder.jpg' // Users do not currently expose avatar images publicly
  const authorTitle = 'Legal Expert'

  // Date formatting
  const publishDate = post.publishedAt
    ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
    : format(new Date(post.createdAt), 'MMMM d, yyyy')

  // Categories/Tags
  const categories =
    post.categories?.map((cat) => (typeof cat === 'object' ? cat : null)).filter(Boolean) || []
  const primaryCategory = categories[0]
  const subCategoryName = primaryCategory?.title || 'Blog'

  // Share logic
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title

  const shareHandlers = {
    facebook: () => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        '_blank',
      )
    },
    twitter: () => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(
          shareUrl,
        )}`,
        '_blank',
      )
    },
    linkedin: () => {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          shareUrl,
        )}&title=${encodeURIComponent(shareTitle)}`,
        '_blank',
      )
    },
    copy: () => {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link copied to clipboard!')
      })
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-[#ED1F24] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-[#ED1F24] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 line-clamp-1">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Full Width Article Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category & Featured Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ED1F24]/10 text-[#ED1F24] text-sm font-medium rounded-full">
              <Tag className="w-3.5 h-3.5" />
              {subCategoryName}
            </span>
            {post.featured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-slate-900 mb-6 leading-tight">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-200">
            {/* Author */}
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={authorImage}
                alt={authorName}
                fill
                className="w-12 h-12 rounded-full bg-slate-100 shrink-0"
                unoptimized
              />
              <div>
                <div className="font-medium text-slate-900">{authorName}</div>
                <div className="text-sm text-slate-600">{authorTitle}</div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-12 w-px bg-slate-200" />

            {/* Date & Time */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ED1F24]" />
                <span>{publishDate}</span>
              </div>
              {/* Read time could be calculated from content length */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ED1F24]" />
                <span>5 min read</span>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Article Content with Sidebar */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Featured Image Moved Here */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl bg-slate-100 w-full">
              <Image
                src={getImageUrl(post.heroImage)}
                alt={post.title}
                width={(typeof post.heroImage === 'object' && post.heroImage?.width) || 1200}
                height={(typeof post.heroImage === 'object' && post.heroImage?.height) || 675}
                className="w-full h-auto block"
                unoptimized
              />
            </div>

            {/* Social Share Moved Here */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-12">
              <span className="text-sm font-medium text-slate-900">Share this article:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={shareHandlers.facebook}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={shareHandlers.twitter}
                  className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={shareHandlers.linkedin}
                  className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={shareHandlers.copy}
                  className="p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  title="Copy Link"
                >
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Article Content */}
            <div className="blog-content">
              <RichText
                data={post.content}
                enableGutter={false}
                className="mx-0 w-full max-w-none"
              />
            </div>

            {/* Custom Styles for RichText content matching previous design */}
            <style jsx global>{`
              .blog-content h2 {
                font-size: 2rem;
                font-weight: 700;
                color: #0f172a;
                margin-top: 4rem;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #e2e8f0;
              }

              .blog-content h3 {
                font-size: 1.5rem;
                font-weight: 700;
                color: #0f172a;
                margin-top: 3rem;
                margin-bottom: 1.5rem;
              }

              .blog-content h4 {
                font-size: 1.25rem;
                font-weight: 600;
                color: #0f172a;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }

              .blog-content p {
                font-size: 1.125rem;
                line-height: 1.8;
                color: #334155;
                margin-top: 0;
                margin-bottom: 1rem;
              }

              .blog-content p:empty,
              .blog-content p:has(> br:only-child) {
                display: none;
              }

              .blog-content .payload-richtext,
              .blog-content .prose,
              .blog-content .container {
                width: 100%;
                max-width: none;
                margin-left: 0;
                margin-right: 0;
                padding-left: 0;
                padding-right: 0;
              }

              .blog-content ul,
              .blog-content ol {
                font-size: 1.125rem;
                color: #334155;
                margin-bottom: 2rem;
                margin-left: 1.5rem;
              }

              .blog-content ul {
                list-style-type: disc;
              }

              .blog-content ol {
                list-style-type: decimal;
              }

              .blog-content li {
                margin-bottom: 0.75rem;
                line-height: 1.8;
                padding-left: 0.5rem;
              }

              .blog-content strong {
                font-weight: 600;
                color: #0f172a;
              }

              .blog-content a {
                color: #ed1f24;
                text-decoration: none;
              }

              .blog-content a:hover {
                text-decoration: underline;
              }

              .blog-content blockquote {
                border-left: 4px solid #ed1f24;
                padding-left: 1.5rem;
                margin: 2rem 0;
                font-style: italic;
                color: #475569;
              }

              /* Add more styles as needed */
            `}</style>

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl">
              <div className="flex items-start gap-6">
                <ImageWithFallback
                  src={authorImage}
                  alt={authorName}
                  fill
                  className="w-20 h-20 rounded-full shrink-0"
                  unoptimized
                />
                <div>
                  <h3 className="text-xl! text-slate-900 mb-2">About {authorName}</h3>
                  <p className="text-slate-600 mb-4">{authorTitle}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex items-center gap-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: `Check out this event: ${post.title}`,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                      alert('Link copied to clipboard!')
                    })
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Enroll Now CTA */}
              <div className="bg-linear-to-br from-[#ED1F24] to-[#c91a1e] rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5" />
                  <h3 className="text-lg! text-white! font-bold! mb-0!">Start Your Journey</h3>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Join 50,000+ aspirants and get access to premium courses, study material, and
                  expert guidance.
                </p>
                <a
                  href="/courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-white text-[#ED1F24] text-center rounded-lg font-semibold hover:bg-slate-100 transition-colors mb-3"
                >
                  Enroll Now
                </a>
                <Link
                  href="/courses"
                  className="block w-full py-3 bg-white/10 text-white text-center rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/30"
                >
                  View All Courses
                </Link>
              </div>

              {/* Free Resources */}
              <div className="bg-linear-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg! text-slate-900! font-bold! mb-0!">Free Resources</h3>
                </div>
                <div className="space-y-2">
                  <Link
                    href="/free-study-online"
                    className="block py-2.5 px-4 bg-white text-slate-700 text-sm rounded-lg hover:bg-amber-100 transition-colors border border-amber-200"
                  >
                    📹 Free Video Lectures
                  </Link>
                  <Link
                    href="/blog"
                    className="block py-2.5 px-4 bg-white text-slate-700 text-sm rounded-lg hover:bg-amber-100 transition-colors border border-amber-200"
                  >
                    📝 Blog & Articles
                  </Link>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg! text-white! font-bold! mb-0!">Newsletter</h3>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Get weekly updates on legal news, judgments, and exam tips.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 mb-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="w-full py-2.5 bg-[#ED1F24] text-white rounded-lg font-medium hover:bg-[#d11b20] transition-colors">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-slate-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-slate-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => {
                const postCategory = post.categories?.[0]
                const categoryName = typeof postCategory === 'object' ? postCategory?.title : 'Blog'
                const date = post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : ''

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug || post.id}`}
                    className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={getImageUrl(post.heroImage)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-[#ED1F24] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg">
                          {categoryName}
                        </span>
                      </div>
                    </div>
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
              })}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">Ready to Start Your Judiciary Journey?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join 50,000+ aspirants preparing with expert guidance and comprehensive study material.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#ED1F24] text-white rounded-xl hover:bg-[#d11b20] transition-colors font-semibold"
            >
              Enroll Now
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
