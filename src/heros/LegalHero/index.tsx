import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Page } from '@/payload-types'

export const LegalHero: React.FC<Page['hero'] & { title?: string }> = ({ title }) => {
  return (
    <div className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
          <Link href="/" className="hover:text-[#ED1F24] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900">{title}</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
      </div>
    </div>
  )
}
