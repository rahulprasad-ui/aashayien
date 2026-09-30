import type { Media } from '@/payload-types'

export const getSuccessStoriesPageSeederData = () => {
  return {
    heroTitle: 'Celebrating Excellence & Achievement',
    heroDescription:
      'Meet our brilliant students who achieved their dreams with dedication, hard work, and the right guidance. Their success is our pride.',
    heroStats: [
      {
        icon: 'Trophy',
        label: 'Top Ranks',
        value: '150+',
      },
      {
        icon: 'Award',
        label: 'Success Stories',
        value: '300+',
      },
      {
        icon: 'TrendingUp',
        label: 'First Attempts',
        value: '120+',
      },
      {
        icon: 'Star',
        label: 'States Covered',
        value: '20+',
      },
    ],
    counsellingTitle: 'Get Free Personalized Counselling',
    counsellingDescription:
      'Not sure which course is right for you? Book a free one-on-one counselling session with our expert mentors. Get personalized guidance based on your preparation level, target exam, and career goals.',
    counsellingChecklist: [
      { text: 'Expert guidance from experienced judiciary professionals' },
      { text: 'Personalized study plan and strategy' },
      { text: 'Course recommendations based on your needs' },
      { text: 'Career path planning and exam selection guidance' },
    ],
    counsellingButtonText: 'Book Free Counselling Now',
    counsellingButtonLink:
      'https://wa.me/919667898146?text=I%20want%20to%20book%20a%20free%20counselling%20session',
    brochureTitle: 'Download Our Success Stories Brochure',
    brochureDescription:
      "Get detailed insights into our students' success journeys, course details, and preparation strategies. Download our comprehensive brochure now!",
    brochureButtonText: 'Download Brochure',
    ctaTitle: 'Be The Next Success Story',
    ctaDescription:
      'Join thousands of successful aspirants who achieved their dreams with Aashayein Judiciary. Your journey to success starts here.',
    ctaEnrollButtonText: 'Enroll Now',
    ctaEnrollButtonLink: '/courses',
    ctaTalkButtonText: 'Talk to Us',
    ctaTalkButtonLink: 'https://wa.me/919667898146',
  }
}
