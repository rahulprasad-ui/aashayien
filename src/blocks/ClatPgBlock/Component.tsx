'use client'

import React from 'react'
import { ClatPgHero } from '@/components/ClatPg/ClatPgHero'
import { ClatPgLeadForm } from '@/components/ClatPg/ClatPgLeadForm'
import { ClatPgTrustIndicators } from '@/components/ClatPg/ClatPgTrustIndicators'
import { ClatPgCourseCards } from '@/components/ClatPg/ClatPgCourseCards'
import { ClatPgDemoCtaBanner } from '@/components/ClatPg/ClatPgDemoCtaBanner'
import { ClatPgExamInfoTabs } from '@/components/ClatPg/ClatPgExamInfoTabs'
import { ClatPgYtSlider } from '@/components/ClatPg/ClatPgYtSlider'
import { ClatPgFaqAccordion } from '@/components/ClatPg/ClatPgFaqAccordion'

export interface ClatPgBlockProps {
  showHero?: boolean
  showLeadForm?: boolean
  showTrustIndicators?: boolean
  showCourseCards?: boolean
  showDemoBanner?: boolean
  showExamInfoTabs?: boolean
  showYtSlider?: boolean
  showFaqAccordion?: boolean
  form?: any
  
  // Hero CMS Props
  heroSlides?: any[]

  // Lead Form CMS Props
  leadBadge?: string
  leadTitle?: string
  leadDescription?: string
  leadFeatures?: any[]
  counselingButtonText?: string
  brochureButtonText?: string
  brochureUrl?: string

  // Why Choose Us CMS Props
  trustEyebrow?: string
  trustTitle?: string
  trustSubtitle?: string
  trustCards?: any[]

  // Course Cards CMS Props
  coursesBadge?: string
  coursesTitle?: string
  coursesSubtitle?: string
  coursesButtonText?: string
  selectedCourses?: any[]
  customCourses?: any[]

  // Demo Banner CMS Props
  demoBadge?: string
  demoTitle?: string
  demoDescription?: string
  demoButtonText?: string
  demoButtonUrl?: string
  demoBackgroundImage?: any

  // Exam Info Tabs CMS Props
  examInfoTitle?: string
  examInfoSubtitle?: string
  examTabs?: any[]

  // YouTube Masterclasses CMS Props
  ytBadge?: string
  ytTitle?: string
  ytSubtitle?: string
  ytVideos?: any[]

  // FAQ Accordion CMS Props
  faqBadge?: string
  faqTitle?: string
  faqSubtitle?: string
  selectedFaqs?: any[]
  customFaqs?: any[]
}

export const ClatPgBlock: React.FC<ClatPgBlockProps> = (props) => {
  const {
    showHero = true,
    showLeadForm = true,
    showTrustIndicators = true,
    showCourseCards = true,
    showDemoBanner = true,
    showExamInfoTabs = true,
    showYtSlider = true,
    showFaqAccordion = true,
    form,

    heroSlides,
    leadBadge,
    leadTitle,
    leadDescription,
    leadFeatures,
    counselingButtonText,
    brochureButtonText,
    brochureUrl,
    trustEyebrow,
    trustTitle,
    trustSubtitle,
    trustCards,
    coursesBadge,
    coursesTitle,
    coursesSubtitle,
    coursesButtonText,
    selectedCourses,
    customCourses,
    demoBadge,
    demoTitle,
    demoDescription,
    demoButtonText,
    demoButtonUrl,
    demoBackgroundImage,
    examInfoTitle,
    examInfoSubtitle,
    examTabs,
    ytBadge,
    ytTitle,
    ytSubtitle,
    ytVideos,
    faqBadge,
    faqTitle,
    faqSubtitle,
    selectedFaqs,
    customFaqs,
  } = props

  const formId = typeof form === 'object' ? form?.id : form

  return (
    <div className="w-full">
      {showHero && <ClatPgHero slides={heroSlides} />}
      
      {showLeadForm && (
        <ClatPgLeadForm
          formId={formId}
          formObj={typeof form === 'object' ? form : null}
          badgeText={leadBadge}
          title={leadTitle}
          description={leadDescription}
          features={leadFeatures}
          counselingButtonText={counselingButtonText}
          brochureButtonText={brochureButtonText}
          brochureUrl={brochureUrl}
        />
      )}
      
      {showTrustIndicators && (
        <ClatPgTrustIndicators
          eyebrow={trustEyebrow}
          title={trustTitle}
          subtitle={trustSubtitle}
          cards={trustCards}
        />
      )}
      
      {showCourseCards && (
        <ClatPgCourseCards
          badgeText={coursesBadge}
          title={coursesTitle}
          subtitle={coursesSubtitle}
          buttonText={coursesButtonText}
          selectedCourses={selectedCourses}
          customCourses={customCourses}
        />
      )}
      
      {showDemoBanner && (
        <ClatPgDemoCtaBanner
          badgeText={demoBadge}
          title={demoTitle}
          description={demoDescription}
          buttonText={demoButtonText}
          buttonUrl={demoButtonUrl}
          backgroundImage={demoBackgroundImage}
        />
      )}
      
      {showExamInfoTabs && (
        <ClatPgExamInfoTabs
          title={examInfoTitle}
          subtitle={examInfoSubtitle}
          tabs={examTabs}
        />
      )}
      
      {showYtSlider && (
        <ClatPgYtSlider
          badgeText={ytBadge}
          title={ytTitle}
          subtitle={ytSubtitle}
          videos={ytVideos}
        />
      )}
      
      {showFaqAccordion && (
        <ClatPgFaqAccordion
          badgeText={faqBadge}
          title={faqTitle}
          subtitle={faqSubtitle}
          selectedFaqs={selectedFaqs}
          customFaqs={customFaqs}
        />
      )}
    </div>
  )
}
