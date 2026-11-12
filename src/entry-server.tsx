import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';
import {SITE_URL} from './content';
import {headFor, notFound, routes} from './seo';

/** Used at build time by scripts/prerender.mjs to write one HTML file per page. */
export function render(path: string) {
  const route = routes.find((r) => r.path === path) ?? notFound;
  const html = renderToString(
    <StrictMode>
      <App path={route.path} />
    </StrictMode>,
  );
  return {html, head: headFor(route)};
}

export {routes, SITE_URL};
