import sizes from '../data/imageSizes.json'

// Serves a small WebP thumbnail (public/samples/thumbs) instead of the full JPG,
// and sets width/height so the page doesn't jump around while images load.
// Pass full to load the original full-size image (used in the lightbox).
export const thumbSrc = (src) => src.replace('/samples/', '/samples/thumbs/').replace(/\.jpe?g$/i, '.webp')

export default function Img({ src, full = false, alt = '', loading = 'lazy', ...rest }) {
  const name = src.split('/').pop().replace(/\.\w+$/, '')
  const [w, h] = sizes[name] ?? []
  return (
    <img
      src={full ? src : thumbSrc(src)}
      alt={alt}
      width={w}
      height={h}
      loading={loading}
      decoding="async"
      {...rest}
    />
  )
}
