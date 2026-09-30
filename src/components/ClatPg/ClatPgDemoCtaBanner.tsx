'use client'

import React from 'react'
import Image from 'next/image'
import { Sparkles, Calendar, ArrowRight } from 'lucide-react'

interface ClatPgDemoCtaBannerProps {
  badgeText?: string
  title?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  backgroundImage?: any
  onBookSpotClick?: () => void
}

export const ClatPgDemoCtaBanner: React.FC<ClatPgDemoCtaBannerProps> = ({
  badgeText = 'DEMO CLASS',
  title = 'Book Free Class of Online CLAT PG Coaching!',
  description = 'Experience our high-yielding passage analysis methodology, expert NLU faculty guidance, and interactive doubt resolution first-hand.',
  buttonText = 'BOOK YOUR SPOT NOW',
  buttonUrl,
  backgroundImage,
  onBookSpotClick,
}) => {
  const handleClick = () => {
    if (buttonUrl && buttonUrl !== '#') {
      window.location.href = buttonUrl
    } else if (onBookSpotClick) {
      onBookSpotClick()
    } else {
      const el = document.getElementById('clat-pg-form-container')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  let bgImageUrl = ''
  if (typeof backgroundImage === 'object' && backgroundImage !== null) {
    bgImageUrl =
      backgroundImage.url ||
      (backgroundImage.filename ? `/media/${backgroundImage.filename}` : '')
  } else if (typeof backgroundImage === 'string' && backgroundImage) {
    bgImageUrl =
      backgroundImage.startsWith('/') || backgroundImage.startsWith('http')
        ? backgroundImage
        : `/media/${backgroundImage}`
  }

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl text-white overflow-hidden">
          
          {/* Direct Background Image Without Any Gradient */}
          {bgImageUrl ? (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <Image
                src={bgImageUrl}
                alt="Banner Background"
                fill
                className="object-cover object-center"
              />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-red-950 via-slate-900 to-slate-950">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ED1F24]/30 rounded-full blur-[100px]" />
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Main Content */}
            <div className="lg:col-span-12 space-y-4">
              {badgeText && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ED1F24]/20 border border-[#ED1F24]/40 text-[#ED1F24] text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>{badgeText}</span>
                </div>
              )}
              {title && (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-md">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed drop-shadow">
                  {description}
                </p>
              )}

              {buttonText && (
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <button
                    onClick={handleClick}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#ED1F24] hover:bg-red-700 text-white font-black text-base uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>{buttonText}</span>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
