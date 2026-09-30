import type { Payload, PayloadRequest } from 'payload'

export const seedExtraGlobals = async (payload: Payload, req: PayloadRequest) => {
  payload.logger.info('— Seeding Extra Globals...')

  // 1. Blog Page
  await payload.updateGlobal({
    slug: 'blog',
    data: {
      heroTitle: 'Judiciary Insights & Resources',
      heroDescription: 'Expert articles, preparation strategies, legal updates, and success stories to guide your judiciary exam journey.',
      newsletterTitle: 'Weekly Legal Updates',
      newsletterDescription: 'Get expert articles, case law updates, and preparation tips delivered to your inbox.',
      ctaTitle: 'Start Your Journey',
      ctaDescription: 'Join thousands of successful judiciary aspirants with expert guidance.',
      ctaButtonText: 'Enroll Now',
      ctaLink: '/courses',
    },
    req,
  })

  // 2. Contact Page
  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      heroTitle: 'Get in Touch',
      heroSubtitle: 'Have questions about our judiciary courses? We represent the most effective way to help needed to be done.',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9866635848523!2d77.1356877755866!3d28.630159475666014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03b290cbbf6b%3A0xc666870b20163353!2sAashayein%20Judiciary%20Coaching!5e0!3m2!1sen!2sin!4v1709664478819!5m2!1sen!2sin',
      faqTitle: 'Frequently Asked Questions',
      formTitle: 'Send Us a Message',
      formDescription: 'Fill out the form below and our team will get back to you within 24 hours.',
      quickSupportTitle: 'Need Immediate Help?',
      quickSupportDescription: 'Chat with our counselors on WhatsApp for instant support and course guidance.',
      quickSupportButtonLabel: 'Chat on WhatsApp',
      visitUsTitle: 'Visit Our Campus',
      visitUsDescription: 'Meet our faculty, explore our facilities, and get personalized counseling.',
      visitUsButtonLabel: 'Book Appointment',
      ctaTitle: 'Join 50,000+ Successful Aspirants',
      ctaDescription: 'Start your judiciary preparation journey with expert guidance and comprehensive study material.',
    },
    req,
  })

  // 3. Free Study
  await payload.updateGlobal({
    slug: 'free-study',
    data: {
      badgeText: 'Free Study Resources',
      title: 'Free Study Online',
      subtitle: 'Access our complete library of free video lectures, case law analysis, study tips, and expert guidance for judiciary exam preparation by Nitesh Pahuja Sir.',
      panIndiaTitle: 'Pan India Reach',
      panIndiaSubtitle: 'From Himalayas to Coastlines',
      panIndiaDescription: 'Comprehensive judiciary exam preparation across 14+ Indian states with state-specific syllabus, local laws, and expert guidance from Nitesh Pahuja Sir.',
      panIndiaStats: {
        statesCount: '14+',
        videosCount: '1000+',
        viewsCount: '10M+',
      },
      buttonText: 'Download Brochure',
      enableGating: true,
    },
    req,
  })

  // 4. Events Page
  await payload.updateGlobal({
    slug: 'events-page',
    data: {
      hero: {
        title: 'Events & Webinars',
        description: 'Join our exclusive webinars, seminars, and scholarship tests to accelerate your judiciary preparation journey with expert guidance from Nitesh Pahuja Sir.',
        badgeText: 'Upcoming Events & Opportunities',
      },
      brochure: {
        title: 'Get Event Schedule Brochure',
      },
      faqs: [
        {
          question: 'How to register for a webinar?',
          answer: 'You can register by clicking the "Register" button on the event card.',
        },
        {
          question: 'Are scholarship tests online?',
          answer: 'Yes, most scholarship tests are conducted online through our platform.',
        },
      ],
    },
    req,
  })

  // 5. Syllabus Vacancy Global
  await payload.updateGlobal({
    slug: 'syllabus-vacancy-global',
    data: {
      badgeText: 'Complete Resource Hub for Judiciary Aspirants',
      title: 'State-wise Judiciary Syllabus, Vacancy & Previous Papers',
      description: 'Download comprehensive study material, check latest vacancies, and access previous year question papers for all major state judiciary exams.',
      stats: [
        { value: '28+', label: 'States' },
        { value: '500+', label: 'Previous Papers' },
        { value: '50K+', label: 'Active Students' },
      ],
      commonSubjectsTitle: 'Subjects in Judiciary Exams Syllabus',
      commonSubjectsDescription: "Here's a list of common subjects included in the Judiciary syllabus across most states:",
      prelimsTitle: 'Judiciary Exam Syllabus 2025 (Prelims)',
      prelimsDescription: 'Here is the syllabus for the Judiciary Prelims Exam, divided into specific subjects:',
      mainsTitle: 'Judiciary Exam Syllabus 2025 (Mains)',
      mainsDescription: "Here's the syllabus for the Judiciary Mains Exam presented in tabular form:",
      enrollCta: {
        title: 'Start Your Preparation',
        description: 'Join 50,000+ successful aspirants with expert guidance and comprehensive study material',
        buttonText: 'Enroll Now',
        buttonUrl: '/courses',
      },
      demoCta: {
        title: 'Book Free Demo Class',
        description: 'Experience our teaching methodology and course structure from expert faculty',
        buttonText: 'Book Free Demo',
        buttonUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
      },
    },
    req,
  })

  payload.logger.info('— Extra Globals seeded successfully.')
}
