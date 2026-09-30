'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  BookOpen,
  Play,
  FileText,
  Award,
  Phone,
  MessageCircle,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Users,
  TrendingUp,
  Shield,
  Clock,
  MapPin,
  X,
} from 'lucide-react'
import { icons } from 'lucide-react'
import Image from 'next/image'
import { ImageWithFallback } from './ImageWithFallback'
import type { Course, Media } from '@/payload-types'
import RichText from '@/components/RichText'

type CourseCategory = 'all' | 'live' | 'recorded' | 'test-series' | 'other'

export type CourseTopRanker = {
  id: number | string
  name: string
  rank?: number | null
  rankDisplay?: string | null
  exam?: string | null
  year?: number | null
  image?: Media | string | null
}

// Helper to render icon dynamically
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = icons[name as keyof typeof icons]
  return Icon ? <Icon className={className} /> : null
}

export function Courses({
  courses,
  pageData,
  initialCategory = 'all',
}: {
  courses: Course[]
  pageData: any
  initialCategory?: string
}) {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>(
    (initialCategory as CourseCategory) || 'all',
  )
  const [selectedState, setSelectedState] = useState<string>('')
  const [currentSlide, setCurrentSlide] = useState(0)
  // State for popover logic
  const [clickedCourse, setClickedCourse] = useState<string | null>(null)

  useEffect(() => {
    const filter = searchParams.get('filter')
    if (filter && ['live', 'recorded', 'test-series', 'other'].includes(filter)) {
      setSelectedCategory(filter as CourseCategory)
    }
  }, [searchParams])

  // States data for sidebar with dynamic course counts
  const stateNames = [
    'Uttar Pradesh',
    'Madhya Pradesh',
    'Bihar',
    'Rajasthan',
    'Delhi',
    'Maharashtra',
    'Gujarat',
    'Punjab',
    'Haryana',
    'Uttarakhand',
    'Jharkhand',
    'Chhattisgarh',
  ]

  const states = stateNames.map(stateName => {
    const count = courses.filter((course) => {
      const courseStates = Array.isArray(course.targetStates) ? course.targetStates : []
      return (courseStates as string[]).includes(stateName) || (courseStates as string[]).includes('All States')
    }).length

    return {
      name: stateName,
      courses: count
    }
  }).filter(state => state.courses > 0) // Only keep states with at least 1 course


  const selectState = (state: string) => {
    setSelectedState(state === selectedState ? '' : state)
  }

  const getFrontendCategory = (backendCategory?: string | null) => {
    if (!backendCategory) return 'other'
    if (['live', 'recorded', 'test-series'].includes(backendCategory)) return backendCategory
    return 'other'
  }

  const filteredCourses = courses.filter((course) => {
    // Map Payload category to React type logic
    const courseType = getFrontendCategory(course.category)

    const categoryMatch = selectedCategory === 'all' ? true : courseType === selectedCategory

    // Safety check for targetStates
    const courseStates = Array.isArray(course.targetStates) ? course.targetStates : []

    const stateMatch =
      selectedState === ''
        ? true
        : (courseStates as string[]).includes(selectedState) ||
          (courseStates as string[]).includes('All States')

    return categoryMatch && stateMatch
  })

  // Filter for 'other' courses (Specialized) for the slider
  const otherCourses = courses.filter((course) => {
    const courseType = getFrontendCategory(course.category)
    if (courseType !== 'other') return false

    const courseStates = Array.isArray(course.targetStates) ? course.targetStates : []
    const stateMatch =
      selectedState === ''
        ? true
        : (courseStates as string[]).includes(selectedState) ||
          (courseStates as string[]).includes('All States')

    return stateMatch
  })

  const nextSlide = () => {
    if (otherCourses.length === 0) return
    setCurrentSlide((prev) => (prev + 1) % otherCourses.length)
  }

  const prevSlide = () => {
    if (otherCourses.length === 0) return
    setCurrentSlide((prev) => (prev - 1 + otherCourses.length) % otherCourses.length)
  }

  const topRankers: CourseTopRanker[] = Array.isArray(pageData?.topRankers)
    ? pageData.topRankers
    : []

  const faqs = [
    {
      question: 'What is the difference between live and recorded courses?',
      answer:
        'Live courses feature real-time interactive classes with faculty, allowing you to ask questions instantly and engage with peers. Recorded courses offer pre-recorded video lectures that you can watch at your convenience, perfect for self-paced learning. Both include comprehensive study materials and test series.',
    },
    {
      question: 'Can I switch between courses or upgrade later?',
      answer:
        'Yes, you can upgrade from a recorded course to a live course by paying the difference amount. Contact our counseling team for personalized guidance on course transitions and upgrades.',
    },
    {
      question: 'What kind of study material is provided?',
      answer:
        'We provide comprehensive printed and digital study materials including subject-wise notes, case compilations, current affairs updates, previous year papers, and practice question banks. All materials are regularly updated to reflect latest exam patterns.',
    },
    {
      question: 'Is there any scholarship or EMI option available?',
      answer:
        'Yes, we offer merit-based scholarships and flexible EMI options starting from ₹3,333/month. Special discounts are available for early enrollments and referrals. Contact us for current scholarship schemes.',
    },
    {
      question: 'How do I access the free resources and community?',
      answer:
        'Join our Telegram community to access free daily current affairs, judgment summaries, legal GK quizzes, and connect with Nitesh Sir for guidance. Download our app for additional free content and study materials.',
    },
    {
      question: 'What is the refund policy?',
      answer:
        "We offer a 7-day money-back guarantee if you're not satisfied with the course. The refund request must be made within 7 days of enrollment with less than 20% content consumption. Terms and conditions apply.",
    },
  ]

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/919111198177?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20courses',
      '_blank',
    )
  }

  const handleCall = () => {
    window.location.href = 'tel:+919111198177'
  }

  // Helper to get states summary string
  const getStatesSummary = (course: Course) => {
    // This assumes we don't have a 'states' string field in Payload and derive it
    // Or we can use the hardcoded structure if available, but let's derive
    const count = course.targetStates?.length || 0
    if (course.targetStates?.includes('All States')) return 'All States'
    if (count === 1) return '1 State'
    return `${count}+ States`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-linear-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#ED1F24]/10 rounded-full mb-4">
              <span className="text-[#ED1F24]">🎓 Top Judiciary Courses</span>
            </div>
            <h1 className="text-slate-900 mb-4">{pageData?.heroTitle}</h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{pageData?.heroSubtitle}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {pageData?.heroStats?.map((stat: any, index: number) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center"
              >
                <div className="text-[#ED1F24] mb-2">
                  <DynamicIcon name={stat.icon} className="w-8 h-8 mx-auto" />
                </div>
                <div className="text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* New Offer Strip */}
          {pageData?.offerStrip?.isActive && (
            <div className="bg-linear-to-r from-[#ED1F24] to-[#c41a1e] text-white p-4 rounded-xl mb-8 text-center">
              <div className="text-lg">
                <RichText
                  data={pageData.offerStrip.text}
                  enableGutter={false}
                  enableProse={false}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Selected Students & CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* States Filter */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#ED1F24]" />
                      Filter by State
                    </h3>
                    {selectedState && (
                      <button
                        onClick={() => setSelectedState('')}
                        className="text-xs text-[#ED1F24] hover:underline flex items-center gap-1"
                      >
                        Clear
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* States Card List */}
                  <div className="space-y-2">
                    {states.map((state) => (
                      <button
                        key={state.name}
                        onClick={() => selectState(state.name)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                          selectedState === state.name
                            ? 'border-[#ED1F24] bg-[#ED1F24]/5'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedState === state.name
                              ? 'bg-[#ED1F24] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div
                            className={`text-sm ${
                              selectedState === state.name ? 'text-[#ED1F24]' : 'text-slate-900'
                            }`}
                          >
                            {state.name}
                          </div>
                          <div className="text-xs text-slate-500">{state.courses} courses</div>
                        </div>
                        <div
                          className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedState === state.name
                              ? 'border-[#ED1F24] bg-[#ED1F24]'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {selectedState === state.name && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Students */}
                {topRankers.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-slate-900 mb-8 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Top Rankers
                    </h3>
                    <div className="space-y-4">
                      {topRankers.map((student, index) => (
                        <div
                          key={student.id ?? index}
                          className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                        >
                          <ImageWithFallback
                            resource={student.image}
                            alt={student.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-900 text-sm truncate">{student.name}</p>
                            {(student.rankDisplay || student.rank) && (
                              <p className="text-[#ED1F24] text-xs">
                                {student.rankDisplay || `Rank ${student.rank}`}
                              </p>
                            )}
                            {(student.exam || student.year) && (
                              <p className="text-slate-500 text-xs">
                                {[student.exam, student.year].filter(Boolean).join(' ')}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Continuous CTA */}
                <div className="bg-linear-to-br from-[#ED1F24] to-[#c41a1e] text-white rounded-xl p-6 shadow-lg">
                  <h4 className="mb-4">{pageData?.helpWidget?.title}</h4>
                  <p className="text-white/90 text-sm mb-4">{pageData?.helpWidget?.description}</p>
                  <div className="space-y-3">
                    {pageData?.helpWidget?.whatsappLink && (
                      <button
                        onClick={() => window.open(pageData.helpWidget.whatsappLink, '_blank')}
                        className="w-full bg-white text-[#ED1F24] px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp Us
                      </button>
                    )}
                    {pageData?.helpWidget?.callNumber && (
                      <button
                        onClick={() =>
                          (window.location.href = `tel:${pageData.helpWidget.callNumber}`)
                        }
                        className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2 border border-white/30"
                      >
                        <Phone className="w-5 h-5" />
                        Call Now
                      </button>
                    )}
                  </div>
                  <p className="text-white/70 text-xs text-center mt-4">
                    {pageData?.helpWidget?.availabilityText}
                  </p>
                </div>

                {/* Free Counselling Button */}
                {/* Counselling Button */}
                <button
                  onClick={() =>
                    pageData?.counsellingWidget?.link
                      ? window.open(pageData.counsellingWidget.link, '_blank')
                      : null
                  }
                  className="w-full min-h-16 bg-black text-white px-6 py-4 rounded-xl hover:bg-slate-800 transition-colors inline-flex items-center justify-center text-center font-semibold leading-snug"
                >
                  <span className="block break-words">
                    {pageData?.counsellingWidget?.buttonText || 'Get Free Counselling'}
                  </span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Course Filters */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/courses"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-6 py-3 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#ED1F24] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Courses
                  </Link>
                  <Link
                    href="/courses?filter=live"
                    onClick={() => setSelectedCategory('live')}
                    className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedCategory === 'live'
                        ? 'bg-[#ED1F24] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Live Courses
                  </Link>
                  <Link
                    href="/courses?filter=recorded"
                    onClick={() => setSelectedCategory('recorded')}
                    className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedCategory === 'recorded'
                        ? 'bg-[#ED1F24] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    Recorded
                  </Link>
                  <Link
                    href="/courses?filter=test-series"
                    onClick={() => setSelectedCategory('test-series')}
                    className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedCategory === 'test-series'
                        ? 'bg-[#ED1F24] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Test Series
                  </Link>
                  <Link
                    href="/courses?filter=other"
                    onClick={() => setSelectedCategory('other')}
                    className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedCategory === 'other'
                        ? 'bg-[#ED1F24] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    Specialized
                  </Link>
                </div>
              </div>

              {/* Course Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug || course.id}`}
                    className="bg-white border border-slate-200 rounded-xl hover:shadow-xl transition-shadow group flex flex-col"
                  >
                    {/* Course Header */}
                    <div className="bg-linear-to-br from-slate-50 to-slate-50 p-6 border-b border-slate-100 rounded-t-xl">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            course.category === 'live'
                              ? 'bg-red-50'
                              : course.category === 'recorded'
                                ? 'bg-blue-50'
                                : course.category === 'test-series'
                                  ? 'bg-green-50'
                                  : 'bg-purple-50'
                          }`}
                        >
                          {course.category === 'live' && (
                            <BookOpen className="w-6 h-6 text-[#ED1F24]" />
                          )}
                          {course.category === 'recorded' && (
                            <Play className="w-6 h-6 text-blue-600" />
                          )}
                          {course.category === 'test-series' && (
                            <FileText className="w-6 h-6 text-green-600" />
                          )}
                          {(course.category === 'other' || !course.category) && (
                            <Award className="w-6 h-6 text-purple-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-900 mb-2 group-hover:text-[#ED1F24] transition-colors line-clamp-2">
                            {course.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-sm">
                            <span className="inline-flex items-center gap-1 text-slate-600">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </span>
                            <span className="text-slate-400">•</span>
                            <div className="relative inline-block">
                              <button
                                onClick={(e) => {
                                  e.preventDefault() // Prevent link navigation
                                  e.stopPropagation()
                                  setClickedCourse(
                                    clickedCourse === String(course.id) ? null : String(course.id),
                                  )
                                }}
                                className="text-slate-600 cursor-pointer underline decoration-dotted hover:text-[#ED1F24] transition-colors"
                              >
                                {getStatesSummary(course)}
                              </button>

                              {/* Popover */}
                              {clickedCourse === String(course.id) &&
                                course.targetStates &&
                                course.targetStates.length > 0 && (
                                  <div className="absolute z-100 left-0 top-full mt-2 w-80 bg-linear-to-br from-slate-50 to-white border border-slate-100 rounded-xl shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {/* Arrow */}
                                    <div className="absolute -top-2 left-4 w-4 h-4 bg-linear-to-br from-slate-50 to-white border-l border-t border-slate-100 transform rotate-45"></div>

                                    {/* Close Button */}
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setClickedCourse(null)
                                      }}
                                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                                    >
                                      <X className="w-3 h-3 text-slate-700" />
                                    </button>

                                    {/* Header */}
                                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                                      <div className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
                                        <MapPin className="w-3 h-3 text-slate-700" />
                                      </div>
                                      <span className="text-[14px]! text-slate-900">
                                        Available in these states
                                      </span>
                                    </div>

                                    {/* States Grid */}
                                    <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
                                      {course.targetStates.map((state, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md transition-all group"
                                        >
                                          <div className="w-4 h-4 rounded-full bg-slate-100 group-hover:bg-slate-300 flex items-center justify-center shrink-0 transition-colors">
                                            <CheckCircle className="w-2.5 h-2.5 text-slate-600 group-hover:text-slate-800 transition-colors" />
                                          </div>
                                          <span className="text-[12px]! text-slate-700 group-hover:text-slate-900 truncate transition-colors">
                                            {state}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                          {course.category && (
                            <span className="inline-block mt-2 text-xs text-[#ED1F24] bg-red-50 px-2 py-1 rounded">
                              {course.category.replace('-', ' ')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Course Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Features */}
                      <ul className="space-y-2 px-2 mb-6 flex-1">
                        {course.features &&
                          course.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                              <span>{feature.feature}</span>
                            </li>
                          ))}
                      </ul>

                      {/* Pricing */}
                      <div className="flex items-center justify-between mb-6 bg-slate-100 p-4 rounded-lg">
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <div className="text-black font-bold! text-[20px]!">{course.price}</div>
                            {course.originalPrice && (
                              <div className="text-slate-400 line-through text-sm">
                                {course.originalPrice}
                              </div>
                            )}
                          </div>
                          <p className="text-slate-500 text-xs!">(FOR FULL BATCH)</p>
                        </div>
                        {course.discount && (
                          <div className="flex items-center gap-1 bg-white! text-green-700! font-bold! px-4 py-1 rounded-full text-xs border border-green-200">
                            <span>{course.discount}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <span className="block w-full bg-[#ED1F24] text-white text-center px-6 py-3 rounded-lg hover:bg-[#d11b20] transition-colors">
                          Enroll Now
                        </span>
                        <div
                          className="w-full bg-slate-100 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors text-center"
                        >
                          Know More
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Other Courses Slider */}
              {selectedCategory === 'all' && (
                <div className="mb-16">
                  <h2 className="text-slate-900 mb-6">Specialized Courses</h2>
                  <div className="relative">
                    <div className="overflow-hidden rounded-xl">
                      <div
                        className="flex transition-transform duration-500"
                        style={{
                          transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                      >
                        {otherCourses.map((course) => (
                          <div key={course.id} className="min-w-full px-2">
                            <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-8">
                              <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="flex-1">
                                  <h3 className="text-slate-900 mb-3">{course.title}</h3>
                                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {course.duration}
                                    </span>
                                    <span>{getStatesSummary(course)}</span>
                                  </div>
                                  <ul className="space-y-2 mb-4">
                                    {course.features &&
                                      course.features.slice(0, 3).map((feature, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-center gap-2 text-sm text-slate-600"
                                        >
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                          {feature.feature}
                                        </li>
                                      ))}
                                  </ul>
                                  <div className="flex items-center gap-3 mb-4">
                                    <span className="text-slate-900">{course.price}</span>
                                    {course.originalPrice && (
                                      <span className="text-slate-400 line-through">
                                        {course.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="shrink-0">
                                  <Link
                                    href={`/courses/${course.slug || course.id}`}
                                    className="inline-block bg-[#ED1F24] text-white px-8 py-3 rounded-lg hover:bg-[#d11b20] transition-colors"
                                  >
                                    Enroll Now
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {otherCourses.length === 0 && (
                          <div className="min-w-full text-center text-slate-500 py-8">
                            No specialized courses available currently.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Slider Controls */}
                    {otherCourses.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white text-slate-700 p-2 rounded-full shadow-lg hover:bg-slate-50 transition-colors"
                          aria-label="Previous"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white text-slate-700 p-2 rounded-full shadow-lg hover:bg-slate-50 transition-colors"
                          aria-label="Next"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>

                        <div className="flex justify-center gap-2 mt-4">
                          {otherCourses.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                currentSlide === index
                                  ? 'bg-[#ED1F24] w-8'
                                  : 'bg-slate-300 hover:bg-slate-400'
                              }`}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Join Community Section */}
              <div className="bg-linear-to-br from-[#ED1F24] to-[#c41a1e] text-white rounded-2xl p-8 mb-16">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {pageData?.communityImage && (
                    <ImageWithFallback
                      resource={pageData.communityImage}
                      display={pageData?.communityImageDisplay}
                      alt="Community"
                      width={128}
                      height={128}
                      className="rounded-full object-cover border-4 border-white shadow-xl max-w-[128px] max-h-[128px]"
                    />
                  )}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-white mb-3">{pageData?.communityTitle}</h2>
                    <p className="text-white/90 mb-6">{pageData?.communityDescription}</p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      {pageData?.telegramLink && (
                        <a
                          href={pageData.telegramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-[#ED1F24] px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Join Telegram
                        </a>
                      )}
                      {pageData?.appLink && (
                        <a
                          href={pageData.appLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors inline-flex items-center gap-2 border border-white/30"
                        >
                          <Play className="w-5 h-5" />
                          Download App
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs Section */}
              <div>
                <h2 className="text-slate-900 mb-8">{pageData?.faqTitle}</h2>
                <div className="space-y-4">
                  {pageData?.selectedFaqs?.map((faq: any, index: number) => (
                    <details
                      key={index}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden group"
                    >
                      <summary className="px-6 py-4 cursor-pointer text-slate-900 hover:bg-slate-50 transition-colors list-none flex items-center justify-between">
                        <span>{faq.question}</span>
                        <ChevronRight className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-6 pb-4 text-slate-600">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
