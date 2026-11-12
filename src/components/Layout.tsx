import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {wa} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {LEAVE_EVENT, go, isInternal} from '../lib/nav';
import {startScroll} from '../lib/scroll';
import {link} from '../lib/url';
import {Footer} from './Footer';
import {IconWhatsApp} from './Icons';
import {Menu} from './Menu';

/** Everything every page shares: wordmark, menu, the booking box, the page wipes and the footer. */
export function Layout({path, children}: {path: string; children: ReactNode}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => startScroll(reduced), [reduced]);

  // Internal links anywhere on the page play the leave wipe first.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || !isInternal(a, e)) return;
      e.preventDefault();
      go(a.href, reduced);
    };
    const onLeave = () => setLeaving(true);
    // Coming back with the browser's back button restores this page from cache: uncover it.
    const onShow = (e: PageTransitionEvent) => e.persisted && setLeaving(false);
    document.addEventListener('click', onClick);
    window.addEventListener(LEAVE_EVENT, onLeave);
    window.addEventListener('pageshow', onShow);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener(LEAVE_EVENT, onLeave);
      window.removeEventListener('pageshow', onShow);
    };
  }, [reduced]);

  const close = useCallback(() => {
    setOpen(false);
    menuBtn.current?.focus({preventScroll: true});
  }, []);
  const navigate = useCallback(
    (href: string) => {
      const same = href === path;
      setOpen(false);
      window.setTimeout(() => go(link(href), reduced), same ? 0 : 380);
    },
    [path, reduced],
  );

  const slab = (cls: string, k: number) => (
    <span
      className={`fixed inset-0 transition-transform duration-[700ms] ease-wipe ${cls} ${leaving ? 'translate-x-0' : 'translate-x-[104%]'}`}
      style={{transitionDelay: `${k * 0.08}s`}}
    />
  );

  return (
    <>
      <a href="#main" className="caps fixed top-3 left-3 z-[80] -translate-y-24 bg-champagne px-4 py-3 text-ink focus:translate-y-0">
        Skip to content
      </a>

      <a href={link("/")} aria-label="Samantha Hairdressing — home" className="fixed top-4 left-5 z-[55] text-white mix-blend-difference md:top-6 md:left-14">
        <span className="script block text-[38px] leading-[0.9] md:text-[44px]">Samantha</span>
        <span className="caps block pl-1 text-[9px] tracking-[0.42em]">Hairdressing</span>
      </a>

      <button
        ref={menuBtn}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-5 z-[55] flex min-h-[48px] items-center gap-4 px-6 py-3.5 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 ${
          open ? 'bg-ink text-white' : 'bg-ink/45 text-white hover:bg-ink/70'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[16px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <a
        href={wa()}
        target="_blank"
        rel="noopener"
        className={`caps fixed right-5 bottom-5 z-[55] flex min-h-[48px] items-center gap-3 px-7 py-4 shadow-[0_10px_40px_rgb(0_0_0/0.25)] transition-colors duration-500 md:right-8 md:bottom-7 ${
          open ? 'bg-brick text-white' : 'bg-champagne text-ink hover:bg-gold'
        }`}
      >
        <IconWhatsApp />
        Book <em className="normal-case">on WhatsApp</em>
      </a>

      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />

      <Menu open={open} current={path} onClose={close} onNavigate={navigate} />

      {/* Leave wipe: champagne, brick, then ink on top, sliding in from the right. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
        {slab('bg-champagne', 0)}
        {slab('bg-brick', 1)}
        {slab('bg-ink', 2)}
      </div>
      {/* Arrive wipe (only after an internal link): ink, brick, champagne slide away to the left. */}
      <div aria-hidden className="page-reveal pointer-events-none fixed inset-0 z-[70]">
        <span className="bg-champagne" style={{animationDelay: '0.26s'}} />
        <span className="bg-brick" style={{animationDelay: '0.13s'}} />
        <span className="bg-ink" style={{animationDelay: '0s'}} />
      </div>

      <div className="grain" aria-hidden />
    </>
  );
}
