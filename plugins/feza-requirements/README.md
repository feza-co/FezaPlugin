# feza-requirements

Requirements engineering skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 6 skills.

Requirements engineering skills: ISO/IEC/IEEE 29148 aligned SRS generation and review, elicitation kits, requirement classification, conflict analysis and user stories.

## Skills

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-requirements:srs-generate` | Writes a Software Requirements Specification (SRS): the document that states what the software must do (functional requirements) and how well it must do it (performance, security, reliability, availability, observability, usability), following ISO/IEC/IEEE 29148 and IEEE 830. In code mode it extracts requirements from the source code, README, manifests and API endpoints; in brief mode it works from `BRIEF.md` or a short project idea. The mode is picked from the size of the codebase. | `SRS_<project>_v0.1.md` |
| `/feza-requirements:srs-review` | Audits an existing `SRS_*.md` against the ISO/IEC/IEEE 29148 quality criteria. Every requirement is checked for being necessary, appropriate, unambiguous, complete, singular, verifiable, feasible and conforming; the whole set for completeness and consistency; non-functional requirements for ISO/IEC 25010 tagging; and the outline for missing sections. Returns severity-rated findings and a top-5 improvement list. | `SRS_REVIEW_<project>.md` |
| `/feza-requirements:req-elicit` | Prepares the material for gathering requirements from people (elicitation), aligned with ISO/IEC/IEEE 29148 and BABOK v3. For each stakeholder role it produces interview questions (closed, open, probing, strategic), a questionnaire, a workshop plan and an observation plan. Tailored to the roles in `STAKEHOLDERS_*.md` and `PERSONAS_*.md` when present; otherwise it asks for the role list. | `ELICITATION_KIT_<project>.md` |
| `/feza-requirements:req-classify` | Takes a raw requirement list (from the command, a requirements file, `BRIEF.md` or elicitation results) and sorts every item into functional, non-functional, constraint, assumption or out of scope, with a one-line rationale. Rewrites each item in "shall" form, tags non-functional requirements with their ISO/IEC 25010 quality characteristic and flags anti-patterns such as vague wording. | `REQ_CLASSIFIED_<project>.md` |
| `/feza-requirements:req-conflict-check` | Analyses a requirement set (`SRS_*.md` or `REQ_CLASSIFIED_*.md`) for conflicts (direct contradictions, implicit conflicts, trade-offs, competition for resources) and dependencies (depends-on, blocks, refines, supersedes). Proposes a resolution for each conflicting pair, derives an implementation order from the dependency graph and lists the conflicts that need escalation. | `REQ_CONFLICT_<project>.md` |
| `/feza-requirements:user-story` | Turns requirements (`SRS_*.md`, `REQ_CLASSIFIED_*.md`) or a feature description into agile user stories of the form "As a <role>, I want <goal>, so that <benefit>", using `PERSONAS_*.md` for the roles. Each story is checked against the INVEST criteria and gets Given-When-Then acceptance criteria, edge cases, a Fibonacci story point estimate and MoSCoW priority; the file also contains a story map, backlog, Definition of Ready and Definition of Done. | `USER_STORIES_<project>.md` |

## Installation

Claude Code:

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-requirements@feza
```

Codex:

```bash
codex plugin marketplace add feza-co/FezaPlugin
```

Then run `/plugins` in Codex and install `feza-requirements`.

Cursor, Gemini CLI and other Agent Skills clients: see
[docs/installation.md](https://github.com/feza-co/FezaPlugin/blob/main/docs/installation.md).

## How the skills work

Each skill discovers existing project context, asks only for critical missing information, drafts
the document, checks it internally against the shared quality criteria and writes the final
version in the shared delivery format. The shared rules are bundled in every skill's
`references/` folder (`output-conventions.md`, `delivery-format.md`, `input-discovery.md`,
`quality-gate.md`); edit them in the repository's [`shared/`](https://github.com/feza-co/FezaPlugin/tree/main/shared) directory, not here.

## License

[MIT](https://github.com/feza-co/FezaPlugin/blob/main/LICENSE)
