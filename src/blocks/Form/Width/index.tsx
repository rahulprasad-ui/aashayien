import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
  columnWidth?: number | string
}> = ({ children, className, width, columnWidth }) => {
  const widthVal =
    typeof columnWidth === 'string'
      ? parseFloat(columnWidth)
      : columnWidth || (typeof width === 'string' ? parseFloat(width) : width)
  let colSpan = 'col-span-12'

  const columnMap: Record<number, string> = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
  }

  if (widthVal && !isNaN(widthVal)) {
    if (widthVal <= 12) {
      // It's a column count (1-12), use map
      colSpan = `col-span-full ${columnMap[widthVal] || 'md:col-span-12'}`
    } else {
      // It's a percentage (legacy), map to nearest column
      const col = Math.round((widthVal / 100) * 12)
      colSpan = `col-span-full ${columnMap[col] || 'md:col-span-12'}`
    }
  }

  return <div className={`${className || ''} ${colSpan}`}>{children}</div>
}
