import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { canCreateUser, canManageRBAC, moduleAccess, moduleOptions } from '../../access/rbac'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: canCreateUser,
    delete: canManageRBAC,
    read: moduleAccess('users', 'read'),
    update: canManageRBAC,
  },
  admin: {
    group: 'System',
    defaultColumns: ['name', 'email', 'superAdmin'],
    useAsTitle: 'email',
    components: {
      beforeList: ['@/components/GenericListHeader#GenericListHeader'],
    },
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'superAdmin',
      type: 'checkbox',
      defaultValue: false,
      saveToJWT: true,
      admin: {
        description: 'Super admins can access every module and manage user permissions.',
        position: 'sidebar',
      },
      access: {
        create: canManageRBAC,
        read: canManageRBAC,
        update: canManageRBAC,
      },
    },
    {
      name: 'modulePermissions',
      type: 'array',
      saveToJWT: true,
      admin: {
        description: 'Module-level permissions for Payload admin users.',
      },
      access: {
        create: canManageRBAC,
        read: canManageRBAC,
        update: canManageRBAC,
      },
      fields: [
        {
          name: 'module',
          type: 'select',
          hasMany: true,
          required: true,
          options: moduleOptions,
        },
        {
          name: 'read',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'create',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'update',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'delete',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
  timestamps: true,
}
