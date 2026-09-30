'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FileQuestion,
  ChevronRight,
  Download,
  FileText,
  Search,
  Filter,
  Calendar,
  Eye,
  Star,
} from 'lucide-react'
import { StaticNavbar } from '@/components/aashayien/StaticNavbar'
import { Footer } from '@/components/aashayien/Footer'
import type {
  PreviousYearQuestion,
  PreviousYearQuestionsPage as PreviousYearQuestionsPageType,
} from '@/payload-types'
import { ResourceGateModal } from '@/components/ResourceGateModal'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type QuestionCategory =
  | 'all'
  | 'prelims'
  | 'mains'
  | 'state-judiciary'
  | 'higher-judiciary'
  | 'adpo'
  | 'interview'

const categories = [
  { value: 'all', label: 'All Papers' },
  { value: 'prelims', label: 'Prelims' },
  { value: 'mains', label: 'Mains' },
  { value: 'state-judiciary', label: 'State Judiciary' },
  { value: 'higher-judiciary', label: 'Higher Judiciary' },
  { value: 'adpo', label: 'ADPO' },
  { value: 'interview', label: 'Interview' },
]

export function PreviousYearQuestionsComponent({
  papers,
  pageData,
  gatingConfig,
}: {
  papers: PreviousYearQuestion[]
  pageData?: PreviousYearQuestionsPageType
  gatingConfig?: { enableGating?: boolean | null; gatingPopup?: string | null }
}) {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Gating logic
  const [showGateModal, setShowGateModal] = useState(false)
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    const unlocked = sessionStorage.getItem('resource_gating_unlocked')
    if (unlocked === 'true') {
      setIsUnlocked(true)
    }
  }, [])

  const performDownload = (url: string) => {
    window.open(url, '_blank')
  }

  const handleDownload = (paper: PreviousYearQuestion) => {
    const url =
      paper.externalDownloadLink ||
      (typeof paper.file === 'object' ? getMediaUrl(paper.file?.url || '') : undefined) ||
      '#'

    if (
      !isUnlocked &&
      gatingConfig?.enableGating &&
      gatingConfig?.gatingPopup &&
      typeof gatingConfig.gatingPopup !== 'string'
    ) {
      setPendingUrl(url)
      setShowGateModal(true)
    } else {
      performDownload(url)
    }
  }

  const onGateSuccess = () => {
    sessionStorage.setItem('resource_gating_unlocked', 'true')
    setIsUnlocked(true)
    setShowGateModal(false)
    if (pendingUrl) {
      performDownload(pendingUrl)
      setPendingUrl(null)
    }
  }

  const filteredPapers = papers.filter((paper) => {
    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (paper.examName && paper.examName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.tags?.some((tagObj) => tagObj.tag?.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  // Calculate counts for categories based on current papers
  const categoryCounts = categories.map((cat) => {
    if (cat.value === 'all') return { ...cat, count: papers.length }
    return {
      ...cat,
      count: papers.filter((p) => p.category === cat.value).length,
    }
  })

  const heroData = pageData?.hero

  return (
    <div className="min-h-screen flex flex-col bg-white mt-10">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ED1F24] rounded-full mb-6">
              <FileQuestion className="w-5 h-5 text-white" />
              <span className="text-white font-medium">
                {heroData?.badgeText || 'Free Question Papers'}
              </span>
            </div>
            <h1 className="text-white mb-4">{heroData?.title || 'Previous Year Questions'}</h1>
            <p className="text-lg text-white/90 mb-8">
              {heroData?.description ||
                'Download previous year question papers from various judiciary examinations across India. Practice with authentic papers to understand exam patterns and improve your preparation.'}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {heroData?.stats && heroData.stats.length > 0 ? (
                heroData.stats.map((stat: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  >
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-3xl font-bold text-white mb-1">{papers.length}+</div>
                    <div className="text-sm text-white/80">Question Papers</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-3xl font-bold text-white mb-1">
                      {papers
                        .reduce((sum, paper) => sum + (paper.downloads || 0), 0)
                        .toLocaleString()}
                      +
                    </div>
                    <div className="text-sm text-white/80">Downloads</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-3xl font-bold text-white mb-1">100%</div>
                    <div className="text-sm text-white/80">Free Access</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filter Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search question papers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED1F24] focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="lg:hidden mb-6 p-4 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-900">Categories</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-2">
                  {categoryCounts.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setSelectedCategory(cat.value as QuestionCategory)
                        setShowMobileFilters(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.value
                          ? 'bg-[#ED1F24] text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{cat.label}</span>
                        <span className="text-xs opacity-75">({cat.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="hidden lg:block">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-28">
                <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#ED1F24]" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categoryCounts.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value as QuestionCategory)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.value
                          ? 'bg-[#ED1F24] text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{cat.label}</span>
                        <span className="text-xs opacity-75">({cat.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Papers Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing{' '}
                  <span className="font-medium text-slate-900">{filteredPapers.length}</span>{' '}
                  {filteredPapers.length === 1 ? 'paper' : 'papers'}
                </p>
              </div>

              {filteredPapers.length === 0 ? (
                <div className="text-center py-12 bg-white border border-slate-200 rounded-xl">
                  <FileQuestion className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    No question papers found
                  </h3>
                  <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                    className="px-4 py-2 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all group"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {paper.tags?.map((tagObj, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                              >
                                {tagObj.tag}
                              </span>
                            ))}
                            {paper.isFree && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                                FREE
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg! text-slate-900 mb-2 group-hover:text-[#ED1F24] transition-colors">
                            {paper.title}
                          </h3>
                          <p className="text-sm font-medium text-[#ED1F24] mb-2">
                            {paper.examName} • {paper.year}
                          </p>
                          <p className="text-sm text-slate-600 mb-4">{paper.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              <span>{paper.pages} pages</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{(paper.downloads || 0).toLocaleString()} downloads</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(paper.uploadDate).toLocaleDateString('en-US', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{paper.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-3">
                          <button
                            onClick={() => handleDownload(paper)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors whitespace-nowrap font-medium cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Resource Gate Modal */}
      {showGateModal &&
        gatingConfig?.gatingPopup &&
        typeof gatingConfig.gatingPopup !== 'string' && (
          <ResourceGateModal
            isOpen={showGateModal}
            onClose={() => {
              setShowGateModal(false)
              setPendingUrl(null)
            }}
            onSuccess={onGateSuccess}
            popup={gatingConfig.gatingPopup}
          />
        )}
    </div>
  )
}
