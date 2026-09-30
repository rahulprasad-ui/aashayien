'use client'

import { Play, BookOpen, FileText, Video } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'

interface Resource {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  category: string
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Judiciary Exam Pattern',
    description:
      'Complete overview of various state judiciary examination patterns and marking schemes',
    thumbnail:
      'https://images.unsplash.com/photo-1762329386486-f38ef2077a06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMG9ubGluZXxlbnwxfHx8fDE3NjQ4MjgxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '45:30',
    category: 'Exam Strategy',
  },
  {
    id: '2',
    title: 'Constitutional Law - Fundamental Rights',
    description:
      'In-depth analysis of Articles 12-35 with landmark judgments and recent amendments',
    thumbnail:
      'https://images.unsplash.com/photo-1555374018-13a8994ab246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWRnZSUyMGdhdmVsJTIwanVzdGljZXxlbnwxfHx8fDE3NjQ4NDYxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '62:15',
    category: 'Constitutional Law',
  },
  {
    id: '3',
    title: 'Answer Writing Techniques for Judiciary',
    description: 'Master the art of scoring high marks with effective answer writing strategies',
    thumbnail:
      'https://images.unsplash.com/photo-1752920299210-0b727800ea50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwbGlicmFyeXxlbnwxfHx8fDE3NjQ4Mjk2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '38:45',
    category: 'Preparation Tips',
  },
  {
    id: '4',
    title: 'Indian Penal Code - Offences Against Property',
    description: 'Comprehensive coverage of Sections 378-462 with practical case studies',
    thumbnail:
      'https://images.unsplash.com/photo-1762329386486-f38ef2077a06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMG9ubGluZXxlbnwxfHx8fDE3NjQ4MjgxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '55:20',
    category: 'Criminal Law',
  },
  {
    id: '5',
    title: 'Contract Act - Essential Elements',
    description: 'Detailed discussion on Sections 1-75 with leading Supreme Court judgments',
    thumbnail:
      'https://images.unsplash.com/photo-1555374018-13a8994ab246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWRnZSUyMGdhdmVsJTIwanVzdGljZXxlbnwxfHx8fDE3NjQ4NDYxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '49:10',
    category: 'Contract Law',
  },
  {
    id: '6',
    title: 'Mock Interview - Best Practices',
    description:
      'Learn from successful candidates about interview preparation and common questions',
    thumbnail:
      'https://images.unsplash.com/photo-1762329386486-f38ef2077a06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMG9ubGluZXxlbnwxfHx8fDE3NjQ4MjgxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '42:30',
    category: 'Interview Prep',
  },
]

export function FreeResources() {
  const handleWatchNow = () => {
    window.open('https://www.lawpreptutorial.com/free-resourses/judiciary/videos', '_blank')
  }

  const handleViewAllResources = () => {
    window.open('https://www.lawpreptutorial.com/free-resourses/judiciary/videos', '_blank')
  }

  return (
    <section id="resources" className="py-20 bg-linear-to-br from-slate-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-green-100 rounded-full mb-4">
            <span className="text-green-700">Free Resources</span>
          </div>
          <h2 className="text-slate-900 mb-4 font-bold">
            Free Resources for Judiciary Preparation
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Access high-quality video lectures, study materials, and preparation guides absolutely
            free. Start your judiciary journey with expert guidance.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer border border-slate-100"
              onClick={() => handleWatchNow()}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <ImageWithFallback
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm">
                  {resource.duration}
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-blue-600 px-3 py-1 rounded-lg text-white text-sm">
                  {resource.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors font-bold text-lg">
                  {resource.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2 mb-4">{resource.description}</p>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#ED1F24] text-white rounded-lg hover:bg-[#d11b20] transition-all font-medium">
                  <Video className="w-5 h-5" />
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12 border border-slate-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#ED1F24]" />
              </div>
              <h3 className="text-slate-900 mb-2 font-bold">500+ Video Lectures</h3>
              <p className="text-slate-600">Comprehensive coverage of all subjects</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-slate-900 mb-2 font-bold">1000+ Practice Questions</h3>
              <p className="text-slate-600">Topic-wise and full-length mock tests</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-slate-900 mb-2 font-bold">Weekly Live Sessions</h3>
              <p className="text-slate-600">Doubt clearing and current affairs</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleViewAllResources}
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl font-bold"
          >
            <BookOpen className="w-6 h-6" />
            <span>Explore All Free Resources</span>
          </button>
        </div>
      </div>
    </section>
  )
}
