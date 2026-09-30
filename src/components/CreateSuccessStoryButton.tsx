'use client'

import React from 'react'
import Link from 'next/link'

const CreateSuccessStoryButton: React.FC = () => {
  return (
    <Link
      href="/admin/collections/success-stories/create"
      className="btn list-create-new-doc__create-new-button btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill"
      aria-label="Create new Success Story"
    >
      <span className="btn__content">
        <span className="btn__label">Create New</span>
      </span>
    </Link>
  )
}

export default CreateSuccessStoryButton
