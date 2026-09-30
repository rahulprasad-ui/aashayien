import { describe, expect, it } from 'vitest'
import { toKebabCase } from './toKebabCase'

describe('toKebabCase', () => {
  it('should convert spaces to hyphens and lowercase text', () => {
    expect(toKebabCase('Hello World')).toBe('hello-world')
  })

  it('should convert camelCase to kebab-case', () => {
    expect(toKebabCase('helloWorld')).toBe('hello-world')
  })

  it('should handle mixed spaces and camelCase', () => {
    expect(toKebabCase('Hello WorldTest')).toBe('hello-world-test')
  })

  it('should handle strings with multiple spaces', () => {
    expect(toKebabCase('Hello   World')).toBe('hello-world')
  })

  it('should return undefined or handle nullish inputs gracefully if typed loosely (though TS expects string)', () => {
    // Based on implementation `string?.replace...` it handles undefined/null if passed via any
    expect(toKebabCase(undefined as any)).toBe(undefined)
    expect(toKebabCase(null as any)).toBe(undefined)
  })
})
