# Authoritative Software

A document-of-record system for a draft standard. It should look precise, versioned and neutral: closer to a well-set specification than to a product launch. Every visual choice serves one job, which is helping a reader tell **who says what, what supports it, and what they choose to rely on**.

## Principles

1. **Say what kind of text it is.** Declaration text and explanation look different, every time. A reader should never mistake commentary for a requirement.
2. **Statements, findings and decisions never look alike.** They're the core distinction of the proposal, so the design keeps them distinct.
3. **Status is visible.** Draft status, version and date sit on every declaration surface and travel with copies.
4. **Neutral about outcomes.** Findings use labels and glyphs, not traffic-light colours. Expired isn't a defect, and nothing is green.
5. **Borders, not shadows. Square, not rounded.** Hairlines in `line` carry structure. The single shadow (`shadow-lift`) belongs to the home diagram.
6. **One hue.** `accent` is for links, actions, focus and the mark. It never means a status.

## Content fundamentals

- **Voice:** plain, declarative, calm. Short sentences. No exclamation marks, no hype, no "revolutionary".
- **Honesty about limits:** say once, clearly, what something is not ("Draft", "Illustration only"). Don't scatter disclaimers through every paragraph.
- **No borrowed authority:** never imply endorsement by a standards body, a company or the cited authors. Don't use logos of other organizations.
- **Terms:** capitalise defined terms only inside declaration text (*Operator*, *Finding*, *Decision*). In explanations use lower case and link the first use with `DefinedTerm`.
- **Spelling:** English with -ize (organization, authorize), as in the declaration.
- **Examples** are fictional and dated, and use `example.org` domains.

## Visual foundations

- **Type:** headings and declaration text in `serif` (Source Serif 4), interface and explanations in `sans` (IBM Plex Sans), identifiers in `mono` (IBM Plex Mono). All three are free and hosted on Google Fonts. Headings are regular weight with tight tracking (`display-l`, `heading`); only `heading-s` goes semibold.
- **Colour:** `paper` ground, `ink` text, `ink-muted` secondary, `accent` for interaction. Status pairs are `draft-ink` on `draft-tint`, `conflict-ink` on `conflict-tint` and `neutral-ink` on `neutral-tint`. Every text pair is 4.5:1 or better in both themes.
- **Layout:** pages sit in a `shell-max` shell. Reading text never exceeds `measure-prose`. Sections separate with `space-16` on desktop and `space-12` on mobile.
- **Edges:** `radius-0` everywhere. `line` for decoration, `line-strong` for any edge that must be seen (3:1).
- **Focus:** a 3px `accent` outline, offset 5px, `radius-1`.
- **Motion:** none beyond smooth anchor scrolling. Respect `prefers-reduced-motion`.

## Iconography

There is no icon set. The only mark is an asymmetric pair: an outlined circle for the operator's assertion, a tinted circle (`accent-soft`) for the consumer's acceptance, and their overlap solid in `accent` for authority. The two acts are different, so the circles are never identical. The mark sits before the name in the header, and on an `accent` tile with `radius-mark` as the app icon. See the Logos group for files and rules. Finding labels use text glyphs (`●`, `◐`, `○`, `▲`, `⏱`, `↺`) and are always paired with a word. Don't add pictograms, shields, padlocks or check-mark badges: they imply certification.

## Components

| Component | Use |
| --- | --- |
| `StatusBanner` | Draft, version, date and change link at the top of every declaration surface |
| `ProvisionMarker` | Labels a block as *Declaration text* (normative) or *Explanation* |
| `DefinedTerm` | Links a defined word back to its definition |
| `RecordBlock` | Three variants: statement (operator), finding (assessment), decision (consumer) |
| `FindingLabel` | Labels that can stack: established, within period, expired, withdrawn, conflict, unanswered |
| `Button` | Primary, light and text link |
| `EditionChange` | Shows what changed between two editions of the declaration |

The styles live in `components/bundle.css` as plain CSS classes prefixed `as-`, built only on these tokens. There's no JavaScript bundle: the components are static HTML patterns, matching the site's no-JavaScript reading requirement.

## Provenance

Built from `f1b0-gh/authoritativesoftware.org` at `main@0d6a500` (`src/styles/global.css`, `public/favicon.svg`, `public/social.png`).

**From the code:** `paper`, `surface`, `ink`, `ink-muted`, `line`, `accent`, `accent-hover`, `accent-tint`, `selection`, `draft-ink`, `draft-tint` (light values), the display sizes, `shell-max`, the square radii and `shadow-lift`.

**Proposed here, not yet in the code:** the whole dark theme; the three font families (the site currently names Inter without loading it, and uses Georgia); `line-strong`, `conflict-*`, `neutral-*`, `on-accent`, `accent-soft`, `accent-soft-on-accent` and `measure-prose`; all seven components; and the asymmetric-pair mark, which replaces the site's current two-outline mark.
