import React from 'react'
import Image from 'next/image'

// logo displays
export const Logo = () => (
  <Image
    src="/logo.png"
    alt="Aashayein Judiciary"
    width={200}
    height={60}
    style={{ height: '60px', width: 'auto' }}
  />
)

// icon display
export const Icon = () => (
  <Image
    src="/logo.png"
    alt="Aashayein Judiciary"
    width={32}
    height={32}
    style={{ height: '32px', width: 'auto' }}
  />
)
