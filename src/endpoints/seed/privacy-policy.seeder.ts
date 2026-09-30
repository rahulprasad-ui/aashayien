import type { Payload, PayloadRequest } from 'payload'

export const seedPrivacyPolicy = async (payload: Payload, req: PayloadRequest) => {
  payload.logger.info('— Seeding Privacy Policy Page...')

  const existingPage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'privacy-policy',
      },
    },
    limit: 1,
    req,
  })

  // Delete if exists to force update (since we are debugging schema)
  if (existingPage.docs.length > 0) {
    payload.logger.info('— Privacy Policy page exists, deleting to re-seed...')
    await payload.delete({
      collection: 'pages',
      id: existingPage.docs[0].id,
      req,
    })
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      hero: {
        type: 'simple',
      },
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              enableLink: false,
              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'heading',
                      tag: 'h1',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: 'Privacy Policy',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: 'Last Updated: January 8, 2025',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'heading',
                      tag: 'h2',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: '1. Introduction',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: 'At Aashayein Judiciary, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: 'By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'heading',
                      tag: 'h2',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: '2. Information We Collect',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'heading',
                      tag: 'h3',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: '2.1 Personal Information',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: 'We may collect personal information that you voluntarily provide when you:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'list',
                      listType: 'bullet',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          type: 'listitem',
                          value: 1,
                          format: '',
                          indent: 0,
                          version: 1,
                          children: [
                            {
                              type: 'text',
                              text: 'Register for courses or create an account',
                              version: 1,
                            },
                          ],
                        },
                        {
                          type: 'listitem',
                          value: 2,
                          format: '',
                          indent: 0,
                          version: 1,
                          children: [
                            {
                              type: 'text',
                              text: 'Subscribe to our newsletters or communications',
                              version: 1,
                            },
                          ],
                        },
                      ],
                      direction: 'ltr',
                    },
                  ],
                  direction: 'ltr',
                } as any,
              },
            },
          ],
        },
      ],
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    req,
  })

  payload.logger.info('— Privacy Policy page seeded successfully.')
}
