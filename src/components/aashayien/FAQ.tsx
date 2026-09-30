'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
}

export function FAQ({ data }: { data?: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Extract data with fallbacks
  const title = data?.title || 'Frequently Asked Questions'
  const description =
    data?.description ||
    "Got questions? We've got answers! Here are some common queries from judiciary aspirants."

  // Transform selectedFaqs to FAQItem[]
  // The relationTo 'faqs' will return full objects if populated, or IDs if not.
  // Assuming depth is sufficient (default is usually 2 for globals which should cover it).
  const faqs: FAQItem[] = Array.isArray(data?.selectedFaqs)
    ? data.selectedFaqs.map((item: any) => {
        // Handle if item is { value: id, relationTo: 'faqs' } or just the doc
        const faqDoc = item.value || item
        return {
          question: faqDoc.question || '',
          answer: faqDoc.answer || '',
        }
      })
    : []

  // If no FAQs selected, don't render section? Or render empty?
  // User asked "without changing the design", so if no data, maybe fallback to static?
  // "I want to make a seperate list of faqs and user can select what faqs need to added"
  // Implies if they select nothing, nothing shows, or we show nothing.
  // Let's hide if empty to avoid broken UI.
  if (faqs.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-red-100 rounded-full mb-4">
            <span className="text-[#ED1F24] font-bold">FAQs</span>
          </div>
          <h2 className="text-slate-900 mb-4 font-bold text-center">{title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-[#ED1F24]/30 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <HelpCircle className="w-6 h-6 text-[#ED1F24] shrink-0 mt-1" />
                  <span className="text-slate-900 font-bold">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-slate-400 shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 pt-2">
                  <div className="pl-10">
                    <p className="text-slate-600 leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4 font-medium">
            Still have questions? We&apos;re here to help!
          </p>
          <Link
            href={'/contact'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#ED1F24] to-[#d11b20] text-white rounded-xl hover:from-[#d11b20] hover:to-[#b81619] transition-all shadow-lg hover:shadow-xl font-bold"
          >
            <HelpCircle className="w-6 h-6" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
