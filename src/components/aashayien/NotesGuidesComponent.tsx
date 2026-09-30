'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  Download,
  FileText,
  Search,
  Filter,
  Calendar,
  Eye,
  Star,
} from 'lucide-react'
import type { Note, NotesPage as NotesPageType } from '@/payload-types'
import { StaticNavbar } from '@/components/aashayien/StaticNavbar'
import { Footer } from '@/components/aashayien/Footer'

function getCategoryValueAndLabel(cat: any): { value: string; label: string } {
  if (!cat) return { value: 'uncategorized', label: 'Uncategorized' }

  if (typeof cat === 'object') {
    const value = String(cat.slug || cat.id || cat.title || '')
    const label = String(cat.title || cat.name || cat.slug || value)
    return { value, label }
  }

  const strVal = String(cat)
  const formattedLabel = strVal
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return { value: strVal, label: formattedLabel }
}

import { ResourceGateModal } from '@/components/ResourceGateModal'
import type { Popup } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export function NotesGuidesComponent({
  notes,
  resourceCategories,
  pageData,
  gatingConfig,
}: {
  notes: Note[]
  resourceCategories?: any[]
  pageData?: NotesPageType
  gatingConfig?: { enableGating?: boolean | null; gatingPopup?: string | Popup | null }
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showGateModal, setShowGateModal] = useState(false)
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)

  React.useEffect(() => {
    // Check if user has already unlocked resources in this session
    const unlocked = sessionStorage.getItem('resource_gating_unlocked')
    if (unlocked === 'true') {
      setIsUnlocked(true)
    }
  }, [])

  const performDownload = (url: string) => {
    window.open(url, '_blank')
  }

  const handleDownload = (note: Note) => {
    const url =
      note.externalDownloadLink ||
      (typeof note.file === 'object' ? getMediaUrl(note.file?.url || '') : undefined) ||
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

  // Calculate dynamic categories and real-time counts
  const categories = React.useMemo(() => {
    const categoryMap = new Map<string, { value: string; label: string; count: number }>()

    // 1. Add categories from resourceCategories if passed
    if (resourceCategories && Array.isArray(resourceCategories)) {
      resourceCategories.forEach((rc: any) => {
        const { value, label } = getCategoryValueAndLabel(rc)
        categoryMap.set(value, { value, label, count: 0 })
      })
    }

    // 2. Extract categories present across all notes and compute counts
    notes.forEach((note) => {
      if (note.category) {
        const { value, label } = getCategoryValueAndLabel(note.category)
        const existing = categoryMap.get(value)
        if (existing) {
          existing.count += 1
        } else {
          categoryMap.set(value, { value, label, count: 1 })
        }
      }
    })

    return [
      { value: 'all', label: 'All Notes', count: notes.length },
      ...Array.from(categoryMap.values()),
    ]
  }, [notes, resourceCategories])

  const filteredNotes = notes.filter((note) => {
    const noteCatVal = note.category ? getCategoryValueAndLabel(note.category).value : ''
    const matchesCategory = selectedCategory === 'all' || noteCatVal === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags?.some((tag) => tag.tag?.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
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
              <BookOpen className="w-5 h-5 text-white" />
              <span className="text-white font-medium">
                {heroData?.badgeText || 'Free Study Material'}
              </span>
            </div>
            <h1 className="text-white mb-4">{heroData?.title || 'Notes & Study Guides'}</h1>
            <p className="text-lg text-white/90 mb-8">
              {heroData?.description ||
                'Comprehensive notes and guides prepared by experts to help you excel in judiciary examinations.'}
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
                    <div className="text-3xl font-bold text-white mb-1">{notes.length}+</div>
                    <div className="text-sm text-white/80">Study Notes</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-3xl font-bold text-white mb-1">
                      {notes
                        .reduce((sum, note) => sum + (note.downloadCount || 0), 0)
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
                    placeholder="Search notes..."
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
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setSelectedCategory(cat.value)
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
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
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

            {/* Notes Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing <span className="font-medium text-slate-900">{filteredNotes.length}</span>{' '}
                  {filteredNotes.length === 1 ? 'note' : 'notes'}
                </p>
              </div>

              {filteredNotes.length === 0 ? (
                <div className="text-center py-12 bg-white border border-slate-200 rounded-xl">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No notes found</h3>
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
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all group"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {note.tags?.map((tag: any, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                              >
                                {tag.tag}
                              </span>
                            ))}
                            {note.isFree && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                                FREE
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg! text-slate-900 mb-2 group-hover:text-[#ED1F24] transition-colors">
                            {note.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-4">{note.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              <span>{note.pages} pages</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{(note.downloadCount || 0).toLocaleString()} downloads</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(note.uploadDate).toLocaleDateString('en-US', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{note.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-3">
                          <button
                            onClick={() => handleDownload(note)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors whitespace-nowrap font-medium"
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
