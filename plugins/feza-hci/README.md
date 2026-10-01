# feza-hci

HCI and UX skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 9 skills.

Human-computer interaction skills: holistic UX review, heuristic evaluation, usability test planning, cognitive load, color and contrast audit, design thinking, prototyping, personas, and HCI-compliant UI design and implementation.

## Skills

| Command | Produces |
|---------|----------|
| `/feza-hci:hci-review` | `HCI_REVIEW_<project>.md`: holistic HCI review of a screen, flow or product |
| `/feza-hci:heuristic-eval` | `HEURISTIC_EVAL_<project>.md`: Nielsen heuristics and WCAG 2.1 AA findings with 0-4 severity |
| `/feza-hci:usability-eval-plan` | `USABILITY_PLAN_<project>.md`: methods, participants, tasks, pilot and metrics |
| `/feza-hci:cognitive-load` | `COGNITIVE_LOAD_<project>.md`: cognitive load assessment of a screen or flow |
| `/feza-hci:color-audit` | `COLOR_AUDIT_<project>.md`: palette harmony, 60-30-10 balance and WCAG contrast ratios |
| `/feza-hci:design-thinking` | `DESIGN_THINKING_<project>.md`: five-stage design thinking roadmap |
| `/feza-hci:prototype-plan` | `PROTOTYPE_PLAN_<project>.md`: prototyping strategy and fidelity choices |
| `/feza-hci:persona` | `PERSONAS_<project>.md`: one to three user personas with goals, pain points and scenarios |
| `/feza-hci:hci-execute` | Working UI files plus `DESIGN_RATIONALE_<project>.md`: designs and builds an HCI-compliant interface end to end (user and task model, information architecture, token-based design system, accessible responsive screens, internal heuristic and WCAG 2.1 AA verification) |

## Installation

Claude Code:

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-hci@feza
```

Codex:

```bash
codex plugin marketplace add feza-co/FezaPlugin
```

Then run `/plugins` in Codex and install `feza-hci`.

Cursor, Gemini CLI and other Agent Skills clients: see
[docs/installation.md](https://github.com/feza-co/FezaPlugin/blob/main/docs/installation.md).

## How the skills work

Each skill discovers existing project context, asks only for critical missing information, drafts
the document, checks it internally against the shared quality criteria and writes the final
version in the shared delivery format. `hci-execute` is the exception that builds: it writes
working interface files in the project's existing UI stack (or dependency-free HTML, CSS and
JavaScript), verifies them internally against Nielsen's heuristics, WCAG 2.1 AA and cognitive
load checks, and delivers a short design rationale document alongside them. The shared rules are bundled in every skill's
`references/` folder (`output-conventions.md`, `delivery-format.md`, `input-discovery.md`,
`quality-gate.md`); edit them in the repository's [`shared/`](https://github.com/feza-co/FezaPlugin/tree/main/shared) directory, not here.

## License

[MIT](https://github.com/feza-co/FezaPlugin/blob/main/LICENSE)
