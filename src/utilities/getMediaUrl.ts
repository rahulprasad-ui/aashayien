import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @param absolute Whether to return an absolute URL (defaults to false)
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (
  url: any,
  cacheTag?: string | null,
  absolute: boolean = false,
): string => {
  if (!url) return ''

  // Handle object input (like Payload Media objects)
  let resolvedUrl = ''
  if (typeof url === 'object' && url !== null) {
    resolvedUrl = url.url || ''
  } else if (typeof url === 'string') {
    resolvedUrl = url
  } else {
    // If it's a number or something else unexpected, convert to string or return empty
    resolvedUrl = String(url)
  }

  if (!resolvedUrl) return ''

  // Handle YouTube URLs - transform video link to thumbnail link
  const youtubeId = extractYoutubeId(resolvedUrl)
  if (youtubeId) {
    resolvedUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol
  if (resolvedUrl.startsWith('http://') || resolvedUrl.startsWith('https://')) {
    return cacheTag ? `${resolvedUrl}?${cacheTag}` : resolvedUrl
  }

  // If absolute is requested, prepend client-side URL
  if (absolute) {
    const baseUrl = getClientSideURL()
    return cacheTag ? `${baseUrl}${resolvedUrl}?${cacheTag}` : `${baseUrl}${resolvedUrl}`
  }

  // Otherwise return relative path
  return cacheTag ? `${resolvedUrl}?${cacheTag}` : resolvedUrl
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function extractYoutubeId(url: string): string | null {
  if (!url) return null

  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/
  const match = url.match(regex)
  
  if (match && match[2]) {
    return match[2]
  }

  // If no match but it looks like a valid ID (11 chars), return it
  if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
    return url
  }

  return null
}

/**
 * Extracts Vimeo video ID from various Vimeo URL formats
 */
export function extractVimeoId(url: string): string | null {
  if (!url) return null

  // Check if it's already a numeric ID
  if (/^\d+$/.test(url)) {
    return url
  }

  const regex = /vimeo\.com\/(?:video\/)?(\d+)/
  const match = url.match(regex)
  return match ? match[1] : null
}
