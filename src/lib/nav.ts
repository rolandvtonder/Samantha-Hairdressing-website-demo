/**
 * Page changes. Every page is its own pre-rendered HTML file (good for
 * search engines), so moving between them is a normal page load. To make
 * that feel like one site, an internal link first plays the three-slab wipe
 * to cover the screen, then loads the next page — which opens by wiping the
 * slabs away (see `.page-reveal` in index.css).
 */

export const LEAVE_EVENT = 'sh:leave';
const WIPE_MS = 720;

export function isInternal(a: HTMLAnchorElement, e: MouseEvent): boolean {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  if (a.target && a.target !== '_self') return false;
  if (a.hasAttribute('download')) return false;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return false;
  // Same page, different anchor: let the browser / Lenis scroll there.
  if (url.pathname === location.pathname && url.hash) return false;
  return true;
}

export function go(href: string, reduced: boolean) {
  const url = new URL(href, location.href);
  if (url.pathname === location.pathname && !url.hash) {
    window.scrollTo({top: 0, behavior: reduced ? 'auto' : 'smooth'});
    return;
  }
  if (reduced) {
    location.assign(url.href);
    return;
  }
  try {
    sessionStorage.setItem('sh-nav', '1');
  } catch {
    /* private mode: the next page just opens without the wipe */
  }
  window.dispatchEvent(new CustomEvent(LEAVE_EVENT));
  window.setTimeout(() => location.assign(url.href), WIPE_MS);
}
