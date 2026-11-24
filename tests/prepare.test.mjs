import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
function fixture(run) {
  mkdirSync(join(root, '.local'), { recursive: true });
  const dir = mkdtempSync(join(root, '.local/prepare-'));
  try {
    for (const name of ['scripts', 'docs', 'public', 'source-provenance.json', 'package.json']) cpSync(join(root, name), join(dir, name), { recursive: true });
    run(dir);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

test('CRLF sources produce the same reviewed LF declaration', () => fixture(dir => {
  const source = join(dir, 'docs/declaration.md');
  const original = readFileSync(source, 'utf8');
  writeFileSync(source, original.replace(/\r?\n/g, '\r\n'));
  execFileSync(process.execPath, [join(dir, 'scripts/prepare.mjs')]);
  assert.equal(readFileSync(join(dir, 'public/AUTHORITY.md'), 'utf8'), original.replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\n/, ''));
}));

test('website patch releases do not require declaration renumbering', () => fixture(dir => {
  const path = join(dir, 'package.json');
  const pkg = JSON.parse(readFileSync(path));
  pkg.version = '0.1.1';
  writeFileSync(path, JSON.stringify(pkg));
  execFileSync(process.execPath, [join(dir, 'scripts/prepare.mjs')]);
  assert.ok(readFileSync(join(dir, 'public/AUTHORITY.md'), 'utf8').includes('**Version 0.1.0**'));
}));

test('unreviewed declaration changes are refused', () => fixture(dir => {
  const path = join(dir, 'docs/declaration.md');
  writeFileSync(path, readFileSync(path, 'utf8') + '\nUnreviewed change.\n');
  assert.throws(() => execFileSync(process.execPath, [join(dir, 'scripts/prepare.mjs')], { stdio: 'pipe' }), /Declaration differs/);
}));
