# FezaPlugin

[![CI](https://github.com/feza-co/FezaPlugin/actions/workflows/ci.yml/badge.svg)](https://github.com/feza-co/FezaPlugin/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-informational.svg)](CHANGELOG.md)
[![Platforms](https://img.shields.io/badge/platforms-Claude%20Code%20%7C%20Codex%20%7C%20Cursor%20%7C%20Gemini%20CLI-555.svg)](docs/installation.md)

[Türkçe](README.tr.md)

FezaPlugin is a set of 45 agent skills that turn a project brief or an existing codebase into
standards-aligned software engineering documents: requirements specifications, project plans,
ISO compliance assessments, UX evaluations and quality assurance plans, plus working,
accessibility-checked user interfaces designed from HCI principles. Each skill reads what is
already in your repository, asks at most a few targeted questions, and writes a complete,
review-ready Markdown document to your project.

## Why FezaPlugin

- **Standards-aligned output.** Documents follow ISO/IEC/IEEE 29148, IEEE 830, ISO/IEC 25010,
  ISO/IEC/IEEE 12207, ISO/IEC 29110, ISO/IEC/IEEE 15939, IEEE 730, IEEE 1028, PMBOK and WCAG 2.1.
- **Context first, questions last.** Skills scan your README, manifests, source code and earlier
  FezaPlugin outputs before asking anything, and keep questions to a small, fixed limit.
- **Chained workflow.** Outputs feed each other: scope to WBS, WBS to estimates, estimates to
  budget and schedule, SRS to user stories, test plan and traceability matrix.
- **Consistent delivery format.** Every document ships with a cover page, bilingual abstract,
  numbered table of contents, references and a "Known Gaps" section, or a plain format on request.
- **Modular packages.** Install only the packages your team needs; each one works on its own.
- **Multi-platform.** One repository serves Claude Code, Codex, Cursor, Gemini CLI and any
  client that supports the Agent Skills format.

## Packages

| Package | Skills | Focus |
|---------|-------:|-------|
| [`feza-requirements`](plugins/feza-requirements) | 6 | Requirements engineering: SRS generation and review, elicitation, classification, conflicts, user stories |
| [`feza-pm`](plugins/feza-pm) | 12 | Project management: scope, WBS, estimation, budget, schedule, risk, RACI, stakeholders, communication |
| [`feza-iso`](plugins/feza-iso) | 6 | ISO/IEC compliance: 12207, 29110, 25010, 15939, 29148 |
| [`feza-hci`](plugins/feza-hci) | 9 | HCI and UX: reviews, heuristic evaluation, usability testing, accessibility, personas, UI design and build |
| [`feza-sqa`](plugins/feza-sqa) | 7 | Software quality assurance: SQA plan, test plan, metrics, inspection, traceability, change and defect control |
| [`feza-toolkit`](plugins/feza-toolkit) | 5 | Cross-package utilities: menu, lifecycle selection, full package orchestration, demo script, glossary |

> **Note:** `/feza-toolkit:full-package` calls skills from the other packages. Install all six
> packages to generate a complete documentation set.

## Skills

Commands use the Claude Code namespace `/<package>:<skill>`. Other clients invoke the same skill by
name (for example `$srs-generate` in Codex) or pick it automatically from the request.

### feza-requirements

| Command | Produces |
|---------|----------|
| `/feza-requirements:srs-generate` | `SRS_<project>_v0.1.md`: ISO/IEC/IEEE 29148 and IEEE 830 aligned SRS, generated from code or from a brief |
| `/feza-requirements:srs-review` | `SRS_REVIEW_<project>.md`: review of an existing SRS against well-formedness, ISO/IEC 25010 tagging and outline completeness |
| `/feza-requirements:req-elicit` | `ELICITATION_KIT_<project>.md`: interview, questionnaire, workshop and observation kits per stakeholder role |
| `/feza-requirements:req-classify` | `REQ_CLASSIFIED_<project>.md`: raw requirements split into FR, NFR, constraints, assumptions and out of scope, rewritten |
| `/feza-requirements:req-conflict-check` | `REQ_CONFLICT_<project>.md`: conflict and dependency matrices, implementation order and escalation list |
| `/feza-requirements:user-story` | `USER_STORIES_<project>.md`: INVEST user stories with Given-When-Then criteria, points and MoSCoW priority |

### feza-pm

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

### feza-iso

| Command | Produces |
|---------|----------|
| `/feza-iso:iso12207-audit` | `ISO12207_AUDIT_<project>.md`: process audit against ISO/IEC/IEEE 12207:2017 |
| `/feza-iso:iso29110-vse` | `ISO29110_VSE_<project>.md`: ISO/IEC 29110 Entry Profile applicability and gap analysis |
| `/feza-iso:iso25010-quality` | `ISO25010_QUALITY_<project>.md`: product quality scoring across the nine ISO/IEC 25010:2023 characteristics, including Flexibility and Safety |
| `/feza-iso:iso15939-measure` | `MEASUREMENT_PLAN_<project>.md`: ISO/IEC/IEEE 15939 measurement plan |
| `/feza-iso:iso29148-req` | `REQ_LAYERED_<project>.md`: requirements restructured into BRS, StRS, SyRS and SRS layers |
| `/feza-iso:complaints-to-compliance` | `COMPLAINTS_TO_COMPLIANCE_<project>.md`: team complaints mapped to ISO/IEC/IEEE 12207 technical management processes |

### feza-hci

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
| `/feza-hci:hci-execute` | Working UI files (detected stack or dependency-free HTML, CSS and JS) plus `DESIGN_RATIONALE_<project>.md`: HCI-compliant design built end to end |

### feza-sqa

| Command | Produces |
|---------|----------|
| `/feza-sqa:sqa-plan` | `SQA_PLAN_<project>.md`: IEEE 730 software quality assurance plan |
| `/feza-sqa:test-plan` | `TEST_PLAN_<project>.md`: ISO/IEC/IEEE 29119-3 test plan with test cases |
| `/feza-sqa:metrics-plan` | `METRICS_PLAN_<project>.md`: pre-, in- and end-process metrics (DRE, defect density, size) |
| `/feza-sqa:inspection` | `INSPECTION_PLAN_<project>.md`: IEEE 1028 inspection procedure |
| `/feza-sqa:traceability-matrix` | `TRACEABILITY_<project>.md`: bidirectional need to requirement to test to defect matrix |
| `/feza-sqa:change-control` | `CHANGE_CONTROL_<project>.md` or a single change request: CCB flow and impact analysis |
| `/feza-sqa:defect-report` | Defect report template or a single defect report with severity, priority and lifecycle |

### feza-toolkit

| Command | Produces |
|---------|----------|
| `/feza-toolkit:help` | The skill menu, shown in chat |
| `/feza-toolkit:lifecycle-pick` | `LIFECYCLE_PICK_<project>.md`: recommended SDLC model with rationale |
| `/feza-toolkit:full-package` | A complete documentation set (Mini, Standard or Full) plus a `PACKAGE_<project>.md` manifest |
| `/feza-toolkit:demo-script` | `DEMO_SCRIPT_<project>.md`: timed presentation flow and Q&A bank |
| `/feza-toolkit:glossary` | `GLOSSARY_<lang>.md`: bilingual Turkish-English glossary of 100+ terms |

## Quick Start

Full instructions for every platform are in [docs/installation.md](docs/installation.md).

### Claude Code

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-requirements@feza
/plugin install feza-pm@feza
```

Install any of `feza-requirements`, `feza-pm`, `feza-iso`, `feza-hci`, `feza-sqa` and
`feza-toolkit` the same way.

### Codex

```bash
codex plugin marketplace add feza-co/FezaPlugin
```

Then open Codex, run `/plugins` and install the packages you need.

### Cursor

Teams and Enterprise workspaces can import this repository as a plugin marketplace
(Dashboard, Plugins, Add Marketplace, Import from Repo). For local use and other options, see
[docs/installation.md](docs/installation.md#cursor).

### Gemini CLI

```bash
gemini extensions install https://github.com/feza-co/FezaPlugin
```

### Other Agent Skills clients

```bash
npx skills add feza-co/FezaPlugin
npx skills add feza-co/FezaPlugin -s srs-generate   # a single skill
```

On Windows add `--copy`. Clients that read `.agents/skills/` (GitHub Copilot, OpenCode and others)
can also use a copy of the root `skills/` directory; see [docs/installation.md](docs/installation.md).

## How it works

1. **Input discovery.** The skill looks for a brief (`BRIEF.md`, `IDEA.md`, `README.md`), the
   codebase and earlier outputs such as `SCOPE_*.md` or `SRS_*.md`. It asks for a brief only if
   nothing usable is found, and asks at most three questions about critical gaps; minor gaps are
   recorded as labelled assumptions. The output language follows the brief (Turkish or English)
   unless `--lang=tr` or `--lang=en` is given.
2. **Generation.** The document is drafted from the skill's instructions and reference material
   (outlines, formulas, checklists) bundled in the skill's `references/` folder.
3. **Quality gate.** Before anything is written, the draft is checked internally against
   criteria for its document type and revised if needed; this check is never shown to the
   user and no score appears in the output.
4. **Delivery format.** The final document is written to your project root with a cover page,
   abstract, numbered table of contents, references and a "Known Gaps" section. Ask for the
   plain format to get a short header instead. A brief summary in chat points to the file and
   suggests the next skill.

## Example flow

```text
/feza-pm:scope-statement          -> SCOPE_acme-portal.md
/feza-pm:wbs                      -> WBS_acme-portal.md        (reads SCOPE_*)
/feza-pm:estimate                 -> ESTIMATES_acme-portal.md  (reads WBS_*)
/feza-requirements:srs-generate   -> SRS_acme-portal_v0.1.md
/feza-requirements:user-story     -> USER_STORIES_acme-portal.md (reads SRS_*)
/feza-sqa:test-plan               -> TEST_PLAN_acme-portal.md   (reads SRS_* and USER_STORIES_*)
/feza-sqa:traceability-matrix     -> TRACEABILITY_acme-portal.md
```

Or run `/feza-toolkit:full-package` once to produce the whole chain from a brief.

## Repository structure

```text
FezaPlugin/
├── .claude-plugin/marketplace.json   Claude Code marketplace
├── .agents/plugins/marketplace.json  Codex marketplace
├── .cursor-plugin/marketplace.json   Cursor marketplace
├── gemini-extension.json             Gemini CLI extension
├── plugins/<package>/                Source of truth for each package
│   ├── .claude-plugin/ .codex-plugin/ .cursor-plugin/   plugin manifests
│   └── skills/<skill>/SKILL.md + references/
├── shared/                           Shared references, copied into every skill by sync.py
├── skills/                           Generated flat mirror of all skills (do not edit)
├── scripts/sync.py                   Copies shared files, mirrors skills, syncs versions
├── scripts/validate.py               Static checks run in CI
├── docs/                             Installation, architecture and skill authoring guides
└── VERSION                           Single version for every manifest
```

See [docs/architecture.md](docs/architecture.md) for details.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) and
[docs/skill-authoring.md](docs/skill-authoring.md), then run:

```bash
python scripts/sync.py
python scripts/validate.py
```

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md). Report security issues as described in
[SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © 2026 Feza
