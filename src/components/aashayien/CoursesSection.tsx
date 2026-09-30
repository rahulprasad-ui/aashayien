'use client'

import { useState } from 'react'
import { BookOpen, Clock, IndianRupee, Video, X, Play } from 'lucide-react'
import { Media } from '@/payload-types'
import type { ImageDisplayConfig } from '@/utilities/imageDisplay'
import { ImageWithFallback } from './ImageWithFallback'

interface Course {
  id: string
  name: string
  duration: string
  price: string
  originalPrice?: string
  mode: string
  category: string
  badge?: string
  features: string[]
  videoId?: string
  thumbnail?: string | Media
  thumbnailDisplay?: ImageDisplayConfig | null
  enrollmentLink?: string
}

import { CMSLink } from '@/components/Link'
import { Branding } from '@/payload-types'
import { useRouter } from 'next/navigation'

export function CoursesSection({
  courses: dataCourses,
  title,
  subtitle,
  description,
  viewAllLink,
  branding,
}: {
  courses?: any[]
  title?: string
  subtitle?: string
  description?: string
  viewAllLink?: any
  branding?: Branding
}) {
  const router = useRouter()
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const handleEnroll = (link?: string) => {
    if (link) {
      window.open(link, '_blank')
    } else {
      const enrollLink = branding?.enrollButton?.link || '/courses'
      window.open(enrollLink, '_blank')
    }
  }

  const handleExploreCourses = () => {
    window.location.href = '/courses'
  }

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Top Rated':
        return 'bg-amber-500 text-black'
      case 'Best Seller':
        return 'bg-green-600 text-white'
      case 'Premium':
        return 'bg-purple-600 text-white'
      case 'Popular':
        return 'bg-blue-600 text-white'
      case 'New Launch':
        return 'bg-red-600 text-white'
      default:
        return 'bg-slate-600 text-white'
    }
  }

  const getModeColor = (mode: string) => {
    const m = mode?.toLowerCase()
    switch (m) {
      case 'online':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'offline':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'hybrid':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'foundation':
        return 'Foundation Course'
      case 'state-judiciary':
        return 'State Judiciary'
      case 'apo-adpo':
        return 'APO / ADPO'
      case 'test-series':
        return 'Test Series'
      default:
        return 'Course'
    }
  }

  const mapCourse = (c: any): Course => {
    const mode = c.courseMode || 'online'
    let category = 'foundation'
    
    if (c.category) {
      if (typeof c.category === 'string') {
        category = c.category
      } else if (c.category.value) {
        category = c.category.value
      }
    }

    let badge = ''
    if (c.isBestSeller) badge = 'Best Seller'
    else if (c.isPopular) badge = 'Popular'

    const features =
      c.features?.map((f: any) => (typeof f.feature === 'string' ? f.feature : '')) || []

    // Find first youtube video
    let videoId = ''
    if (c.demoVideos?.length > 0) {
      const vid = c.demoVideos.find((v: any) => v.type === 'youtube' && v.youtubeUrl)
      if (vid) {
        const match = vid.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/.*v=)([^&]+)/)
        videoId = match ? match[1] : vid.youtubeUrl
      }
    }

    return {
      id: c.id,
      name: c.title,
      duration: c.duration || '',
      price: c.price,
      originalPrice: c.originalPrice,
      mode,
      category,
      badge,
      features,
      videoId,
      thumbnail: c.thumbnail,
      thumbnailDisplay: c.thumbnailDisplay,
      enrollmentLink: c.enrollmentLink,
    }
  }

  // Use passed data or fallback to empty (or we could keep the hardcoded as fallback, but request asked to manage from admin)
  // Request says "Popular Courses", so we should strictly use what's passed.
  const coursesToDisplay = dataCourses?.map(mapCourse) || []

  if (!coursesToDisplay.length) return null

  return (
    <section id="courses" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-red-100 rounded-full mb-4">
            <span className="text-[#ED1F24]">{title || 'Popular Courses'}</span>
          </div>
          <h2 className="text-slate-900 mb-4">{subtitle || 'Choose Your Path to Success'}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {description ||
              'Expertly designed programs tailored for different state judiciary examinations. Get comprehensive preparation with live classes, study material, and personal mentorship.'}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {coursesToDisplay.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <ImageWithFallback
                  resource={course.thumbnail}
                  display={course.thumbnailDisplay}
                  alt={course.name}
                  fill
                  fallbackLabel="No course image"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Card Header */}
              <div className="relative bg-slate-800/90 p-6 text-white">
                {course.badge && (
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(course.badge)}`}
                  >
                    {course.badge}
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white/80 uppercase tracking-wider">
                    {getCategoryLabel(course.category)}
                  </span>
                </div>
                
                <h3 className="text-white mb-2 line-clamp-2 min-h-14">{course.name}</h3>
                
                <div
                  className={`inline-block px-3 py-1 rounded-full border text-xs font-bold uppercase ${getModeColor(course.mode)}`}
                >
                  {course.mode} Mode
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Course Info */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="text-right">
                    {course.originalPrice && (
                      <div className="text-slate-400 line-through text-sm">
                        ₹{course.originalPrice}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-slate-900">
                      <IndianRupee className="w-5 h-5" />
                      <span>{course.price}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {course.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="space-y-3">
                  {course.videoId && (
                    <button
                      onClick={() => setSelectedVideo(course.videoId || null)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#ED1F24] text-[#ED1F24] rounded-lg hover:bg-red-50 transition-all"
                    >
                      <Video className="w-5 h-5" />
                      Free Demo
                    </button>
                  )}
                  <button
                    onClick={() => handleEnroll(course.enrollmentLink)}
                    className="w-full px-6 py-3 bg-linear-to-r from-[#ED1F24] to-[#d11b20] text-white rounded-lg hover:from-[#d11b20] hover:to-[#b81619] transition-all shadow-md hover:shadow-lg font-bold"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CMSLink
            {...viewAllLink}
            label={viewAllLink?.label || 'View All Courses'}
            appearance="default"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors shadow-lg"
          />
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="text-slate-900">Course Demo</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="aspect-video bg-slate-900 flex items-center justify-center">
                {/* Embed YouTube properly */}
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
