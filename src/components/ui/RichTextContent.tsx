import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/** Long-form CMS content (About story, Terms, articles) in the site voice. */
export function RichTextContent({
  data,
  className = '',
}: {
  data: SerializedEditorState | null | undefined
  className?: string
}) {
  if (!data) return null
  return <RichText data={data} className={`prose-m2b ${className}`} />
}
