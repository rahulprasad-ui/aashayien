import { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '@/access/rbac'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: {
    read: publicReadOrModuleAccess('contact-page'),
    update: moduleAccess('contact-page', 'update'),
  },
  admin: {
    group: 'Site Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Title',
              defaultValue: 'Get in Touch',
              required: true,
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              label: 'Subtitle',
              defaultValue:
                'Have questions about our judiciary courses? We represent the most effective way to help needed to be done.',
            },
          ],
        },
        {
          label: 'Map',
          fields: [
            {
              name: 'mapUrl',
              type: 'text',
              label: 'Google Maps Embed URL',
              defaultValue:
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9866635848523!2d77.1356877755866!3d28.630159475666014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03b290cbbf6b%3A0xc666870b20163353!2sAashayein%20Judiciary%20Coaching!5e0!3m2!1sen!2sin!4v1709664478819!5m2!1sen!2sin',
            },
          ],
        },
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'Frequently Asked Questions',
            },
            {
              name: 'faqs',
              type: 'relationship',
              relationTo: 'faqs',
              hasMany: true,
              label: 'Questions & Answers',
            },
          ],
        },

        {
          label: 'Form',
          fields: [
            {
              name: 'formTitle',
              type: 'text',
              label: 'Form Title',
              defaultValue: 'Send Us a Message',
            },
            {
              name: 'formDescription',
              type: 'textarea',
              label: 'Form Description',
              defaultValue:
                'Fill out the form below and our team will get back to you within 24 hours.',
            },
            {
              name: 'contactForm',
              type: 'relationship',
              relationTo: 'forms',
              label: 'Contact Form',
            },
          ],
        },
        {
          label: 'Sidebar',
          fields: [
            {
              name: 'quickSupportTitle',
              type: 'text',
              label: 'Quick Support Title',
              defaultValue: 'Need Immediate Help?',
            },
            {
              name: 'quickSupportDescription',
              type: 'textarea',
              label: 'Quick Support Description',
              defaultValue:
                'Chat with our counselors on WhatsApp for instant support and course guidance.',
            },
            {
              name: 'quickSupportButtonLabel',
              type: 'text',
              label: 'Quick Support Button Label',
              defaultValue: 'Chat on WhatsApp',
            },
            {
              name: 'visitUsTitle',
              type: 'text',
              label: 'Visit Us Title',
              defaultValue: 'Visit Our Campus',
            },
            {
              name: 'visitUsDescription',
              type: 'textarea',
              label: 'Visit Us Description',
              defaultValue:
                'Meet our faculty, explore our facilities, and get personalized counseling.',
            },
            {
              name: 'visitUsButtonLabel',
              type: 'text',
              label: 'Visit Us Button Label',
              defaultValue: 'Book Appointment',
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              label: 'CTA Title',
              defaultValue: 'Join 50,000+ Successful Aspirants',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              label: 'CTA Description',
              defaultValue:
                'Start your judiciary preparation journey with expert guidance and comprehensive study material.',
            },
          ],
        },
      ],
    },
  ],
}
