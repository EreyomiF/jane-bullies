import { useMemo, useState } from 'react'
import { SAMPLES, CATEGORIES } from '../data/samples.js'
import SectionHeading from './SectionHeading.jsx'
import Lightbox from './Lightbox.jsx'
import Img from './Img.jsx'

const LABELS = { stud: 'Stud banner', breeding: 'Breeding banner', logo: 'Logo', custom: 'Custom' }

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [openIndex, setOpenIndex] = useState(null)

  const items = useMemo(
    () => (filter === 'all' ? SAMPLES : SAMPLES.filter((s) => s.category === filter)),
    [filter],
  )

  return (
    <section id="work" className="relative border-t border-white/5 bg-ink-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Portfolio" title={<>Recent <span className="text-neon-gradient">work</span></>}>
          Real designs made for kennels. Tap any piece to view it full size.
        </SectionHeading>

        <div role="tablist" aria-label="Filter work" className="mt-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const count = c.id === 'all' ? SAMPLES.length : SAMPLES.filter((s) => s.category === c.id).length
            const active = filter === c.id
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  active ? 'bg-white text-ink' : 'border border-white/10 text-zinc-300 hover:border-white/30 hover:text-white'
                }`}
              >
                {c.label} <span className={active ? 'text-zinc-500' : 'text-zinc-500'}>{count}</span>
              </button>
            )
          })}
        </div>

        <ul className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {items.map((item, i) => (
            <li key={item.src} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Img
                  src={item.src}
                  alt={`${item.title} – ${LABELS[item.category]}`}
                  loading="lazy"
                  className="h-auto w-full transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/90 to-transparent p-3 pt-10 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gold">{LABELS[item.category]}</p>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          labels={LABELS}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      )}
    </section>
  )
}
