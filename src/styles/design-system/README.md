# Authoritative Software design system

Integrated from the supplied **Authoritative Software Design System** bundle on 22 November 2026. The complete, unmodified supplied bundle lives in `resources/design-system/`, and its `tokens.css` is imported directly; `components.css` retains its patterns, copied from `resources/design-system/components/bundle.css` with its remote font import replaced by locally hosted fonts and their licenses in `src/assets/fonts/`.

The site uses square panels, hairlines, Source Serif 4 for declaration text, IBM Plex Sans for explanations and IBM Plex Mono for identifiers. Statement, finding and decision records have explicit labels and distinct edges; findings use neutral, amber or rust tones, never a success colour. Definition links use a dotted underline. Print preserves declaration status and provision labels; dark mode follows the reader's system preference.

Astro components implement the patterns used by the site. Markdown presentation adds definition anchors and links, and provision markers without changing the downloadable text. The edition-comparison pattern is reserved for published releases; draft development stays in repository history. Bundle preview wording and version numbers are examples, not declaration revisions. The site's reviewed declaration and integrity record remain authoritative for its own edition.

Layout, responsive and print adaptations are in `global.css`; automatic dark-mode tokens are in `theme.css`. Update them together if changing the supplied tokens. Regenerate the share card with `npm run social:render` after typography changes.

The updated asymmetric mark is imported directly from the resource SVGs in `BrandMark.astro`, selecting the supplied dark version with a media query. The one-line serif lockup is used in the header and footer. `BrandBand.astro` reuses the supplied cover SVG with token colors; the relationship illustration uses the same asymmetric mark with its labels outside the shape. Favicon and app icon are copied from the corresponding bundle assets. The share image is regenerated because the supplied PNG still depicts the retired logo.
