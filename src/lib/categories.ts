import type { Gown } from '@/payload-types'

/**
 * The four curated collection views. Each is a filtered view of the one
 * catalogue with its own URL, H1, intro and metadata - never a separate
 * product set. “Western” maps to the `classic` curated edit and
 * “South Asian” to `south-asian-shoot` (Launch Content Pack §1).
 */
export type CategoryView = {
  slug: string
  h1: string
  navLabel: string
  seoTitle: string
  metaDescription: string
  intro: string
  match: (gown: Gown) => boolean
}

export const CATEGORY_VIEWS: CategoryView[] = [
  {
    slug: 'photoshoot',
    h1: 'Maternity photoshoot gowns',
    navLabel: 'Maternity Photoshoot',
    seoTitle: 'Maternity Photoshoot Gown Rental | Mummy2Be',
    metaDescription:
      'Rent a stunning maternity photoshoot gown - flowing, elegant, and dramatic styles that photograph beautifully. One size fits every bump. Delivered across Canada.',
    intro:
      'The moment deserves a gown that moves, drapes, and catches the light. These are our gowns for maternity photoshoots - flowing trains, dramatic tulle, and elegant silhouettes that photograph beautifully at every stage. See what’s available, then message us to reserve for your shoot date.',
    match: (g) => (g.categories ?? []).includes('photoshoot'),
  },
  {
    slug: 'baby-shower',
    h1: 'Baby shower gowns',
    navLabel: 'Baby Shower',
    seoTitle: 'Baby Shower Dress & Gown Rental | Mummy2Be',
    metaDescription:
      'Rent a beautiful baby shower gown for your celebration - comfortable, elegant, and made to flatter every bump. Reserve by message with a same-day reply.',
    intro:
      'Celebrate comfortably and beautifully. These gowns are made for baby showers - elegant, easy to wear for a few happy hours, and flattering on every bump. See what’s available, then message us to reserve for your celebration.',
    match: (g) => (g.categories ?? []).includes('baby-shower'),
  },
  {
    slug: 'western',
    h1: 'Western maternity gowns',
    navLabel: 'Western',
    seoTitle: 'Western Maternity Gowns for Rent | Mummy2Be',
    metaDescription:
      'Elegant Western maternity gowns for your photoshoot or special moment - flowing silhouettes and timeless styles, one size to fit every bump.',
    intro:
      'Timeless, elegant silhouettes for your photoshoot or special moment - soft pastels, clean neutrals, and classic drama. Each gown is one size and beautifully stretchable, so it flatters every stage of your bump. See what’s available, then message us to reserve.',
    match: (g) => g.cultureEdit === 'classic',
  },
  {
    slug: 'south-asian',
    h1: 'South Asian maternity gowns',
    navLabel: 'South Asian',
    seoTitle: 'South Asian Maternity Gown Rental in Canada | Mummy2Be',
    metaDescription:
      'Rent culturally beautiful South Asian maternity gowns for your photoshoot - rich colours and expressive styles, one size to fit every bump. Delivered across Canada.',
    intro:
      'Celebrate your pregnancy with a maternity gown made for the occasion. Our South Asian collection brings rich colour and expressive detail to your photoshoot - each gown one size and beautifully stretchable, so it flatters every stage of your bump. See what’s available, then message us to reserve.',
    match: (g) => g.cultureEdit === 'south-asian-shoot',
  },
]

export const getCategoryView = (slug: string): CategoryView | undefined =>
  CATEGORY_VIEWS.find((c) => c.slug === slug)

export const HUB_INTRO =
  'Every gown here is chosen to make you feel beautiful - and to photograph even better. Browse Western and South Asian styles for photoshoots and baby showers, see what’s available at a glance, then message us to reserve. One size, beautifully stretchable, made to flatter every bump.'
