import type { Media } from '@/payload-types'

type SizeName = 'card' | 'gallery' | 'og'

/** URL for a media doc, preferring a generated size when it exists. */
export function mediaUrl(media: Media | null | undefined, size?: SizeName): string | null {
  if (!media) return null
  if (size) {
    const sized = media.sizes?.[size]
    if (sized?.url) return sized.url
  }
  return media.url ?? null
}

export function mediaAlt(media: Media | null | undefined, fallback: string): string {
  return media?.alt || fallback
}

export function mediaDimensions(
  media: Media | null | undefined,
  size?: SizeName,
): { width: number; height: number } | null {
  if (!media) return null
  if (size) {
    const sized = media.sizes?.[size]
    if (sized?.width && sized?.height) return { width: sized.width, height: sized.height }
  }
  if (media.width && media.height) return { width: media.width, height: media.height }
  return null
}

export const isVideo = (media: Media | null | undefined): boolean =>
  Boolean(media?.mimeType?.startsWith('video/'))
