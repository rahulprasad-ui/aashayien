'use client'
import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, Quote, Award } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { SuccessStory, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  description?: string
  testimonials?: SuccessStory[]
  viewAllLink?: any
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title,
  subtitle,
  description,
  testimonials = [],
  viewAllLink,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Use dummy data if no testimonials provided for development preview
  const items = testimonials && testimonials.length > 0 ? testimonials : [
    {
      id: 'demo-1',
      name: 'Anjali Sharma',
      exam: 'UP Judiciary 2024',
      image: '',
      testimonial: {
        quote: 'ALEC provided structured guidance and mentorship that helped me clear the judiciary exam in my very first attempt. The mock interviews were a game changer.',
      }
    },
    {
      id: 'demo-2',
      name: 'Vikram Singh',
      exam: 'MP Judiciary',
      image: '',
      testimonial: {
        quote: 'The depth of knowledge and the personal attention given to each student at Aashayien is unparalleled. I highly recommend it to all serious aspirants.',
      }
    },
    {
      id: 'demo-3',
      name: 'Sarah Khan',
      exam: 'Delhi Judicial Service',
      image: '',
      testimonial: {
        quote: 'Cracking DJS felt impossible until I joined Anil Sir\'s classes. The simplified approach to complex legal concepts made all the difference.',
      }
    }
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.clientWidth
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
    <section className="py-24 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider mb-6 border border-blue-100 dark:border-blue-800/30">
              <Award className="w-4 h-4" />
              <span>{title || 'Student Testimonials'}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              {subtitle || 'Real Feedback from Successful Aspirants'}
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-lg lg:text-xl max-w-2xl">
              {description || 'Hear directly from our students who achieved their dreams through our structured guidance and mentorship.'}
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="group p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="group p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-8 scroll-smooth pb-4 no-scrollbar"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {items.map((item: any, idx: number) => {
              const imageUrl = typeof item.image === 'object' 
                ? getMediaUrl((item.image as Media).url || '') 
                : getMediaUrl(item.image as any)

              return (
                <div 
                  key={item.id || idx} 
                  className="w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] shrink-0 snap-start"
                >
                  <div className="bg-slate-50 dark:bg-neutral-900/50 rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 dark:border-neutral-800 h-full flex flex-col relative group hover:bg-white dark:hover:bg-neutral-900 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700">
                      <Quote className="w-20 h-20 text-blue-600" />
                    </div>

                    {/* Testimonial Quote */}
                    <div className="relative mb-8 grow">
                      <p className="text-lg lg:text-xl text-slate-700 dark:text-neutral-300 leading-relaxed font-medium">
                        &quot;{item.testimonial?.quote || item.testimonial?.highlight}&quot;
                      </p>
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center gap-5 pt-8 border-t border-slate-200 dark:border-neutral-800">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden border-2 border-white dark:border-neutral-800 shadow-lg group-hover:border-blue-500/30 transition-colors duration-500">
                          <ImageWithFallback
                            src={imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1">
                          {item.name}
                        </h3>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-tight">
                          {item.exam}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* View All Link */}
        {viewAllLink && (
           <div className="mt-16 text-center">
              <CMSLink 
                {...viewAllLink}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-4 transition-all"
              />
           </div>
        )}
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
