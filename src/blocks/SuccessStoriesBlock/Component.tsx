import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Trophy, ExternalLink, MapPin, Play, Star, ArrowRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/aashayien/ImageWithFallback'
import type { SuccessStory } from '@/payload-types'

type SuccessStoriesBlockProps = {
  heading?: string | null
  subheading?: string | null
  description?: string | null
  categoryFilter?: 'all' | 'judiciary' | 'adpo' | 'mains' | 'test-series' | 'interview' | null
  populateBy?: 'latest' | 'selection' | null
  selectedStories?: (SuccessStory | number | string)[] | null
  limit?: number | null
  viewAllLink?: string | null
}

export const SuccessStoriesBlockComponent: React.FC<SuccessStoriesBlockProps> = async ({
  heading = 'Our Success Stories',
  subheading = 'Toppers & Selections',
  description = 'Meet our shining stars who cleared prestigious Judicial and ADPO examinations.',
  categoryFilter = 'all',
  populateBy = 'latest',
  selectedStories,
  limit = 6,
  viewAllLink = '/success-stories',
}) => {
  let stories: SuccessStory[] = []

  if (populateBy === 'selection' && selectedStories && selectedStories.length > 0) {
    stories = selectedStories
      .map((item) => (typeof item === 'object' ? item : null))
      .filter(Boolean) as SuccessStory[]
  }

  if (stories.length === 0) {
    const payload = await getPayload({ config: configPromise })
    const whereCondition: any = {}
    if (categoryFilter && categoryFilter !== 'all') {
      whereCondition.category = { equals: categoryFilter }
    }

    const res = await payload.find({
      collection: 'success-stories',
      where: whereCondition,
      limit: limit ?? 6,
      sort: 'rank',
      overrideAccess: false,
      depth: 1,
    })
    stories = res.docs as SuccessStory[]
  }

  if (!stories || stories.length === 0) return null

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
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{heading}</h2>
          {description && <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>}
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story: SuccessStory) => {
            const image = typeof story.image === 'object' ? story.image : null
            const storyUrl = `/success-stories/${story.slug}`

            return (
              <div
                key={story.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 group flex flex-col p-6 relative"
              >
                {/* Header: Avatar, Name, Rank */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-[#ED1F24]">
                      {image?.url ? (
                        <ImageWithFallback
                          src={image.url}
                          alt={image.alt || story.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                          {story.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {story.videoUrl && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#ED1F24] rounded-full flex items-center justify-center border-2 border-white">
                        <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-slate-900 text-lg mb-1 group-hover:text-[#ED1F24] transition-colors truncate">
                      {story.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 bg-[#ED1F24] text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                        <Trophy className="w-3 h-3" />
                        {(story as any).rankDisplay || `Rank ${story.rank}`}
                      </span>
                      {story.year && (
                        <span className="text-xs text-slate-500 font-medium">{story.year}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Exam & State Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {story.exam && (
                    <span className="inline-flex items-center text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                      {story.exam}
                    </span>
                  )}
                  {story.state && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ED1F24] bg-red-50 px-3 py-1 rounded-full">
                      <MapPin className="w-3 h-3" />
                      {story.state}
                    </span>
                  )}
                </div>

                {/* Stats / Score */}
                {story.score && (
                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-3 bg-amber-50/60 px-3 py-1.5 rounded-lg border border-amber-100">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-medium">Score: {story.score}</span>
                  </div>
                )}

                {/* Testimonial Quote */}
                {story.testimonial?.quote && (
                  <p className="text-xs text-slate-600 italic line-clamp-3 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    &quot;{story.testimonial.quote}&quot;
                  </p>
                )}

                {/* Action Link */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={storyUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED1F24] hover:text-[#d11b20] transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  {story.videoUrl && (
                    <a
                      href={story.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Play className="w-3 h-3 text-[#ED1F24]" fill="currentColor" />
                      <span>Watch</span>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Button */}
        {viewAllLink && (
          <div className="text-center mt-10">
            <a
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#ED1F24] text-[#ED1F24] rounded-xl hover:bg-[#ED1F24] hover:text-white transition-colors font-bold"
            >
              View All Success Stories <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
