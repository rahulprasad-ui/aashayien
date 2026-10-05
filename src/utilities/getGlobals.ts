import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  try {
    const payload = await getPayload({ config: configPromise })

    const global = await payload.findGlobal({
      slug,
      depth,
    })

    return global
  } catch (error) {
    console.error(`Error fetching global '${slug}':`, error)
    return null as any
  }
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(
    async () => {
      console.log(`[Cache Miss] Fetching fresh global: ${slug}, depth: ${depth}`)
      return (await getGlobal(slug, depth)) as Config['globals'][T]
    },
    [slug, String(depth)],
    {
      tags: [`global_${slug}`],
    },
  ) as () => Promise<Config['globals'][T]>
