import {useEffect, useRef, type ReactNode} from 'react';
import type {Line} from '../content';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {media} from './Img';

/**
 * A full-bleed photo with a slow push-in, under a large condensed serif
 * headline that mixes upright and italic lines. As you scroll on, the photo
 * blurs, dims and shrinks back — the camera pulling away — as the
 * transition into the next section.
 */
export function Hero({
  eyebrow,
  lines,
  body,
  img,
  imgMobile,
  alt,
  full = false,
  children,
  position = 'center',
}: {
  eyebrow: string;
  lines: Line[];
  body?: string;
  img: string;
  imgMobile?: string;
  alt: string;
  full?: boolean;
  children?: ReactNode;
  position?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const st = stage.current;
        if (!el || !st) return;
        const r = el.getBoundingClientRect();
        const h = r.height || window.innerHeight;
        const p = clamp(-r.top / h);
        if (p >= 1) return;
        st.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        st.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  const m = imgMobile ?? img;

  return (
    <section ref={root} className={`relative overflow-hidden bg-ink ${full ? 'h-svh min-h-[640px]' : 'h-[86svh] min-h-[600px]'}`}>
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet={`${media(`${m}-640.webp`)} 640w, ${media(`${m}-1280.webp`)} 1280w`} sizes="100vw" />
          <img
            src={media(`${img}-1280.webp`)}
            srcSet={`${media(`${img}-640.webp`)} 640w, ${media(`${img}-1280.webp`)} 1280w`}
            sizes="100vw"
            alt={alt}
            fetchPriority="high"
            decoding="async"
            className="kenburns h-full w-full object-cover"
            style={{objectPosition: position}}
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(28_21_18/0.78),rgb(28_21_18/0.25)_60%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgb(28_21_18/0.7),transparent)]" />
        {/* Phones: the headline sits over the photo, so darken it a touch more. */}
        <div className="absolute inset-0 bg-ink/30 md:hidden" />

        <div className={`absolute inset-0 mx-auto flex max-w-[1680px] flex-col px-5 md:px-14 ${full ? 'pt-[clamp(110px,16vh,170px)]' : 'justify-end pb-[clamp(56px,10vh,110px)]'}`}>
          <h1 className="display text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <span className="caps mb-6 block text-[12px] tracking-[0.24em] text-champagne not-italic">{eyebrow}</span>
            <span className={`block ${full ? 'text-[clamp(54px,8vw,146px)]' : 'text-[clamp(48px,7vw,120px)]'}`}>
              {lines.map((l, i) => (
                <span key={l.t} className={`block ${l.i ? 'it text-champagne' : ''} ${i === 0 ? 'pl-[1.2em] max-sm:pl-[0.6em]' : ''}`}>
                  {l.t}
                </span>
              ))}
            </span>
          </h1>
          {body && <p className="prose-salon mt-8 ml-[clamp(0px,16vw,300px)] max-w-[440px] text-[16px] text-white/90 max-md:ml-0 md:text-[17px]">{body}</p>}
          {children && <div className="mt-8 ml-[clamp(0px,16vw,300px)] flex flex-wrap gap-3 max-md:ml-0">{children}</div>}
        </div>
      </div>
    </section>
  );
}
