'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Download,
  FileText,
  BookOpen,
  ChevronRight,
  Award,
  TrendingUp,
  Bell,
  ExternalLink,
} from 'lucide-react'
import Image from 'next/image'

type PageType = 'judiciary' | 'adpo' | 'vacancies'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { SyllabusState, Vacancy, Branding, Popup } from '@/payload-types'
import { ResourceGateModal } from '../ResourceGateModal'

interface PayloadGlobal {
  heroSection?: {
    badgeText?: string
    title?: string
    description?: string
    stats?: { value: string; label: string }[]
  }
  commonSubjects?: {
    commonSubjectsTitle?: string
    commonSubjectsDescription?: string
    commonSubjectsList?: { category: string; subjects: string }[]
  }
  prelimsSyllabus?: {
    prelimsTitle?: string
    prelimsDescription?: string
    prelimsList?: { subject: string; topics: string }[]
  }
  mainsSyllabus?: {
    mainsTitle?: string
    mainsDescription?: string
    mainsList?: { paperName: string; subject: string; topics: string }[]
  }
  cta?: {
    enrollCta?: { title?: string; description?: string; buttonText?: string; buttonUrl?: string }
    demoCta?: { title?: string; description?: string; buttonText?: string; buttonUrl?: string }
  }
  [key: string]: any
}

interface SyllabusVacancyProps {
  cmsData?: PayloadGlobal
  cmsStates?: SyllabusState[]
  vacancies?: Vacancy[]
  branding?: Branding
  gatingConfig?: { enableGating?: boolean | null; gatingPopup?: string | Popup | null }
}

export function SyllabusVacancy({
  cmsData,
  cmsStates = [],
  vacancies = [],
  branding,
  gatingConfig,
}: SyllabusVacancyProps) {
  const [pageType, setPageType] = useState<PageType>('judiciary')
  const [isGateModalOpen, setIsGateModalOpen] = useState(false)
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tab = params.get('tab')
      if (tab === 'vacancies' || tab === 'adpo' || tab === 'judiciary') {
        setPageType(tab as PageType)
      }
    }
  }, [])

  const handleDownload = (e: React.MouseEvent, url: string) => {
    e.preventDefault()

    if (
      gatingConfig?.enableGating &&
      gatingConfig?.gatingPopup &&
      typeof gatingConfig.gatingPopup !== 'string'
    ) {
      setPendingDownloadUrl(url)
      setIsGateModalOpen(true)
    } else {
      window.location.href = url
    }
  }

  const handleGateSuccess = () => {
    setIsGateModalOpen(false)
    if (pendingDownloadUrl) {
      window.location.href = pendingDownloadUrl
      setPendingDownloadUrl(null)
    }
  }

  // Use CMS data or fallbacks
  const hero = cmsData?.heroSection
  const badgeText = hero?.badgeText || 'Complete Resource Hub for Judiciary Aspirants'
  const title = hero?.title || 'State-wise Judiciary Syllabus, Vacancy & Previous Papers'
  const description =
    hero?.description ||
    'Download comprehensive study material, check latest vacancies, and access previous year question papers for all major state judiciary exams.'
  const stats = hero?.stats || [
    { value: '11', label: 'States Covered' },
    { value: '1500+', label: 'Total Vacancies' },
    { value: '10+', label: 'Years of Papers' },
  ]

  const commonSubjects = cmsData?.commonSubjects
  const commonTitle = commonSubjects?.commonSubjectsTitle || 'Subjects in Judiciary Exams Syllabus'
  const commonDesc =
    commonSubjects?.commonSubjectsDescription ||
    "Here's a list of common subjects included in the Judiciary syllabus across most states:"
  const commonList = commonSubjects?.commonSubjectsList || [
    { category: 'General Knowledge', subjects: 'General Awareness' },
    { category: 'Language and Aptitude', subjects: 'English Language, Aptitude Test' },
    {
      category: 'Core Law Subjects',
      subjects:
        'Constitutional Law, Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), Indian Evidence Act, Civil Procedure Code (CPC), Indian Contract Act, Transfer of Property Act, Law of Torts',
    },
    { category: 'State-Specific Subjects', subjects: 'Local Laws (varies by state)' },
  ]

  const prelims = cmsData?.prelimsSyllabus
  const prelimsTitle = prelims?.prelimsTitle || 'Judiciary Exam Syllabus 2025 (Prelims)'
  const prelimsDesc =
    prelims?.prelimsDescription ||
    'Here is the syllabus for the Judiciary Prelims Exam, divided into specific subjects:'
  const prelimsList = prelims?.prelimsList || [
    {
      subject: 'General Knowledge',
      topics:
        'Current Affairs (National and International), Indian History and Culture, Indian Polity and Economy, Geography, Science and Technology, Important Dates and Events',
    },
    {
      subject: 'Proficiency in English Language and Aptitude',
      topics:
        'Vocabulary (Synonyms, Antonyms), Grammar (Tenses, Prepositions, Articles), Comprehension (Passage-based Questions), Sentence Correction, Logical Reasoning and Analytical Ability, Basic Numerical Ability (Percentages, Ratios, Simple Interest)',
    },
    {
      subject: 'Constitutional Law',
      topics:
        'Preamble, Fundamental Rights, Duties, Directive Principles of State Policy, Union and State Legislature and Executive, Judiciary in India (Supreme Court, High Courts), Amendment Procedures, Constitutional Bodies (CAG, Election Commission, etc.), Indian Penal Code (IPC): General Principles, Offences Against Body, Property, Code of Criminal Procedure (CrPC): Investigation, Arrest, Bail, Trial Procedures, Prevention of Corruption Act, Indian Evidence Act (Relevant Sections)',
    },
  ]

  const mains = cmsData?.mainsSyllabus
  const mainsTitle = mains?.mainsTitle || 'Judiciary Exam Syllabus 2025 (Mains)'
  const mainsDesc =
    mains?.mainsDescription ||
    "Here's the syllabus for the Judiciary Mains Exam presented in tabular form:"
  const mainsList = mains?.mainsList || [
    {
      paperName: 'Paper I',
      subject: 'Essay, Precise Writing, Grammar',
      topics:
        'Essay Writing: Topics on law, current affairs, social issues, Precise Writing: Summarizing passages, Grammar: Sentence correction, tenses, prepositions, punctuation',
    },
    {
      paperName: 'Paper II',
      subject: 'Objective Test, Aptitude Test',
      topics:
        'Objective Test: Legal knowledge, current affairs, reasoning, Aptitude Test: Logical reasoning, quantitative aptitude, analytical skills',
    },
  ]

  const cta = cmsData?.cta
  const enroll = cta?.enrollCta
  const demo = cta?.demoCta

  const enrollTitle = enroll?.title || 'Start Your Preparation'
  const enrollDesc =
    enroll?.description ||
    'Join 50,000+ successful aspirants with expert guidance and comprehensive study material'
  const enrollBtn = enroll?.buttonText || branding?.enrollButton?.label || 'Enroll Now'
  const enrollUrl = enroll?.buttonUrl || branding?.enrollButton?.link || '/courses'

  const demoTitle = demo?.title || 'Book Free Demo Class'
  const demoDesc =
    demo?.description ||
    'Experience our teaching methodology and course structure from expert faculty'
  const demoBtn = demo?.buttonText || 'Book Free Demo'
  const demoUrl = demo?.buttonUrl || 'https://forms.gle/PFwih1FLnubDcZD38'

  // Helper to extract image URL
  const getImageUrl = (image: SyllabusState['image'] | any) => {
    if (typeof image === 'string') return getMediaUrl(image)
    if (image && typeof image === 'object' && 'url' in image) return getMediaUrl(image.url)
    return ''
  }

  // Filter display items based on pageType
  const filteredStates = cmsStates.filter((s) => {
    if (pageType === 'judiciary') return s.type === 'judiciary' || !s.type
    if (pageType === 'adpo') return s.type === 'adpo'
    return false // For 'vacancies' we don't show states list directly, or maybe filter nothing
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-linear-to-br from-slate-900 via-[#1a1a2e] to-slate-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED1F24]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ED1F24]/10 border border-[#ED1F24]/20 rounded-full mb-6">
              <Award className="w-4 h-4 text-[#ED1F24]" />
              <span className="text-sm text-white">{badgeText}</span>
            </div>

            <h1 className="text-white mb-6 leading-tight">{title}</h1>

            <p className="text-xl text-slate-300 mb-10 leading-relaxed">{description}</p>

            {/* Toggle Buttons */}
            <div className="inline-flex items-center gap-3 p-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-x-auto max-w-full">
              <button
                onClick={() => setPageType('judiciary')}
                className={`px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                  pageType === 'judiciary'
                    ? 'bg-linear-to-r from-[#ED1F24] to-[#d11b20] text-white shadow-lg shadow-red-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">Judiciary Syllabus</span>
                </div>
              </button>
              <button
                onClick={() => setPageType('adpo')}
                className={`px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                  pageType === 'adpo'
                    ? 'bg-linear-to-r from-[#ED1F24] to-[#d11b20] text-white shadow-lg shadow-red-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">ADPO Syllabus</span>
                </div>
              </button>
              <button
                onClick={() => setPageType('vacancies')}
                className={`px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                  pageType === 'vacancies'
                    ? 'bg-linear-to-r from-[#ED1F24] to-[#d11b20] text-white shadow-lg shadow-red-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  <span className="font-semibold">Vacancies</span>
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Content Section: Either State Cards (Judiciary/ADPO) or Vacancies List */}
        {pageType === 'vacancies' ? (
          // VACANCIES LIST
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {vacancies.length > 0 ? (
              vacancies.map((vacancy) => {
                // Try to get image from related state
                const relatedState = vacancy.state as SyllabusState
                const imageUrl = relatedState ? getImageUrl(relatedState.image) : ''
                const fallbackImage =
                  'https://images.unsplash.com/photo-1752697589128-f8e110a86af3?w=600'
                const displayImage = imageUrl || fallbackImage

                return (
                  <div
                    key={vacancy.id}
                    className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all"
                  >
                    {/* Image */}
                    <Link
                      href={`/vacancy/${vacancy.id}`}
                      className="block relative h-48 overflow-hidden"
                    >
                      <Image
                        src={displayImage}
                        alt={vacancy.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <div className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-md">
                          <span className="font-semibold text-slate-900 text-sm truncate max-w-[150px]">
                            {vacancy.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1 bg-[#ED1F24] rounded-md">
                          <span className="text-xs font-medium text-white">{vacancy.tag}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      <Link href={`/vacancy/${vacancy.id}`}>
                        <h3 className="text-base! text-slate-900 mb-2 group-hover:text-[#ED1F24] transition-colors line-clamp-2">
                          {vacancy.title}
                        </h3>
                      </Link>

                      <p className="text-sm text-slate-500 mb-4">{vacancy.date}</p>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/vacancy/${vacancy.id}`}
                          className="flex items-center justify-center h-11 bg-[#ED1F24] text-white rounded-md hover:bg-[#d11b20] transition-colors"
                          title="View Details"
                        >
                          <BookOpen className="w-5 h-5 mr-2" /> Details
                        </Link>
                        {vacancy.link && (
                          <a
                            href={vacancy.link}
                          target="_self"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center h-11 border border-slate-300 text-slate-700 rounded-md hover:border-slate-400 hover:bg-slate-50 transition-colors"
                            title="Download/Link"
                            onClick={(e) => handleDownload(e, vacancy.link!)}
                          >
                            <ExternalLink className="w-5 h-5 mr-2" /> Open
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full py-20 text-center">
                <h3 className="text-slate-500 text-lg">No active vacancies found.</h3>
              </div>
            )}
          </div>
        ) : (
          // STATE CARDS (Judiciary/ADPO)
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredStates.length > 0 ? (
              filteredStates.map((state) => {
                const imageUrl =
                  getImageUrl(state.image) ||
                  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600' // Fallback image
                return (
                  <div
                    key={state.code || state.id}
                    className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all"
                  >
                    {/* Image */}
                    <Link
                      href={`/syllabus/${state.code}`}
                      className="block relative h-48 overflow-hidden"
                    >
                      <Image
                        src={imageUrl}
                        alt={state.fullName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <div className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-md">
                          <span className="font-semibold text-slate-900">{state.name}</span>
                        </div>
                        {state.popularity === 'high' && (
                          <div className="flex items-center gap-1 px-2.5 py-1 bg-[#ED1F24] rounded-md">
                            <TrendingUp className="w-3.5 h-3.5 text-white" />
                            <span className="text-xs font-medium text-white">Popular</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      {/* Title */}
                      <Link href={`/syllabus/${state.code}`}>
                        <h3 className="text-base! text-slate-900 mb-2 group-hover:text-[#ED1F24] transition-colors">
                          {state.fullName}
                        </h3>
                      </Link>

                      {/* Description */}
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {state.description}
                      </p>

                      {/* Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        <Link
                          href={`/syllabus/${state.code}`}
                          className="flex items-center justify-center h-11 bg-[#ED1F24] text-white rounded-md hover:bg-[#d11b20] transition-colors"
                          title="View Syllabus"
                        >
                          <BookOpen className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`/vacancy/${state.code}`}
                          className="flex items-center justify-center h-11 border border-slate-300 text-slate-700 rounded-md hover:border-slate-400 hover:bg-slate-50 transition-colors"
                          title="View Vacancy"
                        >
                          <FileText className="w-5 h-5" />
                        </Link>
                        <a
                          href={state.pyqUrl || '#'}
                          className="flex items-center justify-center h-11 border border-slate-300 text-slate-700 rounded-md hover:border-slate-400 hover:bg-slate-50 transition-colors"
                          title="Previous Year Papers"
                          onClick={(e) => handleDownload(e, state.pyqUrl || '#')}
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full py-20 text-center">
                <h3 className="text-slate-500 text-lg">No syllabus found for this category.</h3>
              </div>
            )}
          </div>
        )}

        {/* Common Subjects Section */}
        <div className="mb-16">
          <div className="mb-10">
            <h2 className="text-slate-900 mb-3">{commonTitle}</h2>
            <p className="text-slate-600">{commonDesc}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left border-b border-slate-200 w-48">
                    <span className="font-semibold text-slate-900">Category</span>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-slate-200">
                    <span className="font-semibold text-slate-900">Subjects</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {commonList.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 align-top w-48">
                      <span className="text-sm text-slate-900">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{item.subjects}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Syllabus (Prelims) */}
        <div className="mb-16">
          <div className="mb-10">
            <h2 className="text-slate-900 mb-3">{prelimsTitle}</h2>
            <p className="text-slate-600">{prelimsDesc}</p>
          </div>

          {/* Prelims Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mb-12">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left border-b border-slate-200 w-48">
                    <span className="font-semibold text-slate-900">Subject</span>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-slate-200">
                    <span className="font-semibold text-slate-900">Topics Covered</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {prelimsList.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 align-top w-48">
                      <span className="text-sm text-slate-900">{item.subject}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{item.topics}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mains Section */}
          <div className="mb-10">
            <h2 className="text-slate-900 mb-3">{mainsTitle}</h2>
            <p className="text-slate-600">{mainsDesc}</p>
          </div>

          {/* Mains Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left border-b border-slate-200 w-32">
                    <span className="font-semibold text-slate-900">Paper</span>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-slate-200 w-80">
                    <span className="font-semibold text-slate-900">Subject</span>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-slate-200">
                    <span className="font-semibold text-slate-900">Topics Covered</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {mainsList.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 align-top w-32">
                      <span className="text-sm font-semibold text-[#ED1F24]">{item.paperName}</span>
                    </td>
                    <td className="px-6 py-4 align-top w-80">
                      <span className="text-sm text-slate-900">{item.subject}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{item.topics}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Enroll */}
          <div className="bg-[#ED1F24] rounded-lg p-8 text-white">
            <div className="mb-6">
              <h3 className="text-2xl! text-white mb-2">{enrollTitle}</h3>
              <p className="text-red-100">{enrollDesc}</p>
            </div>
            <a
              href={enrollUrl}
              target="_self"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#ED1F24] rounded-md hover:bg-red-50 transition-colors font-medium"
            >
              {enrollBtn}
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          {/* Free Demo */}
          <div className="bg-slate-900 rounded-lg p-8 text-white">
            <div className="mb-6">
              <h3 className="text-2xl! text-white mb-2">{demoTitle}</h3>
              <p className="text-slate-400">{demoDesc}</p>
            </div>
            <a
              href={demoUrl}
              target="_self"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-md hover:bg-[#d11b20] transition-colors font-medium"
            >
              {demoBtn}
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {gatingConfig?.enableGating &&
        gatingConfig.gatingPopup &&
        typeof gatingConfig.gatingPopup !== 'string' && (
          <ResourceGateModal
            isOpen={isGateModalOpen}
            onClose={() => setIsGateModalOpen(false)}
            onSuccess={handleGateSuccess}
            popup={gatingConfig.gatingPopup}
          />
        )}
    </div>
  )
}
