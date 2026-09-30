'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Slide = {
  image: { url?: string | null; alt?: string | null } | string | null
  title?: string | null
  caption?: string | null
  link?: string | null
  linkLabel?: string | null
}

type SliderBlockProps = {
  heading?: string | null
  subheading?: string | null
  slides?: Slide[] | null
  autoPlay?: boolean | null
  autoPlayInterval?: number | null
}

export const SliderBlockComponent: React.FC<SliderBlockProps> = ({
  heading,
  subheading,
  slides = [],
  autoPlay = true,
  autoPlayInterval = 4,
}) => {
  const [current, setCurrent] = useState(0)
  const allSlides = slides ?? []

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + allSlides.length) % allSlides.length)
  }, [allSlides.length])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % allSlides.length)
  }, [allSlides.length])

  useEffect(() => {
    if (!autoPlay || allSlides.length <= 1) return
    const interval = setInterval(next, (autoPlayInterval ?? 4) * 1000)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, next, allSlides.length])

  if (!allSlides.length) return null

  return (
    <section className="py-3 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(heading || subheading) && (
          <div className="text-center mb-10">
            {subheading && (
              <div className="inline-block px-6 py-2 bg-red-100 rounded-full mb-4">
                <span className="text-[#ED1F24] font-bold text-sm">{subheading}</span>
              </div>
            )}
            {heading && (
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{heading}</h2>
            )}
          </div>
        )}

        {/* Slider */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 select-none" style={{ minHeight: '400px' }}>
          {/* Slides */}
          {allSlides.map((slide, i) => {
            const img = slide.image && typeof slide.image === 'object' ? slide.image : null
            return (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                {img?.url ? (
                  <Image src={img.url} alt={img.alt || slide.title || 'Slide'} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
                )}

                {/* Overlay */}
                {(slide.title || slide.caption || slide.link) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                    {slide.title && (
                      <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">{slide.title}</h3>
                    )}
                    {slide.caption && (
                      <p className="text-white/80 text-base md:text-lg mb-4">{slide.caption}</p>
                    )}
                    {slide.link && (
                      <a
                        href={slide.link}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ED1F24] text-white rounded-xl font-bold hover:bg-[#d11b20] transition-colors w-fit shadow-lg"
                      >
                        {slide.linkLabel || 'Learn More'}
                      </a>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {/* Nav Buttons */}
          {allSlides.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition-all backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition-all backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {allSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-[#ED1F24] scale-125' : 'bg-white/50 hover:bg-white'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
