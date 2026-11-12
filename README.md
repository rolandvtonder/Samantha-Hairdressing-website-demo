# Samantha Hairdressing — website demo

Demo website for **Samantha Hairdressing**, a hair salon at 211 Monument Road, Glen Marais, Kempton Park.

**Live demo:** https://rolandvtonder.github.io/Samantha-Hairdressing-website-demo/

Pages: Home · Services · Gallery · About & team · Specials & reviews · Contact & booking.

## Editing

All text, contact details, hours, services and photo captions live in [`src/content.ts`](src/content.ts).
Items marked `TODO(owner)` are placeholders to confirm before launch.

## Running locally

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production files in dist/
```

Every push to `main` rebuilds the demo and publishes it to the `gh-pages` branch
(see [`.github/workflows/pages.yml`](.github/workflows/pages.yml)). The demo is marked
`noindex` so it stays out of Google; the real-domain build (`npm run build`) is fully indexable.
