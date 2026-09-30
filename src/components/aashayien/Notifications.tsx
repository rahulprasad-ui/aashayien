'use client'

import React, { useState } from 'react'
import { Bell, Download, ExternalLink, Calendar } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import { SyllabusState, Vacancy, Event, Popup } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { formatDateTime } from '@/utilities/formatDateTime'
import { ResourceGateModal } from '../ResourceGateModal'

interface NotificationsProps {
  vacancies?: Vacancy[]
  syllabusDownloads?: SyllabusState[]
  events?: Event[]
  gatingConfig?: { enableGating?: boolean | null; gatingPopup?: string | Popup | null }
}

export function Notifications({
  vacancies = [],
  syllabusDownloads = [],
  events = [],
  gatingConfig,
}: NotificationsProps) {
  const [isGateModalOpen, setIsGateModalOpen] = useState(false)
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null)

  const handleReadMore = (url?: string | null) => {
    if (url) {
      window.location.href = url
    } else {
      window.location.href = '/syllabus-vacancy'
    }
  }

  const handleDownload = (state: SyllabusState) => {
    // Prioritize uploaded file, then group-level URL, then legacy URL
    const fileUrl = typeof state.downloads?.syllabusFile === 'object' ? state.downloads?.syllabusFile?.url : null
    const legacyFileUrl = typeof state.syllabusFile === 'object' ? state.syllabusFile?.url : null
    
    const downloadUrl = fileUrl || state.downloads?.syllabus || legacyFileUrl || state.syllabusUrl
    
    // Force absolute URL for reliable downloads
    const fullUrl = downloadUrl ? getMediaUrl(downloadUrl, null, true) : null

    if (!fullUrl || fullUrl === '#') return

    // Gating check PEHLE — form fill karna zaroori hai download se pehle
    if (
      gatingConfig?.enableGating &&
      gatingConfig?.gatingPopup &&
      typeof gatingConfig.gatingPopup !== 'string'
    ) {
      setPendingDownloadUrl(fullUrl)
      setIsGateModalOpen(true)
      return
    }

    // Gating nahi hai — direct download
    window.open(fullUrl, '_blank')
  }

  const handleGateSuccess = () => {
    setIsGateModalOpen(false)
    if (pendingDownloadUrl) {
      // Small delay to ensure modal is fully closed and browser context is stable
      setTimeout(() => {
        if (pendingDownloadUrl) {
          window.open(pendingDownloadUrl, '_blank')
          setPendingDownloadUrl(null)
        }
      }, 150)
    }
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Vacancy':
        return 'bg-green-100 text-green-700 font-medium'
      case 'Syllabus':
        return 'bg-red-100 text-[#ED1F24] font-medium'
      case 'Important':
        return 'bg-red-100 text-[#ED1F24] font-medium'
      case 'Result':
        return 'bg-pink-100 text-pink-700 font-medium'
      case 'Webinar':
        return 'bg-blue-100 text-blue-700 font-medium'
      case 'Seminar':
        return 'bg-purple-100 text-purple-700 font-medium'
      case 'Scholarship Test':
        return 'bg-amber-100 text-amber-700 font-medium'
      case 'Workshop':
        return 'bg-indigo-100 text-indigo-700 font-medium'
      default:
        return 'bg-slate-100 text-slate-700 font-medium'
    }
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1752697589128-f8e110a86af3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGJvb2tzJTIwbGF3fGVufDF8fHx8MTc2NDg0NzA2NXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Legal Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-red-100 rounded-full mb-4">
            <span className="text-[#ED1F24] font-bold">Latest Updates</span>
          </div>
          <h2 className="text-slate-900 mb-4 font-bold">Notifications & Syllabus</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stay updated with the latest judiciary exam notifications, syllabus changes, and
            important announcements from various state judicial services.
          </p>
        </div>

        {/* Notifications Container */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Running Text / Marquee Section */}
          <div className="bg-linear-to-br from-red-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-red-100 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-8 h-8 text-[#ED1F24]" />
              <h3 className="text-slate-900 font-bold">Latest Notifications</h3>
            </div>
            <div className="space-y-4 max-h-[216px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {vacancies.length > 0 ? (
                vacancies.slice(0, 20).map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-50 h-[100px] flex flex-col justify-center"
                    onClick={() => (window.location.href = `/vacancy/${notification.id}`)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getTagColor(notification.tag || '')}`}
                      >
                        {notification.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {notification.date}
                      </span>
                    </div>
                    <p className="text-slate-900 text-sm font-medium line-clamp-1">{notification.title}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">No recent notifications</div>
              )}
            </div>
            {vacancies.length > 0 && (
              <div className="mt-auto pt-4 border-t border-red-100">
                <button
                  onClick={() => (window.location.href = '/syllabus-vacancy?tab=vacancies')}
                  className="w-full py-2 text-[#ED1F24] font-bold text-sm hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  View All Notifications <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Syllabus Downloads Section */}
          <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg border border-slate-200 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <Download className="w-8 h-8 text-slate-700" />
              <h3 className="text-slate-900 font-bold">Download Syllabus</h3>
            </div>
            <div className="space-y-4 max-h-[216px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {syllabusDownloads.length > 0 ? (
                syllabusDownloads.slice(0, 20).map((state) => {
                  const hasDownload = 
                    (typeof state.downloads?.syllabusFile === 'object' && !!state.downloads?.syllabusFile?.url) ||
                    !!state.downloads?.syllabus ||
                    (typeof state.syllabusFile === 'object' && !!state.syllabusFile?.url) ||
                    !!state.syllabusUrl;

                  return (
                    <div
                      key={state.id}
                      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 h-[100px] flex flex-col justify-center"
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="cursor-pointer group/text flex-1"
                          onClick={() => (window.location.href = `/syllabus/${state.code}`)}
                        >
                          <h4 className="text-slate-900 mb-1 font-bold group-hover/text:text-[#ED1F24] transition-colors line-clamp-1">
                            {state.fullName}
                          </h4>
                          <p className="text-slate-600 text-sm line-clamp-1">
                            {state.type === 'adpo'
                              ? 'ADPO Syllabus & Exam Pattern'
                              : 'Prelims + Mains Detailed Syllabus'}
                          </p>
                        </div>
                        {hasDownload && (
                          <button
                            onClick={() => handleDownload(state)}
                            className="p-3 bg-green-100 hover:bg-green-200 rounded-lg transition-all cursor-pointer"
                            aria-label={`Download ${state.name} Syllabus`}
                          >
                            <Download className="w-5 h-5 text-green-700" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-slate-500">No syllabus available</div>
              )}
            </div>
            {syllabusDownloads.length > 0 && (
              <div className="mt-auto pt-4 border-t border-slate-200">
                <button
                  onClick={() => (window.location.href = '/syllabus-vacancy')}
                  className="w-full py-2 text-slate-700 font-bold text-sm hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  View All Syllabus <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Upcoming Events Section */}
          <div className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-indigo-100 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-indigo-600" />
              <h3 className="text-slate-900 font-bold">Upcoming Events</h3>
            </div>
            <div className="space-y-4 max-h-[216px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {events.length > 0 ? (
                events.slice(0, 20).map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-50 h-[100px] flex flex-col justify-center"
                    onClick={() => (window.location.href = `/events/${event.slug}`)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getTagColor(
                          event.category === 'scholarship' ? 'Scholarship Test' : (event.category || '').charAt(0).toUpperCase() + (event.category || '').slice(1),
                        )}`}
                      >
                        {event.category === 'scholarship' ? 'Scholarship Test' : (event.category || '').charAt(0).toUpperCase() + (event.category || '').slice(1)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {event.date ? formatDateTime(event.date) : ''}
                      </span>
                    </div>
                    <p className="text-slate-900 text-sm font-medium line-clamp-1">{event.title}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">No upcoming events</div>
              )}
            </div>
            {events.length > 0 && (
              <div className="mt-auto pt-4 border-t border-indigo-100">
                <button
                  onClick={() => (window.location.href = '/events')}
                  className="w-full py-2 text-indigo-600 font-bold text-sm hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  View All Events <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* All Notifications Button */}
        <div className="text-center">
          <button
            onClick={() => (window.location.href = '/syllabus-vacancy?tab=vacancies')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-[#ED1F24] to-[#d11b20] text-white rounded-xl hover:from-[#d11b20] hover:to-[#b81619] transition-all shadow-lg hover:shadow-xl font-bold"
          >
            <ExternalLink className="w-6 h-6" />
            <span>View All Notifications</span>
          </button>
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
    </section>
  )
}
