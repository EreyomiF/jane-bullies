const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Check = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M20 6 9 17l-5-5" /></svg>
)
export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
)
export const Close = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
)
export const ChevronLeft = (p) => (
  <svg viewBox="0 0 24 24" width="28" height="28" {...base} {...p}><path d="m15 18-6-6 6-6" /></svg>
)
export const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" width="28" height="28" {...base} {...p}><path d="m9 18 6-6-6-6" /></svg>
)
export const Plus = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
)
export const Menu = (p) => (
  <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const TikTok = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...p}>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.4-2.47V9.68a5.73 5.73 0 0 0-.8-.06 5.7 5.7 0 0 0-5.7 5.7 5.7 5.7 0 0 0 5.7 5.68 5.7 5.7 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48z" />
  </svg>
)
export const Mail = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const WhatsApp = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M3 21l1.7-4.6A8.5 8.5 0 1 1 8 19.6L3 21z" /><path d="M9 9.5c.3 2 2.5 4.3 4.5 4.8l1.3-1.2 1.9.9-.4 1.6c-3.6.4-7.7-3.6-7.5-7.3l1.6-.4.9 1.9L9 9.5z" />
  </svg>
)
export const Sparkle = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" /></svg>
)
