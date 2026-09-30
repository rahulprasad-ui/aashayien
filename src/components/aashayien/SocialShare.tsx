'use client'

import React from 'react'
import { Facebook, Twitter, MessageCircle } from 'lucide-react'

interface SocialShareProps {
  url: string
  title: string
}

export function SocialShare({ url, title }: SocialShareProps) {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <button
        onClick={() => handleShare('facebook')}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
      >
        <Twitter className="w-4 h-4" />
        Twitter
      </button>
      <button
        onClick={() => handleShare('whatsapp')}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </button>
    </div>
  )
}
