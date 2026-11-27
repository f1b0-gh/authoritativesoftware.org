# Working on Authoritative Software

- This site presents an authored proposal, with no claim of institutional endorsement. Keep the proposal independent of any particular implementation project.
- Write in English. Teach the concepts with concrete examples; distinguish explanation from declaration text.
- Edit canonical Markdown in `docs/`, never generated `public/okf/` or `dist/` output.
- Revise the declaration only intentionally and review its integrity record together with the text. Keep declaration and website versions independent.
- Keep examples visibly illustrative. Do not imply that a signature or publication alone proves authority; consumer acceptance is independent.
- Use public Astrok npm exports. Keep builds independent of sibling checkouts.
- Keep temporary material in ignored `.local/` or `/tmp/authoritativesoftware/`.
- Run `npm run check`, `npm run build`, `npm test` and relevant browser checks. State unavailable checks.
- Use Jujutsu for version control. Publication and domain configuration are separate from a local build.

## Shared skills

Use [skills-dev](https://github.com/f1b0-gh/skills-dev) for relevant work:
`skills/rust-discipline/SKILL.md` for Rust policy, `skills/rust-skills/` for
selected Rust references, and `skills/clickhouse-sql/SKILL.md` for ClickHouse.
Read these in the shared repository or an installed copy; project contracts,
dependency constraints and validation commands take precedence over examples.
Keep maintained instructions and documentation in English.
