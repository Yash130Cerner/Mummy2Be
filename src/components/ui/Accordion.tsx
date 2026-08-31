'use client'

import { useId, useState, type ReactNode } from 'react'

import { ChevronDownIcon } from '@/components/ui/icons'

/**
 * Accessible accordion row: real <button> with aria-expanded/aria-controls,
 * multiple rows may be open at once, instant when reduced-motion is set.
 */
export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const buttonId = useId()

  return (
    <div className="border-b border-taupe">
      <h3 className="font-sans text-[16px] font-medium leading-snug md:text-[17px]">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-4 text-left min-h-[44px] hover:text-terracotta-dark motion-safe:transition-colors"
        >
          <span>{title}</span>
          <ChevronDownIcon
            size={18}
            className={`shrink-0 text-cocoa-light motion-safe:transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-5 pr-8 text-[15.5px] leading-relaxed text-cocoa-light"
      >
        {children}
      </div>
    </div>
  )
}
