/**
 * All copy and business details live here. Edit this file to change
 * anything on the site; every page reads from it.
 *
 * Items marked  TODO(owner)  are placeholders or guesses — please confirm them.
 */

/** The live address of the site. Used for canonical links, the sitemap and
 *  social cards. TODO(owner): change to your real domain before launch
 *  The GitHub Pages demo build sets VITE_SITE_URL to its own address instead. */
export const SITE_URL: string = import.meta.env.VITE_SITE_URL || 'https://www.samanthahairdressing.co.za';

export const business = {
  name: 'Samantha Hairdressing',
  short: 'Samantha',
  tagline: 'Hair salon in Glen Marais, Kempton Park',
  owner: 'Samantha',
  phone: '083 254 2414',
  phoneIntl: '+27832542414',
  whatsapp: '27832542414',
  street: '211 Monument Road',
  suburb: 'Glen Marais',
  city: 'Kempton Park',
  province: 'Gauteng',
  postcode: '1619',
  country: 'ZA',
  languages: ['English', 'Afrikaans'],
  facebook: 'https://www.facebook.com/Samanthahairdressingjhb',
  facebookReviews: 'https://www.facebook.com/Samanthahairdressingjhb/reviews',
  // TODO(owner): add your Instagram profile URL here and it will appear in the menu and footer.
  instagram: '',
  training: {school: 'The Rene Institute of Beauty Therapy', year: 2011},
};

export const fullAddress = `${business.street}, ${business.suburb}, ${business.city}, ${business.postcode}`;
export const mapsQuery = encodeURIComponent(`${business.street}, ${business.suburb}, ${business.city}, ${business.postcode}, South Africa`);
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

/** WhatsApp chat link with an optional pre-filled message. */
export const wa = (text = "Hi Samantha, I'd like to book an appointment.") =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;

/** Opening hours. TODO(owner): placeholder — replace with your real hours.
 *  `days` use schema.org names so Google can read them. */
export const hours: {label: string; days: string[]; open: string | null; close: string | null}[] = [
  {label: 'Monday', days: ['Monday'], open: null, close: null},
  {label: 'Tuesday – Friday', days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], open: '08:00', close: '17:00'},
  {label: 'Saturday', days: ['Saturday'], open: '08:00', close: '13:00'},
  {label: 'Sunday', days: ['Sunday'], open: null, close: null},
];

/** Her own words, from the salon's Facebook page. */
export const pledge = {
  lead: 'My chair is a safe space for women of all walks of life.',
  lines: ['No racism.', 'No homophobia.', 'No bashing religion, life choices, or bank balances.'],
  close: 'Come as you are — just bring kindness. I’ll handle the hair.',
};

export const nav = [
  {href: '/', label: 'Home'},
  {href: '/services/', label: 'Services'},
  {href: '/gallery/', label: 'Gallery'},
  {href: '/about/', label: 'About & team'},
  {href: '/specials-reviews/', label: 'Specials & reviews'},
  {href: '/contact/', label: 'Contact & booking'},
];

/** Headline lines; `i` lines are set in italic. */
export type Line = {t: string; i?: boolean};

export const home = {
  eyebrow: 'Samantha Hairdressing · Kempton Park',
  lines: [{t: 'Come as you'}, {t: 'are.', i: true}, {t: 'Leave feeling'}, {t: 'beautiful.', i: true}] as Line[],
  body: 'A warm, welcoming hair salon in Glen Marais, Kempton Park. Colour, balayage, blondes, cuts and blow waves — plus nails — by a stylist trained since 2011.',
  trio: [
    {
      id: 'colour',
      name: ['Colour &', 'Balayage'] as [string, string],
      img: 'copper-balayage-curls',
      alt: 'Copper and chocolate balayage styled into soft curls at Samantha Hairdressing',
      specs: [['Speciality', 'Balayage · ombré · full colour'], ['Ideal for', 'Rich, lived-in colour']],
      href: '/services/#colour',
    },
    {
      id: 'blonde',
      name: ['Blondes &', 'Highlights'] as [string, string],
      img: 'icy-blonde-curls',
      alt: 'Icy blonde highlights with glossy curls finished in the salon',
      specs: [['Speciality', 'Foils · toning · platinum'], ['Ideal for', 'Bright, cool or golden blonde']],
      href: '/services/#colour',
    },
    {
      id: 'cuts',
      name: ['Cuts &', 'Blow waves'] as [string, string],
      img: 'textured-pixie-cut',
      alt: 'Textured short pixie cut with copper tones, seen from behind',
      specs: [['Speciality', 'Restyles · pixies · layers'], ['Ideal for', 'Fresh shape, easy styling']],
      href: '/services/#cuts',
    },
  ],
};

export type Service = {name: string; text: string};
export type ServiceGroup = {id: string; title: [string, string]; intro: string; img: string; alt: string; items: Service[]};

/** Service menu. Prices are given on enquiry over WhatsApp.
 *  TODO(owner): these are based on the work in your photos — add, remove or rename freely. */
export const services: ServiceGroup[] = [
  {
    id: 'cuts',
    title: ['Cuts &', 'Styling'],
    intro: 'Precision cuts that suit your face, your hair and the time you actually have in the morning.',
    img: 'textured-pixie-cut-back',
    alt: 'Back view of a short textured pixie cut with copper highlights',
    items: [
      {name: 'Ladies’ cut & blow wave', text: 'Consultation, wash, cut and a smooth, bouncy blow wave to finish.'},
      {name: 'Restyle', text: 'Ready for something new? A full change of shape — from long layers to a crisp bob or pixie.'},
      {name: 'Trim & tidy', text: 'Ends, fringe and shape kept fresh between bigger appointments.'},
      {name: 'Blow wave', text: 'Sleek and straight or soft and voluminous. Ask about the 5-blow-wave special.'},
      {name: 'Curls & waves styling', text: 'Tonged curls or beach waves for an occasion, a shoot or just because.'},
    ],
  },
  {
    id: 'colour',
    title: ['Colour &', 'Blonding'],
    intro: 'From a quick root touch-up to a full blonde transformation, mixed and placed for your skin tone.',
    img: 'bright-blonde-balayage',
    alt: 'Long bright blonde balayage, straight and glossy',
    items: [
      {name: 'Full colour & root touch-up', text: 'Even, glossy coverage — including grey coverage — refreshed at the roots as it grows.'},
      {name: 'Balayage & ombré', text: 'Hand-painted, soft-grow-out colour for a natural, sun-kissed look.'},
      {name: 'Foil highlights & lowlights', text: 'Fine or chunky foils to brighten, add depth or blend grey.'},
      {name: 'Blonding & toning', text: 'Platinum, icy, ash, beige or golden — lifted with care and toned to the shade you want.'},
      {name: 'Colour correction', text: 'Brassy, patchy or box-dye hair brought back to an even, healthy-looking colour.'},
      {name: 'Fashion colour', text: 'Pinks, reds and mahogany for when you want to be noticed.'},
    ],
  },
  {
    id: 'treatments',
    title: ['Treatments &', 'Care'],
    intro: 'Healthy hair holds colour and style better. Ask which treatment suits your hair.',
    img: 'glossy-brunette-long',
    alt: 'Long, glossy brunette hair after a conditioning treatment',
    items: [
      {name: 'Conditioning treatment', text: 'Moisture and shine for dry, coloured or heat-styled hair.'},
      {name: 'Frizz & smoothing care', text: 'Calmer, smoother lengths for curly or frizz-prone hair.'},
      {name: 'Hair consultation', text: 'Not sure what you want? Chat to Samantha first — no pressure, honest advice.'},
    ],
  },
  {
    id: 'nails',
    title: ['Nails &', 'Pampering'],
    intro: 'Make it a full pamper session — hair and nails under one roof.',
    img: 'salon-interior-stations',
    alt: 'Bright styling stations inside Samantha Hairdressing',
    items: [
      {name: 'Gel overlay', text: 'Strong, glossy natural nails with long-lasting gel.'},
      {name: 'Acrylic overlay', text: 'Extra strength and shape for your natural nails.'},
      {name: 'Toes overlay', text: 'Neat, polished toes to match your hands.'},
    ],
  },
];

export type GalleryCat = 'transformations' | 'blonde' | 'colour' | 'cuts' | 'editorial' | 'salon';

export const galleryCats: {id: GalleryCat | 'all'; label: string}[] = [
  {id: 'all', label: 'All work'},
  {id: 'transformations', label: 'Before & after'},
  {id: 'blonde', label: 'Blondes'},
  {id: 'colour', label: 'Colour & brunette'},
  {id: 'cuts', label: 'Short cuts'},
  {id: 'editorial', label: 'Shoots'},
  {id: 'salon', label: 'In the salon'},
];

export const gallery: {img: string; cat: GalleryCat; alt: string}[] = [
  {img: 'short-cut-before-after', cat: 'transformations', alt: 'Before and after: grown-out short hair restyled into a layered pixie with blonde highlights'},
  {img: 'copper-to-red-before-after', cat: 'transformations', alt: 'Before and after: brassy copper hair corrected to a rich red-brown bob'},
  {img: 'blonde-to-brunette-bob-before-after', cat: 'transformations', alt: 'Before and after: faded blonde bob coloured to a warm brunette'},
  {img: 'blonde-refresh-before-after', cat: 'transformations', alt: 'Before and after: dull long blonde refreshed with brighter highlights'},
  {img: 'ash-blonde-before-after', cat: 'transformations', alt: 'Before and after: yellow-toned waves toned to a cool ash blonde'},
  {img: 'editorial-blonde-hair-flip', cat: 'editorial', alt: 'Model with long golden blonde hair flicking her hair against a warm studio backdrop'},
  {img: 'icy-blonde-curls', cat: 'blonde', alt: 'Icy blonde highlights with glossy curls'},
  {img: 'copper-balayage-curls', cat: 'colour', alt: 'Copper balayage over dark brunette, styled in curls'},
  {img: 'platinum-blonde-plait', cat: 'blonde', alt: 'Platinum blonde hair in a loose side plait'},
  {img: 'textured-pixie-cut', cat: 'cuts', alt: 'Textured pixie cut with copper tones'},
  {img: 'editorial-brunette-waves', cat: 'editorial', alt: 'Model with long brunette waves blowing a kiss'},
  {img: 'honey-blonde-waves', cat: 'blonde', alt: 'Honey blonde balayage in long loose waves'},
  {img: 'mahogany-red-ombre', cat: 'colour', alt: 'Straight brunette hair melting into a mahogany red ombré'},
  {img: 'golden-blonde-tousled', cat: 'blonde', alt: 'Golden blonde tousled layers'},
  {img: 'pink-colour-long-hair', cat: 'colour', alt: 'Long straight hair coloured vivid pink'},
  {img: 'silver-blonde-straight', cat: 'blonde', alt: 'Sleek silver blonde hair'},
  {img: 'textured-pixie-cut-back', cat: 'cuts', alt: 'Back view of a short textured cut with tapered nape'},
  {img: 'editorial-hair-flip', cat: 'editorial', alt: 'Model mid hair flip showing long brunette waves'},
  {img: 'brunette-caramel-highlights', cat: 'colour', alt: 'Brunette hair with fine caramel highlights'},
  {img: 'creamy-blonde-layers', cat: 'blonde', alt: 'Creamy blonde face-framing layers'},
  {img: 'chocolate-brunette-plait', cat: 'colour', alt: 'Chocolate brunette hair in a loose plait'},
  {img: 'blonde-curly-bob', cat: 'blonde', alt: 'Blonde lob styled with soft curls'},
  {img: 'auburn-copper-long', cat: 'colour', alt: 'Long auburn copper hair'},
  {img: 'ash-blonde-highlights', cat: 'blonde', alt: 'Long straight hair with ash blonde highlights'},
  {img: 'editorial-brunette-portrait', cat: 'editorial', alt: 'Portrait of a model with voluminous brunette hair'},
  {img: 'bright-blonde-balayage', cat: 'blonde', alt: 'Bright blonde balayage, long and straight'},
  {img: 'red-ombre-straight', cat: 'colour', alt: 'Dark roots blending into a red ombré'},
  {img: 'honey-highlights-long', cat: 'blonde', alt: 'Long hair with honey blonde highlights'},
  {img: 'glossy-brunette-long', cat: 'colour', alt: 'Long glossy chocolate brunette hair'},
  {img: 'platinum-blonde-straight', cat: 'blonde', alt: 'Straight platinum blonde hair'},
  {img: 'brunette-long-layers', cat: 'colour', alt: 'Long brunette hair with soft layers'},
  {img: 'silver-ash-highlights', cat: 'blonde', alt: 'Silver ash highlights blending grey hair'},
  {img: 'caramel-brunette-long', cat: 'colour', alt: 'Long caramel brunette hair'},
  {img: 'beige-blonde-long', cat: 'blonde', alt: 'Long beige blonde hair'},
  {img: 'brunette-highlights-long', cat: 'colour', alt: 'Long brunette hair with subtle highlights'},
  {img: 'golden-highlights-long', cat: 'blonde', alt: 'Long hair with golden highlights'},
  {img: 'bronde-balayage-long', cat: 'blonde', alt: 'Long bronde balayage'},
  {img: 'sandy-blonde-long', cat: 'blonde', alt: 'Long sandy blonde hair'},
  {img: 'brunette-layers', cat: 'colour', alt: 'Shoulder-length brunette layers'},
  {img: 'blonde-balayage-straight', cat: 'blonde', alt: 'Straight blonde balayage'},
  {img: 'salon-interior-stations', cat: 'salon', alt: 'Styling stations and chairs inside the salon'},
  {img: 'salon-interior-overhead', cat: 'salon', alt: 'Overhead view of the bright, plant-filled salon'},
  {img: 'foil-highlights-process', cat: 'salon', alt: 'Foil highlights being applied in the salon'},
  {img: 'colour-application', cat: 'salon', alt: 'Colour being applied in sections'},
  {img: 'curly-hair-before', cat: 'salon', alt: 'Curly, frizzy hair before a treatment and blow wave'},
  {img: 'long-natural-blonde-before', cat: 'salon', alt: 'Long natural blonde hair before a cut and colour'},
  {img: 'auburn-brunette-before', cat: 'salon', alt: 'Long auburn brunette hair before colour'},
  {img: 'blonde-highlights-before', cat: 'salon', alt: 'Grown-out blonde highlights before a refresh'},
  {img: 'blonde-waves-before', cat: 'salon', alt: 'Blonde waves before toning'},
  {img: 'dark-brunette-before', cat: 'salon', alt: 'Dark brunette hair before lightening'},
  {img: 'black-hair-before', cat: 'salon', alt: 'Wet black hair ready for colour'},
];

export const about = {
  eyebrow: 'About Samantha Hairdressing',
  lines: [{t: 'A chair for'}, {t: 'every', i: true}, {t: 'woman.'}] as Line[],
  body: 'Samantha has been doing hair since qualifying at The Rene Institute of Beauty Therapy in 2011. Her salon in Glen Marais, Kempton Park is bright, relaxed and judgement-free — a place to sit back, talk (in English or Afrikaans) and leave feeling like yourself again.',
  story: [
    'Great hair starts with listening. Every appointment begins with an honest chat about your hair, your routine and the look you have in mind — then a plan that works for your budget and your time.',
    'Whether it is a first balayage, a bold restyle, a colour correction or your weekly blow wave, you get the same care, the same attention to detail and the same warm welcome.',
  ],
};

/** TODO(owner): roles for Buhle and Lety are a guess from the nails special flyer — please confirm. */
export const team = [
  {name: 'Samantha', role: 'Owner & stylist', text: 'Cuts, colour, balayage, blonding and blow waves. Qualified at The Rene Institute of Beauty Therapy, class of 2011.', phone: '083 254 2414', phoneIntl: '+27832542414', img: 'samantha-hairdressing-logo'},
  {name: 'Buhle', role: 'Nails & beauty', text: 'Gel and acrylic overlays for hands and toes.', phone: '072 431 0324', phoneIntl: '+27724310324'},
  {name: 'Lety', role: 'Nails & beauty', text: 'Gel and acrylic overlays for hands and toes.', phone: '084 617 6756', phoneIntl: '+27846176756'},
];

/** Current specials, from the salon's "Pamper yourself" flyer. */
export const specials = {
  title: 'Pamper yourself',
  note: 'Specials change from time to time — WhatsApp us to check what is on this month.',
  items: [
    {name: 'Full set gel or acrylic overlay + toes overlay', price: 'R500'},
    {name: 'Full set gel or acrylic overlay + toes overlay + blow wave', price: 'R650'},
    {name: 'Buy 5 blow waves', price: 'R850'},
    {name: 'Gel overlay', price: 'R300'},
  ],
};

/** Client reviews. TODO(owner): paste real reviews here (name + words, with
 *  the client's permission) and they appear on the Specials & reviews page.
 *  Never add made-up reviews. */
export const reviews: {name: string; text: string; source: string}[] = [];

export const faqs = [
  {q: 'How do I book an appointment?', a: `The quickest way is WhatsApp on ${business.phone}. You can also call, or use the booking form on the contact page — it sends your request straight to Samantha on WhatsApp.`},
  {q: 'Where is the salon?', a: `We are at ${fullAddress}, in Kempton Park on Johannesburg’s East Rand.`},
  {q: 'How much does a cut or colour cost?', a: 'Prices depend on your hair length, thickness and the result you want, so we quote after a quick chat. Send a photo of your hair on WhatsApp for a fast estimate.'},
  {q: 'Do you do nails as well?', a: 'Yes — gel and acrylic overlays for hands and toes, and you can combine nails with a blow wave in our pamper special.'},
  {q: 'Do you speak Afrikaans?', a: 'Ja! Samantha is happy to chat in English or Afrikaans.'},
  {q: 'Can you fix colour that went wrong?', a: 'Yes. Colour correction is one of our specialities — see the before-and-after gallery for examples.'},
];

export const footerNote = 'Hair colour, balayage, blonding, cuts, blow waves and nails in Glen Marais, Kempton Park — serving Kempton Park, Birchleigh, Edleen, Norkem Park, Bonaero Park and the East Rand.';
