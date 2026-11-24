# RecordBlock

Three containers, for a statement (what an operator says), a finding (what an assessment found) and a decision (what a consumer chooses to rely on). They are deliberately unalike, so the proposal's core distinction is visible.

**Use** in examples, guides and any illustrated record. Put the three in sequence when showing the full chain.

**Consumer provides:** the kind, who made it and in what role, the content, and optional metadata as a `dl.as-record__meta` (artifact digest, dates, intended use, when to reconsider).

**Variants**
- `as-record--statement`: an `accent-tint` header and the operator's words in serif, in quotation marks. It's the only variant with accent.
- `as-record--finding`: a dashed `line-strong` border and plain sans, holding one or more `FindingLabel`s. A finding can hold several labels at once.
- `as-record--decision`: a heavy 4px `ink` left rule, with the verdict (`Accept`, `Reject`, `Defer`) as `as-record__verdict` in mono.

**Rules**
- Never put a decision inside a statement: an operator can't prescribe the consumer's decision.
- Mark fictional records "Illustration only" once, near the group, not on every block.
- Digests in mono, shortened with an ellipsis only when the full value is available nearby.
