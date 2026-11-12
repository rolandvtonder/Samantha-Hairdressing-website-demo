/**
 * The site can live at a domain root ("/") or under a sub-folder (the GitHub
 * Pages demo lives at /Samantha-Hairdressing-website-demo/). Page paths in
 * the code are always written from the root ("/services/"); these helpers
 * add or remove the sub-folder.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** "/services/" -> "/Samantha-Hairdressing-website-demo/services/" on the demo. */
export const link = (p: string) => (p.startsWith('/') ? `${BASE}${p}` : p);

/** The page path without the sub-folder, for picking which page to show. */
export const stripBase = (p: string) => (BASE && p.startsWith(BASE) ? p.slice(BASE.length) || '/' : p);
