'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Award,
  Users,
  BookOpen,
  Target,
  Heart,
  Scale,
  TrendingUp,
  Shield,
  CheckCircle,
  Trophy,
  Star,
  Clock,
  Quote,
} from 'lucide-react'
import RichText from '@/components/RichText'
import { AboutUs as AboutUsType } from '@/payload-types'
import { ImageWithFallback } from './ImageWithFallback'

const iconMap: Record<string, any> = {
  Heart,
  Shield,
  Star,
  Users,
  TrendingUp,
  Trophy,
  Award,
  BookOpen,
  Target,
  Clock,
  Scale,
}

export function AboutUsComponent({ data }: { data: AboutUsType }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const section = searchParams.get('section')
    if (section) {
      const element = document.getElementById(section)
      if (element) {
        // Small delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [searchParams])

  if (!data) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-600 via-slate-950 to-slate-600 py-24 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-6">
              <span className="text-white">{data.heroBadge}</span>
            </div>
            <h1 className="text-white mb-6">{data.heroTitle}</h1>
            <p className="text-white/90 max-w-3xl mx-auto text-xl">{data.heroDescription}</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="institute" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-6 py-2 bg-red-100 text-[#ED1F24] rounded-full mb-6">
                <span>{data.storyBadge}</span>
              </div>
              <h2 className="text-slate-900 mb-6">{data.storyTitle}</h2>
              <div className="space-y-4 text-slate-600">
                {data.storyContent && <RichText data={data.storyContent} enableGutter={false} />}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {data.storyStats?.map((stat, index) => {
                let gradient = 'from-[#ED1F24] to-[#d11b20]'
                if (stat.gradient === 'amber') gradient = 'from-amber-500 to-amber-600'
                if (stat.gradient === 'rose') gradient = 'from-rose-600 to-pink-600'
                if (stat.gradient === 'orange') gradient = 'from-orange-600 to-red-500'

                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 text-white text-center`}
                  >
                    <div className="text-5xl mb-2">{stat.value}</div>
                    <div className="text-white/90">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Director's Message Section */}
      <section id="director" className="py-20 bg-slate-950 text-white scroll-mt-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ED1F24] opacity-5 skew-x-12 transform translate-x-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Director's Info & Message */}
            <div className="order-2 lg:order-1">
              <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-6">
                <span className="text-white text-sm font-medium tracking-wide uppercase">
                  {data.directorBadge}
                </span>
              </div>
              
              <div className="relative mb-8">
                <Quote className="absolute -top-6 -left-8 w-16 h-16 text-white/10" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white leading-tight">
                  {data.directorQuote}
                </h2>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed mb-10">
                {data.directorContent && <RichText data={data.directorContent} enableGutter={false} />}
              </div>

              <div className="flex items-center gap-6">
                <div className="w-16 h-1 bg-[#ED1F24]"></div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{data.directorName}</h4>
                  <p className="text-[#ED1F24] font-medium">{data.directorTitle}</p>
                </div>
              </div>
            </div>

            {/* Director's Image */}
            <div className="order-1 lg:order-2 relative group">
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10 rounded-3xl"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 aspect-4/5 lg:aspect-auto lg:h-[600px]">
                {data.directorImage && typeof data.directorImage === 'object' && (
                  <ImageWithFallback
                    resource={data.directorImage}
                    display={(data as any).directorImageDisplay}
                    alt={data.directorName!}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {!data.directorImage && (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <Users className="w-24 h-24 text-white/10" />
                  </div>
                )}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#ED1F24] rounded-2xl -z-10 group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#ED1F24] rounded-2xl -z-10 group-hover:-rotate-12 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section id="mission" className="py-20 bg-gradient-to-br from-slate-50 to-red-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-xl p-10">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#ED1F24]" />
              </div>
              <h3 className="text-slate-900 mb-4">{data.missionTitle}</h3>
              <p className="text-slate-600 mb-6">{data.missionDescription}</p>
              <ul className="space-y-3">
                {data.missionPoints?.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ED1F24] mt-1 shrink-0" />
                    <span className="text-slate-600">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-xl p-10">
              <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-slate-900 mb-4">{data.visionTitle}</h3>
              <p className="text-slate-600 mb-6">{data.visionDescription}</p>
              <ul className="space-y-3">
                {data.visionPoints?.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-600">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-4">
              <span className="text-white">{data.valuesBadge}</span>
            </div>
            <h2 className="text-slate-900 mb-4">{data.valuesTitle}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{data.valuesDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.valuesList?.map((value, index) => {
              const Icon = iconMap[value.icon as string] || Heart
              // Determine value color/bgColor based on index or logic.
              // Existing logic used explicit colors in array. I will use a simple rotation or similar.
              // Actually I'll just default to Red for now to keep it simple or infer from icon if possible?
              // The original had specific colors for each value. I didn't add color field to valuesList in Global... my bad.
              // I'll stick to a default or cycle colors.
              const colors = [
                { color: 'text-[#ED1F24]', bgColor: 'bg-red-100' },
                { color: 'text-amber-600', bgColor: 'bg-amber-100' },
                { color: 'text-orange-600', bgColor: 'bg-orange-100' },
                { color: 'text-rose-600', bgColor: 'bg-rose-100' },
                { color: 'text-pink-600', bgColor: 'bg-pink-100' },
                { color: 'text-amber-500', bgColor: 'bg-amber-100' },
              ]
              const { color, bgColor } = colors[index % colors.length]

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-slate-100"
                >
                  <div
                    className={`w-16 h-16 ${bgColor} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-8 h-8 ${color}`} />
                  </div>
                  <h4 className="text-slate-900 mb-3">{value.title}</h4>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-4">
              <span className="text-white">{data.featuresBadge}</span>
            </div>
            <h2 className="text-slate-900 mb-4">{data.featuresTitle}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{data.featuresDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {data.featuresList?.map((feature, index) => {
              const Icon = iconMap[feature.icon as string] || Award
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-slate-600 via-[#ED1F24] to-slate-600"></div>
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7 text-[#ED1F24]" />
                      </div>
                      <div>
                        <h4 className="text-slate-900 mb-3">{feature.title}</h4>
                        <p className="text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#ED1F24] to-[#d11b20] rounded-3xl p-12 lg:p-16 text-white text-center">
            <h2 className="text-white mb-6">{data.commitmentTitle}</h2>
            <p className="text-white/90 max-w-3xl mx-auto text-xl mb-8">
              {data.commitmentDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={data.commitmentCta1Link!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#ED1F24] px-8 py-4 rounded-full hover:bg-slate-100 transition-all shadow-lg"
              >
                <span>{data.commitmentCta1Text}</span>
                <CheckCircle className="w-5 h-5" />
              </a>
              <a
                href={data.commitmentCta2Link!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-full hover:bg-amber-600 transition-all shadow-lg"
              >
                <span>{data.commitmentCta2Text}</span>
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy & Impact */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-[#ED1F24] rounded-full mb-4">
              <span className="text-white">{data.legacyBadge}</span>
            </div>
            <h2 className="text-slate-900 mb-4">{data.legacyTitle}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{data.legacyDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.legacyStats?.map((stat, index) => {
              let borderColor = 'border-[#ED1F24]'
              let textColor = 'text-[#ED1F24]'

              if (stat.color === 'amber') {
                borderColor = 'border-amber-500'
                textColor = 'text-amber-500'
              } else if (stat.color === 'rose') {
                borderColor = 'border-rose-600'
                textColor = 'text-rose-600'
              } else if (stat.color === 'orange') {
                borderColor = 'border-orange-600'
                textColor = 'text-orange-600'
              }

              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 ${borderColor}`}
                >
                  <div className={`text-5xl ${textColor} mb-4`}>{stat.value}</div>
                  <h4 className="text-slate-900 mb-2">{stat.label}</h4>
                  <p className="text-slate-600">{stat.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Join Our Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-slate-900 mb-6">{data.joinTitle}</h2>
          <p className="text-slate-600 text-xl mb-8">{data.joinDescription}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={data.joinCta1Link!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ED1F24] to-[#d11b20] text-white px-10 py-5 rounded-full hover:shadow-2xl transition-all"
            >
              <span>{data.joinCta1Text}</span>
              <CheckCircle className="w-5 h-5" />
            </a>
            <a
              href={data.joinCta2Link!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-full hover:bg-slate-800 transition-all"
            >
              <span>{data.joinCta2Text}</span>
              <BookOpen className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
