import React from 'react'
import RichText from '@/components/RichText'

import type { Page } from '@/payload-types'

export const SimpleHero: React.FC<
  Page['hero'] & { title?: string; showPageTitle?: boolean | null }
> = ({ title, showPageTitle = true, richText }) => {
  if (showPageTitle === false && !richText) {
    return null
  }

  return (
    <div className="bg-slate-50 border-b border-slate-200">
      {/* Matching the max-width of the content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {richText && (
          <div className="prose max-w-none">
            <RichText data={richText} enableGutter={false} enableProse={false} />
          </div>
        )}
        {!richText && showPageTitle !== false && (
          <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
        )}
      </div>
    </div>
  )
}
