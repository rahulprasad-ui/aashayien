import type { StateField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'
import { stateOptions } from './options'

export const State: React.FC<
  StateField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
    columnWidth?: number | string
    placeholder?: string
  }
> = ({ name, control, errors, label, required, width, columnWidth, placeholder }) => {
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
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = stateOptions.find((t) => t.value === value)

          return (
            <Select onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
              <SelectTrigger
                className="w-full h-auto px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED1F24] focus:border-transparent focus-visible:ring-[#ED1F24] dark:bg-neutral-950 dark:border-neutral-700 dark:text-white"
                id={name}
              >
                <SelectValue placeholder={placeholder || label} />
              </SelectTrigger>
              <SelectContent>
                {stateOptions.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          )
        }}
        rules={{ required: required ? 'This field is required' : false }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
