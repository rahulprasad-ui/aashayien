'use client'
import React from 'react'
import Link from 'next/link'
import { Gutter } from '@payloadcms/ui'

export const SubmissionsCountCell: React.FC<any> = ({ rowData, cellData }) => {
  const id = rowData.id
  const count = cellData || 0

  return (
    <Link
      href={`/admin/collections/forms/${id}/submissions`}
      style={{
        textDecoration: 'underline',
        color: 'var(--theme-elevation-800)',
        fontWeight: 'bold',
      }}
      onClick={(e) => e.stopPropagation()} // Prevent row click
    >
      {count}
    </Link>
  )
}

// Alias for backward compatibility / HMR cache to prevent "export not found" errors
export const ViewSubmissionsCell = SubmissionsCountCell

export const ViewSubmissionsLink: React.FC<any> = () => {
  return null
}
