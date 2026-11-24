import { siteHref } from '../../site.config.mjs';
import { pages, pagePath } from '../lib/pages.mjs';
export function GET() {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>${siteHref(pagePath(page.id))}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
