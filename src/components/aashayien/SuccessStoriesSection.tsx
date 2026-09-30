'use client'

import { Award, MapPin, Trophy } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import { Media } from '@/payload-types'

interface SuccessStory {
  id: string
  name: string
  image: string
  state: string
  rank: string
  exam: string
  testimonial: string
}

import { CMSLink } from '@/components/Link'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export function SuccessStoriesSection({
  stories: dataStories,
  title,
  subtitle,
  description,
  viewAllLink,
}: {
  stories?: any[]
  title?: string
  subtitle?: string
  description?: string
  viewAllLink?: any
}) {
  const handleViewAll = () => {
    window.location.href = '/success-stories'
  }

  const mapStory = (s: any): SuccessStory => {
    let image = ''
    if (s.image) {
      if (typeof s.image === 'string') image = getMediaUrl(s.image)
      else if (s.image.url) image = getMediaUrl(s.image.url)
    }

    let testimonial = ''
    if (s.testimonial?.quote) {
      testimonial = s.testimonial.quote
    }

    return {
      id: s.id,
      name: s.name,
      image,
      state: s.state || '',
      rank: s.rankDisplay || (s.rank ? `Rank ${s.rank}` : ''),
      exam: s.exam || '',
      testimonial,
    }
  }

  // Use passed data
  const storiesToDisplay = dataStories?.map(mapStory) || []

  if (!storiesToDisplay.length) return null

  return (
    <section id="success" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-amber-100 rounded-full mb-4">
            <span className="text-amber-700">{title || 'Success Stories'}</span>
          </div>
          <h2 className="text-slate-900 mb-4">
            {subtitle || 'Join the Ranks of Successful Judiciary Aspirants'}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {description ||
              'Over 300+ students have cracked their judiciary exams with our expert guidance. Here are some of their inspiring journeys.'}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {storiesToDisplay.map((story) => (
            <div
              key={story.id}
              className="bg-linear-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
            >
              {/* Image Section */}
              <div className="relative h-72 overflow-hidden bg-linear-to-br from-blue-600 to-blue-800">
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-cyan-950/40">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white mb-1">{story.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-white/90 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{story.state}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-amber-500 text-black px-4 py-2 rounded-full">
                      <Trophy className="w-5 h-5" />
                      <span>{story.rank}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-blue-700">
                  <Award className="w-5 h-5" />
                  <span>{story.exam}</span>
                </div>
                <blockquote className="text-slate-600 italic relative">
                  <p className="pl-6">{story.testimonial}</p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <CMSLink
            {...viewAllLink}
            label={viewAllLink?.label || 'View All Success Stories'}
            appearance="default"
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 text-black rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}
