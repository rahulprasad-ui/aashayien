import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

import type { SectionBlock as SectionBlockType } from '@/payload-types'

type Props = SectionBlockType & {
  id?: string
}

export const SectionBlockComponent: React.FC<Props> = (props) => {
  const { title, subtitle, content, image, bgImage, bgColor, textAlignment, imagePosition } = props

  const textAlignClass =
    textAlignment === 'center' ? 'text-center' : textAlignment === 'right' ? 'text-right' : 'text-left'

  const flexDirClass = imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'

  return (
    <section
      className="relative py-16 px-6 md:px-12 lg:px-24 border-b border-slate-200"
      style={{ backgroundColor: bgColor || '#ffffff' }}
    >
      {/* Optional Background Image */}
      {bgImage && typeof bgImage === 'object' && bgImage.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage.url}
            alt="Background"
            fill
            className="object-cover opacity-10"
          />
        </div>
      )}

      <div
        className={`relative z-10 max-w-7xl mx-auto flex flex-col ${flexDirClass} gap-12 items-center`}
      >
        {/* Content Side */}
        <div className={`flex-1 ${textAlignClass}`}>
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          )}
          {subtitle && (
            <h3 className="text-xl text-red-600 font-semibold mb-6">{subtitle}</h3>
          )}
          {content && (
            <div className="prose prose-slate max-w-none text-slate-700">
              <RichText data={content} enableGutter={false} />
            </div>
          )}
        </div>

        {/* Image Side */}
        {image && typeof image === 'object' && image.url && (
          <div className="flex-1 w-full relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={image.url}
              alt={title || 'Section Image'}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
