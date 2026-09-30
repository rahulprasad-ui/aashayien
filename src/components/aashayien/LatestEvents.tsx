'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Users, ChevronRight, Video, MapPin, Gift, Bell } from 'lucide-react'
import type { Event } from '@/payload-types'
import { ImageWithFallback } from './ImageWithFallback'
import { formatDateTime, formatTime } from '@/utilities/formatDateTime'

interface LatestEventsProps {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  events: Event[]
}

export function LatestEvents({ title, subtitle, description, events }: LatestEventsProps) {
  if (!events || events.length === 0) {
    return null
  }

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-red-100 rounded-full mb-4">
            <span className="text-[#ED1F24]">{subtitle || 'Upcoming Events & Webinars'}</span>
          </div>
          <h2 className="text-slate-900 mb-4">{title || 'Latest Events'}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {description ||
              'Joins our exclusive webinars, seminars, and scholarship tests to accelerate your judiciary preparation journey with expert guidance.'}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  resource={event.image}
                  display={(event as any).imageDisplay}
                  alt={event.title}
                  fill
                  fallbackLabel="No event image"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {event.isFree && (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full font-medium shadow-sm flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      Free
                    </span>
                  )}
                  {event.isOnline ? (
                    <span className="px-3 py-1 bg-[#ED1F24] text-white text-xs rounded-full font-medium shadow-sm flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      Online
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-slate-900 text-white text-xs rounded-full font-medium shadow-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Offline
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg! font-bold text-slate-900 mb-2 group-hover:text-[#ED1F24] transition-colors line-clamp-2 min-h-14">
                  {event.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-2 min-h-10">
                  {event.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <Calendar className="w-4 h-4 text-[#ED1F24]" />
                    <span>{formatDateTime(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-[#ED1F24]" />
                    <span>{formatTime(event.time)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <User className="w-4 h-4 text-[#ED1F24]" />
                    <span className="truncate">{event.host}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <Users className="w-4 h-4 text-[#ED1F24]" />
                    <span>{event.seatsAvailable} Seats Available</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/events/${event.slug}`}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    Details
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  {event.registerUrl && (
                    <a
                      href={event.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 bg-[#ED1F24] text-white text-center rounded-lg font-medium hover:bg-[#d11b20] transition-colors flex items-center justify-center gap-2"
                    >
                      Register
                      <Bell className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Events
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
