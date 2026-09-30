'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, BookOpen, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type StateCode = 'mp' | 'up' | 'cg' | 'rj' | 'delhi' | 'bihar' | 'gj' | 'uk' | 'jh' | 'hp' | 'hr'

interface StateData {
  code: StateCode
  name: string
  fullName: string
  description: string
  image: string
  syllabusUrl: string
  vacancyUrl: string
  pyqUrl: string
  vacancies: string
  popularity: 'high' | 'medium' | 'low'
}

const states: StateData[] = [
  {
    code: 'up',
    name: 'UP',
    fullName: 'Uttar Pradesh Judiciary (UPPCS-J)',
    description:
      'Most popular state judiciary exam with highest number of vacancies and regular recruitment cycles.',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600',
    syllabusUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
    vacancyUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
    pyqUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
    vacancies: '400+',
    popularity: 'high',
  },
  {
    code: 'mp',
    name: 'MP',
    fullName: 'Madhya Pradesh Judiciary',
    description:
      'Regular recruitment with good number of vacancies for civil judge positions across the state.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
    syllabusUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
    vacancyUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
    pyqUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
    vacancies: '200+',
    popularity: 'high',
  },
  {
    code: 'rj',
    name: 'RJ',
    fullName: 'Rajasthan Judiciary (RJS)',
    description:
      'One of the most competitive judiciary exams with comprehensive legal subject coverage.',
    image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600',
    syllabusUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
    vacancyUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
    pyqUrl: 'https://forms.gle/PFwih1FLnubDcZD38',
    vacancies: '150+',
    popularity: 'high',
  },
]

export function Syllabus() {
  const [activeTab, setActiveTab] = useState<'judiciary' | 'adpo'>('judiciary')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED1F24]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ED1F24] text-white text-[10px] font-bold rounded-lg uppercase tracking-widest mb-10">
            Resource Library
          </div>
          <h1 className="text-white mb-10 text-4xl! font-bold! leading-tight">
            Syllabus, Vacancies & <br /> Previous Year Documents
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Access the most updated repository of state-wise judicial services exam information.
          </p>

          <div className="inline-flex p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('judiciary')}
              className={`px-10 py-4 rounded-xl font-bold transition-all ${
                activeTab === 'judiciary' ? 'bg-[#ED1F24] text-white shadow-xl' : 'text-slate-400'
              }`}
            >
              Judiciary
            </button>
            <button
              onClick={() => setActiveTab('adpo')}
              className={`px-10 py-4 rounded-xl font-bold transition-all ${
                activeTab === 'adpo' ? 'bg-[#ED1F24] text-white shadow-xl' : 'text-slate-400'
              }`}
            >
              ADPO
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {states.map((state) => (
            <div
              key={state.code}
              className="group bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={getMediaUrl(state.image)}
                  alt={state.fullName}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
                    {state.name}
                  </span>
                </div>
              </div>

              <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-xl! font-bold! text-slate-900 mb-4 group-hover:text-[#ED1F24] transition-colors">
                  {state.fullName}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">{state.description}</p>

                <div className="mt-auto grid grid-cols-3 gap-4">
                  <Link
                    href={`/syllabus/${state.code}`}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl group/btn hover:bg-[#ED1F24] transition-all"
                  >
                    <BookOpen className="w-5 h-5 text-[#ED1F24] group-hover/btn:text-white mb-2" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover/btn:text-white">
                      Syllabus
                    </span>
                  </Link>
                  <Link
                    href={`/vacancy/${state.code}`}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl group/btn hover:bg-[#ED1F24] transition-all"
                  >
                    <TrendingUp className="w-5 h-5 text-[#ED1F24] group-hover/btn:text-white mb-2" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover/btn:text-white">
                      Vacancy
                    </span>
                  </Link>
                  <a
                    href={state.pyqUrl}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl group/btn hover:bg-[#ED1F24] transition-all"
                  >
                    <Download className="w-5 h-5 text-[#ED1F24] group-hover/btn:text-white mb-2" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover/btn:text-white">
                      PYQs
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
