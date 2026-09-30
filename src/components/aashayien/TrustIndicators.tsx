import React from 'react'
import { Award, Users, Trophy, UserCheck } from 'lucide-react'
import type { Home } from '@/payload-types'

type TrustIndicatorsProps = {
  data?: Home['trustIndicators']
}

const iconMap = {
  award: Award,
  users: Users,
  trophy: Trophy,
  userCheck: UserCheck,
}

const defaultIndicators = [
  {
    icon: 'award',
    label: '15+ Years',
    subLabel: 'Teaching Experience',
  },
  {
    icon: 'users',
    label: '10,000+',
    subLabel: 'Students Mentored',
  },
  {
    icon: 'trophy',
    label: 'Hundreds',
    subLabel: 'Judicial Selections',
  },
  {
    icon: 'userCheck',
    label: 'Expert',
    subLabel: 'Faculty & Mentors',
  },
]

const colorConfig = [
  {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
  {
    color: 'text-[#ED1F24]',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-100',
  },
  {
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  {
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  },
]

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ data }) => {
  const items = data && data.length > 0 ? data : defaultIndicators

  return (
    <section className="relative z-20 -mt-12 mb-16 lg:mb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Award
            const theme = colorConfig[index % colorConfig.length]

            return (
              <div
                key={index}
                className="bg-white dark:bg-neutral-900 p-5 lg:p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-neutral-800 flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 lg:w-16 lg:h-16 ${theme.bgColor} rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 border ${theme.borderColor}`}
                >
                  <Icon className={`w-6 h-6 lg:w-8 lg:h-8 ${theme.color}`} />
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <div className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    {item.label}
                  </div>
                  <div className="text-[10px] lg:text-xs font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-widest">
                    {item.subLabel}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
