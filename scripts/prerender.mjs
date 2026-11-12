/**
 * Writes a complete, crawlable HTML file for every page (title, meta tags,
 * structured data and the full page content), plus sitemap.xml and 404.html.
 * Runs after `vite build` and `vite build --ssr`.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const {render, routes, SITE_URL} = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const page = (p) => {
  const {html, head} = render(p);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

for (const r of routes) {
  const dir = path.join(dist, r.path);
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, 'index.html'), page(r.path));
  console.log('  prerendered', r.path);
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${today}</lastmod><priority>${r.path === '/' ? '1.0' : '0.8'}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
// GitHub Pages: serve files as-is (no Jekyll processing).
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
fs.rmSync(ssrDir, {recursive: true, force: true});
console.log('  sitemap.xml + 404.html written');
