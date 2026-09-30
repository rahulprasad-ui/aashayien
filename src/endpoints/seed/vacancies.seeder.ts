import type { Payload, PayloadRequest } from 'payload'

export const seedVacancies = async (payload: Payload, req: PayloadRequest) => {
  payload.logger.info(`— Seeding Vacancies...`)

  // 1. Fetch States to link
  const upState = (
    await payload.find({
      collection: 'syllabus-states',
      where: { code: { equals: 'up' } },
      req,
    })
  ).docs[0]

  const mpState = (
    await payload.find({
      collection: 'syllabus-states',
      where: { code: { equals: 'mp' } },
      req,
    })
  ).docs[0]

  const rjState = (
    await payload.find({
      collection: 'syllabus-states',
      where: { code: { equals: 'rj' } },
      req,
    })
  ).docs[0]

  const vacancies = [
    {
      title: 'UP PCS-J 2025 Notification',
      date: '15th Jan 2025',
      tag: 'Vacancy',
      state: upState?.id,
      link: '/vacancy/up-pcs-j-2025', // Internal link logic if needed, or external
      description:
        'Uttar Pradesh Public Service Commission has released the notification for 400+ Civil Judge posts. Apply now!',
      status: 'Active',
      totalVacancies: 400,
      salary: '₹77,840 - ₹1,36,520',
      lastDate: '15th Feb 2025',
      officialLinks: {
        notification: 'https://uppsc.up.nic.in',
        apply: 'https://uppsc.up.nic.in/apply',
        officialWebsite: 'https://uppsc.up.nic.in',
      },
      breakdown: [
        { category: 'UR', seats: 160 },
        { category: 'OBC', seats: 108 },
        { category: 'SC', seats: 84 },
        { category: 'ST', seats: 8 },
        { category: 'EWS', seats: 40 },
      ],
      importantDates: [
        { label: 'Notification Released', date: '15 Jan 2025' },
        { label: 'Application Start', date: '20 Jan 2025' },
        { label: 'Last Date', date: '15 Feb 2025' },
        { label: 'Prelims Exam', date: 'May 2025' },
      ],
      applicationFee: [
        { category: 'General/OBC', fee: '₹125' },
        { category: 'SC/ST', fee: '₹65' },
        { category: 'PH', fee: '₹25' },
      ],
      qualifications: [
        { point: 'Bachelor of Laws (LL.B) from a recognized University.' },
        { point: 'Must be an Advocate enrolled under the Advocates Act 1961.' },
        { point: 'Age: 22 to 35 years.' },
      ],
    },
    {
      title: 'MP Civil Judge Recruitment 2025',
      date: '10th Jan 2025',
      tag: 'Vacancy',
      state: mpState?.id,
      description:
        'MP High Court invites applications for 150+ Civil Judge Class-II posts. Check eligibility and syllabus.',
      status: 'Upcoming',
      totalVacancies: 150,
      salary: '₹77,840 - ₹1,36,520',
      lastDate: 'TBA',
      officialLinks: {
        officialWebsite: 'https://mphc.gov.in',
      },
      breakdown: [
        { category: 'UR', seats: 70 },
        { category: 'Reserved', seats: 80 },
      ],
      importantDates: [{ label: 'Notification Expected', date: 'Jan 2025' }],
      qualifications: [{ point: 'Law Graduate.' }, { point: 'Age: 21 to 35 years.' }],
    },
    {
      title: 'Rajasthan Judiciary Result Declared',
      date: '5th Jan 2025',
      tag: 'Result',
      state: rjState?.id,
      description: 'RJS 2024 Final Result declared. Check the merit list and cut-off marks.',
      status: 'Closed',
      totalVacancies: 80,
      officialLinks: {
        officialWebsite: 'https://hcraj.nic.in',
      },
      importantDates: [{ label: 'Result Date', date: '5 Jan 2025' }],
    },
  ]

  for (const vacancy of vacancies) {
    // Delete existing like mocks if any based on title or simple create
    // Since we wipe 'vacancies' collection in index.ts, we just create
    await payload.create({
      collection: 'vacancies',
      data: vacancy as any,
      req,
    })
  }
}
