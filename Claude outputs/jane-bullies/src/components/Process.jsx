import { PAYMENT_METHODS } from '../config.js'
import SectionHeading from './SectionHeading.jsx'

const STEPS = [
  { n: '01', title: 'Pick your design', text: 'Choose a stud banner, breeding banner or kennel logo.' },
  { n: '02', title: 'Send your details', text: 'Share clear photos of your dog(s), names, kennel name, handle and any theme ideas.' },
  { n: '03', title: 'Make payment', text: `Pay securely with ${PAYMENT_METHODS.slice(0, -1).join(', ')} or ${PAYMENT_METHODS.at(-1)}.` },
  { n: '04', title: 'Get your design', text: 'Receive your finished artwork, ready to post and promote your kennel.' },
]

export default function Process() {
  return (
    <section id="process" className="border-y border-white/5 bg-ink-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How it works" title={<>Four easy <span className="text-neon-gradient">steps</span></>} />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="relative rounded-3xl border border-white/10 bg-ink p-6">
              <span className="font-display text-5xl text-gold-gradient">{s.n}</span>
              <h3 className="mt-4 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">We accept</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {PAYMENT_METHODS.map((p) => (
              <li key={p} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-zinc-200">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
