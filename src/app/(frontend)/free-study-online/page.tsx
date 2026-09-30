import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FreeStudy, type Video, type Category } from '@/components/aashayien/FreeStudy'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { SchemaOrg } from '@/components/SEO/SchemaOrg'

export async function generateMetadata(): Promise<Metadata> {
  const freeStudyGlobal: any = await getCachedGlobal('free-study', 1)()
  return generateMeta({ doc: freeStudyGlobal as any, slug: 'free-study-online' })
}

export default async function FreeStudyPage() {
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch Global Data
  const freeStudyGlobal: any = await payload.findGlobal({
    slug: 'free-study',
    depth: 2,
  })

  // 2. Fetch Categories
  const categoriesResult = await payload.find({
    collection: 'resource-categories',
    limit: 100,
    sort: 'title',
  })

  // 3. Fetch Resources (Videos)
  const resourcesResult = await payload.find({
    collection: 'resources',
    limit: 1000,
    depth: 1, // Ensure category relationship is populated
  })

  // Transform Categories
  // If no categories found (e.g. no seed), pass undefined to let component use default
  let categories: Category[] | undefined = undefined

  if (categoriesResult.docs.length > 0) {
    categories = categoriesResult.docs
      .map((cat) => ({
        key: cat.slug || '',
        label: cat.title,
      }))
      .filter((c) => c.key) // ensure key exists
  }

  // Transform Videos
  let videos: Video[] | undefined = undefined

  if (resourcesResult.docs.length > 0) {
    videos = resourcesResult.docs.map((res) => {
      // Map Payload Resource to Component Video

      // Handle Category Relationship
      let categoryKey = 'uncategorized'
      if (typeof res.category === 'object' && res.category !== null) {
        categoryKey = (res.category as any).slug || 'uncategorized'
      }

      // Handle Thumbnail
      let thumbnailUrl = res.externalThumbnailUrl || ''
      if (!thumbnailUrl && res.thumbnail && typeof res.thumbnail === 'object') {
        thumbnailUrl = (res.thumbnail as any).url || ''
      }

      return {
        id: String(res.id),
        slug: res.slug || '',
        title: res.title,
        description: res.description || '',
        category: categoryKey,
        duration: res.duration || '',
        views: res.views || '0',
        youtubeId: res.youtubeId || '',
        thumbnail: thumbnailUrl,
        thumbnailResource: res.thumbnail,
        thumbnailDisplay: (res as any).thumbnailDisplay,
        tags: res.tags?.map((t) => t.tag || '') || [],
        uploadDate: res.uploadDate || '',
        resourceType: res.resourceType,
      }
    })
  }

  // Transform Hero Data
  let heroData = undefined
  if (freeStudyGlobal) {
    heroData = {
      badgeText: freeStudyGlobal.badgeText || undefined,
      title: freeStudyGlobal.title || undefined,
      subtitle: freeStudyGlobal.subtitle || undefined,
    }
  }

  // Transform Pan India Data
  let panIndiaData = undefined
  if (freeStudyGlobal) {
    // Use the global object directly as fields are flattened
    panIndiaData = {
      badgeText: freeStudyGlobal.panIndiaBadgeText || 'Coverage',
      title: freeStudyGlobal.panIndiaTitle || 'Pan India Reach',
      subtitle: freeStudyGlobal.panIndiaSubtitle || 'From Himalayas to Coastlines',
      description: freeStudyGlobal.panIndiaDescription || '',
      backgroundUrl:
        typeof freeStudyGlobal.panIndiaBackground === 'object' &&
        freeStudyGlobal.panIndiaBackground?.url
          ? freeStudyGlobal.panIndiaBackground.url
          : '',
      backgroundResource: freeStudyGlobal.panIndiaBackground,
      backgroundDisplay: freeStudyGlobal.panIndiaBackgroundDisplay,
      stats: {
        states: freeStudyGlobal.panIndiaStats?.statesCount || '14+',
        videos: freeStudyGlobal.panIndiaStats?.videosCount || '1000+',
        views: freeStudyGlobal.panIndiaStats?.viewsCount || '10M+',
      },
      enable: freeStudyGlobal.enablePanIndiaSection ?? true,
      cta: {
        title: freeStudyGlobal.panIndiaCTA?.title || 'Access All Playlists',
        description: freeStudyGlobal.panIndiaCTA?.description || 'State-wise organized lectures for every judiciary exam',
        buttonText: freeStudyGlobal.panIndiaCTA?.buttonText || 'View Details',
        buttonUrl: freeStudyGlobal.panIndiaCTA?.buttonUrl || 'https://www.youtube.com/@AashayeinJudiciary',
      },
      featuredStates:
        freeStudyGlobal.featuredStates?.map((s: any) => ({
          name: s.name,
          abbr: s.abbr,
          code: s.code,
          imageUrl: typeof s.image === 'object' && s.image?.url ? s.image.url : '',
          imageResource: s.image,
          imageDisplay: s.imageDisplay,
          color: s.color || 'from-slate-900 to-slate-800',
        })) || [],
      otherStatesTitle: freeStudyGlobal.otherStatesTitle || 'More States Covered',
      enableOtherStates: freeStudyGlobal.enableOtherStates ?? true,
      otherStates:
        freeStudyGlobal.otherStates?.map((s: any) => ({
          name: s.name,
          abbr: s.abbr,
        })) || [],
      features:
        freeStudyGlobal.features?.map((f: any) => ({
          title: f.title,
          icon: f.icon,
        })) || [],
    }
  }

  return (
    <main>
      <SchemaOrg
        type="WebPage"
        data={{
          name: freeStudyGlobal?.meta?.title || 'Free Study Online | Aashayein Judiciary',
          description: freeStudyGlobal?.meta?.description,
        }}
      />
      <FreeStudy
        heroData={heroData}
        categories={categories}
        videos={videos}
        panIndiaData={panIndiaData}
        gatingConfig={
          freeStudyGlobal
            ? {
                enableGating: freeStudyGlobal.enableGating || false,
                gatingPopup: (freeStudyGlobal.gatingPopup as any) || undefined,
              }
            : undefined
        }
      />
    </main>
  )
}
