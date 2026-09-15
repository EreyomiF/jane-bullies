// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update prices, contact details and payments.
//  Everything on the site reads from here.
// ─────────────────────────────────────────────────────────────

export const BRAND = {
  name: 'Jane Bullies',
  tagline: 'Custom banners & logos for bully kennels',
}

// Leave a value as '' to hide that contact option on the site.
export const CONTACT = {
  instagram: 'janebullies',          // Instagram username, without the @
  email: 'hello@janebullies.com',    // where order requests are sent
  whatsapp: '',                      // international format, digits only, e.g. '15551234567'
  facebook: '',                      // full Facebook page URL
  tiktok: '',                        // TikTok username, without the @
}

export const PAYMENT_METHODS = ['PayPal', 'Apple Pay', 'Gift Cards']

export const CURRENCY = '$'

export const SERVICES = [
  {
    id: 'stud',
    name: 'Stud Banner',
    price: 30,
    blurb: 'Put your stud front and centre with a bold, themed banner built to stop the scroll.',
    features: [
      'One dog, cut out from your photo',
      'Custom themed background',
      "Your dog's name in statement lettering",
      'Kennel name & social handle added',
      'Sized for Instagram & Facebook',
    ],
    image: '/samples/stud-honeygram.jpg',
  },
  {
    id: 'breeding',
    name: 'Breeding Banner',
    price: 55,
    blurb: 'Announce a pairing with a cinematic sire × dam banner that gets people on your waitlist.',
    features: [
      'Two dogs, sire × dam',
      'Pairing title with custom lettering',
      'Full scene or location theme',
      'Kennel name & social handle added',
      'Sized for Instagram & Facebook',
    ],
    image: '/samples/breeding-crossova-ritalin-fire.jpg',
    featured: true,
  },
  {
    id: 'logo',
    name: 'Kennel Logo',
    price: 80,
    blurb: 'An illustrated mascot logo that makes your kennel instantly recognisable.',
    features: [
      'Illustrated mascot of your dog or breed',
      'Pencil sketch concept first',
      'Full-colour final artwork',
      'Custom kennel name lettering',
      'High-resolution files for print & web',
    ],
    image: '/samples/logo-dreamville.jpg',
  },
]

// Other banner types mentioned on the Jane Bullies flyer (quoted on request)
export const OTHER_BANNERS = ['Show banners', 'Pedigree banners', 'Offspring banners', 'Memorial tributes']
