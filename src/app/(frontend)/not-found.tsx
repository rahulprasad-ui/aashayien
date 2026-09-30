import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-12">
      <div className="bg-brand-primary/10 p-6 rounded-full mb-6">
        <FileQuestion className="w-16 h-16 text-brand-primary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Page Not Found</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-[500px]">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button
          asChild
          className="bg-brand-primary hover:bg-brand-primary-hover text-white"
          size="lg"
        >
          <Link href="/">Go Back Home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
