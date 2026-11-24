import { origin, base } from './site.config.mjs';
import { defineConfig } from 'astro/config';
import { okfIntegration } from '@astrokjs/astro';

export default defineConfig({
  site: origin,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [okfIntegration({ root: './docs', presentation: 'plain', graph: false })],
  markdown: { shikiConfig: { theme: 'github-light' } },
});
