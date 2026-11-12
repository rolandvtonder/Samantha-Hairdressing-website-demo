import {business, directionsUrl, footerNote, hours, nav, wa} from '../content';
import {IconFacebook, IconInstagram, IconWhatsApp} from './Icons';
import {link} from '../lib/url';

export function Footer() {
  return (
    <footer className="relative bg-ink px-5 pt-20 pb-28 text-white md:px-14 md:pb-24">
      <div className="mx-auto max-w-[1680px]">
        <a href={link("/")} className="inline-block" aria-label="Samantha Hairdressing — home">
          <span className="script block text-[clamp(64px,9vw,140px)] leading-[0.9] text-champagne">Samantha</span>
          <span className="caps block pl-2 text-[13px] tracking-[0.5em] text-gold">Hairdressing</span>
        </a>

        <div className="mt-14 grid gap-12 border-t border-white/15 pt-12 md:grid-cols-4">
          <div>
            <h2 className="caps text-gold">Visit the salon</h2>
            <address className="mt-3 font-text text-[15px] leading-relaxed not-italic text-white/85">
              {business.name}
              <br />
              {business.street}
              <br />
              {business.suburb}, {business.city}
              <br />
              {business.province}, {business.postcode}
            </address>
            <a href={directionsUrl} target="_blank" rel="noopener" className="caps mt-3 inline-block py-2 text-champagne underline decoration-white/30 underline-offset-4 hover:text-gold">
              Get directions
            </a>
          </div>
          <div>
            <h2 className="caps text-gold">Book</h2>
            <p className="mt-3 font-text text-[15px] leading-relaxed text-white/85">
              <a href={`tel:${business.phoneIntl}`} className="hover:text-gold">
                {business.phone}
              </a>
              <br />
              English &amp; Afrikaans
            </p>
            <a href={wa()} target="_blank" rel="noopener" className="btn mt-4 bg-champagne text-ink hover:bg-gold">
              <IconWhatsApp /> WhatsApp
            </a>
          </div>
          <div>
            <h2 className="caps text-gold">Hours</h2>
            <ul className="mt-3 space-y-1 font-text text-[15px] text-white/85">
              {hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4">
                  <span>{h.label}</span>
                  <span className="text-white/65">{h.open ? `${h.open}–${h.close}` : 'Closed'}</span>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer">
            <h2 className="caps text-gold">Explore</h2>
            <ul className="mt-3 space-y-0.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={link(n.href)} className="inline-block py-1 font-text text-[15px] text-white/85 hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-2">
              <a href={business.facebook} target="_blank" rel="noopener" aria-label="Samantha Hairdressing on Facebook" className="grid size-11 place-items-center border border-white/20 hover:border-gold hover:text-gold">
                <IconFacebook className="size-5" />
              </a>
              {business.instagram && (
                <a href={business.instagram} target="_blank" rel="noopener" aria-label="Samantha Hairdressing on Instagram" className="grid size-11 place-items-center border border-white/20 hover:border-gold hover:text-gold">
                  <IconInstagram className="size-5" />
                </a>
              )}
            </div>
          </nav>
        </div>

        <p className="mt-14 max-w-3xl font-text text-[14px] leading-relaxed text-white/60">{footerNote}</p>
        <p className="caps mt-6 text-white/50">© {new Date().getFullYear()} {business.name} · Kempton Park, South Africa</p>
      </div>
    </footer>
  );
}
