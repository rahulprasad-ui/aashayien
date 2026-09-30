import type { Block } from 'payload'

export const CTAButton: Block = {
  slug: 'ctaButton',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      label: 'Button Text',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Button URL',
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
      label: 'Open in new tab',
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary (Red)', value: 'primary' },
        { label: 'Secondary (Amber)', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
        { label: 'White', value: 'white' },
      ],
      label: 'Button Theme',
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      label: 'Button Alignment',
    },
  ],
  interfaceName: 'CTAButtonBlock',
}
