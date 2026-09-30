'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const GenericCreateButton: React.FC = () => {
  const pathname = usePathname()
  // Assuming pathname is like /admin/collections/[slug]
  // We want to append /create
  // Use robust logic: remove query params (if any) and ensure we are at the root of the collection list

  const createLink = `${pathname}/create`

  return (
    <Link
      href={createLink}
      className="btn list-create-new-doc__create-new-button btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill"
      aria-label="Create New"
    >
      <span className="btn__content">
        <span className="btn__label">Create New</span>
      </span>
    </Link>
  )
}

export default GenericCreateButton
