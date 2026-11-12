import {business, pledge, reviews, specials, team} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Eyebrow, LinkButton, WhatsAppButton, delay} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconFacebook} from '../components/Icons';

export function Specials() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Hero
        eyebrow="Specials & reviews"
        lines={[{t: 'Pamper'}, {t: 'yourself.', i: true}]}
        body="Hair and nails together, for less. These are our current specials — WhatsApp to book yours."
        img="editorial-brunette-portrait"
        alt="Portrait of a model with voluminous, glossy brunette hair"
        position="center 25%"
      />

      {/* Specials */}
      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="specials-title">
        <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <Eyebrow>Current specials</Eyebrow>
            <h2 id="specials-title" className="display mt-4 text-[clamp(44px,6vw,104px)]">
              <span className="block">This</span>
              <span className="it block text-brick">month</span>
            </h2>
            <p className="prose-salon mt-6 max-w-md text-ink/85">{specials.note}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {specials.items.map((s, i) => (
              <li key={s.name} data-reveal style={delay(i * 0.08)} className={`flex flex-col justify-between gap-10 p-8 ${i === 1 ? 'bg-brick text-white' : 'bg-champagne'}`}>
                <h3 className="prose-salon text-[19px] leading-snug">{s.name}</h3>
                <div className="flex items-end justify-between gap-4">
                  <p className="display text-[clamp(56px,5vw,84px)] leading-none">{s.price}</p>
                  <a
                    href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`Hi! I'd like to book the special: ${s.name} (${s.price}).`)}`}
                    target="_blank"
                    rel="noopener"
                    className={`caps inline-flex min-h-[44px] items-center underline underline-offset-4 ${i === 1 ? 'text-champagne' : 'text-brick'}`}
                    aria-label={`Book ${s.name} for ${s.price} on WhatsApp`}
                  >
                    Book
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto mt-14 max-w-[1680px] border-t border-ink/20 pt-8">
          <p data-reveal className="prose-salon text-ink/85">
            Book specials directly with{' '}
            {team.map((m, i) => (
              <span key={m.name}>
                {m.name}{' '}
                <a href={`tel:${m.phoneIntl}`} className="whitespace-nowrap underline decoration-ink/30 underline-offset-4 hover:text-brick">
                  {m.phone}
                </a>
                {i < team.length - 2 ? ', ' : i === team.length - 2 ? ' or ' : '.'}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-ink px-5 py-24 md:px-14 md:py-36" aria-labelledby="reviews-title">
        <div className="mx-auto max-w-[1680px]">
          <div data-reveal>
            <Eyebrow className="text-gold">Kind words</Eyebrow>
            <h2 id="reviews-title" className="display mt-4 text-[clamp(44px,6vw,104px)]">
              <span className="block">What clients</span>
              <span className="it block text-champagne">say</span>
            </h2>
          </div>

          {reviews.length > 0 ? (
            <ul className="mt-14 grid gap-4 md:grid-cols-3">
              {reviews.map((r, i) => (
                <li key={r.name} data-reveal style={delay(i * 0.08)} className="bg-ink-2 p-8">
                  <figure>
                    <blockquote className="prose-salon text-[18px] text-white/90">“{r.text}”</blockquote>
                    <figcaption className="caps mt-6 text-gold">
                      {r.name} · {r.source}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <div data-reveal className="mt-14 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-[1.4fr_1fr]">
              <p className="display text-[clamp(32px,3.4vw,56px)] text-white/95">
                <span className="block">“{pledge.close.split(' — ')[0]}”</span>
                <span className="it mt-2 block text-[0.6em] text-champagne">— our promise to every client</span>
              </p>
              <div>
                <p className="prose-salon text-white/85">Read our client reviews on Facebook — and if we’ve done your hair, we’d love to hear from you too.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={business.facebookReviews} target="_blank" rel="noopener" className="btn bg-champagne text-ink hover:bg-gold">
                    <IconFacebook /> Read reviews
                  </a>
                  <a href={business.facebookReviews} target="_blank" rel="noopener" className="btn border border-white/40 text-white hover:bg-white hover:text-ink">
                    Leave a review
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-champagne px-5 py-20 text-ink md:px-14" aria-label="Book">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-8">
          <p data-reveal className="display text-[clamp(36px,4vw,64px)]">
            Ready for <span className="it text-brick">you-time?</span>
          </p>
          <div data-reveal className="flex flex-wrap gap-3">
            <WhatsAppButton text="Hi! I'd like to book one of your specials." />
            <LinkButton href="/services/">All services</LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
