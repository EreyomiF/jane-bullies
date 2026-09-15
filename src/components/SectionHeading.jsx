export default function SectionHeading({ eyebrow, title, children, center = true }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-400">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-zinc-400">{children}</p>}
    </div>
  )
}
