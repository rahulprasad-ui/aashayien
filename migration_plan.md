# Migration Plan: React App to Next.js (Payload CMS)

## Objective

Migrate the existing React.js application from the `react-app` folder into the Next.js frontend of the Payload CMS project. The initial focus is on a **100% design-accurate, static migration** of the homepage.

## Phase 1: Analysis & Preparation

- [x] Review `react-app/src/pages/HomePage.tsx` and its dependencies.
- [x] Audit `react-app/package.json` for missing dependencies in the root project.
- [x] Compare CSS/Tailwind configurations.

## Phase 2: Design System & Global Styles

- [x] Port custom Tailwind colors and styles from `react-app/src/index.css` to `src/app/(frontend)/globals.css`.
- [x] Set up typography and branding in `globals.css`.

## Phase 3: Component Migration (Homepage)

The following components have been migrated from `react-app/src/components` to `src/components/aashayien`:

- [x] `StaticNavbar`
- [x] `Hero`
- [x] `Courses`
- [x] `SuccessStories`
- [x] `FreeResources`
- [x] `Community`
- [x] `LatestEvents`
- [x] `WhyChooseUs`
- [x] `Notifications`
- [x] `BlogJudgments`
- [x] `FAQ`
- [x] `Footer`

## Phase 4: Homepage Implementation

- [x] Update `src/app/(frontend)/page.tsx` to use the migrated components.
- [x] Ensure all assets (images, icons) are correctly linked.

## Phase 5: Next Steps

- [x] Migrate other pages (About Us).
- [ ] Migrate other pages (Blogs, Books, etc.).
- [ ] Integrate with Payload CMS blocks (to be done later).

---

_Status: Homepage Migration Complete (Static)_
