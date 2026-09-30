'use client'

import { FormBlock } from '@/blocks/Form/Component'
import type { Form, Media, Popup } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface PopupManagerProps {
  popups: Popup[]
}

export const PopupManager: React.FC<PopupManagerProps> = ({ popups }) => {
  const [activePopup, setActivePopup] = useState<Popup | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  useEffect(() => {
    if (!popups || popups.length === 0) {
      return
    }

    const searchParams = new URLSearchParams(window.location.search)
    const shouldReset = searchParams.get('reset_popup') === 'true'

    // Find the first matching active popup
    const popup = popups.find((p) => {
      if (!p.isActive) return false

      const { condition, path } = p.displayRules || {}

      if (condition === 'all') return true
      if (condition === 'home' && pathname === '/') return true
      if (condition === 'path' && path && pathname === path) return true

      return false
    })

    if (popup) {
      const {
        triggerType = 'delay',
        delay: rawDelay = 0,
        scrollPercentage: rawScrollPercentage = 50,
      } = popup.displayRules || {}

      const delay = Number(rawDelay)
      const scrollPercentage = Number(rawScrollPercentage)

      // Check if already dismissed based on frequency
      const frequency = popup.displayRules?.frequency || 'once'
      let dismissed = false

      if (frequency === 'once') {
        dismissed = !!localStorage.getItem(`popup_dismissed_${popup.id}`)
      } else if (frequency === 'session') {
        dismissed = !!sessionStorage.getItem(`popup_dismissed_${popup.id}`)
      }

      if (dismissed && !shouldReset) {
        return
      }

      if (shouldReset) {
        localStorage.removeItem(`popup_dismissed_${popup.id}`)
        sessionStorage.removeItem(`popup_dismissed_${popup.id}`)
      }

      const showPopup = () => {
        setActivePopup(popup)
        setIsVisible(true)
      }

      if (triggerType === 'delay') {
        const timer = setTimeout(showPopup, delay * 1000)
        return () => clearTimeout(timer)
      }

      if (triggerType === 'scroll') {
        const handleScroll = () => {
          const scrollPos = window.scrollY
          const winHeight = window.innerHeight
          const docHeight = document.documentElement.scrollHeight
          const totalScroll = docHeight - winHeight
          const scrolled = (scrollPos / totalScroll) * 100

          if (scrolled >= scrollPercentage) {
            showPopup()
            window.removeEventListener('scroll', handleScroll)
          }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }

      if (triggerType === 'exit') {
        const handleExitIntent = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            showPopup()
            document.removeEventListener('mouseleave', handleExitIntent)
          }
        }

        document.addEventListener('mouseleave', handleExitIntent)
        return () => document.removeEventListener('mouseleave', handleExitIntent)
      }
    } else {
      setIsVisible(false)
      setActivePopup(null)
    }
  }, [pathname, popups])

  const handleClose = () => {
    setIsVisible(false)
    if (activePopup) {
      const frequency = activePopup.displayRules?.frequency || 'once'
      if (frequency === 'once') {
        localStorage.setItem(`popup_dismissed_${activePopup.id}`, 'true')
      } else if (frequency === 'session') {
        sessionStorage.setItem(`popup_dismissed_${activePopup.id}`, 'true')
      }
    }
    // After animation finishes
    setTimeout(() => setActivePopup(null), 300)
  }

  if (!activePopup) return null

  const image = activePopup.image as Media | undefined
  const form = activePopup.form as Form | undefined
  const imageAspectRatio =
    typeof image?.width === 'number' && typeof image?.height === 'number' && image.height > 0
      ? `${image.width} / ${image.height}`
      : undefined

  return (
    <div
      className={cn(
        'fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-out sm:p-6',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
      onClick={handleClose}
    >
      <div className="absolute inset-x-4 inset-y-4 flex items-center justify-center sm:static sm:w-full">
        <div
          className={cn(
            'relative mx-auto w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transform transition-all duration-500 ease-out',
            isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8',
            activePopup.size === 'lg' ? 'sm:max-w-5xl' : 'sm:max-w-3xl',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 border border-gray-200 text-gray-500 hover:bg-white hover:text-[#ed1f24] hover:border-[#ed1f24] transition-all duration-300 z-20 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#ed1f24] focus:ring-offset-2"
            aria-label="Close popup"
          >
            <X size={20} />
          </button>

          <div
            className={cn(
              'flex flex-col max-h-[calc(100dvh-2rem)] overflow-x-hidden overflow-y-auto',
              activePopup.imagePosition === 'left' && 'md:flex-row',
              activePopup.imagePosition === 'right' && 'md:flex-row-reverse',
              activePopup.imagePosition === 'top' && 'flex-col',
            )}
          >
            {/* Image Section */}
            {image?.url && (
              <>
                {/* Desktop Image Section */}
                <div
                  className={cn(
                    'hidden md:block relative overflow-hidden shrink-0 group',
                    imageAspectRatio
                      ? 'aspect-[var(--popup-image-aspect-ratio)] max-h-[45dvh] md:aspect-auto md:max-h-none'
                      : 'h-56 sm:h-64 md:h-auto',
                    (activePopup.imagePosition === 'left' || activePopup.imagePosition === 'right') &&
                      'w-full md:w-[45%] md:h-auto bg-gray-50',
                    activePopup.imagePosition === 'top' && 'w-full md:h-64 bg-gray-50',
                    activePopup.imagePosition === 'left' &&
                      'border-b md:border-b-0 md:border-r border-gray-100',
                    activePopup.imagePosition === 'right' &&
                      'border-b md:border-b-0 md:border-l border-gray-100',
                    activePopup.imagePosition === 'top' && 'border-b border-gray-100',
                  )}
                  style={
                    imageAspectRatio
                      ? ({ '--popup-image-aspect-ratio': imageAspectRatio } as React.CSSProperties)
                      : undefined
                  }
                >
                  <Image
                    src={image.url}
                    alt={activePopup.title || 'Popup Image'}
                    fill
                    priority
                    className="transition-transform duration-700 md:group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Mobile Image Section */}
                <div className="block md:hidden w-full relative overflow-hidden shrink-0 bg-gray-50 border-b border-gray-100">
                  <Image
                    src={image.url}
                    alt={activePopup.title || 'Popup Image'}
                    width={image.width || 800}
                    height={image.height || 600}
                    priority
                    className="w-full h-auto block"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </>
            )}

            {/* Content Section */}
            <div
              className={cn(
                'p-8 md:p-12 flex-1 overflow-y-visible md:overflow-y-auto custom-scrollbar flex flex-col items-center',
                !image?.url && 'w-full',
              )}
            >
              <div className="mb-8 w-full max-w-lg mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight mb-4 wrap-break-word">
                  {activePopup.title}
                </h2>
                {activePopup.description && (
                  <p className="text-gray-600 line-clamp-2 font-sans leading-relaxed text-sm wrap-break-word">
                    {activePopup.description as any}
                  </p>
                )}
              </div>

              {form && (
                <div className="mt-auto w-full max-w-lg mx-auto text-left">
                  <div className="popup-form">
                    <FormBlock
                      enableIntro={false}
                      form={form as any}
                      submitButtonClassName="w-full h-11 text-base bg-[#ed1f24] hover:bg-[#d11b20] shadow-[0_4px_10px_rgba(237,31,36,0.2)] hover:shadow-[0_6px_15px_rgba(237,31,36,0.25)] transition-all duration-300 rounded-lg font-bold mt-4 shrink-0"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
