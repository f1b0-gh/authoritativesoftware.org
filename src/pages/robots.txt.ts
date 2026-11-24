import { siteHref } from '../../site.config.mjs';

export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${siteHref('sitemap.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
