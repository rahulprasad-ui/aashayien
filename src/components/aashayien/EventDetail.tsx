'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  User,
  Users,
  ChevronRight,
  MapPin,
  Video,
  Award,
  Phone,
  Share2,
  CheckCircle2,
  BookOpen,
  Bell,
  Gift,
  Download,
} from 'lucide-react'
import type { Event as EventType, Popup, EventsPage } from '@/payload-types'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { formatDateTime, formatTime } from '@/utilities/formatDateTime'
import { ResourceGateModal } from '../ResourceGateModal'
import { ImageWithFallback } from './ImageWithFallback'

export function EventDetail({
  event,
  gatingConfig,
  eventsPageData,
}: {
  event: EventType
  gatingConfig?: { enableGating?: boolean | null; gatingPopup?: string | Popup | null }
  eventsPageData?: EventsPage
}) {
  const [isGateModalOpen, setIsGateModalOpen] = useState(false)
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null)

  const helpTitle = eventsPageData?.contactInfo?.helpTitle || 'Need Help?'
  const contactPhone = eventsPageData?.contactInfo?.phone || '+91 96679 21888'
  const contactWhatsapp = eventsPageData?.contactInfo?.whatsapp || '919667921888'

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      webinar: 'Webinar (Online)',
      seminar: 'Seminar (Offline)',
      scholarship: 'Scholarship Test',
      workshop: 'Workshop',
    }
    return labels[category] || category
  }

  const handleDownload = (e: React.MouseEvent, url: string) => {
    e.preventDefault()

    if (
      gatingConfig?.enableGating &&
      gatingConfig?.gatingPopup &&
      typeof gatingConfig.gatingPopup !== 'string'
    ) {
      setPendingDownloadUrl(url)
      setIsGateModalOpen(true)
    } else {
      window.open(url, '_blank')
    }
  }

  const handleGateSuccess = () => {
    setIsGateModalOpen(false)
    if (pendingDownloadUrl) {
      window.open(pendingDownloadUrl, '_blank')
      setPendingDownloadUrl(null)
    }
  }

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
            <Link href="/events" className="hover:text-[#ED1F24] transition-colors">
              Events
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 line-clamp-1">{event.title}</span>
          </div>
        </div>
      </div>

      {/* Full Width Event Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge & Tags */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ED1F24]/10 text-[#ED1F24] text-sm font-medium rounded-full">
              {getCategoryLabel(event.category || '')}
            </span>
            {event.isFree && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                <Gift className="w-3.5 h-3.5" />
                Free Event
              </span>
            )}
            {event.isOnline ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                <Video className="w-3.5 h-3.5" />
                Online
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                <MapPin className="w-3.5 h-3.5" />
                Offline
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-slate-900 mb-6 leading-tight">{event.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-200">
            {/* Host */}
            <div className="flex items-center gap-3">
              <ImageWithFallback
                resource={event.hostImage}
                display={event.hostImageDisplay}
                alt={event.host || 'Host'}
                fill
                className="w-12 h-12 rounded-full bg-slate-100 shrink-0"
                unoptimized
              />
              <div>
                <div className="font-medium text-slate-900">{event.host}</div>
                {event.hostTitle && <div className="text-sm text-slate-600">{event.hostTitle}</div>}
              </div>
            </div>

            {/* Divider */}
            <div className="h-12 w-px bg-slate-200" />

            {/* Date & Time */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ED1F24]" />
                <span>{formatDateTime(event.date as string)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ED1F24]" />
                <span>{formatTime(event.time as string)}</span>
              </div>
            </div>

            {/* Seats */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="w-4 h-4 text-[#ED1F24]" />
              <span>
                {event.seatsAvailable} of {event.totalSeats || 'unlimited'} seats available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Content with Sidebar */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Featured Image Moved Here */}
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-xl bg-slate-100 w-full">
              <ImageWithFallback
                resource={event.image}
                display={(event as any).imageDisplay}
                alt={event.title}
                fill
                fallbackLabel="No event image"
                className="object-cover"
                unoptimized
              />
              {/* Overlay with Quick Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center gap-6 text-white text-sm">
                  {event.language && (
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{event.language}</span>
                    </div>
                  )}
                  {event.platform && (
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      <span>{event.platform}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Action Bar Moved Here */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-12">
              <span className="text-sm font-medium text-slate-900">Share this event:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: event.title,
                        text: `Check out this event: ${event.title}`,
                        url: window.location.href,
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Link copied to clipboard!')
                      })
                    }
                  }}
                  className="p-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                  title="Share Event"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {event.registerUrl && (
                  <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors font-semibold text-sm"
                  >
                    Register Now
                  </a>
                )}
              </div>
            </div>

            {/* Event Description */}
            {event.fullDescription && (
              <div className="event-content mb-12 rich-text">
                <RichText
                  data={event.fullDescription}
                  enableGutter={false}
                  className="mx-0 w-full max-w-none"
                />
              </div>
            )}

            <style jsx global>{`
              .rich-text h2 {
                font-size: 2rem;
                font-weight: 700;
                color: #0f172a;
                margin-top: 4rem;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #e2e8f0;
              }

              .rich-text h3 {
                font-size: 1.5rem;
                font-weight: 700;
                color: #0f172a;
                margin-top: 3rem;
                margin-bottom: 1.5rem;
              }

              .rich-text p {
                font-size: 1.125rem;
                line-height: 1.8;
                color: #334155;
                margin-top: 0;
                margin-bottom: 1rem;
              }

              .rich-text p:empty,
              .rich-text p:has(> br:only-child) {
                display: none;
              }

              .rich-text .payload-richtext,
              .rich-text .prose,
              .rich-text .container {
                width: 100%;
                max-width: none;
                margin-left: 0;
                margin-right: 0;
                padding-left: 0;
                padding-right: 0;
              }

              .rich-text ul {
                font-size: 1.125rem;
                color: #334155;
                margin-bottom: 2rem;
                margin-left: 1.5rem;
                list-style-type: disc;
              }

              .rich-text li {
                margin-bottom: 0.75rem;
                line-height: 1.8;
                padding-left: 0.5rem;
              }

              .rich-text strong {
                font-weight: 600;
                color: #0f172a;
              }

              .rich-text em {
                font-style: italic;
                color: #64748b;
              }

              .rich-text blockquote {
                border-left: 4px solid #ed1f24;
                padding-left: 1.5rem;
                margin: 2rem 0;
                font-style: italic;
                color: #475569;
              }
            `}</style>

            {/* Event Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#ED1F24]" />
                  Event Agenda
                </h2>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#ED1F24]/30 transition-colors group"
                    >
                      <div className="shrink-0">
                        <div className="w-12 h-12 bg-white border-2 border-slate-200 group-hover:border-[#ED1F24] rounded-full flex items-center justify-center transition-colors">
                          <span className="text-slate-900 group-hover:text-[#ED1F24] font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-[#ED1F24] font-medium mb-1">
                          <Clock className="w-4 h-4" />
                          {item.time}
                        </div>
                        <h3 className="text-base! font-semibold text-slate-900 mb-1">
                          {item.topic}
                        </h3>
                        {item.speaker && (
                          <p className="text-sm text-slate-600">by {item.speaker}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Benefits */}
            {event.benefits && event.benefits.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#ED1F24]" />
                  What You&apos;ll Get
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.benefits.map((benefitItem, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-green-50/50 rounded-xl border border-green-100 hover:bg-green-50 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 font-medium">
                        {benefitItem.benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-medium text-slate-900">Tags:</span>
                  {event.tags.map((tagItem, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      #{tagItem.tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Register CTA */}
              <div className="bg-linear-to-br from-[#ED1F24] to-[#c91a1e] rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6" />
                  <h3 className="text-xl! text-white! font-bold! mb-0!">
                    {event.isFree ? 'Free Registration' : 'Register Now'}
                  </h3>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-white/90 text-sm bg-white/10 p-2.5 rounded-lg border border-white/10">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Seats Available:
                    </span>
                    <span className="font-bold">{event.seatsAvailable} left</span>
                  </div>
                  <div className="flex items-center justify-between text-white/90 text-sm">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date:
                    </span>
                    <span className="font-semibold">{formatDateTime(event.date as string)}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/90 text-sm">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Time:
                    </span>
                    <span className="font-semibold">{formatTime(event.time as string)}</span>
                  </div>
                  {event.fees && (
                    <div className="flex items-center justify-between text-white/90 text-sm">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Fees:
                      </span>
                      <span className="font-bold text-lg">{event.fees}</span>
                    </div>
                  )}
                </div>
                {event.registerUrl && (
                  <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-white text-[#ED1F24] text-center rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg hover:-translate-y-0.5 mb-3"
                  >
                    Register Now
                  </a>
                )}
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                  className="w-full py-3 bg-white/10 text-white text-center rounded-xl font-medium hover:bg-white/20 transition-colors border border-white/30 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call for Details
                </a>
              </div>

              {/* Event Details Box */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg! text-slate-900! font-bold! mb-4 border-b pb-2">
                  Event Details
                </h3>
                <div className="space-y-4 text-sm">
                  {event.platform && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <Video className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">Platform</div>
                        <div className="text-slate-600">{event.platform}</div>
                      </div>
                    </div>
                  )}
                  {event.language && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">Language</div>
                        <div className="text-slate-600">{event.language}</div>
                      </div>
                    </div>
                  )}
                  {event.prerequisites && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">Prerequisites</div>
                        <div className="text-slate-600">{event.prerequisites}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Brochure */}
              <div className="bg-linear-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Download className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg! text-slate-900! font-bold! mb-0!">Event Schedule</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Download complete event calendar and upcoming sessions.
                </p>
                {event.brochureFile && (
                  <a
                    href={
                      event.brochureFile !== null && typeof event.brochureFile === 'object'
                        ? getMediaUrl(event.brochureFile.url || '')
                        : '#'
                    }
                    onClick={(e) =>
                      handleDownload(
                        e,
                        event.brochureFile !== null && typeof event.brochureFile === 'object'
                          ? getMediaUrl(event.brochureFile.url || '')
                          : '#',
                      )
                    }
                    className="w-full py-3 bg-slate-900 text-white text-center rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                )}
                {!event.brochureFile && (
                  <button
                    disabled
                    className="w-full py-3 bg-slate-200 text-slate-500 text-center rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Not Available
                  </button>
                )}
              </div>

              {/* Contact Help */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg! text-slate-900! font-bold! mb-4!">{helpTitle}</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-200 hover:border-[#ED1F24] hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 bg-[#ED1F24]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#ED1F24]" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Call Us</div>
                      <div className="text-xs text-slate-500">{contactPhone}</div>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${contactWhatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-200 hover:border-green-500 hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">WhatsApp</div>
                      <div className="text-xs text-slate-500">Chat with us</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-20 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Judiciary Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Join 50,000+ aspirants preparing with expert guidance, comprehensive study material, and
            real-time mock tests.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#ED1F24] text-white rounded-2xl hover:bg-[#d11b20] transition-all font-bold text-lg shadow-xl hover:-translate-y-1"
            >
              Enroll Now
              <ChevronRight className="w-6 h-6" />
            </Link>
            <a
              href={`tel:${contactPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl hover:bg-white/20 transition-all font-bold text-lg backdrop-blur-sm"
            >
              <Phone className="w-6 h-6" />
              Free Consultation
            </a>
          </div>
        </div>
      </div>

      {gatingConfig?.enableGating &&
        gatingConfig.gatingPopup &&
        typeof gatingConfig.gatingPopup !== 'string' && (
          <ResourceGateModal
            isOpen={isGateModalOpen}
            onClose={() => setIsGateModalOpen(false)}
            onSuccess={handleGateSuccess}
            popup={gatingConfig.gatingPopup}
          />
        )}
    </div>
  )
}
