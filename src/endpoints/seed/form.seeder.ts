import { RequiredDataFromCollectionSlug } from 'payload'

export const formSeederData: RequiredDataFromCollectionSlug<'forms'>[] = [
  {
    title: 'Hero Lead Form',
    fields: [
      {
        blockType: 'text',
        name: 'name',
        label: 'Your Name',
        columnWidth: '12',
        required: true,
      },
      {
        blockType: 'text',
        name: 'phone',
        label: 'Phone Number',
        columnWidth: '12',
        required: true,
      },
      {
        blockType: 'state',
        name: 'state',
        label: 'State',
        columnWidth: '12',
        required: true,
      },
      {
        blockType: 'select',
        name: 'medium',
        label: 'Medium',
        columnWidth: '12',
        options: [
          { label: 'Hindi', value: 'Hindi' },
          { label: 'English', value: 'English' },
          { label: 'Both', value: 'Both' },
        ],
      },
      {
        blockType: 'textarea',
        name: 'message',
        label: 'Message',
        columnWidth: '12',
      },
      {
        blockType: 'captcha',
        name: 'captcha',
        label: 'Captcha',
        required: true,
      },
    ],
    submitButtonLabel: 'Get Free Course Recommendations',
    confirmationType: 'message',
    confirmationMessage: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Thank you! We will get back to you soon.',
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    emails: [],
  },
  {
    title: 'Contact Us Form',
    fields: [
      {
        blockType: 'text',
        name: 'name',
        label: 'Full Name',
        columnWidth: '6',
        required: true,
      },
      {
        blockType: 'email',
        name: 'email',
        label: 'Email Address',
        columnWidth: '6',
        required: true,
      },
      {
        blockType: 'text',
        name: 'phone',
        label: 'Phone Number',
        columnWidth: '6',
        required: true,
      },
      {
        blockType: 'select',
        name: 'courseInterest',
        label: 'Course Interest',
        columnWidth: '6',
        options: [
          { label: 'Prelims Course', value: 'prelims' },
          { label: 'Mains Course', value: 'mains' },
          { label: 'Interview Preparation', value: 'interview' },
          { label: 'Foundation Course', value: 'foundation' },
          { label: 'Test Series', value: 'test-series' },
          { label: 'Other', value: 'other' },
        ],
      },
      {
        blockType: 'text',
        name: 'subject',
        label: 'Subject',
        columnWidth: '12',
        required: true,
      },
      {
        blockType: 'textarea',
        name: 'message',
        label: 'Message',
        columnWidth: '12',
        required: true,
      },
    ],
    submitButtonLabel: 'Send Message',
    confirmationType: 'message',
    confirmationMessage: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Thank you for contacting us! We'll get back to you shortly.",
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    emails: [],
  },
] as any
