'use client'

import { useCallback, useSyncExternalStore } from 'react'

import { track } from '@/lib/analytics'

/**
 * Saved gowns (“wishlist”) - an array of gown slugs in localStorage.
 * No account, no login, no server record. It can send a multi-gown inquiry
 * from /saved. Never a cart.
 */

const KEY = 'mummy2be:saved'
const CHANGE_EVENT = 'mummy2be:saved-change'

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : []
  } catch {
    return []
  }
}

function write(slugs: string[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(slugs))
  } catch {
    // Storage unavailable (private mode etc.) - the heart simply won't persist.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

let cache: string[] = []
let cacheKey = ''

function getSnapshot(): string[] {
  const current = read()
  const key = current.join('|')
  if (key !== cacheKey) {
    cache = current
    cacheKey = key
  }
  return cache
}

const emptySnapshot: string[] = []
const getServerSnapshot = () => emptySnapshot

function subscribe(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

export function useWishlist() {
  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback((slug: string, gownName?: string) => {
    const current = read()
    if (current.includes(slug)) {
      write(current.filter((s) => s !== slug))
    } else {
      write([...current, slug])
      track('wishlist_add', { gown: gownName ?? slug })
    }
  }, [])

  const remove = useCallback((slug: string) => {
    write(read().filter((s) => s !== slug))
  }, [])

  return { saved, toggle, remove, has: (slug: string) => saved.includes(slug) }
}
