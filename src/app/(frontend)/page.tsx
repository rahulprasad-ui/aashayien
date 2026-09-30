import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'

import { Hero } from '@/components/aashayien/Hero'
import { CoursesSection } from '@/components/aashayien/CoursesSection'
// import { SuccessStoriesSection } from '@/components/aashayien/SuccessStoriesSection'
import { LatestEvents } from '@/components/aashayien/LatestEvents'
import { WhyChooseUs } from '@/components/aashayien/WhyChooseUs'
// import { Community } from '@/components/aashayien/Community'
import { FAQ } from '@/components/aashayien/FAQ'
import { FreeResourcesSection } from '@/components/aashayien/FreeResourcesSection'
import { Notifications } from '@/components/aashayien/Notifications'
import { BlogJudgments } from '@/components/aashayien/BlogJudgments'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Course, Event, Resource, SuccessStory, Branding, Vacancy } from '@/payload-types'
import { TrustIndicators } from '@/components/aashayien/TrustIndicators'
import { AchieversSection } from '@/components/aashayien/AchieversSection'
import { LeadCaptureSection } from '@/components/aashayien/LeadCaptureSection'
import { TestimonialsSection } from '@/components/aashayien/TestimonialsSection'
import { FounderSection } from '@/components/aashayien/FounderSection'
import { FinalCTA } from '@/components/aashayien/FinalCTA'
import type { Form } from '@payloadcms/plugin-form-builder/types'

import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const homeData: any = await getCachedGlobal('home', 1)()
  return generateMeta({ doc: homeData as any })
}

export default async function HomePage() {
  const payload = await getPayload({ config })
  const homeData: any = await payload.findGlobal({
    slug: 'home',
    draft: true,
    depth: 2,
  })
  const brandingData: Branding = (await getCachedGlobal('branding', 1)()) as Branding

  // --- Popular Courses Logic ---
  let coursesToShow: Course[] = []
  const coursesConfig = homeData.popularCourses
  const testimonialsConfig = homeData.testimonials
  const blogConfig = homeData.blogJudgments
  const resourcesConfig = homeData.resources
  const eventsConfig = homeData.events

  if (coursesConfig?.fetchType === 'custom' && coursesConfig?.selectedCourses?.length > 0) {
    // Determine IDs
    const courseIds = coursesConfig.selectedCourses.map((c: any) =>
      typeof c === 'object' ? c.id : c,
    )
    // Fetch them in correct order if possible, or just fetch
    const fetchedCourses = await payload.find({
      collection: 'courses',
      where: {
        id: {
          in: courseIds,
        },
      },
      limit: courseIds.length,
    })
    // Sort to match selection order if strictly needed, but roughly fine
    coursesToShow = fetchedCourses.docs
  } else if (coursesConfig?.fetchType === 'mostViewed') {
    const fetchedCourses = await payload.find({
      collection: 'courses',
      sort: '-views',
      limit: coursesConfig?.limit || 3,
    })

    coursesToShow = fetchedCourses.docs
  } else {
    // Default: 'latest'
    const fetchedCourses = await payload.find({
      collection: 'courses',
      sort: '-createdAt',
      limit: coursesConfig?.limit || 3,
    })
    coursesToShow = fetchedCourses.docs
  }

  // --- Resources Logic ---
  let resourcesToShow: Resource[] = []

  if (resourcesConfig?.fetchType === 'custom' && resourcesConfig?.selectedResources?.length > 0) {
    const resourceIds = resourcesConfig.selectedResources.map((r: any) =>
      typeof r === 'object' ? r.id : r,
    )
    const fetchedResources = await payload.find({
      collection: 'resources',
      where: {
        id: {
          in: resourceIds,
        },
      },
      limit: resourceIds.length,
    })
    resourcesToShow = fetchedResources.docs
  } else if (resourcesConfig?.fetchType === 'mostViewed') {
    const fetchedResources = await payload.find({
      collection: 'resources',
      sort: '-views',
      limit: resourcesConfig?.limit || 3,
    })
    resourcesToShow = fetchedResources.docs
  } else {
    // Default
    const fetchedResources = await payload.find({
      collection: 'resources',
      sort: '-uploadDate',
      limit: resourcesConfig?.limit || 3,
    })
    resourcesToShow = fetchedResources.docs
  }

  // --- Events Logic ---
  let eventsToShow: Event[] = []

  if (eventsConfig?.fetchType === 'custom' && eventsConfig?.selectedEvents?.length > 0) {
    const eventIds = eventsConfig.selectedEvents.map((e: any) => (typeof e === 'object' ? e.id : e))
    const fetchedEvents = await payload.find({
      collection: 'events',
      where: {
        id: {
          in: eventIds,
        },
      },
      limit: eventIds.length,
    })
    eventsToShow = fetchedEvents.docs
  } else {
    // Default: 'latest' by event date
    const fetchedEvents = await payload.find({
      collection: 'events',
      sort: '-date',
      limit: eventsConfig?.limit || 3,
    })
    eventsToShow = fetchedEvents.docs
  }

  // --- Notifications Events Fallback ---
  // Fetch latest events independently for the Notifications section
  // (so Notifications and LatestEvents can be configured separately)
  let notificationEventsToShow: Event[] = []
  if (homeData.featuredEvents && homeData.featuredEvents.length > 0) {
    notificationEventsToShow = homeData.featuredEvents as Event[]
  } else {
    const fetchedNotifEvents = await payload.find({
      collection: 'events',
      sort: '-date',
      limit: 20,
    })
    notificationEventsToShow = fetchedNotifEvents.docs
  }

  // --- Blog & Judgments Logic ---
  let postsToShow: any[] = []

  if (blogConfig?.fetchType === 'custom' && blogConfig?.selectedPosts?.length > 0) {
    const postIds = blogConfig.selectedPosts.map((p: any) => (typeof p === 'object' ? p.id : p))
    const fetchedPosts = await payload.find({
      collection: 'posts',
      where: {
        id: {
          in: postIds,
        },
      },
      limit: postIds.length,
      overrideAccess: false,
    })
    postsToShow = fetchedPosts.docs
  } else {
    // Default: 'latest'
    const fetchedPosts = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      limit: blogConfig?.limit || 3,
      depth: 2,
      overrideAccess: false,
    })
    postsToShow = fetchedPosts.docs
  }

  // --- Testimonials Logic ---
  let testimonialsToShow: SuccessStory[] = []

  if (
    testimonialsConfig?.fetchType === 'custom' &&
    testimonialsConfig?.selectedTestimonials?.length > 0
  ) {
    const testimonialIds = testimonialsConfig.selectedTestimonials.map((t: any) =>
      typeof t === 'object' ? t.id : t,
    )
    const fetchedTestimonials = await payload.find({
      collection: 'success-stories',
      where: {
        id: {
          in: testimonialIds,
        },
      },
      limit: testimonialIds.length,
    })
    testimonialsToShow = fetchedTestimonials.docs
  } else {
    // Default: 'latest' (filtered for those with testimonials)
    const fetchedTestimonials = await payload.find({
      collection: 'success-stories',
      where: {
        'testimonial.quote': {
          exists: true,
        },
      },
      sort: '-createdAt',
      limit: testimonialsConfig?.limit || 6,
    })
    testimonialsToShow = fetchedTestimonials.docs
  }

  // --- Achievers Logic (Student Results) ---
  let achieversToShow: SuccessStory[] = []
  const ACHIEVERS_LIMIT = homeData.resultsLimit || 6

  if (homeData.resultsFetchType === 'custom' && homeData.featuredResults?.length > 0) {
    const achieverIds = homeData.featuredResults.map((a: any) => (typeof a === 'object' ? a.id : a))
    const fetchedAchievers = await payload.find({
      collection: 'success-stories',
      where: {
        id: {
          in: achieverIds,
        },
      },
      limit: achieverIds.length,
    })
    achieversToShow = fetchedAchievers.docs
  } else if (homeData.resultsFetchType === 'topRanked') {
    const fetchedAchievers = await payload.find({
      collection: 'success-stories',
      sort: 'rank',
      limit: ACHIEVERS_LIMIT,
    })
    achieversToShow = fetchedAchievers.docs
  } else {
    // Default: 'latest'
    const fetchedAchievers = await payload.find({
      collection: 'success-stories',
      sort: '-createdAt',
      limit: ACHIEVERS_LIMIT,
    })
    achieversToShow = fetchedAchievers.docs
  }

  // --- Notifications Logic ---
  const fetchedVacancies = await payload.find({
    collection: 'vacancies',
    limit: 20,
    sort: '-createdAt',
  })
  const vacanciesToShow = fetchedVacancies.docs

  const fetchedSyllabusStates = await payload.find({
    collection: 'syllabus-states',
    limit: 100,
    sort: 'name',
  })
  const syllabusStatesToShow = fetchedSyllabusStates.docs

  const freeStudyGlobal = await payload.findGlobal({
    slug: 'free-study',
    draft: true,
    depth: 2,
  })

  const gatingConfig = {
    enableGating: freeStudyGlobal?.enableGating,
    gatingPopup:
      typeof freeStudyGlobal?.gatingPopup === 'object'
        ? freeStudyGlobal.gatingPopup
        : null,
  }

  const visibility = homeData.visibility || {}

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DocumentStructuredDataRenderer
        currentUrl={getServerSideURL()}
        doc={homeData}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'WebSite',
            mode: 'guided',
            overrides: {
              name: '{{siteTitle}}',
              url: '{{siteUrl}}',
              potentialSearchTarget: `${getServerSideURL()}/search?q={search_term_string}`,
            },
          },
          {
            enabled: true,
            schemaType: 'FAQPage',
            mode: 'guided',
          },
        ]}
      />
      {/* Hero Section (1) */}
      {visibility.hero !== false && <Hero slides={homeData.slides} branding={brandingData} />}
      {/* Latest Notifications (9) - MOVED HERE */}
      {visibility.notifications !== false && (
        <Notifications
          vacancies={
            homeData.featuredNotifications && homeData.featuredNotifications.length > 0
              ? (homeData.featuredNotifications as Vacancy[])
              : vacanciesToShow
          }
          syllabusDownloads={syllabusStatesToShow}
          events={notificationEventsToShow}
          gatingConfig={gatingConfig}
        />
      )}

      {/* Trust Indicators Section (2) */}
      {visibility.trustIndicators !== false && (
        <div id="trust">
          <TrustIndicators data={homeData.trustIndicators} />
        </div>
      )}

      {/* Student Results / Achievers Section (3) */}
      {visibility.achievers !== false && (
        <AchieversSection
          title={homeData.resultsTitle}
          subtitle={homeData.resultsSubtitle}
          description={homeData.resultsDescription}
          achievers={achieversToShow}
        />
      )}

      {/* Lead Capture Section (4) */}
      {visibility.leadCapture !== false && (
        <LeadCaptureSection
          title={homeData.leadTitle}
          description={homeData.leadDescription}
          form={homeData.leadForm as Form}
          features={homeData.leadFeatures}
          menteeCountText={homeData.menteeCountText}
          mentorAvatars={homeData.mentorAvatars}
        />
      )}

      {/* Founder / Mentor Section (5) */}
      {visibility.founder !== false && (
        <FounderSection
          sectionTitle={homeData.founderSectionTitle}
          sectionSubtitle={homeData.founderSectionSubtitle}
          founderImage={homeData.founderImage}
          founderImageDisplay={homeData.founderImageDisplay}
          founderName={homeData.founderName}
          founderRole={homeData.founderRole}
          founderIntro={homeData.founderIntro}
          experienceHighlights={homeData.experienceHighlights}
          founderCTA={homeData.founderCTA}
        />
      )}

      {/* Why Choose Aashayien (6) */}
      {visibility.whyChooseUs !== false && (
        <WhyChooseUs
          data={{
            whyChooseUsTitle: homeData.whyChooseUsTitle,
            whyChooseUsDescription: homeData.whyChooseUsDescription,
            whyChooseUsCards: homeData.whyChooseUsCards,
            whyChooseUsStats: homeData.whyChooseUsStats,
          }}
        />
      )}

      {/* Popular Courses Section (7) */}
      {visibility.courses !== false && (
        <CoursesSection
          title={coursesConfig?.title}
          subtitle={coursesConfig?.subtitle}
          description={coursesConfig?.description}
          courses={coursesToShow}
          viewAllLink={coursesConfig?.viewAllLink}
          branding={brandingData}
        />
      )}

      {/* Free Study Material Section (8) */}
      {visibility.resources !== false && (
        <FreeResourcesSection
          title={resourcesConfig?.title}
          subtitle={resourcesConfig?.subtitle}
          description={resourcesConfig?.description}
          resources={resourcesToShow}
          features={resourcesConfig?.features}
          viewAllLink={resourcesConfig?.viewAllLink}
          gatingConfig={gatingConfig}
        />
      )}

      {/* Latest Events (10) */}
      {visibility.events !== false && (
        <LatestEvents
          title={eventsConfig?.title}
          subtitle={eventsConfig?.subtitle}
          description={eventsConfig?.description}
          events={eventsToShow}
        />
      )}

      {/* Student Testimonials (11) */}
      {visibility.testimonials !== false && (
        <TestimonialsSection
          title={testimonialsConfig?.title}
          subtitle={testimonialsConfig?.subtitle}
          description={testimonialsConfig?.description}
          testimonials={testimonialsToShow}
          viewAllLink={testimonialsConfig?.viewAllLink}
        />
      )}

      {/* Blog Judgments (12) */}
      {visibility.blog !== false && (
        <BlogJudgments
          title={blogConfig?.title}
          subtitle={blogConfig?.subtitle}
          description={blogConfig?.description}
          posts={postsToShow}
          viewAllLink={blogConfig?.viewAllLink}
        />
      )}

      {/* FAQ Section (13) */}
      {visibility.faq !== false && <FAQ data={homeData.faqs} />}

      {/* Final CTA Section (14) */}
      {visibility.finalCTA !== false && <FinalCTA data={homeData.finalCTA} />}
    </div>
  )
}
