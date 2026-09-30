'use client'

import React, { useState } from 'react'
import { Play, BookOpen, FileText, Video } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import Link from 'next/link'
import { Popup, Media } from '@/payload-types'
import { ResourceGateModal } from '../ResourceGateModal'
import type { ImageDisplayConfig } from '@/utilities/imageDisplay'

interface Resource {
  id: string | number
  slug?: string
  title: string
  description?: string | null
  thumbnail?: string | Media | number | null
  thumbnailDisplay?: ImageDisplayConfig | null
  externalThumbnailUrl?: string | null
  duration?: string | null
  category?: string | { title?: string | null } | number | null
  [key: string]: any
}

interface Feature {
  icon?: string
  title: string
  description?: string
  id?: string
}

interface FreeResourcesSectionProps {
  title?: string
  subtitle?: string
  description?: string
  resources?: Resource[]
  features?: Feature[]
  viewAllLink?: {
    type?: 'reference' | 'custom' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages'
      value: string | any
    } | null
    url?: string | null
    label?: string
  }
  gatingConfig?: { enableGating?: boolean | null; gatingPopup?: string | Popup | null }
}

export function FreeResourcesSection({
  title = 'Free Resources for Judiciary Preparation',
  subtitle = 'Free Resources',
  description = 'Access high-quality video lectures, study materials, and preparation guides absolutely free. Start your judiciary journey with expert guidance.',
  resources = [],
  features = [],
  viewAllLink,
  gatingConfig,
}: FreeResourcesSectionProps) {
  const [isGateModalOpen, setIsGateModalOpen] = useState(false)
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null)

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'FileText':
        return FileText
      case 'Video':
        return Video
      case 'BookOpen':
        return BookOpen
      default:
        return BookOpen
    }
  }

  const getCategoryTitle = (resource: Resource) => {
    if (typeof resource.category === 'object' && resource.category && 'title' in resource.category)
      return resource.category.title || 'General'
    return 'General'
  }

  const getActionIcon = (resource: Resource) => {
    return resource.resourceType === 'video' ? Video : BookOpen
  }

  const getActionText = (resource: Resource) => {
    return resource.resourceType === 'video' ? 'Watch Now' : 'Download Now'
  }

  const handleAction = (e: React.MouseEvent, resource: Resource) => {
    const isVideo = resource.resourceType === 'video'
    if (isVideo) return // Let Link handle it

    e.preventDefault()
    const downloadUrl = resource.downloadLink

    if (!downloadUrl) return

    if (
      gatingConfig?.enableGating &&
      gatingConfig?.gatingPopup &&
      typeof gatingConfig.gatingPopup !== 'string'
    ) {
      setPendingDownloadUrl(downloadUrl)
      setIsGateModalOpen(true)
    } else {
      window.location.href = downloadUrl
    }
  }

  const handleGateSuccess = () => {
    setIsGateModalOpen(false)
    if (pendingDownloadUrl) {
      window.location.href = pendingDownloadUrl
      setPendingDownloadUrl(null)
    }
  }

  return (
    <section id="resources" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-red-100 rounded-full mb-4">
            <span className="text-[#ED1F24] font-bold">{subtitle}</span>
          </div>
          <h2 className="text-slate-900 mb-4 font-bold">{title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {resources && resources.length > 0 ? (
            resources.map((resource) => {
              const ActionIcon = getActionIcon(resource)
              const isVideo = resource.resourceType === 'video'
              const href = isVideo
                ? `/free-study-online/${resource.slug || resource.id}`
                : resource.downloadLink || '#'

              return (
                <div
                  key={resource.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group flex flex-col h-full border border-slate-100"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <ImageWithFallback
                      resource={resource.externalThumbnailUrl ? resource.externalThumbnailUrl : resource.thumbnail}
                      display={resource.externalThumbnailUrl ? undefined : resource.thumbnailDisplay}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {isVideo && (
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-[#ED1F24] ml-1" />
                        </div>
                      </div>
                    )}

                    {!isVideo && (
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
                    )}

                    {/* Duration Badge */}
                    {resource.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-xs font-bold">
                        {resource.duration}
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-[#ED1F24] px-3 py-1 rounded-lg text-white text-xs font-bold uppercase tracking-wider">
                      {getCategoryTitle(resource)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-slate-900 mb-2 line-clamp-2 font-bold group-hover:text-[#ED1F24] transition-colors min-h-14">
                      {resource.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-6 grow">
                      {resource.description}
                    </p>

                    <Link
                      href={href}
                      onClick={(e) => handleAction(e, resource)}
                      target={!isVideo ? '_self' : undefined}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-xl hover:bg-[#d11b20] transition-all font-bold shadow-md hover:shadow-lg"
                    >
                      <ActionIcon className="w-5 h-5" />
                      {getActionText(resource)}
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full text-center text-slate-500 py-12">No resources found.</div>
          )}
        </div>

        {/* Additional Features Section */}
        {features && features.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = getIcon(feature.icon)
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-[#ED1F24]" />
                    </div>
                    <h3 className="text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* CTA Button */}
        {viewAllLink && (
          <div className="text-center">
            <Link
              href={
                viewAllLink.url ||
                (viewAllLink.reference ? `/${viewAllLink.reference.value.slug}` : '#')
              }
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-6 h-6" />
              <span>{viewAllLink.label || 'Explore All Free Resources'}</span>
            </Link>
          </div>
        )}
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
    </section>
  )
}
