'use client'

import { useEffect } from 'react'

import { track } from '@/lib/analytics'

/** Fires a gown_view event once per gown-page visit. */
export function TrackView({ gownName }: { gownName: string }) {
  useEffect(() => {
    track('gown_view', { gown: gownName })
  }, [gownName])
  return null
}
