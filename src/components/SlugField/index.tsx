'use client'

import React from 'react'
import { useField, useDocumentInfo, FieldLabel, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

export const formatSlug = (val: string): string =>
  val
    ? val
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .toLowerCase()
    : ''

export const SlugField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path: path || field.name })
  const { id } = useDocumentInfo()
  const title = useFormFields(([fields]) => fields.title?.value as string)
  const [isManual, setIsManual] = React.useState(false)

  React.useEffect(() => {
    if (!isManual && title) {
      const formattedSlug = formatSlug(title)
      if (value !== formattedSlug) {
        setValue(formattedSlug)
      }
    }
  }, [title, setValue, isManual, value])

  return (
    <div className="field-type text" style={{ marginBottom: '1rem' }}>
      <FieldLabel label={field.label || field.name} required={field.required} path={path || field.name} />
      <div>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value)
            setIsManual(true)
          }}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid var(--theme-elevation-150, #ccc)',
            borderRadius: '4px',
            backgroundColor: 'var(--theme-input-bg, #fff)',
            color: 'var(--theme-text, inherit)',
            cursor: 'text',
            fontSize: '14px',
          }}
        />
      </div>
    </div>
  )
}
