import type { TextFieldSingleValidation } from 'payload'
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  type LinkFields,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  TextStateFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import {
  BgColorFeature,
  HighlightColorFeature,
  TextColorFeature,
} from 'payloadcms-lexical-ext'
import { YoutubeFeature } from '@/fields/lexical-features/YoutubeVimeo/server'

export const defaultLexical = lexicalEditor({
  features: [
    // --- Structure ---
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    IndentFeature(),

    // --- Text Formatting ---
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),

    // --- Text Color & Highlight ---
    TextColorFeature(),
    BgColorFeature(),
    HighlightColorFeature(),

    // --- Lists ---
    OrderedListFeature(),
    UnorderedListFeature(),
    ChecklistFeature(),

    // --- Layout ---
    AlignFeature(),

    // --- Media & Relations ---
    UploadFeature({
      collections: {
        media: {
          fields: [],
        },
      },
    }),
    RelationshipFeature(),

    // --- Video Embeds ---
    YoutubeFeature(),

    // --- Table (Experimental) ---
    EXPERIMENTAL_TableFeature(),

    // --- Text State ---
    TextStateFeature(),

    // --- Toolbars ---
    FixedToolbarFeature(),
    InlineToolbarFeature(),

    // --- Links ---
    LinkFeature({
      enabledCollections: [
        'pages',
        'posts',
        'dynamic-pages',
        'courses',
        'events',
        'books',
        'notes',
        'resources',
      ],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})
