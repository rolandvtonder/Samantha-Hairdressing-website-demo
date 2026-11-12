import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App';
import {findRoute} from './seo';
import {stripBase} from './lib/url';
import './index.css';

// The hero effects depend on scroll position; always start each page at the top
// unless the address points at a section.
if ('scrollRestoration' in history && !location.hash) history.scrollRestoration = 'manual';

const el = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App path={stripBase(location.pathname)} />
  </StrictMode>
);

if (el.firstElementChild) {
  // Built site: the page HTML is already there, just bring it to life.
  hydrateRoot(el, app);
} else {
  // Dev server: render from scratch and set the title the build would have baked in.
  document.title = findRoute(stripBase(location.pathname)).title;
  createRoot(el).render(app);
}
