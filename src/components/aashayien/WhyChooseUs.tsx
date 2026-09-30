'use client'

import { BookOpen } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

// Helper to get icon by name
const getIcon = (name: string) => {
  const iconList = (LucideIcons as any).icons ? (LucideIcons as any).icons : LucideIcons
  return (iconList as any)[name] || BookOpen
}

const colorPalette = [
  {
    color: 'text-amber-500',
    bgColor: 'bg-amber-100',
  },
  {
    color: 'text-[#ED1F24]',
    bgColor: 'bg-red-100',
  },
  {
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
  {
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    color: 'text-[#ED1F24]',
    bgColor: 'bg-red-100',
  },
  {
    color: 'text-rose-600',
    bgColor: 'bg-rose-100',
  },
  {
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
]

export function WhyChooseUs({ data }: { data?: any }) {
  // If no cards, don't render or render default?
  // Let's assume if there are dynamic cards, use them.
  // But wait, the user wants to add it "without changing the design".
  // The user implies REPLACING the content with dynamic content.

  const defaultCards = [
    {
      title: 'Expert Faculty',
      description: 'Learn from highly experienced mentors who have a proven track record.',
      icon: 'Users',
    },
    {
      title: 'Structured Curriculum',
      description: 'Comprehensive study materials and a well-planned syllabus for guaranteed success.',
      icon: 'BookOpen',
    },
    {
      title: 'Regular Mentorship',
      description: 'Get personalized attention and guidance to overcome your challenges.',
      icon: 'MessageSquare',
    },
    {
      title: 'Result-Oriented Preparation',
      description: 'Focused teaching methods designed to help you clear judiciary exams.',
      icon: 'Trophy',
    },
  ]

  const cards = (data?.whyChooseUsCards && Array.isArray(data.whyChooseUsCards) && data.whyChooseUsCards.length > 0)
    ? data.whyChooseUsCards 
    : defaultCards
  
  const stats = data?.whyChooseUsStats || []
  
  // More robust title/description check
  const title = (data?.whyChooseUsTitle && data.whyChooseUsTitle.trim() !== '') 
    ? data.whyChooseUsTitle 
    : 'Your Success is Our Mission'
    
  const description = (data?.whyChooseUsDescription && data.whyChooseUsDescription.trim() !== '')
    ? data.whyChooseUsDescription
    : 'We are committed to providing the best judiciary coaching with expert faculty, comprehensive resources, and personalized attention to each student.'

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-4">
            <span className="text-white font-bold">Why Choose Us</span>
          </div>
          <h2 className="text-slate-900 mb-4 font-bold">{title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((feature: any, index: number) => {
            const Icon = getIcon(feature.icon)
            const theme = colorPalette[index % colorPalette.length]

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all group overflow-hidden border border-slate-100"
              >
                {/* Gradient Top Bar */}
                <div className="h-2 bg-linear-to-r from-slate-600 via-[#ED1F24] to-slate-600"></div>

                <div className="p-6">
                  <div
                    className={`w-16 h-16 ${theme.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-8 h-8 ${theme.color}`} />
                  </div>
                  <h3 className="text-slate-900 mb-2 font-bold text-lg">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Bar */}
        {stats.length > 0 && (
          <div className="mt-16 bg-linear-to-r from-[#ED1F24] to-[#d11b20] rounded-2xl p-8 text-white shadow-xl">
            <div
              className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-8 text-center`}
            >
              {stats.map((stat: any, index: number) => (
                <div key={index}>
                  <div className="text-4xl mb-2 font-bold">{stat.value}</div>
                  <div className="text-white/90 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
