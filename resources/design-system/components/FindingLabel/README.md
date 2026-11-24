# FindingLabel

A compact label for one finding about a claim. Several can sit side by side, because the declaration says findings can coexist.

**Use** inside a finding `RecordBlock`, in tables of claims, and on the home example sheet.

**Consumer provides:** the finding in words, and its glyph.

| Finding | Class | Glyph |
| --- | --- | --- |
| Established (origin, scope) | `as-finding` | ● |
| Within period | `as-finding` | ◐ |
| Expired | `as-finding--expired` | ⏱ |
| Withdrawn | `as-finding--expired` | ↺ |
| Evidence conflicts | `as-finding--conflict` | ▲ |
| Unanswered | `as-finding--unanswered` | ○ |

**Rules**
- Always a word plus a glyph. The glyph is `aria-hidden`. Colour is never the only signal.
- No green "valid" and no red "invalid". Conflict is rust because it reports evidence, not a verdict. Unanswered is an outline because nothing has been established.
- A finding label is never an acceptance. Show acceptance with the decision block's verdict.
