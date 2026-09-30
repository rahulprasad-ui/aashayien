import type { Media as MediaType } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const imageDisplayPresetOptions = [
  { label: 'Original', value: 'original' },
  { label: 'Thumbnail (300px)', value: 'thumbnail' },
  { label: 'Square (500x500)', value: 'square' },
  { label: 'Small (600px)', value: 'small' },
  { label: 'Medium (900px)', value: 'medium' },
  { label: 'Large (1400px)', value: 'large' },
  { label: 'XLarge (1920px)', value: 'xlarge' },
  { label: 'OG (1200x630)', value: 'og' },
  { label: 'Custom', value: 'custom' },
] as const

export type ImageDisplayPreset = (typeof imageDisplayPresetOptions)[number]['value']
export type ImageFitMode = 'cover' | 'contain'
export type PayloadImageSizeKey = Exclude<ImageDisplayPreset, 'custom' | 'original'>

export interface ImageDisplayConfig {
  preset?: ImageDisplayPreset | null
  customWidth?: number | null
  customHeight?: number | null
  fit?: ImageFitMode | null
}

export interface ResolvedImageDisplay {
  fit: ImageFitMode
  height?: number
  preset?: ImageDisplayPreset | null
  sizeKey?: PayloadImageSizeKey
  src: string
  width?: number
}

const presetDimensions: Partial<Record<PayloadImageSizeKey, { width?: number; height?: number }>> = {
  thumbnail: { width: 300 },
  square: { width: 500, height: 500 },
  small: { width: 600 },
  medium: { width: 900 },
  large: { width: 1400 },
  xlarge: { width: 1920 },
  og: { width: 1200, height: 630 },
}

type MediaSizeVariant = NonNullable<MediaType['sizes']>[PayloadImageSizeKey]

const asPositiveNumber = (value: number | null | undefined): number | undefined => {
  if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) return undefined
  return value
}

const getVariantForPreset = (
  resource: MediaType,
  preset: PayloadImageSizeKey,
): MediaSizeVariant | undefined => {
  return resource.sizes?.[preset]
}

export const resolveImageDisplay = (
  resource?: MediaType | string | number | null,
  display?: ImageDisplayConfig | null,
  options?: {
    cacheTag?: string | null
    fallbackFit?: ImageFitMode
  },
): ResolvedImageDisplay => {
  const fit = display?.fit || options?.fallbackFit || 'cover'

  if (!resource || typeof resource !== 'object') {
    return {
      fit,
      height: asPositiveNumber(display?.customHeight),
      preset: display?.preset,
      src: getMediaUrl(resource),
      width: asPositiveNumber(display?.customWidth),
    }
  }

  const cacheTag = options?.cacheTag ?? resource.updatedAt
  const preset = display?.preset
  const originalWidth = asPositiveNumber(resource.width)
  const originalHeight = asPositiveNumber(resource.height)

  if (preset === 'custom') {
    return {
      fit,
      height: asPositiveNumber(display?.customHeight) || originalHeight,
      preset,
      src: getMediaUrl(resource.url, cacheTag),
      width: asPositiveNumber(display?.customWidth) || originalWidth,
    }
  }

  if (preset && preset !== 'original') {
    const variant = getVariantForPreset(resource, preset)
    const fallbackDimensions = presetDimensions[preset]

    return {
      fit,
      height:
        asPositiveNumber(fallbackDimensions?.height) ||
        asPositiveNumber(variant?.height) ||
        originalHeight,
      preset,
      sizeKey: preset,
      src: getMediaUrl(variant?.url || resource.url, cacheTag),
      width:
        asPositiveNumber(fallbackDimensions?.width) ||
        asPositiveNumber(variant?.width) ||
        originalWidth,
    }
  }

  return {
    fit,
    height: originalHeight,
    preset,
    src: getMediaUrl(resource.url, cacheTag),
    width: originalWidth,
  }
}
