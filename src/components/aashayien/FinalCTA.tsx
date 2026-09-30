'use client'

import React from 'react'
import { Rocket, Download, ArrowRight } from 'lucide-react'
import { CMSLink } from '../Link'

interface FinalCTAProps {
  data?: {
    title?: string
    description?: string
    primaryCTA?: any
    secondaryCTA?: any
  }
}

export function FinalCTA({ data }: FinalCTAProps) {
  const title = data?.title || 'Start Your Journey Towards Becoming a Judge'
  const description =
    data?.description ||
    'Join ALEC’s expert-led judiciary preparation programs and get the mentorship needed to succeed.'

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with Dark Theme & Gradients */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ED1F2415,transparent_70%)]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ED1F24] opacity-10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 opacity-10 blur-[100px] rounded-full"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 38.59V40h1.41l1.1-1.1L3.61 40H5v-1.41L1.41 35H0v1.41l1.1 1.1L0 38.59zM0 0h1.41L1.41 1.41 0 0zm0 10V5h5v5H0zm10 0V5h5v5h-5zm10 0V5h5v5h-5zm10 0V5h5v5h-5zM0 20V15h5v5H0zm10 0v-5h5v5h-5zm10 0v-5h5v5h-5zm10 0v-5h5v5h-5zM0 30V25h5v5H0zm10 0v-5h5v5h-5zm10 0v-5h5v5h-5zm10 0v-5h5v5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl overflow-hidden group">
          {/* Animated Glow Effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-[#ED1F24] to-blue-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative">
            {/* Icon/Badge */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#ED1F24] to-[#c1191e] rounded-2xl mb-8 shadow-xl shadow-[#ED1F24]/20 animate-bounce-slow">
              <Rocket className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              {title}
            </h2>
            
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Get Mentorship Button */}
              {data?.primaryCTA ? (
                <CMSLink 
                  {...data.primaryCTA}
                  className="w-full sm:w-auto px-10 py-5 bg-[#ED1F24] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#d11b20] transition-all shadow-xl shadow-[#ED1F24]/20 hover:shadow-[#ED1F24]/40 transform hover:-translate-y-1 active:scale-95"
                >
                  <Rocket className="w-5 h-5" />
                  {data.primaryCTA.label || 'Get Mentorship'}
                </CMSLink>
              ) : (
                <button 
                  className="w-full sm:w-auto px-10 py-5 bg-[#ED1F24] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#d11b20] transition-all shadow-xl shadow-[#ED1F24]/20 hover:shadow-[#ED1F24]/40 transform hover:-translate-y-1 active:scale-95"
                >
                  <Rocket className="w-5 h-5" />
                  Get Mentorship
                </button>
              )}

              {/* Download Brochure Button */}
              {data?.secondaryCTA ? (
                <CMSLink 
                  {...data.secondaryCTA}
                  className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all backdrop-blur-md transform hover:-translate-y-1 active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  {data.secondaryCTA.label || 'Download Brochure'}
                </CMSLink>
              ) : (
                <button 
                  className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all backdrop-blur-md transform hover:-translate-y-1 active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  Download Brochure
                </button>
              )}
            </div>

            {/* Bottom Proof Line */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2 text-slate-400 font-medium">
                <ArrowRight className="w-4 h-4 text-[#ED1F24]" />
                <span>5000+ Successful Candidates</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-medium">
                <ArrowRight className="w-4 h-4 text-[#ED1F24]" />
                <span>Expert State-wise Mentorship</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
