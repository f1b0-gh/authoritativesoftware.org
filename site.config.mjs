const deployment = new URL(process.env.SITE_URL ?? 'https://authoritativesoftware.org/');
if (!['https:', 'http:'].includes(deployment.protocol) || deployment.search || deployment.hash) {
  throw new Error('SITE_URL must be an HTTP(S) URL without a query or fragment.');
}

export const origin = deployment.origin;
export const base = deployment.pathname.replace(/\/?$/, '/');

/** Resolve a site-relative path beneath the deployment base. */
export function sitePath(/** @type {string} */ path = '') {
  return base + path.replace(/^\/+/, '');
}

export function siteHref(/** @type {string} */ path = '') {
  return new URL(sitePath(path), origin).href;
}
