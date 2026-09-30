import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || process.env.CDN_URL
const normalizeURL = (item) => {
  if (!item) return undefined

  try {
    return new URL(item).origin
  } catch {
    return undefined
  }
}

const normalizedCDNUrl = normalizeURL(CDN_URL)

const getRemotePattern = (item) => {
  const url = new URL(item)

  return {
    hostname: url.hostname,
    protocol: url.protocol.replace(':', ''),
  }
}

const imageRemotePatterns = [
  NEXT_PUBLIC_SERVER_URL,
  normalizedCDNUrl,
  'https://images.unsplash.com',
  'https://source.unsplash.com',
  'https://i.pravatar.cc',
  'https://img.youtube.com',
  'https://i.ytimg.com',
]
  .filter(Boolean)
  .map(getRemotePattern)
const staticAssetExtensions = [
  'ico',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'avif',
  'svg',
  'css',
  'js',
  'woff',
  'woff2',
]
const securityHeaders = [
  ...(process.env.NODE_ENV === 'production'
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
      ]
    : []),
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: normalizedCDNUrl,
  compress: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  poweredByHeader: false,
  images: {
    minimumCacheTTL: 86400,
    remotePatterns: imageRemotePatterns,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store, no-cache, must-revalidate',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store, no-cache, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              process.env.NODE_ENV === 'production'
                ? 'public, max-age=31536000, immutable'
                : 'no-store, no-cache, must-revalidate',
          },
        ],
      },
      {
        source: '/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      ...(process.env.NODE_ENV === 'production'
        ? staticAssetExtensions.map((extension) => ({
            source: `/:path*.${extension}`,
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=2592000, stale-while-revalidate=604800',
              },
            ],
          }))
        : []),
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.ignoreWarnings = [
      {
        module:
          /node_modules\/payload\/dist\/queues\/operations\/runJobs\/runJob\/importHandlerPath\.js/,
      },
    ]

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
