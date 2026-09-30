import PrivacyClient from './PrivacyClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Aashayein Judiciary',
  description:
    'Read the Privacy Policy for Aashayein Judiciary to understand how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://aashayein.in/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyClient />
}
