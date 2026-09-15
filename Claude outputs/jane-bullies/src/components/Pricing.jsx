import { SERVICES, CURRENCY } from '../config.js'
import SectionHeading from './SectionHeading.jsx'
import { Check, ArrowRight } from './Icons.jsx'

export default function Pricing({ onChoose }) {
  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Pricing" title={<>Simple, flat <span className="text-gold-gradient">prices</span></>}>
          One price per design. No hidden fees. Pick what you need and send your photos.
        </SectionHeading>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.id}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-ink-2 transition hover:-translate-y-1 ${
                s.featured
                  ? 'border-gold/60 shadow-[0_0_60px_-15px] shadow-gold/40'
                  : 'border-white/10 hover:border-white/25'
              }`}
            >
              {s.featured && (
                <span className="absolute top-4 right-4 z-10 rounded-full bg-gold px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-ink">
                  Most popular
                </span>
              )}

              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={`${s.name} example`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/10 to-transparent" />
              </div>

              <div className="relative -mt-10 flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="font-display text-3xl uppercase tracking-wide">{s.name}</h3>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-6xl text-gold-gradient">
                    {CURRENCY}
                    {s.price}
                  </span>
                  <span className="text-sm text-zinc-400">/ design</span>
                </p>
                <p className="mt-3 text-sm text-zinc-400">{s.blurb}</p>

                <ul className="mt-6 space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-zinc-200">
                      <span className="mt-0.5 rounded-full bg-gold/15 p-0.5 text-gold">
                        <Check width="14" height="14" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onChoose(s.id)}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-extrabold transition ${
                    s.featured
                      ? 'bg-gold text-ink hover:bg-yellow-300'
                      : 'border border-white/15 text-white hover:border-gold hover:text-gold'
                  }`}
                >
                  Order {s.name} <ArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
