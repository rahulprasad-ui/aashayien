'use client'

import { getTranslation } from '@payloadcms/translations'
import { NavGroup, useConfig, useTranslation } from '@payloadcms/ui'
import { baseClass } from './constants'
import { EntityType, formatAdminURL, NavGroupType } from '@payloadcms/ui/shared'
import { usePathname } from 'next/navigation'
import LinkWithDefault from 'next/link'
import { NavPreferences } from 'payload'
import { FC, Fragment } from 'react'
import { Home, UserRoundSearch } from 'lucide-react'
import { getNavIcon } from './navIconMap'

type Props = {
  groups: NavGroupType[]
  navPreferences: NavPreferences | null
  showDashboard?: boolean
  showLeads?: boolean
}

export const NavClient: FC<Props> = ({
  groups,
  navPreferences,
  showDashboard = false,
  showLeads = false,
}) => {
  const pathname = usePathname()

  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  const { i18n } = useTranslation()
  const leadsHref = formatAdminURL({ adminRoute, path: '/collections/leads' })
  const leadsLink = showLeads ? (
    <LinkWithDefault
      className={[`${baseClass}__link`, pathname.startsWith(leadsHref) && `active`]
        .filter(Boolean)
        .join(' ')}
      href={leadsHref}
      id="nav-leads"
      prefetch={false}
    >
      {pathname.startsWith(leadsHref) && <div className={`${baseClass}__link-indicator`} />}
      <UserRoundSearch className={`${baseClass}__icon`} />
      <span className={`${baseClass}__link-label`}>Lms dashbaord</span>
    </LinkWithDefault>
  ) : null

  return (
    <Fragment>
      {(showDashboard || showLeads) && (
        <NavGroup label={getTranslation('General', i18n)}>
          {showDashboard && (
            <LinkWithDefault
              className={[`${baseClass}__link`, pathname === adminRoute && `active`]
                .filter(Boolean)
                .join(' ')}
              href={adminRoute}
              id="nav-dashboard"
              prefetch={false}
            >
              {pathname === adminRoute && <div className={`${baseClass}__link-indicator`} />}
              <Home className={`${baseClass}__icon`} />
              <span className={`${baseClass}__link-label`}>
                {getTranslation('Dashboard', i18n)}
              </span>
            </LinkWithDefault>
          )}
          {leadsLink}
        </NavGroup>
      )}
      {groups.map(({ entities, label }, key) => {
        const visibleGroupEntities = entities.filter(({ slug }) => slug !== 'leads')

        if (!visibleGroupEntities.length) {
          return null
        }

        return (
          <NavGroup isOpen={navPreferences?.groups?.[label]?.open} key={key} label={label}>
            {visibleGroupEntities.map(({ slug, type, label }, i) => {
              let href: string
              let id: string

              if (type === EntityType.collection) {
                href = formatAdminURL({ adminRoute, path: `/collections/${slug}` })
                id = `nav-${slug}`
              } else {
                href = formatAdminURL({ adminRoute, path: `/globals/${slug}` })
                id = `nav-global-${slug}`
              }

              const Link = LinkWithDefault

              const LinkElement = Link || 'a'
              const activeCollection =
                pathname.startsWith(href) && ['/', undefined].includes(pathname[href.length])

              const Icon = getNavIcon(slug)

              return (
                <LinkElement
                  className={[`${baseClass}__link`, activeCollection && `active`]
                    .filter(Boolean)
                    .join(' ')}
                  href={href}
                  id={id}
                  key={i}
                  prefetch={false}
                >
                  {activeCollection && <div className={`${baseClass}__link-indicator`} />}
                  {Icon && <Icon className={`${baseClass}__icon`} />}
                  <span className={`${baseClass}__link-label`}>{getTranslation(label, i18n)}</span>
                </LinkElement>
              )
            })}
          </NavGroup>
        )
      })}
    </Fragment>
  )
}
