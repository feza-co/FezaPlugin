# feza-iso

ISO/IEC compliance skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 6 skills.

ISO/IEC standards skills: 12207 process audit, 29110 VSE profile, 25010 product quality, 15939 measurement plan, 29148 layered requirements and complaint-to-process mapping.

## Skills

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-iso:iso12207-audit` | ISO/IEC/IEEE 12207 is the international standard that catalogues the processes of the software life cycle. This skill audits your project against its 30 processes in four groups (agreement, organizational project-enabling, technical management, technical) and rates each one as implemented, partial or missing, citing evidence from the repository (README, CI workflows, tests, docs, configuration) and earlier FezaPlugin outputs. Ends with the five biggest gaps and a roadmap to close them. | `ISO12207_AUDIT_<project>.md` |
| `/feza-iso:iso29110-vse` | ISO/IEC 29110 is the life cycle standard for very small entities (VSEs, teams of up to 25 people); its Entry Profile targets projects of under six person-months. The skill checks whether your team and project fit that profile (contributor count from git history, estimated effort), then audits the two core processes, Project Management and Software Implementation, listing missing activities, roles and essential work products, and compares the result with ISO/IEC/IEEE 12207. | `ISO29110_VSE_<project>.md` |
| `/feza-iso:iso25010-quality` | ISO/IEC 25010 is the software product quality model. The skill scores your product or SRS from 1 to 5 on each of its nine characteristics (functional suitability, performance efficiency, compatibility, interaction capability, reliability, security, maintainability, flexibility, safety) and their sub-characteristics, using evidence from `SRS_*.md`, source-code signals (authentication, caching, logging, accessibility attributes, tests, CI), test results and earlier UX audits. Reports the top three risks and strengths with recommendations. | `ISO25010_QUALITY_<project>.md` |
| `/feza-iso:iso15939-measure` | ISO/IEC/IEEE 15939 defines how to run a software measurement process. The skill builds a measurement plan that starts from information needs (which decisions the measurements must support), links each to a measurable concept such as an ISO/IEC 25010 sub-characteristic, and defines base measures, derived measures, indicators and decision criteria. The plan follows the standard's four activities (commit, plan, perform, evaluate) and every metric passes a suitability checklist. Inputs are `SRS_*.md`, `ISO25010_QUALITY_*.md`, stakeholders, scope and risks. | `MEASUREMENT_PLAN_<project>.md` |
| `/feza-iso:iso29148-req` | ISO/IEC/IEEE 29148 is the requirements engineering standard; it separates requirements into four documents: business (BRS), stakeholder (StRS), system (SyRS) and software (SRS). The skill takes your existing `SRS_*.md` (plus scope, stakeholder and persona files), places every requirement in the right layer, builds bidirectional traceability links between the layers and checks each requirement against the well-formed criteria. Unlike srs-generate, it restructures an existing set instead of writing one from scratch. | `REQ_LAYERED_<project>.md` |
| `/feza-iso:complaints-to-compliance` | Treats team complaints as symptoms and maps each one to the ISO/IEC/IEEE 12207 technical management process it exposes a gap in (planning, assessment and control, decision, risk, configuration, information, measurement, quality assurance). Complaints come from the command argument, `CONFLICT_LOG.md` or the communication plan. The output gives a role, process and corrective action for each complaint, the three main structural problems and a 30/60/90-day action plan. | `COMPLAINTS_TO_COMPLIANCE_<project>.md` |

## Installation

Claude Code:

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-iso@feza
```

Codex:

```bash
codex plugin marketplace add feza-co/FezaPlugin
```

Then run `/plugins` in Codex and install `feza-iso`.

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
