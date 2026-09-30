'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  Download,
  ShoppingCart,
  Search,
  Award,
  Star,
  Smartphone,
  X,
  Filter,
} from 'lucide-react'
import Image from 'next/image'
import type { Book, Media, BooksPage } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

type BookCategory =
  | 'all'
  | 'free'
  | 'criminal-law'
  | 'civil-law'
  | 'constitution'
  | 'mains'
  | 'current-affairs'
  | 'state-specific'

export function Books({
  books: initialBooks,
  pageData,
  initialCategory = 'all',
}: {
  books: Book[]
  pageData: BooksPage
  initialCategory?: string
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>(
    (initialCategory as BookCategory) || 'all',
  )
  const highestBookPrice = initialBooks.length > 0 ? Math.max(...initialBooks.map(b => b.priceValue || 0)) : 1500
  const maxPriceValue = highestBookPrice > 0 ? highestBookPrice : 1500
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPriceValue])
  const [minRating, setMinRating] = useState(0)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const filteredBooks = initialBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags?.some((t: { tag?: string | null }) =>
        t.tag?.toLowerCase().includes(searchQuery.toLowerCase()),
      )

    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory

    const matchesPriceRange =
      (book.priceValue || 0) >= priceRange[0] && (book.priceValue || 0) <= priceRange[1]

    const matchesRating = !book.rating || book.rating >= minRating

    return matchesSearch && matchesCategory && matchesPriceRange && matchesRating
  })

  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchQuery('')
    setPriceRange([0, maxPriceValue])
    setMinRating(0)
  }

  const categoryLabels: Record<BookCategory, string> = {
    all: 'All Books',
    free: 'Free E-books',
    'criminal-law': 'Criminal Law',
    'civil-law': 'Civil Law',
    constitution: 'Constitutional Law',
    mains: 'Mains Answer Writing',
    'current-affairs': 'Current Affairs',
    'state-specific': 'State-Specific',
  }

  const getCategoryCount = (category: BookCategory) => {
    if (category === 'all') return initialBooks.length
    return initialBooks.filter((b) => b.category === category).length
  }

  const hasActiveFilters =
    selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== maxPriceValue || minRating > 0

  const hero = pageData?.hero || {
    badgeText: 'Premium Study Materials',
    title: 'Expert-Curated Books for Judiciary Exams',
    description:
      'Comprehensive study materials, practice books, and free e-books designed by experts to help you ace your judiciary examination.',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      {/* Hero Section with Search */}
      <div className="pt-32 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-4">
              <span className="text-white">{hero.badgeText}</span>
            </div>
            <h1 className="text-white mb-4">{hero.title}</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">{hero.description}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search books by title, topic, or author..."
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

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="!text-lg text-slate-900">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#ED1F24] hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm text-slate-500 uppercase tracking-wide mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {(Object.entries(categoryLabels) as [BookCategory, string][]).map(
                      ([value, label]) => (
                        <Link
                          key={value}
                          href={value === 'all' ? '/books' : `/books?filter=${value}`}
                          onClick={() => setSelectedCategory(value)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            selectedCategory === value
                              ? 'bg-[#ED1F24] text-white'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{label}</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                selectedCategory === value
                                  ? 'bg-white/20 text-white'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {getCategoryCount(value)}
                            </span>
                          </div>
                        </Link>
                      ),
                    )}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h4 className="text-sm text-slate-500 uppercase tracking-wide mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-700">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={maxPriceValue}
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-[#ED1F24]"
                    />

                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h4 className="text-sm text-slate-500 uppercase tracking-wide mb-3">
                    Minimum Rating
                  </h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          minRating === rating
                            ? 'bg-[#ED1F24] text-white'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{rating}+ Stars</span>
                        </div>
                      </button>
                    ))}
                    {minRating > 0 && (
                      <button
                        onClick={() => setMinRating(0)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm bg-slate-50 text-slate-700 hover:bg-slate-100"
                      >
                        All Ratings
                      </button>
                    )}
                  </div>
                </div>

                {/* Download App CTA */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 text-center">
                  <Smartphone className="w-8 h-8 text-[#ED1F24] mx-auto mb-2" />
                  <p className="text-white text-sm mb-3">Download App for Free E-books</p>
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-[#ED1F24] text-white text-sm rounded-lg hover:bg-[#d11b20] transition-colors"
                  >
                    Download Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-full shadow-lg hover:bg-[#d11b20] transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-white text-[#ED1F24] text-xs px-2 py-0.5 rounded-full">
                  {(selectedCategory !== 'all' ? 1 : 0) +
                    (priceRange[0] !== 0 || priceRange[1] !== maxPriceValue ? 1 : 0) +
                    (minRating > 0 ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Filter Modal */}
          {isMobileFilterOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg! text-slate-900">Filter Books</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm text-slate-500 uppercase tracking-wide mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {(Object.entries(categoryLabels) as [BookCategory, string][]).map(
                      ([value, label]) => (
                        <Link
                          key={value}
                          href={value === 'all' ? '/books' : `/books?filter=${value}`}
                          onClick={() => setSelectedCategory(value)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            selectedCategory === value
                              ? 'bg-[#ED1F24] text-white'
                              : 'bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{label}</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                selectedCategory === value
                                  ? 'bg-white/20 text-white'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {getCategoryCount(value)}
                            </span>
                          </div>
                        </Link>
                      ),
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm text-slate-500 uppercase tracking-wide mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-700">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={maxPriceValue}
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-[#ED1F24]"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="text-sm text-slate-500 uppercase tracking-wide mb-3">
                    Minimum Rating
                  </h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 0].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          minRating === rating
                            ? 'bg-[#ED1F24] text-white'
                            : 'bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{rating === 0 ? 'All Ratings' : `${rating}+ Stars`}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      clearFilters()
                      setIsMobileFilterOpen(false)
                    }}
                    className="w-full mt-4 px-4 py-2 border-2 border-[#ED1F24] text-[#ED1F24] rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right Content - Book Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-slate-900 mb-1">{categoryLabels[selectedCategory]}</h2>
                <p className="text-sm text-slate-600">
                  {filteredBooks.length} book
                  {filteredBooks.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.slug || book.id}`}
                    className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-slate-300 transition-all duration-300 block"
                  >
                    {/* Book Image */}
                    <div className="relative h-64 overflow-hidden bg-slate-100">
                      <Image
                        src={
                          getMediaUrl((book.image as Media)?.url ||
                          (book.image as Media)?.sizes?.thumbnail?.url ||
                          '')
                        }
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Free Badge */}
                      {book.isFree && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-full shadow-lg">
                            <Download className="w-3.5 h-3.5" />
                            Free
                          </span>
                        </div>
                      )}

                      {/* Discount Badge */}
                      {book.originalPrice && book.price && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1.5 bg-[#ED1F24] text-white text-xs font-medium rounded-full shadow-lg">
                            {/* Simple check to avoid errors if prices aren't integers */}
                            {book.originalPrice.includes('₹') && book.price.includes('₹')
                              ? Math.round(
                                  ((parseInt(book.originalPrice.replace('₹', '').replace(',', '')) -
                                    parseInt(book.price.replace('₹', '').replace(',', ''))) /
                                    parseInt(
                                      book.originalPrice.replace('₹', '').replace(',', ''),
                                    )) *
                                    100,
                                )
                              : 0}
                            % OFF
                          </span>
                        </div>
                      )}

                      {/* Hover CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="p-5">
                      {/* Tags */}
                      {book.tags && book.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {book.tags
                            .slice(0, 2)
                            .map((t: { tag?: string | null }, index: number) => (
                              <span
                                key={index}
                                className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                              >
                                {t.tag}
                              </span>
                            ))}
                        </div>
                      )}

                      {/* Title & Author */}
                      <h3 className="text-lg! text-slate-900 mb-2 line-clamp-2 group-hover:text-[#ED1F24] transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">by {book.author}</p>

                      {/* Description */}
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{book.description}</p>

                      {/* Rating */}
                      {book.rating && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-slate-900">
                              {book.rating}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">
                            ({book.reviews?.toLocaleString()} reviews)
                          </span>
                        </div>
                      )}

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xl font-bold ${
                                book.isFree ? 'text-green-600' : 'text-[#ED1F24]'
                              }`}
                            >
                              {book.price}
                            </span>
                            {book.originalPrice && (
                              <span className="text-sm text-slate-400 line-through">
                                {book.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            book.isFree
                              ? 'bg-green-50 text-green-700 group-hover:bg-green-100'
                              : 'bg-[#ED1F24] text-white group-hover:bg-[#d11b20]'
                          }`}
                        >
                          {book.isFree ? (
                            <>
                              <Download className="w-4 h-4" />
                              Download
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Buy Now
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl! text-slate-900 mb-2">No books found</h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your filters to find what you&apos;re looking for.
                </p>
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

      {/* Stats Banner */}
      <div className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(pageData?.stats || []).map(
              (stat: { value?: string | null; label?: string | null }, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl text-[#ED1F24] mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ),
            )}
            {(!pageData?.stats || pageData.stats.length === 0) && (
              <>
                <div className="text-center">
                  <div className="text-4xl text-[#ED1F24] mb-2">50+</div>
                  <div className="text-sm text-slate-600">Study Materials</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-[#ED1F24] mb-2">15+</div>
                  <div className="text-sm text-slate-600">Free E-books</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-[#ED1F24] mb-2">20k+</div>
                  <div className="text-sm text-slate-600">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-[#ED1F24] mb-2">4.8★</div>
                  <div className="text-sm text-slate-600">Average Rating</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Download App Section */}
      <div className="bg-gradient-to-br from-slate-900 via-[#1a1a2e] to-slate-900 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED1F24]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ED1F24]/10 border border-[#ED1F24]/20 rounded-full mb-6">
                <Smartphone className="w-4 h-4 text-[#ED1F24]" />
                <span className="text-sm text-white">
                  {pageData?.appSection?.badgeText || 'Mobile App'}
                </span>
              </div>

              <h2 className="text-white mb-6 leading-tight">
                {pageData?.appSection?.title || 'Download Our App for Free Test Series'}
              </h2>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {pageData?.appSection?.description ||
                  'Get access to free test series, daily practice questions, live classes, and personalized study materials on the go.'}
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {(
                  pageData?.appSection?.features || [
                    { feature: 'Free daily test series with detailed solutions' },
                    { feature: 'Access to all free e-books and study materials' },
                    { feature: 'Live classes and recorded video lectures' },
                    { feature: 'Track your progress with performance analytics' },
                    { feature: 'Offline reading mode for downloaded content' },
                  ]
                ).map((f: { feature?: string | null }, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#ED1F24]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-[#ED1F24]" />
                    </div>
                    <p className="text-slate-300">{f.feature}</p>
                  </div>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={pageData?.appSection?.playStoreLink || 'https://play.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-slate-500">GET IT ON</div>
                    <div className="font-medium">Google Play</div>
                  </div>
                </a>
                <a
                  href={pageData?.appSection?.appStoreLink || 'https://www.apple.com/app-store'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-slate-500">Download on the</div>
                    <div className="font-medium">App Store</div>
                  </div>
                </a>
              </div>
            </div>

            {/* App Preview */}
            <div className="relative">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#ED1F24]/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />

                {/* Features Grid */}
                <div className="relative grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: BookOpen,
                      title: 'Free E-books',
                      value: '50+',
                    },
                    {
                      icon: Award,
                      title: 'Test Series',
                      value: '100+',
                    },
                    {
                      icon: Download,
                      title: 'Downloads',
                      value: '20k+',
                    },
                    {
                      icon: Star,
                      title: 'Rating',
                      value: '4.8★',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors"
                    >
                      <item.icon className="w-8 h-8 text-[#ED1F24] mb-3" />
                      <div className="text-3xl text-white mb-1">{item.value}</div>
                      <div className="text-sm text-slate-400">{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(pageData?.stats || []).map(
              (stat: { value?: string | null; label?: string | null }, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl text-[#ED1F24] mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
