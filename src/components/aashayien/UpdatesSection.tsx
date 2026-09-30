'use client'

import React from 'react'
import Link from 'next/link'
import { Bell, Calendar, ChevronRight, Clock, Video, MapPin, ArrowUpRight } from 'lucide-react'
import type { Vacancy, Event } from '@/payload-types'
import { formatDateTime, formatTime } from '@/utilities/formatDateTime'

interface UpdatesSectionProps {
  title?: string
  subtitle?: string
  description?: string
  vacancies?: Vacancy[]
  events?: Event[]
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({
  title,
  subtitle,
  description,
  vacancies = [],
  events = [],
}) => {
  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Vacancy':
        return 'bg-green-100/80 text-green-700'
      case 'Syllabus':
        return 'bg-blue-100/80 text-blue-700'
      case 'Important':
        return 'bg-red-100/80 text-red-700'
      case 'Result':
        return 'bg-purple-100/80 text-purple-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const displayTitle = title && title.trim() !== '' ? title : 'Latest Notifications & Updates'
  const displaySubtitle = subtitle && subtitle.trim() !== '' ? subtitle : 'Stay Informed'
  const displayDescription = description && description.trim() !== '' ? description : 'Keep track of the latest judiciary exam notifications and upcoming academy events.'

  return (
    <section className="py-20 lg:py-24 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ED1F24]/5 text-[#ED1F24] text-xs font-bold uppercase tracking-wider mb-4 border border-[#ED1F24]/10">
            <Bell className="w-3.5 h-3.5" />
            <span>{displaySubtitle}</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6">
            {displayTitle}
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            {displayDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Notifications */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100/80 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#ED1F24]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Latest Notifications</h3>
              </div>
              <Link href="/syllabus-vacancy" className="text-[#ED1F24] text-sm font-bold flex items-center gap-1 hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-4">
              {vacancies.length > 0 ? (
                vacancies.slice(0, 4).map((vacancy) => (
                  <a
                    key={vacancy.id}
                    href={vacancy.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-slate-50 dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-800 hover:border-[#ED1F24]/30 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3 shrink-0">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getTagColor(vacancy.tag)}`}>
                          {vacancy.tag}
                        </span>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {vacancy.date}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 dark:text-white font-bold group-hover:text-[#ED1F24] transition-colors leading-snug">
                          {vacancy.title}
                        </h4>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#ED1F24] transition-colors" />
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-50 dark:bg-neutral-900 rounded-2xl border border-dashed border-slate-200 dark:border-neutral-800 text-slate-400">
                  No recent notifications
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Upcoming Events */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100/80 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Events</h3>
              </div>
              <Link href="/events" className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-4">
              {events.length > 0 ? (
                events.slice(0, 4).map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-5">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-black text-lg leading-none">
                          {event.date ? new Date(event.date).getDate() : '-'}
                        </span>
                        <span className="text-blue-600/60 dark:text-blue-400/60 font-bold text-[10px] uppercase">
                          {event.date ? new Date(event.date).toLocaleString('en-US', { month: 'short' }) : '-'}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-bold">
                            <Clock className="w-3 h-3 text-blue-500" />
                            {formatTime(event.time)}
                          </div>
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          <div className={`flex items-center gap-1 text-[11px] font-bold ${event.isOnline ? 'text-green-600' : 'text-amber-600'}`}>
                            {event.isOnline ? (
                              <><Video className="w-3 h-3" /> Online</>
                            ) : (
                              <><MapPin className="w-3 h-3" /> Offline</>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-50 dark:bg-neutral-900 rounded-2xl border border-dashed border-slate-200 dark:border-neutral-800 text-slate-400">
                  No upcoming events
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
