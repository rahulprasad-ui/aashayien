import type { Header } from '@/payload-types'

export const headerSeederData: any = {
  navigation: {
    navItems: [
      {
        blockType: 'link',
        link: {
          type: 'custom',
          url: '/',
          label: 'Home',
        },
      },
      {
        blockType: 'dropdown',
        title: 'About',
        items: [
          {
            link: {
              type: 'custom',
              url: '/about-us?section=institute',
              label: 'Institute',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/about-us?section=director',
              label: 'Director (Nitesh Sir)',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/about-us?section=mission',
              label: "Director's Mission",
            },
          },
        ],
      },
      {
        blockType: 'mega-menu',
        title: 'Courses & Success',
        columns: [
          {
            title: 'Courses',
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/courses?filter=live',
                  label: 'Live Courses',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/courses?filter=recorded',
                  label: 'Recorded Courses',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/courses?filter=test-series',
                  label: 'Test Series',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/courses?filter=other',
                  label: 'Other Courses',
                },
              },
            ],
          },
          {
            title: 'Success Stories',
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/success-stories#judiciary',
                  label: 'Judiciary Exam',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/success-stories#adpo',
                  label: 'ADPO Exams',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/success-stories#mains',
                  label: 'Mains Judgment Writing',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/success-stories#test-series',
                  label: 'Test Series Results',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/success-stories#interview',
                  label: 'Interview Success',
                },
              },
            ],
          },
        ],
      },
      {
        blockType: 'mega-menu',
        title: 'Resources & Info',
        columns: [
          {
            title: 'Free Resources',
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/free-study-online',
                  label: 'Free Study Online',
                },
              },

              {
                link: {
                  type: 'custom',
                  url: '/notes-guides',
                  label: 'Notes & Guides',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/previous-year-questions',
                  label: 'Previous Year Questions',
                },
              },
            ],
          },
          {
            title: 'Syllabus & Info',
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/books',
                  label: 'Books',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/syllabus-vacancy',
                  label: 'Syllabus & Vacancy',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/syllabus-vacancy',
                  label: 'Judiciary Syllabus',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/syllabus-vacancy',
                  label: 'ADPO Syllabus',
                },
              },
              {
                link: {
                  type: 'custom',
                  url: '/blog',
                  label: 'Blog & Judgments',
                },
              },
            ],
          },
        ],
      },
      {
        blockType: 'dropdown',
        title: 'Events',
        items: [
          {
            link: {
              type: 'custom',
              url: '/events',
              label: 'All Events',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/events?filter=webinar',
              label: 'Webinars',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/events?filter=seminar',
              label: 'Offline Events',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/events?filter=scholarship',
              label: 'Free Scholarship Test',
            },
          },
        ],
      },
      {
        blockType: 'link',
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Contact',
        },
      },
    ],
  },
  actions: {
    actions: [
      {
        link: {
          type: 'custom',
          url: '/courses',
          label: 'Enroll Now',
        },
        style: 'primary',
      },
    ],
  },
}
