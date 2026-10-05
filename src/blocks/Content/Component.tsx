import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CMSLink } from '../../components/Link'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { LeadCaptureSection } from '@/components/aashayien/LeadCaptureSection'
import { ImageWithFallback } from '@/components/aashayien/ImageWithFallback'
import { Calendar, Bell, ExternalLink, GraduationCap, MapPin, Video } from 'lucide-react'
import { formatDateTime } from '@/utilities/formatDateTime'
import type { ContentBlock as ContentBlockProps, Post, Event, Course, Vacancy, Media, Form } from '@/payload-types'

async function ColumnContent({ col }: { col: NonNullable<ContentBlockProps['columns']>[number] }) {
  const {
    contentType,
    sectionTitle,
    richText,
    enableLink,
    link,
    limit = 3,
    viewAllLabel = 'View All',
    customViewAllLink,
    media,
    form,
  } = col as any

  if (contentType === 'media' && media) {
    const mediaObj = typeof media === 'object' ? (media as Media) : null
    return mediaObj ? <MediaBlock media={mediaObj} blockType="mediaBlock" disableInnerContainer /> : null
  }

  if (contentType === 'form' && form) {
    const formObj = typeof form === 'object' ? (form as Form) : null
    return formObj ? <FormBlock form={formObj as any} enableIntro={false} blockType="formBlock" disableContainer /> : null
  }

  if (contentType === 'posts') {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'posts',
      limit: limit || 3,
      sort: '-createdAt',
      overrideAccess: false,
    })
    const posts = (res.docs ?? []) as Post[]
    const title = sectionTitle || 'Latest Articles'
    const buttonText = viewAllLabel || 'View All'
    const targetLink = customViewAllLink || '/blog'

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#ED1F24]" /> {title}
          </h3>
          <Link href={targetLink} className="text-xs text-[#ED1F24] font-bold hover:underline flex items-center gap-1">
            {buttonText} <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {posts.map((post) => {
            const image = typeof post.heroImage === 'object' ? post.heroImage : null
            return (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-red-50/50 rounded-xl transition-all border border-slate-100 group"
              >
                {image?.url && (
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={image.url}
                      alt={image.alt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-[#ED1F24] transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(post.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  if (contentType === 'events') {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'events',
      limit: limit || 3,
      sort: 'date',
      overrideAccess: false,
    })
    const events = (res.docs ?? []) as Event[]
    const title = sectionTitle || 'Upcoming Events'
    const buttonText = viewAllLabel || 'View All'
    const targetLink = customViewAllLink || '/events'

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" /> {title}
          </h3>
          <Link href={targetLink} className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1">
            {buttonText} <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="block p-3 bg-indigo-50/50 hover:bg-indigo-100/50 rounded-xl transition-all border border-indigo-100 group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold uppercase">
                  {event.category || 'Event'}
                </span>
                {event.isOnline ? (
                  <Video className="w-3 h-3 text-slate-400" />
                ) : (
                  <MapPin className="w-3 h-3 text-slate-400" />
                )}
              </div>
              <h4 className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {event.title}
              </h4>
              {event.date && <p className="text-xs text-slate-500 mt-1">{formatDateTime(event.date)}</p>}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (contentType === 'courses') {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'courses',
      limit: limit || 3,
      sort: '-createdAt',
      overrideAccess: false,
    })
    const courses = (res.docs ?? []) as Course[]
    const title = sectionTitle || 'Featured Courses'
    const buttonText = viewAllLabel || 'View All'
    const targetLink = customViewAllLink || '/courses'

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" /> {title}
          </h3>
          <Link href={targetLink} className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
            {buttonText} <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="block p-3 bg-blue-50/50 hover:bg-blue-100/50 rounded-xl transition-all border border-blue-100 group"
            >
              <h4 className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h4>
              {course.price != null && <p className="text-xs font-bold text-blue-700 mt-1">₹{course.price}</p>}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (contentType === 'notifications') {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'vacancies',
      limit: limit || 3,
      sort: '-createdAt',
      overrideAccess: false,
    })
    const vacancies = (res.docs ?? []) as Vacancy[]
    const title = sectionTitle || 'Notifications & Alerts'
    const buttonText = viewAllLabel || 'View All'
    const targetLink = customViewAllLink || '/syllabus-vacancy?tab=vacancies'

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" /> {title}
          </h3>
          <Link
            href={targetLink}
            className="text-xs text-amber-600 font-bold hover:underline flex items-center gap-1"
          >
            {buttonText} <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {vacancies.map((v) => (
            <Link
              key={v.id}
              href={`/vacancy/${v.id}`}
              className="block p-3 bg-amber-50/50 hover:bg-amber-100/50 rounded-xl transition-all border border-amber-100 group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold">
                  {v.tag || 'Notice'}
                </span>
                {v.date && <span className="text-[10px] text-slate-400">{v.date}</span>}
              </div>
              <h4 className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-amber-700 transition-colors">
                {v.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Default / richText
  return (
    <div className="flex flex-col h-full">
      {sectionTitle && (
        <h3 className="font-bold text-slate-900 text-lg md:text-xl mb-3">{sectionTitle}</h3>
      )}
      {richText && <RichText data={richText} enableGutter={false} />}
      {enableLink && link && (
        <div className="mt-4">
          <CMSLink appearance={link?.appearance || 'default'} {...(link as any)} />
        </div>
      )}
    </div>
  )
}

export const ContentBlock: React.FC<ContentBlockProps> = async (props) => {
  const { columns } = props

  const colsSpanClasses: Record<string, string> = {
    full: 'col-span-4 lg:col-span-12',
    half: 'col-span-4 lg:col-span-6',
    oneThird: 'col-span-4 lg:col-span-4',
    twoThirds: 'col-span-4 lg:col-span-8',
  }

  // If there's only 1 column and it's a form, automatically render the full Homepage Lead Section!
  if (columns && columns.length === 1 && (columns[0] as any).contentType === 'form') {
    const col = columns[0] as any
    const formObj = col.form && typeof col.form === 'object' ? col.form : null
    const payload = await getPayload({ config: configPromise })
    let homeData: any = null
    try {
      homeData = await payload.findGlobal({
        slug: 'home',
        depth: 1,
      })
    } catch {
      // ignore
    }

    return (
      <LeadCaptureSection
        title={col.sectionTitle || homeData?.leadTitle}
        description={homeData?.leadDescription}
        form={formObj || homeData?.leadForm}
        features={homeData?.leadFeatures}
        menteeCountText={homeData?.menteeCountText}
        mentorAvatars={homeData?.mentorAvatars}
      />
    )
  }

  // Check if this content block contains a form or structured section
  const hasForm = columns?.some((c) => (c as any).contentType === 'form')

  return (
    <div className="container my-6 md:my-10 px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          hasForm
            ? 'bg-slate-50 dark:bg-neutral-800/50 rounded-[2rem] lg:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 border border-slate-100 dark:border-neutral-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden'
            : 'bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-neutral-800',
        )}
      >
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-8 lg:gap-x-12 items-center relative z-10">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { size, contentType } = col as any
              const isForm = contentType === 'form'

              return (
                <div
                  className={cn(
                    colsSpanClasses[size!],
                    isForm
                      ? 'bg-white dark:bg-neutral-900 rounded-3xl lg:rounded-4xl p-5 sm:p-8 lg:p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-neutral-800'
                      : '',
                    {
                      'md:col-span-2': size !== 'full',
                    },
                  )}
                  key={index}
                >
                  <ColumnContent col={col} />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
