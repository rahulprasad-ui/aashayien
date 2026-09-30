'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<NonNullable<Header['navigation']>['navItems']>[number]>()

  let labelStr = ''
  if (data?.data?.blockType === 'link') {
    labelStr = data?.data?.link?.label || 'Link'
  } else if (data?.data?.blockType === 'dropdown' || data?.data?.blockType === 'mega-menu') {
    labelStr = data?.data?.title || 'Menu'
  } else {
    labelStr = 'Row'
  }

  const label = labelStr
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${labelStr}`
    : 'Row'

  return <div>{label}</div>
}
