import { YoutubeFeature as BaseYoutubeFeature } from 'payloadcms-lexical-ext'

export const YoutubeFeature = () => {
  const baseFeature = BaseYoutubeFeature()
  return {
    ...baseFeature,
    feature: async (args: any) => {
      const resolved = typeof baseFeature.feature === 'function'
        ? await baseFeature.feature(args)
        : baseFeature.feature
      
      const baseGenerateSchemaMap = resolved.generateSchemaMap

      return {
        ...resolved,
        ClientFeature: '@/fields/lexical-features/YoutubeVimeo/YoutubeFeatureClient',
        generateSchemaMap: (schemaArgs: any) => {
          const map = baseGenerateSchemaMap ? baseGenerateSchemaMap(schemaArgs) : new Map()
          if (!map) return null
          const youtubeSchema = map.get('youtube')
          if (youtubeSchema && youtubeSchema.fields) {
            youtubeSchema.fields = youtubeSchema.fields.map((field: any) => {
              if (field.name === 'id') {
                return {
                  ...field,
                  name: 'embedId',
                  label: 'YouTube URL, ID or Embed Code',
                }
              }
              return field
            })
          }
          return map
        }
      }
    }
  }
}

