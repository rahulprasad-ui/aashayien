'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  Play,
  Eye,
  Calendar,
  Filter,
  X,
  Download,
  MapPin,
  ChevronRight,
} from 'lucide-react'
import type { Media } from '@/payload-types'
import { ResourceGateModal } from '@/components/ResourceGateModal'
import type { Form as FormType, Popup } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { ImageWithFallback } from './ImageWithFallback'
import type { ImageDisplayConfig } from '@/utilities/imageDisplay'

// Types
export interface Video {
  id: string
  slug?: string
  title: string
  description: string
  category: string
  duration: string
  views: string
  uploadDate: string
  youtubeId: string
  thumbnail: string
  thumbnailResource?: string | Media | number | null
  thumbnailDisplay?: ImageDisplayConfig | null
  tags?: string[]
  resourceType?: 'video' | 'pdf' | 'guide' | 'judgement' | 'pyq'
}

export interface Category {
  key: string
  label: string
}

export interface PanIndiaData {
  enable?: boolean
  badgeText?: string
  enableOtherStates?: boolean
  otherStatesTitle?: string
  title: string
  subtitle: string
  description: string
  stats: {
    states: string
    videos: string
    views: string
  }
  backgroundUrl: string
  backgroundResource?: string | Media | number | null
  backgroundDisplay?: ImageDisplayConfig | null
  cta: {
    title: string
    description: string
    buttonText: string
    buttonUrl: string
  }
  featuredStates: {
    name: string
    abbr: string
    code: string
    imageUrl: string
    imageResource?: string | Media | number | null
    imageDisplay?: ImageDisplayConfig | null
    color: string
  }[]
  otherStates: {
    name: string
    abbr: string
  }[]
  features: {
    title: string
    icon: string
  }[]
}

interface FreeStudyProps {
  videos?: Video[]
  categories?: Category[]
  heroData?: {
    badgeText?: string
    title?: string
    subtitle?: string
  }
  panIndiaData?: PanIndiaData
  gatingConfig?: {
    enableGating?: boolean
    gatingPopup?: Popup | string
  }
}

export const FreeStudy: React.FC<FreeStudyProps> = ({
  videos = [],
  categories = [],
  heroData,
  panIndiaData,
  gatingConfig,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [showGateModal, setShowGateModal] = useState(false)

  // Create a map for quick label lookup
  const categoryLabels = useMemo(() => {
    return categories.reduce(
      (acc, cat) => {
        acc[cat.key] = cat.label
        return acc
      },
      {} as Record<string, string>,
    )
  }, [categories])

  // Filter videos based on search and filters (sab types dikhenge)
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (video.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ?? false)

    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchQuery('')
  }

  const performDownload = () => {
    // Simulate download
    alert('Thank you! Your brochure download will start shortly.')
  }

  const handleDownloadClick = () => {
    if (
      gatingConfig?.enableGating &&
      gatingConfig?.gatingPopup &&
      typeof gatingConfig.gatingPopup !== 'string'
    ) {
      setShowGateModal(true)
    } else {
      performDownload()
    }
  }

  const onGateSuccess = () => {
    setShowGateModal(false)
    performDownload()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-red-50">
      {/* Hero Section */}
      <div className="pt-16 pb-12 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-4">
              <span className="text-white">{heroData?.badgeText}</span>
            </div>
            <h1 className="text-white mb-4">{heroData?.title}</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">{heroData?.subtitle}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search videos by topic, subject, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED1F24] focus:border-transparent text-white placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg! text-slate-900">Categories</h3>
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#ED1F24] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.key
                          ? 'bg-[#ED1F24] text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* Download Brochure Button */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <button
                    onClick={handleDownloadClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-[#ED1F24] to-[#d11b20] text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#ED1F24] text-white p-4 rounded-full shadow-lg hover:bg-[#d11b20] transition-colors"
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* Mobile Filter Modal */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                  <h3 className="text-lg! text-slate-900">Categories</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6">
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={clearFilters}
                      className="w-full mb-6 px-4 py-2 text-sm text-[#ED1F24] border border-[#ED1F24] rounded-lg hover:bg-[#ED1F24]/5"
                    >
                      Clear Filters
                    </button>
                  )}

                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => {
                          setSelectedCategory(category.key)
                          setIsMobileFilterOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.key
                            ? 'bg-[#ED1F24] text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button
                      onClick={() => {
                        handleDownloadClick()
                        setIsMobileFilterOpen(false)
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-[#ED1F24] to-[#d11b20] text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Download Brochure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Content - Videos Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-slate-600">
                Showing <span className="text-slate-900">{filteredVideos.length}</span> videos
                {selectedCategory !== 'all' && ` in "${categoryLabels[selectedCategory]}"`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Videos Grid */}
            {filteredVideos.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group flex flex-col h-full"
                  >
                    {/* Thumbnail — only for video type */}
                    {(!video.resourceType || video.resourceType === 'video') ? (
                      <div className="relative aspect-video overflow-hidden shrink-0">
                        <ImageWithFallback
                          resource={video.thumbnailResource || video.thumbnail}
                          display={video.thumbnailDisplay}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#ED1F24] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                          {video.duration}
                        </div>
                      </div>
                    ) : (
                      // Other types: same height as video card, clean icon placeholder
                      <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-3 shrink-0">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          {video.resourceType === 'pdf' && <Download className="w-8 h-8 text-red-500" />}
                          {video.resourceType === 'guide' && <Download className="w-8 h-8 text-blue-500" />}
                          {video.resourceType === 'judgement' && <Download className="w-8 h-8 text-purple-500" />}
                          {video.resourceType === 'pyq' && <Download className="w-8 h-8 text-green-500" />}
                          {(!video.resourceType || !['pdf','guide','judgement','pyq'].includes(video.resourceType)) && (
                            <Download className="w-8 h-8 text-slate-500" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                          {video.resourceType || 'Document'}
                        </span>
                      </div>
                    )}

                    {/* Video Info */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="inline-block self-start px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full mb-3 capitalize">
                        {categoryLabels[video.category]}
                      </div>

                      <h3 className="text-base! text-slate-900 mb-2 line-clamp-2 group-hover:text-[#ED1F24] transition-colors">
                        {video.title}
                      </h3>

                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {video.description}
                      </p>

                      {/* Tags */}
                      {video.tags && video.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {video.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-red-50 text-[#ED1F24] text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 mt-auto">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {video.views}
                        </div>
                        {video.uploadDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(video.uploadDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        )}
                      </div>

                      {/* Watch Button */}
                      <Link
                        href={`/free-study-online/${video.slug || video.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors mt-auto"
                      >
                        {(!video.resourceType || video.resourceType === 'video') ? (
                          <Play className="w-4 h-4" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-slate-100 rounded-full mb-4">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl! text-slate-900 mb-2">No videos found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pan India Coverage Section */}
      {panIndiaData?.enable !== false && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mt-20">
          {/* Hero Banner with Background */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 mb-8">
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${getMediaUrl(panIndiaData?.backgroundUrl || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200')}')`,
                  backgroundSize: panIndiaData?.backgroundDisplay?.fit || 'cover',
                }}
              ></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-3 gap-0">
              {/* Main Content */}
              <div className="lg:col-span-2 p-12">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#ED1F24] rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm uppercase tracking-wider">{panIndiaData?.badgeText || 'Coverage'}</div>
                      <div className="text-white text-2xl">{panIndiaData?.title}</div>
                    </div>
                  </div>

                  <h2 className="text-white mb-4">{panIndiaData?.subtitle}</h2>
                  <p className="text-white/80 text-lg mb-8">{panIndiaData?.description}</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl text-[#ED1F24] mb-1">
                        {panIndiaData?.stats.states}
                      </div>
                      <div className="text-white/60 text-sm">States</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl text-[#ED1F24] mb-1">
                        {panIndiaData?.stats.videos}
                      </div>
                      <div className="text-white/60 text-sm">Videos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl text-[#ED1F24] mb-1">
                        {panIndiaData?.stats.views}
                      </div>
                      <div className="text-white/60 text-sm">Views</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical CTA Panel */}
              <div className="bg-linear-to-br from-[#ED1F24] to-[#b81419] p-8 flex flex-col justify-center items-center text-center">
                <Play className="w-16 h-16 text-white mb-4 opacity-90" />
                <h3 className="text-xl! text-white mb-3">{panIndiaData?.cta?.title || 'Access All Playlists'}</h3>
                <p className="text-white/90 text-sm mb-6">
                  {panIndiaData?.cta?.description || 'State-wise organized lectures for every judiciary exam'}
                </p>
                <a
                  href={panIndiaData?.cta?.buttonUrl || 'https://www.youtube.com/@AashayeinJudiciary'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white text-[#ED1F24] rounded-lg hover:bg-slate-100 transition-all inline-flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  {panIndiaData?.cta?.buttonText || 'View Details'}
                </a>
              </div>
            </div>
          </div>

          {/* States Grid - Magazine Style */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Featured States - Large Cards */}
            {(panIndiaData?.featuredStates || []).map((state, idx) => (
              <div
                key={state.abbr}
                className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    resource={state.imageResource || state.imageUrl}
                    display={state.imageDisplay}
                    alt={state.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${state.color} opacity-80 group-hover:opacity-90 transition-opacity`}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="text-6xl text-white/20">0{idx + 1}</div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      {state.abbr}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl! text-white mb-2">{state.name}</h3>
                    <div className="text-white/80 text-sm mb-4">
                      {state.code} • Complete Coverage
                    </div>
                    <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                      <span className="text-sm">View Playlist</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other States - Compact Grid */}
          {panIndiaData?.enableOtherStates !== false && (
            <div className="mt-6 bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-lg! text-slate-900 mb-6">{panIndiaData?.otherStatesTitle || 'More States Covered'}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {(panIndiaData?.otherStates || []).map((state: any) => (
                    <div
                      key={state.abbr}
                      className="group relative bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 hover:from-[#ED1F24] hover:to-[#d11b20] transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 text-6xl text-slate-200 group-hover:text-white/10 transition-colors -mr-4 -mt-4">
                        {state.abbr}
                      </div>
                      <div className="relative">
                        <div className="text-sm text-slate-900 group-hover:text-white transition-colors mb-1">
                          {state.name}
                        </div>
                        <div className="text-xs text-slate-500 group-hover:text-white/80 transition-colors">
                          Full Coverage
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Strip */}
              <div className="mt-6 grid md:grid-cols-3 gap-6">
                {(panIndiaData?.features || []).map((feature, idx) => (
                  <div key={idx} className="bg-slate-900 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-[#ED1F24] rounded-lg flex items-center justify-center mx-auto mb-4">
                      {/* Simple logic to pick icon based on string or index if no dedicated icon component map */}
                      {feature.icon === 'scale' ? (
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : feature.icon === 'document' ? (
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      ) : (
                        // Default Book/Gavel Icon
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="text-white text-sm">{feature.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      )}

      {/* Brochure Download Modal (Gated) */}
      {showGateModal &&
        gatingConfig?.gatingPopup &&
        typeof gatingConfig.gatingPopup !== 'string' && (
          <ResourceGateModal
            isOpen={showGateModal}
            onClose={() => setShowGateModal(false)}
            onSuccess={onGateSuccess}
            popup={gatingConfig.gatingPopup as Popup}
          />
        )}
    </div>
  )
}
