import type { Gown } from '@/payload-types'

/**
 * Editorial art treatment shown wherever a gown has no photography yet -
 * a soft two-tone wash in the gown’s own colour, with its name set in serif.
 * Keeps the catalogue composed and premium until the real photos are uploaded.
 */
export type GownArt = { from: string; to: string; dark: boolean }

const BY_SLUG: Record<string, GownArt> = {
  'ruby-royale': { from: '#6E2320', to: '#9E4038', dark: true },
  'scarlet-dream': { from: '#8A2C26', to: '#C05548', dark: true },
  'sunset-goddess': { from: '#A96A52', to: '#DDB49A', dark: true },
  'verdant-vogue': { from: '#31473A', to: '#5F7A62', dark: true },
  'sapphire-serenity': { from: '#263A54', to: '#4E6D8F', dark: true },
  'pink-radiance': { from: '#B14E71', to: '#E39CB2', dark: true },
  'midnight-majesty': { from: '#231D18', to: '#4A4038', dark: true },
  'versatile-charcoal': { from: '#3E3833', to: '#7B726A', dark: true },
  'blush-elegance': { from: '#D9AFA4', to: '#F0DCD2', dark: false },
  'petal-princess': { from: '#DCB4AC', to: '#F3E0DA', dark: false },
  'enchanted-rose': { from: '#D3A49E', to: '#EFDAD4', dark: false },
  'alpine-glow': { from: '#E4D9C4', to: '#F7F1E5', dark: false },
  'celestial-grace': { from: '#9FB4C4', to: '#DCE6EC', dark: false },
}

const BY_FAMILY: Record<string, GownArt> = {
  neutral: { from: '#B9AB97', to: '#E9DFCE', dark: false },
  pastel: { from: '#D9BDB4', to: '#F1E3DB', dark: false },
  warm: { from: '#B07A5F', to: '#E2C2AB', dark: true },
  jewel: { from: '#3C5150', to: '#6C8583', dark: true },
  bold: { from: '#7E3330', to: '#B25A50', dark: true },
}

const FALLBACK: GownArt = { from: '#D9BDB4', to: '#F1E3DB', dark: false }

export function gownArt(gown: Pick<Gown, 'slug' | 'colorFamily'>): GownArt {
  return BY_SLUG[gown.slug] ?? BY_FAMILY[gown.colorFamily] ?? FALLBACK
}
