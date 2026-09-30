import type { FAQBlock as FAQBlockProps, Faq } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
  title?: string | null
  titleAlignment?: 'left' | 'center' | 'right' | null
  selectedFaqs?: (number | Faq)[] | null
} & Partial<FAQBlockProps>

interface FAQItem {
  id: string | number
  question: string
  answer: string
}

export const FAQBlock: React.FC<Props> = ({
  className,
  questions,
  selectedFaqs,
  title,
  titleAlignment = 'left',
}) => {
  const selectedFaqItems: FAQItem[] = []
  if (Array.isArray(selectedFaqs)) {
    for (const item of selectedFaqs) {
      if (typeof item === 'object' && item !== null) {
        const doc = 'value' in item ? (item.value as Faq) : (item as Faq)
        if (doc && typeof doc === 'object' && doc.question && doc.answer) {
          selectedFaqItems.push({
            id: doc.id,
            question: doc.question,
            answer: doc.answer,
          })
        }
      }
    }
  }

  const customFaqItems: FAQItem[] = []
  if (Array.isArray(questions)) {
    for (let index = 0; index < questions.length; index++) {
      const item = questions[index]
      if (item && item.question && item.answer) {
        customFaqItems.push({
          id: item.id || `custom-${index}`,
          question: item.question,
          answer: item.answer,
        })
      }
    }
  }

  const allQuestions = [...selectedFaqItems, ...customFaqItems]

  if (allQuestions.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQuestions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const textAlignClass =
    titleAlignment === 'center'
      ? 'text-center'
      : titleAlignment === 'right'
        ? 'text-right'
        : 'text-left'

  return (
    <div className={cn('mx-auto my-12 max-w-[48rem] w-full', className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {title && (
        <h3 className={cn('text-2xl font-bold mb-6 text-foreground', textAlignClass)}>
          {title}
        </h3>
      )}
      <div className="space-y-4">
        {allQuestions.map((item, index) => (
          <details
            key={item.id || index}
            className="group border border-border rounded-lg bg-card overflow-hidden transition-all duration-300"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-semibold text-lg hover:bg-muted/50 transition-colors">
              <span>{item.question}</span>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-muted-foreground leading-relaxed border-t border-border mt-2 pt-4">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
