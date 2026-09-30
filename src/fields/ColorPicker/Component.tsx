'use client'
import * as React from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import './styles.css'

export const ColorPicker: React.FC<{
  path: string
  label?: string
  required?: boolean
  field: any
}> = ({ path, label, required, field }) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div className="field-type color-picker-field">
      <FieldLabel label={label || field?.label} required={required || field?.required} />
      <div className="color-picker-container">
        <input
          type="color"
          aria-label="Pick a color"
          value={value || '#000000'}
          onChange={(e) => setValue(e.target.value)}
          className="color-input"
        />
        <input
          type="text"
          aria-label="Hex color code"
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          placeholder="#000000"
          className="text-input"
        />
      </div>
    </div>
  )
}
