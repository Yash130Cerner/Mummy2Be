import { FitIcon, ReplyIcon, SparkleIcon, TruckIcon } from '@/components/ui/icons'

/**
 * Immediate risk reduction: four quiet proof points. The deposit is
 * deliberately NOT here (it belongs on evaluation pages only).
 */
const ITEMS = [
  { icon: SparkleIcon, label: 'Professionally cleaned', detail: 'Before every single rental' },
  { icon: FitIcon, label: 'One size, fits every bump', detail: 'Stretch fabric, zero sizing stress' },
  { icon: TruckIcon, label: 'Canada-wide delivery', detail: 'Canada Post, tracked to your door' },
  { icon: ReplyIcon, label: 'Same-day reply', detail: 'A real person confirms everything' },
]

export function TrustStrip() {
  return (
    <section aria-label="Why you can trust Mummy2Be" className="border-y border-taupe bg-champagne">
      <div className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-8 md:grid-cols-4 md:py-10">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 text-center">
            <item.icon size={26} className="text-sage-text" />
            <p className="text-[14.5px] font-semibold leading-snug">{item.label}</p>
            <p className="hidden text-[13px] text-cocoa-light md:block">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
