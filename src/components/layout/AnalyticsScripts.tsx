import Script from 'next/script'

/**
 * GA4 - loaded only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * Conversions (reserve_click, ask_click, inquiry_form_submit, whatsapp_click,
 * call_click, email_click) are marked as key events inside GA4 - see SETUP.md.
 */
export function AnalyticsScripts() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!id) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  )
}
