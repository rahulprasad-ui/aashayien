export const isNoindexDoc = (doc: { meta?: { indexDirective?: string | null } | null }) => {
  return doc.meta?.indexDirective === 'noindex'
}
