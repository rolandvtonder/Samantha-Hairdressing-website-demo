import {LinkButton, WhatsAppButton} from '../components/Bits';

export function NotFound() {
  return (
    <section className="flex min-h-svh items-center bg-ink px-5 py-32 md:px-14">
      <div className="mx-auto w-full max-w-[1680px]">
        <p className="caps tracking-[0.24em] text-gold">Error 404</p>
        <h1 className="display mt-4 text-[clamp(54px,8vw,146px)]">
          <span className="block">Bad hair</span>
          <span className="it block text-champagne">day?</span>
        </h1>
        <p className="prose-salon mt-8 max-w-md text-white/85">We couldn’t find that page. Let’s get you back to something beautiful.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/" tone="outline-light">
            Back home
          </LinkButton>
          <WhatsAppButton tone="light" />
        </div>
      </div>
    </section>
  );
}
