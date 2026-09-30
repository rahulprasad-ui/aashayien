import type { Block } from 'payload'

export const SliderBlock: Block = {
  slug: 'sliderBlock',
  interfaceName: 'SliderBlock',
  labels: {
    singular: 'Image / Content Slider',
    plural: 'Image / Content Sliders',
  },
  imageURL: '/block-previews/slider.svg',
  admin: {
    images: {
      thumbnail: '/block-previews/slider.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading (Optional)',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Subheading / Badge (Optional)',
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Slide Image',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Slide Title',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Slide Caption / Description',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL (Optional)',
        },
        {
          name: 'linkLabel',
          type: 'text',
          label: 'Link Button Label',
          defaultValue: 'Learn More',
        },
      ],
    },
    {
      name: 'autoPlay',
      type: 'checkbox',
      label: 'Auto Play',
      defaultValue: true,
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      label: 'Auto Play Interval (seconds)',
      defaultValue: 4,
      min: 2,
      max: 10,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.autoPlay),
      },
    },
  ],
}
