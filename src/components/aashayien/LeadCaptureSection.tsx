'use client'

import React from 'react'
import Image from 'next/image'
import { FormBlock } from '@/blocks/Form/Component'
import type { Form } from '@payloadcms/plugin-form-builder/types'
import { MessageSquare, Users, Sparkles, BookOpen } from 'lucide-react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media } from '@/payload-types'

interface LeadFeature {
  icon: string
  title: string
  description: string
}

interface LeadCaptureSectionProps {
  title?: string
  description?: string
  form?: Form
  features?: LeadFeature[]
  menteeCountText?: string
  mentorAvatars?: (string | Media)[]
}

const iconMap = {
  users: Users,
  messageSquare: MessageSquare,
  sparkles: Sparkles,
  bookOpen: BookOpen,
}

const defaultFeatures: LeadFeature[] = [
  {
    icon: 'users',
    title: 'Personalized Mentorship',
    description: 'One-on-one sessions to address your specific challenges.',
  },
  {
    icon: 'messageSquare',
    title: '24/7 Doubt Support',
    description: 'Get your queries resolved by experts anytime, anywhere.',
  },
]

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({
  title,
  description,
  form,
  features,
  menteeCountText,
  mentorAvatars,
}) => {
  const displayFeatures = features && features.length > 0 ? features : defaultFeatures
  const displayMenteeText = menteeCountText || 'Join 5000+ students already being mentored.'

  return (
    <section id="lead-form" className="py-12 lg:py-24 bg-white dark:bg-neutral-900 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-neutral-800/50 rounded-[2rem] lg:rounded-[2.5rem] p-5 sm:p-8 lg:p-16 border border-slate-100 dark:border-neutral-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ED1F24]/5 dark:bg-[#ED1F24]/5 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center relative z-10">
            {/* Left Side: Message */}
            <div className="space-y-6 lg:space-y-8 min-w-0">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 lg:mb-6 border border-blue-100 dark:border-blue-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Expert Guidance</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.2] lg:leading-[1.1] mb-4 lg:mb-6 break-words">
                  {title || 'Connect with ALEC Mentors'}
                </h2>
                <p className="text-slate-600 dark:text-neutral-400 text-base lg:text-xl leading-relaxed">
                  {description || 'Take the first step towards your judiciary career. Our expert mentors are here to guide you through every stage of your preparation.'}
                </p>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {displayFeatures.map((feature, index) => {
                  const Icon = iconMap[feature.icon as keyof typeof iconMap] || Users
                  const iconColor = index % 2 === 0 ? 'text-[#ED1F24]' : 'text-blue-600'
                  
                  return (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white dark:bg-neutral-800 shadow-lg flex items-center justify-center shrink-0 border border-slate-100 dark:border-neutral-700">
                        <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-slate-900 dark:text-white font-bold mb-0.5 lg:mb-1 text-sm lg:text-base truncate sm:whitespace-normal">{feature.title}</h4>
                        <p className="text-slate-500 dark:text-neutral-500 text-xs lg:text-sm">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-2 lg:pt-4">
                <div className="flex -space-x-3 mb-3 lg:mb-4">
                  {mentorAvatars && mentorAvatars.length > 0 ? (
                    mentorAvatars.map((avatar, i) => (
                      <div key={i} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white dark:border-neutral-800 bg-slate-200 dark:bg-neutral-700 overflow-hidden">
                        <Image 
                          src={typeof avatar === 'string' ? getMediaUrl(avatar) : getMediaUrl(avatar.url || '')} 
                          alt="Mentor" 
                          width={40}
                          height={40}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))
                  ) : (
                    [1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white dark:border-neutral-800 bg-slate-200 dark:bg-neutral-700 overflow-hidden">
                        <Image src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Mentor" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                    ))
                  )}
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white dark:border-neutral-800 bg-[#ED1F24] flex items-center justify-center text-white text-[8px] lg:text-[10px] font-bold">
                    +15
                  </div>
                </div>
                <p className="text-slate-500 dark:text-neutral-500 text-xs lg:text-sm font-medium">
                  {displayMenteeText.split(' ').map((word, i) => (
                    word.includes('+') ? <span key={i} className="text-slate-900 dark:text-white font-bold">{word} </span> : word + ' '
                  ))}
                </p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl lg:rounded-4xl p-5 sm:p-8 lg:p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-neutral-800 min-w-0">
              {form ? (
                <FormBlock 
                  form={form} 
                  enableIntro={false} 
                  disableContainer={true} 
                  submitButtonClassName="w-full bg-[#ED1F24] hover:bg-[#d11b20] text-white py-3.5 lg:py-4 rounded-xl font-bold text-base lg:text-lg shadow-lg shadow-[#ED1F24]/20 transition-all active:scale-[0.98] whitespace-normal h-auto min-h-[3rem]"
                />
              ) : (

                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-neutral-800 flex items-center justify-center text-slate-300 dark:text-neutral-600">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold">Form Not Selected</h4>
                    <p className="text-slate-500 dark:text-neutral-500 text-sm max-w-[200px] mx-auto mt-1">
                      Please select a form in the <span className="font-bold">Home {'->'} Lead Form</span> settings.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
