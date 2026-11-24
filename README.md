# Authoritative Software

The explanatory website for **authoritativesoftware.org**, built with Astro and the published `@astrokjs/astro` and `@astrokjs/okf` packages. It presents the AUTHORITY.md draft, why it exists, what it could change, examples and practical questions for publishers and consumers. The public explanations focus on commitments and decisions without prescribing technical means.

Use Node 24:

```sh
npm ci
npm run dev
```

The `.node-version` file selects Node 24 for compatible version managers and CI. Check `node --version` before starting; Node 18 is unsupported.

Open the local address printed by Astro. To produce the static site:

```sh
npm run check
npm run build
npm test
npm run preview
```

`dist/` is the deployable site. Local builds default to `https://authoritativesoftware.org/`. Set `SITE_URL` to build and test for another origin and path, for example:

```sh
SITE_URL=https://f1b0-gh.github.io/authoritativesoftware.org/ npm run verify
```

Use the same `SITE_URL` when running preview or browser checks separately. Building does not publish the site or configure DNS.

Browser checks use Playwright Chromium. Install it with `npx playwright install chromium`, or set `CHROME_PATH` to an existing Chrome executable, then run `npm run test:browser`. `npm run verify` runs all checks, including the browser suite.

Edit canonical prose in `docs/`, presentation in `src/`, and static assets in `public/`. Astrok generates `public/okf/`; do not edit it. The build generates the exact declaration download from `docs/declaration.md`, checking its SHA-256 against `source-provenance.json`. For an intentional declaration update, review its complete text and update the unsigned integrity record together. The current download uses UTF-8 and LF line endings; `.gitattributes` enforces LF on checkout, and preparation normalizes CRLF before hashing. The build publishes `declaration-integrity.json` from the record. No sibling checkout is needed to install or build.

Local notes and evidence belong in ignored `.local/`. Use Jujutsu for version control. The included Apache-2.0 license is retained from the supplied declaration source.

Website version comes from `package.json`; declaration version comes from `source-provenance.json` and must agree with `docs/declaration.md`. The website is 0.1.0; the declaration is `AUTHORITY.md` 0.1.0. Website releases and declaration revisions are versioned independently. Published declaration changes receive a new declaration version and an updated integrity record. Future verification profiles need separate identifiers and versions.

GitHub Actions runs `npm ci` and `npm run verify` on pushes to `main` and pull requests, with Chromium installed for the desktop/mobile browser suite. CI checks types, the production build, declaration integrity, declaration-version consistency, local links, accessibility, keyboard navigation, 404 behavior and reading without JavaScript. Successful runs retain the static site and browser reports for 14 days. The build job has read-only permissions. On `main`, a separate deployment job publishes the verified build to [GitHub Pages](https://f1b0-gh.github.io/authoritativesoftware.org/) with Pages and OpenID Connect permissions. Pull requests are checked without deploying. The workflow can also be started manually from the Actions tab.

The workflow reads the deployment URL from GitHub Pages settings and uses it for navigation, canonical URLs, downloads and discovery endpoints. To assign `authoritativesoftware.org` later, configure the custom domain and DNS through GitHub Pages, then rerun the workflow so the build adopts the new URL. No custom domain is assigned by this repository.

Navigation, sitemap and agent reading links share `src/lib/pages.mjs`. Add a document there when adding it to `docs/`; the tests intentionally keep an independent list of required public pages.

The checked-in social preview is `public/social.png`, rendered from `scripts/social-card.html`. After changing its source, run `npm run social:render` with Playwright Chromium installed or `CHROME_PATH` set, inspect the PNG and commit both files.

Astrok owns Markdown discovery, source links and generated source manifests. Its exact beta versions are pinned in `package.json` and the lockfile. Before upgrading, review upstream changes and dependencies, then run the full verification suite against both the project path and domain root. A dependency pin is reproducibility control, not proof of security. Canonical Markdown remains independent of generated output, and installation never depends on a sibling checkout.

The complete supplied design system is retained in `resources/design-system/`. Its tokens are used directly; site-specific styles are in `src/styles/` and Astro components in `src/components/`. Local fonts and licenses are in `src/assets/fonts/`. See `src/styles/design-system/README.md` for the integration conventions. The resource bundle includes illustrative previews, which are not published as website pages.
