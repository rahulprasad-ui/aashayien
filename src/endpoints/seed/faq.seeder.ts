import { RequiredDataFromCollectionSlug } from 'payload'

export const faqSeederData: RequiredDataFromCollectionSlug<'faqs'>[] = [
  {
    question: 'Who can apply for judiciary exams?',
    answer:
      'Any law graduate (LL.B.) from a recognized university can apply for the Judicial Services Examination. Final year students are also eligible to apply in some states. The age limit generally varies from 21 to 35 years depending on the state and category.',
  },
  {
    question: 'Do you provide online classes?',
    answer:
      'Yes, we offer both live interactive online classes and recorded sessions through our dedicated mobile app and web platform. Our online classes provide the same quality of mentorship and study material as our offline batches.',
  },
  {
    question: 'What is the course duration?',
    answer:
      'Our comprehensive foundation course typically spans 12 to 18 months, covering all major and minor laws, local acts, and language papers. We also offer fast-track batches and crash courses for specific state exams.',
  },
  {
    question: 'Do you offer test series?',
    answer:
      'Absolutely! We provide a robust test series including daily practice problems (DPPs), weekly mock tests for Prelims, and answer writing evaluation for the Mains examination to ensure you are exam-ready.',
  },
]
