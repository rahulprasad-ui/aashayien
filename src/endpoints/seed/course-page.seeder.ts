import type { Media } from '@/payload-types'

export type CoursePageSeederArgs = {
  communityImage: Media
  selectedFaqs: (string | number)[]
}

export const getCoursePageSeederData = ({ communityImage, selectedFaqs }: CoursePageSeederArgs) => {
  return {
    heroTitle: 'Transform Your Judiciary Dreams Into Reality',
    heroSubtitle:
      "India's most comprehensive judiciary exam preparation with expert faculty, teaching methodology, and a track record of top rankers",
    heroStats: [
      {
        icon: 'Users',
        value: '10,000+',
        label: 'Students Enrolled',
      },
      {
        icon: 'Award',
        value: '500+',
        label: 'Selections',
      },
      {
        icon: 'TrendingUp',
        value: '95%',
        label: 'Success Rate',
      },
      {
        icon: 'Shield',
        value: '15+',
        label: 'Years Experience',
      },
    ],
    offerStrip: {
      isActive: true,
      text: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '🎉 ',
                  version: 1,
                },
                {
                  type: 'text',
                  text: 'Limited Time Offer: ',
                  format: 1, // Bold
                  version: 1,
                },
                {
                  type: 'text',
                  text: 'Enroll now and get 40% OFF + Free Test Series Worth ₹9,999! ',
                  version: 1,
                },
                {
                  type: 'text',
                  text: 'Offer ends soon!',
                  format: 0,
                  style: 'color: #fde047;', // Yellow-300 roughly
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    helpWidget: {
      title: 'Need Help Choosing?',
      description: 'Get FREE counseling from our experts',
      whatsappLink:
        'https://wa.me/919111198177?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20courses',
      callNumber: '+919111198177',
      availabilityText: 'Available Mon-Sat, 9 AM - 8 PM',
    },
    counsellingWidget: {
      buttonText: 'Get Free Counselling',
      link: '#',
    },
    communityTitle: 'Join Our Free Community',
    communityDescription:
      'Get daily current affairs, judgment summaries, and free study materials. Connect with Nitesh Sir and thousands of aspiring judicial officers!',
    communityImage: communityImage.id,
    telegramLink: 'https://t.me/aashayeinjudiciary',
    appLink: '/courses',
    faqTitle: 'Frequently Asked Questions',
    selectedFaqs,
  }
}
