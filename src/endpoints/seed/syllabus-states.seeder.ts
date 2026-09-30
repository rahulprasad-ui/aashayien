import type { Payload, PayloadRequest } from 'payload'

export const syllabusStatesSeederData = [
  {
    name: 'UP',
    fullName: 'Uttar Pradesh Judiciary (UPPCS-J)',
    code: 'up',
    type: 'judiciary',
    description:
      'The Uttar Pradesh Public Service Commission (UPPSC) conducts the UPPCS-J exam for recruitment of Civil Judges (Junior Division).',
    vacancies: '400+',
    popularity: 'high',
    tabs: [
      {
        generalInfo: {
          vacancies: '400+',
          description:
            'The Uttar Pradesh Public Service Commission (UPPSC) conducts the UPPCS-J exam for recruitment of Civil Judges (Junior Division).',
        },
      },
    ], // Note: The simplified data structure here will be mapped to the actual schema structure in the loop below if needed,
    // but based on the schema, fields are at the top level inside tabs, so we pass them directly as flat object if payload handles "tabs" field abstraction,
    // OR we construct the object to match the "tabs" field structure.
    // In Payload, fields defined in "tabs" are usually flattened in the API response/request unless they are named tabs.
    // Looking at SyllabusStates.ts, the tabs are UNNAMED (except for labels), meaning the fields are at the root level of the document.
    // Let's verify this assumption. Yes, fields in unnamed tabs are at the root.

    // General Info (Root fields as per schema)
    // Exam Pattern - Prelims
    prelims: {
      totalMarks: 450,
      duration: '2 Hours',
      totalQuestions: 150,
      negativeMarking: '0.33 marks',
      subjects: [
        { name: 'General Knowledge', questions: 150 },
        { name: 'Law', questions: 150 },
      ],
    },
    // Exam Pattern - Mains
    mains: {
      totalMarks: 1000,
      duration: '3 Hours per paper',
      papers: 6,
      description: 'The mains exam consists of 6 papers including GK, Language, and Law papers.',
    },
    // Syllabus
    syllabusTopics: [
      {
        category: 'Substantive Law',
        topics: [
          { topic: 'Law of Contracts' },
          { topic: 'Law of Partnership' },
          { topic: 'Law of Easement' },
          { topic: 'Law of Torts' },
          { topic: 'Transfer of Property Act' },
        ],
      },
      {
        category: 'Procedure and Evidence',
        topics: [
          { topic: 'Law of Evidence' },
          { topic: 'Criminal Procedure Code' },
          { topic: 'Civil Procedure Code' },
        ],
      },
    ],
    // Resources
    importantBooks: [
      { title: 'Indian Penal Code', author: 'Ratanlal & Dhirajlal', subject: 'Criminal Law' },
      { title: 'Civil Procedure Code', author: 'C.K. Takwani', subject: 'Civil Law' },
    ],
    preparationTips: [
      { tip: 'Focus on bare acts for Prelims.' },
      { tip: 'Practice answer writing daily for Mains.' },
    ],
    downloads: {
      syllabus: 'https://example.com/up-syllabus.pdf',
      pyq: 'https://example.com/up-pyq.pdf',
      notification: 'https://example.com/up-notification.pdf',
    },
    // Eligibility & Dates
    eligibility: {
      age: '22 to 35 Years',
      qualification: 'LL.B Degree',
      nationality: 'Indian',
      attempts: '4 Attempts',
    },
    examDates: {
      notification: '2024-11-01T00:00:00.000Z',
      prelimsExam: '2025-02-01T00:00:00.000Z',
      mainsExam: '2025-06-01T00:00:00.000Z',
      interview: '2025-10-01T00:00:00.000Z',
    },
  },
  {
    name: 'MP',
    fullName: 'Madhya Pradesh Judiciary (MPCJ)',
    code: 'mp',
    type: 'judiciary',
    description:
      'Madhya Pradesh High Court conducts the MPCJ exam. It is known for its focus on bare acts and direct questions.',
    vacancies: '150+',
    popularity: 'high',
    prelims: {
      totalMarks: 150,
      duration: '2 Hours',
      totalQuestions: 150,
      negativeMarking: 'None',
      subjects: [
        { name: 'Law', questions: 110 },
        { name: 'GK & Computer', questions: 40 },
      ],
    },
    mains: {
      totalMarks: 400,
      duration: '3 Hours per paper',
      papers: 4,
      description: 'Four papers: Civil Law I, Civil Law II, Criminal Law, and Writing Skill.',
    },
    syllabusTopics: [
      {
        category: 'Civil Law',
        topics: [{ topic: 'Constitution of India' }, { topic: 'Code of Civil Procedure' }],
      },
    ],
    importantBooks: [
      { title: 'MP Land Revenue Code', author: 'Local Author', subject: 'Local Law' },
      { title: 'Constitution', author: 'J.N. Pandey', subject: 'Constitutional Law' },
    ],
    preparationTips: [
      { tip: 'Memorize Bare Act sections.' },
      { tip: 'Read local laws thoroughly.' },
    ],
    downloads: {},
    eligibility: {
      age: '21 to 35 Years',
      qualification: 'LL.B Degree',
      nationality: 'Indian',
      attempts: 'No Limit',
    },
    examDates: {
      notification: '2025-01-01T00:00:00.000Z',
      prelimsExam: '2025-04-01T00:00:00.000Z',
      mainsExam: '2025-08-01T00:00:00.000Z',
      interview: '2025-11-01T00:00:00.000Z',
    },
  },
  {
    name: 'RJ',
    fullName: 'Rajasthan Judiciary (RJS)',
    code: 'rj',
    type: 'judiciary',
    description:
      'Rajasthan High Court conducts RJS. Hindi and English grammar play a crucial role.',
    vacancies: '80+',
    popularity: 'high',
    prelims: {
      totalMarks: 100,
      duration: '2 Hours',
      totalQuestions: 100,
      negativeMarking: 'None',
      subjects: [
        { name: 'Law', questions: 70 },
        { name: 'Hindi & English', questions: 30 },
      ],
    },
    mains: {
      totalMarks: 300,
      duration: '3 Hours',
      papers: 4,
      description: '',
    },
    syllabusTopics: [
      {
        category: 'Language',
        topics: [{ topic: 'Hindi Grammar' }, { topic: 'English Grammar' }],
      },
    ],
    importantBooks: [{ title: 'Hindi Vyakaran', author: 'Raghav Prakash', subject: 'Hindi' }],
    preparationTips: [{ tip: 'Do not ignore language papers.' }],
    downloads: {},
    eligibility: {
      age: '21 to 40 Years',
      qualification: 'LL.B Degree',
      nationality: 'Indian',
      attempts: 'No Limit',
    },
    examDates: {
      notification: '2024-12-01T00:00:00.000Z',
      prelimsExam: '2025-03-01T00:00:00.000Z',
      mainsExam: '2025-07-01T00:00:00.000Z',
      interview: '2025-10-01T00:00:00.000Z',
    },
  },
  // ADPO Example
  {
    name: 'UP ADPO',
    fullName: 'Uttar Pradesh Assistant Prosecution Officer',
    code: 'up-adpo',
    type: 'adpo',
    description:
      'UPPSC conducts the Assistant Prosecution Officer (APO) exam. It focuses heavily on Criminal Procedure and Evidence.',
    vacancies: '50+',
    popularity: 'medium',
    prelims: {
      totalMarks: 150,
      duration: '2 Hours',
      totalQuestions: 150,
      negativeMarking: '0.33 marks',
      subjects: [
        { name: 'GK', questions: 50 },
        { name: 'Law (Criminal)', questions: 100 },
      ],
    },
    mains: {
      totalMarks: 400,
      duration: '3 Hours',
      papers: 4,
      description: 'GK, Hindi, Criminal Law & Procedure, Law of Evidence.',
    },
    syllabusTopics: [
      {
        category: 'Criminal Law',
        topics: [
          { topic: 'IPC' },
          { topic: 'CrPC' },
          { topic: 'Evidence Act' },
          { topic: 'Police Act' },
        ],
      },
    ],
    importantBooks: [{ title: 'UP Police Regulations', author: 'Official', subject: 'Police Act' }],
    preparationTips: [{ tip: 'Master the Police Act and Regulations.' }],
    downloads: {},
    eligibility: {
      age: '21 to 40 Years',
      qualification: 'LL.B Degree',
      nationality: 'Indian',
      attempts: 'No Limit',
    },
    examDates: {
      notification: null,
      prelimsExam: null,
      mainsExam: null,
      interview: null,
    },
  },
]

export const seedSyllabusStates = async (payload: Payload, req: PayloadRequest) => {
  payload.logger.info(`— Seeding Syllabus States...`)

  // Check if we already have states to avoid duplicates if possible, or we wipe and recreate?
  // Index.ts wipes 'syllabus-states' if we add it to collectionsToClear.
  // We will assume it's cleared or we check for existence.

  for (const stateData of syllabusStatesSeederData) {
    const existing = await payload.find({
      collection: 'syllabus-states',
      where: { code: { equals: stateData.code } },
      req,
    })

    if (existing.totalDocs > 0) {
      // Update
      await payload.update({
        collection: 'syllabus-states',
        id: existing.docs[0].id,
        data: stateData as any,
        req,
      })
    } else {
      // Create
      await payload.create({
        collection: 'syllabus-states',
        data: stateData as any,
        req,
      })
    }
  }
}
