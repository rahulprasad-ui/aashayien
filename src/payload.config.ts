import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { DynamicPages } from './collections/DynamicPages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Courses } from './collections/Courses'
import { Faqs } from './collections/Faqs'
import { SuccessStories } from './collections/SuccessStories'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Branding } from './Branding/config'
import { Home } from './Home/config'
import { Course } from './Course/config'
import { SuccessStoriesPage } from './SuccessStoriesPage/config'
import { Resources } from './collections/Resources'
import { ResourceCategories } from './collections/ResourceCategories'
import { FreeStudy } from './globals/FreeStudy'
import { SyllabusStates } from './collections/SyllabusStates'
import { SyllabusVacancyGlobal } from './globals/SyllabusVacancy'
import { Blog } from './globals/Blog'
import { Events } from './collections/Events'
import { EventsPage } from './globals/EventsPage'
import { Books } from './collections/Books'
import { Popups } from './collections/Popups'
import { Vacancies } from './collections/Vacancies'
import { BooksPage } from './globals/BooksPage'
import { WebhookLogs } from './collections/WebhookLogs'
import { Enrollments } from './collections/Enrollments'
import { AboutUs } from './globals/AboutUs'
import { ContactPage } from './globals/ContactPage'
import { Notes } from './collections/Notes'
import { PreviousYearQuestions } from './collections/PreviousYearQuestions'
import { MentorshipBookings } from './collections/MentorshipBookings'
import { NotesPage } from './globals/NotesPage'
import { PreviousYearQuestionsPage } from './globals/PreviousYearQuestionsPage'
import { SchemaTemplates } from './collections/SchemaTemplates'
import { Leads } from './collections/Leads'
import { ClatPgGlobal } from './globals/ClatPgGlobal'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    suppressHydrationWarning: true,
    meta: {
      titleSuffix: '- Aashayein Judiciary',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/logo.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '@/components/Graphics#Logo',
        Icon: '@/components/Graphics#Icon',
      },

      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      beforeNavLinks: ['@/components/PasswordToggle'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: [
        '@/components/ManualRevalidate',
        '@/components/BeforeDashboard',
        '@/components/DashboardStats',
      ],
      Nav: '@/components/Nav#Nav',
      logout: {
        Button: '@/components/CustomLogoutButton#CustomLogoutButton',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      ssl: process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false },
    },
    push: process.env.PAYLOAD_PUSH !== 'false',
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Courses,
    Faqs,
    SuccessStories,
    Resources,
    ResourceCategories,
    SyllabusStates,
    Events,
    Books,
    Popups,
    Vacancies,
    WebhookLogs,
    Enrollments,
    Notes,
    PreviousYearQuestions,
    MentorshipBookings,
    SchemaTemplates,
    Leads,
    DynamicPages,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    Header,
    Footer,
    Branding,
    Home,
    Course,
    SuccessStoriesPage,
    FreeStudy,
    SyllabusVacancyGlobal,
    Blog,
    EventsPage,
    BooksPage,
    AboutUs,
    ContactPage,
    NotesPage,
    PreviousYearQuestionsPage,
    ClatPgGlobal,
  ],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'info@nrt.co.in',
    defaultFromName: 'Aashayein',
    transport: nodemailer.createTransport({
      name: 'silent-transport',
      version: '1.0.0',
      send: (mail: any, callback: any) => {
        callback(null, true)
      },
    }),
  }),
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  onInit: async (payload) => {
    try {
      const existingSuperAdmins = await payload.find({
        collection: 'users',
        where: {
          superAdmin: {
            equals: true,
          },
        },
        depth: 0,
        limit: 1,
        overrideAccess: true,
      })

      if (existingSuperAdmins.totalDocs > 0) return

      const existingUsers = await payload.find({
        collection: 'users',
        depth: 0,
        limit: 1000,
        overrideAccess: true,
      })

      if (existingUsers.totalDocs === 0) return

      await Promise.all(
        existingUsers.docs.map((user) =>
          payload.update({
            collection: 'users',
            id: user.id,
            data: {
              superAdmin: true,
            },
            overrideAccess: true,
          }),
        ),
      )

      payload.logger.info('RBAC bootstrap promoted existing users to super admin.')
    } catch (error) {
      payload.logger.warn({ err: error }, 'RBAC bootstrap could not verify super admins.')
    }
  },
})
