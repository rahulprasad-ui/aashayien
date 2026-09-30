'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  Download,
  ShoppingCart,
  Star,
  CheckCircle,
  FileText,
  Award,
  TrendingUp,
  Clock,
  Share2,
  Target,
  Lightbulb,
  Package,
  Truck,
  Shield,
} from 'lucide-react'
import Image from 'next/image'
import type { Book, Media, Popup } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { SocialShare } from './SocialShare'
import { ResourceGateModal } from '../ResourceGateModal'

export function BookDetail({
  book,
  relatedBooksOverride,
  gatingConfig,
}: {
  book: Book
  relatedBooksOverride?: Book[]
  gatingConfig?: { enableGating?: boolean | null; gatingPopup?: string | Popup | null }
}) {
  const [isGateModalOpen, setIsGateModalOpen] = useState(false)
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null)

  const bookData = book

  const relatedBooks = (relatedBooksOverride || bookData.relatedBooks || [])
    .map((b: any) => {
      if (typeof b === 'object' && b !== null) {
        return b as Book
      }
      return null
    })
    .filter((b): b is Book => b !== null)

  const image = getMediaUrl((bookData.image as Media)?.url || '')
  const authorImage = getMediaUrl((bookData.authorImage as Media)?.url || '')

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
      window.open(url, '_blank')
    }
  }

  const handleGateSuccess = () => {
    setIsGateModalOpen(false)
    if (pendingDownloadUrl) {
      window.open(pendingDownloadUrl, '_blank')
      setPendingDownloadUrl(null)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-[#ED1F24] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/books" className="hover:text-[#ED1F24] transition-colors">
              Books
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{bookData.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Book Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Book Overview */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Book Info - Left side, takes more space */}
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-[#ED1F24]/10 text-[#ED1F24] text-sm rounded-full mb-3">
                    {bookData.category === 'free' ? 'Free E-book' : bookData.category}
                  </div>

                  <h1 className="text-slate-900 mb-3 leading-tight">{bookData.title}</h1>

                  <p className="text-lg text-slate-600 mb-4">
                    by <span className="text-[#ED1F24]">{bookData.author}</span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(bookData.rating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-slate-200 text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-bold text-slate-900">{bookData.rating}</span>
                    </div>
                    <span className="text-slate-500">
                      ({bookData.reviews?.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-700 leading-relaxed mb-6">{bookData.description}</p>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-[#ED1F24]" />
                        <span className="text-xs text-slate-600">Pages</span>
                      </div>
                      <span className="text-sm text-slate-900 font-medium">{bookData.pages}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-[#ED1F24]" />
                        <span className="text-xs text-slate-600">Edition</span>
                      </div>
                      <span className="text-sm text-slate-900 font-medium">{bookData.edition}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-[#ED1F24]" />
                        <span className="text-xs text-slate-600">Language</span>
                      </div>
                      <span className="text-sm text-slate-900 font-medium">
                        {bookData.language}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="w-4 h-4 text-[#ED1F24]" />
                        <span className="text-xs text-slate-600">Format</span>
                      </div>
                      <span className="text-sm text-slate-900 font-medium">{bookData.format}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {bookData.tags?.map((t, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 text-[#ED1F24] text-sm rounded-full"
                      >
                        {t.tag}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-3xl font-bold ${
                          bookData.isFree ? 'text-green-600' : 'text-[#ED1F24]'
                        }`}
                      >
                        {bookData.price}
                      </span>
                      {bookData.originalPrice && (
                        <span className="text-lg text-slate-400 line-through">
                          {bookData.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      {bookData.isFree ? (
                        <a
                          href={bookData.buyLink || '#'}
                          onClick={(e) => handleDownload(e, bookData.buyLink || '#')}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-green-600 text-white hover:bg-green-700"
                        >
                          <Download className="w-5 h-5" />
                          Download Free
                        </a>
                      ) : (
                        <a
                          href={bookData.buyLink || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-[#ED1F24] text-white hover:bg-[#d11b20]"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Buy Now
                        </a>
                      )}
                    </div>

                    {!bookData.isFree && bookData.guarantees && bookData.guarantees.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-200">
                        {bookData.guarantees.map((g: any, index: number) => {
                          const IconGroup = {
                            truck: Truck,
                            shield: Shield,
                            clock: Clock,
                            check: CheckCircle,
                          }
                          const Icon = (IconGroup as any)[g.icon || 'check'] || CheckCircle
                          return (
                            <div key={index} className="text-center">
                              <Icon className="w-5 h-5 text-[#ED1F24] mx-auto mb-1" />
                              <span className="text-xs text-slate-600">{g.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Book Image - Right side, smaller */}
                <div className="w-full md:w-64 shrink-0">
                  <div className="sticky top-28">
                    <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[3/4] bg-slate-50">
                      {image && (
                        <Image
                          src={image}
                          alt={bookData.title || ''}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      )}
                      {!image && (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-slate-300" />
                        </div>
                      )}
                      {bookData.isFree && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-500 text-white text-xs font-medium rounded-full shadow-lg">
                            <Download className="w-3.5 h-3.5" />
                            Free
                          </span>
                        </div>
                      )}
                      {bookData.originalPrice && bookData.price && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 bg-[#ED1F24] text-white text-xs font-medium rounded-full shadow-lg">
                            {/* Simple calc if prices are formatted properly */}
                            {bookData.originalPrice.includes('₹') && bookData.price.includes('₹')
                              ? Math.round(
                                  ((parseInt(
                                    bookData.originalPrice.replace('₹', '').replace(',', ''),
                                  ) -
                                    parseInt(bookData.price.replace('₹', '').replace(',', ''))) /
                                    parseInt(
                                      bookData.originalPrice.replace('₹', '').replace(',', ''),
                                    )) *
                                    100,
                                )
                              : 0}
                            % OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            {bookData.longDescription && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-4">About This Book</h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {bookData.longDescription}
                </p>
              </div>
            )}

            {/* Key Features */}
            {bookData.features && bookData.features.length > 0 && (
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-4">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {bookData.features.map((f, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{f.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Table of Contents */}
            {bookData.tableOfContents && bookData.tableOfContents.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-4">Table of Contents</h2>
                <div className="space-y-3">
                  {bookData.tableOfContents.map((chapter, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-[#ED1F24] rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-base! text-slate-900 mb-1">{chapter.chapter}</h3>
                            <p className="text-xs text-slate-500">{chapter.pages}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-11">
                        {(chapter.topics || []).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white text-slate-600 text-xs rounded border border-slate-200"
                          >
                            {t.topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What You'll Learn */}
            {bookData.whatYouWillLearn && bookData.whatYouWillLearn.length > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-6">
                <h2 className="text-slate-900 mb-4">What You&apos;ll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {bookData.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{item.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Audience */}
            {bookData.targetAudience && bookData.targetAudience.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-4">Who This Book Is For</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {bookData.targetAudience.map((audience, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{audience.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About the Author */}
            {bookData.authorBio && (
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-4">About the Author</h2>
                <div className="flex items-start gap-4">
                  {authorImage && (
                    <Image
                      src={authorImage}
                      alt={bookData.author || ''}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#ED1F24] shrink-0"
                      unoptimized
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl! text-slate-900 mb-2">{bookData.author}</h3>
                    <p className="text-slate-700 leading-relaxed">{bookData.authorBio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Student Reviews */}
            {bookData.studentReviews && bookData.studentReviews.length > 0 && (
              <div>
                <h2 className="text-slate-900 mb-4">Student Reviews</h2>
                <div className="space-y-4">
                  {bookData.studentReviews.map((review, index) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <span className="text-slate-400 font-bold">{review.name?.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="text-slate-900 font-medium">{review.name}</h4>
                              <span className="text-xs text-[#ED1F24]">{review.achievement}</span>
                            </div>
                            <span className="text-xs text-slate-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < (review.rating || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-slate-200 text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-slate-700 italic">
                            &quot;{review.comment}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Book Specifications */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg! text-slate-900 mb-4">Book Specifications</h3>
                <div className="space-y-3">
                  {bookData.isbn && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">ISBN</span>
                      <span className="text-slate-900 font-medium">{bookData.isbn}</span>
                    </div>
                  )}
                  {bookData.publisher && (
                    <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
                      <span className="text-slate-600">Publisher</span>
                      <span className="text-slate-900 font-medium">{bookData.publisher}</span>
                    </div>
                  )}
                  {bookData.publicationDate && (
                    <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
                      <span className="text-slate-600">Published</span>
                      <span className="text-slate-900 font-medium">{bookData.publicationDate}</span>
                    </div>
                  )}
                  {bookData.fileSize && (
                    <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
                      <span className="text-slate-600">File Size</span>
                      <span className="text-slate-900 font-medium">{bookData.fileSize}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Share */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg! text-slate-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#ED1F24]" />
                  Share This Book
                </h3>
                <div className="flex justify-center">
                  <SocialShare
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                    title={bookData.title || ''}
                  />
                </div>
              </div>

              {/* Why Choose This Book */}
              {bookData.whyChooseThisBook && bookData.whyChooseThisBook.length > 0 && (
                <div className="bg-gradient-to-br from-[#ED1F24] to-red-700 rounded-xl p-6 text-white shadow-xl">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <h3 className="text-xl! text-white mb-2 text-center">Why Choose This Book?</h3>
                  <ul className="space-y-2 text-sm text-red-100">
                    {bookData.whyChooseThisBook.map((p: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{p.point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Need Help */}
              <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl">
                <h3 className="text-lg! text-white mb-3">Need Help?</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Have questions about this book? Our team is here to help you.
                </p>
                <a
                  href={`https://wa.me/${bookData.supportWhatsApp || '919111198177'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-slate-900">You May Also Like</h2>
              <Link
                href="/books"
                className="text-[#ED1F24] hover:text-[#d11b20] text-sm font-medium flex items-center gap-1"
              >
                View All Books
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map((b) => (
                <Link
                  key={b.id}
                  href={`/books/${b.slug || b.id}`}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-50">
                    <Image
                      src={getMediaUrl((b.image as Media)?.url || '')}
                      alt={b.title || ''}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-slate-900 text-sm mb-1 line-clamp-2 group-hover:text-[#ED1F24] transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">by {b.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-[#ED1F24] font-bold">{b.price}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-slate-900">{b.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
    </div>
  )
}
