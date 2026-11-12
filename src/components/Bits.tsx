import type {CSSProperties, ReactNode} from 'react';
import type {Line} from '../content';
import {wa} from '../content';
import {IconArrow, IconWhatsApp} from './Icons';
import {link} from '../lib/url';

/** Two-line display heading: upright then italic, as in the hero. */
export function Heading({lines, as: Tag = 'h2', className = '', size = 'text-[clamp(44px,6vw,104px)]'}: {lines: Line[]; as?: 'h2' | 'h3'; className?: string; size?: string}) {
  return (
    <Tag className={`display ${size} ${className}`}>
      {lines.map((l) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''}`}>
          {l.t}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({children, className = 'text-gold-deep'}: {children: ReactNode; className?: string}) {
  return <p className={`caps tracking-[0.24em] ${className}`}>{children}</p>;
}

export function WhatsAppButton({text, label = 'Book on WhatsApp', tone = 'dark'}: {text?: string; label?: string; tone?: 'dark' | 'light' | 'brick'}) {
  const cls = tone === 'dark' ? 'bg-ink text-white hover:bg-brick' : tone === 'brick' ? 'bg-brick text-white hover:bg-ink' : 'bg-champagne text-ink hover:bg-gold';
  return (
    <a href={wa(text)} target="_blank" rel="noopener" className={`btn ${cls}`}>
      <IconWhatsApp /> {label}
    </a>
  );
}

export function LinkButton({href, children, tone = 'outline-dark'}: {href: string; children: ReactNode; tone?: 'outline-dark' | 'outline-light'}) {
  const cls = tone === 'outline-dark' ? 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-white' : 'border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink';
  return (
    <a href={link(href)} className={`btn ${cls}`}>
      {children} <IconArrow />
    </a>
  );
}

/** Stagger for `[data-reveal]` elements (read by the CSS as --d). */
export const delay = (s: number) => ({'--d': `${s}s`}) as CSSProperties;
