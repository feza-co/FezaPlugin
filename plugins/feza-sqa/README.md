# feza-sqa

Software quality assurance skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 7 skills.

Software quality assurance skills: IEEE 730 SQA plan, test plan, metrics plan, IEEE 1028 inspection, traceability matrix, change control and defect reporting.

## Skills

| Command | Produces |
|---------|----------|
| `/feza-sqa:sqa-plan` | `SQA_PLAN_<project>.md`: IEEE 730 software quality assurance plan |
| `/feza-sqa:test-plan` | `TEST_PLAN_<project>.md`: ISO/IEC/IEEE 29119-3 test plan with test cases |
| `/feza-sqa:metrics-plan` | `METRICS_PLAN_<project>.md`: pre-, in- and end-process metrics (DRE, defect density, size) |
| `/feza-sqa:inspection` | `INSPECTION_PLAN_<project>.md`: IEEE 1028 inspection procedure |
| `/feza-sqa:traceability-matrix` | `TRACEABILITY_<project>.md`: bidirectional need to requirement to test to defect matrix |
| `/feza-sqa:change-control` | `CHANGE_CONTROL_<project>.md` or a single change request: CCB flow and impact analysis |
| `/feza-sqa:defect-report` | Defect report template or a single defect report with severity, priority and lifecycle |

## Installation

Claude Code:

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-sqa@feza
```

Codex:

```bash
codex plugin marketplace add feza-co/FezaPlugin
```

Then run `/plugins` in Codex and install `feza-sqa`.

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
