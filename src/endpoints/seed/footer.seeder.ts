export const footerSeederData: any = {
  brandDescription:
    'Aashayein Judiciary is India&apos;s leading platform for judiciary preparation, providing expert guidance, comprehensive resources, and personalized mentorship to help aspirants achieve their dreams.',
  socialLinks: [
    { platform: 'facebook', url: 'https://www.facebook.com/aashayeinjudiciary' },
    { platform: 'instagram', url: 'https://www.instagram.com/aashayeinjudiciary' },
    { platform: 'youtube', url: 'https://www.youtube.com/@aashayeinjudiciary' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/company/aashayeinjudiciary' },
    { platform: 'telegram', url: 'https://t.me/aashayein' },
  ],
  courses: [
    { link: { type: 'custom', url: '/courses?filter=live', label: 'Live Foundation Batch' } },
    { link: { type: 'custom', url: '/courses?filter=mains', label: 'Judgment Writing Special' } },
    {
      link: { type: 'custom', url: '/courses?filter=test-series', label: 'All India Test Series' },
    },
    { link: { type: 'custom', url: '/courses?filter=interview', label: 'Interview Prep Program' } },
    { link: { type: 'custom', url: '/courses?filter=recorded', label: 'Recorded Lectures' } },
  ],
  freeResources: [
    { link: { type: 'custom', url: '/free-resources/notes', label: 'Study Notes' } },
    { link: { type: 'custom', url: '/free-resources/pyq', label: 'Previous Year Questions' } },
    { link: { type: 'custom', url: '/free-resources/syllabus', label: 'Exam Syllabus' } },
    { link: { type: 'custom', url: '/free-resources/current-affairs', label: 'Current Affairs' } },
  ],
  landingPages: [
    { link: { type: 'custom', url: '/judiciary-preparation', label: 'Judiciary Preparation' } },
    { link: { type: 'custom', url: '/apo-adpo-exam', label: 'APO / ADPO Exam' } },
  ],
  companyLinks: [
    { link: { type: 'custom', url: '/blog', label: 'Blog' } },
    { link: { type: 'custom', url: '/about-us', label: 'About ALEC' } },
    { link: { type: 'custom', url: '/contact', label: 'Contact' } },
    { link: { type: 'custom', url: '/gallery', label: 'Gallery' } },
  ],
  contactInfo: {
    address: '123 Legal Avenue, Connaught Place, New Delhi - 110001, India',
    phone: '+91 96679 21888',
    email: 'info@aashayeinjudiciary.com',
    officeHours: 'Mon - Sat: 9:00 AM - 6:00 PM\nSunday: Closed',
  },
  bottomNav: {
    copyright: '© {year} Aashayein Judiciary. All rights reserved.',
    links: [
      { link: { type: 'custom', url: '/privacy-policy', label: 'Privacy Policy' } },
      { link: { type: 'custom', url: '/terms-conditions', label: 'Terms & Conditions' } },
      { link: { type: 'custom', url: '/refund-policy', label: 'Refund Policy' } },
    ],
  },
}
