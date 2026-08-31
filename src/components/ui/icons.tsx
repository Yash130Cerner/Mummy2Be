import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const svgProps = (size = 20, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const PhoneIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const MailIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export const MessageIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

/* WhatsApp glyph - filled brand mark. */
export const WhatsAppIcon = ({ size = 20, ...props }: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)

export const HeartIcon = ({ size, filled, ...props }: IconProps & { filled?: boolean }) => (
  <svg {...svgProps(size, props)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

export const MenuIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <line x1="4" x2="20" y1="7" y2="7" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="17" y2="17" />
  </svg>
)

export const CloseIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

export const ChevronDownIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronLeftIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
)

export const ChevronRightIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const ArrowRightIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

export const CheckIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const InstagramIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
)

export const SparkleIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1" />
  </svg>
)

export const TruckIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="M5 18H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v10" />
    <path d="M15 11h4l3 3v3a1 1 0 0 1-1 1h-1" />
    <circle cx="7.5" cy="18" r="2" />
    <circle cx="17.5" cy="18" r="2" />
    <path d="M9.5 18H15" />
  </svg>
)

export const ReplyIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="m8 10 2 2 4-4" />
  </svg>
)

export const FitIcon = ({ size, ...props }: IconProps) => (
  <svg {...svgProps(size, props)}>
    <circle cx="12" cy="5" r="2.5" />
    <path d="M7 21c0-5.5 1.6-8.5 5-8.5s5 3 5 8.5" />
    <path d="M9.2 12.6C8 11.5 7.5 10.3 7.5 9m9 0c0 1.3-.5 2.5-1.7 3.6" />
  </svg>
)
