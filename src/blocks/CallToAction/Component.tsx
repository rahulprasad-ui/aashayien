import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  alignment?: 'left' | 'center' | 'right' | null
} & Partial<CTABlockProps>

export const CallToActionBlock: React.FC<Props> = ({
  className,
  links,
  richText,
  alignment = 'left',
}) => {
  const hasRichText = React.useMemo(() => {
    if (!richText || typeof richText !== 'object') return false
    const children = (richText as any)?.root?.children
    if (!Array.isArray(children) || children.length === 0) return false

    return children.some((child: any) => {
      if (child.type === 'paragraph' && (!child.children || child.children.length === 0))
        return false
      if (child.children && Array.isArray(child.children)) {
        return child.children.some((c: any) => c.text && c.text.trim() !== '')
      }
      return child.type !== 'paragraph'
    })
  }, [richText])

  const alignmentClasses = {
    left: {
      container: 'flex-col md:flex-row md:justify-between md:items-center text-left',
      richText: 'items-start text-left',
      buttons: 'justify-start items-start',
    },
    center: {
      container: 'flex-col justify-center items-center text-center',
      richText: 'items-center text-center',
      buttons: 'justify-center items-center',
    },
    right: {
      container: 'flex-col md:flex-row-reverse md:justify-between md:items-center text-right',
      richText: 'items-end text-right',
      buttons: 'justify-end items-end',
    },
  } as const

  const alignmentKey =
    alignment && alignment in alignmentClasses
      ? (alignment as keyof typeof alignmentClasses)
      : 'left'
  const currentAlignment = alignmentClasses[alignmentKey]

  // If editor text is empty, render only the button(s) cleanly without the large empty bordered card wrapper
  if (!hasRichText) {
    const buttonAlignment =
      alignment === 'center'
        ? 'justify-center'
        : alignment === 'right'
        ? 'justify-end'
        : 'justify-start'

    return (
      <div className={cn('container my-4', className)}>
        <div className={cn('flex flex-wrap gap-4 w-full', buttonAlignment)}>
          {(links || []).map((item, i) => {
            if (!item?.link) return null
            return <CMSLink key={i} size="lg" {...(item.link as any)} />
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('container', className)}>
      <div className={cn('bg-card rounded-xl border-border border p-6 md:p-8 flex gap-8 shadow-xs', currentAlignment.container)}>
        <div className={cn('max-w-[48rem] flex flex-col', currentAlignment.richText)}>
          <RichText className="mb-0" data={richText as any} enableGutter={false} />
        </div>
        <div className={cn('flex flex-wrap gap-4', currentAlignment.buttons)}>
          {(links || []).map((item, i) => {
            if (!item?.link) return null
            return <CMSLink key={i} size="lg" {...(item.link as any)} />
          })}
        </div>
      </div>
    </div>
  )
}
