'use client'

import React from 'react'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import Image from 'next/image'
import { SocialShare } from './SocialShare'
import { getClientSideURL } from '@/utilities/getURL'

import type { SuccessStory, Media, Course } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

// Get all valid icon names, handling different import structures (CJS/ESM)
const iconList = (LucideIcons as any).icons ? (LucideIcons as any).icons : LucideIcons

const getImageUrl = (image: number | Media | null | undefined): string => {
  if (!image) return ''
  if (typeof image === 'number') return ''
  return getMediaUrl(image.url || '')
}

export function SuccessStoryDetail({
  story,
  relatedStories,
}: {
  story: SuccessStory
  relatedStories: SuccessStory[]
}) {
  const getIcon = (iconName: string | null | undefined) => {
    if (!iconName) return LucideIcons.Target // Default icon

    // access the icon from the dynamic list
    const Icon = (iconList as any)[iconName]
    return Icon || LucideIcons.Target
  }

  // Combine enrolled courses and custom courses
  const courses = [
    ...(story.journey?.enrolledCourses?.map((c) => {
      if (typeof c === 'number') return null
      return c.title
    }) || []),
    ...(story.journey?.customCourses?.map((c) => c.courseName) || []),
  ].filter(Boolean) as string[]

  const shareUrl = `${getClientSideURL()}/success-stories/${story.slug}`
  const shareTitle = `Success Story: ${story.name} - ${story.achievement}`

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED1F24] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <LucideIcons.ChevronRight className="w-4 h-4" />
            <Link href="/success-stories" className="hover:text-white transition-colors">
              Success Stories
            </Link>
            <LucideIcons.ChevronRight className="w-4 h-4" />
            <span className="text-white">{story.name}</span>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
            {/* Left Content */}
            <div>
              {/* Achievement Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ED1F24]/20 border border-[#ED1F24] rounded-full mb-6">
                <LucideIcons.Trophy className="w-4 h-4 text-[#ED1F24]" />
                <span className="text-sm text-[#ED1F24] font-medium">Success Story</span>
              </div>

              <h1 className="text-white mb-4 leading-tight">{story.name}</h1>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#ED1F24] rounded-full flex items-center justify-center">
                    <LucideIcons.Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Achievement</p>
                    <p className="text-white font-medium">{story.achievement}</p>
                  </div>
                </div>
                {story.rankDisplay && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <LucideIcons.Medal className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">All India Rank</p>
                      <p className="text-white font-medium text-xl">{story.rankDisplay}</p>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xl text-slate-300 mb-6">
                {story.studentInfo?.currentPosition}{' '}
                {story.studentInfo?.location && `• ${story.studentInfo.location}`}
              </p>

              {/* Stats Grid */}
              {story.stats && story.stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {story.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-center"
                    >
                      <p className="text-2xl text-white font-bold mb-1">{stat.value}</p>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Student Photo */}
            <div className="lg:sticky lg:top-28">
              <div className="relative rounded-2xl overflow-hidden bg-slate-800">
                <Image
                  src={getImageUrl(story.image)}
                  alt={story.name}
                  width={400}
                  height={400}
                  className="w-full h-[400px] object-cover"
                  unoptimized // Since we might be using external URLs or payload media URLs
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <LucideIcons.Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-white text-sm">{story.studentInfo?.education}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Journey Overview */}
            {story.journey && (
              <section>
                <h2 className="text-slate-900 mb-6">Journey Overview</h2>
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl text-center">
                    <div className="w-12 h-12 bg-[#ED1F24]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <LucideIcons.Target className="w-6 h-6 text-[#ED1F24]" />
                    </div>
                    <p className="text-2xl text-slate-900 font-bold mb-1">
                      {story.journey.totalAttempts}
                    </p>
                    <p className="text-sm text-slate-600">Total Attempts</p>
                  </div>
                  <div className="p-6 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl text-center">
                    <div className="w-12 h-12 bg-[#ED1F24]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <LucideIcons.Clock className="w-6 h-6 text-[#ED1F24]" />
                    </div>
                    <p className="text-2xl text-slate-900 font-bold mb-1">
                      {story.journey.preparationDuration}
                    </p>
                    <p className="text-sm text-slate-600">Preparation Time</p>
                  </div>
                  <div className="p-6 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl text-center">
                    <div className="w-12 h-12 bg-[#ED1F24]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <LucideIcons.BookOpen className="w-6 h-6 text-[#ED1F24]" />
                    </div>
                    <p className="text-2xl text-slate-900 font-bold mb-1">{courses.length}</p>
                    <p className="text-sm text-slate-600">Courses Enrolled</p>
                  </div>
                </div>
              </section>
            )}

            {/* The Story */}
            <section>
              <h2 className="text-slate-900 mb-6">The Success Story</h2>
              <div className="max-w-none">
                {story.story?.introduction && (
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    {story.story.introduction}
                  </p>
                )}

                {story.story?.challenges && story.story.challenges.length > 0 && (
                  <>
                    <h3 className="text-xl! text-slate-900 mb-4">Challenges Faced</h3>
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {story.story.challenges.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-[#ED1F24] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <p className="text-sm text-slate-700">{item.challenge}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {story.story?.turningPoint && (
                  <div className="p-6 bg-linear-to-br from-[#ED1F24]/5 to-white border-l-4 border-[#ED1F24] rounded-lg mb-8">
                    <div className="flex gap-4">
                      {/* <LucideIcons.Quote className="w-8 h-8 text-[#ED1F24] shrink-0" /> */}
                      <div>
                        <h3 className="text-xl! text-slate-900 mb-2">{story.name}</h3>
                        <p className="text-slate-700 italic">
                          &quot;{story.story.turningPoint}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {story.story?.preparation && (
                  <>
                    <h3 className="text-xl! text-slate-900 mb-4">Preparation Strategy</h3>
                    <div className="space-y-4 mb-8">
                      {story.story.preparation.prelims && (
                        <div className="p-5 bg-white border border-slate-200 rounded-xl">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                              <LucideIcons.CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="text-lg! text-slate-900 mb-2">Prelims Strategy</h4>
                              <p className="text-slate-700">{story.story.preparation.prelims}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {story.story.preparation.mains && (
                        <div className="p-5 bg-white border border-slate-200 rounded-xl">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                              <LucideIcons.FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-lg! text-slate-900 mb-2">Mains Strategy</h4>
                              <p className="text-slate-700">{story.story.preparation.mains}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {story.story.preparation.interview && (
                        <div className="p-5 bg-white border border-slate-200 rounded-xl">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                              <LucideIcons.Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="text-lg! text-slate-900 mb-2">
                                Interview Preparation
                              </h4>
                              <p className="text-slate-700">{story.story.preparation.interview}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Timeline */}
            {story.timeline && story.timeline.length > 0 && (
              <section>
                <h2 className="text-slate-900 mb-6">Journey Timeline</h2>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

                  <div className="space-y-8">
                    {story.timeline.map((item, index) => {
                      const IconComponent = getIcon(item.icon)
                      return (
                        <div key={index} className="relative flex gap-6">
                          <div className="relative z-10 w-12 h-12 bg-[#ED1F24] rounded-full flex items-center justify-center shrink-0">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 pb-8">
                            <p className="text-sm text-[#ED1F24] font-medium mb-1">{item.period}</p>
                            <p className="text-slate-900 font-medium">{item.event}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Testimonial */}
            {story.testimonial && (
              <section>
                <h2 className="text-slate-900 mb-6">Student Testimonial</h2>
                <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#ED1F24] rounded-full blur-3xl opacity-20" />
                  <div className="relative z-10">
                    {/* <LucideIcons.Quote className="w-12 h-12 text-[#ED1F24] mb-6" /> */}
                    <p className="text-xl leading-relaxed mb-6">{story.testimonial.quote}</p>
                    {story.testimonial.highlight && (
                      <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                        <p className="text-yellow-400 font-medium">
                          💡 {story.testimonial.highlight}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Tips for Aspirants */}
            {story.tips && story.tips.length > 0 && (
              <section>
                <h2 className="text-slate-900 mb-6">Tips for Aspirants from {story.name}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {story.tips.map((tip, index) => {
                    const IconComponent = getIcon(tip.icon)
                    return (
                      <div
                        key={index}
                        className="p-5 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-[#ED1F24]/10 rounded-lg flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5 text-[#ED1F24]" />
                          </div>
                          <div>
                            <h3 className="text-base!! text-slate-900 font-medium mb-2">
                              {tip.title}
                            </h3>
                            <p className="text-sm text-slate-600">{tip.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Resources Used */}
            {story.resources && story.resources.length > 0 && (
              <section>
                <h2 className="text-slate-900 mb-6">Resources Used from Aashayein</h2>
                <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-8">
                  <div className="space-y-3">
                    {story.resources.map((resource, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <LucideIcons.CheckCircle className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                        <p className="text-slate-700">{resource.resource}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-slate-700 mb-4 text-center">
                      Want to achieve success like {story.name.split(' ')[0]}?
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors"
                      >
                        <LucideIcons.BookOpen className="w-5 h-5" />
                        Explore Our Courses
                      </Link>
                      <a
                        href="https://wa.me/919999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-[#ED1F24] hover:text-[#ED1F24] transition-colors"
                      >
                        <LucideIcons.Users className="w-5 h-5" />
                        Talk to Mentor
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Share */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg! text-slate-900 mb-4 flex items-center justify-center gap-2">
                  <LucideIcons.Share2 className="w-5 h-5 text-[#ED1F24]" />
                  Share This Story
                </h3>
                <SocialShare url={shareUrl} title={shareTitle} />
              </div>

              {/* Courses Enrolled */}
              {courses.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg! text-slate-900 mb-4">Courses Enrolled</h3>
                  <div className="space-y-3">
                    {courses.map((course, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                      >
                        <LucideIcons.BookOpen className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{course}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/courses"
                    className="block w-full mt-4 px-4 py-2 bg-slate-900 text-white text-center rounded-lg hover:bg-slate-800 transition-colors text-sm"
                  >
                    View All Courses
                  </Link>
                </div>
              )}

              {/* Video Interview */}
              {story.videoUrl && (
                <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    {/* Placeholder image for video, or extract thumbnail if possible. For now, use a generic image or the student image if available */}
                    <Image
                      src={getImageUrl(story.image)}
                      alt="Video Interview"
                      fill
                      className="object-cover opacity-50"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a
                        href={story.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <LucideIcons.Video className="w-8 h-8 text-[#ED1F24] ml-1" />
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg! text-white mb-2">Watch Full Interview</h3>
                    <p className="text-sm text-slate-300">
                      Hear the complete success story directly from {story.name}
                    </p>
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-linear-to-br from-[#ED1F24] to-red-700 rounded-xl p-6 text-white text-center">
                <LucideIcons.Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl! text-white mb-2">Start Your Success Journey</h3>
                <p className="text-sm text-red-100 mb-6">
                  Join thousands of successful students who achieved their dreams with Aashayein
                  Judiciary
                </p>
                <a
                  href="/courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-white text-[#ED1F24] rounded-lg hover:bg-slate-100 transition-colors font-medium"
                >
                  Enroll Now
                </a>
              </div>

              {/* Related Success Stories */}
              {relatedStories && relatedStories.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg! text-slate-900 mb-4">More Success Stories</h3>
                  <div className="space-y-4">
                    {relatedStories.map((relatedStory) => (
                      <Link
                        key={relatedStory.id}
                        href={`/success-stories/${relatedStory.slug}`}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                      >
                        <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                          <Image
                            src={getImageUrl(relatedStory.image)}
                            alt={relatedStory.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm text-slate-900 font-medium group-hover:text-[#ED1F24] transition-colors">
                            {relatedStory.name}
                          </h4>
                          <p className="text-xs text-slate-600">
                            {relatedStory.achievement} • {relatedStory.rank}
                          </p>
                        </div>
                        <LucideIcons.ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#ED1F24] transition-colors" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/success-stories"
                    className="block w-full mt-4 px-4 py-2 border-2 border-slate-200 text-slate-700 text-center rounded-lg hover:border-[#ED1F24] hover:text-[#ED1F24] transition-colors text-sm"
                  >
                    View All Stories
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
