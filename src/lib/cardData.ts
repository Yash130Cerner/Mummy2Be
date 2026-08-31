import type { Gown } from '@/payload-types'

import type { AvailabilityStatus } from '@/lib/constants'
import { asMedia } from '@/lib/data'
import { mediaAlt, mediaDimensions, mediaUrl } from '@/lib/media'

/**
 * Lean, serializable gown shape passed to client components (collection
 * explorer, quiz, saved page) - everything a card needs and nothing more.
 */
export type CardImage = { url: string; alt: string; width: number; height: number }

export type CardGown = {
  slug: string
  name: string
  shortDescription: string
  price5: number
  price10: number
  availabilityStatus: AvailabilityStatus
  categories: string[]
  cultureEdit: string
  styleTags: string[]
  colorFamily: string
  colorPrimary: string
  featured: boolean
  displayOrder: number
  image: CardImage | null
  hoverImage: CardImage | null
}

function toCardImage(value: Gown['primaryImage'], fallbackAlt: string): CardImage | null {
  const media = asMedia(value)
  const url = mediaUrl(media, 'card')
  if (!url) return null
  const dims = mediaDimensions(media, 'card') ?? { width: 640, height: 853 }
  return { url, alt: mediaAlt(media, fallbackAlt), ...dims }
}

export function toCardGown(gown: Gown): CardGown {
  const fallbackAlt = `${gown.colorPrimary} maternity gown - ${gown.name}`
  const primary = toCardImage(gown.primaryImage, fallbackAlt)
  const firstGallery = gown.images?.[0]?.image
  const hover = firstGallery ? toCardImage(firstGallery, fallbackAlt) : null

  return {
    slug: gown.slug,
    name: gown.name,
    shortDescription: gown.shortDescription,
    price5: gown.rentalPrice5Day,
    price10: gown.rentalPrice10Day,
    availabilityStatus: gown.availabilityStatus as AvailabilityStatus,
    categories: (gown.categories ?? []) as string[],
    cultureEdit: gown.cultureEdit,
    styleTags: (gown.styleTags ?? []) as string[],
    colorFamily: gown.colorFamily,
    colorPrimary: gown.colorPrimary,
    featured: Boolean(gown.featured),
    displayOrder: gown.displayOrder ?? 99,
    image: primary,
    hoverImage: hover && hover.url !== primary?.url ? hover : null,
  }
}
