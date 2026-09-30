import React, { Fragment } from 'react'

import type { Page, DynamicPage } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { ClatPgBlock } from '@/blocks/ClatPgBlock/Component'
import { SectionBlockComponent } from '@/blocks/SectionBlock/Component'
import { PostsBlockComponent } from '@/blocks/PostsBlock/Component'
import { EventsBlockComponent } from '@/blocks/EventsBlock/Component'
import { NotificationsBlockComponent } from '@/blocks/NotificationsBlock/Component'
import { CoursesBlockComponent } from '@/blocks/CoursesBlock/Component'
import { SuccessStoriesBlockComponent } from '@/blocks/SuccessStoriesBlock/Component'
import { SliderBlockComponent } from '@/blocks/SliderBlock/Component'
import { CustomBlockComponent } from '@/blocks/CustomBlock/Component'

const blockComponents = {
  sectionBlock: SectionBlockComponent,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  faq: FAQBlock,
  clatPgBlock: ClatPgBlock,
  // New blocks
  postsBlock: PostsBlockComponent,
  eventsBlock: EventsBlockComponent,
  notificationsBlock: NotificationsBlockComponent,
  coursesBlock: CoursesBlockComponent,
  successStoriesBlock: SuccessStoriesBlockComponent,
  sliderBlock: SliderBlockComponent,
  customBlock: CustomBlockComponent,
}

// Blocks that manage their own full-width layout (no container wrapper)
const fullWidthBlocks = new Set(['sectionBlock', 'clatPgBlock', 'sliderBlock', 'notificationsBlock'])

export const RenderBlocks: React.FC<{
  blocks: (Page['layout'][0] | DynamicPage['layout'][0])[] | null | undefined
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              const isFullWidth = fullWidthBlocks.has(blockType)
              return (
                <div
                  className={isFullWidth ? 'my-8 w-full' : 'my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'}
                  key={index}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
