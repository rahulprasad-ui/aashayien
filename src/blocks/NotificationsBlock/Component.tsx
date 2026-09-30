import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Bell, Download, Calendar, ExternalLink } from 'lucide-react'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Vacancy, SyllabusState, Event } from '@/payload-types'

type NotificationsBlockProps = {
  heading?: string | null
  subheading?: string | null
  description?: string | null
  showVacancies?: boolean | null
  showSyllabus?: boolean | null
  showEvents?: boolean | null
  populateBy?: 'latest' | 'selection' | null
  selectedVacancies?: (Vacancy | number | string)[] | null
  selectedSyllabuses?: (SyllabusState | number | string)[] | null
  selectedEvents?: (Event | number | string)[] | null
  limit?: number | null
}

export const NotificationsBlockComponent: React.FC<NotificationsBlockProps> = async ({
  heading = 'Notifications & Updates',
  subheading = 'Latest Updates',
  description,
  showVacancies = true,
  showSyllabus = true,
  showEvents = true,
  populateBy = 'latest',
  selectedVacancies,
  selectedSyllabuses,
  selectedEvents,
  limit = 5,
}) => {
  let vacancies: Vacancy[] = []
  let syllabuses: SyllabusState[] = []
  let events: Event[] = []

  if (populateBy === 'selection') {
    if (showVacancies && selectedVacancies && selectedVacancies.length > 0) {
      vacancies = selectedVacancies.map((v) => (typeof v === 'object' ? v : null)).filter(Boolean) as Vacancy[]
    }
    if (showSyllabus && selectedSyllabuses && selectedSyllabuses.length > 0) {
      syllabuses = selectedSyllabuses.map((s) => (typeof s === 'object' ? s : null)).filter(Boolean) as SyllabusState[]
    }
    if (showEvents && selectedEvents && selectedEvents.length > 0) {
      events = selectedEvents.map((e) => (typeof e === 'object' ? e : null)).filter(Boolean) as Event[]
    }
  }

  const payload = await getPayload({ config: configPromise })
  const itemLimit = limit ?? 5

  const [vacanciesRes, syllabusRes, eventsRes] = await Promise.all([
    showVacancies && vacancies.length === 0 ? payload.find({ collection: 'vacancies', limit: itemLimit, sort: '-createdAt', overrideAccess: false }) : null,
    showSyllabus && syllabuses.length === 0 ? payload.find({ collection: 'syllabus-states', limit: itemLimit, sort: 'name', overrideAccess: false }) : null,
    showEvents && events.length === 0 ? payload.find({ collection: 'events', limit: itemLimit, sort: 'date', overrideAccess: false }) : null,
  ])

  if (vacancies.length === 0 && vacanciesRes) vacancies = (vacanciesRes.docs ?? []) as Vacancy[]
  if (syllabuses.length === 0 && syllabusRes) syllabuses = (syllabusRes.docs ?? []) as SyllabusState[]
  if (events.length === 0 && eventsRes) events = (eventsRes.docs ?? []) as Event[]

  const getTagColor = (tag?: string | null) => {
    switch (tag) {
      case 'Vacancy': return 'bg-green-100 text-green-700'
      case 'Syllabus': return 'bg-red-100 text-[#ED1F24]'
      case 'Important': return 'bg-red-100 text-[#ED1F24]'
      case 'Result': return 'bg-pink-100 text-pink-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  const columnCount = [showVacancies, showSyllabus, showEvents].filter(Boolean).length
  const gridClass = columnCount === 3 ? 'lg:grid-cols-3' : columnCount === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'

  return (
    <section className="py-3 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {subheading && (
            <div className="inline-block px-6 py-2 bg-red-100 rounded-full mb-4">
              <span className="text-[#ED1F24] font-bold text-sm">{subheading}</span>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{heading}</h2>
          {description && <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className={`grid ${gridClass} gap-8`}>
          {/* Vacancies / Notifications */}
          {showVacancies && (
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-red-100 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-[#ED1F24]/10 rounded-xl">
                  <Bell className="w-6 h-6 text-[#ED1F24]" />
                </div>
                <h3 className="font-bold text-slate-900">Latest Notifications</h3>
              </div>
              <div className="space-y-3 flex-1">
                {vacancies.length > 0 ? vacancies.map((v) => (
                  <Link key={v.id} href={`/vacancy/${v.id}`} className="block bg-white p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(v.tag)}`}>{v.tag}</span>
                      <span className="text-xs text-slate-500">{v.date}</span>
                    </div>
                    <p className="text-slate-800 text-sm font-medium line-clamp-2">{v.title}</p>
                  </Link>
                )) : <p className="text-slate-500 text-center py-4">No notifications</p>}
              </div>
              {vacancies.length > 0 && (
                <Link href="/syllabus-vacancy?tab=vacancies" className="mt-4 pt-4 border-t border-red-100 flex items-center justify-center gap-2 text-[#ED1F24] font-bold text-sm hover:underline">
                  View All <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}

          {/* Syllabus Downloads */}
          {showSyllabus && (
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg border border-slate-200 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-slate-200 rounded-xl">
                  <Download className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900">Download Syllabus</h3>
              </div>
              <div className="space-y-3 flex-1">
                {syllabuses.length > 0 ? syllabuses.map((s) => {
                  const fileUrl = typeof s.downloads?.syllabusFile === 'object' ? s.downloads?.syllabusFile?.url : null
                  const legacyUrl = typeof s.syllabusFile === 'object' ? s.syllabusFile?.url : null
                  const downloadUrl = fileUrl || s.downloads?.syllabus || legacyUrl || s.syllabusUrl
                  return (
                    <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all flex items-center justify-between">
                      <Link href={`/syllabus/${s.code}`} className="flex-1">
                        <p className="text-slate-800 text-sm font-bold line-clamp-1">{s.fullName}</p>
                        <p className="text-slate-500 text-xs">{s.type === 'adpo' ? 'ADPO Syllabus' : 'Prelims + Mains'}</p>
                      </Link>
                      {downloadUrl && (
                        <a href={getMediaUrl(downloadUrl, null, true)} target="_blank" rel="noreferrer" className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-all ml-2">
                          <Download className="w-4 h-4 text-green-700" />
                        </a>
                      )}
                    </div>
                  )
                }) : <p className="text-slate-500 text-center py-4">No syllabus available</p>}
              </div>
              {syllabuses.length > 0 && (
                <Link href="/syllabus-vacancy" className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-center gap-2 text-slate-700 font-bold text-sm hover:underline">
                  View All Syllabus <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}

          {/* Events */}
          {showEvents && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-indigo-100 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-bold text-slate-900">Upcoming Events</h3>
              </div>
              <div className="space-y-3 flex-1">
                {events.length > 0 ? events.map((e) => (
                  <Link key={e.id} href={`/events/${e.slug}`} className="block bg-white p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium capitalize">{e.category}</span>
                      {e.date && <span className="text-xs text-slate-500">{formatDateTime(e.date)}</span>}
                    </div>
                    <p className="text-slate-800 text-sm font-medium line-clamp-2">{e.title}</p>
                  </Link>
                )) : <p className="text-slate-500 text-center py-4">No upcoming events</p>}
              </div>
              {events.length > 0 && (
                <Link href="/events" className="mt-4 pt-4 border-t border-indigo-100 flex items-center justify-center gap-2 text-indigo-600 font-bold text-sm hover:underline">
                  View All Events <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
