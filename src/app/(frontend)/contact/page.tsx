import { Contact } from '@/components/aashayien/Contact'
import type { Form } from '@/payload-types'
import config from '@/payload.config'
import { getPayload, type CollectionSlug } from 'payload'
import type { Branding, ContactPage as ContactPageType, Footer } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { DocumentStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateMetadata(): Promise<Metadata> {
  const contactPageData = (await getCachedGlobal('contact-page', 1)()) as ContactPageType
  return generateMeta({ doc: contactPageData as any, slug: 'contact' })
}
export default async function ContactPage() {
  const brandingData: Branding = (await getCachedGlobal('branding', 1)()) as Branding
  const contactPageData = (await getCachedGlobal('contact-page', 1)()) as ContactPageType
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer

  let form: Form | null = null

  if (contactPageData?.contactForm && typeof contactPageData.contactForm !== 'string') {
    form = contactPageData.contactForm as unknown as Form
  }

  return (
    <main>
      <DocumentStructuredDataRenderer
        currentUrl={`${getServerSideURL()}/contact`}
        doc={contactPageData as unknown as Record<string, any>}
        fallbackItems={[
          {
            enabled: true,
            schemaType: 'ContactPage',
            mode: 'guided',
          },
          {
            enabled: true,
            schemaType: 'FAQPage',
            mode: 'guided',
          },
        ]}
      />
      <Contact
        form={form}
        branding={brandingData}
        contactPage={contactPageData}
        footerData={footerData}
      />
    </main>
  )
}
