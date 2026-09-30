import { Media } from '@/payload-types'

export type BrandingSeederArgs = {
  logo: Media
  favicon: Media
}

export const getBrandingSeederData = ({ logo, favicon }: BrandingSeederArgs) => ({
  brandAssets: {
    logo: logo.id,
    favicon: favicon.id,
    ogImage: logo.id,
  },
  siteMeta: {
    title: 'Aashayein Judiciary - Shaping Future Judiciary Officers',
    description:
      'Empowering aspiring judiciary officers with comprehensive coaching, expert guidance, and unwavering support to achieve their dreams of serving justice.',
    keywords: 'judiciary coaching, civil judge exam, UPPCS-J, MP Judiciary, law coaching',
  },
})
