'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import type { Media } from '@/payload-types'
import type { ImageDisplayConfig } from '@/utilities/imageDisplay'
import { resolveImageDisplay } from '@/utilities/imageDisplay'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export interface ImageWithFallbackProps
  extends Omit<Partial<ImageProps>, 'src' | 'alt' | 'resource'> {
  src?: any
  resource?: Media | string | number | null
  display?: ImageDisplayConfig | null
  alt?: string | null
  className?: string
  fallbackLabel?: string
  fallbackSrc?: string
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const {
    src,
    resource,
    display,
    alt,
    style,
    className,
    fill,
    width,
    height,
    fallbackLabel = 'No image',
    fallbackSrc = ERROR_IMG_SRC,
    ...rest
  } = props

  const resolvedImage = resolveImageDisplay(
    (resource as Media | string | number | null | undefined) ?? src,
    display,
  )

  const processedSrc = resolvedImage.src

  const handleError = () => {
    setDidError(true)
  }

  const resolvedWidth = width ?? resolvedImage.width
  const resolvedHeight = height ?? resolvedImage.height
  const objectFit = resolvedImage.fit
  const isBroken = !processedSrc || didError
  const shouldFillImage = fill === true || (!resolvedWidth && !resolvedHeight)
  const shouldFillParent = fill === true

  if (isBroken) {
    const isDefaultFallback = fallbackSrc === ERROR_IMG_SRC
    const fallbackClassName = shouldFillParent
      ? `absolute inset-0 bg-gray-100 overflow-hidden ${className ?? ''}`
      : `relative inline-block bg-gray-100 text-center align-middle overflow-hidden ${className ?? ''}`

    return (
      <div className={fallbackClassName} style={style}>
        <div className="flex items-center justify-center w-full h-full min-h-[inherit]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fallbackSrc}
            alt="Error loading image"
            style={
              isDefaultFallback
                ? { maxWidth: '50%', maxHeight: '50%' }
                : { width: '100%', height: '100%', objectFit }
            }
            className={isDefaultFallback ? 'opacity-30' : ''}
          />
          {isDefaultFallback && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {fallbackLabel}
            </span>
          )}
        </div>
      </div>
    )
  }

  const imageWrapperClassName = shouldFillParent
    ? `absolute inset-0 overflow-hidden ${className ?? ''}`
    : `relative overflow-hidden ${className ?? ''}`

  return (
    <div className={imageWrapperClassName} style={style}>
      <Image
        src={processedSrc}
        alt={alt || ''}
        fill={shouldFillImage}
        width={!shouldFillImage ? resolvedWidth : undefined}
        height={!shouldFillImage ? resolvedHeight : undefined}
        className="duration-700 ease-in-out"
        onError={handleError}
        style={{ objectFit }}
        {...(rest as any)}
      />
    </div>
  )
}
