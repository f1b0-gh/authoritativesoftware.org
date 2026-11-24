# Button

Square, 48px-tall actions, nearly always links to a reading page.

**Variants**
- `as-button--primary`: an `accent` fill with `on-accent` text. One per view, for the main next step.
- `as-button--light`: a `surface` fill with an `accent` label and a `line-strong` border. Secondary actions, and actions on dark bands.
- `as-textlink`: a plain accent link at 14px/500, beside a primary button.

**Consumer provides:** a verb-first label ("Read the declaration", not "Learn more") and an `href`.

**Rules**
- Use `<a>` for navigation and `<button>` only for in-page actions.
- `radius-0` always. No icons inside buttons.
- Minimum target 48px tall, with the focus ring from the root styles.
