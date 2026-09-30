'use client'

import { Smartphone, MessageCircle, Trophy, BookOpen, Users, Gift, Youtube } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

// Helper to get icon by name
const getIcon = (name: string) => {
  const iconList = (LucideIcons as any).icons ? (LucideIcons as any).icons : LucideIcons
  return (iconList as any)[name] || BookOpen
}

export function Community({ data }: { data: any }) {
  if (!data?.communityTitle) return null

  const {
    communityTitle,
    communitySubtitle,
    communityDescription,
    appImage,
    floatingStats,
    communityFeatures,
    appLink,
    telegramLink,
    youtubeLink,
    communityBottomStats,
  } = data

  const handleJoinApp = () => {
    if (appLink) window.open(appLink, '_blank')
  }

  const handleJoinTelegram = () => {
    if (telegramLink) window.open(telegramLink, '_blank')
  }

  const handleJoinYoutube = () => {
    if (youtubeLink) window.open(youtubeLink, '_blank')
  }

  const imageUrl =
    typeof appImage === 'object' && appImage?.url
      ? getMediaUrl(appImage.url)
      : typeof appImage === 'string'
        ? getMediaUrl(appImage)
        : ''

  return (
    <section className="py-20 bg-linear-to-br from-[#ED1F24] via-slate-900 to-[#ED1F24] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-amber-500 rounded-full mb-4">
            <span className="text-black font-bold">Exclusive Community</span>
          </div>
          <h2 className="text-white mb-4 font-bold text-3xl md:text-4xl">{communityTitle}</h2>
          {communitySubtitle && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="w-6 h-6 text-amber-400" />
              <p className="text-white/90 text-xl font-medium">{communitySubtitle}</p>
            </div>
          )}
          <div className="text-white max-w-2xl mx-auto rich-text-white">
            <RichText data={communityDescription} enableGutter={false} enableProse={false} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - App Screenshots */}
          <div className="relative">
            <div className="relative">
              {/* Main Phone Mockup */}
              <div className="relative mx-auto max-w-sm">
                <div className="relative bg-white rounded-[3rem] shadow-2xl p-3 border-8 border-slate-800">
                  <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-slate-800 px-6 py-2 flex items-center justify-between text-white text-xs">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-3 border border-white rounded-sm"></div>
                        <div className="w-1 h-3 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    {/* App Content */}
                    <ImageWithFallback
                      src={imageUrl}
                      alt="App Interface"
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              {floatingStats?.stat1Value && (
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold">{floatingStats.stat1Value}</div>
                      <div className="text-slate-600 text-sm">{floatingStats.stat1Label}</div>
                    </div>
                  </div>
                </div>
              )}

              {floatingStats?.stat2Value && (
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold">{floatingStats.stat2Value}</div>
                      <div className="text-slate-600 text-sm">{floatingStats.stat2Label}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - Features & CTAs */}
          <div className="space-y-8">
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {communityFeatures?.map((feature: any, index: number) => {
                const Icon = getIcon(feature.icon)
                const colors = ['bg-amber-400', 'bg-green-400', 'bg-pink-400', 'bg-blue-400']
                const color = colors[index % colors.length]

                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <div
                      className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-white mb-2 font-bold text-lg">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </div>
                )
              })}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appLink && (
                  <button
                    onClick={handleJoinApp}
                    className="w-full bg-white text-slate-900 px-4 py-4 rounded-xl hover:bg-slate-100 transition-all shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <Smartphone className="w-6 h-6 text-[#ED1F24] group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-slate-600">Download Now</div>
                      <div className="font-bold">Mobile App</div>
                    </div>
                  </button>
                )}

                {telegramLink && (
                  <button
                    onClick={handleJoinTelegram}
                    className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white px-4 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-white/80 font-medium">Join Community</div>
                      <div className="font-bold">Telegram</div>
                    </div>
                  </button>
                )}
              </div>

              {youtubeLink && (
                <button
                  onClick={handleJoinYoutube}
                  className="w-full bg-[#FF0000] text-white px-8 py-4 rounded-xl hover:bg-[#CC0000] transition-all shadow-lg flex items-center justify-center gap-3 group"
                >
                  <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs text-white/80 font-medium">Subscribe Channel</div>
                    <div className="font-bold">YouTube</div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {communityBottomStats && communityBottomStats.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div
              className={`grid grid-cols-2 md:grid-cols-${communityBottomStats.length} gap-8 text-center text-white`}
            >
              {communityBottomStats.map((stat: any, index: number) => (
                <div key={index}>
                  <div className="text-4xl mb-2 text-amber-400 font-bold">{stat.value}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
