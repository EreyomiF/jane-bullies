import { OTHER_BANNERS } from '../config.js'
import { Sparkle } from './Icons.jsx'

const words = ['Stud banners', 'Breeding banners', 'Kennel logos', ...OTHER_BANNERS]

export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-neon/20 via-ink-2 to-gold-2/20 py-4">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 pr-10">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl uppercase tracking-wide text-white/90">
            {w} <Sparkle className="text-gold" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}
