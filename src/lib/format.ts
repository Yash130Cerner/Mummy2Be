/** Pricing is always unambiguous: “$X / 5-day rental”. */
export const formatPrice = (amount: number) => `$${amount}`

export const price5 = (amount: number) => `${formatPrice(amount)} / 5-day rental`
export const price10 = (amount: number) => `${formatPrice(amount)} / 10-day rental`

/** Compact card pattern: “$50 / 5-day, $65 / 10-day”. */
export const cardPrice = (p5: number, p10: number) =>
  `${formatPrice(p5)} / 5-day, ${formatPrice(p10)} / 10-day`
