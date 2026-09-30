'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Trophy,
  Award,
  Target,
  Star,
  TrendingUp,
  Quote,
  MapPin,
  Play,
  ArrowRight,
  FileText,
  Calendar,
  CheckCircle,
  Phone,
  MessageSquare,
  Download,
  X,
  User,
  Mail,
} from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import { icons } from 'lucide-react'

// Helper to render icon dynamically
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = icons[name as keyof typeof icons]
  return Icon ? <Icon className={className} /> : null
}

import type { SuccessStory as PayloadSuccessStory, Media } from '@/payload-types'
import type { ImageDisplayConfig } from '@/utilities/imageDisplay'

interface UiSuccessStory {
  id: string
  name: string
  rank: number
  year: number
  exam: string
  state?: string
  image?: number | Media | null
  imageDisplay?: ImageDisplayConfig | null
  testimonial?: string
  attempts?: number
  score?: string
  course?: string
  detailedDescription?: string
  videoUrl?: string
}

const mapToUiStory = (story: PayloadSuccessStory): UiSuccessStory => {
  return {
    id: story.slug,
    name: story.name,
    rank: story.rank,
    year: story.year || new Date().getFullYear(),
    exam: story.exam || '',
    state: story.state || undefined,
    image: story.image,
    imageDisplay: (story as any).imageDisplay,
    testimonial: story.testimonial?.quote || undefined,
    attempts: story.journey?.totalAttempts || undefined,
    score: story.score || undefined,
    course: (() => {
      const enrolled = story.journey?.enrolledCourses
      if (enrolled && enrolled.length > 0) {
        const first = enrolled[0]
        if (typeof first === 'object' && first !== null && 'title' in first) {
          return first.title || undefined
        }
      }
      const custom = story.journey?.customCourses
      if (custom && custom.length > 0) {
        return custom[0]?.courseName || undefined
      }
      return undefined
    })(),
    detailedDescription: story.detailedDescription || undefined,
    videoUrl: story.videoUrl || undefined,
  }
}

interface SuccessSectionProps {
  title: string
  description: string
  stories: UiSuccessStory[]
  icon: React.ElementType
  accentColor: string
  id: string
}

function SuccessSection({
  title,
  description,
  stories,
  icon: Icon,
  accentColor,
  id,
}: SuccessSectionProps) {
  return (
    <section id={id} className="py-20 scroll-mt-20 bg-linear-to-br from-slate-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-6 py-2 ${accentColor} rounded-full mb-6`}
          >
            <Icon className="w-5 h-5" />
            <span>{title}</span>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Stories Grid - 4 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 group relative p-5"
            >
              {/* Hover Overlay with Detailed Description */}
              {story.detailedDescription && (
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center rounded-2xl z-10 shadow-2xl">
                  {/* <Quote className="w-6 h-6 text-[#ED1F24] mb-3" /> */}
                  <p className="text-xs text-slate-800 leading-relaxed mb-4">
                    {story.detailedDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/success-stories/${story.id}`}
                      className="inline-flex items-center gap-2 text-xs text-white bg-[#ED1F24] px-4 py-2 rounded-lg hover:bg-[#d11b20] transition-colors"
                    >
                      <ArrowRight className="w-3 h-3" />
                      View Story
                    </Link>
                    {story.videoUrl && (
                      <a
                        href={story.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-slate-700 bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        <Play className="w-3 h-3" />
                        Watch Video
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Header with Avatar and Name */}
              <div className="flex items-start gap-3 mb-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-linear-to-br from-pink-100 to-pink-50 border-2 border-[#ED1F24]">
                    <ImageWithFallback
                      resource={story.image}
                      display={story.imageDisplay}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {story.videoUrl && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#ED1F24] rounded-full flex items-center justify-center border-2 border-white">
                      <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
                    </div>
                  )}
                </div>

                {/* Name and Basic Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-900 mb-1 text-base">{story.name}</h3>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="inline-flex items-center gap-1 bg-[#ED1F24] text-white px-2 py-0.5 rounded text-xs">
                      <Trophy className="w-3 h-3" />
                      Rank {story.rank}
                    </div>
                    <span className="text-xs text-slate-500">{story.year}</span>
                  </div>
                </div>
              </div>

              {/* Exam and State Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-1 text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                  {story.exam}
                </div>
                {story.state && (
                  <div className="inline-flex items-center gap-1 text-sm text-[#ED1F24] bg-red-50 px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    {story.state}
                  </div>
                )}
              </div>

              {/* Course Info */}
              {story.course && (
                <div className="bg-slate-50 rounded-lg px-3 py-2 mb-3">
                  <p className="text-xs text-slate-600">
                    <span className="font-medium">Course:</span> {story.course}
                  </p>
                </div>
              )}

              {/* Additional Info */}
              <div className="space-y-2 mb-4">
                {story.score && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>Score: {story.score}</span>
                  </div>
                )}
              </div>

              {/* Testimonial */}
              {story.testimonial && (
                <div className="bg-slate-50 rounded-lg p-3 mt-3">
                  {/* <Quote className="w-4 h-4 text-[#ED1F24] mb-2" /> */}
                  <p className="text-xs text-slate-600 italic line-clamp-3">
                    &quot;{story.testimonial}&quot;
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SuccessStories({
  stories: initialStories = [],
  pageData,
}: {
  stories?: PayloadSuccessStory[]
  pageData?: any
}) {
  const stories = initialStories.map(mapToUiStory)

  const judiciaryStories = stories.filter(
    (s) => initialStories.find((is) => is.slug === s.id)?.category === 'judiciary',
  )
  const adpoStories = stories.filter(
    (s) => initialStories.find((is) => is.slug === s.id)?.category === 'adpo',
  )
  const mainsStories = stories.filter(
    (s) => initialStories.find((is) => is.slug === s.id)?.category === 'mains',
  )
  const testSeriesStories = stories.filter(
    (s) => initialStories.find((is) => is.slug === s.id)?.category === 'test-series',
  )
  const interviewStories = stories.filter(
    (s) => initialStories.find((is) => is.slug === s.id)?.category === 'interview',
  )
  const [showBrochureModal, setShowBrochureModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  const handleBrochureDownload = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend

    // Simulate download
    alert('Thank you! Your brochure download will start shortly.')
    setShowBrochureModal(false)
    setFormData({ name: '', email: '', phone: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Similar to About Us Page */}
      <section className="relative bg-linear-to-br from-slate-600 via-slate-950 to-slate-600 py-24 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-6">
              <span className="text-white">Success Stories</span>
            </div>
            <h1 className="text-white mb-6">{pageData?.heroTitle}</h1>
            <p className="text-white/90 max-w-3xl mx-auto text-xl">{pageData?.heroDescription}</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {pageData?.heroStats?.map((stat: any, index: number) => {
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
                >
                  <DynamicIcon name={stat.icon} className="w-8 h-8 mx-auto mb-3 text-white" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Judiciary Success Stories */}
      {pageData?.visibility?.judiciary !== false && (
        <SuccessSection
          id="judiciary"
          title={pageData?.judiciarySection?.title || 'Judiciary Services'}
          description={
            pageData?.judiciarySection?.description ||
            'Our students who cracked Civil Judge Junior Division exams across various states.'
          }
          stories={judiciaryStories}
          icon={Trophy}
          accentColor="bg-red-100 text-[#ED1F24]"
        />
      )}

      {pageData?.visibility?.adpo !== false && (
        <>
          {/* Divider */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-200"></div>
          </div>

          {/* ADPO Success Stories */}
          <SuccessSection
            id="adpo"
            title={pageData?.adpoSection?.title || 'ADPO/APO Selections'}
            description={
              pageData?.adpoSection?.description ||
              'Outstanding performance in Assistant District Public Prosecution Officer exams.'
            }
            stories={adpoStories}
            icon={Award}
            accentColor="bg-amber-100 text-amber-600"
          />
        </>
      )}

      {pageData?.visibility?.mains !== false && (
        <>
          {/* Divider */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-200"></div>
          </div>

          {/* Mains Success Stories */}
          <SuccessSection
            id="mains"
            title={pageData?.mainsSection?.title || 'Mains Excellence'}
            description={
              pageData?.mainsSection?.description ||
              'Top scorers in Mains examination who demonstrated exceptional legal writing skills.'
            }
            stories={mainsStories}
            icon={FileText}
            accentColor="bg-purple-100 text-purple-600"
          />
        </>
      )}

      {/* Book Free Counselling CTA Section */}
      {pageData?.visibility?.counselling !== false && (
        <section className="py-20 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {pageData?.counsellingImage && (
                  <ImageWithFallback
                    resource={pageData.counsellingImage}
                    display={pageData?.counsellingImageDisplay}
                    alt="Free Counselling Session"
                    className="w-full h-[400px] object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#ED1F24] text-white rounded-full mb-6">
                  <Calendar className="w-5 h-5" />
                  <span>Book Your Session</span>
                </div>
                <h2 className="text-white mb-4">{pageData?.counsellingTitle}</h2>
                <p className="text-lg text-white/80 mb-6">{pageData?.counsellingDescription}</p>
                <ul className="space-y-3 mb-8">
                  {pageData?.counsellingChecklist?.map((item: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ED1F24] mt-1 shrink-0" />
                      <span className="text-white/80">{item.text}</span>
                    </li>
                  ))}
                </ul>
                {pageData?.counsellingButtonLink && (
                  <a
                    href={pageData.counsellingButtonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    {pageData?.counsellingButtonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {pageData?.visibility?.testSeries !== false && (
        <>
          {/* Divider */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-200"></div>
          </div>

          {/* Test Series Toppers */}
          <SuccessSection
            id="test-series"
            title={pageData?.testSeriesSection?.title || 'Test Series Toppers'}
            description={
              pageData?.testSeriesSection?.description ||
              'Consistent performers in our All India and State-specific Test Series.'
            }
            stories={testSeriesStories}
            icon={Target}
            accentColor="bg-indigo-100 text-indigo-600"
          />
        </>
      )}

      {pageData?.visibility?.interview !== false && (
        <>
          {/* Divider */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-200"></div>
          </div>

          {/* Interview Success Stories */}
          <SuccessSection
            id="interview"
            title={pageData?.interviewSection?.title || 'Interview Success'}
            description={
              pageData?.interviewSection?.description ||
              'Candidates who scored exceptional marks in the interview stage through our guidance.'
            }
            stories={interviewStories}
            icon={Star}
            accentColor="bg-emerald-100 text-emerald-600"
          />
        </>
      )}

      {/* Download Brochure CTA */}
      {pageData?.visibility?.brochure !== false && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Download className="w-12 h-12 text-[#ED1F24] mx-auto mb-6" />
            <h2 className="text-slate-900 mb-4">{pageData?.brochureTitle}</h2>
            <p className="text-lg text-slate-600 mb-8">{pageData?.brochureDescription}</p>
            <button
              onClick={() => setShowBrochureModal(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              {pageData?.brochureButtonText}
            </button>
          </div>
        </section>
      )}

      {/* Brochure Download Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowBrochureModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-[#ED1F24]" />
              </div>
              <h3 className="text-slate-900 mb-2">Download Brochure</h3>
              <p className="text-sm text-slate-600">
                Please fill in your details to download the brochure
              </p>
            </div>

            <form onSubmit={handleBrochureDownload} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED1F24] focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED1F24] focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED1F24] focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Now
              </button>
            </form>

            <p className="text-xs text-slate-500 text-center mt-4">
              We respect your privacy and will never share your information
            </p>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {pageData?.visibility?.finalCTA !== false && (
        <section className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Star className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-white mb-4">{pageData?.ctaTitle}</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{pageData?.ctaDescription}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {pageData?.ctaEnrollButtonLink && (
                <a
                  href={pageData.ctaEnrollButtonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors inline-flex items-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  {pageData?.ctaEnrollButtonText}
                </a>
              )}
              {pageData?.ctaTalkButtonLink && (
                <a
                  href={pageData.ctaTalkButtonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  {pageData?.ctaTalkButtonText}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
