'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import type { Header, Branding } from '@/payload-types'
import { StaticNavbar } from '@/components/aashayien/StaticNavbar'

interface HeaderClientProps {
  data: Header
  branding: Branding
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, branding }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const isHomePage = pathname === '/'

  return <StaticNavbar scrollBased={false} branding={branding} headerData={data} />
}
