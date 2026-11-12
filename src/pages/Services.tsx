import {faqs, services, wa} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Eyebrow, Heading, LinkButton, WhatsAppButton, delay} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconArrow} from '../components/Icons';
import {Img} from '../components/Img';

export function Faq() {
  return (
    <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1fr_1.6fr]">
        <div data-reveal>
          <Eyebrow>Good to know</Eyebrow>
          <h2 id="faq-title" className="display mt-4 text-[clamp(44px,5.4vw,96px)]">
            <span className="block">Questions,</span>
            <span className="it block text-brick">answered</span>
          </h2>
        </div>
        <div className="border-t border-ink/20">
          {faqs.map((f) => (
            <details key={f.q} data-reveal className="group border-b border-ink/20">
              <summary className="flex min-h-[64px] items-center justify-between gap-6 py-5">
                <h3 className="display text-[clamp(24px,2.2vw,34px)]">{f.q}</h3>
                <span aria-hidden className="faq-plus text-[26px] leading-none text-brick transition-transform duration-500 ease-silk">
                  +
                </span>
              </summary>
              <p className="prose-salon max-w-2xl pb-7 text-ink/85">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Hero
        eyebrow="Hair & nail services · Kempton Park"
        lines={[{t: 'Colour, cuts'}, {t: '& care.', i: true}]}
        body="Everything from a weekly blow wave to a full blonde transformation, plus gel and acrylic nails. Every head of hair is different, so we quote personally — send us a message and a photo."
        img="honey-blonde-waves"
        alt="Honey blonde balayage in long loose waves"
        position="center 35%"
      />

      {/* Jump links */}
      <nav aria-label="Service categories" className="border-b border-ink/10 bg-paper px-5 md:px-14">
        <ul className="mx-auto flex max-w-[1680px] flex-wrap gap-1 py-3">
          {services.map((g) => (
            <li key={g.id} className="shrink-0">
              <a href={`#${g.id}`} className="caps inline-flex min-h-[44px] items-center px-4 text-ink/80 hover:text-brick">
                {g.title.join(' ')}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((g, gi) => (
        <section key={g.id} id={g.id} className={`px-5 py-24 text-ink md:px-14 md:py-32 ${gi % 2 ? 'bg-champagne' : 'bg-paper'}`} aria-labelledby={`${g.id}-title`}>
          <div className="mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div data-reveal>
                <Eyebrow>0{gi + 1} — Services</Eyebrow>
                <h2 id={`${g.id}-title`} className="display mt-4 text-[clamp(44px,5.4vw,96px)]">
                  <span className="block">{g.title[0]}</span>
                  <span className="it block text-brick">{g.title[1]}</span>
                </h2>
                <p className="prose-salon mt-6 max-w-md text-ink/85">{g.intro}</p>
              </div>
              <div data-reveal className="mt-10 aspect-[4/5] max-w-[460px] overflow-hidden bg-ink/10 max-lg:hidden">
                <Img name={g.img} alt={g.alt} sizesAttr="(max-width: 1024px) 0px, 30vw" className="h-full w-full object-cover" />
              </div>
            </div>
            <ul className="border-t border-ink/20">
              {g.items.map((s, i) => (
                <li key={s.name} data-reveal style={delay(i * 0.05)} className="grid gap-4 border-b border-ink/20 py-8 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <h3 className="display text-[clamp(28px,2.6vw,42px)]">{s.name}</h3>
                    <p className="prose-salon mt-2 max-w-xl text-ink/80">{s.text}</p>
                  </div>
                  <a
                    href={wa(`Hi Samantha, I'd like a quote for: ${s.name}.`)}
                    target="_blank"
                    rel="noopener"
                    className="caps inline-flex min-h-[44px] items-center gap-2 self-start text-brick hover:text-ink sm:self-center"
                    aria-label={`Enquire about ${s.name} on WhatsApp`}
                  >
                    Enquire <IconArrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="bg-brick px-5 py-24 md:px-14 md:py-28" aria-labelledby="quote-title">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-10">
          <div data-reveal className="max-w-2xl">
            <Eyebrow className="text-champagne">How pricing works</Eyebrow>
            <Heading lines={[{t: 'Your hair,'}, {t: 'your quote', i: true}]} className="mt-4" />
            <p className="prose-salon mt-6 text-white/90">
              Length, thickness and the look you want all change the price, so we don’t do one-size-fits-all. WhatsApp a photo of your hair and what you’d like — you’ll get an honest quote, no surprises in the chair.
            </p>
          </div>
          <div data-reveal className="flex flex-wrap gap-3">
            <WhatsAppButton tone="light" text="Hi Samantha, could I please get a quote? I'll send a photo of my hair." label="Get a quote" />
            <LinkButton href="/specials-reviews/" tone="outline-light">
              See specials
            </LinkButton>
          </div>
        </div>
      </section>

      <Faq />
    </div>
  );
}
