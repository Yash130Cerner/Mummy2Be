import { notFound } from 'next/navigation'

/**
 * Catch-all for unmatched URLs - funnels every stray path into the branded
 * 404 page (required because this app uses multiple root layouts).
 */
export default function CatchAllNotFound() {
  notFound()
}
