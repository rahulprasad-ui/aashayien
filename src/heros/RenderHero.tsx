import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { SimpleHero } from '@/heros/SimpleHero'

const heroes = {
  highImpact: HighImpactHero,
  none: () => null,
  simple: SimpleHero,
}

export const RenderHero: React.FC<Page['hero'] & { title?: string; showPageTitle?: boolean | null }> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
