import { describe, expect, it } from 'vitest'
import { formatDateTime } from '../../src/utilities/formatDateTime'

describe('formatDateTime', () => {
  it('should format a valid date string correctly in MM/DD/YYYY format', () => {
    const timestamp = '2023-10-05T12:00:00Z'
    // Oct is month 10.
    const expected = '10/05/2023'
    expect(formatDateTime(timestamp)).toBe(expected)
  })

  it('should pad single digit month and day with zero', () => {
    const timestamp = '2023-01-05T12:00:00Z'
    // Jan is month 01.
    const expected = '01/05/2023'
    expect(formatDateTime(timestamp)).toBe(expected)
  })

  it('should handle different years correctly', () => {
    const timestamp = '2025-12-31T00:00:00Z'
    expect(formatDateTime(timestamp)).toBe('12/31/2025')
  })
})
