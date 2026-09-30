import {
  ArrowUpDown,
  FormInputIcon,
  Home as HomeIcon,
  Image,
  LayoutGrid,
  LayoutList,
  User,
  Book,
  GraduationCap,
  BookOpen,
  Popcorn,
  FileText,
  Map as MapIcon,
  Briefcase,
  Library,
  Calendar,
  HelpCircle,
  Webhook,
  PenTool,
  Info,
  CalendarDays,
  Contact,
  DownloadCloud,
  Trophy,
  UserCheck,
  Palette,
  Layers,
  Activity,
  FileQuestion,
  Folder,
  Tag,
  Menu,
  MoreHorizontal,
  Rss,
  ClipboardList,
  LucideProps,
} from 'lucide-react'
import { CollectionSlug, GlobalSlug } from 'payload'
import { ExoticComponent } from 'react'

export const navIconMap: Partial<
  Record<CollectionSlug | GlobalSlug, ExoticComponent<LucideProps>>
> = {
  // Academics
  courses: Book,
  'syllabus-states': MapIcon,
  'success-stories': Trophy,
  enrollments: UserCheck,
  'mentorship-bookings': CalendarDays,
  events: Calendar,
  course: Book,
  'success-stories-page': Trophy,
  'syllabus-vacancy-global': ClipboardList,

  // Study Resources
  notes: BookOpen,
  'previous-year-questions': FileQuestion,
  books: Library,
  resources: Folder,
  'resource-categories': Tag,
  'books-page': Library,
  'notes-page': BookOpen,
  'previous-year-questions-page': FileQuestion,

  // Content Management
  pages: LayoutGrid,
  posts: PenTool,
  categories: Layers,
  media: Image,
  faqs: HelpCircle,
  redirects: ArrowUpDown,
  forms: FormInputIcon,
  'form-submissions': LayoutList,

  // Marketing
  popups: Popcorn,
  vacancies: Briefcase,

  // Site Admin
  users: User,
  'webhook-logs': Activity,
  branding: Palette,
  header: Menu,
  footer: MoreHorizontal,

  // Page Configuration
  home: HomeIcon,
  'about-us': Info,
  'contact-page': Contact,
  blog: Rss,
  'events-page': CalendarDays,
  'free-study': GraduationCap,

  // Site Pages (Dynamic)
  'dynamic-pages': LayoutGrid,
}

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug) ? navIconMap[slug as CollectionSlug | GlobalSlug] : undefined
