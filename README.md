# Mummy2Be - Maternity Gown Rental

The complete website for **Mummy2Be**, a premium maternity gown rental business based in the
GTA, Ontario, serving all of Canada. Warm-luxury boutique design, mobile-first, SEO-ready -
built so an expecting mom browses confidently and **reserves by contact** (call · text ·
WhatsApp · email · request form).

> **New here and just want it running?** Follow **[SETUP.md](./SETUP.md)** - it walks through
> every step with copy-paste commands, assuming no prior experience.

---

## The model (hard constraints, honoured everywhere)

- **No online payment.** No Stripe/PayPal/gateway, no cart, no checkout, no order objects.
  Payment is e-transfer or cash, arranged personally after confirmation.
- **Availability is a manually-set status badge** per gown (`available` / `limited` /
  `on_rental` / `contact_to_confirm`) toggled in the admin. No calendar, no date-based
  inventory, no real-time booking.
- **Gowns are one size, stretchable.** No size selector, no size variants, no size filter -
  fit is a reassurance message (“made to fit and flatter every bump”).
- **Reservations finalize by contact.** The inquiry form stores the lead, emails the owner,
  and auto-replies to the customer - a human confirms everything the same day.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (design tokens in `src/app/(site)/globals.css`) |
| CMS / admin / data | Payload CMS 3 (self-hosted, same app) + PostgreSQL |
| Email | Resend (owner notification + customer auto-reply) |
| Media storage | Local disk in dev · **Vercel Blob in production** (persistent + CDN). Auto-enabled by `BLOB_READ_WRITE_TOKEN`; uploads go **directly from the browser to Blob** (`clientUploads`, bypassing the ~4.5 MB serverless limit - required for videos) and media URLs point **straight at the Blob CDN** (`disablePayloadAccessControl`), so images and videos stream from the CDN with range-request support (video scrubbing) - never through a serverless function. Vercel’s own filesystem is ephemeral, which is exactly why local-disk storage is dev-only. |
| Analytics | GA4 (events + conversions) |
| Hosting | Vercel |

## Project layout

```
src/
  payload.config.ts        Payload CMS config (Postgres, Lexical, Vercel Blob)
  collections/             Gowns · Inquiries · Reservations · Media · FAQs ·
                           Testimonials · RealMoms · BlogPosts · Pages · Users
  app/
    (site)/                The public site (its own root layout + globals.css)
      page.tsx             Home
      gowns/               Collection hub + categories + gown pages (one dynamic route)
      …                    how-it-works, find-my-gown, faq, about, contact,
                           rental-request (+ confirmation), rental-terms,
                           shipping-and-returns, fit-guide, real-moms,
                           for-photographers, blog, gta-maternity-gown-rental,
                           saved, privacy, 404
    (payload)/             Payload admin at /admin + its REST API at /api/*
    api/rental-request/    Inquiry submit endpoint (store → notify → auto-reply)
    api/wishlist/          Card data for the saved-gowns page
    sitemap.ts robots.ts opengraph-image.tsx icon.svg
  components/              layout · ui · product · sections · forms · quiz · contact
  lib/                     constants (single-source copy library) · data · seo ·
                           schema (JSON-LD) · analytics · wishlist · quiz · gownArt
  seed/                    13 gowns + FAQs + pages + articles (npm run seed)
  emails/                  Resend email templates
```

## Key behaviours

- **Availability badge** - one field per gown, set in *Admin → Gowns → sidebar*. It renders on
  every card and gown page, feeds the “Available now” filter, and maps honestly to Product
  schema (`InStock` / `LimitedAvailability` / `OutOfStock`). Content changes revalidate the
  whole (small) site immediately via an `afterChange` hook, with a 5-minute ISR backstop.
- **Inquiry flow** - `/rental-request` (pre-filled from a gown page, or multi-gown from
  `/saved`) → `POST /api/rental-request` → stores the Inquiry → emails the owner → auto-replies
  to the customer (locked confirmation copy) → confirmation page. If email ever fails, the
  inquiry is already stored in the admin - the lead is never lost. A submit failure in the
  browser surfaces WhatsApp/call/email directly in the error.
- **Wishlist** - gown slugs in `localStorage`, no accounts. `/saved` can send one multi-gown
  inquiry. It is deliberately *not* a cart.
- **Gown photos** - uploaded by the owner in the admin (see SETUP.md §9). Until a gown has
  photos, the site shows an elegant per-gown art treatment (its own colour wash + name) so the
  catalogue never looks broken. The homepage hero likewise upgrades from an editorial art
  treatment to full-bleed photography the moment a hero image is uploaded to *Pages → home*.
- **Video (performance-first)** - a gown *may* have one movement video + poster frame
  (optional per gown; gowns without one simply show photos - no empty player). Gowns with a
  video: (a) show it as a tap-to-play slide in their gallery, (b) auto-populate the homepage
  **“See them in motion”** strip (each clip links to its gown page), and (c) lead the homepage
  featured section automatically, so the footage works twice. One behind-the-scenes clip can
  be attached to *Pages → about-story* and appears in the About page’s trust section. All
  video uses the shared `LazyVideo` component: only the lazy-loaded poster renders until the
  visitor explicitly taps play - **zero video bytes** are fetched before that, nothing ever
  autoplays (with or without sound, which also satisfies `prefers-reduced-motion`), playback
  starts on the user’s tap (sound allowed, native controls, keyboard-operable), and fixed
  aspect boxes mean zero layout shift. There is no dedicated video page and no video hero.
- **Instagram = a follow link only** - icon + text in the header, footer, and mobile menu,
  opening `instagram.com/_mummy2be_` in a new tab (`rel="noopener"`, aria-labelled). **Never**
  an embedded feed, and no third-party Instagram scripts anywhere (the old Wix placeholder
  block is deliberately not recreated). Override the URL with `NEXT_PUBLIC_INSTAGRAM_URL`.
- **SEO** - per-page titles/descriptions from the specs, one H1 per page, canonical URLs,
  `sitemap.xml`, `robots.txt` (noindex on `/rental-request`, `/rental-terms`, `/saved`),
  JSON-LD (Organization, WebSite, LocalBusiness service-area **without street address**,
  CollectionPage, Product+Offer, FAQPage, BlogPosting, Breadcrumbs), 301 redirects from the
  old Wix URLs, descriptive alt-text fields on all media.
- **Analytics (GA4)** - `page_view`, `gown_view`, `filter_use`, `quiz_start`, `quiz_complete`,
  `wishlist_add`, and the conversion set: `reserve_click`, `ask_click`, `inquiry_form_start`,
  `inquiry_form_submit`, `whatsapp_click`, `call_click`, `email_click` (mark these as key
  events in GA4 - SETUP.md §12).
- **Accessibility** - semantic HTML, visible focus everywhere, AA-verified colour pairs
  (gold/blush/mauve are decorative only), ≥44px tap targets, labelled inputs with
  `role="alert"` errors, native `<dialog>` sheets (focus trapping for free),
  `prefers-reduced-motion` respected throughout.

## Scripts

```bash
npm run dev                  # dev server (pushes schema changes to the DB in dev)
npm run build                # production build
npm run start                # serve the production build
npm run seed                 # seed 13 gowns, FAQs, Our Story, Terms, 3 articles (idempotent)
npm run generate:types       # regenerate src/payload-types.ts after schema changes
npm run generate:importmap   # regenerate the admin import map after adding plugins
```

## Environment variables

See [`.env.example`](./.env.example) - every variable is documented there, and SETUP.md
explains where each value comes from (Neon, Resend, GA4, Vercel Blob).

## Documented assumptions & decisions

Small ambiguities were resolved as follows (never by adding payment, carts, checkout, size
selectors, or availability calendars - all forbidden):

1. **Category URLs vs. the curated-edit rename.** The Content Pack reframed “Western / South
   Asian” as curated edits (`classic` / `south-asian-shoot`). The SEO-locked URLs
   `/gowns/western` and `/gowns/south-asian` are kept and map to those edit tags; `/gowns/photoshoot`
   and `/gowns/baby-shower` map to occasion tags. All four are filtered views of one catalogue
   (one canonical URL per gown - no duplicate content).
2. **Route structure.** Next.js cannot host `/gowns/[category]` and `/gowns/[slug]` side by
   side, so one dynamic route resolves category slugs first, then gown slugs. Category slugs
   are reserved and validated against in the Gowns collection.
3. **Copy placement.** Catalogue, FAQs, testimonials, real-moms, articles, the founder story
   and the rental terms are CMS-managed. The locked marketing copy (hero, steps, benefit
   sections) lives in code - `src/lib/constants.ts` is the single-source copy library for the
   deposit/shipping/availability strings so the facts can never diverge between pages.
4. **Testimonials & Real Moms ship empty.** The specs require *real* reviews and
   consent-cleared photos, which don’t exist yet as files. Their sections hide automatically
   until entries are added in the admin; `/real-moms` shows an honest interim state with a
   clear next action. **No fabricated reviews.**
5. **Seeded availability** is `available` for all 13 gowns (launch assumption) - the owner
   curates real statuses in seconds from the admin. New gowns default to the safest
   `contact_to_confirm`.
6. **Quiz “send my picks”** opens a pre-filled WhatsApp/email message (contact-based model)
   rather than storing addresses into a mailing list that doesn’t exist yet.
7. **“Ask About This Gown”** opens a channel sheet (WhatsApp / call / text / email) pre-filled
   with the gown’s name.
8. **No SMS/WhatsApp owner ping** - that needs a paid SMS provider outside the approved stack;
   the owner notification email (plus the admin inbox) covers same-day response. Easy to add
   later in `src/app/api/rental-request/route.ts`.
9. **A `/privacy` page was added** (linked from the footer): the inquiry form collects
   personal data, so a plain-language privacy note is table stakes for trust.
10. **Rental terms are a plain-language draft** seeded with the Content Pack defaults
    ($15/day late fee, 48h cancellation, replacement-value clause) - editable in the admin,
    and flagged on-page as “not legal advice; have it reviewed professionally.”
11. **Quick-view and a desktop lightbox were deliberately left out** of launch scope: with 13
    gowns and fast gown pages, cards link straight to the page (the gallery is swipeable with
    thumbnails and zoomable natively on mobile). Both can be added without design changes.
12. **Deployment uses dev-push + no migrations** (novice-friendly): running `npm run dev`
    against your Neon database creates/updates the schema; production then uses the same
    database. This is Payload’s standard dev workflow and avoids migration tooling entirely
    for a site this size. (Advanced users can switch to `payload migrate` workflows later.)
13. **Which gowns are “video gowns” is data, not code.** The owner’s 7 clips cover only 3–4
    gowns, and which ones can’t be known at build time - so the “See them in motion” strip and
    the featured-section priority derive automatically from whichever gowns have a video
    uploaded. No videos uploaded → the strip simply doesn’t render.
14. **“Muted by default with sound on play”** is implemented as: nothing plays (and no video
    bytes load) until an explicit tap; the tap is a user gesture, so playback starts with
    sound and native controls (if a browser still refuses unmuted playback, it retries muted
    and the controls allow unmuting). Nothing on the site ever autoplays.
15. **Poster frames crop to the tile (object-cover); playback letterboxes (object-contain)**
    so the full video frame is always visible while playing, whatever its aspect ratio.

## Performance notes (measured with Lighthouse, mobile)

- The site’s ~21 KB stylesheet is **inlined into the HTML** (`experimental.inlineCss`) -
  removes the render-blocking CSS round trip on slow connections.
- withPayload’s `Accept-CH` / `Vary` / `Critical-CH` client-hint headers (admin dark-mode
  detection) are **scoped to `/admin` only** - `Critical-CH` otherwise makes Chrome restart
  the very first request on every cold visit, and the `Vary` fragments CDN caching.
- Fonts load as slim discrete weights (not full variable fonts), preloaded, `display: swap`
  with metrics-matched fallbacks (zero CLS).
- Video is strictly opt-in per interaction: lazy posters, zero video bytes before tap, fixed
  aspect boxes (zero CLS), `preload="metadata"` only after activation.
- Measured (Lighthouse 12, mobile, devtools throttling - observed metrics): home **LCP 1.2 s**,
  gown page **LCP 1.8 s**, **CLS 0** on both. Note: Lighthouse’s *default simulated* (Lantern)
  mode estimates ~2.9–3.4 s LCP for the homepage - a known modeling artifact for webfont text
  heroes (it chains the font into the text-LCP estimate regardless of timing); the same run’s
  own filmstrip shows the headline painted by ~1.9 s.

## Owner’s 30-second cheat sheet

- **A gown went out on rental** → Admin → Gowns → gown → sidebar → Availability status →
  *On rental* → Save. Switch back to *Available* only after it returns, passes inspection,
  **and is cleaned** - that habit is the buffer between rentals.
- **A new inquiry arrived** → you got an email; it’s also in *Admin → Bookings → Inquiries*.
  Reply the same day on her preferred channel, then create a *Reservation* to track deposit,
  shipping and inspection through to “deposit refunded”.
- **Add photos** → *Admin → Photos & videos* → upload (write good alt text!) → open the gown →
  attach as Primary image / Gallery / Video.
- **Add a video** → compress it first (SETUP.md “Adding your videos”), upload the mp4 + a
  poster frame to *Photos & videos*, then attach both under the gown’s **Movement video**.
  That gown now appears in the homepage “See them in motion” strip automatically. The one
  behind-the-scenes clip goes on *Content → Page content → about-story*.
