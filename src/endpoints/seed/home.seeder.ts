import type { Media } from '@/payload-types'

export type HomeSeederArgs = {
  carouselImages: Media[]
  appImage: Media
  selectedFaqs: (string | number)[]
}

export const getHomeSeederData = ({ carouselImages, appImage, selectedFaqs }: HomeSeederArgs) => {
  return {
    slides: [
      {
        title: 'Your Path to Judiciary Excellence',
        description: "Join India's Most Trusted Judiciary Coaching Platform",
        image: carouselImages[0].id,
        features: [
          { text: '5000+ Selections' },
          { text: 'Expert Faculty' },
          { text: 'Live Classes' },
        ],
        link: {
          type: 'custom',
          url: '/courses',
          label: 'Explore Courses',
        },
      },
      {
        title: 'Judiciary Coaching Batch 2025 Open',
        description:
          'Comprehensive foundation batch for 2025 and kickstart your journey to becoming a judicial officer.',
        image: carouselImages[1] ? carouselImages[1].id : carouselImages[0].id,
        features: [
          { text: 'Daily Live Classes' },
          { text: 'Mock Interviews' },
          { text: 'Personalized Mentorship' },
        ],
        link: {
          type: 'custom',
          url: '/about-us',
          label: 'Learn More',
        },
      },
    ] as any,
    leadTitle: 'Start Your Judiciary Journey Today',
    leadDescription:
      'Fill in your details to receive personalized course recommendations and exclusive study materials worth ₹3000 absolutely free!',
    communityTitle: 'Join Our Judiciary Community',
    communitySubtitle: 'Get Free Test Series Worth ₹3000',
    communityDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Connect with thousands of judiciary aspirants, get daily practice questions, legal updates, and mentorship from experts including Nitesh Sir',
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
    appImage: appImage.id,
    founderImage: carouselImages[1] ? carouselImages[1].id : carouselImages[0].id,
    founderName: 'Anil Khanna',
    founderRole: 'Founder & Chief Mentor',
    founderIntro:
      'Leading authority in legal education with over 20 years of experience in mentoring judiciary aspirants.',
    experienceHighlights: [
      { text: '20+ Years of Teaching Experience' },
      { text: 'Mentored 5000+ Successful Candidates' },
      { text: 'Expert in Multiple State Judiciary Exams' },
    ],
    founderCTA: {
      label: 'Learn More About Anil Sir',
      link: '/about-us',
    },
    floatingStats: {
      stat1Value: '50K+',
      stat1Label: 'Active Users',
      stat2Value: '24/7',
      stat2Label: 'Support',
    },
    communityFeatures: [
      {
        title: 'Daily Notes',
        description: 'Get concise daily notes on important topics',
        icon: 'BookOpen',
      },
      {
        title: 'Live Doubt Solving',
        description: 'Get instant answers to your queries',
        icon: 'MessageSquare',
      },
      {
        title: 'Exam Alerts',
        description: 'Never miss important notifications',
        icon: 'Bell',
      },
      {
        title: 'Progress Tracking',
        description: 'Monitor your preparation journey',
        icon: 'TrendingUp',
      },
    ],
    communityBottomStats: [
      { value: '100K+', label: 'Community Members' },
      { value: '500+', label: 'Daily Posts' },
      { value: '5K+', label: 'Study Resources' },
      { value: '24/7', label: 'Support Available' },
    ],
    trustIndicators: [
      { icon: 'award', label: 'Top Rated', subLabel: 'Judiciary Coaching' },
      { icon: 'users', label: '5000+', subLabel: 'Success Stories' },
      { icon: 'trophy', label: 'National', subLabel: 'Excellence Award' },
      { icon: 'userCheck', label: 'Expert', subLabel: 'Mentorship' },
    ],
    whyChooseUsTitle: 'Your Success is Our Mission',
    whyChooseUsDescription:
      'We are committed to providing the best judiciary coaching with expert faculty, comprehensive resources, and personalized attention to each student.',
    whyChooseUsCards: [
      {
        title: '300+ Selections',
        description:
          'Our students have secured top ranks in various state judiciary examinations across India',
        icon: 'Trophy',
      },
      {
        title: '1 Lakh+ Subscribers',
        description:
          'Join our massive community of judiciary aspirants learning and growing together',
        icon: 'Users',
      },
      {
        title: '10+ Years Experience',
        description:
          'Our expert faculty brings over a decade of specialized judiciary coaching experience',
        icon: 'Award',
      },
      {
        title: 'Comprehensive Study Material',
        description:
          'Get access to detailed notes, practice questions, and mock tests for all subjects',
        icon: 'BookOpen',
      },
    ],
    whyChooseUsStats: [
      { value: '300+', label: 'Selections in 2024' },
      { value: '1L+', label: 'Active Subscribers' },
      { value: '10+', label: 'Years of Excellence' },
      { value: '95%', label: 'Student Satisfaction' },
    ],
    popularCourses: {
      title: 'Most Popular Courses',
      subtitle: 'Choose Your Path to Success',
      description: 'Join thousands of successful aspirants.',
      fetchType: 'latest',
      limit: 3,
      viewAllLink: {
        type: 'custom',
        url: '/courses',
        label: 'View All Courses',
      },
    },
    successStories: {
      title: 'Hall of Fame',
      subtitle: 'Join the Ranks of Successful Judiciary Aspirants',
      description: 'Inspiring stories of our students.',
      fetchType: 'latest',
      limit: 3,
      viewAllLink: {
        type: 'custom',
        url: '/success-stories',
        label: 'View All Success Stories',
      },
    },
    faqs: {
      title: 'Frequently Asked Questions',
      description: 'Everything you need to know about our courses and platform.',
      selectedFaqs,
    },
    finalCTA: {
      title: 'Start Your Journey Towards Becoming a Judge',
      description:
        'Join ALEC’s expert-led judiciary preparation programs and get the mentorship needed to succeed.',
      primaryCTA: {
        type: 'custom',
        url: '/contact',
        label: 'Get Mentorship',
      },
      secondaryCTA: {
        type: 'custom',
        url: '/courses',
        label: 'Download Brochure',
      },
    },
    resources: {
      title: 'Free Study Resources',
      subtitle: 'Expert Guidance For Free',
      description: 'Access our complete library of free video lectures.',
      fetchType: 'latest',
      limit: 6,
      features: [
        {
          title: '500+ Video Lectures',
          description: 'Comprehensive coverage of all subjects',
          icon: 'BookOpen',
        },
        {
          title: '1000+ Practice Questions',
          description: 'Topic-wise and full-length mock tests',
          icon: 'FileText',
        },
        {
          title: 'Weekly Live Sessions',
          description: 'Doubt clearing and current affairs',
          icon: 'Video',
        },
      ],
      viewAllLink: {
        type: 'custom',
        url: '/free-study-online',
        label: 'View All Resources',
      },
    },
    events: {
      title: 'Upcoming Legal Events',
      subtitle: 'Join Our Webinars & Seminars',
      description: 'Engage with legal experts and stay updated with the latest legal trends.',
      fetchType: 'latest',
      limit: 3,
    },
    blogJudgments: {
      title: 'Legal Articles & Landmark Judgments',
      subtitle: 'Blog & Judgments',
      description: 'Stay informed with our latest legal insights and judicial analysis.',
      fetchType: 'latest',
      limit: 3,
      viewAllLink: {
        type: 'custom',
        url: '/blog',
        label: 'View All Articles',
      },
    },
  }
}
