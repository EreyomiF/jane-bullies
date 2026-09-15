import { useEffect, useState } from 'react'
import { BRAND } from '../config.js'
import { Menu, Close } from './Icons.jsx'

const LINKS = [
  { href: '#pricing', label: 'Pricing' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'bg-ink/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="font-display text-2xl tracking-wide uppercase">
          <span className="text-gold-gradient">Jane</span> <span className="text-white">Bullies</span>
          <span className="sr-only">{BRAND.name} home</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-semibold text-zinc-300 transition hover:text-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#order"
            className="hidden rounded-full bg-gold px-5 py-2 text-sm font-extrabold text-ink transition hover:bg-yellow-300 sm:inline-block"
          >
            Order now
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-zinc-200 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 px-4 pb-6 md:hidden">
          <ul className="flex flex-col pt-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg font-semibold text-zinc-200 hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#order"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-gold py-3 text-center font-extrabold text-ink"
          >
            Order now
          </a>
        </div>
      )}
    </header>
  )
}
