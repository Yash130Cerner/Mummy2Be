import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { toCardGown } from '@/lib/cardData'

/**
 * GET /api/wishlist?slugs=a,b,c - public card data for the saved-gowns page.
 * (The wishlist itself lives only in the visitor’s browser.)
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const slugs = (url.searchParams.get('slugs') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 30)

  if (slugs.length === 0) {
    return NextResponse.json({ gowns: [] })
  }

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'gowns',
    where: { and: [{ slug: { in: slugs } }, { published: { equals: true } }] },
    limit: 30,
    depth: 1,
  })

  // Preserve the visitor's save order; silently drop unpublished/deleted gowns.
  const bySlug = new Map(result.docs.map((g) => [g.slug, toCardGown(g)]))
  const gowns = slugs.map((slug) => bySlug.get(slug)).filter(Boolean)

  return NextResponse.json({ gowns })
}
