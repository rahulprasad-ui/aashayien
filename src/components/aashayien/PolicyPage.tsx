import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface PolicyPageProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function PolicyPage({ title, lastUpdated, children }: PolicyPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 pt-24">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="prose prose-slate prose-lg max-w-none">
          <h1 className="text-4xl! font-bold! text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-500 text-sm mb-12">Last Updated: {lastUpdated}</p>
          <div className="policy-content">{children}</div>
        </article>
      </div>

      <style jsx global>{`
        .policy-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e2e8f0;
        }
        .policy-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .policy-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: #334155;
        }
        .policy-content ul {
          list-style-type: disc;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .policy-content li {
          margin-bottom: 0.5rem;
          color: #334155;
        }
      `}</style>
    </div>
  )
}
