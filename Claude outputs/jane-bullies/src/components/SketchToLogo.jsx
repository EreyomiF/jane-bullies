import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import { ArrowRight } from './Icons.jsx'

const LOGOS = [
  { name: 'Dreamville Kennels', sketch: '/samples/logo-dreamville-sketch.jpg', final: '/samples/logo-dreamville.jpg' },
  { name: 'Cuntreekennel84', sketch: '/samples/logo-cuntreekennel84-sketch.jpg', final: '/samples/logo-cuntreekennel84.jpg' },
]

export default function SketchToLogo() {
  const [active, setActive] = useState(0)
  const logo = LOGOS[active]

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-gold-2/15 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <div>
          <SectionHeading center={false} eyebrow="Kennel logos" title={<>From sketch to <span className="text-gold-gradient">signature</span></>}>
            Every logo starts as a hand-drawn pencil concept so you can see the layout before it’s brought to life
            in full colour, with detailed shading and custom kennel lettering.
          </SectionHeading>

          <div className="mt-8 flex flex-wrap gap-2">
            {LOGOS.map((l, i) => (
              <button
                key={l.name}
                onClick={() => setActive(i)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  i === active ? 'bg-gold text-ink' : 'border border-white/15 text-zinc-300 hover:text-white'
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>

          <a href="#order" className="mt-8 inline-flex items-center gap-2 font-bold text-gold hover:underline">
            Start your logo for $80 <ArrowRight />
          </a>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
          <figure>
            <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white">
              <img key={logo.sketch} src={logo.sketch} alt={`${logo.name} logo pencil sketch`} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-400">1 · Sketch</figcaption>
          </figure>
          <span className="rounded-full bg-gold p-2 text-ink sm:p-3">
            <ArrowRight />
          </span>
          <figure>
            <div className="aspect-square overflow-hidden rounded-2xl border border-gold/40 shadow-[0_0_50px_-15px] shadow-gold/50">
              <img key={logo.final} src={logo.final} alt={`${logo.name} final colour logo`} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-center text-xs font-bold uppercase tracking-wider text-gold">2 · Final</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
