# feza-pm

Project management skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 12 skills.

Project management skills: scope statement, WBS, PERT estimation, budget, CPM scheduling, risk register, RACI, SWOT, stakeholder and communication planning.

## Skills

| Command | Produces |
|---------|----------|
| `/feza-pm:scope-statement` | `SCOPE_<project>.md`: project definition, goals, in and out of scope, constraints, assumptions |
| `/feza-pm:wbs` | `WBS_<project>.md`: three-level numbered work breakdown structure with deliverables |
| `/feza-pm:estimate` | `ESTIMATES_<project>.md`: parametric, bottom-up and three-point (PERT) estimates |
| `/feza-pm:swot` | `SWOT_<project>.md`: SWOT matrix with TOWS strategies |
| `/feza-pm:raci` | `RACI_<project>.md`: responsibility assignment matrix with load summary |
| `/feza-pm:budget` | `BUDGET_<project>.md`: cost baseline, contingency and management reserves, cash flow |
| `/feza-pm:activity-sequence` | `ACTIVITIES_<project>.md`: activity dependencies and CPM critical path |
| `/feza-pm:risk-register` | `RISK_REGISTER_<project>.md`: probability and impact scoring, responses and owners |
| `/feza-pm:stakeholder-map` | `STAKEHOLDERS_<project>.md`: stakeholder analysis and power/interest grid |
| `/feza-pm:comm-plan` | `COMM_PLAN_<project>.md`: who receives what, when and through which channel |
| `/feza-pm:conflict-resolve` | Conversational guidance using the five conflict strategies; optional `CONFLICT_LOG.md` |
| `/feza-pm:competitor-analysis` | `COMPETITORS_<project>.md`: feature, pricing and positioning comparison |

## Installation

Claude Code:

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-pm@feza
```

Codex:

```bash
codex plugin marketplace add feza-co/FezaPlugin
```

Then run `/plugins` in Codex and install `feza-pm`.

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
