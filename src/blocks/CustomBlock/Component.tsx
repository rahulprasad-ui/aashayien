import React from 'react'
import RichText from '@/components/RichText'

type CustomBlockProps = {
  heading?: string | null
  subheading?: string | null
  content?: any
  rawHtml?: string | null
  backgroundColor?: string | null
  textAlignment?: 'left' | 'center' | 'right' | null
  paddingTop?: 'none' | 'small' | 'medium' | 'large' | null
  paddingBottom?: 'none' | 'small' | 'medium' | 'large' | null
}

const paddingMap = {
  none: '0px',
  small: '8px',
  medium: '16px',
  large: '32px',
}

export const CustomBlockComponent: React.FC<CustomBlockProps> = ({
  heading,
  subheading,
  content,
  rawHtml,
  backgroundColor = '#ffffff',
  textAlignment = 'left',
  paddingTop = 'small',
  paddingBottom = 'small',
}) => {
  const textAlignClass =
    textAlignment === 'center'
      ? 'text-center'
      : textAlignment === 'right'
        ? 'text-right'
        : 'text-left'

  const ptStyle = paddingMap[paddingTop ?? 'medium'] ?? '48px'
  const pbStyle = paddingMap[paddingBottom ?? 'medium'] ?? '48px'

  return (
    <section
      style={{
        backgroundColor: backgroundColor || '#ffffff',
        paddingTop: ptStyle,
        paddingBottom: pbStyle,
      }}
      className="w-full"
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${textAlignClass}`}>
        {/* Badge / Subheading */}
        {subheading && (
          <div className={`inline-block px-6 py-2 bg-red-100 rounded-full mb-4 ${textAlignment === 'center' ? 'mx-auto' : ''}`}>
            <span className="text-[#ED1F24] font-bold text-sm">{subheading}</span>
          </div>
        )}

        {/* Heading */}
        {heading && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">{heading}</h2>
        )}

        {/* Rich Text Content */}
        {content && (
          <div className="prose prose-slate max-w-none">
            <RichText data={content} enableGutter={false} />
          </div>
        )}

        {/* Raw HTML Embed */}
        {rawHtml && (
          <div
            className="mt-6 w-full"
            dangerouslySetInnerHTML={{ __html: rawHtml }}
          />
        )}
      </div>
    </section>
  )
}
