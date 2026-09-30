import type { Block } from 'payload'

export const ClatPgBlockConfig: Block = {
  slug: 'clatPgBlock',
  labels: {
    singular: 'CLAT PG Landing Page Block',
    plural: 'CLAT PG Landing Page Blocks',
  },
  imageURL: '/block-previews/clatpg.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/clatpg.svg',
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Section Visibility & Form',
          fields: [
            {
              name: 'showHero',
              type: 'checkbox',
              label: 'Show Hero Section',
              defaultValue: true,
            },
            {
              name: 'showLeadForm',
              type: 'checkbox',
              label: 'Show Lead Capture Form Section',
              defaultValue: true,
            },
            {
              name: 'showTrustIndicators',
              type: 'checkbox',
              label: 'Show Why Choose Us / Trust Indicators Section',
              defaultValue: true,
            },
            {
              name: 'showCourseCards',
              type: 'checkbox',
              label: 'Show Course Cards Section',
              defaultValue: true,
            },
            {
              name: 'showDemoBanner',
              type: 'checkbox',
              label: 'Show Free Demo Class Banner',
              defaultValue: true,
            },
            {
              name: 'showExamInfoTabs',
              type: 'checkbox',
              label: 'Show Exam Info Tabbed Panel Section',
              defaultValue: true,
            },
            {
              name: 'showYtSlider',
              type: 'checkbox',
              label: 'Show YouTube Video Masterclasses Section',
              defaultValue: true,
            },
            {
              name: 'showFaqAccordion',
              type: 'checkbox',
              label: 'Show FAQ Accordion Section',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Hero Settings',
          fields: [
            {
              name: 'heroSlides',
              type: 'array',
              label: 'Hero Banner Slides',
              defaultValue: [
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
                },
              ],
              fields: [
                { name: 'badge', type: 'text', label: 'Pill Badge Text (e.g. JUDICIARY PREPARATION)' },
                { name: 'tag', type: 'text', label: 'Tag' },
                { name: 'title', type: 'text', label: 'Title', required: true },
                { name: 'subtitle', type: 'textarea', label: 'Subtitle / Description' },
                { name: 'highlight', type: 'text', label: 'Track Record Highlight' },
                { name: 'buttonText', type: 'text', label: 'Button Text (e.g. Get Started)' },
                { name: 'buttonLink', type: 'text', label: 'Button Link / URL (e.g. /syllabus or https://...)' },
                {
                  name: 'features',
                  type: 'array',
                  label: 'Green Check Features',
                  fields: [{ name: 'feature', type: 'text', label: 'Feature Item' }],
                },
                { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero Image' },
              ],
            },
          ],
        },
        {
          label: 'Lead Form Content',
          fields: [
            {
              name: 'form',
              type: 'relationship',
              relationTo: 'forms',
              label: 'Select Custom Dynamic Form (from Forms Collection)',
            },
            {
              name: 'leadBadge',
              type: 'text',
              label: 'Badge Text',
              defaultValue: 'CLAT PG 2027 / 2028 ADMISSIONS OPEN',
            },
            {
              name: 'leadTitle',
              type: 'text',
              label: 'H1 Headline Title',
              defaultValue: 'Best CLAT PG Online Coaching: 2027/28 Courses',
            },
            {
              name: 'leadDescription',
              type: 'textarea',
              label: 'Supporting Description',
              defaultValue:
                "Unlock top NLU ranks with Aashayein Judiciary's dedicated CLAT PG (LL.M.) program. Get access to live interactive sessions, expert law faculty, 24/7 doubt clearing, exhaustive study material, and full-length exam standard mock tests.",
            },
            {
              name: 'leadFeatures',
              type: 'array',
              label: 'Checklist Bullet Features',
              defaultValue: [
                { feature: 'Expert LL.M Faculty & Former NLU Alumni Mentors' },
                { feature: 'Comprehensive Constitutional, Penal & Commercial Law Coverage' },
                { feature: 'Real Exam Interface Mock Tests with In-depth Analytics' },
                { feature: 'Personalized Study Plan & 1:1 Performance Evaluation' },
              ],
              fields: [{ name: 'feature', type: 'text', label: 'Feature Item' }],
            },
            {
              name: 'counselingButtonText',
              type: 'text',
              label: 'Primary Button Text',
              defaultValue: 'Book Free Counselling',
            },
            {
              name: 'brochureButtonText',
              type: 'text',
              label: 'Brochure Button Text',
              defaultValue: 'Download Brochure',
            },
            {
              name: 'brochureUrl',
              type: 'text',
              label: 'Brochure Download URL / File Link',
              defaultValue: '/CLAT_PG.docx',
            },
          ],
        },
        {
          label: 'Why Choose Us',
          fields: [
            { name: 'trustEyebrow', type: 'text', label: 'Eyebrow Label', defaultValue: 'WHY CHOOSE US' },
            { name: 'trustTitle', type: 'text', label: 'Section Title', defaultValue: 'The Bridge to Your Dream NLU' },
            {
              name: 'trustSubtitle',
              type: 'textarea',
              label: 'Section Subtitle',
              defaultValue: "Why Aashayein Judiciary is India's most trusted learning platform for CLAT PG & LL.M Preparation.",
            },
            {
              name: 'trustCards',
              type: 'array',
              label: 'Trust Feature Cards',
              defaultValue: [
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
              fields: [
                { name: 'title', type: 'text', label: 'Card Title', required: true },
                { name: 'description', type: 'textarea', label: 'Card Description', required: true },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Card Icon',
                  defaultValue: 'trophy',
                  options: [
                    { label: 'Trophy (Rank / Record)', value: 'trophy' },
                    { label: 'Users (Faculty / Mentors)', value: 'users' },
                    { label: 'File Text (Passage / Case Laws)', value: 'file-text' },
                    { label: 'Target (Mock Test Series)', value: 'target' },
                    { label: 'Heart (1:1 Mentorship)', value: 'heart' },
                    { label: 'Heart Handshake', value: 'heart-handshake' },
                    { label: 'Book (Study Material)', value: 'book' },
                    { label: 'Book Open', value: 'book-open' },
                    { label: 'Shield (Trust / Guarantee)', value: 'shield' },
                    { label: 'Clock (24/7 Support)', value: 'clock' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Course Cards',
          fields: [
            { name: 'coursesBadge', type: 'text', label: 'Badge Text', defaultValue: 'CLAT PG PROGRAMS' },
            { name: 'coursesTitle', type: 'text', label: 'Section Title', defaultValue: 'CLAT PG Courses Designed for Your Success' },
            {
              name: 'coursesSubtitle',
              type: 'textarea',
              label: 'Section Subtitle',
              defaultValue: 'Choose the program that fits your preparation timeline and goals',
            },
            {
              name: 'coursesButtonText',
              type: 'text',
              label: 'Default Card Button Text',
              defaultValue: 'View Course Details',
            },
            {
              name: 'selectedCourses',
              type: 'relationship',
              relationTo: 'courses',
              hasMany: true,
              label: 'Select Courses from CMS',
            },
            {
              name: 'customCourses',
              type: 'array',
              label: 'Custom Course Cards',
              defaultValue: [
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
              fields: [
                { name: 'title', type: 'text', label: 'Course Title', required: true },
                { name: 'subtitle', type: 'textarea', label: 'Course Subtitle' },
                { name: 'tags', type: 'text', label: 'Tags (comma separated)' },
                { name: 'price', type: 'text', label: 'Discounted Price' },
                { name: 'originalPrice', type: 'text', label: 'Original Price' },
                { name: 'discount', type: 'text', label: 'Discount Badge Text' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Banner Image' },
                { name: 'buttonText', type: 'text', label: 'Card Button Text (e.g. View Course Details)' },
                { name: 'link', type: 'text', label: 'Card Button Link / URL (e.g. /courses/clat-pg-2027)' },
                {
                  name: 'features',
                  type: 'array',
                  label: 'Feature Checklist',
                  fields: [{ name: 'feature', type: 'text', label: 'Feature Item' }],
                },
              ],
            },
          ],
        },
        {
          label: 'Free Demo Banner',
          fields: [
            { name: 'demoBadge', type: 'text', label: 'Badge Text', defaultValue: 'DEMO CLASS' },
            { name: 'demoTitle', type: 'text', label: 'Banner Heading', defaultValue: 'Book Free Class of Online CLAT PG Coaching!' },
            {
              name: 'demoDescription',
              type: 'textarea',
              label: 'Banner Description',
              defaultValue:
                'Experience our high-yielding passage analysis methodology, expert NLU faculty guidance, and interactive doubt resolution first-hand.',
            },
            { name: 'demoButtonText', type: 'text', label: 'Button Text', defaultValue: 'BOOK YOUR SPOT NOW' },
            { name: 'demoButtonUrl', type: 'text', label: 'Button Link / URL (e.g. #clat-pg-form-container or /contact)' },
            {
              name: 'demoBackgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
              admin: {
                description: 'Recommended size: 1200 x 400 pixels (or 1920 x 500 px, Banner aspect ratio ~3:1 or 4:1).',
              },
            },
          ],
        },
        {
          label: 'Exam Info Tabs',
          fields: [
            { name: 'examInfoTitle', type: 'text', label: 'Section Title', defaultValue: 'Information About CLAT PG Exam' },
            {
              name: 'examInfoSubtitle',
              type: 'textarea',
              label: 'Section Subtitle',
              defaultValue: 'Everything you need to know about eligibility, exam structure, syllabus, dates, and opportunities.',
            },
            {
              name: 'examTabs',
              type: 'array',
              label: 'Exam Info Tabs',
              defaultValue: [
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
              fields: [
                { name: 'tabId', type: 'text', label: 'Tab ID Slug', required: true },
                { name: 'title', type: 'text', label: 'Tab Title', required: true },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Tab Icon',
                  defaultValue: 'book',
                  options: [
                    { label: 'Book (About / Syllabus)', value: 'book' },
                    { label: 'Graduation (Eligibility)', value: 'graduation' },
                    { label: 'Calendar (Exam Dates)', value: 'calendar' },
                    { label: 'Scale (Subjects / Law)', value: 'scale' },
                    { label: 'File (Pattern / Format)', value: 'file' },
                  ],
                },
                { name: 'summary', type: 'textarea', label: 'Tab Summary' },
                {
                  name: 'bullets',
                  type: 'array',
                  label: 'Key Highlight Bullets',
                  fields: [{ name: 'bullet', type: 'text', label: 'Bullet Point' }],
                },
                {
                  name: 'details',
                  type: 'array',
                  label: 'Key-Value Details',
                  fields: [
                    { name: 'label', type: 'text', label: 'Label' },
                    { name: 'text', type: 'text', label: 'Value / Text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'YouTube Masterclasses',
          fields: [
            { name: 'ytBadge', type: 'text', label: 'Badge Text', defaultValue: 'FREE VIDEO LECTURES & STRATEGY' },
            { name: 'ytTitle', type: 'text', label: 'Section Title', defaultValue: 'Watch CLAT PG Masterclasses' },
            {
              name: 'ytSubtitle',
              type: 'textarea',
              label: 'Section Subtitle',
              defaultValue:
                'Free strategy sessions, landmark judgment analyses, and subject-wise lectures by Aashayein Judiciary experts.',
            },
            {
              name: 'ytVideos',
              type: 'array',
              label: 'YouTube Videos',
              defaultValue: [
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
              fields: [
                { name: 'title', type: 'text', label: 'Video Title', required: true },
                { name: 'youtubeId', type: 'text', label: 'YouTube Video ID / URL', required: true },
                { name: 'category', type: 'text', label: 'Category Badge' },
                { name: 'duration', type: 'text', label: 'Duration (e.g. 15:30)' },
                { name: 'customThumbnail', type: 'upload', relationTo: 'media', label: 'Custom Thumbnail (Optional Override)' },
              ],
            },
          ],
        },
        {
          label: 'FAQ Accordion',
          fields: [
            { name: 'faqBadge', type: 'text', label: 'Badge Text', defaultValue: 'FREQUENTLY ASKED QUESTIONS' },
            { name: 'faqTitle', type: 'text', label: 'Section Title', defaultValue: 'CLAT PG Coaching FAQs' },
            {
              name: 'faqSubtitle',
              type: 'textarea',
              label: 'Section Subtitle',
              defaultValue:
                'Frequently asked questions about CLAT PG preparation, eligibility, and online coaching at Aashayein Judiciary.',
            },
            {
              name: 'selectedFaqs',
              type: 'relationship',
              relationTo: 'faqs',
              hasMany: true,
              label: 'Select FAQs from Collection',
            },
            {
              name: 'customFaqs',
              type: 'array',
              label: 'Custom FAQ Items',
              defaultValue: [
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
              fields: [
                { name: 'question', type: 'text', label: 'Question', required: true },
                { name: 'answer', type: 'textarea', label: 'Answer', required: true },
              ],
            },
          ],
        },
        {
          label: 'SEO & Metadata',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Best CLAT PG Online Coaching: 2027/28 Courses | Aashayein Judiciary',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue:
                'Join Aashayein Judiciary for top CLAT PG (LL.M.) online coaching. Get expert NLU mentors, live interactive classes, subject-wise test series, and 1:1 guidance.',
            },
            {
              name: 'metaKeywords',
              type: 'text',
              label: 'Keywords (Comma Separated)',
              defaultValue:
                'CLAT PG Online Coaching, Best CLAT PG Coaching 2027, CLAT LLM Online Classes, CLAT PG Mock Test Series, Aashayein Judiciary CLAT PG, AILET PG Coaching',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Social Share Image (OG Image)',
            },
          ],
        },
      ],
    },
  ],
}
