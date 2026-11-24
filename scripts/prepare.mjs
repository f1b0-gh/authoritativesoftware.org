import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const source = (await readFile(new URL('docs/declaration.md', root), 'utf8')).replace(/\r\n/g, '\n');
const declaration = source.replace(/^---\n[\s\S]*?\n---\n/, '');
const provenance = JSON.parse(await readFile(new URL('source-provenance.json', root), 'utf8'));
const declaredVersion = declaration.match(/^\*\*Version ([^*]+)\*\*$/m)?.[1];
if (!declaredVersion || declaredVersion !== provenance.version) {
  throw new Error('Declaration and integrity record versions must match.');
}
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
if (sha256(declaration) !== provenance.sha256) {
  throw new Error('Declaration differs from the reviewed website edition. Review the text and integrity record before publishing.');
}
await mkdir(new URL('public/', root), { recursive: true });
await writeFile(new URL('public/AUTHORITY.md', root), declaration);
// Keep the previously published download URL serving the current declaration.
await writeFile(new URL('public/authority.md', root), declaration);
await writeFile(new URL('public/declaration-integrity.json', root), JSON.stringify(provenance, null, 2) + '\n');
