import { BRAND, CONTACT } from '../config.js'
import { Instagram, Mail, WhatsApp } from './Icons.jsx'

export default function Footer() {
  const links = [
    CONTACT.instagram && { href: `https://instagram.com/${CONTACT.instagram}`, label: `@${CONTACT.instagram}`, Icon: Instagram },
    CONTACT.email && { href: `mailto:${CONTACT.email}`, label: CONTACT.email, Icon: Mail },
    CONTACT.whatsapp && { href: `https://wa.me/${CONTACT.whatsapp}`, label: 'WhatsApp', Icon: WhatsApp },
    CONTACT.tiktok && { href: `https://tiktok.com/@${CONTACT.tiktok}`, label: `TikTok @${CONTACT.tiktok}` },
    CONTACT.facebook && { href: CONTACT.facebook, label: 'Facebook' },
  ].filter(Boolean)

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
        <div>
          <p className="font-display text-3xl uppercase">
            <span className="text-gold-gradient">Jane</span> Bullies
          </p>
          <p className="mt-1 text-sm text-zinc-500">{BRAND.tagline}</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {links.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-gold"
              >
                {Icon && <Icon />} {label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs text-zinc-600">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
