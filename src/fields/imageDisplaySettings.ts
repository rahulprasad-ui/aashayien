import type { GroupField, UploadField } from 'payload'

import { imageDisplayPresetOptions } from '@/utilities/imageDisplay'

export const imageDisplayFieldName = (fieldName: string) => `${fieldName}Display`

export const imageDisplaySettingsField = ({
  defaultFit = 'cover',
  defaultPreset = 'original',
  label = 'Display Settings',
  name,
}: {
  defaultFit?: 'cover' | 'contain'
  defaultPreset?: (typeof imageDisplayPresetOptions)[number]['value']
  label?: string
  name: string
}): GroupField => ({
  name,
  type: 'group',
  label,
  admin: {
    description: 'Controls how this image renders in this specific section only.',
  },
  fields: [
    {
      name: 'preset',
      type: 'select',
      label: 'Size Preset',
      defaultValue: defaultPreset,
      options: imageDisplayPresetOptions.map(({ label: optionLabel, value }) => ({
        label: optionLabel,
        value,
      })),
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.preset === 'custom',
      },
      fields: [
        {
          name: 'customWidth',
          type: 'number',
          label: 'Custom Width',
          min: 1,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'customHeight',
          type: 'number',
          label: 'Custom Height',
          min: 1,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'fit',
      type: 'select',
      label: 'Fit Mode',
      defaultValue: defaultFit,
      options: [
        {
          label: 'Cover',
          value: 'cover',
        },
        {
          label: 'Contain',
          value: 'contain',
        },
      ],
    },
  ],
})

export const imageUploadWithDisplay = (
  uploadField: UploadField,
  options?: {
    defaultFit?: 'cover' | 'contain'
    defaultPreset?: (typeof imageDisplayPresetOptions)[number]['value']
    displayLabel?: string
    displayName?: string
  },
) => {
  return [
    uploadField,
    imageDisplaySettingsField({
      defaultFit: options?.defaultFit,
      defaultPreset: options?.defaultPreset,
      label: options?.displayLabel,
      name: options?.displayName || imageDisplayFieldName(uploadField.name),
    }),
  ]
}
