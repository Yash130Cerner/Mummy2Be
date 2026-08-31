'use client'

import { useCallback, useEffect, useRef, type ReactNode } from 'react'

import { CloseIcon } from '@/components/ui/icons'

/**
 * Bottom-sheet on mobile, centered card on desktop - built on the native
 * <dialog>, which provides focus trapping, ESC-to-close and inert background
 * for free. Body scroll is locked while open.
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!open && dialog.open) {
      dialog.close()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleClose = useCallback(() => {
    document.body.style.overflow = ''
    onClose()
  }, [onClose])

  return (
    <dialog
      ref={ref}
      className="sheet sheet-bottom shadow-warm-lg"
      onClose={handleClose}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself) closes.
        if (e.target === ref.current) handleClose()
      }}
      aria-label={title}
    >
      <div className="flex items-center justify-between border-b border-taupe px-5 py-4">
        <h2 className="font-sans text-[17px] font-semibold">{title}</h2>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="flex size-11 items-center justify-center rounded-soft text-cocoa-light hover:bg-champagne"
        >
          <CloseIcon size={20} />
        </button>
      </div>
      <div className="overflow-y-auto px-5 py-5">{children}</div>
    </dialog>
  )
}
