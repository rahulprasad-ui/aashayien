import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Calendar, ExternalLink, MapPin, Video } from 'lucide-react'
import { ImageWithFallback } from '@/components/aashayien/ImageWithFallback'
import { formatDateTime } from '@/utilities/formatDateTime'
import type { Event } from '@/payload-types'

type EventsBlockProps = {
  heading?: string | null
  subheading?: string | null
  description?: string | null
  populateBy?: 'latest' | 'selection' | null
  selectedEvents?: (Event | number | string)[] | null
  limit?: number | null
  viewAllLink?: string | null
}

export const EventsBlockComponent: React.FC<EventsBlockProps> = async ({
  heading = 'Upcoming Events',
  subheading = 'Events & Webinars',
  description,
  populateBy = 'latest',
  selectedEvents,
  limit = 6,
  viewAllLink = '/events',
}) => {
  let events: Event[] = []

  if (populateBy === 'selection' && selectedEvents && selectedEvents.length > 0) {
    events = selectedEvents.map((item) => (typeof item === 'object' ? item : null)).filter(Boolean) as Event[]
  }

  if (events.length === 0) {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'events',
      limit: limit ?? 6,
      sort: 'date',
      overrideAccess: false,
      depth: 1,
    })
    events = res.docs as Event[]
  }

  if (!events || events.length === 0) return null

  const categoryLabel = (cat?: string | null) => {
    if (!cat) return 'Event'
    return cat.charAt(0).toUpperCase() + cat.slice(1)
  }

  const categoryColor = (cat?: string | null) => {
    switch (cat) {
      case 'webinar': return 'bg-blue-100 text-blue-700'
      case 'seminar': return 'bg-purple-100 text-purple-700'
      case 'scholarship': return 'bg-amber-100 text-amber-700'
      case 'workshop': return 'bg-indigo-100 text-indigo-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

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

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: Event) => {
            const image = typeof event.image === 'object' ? event.image : null
            return (
              <a
                key={event.id}
                href={`/events/${event.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100 flex flex-col"
              >
                {image?.url ? (
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={image.url}
                      alt={image.alt || event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-indigo-300" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor(event.category)}`}>
                      {categoryLabel(event.category)}
                    </span>
                    {event.isOnline ? (
                      <Video className="w-4 h-4 text-slate-400" />
                    ) : (
                      <MapPin className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-[#ED1F24] transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  {event.date && (
                    <div className="mt-auto flex items-center gap-2 text-slate-500 text-sm pt-4 border-t border-slate-100">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateTime(event.date)}</span>
                    </div>
                  )}
                </div>
              </a>
            )
          })}
        </div>

        {viewAllLink && (
          <div className="text-center mt-10">
            <a
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#ED1F24] text-white rounded-xl hover:bg-[#d11b20] transition-colors font-bold shadow-lg"
            >
              View All Events <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
