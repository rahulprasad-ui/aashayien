import type { Access } from 'payload'

import { hasModulePermission, type ModulePermission } from './rbac'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
    publishedAt: {
      less_than_equal: new Date().toISOString(),
    },
  }
}

export const publishedOrModuleAccess =
  (module: ModulePermission): Access =>
  ({ req: { user } }) => {
    if (user) {
      return hasModulePermission(user, module, 'read')
    }

    return {
      _status: {
        equals: 'published',
      },
      publishedAt: {
        less_than_equal: new Date().toISOString(),
      },
    }
  }
