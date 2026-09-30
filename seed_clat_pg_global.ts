import { getPayload } from 'payload'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const seedClatPgGlobal = async () => {
  const { default: configPromise } = await import('./src/payload.config')
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding CLAT PG Global data into Payload CMS...')

  const initialData = {
    showHero: true,
    showLeadForm: true,
    showTrustIndicators: true,
    showCourseCards: true,
    showDemoBanner: true,
    showExamInfoTabs: true,
    showYtSlider: true,
    showFaqAccordion: true,

    // Hero Settings
    heroSlides: [
      {
        badge: 'CLAT PG 2027 / 2028',
        tag: 'Master Foundation',
        title: 'Crack CLAT PG & Secure Your NLU Seat',
        subtitle:
          'Comprehensive 1-Year Live Classroom & Online Coaching for CLAT LL.M & AILET PG. Learn from India’s top NLU alumni and rankers.',
        highlight: 'Produce AIR 1, 3, 7 in CLAT PG 2024/2025',
        buttonText: 'Enroll Now & Book Demo',
        features: [
          { feature: 'Live Interactive Classes & Recorded Lectures' },
          { feature: '30+ Full Length CLAT PG Mock Tests with Ranking' },
          { feature: '1:1 Mentorship & Doubts Resolution' },
          { feature: 'Comprehensive LL.M Study Material & Landmark Judgments' },
        ],
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        badge: 'TARGET PROGRAM 2028',
        tag: '2-Year Long Term',
        title: 'Target Single Digit Rank in CLAT PG 2028',
        subtitle:
          'Specially crafted 2-Year Foundation Batch for 3rd & 4th year law undergraduates aiming for top National Law Universities.',
        highlight: 'Over 85% Selection Rate in Top NLUs',
        buttonText: 'Download Program Syllabus',
        features: [
          { feature: 'Complete LL.B Core Subjects & Case Laws' },
          { feature: 'Weekly Analytical Passage Solving Workshops' },
          { feature: 'Personalized Performance Analytics & Rank Predictor' },
        ],
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
    ],

    // Lead Form Content
    leadTitle: 'Best CLAT PG Online Coaching: 2027/28 Courses',
    leadDescription:
      'Trusted coaching for CLAT PG 2027 & 2028. Get access to expert NLU faculty, live + recorded classes, LMS portal, curated study material, and a proven track record of top ranks.',
    brochureUrl: '#',

    // Why Choose Us
    trustEyebrow: 'WHY CHOOSE US',
    trustTitle: 'The Bridge to Your Dream NLU',
    trustSubtitle:
      "Why Aashayein Judiciary is India's most trusted learning platform for CLAT PG & LL.M Preparation.",
    trustCards: [
      {
        title: 'Proven Track Record',
        description:
          'Consistently producing Single & Double-digit Ranks in CLAT PG & AILET PG exams over past years.',
        icon: 'trophy',
      },
      {
        title: 'Top NLU Faculty',
        description:
          'Learn directly from LL.M rankers, former judicial officers, and top National Law University academicians.',
        icon: 'users',
      },
      {
        title: 'Passage Analysis Mastery',
        description:
          'Specialized focus on Supreme Court landmark judgments, constitutional amendments, and recent legal developments.',
        icon: 'file-text',
      },
      {
        title: 'Comprehensive Mock Series',
        description:
          '40+ full-length and sectional mocks simulated on the exact recent CLAT PG exam pattern with detailed analysis.',
        icon: 'target',
      },
      {
        title: '1:1 Personal Mentorship',
        description:
          'Regular strategy calls, study plan customization, and 24x7 doubt resolution by expert mentors.',
        icon: 'heart-handshake',
      },
      {
        title: 'Curated LL.M Study Material',
        description:
          'Exhaustive subject-wise notes, case law summaries, jurisprudence modules, and monthly legal updates.',
        icon: 'book-open',
      },
    ],

    // Course Cards
    coursesTitle: 'CLAT PG Courses Designed for Your Success',
    coursesSubtitle: 'Choose the program that fits your preparation timeline and goals',
    customCourses: [
      {
        title: 'CLAT PG 2027 Master Foundation Batch',
        subtitle:
          'Comprehensive 1-Year Live Classroom & Online Coaching for CLAT LL.M & AILET PG 2027.',
        tags: 'CLAT PG 2027, Live Classes',
        price: '₹34,999',
        originalPrice: '₹49,999',
        discount: '30% OFF',
        features: [
          { feature: '350+ Hours Live Interactive Classes' },
          { feature: '30+ Full Length CLAT PG Mock Tests' },
          { feature: 'Hard Copy Study Material & Landmark Judgments Book' },
          { feature: '24x7 Doubt Clearance Portal & 1:1 Mentorship' },
        ],
      },
      {
        title: 'CLAT PG 2028 Target 2-Year Program',
        subtitle:
          'Designed for 3rd & 4th year law undergraduates aiming for AIR 1 in CLAT PG 2028.',
        tags: 'CLAT PG 2028, 2-Year Batch',
        price: '₹54,999',
        originalPrice: '₹79,999',
        discount: '31% OFF',
        features: [
          { feature: '600+ Hours Extensive Foundation Classes' },
          { feature: '50+ Full Length Mock Tests + Sectional Tests' },
          { feature: 'Complete Coverage of Undergraduate Law Subjects' },
          { feature: 'Weekly Passage-based Analytical Workshops' },
        ],
      },
      {
        title: 'CLAT PG Ultimate Mock Test Series & PYQ',
        subtitle:
          'Exhaustive Test Series featuring 40+ Mocks simulated exactly on recent CLAT PG exam patterns.',
        tags: 'Test Series, Self-Paced',
        price: '₹7,999',
        originalPrice: '₹14,999',
        discount: '46% OFF',
        features: [
          { feature: '40 Full Length Simulated CLAT PG Mocks' },
          { feature: '10 Previous Year Question Papers with Video Solutions' },
          { feature: 'All-India Ranking & Detailed Percentile Analytics' },
          { feature: 'Subject-wise Performance Breakdown' },
        ],
      },
    ],

    // Free Demo Banner
    demoTitle: 'Book Free Class of Online CLAT PG Coaching!',
    demoDescription:
      'Experience our high-yielding passage analysis methodology, expert NLU faculty guidance, and interactive doubt resolution first-hand.',
    demoButtonText: 'Book Your Spot Now',

    // Exam Info Tabs
    examInfoTitle: 'Information About CLAT PG Exam',
    examInfoSubtitle:
      'Everything you need to know about eligibility, exam structure, syllabus, dates, and opportunities.',
    examTabs: [
      {
        tabId: 'about-clat-pg',
        title: 'About CLAT PG',
        summary:
          'The Common Law Admission Test for Post Graduation (CLAT PG) is a national-level entrance exam conducted by the Consortium of NLUs for admission to LL.M. degree programs offered by 24 participating National Law Universities across India.',
        bullets: [
          {
            bullet:
              'CLAT PG scores are also utilized by top Public Sector Undertakings (PSUs) like BHEL, ONGC, NTPC, and IOCL for recruitment of legal officers.',
          },
          {
            bullet:
              'The exam focuses heavily on objective passage-based legal comprehension and analytical skills.',
          },
        ],
        details: [
          { label: 'Conducting Body', text: 'Consortium of National Law Universities (NLUs)' },
          { label: 'Exam Level', text: 'National Level Postgraduate (LL.M.)' },
          { label: 'Exam Mode', text: 'Offline (Pen-and-Paper Test)' },
          { label: 'Duration', text: '120 Minutes (2 Hours)' },
          { label: 'Language', text: 'English' },
        ],
      },
      {
        tabId: 'clat-pg-eligibility',
        title: 'CLAT PG Eligibility',
        summary:
          'Candidates applying for CLAT PG must satisfy the minimum educational qualification and percentage requirements prescribed by the Consortium of NLUs.',
        bullets: [
          { bullet: 'No upper age limit for appearing in the CLAT PG exam.' },
          {
            bullet:
              'Candidates in the final year of their qualifying LL.B. degree are also eligible to apply.',
          },
        ],
        details: [
          {
            label: 'Qualifying Degree',
            text: 'LL.B. Degree or equivalent examination from a recognized university',
          },
          {
            label: 'General / OBC / PwD Minimum Marks',
            text: 'Minimum 50% aggregate marks (or equivalent grade)',
          },
          {
            label: 'SC / ST Minimum Marks',
            text: 'Minimum 45% aggregate marks (or equivalent grade)',
          },
          { label: 'Age Limit', text: 'No Upper Age Limit' },
        ],
      },
      {
        tabId: 'clat-pg-exam-date',
        title: 'CLAT PG Exam Date',
        summary:
          'CLAT PG is usually conducted annually in December for the academic session starting the following year.',
        bullets: [
          { bullet: 'CLAT PG 2027 Exam Date: First / Second Sunday of December 2026' },
          { bullet: 'Application Window: July to November' },
        ],
        details: [
          { label: 'Notification Release', text: 'July 2026' },
          { label: 'Application Start Date', text: 'First Week of July 2026' },
          { label: 'Application End Date', text: 'First Week of November 2026' },
          { label: 'Admit Card Release', text: 'Last Week of November 2026' },
          { label: 'Exam Date', text: 'December 2026 (1:30 PM - 3:30 PM)' },
        ],
      },
      {
        tabId: 'subjects-in-clat-pg',
        title: 'Subjects in CLAT PG',
        summary:
          'The CLAT PG syllabus focuses on mandatory undergraduate LL.B. subjects with heavy emphasis on recent constitutional and landmark Supreme Court judgments.',
        bullets: [
          { bullet: 'Constitutional Law carries the highest weightage in the exam.' },
          {
            bullet:
              'Passages are extracted from recent landmark Supreme Court judgments, statutory provisions, and scholarly articles.',
          },
        ],
        details: [
          {
            label: 'Primary Subjects',
            text: 'Constitutional Law, Jurisprudence, Administrative Law',
          },
          {
            label: 'Core Criminal & Civil Laws',
            text: 'Law of Contracts, Torts, Criminal Law (IPC/BNSS), Family Law',
          },
          {
            label: 'Specialized Laws',
            text: 'International Law, Intellectual Property Law, Environmental Law, Tax Law',
          },
        ],
      },
      {
        tabId: 'clat-pg-exam-pattern',
        title: 'CLAT PG Exam Pattern',
        summary:
          'CLAT PG consists of objective-type passage-based questions designed to test legal comprehension, analytical reasoning, and knowledge of legal precedents.',
        bullets: [
          { bullet: 'Each passage is followed by 4-5 multiple-choice questions.' },
          {
            bullet:
              'A negative marking of 0.25 marks applies for every incorrect answer.',
          },
        ],
        details: [
          { label: 'Total Questions', text: '120 Multiple Choice Questions (MCQs)' },
          { label: 'Total Marks', text: '120 Marks' },
          {
            label: 'Marking Scheme',
            text: '+1 mark for correct answer, -0.25 for incorrect answer',
          },
          { label: 'Question Format', text: 'Passage-based Comprehension Questions' },
        ],
      },
    ],

    // YouTube Masterclasses
    ytTitle: 'Watch CLAT PG Masterclasses',
    ytSubtitle:
      'Free strategy sessions, landmark judgment analyses, and subject-wise lectures by Aashayein Judiciary experts.',
    ytVideos: [
      {
        title: 'How to Prepare for CLAT PG 2027: Strategy & Subject Breakdown',
        category: 'CLAT PG Strategy',
        youtubeId: 'dQw4w9WgXcQ',
        duration: '24:15',
      },
      {
        title: 'Landmark Supreme Court Judgments for CLAT LL.M 2026/27',
        category: 'Case Law Analysis',
        youtubeId: 'dQw4w9WgXcQ',
        duration: '42:10',
      },
      {
        title: 'Jurisprudence & Legal Theory Simplified | CLAT PG Crash Course',
        category: 'Jurisprudence',
        youtubeId: 'dQw4w9WgXcQ',
        duration: '35:45',
      },
      {
        title: 'Constitutional Law Passage Solving Techniques for CLAT PG',
        category: 'Constitutional Law',
        youtubeId: 'dQw4w9WgXcQ',
        duration: '28:30',
      },
    ],

    // FAQ Accordion
    faqTitle: 'CLAT PG Coaching FAQs',
    faqSubtitle:
      'Frequently asked questions about CLAT PG preparation, eligibility, and online coaching at Aashayein Judiciary.',
    customFaqs: [
      {
        question: 'How to Prepare for CLAT PG effectively?',
        answer:
          'Preparation for CLAT PG requires a strong grasp of Constitutional Law and major undergraduate law subjects, combined with regular reading of recent Supreme Court judgments. Practice passage-based mock tests weekly to improve speed and analytical accuracy.',
      },
      {
        question: 'What are the benefits of Online Coaching for CLAT PG?',
        answer:
          'Online coaching provides access to top NLU alumni mentors regardless of your location, flexible lecture schedules, recorded video revisers, digital mock test analytics, and instant doubt resolution.',
      },
      {
        question: 'What advantages do I get with Aashayein Judiciary CLAT PG Coaching?',
        answer:
          'You get 350+ hours of live interactive classes, curated summaries of 100+ landmark judgments, 40+ simulated mock tests, 1:1 personal mentorship, and comprehensive study modules crafted specifically for LL.M entrance exams.',
      },
      {
        question: 'Who must join CLAT PG Online Coaching by Aashayein Judiciary?',
        answer:
          'Law students in 3rd, 4th, or 5th year of LL.B., law graduates aiming for top 24 NLUs for LL.M., and candidates seeking legal officer roles in PSUs like ONGC, BHEL, and NTPC.',
      },
      {
        question: 'Is there any negative marking in the CLAT PG exam?',
        answer:
          'Yes, CLAT PG has a negative marking scheme where 0.25 marks are deducted for each incorrect objective response. Correct answers earn 1 mark.',
      },
    ],
  }

  try {
    await payload.updateGlobal({
      slug: 'clat-pg-global' as any,
      data: initialData,
      context: { disableRevalidate: true },
    })
    console.log('Successfully seeded CLAT PG Global data into Payload CMS database!')
    process.exit(0)
  } catch (error) {
    console.error('Failed to seed CLAT PG Global:', error)
    process.exit(1)
  }
}

seedClatPgGlobal()
