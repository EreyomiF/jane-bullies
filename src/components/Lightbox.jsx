import { useEffect } from 'react'
import { Close, ChevronLeft, ChevronRight } from './Icons.jsx'

export default function Lightbox({ items, index, labels, onClose, onChange }) {
  const item = items[index]
  const prev = () => onChange((index - 1 + items.length) % items.length)
  const next = () => onChange((index + 1) % items.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Close">
        <Close />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
        aria-label="Previous"
      >
        <ChevronLeft />
      </button>
      <figure className="max-h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.title} className="max-h-[80vh] w-auto rounded-xl object-contain" />
        <figcaption className="mt-3 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">{labels[item.category]}</span>
          <span className="block font-semibold text-white">{item.title}</span>
          <span className="text-xs text-zinc-500">{index + 1} / {items.length}</span>
        </figcaption>
      </figure>
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
        aria-label="Next"
      >
        <ChevronRight />
      </button>
    </div>
  )
}
