import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BookOpen, Clock, IndianRupee, ExternalLink } from 'lucide-react'
import { ImageWithFallback } from '@/components/aashayien/ImageWithFallback'

type CoursesBlockProps = {
  heading?: string | null
  subheading?: string | null
  description?: string | null
  populateBy?: 'latest' | 'selection' | null
  selectedCourses?: (any | number | string)[] | null
  limit?: number | null
  viewAllLink?: string | null
}

export const CoursesBlockComponent: React.FC<CoursesBlockProps> = async ({
  heading = 'Our Courses',
  subheading = 'Judiciary Preparation',
  description,
  populateBy = 'latest',
  selectedCourses,
  limit = 6,
  viewAllLink = '/courses',
}) => {
  let courses: any[] = []

  if (populateBy === 'selection' && selectedCourses && selectedCourses.length > 0) {
    courses = selectedCourses.map((item) => (typeof item === 'object' ? item : null)).filter(Boolean)
  }

  if (courses.length === 0) {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'courses',
      limit: limit ?? 6,
      sort: 'title',
      overrideAccess: false,
      depth: 1,
    })
    courses = res.docs
  }

  if (!courses || courses.length === 0) return null

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

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => {
            const thumbnail = typeof course.thumbnail === 'object' ? course.thumbnail : null
            const enrollLink = course.enrollmentLink || `/courses/${course.slug}`

            return (
              <div
                key={course.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100 flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  {thumbnail?.url ? (
                    <ImageWithFallback
                      src={thumbnail.url}
                      alt={thumbnail.alt || course.title || course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-slate-300" />
                    </div>
                  )}
                  {course.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#ED1F24] text-white text-xs font-bold rounded-full">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1 group-hover:text-[#ED1F24] transition-colors line-clamp-2">
                    {course.title || course.name}
                  </h3>
                  {course.category && (
                    <p className="text-slate-500 text-sm mb-4 capitalize">{course.category}</p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    {course.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{course.duration}</span>
                      </div>
                    )}
                    {course.mode && (
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span className="capitalize">{course.mode}</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  {course.price && (
                    <div className="flex items-baseline gap-2 mb-5">
                      <div className="flex items-center gap-1 text-[#ED1F24] font-extrabold text-xl">
                        <IndianRupee className="w-5 h-5" />
                        <span>{course.price}</span>
                      </div>
                      {course.originalPrice && (
                        <span className="text-slate-400 line-through text-sm">₹{course.originalPrice}</span>
                      )}
                    </div>
                  )}

                  {/* Enroll Button */}
                  <a
                    href={enrollLink}
                    className="mt-auto block text-center px-6 py-3 bg-[#ED1F24] text-white rounded-xl hover:bg-[#d11b20] transition-colors font-bold"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All */}
        {viewAllLink && (
          <div className="text-center mt-10">
            <a
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#ED1F24] text-[#ED1F24] rounded-xl hover:bg-[#ED1F24] hover:text-white transition-colors font-bold"
            >
              View All Courses <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
