'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Clock,
  Video,
  Globe,
  Award,
  BookOpen,
  Play,
  Phone,
  MessageCircle,
  Star,
  Users,
  ChevronRight,
  CheckCircle,
  Book,
  ChevronDown,
  Shield,
  TrendingUp,
  Share2,
} from 'lucide-react'
import Image from 'next/image'
import type { Course, Branding } from '@/payload-types'
import { ImageWithFallback } from './ImageWithFallback'
import { DynamicIcon } from '@/components/DynamicIcon'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return ''
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/.*(?:v=|\/embed\/))([^&?\/]+)/)
  const videoId = match ? match[1] : url
  return `https://www.youtube.com/embed/${videoId}`
}

const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp', title: string) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const text = `Check out this course: ${title}`

  let shareUrl = ''
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
      break
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`
      break
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }
}

function ReviewItem({ review }: { review: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLong = review.comment && review.comment.length > 150

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#ED1F24] rounded-full flex items-center justify-center text-white shrink-0">
          {review.name?.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-lg! text-slate-900">{review.name}</h4>
              <p className="text-sm text-slate-500">{formatDateTime(review?.date)}</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-slate-700">
            {!isLong || isExpanded ? review.comment : `${review.comment.slice(0, 150)}...`}
          </p>
          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#ED1F24] text-sm mt-2 font-medium hover:underline"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function CourseDetail({ course, branding }: { course: Course; branding?: Branding }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  // Demo Videos
  const demoVideos = course.demoVideos || []
  const [activeVideo, setActiveVideo] = useState(demoVideos.length > 0 ? demoVideos[0] : null)

  if (!course) {
    return null
  }
  // --- Data Preparation ---
  // Using direct access with fallbacks to empty arrays/null as per requirement to remove hardcoded content.

  const displayCurriculum = course.curriculum || []
  const displayHighlights = course.highlights || []
  const displayLearningOutcomes =
    course.learningOutcomes
      ?.map((item) => item.outcome)
      .filter((o): o is string => typeof o === 'string') || []

  // Reviews & FAQs
  const reviews = course.reviews || []

  const faqs = course.faqs || []

  // Calculate Rating
  const totalReviews = reviews.length
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / totalReviews).toFixed(1)
      : '0.0'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED1F24] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            {/* Left Content */}
            <div className="pt-8 pb-8 lg:order-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Course Details</span>
              </div>

              {/* Title */}
              <h1 className="text-white mb-4 leading-tight">{course.title}</h1>
              <p className="text-xl text-slate-300 mb-6">{course.subtitle}</p>

              {/* Rating & Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(Number(averageRating))
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium">{averageRating}</span>
                  <span className="text-slate-400">({totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="w-5 h-5" />
                  <span>3500+ students</span>
                </div>
              </div>

              {/* Instructor */}
              {course.instructor && (
                <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <ImageWithFallback
                    resource={course.instructor?.image as any}
                    display={(course.instructor as any)?.imageDisplay}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-slate-400">Instructor</p>
                    <p className="text-white font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-slate-300">{course.instructor.title}</p>
                  </div>
                </div>
              )}

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <div className="w-10 h-10 bg-[#ED1F24]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#ED1F24]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Duration</p>
                    <p className="text-white font-medium">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <div className="w-10 h-10 bg-[#ED1F24]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5 text-[#ED1F24]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Lectures</p>
                    <p className="text-white font-medium">{course.lecturesCount}+ Videos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <div className="w-10 h-10 bg-[#ED1F24]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-[#ED1F24]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Language</p>
                    <p className="text-white font-medium">{course.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <div className="w-10 h-10 bg-[#ED1F24]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#ED1F24]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Level</p>
                    <p className="text-white font-medium">{course.level}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Card */}
            <div className="lg:sticky lg:top-28 lg:order-1">
              {/* Course Image */}
              <div className="relative h-[226px] rounded-2xl overflow-hidden mb-6">
                {/* Live Course Badge */}
                {course.category === 'live' && (
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-4 py-2 bg-[#ED1F24]/90 backdrop-blur-sm border border-[#ED1F24] rounded-full">
                    <BookOpen className="w-4 h-4 text-white" />
                    <span className="text-sm text-white font-medium">Live Course</span>
                  </div>
                )}
                <ImageWithFallback
                  resource={course.thumbnail as any}
                  display={(course as any).thumbnailDisplay}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <button
                  onClick={() => {
                    const videoSection = document.getElementById('sample-videos')
                    if (videoSection) {
                      videoSection.scrollIntoView({ behavior: 'smooth' })
                      if (demoVideos.length > 0) {
                        setActiveVideo(demoVideos[0])
                      }
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-[#ED1F24] ml-1" />
                  </div>
                </button>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-5xl! font-bold! text-white">{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-xl text-slate-400 line-through mb-1">
                      {course.originalPrice}
                    </span>
                  )}
                  {course.discount && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full mb-1">
                      {course.discount}
                    </span>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-6">
                  {course.enrollmentLink ? (
                    <a
                      href={
                        course.enrollmentLink ||
                        branding?.enrollButton?.link ||
                        '/courses'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 bg-[#ED1F24] text-white text-center rounded-lg hover:bg-[#d11b20] transition-colors"
                    >
                      {branding?.enrollButton?.label || 'Enroll Now'}
                    </a>
                  ) : (
                    <button className="block w-full px-6 py-4 bg-[#ED1F24] text-white text-center rounded-lg hover:bg-[#d11b20] transition-colors">
                      Enrollment Closed
                    </button>
                  )}
                </div>
                {/* Contact */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-slate-300 mb-3">Have questions? Get in touch</p>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${course?.contactInfo?.phone || branding?.contactInfo?.phone || '+919111198177'}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                    <a
                      href={`https://wa.me/${(course?.contactInfo?.whatsapp || branding?.contactInfo?.whatsapp || '919111198177').replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Sample Video Lectures */}
            <section id="sample-videos">
              <h2 className="text-slate-900 mb-6">Sample Video Lectures</h2>
              <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                {/* Main Video Player */}
                {activeVideo ? (
                  <div className="relative h-[250px] sm:h-[400px] rounded-xl overflow-hidden mb-6 bg-slate-900">
                    {activeVideo.type === 'youtube' && activeVideo.youtubeUrl ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`${getYouTubeEmbedUrl(activeVideo.youtubeUrl)}?autoplay=1&rel=0`}
                        title={activeVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    ) : activeVideo.type === 'upload' &&
                      activeVideo.videoFile &&
                      typeof activeVideo.videoFile === 'object' &&
                      activeVideo.videoFile.url ? (
                      <video
                        src={activeVideo.videoFile.url}
                        controls
                        autoPlay
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white">Video configuration error</span>
                      </div>
                    )}
                    {/* Overlay info if needed, but standard iframe has it */}
                    {!activeVideo.youtubeUrl && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent flex items-end justify-between">
                        <div>
                          <h3 className="text-xl! text-white mb-1">{activeVideo.title}</h3>
                          <p className="text-sm text-slate-200">{activeVideo.topic}</p>
                        </div>
                        <button
                          onClick={() => handleShare('whatsapp', activeVideo.title)}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors group"
                          title="Share on WhatsApp"
                        >
                          <Share2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative h-[400px] rounded-xl overflow-hidden mb-6 bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-400">No Demo Video Available</span>
                  </div>
                )}

                {/* Sample Lectures List */}
                {demoVideos.length > 1 && (
                  <div className="space-y-3">
                    <h4 className="text-lg! text-slate-900 mb-4">More Free Preview Lectures</h4>
                    {demoVideos.map((lecture, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveVideo(lecture)}
                        className={`w-full flex items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-md transition-all group ${
                          activeVideo?.id === lecture.id
                            ? 'border-[#ED1F24] bg-red-50/30'
                            : 'border-slate-200 hover:border-[#ED1F24]/30'
                        }`}
                      >
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                          {/* Simple fallback for thumbnail if needed */}
                          {lecture.thumbnail &&
                          typeof lecture.thumbnail === 'object' &&
                          lecture.thumbnail.url ? (
                            <ImageWithFallback
                              resource={lecture.thumbnail}
                              display={(lecture as any).thumbnailDisplay}
                              alt={lecture.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Play className="w-6 h-6 text-slate-400" />
                            </div>
                          )}
                          {activeVideo?.id === lecture.id && (
                            <div className="absolute inset-0 bg-[#ED1F24]/20 flex items-center justify-center">
                              <div className="w-8 h-8 bg-[#ED1F24] rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <h5
                            className={`text-base! mb-1 group-hover:text-[#ED1F24] transition-colors ${
                              activeVideo?.id === lecture.id
                                ? 'text-[#ED1F24] font-semibold'
                                : 'text-slate-900'
                            }`}
                          >
                            {lecture.title}
                          </h5>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                              {lecture.topic || 'Lecture'}
                            </span>
                            <span className="text-xs text-green-600 font-medium">
                              {lecture.duration}
                            </span>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 transition-colors ${
                            activeVideo?.id === lecture.id ? 'text-[#ED1F24]' : 'text-slate-400'
                          } group-hover:text-[#ED1F24]`}
                        />
                      </button>
                    ))}
                  </div>
                )}


                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                  <p className="text-slate-600 mb-4">Want access to all 450+ video lectures?</p>
                  <a
                    href={
                      course.enrollmentLink ||
                      branding?.enrollButton?.link ||
                      '/courses'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors"
                  >
                    <Video className="w-5 h-5" />
                    {branding?.enrollButton?.label || 'Enroll Now'} for Full Access
                  </a>
                </div>
              </div>
            </section>

            {/* Course Highlights */}
            {displayHighlights && displayHighlights.length > 0 && (
              <section>
                <div className="grid sm:grid-cols-2 gap-6">
                  {}
                  {displayHighlights.map((highlight: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <div className="w-12 h-12 bg-[#ED1F24]/10 rounded-lg flex items-center justify-center shrink-0">
                        {/* Render dynamic icon from string name, or fallback for static data/defaults */}
                        {typeof highlight.icon === 'string' ? (
                          <DynamicIcon
                            name={highlight.icon}
                            className="w-6 h-6 text-[#ED1F24]"
                            fallback={Shield}
                          />
                        ) : highlight.icon ? (
                          <highlight.icon className="w-6 h-6 text-[#ED1F24]" />
                        ) : (
                          <Shield className="w-6 h-6 text-[#ED1F24]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg! text-slate-900 mb-1">{highlight.title}</h3>
                        <p className="text-sm text-slate-600">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* What You'll Learn */}
            {displayLearningOutcomes && displayLearningOutcomes.length > 0 && (
              <section>
                <h2 className="text-slate-900 mb-6">What You&apos;ll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {displayLearningOutcomes
                    .filter((outcome): outcome is string => typeof outcome === 'string')
                    .map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-slate-700">{outcome}</p>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Course Curriculum */}
            {displayCurriculum && displayCurriculum.length > 0 && (
              <section>
                <h2 className="text-slate-900 mb-6">Course Curriculum</h2>
                <div className="space-y-3">
                  {}
                  {displayCurriculum.map((module: any, index: number) => {
                    // Handle both Payload structure (maybe '_id', 'topics' as array of objects) and static structure ('id', 'topics' as strings)
                    const moduleId = module.id || module._id || String(index)
                    const isOpen = expandedModule === moduleId
                    const topics = module.topics || []

                    return (
                      <div
                        key={moduleId}
                        className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedModule(isOpen ? null : moduleId)}
                          className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-10 h-10 bg-[#ED1F24]/10 rounded-lg flex items-center justify-center shrink-0">
                              <Book className="w-5 h-5 text-[#ED1F24]" />
                            </div>
                            <div>
                              <h3 className="text-lg! text-slate-900 mb-1">{module.title}</h3>
                              <p className="text-sm text-slate-600">
                                {/* Handle different field names */}
                                {module.lessons || module.lessonsCount} lessons • {module.duration}
                              </p>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 border-t border-slate-100">
                            <ul className="space-y-2 mt-4">
                              {topics.map((topic: any, tIndex: number) => (
                                <li key={tIndex} className="flex items-center gap-3 text-slate-700">
                                  <Play className="w-4 h-4 text-slate-400 shrink-0" />
                                  {/* Handle string or object topic */}
                                  <span>{typeof topic === 'string' ? topic : topic.topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Instructor */}
            {course.instructor && (
              <section>
                <h2 className="text-slate-900 mb-6">About the Instructor</h2>
                <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-8">
                  {/* Image and Name Row */}
                  <div className="flex items-center gap-6 mb-6">
                    <ImageWithFallback
                      resource={course.instructor?.image as any}
                      display={(course.instructor as any)?.imageDisplay}
                      alt={course.instructor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-2xl! text-slate-900 mb-2">{course.instructor.name}</h3>
                      <p className="text-[#ED1F24]">{course.instructor.title}</p>
                    </div>
                  </div>

                  {/* Bio Full Width Row */}
                  <div className="mb-6">
                    <p className="text-slate-700">{course.instructor.bio}</p>
                  </div>

                  {/* Stats Row */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-700">3500+ Students Taught</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-700">2000+ Successful Selections</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Student Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900">Student Reviews</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(Number(averageRating))
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-900 font-medium">{averageRating}</span>
                  <span className="text-slate-600">({totalReviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-slate-900 pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                          openFaqIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-5 pb-5 border-t border-slate-100">
                        <p className="text-slate-700 pt-4">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Course Features */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg! text-slate-900 mb-4">This Course Includes</h3>
                <div className="space-y-3">
                  {course.features &&
                    course.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                        {/* Handle object or string feature */}
                        <span className="text-sm text-slate-700">
                          {typeof feature === 'string' ? feature : feature.feature}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Share Course */}
              <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg! text-slate-900 mb-4">Share This Course</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare('facebook', course.title)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter', course.title)}
                    className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp', course.title)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Related Courses CTA */}
              <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-center">
                <TrendingUp className="w-8 h-8 text-[#ED1F24] mx-auto mb-3" />
                <h3 className="text-lg! text-white mb-2">Explore More Courses</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Check out our other judiciary preparation courses
                </p>
                <Link
                  href="/courses"
                  className="block w-full px-4 py-2 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors"
                >
                  View All Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Enrollment Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-[#ED1F24]">{course.price}</span>
              <span className="text-sm text-slate-400 line-through">{course.originalPrice}</span>
            </div>
          </div>
          {course.enrollmentLink ? (
            <a
              href={course.enrollmentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors"
            >
              Enroll Now
            </a>
          ) : (
            <button className="px-6 py-3 bg-slate-400 text-white rounded-lg cursor-not-allowed">
              Enrollment Closed
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
