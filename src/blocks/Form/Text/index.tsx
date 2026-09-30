import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { cn } from '@/utilities/ui'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
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
      <Input
        defaultValue={defaultValue}
        id={name}
        type={name === 'phone' || label?.toLowerCase().includes('phone') ? 'tel' : 'text'}
        placeholder={placeholder}
        {...register(name, {
          required: required ? 'This field is required' : false,
          validate: (value) => {
            if (required && typeof value === 'string' && !value.trim()) {
              return 'This field is required'
            }
            return true
          },
          pattern:
            name === 'phone' || label?.toLowerCase().includes('phone')
              ? {
                  value: /^\+?[\d\s]{10,15}$/,
                  message: 'Please enter a valid phone number',
                }
              : undefined,
        })}
        className={cn(
          'w-full h-auto px-4 py-3 border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1F24] focus-visible:border-transparent dark:bg-neutral-950 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-400',
          errors[name] && 'border-red-500 focus-visible:ring-red-500',
        )}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
