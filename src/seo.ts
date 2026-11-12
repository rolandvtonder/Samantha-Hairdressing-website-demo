import {SITE_URL, business, faqs, fullAddress, hours, services} from './content';

export type RouteMeta = {path: string; title: string; description: string; crumb: string; image?: string};

/** One entry per page. Titles keep the main search phrase first and stay under ~60 characters;
 *  descriptions stay under ~155 characters. */
export const routes: RouteMeta[] = [
  {
    path: '/',
    crumb: 'Home',
    title: 'Hair Salon in Kempton Park | Samantha Hairdressing',
    description: 'Colour, balayage, blondes, cuts, blow waves and nails at Samantha Hairdressing, 211 Monument Road, Glen Marais, Kempton Park. Book on WhatsApp.',
  },
  {
    path: '/services/',
    crumb: 'Services',
    title: 'Hair Colour, Balayage & Cuts in Kempton Park | Services',
    description: 'Cuts, blow waves, full colour, balayage, highlights, blonding, colour correction, treatments and gel or acrylic nails in Glen Marais, Kempton Park.',
  },
  {
    path: '/gallery/',
    crumb: 'Gallery',
    title: 'Hair Transformations Gallery | Samantha Hairdressing',
    description: 'Before-and-after hair transformations from our Kempton Park salon: balayage, platinum and ash blondes, colour corrections, pixie cuts and more.',
  },
  {
    path: '/about/',
    crumb: 'About & team',
    title: 'About Samantha & the Team | Kempton Park Hairdresser',
    description: 'Meet Samantha, qualified at The Rene Institute of Beauty Therapy in 2011, and the team. A judgement-free salon in Glen Marais, Kempton Park.',
  },
  {
    path: '/specials-reviews/',
    crumb: 'Specials & reviews',
    title: 'Salon Specials & Reviews | Samantha Hairdressing',
    description: 'Current salon specials: gel or acrylic overlay + toes from R500, 5 blow waves for R850, gel overlay R300. Read what our Kempton Park clients say.',
  },
  {
    path: '/contact/',
    crumb: 'Contact & booking',
    title: 'Book a Hair Appointment | Contact Samantha Hairdressing',
    description: 'Book on WhatsApp or call 083 254 2414. Find us at 211 Monument Road, Glen Marais, Kempton Park 1619 — opening hours, map and directions.',
  },
];

export const notFound: RouteMeta = {
  path: '/404',
  crumb: 'Not found',
  title: 'Page not found | Samantha Hairdressing',
  description: 'This page could not be found. Visit Samantha Hairdressing in Glen Marais, Kempton Park.',
};

export const normalize = (p: string) => {
  const clean = p.replace(/index\.html$/, '').split(/[?#]/)[0];
  return clean.endsWith('/') ? clean : `${clean}/`;
};
export const findRoute = (p: string) => routes.find((r) => r.path === normalize(p)) ?? notFound;

const abs = (p: string) => `${SITE_URL}${p}`;

const salon = () => ({
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  '@id': `${SITE_URL}/#salon`,
  name: business.name,
  description: 'Hair salon in Glen Marais, Kempton Park offering hair colour, balayage, blonding, cuts, blow waves, treatments and nails.',
  url: abs('/'),
  telephone: business.phoneIntl,
  image: [abs('/og-image.jpg'), abs('/media/salon-interior-stations-1280.webp')],
  logo: abs('/icon-512.png'),
  priceRange: 'R',
  currenciesAccepted: 'ZAR',
  knowsLanguage: business.languages,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    addressLocality: `${business.suburb}, ${business.city}`,
    addressRegion: business.province,
    postalCode: business.postcode,
    addressCountry: business.country,
  },
  areaServed: ['Kempton Park', 'Glen Marais', 'Birchleigh', 'Edleen', 'Norkem Park', 'Bonaero Park', 'East Rand'].map((name) => ({'@type': 'Place', name})),
  hasMap: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`,
  sameAs: [business.facebook, business.instagram].filter(Boolean),
  founder: {'@type': 'Person', name: business.owner, alumniOf: {'@type': 'EducationalOrganization', name: business.training.school}},
  openingHoursSpecification: hours
    .filter((h) => h.open && h.close)
    .map((h) => ({'@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.open, closes: h.close})),
  contactPoint: {'@type': 'ContactPoint', telephone: business.phoneIntl, contactType: 'reservations', availableLanguage: business.languages},
});

const breadcrumbs = (r: RouteMeta) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {'@type': 'ListItem', position: 1, name: 'Home', item: abs('/')},
    ...(r.path === '/' ? [] : [{'@type': 'ListItem', position: 2, name: r.crumb, item: abs(r.path)}]),
  ],
});

const catalog = () => ({
  '@type': 'OfferCatalog',
  name: 'Hair and nail services',
  itemListElement: services.map((g) => ({
    '@type': 'OfferCatalog',
    name: g.title.join(' ').replace(' &', ' and'),
    itemListElement: g.items.map((s) => ({
      '@type': 'Offer',
      itemOffered: {'@type': 'Service', name: s.name, description: s.text, provider: {'@id': `${SITE_URL}/#salon`}, areaServed: 'Kempton Park'},
    })),
  })),
});

const faqPage = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({'@type': 'Question', name: f.q, acceptedAnswer: {'@type': 'Answer', text: f.a}})),
});

const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: business.name,
  url: abs('/'),
  inLanguage: 'en-ZA',
  publisher: {'@id': `${SITE_URL}/#salon`},
});

export function schemaFor(r: RouteMeta): object[] {
  // The service menu hangs off the salon itself so Google ties each service to the business.
  const out: object[] = [r.path === '/services/' ? {...salon(), hasOfferCatalog: catalog()} : salon()];
  if (r.path === '/') out.push(website());
  else out.push(breadcrumbs(r));
  if (r.path === '/services/') out.push(faqPage());
  if (r.path === '/contact/') out.push(faqPage());
  return out;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Everything that goes in <head> for one page, as an HTML string. */
export function headFor(r: RouteMeta): string {
  const url = abs(r.path === '/404' ? '/' : r.path);
  const img = abs(r.image ?? '/og-image.jpg');
  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    r.path === '/404' ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    // Demo builds stay out of Google so they never compete with the real domain later.
    ...(import.meta.env.VITE_NOINDEX === '1' && r.path !== '/404' ? ['<meta name="robots" content="noindex" />'] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(business.name)}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Samantha Hairdressing, hair salon in Kempton Park" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    ...schemaFor(r).map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`),
  ];
  return tags.join('\n    ');
}
