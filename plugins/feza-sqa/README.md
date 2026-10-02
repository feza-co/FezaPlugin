# feza-sqa

Software quality assurance skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 7 skills.

Software quality assurance skills: IEEE 730 SQA plan, test plan, metrics plan, IEEE 1028 inspection, traceability matrix, change control and defect reporting.

## Skills

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-sqa:sqa-plan` | Software quality assurance (SQA) is the set of activities that ensure both the product and the process meet their quality goals. This skill writes an IEEE 730-2014 SQA plan: quality goals, a capability or maturity target (ISO/IEC 33020 levels 0-5 or CMMI 1-5), the three SQA areas (process implementation, product assurance, process assurance), roles, lifecycle activities, reviews, audits and inspections, testing approach, metrics, defect tracking, tools, risks, schedule and success criteria. Reads scope, SRS, stakeholder and RACI files. | `SQA_PLAN_<project>.md` |
| `/feza-sqa:test-plan` | Writes a test plan and test cases following ISO/IEC/IEEE 29119-3 and IEEE 829, deriving test cases from the functional and non-functional requirements in `SRS_*.md` and from user story acceptance criteria when present. Covers test levels, approach, pass/fail criteria, schedule, environment, tools and risks; each test case has an ID, a requirement link, a priority, a type (positive, negative, boundary, NFR) and an expected result. | `TEST_PLAN_<project>.md` |
| `/feza-sqa:metrics-plan` | Plans software quality metrics in three groups: pre-process (effort and defect estimates, inspection decisions), in-process (defect discovery rate, quality during development) and end-process (Defect Removal Efficiency, DRE, and process improvement). Sets numeric targets, a collection plan and a dashboard, aligned with ISO/IEC/IEEE 15939 and IEEE 1028; project size comes from the SRS and estimates. | `METRICS_PLAN_<project>.md` |
| `/feza-sqa:inspection` | An inspection is the most formal kind of peer review of a work product. The skill writes an IEEE 1028 inspection procedure based on Fagan's method: six steps (plan, overview, prepare, meeting, rework, report), roles (moderator, author, reader, recorder, inspectors), a nine-dimension checklist, Critical/Major/Minor severity, exit criteria and ready-to-use forms (inspection plan, defect log, summary). It also explains when a walkthrough or audit fits better, and can target requirements, design, code or test plans. | `INSPECTION_PLAN_<project>.md` |
| `/feza-sqa:traceability-matrix` | Builds a requirements traceability matrix (RTM) that links each stakeholder need through business, stakeholder, system and software requirements to design, code, test cases and defects, in forward, backward and horizontal directions. Connects existing FezaPlugin outputs (SCOPE, SRS, USER_STORIES, TEST_PLAN), computes coverage per stage and lists gaps with suggested actions. | `TRACEABILITY_<project>.md` |
| `/feza-sqa:change-control` | Sets up change control, aligned with IEEE 730, PMBOK integrated change control and ISO/IEC/IEEE 12207 configuration management: Change Control Board (CCB) structure, change request (CR) states from Proposed to Closed, a CR form, an impact analysis worksheet (scope, schedule, cost, quality, stakeholders, dependencies, risk), voting protocol, an express track for small changes and an audit trail. Can instead produce a single change request. | `CHANGE_CONTROL_<project>.md` or `CR_<id>_<project>.md` |
| `/feza-sqa:defect-report` | Produces a defect report template, or fills in a single defect report from your description, using IEEE 1044 terminology (fault, failure, anomaly and so on) and the ISO/IEC/IEEE 29119-3 incident report structure: severity and priority (with a matrix explaining the difference), reproduction steps, expected versus actual result, environment, traceability to test case and requirement, root cause category and defect lifecycle. Includes triage rules and Jira / GitHub Issues field mapping. | `DEFECT_REPORT_TEMPLATE_<project>.md` or `DR_<id>_<project>.md` |

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
