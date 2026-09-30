'use client'

import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  MessageCircle,
  Globe,
  HeadphonesIcon,
  Building2,
  Users,
  Calendar,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import type { Form as FormType } from '@/payload-types'

import { Branding, ContactPage, Footer } from '@/payload-types'

export function Contact({
  form,
  branding,
  contactPage,
  footerData,
}: {
  form: FormType | null
  branding?: Branding
  contactPage?: ContactPage
  footerData?: Footer
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-16 relative overflow-hidden dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 dark:hidden"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-white mb-6">{contactPage?.heroTitle}</h1>
            <p className="text-xl text-slate-300 mb-8 dark:text-neutral-300">
              {contactPage?.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {footerData?.contactInfo?.phone && (
                <a
                  href={`tel:${footerData.contactInfo.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors font-medium"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              )}
              {footerData?.contactInfo?.phone && (
                <a
                  href={
                    footerData?.contactInfo?.phone
                      ? `https://wa.me/${footerData.contactInfo.phone.replace(/\D/g, '')}`
                      : '#'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 dark:bg-neutral-950 dark:border-neutral-800">
              <div className="mb-8">
                <h2 className="text-slate-900 mb-3 dark:text-white">{contactPage?.formTitle}</h2>
                <p className="text-slate-600 dark:text-neutral-400">
                  {contactPage?.formDescription}
                </p>
              </div>

              {form && (
                <div className="mb-0">
                  <FormBlock form={form as any} enableIntro={false} />
                </div>
              )}
            </div>

            {/* Map Section */}
            <div className="mt-8 bg-white border-2 border-slate-200 rounded-2xl overflow-hidden dark:bg-neutral-950 dark:border-neutral-800">
              <div className="p-6 border-b border-slate-200 dark:border-neutral-800">
                <h3 className="text-slate-900 flex items-center gap-2 dark:text-white">
                  <MapPin className="w-5 h-5 text-[#ED1F24]" />
                  Our Location
                </h3>
              </div>
              <div className="aspect-video bg-slate-100 dark:bg-neutral-800">
                {contactPage?.mapUrl && (
                  <iframe
                    src={contactPage.mapUrl}
                    width="100%"
                    height="100%"
                    className="dark:invert-[0.9] dark:hue-rotate-180 dark:contrast-125 dark:brightness-90 transition-all duration-300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Contact Info Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Information Removed as requested */}

              {/* Quick Support */}
              <div className="bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center dark:bg-green-900/50">
                    <HeadphonesIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg! text-slate-900! mb-0! dark:text-white!">
                      {contactPage?.quickSupportTitle}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-700 text-sm mb-4 dark:text-neutral-300">
                  {contactPage?.quickSupportDescription}
                </p>
                <a
                  href={`https://wa.me/${footerData?.contactInfo?.phone?.replace(/\D/g, '') || ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-green-600 text-white text-center rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {contactPage?.quickSupportButtonLabel}
                </a>
              </div>

              {/* Visit Us */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 dark:bg-neutral-950 dark:border-neutral-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#ED1F24]/10 rounded-xl flex items-center justify-center dark:bg-[#ED1F24]/20">
                    <Building2 className="w-6 h-6 text-[#ED1F24]" />
                  </div>
                  <div>
                    <h3 className="text-lg! text-slate-900! mb-0! dark:text-white!">
                      {contactPage?.visitUsTitle}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-700 text-sm mb-4 dark:text-neutral-300">
                  {contactPage?.visitUsDescription}
                </p>
                <a
                  href={`tel:${footerData?.contactInfo?.phone?.replace(/\s+/g, '')}`}
                  className="w-full py-3 bg-slate-900 text-white text-center rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 dark:bg-neutral-700 dark:hover:bg-neutral-100"
                >
                  <Calendar className="w-5 h-5" />
                  {contactPage?.visitUsButtonLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 py-16 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-slate-900 mb-4 dark:text-white">{contactPage?.faqTitle}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto dark:text-neutral-400">
              {/* Optional: Add subtitle field to ContactPage global if desired, otherwise leave dynamic or remove hardcoded text */}
            </p>
          </div>

          {contactPage?.faqs && contactPage.faqs.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-4">
              {contactPage.faqs.map((faqData: any, index: number) => {
                if (typeof faqData !== 'object' || !faqData) return null
                const faq = faqData as any // Simplified for now, or use Faq type
                return (
                  <details
                    key={index}
                    className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow dark:bg-neutral-900 dark:border-neutral-800"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <span className="font-medium text-slate-900 pr-4 dark:text-white">
                        {faq.question}
                      </span>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform shrink-0 dark:text-neutral-500" />
                    </summary>
                    <div className="px-6 pb-6 text-slate-600 dark:text-neutral-400 whitespace-pre-wrap">
                      {faq.answer}
                    </div>
                  </details>
                )
              })}
            </div>
          ) : (
            <div className="text-center text-slate-500">No FAQs available yet.</div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-16 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[#ED1F24]" />
            <h2 className="text-white mb-0!">{contactPage?.ctaTitle}</h2>
          </div>
          <p className="text-xl text-slate-300 mb-8 dark:text-neutral-300">
            {contactPage?.ctaDescription}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={branding?.enrollButton?.link || '/courses'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors font-medium"
            >
              {branding?.enrollButton?.label || 'Enroll Now'}
            </a>
            <Link
              href="/courses"
              className="px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors font-medium dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
