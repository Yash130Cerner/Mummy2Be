'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { GownCard } from '@/components/product/GownCard'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { CloseIcon } from '@/components/ui/icons'
import { track } from '@/lib/analytics'
import type { CardGown } from '@/lib/cardData'

/**
 * Client-side browse for the (small, 13-gown) catalogue: lean filters in a
 * bottom-sheet, applied-filter chips, live result count, sort - no pagination.
 * No size filter anywhere: every gown is one size.
 */

type Dimension = 'occasion' | 'edit' | 'style' | 'color' | 'price' | 'availability'

type FilterOption = { value: string; label: string }

const FILTER_GROUPS: { key: Dimension; label: string; options: FilterOption[] }[] = [
  {
    key: 'occasion',
    label: 'Occasion',
    options: [
      { value: 'photoshoot', label: 'Maternity photoshoot' },
      { value: 'baby-shower', label: 'Baby shower' },
    ],
  },
  {
    key: 'edit',
    label: 'Style edit',
    options: [
      { value: 'classic', label: 'Western / Classic' },
      { value: 'south-asian-shoot', label: 'For South-Asian shoots' },
    ],
  },
  {
    key: 'style',
    label: 'Look & mood',
    options: [
      { value: 'flowing', label: 'Flowing' },
      { value: 'fitted', label: 'Fitted' },
      { value: 'dramatic', label: 'Dramatic' },
      { value: 'minimal', label: 'Minimal' },
    ],
  },
  {
    key: 'color',
    label: 'Colour',
    options: [
      { value: 'neutral', label: 'Neutrals' },
      { value: 'pastel', label: 'Soft pastels' },
      { value: 'warm', label: 'Warm tones' },
      { value: 'jewel', label: 'Jewel tones' },
      { value: 'bold', label: 'Bold colour' },
    ],
  },
  {
    key: 'price',
    label: 'Rental price (5-day)',
    options: [
      { value: 'under-50', label: 'Under $50' },
      { value: '50-69', label: '$50 – $69' },
      { value: '70-plus', label: '$70 +' },
    ],
  },
  {
    key: 'availability',
    label: 'Availability',
    options: [{ value: 'available-now', label: 'Available now' }],
  },
]

const SORTS: FilterOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name A–Z' },
]

type Selected = Partial<Record<Dimension, string[]>>

function matches(gown: CardGown, selected: Selected): boolean {
  const inSet = (key: Dimension, test: (v: string) => boolean) => {
    const values = selected[key]
    if (!values || values.length === 0) return true
    return values.some(test)
  }
  return (
    inSet('occasion', (v) => gown.categories.includes(v)) &&
    inSet('edit', (v) => gown.cultureEdit === v) &&
    inSet('style', (v) => gown.styleTags.includes(v)) &&
    inSet('color', (v) => gown.colorFamily === v) &&
    inSet('price', (v) =>
      v === 'under-50' ? gown.price5 < 50 : v === '50-69' ? gown.price5 >= 50 && gown.price5 < 70 : gown.price5 >= 70,
    ) &&
    inSet('availability', () =>
      ['available', 'limited'].includes(gown.availabilityStatus),
    )
  )
}

function sortGowns(gowns: CardGown[], sort: string): CardGown[] {
  const sorted = [...gowns]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price5 - b.price5)
    case 'price-desc':
      return sorted.sort((a, b) => b.price5 - a.price5)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) || a.displayOrder - b.displayOrder,
      )
  }
}

export function CollectionExplorer({
  gowns,
  hideDimensions = [],
}: {
  gowns: CardGown[]
  hideDimensions?: Dimension[]
}) {
  const [selected, setSelected] = useState<Selected>({})
  const [sort, setSort] = useState('featured')
  const [sheetOpen, setSheetOpen] = useState(false)

  const groups = FILTER_GROUPS.filter((g) => !hideDimensions.includes(g.key))

  const toggleFilter = (key: Dimension, value: string) => {
    setSelected((prev) => {
      const current = prev[key] ?? []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      if (!current.includes(value)) track('filter_use', { dimension: key, value })
      return { ...prev, [key]: next }
    })
  }

  const clearAll = () => setSelected({})

  const applied = groups.flatMap((group) =>
    (selected[group.key] ?? []).map((value) => ({
      key: group.key,
      value,
      label: group.options.find((o) => o.value === value)?.label ?? value,
    })),
  )

  const results = useMemo(
    () => sortGowns(gowns.filter((g) => matches(g, selected)), sort),
    [gowns, selected, sort],
  )

  return (
    <div>
      {/* Filter / sort bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="secondary" size="sm" onClick={() => setSheetOpen(true)}>
            Filter{applied.length > 0 ? ` (${applied.length})` : ''}
          </Button>
          <label className="flex min-h-[44px] items-center gap-2 text-[15px]">
            <span className="sr-only">Sort gowns</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value)
                track('filter_use', { dimension: 'sort', value: e.target.value })
              }}
              className="min-h-[44px] rounded-soft border border-taupe bg-ivory px-3 py-2 text-[15px]"
              aria-label="Sort gowns"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-[14.5px] text-cocoa-light" aria-live="polite">
          {results.length} {results.length === 1 ? 'gown' : 'gowns'}
        </p>
      </div>

      {/* Applied filter chips */}
      {applied.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {applied.map((chip) => (
            <button
              key={`${chip.key}-${chip.value}`}
              type="button"
              onClick={() => toggleFilter(chip.key, chip.value)}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-soft-sm bg-champagne px-3 py-1.5 text-[13.5px] hover:bg-taupe"
            >
              {chip.label}
              <CloseIcon size={13} aria-hidden />
              <span className="sr-only">- remove filter</span>
            </button>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="min-h-[36px] text-[13.5px] text-cocoa-light underline underline-offset-4 hover:text-cocoa"
          >
            Clear all
          </button>
        </div>
      ) : null}

      {/* Grid */}
      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((gown, i) => (
            <GownCard key={gown.slug} gown={gown} priority={i < 4} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-soft-lg bg-champagne px-6 py-14 text-center">
          <h3 className="text-h3">No gowns match those filters just yet</h3>
          <p className="mx-auto mt-3 max-w-md text-cocoa-light">
            Try clearing a filter or two - or tell us what you’re picturing and we’ll suggest
            something you’ll love.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="md" onClick={clearAll}>
              Clear filters
            </Button>
            <Link
              href="/find-my-gown"
              className="inline-flex min-h-[48px] items-center justify-center rounded-soft border border-cocoa px-6 py-3 font-medium hover:bg-ivory"
            >
              Find My Gown
            </Link>
          </div>
        </div>
      )}

      {/* Filter sheet - bottom sheet on mobile, centered card on desktop */}
      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Filter gowns">
        <div className="flex flex-col gap-6 pb-2">
          {groups.map((group) => (
            <fieldset key={group.key}>
              <legend className="text-caption uppercase tracking-[0.14em] text-cocoa-light">
                {group.label}
              </legend>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {group.options.map((option) => {
                  const active = (selected[group.key] ?? []).includes(option.value)
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleFilter(group.key, option.value)}
                      className={`min-h-[44px] rounded-soft border px-4 py-2 text-[15px] motion-safe:transition-colors ${
                        active
                          ? 'border-terracotta bg-terracotta text-white'
                          : 'border-taupe bg-ivory hover:bg-champagne'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
          <div className="sticky bottom-0 -mx-5 flex items-center justify-between gap-3 border-t border-taupe bg-ivory px-5 pb-1 pt-4">
            <button
              type="button"
              onClick={clearAll}
              className="min-h-[44px] text-[15px] text-cocoa-light underline underline-offset-4 hover:text-cocoa"
            >
              Clear all
            </button>
            <Button variant="primary" size="md" onClick={() => setSheetOpen(false)}>
              Show {results.length} {results.length === 1 ? 'gown' : 'gowns'}
            </Button>
          </div>
        </div>
      </Sheet>
    </div>
  )
}
