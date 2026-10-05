'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState, useRef, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader } from '@/components/ui/loader'
import { AlertCircle } from 'lucide-react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  submitButtonClassName?: string
}

export const FormBlock: React.FC<
  {
    id?: string
    className?: string
    disableContainer?: boolean
    onSuccess?: (data: any) => void
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    submitButtonClassName,
    onSuccess,
    className,
    disableContainer,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields?.reduce((acc: any, field: any) => {
      acc[field.name] = field.defaultValue
      return acc
    }, {}),
    mode: 'onSubmit',
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const errorRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const scrollToAlert = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  useEffect(() => {
    if (error) {
      if (errorRef.current) {
        scrollToAlert(errorRef)
      }
      const timer = setTimeout(() => {
        setError(undefined)
      }, 30000)

      return () => clearTimeout(timer)
    }
  }, [error, scrollToAlert])

  useEffect(() => {
    if (hasSubmitted) {
      if (successRef.current) {
        scrollToAlert(successRef)
      }

      const timer = setTimeout(() => {
        setHasSubmitted(false)
      }, 30000)

      return () => clearTimeout(timer)
    }
  }, [hasSubmitted, scrollToAlert])

  const onSubmit = useCallback(
    (data: any) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data)
          .filter(([name]) => name !== 'undefined' && name) // Filter out "undefined" or falsy keys
          .map(([name, value]) => ({
            field: name,
            value: typeof value === 'string' ? value.trim() : value,
          }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (onSuccess) {
            onSuccess(dataToSend)
          }

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          } else if (confirmationType === 'message') {
            // Wait a bit to show success message, then optional reset?
            // Actually, usually forms stay submitted.
            // But if users want to clear and submit again, we should probably handle that.
            // For now, let's reset the form data so if they reload or re-enter, it's clean.
            reset() // Reset form fields
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, reset, onSuccess],
  )

  return (
    <div className={cn(disableContainer ? '' : 'container lg:max-w-2xl mx-auto', className)}>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div
        className={cn(
          disableContainer
            ? ''
            : 'bg-white dark:bg-neutral-900 rounded-3xl lg:rounded-4xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-neutral-800',
        )}
      >
        <FormProvider {...formMethods}>
          {error && (
            <div ref={errorRef} className="scroll-mt-20">
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Submission Error</AlertTitle>
                <AlertDescription>
                  {error.message || 'Something went wrong. Please check your inputs and try again.'}
                </AlertDescription>
              </Alert>
            </div>
          )}
          {hasSubmitted && confirmationType === 'message' && (
            <div ref={successRef} className="mt-4 mb-8 scroll-mt-20">
              <Alert variant="success" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  <RichText data={confirmationMessage} />
                </AlertDescription>
              </Alert>
            </div>
          )}
          {/* Form should always be visible */}
          <form id={formID} onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4 md:gap-6 mb-8">


              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields?.map((field, index) => {
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <Field
                        key={index}
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    )
                  }
                  return null
                })}
            </div>

            <Button
              form={formID}
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full bg-[#ED1F24] hover:bg-[#d11b20] text-white py-3.5 lg:py-4 rounded-xl font-bold text-base lg:text-lg shadow-lg shadow-[#ED1F24]/20 transition-all active:scale-[0.98] whitespace-normal h-auto min-h-[3rem] mt-2 flex items-center justify-center gap-2',
                submitButtonClassName,
              )}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="text-white animate-spin" />
                  Loading...
                </>
              ) : (
                submitButtonLabel
              )}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
