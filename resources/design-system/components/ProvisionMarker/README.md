# ProvisionMarker

Marks a block as declaration text (normative) or as explanation, so a reader never mistakes commentary for a requirement.

**Use** on every page that mixes declaration text with commentary: the declaration page itself when it carries editorial notes, and explanatory pages that quote a principle.

**Consumer provides:** the kind (`Declaration text` or `Explanation`), the section reference for declaration text (`§2`, in mono), and the content.

**Rules**
- Declaration text: `section.as-provision`, a solid 2px `ink` rule, the `provision` serif style, max `measure-prose`.
- Explanation: `aside.as-provision.as-provision--explanation`, a dashed `line-strong` rule on `neutral-tint`, `body` sans.
- The label is a word, not a colour: the distinction must survive greyscale and print.
- Quote declaration text verbatim. Paraphrase belongs in an explanation block.
