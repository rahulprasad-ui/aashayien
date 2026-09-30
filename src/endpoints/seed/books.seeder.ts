export const booksSeederData = (imageId: string | number, authorImageId: string | number) => [
  {
    title: 'Complete Guide to Judiciary Prelims',
    slug: 'complete-guide-to-judiciary-prelims',
    author: 'Nitesh Pahuja',
    category: 'free',
    price: 'Free',
    priceValue: 0,
    description:
      'Comprehensive e-book covering all subjects for judiciary prelims examination with 500+ practice questions, case laws, and important amendments.',
    longDescription:
      'This comprehensive guide is specifically designed for judiciary prelims preparation. It covers all major subjects including Criminal Law, Civil Law, Constitutional Law, and more. With over 500 practice questions, landmark case laws, and recent amendments, this book provides everything you need to crack the prelims examination. The content is updated regularly to include the latest legal developments and exam patterns.',
    image: imageId,
    isFree: true,
    buyLink: 'https://play.google.com',
    tags: [{ tag: 'Prelims' }, { tag: 'Free' }, { tag: 'Complete Guide' }],
    rating: 4.8,
    reviews: 2450,
    pages: 850,
    language: 'English + Hindi',
    edition: '2024 Edition',
    isbn: '978-1234567890',
    publisher: 'Aashayein Publications',
    publicationDate: '2024-01-01T00:00:00.000Z',
    format: 'PDF E-book',
    fileSize: '15.2 MB',
    features: [
      { feature: '500+ Practice Questions with Detailed Solutions' },
      { feature: '100+ Landmark Judgments with Analysis' },
      { feature: 'Subject-wise Comprehensive Coverage' },
      { feature: 'Previous Year Questions (2015-2024)' },
      { feature: 'Latest Amendments and Legal Updates' },
      { feature: 'Memory Techniques and Study Tips' },
      { feature: 'Exam Pattern and Marking Scheme' },
      { feature: 'Free Updates for 1 Year' },
    ],
    tableOfContents: [
      {
        chapter: 'Constitutional Law',
        topics: [
          { topic: 'Fundamental Rights' },
          { topic: 'DPSP' },
          { topic: 'Union & States' },
          { topic: 'Amendments' },
        ],
        pages: '150 pages',
      },
      {
        chapter: 'Criminal Law',
        topics: [
          { topic: 'IPC' },
          { topic: 'CrPC' },
          { topic: 'Evidence Act' },
          { topic: 'Case Laws' },
        ],
        pages: '200 pages',
      },
    ],
    whatYouWillLearn: [
      { item: 'Master all subjects required for judiciary prelims' },
      { item: 'Understand landmark judgments and their implications' },
      { item: 'Learn effective answer writing techniques' },
      { item: 'Practice with 500+ questions and mock tests' },
      { item: 'Stay updated with latest amendments' },
    ],
    requirements: [
      { item: 'Basic understanding of Indian legal system' },
      { item: 'PDF reader on mobile/computer' },
    ],
    targetAudience: [
      { item: 'Judiciary Prelims Aspirants' },
      { item: 'Law Graduates preparing for competitive exams' },
      { item: 'ADPO Exam Candidates' },
    ],
    authorBio:
      'Renowned judiciary expert with 15+ years of teaching experience. Founder of Aashayein Judiciary, Mr. Nitesh Pahuja has mentored over 2000+ successful candidates.',
    authorImage: authorImageId,
    supportWhatsApp: '919111198177',
    whyChooseThisBook: [
      { point: 'Expert-curated content' },
      { point: 'Latest exam pattern' },
      { point: 'Trusted by 10,000+ students' },
      { point: 'Regular updates included' },
    ],
    guarantees: [
      { icon: 'truck', text: 'Free Delivery' },
      { icon: 'shield', text: 'Secure Payment' },
      { icon: 'clock', text: '7 Days Return' },
    ],
    studentReviews: [
      {
        name: 'Priya Sharma',
        achievement: 'UPPCS-J AIR 12',
        rating: 5,
        comment:
          'This book is a game-changer! The comprehensive coverage and practice questions helped me tremendously in my prelims preparation. Highly recommended!',
        date: '2024-02-15T00:00:00.000Z',
      },
    ],
  },
  {
    title: 'Criminal Law for Judiciary Exams',
    slug: 'criminal-law-for-judiciary-exams',
    author: 'Nitesh Pahuja',
    category: 'criminal-law',
    price: '₹599',
    originalPrice: '₹999',
    priceValue: 599,
    description:
      'In-depth coverage of IPC, CrPC, and Indian Evidence Act with latest amendments, landmark judgments, and exam-focused analysis.',
    longDescription:
      'This specialized book on Criminal Law is meticulously crafted for judiciary examination aspirants. It provides exhaustive coverage of IPC, CrPC, and Evidence Act with a focus on conceptual clarity and practical applications. Each section is explained with relevant case laws, recent amendments, and exam-oriented analysis. The book includes comparative charts, flowcharts, and memory aids to simplify complex topics.',
    image: imageId,
    isFree: false,
    buyLink: 'https://www.flipkart.com',
    tags: [{ tag: 'Criminal Law' }, { tag: 'IPC' }, { tag: 'CrPC' }],
    rating: 4.9,
    reviews: 3200,
    pages: 1200,
    language: 'English',
    edition: '5th Edition, 2024',
    isbn: '978-9876543210',
    publisher: 'Aashayein Publications',
    publicationDate: '2024-03-01T00:00:00.000Z',
    format: 'Hardcover + PDF',
    fileSize: '22.5 MB',
    features: [
      { feature: 'Comprehensive IPC coverage with all sections' },
      { feature: 'CrPC with latest amendments' },
      { feature: 'Evidence Act with illustrations' },
      { feature: '300+ Landmark Criminal Case Laws' },
    ],
    tableOfContents: [
      {
        chapter: 'Indian Penal Code',
        topics: [{ topic: 'General Exceptions' }, { topic: 'Offences Against State' }],
        pages: '450 pages',
      },
      {
        chapter: 'Criminal Procedure Code',
        topics: [{ topic: 'Arrest & Bail' }, { topic: 'Investigation & Trial' }],
        pages: '350 pages',
      },
    ],
    whatYouWillLearn: [
      { item: 'Complete mastery of IPC, CrPC, and Evidence Act' },
      { item: 'Understanding of criminal procedure and practice' },
      { item: 'Analysis of 300+ landmark judgments' },
      { item: 'Answer writing for criminal law questions' },
    ],
    requirements: [
      { item: 'Law graduation or basic legal knowledge' },
      { item: 'Commitment to structured study' },
    ],
    targetAudience: [
      { item: 'Judiciary Mains Aspirants' },
      { item: 'Law students preparing for exams' },
      { item: 'Practicing advocates' },
    ],
    authorBio:
      'Renowned judiciary expert with 15+ years of teaching experience. Founder of Aashayein Judiciary, Mr. Nitesh Pahuja has mentored over 2000+ successful candidates.',
    authorImage: authorImageId,
    supportWhatsApp: '919111198177',
    whyChooseThisBook: [
      { point: 'In-depth subject analysis' },
      { point: 'Landmark case law coverage' },
      { point: 'Quick revision charts' },
      { point: 'Exam-oriented approach' },
    ],
    guarantees: [
      { icon: 'truck', text: 'Express Shipping' },
      { icon: 'shield', text: '100% Original' },
      { icon: 'check', text: 'Quality Assured' },
    ],
    studentReviews: [
      {
        name: 'Rajat Kumar',
        achievement: 'Delhi JS AIR 23',
        rating: 5,
        comment:
          'Excellent resource for judiciary aspirants. The case laws section is particularly helpful. Worth every penny!',
        date: '2024-01-15T00:00:00.000Z',
      },
    ],
  },
]

export const booksPageSeederData = {
  hero: {
    badgeText: 'Premium Study Materials',
    title: 'Expert-Curated Books for Judiciary Exams',
    description:
      'Comprehensive study materials, practice books, and free e-books designed by experts to help you ace your judiciary examination.',
  },
  stats: [
    { value: '50+', label: 'Study Materials' },
    { value: '15+', label: 'Free E-books' },
    { value: '20k+', label: 'Downloads' },
    { value: '4.8★', label: 'Average Rating' },
  ],
  appSection: {
    badgeText: 'Mobile App',
    title: 'Download Our App for Free Test Series',
    description:
      'Get access to free test series, daily practice questions, live classes, and personalized study materials on the go.',
    features: [
      { feature: 'Free daily test series with detailed solutions' },
      { feature: 'Access to all free e-books and study materials' },
      { feature: 'Live classes and recorded video lectures' },
      { feature: 'Track your progress with performance analytics' },
      { feature: 'Offline reading mode for downloaded content' },
    ],
    playStoreLink: 'https://play.google.com',
    appStoreLink: 'https://www.apple.com/app-store',
  },
}
