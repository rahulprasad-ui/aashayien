'use client'

import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, Trophy, GraduationCap, Medal } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { SuccessStory, Media } from '@/payload-types'

interface AchieversSectionProps {
  title?: string
  subtitle?: string
  description?: string
  achievers?: SuccessStory[]
}

const demoAchievers: any[] = [
  {
    id: 'demo-1',
    name: 'Ritika Sharma',
    exam: 'MP Judiciary',
    rankDisplay: 'Rank 12',
    state: 'Madhya Pradesh',
    image: '/demo-student-1.jpg',
    testimonial: {
      highlight: 'The guidance provided at Aashayien was instrumental in my success. The interview prep was especially helpful.'
    }
  },
  {
    id: 'demo-2',
    name: 'Ankit Verma',
    exam: 'UP PCS-J',
    rankDisplay: 'AIR 45',
    state: 'Uttar Pradesh',
    image: '/demo-student-2.jpg',
    testimonial: {
      highlight: 'Focusing on core concepts and regular mock tests at Aashayien helped me clear the mains with confidence.'
    }
  },
  {
    id: 'demo-3',
    name: 'Sonal Jain',
    exam: 'Rajasthan Judiciary',
    rankDisplay: 'Selection',
    state: 'Rajasthan',
    image: '/demo-student-3.jpg',
    testimonial: {
      highlight: 'Aashayien provided a structured approach to the vast syllabus, making it manageable and achievable.'
    }
  }
]

export const AchieversSection: React.FC<AchieversSectionProps> = ({
  title,
  subtitle,
  description,
  achievers = [],
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const items = achievers && achievers.length > 0 ? achievers : demoAchievers

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.clientWidth // Scroll by one full viewport width
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-20 bg-slate-50 dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ED1F24]/10 text-[#ED1F24] text-xs font-bold uppercase tracking-wider mb-4 border border-[#ED1F24]/20">
              <Trophy className="w-3.5 h-3.5" />
              <span>{title || 'Our Achievers'}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
              {subtitle || 'Celebrating Excellence in Judiciary'}
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-lg">
              {description || 'Meet our students who have turned their dreams into reality with dedication and right guidance.'}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-[#ED1F24] hover:text-white hover:border-[#ED1F24] transition-all duration-300 shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-[#ED1F24] hover:text-white hover:border-[#ED1F24] transition-all duration-300 shadow-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 scroll-smooth pb-4 no-scrollbar"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {items.map((achiever) => {
              const imageUrl = typeof achiever.image === 'object' 
                ? getMediaUrl((achiever.image as Media).url || '') 
                : getMediaUrl(achiever.image as any)

              return (
                <div 
                  key={achiever.id} 
                  className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] shrink-0 snap-start"
                >
                  <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-slate-100 dark:border-neutral-800 shadow-xl shadow-slate-200/50 dark:shadow-none h-full flex flex-col group hover:border-[#ED1F24]/30 transition-colors duration-300">
                    {/* Student Identity */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-neutral-800 group-hover:border-[#ED1F24]/50 transition-colors">
                          <ImageWithFallback
                            src={imageUrl}
                            alt={achiever.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white p-1.5 rounded-lg shadow-lg">
                          <Medal className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                          {achiever.name}
                        </h3>
                        <p className="text-slate-500 dark:text-neutral-500 text-sm font-medium">
                          {achiever.state}
                        </p>
                      </div>
                    </div>

                    {/* Achievement Details */}
                    <div className="bg-slate-50 dark:bg-neutral-800/50 rounded-2xl p-4 mb-6 grow">
                      <div className="flex items-start gap-3 mb-3">
                        <GraduationCap className="w-4 h-4 text-[#ED1F24] mt-1 shrink-0" />
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Exam Cleared</div>
                          <div className="text-sm font-bold text-slate-800 dark:text-white">{achiever.exam}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Trophy className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Rank / Selection</div>
                          <div className="text-sm font-bold text-slate-800 dark:text-white">{achiever.rankDisplay || (achiever.rank ? `Rank ${achiever.rank}` : '')}</div>
                        </div>
                      </div>
                    </div>

                    {/* Highlight */}
                    {achiever.testimonial?.highlight && (
                      <div className="relative pl-6 italic text-slate-600 dark:text-neutral-400 text-sm leading-relaxed before:content-['“'] before:absolute before:left-0 before:top-0 before:text-2xl before:text-[#ED1F24]/30 before:font-serif">
                        {achiever.testimonial.highlight}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
