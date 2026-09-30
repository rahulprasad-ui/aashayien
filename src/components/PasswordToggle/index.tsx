'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Eye, EyeOff } from 'lucide-react'

/**
 * Injects password visibility toggles into Payload admin password fields.
 */
const PasswordToggle: React.FC = () => {
  const [targets, setTargets] = useState<HTMLElement[]>([])

  useEffect(() => {
    const getPasswordFields = () => {
      const inputs = Array.from(
        document.querySelectorAll<HTMLInputElement>(
          [
            'input[type="password"]',
            'input[name="password"]',
            'input[name="confirmPassword"]',
            'input[name="_confirmPassword"]',
            'input[name="confirm-password"]',
          ].join(','),
        ),
      )

      return inputs.reduce<HTMLElement[]>((fields, input) => {
        const field = input.closest<HTMLElement>('.field-type, .render-fields__field, .form-field')

        if (!field || fields.includes(field)) return fields

        field.classList.add('password-toggle-field')
        fields.push(field)
        return fields
      }, [])
    }

    const syncTargets = () => {
      setTargets((currentTargets) => {
        const nextTargets = getPasswordFields()
        const isSame =
          currentTargets.length === nextTargets.length &&
          currentTargets.every((target, index) => target === nextTargets[index])

        return isSame ? currentTargets : nextTargets
      })
    }

    syncTargets()

    const observer = new MutationObserver(syncTargets)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {targets.map((target, index) => (
        <PasswordToggleButton
          key={`${target.dataset.name || 'password'}-${index}`}
          target={target}
        />
      ))}
    </>
  )
}

//fix

const PasswordToggleButton: React.FC<{ target: HTMLElement }> = ({ target }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const input = target.querySelector<HTMLInputElement>('input')
    if (!input) return

    const newVisibility = !isVisible
    input.type = newVisibility ? 'text' : 'password'
    setIsVisible(newVisibility)
  }

  return createPortal(
    <button
      type="button"
      onClick={handleToggle}
      className="password-toggle-button"
      aria-label={isVisible ? 'Hide password' : 'Show password'}
      title={isVisible ? 'Hide password' : 'Show password'}
      tabIndex={-1}
    >
      {isVisible ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
    </button>,
    target,
  )
}

export default PasswordToggle
