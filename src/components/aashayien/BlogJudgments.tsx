'use client'

import { FileText, Scale, ExternalLink, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'

import { Media, Post, Category } from '@/payload-types'
import Link from 'next/link'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface BlogJudgmentsProps {
  title?: string
  subtitle?: string
  description?: string
  posts?: Post[]
  viewAllLink?: any
}

export function BlogJudgments({
  title = 'Legal Articles & Landmark Judgments',
  subtitle = 'Blog & Judgments',
  description,
  posts = [],
  viewAllLink,
}: BlogJudgmentsProps) {
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch (e) {
      return dateString
    }
  }

  const getPostCategory = (post: Post) => {
    if (post.categories && post.categories.length > 0) {
      const cat = post.categories[0]
      if (typeof cat === 'object' && cat !== null && cat.group === 'judgments') return 'Judgment'
    }
    return 'Blog'
  }

  return (
    <section id="blog" className="py-24 bg-slate-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 dark:bg-red-900/20 text-[#ED1F24] rounded-full mb-6 border border-red-100 dark:border-red-800/30">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">{subtitle}</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post) => {
            const categoryLabel = getPostCategory(post)
            const heroImage = post.heroImage as Media
            const postDate = formatDate(post.publishedAt || post.createdAt)

            return (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group flex flex-col bg-white dark:bg-neutral-900 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 border border-slate-100 dark:border-neutral-800 h-full"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={typeof heroImage === 'object' ? getMediaUrl(heroImage?.url || '') : ''}
                    alt={post.title}
                    width={(typeof heroImage === 'object' && heroImage?.width) || 800}
                    height={(typeof heroImage === 'object' && heroImage?.height) || 450}
                    className="w-full h-auto block group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Badge */}
                  <div
                    className={`absolute top-6 left-6 flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md shadow-lg ${
                      categoryLabel === 'Blog' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-white text-slate-900'
                    }`}
                  >
                    {categoryLabel === 'Blog' ? (
                      <FileText className="w-3.5 h-3.5" />
                    ) : (
                      <Scale className="w-3.5 h-3.5" />
                    )}
                    {categoryLabel}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-8 grow">
                  <div className="flex items-center gap-3 mb-4 text-xs font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest">
                    <span>{postDate}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-neutral-700" />
                    <span>5 min read</span>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-[#ED1F24] transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#ED1F24] font-black group-hover:gap-4 transition-all duration-300">
                      <span className="text-sm">Read Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-[#ED1F24] transition-colors duration-300">
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA Button */}
        {viewAllLink && (
          <div className="text-center">
            <Link
              href={viewAllLink.url || '/blog'}
              target={viewAllLink.newTab ? '_blank' : '_self'}
              className="inline-flex items-center gap-4 px-10 py-5 bg-[#ED1F24] text-white rounded-[1.25rem] hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 font-black text-lg tracking-tight"
            >
              <FileText className="w-6 h-6" />
              <span>{viewAllLink.label || 'Explore Knowledge Hub'}</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
