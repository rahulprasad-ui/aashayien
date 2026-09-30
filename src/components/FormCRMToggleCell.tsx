'use client'

import React, { useState } from 'react'

type FormCRMToggleCellProps = {
  cellData?: boolean | null
  rowData?: {
    id?: number | string
    title?: string
  }
}

export const FormCRMToggleCell: React.FC<FormCRMToggleCellProps> = ({ cellData, rowData }) => {
  const [enabled, setEnabled] = useState(Boolean(cellData))
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const updateCRMSetting = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!rowData?.id || isSaving) {
      return
    }

    const nextEnabled = !enabled

    setEnabled(nextEnabled)
    setIsSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/forms/${rowData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enableCRM: nextEnabled,
        }),
      })

      if (!response.ok) {
        throw new Error('Unable to update CRM setting')
      }
    } catch (err) {
      setEnabled(!nextEnabled)
      setError(err instanceof Error ? err.message : 'Unable to update CRM setting')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: '8px',
        minWidth: '150px',
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label={`${enabled ? 'Disable' : 'Enable'} Send Leads to CRM for ${
          rowData?.title || 'this form'
        }`}
        aria-pressed={enabled}
        disabled={isSaving || !rowData?.id}
        onClick={updateCRMSetting}
        style={{
          alignItems: 'center',
          background: enabled ? 'var(--theme-success-500)' : 'var(--theme-elevation-300)',
          border: '1px solid var(--theme-elevation-250)',
          borderRadius: '999px',
          cursor: isSaving || !rowData?.id ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          height: '24px',
          opacity: isSaving ? 0.7 : 1,
          padding: '2px',
          position: 'relative',
          transition: 'background 120ms ease, opacity 120ms ease',
          width: '44px',
        }}
      >
        <span
          style={{
            background: 'var(--theme-elevation-0)',
            borderRadius: '50%',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            display: 'block',
            height: '18px',
            transform: enabled ? 'translateX(18px)' : 'translateX(0)',
            transition: 'transform 120ms ease',
            width: '18px',
          }}
        />
      </button>
      <span
        aria-live="polite"
        style={{
          color: error ? 'var(--theme-error-500)' : 'var(--theme-elevation-700)',
          fontSize: '12px',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        {error || (isSaving ? 'Saving...' : enabled ? 'On' : 'Off')}
      </span>
    </div>
  )
}
