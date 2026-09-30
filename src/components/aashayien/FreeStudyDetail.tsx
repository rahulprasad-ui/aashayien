'use client'

import React from 'react'
import Link from 'next/link'
import {
  Clock,
  Eye,
  Calendar,
  CheckCircle,
  Download,
  Share2,
  FileText,
  Users,
  MessageSquare,
  ChevronRight,
  Play,
  Award,
  Target,
  Lightbulb,
  Star,
} from 'lucide-react'
import { Resource, Media, ResourceCategory } from '@/payload-types'
import Image from 'next/image'
import { ResourceGateModal } from '@/components/ResourceGateModal'
import type { Form as FormType, Popup } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { getMediaUrl, extractYoutubeId } from '@/utilities/getMediaUrl'

// No mock data needed anymore

export function FreeStudyDetail({
  resource,
  gatingConfig,
}: {
  resource: Resource
  gatingConfig?: {
    enableGating?: boolean
    gatingPopup?: Popup | string
  }
}) {
  const [showGateModal, setShowGateModal] = React.useState(false)
  const [pendingUrl, setPendingUrl] = React.useState<string | null>(null)

  const performDownload = (url: string) => {
    window.open(url, '_blank')
  }

  const handleDownload = (url: string) => {
    if (
      gatingConfig?.enableGating &&
      gatingConfig?.gatingPopup &&
      typeof gatingConfig.gatingPopup !== 'string'
    ) {
      setPendingUrl(url)
      setShowGateModal(true)
    } else {
      performDownload(url)
    }
  }

  const onGateSuccess = () => {
    setShowGateModal(false)
    if (pendingUrl) {
      performDownload(pendingUrl)
      setPendingUrl(null)
    }
  }



  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = resource.title
    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }


  const activeVideo = {
    title: resource.title,
    description: resource.description || '',
    videoId: extractYoutubeId(resource.youtubeId || '') || '',
    duration: resource.duration || '',
    views: resource.views || '0',
    uploadDate: resource.uploadDate
      ? new Date(resource.uploadDate).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '',
    category:
      typeof resource.category === 'object' && resource.category !== null
        ? (resource.category as ResourceCategory).title
        : 'Course',
    stats: [
      {
        label: 'Total Views',
        value: (resource as any).stats?.totalViews || resource.views || '0',
        icon: Eye,
      },
      {
        label: 'Students Enrolled',
        value: (resource as any).stats?.studentsEnrolled || '0',
        icon: Users,
      },
      {
        label: 'Average Rating',
        value: (resource as any).stats?.averageRating || '5.0/5',
        icon: Star,
      },
      {
        label: 'Downloads',
        value: (resource as any).stats?.downloads || '0',
        icon: Download,
      },
    ],

    difficulty: resource.difficulty || '',
    language: resource.language || '',
    instructor: resource.instructor
      ? {
          name: resource.instructor.name || '',
          title: resource.instructor.title || '',
          bio: resource.instructor.bio || '',
          photo:
            getMediaUrl(resource.instructor.photo) ||
            resource.instructor.externalPhotoUrl ||
            '',
        }
      : null,
    overview: resource.overview
      ? {
          introduction: resource.overview.introduction || '',
          whatYouWillLearn:
            resource.overview.whatYouWillLearn?.map((w: any) => w.point).filter(Boolean) || [],
          keyTopicsCovered:
            resource.overview.keyTopicsCovered?.map((k: any) => ({
              title: k.title,
              duration: k.duration,
              topics: k.topics?.map((t: any) => t.topic).filter(Boolean) || [],
            })) || [],
        }
      : null,
    studyMaterials:
      resource.studyMaterials?.map((m: any) => ({
        title: m.title,
        type: m.type,
        pages: m.pages,
        downloadUrl: m.externalFileUrl || (typeof m.file === 'object' ? m.file?.url : '') || '#',
      })) || [],
    relatedExams:
      resource.relatedExams?.map((e: any) => e.exam).filter(Boolean) || [],
    testimonials:
      (resource as any).testimonials?.map((t: any) => ({
        name: t.name,
        achievement: t.achievement,
        rating: t.rating,
        comment: t.comment,
        image: getMediaUrl(t.image),
      })) || [],
    cta: {
      title: (resource as any).cta?.title || 'Want More Detailed Study?',
      description:
        (resource as any).cta?.description ||
        'Get access to comprehensive courses, test series, and personalized mentorship',
      buttonText: (resource as any).cta?.buttonText || 'Explore Paid Courses',
      buttonLink: (resource as any).cta?.buttonLink || '/courses',
    },
    relatedVideos:
      (resource as any).relatedResources?.map((r: any) => {
        const resourceObj = typeof r === 'object' ? (r as Resource) : null
        return {
          id: resourceObj?.slug || '#',
          title: resourceObj?.title || 'Related Video',
          thumbnail:
            getMediaUrl(resourceObj?.externalThumbnailUrl || resourceObj?.thumbnail) ||
            '',
          duration: resourceObj?.duration || '0:00',
          views: resourceObj?.views || '0',
          category:
            typeof resourceObj?.category === 'object'
              ? (resourceObj.category as ResourceCategory).title
              : 'Course',
        }
      }) || [],
  }

  const whatsappNumber = (resource as any).contactInfo?.whatsapp || '919999999999'

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-[#ED1F24] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/free-study-online" className="hover:text-[#ED1F24] transition-colors">
              Free Study Online
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{activeVideo.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Video and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            {activeVideo.videoId && (
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.videoId}?rel=0&modestbranding=1&showinfo=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* Video Info */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ED1F24]/10 border border-[#ED1F24] rounded-full mb-3">
                    <Play className="w-3 h-3 text-[#ED1F24]" />
                    <span className="text-xs text-[#ED1F24] font-medium">
                      {activeVideo.category}
                    </span>
                  </div>
                  <h1 className="text-slate-900 mb-3 leading-tight">{activeVideo.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {activeVideo.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {activeVideo.views} views
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {activeVideo.uploadDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pb-6 border-b border-slate-200">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: activeVideo.title,
                        text: `Check out this event: ${activeVideo.title}`,
                        url: window.location.href,
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Link copied to clipboard!')
                      })
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => {
                    const url = activeVideo.studyMaterials?.[0]?.downloadUrl || '#'
                    handleDownload(url)
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Notes
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {activeVideo.stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-4 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl text-center"
                >
                  <stat.icon className="w-6 h-6 text-[#ED1F24] mx-auto mb-2" />
                  <p className="text-xl text-slate-900 font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* About This Video */}
            {activeVideo.overview && (
              <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-4">About This Video</h2>
                {activeVideo.overview.introduction && (
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {activeVideo.overview.introduction}
                  </p>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {activeVideo.difficulty && (
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-[#ED1F24]" />
                        <h3 className="text-base! text-slate-900">Difficulty</h3>
                      </div>
                      <p className="text-sm text-slate-600">{activeVideo.difficulty}</p>
                    </div>
                  )}
                  {activeVideo.language && (
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-5 h-5 text-[#ED1F24]" />
                        <h3 className="text-base! text-slate-900">Language</h3>
                      </div>
                      <p className="text-sm text-slate-600">{activeVideo.language}</p>
                    </div>
                  )}
                </div>

                {activeVideo.overview.whatYouWillLearn.length > 0 && (
                  <>
                    <h3 className="text-lg! text-slate-900 mb-3">What You Will Learn</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {activeVideo.overview.whatYouWillLearn.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Topics Covered */}
            {activeVideo.overview && activeVideo.overview.keyTopicsCovered.length > 0 && (
              <div>
                <h2 className="text-slate-900 mb-4">Topics Covered</h2>
                <div className="space-y-3">
                  {activeVideo.overview.keyTopicsCovered.map((topic: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-[#ED1F24] rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-base! text-slate-900 mb-1">{topic.title}</h3>
                            {topic.duration && <p className="text-xs text-slate-500">{topic.duration}</p>}
                          </div>
                        </div>
                      </div>
                      {topic.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 ml-11">
                          {topic.topics.map((subtopic: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                            >
                              {subtopic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor */}
            {activeVideo.instructor && (
              <div>
                <h2 className="text-slate-900 mb-4">About the Instructor</h2>
                <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {activeVideo.instructor.photo && (
                      <Image
                        src={activeVideo.instructor.photo}
                        alt={activeVideo.instructor.name}
                        width={80}
                        height={80}
                        unoptimized
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#ED1F24]"
                      />
                    )}
                    <div>
                      <h3 className="text-xl! text-slate-900 mb-1">{activeVideo.instructor.name}</h3>
                      <p className="text-[#ED1F24]">{activeVideo.instructor.title}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{activeVideo.instructor.bio}</p>
                </div>
              </div>
            )}

            {/* Student Testimonials */}
            {activeVideo.testimonials.length > 0 && (
              <div>
                <h2 className="text-slate-900 mb-4">Student Reviews</h2>
                <div className="space-y-4">
                  {activeVideo.testimonials.map((testimonial: any, index: number) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        {testimonial.image && (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            unoptimized
                            className="rounded-full object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-slate-900 font-medium">{testimonial.name}</h4>
                            {testimonial.achievement && (
                              <span className="px-2 py-0.5 bg-[#ED1F24] text-white text-xs rounded">
                                {testimonial.achievement}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm text-slate-700 italic">
                            &quot;{testimonial.comment}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Study Materials */}
              {activeVideo.studyMaterials.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg! text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#ED1F24]" />
                    Study Materials
                  </h3>
                  <div className="space-y-3 mb-4">
                    {activeVideo.studyMaterials.map((material: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => handleDownload(material.downloadUrl)}
                        className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <Download className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm text-slate-900 font-medium mb-1">
                              {material.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>{material.type}</span>
                              {material.size || material.pages ? <span>•</span> : null}
                              <span>{material.size || (material.pages ? material.pages + ' pages' : '')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      handleDownload(activeVideo.studyMaterials?.[0]?.downloadUrl || '#')
                    }
                    className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Download All Materials
                  </button>
                </div>
              )}

              {/* Related Exams */}
              {activeVideo.relatedExams.length > 0 && (
                <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg! text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#ED1F24]" />
                    Relevant For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeVideo.relatedExams.map((exam: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA - Enroll in Full Course */}
              <div className="bg-linear-to-br from-[#ED1F24] to-red-700 rounded-xl p-6 text-white text-center">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl! text-white mb-2">{activeVideo.cta.title}</h3>
                <p className="text-sm text-red-100 mb-6">{activeVideo.cta.description}</p>
                <Link
                  href={activeVideo.cta.buttonLink}
                  className="block w-full px-6 py-3 bg-white text-[#ED1F24] rounded-lg hover:bg-slate-100 transition-colors font-medium mb-3"
                >
                  {activeVideo.cta.buttonText}
                </Link>
                <Link
                  href={activeVideo.cta.buttonLink}
                  className="block w-full px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  Enroll Now
                </Link>
              </div>

              {/* Share */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg! text-slate-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#ED1F24]" />
                  Share This Video
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-slate-900 text-white rounded-xl p-6">
                <h3 className="text-lg! text-white mb-3">Need Help?</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Have questions about this topic? Connect with our mentors for guidance.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Videos */}
        {activeVideo.relatedVideos.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-slate-900">Related Free Videos</h2>
              <Link
                href="/free-study-online"
                className="text-[#ED1F24] hover:text-[#d11b20] text-sm font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeVideo.relatedVideos.map((video: any) => (
                <Link
                  key={video.id}
                  href={`/free-study-online/${video.id}`}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-40">
                    {video.thumbnail && (
                      <Image
                        src={getMediaUrl(video.thumbnail)}
                        alt={video.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-[#ED1F24] ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 bg-[#ED1F24]/10 text-[#ED1F24] text-xs rounded mb-2">
                      {video.category}
                    </span>
                    <h3 className="text-slate-900 text-sm font-medium mb-2 line-clamp-2 group-hover:text-[#ED1F24] transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Eye className="w-3 h-3" />
                      {video.views} views
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Resource Gate Modal */}
      {showGateModal &&
        gatingConfig?.gatingPopup &&
        typeof gatingConfig.gatingPopup !== 'string' && (
          <ResourceGateModal
            isOpen={showGateModal}
            onClose={() => {
              setShowGateModal(false)
              setPendingUrl(null)
            }}
            onSuccess={onGateSuccess}
            popup={gatingConfig.gatingPopup as Popup}
          />
        )}
    </div>
  )
}
