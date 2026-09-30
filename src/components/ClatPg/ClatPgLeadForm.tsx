'use client'

import React, { useState } from 'react'
import { Sparkles, Phone, Download, CheckCircle2 } from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import type { Form } from '@payloadcms/plugin-form-builder/types'

interface ClatPgLeadFormProps {
  formId?: string
  formObj?: Form | any
  badgeText?: string
  title?: string
  description?: string
  features?: string[] | any[]
  counselingButtonText?: string
  brochureButtonText?: string
  brochureUrl?: string
}

const defaultFeatures = [
  'Expert LL.M Faculty & Former NLU Alumni Mentors',
  'Comprehensive Constitutional, Penal & Commercial Law Coverage',
  'Real Exam Interface Mock Tests with In-depth Analytics',
  'Personalized Study Plan & 1:1 Performance Evaluation',
]

export const ClatPgLeadForm: React.FC<ClatPgLeadFormProps> = ({
  formId,
  formObj,
  badgeText = 'CLAT PG 2027 / 2028 ADMISSIONS OPEN',
  title = 'Best CLAT PG Online Coaching: 2027/28 Courses',
  description = "Unlock top NLU ranks with Aashayein Judiciary's dedicated CLAT PG (LL.M.) program. Get access to live interactive sessions, expert law faculty, 24/7 doubt clearing, exhaustive study material, and full-length exam standard mock tests.",
  features,
  counselingButtonText = 'Book Free Counselling',
  brochureButtonText = 'Download Brochure',
  brochureUrl,
}) => {
  const displayFeatures =
    Array.isArray(features) && features.length > 0
      ? features.map((f: any) => (typeof f === 'object' ? f.feature || f.text : f))
      : defaultFeatures

  const [brochureModalOpen, setBrochureModalOpen] = useState(false)

  const scrollToForm = () => {
    const el = document.getElementById('clat-pg-form-container')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      setBrochureModalOpen(true)
    }
  }

  const payloadForm = formObj || (typeof formId === 'object' ? formId : null)
  const hasPayloadFormFields = payloadForm && Array.isArray(payloadForm.fields) && payloadForm.fields.length > 0

  return (
    <section id="clat-pg-form-section" className="py-16 lg:py-24 bg-slate-50 dark:bg-neutral-900 border-y border-slate-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Headline & Information Block (Fixed lg:col-span-7 so layout never shifts) */}
          <div className="lg:col-span-7 space-y-6">


            {/* Headline Block */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/40 text-[#ED1F24] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{badgeText}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                {title}
              </h2>
              <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
                {description}
              </p>
            </div>

            {/* Feature Highlights with Red Circles */}
            <div className="space-y-3 pt-2">
              {displayFeatures.map((feat: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 text-slate-700 dark:text-neutral-300 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#ED1F24] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons Row matching Reference Screenshot */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ED1F24] hover:bg-red-700 text-white font-bold text-base shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02]"
              >
                <Phone className="w-5 h-5" />
                <span>{counselingButtonText}</span>
              </button>
              <button
                onClick={() => setBrochureModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-neutral-800 text-slate-900 dark:text-white font-bold text-base border border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-700 transition-all shadow-sm"
              >
                <Download className="w-5 h-5 text-[#ED1F24]" />
                <span>{brochureButtonText}</span>
              </button>
            </div>
          </div>

          {/* Right Column - Dynamic Payload Form Container (Only rendered if form is selected) */}
          {hasPayloadFormFields && (
            <div id="clat-pg-form-container" className="lg:col-span-5 sticky top-24">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-neutral-800 shadow-xl relative overflow-hidden">
                <FormBlock
                  form={payloadForm}
                  enableIntro={false}
                  disableContainer={true}
                  submitButtonClassName="w-full bg-[#ED1F24] hover:bg-[#d11b20] text-white py-3.5 lg:py-4 rounded-xl font-bold text-base lg:text-lg shadow-lg shadow-[#ED1F24]/20 transition-all active:scale-[0.98] whitespace-normal h-auto min-h-[3rem]"
                />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Brochure Download Modal */}
      {brochureModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-neutral-800 shadow-2xl relative">
            <button
              onClick={() => setBrochureModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ✕
            </button>
            <div className="text-center space-y-3 mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950 text-[#ED1F24] rounded-2xl flex items-center justify-center mx-auto">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Download CLAT PG Brochure</h3>
              <p className="text-slate-500 dark:text-neutral-400 text-xs">
                Click below to download the complete CLAT PG syllabus breakdown & course structure brochure.
              </p>
            </div>

            <button
              onClick={() => {
                setBrochureModalOpen(false)
                const link = document.createElement('a')
                link.href = brochureUrl || '/CLAT_PG.docx'
                link.download = 'CLAT_PG_Aashayein_Judiciary_Brochure.docx'
                link.click()
              }}
              className="w-full py-3.5 rounded-xl bg-[#ED1F24] text-white font-bold text-sm uppercase tracking-wider hover:bg-red-700 shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download File Now</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
