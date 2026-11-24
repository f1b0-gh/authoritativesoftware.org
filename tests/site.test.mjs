import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const deployment = new URL(process.env.SITE_URL ?? 'https://authoritativesoftware.org/');
const base = deployment.pathname.replace(/\/?$/, '/');
const origin = deployment.origin;
const { version } = JSON.parse(readFileSync(new URL('../source-provenance.json', import.meta.url), 'utf8'));
const expectedTitles = {
  '': 'Authoritative Software — Explicitly asserted, independently evaluated',
  'why-now/': 'Why this exists, and what it could change — Authoritative Software',
  'understanding-authority/': 'Authority is asserted; reliance is chosen — Authoritative Software',
  'use-it/': 'Make commitments and choices explicit — Authoritative Software',
  'examples/': 'Follow the claim, not the name — Authoritative Software',
  'related-practices/': 'How AUTHORITY.md fits with existing practices — Authoritative Software',
  'declaration/': 'AUTHORITY.md — Authoritative Software',
  'about/': 'About this proposal — Authoritative Software',
};
const pages = Object.keys(expectedTitles);

test('the complete learning path is published with one heading and exact canonical and social metadata', () => {
  for (const page of pages) {
    const path = new URL(`${page}index.html`, root);
    assert.ok(existsSync(path), `Missing built page: /${page}`);
    const html = readFileSync(path, 'utf8');
    assert.ok(html.includes(`Draft proposal · AUTHORITY.md ${version}`), `Release label: ${page}`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `One primary heading: ${page}`);
    assert.equal(html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/)?.[1], `${origin}${base}${page}`, `Canonical: ${page}`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.equal(title, expectedTitles[page], `Title: ${page}`);
    assert.equal(html.match(/<meta property="og:url" content="([^"]+)"/)?.[1], `${origin}${base}${page}`, `Social URL: ${page}`);
    assert.equal(html.match(/<meta property="og:title" content="([^"]+)"/)?.[1], title);
    assert.equal(html.match(/<meta property="og:image" content="([^"]+)"/)?.[1], `${origin}${base}social.png`);
  }
});

test('the downloadable declaration matches the reviewed website edition', () => {
  const file = new URL('AUTHORITY.md', root);
  assert.ok(existsSync(file), 'Downloadable declaration is missing');
  const metadata = JSON.parse(readFileSync(new URL('../source-provenance.json', import.meta.url)));
  assert.equal(metadata.version, version, 'Declaration and integrity record agree');
  assert.ok(readFileSync(file, 'utf8').includes(`**Version ${version}**`));
  assert.equal(createHash('sha256').update(readFileSync(file)).digest('hex'), metadata.sha256);
  assert.equal(metadata.document, 'AUTHORITY.md');
  assert.deepEqual(readFileSync(new URL('authority.md', root)), readFileSync(file), 'Previously published lowercase download stays current');
  const document = readFileSync(new URL('../docs/declaration.md', import.meta.url), 'utf8');
  assert.equal(document.replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\n/, ''), readFileSync(file, 'utf8'));
});

test('every local link, image and fragment resolves in the build', () => {
  assert.ok(existsSync(root), 'Build output is missing');
  function walk(path) {
    return readdirSync(path, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(path, entry.name)) : [join(path, entry.name)]);
  }
  for (const file of walk(root.pathname).filter(path => path.endsWith('.html'))) {
    const route = file.slice(root.pathname.length).replace(/index\.html$/, '');
    const html = readFileSync(file, 'utf8');
    for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(value.replaceAll('&amp;', '&'), `${origin}${base}${route}`);
      if (url.origin !== origin) continue;
      assert.ok(url.pathname.startsWith(base), `${route}: link escapes deployment base: ${value}`);
      const relative = decodeURIComponent(url.pathname.slice(base.length));
      let target = new URL(relative || 'index.html', root);
      if (url.pathname.endsWith('/')) target = new URL(`${relative}index.html`, root);
      assert.ok(existsSync(target), `${route}: missing ${value}`);
      if (url.hash && target.pathname.endsWith('.html')) {
        const targetHtml = readFileSync(target, 'utf8');
        assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: missing fragment ${value}`);
      }
    }
  }
});

test('Astrok publishes the declaration and guides as discoverable Markdown', () => {
  const path = new URL('okf/manifest.json', root);
  assert.ok(existsSync(path), 'Astrok manifest is missing');
  const manifest = JSON.parse(readFileSync(path, 'utf8'));
  for (const id of ['declaration', 'use-it', 'why-now', 'examples', 'related-practices']) {
    const doc = manifest.documents.find(document => document.id === id);
    assert.ok(doc, `Missing source: ${id}`);
    assert.ok(doc.sourceUrl.startsWith(base));
    assert.ok(existsSync(new URL(doc.sourceUrl.slice(base.length), root)));
  }
});


test('discovery endpoints describe the selected deployment URL', () => {
  const sitemap = readFileSync(new URL('sitemap.xml', root), 'utf8');
  for (const page of pages) assert.ok(sitemap.includes(`<loc>${origin}${base}${page}</loc>`));
  const robots = readFileSync(new URL('robots.txt', root), 'utf8');
  assert.ok(robots.includes(`Sitemap: ${origin}${base}sitemap.xml`));
  const guide = readFileSync(new URL('llms.txt', root), 'utf8');
  assert.ok(guide.includes(`Manifest: ${origin}${base}okf/manifest.json`));
  assert.ok(guide.includes(`${origin}${base}AUTHORITY.md`));
});


test('the share image is a 1200 by 630 PNG', () => {
  const png = readFileSync(new URL('social.png', root));
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.deepEqual(png, readFileSync(new URL('../public/social.png', import.meta.url)), 'Built share image matches the current artwork');
});

test('the current declaration has an inspectable integrity record', () => {
  const metadata = JSON.parse(readFileSync(new URL('declaration-integrity.json', root)));
  assert.equal(createHash('sha256').update(readFileSync(new URL('AUTHORITY.md', root))).digest('hex'), metadata.sha256);
});

test('the standalone declaration uses self-contained references', () => {
  const declaration = readFileSync(new URL('AUTHORITY.md', root), 'utf8');
  for (const [, href] of declaration.matchAll(/\]\(([^)]+)\)/g)) {
    assert.match(href, /^(https?:\/\/|#)/, `Reference must work outside the documentation renderer: ${href}`);
  }
});
