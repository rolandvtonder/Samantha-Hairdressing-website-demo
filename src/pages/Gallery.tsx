import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {gallery, galleryCats, type GalleryCat} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Eyebrow, Heading, WhatsAppButton} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconChevron} from '../components/Icons';
import {Img, media} from '../components/Img';
import {lockScroll} from '../lib/scroll';

export function Gallery() {
  const ref = useReveals<HTMLDivElement>();
  const [cat, setCat] = useState<GalleryCat | 'all'>('all');
  const [index, setIndex] = useState(-1);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const list = useMemo(() => (cat === 'all' ? gallery : gallery.filter((g) => g.cat === cat)), [cat]);
  const current = index >= 0 ? list[index] : null;

  const open = (i: number, btn: HTMLButtonElement) => {
    opener.current = btn;
    setIndex(i);
    dialog.current?.showModal();
    lockScroll(true);
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback((d: number) => setIndex((i) => (i + d + list.length) % list.length), [list.length]);

  useEffect(() => {
    const dl = dialog.current!;
    const onClose = () => {
      setIndex(-1);
      lockScroll(false);
      opener.current?.focus({preventScroll: true});
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    dl.addEventListener('close', onClose);
    dl.addEventListener('keydown', onKey);
    return () => {
      dl.removeEventListener('close', onClose);
      dl.removeEventListener('keydown', onKey);
    };
  }, [step]);

  return (
    <div ref={ref}>
      <Hero
        eyebrow="Gallery · Hair transformations"
        lines={[{t: 'The work'}, {t: 'speaks.', i: true}]}
        body="Balayage, platinum and ash blondes, rich brunettes, colour corrections and fresh short cuts — all done in our Glen Marais salon."
        img="editorial-hair-flip"
        alt="Model mid hair-flip showing long glossy brunette waves"
        position="center 30%"
      />

      <section className="bg-paper px-5 py-16 text-ink md:px-14 md:py-24" aria-labelledby="gal-title">
        <div className="mx-auto max-w-[1680px]">
          <h2 id="gal-title" className="sr-only">
            Hair gallery
          </h2>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
              {galleryCats.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={cat === c.id}
                  onClick={() => setCat(c.id)}
                  className={`caps min-h-[44px] cursor-pointer border px-4 transition-colors duration-300 ${cat === c.id ? 'border-ink bg-ink text-white' : 'border-ink/25 text-ink/80 hover:border-ink'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className="caps text-ink/65" aria-live="polite">
              {list.length} photos
            </p>
          </div>

          <ul className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
            {list.map((g, i) => (
              <li key={g.img} className="mb-3 break-inside-avoid md:mb-4">
                <button type="button" onClick={(e) => open(i, e.currentTarget)} className="group block w-full cursor-zoom-in overflow-hidden bg-ink/10" aria-label={`View larger: ${g.alt}`}>
                  <Img name={g.img} alt={g.alt} sizesAttr="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw" className="h-auto w-full transition-transform duration-700 ease-silk group-hover:scale-[1.03]" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink px-5 py-24 md:px-14 md:py-28">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-10">
          <div data-reveal>
            <Eyebrow className="text-gold">Love a look?</Eyebrow>
            <Heading lines={[{t: 'Book your'}, {t: 'transformation', i: true}]} className="mt-4" />
          </div>
          <div data-reveal>
            <WhatsAppButton tone="light" text="Hi Samantha, I saw a look in your gallery that I love — can I book?" />
          </div>
        </div>
      </section>

      <dialog ref={dialog} aria-label="Photo viewer" className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white" onClick={(e) => e.target === e.currentTarget && close()}>
        {current && (
          <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-4 p-4 md:p-10">
            <img src={media(`${current.img}-1280.webp`)} alt={current.alt} className="pointer-events-auto max-h-[80dvh] max-w-full object-contain" />
            <p className="pointer-events-auto max-w-xl text-center font-text text-[15px] text-white/85">
              {current.alt} <span className="caps ml-2 text-white/55">{index + 1} / {list.length}</span>
            </p>
          </div>
        )}
        <button type="button" onClick={close} className="caps absolute top-5 right-5 min-h-[48px] cursor-pointer bg-white px-6 text-ink" autoFocus>
          Close
        </button>
        <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute top-1/2 left-3 grid size-12 -translate-y-1/2 cursor-pointer place-items-center bg-white/15 backdrop-blur hover:bg-white/30 md:left-6">
          <IconChevron dir="left" className="size-6" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute top-1/2 right-3 grid size-12 -translate-y-1/2 cursor-pointer place-items-center bg-white/15 backdrop-blur hover:bg-white/30 md:right-6">
          <IconChevron className="size-6" />
        </button>
      </dialog>
    </div>
  );
}
