import type { GlobalConfig } from 'payload'
import { moduleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { revalidateBranding } from './hooks/revalidateBranding'

export const Branding: GlobalConfig = {
  slug: 'branding',
  label: 'Branding',
  typescript: {
    interface: 'Branding',
  },
  graphQL: {
    name: 'Branding',
  },
  access: {
    read: publicReadOrModuleAccess('branding'),
    update: moduleAccess('branding', 'update'),
  },
  admin: {
    group: 'Site Settings',
  },
  hooks: {
    afterChange: [revalidateBranding],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand & Meta',
          fields: [
            {
              name: 'brandAssets',
              label: 'Brand Assets',
              type: 'group',
              fields: [
                {
                  name: 'logo',
                  label: 'Logo',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                  admin: {
                    description: 'The main logo for your website. (Transparent PNG recommended)',
                  },
                },
                {
                  name: 'favicon',
                  label: 'Favicon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                  admin: {
                    description:
                      'The icon shown in browser tabs. (Recommended size: 32x32px or 64x64px)',
                  },
                },
                {
                  name: 'ogImage',
                  label: 'OG Image',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                  admin: {
                    description:
                      'The image shown when the home page is shared on social media. (Recommended size: 1200x630px)',
                  },
                },
              ],
            },
            {
              name: 'siteMeta',
              label: 'Site Meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  label: 'Site Title',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'Enter the website name',
                  },
                },
                {
                  name: 'description',
                  label: 'Meta Description',
                  type: 'textarea',
                  required: true,
                  admin: {
                    placeholder: 'Enter a brief description of the website for SEO',
                  },
                },
                {
                  name: 'keywords',
                  label: 'Meta Keywords',
                  type: 'text',
                  admin: {
                    placeholder: 'keyword1, keyword2, keyword3',
                    description: 'Comma separated values for SEO keywords.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Search Console',
          fields: [
            {
              name: 'searchConsole',
              label: 'Google Search Console',
              type: 'group',
              fields: [
                {
                  name: 'googleSiteVerification',
                  label: 'Google Site Verification Meta Tag Content',
                  type: 'text',
                  admin: {
                    description:
                      'Paste only the content value from Google Search Console, not the full meta tag.',
                    placeholder: 'abc123...',
                  },
                },
                {
                  name: 'dnsTxtRecord',
                  label: 'DNS TXT Record',
                  type: 'text',
                  admin: {
                    description:
                      'Optional reference for DNS verification. Add this TXT record in your domain DNS provider.',
                    placeholder: 'google-site-verification=abc123...',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Analytics & Tags',
          fields: [
            {
              name: 'analytics',
              label: 'Analytics & Tag Manager',
              type: 'group',
              fields: [
                {
                  name: 'ga4MeasurementId',
                  label: 'Google Analytics 4 Measurement ID',
                  type: 'text',
                  admin: {
                    description: 'Example: G-XXXXXXXXXX',
                    placeholder: 'G-XXXXXXXXXX',
                  },
                },
                {
                  name: 'googleTagManagerId',
                  label: 'Google Tag Manager Container ID',
                  type: 'text',
                  admin: {
                    description: 'Example: GTM-XXXXXXX',
                    placeholder: 'GTM-XXXXXXX',
                  },
                },
                {
                  name: 'conversionHeadScript',
                  label: 'Conversion Tracking Script - Head',
                  type: 'textarea',
                  admin: {
                    description:
                      'Optional trusted conversion script to inject in the document head. Use only scripts from trusted providers.',
                  },
                },
                {
                  name: 'conversionBodyScript',
                  label: 'Conversion Tracking Script - Body',
                  type: 'textarea',
                  admin: {
                    description:
                      'Optional trusted conversion script to inject after the GTM noscript block in the document body.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Contact & CTAs',
          fields: [
            {
              name: 'enrollButton',
              label: 'Enroll Button',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  label: 'Button Label',
                  type: 'text',
                  defaultValue: 'Enroll Now',
                },
                {
                  name: 'link',
                  label: 'Enroll Link',
                  type: 'text',
                  required: true,
                  defaultValue: '/courses',
                },
              ],
            },
            {
              name: 'contactInfo',
              label: 'Contact Info',
              type: 'group',
              fields: [
                {
                  name: 'phone',
                  label: 'Phone Number',
                  type: 'text',
                  defaultValue: '+919111198177',
                },
                {
                  name: 'whatsapp',
                  label: 'WhatsApp Number (with country code)',
                  type: 'text',
                  defaultValue: '919111198177',
                  admin: {
                    description: 'Enter number without + or spaces (e.g., 919111198177)',
                  },
                },
              ],
            },
            {
              name: 'stickyCTA',
              label: 'Sticky CTA Button',
              type: 'group',
              fields: [
                {
                  name: 'isActive',
                  label: 'Show Sticky CTA',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'label',
                  label: 'Button Label',
                  type: 'text',
                  defaultValue: 'Book Free Counselling Session',
                  admin: {
                    condition: (_, { isActive }) => isActive,
                  },
                },
                {
                  name: 'link',
                  label: 'Button Link',
                  type: 'text',
                  defaultValue: '/#lead-form',
                  admin: {
                    condition: (_, { isActive }) => isActive,
                  },
                },
              ],
            },
            {
              name: 'conversions',
              label: 'Global Conversions',
              type: 'group',
              fields: [
                {
                  name: 'showFloatingButtons',
                  label: 'Show Floating Contact Buttons Container',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'showWhatsapp',
                  label: 'Enable WhatsApp Button',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    condition: (_, { showFloatingButtons }) => showFloatingButtons,
                  },
                },
                {
                  name: 'showCall',
                  label: 'Enable Call Button',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    condition: (_, { showFloatingButtons }) => showFloatingButtons,
                  },
                },
                {
                  name: 'whatsappNumber',
                  label: 'Dynamic WhatsApp Number (Overrides Contact Info)',
                  type: 'text',
                  admin: {
                    description: 'Format: 91XXXXXXXXXX (without + or spaces)',
                    condition: (_, { showWhatsapp, showFloatingButtons }) =>
                      showFloatingButtons && showWhatsapp,
                  },
                },
                {
                  name: 'callNumber',
                  label: 'Dynamic Call Number (Overrides Contact Info)',
                  type: 'text',
                  admin: {
                    description: 'Format: +91XXXXXXXXXX',
                    condition: (_, { showCall, showFloatingButtons }) =>
                      showFloatingButtons && showCall,
                  },
                },
                {
                  name: 'brochure',
                  label: 'Global Brochure',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Upload a brochure that users can download from the floating buttons or sticky CTA.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Security',
          fields: [
            {
              name: 'captcha',
              label: 'Captcha Settings',
              type: 'group',
              fields: [
                {
                  name: 'captchaType',
                  type: 'select',
                  label: 'Global Captcha Type',
                  defaultValue: 'google',
                  options: [{ label: 'Google reCAPTCHA', value: 'google' }],
                  admin: {
                    description:
                      'This setting applies to custom forms that use the global captcha configuration.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
