import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'
import { RevalidateButton } from './Button'

const ManualRevalidate: React.FC = () => {
  return (
    <div
      style={{
        marginBottom: '2rem',
      }}
    >
      <Banner type="info">
        <h4 style={{ margin: 0 }}>Cache Management</h4>
        <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '0.9rem' }}>
          Use this to manually clear all frontend caches (Header, Branding, Home, etc.) if updates
          are not reflecting.
        </p>
        <RevalidateButton />
      </Banner>
    </div>
  )
}

export default ManualRevalidate
