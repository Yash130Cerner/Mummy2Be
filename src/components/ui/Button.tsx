import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * The one action treatment: primary = terracotta with white text.
 * Secondary = cocoa outline. Tertiary = text link. Dark = cocoa fill.
 * Never gold, never blush, never a pill.
 */
type Variant = 'primary' | 'secondary' | 'tertiary' | 'dark'
type Size = 'lg' | 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-soft font-medium transition-colors motion-safe:transition-all motion-safe:duration-150 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none text-center'

const variants: Record<Variant, string> = {
  primary: 'bg-terracotta text-white hover:bg-terracotta-dark shadow-warm hover:shadow-warm-lg',
  secondary: 'border border-cocoa text-cocoa bg-transparent hover:bg-champagne',
  tertiary:
    'text-cocoa underline-offset-4 hover:underline hover:decoration-gold hover:decoration-2',
  dark: 'bg-cocoa text-white hover:bg-cocoa/90 shadow-warm',
}

const sizes: Record<Size, string> = {
  lg: 'px-7 py-3.5 text-[17px] min-h-[52px]',
  md: 'px-6 py-3 text-[16px] min-h-[48px]',
  sm: 'px-4 py-2 text-[15px] min-h-[44px]',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonLinkProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className'
  >

type ButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

const classes = (variant: Variant, size: Size, className?: string) =>
  [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('sms:')
  if (isExternal) {
    return (
      <a href={href} className={classes(variant, size, className)} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}
