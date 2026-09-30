'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircleMore,
  Send,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import type { Branding, Header } from '@/payload-types'
import { Page, Post } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type CMSLinkType = {
  type?: 'reference' | 'custom' | null | 'none'
  newTab?: boolean | null
  reference?: {
    relationTo?: string
    value?: any
  } | null
  url?: string | null
  label?: string | null
  appearance?: 'default' | 'outline' | null
}

const CMSLink = ({
  link,
  className,
  onClick,
}: {
  link?: CMSLinkType | null
  className?: string
  onClick?: () => void
}) => {
  if (!link) return null

  const href =
    link.type === 'reference' && typeof link.reference?.value === 'object'
      ? (link.reference.value as any).slug === 'home'
        ? '/'
        : `/${(link.reference.value as any).slug}`
      : link.url || '#'

  if (!href) return null

  const newTabProps = link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Link href={href} {...newTabProps} className={className} onClick={onClick}>
      {link.label}
    </Link>
  )
}

const iconMap: Record<string, React.ElementType> = {
  whatsapp: MessageCircleMore,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  telegram: Send,
  address: MapPin,
}

interface StaticNavbarProps {
  scrollBased?: boolean // If true, navbar appears after scrolling
  branding?: Branding
  headerData?: Header
}

export function StaticNavbar({ scrollBased = false, branding, headerData }: StaticNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(!scrollBased) // Always visible if not scroll-based
  const navRef = useRef<HTMLDivElement>(null)

  const logoUrl =
    branding?.brandAssets?.logo && typeof branding.brandAssets.logo === 'object'
      ? getMediaUrl(branding.brandAssets.logo.url || '') || '/assets/aashayien/logo.png'
      : '/assets/aashayien/logo.png'

  useEffect(() => {
    if (!scrollBased) return

    const handleScroll = () => {
      // Show navbar after scrolling past hero section (100vh)
      const heroHeight = window.innerHeight
      const scrollPosition = window.scrollY

      if (scrollPosition > heroHeight - 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollBased])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdown])

  const toggleMobileDropdown = (label: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === label ? null : label)
  }

  const headerActions = (headerData?.actions?.actions || []).filter(
    (action) => action?.link && action.link.type !== 'none',
  )

  const getActionClassName = (style?: 'primary' | 'secondary' | null) =>
    style === 'secondary'
      ? 'ml-2 px-6 py-2 rounded-lg transition-colors border border-[#ED1F24] text-[#ED1F24] hover:bg-[#ED1F24]/5'
      : 'ml-2 px-6 py-2 rounded-lg transition-colors bg-[#ED1F24] text-white hover:bg-[#d11b20]'

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 dark:bg-neutral-900 dark:border-b dark:border-neutral-800 ${
        scrollBased ? (isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0') : ''
      }`}
      ref={navRef}
    >
      {/* Top Bar */}
      {(headerData?.contactInfo?.phone ||
        headerData?.contactInfo?.whatsapp ||
        headerData?.contactInfo?.address ||
        (headerData?.contactInfo as any)?.socialLinks?.length > 0) && (
        <div className="bg-[#ED1F24] text-white border-b border-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5">
            <div className="flex justify-between items-center text-xs gap-4">
              <div className="flex items-center gap-4">
                {headerData?.contactInfo?.phone && (
                  <a
                    href={`tel:${headerData.contactInfo.phone.replace(/[^\d+]/g, '')}`}
                    className="hover:opacity-80 transition-opacity p-0.5 text-white"
                    title={headerData.contactInfo.phone}
                  >
                    <Phone className="w-4 h-4 stroke-white fill-none" />
                  </a>
                )}

                {/* Legacy WhatsApp */}
                {headerData?.contactInfo?.whatsapp && (
                  <a
                    href={
                      headerData.contactInfo.whatsapp.startsWith('http')
                        ? headerData.contactInfo.whatsapp
                        : `https://wa.me/${headerData.contactInfo.whatsapp.replace(/\D/g, '')}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity p-0.5 text-white"
                    title="WhatsApp"
                  >
                    <MessageCircleMore className="w-4 h-4 stroke-white fill-none" />
                  </a>
                )}

                {/* Legacy Address */}
                {headerData?.contactInfo?.address && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(headerData.contactInfo.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:opacity-80 transition-opacity p-0.5 text-white"
                    title={headerData.contactInfo.address}
                  >
                    <MapPin className="w-4 h-4 stroke-white fill-none" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Dynamic Social Links */}
                {(headerData?.contactInfo as any)?.socialLinks?.map((linkItem: any, idx: number) => {
                  const Icon = iconMap[linkItem.platform] || MessageCircleMore
                  return (
                    <a
                      key={idx}
                      href={linkItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity p-0.5 text-white"
                      title={linkItem.platform}
                    >
                      <Icon className="w-4 h-4 stroke-white fill-none" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logoUrl}
              alt={branding?.siteMeta?.title || 'Aashayein Judiciary'}
              width={160}
              height={64}
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {headerData?.navigation?.navItems?.map((block, i) => {
              if (block.blockType === 'link') {
                return (
                  <CMSLink
                    key={i}
                    link={block.link}
                    className="px-4 py-2 text-slate-700 hover:text-[#ED1F24] transition-colors dark:text-neutral-200 dark:hover:text-[#ED1F24]"
                  />
                )
              }
              if (block.blockType === 'dropdown') {
                return (
                  <div key={i} className="relative group">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === block.id ? null : block.id || null)
                      }
                      className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-[#ED1F24] transition-colors dark:text-neutral-200 dark:hover:text-[#ED1F24]"
                    >
                      {block.title}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === block.id && (
                      <div className="absolute top-full left-0 mt-0 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-2 dark:bg-neutral-900 dark:border-neutral-800">
                        {block.items?.map((item, j) => (
                          <CMSLink
                            key={j}
                            link={item.link}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#ED1F24]/5 hover:text-[#ED1F24] transition-colors dark:text-neutral-200 dark:hover:bg-neutral-800"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              if (block.blockType === 'mega-menu') {
                return (
                  <div key={i} className="relative group">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === block.id ? null : block.id || null)
                      }
                      className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-[#ED1F24] transition-colors dark:text-neutral-200 dark:hover:text-[#ED1F24]"
                    >
                      {block.title}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === block.id && (
                      <div className="absolute top-full left-0 mt-0 w-[480px] bg-white border border-slate-200 rounded-lg shadow-xl p-6 dark:bg-neutral-900 dark:border-neutral-800">
                        <div className="grid grid-cols-2 gap-6">
                          {block.columns?.map((col, k) => (
                            <div key={k}>
                              <h3 className="text-lg! text-[#ED1F24] px-3 py-2 mb-2">
                                {col.title}
                              </h3>
                              <ul className="space-y-2">
                                {col.links?.map((linkItem, l) => (
                                  <li key={l}>
                                    <CMSLink
                                      link={linkItem.link}
                                      onClick={() => setOpenDropdown(null)}
                                      className="block px-3 py-2 text-sm text-slate-700 hover:bg-[#ED1F24]/5 hover:text-[#ED1F24] rounded transition-colors dark:text-neutral-200 dark:hover:bg-neutral-800"
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              return null
            })}

            {headerActions.length > 0 ? (
              headerActions.map((action, index) => (
                <CMSLink
                  key={`${action.link?.label || 'header-action'}-${index}`}
                  link={action.link}
                  className={getActionClassName(action.style)}
                />
              ))
            ) : (
              <Link
                href={branding?.enrollButton?.link || '/courses'}
                className={getActionClassName('primary')}
              >
                {branding?.enrollButton?.label || 'Enroll Now'}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 dark:text-neutral-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 max-h-[calc(100vh-80px)] overflow-y-auto dark:bg-neutral-900 dark:border-neutral-800">
          <div className="px-4 py-4 space-y-2">
            {/* Dynamic Mobile Navigation */}
            {headerData?.navigation?.navItems?.map((block, i) => {
              // LINK Block
              if (block.blockType === 'link') {
                return (
                  <CMSLink
                    key={i}
                    link={block.link}
                    className="block text-slate-700 hover:text-[#ED1F24] transition-colors py-2 dark:text-neutral-200"
                    onClick={() => setIsOpen(false)}
                  />
                )
              }

              // DROPDOWN Block
              if (block.blockType === 'dropdown') {
                return (
                  <div key={i}>
                    <button
                      onClick={() => toggleMobileDropdown(block.id || `dropdown-${i}`)}
                      className="w-full flex items-center justify-between text-slate-700 hover:text-[#ED1F24] transition-colors py-2 dark:text-neutral-200"
                    >
                      {block.title}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileOpenDropdown === (block.id || `dropdown-${i}`) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileOpenDropdown === (block.id || `dropdown-${i}`) && (
                      <div className="pl-4 space-y-1 mt-1">
                        {block.items?.map((item, j) => (
                          <CMSLink
                            key={j}
                            link={item.link}
                            className="block text-sm text-slate-600 hover:text-[#ED1F24] transition-colors py-2 dark:text-neutral-400"
                            onClick={() => setIsOpen(false)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              // MEGA MENU Block
              if (block.blockType === 'mega-menu') {
                return (
                  <div key={i}>
                    <button
                      onClick={() => toggleMobileDropdown(block.id || `mega-${i}`)}
                      className="w-full flex items-center justify-between text-slate-700 hover:text-[#ED1F24] transition-colors py-2 dark:text-neutral-200"
                    >
                      {block.title}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileOpenDropdown === (block.id || `mega-${i}`) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileOpenDropdown === (block.id || `mega-${i}`) && (
                      <div className="pl-4 space-y-3 mt-1">
                        {block.columns?.map((col, k) => (
                          <div key={k}>
                            <p className="text-xs text-[#ED1F24] uppercase tracking-wide mb-1">
                              {col.title}
                            </p>
                            {col.links?.map((linkItem, l) => (
                              <CMSLink
                                key={l}
                                link={linkItem.link}
                                className="block text-sm text-slate-600 hover:text-[#ED1F24] transition-colors py-1.5 pl-2"
                                onClick={() => setIsOpen(false)}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return null
            })}

            <Link
              href="/notes-guides"
              className="block text-slate-700 hover:text-[#ED1F24] transition-colors py-2 dark:text-neutral-200"
              onClick={() => setIsOpen(false)}
            >
              Notes & Guides
            </Link>

            <Link
              href="/contact"
              className="block text-slate-700 hover:text-[#ED1F24] transition-colors py-2 dark:text-neutral-200"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {headerActions.length > 0 ? (
              headerActions.map((action, index) => (
                <CMSLink
                  key={`${action.link?.label || 'mobile-header-action'}-${index}`}
                  link={action.link}
                  className={`block w-full px-6 py-2 rounded-lg transition-colors text-center mt-4 ${
                    action.style === 'secondary'
                      ? 'border border-[#ED1F24] text-[#ED1F24] hover:bg-[#ED1F24]/5'
                      : 'bg-[#ED1F24] text-white hover:bg-[#d11b20]'
                  }`}
                  onClick={() => setIsOpen(false)}
                />
              ))
            ) : (
              <Link
                href={branding?.enrollButton?.link || '/courses'}
                className="block w-full px-6 py-2 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors text-center mt-4"
                onClick={() => setIsOpen(false)}
              >
                {branding?.enrollButton?.label || 'Enroll Now'}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
