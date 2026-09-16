import { useEffect } from 'react'
import { BRAND, CONTACT, CURRENCY, PAYMENT_METHODS } from '../config.js'
import { Check, ArrowRight, TikTok, Mail } from './Icons.jsx'

// Full-page confirmation shown after an order is sent successfully.
export default function ThankYou({ order, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0 })
    const prevTitle = document.title
    document.title = `Order received | ${BRAND.name}`
    return () => { document.title = prevTitle }
  }, [])

  const steps = [
    { title: 'We review your order', text: 'We check your photos and details to make sure we have everything we need.' },
    { title: 'You get an email from us', text: `We reply to ${order.email} with payment details (${PAYMENT_METHODS.join(', ')}).` },
    { title: 'Your design is delivered', text: 'Once payment is confirmed, we create your design and send you the finished artwork.' },
  ]

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-28 sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-60 left-1/2 h-[52rem] w-[52rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(16,185,129,0.18),transparent)]" />
        <div className="absolute -right-60 bottom-0 h-[40rem] w-[40rem] bg-[radial-gradient(closest-side,rgba(245,158,11,0.16),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-2xl text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500 text-ink shadow-[0_0_60px_-10px] shadow-emerald-500/70">
          <Check width="40" height="40" strokeWidth="3" />
        </span>

        <h1 className="mt-8 font-display text-5xl uppercase leading-none sm:text-6xl">
          Order <span className="text-gold-gradient">received!</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-300">
          Thank you{order.name ? `, ${order.name.split(' ')[0]}` : ''}! Your order is on its way to {BRAND.name}.
        </p>

        {/* Order summary */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-ink-2 p-6 text-left sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Your order</p>
              <p className="mt-1 text-xl font-extrabold">{order.design}</p>
              {order.title && <p className="text-zinc-400">{order.title}</p>}
            </div>
            <p className="font-display text-4xl text-gold-gradient">{CURRENCY}{order.price}</p>
          </div>

          <ol className="mt-6 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 font-bold text-gold">{i + 1}</span>
                <div>
                  <p className="font-bold">{s.title}</p>
                  <p className="text-sm text-zinc-400">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Don’t see our email? Check your spam folder, or write to us at{' '}
          <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1 font-semibold text-zinc-300 hover:text-gold">
            <Mail width="14" height="14" /> {CONTACT.email}
          </a>
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-extrabold text-ink transition hover:bg-yellow-300"
          >
            Back to home <ArrowRight className="transition group-hover:translate-x-1" />
          </button>
          {CONTACT.tiktok && (
            <a
              href={`https://www.tiktok.com/@${CONTACT.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-bold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              <TikTok /> Follow us on TikTok
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
