import {useRef, useState, type FormEvent} from 'react';
import {business, directionsUrl, fullAddress, hours, mapEmbedUrl, services, team, wa} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Eyebrow, WhatsAppButton} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconClock, IconPhone, IconPin, IconWhatsApp} from '../components/Icons';
import {Faq} from './Services';

type Errors = Partial<Record<'name' | 'phone' | 'service', string>>;

/** Booking request form. There is no server: it builds a WhatsApp message
 *  from the answers and opens a chat with Samantha, ready to send. */
function BookingForm() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const v = (k: string) => String(d.get(k) ?? '').trim();
    const next: Errors = {};
    if (!v('name')) next.name = 'Please tell us your name.';
    if (!/^[+\d][\d\s()-]{8,}$/.test(v('phone'))) next.phone = 'Please enter a phone number we can reach you on, e.g. 082 123 4567.';
    if (!v('service')) next.service = 'Please choose what you would like done.';
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const lines = [
      `Hi Samantha, I'd like to book an appointment.`,
      `Name: ${v('name')}`,
      `Phone: ${v('phone')}`,
      `Service: ${v('service')}`,
      v('date') && `Preferred date: ${v('date')}`,
      v('time') && `Preferred time: ${v('time')}`,
      v('message') && `Notes: ${v('message')}`,
    ].filter(Boolean);
    window.open(wa(lines.join('\n')), '_blank', 'noopener');
    setSent(true);
  };

  const field = 'mt-2 block min-h-[48px] w-full border border-ink/25 bg-white px-4 py-3 font-text text-[16px] text-ink outline-none transition-colors focus:border-ink aria-[invalid=true]:border-rouge';
  const label = 'caps text-ink/80';
  const err = (k: keyof Errors) =>
    errors[k] && (
      <p id={`${k}-error`} role="alert" className="mt-2 font-text text-[14px] text-rouge">
        {errors[k]}
      </p>
    );

  return (
    <form ref={form} onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2" aria-describedby="form-help">
      <p id="form-help" className="prose-salon text-ink/80 sm:col-span-2">
        Fill this in and press send — WhatsApp opens with your request written out, ready to send to Samantha. Fields marked * are required.
      </p>
      <div>
        <label htmlFor="name" className={label}>
          Your name *
        </label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
        {err('name')}
      </div>
      <div>
        <label htmlFor="phone" className={label}>
          Phone number *
        </label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} />
        {err('phone')}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="service" className={label}>
          What would you like? *
        </label>
        <select id="service" name="service" defaultValue="" className={field} aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}>
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((g) => (
            <optgroup key={g.id} label={g.title.join(' ')}>
              {g.items.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
            </optgroup>
          ))}
          <option>A special / something else</option>
        </select>
        {err('service')}
      </div>
      <div>
        <label htmlFor="date" className={label}>
          Preferred date
        </label>
        <input id="date" name="date" type="date" className={field} />
      </div>
      <div>
        <label htmlFor="time" className={label}>
          Preferred time
        </label>
        <select id="time" name="time" defaultValue="" className={field}>
          <option value="">Any time</option>
          <option>Morning</option>
          <option>Midday</option>
          <option>Afternoon</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Anything we should know?
        </label>
        <textarea id="message" name="message" rows={4} className={`${field} resize-y`} placeholder="Hair length, current colour, the look you’re after…" />
      </div>
      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <button type="submit" className="btn bg-ink text-white hover:bg-brick">
          <IconWhatsApp /> Send on WhatsApp
        </button>
        {sent && (
          <p role="status" className="font-text text-[15px] text-ink/85">
            WhatsApp should have opened in a new tab. Nothing happened?{' '}
            <a href={`tel:${business.phoneIntl}`} className="underline underline-offset-4">
              Call {business.phone}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

export function Contact() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Hero
        eyebrow="Contact & booking"
        lines={[{t: 'Your chair'}, {t: 'is waiting.', i: true}]}
        body={`${fullAddress}. WhatsApp or call ${business.phone} — we reply in English or Afrikaans.`}
        img="salon-interior-overhead"
        alt="The bright, plant-filled interior of Samantha Hairdressing seen from above"
        position="center 40%"
      >
        <WhatsAppButton tone="light" />
        <a href={`tel:${business.phoneIntl}`} className="btn border border-white/40 text-white hover:bg-white hover:text-ink">
          <IconPhone /> Call {business.phone}
        </a>
      </Hero>

      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="details-title">
        <div className="mx-auto grid max-w-[1680px] gap-16 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <div data-reveal>
              <Eyebrow>Find us</Eyebrow>
              <h2 id="details-title" className="display mt-4 text-[clamp(44px,5.4vw,96px)]">
                <span className="block">Visit the</span>
                <span className="it block text-brick">salon</span>
              </h2>
            </div>

            <div data-reveal className="mt-10 grid gap-8 border-t border-ink/20 pt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <h3 className="caps flex items-center gap-2 text-ink/70">
                  <IconPin className="size-5 text-brick" /> Address
                </h3>
                <address className="prose-salon mt-2 not-italic">
                  {business.name}
                  <br />
                  {business.street}
                  <br />
                  {business.suburb}, {business.city}
                  <br />
                  {business.province}, {business.postcode}
                </address>
                <a href={directionsUrl} target="_blank" rel="noopener" className="caps mt-2 inline-block py-2 text-brick underline underline-offset-4">
                  Get directions
                </a>
              </div>
              <div>
                <h3 className="caps flex items-center gap-2 text-ink/70">
                  <IconClock className="size-5 text-brick" /> Opening hours
                </h3>
                <table className="prose-salon mt-2 w-full">
                  <tbody>
                    {hours.map((h) => (
                      <tr key={h.label}>
                        <th scope="row" className="py-0.5 pr-4 text-left font-normal whitespace-nowrap">
                          {h.label}
                        </th>
                        <td className="py-0.5 text-right whitespace-nowrap text-ink/70">{h.open ? `${h.open}–${h.close}` : 'Closed'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div data-reveal className="mt-10 border-t border-ink/20 pt-8">
              <h3 className="caps flex items-center gap-2 text-ink/70">
                <IconPhone className="size-5 text-brick" /> Call the team
              </h3>
              <ul className="mt-3 divide-y divide-ink/15">
                {team.map((m) => (
                  <li key={m.name} className="flex flex-wrap items-baseline justify-between gap-3 py-3">
                    <span className="prose-salon">
                      {m.name} <span className="text-ink/65">· {m.role}</span>
                    </span>
                    <a href={`tel:${m.phoneIntl}`} className="display text-[28px] hover:text-brick">
                      {m.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div data-reveal className="bg-champagne p-6 md:p-10">
            <Eyebrow>Request a booking</Eyebrow>
            <h2 className="display mt-3 mb-8 text-[clamp(36px,3.4vw,58px)]">
              Book your <span className="it text-brick">appointment</span>
            </h2>
            <BookingForm />
          </div>
        </div>
      </section>

      <section aria-label="Map" className="bg-ink">
        <iframe
          title={`Map showing ${business.name} at ${fullAddress}`}
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[60svh] min-h-[380px] w-full border-0 grayscale-[0.4] sepia-[0.25]"
        />
      </section>

      <Faq />
    </div>
  );
}
