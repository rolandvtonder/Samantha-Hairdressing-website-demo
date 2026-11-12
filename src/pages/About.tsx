import {about, business, pledge, team} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Eyebrow, Heading, LinkButton, WhatsAppButton, delay} from '../components/Bits';
import {Hero} from '../components/Hero';
import {Img} from '../components/Img';

export function About() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Hero eyebrow={about.eyebrow} lines={about.lines} body={about.body} img="salon-interior-stations" alt="Bright styling stations with black chairs and plants inside Samantha Hairdressing" position="center 60%" />

      {/* Story */}
      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-36" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-[1680px] items-start gap-14 md:grid-cols-2 md:gap-20">
          <div data-reveal className="md:sticky md:top-28">
            <Img name="samantha-hairdressing-logo" alt="Illustrated portrait of Samantha with scissors and comb in her salon, under the Samantha Hairdressing sign" sizesAttr="(max-width: 768px) 100vw, 50vw" className="w-full" />
          </div>
          <div>
            <div data-reveal>
              <Eyebrow>Our story</Eyebrow>
              <h2 id="story-title" className="display mt-4 text-[clamp(44px,5.4vw,96px)]">
                <span className="block">Honest hair,</span>
                <span className="it block text-brick">warm welcome</span>
              </h2>
            </div>
            {about.story.map((p, i) => (
              <p key={i} data-reveal className="prose-salon mt-6 max-w-xl text-ink/85">
                {p}
              </p>
            ))}

            <dl className="mt-14 grid gap-8 border-t border-ink/20 pt-10 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
              <div data-reveal>
                <dt className="caps text-ink/65">Qualified</dt>
                <dd className="display mt-2 text-[44px]">{business.training.year}</dd>
                <dd className="font-text text-[14px] text-ink/75">{business.training.school}</dd>
              </div>
              <div data-reveal style={delay(0.08)}>
                <dt className="caps text-ink/65">Languages</dt>
                <dd className="display mt-2 text-[44px]">2</dd>
                <dd className="font-text text-[14px] text-ink/75">English &amp; Afrikaans</dd>
              </div>
              <div data-reveal style={delay(0.16)}>
                <dt className="caps text-ink/65">Where</dt>
                <dd className="display mt-2 text-[44px]">Glen Marais</dd>
                <dd className="font-text text-[14px] text-ink/75">Kempton Park, Gauteng</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Pledge */}
      <section className="bg-brick px-5 py-24 md:px-14 md:py-36" aria-labelledby="promise-title">
        <div className="mx-auto max-w-[1680px]">
          <Eyebrow className="text-champagne">Our promise</Eyebrow>
          <h2 id="promise-title" className="prose-salon mt-4 max-w-xl text-[22px] leading-snug">
            {pledge.lead}
          </h2>
          <p className="display mt-10 text-[clamp(40px,5.6vw,100px)]">
            {pledge.lines.map((l, i) => (
              <span key={l} data-reveal style={delay(i * 0.1)} className={`block ${i % 2 ? 'it text-champagne' : ''}`}>
                {l}
              </span>
            ))}
          </p>
          <p data-reveal className="prose-salon mt-10 max-w-xl text-[19px] text-white/95">
            {pledge.close}
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-champagne px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="team-title">
        <div className="mx-auto max-w-[1680px]">
          <div data-reveal>
            <Eyebrow>The team</Eyebrow>
            <h2 id="team-title" className="display mt-4 text-[clamp(44px,6vw,104px)]">
              <span className="block">Hair &amp;</span>
              <span className="it block text-brick">nails, together</span>
            </h2>
          </div>
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {team.map((m, i) => (
              <li key={m.name} data-reveal style={delay(i * 0.08)} className="flex flex-col bg-paper p-8">
                {m.img ? (
                  <div className="aspect-square overflow-hidden">
                    <Img name={m.img} alt={`${m.name}, ${m.role}`} sizesAttr="(max-width: 768px) 100vw, 33vw" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div aria-hidden className="grid aspect-square place-items-center bg-ink">
                    <span className="script text-[140px] leading-none text-champagne">{m.name[0]}</span>
                  </div>
                )}
                <h3 className="display mt-6 text-[44px]">{m.name}</h3>
                <p className="caps text-brick">{m.role}</p>
                <p className="prose-salon mt-3 text-ink/80">{m.text}</p>
                <a href={`tel:${m.phoneIntl}`} className="caps mt-auto inline-block pt-5 text-ink underline decoration-ink/30 underline-offset-4 hover:text-brick">
                  Call {m.name} · {m.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Salon */}
      <section className="bg-ink px-5 py-24 md:px-14 md:py-32" aria-labelledby="space-title">
        <div className="mx-auto grid max-w-[1680px] gap-4 md:grid-cols-[1.1fr_1fr_1fr]">
          <div data-reveal className="flex flex-col justify-between gap-10 py-2 md:pr-10">
            <div>
              <Eyebrow className="text-gold">The salon</Eyebrow>
              <Heading lines={[{t: 'Light,'}, {t: 'calm & green', i: true}]} className="mt-4" size="text-[clamp(40px,4.6vw,84px)]" />
              <p className="prose-salon mt-6 max-w-md text-white/85">A bright, plant-filled space at {business.street} in Glen Marais — easy to find and easy to relax in.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton tone="light" />
              <LinkButton href="/contact/" tone="outline-light">
                Find us
              </LinkButton>
            </div>
          </div>
          <div data-reveal style={delay(0.08)} className="aspect-[4/5] overflow-hidden">
            <Img name="salon-interior-overhead" alt="Overhead view of the bright salon with plants and white brick" sizesAttr="(max-width: 768px) 100vw, 30vw" className="h-full w-full object-cover" />
          </div>
          <div data-reveal style={delay(0.16)} className="aspect-[4/5] overflow-hidden">
            <Img name="foil-highlights-process" alt="Foil highlights being applied at Samantha Hairdressing" sizesAttr="(max-width: 768px) 100vw, 30vw" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
