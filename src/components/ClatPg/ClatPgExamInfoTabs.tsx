'use client'

import React, { useState } from 'react'
import { ChevronRight, CheckCircle2, BookOpen, Calendar, Scale, GraduationCap, FileText } from 'lucide-react'

interface DetailItem {
  label: string
  text: string
}

interface TabContent {
  id: string
  title: string
  icon: React.ElementType
  summary: string
  bullets: string[]
  details: DetailItem[]
}

interface ClatPgExamInfoTabsProps {
  title?: string
  subtitle?: string
  tabs?: any[]
}

const iconMap: Record<string, React.ElementType> = {
  book: BookOpen,
  graduation: GraduationCap,
  calendar: Calendar,
  scale: Scale,
  file: FileText,
}

const defaultTabs: TabContent[] = [
  {
    id: 'tab-about',
    title: 'About CLAT PG',
    icon: BookOpen,
    summary:
      'The Common Law Admission Test for Post Graduation (CLAT PG) is a national-level entrance exam conducted by the Consortium of NLUs for admission to LL.M. degree programs offered by 24 participating National Law Universities across India.',
    bullets: [
      'CLAT PG scores are also utilized by top Public Sector Undertakings (PSUs) like BHEL, ONGC, NTPC, and IOCL for recruitment of legal officers.',
      'The exam focuses heavily on objective passage-based legal comprehension and analytical skills.',
    ],
    details: [
      { label: 'CONDUCTING BODY', text: 'Consortium of National Law Universities (NLUs)' },
      { label: 'EXAM LEVEL', text: 'National Level Postgraduate (LL.M.)' },
      { label: 'EXAM MODE', text: 'Offline (Pen-and-Paper Test)' },
      { label: 'DURATION', text: '120 Minutes (2 Hours)' },
      { label: 'LANGUAGE', text: 'English' },
    ],
  },
  {
    id: 'tab-eligibility',
    title: 'CLAT PG Eligibility',
    icon: GraduationCap,
    summary:
      'Candidates must hold an LL.B. degree or an equivalent law degree from a recognized university with a minimum percentage requirement.',
    bullets: [
      'Minimum 50% marks for General/OBC/PWD/NRI categories, and 45% marks for SC/ST categories.',
      'Candidates appearing for their final year LL.B. examination are also eligible to apply.',
    ],
    details: [
      { label: 'MINIMUM MARKS', text: '50% General / 45% SC-ST' },
      { label: 'AGE LIMIT', text: 'No Upper Age Limit' },
    ],
  },
  {
    id: 'tab-dates',
    title: 'CLAT PG Exam Date',
    icon: Calendar,
    summary:
      'CLAT PG is held annually in December for admissions to the upcoming academic session.',
    bullets: [
      'Exam Date: Usually First Sunday of December.',
      'Application Window: August to November annually.',
    ],
    details: [
      { label: 'FREQUENCY', text: 'Once a Year (December)' },
      { label: 'APPLICATION MODE', text: 'Online Portal (consortiumofnlus.ac.in)' },
    ],
  },
  {
    id: 'tab-subjects',
    title: 'Subjects in CLAT PG',
    icon: Scale,
    summary:
      'Exhaustive syllabus covering major mandatory Undergraduate Law subjects.',
    bullets: [
      'Constitutional Law, Jurisprudence, Administrative Law, Law of Contract, Torts, Family Law, Criminal Law.',
      'International Law, Company Law, Intellectual Property Rights (IPR), Environment Law, and Tax Law.',
    ],
    details: [
      { label: 'PRIMARY WEIGHTAGE', text: 'Constitutional Law & Jurisprudence' },
      { label: 'QUESTION TYPE', text: 'Passage-based MCQs' },
    ],
  },
  {
    id: 'tab-pattern',
    title: 'CLAT PG Exam Pattern',
    icon: FileText,
    summary:
      'Objective comprehension passage-based test consisting of 120 multiple choice questions.',
    bullets: [
      '120 MCQs based on extracts/passages from legal judgments and legislative acts.',
      'Marking Scheme: +1 mark for correct answer, -0.25 mark negative marking for wrong answers.',
    ],
    details: [
      { label: 'TOTAL QUESTIONS', text: '120 MCQs' },
      { label: 'NEGATIVE MARKING', text: '0.25 Marks Per Wrong Answer' },
    ],
  },
]

export const ClatPgExamInfoTabs: React.FC<ClatPgExamInfoTabsProps> = ({
  title = 'Information About CLAT PG Exam',
  subtitle = 'Everything you need to know about eligibility, exam structure, syllabus, dates, and opportunities.',
  tabs,
}) => {
  const displayTabs: TabContent[] =
    Array.isArray(tabs) && tabs.length > 0
      ? tabs.map((t, i) => ({
          id: t.tabId || `tab-${i}`,
          title: t.title || 'Exam Info',
          icon: (typeof t.icon === 'string' ? iconMap[t.icon.toLowerCase()] : t.icon) || BookOpen,
          summary: t.summary || '',
          bullets: Array.isArray(t.bullets)
            ? t.bullets.map((b: any) => (typeof b === 'object' ? b.bullet : b))
            : [],
          details: Array.isArray(t.details) ? t.details : [],
        }))
      : defaultTabs

  const [activeTabId, setActiveTabId] = useState(displayTabs[0]?.id || '')

  const activeTab = displayTabs.find((t) => t.id === activeTabId) || displayTabs[0]

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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
        )}

        {/* Tabbed Layout */}
        {displayTabs.length > 0 && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tab Buttons List */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {displayTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab?.id === tab.id

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl font-bold text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-[#ED1F24] text-white shadow-xl shadow-[#ED1F24]/20 scale-[1.02]'
                        : 'bg-slate-50 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#ED1F24]'}`} />
                      <span className="text-base sm:text-lg tracking-tight">{tab.title}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-slate-400'}`} />
                  </button>
                )
              })}
            </div>

            {/* Right Active Content Panel */}
            {activeTab && (
              <div className="lg:col-span-8 bg-slate-50 dark:bg-neutral-800/60 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-neutral-700/80 shadow-lg min-h-[400px] flex flex-col justify-between">
                <div className="space-y-6">
                  
                  {/* Tab Title & Summary */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                      {activeTab.title}
                    </h3>
                    {activeTab.summary && (
                      <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
                        {activeTab.summary}
                      </p>
                    )}
                  </div>

                  {/* Highlight Bullets List */}
                  {activeTab.bullets && activeTab.bullets.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#ED1F24]">
                        KEY HIGHLIGHTS & REQUIREMENTS:
                      </p>
                      <div className="space-y-2.5">
                        {activeTab.bullets.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-700 dark:text-neutral-200 font-medium">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key-Value Details Cards Grid */}
                  {activeTab.details && activeTab.details.length > 0 && (
                    <div className="pt-4 border-t border-slate-200 dark:border-neutral-700">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {activeTab.details.map((detail, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-slate-200/60 dark:border-neutral-700">
                            <p className="text-xs font-bold text-slate-400 dark:text-neutral-400 uppercase tracking-wider">
                              {detail.label}
                            </p>
                            <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-1">
                              {detail.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  )
}
