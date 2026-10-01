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

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-requirements:srs-generate` | Writes a Software Requirements Specification (SRS): the document that states what the software must do (functional requirements) and how well it must do it (performance, security, reliability, availability, observability, usability), following ISO/IEC/IEEE 29148 and IEEE 830. In code mode it extracts requirements from the source code, README, manifests and API endpoints; in brief mode it works from `BRIEF.md` or a short project idea. The mode is picked from the size of the codebase. | `SRS_<project>_v0.1.md` |
| `/feza-requirements:srs-review` | Audits an existing `SRS_*.md` against the ISO/IEC/IEEE 29148 quality criteria. Every requirement is checked for being necessary, appropriate, unambiguous, complete, singular, verifiable, feasible and conforming; the whole set for completeness and consistency; non-functional requirements for ISO/IEC 25010 tagging; and the outline for missing sections. Returns severity-rated findings and a top-5 improvement list. | `SRS_REVIEW_<project>.md` |
| `/feza-requirements:req-elicit` | Prepares the material for gathering requirements from people (elicitation), aligned with ISO/IEC/IEEE 29148 and BABOK v3. For each stakeholder role it produces interview questions (closed, open, probing, strategic), a questionnaire, a workshop plan and an observation plan. Tailored to the roles in `STAKEHOLDERS_*.md` and `PERSONAS_*.md` when present; otherwise it asks for the role list. | `ELICITATION_KIT_<project>.md` |
| `/feza-requirements:req-classify` | Takes a raw requirement list (from the command, a requirements file, `BRIEF.md` or elicitation results) and sorts every item into functional, non-functional, constraint, assumption or out of scope, with a one-line rationale. Rewrites each item in "shall" form, tags non-functional requirements with their ISO/IEC 25010 quality characteristic and flags anti-patterns such as vague wording. | `REQ_CLASSIFIED_<project>.md` |
| `/feza-requirements:req-conflict-check` | Analyses a requirement set (`SRS_*.md` or `REQ_CLASSIFIED_*.md`) for conflicts (direct contradictions, implicit conflicts, trade-offs, competition for resources) and dependencies (depends-on, blocks, refines, supersedes). Proposes a resolution for each conflicting pair, derives an implementation order from the dependency graph and lists the conflicts that need escalation. | `REQ_CONFLICT_<project>.md` |
| `/feza-requirements:user-story` | Turns requirements (`SRS_*.md`, `REQ_CLASSIFIED_*.md`) or a feature description into agile user stories of the form "As a <role>, I want <goal>, so that <benefit>", using `PERSONAS_*.md` for the roles. Each story is checked against the INVEST criteria and gets Given-When-Then acceptance criteria, edge cases, a Fibonacci story point estimate and MoSCoW priority; the file also contains a story map, backlog, Definition of Ready and Definition of Done. | `USER_STORIES_<project>.md` |

### feza-pm

> **Requires an SRS.** All feza-pm skills require an existing Software Requirements Specification (`SRS_*.md` in the project root or `docs/`, produced by `/feza-requirements:srs-generate`) and stop if none is found. Run `/feza-requirements:srs-generate` first.

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-pm:scope-statement` | Defines the project's boundaries following PMBOK scope management: purpose, objectives, product description, success criteria, in-scope and out-of-scope tables, assumptions and the time, cost, quality and scope constraints, all derived from the SRS. | `SCOPE_<project>.md` |
| `/feza-pm:wbs` | Breaks the project work into a Work Breakdown Structure: a numbered three-level hierarchy (1.0, 1.1, 1.1.1) in which every leaf is a concrete deliverable. Uses `SCOPE_*.md` when present. | `WBS_<project>.md` |
| `/feza-pm:estimate` | Estimates duration and effort for every WBS leaf with three methods combined: parametric, bottom-up and three-point PERT, where optimistic, most likely and pessimistic values are weighted as (O+4M+P)/6. Builds on `WBS_*.md`. | `ESTIMATES_<project>.md` |
| `/feza-pm:swot` | SWOT analysis of the project: Strengths, Weaknesses, Opportunities and Threats, each item backed by an evidence sentence, plus a TOWS cross-analysis that turns the matrix into concrete strategies. | `SWOT_<project>.md` |
| `/feza-pm:raci` | Builds a RACI responsibility matrix: WBS items as rows, roles or stakeholders as columns, each cell marked Responsible, Accountable, Consulted or Informed. Checks rules such as a single Accountable per row and summarises each role's load. Uses `WBS_*.md` and `STAKEHOLDERS_*.md`. | `RACI_<project>.md` |
| `/feza-pm:budget` | Converts effort estimates into a PMBOK cost plan: cost baseline (direct plus indirect costs), contingency and management reserves, and a month-by-month cash-flow table. Uses `ESTIMATES_*.md`; unknown rates are recorded as labelled assumptions. | `BUDGET_<project>.md` |
| `/feza-pm:activity-sequence` | Turns WBS leaves into activities, links them with finish-to-start, start-to-start, finish-to-finish or start-to-finish dependencies, shows the network diagram as a table and computes the critical path (CPM), the longest chain of activities that sets the project duration. Uses `WBS_*.md` and `ESTIMATES_*.md`. | `ACTIVITIES_<project>.md` |
| `/feza-pm:risk-register` | Lists project risks by category (technical, schedule, cost, resource, external, quality) with probability and impact scored 1-5, a probability x impact score, a response strategy (avoid, transfer, mitigate or accept; exploit, share or enhance for opportunities), an owner, a trigger and a status. Turns the threats in `SWOT_*.md` and the SRS's quality and compliance requirements, external interfaces, assumptions and open (TBD) items into risks, and uses scope, estimates and the critical path when present. | `RISK_REGISTER_<project>.md` |
| `/feza-pm:stakeholder-map` | Identifies everyone who affects or is affected by the project from the SRS (user classes, stakeholders, external systems, compliance parties) and `SCOPE_*.md`, analyses each one and places them on a four-quadrant power/interest grid (manage closely, keep satisfied, keep informed, monitor) with a suggested contact frequency. | `STAKEHOLDERS_<project>.md` |
| `/feza-pm:comm-plan` | Builds a communication plan matrix following PMBOK communications management: which stakeholder receives what information, how often, through which channel and from whom, plus the points where conflict is likely. Uses `STAKEHOLDERS_*.md`. | `COMM_PLAN_<project>.md` |
| `/feza-pm:conflict-resolve` | Takes a team conflict scenario, identifies the type of conflict and recommends how to resolve it with the five Thomas-Kilmann / PMBOK strategies: avoiding, smoothing, compromising, forcing and collaborating. The answer is given in chat and can optionally be appended to `CONFLICT_LOG.md`. | In chat; optional `CONFLICT_LOG.md` |
| `/feza-pm:competitor-analysis` | Compares the product with its competitors or alternatives using Porter's competitive strategy framework: a table across price, target segment, core features, technology stack, strengths and weaknesses, a differentiation proposal and a market gap table. | `COMPETITORS_<project>.md` |

### feza-iso

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-iso:iso12207-audit` | ISO/IEC/IEEE 12207 is the international standard that catalogues the processes of the software life cycle. This skill audits your project against its 30 processes in four groups (agreement, organizational project-enabling, technical management, technical) and rates each one as implemented, partial or missing, citing evidence from the repository (README, CI workflows, tests, docs, configuration) and earlier FezaPlugin outputs. Ends with the five biggest gaps and a roadmap to close them. | `ISO12207_AUDIT_<project>.md` |
| `/feza-iso:iso29110-vse` | ISO/IEC 29110 is the life cycle standard for very small entities (VSEs, teams of up to 25 people); its Entry Profile targets projects of under six person-months. The skill checks whether your team and project fit that profile (contributor count from git history, estimated effort), then audits the two core processes, Project Management and Software Implementation, listing missing activities, roles and essential work products, and compares the result with ISO/IEC/IEEE 12207. | `ISO29110_VSE_<project>.md` |
| `/feza-iso:iso25010-quality` | ISO/IEC 25010 is the software product quality model. The skill scores your product or SRS from 1 to 5 on each of its nine characteristics (functional suitability, performance efficiency, compatibility, interaction capability, reliability, security, maintainability, flexibility, safety) and their sub-characteristics, using evidence from `SRS_*.md`, source-code signals (authentication, caching, logging, accessibility attributes, tests, CI), test results and earlier UX audits. Reports the top three risks and strengths with recommendations. | `ISO25010_QUALITY_<project>.md` |
| `/feza-iso:iso15939-measure` | ISO/IEC/IEEE 15939 defines how to run a software measurement process. The skill builds a measurement plan that starts from information needs (which decisions the measurements must support), links each to a measurable concept such as an ISO/IEC 25010 sub-characteristic, and defines base measures, derived measures, indicators and decision criteria. The plan follows the standard's four activities (commit, plan, perform, evaluate) and every metric passes a suitability checklist. Inputs are `SRS_*.md`, `ISO25010_QUALITY_*.md`, stakeholders, scope and risks. | `MEASUREMENT_PLAN_<project>.md` |
| `/feza-iso:iso29148-req` | ISO/IEC/IEEE 29148 is the requirements engineering standard; it separates requirements into four documents: business (BRS), stakeholder (StRS), system (SyRS) and software (SRS). The skill takes your existing `SRS_*.md` (plus scope, stakeholder and persona files), places every requirement in the right layer, builds bidirectional traceability links between the layers and checks each requirement against the well-formed criteria. Unlike srs-generate, it restructures an existing set instead of writing one from scratch. | `REQ_LAYERED_<project>.md` |
| `/feza-iso:complaints-to-compliance` | Treats team complaints as symptoms and maps each one to the ISO/IEC/IEEE 12207 technical management process it exposes a gap in (planning, assessment and control, decision, risk, configuration, information, measurement, quality assurance). Complaints come from the command argument, `CONFLICT_LOG.md` or the communication plan. The output gives a role, process and corrective action for each complaint, the three main structural problems and a 30/60/90-day action plan. | `COMPLAINTS_TO_COMPLIANCE_<project>.md` |

### feza-hci

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-hci:hci-review` | Holistic usability review of a screen, flow or whole product through user-centred design (ISO 9241-210), affordance and the HCI principles of Dix et al. Scans the UI files (HTML, JSX, Vue, Svelte, templates, CSS, design tokens) or works from a described screen or mockup, and returns prioritized findings with concrete fix steps. With `--fix` (or "fix") it applies its findings to the UI files, verifies the result with `verify-ui` and adds an applied-fixes table to the report. | `HCI_REVIEW_<project>.md` |
| `/feza-hci:heuristic-eval` | Systematic heuristic evaluation: inspects screens against Nielsen's 10 usability heuristics, the principles of Dix et al. and WCAG 2.1 AA accessibility criteria. Every finding gets a Nielsen severity rating from 0 (not a problem) to 4 (usability catastrophe); results are sorted in a table with a severity distribution. Works from the UI files or from a described screen. With `--fix` it applies its findings to the UI files, verifies the result with `verify-ui` and adds an applied-fixes table to the report. | `HEURISTIC_EVAL_<project>.md` |
| `/feza-hci:usability-eval-plan` | Plans a usability test with real users: methods (questioning, user tests, heuristic walkthrough), how many participants and why, a demographic form, a pre-test questionnaire and a SUS (System Usability Scale) post-test survey, test tasks, pilot test, environment and metrics. The most critical tasks are taken from earlier HCI review or heuristic evaluation findings when present. | `USABILITY_PLAN_<project>.md` |
| `/feza-hci:cognitive-load` | Estimates how much mental effort a screen or flow demands, using Cognitive Complexity Theory (Kieras and Polson) and Sweller's cognitive load theory. Checks six aspects (cognitive load, information processing, Gestalt perceptual organization, affordances, feedback and feedforward, skeuomorphic versus flat design), gives each screen a load score and suggests how to reduce overload. With `--fix` it applies its findings to the UI files, verifies the result with `verify-ui` and adds an applied-fixes table to the report. | `COGNITIVE_LOAD_<project>.md` |
| `/feza-hci:color-audit` | Audits the colour palette, extracted from design tokens, CSS variables, the Tailwind config or stylesheets (or supplied by you): identifies the colour harmony, checks the 60-30-10 balance, computes WCAG 2.1 AA contrast ratios, simulates colour blindness, reviews colour coding and dark mode, and proposes a corrected palette. With `--fix` it applies its findings to the UI files, verifies the result with `verify-ui` and adds an applied-fixes table to the report. | `COLOR_AUDIT_<project>.md` |
| `/feza-hci:design-thinking` | Produces a five-stage design thinking roadmap (Empathize, Define, Ideate, Prototype, Test, after the Stanford d.school / IDEO model) for a given problem or opportunity, with goals, activities, deliverables, duration and suggested tools for each stage, plus iteration notes and a worked example scenario. | `DESIGN_THINKING_<project>.md` |
| `/feza-hci:prototype-plan` | Plans how to prototype the product: why prototype, the fidelity ladder (sketch, wireframe, mockup, prototype), when to use low- or high-fidelity, low-cost tools, a short test plan and the reminder that a prototype is not the product. Uses existing design files, scope and personas. | `PROTOTYPE_PLAN_<project>.md` |
| `/feza-hci:persona` | Creates one to three user personas, fictional but evidence-based profiles of target users in the goal-directed design tradition: demographics, goals, pain points, behaviours, technical skill level, a usage scenario and a quote, plus an anti-persona. Draws on brief, scope and stakeholder files and labels assumed data. | `PERSONAS_<project>.md` |
| `/feza-hci:hci-execute` | Designs and builds a working user interface instead of a report: user and task model (ISO 9241-210), information architecture and ASCII wireframes, a token-based design system (WCAG 2.1 AA contrast, light and dark themes, 4/8 pt grid), then accessible, responsive screens in the detected stack (React, Next.js, Vue, Svelte, Tailwind, plain HTML) or in dependency-free HTML, CSS and JS. Before delivery it checks its own output against Nielsen's heuristics, Dix et al., WCAG 2.1 AA and cognitive load and fixes what it finds; it can also apply findings from earlier HCI audits. When Node.js is available it also loads the generated interface in a real browser with Playwright at 320/390/768/1280 px, runs axe-core (WCAG 2.1/2.2 A/AA), horizontal-scroll, touch-target, keyboard/focus, reduced-motion with dark theme and 200% text-zoom checks, and writes screenshots plus `report.json` to `.feza/ui-check/`. | UI files plus `DESIGN_RATIONALE_<project>.md` |

> **Node.js 18+ is optional.** It is only needed for the automated render check of `hci-execute` and fix mode (Playwright and axe-core are installed into a user cache on first run). Without it the skills fall back to a static check.

### feza-sqa

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-sqa:sqa-plan` | Software quality assurance (SQA) is the set of activities that ensure both the product and the process meet their quality goals. This skill writes an IEEE 730-2014 SQA plan: quality goals, a capability or maturity target (ISO/IEC 33020 levels 0-5 or CMMI 1-5), the three SQA areas (process implementation, product assurance, process assurance), roles, lifecycle activities, reviews, audits and inspections, testing approach, metrics, defect tracking, tools, risks, schedule and success criteria. Reads scope, SRS, stakeholder and RACI files. | `SQA_PLAN_<project>.md` |
| `/feza-sqa:test-plan` | Writes a test plan and test cases following ISO/IEC/IEEE 29119-3 and IEEE 829, deriving test cases from the functional and non-functional requirements in `SRS_*.md` and from user story acceptance criteria when present. Covers test levels, approach, pass/fail criteria, schedule, environment, tools and risks; each test case has an ID, a requirement link, a priority, a type (positive, negative, boundary, NFR) and an expected result. | `TEST_PLAN_<project>.md` |
| `/feza-sqa:metrics-plan` | Plans software quality metrics in three groups: pre-process (effort and defect estimates, inspection decisions), in-process (defect discovery rate, quality during development) and end-process (Defect Removal Efficiency, DRE, and process improvement). Sets numeric targets, a collection plan and a dashboard, aligned with ISO/IEC/IEEE 15939 and IEEE 1028; project size comes from the SRS and estimates. | `METRICS_PLAN_<project>.md` |
| `/feza-sqa:inspection` | An inspection is the most formal kind of peer review of a work product. The skill writes an IEEE 1028 inspection procedure based on Fagan's method: six steps (plan, overview, prepare, meeting, rework, report), roles (moderator, author, reader, recorder, inspectors), a nine-dimension checklist, Critical/Major/Minor severity, exit criteria and ready-to-use forms (inspection plan, defect log, summary). It also explains when a walkthrough or audit fits better, and can target requirements, design, code or test plans. | `INSPECTION_PLAN_<project>.md` |
| `/feza-sqa:traceability-matrix` | Builds a requirements traceability matrix (RTM) that links each stakeholder need through business, stakeholder, system and software requirements to design, code, test cases and defects, in forward, backward and horizontal directions. Connects existing FezaPlugin outputs (SCOPE, SRS, REQ_LAYERED, USER_STORIES, TEST_PLAN), computes coverage per stage and lists gaps with suggested actions. | `TRACEABILITY_<project>.md` |
| `/feza-sqa:change-control` | Sets up change control, aligned with IEEE 730, PMBOK integrated change control and ISO/IEC/IEEE 12207 configuration management: Change Control Board (CCB) structure, change request (CR) states from Proposed to Closed, a CR form, an impact analysis worksheet (scope, schedule, cost, quality, stakeholders, dependencies, risk), voting protocol, an express track for small changes and an audit trail. Can instead produce a single change request. | `CHANGE_CONTROL_<project>.md` or `CR_<id>_<project>.md` |
| `/feza-sqa:defect-report` | Produces a defect report template, or fills in a single defect report from your description, using IEEE 1044 terminology (fault, failure, anomaly and so on) and the ISO/IEC/IEEE 29119-3 incident report structure: severity and priority (with a matrix explaining the difference), reproduction steps, expected versus actual result, environment, traceability to test case and requirement, root cause category and defect lifecycle. Includes triage rules and Jira / GitHub Issues field mapping. | `DEFECT_REPORT_TEMPLATE_<project>.md` or `DR_<id>_<project>.md` |

### feza-toolkit

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-toolkit:help` | Shows the FezaPlugin menu: the packages, every skill with the standard or method it is based on, how to call it and a suggested first step. Writes no file. | In chat |
| `/feza-toolkit:lifecycle-pick` | Recommends a software development life cycle (SDLC) model. Scores the project on requirement clarity, team experience, customer involvement, time pressure and technology risk; compares Waterfall, Incremental and Iterative plus Agile/Scrum, Kanban, V-Model, Spiral and Hybrid; and gives the chosen model's pros and cons and a detailed plan (phases or sprints, roles, artefacts, cadence, risks). Reads scope, SRS, stakeholder, risk and estimate files when available. | `LIFECYCLE_PICK_<project>.md` |
| `/feza-toolkit:full-package` | Orchestrator that runs the core skills of the other packages in a sensible order from a single project brief, feeding each output into the next. Choose a Mini (8 files), Standard (15 files) or Full (28+ files) package; the run ends with a `PACKAGE_<project>.md` manifest listing the generated files, suggested next steps and known gaps. All other packages must be installed. | Many documents plus `PACKAGE_<project>.md` |
| `/feza-toolkit:demo-script` | Prepares a 10-15 minute presentation for stakeholders, investors, customers or a board: a timed flow (opening hook, problem, solution, live demo, architecture, numeric evidence such as PERT estimates, DRE and risk scores, standards compliance, closing) and a Q&A bank with prepared answers on ROI, schedule, risk, security, scalability, competition and adoption. Pulls its figures from existing FezaPlugin outputs. | `DEMO_SCRIPT_<project>.md` |
| `/feza-toolkit:glossary` | Generates a bilingual Turkish-English glossary of requirements, project management, ISO/IEC standards, HCI and SQA terms, sorted alphabetically and by category. Each entry gives the translation, a definition, the source standard reference, the related FezaPlugin skill and a usage example. Needs no input, but can be filtered by area or term. | `GLOSSARY_<lang>.md` |

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
/feza-requirements:srs-generate   -> SRS_acme-portal_v0.1.md
/feza-pm:scope-statement          -> SCOPE_acme-portal.md      (reads SRS_*)
/feza-pm:wbs                      -> WBS_acme-portal.md        (reads SRS_* and SCOPE_*)
/feza-pm:estimate                 -> ESTIMATES_acme-portal.md  (reads WBS_*)
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
