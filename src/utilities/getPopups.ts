import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import type { Popup } from '@/payload-types'

async function getPopups(): Promise<Popup[]> {
  const payload = await getPayload({ config: configPromise })

  const popups = await payload.find({
    collection: 'popups',
    where: {
      isActive: {
        equals: true,
      },
    },
    depth: 2,
    overrideAccess: true,
  })

  return popups.docs
}

export const getCachedPopups = () =>
  unstable_cache(
    async () => {
      return getPopups()
    },
    ['popups_active'],
    {
      tags: ['popups_active'],
    },
  )
