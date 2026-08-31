/**
 * Find My Gown - question definitions and matching logic.
 * Answers map to the same tags that drive the collection filters.
 * No size question: every gown is one size.
 */

export type QuizAnswers = {
  occasion?: 'photoshoot' | 'baby-shower' | 'other'
  style?: 'flowing' | 'fitted' | 'dramatic'
  edit?: 'classic' | 'south-asian-shoot' | 'both'
  mood?: 'soft-neutral' | 'warm-rich' | 'jewel'
}

export const QUIZ_QUESTIONS = [
  {
    key: 'occasion' as const,
    question: 'What’s the occasion?',
    options: [
      { value: 'photoshoot', label: 'Maternity photoshoot' },
      { value: 'baby-shower', label: 'Baby shower' },
      { value: 'other', label: 'Another special moment' },
    ],
  },
  {
    key: 'style' as const,
    question: 'What look do you love?',
    options: [
      { value: 'flowing', label: 'Soft & flowing' },
      { value: 'fitted', label: 'Fitted & elegant' },
      { value: 'dramatic', label: 'Bold & dramatic' },
    ],
  },
  {
    key: 'edit' as const,
    question: 'Which style speaks to you?',
    options: [
      { value: 'classic', label: 'Western' },
      { value: 'south-asian-shoot', label: 'South Asian' },
      { value: 'both', label: 'Show me both' },
    ],
  },
  {
    key: 'mood' as const,
    question: 'Pick a colour mood',
    options: [
      { value: 'soft-neutral', label: 'Soft & neutral' },
      { value: 'warm-rich', label: 'Warm & rich' },
      { value: 'jewel', label: 'Deep & jewel-toned' },
    ],
  },
]

const MOOD_FAMILIES: Record<NonNullable<QuizAnswers['mood']>, string[]> = {
  'soft-neutral': ['pastel', 'neutral'],
  'warm-rich': ['warm', 'bold'],
  jewel: ['jewel', 'bold'],
}

export type QuizGown = {
  slug: string
  categories: string[]
  cultureEdit: string
  styleTags: string[]
  colorFamily: string
  featured?: boolean | null
  displayOrder?: number | null
}

export function matchGowns<T extends QuizGown>(
  gowns: T[],
  answers: QuizAnswers,
): { matches: T[]; isFallback: boolean } {
  let pool = gowns

  if (answers.occasion && answers.occasion !== 'other') {
    pool = pool.filter((g) => g.categories.includes(answers.occasion as string))
  }
  if (answers.edit && answers.edit !== 'both') {
    pool = pool.filter((g) => g.cultureEdit === answers.edit)
  }

  const scored = pool
    .map((gown) => {
      let score = 0
      if (answers.style && gown.styleTags.includes(answers.style)) score += 2
      if (answers.mood && MOOD_FAMILIES[answers.mood].includes(gown.colorFamily)) score += 1
      return { gown, score }
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        Number(Boolean(b.gown.featured)) - Number(Boolean(a.gown.featured)) ||
        (a.gown.displayOrder ?? 99) - (b.gown.displayOrder ?? 99),
    )

  const strong = scored.filter((s) => s.score > 0).map((s) => s.gown)
  if (strong.length >= 3) return { matches: strong.slice(0, 6), isFallback: false }

  // Not enough strong matches - pad with the best of the filtered pool.
  const padded = [...strong, ...scored.map((s) => s.gown).filter((g) => !strong.includes(g))]
  if (padded.length > 0) return { matches: padded.slice(0, 6), isFallback: strong.length === 0 }

  // Hard filters excluded everything - show the whole collection instead.
  return { matches: gowns.slice(0, 6), isFallback: true }
}
