import TermsClient from './TermsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Aashayein Judiciary',
  description:
    'Read the Terms & Conditions for Aashayein Judiciary to understand the rules and guidelines for using our platform.',
  alternates: {
    canonical: 'https://aashayein.in/terms-conditions',
  },
}

export default function TermsConditionsPage() {
  return <TermsClient />
}
