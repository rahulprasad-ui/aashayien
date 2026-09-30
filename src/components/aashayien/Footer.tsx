import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Send, Apple } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import type { Branding, Footer as FooterType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface FooterProps {
  branding?: Branding
  footerData?: FooterType
}

export function Footer({ branding, footerData }: FooterProps) {
  const logoUrl =
    branding?.brandAssets?.logo && typeof branding.brandAssets.logo === 'object'
      ? getMediaUrl(branding.brandAssets.logo.url || '') || '/assets/aashayien/logo.png'
      : '/assets/aashayien/logo.png'

  const copyrightText = footerData?.bottomNav?.copyright
    ? footerData.bottomNav.copyright.replace('{year}', new Date().getFullYear().toString())
    : `© ${new Date().getFullYear()} Aashayein Judiciary. All rights reserved.`

  const socialIconMap = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin,
    telegram: Send, // Using Send for Telegram as replacement
  }

  return (
    <footer className="bg-slate-900 text-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <Image
                src={logoUrl}
                alt={branding?.siteMeta?.title || 'Aashayein Judiciary'}
                width={200}
                height={64}
                className="h-16 w-auto brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-white/70 mb-6 font-medium text-sm leading-relaxed">
              {footerData?.brandDescription ||
                "India's premier judiciary coaching platform helping thousands of aspirants achieve their dreams of becoming judicial officers."}
            </p>
            <div className="flex items-center gap-3">
              {footerData?.socialLinks?.map((social, index) => {
                const Icon = socialIconMap[social.platform as keyof typeof socialIconMap] || Link
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-[#ED1F24] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    {Icon !== Link && <Icon className="w-4 h-4" />}
                  </a>
                )
              })}
            </div>

            {/* App Links */}
            {(footerData as any)?.appLinks &&
              ((footerData as any).appLinks.android || (footerData as any).appLinks.ios) && (
                <div className="mt-8 flex items-center gap-3">
                  {(footerData as any).appLinks.android && (
                    <a
                      href={(footerData as any).appLinks.android}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#ED1F24]/30 transition-all duration-300 group shrink-0 min-w-[155px]"
                    >
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-white group-hover:fill-[#ED1F24] transition-colors"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.523 15.3414c-.5511 0-.9977-.4466-.9977-.9977s.4466-.9977.9977-.9977c.5512 0 .9978.4466.9978.9977s-.4466.9977-.9978.9977m-11.046 0c-.5511 0-.9977-.4466-.9977-.9977s.4466-.9977.9977-.9977c.5512 0 .9978.4466.9978.9977s-.4466.9977-.9978.9977m11.4045-6.0273l1.9973-3.4592a.4158.4158 0 00-.1521-.5674.4158.4158 0 00-.5674.1521l-2.0223 3.503c-1.5435-.7025-3.2624-1.0963-5.137-1.0963-1.8745 0-3.5935.3938-5.137 1.0963l-2.0224-3.503a.4158.4158 0 00-.5674-.1521.4158.4158 0 00-.152.5674l1.9972 3.4592C2.6701 11.2335.3333 14.1501.3333 17.5833h23.3334c0-3.4332-2.3368-6.3498-5.8334-8.2692" />
                        </svg>
                      </div>
                      <div className="text-left whitespace-nowrap">
                        <div className="text-[10px] text-white/40 leading-none mb-0.5">Get it on</div>
                        <div className="text-xs font-bold text-white tracking-tight">Google Play</div>
                      </div>
                    </a>
                  )}
                  {(footerData as any).appLinks.ios && (
                    <a
                      href={(footerData as any).appLinks.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#ED1F24]/30 transition-all duration-300 group shrink-0 min-w-[155px]"
                    >
                      <Apple className="w-6 h-6 text-white group-hover:text-[#ED1F24] transition-colors shrink-0" />
                      <div className="text-left whitespace-nowrap">
                        <div className="text-[10px] text-white/40 leading-none mb-0.5">
                          Download on the
                        </div>
                        <div className="text-xs font-bold text-white tracking-tight">App Store</div>
                      </div>
                    </a>
                  )}
                </div>
              )}
          </div>

          {/* Courses */}
          <div className="lg:col-span-2">
            <h3 className="text-white mb-6 font-bold text-base uppercase tracking-wider">Courses</h3>
            <ul className="space-y-3 text-sm">
              {(footerData as any)?.courses?.map((item: any, index: number) => (
                <li key={index}>
                  <CMSLink
                    {...(item.link as any)}
                    className="text-white/70 hover:text-[#ED1F24] transition-colors font-medium flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ED1F24] mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.link.label}
                  </CMSLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Resources & Landing Pages */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-white mb-6 font-bold text-base uppercase tracking-wider">Free Resources</h3>
              <ul className="space-y-3 text-sm">
                {(footerData as any)?.freeResources?.map((item: any, index: number) => (
                  <li key={index}>
                    <CMSLink
                      {...(item.link as any)}
                      className="text-white/70 hover:text-[#ED1F24] transition-colors font-medium flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ED1F24] mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.link.label}
                    </CMSLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* About & Info */}
          <div className="lg:col-span-2">
            <h3 className="text-white mb-6 font-bold text-base uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
              {(footerData as any)?.companyLinks?.map((item: any, index: number) => (
                <li key={index}>
                  <CMSLink
                    {...(item.link as any)}
                    className="text-white/70 hover:text-[#ED1F24] transition-colors font-medium flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ED1F24] mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.link.label}
                  </CMSLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white mb-6 font-bold text-base uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              {footerData?.contactInfo?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                  <span className="text-white/70 font-medium whitespace-pre-line leading-relaxed">
                    {footerData.contactInfo.address}
                  </span>
                </li>
              )}
              {footerData?.contactInfo?.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#ED1F24] shrink-0" />
                  <a
                    href={`tel:${footerData.contactInfo.phone}`}
                    className="text-white/70 hover:text-[#ED1F24] transition-colors font-medium"
                  >
                    {footerData.contactInfo.phone}
                  </a>
                </li>
              )}
              {footerData?.contactInfo?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#ED1F24] shrink-0" />
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${footerData.contactInfo.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#ED1F24] transition-colors font-medium break-words text-[13px]"
                  >
                    {footerData.contactInfo.email}
                  </a>
                </li>
              )}
            </ul>
            {footerData?.contactInfo?.officeHours && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-[#ED1F24] mb-2 font-bold text-xs uppercase tracking-tighter">Office Hours</div>
                <div className="text-white/60 text-xs font-medium whitespace-pre-line leading-relaxed">
                  {footerData.contactInfo.officeHours}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/50 text-xs text-center md:text-left font-medium">
              {copyrightText}
            </p>
            <div className="flex items-center gap-6 flex-wrap justify-center font-medium">
              {footerData?.bottomNav?.links?.map((item, index) => (
                <CMSLink
                  key={index}
                  {...(item.link as any)}
                  className="text-white/50 hover:text-[#ED1F24] text-xs transition-colors"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
