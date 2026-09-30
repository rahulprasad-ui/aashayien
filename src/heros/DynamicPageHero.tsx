import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

type DynamicPageHeroProps = {
  title: string
  showPageTitle?: boolean | null
  pageSubtitle?: string | null
  pageDescription?: any
  pageImage?: any
  pageBgImage?: any
  enablePageButton?: boolean | null
  pageButtonText?: string | null
  pageButtonLink?: string | null
}

export const DynamicPageHero: React.FC<DynamicPageHeroProps> = ({
  title,
  showPageTitle = true,
  pageSubtitle,
  pageDescription,
  pageImage,
  pageBgImage,
  enablePageButton,
  pageButtonText = 'Enroll Now',
  pageButtonLink,
}) => {
  const bgImageUrl = pageBgImage && typeof pageBgImage === 'object' ? pageBgImage.url : null
  const pageImageUrl = pageImage && typeof pageImage === 'object' ? pageImage.url : null
  const showButton = enablePageButton && pageButtonText
  const isTitleVisible = showPageTitle !== false

  // If title is hidden AND no subtitle, description, button, or images exist, return null
  if (!isTitleVisible && !pageSubtitle && !pageDescription && !showButton && !pageImageUrl && !bgImageUrl) {
    return null
  }

  return (
    <div className="relative bg-[#0d1b3e] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image overlay if uploaded */}
      {bgImageUrl ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt="Page Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
      ) : (
        /* Stylish subtle grid background pattern & glowing radial gradients */
        <>
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED1F24]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className={`flex-1 ${pageImageUrl ? 'text-left' : 'text-center max-w-3xl mx-auto'}`}>
          {/* Subtitle Badge */}
          {pageSubtitle && (
            <div className="inline-block px-5 py-2 bg-[#ED1F24]/20 border border-[#ED1F24]/40 rounded-full mb-4 shadow-sm backdrop-blur-xs">
              <span className="text-red-400 font-bold text-xs sm:text-sm uppercase tracking-wide">
                {pageSubtitle}
              </span>
            </div>
          )}

          {/* Main Title */}
          {isTitleVisible && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              {title}
            </h1>
          )}

          {/* Page Description */}
          {pageDescription && (
            <div className="prose prose-invert max-w-none text-slate-300 text-base sm:text-lg leading-relaxed">
              {typeof pageDescription === 'object' ? (
                <RichText data={pageDescription} enableGutter={false} />
              ) : (
                <p>{pageDescription}</p>
              )}
            </div>
          )}

          {/* Action Button */}
          {showButton && (
            <div className="mt-6">
              <a
                href={pageButtonLink || '#'}
                target={pageButtonLink?.startsWith('http') ? '_blank' : '_self'}
                rel={pageButtonLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-block px-8 py-3.5 bg-[#ED1F24] hover:bg-[#d11b20] text-white font-bold text-base rounded-xl shadow-lg shadow-[#ED1F24]/30 transition-all hover:scale-105 active:scale-95"
              >
                {pageButtonText}
              </a>
            </div>
          )}
        </div>

        {/* Optional Page Side Image */}
        {pageImageUrl && (
          <div className="flex-1 w-full relative h-[280px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src={pageImageUrl}
              alt={title || 'Page Image'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </div>
  )
}
