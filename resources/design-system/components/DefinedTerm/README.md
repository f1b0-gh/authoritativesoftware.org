# DefinedTerm

Links a defined word back to its definition in the declaration, with a dotted underline that reads as "defined term" rather than "external link".

**Use** on the first use of a defined term in each section of an explanatory page. Don't mark every occurrence.

**Consumer provides:** the term as it appears in the sentence, and an anchor to its definition (`#def-<term>`), which is a `div.as-definition` wrapping `dt` and `dd`.

**Rules**
- `a.as-term` keeps the surrounding text colour, with a dotted `line-strong` underline that turns solid `accent` on hover.
- The definition target highlights with `selection` when reached by its anchor.
- Lower-case the term in explanations. Keep the declaration's capitalisation when quoting it.
