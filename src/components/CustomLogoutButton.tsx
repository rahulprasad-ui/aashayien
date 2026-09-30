'use client'
// changes test 22 sserer
import React from 'react'
import { Logout } from '@payloadcms/ui'
import { ExternalLink } from 'lucide-react'

export const CustomLogoutButton: React.FC = (props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        title="Visit Site"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--theme-elevation-500)',
          textDecoration: 'none',
          padding: '4px',
          borderRadius: '4px',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--theme-elevation-800)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--theme-elevation-500)')}
      >
        <ExternalLink size={18} />
      </a>
      <Logout {...props} />
    </div>
  )
}
