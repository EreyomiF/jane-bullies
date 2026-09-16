import { useEffect, useRef, useState } from 'react'
import { SERVICES, CURRENCY, CONTACT, BRAND, PAYMENT_METHODS } from '../config.js'
import SectionHeading from './SectionHeading.jsx'
import { Check, Mail, WhatsApp, TikTok } from './Icons.jsx'

// Orders are delivered straight to CONTACT.email by FormSubmit (https://formsubmit.co),
// a free service that needs no account. The very first order triggers an
// "Activate Form" email to that inbox. Click the link once and every order after that arrives.
const FORM_ENDPOINT = `https://formsubmit.co/${CONTACT.email}`

const MAX_PHOTOS = 3
const MAX_TOTAL_MB = 10

const empty = { dog1: '', dog2: '', kennel: '', handle: '', theme: '', name: '', email: '', phone: '' }

const inputCls =
  'mt-1.5 w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-white placeholder:text-zinc-600 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

export default function OrderForm({ selected, onSelect }) {
  const [form, setForm] = useState(empty)
  const [photos, setPhotos] = useState([])
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [nextUrl, setNextUrl] = useState('')
  const photoInputs = useRef([])

  const service = SERVICES.find((s) => s.id === selected) ?? SERVICES[0]
  const isBreeding = service.id === 'breeding'
  const isLogo = service.id === 'logo'

  // After FormSubmit delivers the order it sends the customer back here with ?order=sent
  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.searchParams.get('order') === 'sent') {
      setSent(true)
      url.searchParams.delete('order')
      window.history.replaceState(null, '', url.pathname + url.search + '#order')
      setTimeout(() => document.getElementById('order')?.scrollIntoView(), 50)
    }
    setNextUrl(`${window.location.origin}${window.location.pathname}?order=sent#order`)
  }, [])

  const update = (e) => {
    const key = e.target.dataset.field
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const pickPhotos = (e) => {
    const files = Array.from(e.target.files || []).slice(0, MAX_PHOTOS)
    const totalMb = files.reduce((n, f) => n + f.size, 0) / 1024 / 1024
    if (totalMb > MAX_TOTAL_MB) {
      setErrors((er) => ({ ...er, photos: `Photos are too big (${totalMb.toFixed(1)} MB). Please keep the total under ${MAX_TOTAL_MB} MB.` }))
      e.target.value = ''
      setPhotos([])
      return
    }
    setErrors((er) => ({ ...er, photos: undefined }))
    setPhotos(files)
  }

  // Copy each chosen photo into its own named file input so FormSubmit attaches them all
  useEffect(() => {
    photoInputs.current.forEach((input, i) => {
      if (!input) return
      try {
        const dt = new DataTransfer()
        if (photos[i]) dt.items.add(photos[i])
        input.files = dt.files
      } catch {
        /* very old browsers: photos can be sent by email reply instead */
      }
    })
  }, [photos])

  const validate = () => {
    const er = {}
    if (!isLogo && !form.dog1.trim()) er.dog1 = 'Please add the dog’s name'
    if (isBreeding && !form.dog2.trim()) er.dog2 = 'Please add the second dog’s name'
    if (isLogo && !form.kennel.trim()) er.kennel = 'Please add your kennel name'
    if (!form.name.trim()) er.name = 'Please add your name'
    if (!isEmail(form.email)) er.email = 'Please add a valid email so we can reply'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = (e) => {
    if (!validate()) {
      e.preventDefault()
      return
    }
    setSending(true) // let the browser post the form to FormSubmit
  }

  const sendWhatsApp = () => {
    if (!validate()) return
    const msg = [
      `Hi ${BRAND.name}! I'd like to order a ${service.name} (${CURRENCY}${service.price}).`,
      isBreeding ? `Sire × Dam: ${form.dog1} × ${form.dog2}` : !isLogo && `Dog name: ${form.dog1}`,
      form.kennel && `Kennel name: ${form.kennel}`,
      form.handle && `Social handle: ${form.handle}`,
      form.theme && `Theme / ideas: ${form.theme}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  const orderTitle = isBreeding ? `${form.dog1} × ${form.dog2}` : isLogo ? form.kennel : form.dog1

  return (
    <section id="order" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 -bottom-40 h-[44rem] w-[44rem] bg-[radial-gradient(closest-side,rgba(192,38,211,0.2),transparent)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Order" title={<>Start your <span className="text-gold-gradient">order</span></>}>
          Fill this in, attach your photos and hit send. Your order comes straight to us and we’ll email you back with
          next steps and payment details.
        </SectionHeading>

        {sent ? (
          <div className="mt-12 rounded-3xl border border-emerald-500/40 bg-ink-2 p-8 text-center sm:p-12">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-ink">
              <Check width="32" height="32" />
            </span>
            <h3 className="mt-6 font-display text-4xl uppercase">Order received!</h3>
            <p className="mx-auto mt-3 max-w-md text-zinc-400">
              Thank you for choosing {BRAND.name}. We’ll reply to your email shortly with next steps and payment details
              ({PAYMENT_METHODS.join(', ')}).
            </p>
            <button
              type="button"
              onClick={() => { setSent(false); setForm(empty); setPhotos([]) }}
              className="mt-8 rounded-full border border-white/15 px-6 py-3 font-bold hover:border-gold hover:text-gold"
            >
              Place another order
            </button>
          </div>
        ) : (
          <form
            action={FORM_ENDPOINT}
            method="POST"
            encType="multipart/form-data"
            onSubmit={onSubmit}
            noValidate
            className="mt-12 rounded-3xl border border-white/10 bg-ink-2 p-5 sm:p-8"
          >
            {/* FormSubmit settings */}
            <input type="hidden" name="_subject" value={`New ${service.name} order${orderTitle ? ` – ${orderTitle}` : ''}`} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={nextUrl} />
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <input type="hidden" name="Design" value={`${service.name} (${CURRENCY}${service.price})`} />

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
                      <input type="radio" checked={active} onChange={() => onSelect(s.id)} className="sr-only" />
                      <span>
                        <span className="block font-bold">{s.name}</span>
                        <span className="font-display text-2xl text-gold">{CURRENCY}{s.price}</span>
                      </span>
                      <span className={`grid h-6 w-6 place-items-center rounded-full border ${active ? 'border-gold bg-gold text-ink' : 'border-white/20'}`}>
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
                    <input name={isBreeding ? 'Sire name' : 'Dog name'} data-field="dog1" value={form.dog1} onChange={update} placeholder={isBreeding ? 'e.g. Crossova' : 'e.g. Honeygram'} className={inputCls} />
                  </Field>
                )}
                {isBreeding && (
                  <Field label="Dam name" error={errors.dog2} required>
                    <input name="Dam name" data-field="dog2" value={form.dog2} onChange={update} placeholder="e.g. Ritalin" className={inputCls} />
                  </Field>
                )}
                <Field label="Kennel name" error={errors.kennel} required={isLogo}>
                  <input name="Kennel name" data-field="kennel" value={form.kennel} onChange={update} placeholder="e.g. Dreamville Kennels" className={inputCls} />
                </Field>
                <Field label="Your social handle to show on the design">
                  <input name="Social handle" data-field="handle" value={form.handle} onChange={update} placeholder="@yourkennel" className={inputCls} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Theme or ideas (optional)">
                    <textarea name="Theme ideas" data-field="theme" value={form.theme} onChange={update} rows={3} placeholder="e.g. fire & gold, neon city at night, casino, heaven gates…" className={inputCls} />
                  </Field>
                </div>

                {/* Photos */}
                <div className="sm:col-span-2">
                  <span className="text-sm font-semibold text-zinc-200">
                    Photos of your dog{isBreeding ? 's' : ''} <span className="font-normal text-zinc-500">(up to {MAX_PHOTOS}, optional)</span>
                  </span>
                  <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/20 bg-ink px-4 py-6 text-center transition hover:border-gold">
                    <span className="font-bold text-gold">Choose photos</span>
                    <span className="text-xs text-zinc-500">JPG or PNG · max {MAX_TOTAL_MB} MB total</span>
                    <input type="file" accept="image/*" multiple onChange={pickPhotos} className="sr-only" />
                  </label>
                  {photos.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {photos.map((p) => (
                        <li key={p.name + p.size} className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">{p.name}</li>
                      ))}
                    </ul>
                  )}
                  {errors.photos && <span className="mt-1 block text-xs font-semibold text-rose-400">{errors.photos}</span>}
                  {/* hidden inputs that actually carry the files */}
                  {Array.from({ length: MAX_PHOTOS }).map((_, i) => (
                    <input key={i} ref={(el) => (photoInputs.current[i] = el)} type="file" name={`Photo ${i + 1}`} disabled={!photos[i]} className="hidden" tabIndex={-1} aria-hidden="true" />
                  ))}
                </div>
              </div>
            </fieldset>

            {/* Contact */}
            <fieldset className="mt-8">
              <legend className="text-sm font-bold text-zinc-300">3. Your contact</legend>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                <Field label="Your name" error={errors.name} required>
                  <input name="Name" data-field="name" value={form.name} onChange={update} autoComplete="name" className={inputCls} />
                </Field>
                <Field label="Your email" error={errors.email} required>
                  <input type="email" name="email" data-field="email" value={form.email} onChange={update} autoComplete="email" placeholder="you@example.com" className={inputCls} />
                </Field>
                <Field label="Phone / WhatsApp (optional)">
                  <input type="tel" name="Phone" data-field="phone" value={form.phone} onChange={update} autoComplete="tel" className={inputCls} />
                </Field>
              </div>
            </fieldset>

            {/* Summary + actions */}
            <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-zinc-400">Order total</p>
                <p className="font-display text-5xl text-gold-gradient">{CURRENCY}{service.price}</p>
                <p className="text-xs text-zinc-500">Payment via {PAYMENT_METHODS.join(' · ')}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 font-extrabold text-ink transition hover:bg-yellow-300 disabled:cursor-wait disabled:opacity-70"
                >
                  <Mail /> {sending ? 'Sending order…' : 'Send order'}
                </button>
                {CONTACT.whatsapp && (
                  <button type="button" onClick={sendWhatsApp} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 font-extrabold text-ink transition hover:bg-emerald-400">
                    <WhatsApp /> WhatsApp
                  </button>
                )}
              </div>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-zinc-400">
          Prefer email? Write to us at{' '}
          <a href={`mailto:${CONTACT.email}`} className="font-bold text-white hover:text-gold">{CONTACT.email}</a>
          {CONTACT.tiktok && (
            <>
              {' '}· See our latest designs on{' '}
              <a href={`https://www.tiktok.com/@${CONTACT.tiktok}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-white hover:text-gold">
                <TikTok width="16" height="16" /> TikTok
              </a>
            </>
          )}
        </p>
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
