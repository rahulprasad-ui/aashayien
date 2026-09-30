import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer as FooterType, Branding } from '@/payload-types'
import { Footer as AashayeinFooter } from '@/components/aashayien/Footer'

export async function Footer() {
  const footerData: FooterType = (await getCachedGlobal('footer', 1)()) as FooterType
  const brandingData: Branding = (await getCachedGlobal('branding', 1)()) as Branding

  return <AashayeinFooter branding={brandingData} footerData={footerData} />
}
