import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    columnWidth?: number | string
  }
> = ({ name, defaultValue, errors, label, register, required, width, columnWidth }) => {
  const props = register(name, { required: required ? 'This field is required' : false })
  const { setValue } = useFormContext()

  return (
    <Width width={width} columnWidth={columnWidth}>
      <div className="flex items-center gap-2 py-3">
        <CheckboxUi
          defaultChecked={defaultValue}
          id={name}
          {...props}
          onCheckedChange={(checked) => {
            setValue(props.name, checked)
          }}
          className="border-slate-300 data-[state=checked]:bg-[#ED1F24] data-[state=checked]:border-[#ED1F24] focus-visible:ring-[#ED1F24]"
        />
        <Label htmlFor={name} className="text-sm font-medium text-slate-900 dark:text-neutral-100">
          {label}
          {required && (
            <span className="required ml-1 text-red-500">
              * <span className="sr-only">(required)</span>
            </span>
          )}
        </Label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
