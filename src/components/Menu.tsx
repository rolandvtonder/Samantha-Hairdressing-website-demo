import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {business, nav, wa} from '../content';
import {link} from '../lib/url';

/**
 * The menu: three slabs wipe in from the right one after another
 * (ink, brick, cream); the cream one stays and holds the items. Hovering an
 * item ripples it like heat off a hairdryer — an SVG turbulence +
 * displacement filter whose strength and phase are animated per frame.
 */
export function Menu({open, current, onClose, onNavigate}: {open: boolean; current: string; onClose: () => void; onNavigate: (href: string) => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 9).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  useEffect(() => {
    if (!open) {
      setHover(-1);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const id = window.setTimeout(() => firstLink.current?.focus({preventScroll: true}), 420);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: ink → brick → cream, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  const socials = [
    {label: 'WhatsApp', href: wa()},
    {label: 'Facebook', href: business.facebook},
    ...(business.instagram ? [{label: 'Instagram', href: business.instagram}] : []),
  ];

  return (
    <div id="site-menu" inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away */}
      <button type="button" aria-label="Close menu" tabIndex={-1} onClick={onClose} className={`absolute inset-0 cursor-default bg-ink/40 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} />

      <div className={slab('bg-ink')} style={delay(0)} />
      <div className={slab('bg-brick')} style={delay(1)} />
      <nav className={slab('flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-24 pb-28 text-ink md:px-10')} style={delay(2)} aria-label="Main menu">
        <ul onMouseLeave={() => setHover(-1)}>
          {nav.map((item, i) => {
            const active = item.href === current;
            return (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'}}
              >
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={link(item.href)}
                  aria-current={active ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.href);
                  }}
                  className={`display relative inline-block py-1 text-[clamp(32px,3vw,46px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  } ${active ? 'it text-brick' : ''}`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {item.label}
                  <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-ink/60">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>
        <div className={`mt-10 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <p className="caps text-ink/60">Visit</p>
          <p className="mt-1 font-text text-[15px] leading-relaxed text-ink/85">
            {business.street}, {business.suburb}
            <br />
            {business.city}, {business.postcode}
            <br />
            <a href={`tel:${business.phoneIntl}`} className="underline decoration-ink/30 underline-offset-4 hover:text-brick">
              {business.phone}
            </a>
          </p>
          <p className="caps mt-6 text-ink/60">Socials</p>
          <div className="mt-1 flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="caps py-2 text-ink/85 hover:text-brick">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
