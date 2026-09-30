'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

interface ClatPgFaqAccordionProps {
  badgeText?: string
  title?: string
  subtitle?: string
  selectedFaqs?: any[]
  customFaqs?: any[]
}

const defaultFaqs: FaqItem[] = [
  {
    question: 'How to Prepare for CLAT PG effectively?',
    answer:
      'Effective CLAT PG preparation requires in-depth analysis of recent landmark judgment passages, systematic coverage of Constitutional Law and Jurisprudence, practicing past year question papers, and taking simulated full-length mock tests.',
  },
  {
    question: 'What are the benefits of Online Coaching for CLAT PG?',
    answer:
      'Online coaching provides live interactive classes by expert NLU faculty, flexible study schedules, 24x7 doubt resolution, comprehensive digital and hard copy study materials, and subject-wise percentile analytics.',
  },
  {
    question: 'What advantages do I get with Aashayein Judiciary CLAT PG Coaching?',
    answer:
      'Aashayein Judiciary offers 1:1 personal mentorship by top NLU rankers, exhaustive passage-based analytical workshops, curated landmark judgment summaries, and high-yielding test series designed specifically for CLAT LL.M and AILET PG.',
  },
  {
    question: 'Who must join CLAT PG Online Coaching by Aashayein Judiciary?',
    answer:
      'Law undergraduates in their final or pre-final year aiming for AIR 1 in CLAT PG, practicing advocates seeking LL.M admission at top NLUs, and PSU aspirants targeting legal officer jobs in BHEL, ONGC, and IOCL.',
  },
  {
    question: 'Is there any negative marking in the CLAT PG exam?',
    answer:
      'Yes, CLAT PG has a negative marking scheme. Each correct answer carries +1 mark, and 0.25 marks are deducted for every incorrect answer. There is no penalty for unattempted questions.',
  },
]

export const ClatPgFaqAccordion: React.FC<ClatPgFaqAccordionProps> = ({
  badgeText = 'FREQUENTLY ASKED QUESTIONS',
  title = 'CLAT PG Coaching FAQs',
  subtitle = 'Frequently asked questions about CLAT PG preparation, eligibility, and online coaching at Aashayein Judiciary.',
  selectedFaqs,
  customFaqs,
}) => {
  let displayFaqs: FaqItem[] = []

  if (customFaqs && customFaqs.length > 0) {
    displayFaqs = customFaqs.map((f) => ({
      question: f.question,
      answer: f.answer,
    }))
  } else if (selectedFaqs && selectedFaqs.length > 0) {
    displayFaqs = selectedFaqs.map((f) => ({
      question: f.question,
      answer: f.answer,
    }))
  } else {
    displayFaqs = defaultFaqs
  }

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  // Generate FAQPage JSON-LD Schema for rich snippet eligibility
  const faqSchema =
    displayFaqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: displayFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <section className="py-16 lg:py-24 bg-slate-50 dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800">
      {/* Inject FAQ JSON-LD Schema for Crawlers */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/40 text-[#ED1F24] text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>{badgeText}</span>
            </div>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg mt-2 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Accordion Stack */}
        {displayFaqs.length > 0 && (
          <div className="space-y-4">
            {displayFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-neutral-800 border border-slate-200/80 dark:border-neutral-700/80 overflow-hidden shadow-sm hover:border-[#ED1F24]/40 transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:text-[#ED1F24] transition-colors"
                  >
                    <span className="text-base sm:text-lg pr-2 leading-snug">{faq.question}</span>
                    <div
                      className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-neutral-700 flex items-center justify-center text-slate-500 dark:text-neutral-300 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#ED1F24] text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-slate-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-neutral-700/50 mt-1">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
