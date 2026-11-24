// Presentation and discovery share a reading path. Tests independently assert
// the public pages required by the editorial contract.
export const pages = [
  { id: '', label: 'Introduction', summary: 'The proposal and its draft status' },
  { id: 'why-now', label: 'Why it exists', summary: 'The problem and what the proposal could change', main: true },
  { id: 'understanding-authority', label: 'Understand', summary: 'Statements, findings and decisions', main: true },
  { id: 'use-it', label: 'Use it', summary: 'Make commitments and consumer choices explicit', main: true },
  { id: 'examples', label: 'Examples', summary: 'Fictional adoption and relative-date teaching scenarios' },
  { id: 'related-practices', label: 'Related practices', summary: 'When the declaration adds value alongside SECURITY.md, SBOMs, CRA, SLSA and Sigstore' },
  { id: 'declaration', label: 'The declaration', summary: 'The AUTHORITY.md draft', main: true },
  { id: 'about', label: 'About', summary: 'Editorial status and draft development' },
];
export const readingPages = pages.filter(page => page.id);
export function pagePath(/** @type {string} */ id) { return id ? `${id}/` : ''; }
