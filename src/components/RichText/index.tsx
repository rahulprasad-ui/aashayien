import { MediaBlock } from '@/blocks/MediaBlock/Component'
import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  FAQBlock as FAQBlockProps,
  MediaBlock as MediaBlockProps,
  CTAButtonBlock as CTAButtonBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { CTAButtonComponent } from '@/blocks/CTAButton/Component'
import { cn } from '@/utilities/ui'
import { extractYoutubeId, extractVimeoId } from '@/utilities/getMediaUrl'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      BannerBlockProps | CodeBlockProps | CTABlockProps | FAQBlockProps | MediaBlockProps | CTAButtonBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

// function to parse style string
const parseStyle = (styleString: string) => {
  if (!styleString) return {}
  return styleString.split(';').reduce(
    (acc, style) => {
      const [key, value] = style.split(':')
      if (key && value) {
        const formattedKey = key.trim().replace(/-./g, (x) => x[1].toUpperCase())
        acc[formattedKey] = value.trim()
      }
      return acc
    },
    {} as Record<string, string>,
  )
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  'custom-paragraph': ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children })
    const style = parseStyle(node.style)

    return children?.length ? (
      <p style={style}>{children}</p>
    ) : (
      <p style={style}>
        <br />
      </p>
    )
  },
  'custom-heading': ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children })
    const tag = typeof node.tag === 'string' ? node.tag.toLowerCase() : 'h2'
    const HeadingTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) ? tag : 'h2'

    return <HeadingTag style={parseStyle(node.style)}>{children}</HeadingTag>
  },
  text: ({ node, ...args }) => {
    const content =
      typeof defaultConverters.text === 'function'
        ? defaultConverters.text({ node, ...args })
        : node.text
    if (node.style) {
      return <span style={parseStyle(node.style)}>{content}</span>
    }
    return content
  },
  // Youtube embed node
  youtube: ({ node }: { node: any }) => {
    const videoId = extractYoutubeId(node.videoID || node.fields?.videoID || node.id || '')
    const width = node.width || '100%'
    return (
      <div className="relative aspect-video my-6 mx-auto" style={{ width }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId || ''}`}
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  },
  // Vimeo embed node
  vimeo: ({ node }: { node: any }) => {
    const videoId = extractVimeoId(node.videoID || node.fields?.videoID || node.id || '')
    return (
      <div className="relative aspect-video my-6">
        <iframe
          src={`https://player.vimeo.com/video/${videoId || ''}`}
          className="w-full h-full rounded-lg"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  },
  // Lexical table node
  table: ({ node, nodesToJSX }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-slate-300">
        <tbody>{nodesToJSX({ nodes: node.children })}</tbody>
      </table>
    </div>
  ),
  tablerow: ({ node, nodesToJSX }) => <tr>{nodesToJSX({ nodes: node.children })}</tr>,
  tablecell: ({ node, nodesToJSX }) => (
    <td className="border border-slate-300 px-3 py-2 text-sm">
      {nodesToJSX({ nodes: node.children })}
    </td>
  ),
  tableheadercell: ({ node, nodesToJSX }) => (
    <th className="border border-slate-300 px-3 py-2 text-sm font-bold bg-slate-50 text-left">
      {nodesToJSX({ nodes: node.children })}
    </th>
  ),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    faq: ({ node }) => <FAQBlock className="col-start-2" {...node.fields} />,
    ctaButton: ({ node }) => <CTAButtonComponent {...node.fields} openInNewTab={node.fields.openInNewTab ?? undefined} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          'container mx-auto': enableGutter,
          'w-full max-w-none': !enableGutter,
          'prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
