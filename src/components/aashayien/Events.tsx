'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Video,
  ChevronRight,
  Filter,
  X,
  Users,
} from 'lucide-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import type { EventsPage, Event } from '@/payload-types'
import { formatDateTime, formatTime } from '@/utilities/formatDateTime'
import { ImageWithFallback } from './ImageWithFallback'

// Event Categories
type EventCategory = 'all' | 'webinar' | 'seminar' | 'workshop' | 'scholarship'

const eventCategoryDisplayNames: Record<EventCategory, string> = {
  all: 'All Events',
  webinar: 'Webinars (Online)',
  seminar: 'Seminars (Offline)',
  workshop: 'Workshops',
  scholarship: 'Scholarship Tests',
}

interface EventsProps {
  pageData: EventsPage
  events: Event[]
}

export function Events({ pageData, events }: EventsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [activeCategory, setActiveCategory] = useState<EventCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Sync active category with URL param
  useEffect(() => {
    const filterParam = searchParams.get('filter')?.toLowerCase()
    if (filterParam) {
      // Map plural to singular
      const categoryMap: Record<string, EventCategory> = {
        webinars: 'webinar',
        seminars: 'seminar',
        workshops: 'workshop',
        scholarships: 'scholarship',
        webinar: 'webinar',
        seminar: 'seminar',
        workshop: 'workshop',
        scholarship: 'scholarship',
      }

      if (categoryMap[filterParam]) {
        setActiveCategory(categoryMap[filterParam])
        setIsFilterOpen(true)
      }
    }
  }, [searchParams])

  // Function to handle category change and update URL
  const handleCategoryChange = (category: EventCategory) => {
    setActiveCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') {
      params.delete('filter')
    } else {
      params.set('filter', category)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Filter events logic - adjust to Payload Event structure
  const filteredEvents = events.filter((event) => {
    // Category match
    const categoryMatch = activeCategory === 'all' || event.category === activeCategory

    // Search match
    const searchLower = searchQuery.toLowerCase()
    const titleMatch = event.title.toLowerCase().includes(searchLower)
    const hostMatch = event.host?.toLowerCase().includes(searchLower)
    const tagMatch = event.tags?.some((tag: any) => tag.tag?.toLowerCase().includes(searchLower))

    return categoryMatch && (titleMatch || hostMatch || tagMatch)
  })

  // Group events by month? Or just list them.
  // Original design had simple grid.

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="pt-32 pb-12 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {pageData.hero?.badgeText && (
              <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-4">
                <span className="text-white font-medium">{pageData.hero.badgeText}</span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {pageData.hero?.title || 'Events & Webinars'}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {pageData.hero?.description ||
                'Join our expert-led sessions to supercharge your judiciary preparation.'}
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-12 bg-white rounded-2xl p-4 shadow-xl max-w-4xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events by title, host, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#ED1F24] focus:ring-1 focus:ring-[#ED1F24] transition-all"
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors border ${
                  isFilterOpen
                    ? 'bg-[#ED1F24] text-white border-[#ED1F24]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Expanded Filters */}
            {isFilterOpen && (
              <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {(['all', 'webinar', 'seminar', 'workshop', 'scholarship'] as const).map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                          activeCategory === category
                            ? 'bg-[#ED1F24]/10 text-[#ED1F24]'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* Event Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    resource={event.image}
                    display={(event as any).imageDisplay}
                    alt={event.title}
                    fill
                    fallbackLabel="No event image"
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full shadow-sm">
                      {event.category?.toUpperCase()}
                    </span>
                    {event.isFree && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-sm">
                        FREE
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#ED1F24] font-medium mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateTime(event.date as string)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#ED1F24] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">{event.description}</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{formatTime(event.time as string)}</span>
                      </div>
                      {event.isOnline ? (
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-blue-500" />
                          <span className="text-blue-600 font-medium">Online</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-500" />
                          <span className="text-purple-600 font-medium">Offline</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>
                        <span className="font-semibold text-slate-900">{event.seatsAvailable}</span>{' '}
                        seats left
                      </span>
                    </div>

                    <div className="pt-4 mt-4">
                      <Link
                        href={`/events/${event.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-[#ED1F24] transition-colors group/btn"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No events found</h3>
            <p className="text-slate-600">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                handleCategoryChange('all')
              }}
              className="mt-6 px-6 py-2 text-[#ED1F24] font-medium hover:bg-[#ED1F24]/5 rounded-lg transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      {pageData.faqs && pageData.faqs.length > 0 && (
        <section className="bg-white py-20 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Common questions about our events and webinars</p>
            </div>
            <div className="space-y-4">
              {pageData.faqs.map((faq, index) => (
                <div
                  key={faq.id || index}
                  className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
