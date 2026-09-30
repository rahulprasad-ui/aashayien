import type { Header, Branding } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { HeaderClient } from './Component.client'

export async function Header() {
  const headerData: Header = (await getCachedGlobal('header', 1)()) as Header
  const brandingData: Branding = (await getCachedGlobal('branding', 1)()) as Branding

  return <HeaderClient data={headerData} branding={brandingData} />
}
