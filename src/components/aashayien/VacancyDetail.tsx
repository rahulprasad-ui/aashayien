'use client'

import React, { useState } from 'react'
import {
  ChevronRight,
  Download,
  FileText,
  Calendar,
  Clock,
  AlertCircle,
  Bell,
  ExternalLink,
  CheckCircle,
  Users,
  Target,
  FileCheck,
  UserCheck,
  DollarSign,
} from 'lucide-react'
import { Vacancy, Popup } from '@/payload-types'
import Link from 'next/link'
import { ResourceGateModal } from '../ResourceGateModal'

export function VacancyDetail({
  vacancyData,
  gatingConfig,
}: {
  vacancyData: Vacancy
  gatingConfig?: { enableGating?: boolean | null; gatingPopup?: string | Popup | null }
}) {
  const [isGateModalOpen, setIsGateModalOpen] = useState(false)
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null)

  // Safe accessors for data
  const data = vacancyData as any
  const stateData = typeof data.state === 'object' ? data.state : null
  const breakdown = data.breakdown || []
  const qualifications = data.qualifications || []
  const importantDates = data.importantDates || []
  const applicationFee = data.applicationFee || []
  const officialLinks = data.officialLinks || {}
  const downloadUrl = data.pdfUpload?.url || officialLinks.notification || data.link || ''

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

  // Tag Color Logic
  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Vacancy':
        return 'bg-green-100 text-green-700'
      case 'Syllabus':
        return 'bg-red-100 text-[#ED1F24]'
      case 'Important':
        return 'bg-red-100 text-[#ED1F24]'
      case 'Result':
        return 'bg-pink-100 text-pink-700'
      default:
        return 'bg-slate-100 text-slate-700'
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
            <Link href="/syllabus-vacancy" className="hover:text-[#ED1F24] transition-colors">
              Notifications
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 line-clamp-1">{data.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-start justify-between gap-6 flex-col lg:flex-row">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className={`px-3 py-1 rounded-md ${getTagColor(data.tag || '')}`}>
                  <span className="font-semibold text-sm">{data.tag}</span>
                </div>
                {data.status && (
                  <div className="px-3 py-1 bg-white/90 rounded-md">
                    <span className="text-sm font-medium text-slate-900">{data.status}</span>
                  </div>
                )}
                {stateData && (
                  <div className="px-3 py-1 bg-[#ED1F24] rounded-md">
                    <span className="text-sm font-medium text-white">{stateData.name}</span>
                  </div>
                )}
              </div>
              <h1 className="text-white mb-4 text-3xl font-bold">{data.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-white" />
                  <span>{stateData?.fullName || 'Judiciary Exam'}</span>
                </div>
                {data.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-white" />
                    <span>{data.date}</span>
                  </div>
                )}
                {data.totalVacancies && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-white" />
                    <span className="font-bold">{data.totalVacancies}</span>
                    <span>Posts</span>
                  </div>
                )}
              </div>
              <p className="text-lg text-white/90 leading-relaxed">{data.description}</p>
            </div>
            {(downloadUrl || officialLinks.apply) && (
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    onClick={(e) => handleDownload(e, downloadUrl)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors whitespace-nowrap font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download Notification
                  </a>
                )}
                {officialLinks.apply && data.tag === 'Vacancy' && (
                  <a
                    href={officialLinks.apply}
                    target="_self"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap font-medium"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Apply Online
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vacancy Breakdown */}
            {breakdown.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6 flex items-center gap-2 text-xl font-bold">
                  <Users className="w-6 h-6 text-[#ED1F24]" />
                  Vacancy Breakdown
                </h2>
                <div className="space-y-3">
                  {breakdown.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ED1F24] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {Math.round((item.seats / (data.totalVacancies || 1)) * 100)}%
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{item.category}</div>
                          <div className="text-xs text-slate-600">{item.seats} Posts</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#ED1F24]">{item.seats}</div>
                    </div>
                  ))}
                </div>
                {data.totalVacancies && (
                  <div className="mt-6 p-4 bg-linear-to-br from-[#ED1F24]/10 to-red-50 rounded-lg border border-[#ED1F24]/20">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-900 font-medium">Total Vacancies</span>
                      <span className="text-3xl font-bold text-[#ED1F24]">
                        {data.totalVacancies}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Salary Details */}
            {data.salary && (
              <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6 flex items-center gap-2 text-xl font-bold">
                  <DollarSign className="w-6 h-6 text-[#ED1F24]" />
                  Salary & Benefits
                </h2>
                <div className="grid sm:grid-cols-1 gap-4 mb-6">
                  <div className="p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Pay Scale</div>
                    <div className="text-base font-bold text-[#ED1F24]">{data.salary}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Benefits</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      'Dearness Allowance (DA)',
                      'House Rent Allowance (HRA)',
                      'Medical Facilities',
                      'Judicial Allowance',
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#ED1F24] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Selection Process (Static for now as not in schema, or derived from State if possible) */}
            {/* Using State Exam Pattern if available as proxy for Exam Details */}
            {stateData && (stateData.prelims || stateData.mains) && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6 flex items-center gap-2 text-xl font-bold">
                  <Target className="w-6 h-6 text-[#ED1F24]" />
                  Exam Pattern
                </h2>
                <div className="space-y-4">
                  {stateData.prelims && (
                    <div className="relative pl-12 pb-4 border-l-2 border-slate-200 last:border-l-0 last:pb-0">
                      <div className="absolute -left-[17px] top-0 w-8 h-8 bg-[#ED1F24] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h3 className="text-base text-slate-900 font-medium mb-2">
                          Preliminary Examination
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">
                          Objective Type - {stateData.prelims.totalMarks} Marks
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {stateData.prelims.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            MCQ
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {stateData.mains && (
                    <div className="relative pl-12 pb-4 border-l-2 border-slate-200 last:border-l-0 last:pb-0">
                      <div className="absolute -left-[17px] top-0 w-8 h-8 bg-[#ED1F24] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h3 className="text-base text-slate-900 font-medium mb-2">
                          Main Examination
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">
                          Descriptive Type - {stateData.mains.totalMarks} Marks
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            Descriptive
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="relative pl-12 pb-4 border-l-2 border-slate-200 last:border-l-0 last:pb-0">
                    <div className="absolute -left-[17px] top-0 w-8 h-8 bg-[#ED1F24] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h3 className="text-base text-slate-900 font-medium mb-2">
                        Interview / Viva-Voce
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">Personality Test</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* How to Apply (Static / Generic) */}
            {data.tag === 'Vacancy' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6 flex items-center gap-2 text-xl font-bold">
                  <FileCheck className="w-6 h-6 text-[#ED1F24]" />
                  How to Apply
                </h2>
                <div className="space-y-3">
                  {[
                    'Visit the official website (link provided in Important Links)',
                    'Navigate to the Recruitment/Career section',
                    "Click on 'Apply Online' for this notification",
                    'Register with valid email and mobile number',
                    'Fill the application form carefully',
                    'Upload required documents (Photo, Signature, etc.)',
                    'Pay the application fee if applicable',
                    'Submit and take a printout',
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#ED1F24] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm text-slate-700 flex-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Required Documents (Static / Generic) */}
            {data.tag === 'Vacancy' && (
              <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6 flex items-center gap-2 text-xl font-bold">
                  <FileText className="w-6 h-6 text-[#ED1F24]" />
                  Required Documents
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Recent Passport Size Photo',
                    'Scanned Signature',
                    '10th & 12th Certificates',
                    'LLB Degree & Marksheets',
                    'Caste Certificate (if applicable)',
                    'ID Proof (Aadhar/PAN)',
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200"
                    >
                      <CheckCircle className="w-5 h-5 text-[#ED1F24] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Instructions (Static / Generic) */}
            <div className="bg-linear-to-br from-yellow-50 to-white border border-yellow-200 rounded-xl p-6">
              <h2 className="text-slate-900 mb-6 flex items-center gap-2 text-xl font-bold">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                Important Instructions
              </h2>
              <div className="space-y-2">
                {[
                  'Read the official notification carefully before applying.',
                  'Ensure you meet all eligibility criteria.',
                  'Keep your credentials safe for future login.',
                  'Check the website regularly for updates.',
                ].map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-slate-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Important Dates */}
              {importantDates.length > 0 && (
                <div className="bg-linear-to-br from-[#ED1F24] to-red-700 rounded-xl p-6 text-white">
                  <h3 className="!text-lg text-white mb-4 flex items-center gap-2 font-bold">
                    <Calendar className="w-5 h-5" />
                    Important Dates
                  </h3>
                  <div className="space-y-3 text-sm">
                    {importantDates.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start justify-between gap-3 pb-3 border-b border-white/20 last:border-0"
                      >
                        <span className="text-red-100 text-xs flex-1">{item.label}</span>
                        <span className="text-white font-medium text-right text-xs whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Eligibility Criteria */}
              {qualifications.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="!text-lg text-slate-900 mb-4 flex items-center gap-2 font-bold">
                    <UserCheck className="w-5 h-5 text-[#ED1F24]" />
                    Eligibility Criteria
                  </h3>
                  <div className="space-y-3">
                    {qualifications.map((q: any, i: number) => (
                      <div
                        key={i}
                        className="pt-3 first:pt-0 border-t first:border-0 border-slate-100"
                      >
                        <div className="text-sm text-slate-900 font-medium">
                          {typeof q === 'string' ? q : q.point}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Application Fee */}
              {applicationFee.length > 0 && (
                <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                  <h3 className="!text-lg text-slate-900 mb-4 font-bold">Application Fee</h3>
                  <div className="space-y-3">
                    {applicationFee.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{item.category}</span>
                        <span className="text-sm font-medium text-slate-900">{item.fee}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Important Links */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="!text-lg text-slate-900 mb-4 flex items-center gap-2 font-bold">
                  <ExternalLink className="w-5 h-5 text-[#ED1F24]" />
                  Important Links
                </h3>
                <div className="space-y-2">
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      onClick={(e) => handleDownload(e, downloadUrl)}
                      className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group"
                    >
                      <span className="text-sm text-slate-900">Official Notification</span>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-[#ED1F24]" />
                    </a>
                  )}
                  {officialLinks.apply && (
                    <a
                      href={officialLinks.apply}
                      target="_self"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group"
                    >
                      <span className="text-sm text-slate-900">Apply Online</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#ED1F24]" />
                    </a>
                  )}
                  {officialLinks.officialWebsite && (
                    <a
                      href={officialLinks.officialWebsite}
                      target="_self"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group"
                    >
                      <span className="text-sm text-slate-900">Official Website</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#ED1F24]" />
                    </a>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-linear-to-br from-red-50 to-white border border-red-100 rounded-xl p-6">
                <h3 className="!text-lg text-slate-900 mb-4 font-bold">Quick Actions</h3>
                <div className="space-y-3">
                  {officialLinks.officialWebsite && (
                    <a
                      href={officialLinks.officialWebsite}
                      target="_self"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Official Website
                    </a>
                  )}
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      onClick={(e) => handleDownload(e, downloadUrl)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border-2 border-[#ED1F24] text-[#ED1F24] rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  )}
                </div>
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
