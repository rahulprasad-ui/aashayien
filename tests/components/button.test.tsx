import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '../../src/components/ui/button'

describe('Button Component', () => {
  it('renders button with text correctly', () => {
    render(<Button>Click Me</Button>)
    const buttonElement = screen.getByRole('button', { name: /click me/i })
    expect(buttonElement).toBeDefined()
  })

  it('renders with custom class name', () => {
    render(<Button className="custom-class">Click Me</Button>)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement.className).toContain('custom-class')
  })

  it('renders as different variant', () => {
    render(<Button variant="destructive">Delete</Button>)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement.className).toContain('bg-destructive')
  })
})
