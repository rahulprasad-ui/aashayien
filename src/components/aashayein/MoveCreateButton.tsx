'use client'

import { useEffect } from 'react'

export default function MoveCreateButton() {
  useEffect(() => {
    // Find the title that says "Mentorship Bookings"
    const titles = document.querySelectorAll('h1')
    for (const title of titles) {
      if (title.textContent?.includes('Mentorship Bookings')) {
        // The Create New button is usually next to the title in the same flex container
        const container = title.parentElement
        if (container) {
          container.style.display = 'flex'
          container.style.justifyContent = 'space-between'
          container.style.alignItems = 'center'
          container.style.width = '100%'
          
          // Find the link (Create New) and push it to the right
          const createBtn = container.querySelector('a')
          if (createBtn) {
            createBtn.style.marginLeft = 'auto'
          }
        }
        break
      }
    }
  }, [])

  return null
}
