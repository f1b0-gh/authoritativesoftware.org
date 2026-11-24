import test from 'node:test';
import assert from 'node:assert/strict';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { documentPresentation } from '../src/lib/document-presentation.mjs';

test('declaration definitions and provisions gain anchors without changing their words or scope', async () => {
  const markdown = await createMarkdownProcessor({ rehypePlugins: [[documentPresentation, { declaration: true }]] });
  const { code } = await markdown.render('## Definitions\n\n**Artifact** — Exact bytes.\n\n## Principles\n\n### 1. Identify\n\nBind the **digest**.\n\n### 2. Check\n\nCheck the bytes.\n\n## Limits\n\nOutside the principles.');
  assert.match(code, /<dl class="as-definition" id="definition-artifact"><dt>Artifact<\/dt><dd>Exact bytes\.<\/dd><\/dl>/);
  assert.equal((code.match(/class="as-provision"/g) ?? []).length, 2);
  assert.match(code, /aria-label="Declaration principle 1"/);
  assert.match(code, /Bind the <strong>digest<\/strong>\./);
  assert.match(code, /<\/section>\s*<h2 id="limits">/);
  assert.ok(code.endsWith('<p>Outside the principles.</p>'));
});

test('only the first prose mention links each defined term, respecting code, headings and existing links', async () => {
  const markdown = await createMarkdownProcessor({ rehypePlugins: [[documentPresentation, { declarationUrl: '/project/declaration/' }]] });
  const { code } = await markdown.render('# Authority\n\n[claim](https://example.org) `artifact`\n\nAn artifact and another artifact. A **consumer** checks a claim. Authority remains optional.');
  assert.match(code, /<h1 id="authority">Authority<\/h1>/);
  assert.match(code, /<code>artifact<\/code>/);
  assert.match(code, /<a href="https:\/\/example.org">claim<\/a>/);
  assert.equal((code.match(/href="\/project\/declaration\/#definition-artifact"/g) ?? []).length, 1);
  for (const term of ['consumer', 'authority']) assert.ok(code.includes(`/project/declaration/#definition-${term}`));
  assert.ok(!code.includes('#definition-claim'));
  assert.match(code, /<strong><a href="\/project\/declaration\/#definition-consumer" class="as-term">consumer<\/a><\/strong>/);
});
