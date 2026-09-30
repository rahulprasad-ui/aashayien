'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { SchemaOrg } from './SchemaOrg'
import { getServerSideURL } from '@/utilities/getURL'

export const BreadcrumbSchema: React.FC = () => {
  const pathname = usePathname()
  const baseUrl = getServerSideURL()

  if (!pathname || pathname === '/') return null

  const paths = pathname.split('/').filter(Boolean)
  const breadcrumbs = paths.map((path, index) => {
    const url = `${baseUrl}/${paths.slice(0, index + 1).join('/')}`
    
    // Humanize the path name (e.g., "about-us" -> "About Us")
    const name = path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return {
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: url,
    }
  })

  // Add the Home item at the beginning
  const breadcrumbList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
    ...breadcrumbs.map((item) => ({
      ...item,
      position: item.position + 1,
    })),
  ]

  return (
    <SchemaOrg
      type="BreadcrumbList"
      data={{
        itemListElement: breadcrumbList,
      }}
    />
  )
}
