# feza-toolkit

Toolkit and orchestration skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 5 skills.

Cross-package utilities: skill menu, lifecycle model selection, full documentation package orchestration, demo script and bilingual glossary. full-package requires all FezaPlugin packages.

> **Note:** `/feza-toolkit:full-package` calls skills from the other packages. Install all five
> FezaPlugin packages (`feza-requirements`, `feza-pm`, `feza-hci`, `feza-sqa`,
> `feza-toolkit`) to generate a complete documentation set.

## Skills

| Command | What it does | Output |
|---------|--------------|--------|
| `/feza-toolkit:help` | Shows the FezaPlugin menu: the packages, every skill with the standard or method it is based on, how to call it and a suggested first step. Writes no file. | In chat |
| `/feza-toolkit:lifecycle-pick` | Recommends a software development life cycle (SDLC) model. Scores the project on requirement clarity, team experience, customer involvement, time pressure and technology risk; compares Waterfall, Incremental and Iterative plus Agile/Scrum, Kanban, V-Model, Spiral and Hybrid; and gives the chosen model's pros and cons and a detailed plan (phases or sprints, roles, artefacts, cadence, risks). Reads scope, SRS, stakeholder, risk and estimate files when available. | `LIFECYCLE_PICK_<project>.md` |
| `/feza-toolkit:full-package` | Orchestrator that runs the core skills of the other packages in a sensible order from a single project brief, feeding each output into the next. Choose a Mini (8 files), Standard (15 files) or Full (24+ files) package; the run ends with a `PACKAGE_<project>.md` manifest listing the generated files, suggested next steps and known gaps. All other packages must be installed. | Many documents plus `PACKAGE_<project>.md` |
| `/feza-toolkit:demo-script` | Prepares a 10-15 minute presentation for stakeholders, investors, customers or a board: a timed flow (opening hook, problem, solution, live demo, architecture, numeric evidence such as PERT estimates, DRE and risk scores, standards compliance, closing) and a Q&A bank with prepared answers on ROI, schedule, risk, security, scalability, competition and adoption. Pulls its figures from existing FezaPlugin outputs. | `DEMO_SCRIPT_<project>.md` |
| `/feza-toolkit:glossary` | Generates a bilingual Turkish-English glossary of requirements, project management, ISO/IEC standards, HCI and SQA terms, sorted alphabetically and by category. Each entry gives the translation, a definition, the source standard reference, the related FezaPlugin skill and a usage example. Needs no input, but can be filtered by area or term. | `GLOSSARY_<lang>.md` |

## Installation

Claude Code:

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-toolkit@feza
```

Codex:

```bash
codex plugin marketplace add feza-co/FezaPlugin
```

Then run `/plugins` in Codex and install `feza-toolkit`.

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
