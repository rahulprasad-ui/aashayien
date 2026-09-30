'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Youtube, ChevronLeft, ChevronRight } from 'lucide-react'

export interface YtVideo {
  id: string
  youtubeId: string
  title: string
  category: string
  duration: string
  customThumbnail?: string
}

interface ClatPgYtSliderProps {
  badgeText?: string
  title?: string
  subtitle?: string
  videos?: any[]
}

export const ClatPgYtSlider: React.FC<ClatPgYtSliderProps> = ({
  badgeText = 'FREE VIDEO LECTURES & STRATEGY',
  title = 'Watch CLAT PG Masterclasses',
  subtitle = 'Free strategy sessions, landmark judgment analyses, and subject-wise lectures by Aashayein Judiciary experts.',
  videos,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const displayVideos: YtVideo[] =
    Array.isArray(videos) && videos.length > 0
      ? videos.map((v, i) => ({
          id: `yt-${i}`,
          youtubeId: v.youtubeId || v.url || '',
          title: v.title || 'CLAT PG Lecture',
          category: v.category || 'CLAT PG',
          duration: v.duration || '',
          customThumbnail:
            typeof v.customThumbnail === 'object' && v.customThumbnail?.url
              ? v.customThumbnail.url
              : typeof v.customThumbnail === 'string'
                ? v.customThumbnail
                : undefined,
        }))
      : []

  const [selectedVideo, setSelectedVideo] = useState<YtVideo | null>(null)

  // Automatic Smooth Auto-Slide Effect
  useEffect(() => {
    if (selectedVideo || isHovered || displayVideos.length <= 1) return

    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' })
        }
      }
    }, 3500)

    return () => clearInterval(timer)
  }, [selectedVideo, isHovered, displayVideos.length])

  if (displayVideos.length === 0) return null

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      if (scrollLeft + clientWidth >= scrollWidth - 15) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-950 text-white overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 text-[#ED1F24] border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                <Youtube className="w-4 h-4 fill-[#ED1F24] text-[#ED1F24]" />
                <span>{badgeText}</span>
              </div>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-slate-400 text-base sm:text-lg mt-2 max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          {displayVideos.length > 1 && (
            <div className="flex gap-2 shrink-0">
              <button
                onClick={scrollLeft}
                className="p-3 rounded-xl bg-slate-800/90 hover:bg-[#ED1F24] active:scale-95 text-white border border-slate-700 hover:border-[#ED1F24] transition-all shadow-md"
                aria-label="Previous Videos"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="p-3 rounded-xl bg-slate-800/90 hover:bg-[#ED1F24] active:scale-95 text-white border border-slate-700 hover:border-[#ED1F24] transition-all shadow-md"
                aria-label="Next Videos"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Video Cards Horizontal Auto-Slider */}
        {displayVideos.length > 0 && (
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-1 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayVideos.map((video) => {
              const cleanYtId = video.youtubeId.includes('v=')
                ? video.youtubeId.split('v=')[1]?.split('&')[0]
                : video.youtubeId.includes('youtu.be/')
                  ? video.youtubeId.split('youtu.be/')[1]?.split('?')[0]
                  : video.youtubeId

              const thumbUrl =
                video.customThumbnail ||
                (cleanYtId
                  ? `https://img.youtube.com/vi/${cleanYtId}/hqdefault.jpg`
                  : 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80')

              return (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start group cursor-pointer bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-[#ED1F24] transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-red-950/20"
                >
                  <div>
                    {/* Thumbnail + Play Badge */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      <Image
                        src={thumbUrl}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors" />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#ED1F24] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>

                      {video.duration && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/85 text-[11px] font-bold text-slate-200 backdrop-blur-sm">
                          {video.duration}
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="p-4 space-y-2">
                      {video.category && (
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30">
                          {video.category}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold"
              >
                ✕
              </button>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${
                    selectedVideo.youtubeId.includes('v=')
                      ? selectedVideo.youtubeId.split('v=')[1]?.split('&')[0]
                      : selectedVideo.youtubeId.includes('youtu.be/')
                        ? selectedVideo.youtubeId.split('youtu.be/')[1]?.split('?')[0]
                        : selectedVideo.youtubeId
                  }?autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
