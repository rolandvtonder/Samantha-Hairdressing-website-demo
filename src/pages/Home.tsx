import {useEffect, useRef} from 'react';
import {business, directionsUrl, fullAddress, home, hours, pledge, specials} from '../content';
import {useReveals} from '../hooks/useReveals';
import {link} from '../lib/url';
import {Eyebrow, Heading, LinkButton, WhatsAppButton, delay} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconClock, IconPhone, IconPin} from '../components/Icons';
import {Img} from '../components/Img';

/** Three tall panels slide in from the right one after another. */
function Trio() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      {threshold: 0.2},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} className="trio relative overflow-hidden bg-ink" aria-labelledby="trio-title">
      <h2 id="trio-title" className="sr-only">
        Signature hair services
      </h2>
      <div className="grid h-svh min-h-[640px] grid-cols-3 gap-[3px] max-md:h-auto max-md:grid-cols-1">
        {home.trio.map((b, i) => (
          <a key={b.id} href={link(b.href)} aria-label={`${b.name.join(' ')} — explore services`} className="slide-in group relative block overflow-hidden bg-ink-2 max-md:h-[82svh]" style={{transitionDelay: `${0.12 + i * 0.16}s`}}>
            <Img name={b.img} alt={b.alt} sizesAttr="(max-width: 768px) 100vw, 34vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(28_21_18/0.7),transparent_40%,transparent_65%,rgb(28_21_18/0.6))]" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-28 md:p-9 md:pt-32">
              <div>
                <h3 className="display text-[clamp(38px,3.6vw,64px)] text-white">
                  <span className="block">{b.name[0]}</span>
                  <span className="it block text-champagne">{b.name[1]}</span>
                </h3>
                <dl className="fade-late mt-6 space-y-3">
                  {b.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-white/70">{k}</dt>
                      <dd className="font-text text-[15px] text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <span className="caps fade-late inline-flex items-center gap-3 text-white">
                Explore <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const transformations = [
  {img: 'copper-to-red-before-after', alt: 'Before and after colour correction from brassy copper to a rich red-brown bob', cap: 'Colour correction'},
  {img: 'short-cut-before-after', alt: 'Before and after short restyle with blonde highlights', cap: 'Restyle & highlights'},
  {img: 'ash-blonde-before-after', alt: 'Before and after: brassy waves toned to cool ash blonde', cap: 'Ash blonde toning'},
  {img: 'blonde-to-brunette-bob-before-after', alt: 'Before and after: faded blonde to warm brunette bob', cap: 'Blonde to brunette'},
];

export function Home() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Hero full eyebrow={home.eyebrow} lines={home.lines} body={home.body} img="editorial-blonde-hair-flip" imgMobile="editorial-brunette-waves" position="60% 30%" alt="Model with glossy golden blonde hair mid hair-flip, styled by Samantha Hairdressing">
        <LinkButton href="/services/" tone="outline-light">
          Our services
        </LinkButton>
        <LinkButton href="/gallery/" tone="outline-light">
          Transformations
        </LinkButton>
      </Hero>

      <Trio />

      {/* The pledge, in her own words */}
      <section className="bg-paper px-5 py-28 text-ink md:px-14 md:py-40" aria-labelledby="pledge-title">
        <div className="mx-auto grid max-w-[1680px] gap-14 md:grid-cols-[1fr_2fr]">
          <div data-reveal>
            <Eyebrow>Our promise</Eyebrow>
            <h2 id="pledge-title" className="prose-salon mt-4 max-w-sm text-[20px] leading-snug">
              {pledge.lead}
            </h2>
          </div>
          <div>
            <p className="display text-[clamp(40px,5.4vw,96px)]">
              {pledge.lines.map((l, i) => (
                <span key={l} data-reveal className={`block ${i % 2 ? 'it text-brick' : ''}`} style={delay(i * 0.1)}>
                  {l}
                </span>
              ))}
            </p>
            <p data-reveal className="prose-salon mt-10 max-w-xl text-[19px]">
              {pledge.close}
            </p>
            <p data-reveal className="script mt-4 text-[64px] leading-none text-gold-deep">
              Samantha
            </p>
          </div>
        </div>
      </section>

      {/* Transformations */}
      <section className="bg-champagne px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="tx-title">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div data-reveal>
              <Eyebrow>Before &amp; after</Eyebrow>
              <Heading lines={[{t: 'Real'}, {t: 'transformations', i: true}]} className="mt-4" />
            </div>
            <div data-reveal>
              <LinkButton href="/gallery/">See the full gallery</LinkButton>
            </div>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {transformations.map((t, i) => (
              <li key={t.img} data-reveal style={delay(i * 0.08)}>
                <figure>
                  <div className="aspect-[4/5] overflow-hidden bg-ink/10">
                    <Img name={t.img} alt={t.alt} sizesAttr="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="h-full w-full object-cover" />
                  </div>
                  <figcaption className="caps mt-3 text-ink/75">{t.cap}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Meet Samantha */}
      <section className="bg-ink px-5 py-24 md:px-14 md:py-36" aria-labelledby="meet-title">
        <div className="mx-auto grid max-w-[1680px] items-center gap-14 md:grid-cols-2">
          <div data-reveal className="relative">
            <Img name="samantha-hairdressing-logo" alt="Illustrated portrait of Samantha holding scissors in her salon under a chandelier" sizesAttr="(max-width: 768px) 100vw, 50vw" className="w-full max-w-[620px]" />
          </div>
          <div>
            <Eyebrow className="text-gold" >Meet your stylist</Eyebrow>
            <h2 id="meet-title" data-reveal className="display mt-4 text-[clamp(44px,6vw,104px)]">
              <span className="block">Hi, I’m</span>
              <span className="script block py-2 text-[1.25em] leading-[0.8] text-champagne normal-case">Samantha</span>
            </h2>
            <p data-reveal className="prose-salon mt-8 max-w-lg text-white/85">
              I qualified at {business.training.school} in {business.training.year} and have been colouring, cutting and styling ever since. My salon is relaxed, honest and kind — we chat in English or Afrikaans, and you leave feeling like the best version of yourself.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <LinkButton href="/about/" tone="outline-light">
                About &amp; team
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Specials teaser */}
      <section className="bg-brick px-5 py-24 md:px-14 md:py-32" aria-labelledby="sp-title">
        <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1fr_1.2fr]">
          <div data-reveal>
            <Eyebrow className="text-champagne">This month</Eyebrow>
            <h2 id="sp-title" className="display mt-4 text-[clamp(44px,6vw,104px)]">
              <span className="block">Pamper</span>
              <span className="it block text-champagne">yourself</span>
            </h2>
            <div className="mt-10">
              <LinkButton href="/specials-reviews/" tone="outline-light">
                All specials &amp; reviews
              </LinkButton>
            </div>
          </div>
          <ul className="divide-y divide-white/25 border-y border-white/25">
            {specials.items.map((s, i) => (
              <li key={s.name} data-reveal style={delay(i * 0.08)} className="flex items-baseline justify-between gap-6 py-6">
                <span className="prose-salon text-[18px] text-white/95">{s.name}</span>
                <span className="display shrink-0 text-[clamp(32px,3vw,48px)] text-champagne">{s.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visit */}
      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="visit-title">
        <div className="mx-auto max-w-[1680px]">
          <div data-reveal>
            <Eyebrow>Visit the salon</Eyebrow>
            <Heading lines={[{t: 'Glen Marais,'}, {t: 'Kempton Park', i: true}]} className="mt-4" />
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <div data-reveal className="border-t border-ink/20 pt-6">
              <IconPin className="size-6 text-brick" />
              <h3 id="visit-title" className="caps mt-4 text-ink/70">
                Address
              </h3>
              <p className="prose-salon mt-1">{fullAddress}</p>
              <a href={directionsUrl} target="_blank" rel="noopener" className="caps mt-3 inline-block py-2 text-brick underline underline-offset-4">
                Get directions
              </a>
            </div>
            <div data-reveal className="border-t border-ink/20 pt-6" style={delay(0.08)}>
              <IconPhone className="size-6 text-brick" />
              <h3 className="caps mt-4 text-ink/70">Call or WhatsApp</h3>
              <p className="prose-salon mt-1">
                <a href={`tel:${business.phoneIntl}`} className="hover:text-brick">
                  {business.phone}
                </a>
              </p>
              <div className="mt-4">
                <WhatsAppButton />
              </div>
            </div>
            <div data-reveal className="border-t border-ink/20 pt-6" style={delay(0.16)}>
              <IconClock className="size-6 text-brick" />
              <h3 className="caps mt-4 text-ink/70">Hours</h3>
              <ul className="prose-salon mt-1">
                {hours.map((h) => (
                  <li key={h.label} className="flex justify-between gap-4">
                    <span>{h.label}</span>
                    <span className="text-ink/65">{h.open ? `${h.open}–${h.close}` : 'Closed'}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
