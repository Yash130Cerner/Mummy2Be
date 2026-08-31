/**
 * Editorial art hero - soft drape-like arcs in blush, champagne and mauve.
 * Shown until the real hero photography is uploaded to the “home” page entry
 * in the CMS, at which point the homepage switches to full-bleed photography.
 */
export function HeroArt({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <radialGradient id="hero-blush" cx="72%" cy="28%" r="55%">
          <stop offset="0%" stopColor="#E7D2CC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E7D2CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-mauve" cx="18%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#C6ACB3" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C6ACB3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-champagne" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1E8DA" stopOpacity="0" />
          <stop offset="100%" stopColor="#F1E8DA" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      <rect width="1200" height="720" fill="#FAF6EF" />
      <circle cx="864" cy="202" r="420" fill="url(#hero-blush)" />
      <circle cx="216" cy="576" r="380" fill="url(#hero-mauve)" />

      {/* Sweeping drape curves */}
      <path
        d="M-40 620 C 260 520, 420 640, 640 560 C 860 480, 980 560, 1240 470"
        fill="none"
        stroke="#C6ACB3"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path
        d="M-40 660 C 280 570, 460 690, 700 600 C 920 520, 1040 600, 1240 520"
        fill="none"
        stroke="#BF9A54"
        strokeWidth="1.2"
        opacity="0.45"
      />
      <path
        d="M760 -40 C 700 160, 820 260, 780 420 C 750 540, 640 600, 660 760"
        fill="none"
        stroke="#E7D2CC"
        strokeWidth="2"
        opacity="0.8"
      />

      {/*
        Deliberately no figure here. An abstract bump silhouette used to sit
        in this space and read as a heavy blob rather than the intended
        "barely-there" accent. The hero is atmosphere only - gradients, drape
        curves and gold accents - so the headline stays the subject.
      */}
      <rect y="520" width="1200" height="200" fill="url(#hero-champagne)" />
      <circle cx="1030" cy="120" r="4" fill="#BF9A54" opacity="0.7" />
      <circle cx="150" cy="180" r="3" fill="#BF9A54" opacity="0.5" />
    </svg>
  )
}
