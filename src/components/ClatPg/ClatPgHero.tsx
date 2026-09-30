'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'

export interface HeroSlideItem {
  id?: string | number
  badge?: string
  tag?: string
  title: string
  subtitle?: string
  features?: string[] | any[]
  buttonText?: string
  buttonLink?: string
  image?: string | any
  heroImage?: string | any
}

interface ClatPgHeroProps {
  slides?: HeroSlideItem[]
  onBookCounsellingClick?: () => void
  onDownloadBrochureClick?: () => void
}

export const ClatPgHero: React.FC<ClatPgHeroProps> = ({
  slides,
  onBookCounsellingClick,
}) => {
  const activeSlides = slides && slides.length > 0 ? slides : []
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (activeSlides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [activeSlides.length])

  if (activeSlides.length === 0) return null

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  const current = activeSlides[currentSlide] || activeSlides[0]

  const heroImgUrl =
    typeof current.heroImage === 'object' && (current.heroImage as any)?.url
      ? (current.heroImage as any).url
      : typeof current.image === 'object' && (current.image as any)?.url
        ? (current.image as any).url
        : typeof current.heroImage === 'string' && current.heroImage
          ? current.heroImage
          : typeof current.image === 'string' && current.image
            ? current.image
            : null

  const featureList =
    Array.isArray(current.features) && current.features.length > 0
      ? current.features.map((f: any) => (typeof f === 'object' ? f.feature || f.text : f))
      : []

  return (
    <section className="relative bg-[#060913] text-white min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden py-12 lg:py-20 select-none">
      {/* Background Dot Grid Pattern matching reference */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Subtle Glow FX */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ED1F24]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill / Badge */}
            {(current.badge || current.tag) && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ED1F24]/10 border border-[#ED1F24]/30">
                <span className="w-2 h-2 rounded-full bg-[#ED1F24] animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-red-400">
                  {current.badge || current.tag}
                </span>
              </div>
            )}

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {current.title}
            </h1>

            {/* Subtitle / Paragraph */}
            {current.subtitle && (
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                {current.subtitle}
              </p>
            )}

            {/* Features Checklist */}
            {featureList.length > 0 && (
              <div className="space-y-3 pt-2">
                {featureList.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-sm sm:text-base font-medium text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Red Action Button & Slider Controls Row */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              {/* Primary Red Button */}
              {current.buttonText &&
                (current.buttonLink ? (
                  <a
                    href={current.buttonLink}
                    target={current.buttonLink.startsWith('http') ? '_blank' : '_self'}
                    rel={current.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="px-8 py-3.5 rounded-xl bg-[#ED1F24] hover:bg-[#d11b20] text-white font-bold text-base shadow-lg shadow-[#ED1F24]/30 transition-all hover:scale-[1.02] active:scale-[0.98] w-fit inline-block text-center"
                  >
                    {current.buttonText}
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      if (onBookCounsellingClick) {
                        onBookCounsellingClick()
                      } else {
                        const el = document.getElementById('clat-pg-form-container')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="px-8 py-3.5 rounded-xl bg-[#ED1F24] hover:bg-[#d11b20] text-white font-bold text-base shadow-lg shadow-[#ED1F24]/30 transition-all hover:scale-[1.02] active:scale-[0.98] w-fit"
                  >
                    {current.buttonText}
                  </button>
                ))}

              {/* Slider Controls (< -- - >) */}
              {activeSlides.length > 1 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {activeSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentSlide === idx ? 'w-8 bg-[#ED1F24]' : 'w-3 bg-white/20'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Right Side Featured Image Card */}
          {heroImgUrl && (
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/3] lg:aspect-[1/1] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
                <Image
                  src={heroImgUrl}
                  alt={current.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/70 via-transparent to-transparent" />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
