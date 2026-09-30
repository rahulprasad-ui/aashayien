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
  const { stickyCTA, conversions, contactInfo } = branding

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

  return (
    <>
      {/* Floating Buttons (WhatsApp & Phone) */}
      {showFloating && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-4">
          {showWhatsapp && whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-7 h-7" />
              <span className="absolute right-full mr-4 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                WhatsApp Us
              </span>
            </a>
          )}
          {showCall && phone && (
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="group relative flex items-center justify-center w-14 h-14 bg-[#ED1F24] text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              aria-label="Call Us"
            >
              <Phone className="w-6 h-6" />
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
              className="group relative flex items-center justify-center w-14 h-14 bg-slate-800 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              aria-label="Download Brochure"
              download
            >
              <Download className="w-6 h-6" />
              <span className="absolute right-full mr-4 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Download Brochure
              </span>
            </a>
          )}
        </div>
      )}

      {/* Sticky CTA (Bottom Bar for Mobile, Side for Desktop) */}
      {stickyCTA?.isActive && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-0 md:left-auto md:w-auto">
          {/* Mobile Bottom Bar */}
          <div className="md:hidden w-full bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            <Link
              href={stickyCTA.link || '/contact'}
              className="flex items-center justify-center w-full py-4 bg-[#ED1F24] text-white rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all"
            >
              {stickyCTA.label}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Desktop Side Button */}
          <div className="hidden md:block">
            <Link
              href={stickyCTA.link || '/contact'}
              className="flex items-center gap-3 px-6 py-4 bg-[#ED1F24] text-white rounded-l-2xl font-bold shadow-[-4px_4px_20px_rgba(237,31,36,0.3)] hover:pr-10 transition-all duration-300 group"
            >
              <span className="text-lg">{stickyCTA.label}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
