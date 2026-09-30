'use client'

import React, { useState } from 'react'
import { Button } from '@payloadcms/ui'
import { revalidateAll } from '@/utilities/revalidateAll'
import { toast } from '@payloadcms/ui'

export const RevalidateButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRevalidate = async () => {
    setIsLoading(true)
    try {
      const result = await revalidateAll()
      if (result.success) {
        toast.success('All caches revalidated successfully!')
      } else {
        toast.error('Failed to revalidate caches.')
      }
    } catch (error) {
      console.error('Error revalidating caches:', error)
      toast.error('An error occurred while revalidating.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button buttonStyle="secondary" onClick={handleRevalidate} disabled={isLoading} size="small">
      {isLoading ? 'Revalidating...' : 'Manual Revalidate All'}
    </Button>
  )
}
