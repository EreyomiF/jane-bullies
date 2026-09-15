import { SERVICES, CURRENCY } from '../config.js'
import { ArrowRight, Sparkle } from './Icons.jsx'

const stack = [
  { src: '/samples/stud-secret.jpg', alt: 'Secret stud banner', cls: 'left-0 top-10 w-[46%] [--r:-7deg] z-10', delay: '0s' },
  { src: '/samples/breeding-crossova-ritalin-fire.jpg', alt: 'Crossova x Ritalin breeding banner', cls: 'left-[22%] top-0 w-[56%] [--r:0deg] z-20', delay: '1.2s' },
  { src: '/samples/stud-honeygram.jpg', alt: 'Honeygram stud banner', cls: 'right-0 top-14 w-[46%] [--r:7deg] z-10', delay: '2.4s' },
]

export default function Hero() {
  const from = Math.min(...SERVICES.map((s) => s.price))

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      {/* glow background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-neon/25 blur-[140px]" />
        <div className="absolute top-60 -right-32 h-[26rem] w-[26rem] rounded-full bg-gold-2/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-neon-2/40 bg-neon/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
            <Sparkle className="text-gold" /> Banners · Logos · Kennel branding
          </p>

          <h1 className="mt-6 font-display text-5xl leading-[0.95] uppercase sm:text-6xl lg:text-7xl">
            Make your bullies
            <span className="block text-gold-gradient">look legendary</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-zinc-300">
            Custom stud banners, breeding banners and kennel logos with cinematic scenes, bold lettering
            and your kennel name on every piece. Send your photos, pick a vibe, and we’ll handle the rest.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#order"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-extrabold text-ink shadow-[0_0_40px_-8px] shadow-gold/60 transition hover:bg-yellow-300"
            >
              Order your banner <ArrowRight className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 font-bold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              See the work
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {SERVICES.map((s) => (
              <div key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{s.name}</dt>
                <dd className="mt-1 font-display text-3xl text-gold">
                  {CURRENCY}
                  {s.price}
                </dd>
              </div>
            ))}
          </dl>
          <p className="sr-only">Prices start from {CURRENCY}{from}.</p>
        </div>

        {/* Banner stack */}
        <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">
          {stack.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              style={{ animationDelay: img.delay }}
              className={`animate-float absolute rounded-2xl border border-white/10 shadow-2xl shadow-black/70 ${img.cls}`}
              loading="eager"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
