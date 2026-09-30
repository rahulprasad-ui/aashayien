'use client'

import React from 'react'
import { CheckCircle2, ArrowRight, User } from 'lucide-react'
import { Media } from '@/payload-types'
import Link from 'next/link'
import { ImageWithFallback } from './ImageWithFallback'
import type { ImageDisplayConfig } from '@/utilities/imageDisplay'
import { resolveImageDisplay } from '@/utilities/imageDisplay'

interface FounderSectionProps {
  sectionTitle?: string | null
  sectionSubtitle?: string | null
  founderImage?: string | Media | null
  founderImageDisplay?: ImageDisplayConfig | null
  founderName?: string | null
  founderRole?: string | null
  founderIntro?: string | null
  experienceHighlights?: { text: string; id?: string | null }[] | null
  founderCTA?: {
    label?: string | null
    link?: string | null
  } | null
}

export const FounderSection: React.FC<FounderSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  founderImage,
  founderImageDisplay,
  founderName,
  founderRole,
  founderIntro,
  experienceHighlights,
  founderCTA,
}) => {
  const resolvedFounderImage = resolveImageDisplay(founderImage, founderImageDisplay, {
    fallbackFit: 'cover',
  })
  
  const defaultHighlights = [
    { text: '20+ Years of Teaching Experience' },
    { text: 'Mentored 10,000+ Students' },
    { text: 'Produced Hundreds of Judicial Officers' },
    { text: 'Renowned Author & Legal Expert' }
  ]

  const highlights = experienceHighlights && experienceHighlights.length > 0 
    ? experienceHighlights 
    : defaultHighlights

  const displaySectionTitle = sectionTitle && sectionTitle.trim() !== '' ? sectionTitle : 'Meet The Visionary Behind Aashayien'
  const displaySectionSubtitle = sectionSubtitle && sectionSubtitle.trim() !== '' ? sectionSubtitle : 'About Our Founder'
  const frameWidth = resolvedFounderImage.width
  const frameHeight = resolvedFounderImage.height
  const hasExplicitFrameSize = Boolean(frameWidth || frameHeight)
  const imageAspectRatio =
    frameWidth && frameHeight ? `${frameWidth} / ${frameHeight}` : undefined
  const boundedWidth =
    frameWidth && frameHeight
      ? `min(100%, ${frameWidth}px, calc(80vh * ${frameWidth} / ${frameHeight}))`
      : frameWidth
        ? `min(100%, ${frameWidth}px)`
        : undefined

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-50 dark:bg-neutral-900/50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ED1F24]/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Mentor Image */}
          <div className="relative group flex w-full justify-center lg:justify-end lg:items-start">
            <div className="relative lg:ml-auto">
              <div className="absolute inset-0 rounded-4xl bg-linear-to-tr from-[#ED1F24]/10 to-orange-500/10 blur-xl opacity-70 scale-105" />
              <div
              className={`relative overflow-hidden rounded-4xl border-8 border-white dark:border-neutral-800 shadow-xl ${
                hasExplicitFrameSize ? 'w-fit max-w-full' : 'aspect-4/5 w-full'
              }`}
              style={
                hasExplicitFrameSize
                  ? {
                      aspectRatio: imageAspectRatio,
                      maxHeight: '80vh',
                      width: boundedWidth,
                    }
                  : {
                      maxHeight: '80vh',
                    }
              }
              >
                {resolvedFounderImage.src ? (
                  <ImageWithFallback
                    resource={founderImage}
                    display={founderImageDisplay}
                    alt={founderName || 'Mentor'}
                    className="group-hover:scale-105 transition-transform duration-700"
                    fill={!hasExplicitFrameSize}
                    width={hasExplicitFrameSize ? frameWidth : undefined}
                    height={hasExplicitFrameSize ? frameHeight : undefined}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center text-slate-400">
                    <User className="w-20 h-20" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 bg-white/92 dark:bg-neutral-900/92 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-1 leading-tight">
                    {founderName || 'Anil Khanna'}
                  </h3>
                  <p className="text-[#ED1F24] font-bold text-xs sm:text-sm uppercase tracking-wide leading-snug">
                    {founderRole || 'Founder & Chief Mentor'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Introduction Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full">
                <span className="text-[#ED1F24] font-bold text-xs uppercase tracking-widest">{displaySectionSubtitle}</span>
              </div>
              <h2 
                className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight"
                dangerouslySetInnerHTML={{ __html: displaySectionTitle.replace('Aashayien', '<span class="text-[#ED1F24]">Aashayien</span>') }} 
              />
              <p className="text-slate-600 dark:text-neutral-400 text-lg leading-relaxed">
                {founderIntro || 'Leading authority in legal education with over 20 years of experience in mentoring judiciary aspirants across India.'}
              </p>
            </div>

            {/* Experience Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-slate-100 dark:border-neutral-700 hover:border-[#ED1F24]/30 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-neutral-300 font-bold text-sm">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link 
                href={founderCTA?.link || '/about-us'}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#ED1F24] text-white rounded-2xl font-black text-lg shadow-xl shadow-[#ED1F24]/20 hover:bg-[#d11b20] hover:-translate-y-1 transition-all group"
              >
                <span>{founderCTA?.label || 'Learn More About Anil Sir'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
