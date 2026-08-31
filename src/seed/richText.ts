/**
 * Tiny builders for Lexical rich-text JSON so seeded content (gown
 * descriptions, the founder story, terms, articles) is real editor state the
 * owner can edit in the admin afterwards.
 */

type InlineNode = Record<string, unknown>
type BlockNode = Record<string, unknown>

export const t = (text: string): InlineNode => ({
  type: 'text',
  version: 1,
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
})

export const b = (text: string): InlineNode => ({
  ...t(text),
  format: 1, // bold
})

export const i = (text: string): InlineNode => ({
  ...t(text),
  format: 2, // italic
})

export const link = (text: string, url: string): InlineNode => ({
  type: 'link',
  version: 3,
  direction: 'ltr',
  format: '',
  indent: 0,
  fields: {
    linkType: 'custom',
    newTab: false,
    url,
  },
  children: [t(text)],
})

export const p = (...children: (InlineNode | string)[]): BlockNode => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  textStyle: '',
  children: children.map((c) => (typeof c === 'string' ? t(c) : c)),
})

const heading = (tag: 'h2' | 'h3', children: (InlineNode | string)[]): BlockNode => ({
  type: 'heading',
  tag,
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: children.map((c) => (typeof c === 'string' ? t(c) : c)),
})

export const h2 = (...children: (InlineNode | string)[]) => heading('h2', children)
export const h3 = (...children: (InlineNode | string)[]) => heading('h3', children)

export const ul = (...items: (InlineNode | string)[][]): BlockNode => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: items.map((item, index) => ({
    type: 'listitem',
    version: 1,
    value: index + 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: item.map((c) => (typeof c === 'string' ? t(c) : c)),
  })),
})

/** Wraps block nodes into a full Lexical editor state. */
export const doc = (...blocks: BlockNode[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: blocks,
  },
})

export type RichTextDoc = ReturnType<typeof doc>
