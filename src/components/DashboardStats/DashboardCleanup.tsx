'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const DashboardCleanup = () => {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || !/^\/admin\/?$/.test(pathname)) {
      return
    }

    const hideDefaults = () => {
      const selectors = [
        '.dashboard__card-list',
        '.gutter__content > .grid',
        '.gutter__content > h2',
      ]

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
          if (!el.closest('.dashboard-stats') && !el.closest('.before-dashboard')) {
            const element = el as HTMLElement
            element.style.display = 'none'
          }
        })
      })

      const headings = document.querySelectorAll('h2')
      headings.forEach((h2) => {
        const text = h2.innerText.trim().toLowerCase()
        if (
          [
            'collections',
            'globals',
            'pages',
            'website',
            'content',
            'site meta',
            'resources',
            'shop',
            'admin',
            'settings',
            'leads',
            'taxonomy',
            'user management',
            'academics',
            'system',
          ].includes(text)
        ) {
          h2.style.display = 'none'
          const next = h2.nextElementSibling
          if (next && (next.tagName === 'DIV' || next.tagName === 'UL')) {
            const nextElement = next as HTMLElement
            nextElement.style.display = 'none'
          }
        }

        if (
          h2.parentElement &&
          (h2.parentElement.classList.contains('gutter__content') ||
            h2.parentElement.classList.contains('dashboard')) &&
          !h2.closest('.dashboard-stats') &&
          !h2.closest('.before-dashboard')
        ) {
          h2.style.display = 'none'
          const next = h2.nextElementSibling
          if (next && (next.tagName === 'DIV' || next.tagName === 'UL')) {
            const nextElement = next as HTMLElement
            nextElement.style.display = 'none'
          }
        }
      })
    }

    hideDefaults()

    const observer = new MutationObserver(hideDefaults)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [pathname])

  return null
}

export default DashboardCleanup
