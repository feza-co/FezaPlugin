# feza-hci

HCI and UX skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 9 skills.

Human-computer interaction skills: holistic UX review, heuristic evaluation, usability test planning, cognitive load, color and contrast audit, design thinking, prototyping, personas, and HCI-compliant UI design and implementation.

## Skills

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-hci:hci-review` | Holistic usability review of a screen, flow or whole product through user-centred design (ISO 9241-210), affordance and the HCI principles of Dix et al. Scans the UI files (HTML, JSX, Vue, Svelte, templates, CSS, design tokens) or works from a described screen or mockup, and returns prioritized findings with concrete fix steps. | `HCI_REVIEW_<project>.md` |
| `/feza-hci:heuristic-eval` | Systematic heuristic evaluation: inspects screens against Nielsen's 10 usability heuristics, the principles of Dix et al. and WCAG 2.1 AA accessibility criteria. Every finding gets a Nielsen severity rating from 0 (not a problem) to 4 (usability catastrophe); results are sorted in a table with a severity distribution. Works from the UI files or from a described screen. | `HEURISTIC_EVAL_<project>.md` |
| `/feza-hci:usability-eval-plan` | Plans a usability test with real users: methods (questioning, user tests, heuristic walkthrough), how many participants and why, a demographic form, a pre-test questionnaire and a SUS (System Usability Scale) post-test survey, test tasks, pilot test, environment and metrics. The most critical tasks are taken from earlier HCI review or heuristic evaluation findings when present. | `USABILITY_PLAN_<project>.md` |
| `/feza-hci:cognitive-load` | Estimates how much mental effort a screen or flow demands, using Cognitive Complexity Theory (Kieras and Polson) and Sweller's cognitive load theory. Checks six aspects (cognitive load, information processing, Gestalt perceptual organization, affordances, feedback and feedforward, skeuomorphic versus flat design), gives each screen a load score and suggests how to reduce overload. | `COGNITIVE_LOAD_<project>.md` |
| `/feza-hci:color-audit` | Audits the colour palette, extracted from design tokens, CSS variables, the Tailwind config or stylesheets (or supplied by you): identifies the colour harmony, checks the 60-30-10 balance, computes WCAG 2.1 AA contrast ratios, simulates colour blindness, reviews colour coding and dark mode, and proposes a corrected palette. | `COLOR_AUDIT_<project>.md` |
| `/feza-hci:design-thinking` | Produces a five-stage design thinking roadmap (Empathize, Define, Ideate, Prototype, Test, after the Stanford d.school / IDEO model) for a given problem or opportunity, with goals, activities, deliverables, duration and suggested tools for each stage, plus iteration notes and a worked example scenario. | `DESIGN_THINKING_<project>.md` |
| `/feza-hci:prototype-plan` | Plans how to prototype the product: why prototype, the fidelity ladder (sketch, wireframe, mockup, prototype), when to use low- or high-fidelity, low-cost tools, a short test plan and the reminder that a prototype is not the product. Uses existing design files, scope and personas. | `PROTOTYPE_PLAN_<project>.md` |
| `/feza-hci:persona` | Creates one to three user personas, fictional but evidence-based profiles of target users in the goal-directed design tradition: demographics, goals, pain points, behaviours, technical skill level, a usage scenario and a quote, plus an anti-persona. Draws on brief, scope and stakeholder files and labels assumed data. | `PERSONAS_<project>.md` |
| `/feza-hci:hci-execute` | Designs and builds a working user interface instead of a report: user and task model (ISO 9241-210), information architecture and ASCII wireframes, a token-based design system (WCAG 2.1 AA contrast, light and dark themes, 4/8 pt grid), then accessible, responsive screens in the detected stack (React, Next.js, Vue, Svelte, Tailwind, plain HTML) or in dependency-free HTML, CSS and JS. Before delivery it checks its own output against Nielsen's heuristics, Dix et al., WCAG 2.1 AA and cognitive load and fixes what it finds; it can also apply findings from earlier HCI audits. | UI files plus `DESIGN_RATIONALE_<project>.md` |

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
