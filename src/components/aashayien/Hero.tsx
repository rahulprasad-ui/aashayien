'use client'

import { useState, useEffect } from 'react'
import {
  Scale,
  Award,
  TrendingUp,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import type { Home, Branding } from '@/payload-types'
import { FormBlock } from '@/blocks/Form/Component'
import type { ImageDisplayConfig } from '@/utilities/imageDisplay'

type HeroProps = {
  slides?: Home['slides']
  branding?: Branding
}

type Slide = {
  id: string | number
  image?: Home['slides'][number]['image'] | string
  imageDisplay?: ImageDisplayConfig | null
  badge?: string | null
  title: string
  subtitle?: string | null
  features?: { text: string }[] | null
  link?: any
  secondaryLink?: any
}

export function Hero({ slides: incomingSlides, branding }: HeroProps) {
  const slides: Slide[] =
    incomingSlides && incomingSlides.length > 0
      ? incomingSlides.map((slide, index) => ({
          id: slide.id || index,
          image: slide.image,
          imageDisplay: (slide as any).imageDisplay,
          badge: undefined,
          title: slide.title,
          subtitle: slide.description,
          features: slide.features,
          link: slide.link,
          secondaryLink: (slide as any).secondaryLink,
        }))
      : [
          {
            id: 1,
            image:
              'https://images.unsplash.com/photo-1555374018-13a8994ab246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWRnZSUyMGdhdmVsJTIwanVzdGljZXxlbnwxfHx8fDE3NjQ4NDYxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            badge: 'Batch 2025 Open',
            title: 'Your Path to Judiciary Excellence',
            subtitle: "Join India's Most Trusted Judiciary Coaching Platform",
            features: [],
            link: null,
          },
          {
            id: 2,
            image:
              'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', // Law books/library
            badge: 'Admissions Open',
            title: 'Expert Guidance for Success',
            subtitle: 'Comprehensive study material and mentorship for your journey',
            features: [],
            link: null,
          },
          {
            id: 3,
            image:
              'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', // Courtroom/Gavel abstract
            badge: 'Limited Seats',
            title: 'Achieve Your Judicial Dream',
            subtitle: 'Proven track record with 5000+ selections nationwide',
            features: [],
            link: null,
          },
        ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const renderCTA = (linkData: any, isPrimary = true) => {
    if (!linkData || linkData.type === 'none') {
      if (isPrimary) {
        const enrollLink = branding?.enrollButton?.link || '/courses'
        return (
          <button
            onClick={() => window.open(enrollLink, '_blank')}
            className="px-8 py-4 bg-[#ED1F24] text-white rounded-xl font-bold hover:bg-[#d11b20] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Enroll Now
          </button>
        )
      }
      return null
    }

    const url =
      linkData.type === 'custom'
        ? linkData.url
        : linkData.reference && typeof linkData.reference.value === 'object'
          ? `/${(linkData.reference.value as any).slug}`
          : '#'

    return (
      <a
        href={url || '#'}
        target={linkData.newTab ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className={`px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center ${
          isPrimary
            ? 'bg-[#ED1F24] text-white hover:bg-[#d11b20]'
            : 'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20'
        }`}
      >
        {linkData.label || (isPrimary ? 'Get Started' : 'Learn More')}
      </a>
    )
  }

  return (
    <section className="relative bg-slate-950 overflow-hidden min-h-[80vh] flex items-center pt-8 lg:pt-0">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ED1F24]/5 blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-600/5 blur-[120px] -z-10 animate-pulse"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-all duration-700 ease-in-out py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 ${
              index === currentSlide
                ? 'opacity-100 translate-x-0 scale-100 relative z-10'
                : 'opacity-0 -translate-x-8 scale-95 absolute inset-0 z-0 pointer-events-none invisible'
            }`}
          >
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Side - Messaging */}
              <div className="text-white lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ED1F24]/10 border border-[#ED1F24]/20 rounded-full mb-8 animate-fade-in">
                  <span className="w-2 h-2 rounded-full bg-[#ED1F24] animate-ping"></span>
                  <h1 className="text-[#ED1F24] text-sm font-bold uppercase tracking-wider">
                    {slide.badge || 'Judiciary Preparation'}
                  </h1>
                </div>

                <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-white drop-shadow-sm">
                  {slide.title}
                </h2>

                <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                  {slide.subtitle}
                </p>

                {/* Key Points */}
                <div className="grid sm:grid-cols-1 gap-3 mb-10">
                  {(slide.features || []).slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="shrink-0 w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <span className="text-lg text-slate-100 font-medium">{feature.text}</span>
                    </div>
                  ))}
                  {(!slide.features || slide.features.length === 0) && (
                    <>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-lg">5000+ Selections Nationwide</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-lg">Expert State-wise Guidance</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-lg">Comprehensive Study Material</span>
                      </div>
                    </>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {renderCTA(slide.link, true)}
                  {renderCTA(slide.secondaryLink, false)}
                </div>
              </div>

              {/* Right Side - Visual Element */}
              <div className="relative order-first lg:order-last mb-10 lg:mb-0 lg:col-span-4">
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl border border-white/10">
                  <ImageWithFallback
                    resource={slide.image}
                    display={slide.imageDisplay}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent"></div>
                </div>


                {/* Backdrop Blur */}
                <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-[#ED1F24]/20 blur-3xl rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
          <button
            onClick={prevSlide}
            className="p-3 bg-white/5 backdrop-blur-md rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'w-10 bg-[#ED1F24]' : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-3 bg-white/5 backdrop-blur-md rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  )
}
