import images from '../data/images.json';

const sizes = images as Record<string, {w: number; h: number}>;
export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

/** Responsive WebP photo with real width/height so the page never jumps. */
export function Img({
  name,
  alt,
  className = '',
  sizesAttr = '(max-width: 768px) 100vw, 50vw',
  eager = false,
}: {
  name: string;
  alt: string;
  className?: string;
  sizesAttr?: string;
  eager?: boolean;
}) {
  const s = sizes[name] ?? {w: 1280, h: 1600};
  const big = Math.min(1280, s.w);
  const small = Math.min(640, s.w);
  return (
    <img
      src={media(`${name}-1280.webp`)}
      srcSet={`${media(`${name}-640.webp`)} ${small}w, ${media(`${name}-1280.webp`)} ${big}w`}
      sizes={sizesAttr}
      width={big}
      height={Math.round((s.h / s.w) * big)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      fetchPriority={eager ? 'high' : undefined}
      className={className}
    />
  );
}
