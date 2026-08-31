'use client'

import { useMemo, useState } from 'react'

import { ChannelLink } from '@/components/contact/ChannelLink'
import { GownCard } from '@/components/product/GownCard'
import { Button } from '@/components/ui/Button'
import { ChevronLeftIcon, WhatsAppIcon } from '@/components/ui/icons'
import { track } from '@/lib/analytics'
import type { CardGown } from '@/lib/cardData'
import { mailtoLink, waLink } from '@/lib/constants'
import { matchGowns, QUIZ_QUESTIONS, type QuizAnswers } from '@/lib/quiz'

/**
 * Find My Gown - four tappable questions, then a shortlist with availability
 * badges and a human fallback. No size question (one size fits every bump);
 * “send my picks” opens a pre-filled message rather than gating anything.
 */
export function QuizFlow({ gowns }: { gowns: CardGown[] }) {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})

  const finished = step >= QUIZ_QUESTIONS.length
  const question = QUIZ_QUESTIONS[step]

  const result = useMemo(
    () => (finished ? matchGowns(gowns, answers) : null),
    [finished, gowns, answers],
  )

  const start = () => {
    setStarted(true)
    track('quiz_start')
  }

  const answer = (key: keyof QuizAnswers, value: string) => {
    const next = { ...answers, [key]: value } as QuizAnswers
    setAnswers(next)
    if (step + 1 >= QUIZ_QUESTIONS.length) {
      track('quiz_complete', {
        occasion: next.occasion,
        style: next.style,
        edit: next.edit,
        mood: next.mood,
      })
    }
    setStep(step + 1)
  }

  const restart = () => {
    setAnswers({})
    setStep(0)
    setStarted(false)
  }

  const picksMessage = result
    ? `Hi Mummy2Be! My Find-My-Gown picks are: ${result.matches
        .map((g) => g.name)
        .join(', ')}. Could you help me choose and check availability?`
    : ''

  if (!started) {
    return (
      <div className="mx-auto max-w-xl rounded-soft-lg bg-champagne p-8 text-center md:p-12">
        <h2 className="text-h3">Four quick questions</h2>
        <p className="mt-3 text-[15.5px] text-cocoa-light">
          Occasion, look, style, and colour - that’s all we need to suggest gowns you’ll love.
          There’s no size question, because every gown is one size and made to fit every bump.
        </p>
        <Button variant="primary" size="lg" className="mt-6" onClick={start}>
          Start
        </Button>
      </div>
    )
  }

  if (!finished && question) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => (step === 0 ? restart() : setStep(step - 1))}
            className="inline-flex min-h-[44px] items-center gap-1 text-[14.5px] text-cocoa-light hover:text-cocoa"
          >
            <ChevronLeftIcon size={16} /> Back
          </button>
          <p className="text-[13.5px] text-cocoa-light" aria-live="polite">
            Question {step + 1} of {QUIZ_QUESTIONS.length}
          </p>
        </div>
        <div
          aria-hidden
          className="mt-3 h-1 w-full overflow-hidden rounded-full bg-champagne"
        >
          <div
            className="h-full rounded-full bg-terracotta motion-safe:transition-all"
            style={{ width: `${(step / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
        <h2 className="text-h3 mt-8 text-center">{question.question}</h2>
        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => answer(question.key, option.value)}
              className="min-h-[56px] rounded-soft-lg border border-taupe bg-ivory px-6 py-4 text-left text-[16px] font-medium shadow-warm hover:border-terracotta hover:bg-champagne motion-safe:transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-h2">Your matches</h2>
        <p className="mx-auto mt-3 max-w-xl text-[15.5px] text-cocoa-light">
          {result?.isFallback
            ? 'Nothing matched every answer perfectly, so here’s the collection we think you’ll love most - and a human who can do better than any quiz.'
            : 'Chosen for your occasion, look, and colour mood. Check each badge for availability, then message us to reserve your dates.'}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
        {result?.matches.map((gown) => <GownCard key={gown.slug} gown={gown} />)}
      </div>

      <div className="mx-auto mt-12 max-w-xl rounded-soft-lg bg-champagne p-6 text-center md:p-8">
        <h3 className="text-h3">Still deciding?</h3>
        <p className="mt-2 text-[15px] text-cocoa-light">
          Message us and we’ll help you choose - or send us your picks and we’ll check
          availability for your dates. Same-day reply.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <ChannelLink
            channel="whatsapp"
            href={waLink(picksMessage)}
            context="quiz-results"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-soft bg-terracotta px-6 py-3 font-medium text-white shadow-warm hover:bg-terracotta-dark"
          >
            <WhatsAppIcon size={18} /> Send my picks on WhatsApp
          </ChannelLink>
          <ChannelLink
            channel="email"
            href={mailtoLink('My Find-My-Gown picks', picksMessage)}
            context="quiz-results"
            className="inline-flex min-h-[48px] items-center justify-center rounded-soft border border-cocoa px-6 py-3 font-medium hover:bg-ivory"
          >
            Email my picks
          </ChannelLink>
        </div>
        <button
          type="button"
          onClick={restart}
          className="mt-5 min-h-[44px] text-[14px] text-cocoa-light underline underline-offset-4 hover:text-cocoa"
        >
          Start over
        </button>
      </div>
    </div>
  )
}
