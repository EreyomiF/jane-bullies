import { useState } from 'react'
import { SERVICES, CURRENCY, CONTACT, BRAND, PAYMENT_METHODS } from '../config.js'
import SectionHeading from './SectionHeading.jsx'
import { Check, Mail, WhatsApp, Instagram } from './Icons.jsx'

const empty = {
  dog1: '',
  dog2: '',
  kennel: '',
  handle: '',
  theme: '',
  name: '',
  reply: '',
}

const inputCls =
  'mt-1.5 w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-white placeholder:text-zinc-600 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'

export default function OrderForm({ selected, onSelect }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const service = SERVICES.find((s) => s.id === selected) ?? SERVICES[0]
  const isBreeding = service.id === 'breeding'
  const isLogo = service.id === 'logo'

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!isLogo && !form.dog1.trim()) er.dog1 = 'Please add the dog’s name'
    if (isBreeding && !form.dog2.trim()) er.dog2 = 'Please add the second dog’s name'
    if (isLogo && !form.kennel.trim()) er.kennel = 'Please add your kennel name'
    if (!form.name.trim()) er.name = 'Please add your name'
    if (!form.reply.trim()) er.reply = 'Tell us how to reach you'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const buildMessage = () => {
    const lines = [
      `Hi ${BRAND.name}! I'd like to order a ${service.name} (${CURRENCY}${service.price}).`,
      '',
      isBreeding ? `Sire × Dam: ${form.dog1} × ${form.dog2}` : !isLogo ? `Dog name: ${form.dog1}` : null,
      form.kennel && `Kennel name: ${form.kennel}`,
      form.handle && `Social handle to show: ${form.handle}`,
      form.theme && `Theme / ideas: ${form.theme}`,
      '',
      `My name: ${form.name}`,
      `Contact me at: ${form.reply}`,
      '',
      "I'll send my photos in this chat.",
    ]
    return lines.filter((l) => l !== null && l !== undefined && l !== false).join('\n')
  }

  const withValid = (fn) => (e) => {
    e?.preventDefault()
    if (!validate()) {
      setStatus('')
      return
    }
    fn(buildMessage())
  }

  const sendEmail = withValid((msg) => {
    const subject = `${service.name} order – ${form.kennel || form.dog1 || form.name}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`
    setStatus('Your email app should open with the order filled in. Attach your photos and hit send.')
  })

  const sendWhatsApp = withValid((msg) => {
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    setStatus('WhatsApp opened with your order. Send it along with your photos.')
  })

  const sendInstagram = withValid(async (msg) => {
    try {
      await navigator.clipboard.writeText(msg)
      setStatus('Order copied! Paste it into the Instagram DM that just opened, then send your photos.')
    } catch {
      setStatus('Instagram opened. Send us a DM with your order details and photos.')
    }
    window.open(`https://ig.me/m/${CONTACT.instagram}`, '_blank', 'noopener')
  })

  return (
    <section id="order" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-neon/20 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Order" title={<>Start your <span className="text-gold-gradient">order</span></>}>
          Fill this in and send it to us by email{CONTACT.whatsapp ? ', WhatsApp' : ''}
          {CONTACT.instagram ? ' or Instagram DM' : ''}. We’ll reply with next steps and payment details.
        </SectionHeading>

        <form onSubmit={sendEmail} noValidate className="mt-12 rounded-3xl border border-white/10 bg-ink-2/80 p-5 backdrop-blur sm:p-8">
          {/* Service picker */}
          <fieldset>
            <legend className="text-sm font-bold text-zinc-300">1. What do you need?</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {SERVICES.map((s) => {
                const active = s.id === service.id
                return (
                  <label
                    key={s.id}
                    className={`relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                      active ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={s.id}
                      checked={active}
                      onChange={() => onSelect(s.id)}
                      className="sr-only"
                    />
                    <span>
                      <span className="block font-bold">{s.name}</span>
                      <span className="font-display text-2xl text-gold">
                        {CURRENCY}
                        {s.price}
                      </span>
                    </span>
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full border ${
                        active ? 'border-gold bg-gold text-ink' : 'border-white/20'
                      }`}
                    >
                      {active && <Check width="14" height="14" />}
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          {/* Design details */}
          <fieldset className="mt-8">
            <legend className="text-sm font-bold text-zinc-300">2. Design details</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {!isLogo && (
                <Field label={isBreeding ? 'Sire name' : 'Dog name'} error={errors.dog1} required>
                  <input name="dog1" value={form.dog1} onChange={update} placeholder={isBreeding ? 'e.g. Crossova' : 'e.g. Honeygram'} className={inputCls} />
                </Field>
              )}
              {isBreeding && (
                <Field label="Dam name" error={errors.dog2} required>
                  <input name="dog2" value={form.dog2} onChange={update} placeholder="e.g. Ritalin" className={inputCls} />
                </Field>
              )}
              <Field label="Kennel name" error={errors.kennel} required={isLogo}>
                <input name="kennel" value={form.kennel} onChange={update} placeholder="e.g. Dreamville Kennels" className={inputCls} />
              </Field>
              <Field label="Instagram / social handle to show">
                <input name="handle" value={form.handle} onChange={update} placeholder="@yourkennel" className={inputCls} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Theme or ideas (optional)">
                  <textarea
                    name="theme"
                    value={form.theme}
                    onChange={update}
                    rows={3}
                    placeholder="e.g. fire & gold, neon city at night, casino, heaven gates…"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
          </fieldset>

          {/* Contact */}
          <fieldset className="mt-8">
            <legend className="text-sm font-bold text-zinc-300">3. Your contact</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Field label="Your name" error={errors.name} required>
                <input name="name" value={form.name} onChange={update} autoComplete="name" className={inputCls} />
              </Field>
              <Field label="Email, phone or Instagram" error={errors.reply} required>
                <input name="reply" value={form.reply} onChange={update} placeholder="How should we reply?" className={inputCls} />
              </Field>
            </div>
          </fieldset>

          {/* Summary + actions */}
          <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-zinc-400">Order total</p>
              <p className="font-display text-5xl text-gold-gradient">
                {CURRENCY}
                {service.price}
              </p>
              <p className="text-xs text-zinc-500">Payment via {PAYMENT_METHODS.join(' · ')}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {CONTACT.email && (
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-extrabold text-ink transition hover:bg-yellow-300">
                  <Mail /> Send by email
                </button>
              )}
              {CONTACT.whatsapp && (
                <button type="button" onClick={sendWhatsApp} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 font-extrabold text-ink transition hover:bg-emerald-400">
                  <WhatsApp /> WhatsApp
                </button>
              )}
              {CONTACT.instagram && (
                <button type="button" onClick={sendInstagram} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-3.5 font-extrabold text-white transition hover:brightness-110">
                  <Instagram /> Instagram DM
                </button>
              )}
            </div>
          </div>

          <p role="status" aria-live="polite" className={`mt-4 text-sm ${status ? 'text-emerald-400' : 'sr-only'}`}>
            {status}
          </p>
        </form>
      </div>
    </section>
  )
}

function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-zinc-200">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-semibold text-rose-400">{error}</span>}
    </label>
  )
}
