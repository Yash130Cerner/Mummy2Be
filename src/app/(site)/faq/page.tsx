import type { Metadata } from 'next'

import { ContactOptions } from '@/components/contact/ContactOptions'
import { AccordionItem } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/ui/JsonLd'
import { FAQ_GROUPS } from '@/collections/Faqs'
import { getFaqs } from '@/lib/data'
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = pageMeta({
  title: 'Maternity Gown Rental FAQ | Mummy2Be',
  description:
    'Answers about renting a maternity gown from Mummy2Be - sizing, availability, payment, the refundable deposit, shipping across Canada, and returns.',
  path: '/faq',
})

export default async function FaqPage() {
  const faqs = await getFaqs()
  const groups = FAQ_GROUPS.map((group) => ({
    ...group,
    faqs: faqs.filter((f) => f.group === group.value),
  })).filter((g) => g.faqs.length > 0)

  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])} />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-display">Questions? We’ve got answers.</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            Honest, plain answers about the gowns, booking, payment, and delivery. If anything’s
            still unclear, message us - a real person replies the same day.
          </p>
        </div>

        {groups.length > 0 ? (
          <nav aria-label="Question groups" className="mx-auto mt-8 max-w-2xl">
            <ul className="flex flex-wrap justify-center gap-2">
              {groups.map((group) => (
                <li key={group.value}>
                  <a
                    href={`#${group.value}`}
                    className="inline-flex min-h-[40px] items-center rounded-soft-sm bg-champagne px-4 py-1.5 text-[13.5px] hover:bg-taupe"
                  >
                    {group.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="mx-auto mt-12 max-w-2xl space-y-12">
          {groups.map((group) => (
            <section key={group.value} id={group.value} aria-labelledby={`${group.value}-h`}>
              <h2 id={`${group.value}-h`} className="text-h3">
                {group.label}
              </h2>
              <div className="mt-4 border-t border-taupe">
                {group.faqs.map((faq) => (
                  <AccordionItem key={faq.id} title={faq.question}>
                    <p>{faq.answer}</p>
                  </AccordionItem>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section aria-labelledby="faq-contact" className="mx-auto mt-16 max-w-2xl md:mt-24">
          <div className="rounded-soft-lg border border-taupe p-6 md:p-8">
            <h2 id="faq-contact" className="text-h3 text-center">
              Still wondering about something?
            </h2>
            <p className="mt-2 text-center text-[15px] text-cocoa-light">
              Ask us directly - we love talking gowns, dates, and details.
            </p>
            <div className="mt-6">
              <ContactOptions context="faq" />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
