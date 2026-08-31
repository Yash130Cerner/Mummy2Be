import { b, doc, h2, i, p, ul, type RichTextDoc } from './richText'

/**
 * Long-form page content: the founder story (Launch Content Pack §3) and the
 * Rental Terms draft (§4) with its suggested defaults kept - both editable in
 * the admin afterwards. The terms remain a plain-language starting point, not
 * legal advice.
 */

export type SeedPage = {
  title: string
  slug: string
  body: RichTextDoc | null
}

const ABOUT_STORY = doc(
  p(
    'Mummy2Be began with a simple observation, right here in Ontario: finding the perfect maternity gown for a photoshoot was harder than it should be. Between limited choices, high costs, and gowns that were difficult to get hold of, what should have been a joyful part of preparing for a baby too often became a stressful one. We wanted to change that - to make dressing for your maternity moment feel seamless, beautiful, and memorable.',
  ),
  p(
    'Our founder brings more than a decade in Canada together with a background in fashion design from India - an international eye that reimagines the classic maternity gown. Living in the GTA, surrounded by so many cultures and stories, we built Mummy2Be to serve every mom: soft, understated classics for those who love timeless elegance, and rich, dramatic showstoppers made to shine in vibrant, culturally-styled shoots. Every gown is chosen for premium, pregnancy-friendly fabric that doesn’t just look stunning - it feels incredible to wear.',
  ),
  p(
    'But we’ve always believed this is about more than a gown. It’s about the experience around it - the care, the guidance, and the moment you’re capturing. We personally help you choose, we clean and prepare every gown ourselves, and we confirm each reservation with a real conversation, so you’re never left wondering. We serve all of Ontario and deliver across Canada, because every expecting mom deserves the gown of her dreams, wherever she is.',
  ),
  p(
    'We stand by three things: authenticity, quality, and trust. We’re not offering try-ons just yet, but our team is always on hand for personalized styling help - just message us. And for photographers who’d like to collaborate, we’d love to: lend us your lens, and enjoy access to our gowns in return.',
  ),
  p(
    'Mummy2Be isn’t really about renting a gown. It’s about the memories, and the story you’ll tell for years to come. We’d be honoured to be part of yours.',
  ),
  p(i('With warmth,')),
  p(i('The Mummy2Be Family')),
)

const RENTAL_TERMS = doc(
  h2('The rental'),
  ul(
    [
      'Gowns are rented for a ',
      b('5-day or 10-day'),
      ' period. Your rental window begins on the day you ',
      b('receive'),
      ' the gown and ends 5 or 10 days later, depending on your chosen period.',
    ],
    ['Gowns are ', b('one size'), ' and made to stretch and flatter every stage of pregnancy.'],
  ),
  h2('Payment & deposit'),
  ul(
    [
      'Payment is arranged directly with us (by ',
      b('e-transfer or cash'),
      ') after we confirm your reservation. ',
      b('No payment is taken through this website.'),
    ],
    [
      'A ',
      b('$100 refundable deposit'),
      ' secures your gown. We refund it in full ',
      b('within 24 hours'),
      ' of receiving your returned gown, once it’s been inspected and is in acceptable condition.',
    ],
  ),
  h2('Condition & care'),
  ul(
    [
      'Every gown is ',
      b('professionally cleaned before it reaches you'),
      ', and you ',
      b('don’t need to clean it'),
      ' before returning - we take care of that.',
    ],
    [
      'Normal wear from a photoshoot is expected and completely fine. Please avoid damage such as tears, permanent stains, makeup or tan transfer, burns, or alterations.',
    ],
    [
      'If a gown is returned with damage beyond normal wear, we may deduct the repair cost from your deposit. If the cost exceeds the $100 deposit - for significant damage or a gown that can’t be restored - the remaining amount may be invoiced, up to the gown’s full replacement value.',
    ],
  ),
  h2('Shipping & returns'),
  ul(
    [
      'Shipping across Canada is by ',
      b('Canada Post'),
      ' and is ',
      b('paid by you'),
      ', calculated based on your address and confirmed at reservation. For moms in the ',
      b('GTA'),
      ', free local hand-delivery and pickup may be available - just ask.',
    ],
    [
      'When you’re ready to return, we send you a ',
      b('prepaid return label'),
      '. Please ship the gown back within your rental window.',
    ],
  ),
  h2('Late or non-return'),
  ul(
    [
      'Please return within your window so the next mom’s booking isn’t affected. Returns after your window may incur a late fee of ',
      b('$15 per day'),
      '.',
    ],
    [
      'If a gown is not returned, the deposit is retained and the gown’s replacement value may be charged.',
    ],
  ),
  h2('Changes & cancellations'),
  ul([
    'Need to change or cancel? Contact us as early as you can. Cancellations made at least ',
    b('48 hours before your gown ships'),
    ' are eligible for a full deposit refund.',
  ]),
  h2('Using the gown'),
  ul(['Rentals are for personal photoshoot and event use. Please don’t sublet or re-rent the gown.']),
  h2('Governing law'),
  ul(['These terms are governed by the laws of the Province of ', b('Ontario, Canada'), '.']),
  h2('Questions?'),
  p(
    'We’re happy to talk anything through before you reserve - reach us by phone, WhatsApp, or email.',
  ),
  p(
    i(
      'This is a fair, plain-language starting point, not legal advice. As Mummy2Be grows, it’s worth having a legal professional review it.',
    ),
  ),
)

export const SEED_PAGES: SeedPage[] = [
  {
    title: 'Homepage content (hero photo)',
    slug: 'home',
    body: null,
  },
  {
    title: 'Our Story',
    slug: 'about-story',
    body: ABOUT_STORY,
  },
  {
    title: 'Rental Terms & Deposit Policy',
    slug: 'rental-terms',
    body: RENTAL_TERMS,
  },
]
