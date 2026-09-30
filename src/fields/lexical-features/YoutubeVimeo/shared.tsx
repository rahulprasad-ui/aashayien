import React, { useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import {
  $getPreviousSelection,
  $getSelection,
  $isRangeSelection,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  BaseSelection,
  LexicalCommand,
  createCommand,
  LexicalNode,
  DOMExportOutput,
  DOMConversionMap,
  EditorConfig,
  LexicalEditor,
  $isNodeSelection,
  $createNodeSelection,
  $getNodeByKey,
} from '@payloadcms/richtext-lexical/lexical'
import { DecoratorBlockNode } from '@payloadcms/richtext-lexical/lexical/react/LexicalDecoratorBlockNode'
import type { SerializedDecoratorBlockNode } from '@payloadcms/richtext-lexical/lexical/react/LexicalDecoratorBlockNode'
import type { ElementFormatType, NodeKey } from '@payloadcms/richtext-lexical/lexical'
import { $insertNodeToNearestRoot } from '@payloadcms/richtext-lexical/lexical/utils'
import { FieldsDrawer, useEditorConfigContext } from '@payloadcms/richtext-lexical/client'
import { useModal } from '@payloadcms/ui'

// --- Commands ---
export const INSERT_YOUTUBE_EMBED: LexicalCommand<{ replace: boolean }> = createCommand('INSERT_YOUTUBE_EMBED')

// --- Types ---
export type SerializedEmbedNode = SerializedDecoratorBlockNode & {
  id: string
}

// --- EmbedNode base class ---
export class EmbedNode extends DecoratorBlockNode {
  __id: string

  static override getType(): string {
    return 'embed'
  }

  static override clone(node: EmbedNode): EmbedNode {
    return new (this as any)(node.__id, node.__format, node.__key)
  }

  static override importJSON(serializedNode: SerializedEmbedNode): EmbedNode {
    const node = new (this as any)(serializedNode.id)
    node.setFormat(serializedNode.format)
    return node
  }

  constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key)
    this.__id = id
  }

  getId(): string {
    return this.__id
  }

  override exportJSON(): SerializedEmbedNode {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      version: 1,
      id: this.__id,
    }
  }
}

// --- YouTube Component & Node ---
export function YoutubeComponent({
  id,
  className,
  nodeKey,
  editor,
  width,
  format,
}: {
  id: string
  className?: any
  nodeKey?: string
  editor?: any
  width?: string
  format?: ElementFormatType
}) {
  const [selected, setSelected] = useState(false)
  const baseClass = className?.base || ''

  useEffect(() => {
    if (!editor || !nodeKey) return
    return editor.registerUpdateListener(({ editorState }: any) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isNodeSelection(selection) && selection.has(nodeKey)) {
          setSelected(true)
        } else {
          setSelected(false)
        }
      })
    })
  }, [editor, nodeKey])

  const setWidth = (newWidth: string) => {
    if (!editor || !nodeKey) return
    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as YouTubeNode
      if (node) {
        node.setWidth(newWidth)
      }
    })
  }

  const setAlign = (newFormat: 'left' | 'center' | 'right') => {
    if (!editor || !nodeKey) return
    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as YouTubeNode
      if (node) {
        node.setFormat(newFormat)
      }
    })
  }

  let marginStyle = '0 auto' // Default is Center
  if (format === 'left') {
    marginStyle = '0 auto 0 0'
  } else if (format === 'right') {
    marginStyle = '0 0 0 auto'
  }

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: width || '100%',
    maxWidth: '100%',
    margin: marginStyle,
    aspectRatio: '16/9',
    outline: selected ? '2px solid var(--theme-color-primary, #0070f3)' : 'none',
    boxShadow: selected ? '0 0 10px rgba(0, 112, 243, 0.3)' : 'none',
    transition: 'outline 0.2s, box-shadow 0.2s',
  }

  return (
    <div
      className={baseClass}
      style={containerStyle}
      onClick={(e) => {
        if (editor && nodeKey) {
          e.preventDefault()
          e.stopPropagation()
          editor.update(() => {
            const selection = $createNodeSelection()
            selection.add(nodeKey)
            $setSelection(selection)
          })
        }
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${id}?modestbranding=1&rel=0&hl=es`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className?.focus || ''}
        title="Play video"
        style={{ width: '100%', height: '100%', display: 'block', border: 'none' }}
      />
      {selected && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.85)',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
          }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          {/* Width Controls */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {['25%', '50%', '75%', '100%'].map((w) => (
              <button
                key={w}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setWidth(w)
                }}
                style={{
                  background: width === w ? 'var(--theme-color-primary, #0070f3)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: width === w ? 'bold' : 'normal',
                }}
              >
                {w}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.3)' }} />

          {/* Alignment Controls */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['left', 'center', 'right'] as const).map((alignOption) => (
              <button
                key={alignOption}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setAlign(alignOption)
                }}
                style={{
                  background: (format || 'center') === alignOption ? 'var(--theme-color-primary, #0070f3)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  textTransform: 'capitalize',
                  fontWeight: (format || 'center') === alignOption ? 'bold' : 'normal',
                }}
              >
                {alignOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export class YouTubeNode extends EmbedNode {
  __width: string

  static override getType(): string {
    return 'youtube'
  }

  static override clone(node: YouTubeNode): YouTubeNode {
    return new YouTubeNode(node.__id, node.__width, node.__format, node.__key)
  }

  static override importJSON(serializedNode: SerializedEmbedNode & { width?: string }): YouTubeNode {
    const node = new YouTubeNode(serializedNode.id, serializedNode.width)
    node.setFormat(serializedNode.format)
    return node
  }

  constructor(id: string, width?: string, format?: ElementFormatType, key?: NodeKey) {
    super(id, format, key)
    this.__width = width || '100%'
  }

  getWidth(): string {
    return this.__width
  }

  setWidth(width: string): void {
    const writable = this.getWritable()
    writable.__width = width
  }

  override exportDOM(): DOMExportOutput {
    const element = document.createElement('iframe')
    element.style.aspectRatio = '16/9'
    element.setAttribute('data-lexical-youtube', this.__id)
    element.setAttribute('width', this.__width)
    element.setAttribute('src', `https://www.youtube-nocookie.com/embed/${this.__id}`)
    element.setAttribute('frameborder', '0')
    element.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    )
    element.setAttribute('allowfullscreen', 'true')
    return { element }
  }

  static override importDOM(): DOMConversionMap | null {
    return {
      iframe: (domNode: HTMLElement) => {
        const src = domNode.getAttribute('src') || domNode.getAttribute('data-src')
        const width = domNode.getAttribute('width') || '100%'
        const match = src?.match(/youtube(\-nocookie)?\.com\/embed\/([^?]+)/)
        if (match && match[2]) {
          return {
            conversion: () => ({ node: $createYouTubeNode(match[2], width) }),
            priority: 1,
          }
        }
        return null
      },
    }
  }

  override getTextContent(): string {
    return `https://www.youtube.com/watch?v=${this.__id}`
  }

  override decorate(_editor: LexicalEditor, config: EditorConfig): React.JSX.Element {
    let className
    if (config.theme.embedBlock != null) {
      className = {
        base: config.theme.embedBlock.base ?? '',
        focus: config.theme.embedBlock.focus ?? '',
      }
    }
    return (
      <YoutubeComponent
        id={this.__id}
        className={className}
        nodeKey={this.getKey()}
        editor={_editor}
        width={this.__width}
        format={this.__format}
      />
    )
  }

  override exportJSON(): SerializedEmbedNode & { width?: string } {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      version: 1,
      width: this.__width,
    }
  }
}

export function $createYouTubeNode(videoID: string, width?: string): YouTubeNode {
  return new YouTubeNode(videoID, width)
}

export function $isYouTubeNode(
  node: YouTubeNode | LexicalNode | null | undefined
): node is YouTubeNode {
  return node instanceof YouTubeNode
}



// --- Dynamic Create Plugin ---
type PluginProps = {
  command: LexicalCommand<unknown>
  featureKey: string
  createNode: (id: string) => LexicalNode
}

export const createPlugin = ({ featureKey, command, createNode }: PluginProps) => {
  const PluginComponent = (): React.JSX.Element => {
    const [editor] = useLexicalComposerContext()
    const [selectionState, setSelectionState] = useState<BaseSelection | null>(null)
    const { openModal } = useModal()
    const {
      fieldProps: { schemaPath },
    } = useEditorConfigContext()

    useEffect(() => {
      return editor.registerCommand(
        command,
        () => {
          editor.read(() => {
            const selection = $getSelection() ?? $getPreviousSelection()
            setSelectionState(selection)
          })

          openModal(featureKey + '-drawer')

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      )
    }, [editor, openModal])

    const onSubmit = (_: any, data: any) => {
      editor.update(() => {
        if (selectionState) { $setSelection(selectionState.clone()) }

        if ($isRangeSelection(selectionState)) {
          const focusNode = selectionState.focus.getNode()

          if (focusNode !== null) {
            let parsedId = data.embedId || data.id || ''

            // Extract the 11-character YouTube video ID if it's a URL or iframe code
            if (parsedId.includes('/') || parsedId.includes('iframe')) {
              const regex = /(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11})/
              const match = parsedId.match(regex)
              if (match && match[1]) {
                parsedId = match[1]
              }
            }

            const node = createNode(parsedId)
            $insertNodeToNearestRoot(node)
          }

          return true
        }

        return false
      })
    }

    return (
      <FieldsDrawer
        featureKey={featureKey}
        drawerSlug={featureKey + '-drawer'}
        handleDrawerSubmit={onSubmit}
        schemaPath={schemaPath}
        schemaPathSuffix={featureKey}
        data={{ id: '' }}
      />
    )
  }
  PluginComponent.displayName = `Plugin_${featureKey}`
  return PluginComponent
}
