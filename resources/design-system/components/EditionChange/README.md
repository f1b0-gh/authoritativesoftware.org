# EditionChange

Shows exactly what changed in one provision between two editions of the declaration, with the reason. This is how the site follows its own rule of identifying exactly what a statement covers.

**Use** on the edition history page and linked from the `StatusBanner`. Use one block per changed provision.

**Consumer provides:** the provision name, the two versions (`0.1.0 → 0.2.0`), the removed and added text verbatim, and a one-line reason.

**Rules**
- Removed text uses `del` with a `conflict-ink` strike, and the text stays readable in `ink-muted`. Added text uses `ins` on `accent-tint` with an accent underline.
- Row tags are words (`Removed`, `Added`, `Reason`), not just colour.
- Quote the declaration exactly. Never summarise a change inside `del` or `ins`.
- A change to declaration text always comes with a new version number.
