'use client'

import React from 'react'
import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

// Safer way to access icons, accounting for different export structures and the base Icon component

const iconList = (LucideIcons as any).icons ? (LucideIcons as any).icons : LucideIcons

interface DynamicIconProps extends LucideProps {
  name: string
  fallback?: React.ComponentType<LucideProps>
}

export const DynamicIcon = ({ name, fallback: Fallback, ...props }: DynamicIconProps) => {
  // Normalize checking (Lucide icons are usually PascalCase)
  // Ensure we don't try to render the base 'Icon' component or internal utilities

  const IconComponent = (iconList as any)[name]

  if (
    !IconComponent ||
    (typeof IconComponent !== 'function' && typeof IconComponent !== 'object')
  ) {
    if (Fallback) {
      return <Fallback {...props} />
    }
    return null
  }

  return <IconComponent {...props} />
}
