import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Award } from 'lucide-react'

export const HighImpactHero: React.FC<
  Page['hero'] & { title?: string; showPageTitle?: boolean | null; badgeText?: string | null }
> = ({
  richText,
  badgeText,
  title, // Fallback if no richText h1
  showPageTitle = true,
}) => {
  return (
    <div className="relative pt-32 pb-20 bg-linear-to-br from-slate-900 via-[#1a1a2e] to-slate-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED1F24]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ED1F24]/10 border border-[#ED1F24]/20 rounded-full mb-6">
            <Award className="w-4 h-4 text-[#ED1F24]" />
            <span className="text-sm text-white">{badgeText || 'Complete Resource Hub'}</span>
          </div>

          {/* Render RichText if exists, otherwise Title */}
          <div className="high-impact-hero-content text-white mb-6 leading-tight prose prose-invert max-w-none">
            {richText && <RichText data={richText} enableGutter={false} enableProse={false} />}
            {!richText && showPageTitle !== false && (
              <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
