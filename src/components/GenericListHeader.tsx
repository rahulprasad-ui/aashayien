import React from 'react'
import { ListHeaderLayout } from './ListHeaderLayout'
import GenericCreateButton from './GenericCreateButton'
import { SyncCoursesButton } from './SyncCoursesButton'
import type { BeforeListServerProps } from 'payload'
import { hasModulePermission } from '@/access/rbac'

const getLabel = (label: unknown, fallback: string) => {
  if (typeof label === 'string') return label
  if (label && typeof label === 'object' && 'en' in label) {
    return String((label as { en?: string }).en || fallback)
  }

  return fallback.charAt(0).toUpperCase() + fallback.slice(1)
}

export const GenericListHeader: React.FC<BeforeListServerProps> = async (props) => {
  const { collectionConfig, collectionSlug, hasCreatePermission, user } = props

  const title = getLabel(collectionConfig?.labels?.plural, collectionSlug)
  const showCreate = Boolean(hasCreatePermission)
  const showSyncCourses =
    collectionSlug === 'courses' && hasModulePermission(user, 'courses', 'update')

  return (
    <ListHeaderLayout title={title} description={collectionConfig?.admin?.description as string}>
      <div className="flex gap-4">
        {showSyncCourses && <SyncCoursesButton />}
        {showCreate && <GenericCreateButton />}
      </div>
    </ListHeaderLayout>
  )
}
