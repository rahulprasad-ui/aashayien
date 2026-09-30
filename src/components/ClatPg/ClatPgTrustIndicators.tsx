'use client'

import React from 'react'
import { Trophy, Users, BookOpen, Clock, ShieldCheck, HeartHandshake, FileText, Target } from 'lucide-react'

interface ClatPgTrustIndicatorsProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  cards?: any[]
}

const iconMap: Record<string, React.ElementType> = {
  trophy: Trophy,
  shield: ShieldCheck,
  users: Users,
  clock: Clock,
  heart: HeartHandshake,
  'heart-handshake': HeartHandshake,
  book: BookOpen,
  'book-open': BookOpen,
  'file-text': FileText,
  target: Target,
}

const defaultCards = [
  {
    title: 'Proven Track Record',
    description: 'Consistently producing Single & Double-digit Ranks in CLAT PG & AILET PG exams over past years.',
    icon: 'trophy',
  },
  {
    title: 'Top NLU Faculty',
    description: 'Learn directly from LL.M rankers, former judicial officers, and top National Law University academicians.',
    icon: 'users',
  },
  {
    title: 'Passage Analysis Mastery',
    description: 'Specialized focus on Supreme Court landmark judgments, constitutional amendments, and recent legal developments.',
    icon: 'file-text',
  },
  {
    title: 'Comprehensive Mock Series',
    description: '40+ full-length and sectional mocks simulated on the exact recent CLAT PG exam pattern with detailed analysis.',
    icon: 'target',
  },
  {
    title: '1:1 Personal Mentorship',
    description: 'Regular strategy calls, study plan customization, and 24x7 doubt resolution by expert mentors.',
    icon: 'heart',
  },
  {
    title: 'Curated LL.M Study Material',
    description: 'Exhaustive subject-wise notes, case law summaries, jurisprudence modules, and monthly legal updates.',
    icon: 'book',
  },
]

export const ClatPgTrustIndicators: React.FC<ClatPgTrustIndicatorsProps> = ({
  eyebrow = 'WHY CHOOSE US',
  title = 'The Bridge to Your Dream NLU',
  subtitle = "Why Aashayein Judiciary is India's most trusted learning platform for CLAT PG & LL.M Preparation.",
  cards,
}) => {
  const displayCards = Array.isArray(cards) && cards.length > 0 ? cards : defaultCards

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {eyebrow && (
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#ED1F24] mb-2">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg mt-3">
              {subtitle}
            </p>
          )}
        </div>

        {/* 3x2 Dynamic Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayCards.map((card, idx) => {
            const iconKey = typeof card.icon === 'string' ? card.icon.toLowerCase() : ''
            const Icon = iconMap[iconKey] || Trophy
            return (
              <div
                key={idx}
                className="group p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800 hover:border-[#ED1F24]/40 hover:shadow-xl hover:shadow-[#ED1F24]/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-neutral-800 shadow-md border border-slate-200/60 dark:border-neutral-700 flex items-center justify-center text-[#ED1F24] group-hover:bg-[#ED1F24] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#ED1F24] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
