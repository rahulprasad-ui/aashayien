import { MentorshipBookingWidget } from '@/components/aashayein/MentorshipBookingWidget'
import { Calendar, CheckCircle, Clock } from 'lucide-react'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mentorship | Aashayien Judiciary',
    description: 'Book your 1-on-1 mentorship session with our expert faculty.',
  }
}

import { getCachedGlobal } from '@/utilities/getGlobals'

import { Branding } from '@/payload-types'

export default async function MentorshipPage() {
  const branding = (await getCachedGlobal('branding')()) as Branding
  const captchaType = branding?.captcha?.captchaType || 'google'

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            1-on-1 Mentorship Sessions
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Book a private session with our expert mentors to clarify your doubts and accelerate
            your judicial career.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-[#ED1F24]">
              <Calendar className="w-5 h-5" />
              <span>Easy Scheduling</span>
            </div>
            <div className="flex items-center gap-2 text-[#ED1F24]">
              <Clock className="w-5 h-5" />
              <span>Flexible Durations</span>
            </div>
            <div className="flex items-center gap-2 text-[#ED1F24]">
              <CheckCircle className="w-5 h-5" />
              <span>Direct Expert Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-1 gap-12">
            {/* Right Column: Cal Embed */}
            <div className="lg:col-span-2">
              <div className="min-h-[700px]">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Book Your Slot</h2>
                    <p className="text-slate-500 text-sm">
                      Select a date and time that works for you.
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Live Availability
                    </span>
                  </div>
                </div>

                <MentorshipBookingWidget captchaType={captchaType === 'google' ? 'google' : undefined} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
