'use client'

import React from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { FormBlock } from '@/blocks/Form/Component'
import type { Popup, Media, Form as FormType } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface ResourceGateModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  popup: Popup
}

// Duplicate block removed

export const ResourceGateModal: React.FC<ResourceGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  popup,
}) => {
  if (!isOpen) return null

  const image = popup.image as Media | undefined
  const form = popup.form as FormType | undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col',
          popup.size === 'lg' ? 'max-w-5xl' : 'max-w-3xl',
          'max-h-[90vh]',
          // Responsive layout based on image position
          popup.imagePosition === 'left' && 'md:flex-row',
          popup.imagePosition === 'right' && 'md:flex-row-reverse',
          popup.imagePosition === 'top' && 'flex-col',
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-400 hover:text-slate-600 hover:bg-white shadow-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        {image?.url && (
          <div
            className={cn(
              'relative overflow-hidden shrink-0',
              (popup.imagePosition === 'left' || popup.imagePosition === 'right') &&
                'w-full md:w-[45%] h-48 md:h-auto',
              popup.imagePosition === 'top' && 'w-full h-48 md:h-64',
            )}
          >
            <Image src={image.url} alt={popup.title || 'Resource'} fill className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>
        )}

        {/* Content Section */}
        <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="text-center md:text-left mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {popup.title || 'Download Resource'}
            </h3>
            {popup.description && (
              <p className="text-slate-600 text-sm leading-relaxed">
                {popup.description as string}
              </p>
            )}
          </div>

          {form && (
            <div className="mt-auto w-full">
              <FormBlock
                form={form as any}
                enableIntro={false}
                disableContainer
                className="p-0"
                submitButtonClassName="w-full bg-[#ED1F24] hover:bg-[#d11b20]"
                onSuccess={() => {
                  setTimeout(() => {
                    onSuccess()
                  }, 1000)
                }}
              />
            </div>
          )}

          <p className="text-xs text-slate-400 text-center mt-6">
            By submitting, you agree to receive updates about our courses.
          </p>
        </div>
      </div>
    </div>
  )
}
