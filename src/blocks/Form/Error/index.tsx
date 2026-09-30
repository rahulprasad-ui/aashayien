'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  const [showError, setShowError] = React.useState(false)
  const error = errors[name]

  React.useEffect(() => {
    if (error) {
      setShowError(true)
      const timer = setTimeout(() => {
        setShowError(false)
      }, 30000)

      return () => clearTimeout(timer)
    }
  }, [error])

  if (!error || !showError) {
    return null
  }

  return <div className="mt-2 text-red-500 text-sm">{error.message as string}</div>
}
