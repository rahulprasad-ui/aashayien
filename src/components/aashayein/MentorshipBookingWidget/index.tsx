'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Clock, Globe, User, Video, CheckCircle2, ArrowRight, CalendarPlus } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'

export const MentorshipBookingWidget = ({ captchaType = 'google' }: { captchaType?: 'google' }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedDuration, setSelectedDuration] = useState(5)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2 | 3>(1) // 1: time selection, 2: details form, 3: success
  const [format24h, setFormat24h] = useState(false)

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)



  const durations = [5, 10, 15, 20]

  useEffect(() => {
    async function fetchSlots() {
      if (!selectedDate) return
      setLoadingSlots(true)
      try {
        const year = selectedDate.getFullYear()
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
        const day = String(selectedDate.getDate()).padStart(2, '0')
        const dateStr = `${year}-${month}-${day}`

        const res = await fetch(`/api/mentorship-bookings/custom/availability?date=${dateStr}&duration=${selectedDuration}`)
        if (res.ok) {
          const data = await res.json()
          setAvailableSlots(data.slots || [])
        } else {
          setAvailableSlots([])
        }
      } catch (err) {
        console.error('Failed to fetch slots', err)
        setAvailableSlots([])
      } finally {
        setLoadingSlots(false)
        setSelectedSlot(null)
      }
    }

    fetchSlots()
  }, [selectedDate, selectedDuration])

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const blanks = Array(firstDayOfMonth).fill(null)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return day === selectedDate.getDate() && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear()
  }

  const formatTime = (time24: string) => {
    if (format24h) return time24
    const [h, m] = time24.split(':').map(Number)
    const ampm = h >= 12 ? 'pm' : 'am'
    const h12 = h % 12 || 12
    return `${h12}:${m.toString().padStart(2, '0')}${ampm}`
  }

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedSlot) return

    setSubmitting(true)
    setError('')

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit mobile number.')
      setSubmitting(false)
      return
    }

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    try {
      const res = await fetch('/api/mentorship-bookings/custom/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          date: dateStr, 
          slotTime: selectedSlot, 
          duration: selectedDuration,
          captcha: { value: captchaValue, type: 'google' }
        })
      })

      const data = await res.json()
      if (res.ok) {
        setStep(3)
      } else {
        setError(data.error || 'Failed to book slot')
      }
    } catch (err) {
      setError('An expected error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const generateGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedSlot) return '#'
    
    const title = encodeURIComponent(`Mentorship Session (${selectedDuration} Mins)`)
    const [h, m] = selectedSlot.split(':').map(Number)
    const start = new Date(selectedDate)
    start.setHours(h, m, 0)
    
    const end = new Date(start.getTime() + selectedDuration * 60000)
    
    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '')
    const dates = `${formatDate(start)}/${formatDate(end)}`
    
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=Mentorship session booked via Aashayein Judiciary.&location=Google Meet`
  }

  const ConfettiEffect = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-sm animate-confetti-drop"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
              backgroundColor: ['#ED1F24', '#D11B20', '#3B82F6', '#10B981', '#EF4444', '#A855F7'][Math.floor(Math.random() * 6)],
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              opacity: 0.8,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes confetti-drop {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            50% { opacity: 1; }
            100% { transform: translateY(700px) rotate(720deg); opacity: 0; }
          }
          .animate-confetti-drop {
            animation: confetti-drop linear forwards;
          }
        `}} />
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="w-full max-w-2xl mx-auto min-h-[440px] flex flex-col items-center justify-center bg-white/80 backdrop-blur-3xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-200/50 p-12 text-center ring-1 ring-slate-900/5 relative overflow-hidden group transition-all duration-700">
        <ConfettiEffect />
        <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-emerald-400 via-green-500 to-emerald-400"></div>
        <div className="absolute inset-0 bg-linear-to-b from-green-50/50 to-transparent pointer-events-none"></div>
        
        <div className="w-24 h-24 bg-linear-to-br from-green-100 to-emerald-50 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)] border border-green-200/50 z-10 transition-transform duration-500 hover:scale-110">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-700 mb-4 z-10">Booking Confirmed!</h2>
        <p className="text-slate-600 mb-10 max-w-lg text-lg leading-relaxed z-10 font-medium">
          Your exclusive mentorship session for <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{selectedDate?.toLocaleDateString()}</span> at <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{selectedSlot && formatTime(selectedSlot)}</span> is locked in. We&apos;ve sent you an email with the Google Meet link.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 z-10">
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-[#ED1F24] font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-[0_8px_30px_-6px_rgba(15,23,42,0.4)] active:scale-95"
          >
            <CalendarPlus className="w-5 h-5" />
            <span>Add to Google Calendar</span>
          </a>

          <button 
            onClick={() => {
              setStep(1)
              setSelectedSlot(null)
              setFormData({ name: '', email: '', phone: '' })
            }}
            className="group px-8 py-3.5 bg-white text-slate-800 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] border border-slate-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Book Another Session</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    )
  }

   return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-2xl rounded-4xl shadow-[0_24px_80px_-24px_rgba(15,23,42,0.1)] border border-slate-200/60 overflow-hidden ring-1 ring-slate-900/5 relative transition-all duration-500">
      
      <div className="flex flex-col lg:flex-row min-h-[580px] lg:h-[620px] relative">
        <div className="absolute inset-0 bg-linear-to-br from-white via-slate-50/50 to-white pointer-events-none"></div>
        
        {/* Left Panel - Info */}
        <div className="w-full lg:w-[34%] xl:w-[30%] p-6 lg:p-8 xl:p-10 border-b lg:border-b-0 border-slate-200/60 bg-linear-to-b from-slate-50/80 to-slate-100/30 flex flex-col relative z-10 shrink-0">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.6)]">
              <span className="text-[#ED1F24] font-black text-sm tracking-widest leading-none">AJ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 font-bold tracking-widest uppercase text-[10px] mb-0.5">Host</span>
              <span className="text-slate-800 font-bold tracking-wide text-sm">Support Aashayein</span>
            </div>
          </div>
          
          <h1 className="text-3xl lg:text-[2.1rem] font-extrabold text-transparent bg-clip-text bg-linear-to-br from-slate-900 to-slate-700 mb-6 leading-[1.1] tracking-tight">
            Mentorship
            <br />
            <span className="text-[1.8rem] lg:text-[2.3rem] text-transparent bg-clip-text bg-linear-to-r from-[#ED1F24] to-[#D11B20] font-extrabold inline-block pb-1">
              {selectedDuration} Mins
            </span>
          </h1>
          
          <div className="mb-10 w-full overflow-visible">
            <div className="inline-flex w-fit -ml-1 sm:-ml-2 flex-nowrap bg-white/80 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl shadow-[inset_0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/50">
              {durations.map(d => (
                <button
                  key={d}
                  disabled={step !== 1}
                  onClick={() => setSelectedDuration(d)}
                  className={`shrink-0 px-3 py-1.5 sm:px-3.5 sm:py-2 lg:px-4 lg:py-2 text-[11px] sm:text-[13px] font-extrabold tracking-wider rounded-xl transition-all duration-300 ${
                    selectedDuration === d 
                      ? 'bg-linear-to-b from-slate-800 to-slate-900 text-[#ED1F24] shadow-[0_4px_16px_-4px_rgba(15,23,42,0.5)] border-t border-slate-700 transform scale-[1.03] z-10' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
                  } ${step !== 1 ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}`}
                >
                  {d}m
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 text-[15px] font-semibold text-slate-600 mt-auto">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <Video className="w-4.5 h-4.5 text-slate-700" />
              </div>
              <span className="group-hover:text-slate-900 transition-colors">Google Meet</span>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <Globe className="w-4.5 h-4.5 text-slate-700" />
              </div>
              <span className="group-hover:text-slate-900 transition-colors">Asia/Kolkata</span>
            </div>
            
            {step === 2 && selectedDate && selectedSlot && (
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-linear-to-br from-[#ED1F24]/5 to-[#D11B20]/5 border border-[#ED1F24]/20 shadow-[0_4px_20px_-8px_rgba(237,31,36,0.15)] mt-8 animate-in slide-in-from-left-4 fade-in duration-500">
                <div className="w-10 h-10 rounded-xl bg-[#ED1F24]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#ED1F24]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#ED1F24] font-bold uppercase tracking-wider mb-0.5">Selected Slot</span>
                  <span className="text-slate-900 font-extrabold text-[15px]">
                    {selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })},{' '}
                    {formatTime(selectedSlot)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {step === 1 ? (
          <>
            {/* Middle Panel - Calendar */}
            <div className="w-full lg:w-[38%] xl:w-[40%] p-8 lg:p-10 lg:pr-14 border-b lg:border-b-0 border-slate-200/60 relative z-10 bg-white">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-slate-900 font-extrabold text-2xl tracking-tight">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl shadow-inner border border-slate-200/50">
                  <button 
                    onClick={prevMonth}
                    className="p-2 bg-white shadow-sm border border-slate-200/50 hover:border-slate-300 rounded-xl transition-all duration-300 text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextMonth}
                    className="p-2 bg-white shadow-sm border border-slate-200/50 hover:border-slate-300 rounded-xl transition-all duration-300 text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-y-4 sm:gap-y-6 gap-x-1 sm:gap-x-2 text-center max-w-[400px] mx-auto lg:max-w-none">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <div key={day} className="text-[10px] font-black text-slate-400 tracking-widest mb-4">
                    {day}
                  </div>
                ))}
                
                {blanks.map((_, i) => (
                  <div key={`blank-${i}`} className="aspect-square" />
                ))}
                
                {days.map(day => {
                  const selected = isSelected(day)
                  const today = isToday(day)
                  return (
                    <div key={day} className="flex justify-center flex-col items-center relative aspect-square group">
                      <button
                        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-10
                          ${selected 
                            ? 'bg-linear-to-tr from-slate-900 to-slate-800 text-[#ED1F24] shadow-[0_8px_24px_-6px_rgba(15,23,42,0.6)] scale-110 border-transparent! ring-2 ring-slate-900 ring-offset-2 ring-offset-white' 
                            : 'hover:bg-slate-100/80 hover:text-slate-900 text-slate-700 bg-transparent hover:scale-105 border border-transparent hover:border-slate-200/80'
                          }
                          ${today && !selected ? 'text-[#ED1F24]! bg-[#ED1F24]/5 border-[#ED1F24]/20' : ''}
                        `}
                      >
                        {day}
                      </button>
                      {today && !selected && (
                         <div className="w-1.5 h-1.5 bg-[#ED1F24] rounded-full absolute -bottom-1 shadow-[0_0_8px_rgba(237,31,36,0.8)]"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Panel - Time Slots */}
            <div className="w-full lg:flex-1 p-8 lg:p-10 lg:pl-14 bg-white relative z-10 flex flex-col overflow-hidden min-h-[400px] lg:min-h-0">
              {selectedDate ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1 flex flex-col h-full overflow-hidden">
                  <div className="flex items-center justify-between mb-8 shrink-0">
                    <h3 className="text-slate-900 font-extrabold text-[1.15rem] tracking-tight whitespace-nowrap">
                      {selectedDate.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
                    </h3>
                    <div className="flex bg-slate-200/80 p-1.5 rounded-xl shadow-inner border border-slate-300/30">
                      <button 
                        onClick={() => setFormat24h(false)}
                        className={`px-3.5 py-1.5 text-xs font-black rounded-lg transition-all duration-300 ${!format24h ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        12h
                      </button>
                      <button 
                        onClick={() => setFormat24h(true)}
                        className={`px-3.5 py-1.5 text-xs font-black rounded-lg transition-all duration-300 ${format24h ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        24h
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-3.5 custom-scrollbar min-h-0">
                    {loadingSlots ? (
                      <div className="h-[200px] lg:h-full flex flex-col items-center justify-center text-slate-400 text-sm font-semibold animate-in fade-in duration-300">
                        <div className="relative w-10 h-10 mb-4">
                          <div className="absolute inset-0 border-4 border-[#ED1F24]/20 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-[#ED1F24] rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        Loading exquisite slots...
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="pb-4 space-y-3">
                         {availableSlots.map((slot, index) => (
                          <div 
                            key={slot} 
                            className="flex gap-2 animate-in slide-in-from-bottom-2 fade-in fill-mode-both"
                            style={{ animationDelay: `${index * 40}ms` }}
                          >
                            <button
                              onClick={() => {
                                setSelectedSlot(slot)
                                setStep(2)
                              }}
                              className={`flex-1 py-4 px-6 rounded-2xl border text-sm font-bold tracking-wide transition-all duration-300 group
                                ${selectedSlot === slot 
                                  ? 'border-transparent bg-linear-to-r from-slate-900 to-slate-800 text-[#ED1F24] shadow-[0_8px_20px_-6px_rgba(15,23,42,0.6)] scale-[1.02]' 
                                  : 'border-slate-200/50 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50 hover:text-slate-900 hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5'
                                }`}
                            >
                              <div className="flex items-center justify-center gap-2">
                                <span>{formatTime(slot)}</span>
                                <ArrowRight className={`w-4 h-4 transition-transform duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${selectedSlot === slot ? 'opacity-100 translate-x-0 text-[#ED1F24]!' : 'text-slate-400'}`} />
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-[250px] lg:h-full flex flex-col items-center justify-center text-slate-500 font-semibold p-6 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <Clock className="w-8 h-8 text-slate-300" />
                        </div>
                        All booked up! <br /> <span className="text-sm font-medium text-slate-400 mt-2 block">Try checking another day.</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Subtle gradient to mask scrolling text */}
                  <div className="absolute bottom-10 inset-x-10 h-10 bg-linear-to-t from-slate-50/50 to-transparent pointer-events-none"></div>
                </div>
              ) : (
                <div className="h-[250px] lg:h-full flex flex-col items-center justify-center text-slate-400 font-bold bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200/60 p-8 text-center animate-pulse">
                  <Calendar className="w-12 h-12 text-slate-300 mb-4" />
                  Select a date to unlock <br/><span className="text-[#ED1F24] mt-1 block">Exclusive Timing</span>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Step 2 Form */
          <div className="w-full lg:flex-1 p-8 lg:p-12 bg-white relative z-10 animate-in slide-in-from-right-8 fade-in duration-500">
            <div className="flex items-center gap-4 mb-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-10 h-10 shrink-0 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 text-slate-500 transition-all hover:scale-105 active:scale-95 shadow-sm"
                title="Go Back"
              >
                <ChevronLeft className="w-5 h-5 -ml-0.5" />
              </button>
              <h2 className="text-[2rem] font-black text-transparent bg-clip-text bg-linear-to-br from-slate-900 to-slate-700 tracking-tight">Finalize Booking</h2>
            </div>
            <p className="text-slate-500 font-medium mb-10 pl-14">We just need a few details to confirm your slot.</p>

            {error && (
              <div className="mb-8 p-4 rounded-xl bg-red-50/80 text-red-700 border border-red-200/80 text-sm font-bold flex items-center gap-3 animate-in shake duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleBook} className="space-y-7 max-w-sm">
              <div className="group">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 transition-colors group-focus-within:text-[#ED1F24]">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ED1F24]/10 focus:border-[#ED1F24] transition-all bg-slate-50/50 hover:bg-slate-50 focus:bg-white shadow-sm font-semibold text-slate-800 placeholder:text-slate-300 placeholder:font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="group">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 transition-colors group-focus-within:text-[#ED1F24]">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ED1F24]/10 focus:border-[#ED1F24] transition-all bg-slate-50/50 hover:bg-slate-50 focus:bg-white shadow-sm font-semibold text-slate-800 placeholder:text-slate-300 placeholder:font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 transition-colors group-focus-within:text-[#ED1F24]">Phone Number <span className="text-[#ED1F24]">*</span></label>
                <input 
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ED1F24]/10 focus:border-[#ED1F24] transition-all bg-slate-50/50 hover:bg-slate-50 focus:bg-white shadow-sm font-semibold text-slate-800 placeholder:text-slate-300 placeholder:font-medium"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                />
              </div>

              {/* Captcha Section */}
              <div className="pt-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-3 transition-colors">
                  Verification <span className="text-[#ED1F24]">*</span>
                </label>
                
                <div className="min-h-[78px]">
                  {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={(token) => setCaptchaValue(token)}
                    />
                  ) : (
                    <div className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                      reCAPTCHA Site Key missing.
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative w-full flex items-center justify-center px-6 py-5 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 bg-size-[200%_auto] hover:bg-right disabled:opacity-70 disabled:hover:bg-left text-[#ED1F24] font-extrabold tracking-wide text-[1.05rem] rounded-2xl transition-all duration-500 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.8)] active:scale-[0.98] overflow-hidden"
                >
                  {submitting ? (
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-5 h-5 border-[3px] border-[#ED1F24]/30 border-t-[#ED1F24] rounded-full animate-spin"></div>
                      <span>Confirming Slot...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 relative z-10">
                      <span>Secure Booking</span>
                      <CheckCircle2 className="w-5 h-5 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </div>
                  )}
                  {/* Subtle highlight overlay */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}} />
    </div>
  )
}
