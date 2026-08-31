import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/**
 * The site is small (a couple of dozen routes), so any content change simply
 * revalidates everything. This keeps availability badges and copy fresh within
 * seconds of an admin edit, with zero cache bookkeeping.
 *
 * Seed scripts pass `context.disableRevalidate` (they run outside Next).
 */
async function revalidateAll(): Promise<void> {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Running outside the Next.js runtime (e.g. `payload run` scripts) - skip.
  }
}

export const revalidateSite: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc
  await revalidateAll()
  return doc
}

export const revalidateSiteAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc
  await revalidateAll()
  return doc
}
