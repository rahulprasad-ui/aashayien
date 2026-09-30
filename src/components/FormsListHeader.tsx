import React from 'react'
import GenericCreateButton from './GenericCreateButton'
import { ListHeaderLayout } from './ListHeaderLayout/index'
import { hasModulePermission } from '@/access/rbac'

export const FormsListHeader: React.FC<{ user?: any }> = ({ user }) => {
  const showCreate = hasModulePermission(user, 'forms', 'create')

  return (
    <ListHeaderLayout title="Forms" description="Manage your forms and view submissions.">
      {showCreate && <GenericCreateButton />}
    </ListHeaderLayout>
  )
}
