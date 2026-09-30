'use client'

import NextTopLoader from 'nextjs-toploader'
import React from 'react'

export function ProgressBarComponent() {
  return (
    <NextTopLoader
      color="#ed1f24"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px #ed1f24,0 0 5px #ed1f24"
      zIndex={1600}
    />
  )
}
