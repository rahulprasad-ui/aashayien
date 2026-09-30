'use client'

import { createClientFeature, toolbarAddDropdownGroupWithItems } from '@payloadcms/richtext-lexical/client'
import { $isNodeSelection } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'
import {
  INSERT_YOUTUBE_EMBED,
  $createYouTubeNode,
  $isYouTubeNode,
  YouTubeNode,
  createPlugin,
} from './shared'

const YoutubeIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <title>YouTube</title>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const groups = toolbarAddDropdownGroupWithItems([
  {
    ChildComponent: YoutubeIcon,
    isActive: ({ selection }) => {
      if (!$isNodeSelection(selection) || !selection.getNodes().length) {
        return false
      }
      const firstNode = selection.getNodes()[0]
      return $isYouTubeNode(firstNode)
    },
    key: 'youtube',
    label: 'Youtube',
    onSelect: ({ editor }) => {
      editor.dispatchCommand(INSERT_YOUTUBE_EMBED, { replace: false })
    },
  },
])

const YoutubeFeatureClient = createClientFeature(() => {
  return {
    plugins: [
      {
        Component: createPlugin({
          featureKey: 'youtube',
          command: INSERT_YOUTUBE_EMBED,
          createNode: $createYouTubeNode,
        }),
        position: 'normal',
      },
    ],
    nodes: [YouTubeNode],
    toolbarFixed: {
      groups: [groups],
    },
    toolbarInline: {
      groups: [groups],
    },
  }
})

export default YoutubeFeatureClient
