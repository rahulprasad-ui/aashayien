import type { Media } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type CourseSeederArgs = {
  thumbnail: Media
  instructorImage: Media
}

export const getCourseSeederData = ({
  thumbnail,
  instructorImage,
}: CourseSeederArgs): RequiredDataFromCollectionSlug<'courses'>[] => [
  {
    title: 'UPPCS-J Foundation Ultimate Course 2025',
    slug: 'live-foundation-ultimate',
    subtitle: 'Complete Judiciary Exam Preparation with Live Classes & Mentorship',
    category: 'live',
    courseMode: 'online',
    price: '₹99,999',
    originalPrice: '₹1,49,999',
    discount: '33% OFF',
    thumbnail: thumbnail.id,
    targetStates: ['Uttar Pradesh', 'All States'],
    isPopular: true,
    isBestSeller: true,
    instructor: {
      name: 'Nitesh Choubey',
      title: 'Founder & Director, Aashayein Judiciary',
      bio: 'Expert in Constitutional Law with 15+ years of teaching experience. Mentored 500+ successful judges.',
      image: instructorImage.id,
    },
    duration: '2 Years',
    lecturesCount: 800,
    language: 'Hindi & English',
    level: 'Beginner to Advanced',
    features: [
      { feature: 'Daily Live Classes' },
      { feature: 'One-to-One Mentorship' },
      { feature: 'Prelims & Mains Test Series' },
    ],
    highlights: [
      { title: 'Live Interactive Classes', description: 'Two-way audio capabilities for doubts' },
      {
        title: 'Comprehensive Study Material',
        description: 'Hard copy notes delivered to your doorstep',
      },
    ],
    learningOutcomes: [
      { outcome: 'Master Constitutional Law' },
      { outcome: 'Complete Code of Civil Procedure' },
      { outcome: 'Indian Penal Code In-Depth' },
    ],
    curriculum: [
      {
        title: 'Constitutional Law',
        lessonsCount: 45,
        duration: '60 hours',
        topics: [
          { topic: 'Preamble & Citizenship' },
          { topic: 'Fundamental Rights' },
          { topic: 'Directive Principles' },
        ],
      },
      {
        title: 'Indian Penal Code',
        lessonsCount: 50,
        duration: '70 hours',
        topics: [
          { topic: 'General Exceptions' },
          { topic: 'Offenses Against Body' },
          { topic: 'Offenses Against Property' },
        ],
      },
    ],
    demoVideos: [
      {
        title: 'Introduction to Constitution',
        type: 'youtube',
        youtubeUrl: 'https://www.youtube.com/watch?v=D0UnqGm_miA',
        duration: '45:00',
        topic: 'Constitutional Law',
      },
    ],
    enrollmentLink: 'https://wa.me/919111198177',
  },
  {
    title: 'MP Civil Judge Complete Recorded Batch',
    slug: 'mp-cj-recorded-complete',
    subtitle: 'Comprehensive Recorded Lectures for MP Judiciary Exam',
    category: 'recorded',
    courseMode: 'online',
    price: '₹24,999',
    originalPrice: '₹49,999',
    discount: '50% OFF',
    thumbnail: thumbnail.id,
    targetStates: ['Madhya Pradesh'],
    isPopular: true,
    isBestSeller: false,
    instructor: {
      name: 'Nitesh Choubey',
      title: 'Director',
      bio: 'Expert mentor for MP Judiciary exams.',
      image: instructorImage.id,
    },
    duration: '12 Months',
    lecturesCount: 450,
    language: 'Hindi & English',
    level: 'Intermediate',
    features: [
      { feature: 'Full Syllabus Coverage' },
      { feature: 'Unlimited Views' },
      { feature: 'PDF Notes' },
    ],
    highlights: [
      { title: 'Learn at your own pace', description: 'Access all lectures instantly' },
      { title: 'MP Specific Laws', description: 'Special focus on local lands laws' },
    ],
    learningOutcomes: [
      { outcome: 'Master MP Land Revenue Code' },
      { outcome: 'MP Accommodation Control Act' },
    ],
    curriculum: [
      {
        title: 'Local Laws',
        lessonsCount: 20,
        duration: '25 hours',
        topics: [{ topic: 'MPLRC Introduction' }, { topic: 'Revenue Officers' }],
      },
    ],
    demoVideos: [],
    enrollmentLink: 'https://wa.me/919111198177',
  },
  {
    title: 'RJS Prelims 2025 Test Series',
    slug: 'rjs-prelims-test-series',
    subtitle: 'High Yield Mock Tests for Rajasthan Judiciary',
    category: 'test-series',
    courseMode: 'online',
    price: '₹4,999',
    originalPrice: '₹9,999',
    discount: '50% OFF',
    thumbnail: thumbnail.id,
    targetStates: ['Rajasthan'],
    isPopular: false,
    isBestSeller: true,
    instructor: {
      name: 'Aashayein Team',
      title: 'Expert Panel',
      bio: 'Curated by rank holders and experts.',
      image: instructorImage.id,
    },
    duration: 'Exam till Date',
    lecturesCount: 0,
    language: 'Hindi & English',
    level: 'Advanced',
    features: [
      { feature: '20 Full Length Mocks' },
      { feature: 'Subject-wise Tests' },
      { feature: 'Detailed Analysis' },
    ],
    highlights: [
      { title: 'Real Exam Interface', description: 'Simulate the actual exam environment' },
    ],
    learningOutcomes: [{ outcome: 'Time Management' }, { outcome: 'Accuracy Improvement' }],
    curriculum: [
      {
        title: 'Mock Tests Schedule',
        lessonsCount: 20,
        duration: '2 hours each',
        topics: [{ topic: 'Mock Test 1' }],
      },
    ],
    demoVideos: [],
    enrollmentLink: 'https://wa.me/919111198177',
  },
  {
    title: 'Judgment Writing Special Batch',
    slug: 'judgment-writing-special',
    subtitle: 'Master the art of Judgment Writing for Mains',
    category: 'other',
    courseMode: 'online',
    price: '₹2,999',
    originalPrice: '₹5,999',
    discount: '50% OFF',
    thumbnail: thumbnail.id,
    targetStates: ['All States'],
    isPopular: true,
    isBestSeller: false,
    instructor: {
      name: 'Nitesh Choubey',
      title: 'Director',
      bio: 'Expert in Mains Answer Writing.',
      image: instructorImage.id,
    },
    duration: '2 Months',
    lecturesCount: 30,
    language: 'English',
    level: 'Intermediate',
    features: [
      { feature: 'Civil & Criminal Judgment' },
      { feature: 'Charge Framing' },
      { feature: 'Issue Framing' },
    ],
    highlights: [
      {
        title: 'Format & Structure',
        description: 'Learn the standard format accepted by commissions',
      },
      { title: 'Live Evaluation', description: 'Get your judgments evaluated live' },
    ],
    learningOutcomes: [{ outcome: 'Write Crisp Judgments' }, { outcome: 'Legal Reasoning' }],
    curriculum: [
      {
        title: 'Criminal Judgment',
        lessonsCount: 15,
        duration: '20 hours',
        topics: [{ topic: 'Marshaling of Evidence' }],
      },
    ],
    demoVideos: [],
    enrollmentLink: 'https://wa.me/919111198177',
  },
]
