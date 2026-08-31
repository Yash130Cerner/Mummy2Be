import { AccordionItem } from '@/components/ui/Accordion'
import { COPY } from '@/lib/constants'

/**
 * “What’s included” - total transparency at the point of evaluation.
 * This is one of the few places the deposit appears (always framed
 * “fully refundable, back within 24 hours”).
 */
export function RentalEssentials() {
  return (
    <div className="border-t border-taupe">
      <AccordionItem title="What’s included" defaultOpen>
        <p>{COPY.whatsIncluded}</p>
      </AccordionItem>
      <AccordionItem title="Your $100 deposit - fully refundable">
        <p>{COPY.deposit}</p>
      </AccordionItem>
      <AccordionItem title="Shipping across Canada (and free GTA delivery)">
        <p>{COPY.shipping}</p>
      </AccordionItem>
      <AccordionItem title="Easy returns">
        <p>{COPY.returns}</p>
      </AccordionItem>
    </div>
  )
}
