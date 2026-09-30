'use client'

import React from 'react'
import Image from 'next/image'
import { BookOpen, Check, Star, ArrowRight } from 'lucide-react'

export interface CourseItem {
  id: string
  title: string
  subtitle: string
  tags: string[]
  price: string
  originalPrice: string
  discount?: string
  image?: string
  features: string[]
  buttonText?: string
  link?: string
}

interface ClatPgCourseCardsProps {
  badgeText?: string
  title?: string
  subtitle?: string
  buttonText?: string
  courses?: CourseItem[]
  selectedCourses?: any[]
  customCourses?: any[]
  onSelectCourse?: (course: CourseItem) => void
}

const defaultCourses: CourseItem[] = [
  {
    id: 'course-1',
    title: 'CLAT PG 2027 Master Foundation Batch',
    subtitle: 'Comprehensive 1-Year Live Classroom & Online Coaching for CLAT LL.M & AILET PG 2027.',
    tags: ['CLAT PG 2027', 'LIVE CLASSES'],
    price: '₹34,999',
    originalPrice: '₹49,999',
    features: [
      '350+ Hours Live Interactive Classes',
      '30+ Full Length CLAT PG Mock Tests',
      'Hard Copy Study Material & Landmark Judgments Book',
      '24x7 Doubt Clearance Portal & 1:1 Mentorship',
    ],
    buttonText: 'View Course Details',
  },
  {
    id: 'course-2',
    title: 'CLAT PG 2028 Target 2-Year Program',
    subtitle: 'Designed for 3rd & 4th year law undergraduates aiming for AIR 1 in CLAT PG 2028.',
    tags: ['CLAT PG 2028', '2-YEAR BATCH'],
    price: '₹54,999',
    originalPrice: '₹79,999',
    features: [
      '600+ Hours Extensive Foundation Classes',
      '50+ Full Length Mock Tests + Sectional Tests',
      'Complete Coverage of Undergraduate Law Subjects',
      'Weekly Passage-based Analytical Workshops',
    ],
    buttonText: 'View Course Details',
  },
  {
    id: 'course-3',
    title: 'CLAT PG Ultimate Mock Test Series & PYQ',
    subtitle: 'Exhaustive Test Series featuring 40+ Mocks simulated exactly on recent CLAT PG exam patterns.',
    tags: ['TEST SERIES', 'SELF-PACED'],
    price: '₹7,999',
    originalPrice: '₹14,999',
    features: [
      '40 Full Length Simulated CLAT PG Mocks',
      '10 Previous Year Question Papers with Video Solutions',
      'All-India Ranking & Detailed Percentile Analytics',
      'Subject-wise Performance Breakdown',
    ],
    buttonText: 'View Course Details',
  },
]

export const ClatPgCourseCards: React.FC<ClatPgCourseCardsProps> = ({
  badgeText = 'CLAT PG PROGRAMS',
  title = 'CLAT PG Courses Designed for Your Success',
  subtitle = 'Choose the program that fits your preparation timeline and goals',
  buttonText = 'View Course Details',
  courses,
  selectedCourses,
  customCourses,
  onSelectCourse,
}) => {
  let displayCourses: CourseItem[] = []

  if (courses && courses.length > 0) {
    displayCourses = courses
  } else if (customCourses && customCourses.length > 0) {
    displayCourses = customCourses.map((c, i) => ({
      id: `custom-${i}`,
      title: c.title,
      subtitle: c.subtitle || '',
      tags: typeof c.tags === 'string' ? c.tags.split(',').map((t: string) => t.trim()) : Array.isArray(c.tags) ? c.tags : [],
      price: c.price ? (c.price.startsWith('₹') ? c.price : `₹${c.price}`) : '',
      originalPrice: c.originalPrice ? (c.originalPrice.startsWith('₹') ? c.originalPrice : `₹${c.originalPrice}`) : '',
      discount: c.discount || '',
      image:
        typeof c.image === 'object' && c.image?.url
          ? c.image.url
          : typeof c.image === 'string'
            ? c.image
            : '',
      features: Array.isArray(c.features)
        ? c.features.map((f: any) => (typeof f === 'object' ? f.feature : f))
        : [],
      buttonText: c.buttonText || undefined,
      link: c.link || undefined,
    }))
  } else if (selectedCourses && selectedCourses.length > 0) {
    displayCourses = selectedCourses.map((c: any, i: number) => ({
      id: c.id || `selected-${i}`,
      title: c.title || 'CLAT PG Course',
      subtitle: c.subtitle || c.description || '',
      tags: c.category ? [c.category] : ['CLAT PG'],
      price: c.price ? (String(c.price).startsWith('₹') ? String(c.price) : `₹${c.price}`) : '',
      originalPrice: c.originalPrice ? (String(c.originalPrice).startsWith('₹') ? String(c.originalPrice) : `₹${c.originalPrice}`) : '',
      discount: c.discount || '',
      image: typeof c.featuredImage === 'object' && c.featuredImage?.url ? c.featuredImage.url : '',
      features: Array.isArray(c.features)
        ? c.features.map((f: any) => (typeof f === 'object' ? f.feature || f.title : f))
        : [],
      buttonText: c.buttonText || undefined,
      link: c.slug ? `/courses/${c.slug}` : undefined,
    }))
  } else {
    displayCourses = defaultCourses
  }

  return (
    <section id="clat-pg-courses-section" className="py-16 lg:py-24 bg-slate-50 dark:bg-neutral-900/50 border-y border-slate-200/60 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {badgeText}
              </span>
            </div>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg mt-3">
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {displayCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-neutral-700/80 shadow-md hover:shadow-2xl hover:border-[#ED1F24]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Optional Top Banner Image */}
                {course.image && (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-900">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    
                    {/* Discount Badge */}
                    {course.discount && (
                      <div className="absolute top-4 right-4 bg-[#ED1F24] text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg">
                        {course.discount}
                      </div>
                    )}
                  </div>
                )}

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Tags */}
                  {course.tags && course.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-neutral-700/80 text-slate-700 dark:text-neutral-300"
                        >
                          <BookOpen className="w-3 h-3 text-[#ED1F24]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#ED1F24] transition-colors leading-snug">
                    {course.title}
                  </h3>

                  {/* Subtitle */}
                  {course.subtitle && (
                    <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {course.subtitle}
                    </p>
                  )}

                  {/* Price Section */}
                  {(course.price || course.originalPrice) && (
                    <div className="pt-2 flex items-baseline gap-3">
                      {course.price && (
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                          {course.price}
                        </span>
                      )}
                      {course.originalPrice && (
                        <span className="text-sm font-medium text-slate-400 line-through">
                          {course.originalPrice}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Features Checklist */}
                  {course.features && course.features.length > 0 && (
                    <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-neutral-700">
                      {course.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-neutral-300">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer CTA Button */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => {
                    if (course.link) {
                      window.location.href = course.link
                    } else if (onSelectCourse) {
                      onSelectCourse(course)
                    } else {
                      const el = document.getElementById('clat-pg-form-container')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  <span>{course.buttonText || buttonText || 'View Course Details'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
