# feza-pm

Project management skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 12 skills.

Project management skills: scope statement, WBS, PERT estimation, budget, CPM scheduling, risk register, RACI, SWOT, stakeholder and communication planning.

## Skills

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
