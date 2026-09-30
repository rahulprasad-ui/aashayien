'use client'

import React, { useState } from 'react'
import {
  BookOpen,
  ChevronRight,
  Download,
  Award,
  CheckCircle,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  BookMarked,
  GraduationCap,
  Lightbulb,
  FileCheck,
  PlayCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { SyllabusState, Popup } from '@/payload-types'
import { ResourceGateModal } from '../ResourceGateModal'

export function SyllabusDetail({
  syllabusData,
  gatingConfig,
}: {
  syllabusData: SyllabusState
  gatingConfig?: { enableGating?: boolean | null; gatingPopup?: string | Popup | null }
}) {
  const [isGateModalOpen, setIsGateModalOpen] = useState(false)
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null)

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

  const imageUrl =
    typeof syllabusData.image === 'string'
      ? getMediaUrl(syllabusData.image)
      : typeof syllabusData.image === 'object' && syllabusData.image?.url
        ? getMediaUrl(syllabusData.image.url)
        : ''

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
            <Link href="/syllabus-vacancy" className="hover:text-[#ED1F24] transition-colors">
              Syllabus & Vacancy
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{syllabusData.fullName}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
        <div className="absolute inset-0 overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={syllabusData.fullName}
              fill
              className="object-cover opacity-20"
              unoptimized
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-[#ED1F24] rounded-md">
                  <span className="font-semibold text-white">{syllabusData.name}</span>
                </div>
                {syllabusData.popularity === 'high' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500 rounded-md">
                    <TrendingUp className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">Popular</span>
                  </div>
                )}
              </div>
              <h1 className="text-white mb-4 text-3xl! font-bold!!">{syllabusData.fullName}</h1>
              <p className="text-lg text-white/80 mb-6">{syllabusData.description}</p>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#ED1F24]" />
                  <span>Vacancies: {syllabusData.vacancies}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#ED1F24]" />
                  <span>State Judiciary</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {(syllabusData.downloads?.syllabusFile || syllabusData.downloads?.syllabus || syllabusData.syllabusFile || syllabusData.syllabusUrl) && (
                <button
                  onClick={(e) => {
                    const fileUrl = typeof syllabusData.downloads?.syllabusFile === 'object' ? syllabusData.downloads?.syllabusFile?.url : null
                    const legacyFileUrl = typeof syllabusData.syllabusFile === 'object' ? syllabusData.syllabusFile?.url : null
                    const url = fileUrl || syllabusData.downloads?.syllabus || legacyFileUrl || syllabusData.syllabusUrl
                    if (url) handleDownload(e, getMediaUrl(url, null, true))
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Syllabus
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Exam Pattern */}
            {(syllabusData.prelims || syllabusData.mains) && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6 flex items-center gap-2 font-bold text-xl!">
                  <FileCheck className="w-6 h-6 text-[#ED1F24]" />
                  Exam Pattern
                </h2>

                {/* Prelims Pattern */}
                {syllabusData.prelims && (
                  <div className="mb-6">
                    <h3 className="text-lg! text-slate-900 mb-4 font-bold">Prelims Exam</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      {syllabusData.prelims.totalMarks && (
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-sm text-slate-600 mb-1">Total Marks</div>
                          <div className="text-2xl text-[#ED1F24] font-bold">
                            {syllabusData.prelims.totalMarks}
                          </div>
                        </div>
                      )}
                      {syllabusData.prelims.duration && (
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-sm text-slate-600 mb-1">Duration</div>
                          <div className="text-2xl text-[#ED1F24] font-bold">
                            {syllabusData.prelims.duration}
                          </div>
                        </div>
                      )}
                      {syllabusData.prelims.totalQuestions && (
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-sm text-slate-600 mb-1">Total Questions</div>
                          <div className="text-2xl text-[#ED1F24] font-bold">
                            {syllabusData.prelims.totalQuestions}
                          </div>
                        </div>
                      )}
                      {syllabusData.prelims.negativeMarking && (
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-sm text-slate-600 mb-1">Negative Marking</div>
                          <div className="text-2xl text-[#ED1F24] font-bold">
                            {syllabusData.prelims.negativeMarking}
                          </div>
                        </div>
                      )}
                    </div>
                    {syllabusData.prelims.subjects && (
                      <div className="space-y-2">
                        {syllabusData.prelims.subjects.map((subject: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                          >
                            <span className="text-sm text-slate-900">{subject.name}</span>
                            <span className="text-sm text-[#ED1F24] font-medium">
                              {subject.questions} Questions
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Mains Pattern */}
                {syllabusData.mains && (
                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-lg! text-slate-900 mb-4 font-bold">Mains Exam</h3>
                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                      {syllabusData.mains.totalMarks && (
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-sm text-slate-600 mb-1">Total Marks</div>
                          <div className="text-2xl text-[#ED1F24] font-bold">
                            {syllabusData.mains.totalMarks}
                          </div>
                        </div>
                      )}
                      {syllabusData.mains.papers && (
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-sm text-slate-600 mb-1">Papers</div>
                          <div className="text-2xl text-[#ED1F24] font-bold">
                            {syllabusData.mains.papers}
                          </div>
                        </div>
                      )}
                      {syllabusData.mains.duration && (
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-sm text-slate-600 mb-1">Duration</div>
                          <div className="text-xl text-[#ED1F24] font-bold">
                            {syllabusData.mains.duration}
                          </div>
                        </div>
                      )}
                    </div>
                    {syllabusData.mains.description && (
                      <p className="text-sm text-slate-700">{syllabusData.mains.description}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Detailed Syllabus Topics */}
            {syllabusData.syllabusTopics && syllabusData.syllabusTopics.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6 flex items-center gap-2 font-bold text-xl!">
                  <BookOpen className="w-6 h-6 text-[#ED1F24]" />
                  Detailed Syllabus
                </h2>
                <div className="space-y-6">
                  {syllabusData.syllabusTopics.map((topic: any, index: number) => (
                    <div key={index}>
                      <h3 className="text-lg! text-slate-900 mb-3 flex items-center gap-2 font-bold">
                        <div className="w-8 h-8 bg-[#ED1F24] rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        {topic.category}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3 ml-10">
                        {topic.topics?.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-[#ED1F24] shrink-0 mt-0.5" />
                            <span>{item.topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Books */}
            {syllabusData.importantBooks && syllabusData.importantBooks.length > 0 && (
              <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6 flex items-center gap-2 font-bold text-xl!">
                  <BookMarked className="w-6 h-6 text-[#ED1F24]" />
                  Recommended Books
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {syllabusData.importantBooks.map((book: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#ED1F24]/10 rounded-lg flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5 text-[#ED1F24]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 mb-1">{book.title}</h4>
                          <p className="text-xs text-slate-600 mb-1">by {book.author}</p>
                          <span className="inline-block px-2 py-0.5 bg-red-50 text-[#ED1F24] text-xs rounded">
                            {book.subject}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preparation Tips */}
            {syllabusData.preparationTips && syllabusData.preparationTips.length > 0 && (
              <div className="bg-linear-to-br from-red-50 to-white border border-red-100 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6 flex items-center gap-2 font-bold text-xl!">
                  <Lightbulb className="w-6 h-6 text-[#ED1F24]" />
                  Preparation Tips
                </h2>
                <div className="space-y-3">
                  {syllabusData.preparationTips.map((item: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#ED1F24] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm text-slate-700">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Eligibility Criteria */}
              {syllabusData.eligibility && (
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg! text-slate-900 mb-4 flex items-center gap-2 font-bold">
                    <GraduationCap className="w-5 h-5 text-[#ED1F24]" />
                    Eligibility
                  </h3>
                  <div className="space-y-3">
                    {syllabusData.eligibility.age && (
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Age Limit</div>
                        <div className="text-sm text-slate-900 font-medium">
                          {syllabusData.eligibility.age}
                        </div>
                      </div>
                    )}
                    {syllabusData.eligibility.qualification && (
                      <div className="pt-3 border-t border-slate-100">
                        <div className="text-xs text-slate-600 mb-1">Qualification</div>
                        <div className="text-sm text-slate-900 font-medium">
                          {syllabusData.eligibility.qualification}
                        </div>
                      </div>
                    )}
                    {syllabusData.eligibility.nationality && (
                      <div className="pt-3 border-t border-slate-100">
                        <div className="text-xs text-slate-600 mb-1">Nationality</div>
                        <div className="text-sm text-slate-900 font-medium">
                          {syllabusData.eligibility.nationality}
                        </div>
                      </div>
                    )}
                    {syllabusData.eligibility.attempts && (
                      <div className="pt-3 border-t border-slate-100">
                        <div className="text-xs text-slate-600 mb-1">Attempts</div>
                        <div className="text-sm text-slate-900 font-medium">
                          {syllabusData.eligibility.attempts}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Important Dates */}
              {syllabusData.examDates && (
                <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg! text-slate-900 mb-4 flex items-center gap-2 font-bold">
                    <Calendar className="w-5 h-5 text-[#ED1F24]" />
                    Expected Dates
                  </h3>
                  <div className="space-y-3">
                    {syllabusData.examDates.notification && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-slate-600">Notification</div>
                          <div className="text-sm text-slate-900 font-medium">
                            {syllabusData.examDates.notification}
                          </div>
                        </div>
                      </div>
                    )}
                    {syllabusData.examDates.prelimsExam && (
                      <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                        <Clock className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-slate-600">Prelims Exam</div>
                          <div className="text-sm text-slate-900 font-medium">
                            {syllabusData.examDates.prelimsExam}
                          </div>
                        </div>
                      </div>
                    )}
                    {syllabusData.examDates.mainsExam && (
                      <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                        <Clock className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-slate-600">Mains Exam</div>
                          <div className="text-sm text-slate-900 font-medium">
                            {syllabusData.examDates.mainsExam}
                          </div>
                        </div>
                      </div>
                    )}
                    {syllabusData.examDates.interview && (
                      <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                        <Clock className="w-5 h-5 text-[#ED1F24] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-slate-600">Interview</div>
                          <div className="text-sm text-slate-900 font-medium">
                            {syllabusData.examDates.interview}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Downloads */}
              {syllabusData.downloads && (
                <div className="bg-linear-to-br from-[#ED1F24] to-red-700 rounded-xl p-6 text-white">
                  <h3 className="text-lg! text-white mb-4 font-bold">Download Resources</h3>
                  <div className="space-y-3">
                    {(syllabusData.downloads?.syllabusFile || syllabusData.downloads?.syllabus || syllabusData.syllabusFile || syllabusData.syllabusUrl) && (
                      <button
                        onClick={(e) => {
                          const fileUrl = typeof syllabusData.downloads?.syllabusFile === 'object' ? syllabusData.downloads?.syllabusFile?.url : null
                          const legacyFileUrl = typeof syllabusData.syllabusFile === 'object' ? syllabusData.syllabusFile?.url : null
                          const url = fileUrl || syllabusData.downloads?.syllabus || legacyFileUrl || syllabusData.syllabusUrl
                          if (url) handleDownload(e, getMediaUrl(url, null, true))
                        }}
                        className="w-full flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <span className="text-sm">Official Syllabus</span>
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    {(syllabusData.downloads?.pyqFile || syllabusData.downloads?.pyq || syllabusData.pyqUrl) && (
                      <button
                        onClick={(e) => {
                          const fileUrl = typeof syllabusData.downloads?.pyqFile === 'object' ? syllabusData.downloads?.pyqFile?.url : null
                          const url = fileUrl || syllabusData.downloads?.pyq || syllabusData.pyqUrl
                          if (url) handleDownload(e, getMediaUrl(url, null, true))
                        }}
                        className="w-full flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <span className="text-sm">Previous Papers</span>
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    {(syllabusData.downloads?.notificationFile || syllabusData.downloads?.notification || syllabusData.vacancyUrl) && (
                      <button
                        onClick={(e) => {
                          const fileUrl = typeof syllabusData.downloads?.notificationFile === 'object' ? syllabusData.downloads?.notificationFile?.url : null
                          const url = fileUrl || syllabusData.downloads?.notification || syllabusData.vacancyUrl
                          if (url) handleDownload(e, getMediaUrl(url, null, true))
                        }}
                        className="w-full flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <span className="text-sm">Notification</span>
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Video Lectures CTA */}
              <div className="bg-slate-900 text-white rounded-xl p-6">
                <PlayCircle className="w-12 h-12 text-[#ED1F24] mx-auto mb-3" />
                <h3 className="text-lg! text-white mb-2 text-center font-bold">
                  Free Video Lectures
                </h3>
                <p className="text-sm text-slate-300 mb-4 text-center">
                  Access our complete video library for {syllabusData.name} Judiciary preparation.
                </p>
                <Link
                  href="/free-study-online"
                  className="block w-full px-4 py-3 bg-[#ED1F24] text-white text-center rounded-lg hover:bg-[#d11b20] transition-colors font-medium"
                >
                  Watch Now
                </Link>
              </div>
            </div>
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
