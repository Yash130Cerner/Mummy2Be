'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState, type ReactNode } from 'react'

import { ChannelLink } from '@/components/contact/ChannelLink'
import { Button } from '@/components/ui/Button'
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'
import { track } from '@/lib/analytics'
import {
  BUSINESS,
  DEFAULT_WA_MESSAGE,
  mailtoLink,
  telLink,
  waLink,
} from '@/lib/constants'

/**
 * The rental request form - the site’s primary conversion. Pre-filled with the
 * gown from the product page (editable), supports the multi-gown wishlist
 * inquiry, validates inline, and NEVER takes payment. On a submit failure the
 * error surfaces WhatsApp / call / email so the lead is never lost.
 */

export type GownOption = { slug: string; name: string }

const PROVINCES = [
  'Ontario',
  'Quebec',
  'British Columbia',
  'Alberta',
  'Manitoba',
  'Saskatchewan',
  'Nova Scotia',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Prince Edward Island',
  'Northwest Territories',
  'Yukon',
  'Nunavut',
]

const CONTACT_METHODS = [
  { value: 'call', label: 'Call' },
  { value: 'text', label: 'Text' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
]

type FieldErrors = Record<string, string>

function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[14.5px] font-medium">
        {label}
        {required ? (
          <span aria-hidden className="text-terracotta">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-cocoa-light"> (optional)</span>
        )}
      </label>
      {hint ? <p className="mt-0.5 text-[13px] text-cocoa-light">{hint}</p> : null}
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-[13.5px] font-medium text-terracotta-dark">
          {error}
        </p>
      ) : null}
    </div>
  )
}

const inputClass = (hasError?: string) =>
  `w-full rounded-soft border bg-ivory px-3.5 py-3 text-[16px] min-h-[48px] placeholder:text-cocoa-light/60 ${
    hasError ? 'border-terracotta-dark' : 'border-taupe'
  }`

export function RentalRequestForm({
  gownOptions,
  preselectedSlugs,
  photographer = false,
}: {
  gownOptions: GownOption[]
  preselectedSlugs: string[]
  photographer?: boolean
}) {
  const router = useRouter()
  const startedRef = useRef(false)
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const [values, setValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredContactMethod: '',
    city: '',
    province: photographer ? 'Ontario' : '',
    gowns: preselectedSlugs.filter((slug) => gownOptions.some((g) => g.slug === slug)),
    eventDate: '',
    rentalPeriod: '',
    preferredRentalDates: '',
    deliveryOrPickupPreference: '',
    sizingQuestions: '',
    message: '',
    consent: false,
    website: '', // honeypot
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'failed'>('idle')

  const markStarted = () => {
    if (!startedRef.current) {
      startedRef.current = true
      track('inquiry_form_start', { type: photographer ? 'photographer' : 'customer' })
    }
  }

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    markStarted()
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => {
      if (!e[key as string]) return e
      const next = { ...e }
      delete next[key as string]
      return next
    })
  }

  const toggleGown = (slug: string) => {
    markStarted()
    setValues((v) => ({
      ...v,
      gowns: v.gowns.includes(slug) ? v.gowns.filter((s) => s !== slug) : [...v.gowns, slug],
    }))
    setErrors((e) => {
      const next = { ...e }
      delete next.gowns
      return next
    })
  }

  const validateField = (key: string): string | null => {
    const v = values
    switch (key) {
      case 'fullName':
        return v.fullName.trim().length < 2 ? 'Please tell us your name.' : null
      case 'phone':
        return v.phone.replace(/\D/g, '').length < 7
          ? 'Please enter a phone number we can reach you on.'
          : null
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())
          ? 'Please enter a valid email address.'
          : null
      case 'preferredContactMethod':
        return !v.preferredContactMethod ? 'Please choose how you’d like us to reach you.' : null
      case 'city':
        return !photographer && !v.city.trim() ? 'Please enter your city.' : null
      case 'province':
        return !photographer && !v.province ? 'Please choose your province.' : null
      case 'gowns':
        return !photographer && v.gowns.length === 0 ? 'Please choose at least one gown.' : null
      case 'eventDate':
        return !photographer && !v.eventDate ? 'Please tell us your event or photoshoot date.' : null
      case 'rentalPeriod':
        return !photographer && !v.rentalPeriod ? 'Please choose a rental period.' : null
      case 'preferredRentalDates':
        return !photographer && !v.preferredRentalDates.trim()
          ? 'Please tell us your preferred rental dates.'
          : null
      case 'consent':
        return !v.consent ? 'Please agree to the rental terms.' : null
      default:
        return null
    }
  }

  const onBlur = (key: string) => {
    const error = validateField(key)
    setErrors((e) => {
      const next = { ...e }
      if (error) next[key] = error
      else delete next[key]
      return next
    })
  }

  const validateAll = (): FieldErrors => {
    const keys = [
      'fullName',
      'phone',
      'email',
      'preferredContactMethod',
      'city',
      'province',
      'gowns',
      'eventDate',
      'rentalPeriod',
      'preferredRentalDates',
      'consent',
    ]
    const all: FieldErrors = {}
    for (const key of keys) {
      const error = validateField(key)
      if (error) all[key] = error
    }
    return all
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const all = validateAll()
    setErrors(all)
    if (Object.keys(all).length > 0) {
      errorSummaryRef.current?.focus()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/rental-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          inquiryType: photographer ? 'photographer' : 'customer',
          sourcePage: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
        }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        errors?: FieldErrors
      }

      if (response.ok && data.ok) {
        track('inquiry_form_submit', {
          type: photographer ? 'photographer' : 'customer',
          gowns: values.gowns.join(','),
        })
        const gownNames = gownOptions
          .filter((g) => values.gowns.includes(g.slug))
          .map((g) => g.name)
        try {
          sessionStorage.setItem(
            'mummy2be:confirmation',
            JSON.stringify({
              name: values.fullName,
              gowns: gownNames,
              method: values.preferredContactMethod,
              photographer,
            }),
          )
        } catch {
          // sessionStorage unavailable - the confirmation page has a graceful default.
        }
        router.push('/rental-request/confirmation')
        return
      }

      if (response.status === 422 && data.errors) {
        setErrors(data.errors)
        setStatus('idle')
        errorSummaryRef.current?.focus()
        return
      }
      setStatus('failed')
    } catch {
      setStatus('failed')
    }
  }

  const errorCount = Object.keys(errors).length

  return (
    <form onSubmit={submit} noValidate>
      {/* Error summary - focused on failed submit for screen readers */}
      <div ref={errorSummaryRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {errorCount > 0 ? (
          <div className="mb-6 rounded-soft border border-terracotta-dark bg-blush/40 px-4 py-3 text-[14.5px]">
            Please check {errorCount === 1 ? 'the highlighted field' : `${errorCount} highlighted fields`}{' '}
            below.
          </div>
        ) : null}
      </div>

      {/* Submit failure - the lead is never lost */}
      {status === 'failed' ? (
        <div role="alert" className="mb-6 rounded-soft-lg border border-terracotta-dark bg-blush/40 p-5">
          <h3 className="font-sans text-[16px] font-semibold">
            Something went wrong sending your request
          </h3>
          <p className="mt-1.5 text-[14.5px] text-cocoa-light">
            Please try again - or reach us directly and we’ll take it from here. Same-day reply,
            promise.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <ChannelLink
              channel="whatsapp"
              href={waLink(DEFAULT_WA_MESSAGE)}
              context="form-failure"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-soft bg-terracotta px-5 font-medium text-white hover:bg-terracotta-dark"
            >
              <WhatsAppIcon size={17} /> WhatsApp us
            </ChannelLink>
            <ChannelLink
              channel="call"
              href={telLink()}
              context="form-failure"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-soft border border-cocoa px-5 font-medium hover:bg-champagne"
            >
              <PhoneIcon size={17} /> Call {BUSINESS.phoneDisplay}
            </ChannelLink>
            <ChannelLink
              channel="email"
              href={mailtoLink('Gown rental request')}
              context="form-failure"
              className="inline-flex min-h-[46px] items-center justify-center rounded-soft border border-cocoa px-5 font-medium hover:bg-champagne"
            >
              Email us
            </ChannelLink>
          </div>
          <Button variant="tertiary" size="sm" className="mt-3" onClick={() => setStatus('idle')}>
            Try the form again
          </Button>
        </div>
      ) : null}

      <div className="space-y-8">
        {/* About you */}
        <fieldset className="space-y-5">
          <legend className="text-h3 mb-1">About you</legend>
          <Field label="Full name" htmlFor="fullName" required error={errors.fullName}>
            <input
              id="fullName"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.fullName}
              onChange={(e) => set('fullName', e.target.value)}
              onBlur={() => onBlur('fullName')}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={inputClass(errors.fullName)}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Phone number" htmlFor="phone" required error={errors.phone}>
              <input
                id="phone"
                name="tel"
                type="tel"
                autoComplete="tel"
                required
                value={values.phone}
                onChange={(e) => set('phone', e.target.value)}
                onBlur={() => onBlur('phone')}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={inputClass(errors.phone)}
              />
            </Field>
            <Field label="Email" htmlFor="email" required error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={() => onBlur('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClass(errors.email)}
              />
            </Field>
          </div>
          <Field
            label="How should we reach you?"
            htmlFor="contact-method"
            required
            error={errors.preferredContactMethod}
          >
            <div id="contact-method" role="radiogroup" aria-label="Preferred contact method" className="flex flex-wrap gap-2">
              {CONTACT_METHODS.map((method) => (
                <button
                  key={method.value}
                  type="button"
                  role="radio"
                  aria-checked={values.preferredContactMethod === method.value}
                  onClick={() => set('preferredContactMethod', method.value)}
                  className={`min-h-[46px] rounded-soft border px-5 py-2.5 text-[15px] font-medium motion-safe:transition-colors ${
                    values.preferredContactMethod === method.value
                      ? 'border-terracotta bg-terracotta text-white'
                      : 'border-taupe bg-ivory hover:bg-champagne'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City" htmlFor="city" required={!photographer} error={errors.city}>
              <input
                id="city"
                type="text"
                autoComplete="address-level2"
                value={values.city}
                onChange={(e) => set('city', e.target.value)}
                onBlur={() => onBlur('city')}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? 'city-error' : undefined}
                className={inputClass(errors.city)}
              />
            </Field>
            <Field label="Province" htmlFor="province" required={!photographer} error={errors.province}>
              <select
                id="province"
                autoComplete="address-level1"
                value={values.province}
                onChange={(e) => set('province', e.target.value)}
                onBlur={() => onBlur('province')}
                aria-invalid={Boolean(errors.province)}
                aria-describedby={errors.province ? 'province-error' : undefined}
                className={inputClass(errors.province)}
              >
                <option value="">Choose…</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </fieldset>

        {/* Your gown */}
        <fieldset className="space-y-5">
          <legend className="text-h3 mb-1">{photographer ? 'Gowns of interest' : 'Your gown'}</legend>
          <Field
            label={photographer ? 'Which gowns interest you?' : 'Selected gown(s)'}
            htmlFor="gowns"
            required={!photographer}
            error={errors.gowns}
            hint={
              preselectedSlugs.length > 0
                ? 'Pre-filled from the gown you were viewing - adjust freely.'
                : 'Choose one or more.'
            }
          >
            <div id="gowns" className="flex flex-wrap gap-2">
              {gownOptions.map((gown) => {
                const selected = values.gowns.includes(gown.slug)
                return (
                  <button
                    key={gown.slug}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleGown(gown.slug)}
                    className={`min-h-[44px] rounded-soft border px-4 py-2 text-[14.5px] motion-safe:transition-colors ${
                      selected
                        ? 'border-terracotta bg-terracotta text-white'
                        : 'border-taupe bg-ivory hover:bg-champagne'
                    }`}
                  >
                    {gown.name}
                  </button>
                )
              })}
            </div>
          </Field>
        </fieldset>

        {/* Your dates */}
        <fieldset className="space-y-5">
          <legend className="text-h3 mb-1">Your dates</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Event / photoshoot date"
              htmlFor="eventDate"
              required={!photographer}
              error={errors.eventDate}
            >
              <input
                id="eventDate"
                type="date"
                value={values.eventDate}
                onChange={(e) => set('eventDate', e.target.value)}
                onBlur={() => onBlur('eventDate')}
                aria-invalid={Boolean(errors.eventDate)}
                aria-describedby={errors.eventDate ? 'eventDate-error' : undefined}
                className={inputClass(errors.eventDate)}
              />
            </Field>
            <Field
              label="Rental period"
              htmlFor="rentalPeriod"
              required={!photographer}
              error={errors.rentalPeriod}
              hint="Your window starts the day the gown arrives."
            >
              <div id="rentalPeriod" role="radiogroup" aria-label="Rental period" className="flex gap-2">
                {[
                  { value: '5_day', label: '5 days' },
                  { value: '10_day', label: '10 days' },
                ].map((period) => (
                  <button
                    key={period.value}
                    type="button"
                    role="radio"
                    aria-checked={values.rentalPeriod === period.value}
                    onClick={() => set('rentalPeriod', period.value)}
                    className={`min-h-[46px] flex-1 rounded-soft border px-4 py-2.5 text-[15px] font-medium motion-safe:transition-colors ${
                      values.rentalPeriod === period.value
                        ? 'border-terracotta bg-terracotta text-white'
                        : 'border-taupe bg-ivory hover:bg-champagne'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </Field>
          </div>
          <Field
            label="Preferred rental dates"
            htmlFor="preferredRentalDates"
            required={!photographer}
            error={errors.preferredRentalDates}
            hint="E.g. “Arriving by Aug 14, returning Aug 19”. We’ll confirm the exact window with you."
          >
            <input
              id="preferredRentalDates"
              type="text"
              value={values.preferredRentalDates}
              onChange={(e) => set('preferredRentalDates', e.target.value)}
              onBlur={() => onBlur('preferredRentalDates')}
              aria-invalid={Boolean(errors.preferredRentalDates)}
              aria-describedby={errors.preferredRentalDates ? 'preferredRentalDates-error' : undefined}
              className={inputClass(errors.preferredRentalDates)}
            />
          </Field>
          <Field
            label="Delivery preference"
            htmlFor="delivery"
            error={errors.deliveryOrPickupPreference}
            hint="Canada Post shipping, or free local GTA delivery/pickup - we’ll confirm on our call."
          >
            <select
              id="delivery"
              value={values.deliveryOrPickupPreference}
              onChange={(e) => set('deliveryOrPickupPreference', e.target.value)}
              className={inputClass(errors.deliveryOrPickupPreference)}
            >
              <option value="">No preference yet</option>
              <option value="canada_post">Canada Post shipping</option>
              <option value="local_gta">Local GTA delivery / pickup</option>
            </select>
          </Field>
        </fieldset>

        {/* Anything else */}
        <fieldset className="space-y-5">
          <legend className="text-h3 mb-1">Anything else</legend>
          <Field
            label="Sizing or fit questions"
            htmlFor="sizingQuestions"
            error={errors.sizingQuestions}
            hint="Every gown is one size and stretchable - but ask us anything at all."
          >
            <textarea
              id="sizingQuestions"
              rows={3}
              value={values.sizingQuestions}
              onChange={(e) => set('sizingQuestions', e.target.value)}
              className={inputClass(errors.sizingQuestions)}
            />
          </Field>
          <Field label="Message or special request" htmlFor="message" error={errors.message}>
            <textarea
              id="message"
              rows={4}
              value={values.message}
              onChange={(e) => set('message', e.target.value)}
              className={inputClass(errors.message)}
            />
          </Field>
        </fieldset>

        {/* Honeypot - hidden from real visitors */}
        <div className="hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
          />
        </div>

        {/* Consent + submit */}
        <div className="space-y-5 border-t border-taupe pt-6">
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-[14.5px]">
              <input
                type="checkbox"
                checked={values.consent}
                onChange={(e) => set('consent', e.target.checked)}
                onBlur={() => onBlur('consent')}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
                className="mt-1 size-4 shrink-0 accent-terracotta"
              />
              <span>
                I agree to Mummy2Be’s{' '}
                <Link href="/rental-terms" target="_blank" className="font-medium underline underline-offset-4">
                  rental terms
                </Link>
                , including the $100 fully refundable deposit.
              </span>
            </label>
            {errors.consent ? (
              <p id="consent-error" role="alert" className="mt-1.5 text-[13.5px] font-medium text-terracotta-dark">
                {errors.consent}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send Request'}
          </Button>
          <p className="text-[13.5px] text-cocoa-light">
            No payment is taken here - we’ll personally confirm availability and details, same day.
          </p>
        </div>
      </div>
    </form>
  )
}
