'use client'

import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const [greeting, setGreeting] = React.useState('Welcome')

  React.useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>{greeting}, Welcome to your dashboard!</h4>
      </Banner>
      <div style={{ marginTop: '1rem' }}>
        <SeedButton />
      </div>
    </div>
  )
}

export default BeforeDashboard
