'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Gutter, Button, useDocumentInfo, ShimmerEffect } from '@payloadcms/ui'
import Link from 'next/link'
import { RefreshCcw } from 'lucide-react'

export const FormSubmissionsView: React.FC<any> = (props) => {
  const { id } = useDocumentInfo()

  // Payload typically passes 'data' for the document data in edit views
  const formData = props.data || props.doc || {}
  const formId = id || formData.id || props.id

  const [submissions, setSubmissions] = useState<any[]>([])
  const [formFields, setFormFields] = useState<any[]>([])
  const [formTitle, setFormTitle] = useState<string>(formData.title || '')
  const [isLoading, setIsLoading] = useState(true)

  const fetchSubmissions = useCallback(async () => {
    if (!formId) {
      console.warn('FormSubmissionsView: No Form ID found', props)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    try {
      // 1. Fetch the Form definition to get the field labels
      // Use the passed data, or fetch it if missing (though it should be there in edit view)
      // If formData is empty but we have ID, we might need to fetch the form itself.
      let fields = formData.fields || []

      // Also check if title is missing
      if (!formTitle || fields.length === 0) {
        const formReq = await fetch(`/api/forms/${formId}`)
        if (formReq.ok) {
          const formDataFetched = await formReq.json()
          fields = formDataFetched.fields || []
          if (formDataFetched.title) {
            setFormTitle(formDataFetched.title)
          }
        }
      }

      setFormFields(fields)

      // 2. Fetch the submissions for this form
      const req = await fetch(
        `/api/form-submissions?where[form][equals]=${formId}&limit=100&sort=-createdAt&depth=0`,
      )
      
      if (!req.ok) {
        throw new Error(`Failed to fetch submissions: ${req.statusText}`)
      }

      const data = await req.json()
      setSubmissions(data.docs || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  if (isLoading) {
    return (
      <Gutter>
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <ShimmerEffect height="40px" width="300px" />
          <ShimmerEffect height="40px" width="120px" />
        </div>
        <div
          style={{
            border: '1px solid var(--theme-elevation-200)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1px',
              backgroundColor: 'var(--theme-elevation-200)',
              borderBottom: '1px solid var(--theme-elevation-200)',
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{ padding: '12px', backgroundColor: 'var(--theme-elevation-100)' }}
              >
                <ShimmerEffect height="20px" />
              </div>
            ))}
          </div>
          {[...Array(5)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '1px',
                backgroundColor: 'var(--theme-elevation-200)',
                borderBottom: '1px solid var(--theme-elevation-200)',
              }}
            >
              {[...Array(5)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={{ padding: '12px', backgroundColor: 'var(--theme-elevation-0)' }}
                >
                  <ShimmerEffect height="20px" width="80%" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Gutter>
    )
  }

  if (!formId) {
    return (
      <Gutter>
        <h1>Error: Could not determine Form ID.</h1>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </Gutter>
    )
  }

  // Helper to get value from submissionData array
  const getValue = (submissionData: any[], fieldName: string) => {
    const field = submissionData?.find((item: any) => item.field === fieldName)
    return field ? field.value : '-'
  }

  const exportToCSV = () => {
    if (!submissions.length) return

    // 1. Headers
    const headers = ['ID', 'Date', ...formFields.map((f: any) => f.label || f.name)]
    const csvContent = [
      headers.join(','),
      ...submissions.map((sub: any) => {
        const row = [
          sub.id,
          new Date(sub.createdAt).toLocaleString(),
          ...formFields.map((f: any) => `"${getValue(sub.submissionData, f.name)}"`),
        ]
        return row.join(',')
      }),
    ].join('\n')

    // Use a safe title for the filename
    const safeTitle = formTitle || 'form'

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${safeTitle}_submissions.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Gutter className="form-submissions-view">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0px',
        }}
      >
        <Button buttonStyle="subtle" onClick={exportToCSV} disabled={!submissions.length}>
          Export to CSV
        </Button>
        <Button buttonStyle="subtle" onClick={fetchSubmissions} disabled={isLoading}>
          Refresh
        </Button>
      </div>

      <div
        style={{
          overflowX: 'auto',
          border: '1px solid var(--theme-elevation-200)',
          borderRadius: '4px',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--theme-elevation-100)' }}>
            <tr>
              <th style={{ padding: '12px', borderBottom: '1px solid var(--theme-elevation-200)' }}>
                ID
              </th>
              <th style={{ padding: '12px', borderBottom: '1px solid var(--theme-elevation-200)' }}>
                Date
              </th>
              {formFields.map((field: any, i: number) => (
                <th
                  key={i}
                  style={{ padding: '12px', borderBottom: '1px solid var(--theme-elevation-200)' }}
                >
                  {field.label || field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub: any, i: number) => (
              <tr
                key={sub.id}
                style={{
                  borderBottom: '1px solid var(--theme-elevation-200)',
                  backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--theme-elevation-50)',
                }}
              >
                <td style={{ padding: '12px' }}>{sub.id}</td>
                <td style={{ padding: '12px' }}>{new Date(sub.createdAt).toLocaleString()}</td>
                {formFields.map((field: any, j: number) => (
                  <td key={j} style={{ padding: '12px' }}>
                    {getValue(sub.submissionData, field.name)}
                  </td>
                ))}
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td
                  colSpan={formFields.length + 2}
                  style={{ padding: '20px', textAlign: 'center' }}
                >
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Gutter>
  )
}
