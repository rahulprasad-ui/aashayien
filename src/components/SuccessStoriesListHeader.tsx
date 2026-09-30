import React from 'react'
import CreateSuccessStoryButton from './CreateSuccessStoryButton'
import { ListHeaderLayout } from './ListHeaderLayout/index'
import { hasModulePermission } from '@/access/rbac'

export const SuccessStoriesListHeader: React.FC<{ user?: any }> = ({ user }) => {
  const showCreate = hasModulePermission(user, 'success-stories', 'create')

  return (
    <ListHeaderLayout
      title="Success Stories"
      description="Manage and track your success stories here."
    >
      {showCreate && <CreateSuccessStoryButton />}
    </ListHeaderLayout>
  )
}
