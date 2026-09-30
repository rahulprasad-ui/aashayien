import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './button'

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
    // Tailwind classes for destructive variant might check specific classes if needed,
    // but verifying it renders without error is a good first step.
    // We can check if it has some expected class from the variant definition if we knew them exactly,
    // usually bg-destructive or similar.
    expect(buttonElement.className).toContain('bg-destructive')
  })
})
