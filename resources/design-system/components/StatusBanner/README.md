# StatusBanner

Shows the declaration's status, version, publication date and a link to what changed, at the top of every declaration surface.

**Use** on the declaration page, above the downloadable text (as a plain-text line in `AUTHORITY.md`), and on any page that quotes provisions at length.

**Consumer provides:** the status word (`Draft` or `Final`), the exact version, an absolute date, and a link to the change record or edition history.

**Rules**
- Draft uses `draft-ink` on `draft-tint`. Final uses `neutral-ink` on `neutral-tint`, never green.
- Always give the version in `mono` (`identifier` style) so it can be copied exactly.
- One banner per page, directly under the title. Don't repeat it in body text.
- Element: `<div class="as-status" role="note">`. Add `as-status--final` for final editions.
