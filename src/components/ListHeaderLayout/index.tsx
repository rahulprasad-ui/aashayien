import React from 'react'
import { Gutter } from '@payloadcms/ui'
import './index.scss'

type ListHeaderLayoutProps = {
  title: string
  description?: string
  children?: React.ReactNode // For Actions
}

export const ListHeaderLayout: React.FC<ListHeaderLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="list-header-layout">
      <div className="list-header-container">
        <Gutter>
          <div className="header-content">
            <div className="header-left">
              <h1>{title}</h1>
              {description && <p>{description}</p>}
            </div>
            {children && <div className="header-actions">{children}</div>}
          </div>
        </Gutter>
      </div>
    </div>
  )
}
