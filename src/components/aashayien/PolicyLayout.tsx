import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PolicyLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-[#ED1F24] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{title}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="policy-content">
          <h1 className="text-4xl! font-bold! text-slate-900 mb-4">{title}</h1>
          <p className="text-slate-500 mb-12">Last Updated: {lastUpdated}</p>

          <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900 prose-a:text-[#ED1F24] prose-a:no-underline hover:prose-a:underline">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
