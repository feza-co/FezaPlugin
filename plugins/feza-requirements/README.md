# feza-requirements

Requirements engineering skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 6 skills.

Requirements engineering skills: ISO/IEC/IEEE 29148 aligned SRS generation and review, elicitation kits, requirement classification, conflict analysis and user stories.

## Skills

| Command | Produces |
|---------|----------|
| `/feza-requirements:srs-generate` | `SRS_<project>_v0.1.md`: ISO/IEC/IEEE 29148 and IEEE 830 aligned SRS, generated from code or from a brief |
| `/feza-requirements:srs-review` | `SRS_REVIEW_<project>.md`: review of an existing SRS against well-formedness, ISO/IEC 25010 tagging and outline completeness |
| `/feza-requirements:req-elicit` | `ELICITATION_KIT_<project>.md`: interview, questionnaire, workshop and observation kits per stakeholder role |
| `/feza-requirements:req-classify` | `REQ_CLASSIFIED_<project>.md`: raw requirements split into FR, NFR, constraints, assumptions and out of scope, rewritten |
| `/feza-requirements:req-conflict-check` | `REQ_CONFLICT_<project>.md`: conflict and dependency matrices, implementation order and escalation list |
| `/feza-requirements:user-story` | `USER_STORIES_<project>.md`: INVEST user stories with Given-When-Then criteria, points and MoSCoW priority |

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
