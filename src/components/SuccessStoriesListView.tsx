import React from 'react'
import { DefaultListView } from '@payloadcms/ui'
import { Gutter } from '@payloadcms/ui'
import Link from 'next/link'
import { hasModulePermission } from '@/access/rbac'

import './SuccessStoriesListView.scss'

export const SuccessStoriesListView: React.FC<any> = async (props) => {
  const showCreate = hasModulePermission(props?.user, 'success-stories', 'create')

  return (
    <div className="success-stories-list-view">
      <div className="success-stories-header">
        <Gutter>
          <div className="header-content">
            <div className="header-left">
              <h1>Success Stories</h1>
              <p>Manage and track your success stories here.</p>
            </div>
            {showCreate && (
              <div className="header-actions">
                <Link
                  href="/admin/collections/success-stories/create"
                  className="btn btn--style-primary btn--size-medium"
                >
                  Create New
                </Link>
              </div>
            )}
          </div>
        </Gutter>
      </div>

      <div className="default-list-wrapper">
        <DefaultListView collectionSlug="success-stories" {...props} />
      </div>
    </div>
  )
}
