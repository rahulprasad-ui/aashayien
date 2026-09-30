import type { Access } from 'payload'
import { sql } from 'drizzle-orm'

type PermissionAction = 'create' | 'read' | 'update' | 'delete'

export const moduleOptions = [
  { label: 'Users', value: 'users' },
  { label: 'Pages', value: 'pages' },
  { label: 'Posts / Blog', value: 'posts' },
  { label: 'Courses', value: 'courses' },
  { label: 'Books', value: 'books' },
  { label: 'Events', value: 'events' },
  { label: 'FAQs', value: 'faqs' },
  { label: 'Media', value: 'media' },
  { label: 'Categories', value: 'categories' },
  { label: 'Resources', value: 'resources' },
  { label: 'Resource Categories', value: 'resource-categories' },
  { label: 'Notes', value: 'notes' },
  { label: 'Previous Year Questions', value: 'previous-year-questions' },
  { label: 'Syllabus States', value: 'syllabus-states' },
  { label: 'Vacancies', value: 'vacancies' },
  { label: 'Success Stories', value: 'success-stories' },
  { label: 'Popups', value: 'popups' },
  { label: 'Forms', value: 'forms' },
  { label: 'Form Submissions', value: 'form-submissions' },
  { label: 'Enrollments', value: 'enrollments' },
  { label: 'Mentorship Bookings', value: 'mentorship-bookings' },
  { label: 'Webhook Logs', value: 'webhook-logs' },
  { label: 'Schema Templates', value: 'schema-templates' },
  { label: 'Redirects', value: 'redirects' },
  { label: 'Search Results', value: 'search' },
  { label: 'Header', value: 'header' },
  { label: 'Footer', value: 'footer' },
  { label: 'Branding', value: 'branding' },
  { label: 'Home', value: 'home' },
  { label: 'Course Page', value: 'course' },
  { label: 'Success Stories Page', value: 'success-stories-page' },
  { label: 'Free Study Page', value: 'free-study' },
  { label: 'Syllabus & Vacancy Page', value: 'syllabus-vacancy-global' },
  { label: 'Blog Page', value: 'blog' },
  { label: 'Events Page', value: 'events-page' },
  { label: 'Books Page', value: 'books-page' },
  { label: 'About Us Page', value: 'about-us' },
  { label: 'Contact Page', value: 'contact-page' },
  { label: 'Notes Page', value: 'notes-page' },
  { label: 'Previous Year Questions Page', value: 'previous-year-questions-page' },
] 

export type ModulePermission = string

type PermissionUser = {
  superAdmin?: boolean | null
  modulePermissions?:
    | {
        module?: ModulePermission | ModulePermission[] | null
        create?: boolean | null
        read?: boolean | null
        update?: boolean | null
        delete?: boolean | null
      }[]
    | null
}

export const isSuperAdmin = (user: unknown): boolean => {
  return Boolean((user as PermissionUser | null | undefined)?.superAdmin)
}

export const hasModulePermission = (
  user: unknown,
  module: ModulePermission,
  action: PermissionAction,
): boolean => {
  const permissionUser = user as PermissionUser | null | undefined

  if (!permissionUser) return false
  if (isSuperAdmin(permissionUser)) return true

  return Boolean(
    permissionUser.modulePermissions?.some((permission) => {
      if (!permission?.[action]) return false

      return Array.isArray(permission.module)
        ? permission.module.includes(module)
        : permission.module === module
    }),
  )
}

export const moduleAccess =
  (module: ModulePermission, action: PermissionAction): Access =>
  ({ req: { user } }) =>
    hasModulePermission(user, module, action)

export const publicReadOrModuleAccess =
  (module: ModulePermission): Access =>
  ({ req: { user } }) => {
    if (!user) return true
    return hasModulePermission(user, module, 'read')
  }

export const publicCreateOrModuleAccess =
  (module: ModulePermission): Access =>
  ({ req: { user } }) => {
    if (!user) return true
    return hasModulePermission(user, module, 'create')
  }

export const canManageRBAC = ({ req: { user } }: any): boolean => isSuperAdmin(user)

export const canCreateUser = async ({ req }: any): Promise<boolean> => {
  if (isSuperAdmin(req.user)) return true

  const db = (req.payload.db as any).drizzle as any

  if (!db?.execute) return false

  const existingUsers = await db.execute(sql`SELECT "id" FROM "users" LIMIT 1`)
  const rows = Array.isArray(existingUsers)
    ? existingUsers
    : (existingUsers?.rows ?? existingUsers?.[0] ?? [])

  return rows.length === 0
}
