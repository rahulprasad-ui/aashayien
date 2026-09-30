'use client'

import React, { useState } from 'react'
import { Button, toast } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

export const SyncCoursesButton: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false)
  const router = useRouter()

  const handleSync = async () => {
    if (isSyncing) return
    setIsSyncing(true)

    try {
      const res = await fetch('/api/courses/sync-classplus', {
        method: 'POST',
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(`Successfully synced ${data.syncedCount} out of ${data.total} courses!`)
        router.refresh()
      } else {
        toast.error(`Sync failed: ${data.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      toast.error(`Error during sync: ${error.message}`)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Button onClick={handleSync} disabled={isSyncing} buttonStyle="secondary">
      {isSyncing ? 'Syncing...' : 'Sync Classplus Courses'}
    </Button>
  )
}
