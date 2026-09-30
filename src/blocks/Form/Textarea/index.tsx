import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
    placeholder?: string
    columnWidth?: number | string
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  rows = 3,
  width,
  placeholder,
  columnWidth,
}) => {
  return (
    <Width width={width} columnWidth={columnWidth}>
      <Label
        htmlFor={name}
        className="block text-sm font-medium text-slate-900 mb-2 dark:text-neutral-100"
      >
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>

      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name, {
          required: required ? 'This field is required' : false,
          validate: (value) => {
            if (required && typeof value === 'string' && !value.trim()) {
              return 'This field is required'
            }
            return true
          },
        })}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#ED1F24] focus-visible:border-transparent resize-none dark:bg-neutral-950 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-400"
      />

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
