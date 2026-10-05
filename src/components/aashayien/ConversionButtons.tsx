'use client'

import React from 'react'
import Link from 'next/link'
import { MessageCircle, Phone, Download, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { Branding, Media } from '@/payload-types'

interface ConversionButtonsProps {
  branding: Branding
}

export const ConversionButtons: React.FC<ConversionButtonsProps> = ({ branding }) => {
  const { stickyCTA, conversions, contactInfo } = branding || {}

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const appendPageToWhatsAppUrl = (urlStr: string): string => {
      try {
        const currentUrl = window.location.href
        // Generate a random 5-character uppercase alphanumeric code
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let code = ''
        for (let i = 0; i < 5; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length))
        }

        const url = new URL(urlStr)
        let text = url.searchParams.get('text') || 'Hi! How can I help you?'
        
        // Remove trailing space if any, then format with inquiry code and resource link
        if (!text.includes('Inquiry code:')) {
          if (text && !text.endsWith(' ')) {
            text += ' '
          }
          text += `Inquiry code: #${code} Resource Link: ${currentUrl}`
          url.searchParams.set('text', text)
        }
        return url.toString()
      } catch (e) {
        if (urlStr.includes('wa.me')) {
          const currentUrl = window.location.href
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
          let code = ''
          for (let i = 0; i < 5; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length))
          }
          const addition = ` Inquiry code: #${code} Resource Link: ${currentUrl}`
          const separator = urlStr.includes('?') ? '&' : '?'
          
          if (urlStr.includes('text=')) {
            if (!urlStr.includes('Inquiry code:')) {
              return `${urlStr}${encodeURIComponent(addition)}`
            }
          } else {
            return `${urlStr}${separator}text=${encodeURIComponent('Hi! How can I help you?' + addition)}`
          }
        }
        return urlStr
      }
    }

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a')
      if (anchor && anchor.href && (anchor.href.includes('wa.me') || anchor.href.includes('whatsapp.com'))) {
        anchor.href = appendPageToWhatsAppUrl(anchor.href)
      }
    }

    document.addEventListener('click', handleAnchorClick, true)

    const originalOpen = window.open
    window.open = function(
      url?: string | URL,
      target?: string,
      features?: string
    ): Window | null {
      let finalUrl = url
      if (url && (url.toString().includes('wa.me') || url.toString().includes('whatsapp.com'))) {
        finalUrl = appendPageToWhatsAppUrl(url.toString())
      }
      return originalOpen.call(window, finalUrl, target, features)
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick, true)
      window.open = originalOpen
    }
  }, [])

  const showFloating = conversions?.showFloatingButtons ?? true

  // Individual toggles
  const showWhatsapp = (conversions as any)?.showWhatsapp ?? true
  const showCall = (conversions as any)?.showCall ?? true

  const brochure = conversions?.brochure as Media | undefined

  // Number overrides
  const phone = (conversions as any)?.callNumber || contactInfo?.phone
  const whatsapp = (conversions as any)?.whatsappNumber || contactInfo?.whatsapp

  const isCTAActive = true
  const ctaLink = '/#lead-form'
  const ctaLabel = 'Book Free Counselling Session'

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const handleHashScroll = () => {
      if (window.location.hash === '#lead-form') {
        const target = document.getElementById('lead-form')
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            const firstInput = target.querySelector<HTMLInputElement | HTMLTextAreaElement>(
              'input:not([type="hidden"]), select, textarea'
            )
            firstInput?.focus({ preventScroll: true })
          }, 250)
        }
      }
    }

    handleHashScroll()
    window.addEventListener('hashchange', handleHashScroll)
    return () => window.removeEventListener('hashchange', handleHashScroll)
  }, [])

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
    const isHomePage = currentPath === '/' || currentPath === ''
    const target = document.getElementById('lead-form') || (isHomePage ? document.querySelector('form') : null)

    if (target && (isHomePage || ctaLink.includes('#lead-form') || ctaLink.startsWith('#'))) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (window.history.pushState) {
        window.history.pushState(null, '', '#lead-form')
      }
      setTimeout(() => {
        const firstInput = target.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          'input:not([type="hidden"]), select, textarea'
        )
        firstInput?.focus({ preventScroll: true })
      }, 400)
    }
  }

  const renderMobileLabel = () => {
    const text = ctaLabel
    if (text.toLowerCase().includes('counselling') || text.toLowerCase().includes('session')) {
      return (
        <div className="flex flex-col items-center justify-center leading-tight">
          <span className="text-white font-bold text-sm sm:text-base tracking-wide drop-shadow-sm">
            Book Free Counselling
          </span>
          <span className="text-white font-bold text-xs sm:text-sm tracking-wide drop-shadow-sm opacity-95">
            Session
          </span>
        </div>
      )
    }
    const words = text.split(' ')
    if (words.length >= 3) {
      const mid = Math.ceil(words.length / 2)
      return (
        <div className="flex flex-col items-center justify-center leading-tight">
          <span className="text-white font-bold text-sm sm:text-base tracking-wide drop-shadow-sm">
            {words.slice(0, mid).join(' ')}
          </span>
          <span className="text-white font-bold text-xs sm:text-sm tracking-wide drop-shadow-sm opacity-95">
            {words.slice(mid).join(' ')}
          </span>
        </div>
      )
    }
    return (
      <span className="text-white font-bold text-sm sm:text-base tracking-wide drop-shadow-sm">
        {text}
      </span>
    )
  }

  return (
    <>
      {/* Floating Buttons (WhatsApp & Phone) */}
      {showFloating && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col gap-3 sm:gap-4">
          {showWhatsapp && whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="absolute right-full mr-4 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                WhatsApp Us
              </span>
            </a>
          )}
          {showCall && phone && (
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#ED1F24] text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              aria-label="Call Us"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute right-full mr-4 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Call Now
              </span>
            </a>
          )}
          {brochure?.url && (
            <a
              href={brochure.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              aria-label="Download Brochure"
              download
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute right-full mr-4 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Download Brochure
              </span>
            </a>
          )}
        </div>
      )}

      {/* Sticky CTA (Mobile Floating Bar & Desktop Side Button) */}
      {isCTAActive && (
        <>
          {/* Mobile Floating Sticky CTA Button (Only visible on mobile) */}
          <div className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-1.5rem)] max-w-sm sm:max-w-md pointer-events-auto">
            <Link
              href={ctaLink}
              onClick={handleCTAClick}
              className="group relative flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-[#7B6FF2] via-[#6D83F5] to-[#59B2E6] text-white rounded-2xl shadow-[0_8px_25px_rgba(109,131,245,0.45)] border border-white/25 active:scale-[0.98] hover:shadow-[0_10px_30px_rgba(109,131,245,0.6)] transition-all duration-200"
              aria-label={ctaLabel}
            >
              {/* Left Wave Icon */}
              <span className="text-2xl select-none shrink-0 drop-shadow-sm group-hover:rotate-12 transition-transform duration-200" role="img" aria-label="wave">
                👋
              </span>

              {/* Center Text */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                {renderMobileLabel()}
              </div>

              {/* Right Notification Badge */}
              <div className="w-6 h-6 rounded-full bg-[#FFB800] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.25)] ring-2 ring-white/40">
                1
              </div>
            </Link>
          </div>

          {/* Desktop Side Button (Only visible on web/desktop) */}
          <div className="hidden md:block fixed top-1/2 -translate-y-1/2 right-0 z-[60]">
            <Link
              href={ctaLink}
              onClick={handleCTAClick}
              className="flex items-center gap-3 px-6 py-4 bg-[#ED1F24] text-white rounded-l-2xl font-bold shadow-[-4px_4px_20px_rgba(237,31,36,0.3)] hover:pr-10 transition-all duration-300 group"
            >
              <span className="text-lg">{ctaLabel}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </>
      )}
    </>
  )
}
