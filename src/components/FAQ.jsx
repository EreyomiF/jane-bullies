import { useState } from 'react'
import { PAYMENT_METHODS, OTHER_BANNERS } from '../config.js'
import SectionHeading from './SectionHeading.jsx'
import { Plus } from './Icons.jsx'

const QA = [
  {
    q: 'What photos should I send?',
    a: 'Clear, well-lit photos where your dog’s full body is visible work best. Straight-on or slightly angled shots with the dog standing or sitting give the strongest result.',
  },
  {
    q: 'Can I choose the theme or background?',
    a: 'Yes. Tell us the vibe you want (fire, gold, neon, city skyline, casino, heaven gates, anything) and we’ll build the scene around your dog.',
  },
  {
    q: 'How do I pay?',
    a: `We accept ${PAYMENT_METHODS.join(', ')}. Payment details are shared once we confirm your order.`,
  },
  {
    q: 'Do you make other types of banners?',
    a: `Yes. We also design ${OTHER_BANNERS.map((b) => b.toLowerCase()).join(', ')}. Send us a message with what you have in mind for a quote.`,
  },
  {
    q: 'How long does it take?',
    a: 'Turnaround depends on how busy the queue is. Message us and we’ll give you an up-to-date delivery time before you pay.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="border-t border-white/5 bg-ink-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions" />
        <ul className="mt-12 divide-y divide-white/10 rounded-3xl border border-white/10 bg-ink">
          {QA.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold sm:px-6"
                >
                  {item.q}
                  <Plus className={`shrink-0 text-gold transition ${isOpen ? 'rotate-45' : ''}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <p className="overflow-hidden px-5 text-zinc-400 sm:px-6">
                    <span className="block pb-5">{item.a}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
