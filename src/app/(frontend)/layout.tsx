import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Script from 'next/script'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedPopups } from '@/utilities/getPopups'
import { SitewideStructuredDataRenderer } from '@/components/SEO/StructuredDataRenderer'

import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema'
import { draftMode } from 'next/headers'
import { PopupManager } from '@/components/PopupManager'
import { ProgressBarComponent } from '@/components/ui/ProgressBar'
import { ConversionButtons } from '@/components/aashayien/ConversionButtons'

import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
})

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import type { Branding } from '@/payload-types'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const popups = await getCachedPopups()()

  const branding: Branding = (await getCachedGlobal('branding', 1)()) as Branding
  const ga4MeasurementId =
    branding?.analytics?.ga4MeasurementId ||
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ||
    process.env.GA4_MEASUREMENT_ID
  const googleTagManagerId =
    branding?.analytics?.googleTagManagerId ||
    process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID ||
    process.env.GOOGLE_TAG_MANAGER_ID
  const conversionHeadScript = branding?.analytics?.conversionHeadScript
  const conversionBodyScript = branding?.analytics?.conversionBodyScript

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, ubuntu.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        {googleTagManagerId && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${googleTagManagerId}');
              `,
            }}
          />
        )}
        {ga4MeasurementId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics-4"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ga4MeasurementId}');
                `,
              }}
            />
          </>
        )}
        {conversionHeadScript && (
          <Script
            id="conversion-head-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: conversionHeadScript }}
          />
        )}
      </head>
      <body>
        {googleTagManagerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {conversionBodyScript && (
          <Script
            id="conversion-body-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: conversionBodyScript }}
          />
        )}
        <SitewideStructuredDataRenderer />
        <BreadcrumbSchema />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <ProgressBarComponent />
          <main>{children}</main>
          <Footer />
          <PopupManager popups={popups} />
          <ConversionButtons branding={branding} />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const branding: Branding = (await getCachedGlobal('branding', 1)()) as Branding
  const googleSiteVerification =
    branding?.searchConsole?.googleSiteVerification ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: branding?.siteMeta?.title || 'Aashayein Judiciary',
      template: `%s | ${branding?.siteMeta?.title || 'Aashayein Judiciary'}`,
    },
    icons: {
      icon:
        branding?.brandAssets?.favicon &&
        typeof branding.brandAssets.favicon === 'object' &&
        branding.brandAssets.favicon.url
          ? branding.brandAssets.favicon.url
          : '/favicon.ico',
    },
    verification: googleSiteVerification
      ? {
          google: googleSiteVerification,
        }
      : undefined,
  }
}
