'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  name: string
  label?: string
  width?: number
  register: UseFormRegister<any>
  required?: boolean
  control: Control<any>
  errors: FieldErrors<any>
  formState?: any
  blockType: 'captcha'
  captchaType?: 'google'
}

export const Captcha: React.FC<Props & { setValue: any }> = ({
  name,
  label,
  control,
  errors,
  required,
  formState,
  setValue,
  captchaType = 'google',
}) => {
  const { isSubmitSuccessful, submitCount } = formState || {}
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  // Fallback for name if it's undefined (e.g. from custom block without name field)
  const fieldName = name || 'captcha'

  useEffect(() => {
    // Refresh challenge when submission count changes (attempted submit) OR successful submit
    if (submitCount > 0 && captchaType === 'google') {
      recaptchaRef.current?.reset()
    }
  }, [submitCount, isSubmitSuccessful, captchaType])

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  return (
    <div className=" col-span-full md:col-span-12">
      <Label htmlFor={fieldName} className="mb-2 block font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <div className="min-h-[78px]">
        {siteKey ? (
          <Controller
            name={fieldName}
            control={control}
            rules={{ required: required ? 'Please complete the reCAPTCHA' : false }}
            render={({ field: { onChange } }) => (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                onChange={(token) => {
                  onChange(token ? { value: token, type: 'google' } : null)
                }}
              />
            )}
          />
        ) : (
          <div className="p-4 border border-yellow-200 bg-yellow-50 text-yellow-800 rounded-md">
            reCAPTCHA Site Key is missing. Please check your environment variables.
          </div>
        )}
      </div>

      {errors[fieldName] && (
        <p className="text-red-500 text-sm mt-1 w-full flex-1">
          {errors[fieldName]?.message as string}
        </p>
      )}
    </div>
  )
}
