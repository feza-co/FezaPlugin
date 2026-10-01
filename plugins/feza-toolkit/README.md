# feza-toolkit

Toolkit and orchestration skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 5 skills.

Cross-package utilities: skill menu, lifecycle model selection, full documentation package orchestration, demo script and bilingual glossary. full-package requires all FezaPlugin packages.

> **Note:** `/feza-toolkit:full-package` calls skills from the other packages. Install all six
> FezaPlugin packages (`feza-requirements`, `feza-pm`, `feza-iso`, `feza-hci`, `feza-sqa`,
> `feza-toolkit`) to generate a complete documentation set.

## Skills

| Command | Produces |
|---------|----------|
| `/feza-toolkit:help` | The skill menu, shown in chat |
| `/feza-toolkit:lifecycle-pick` | `LIFECYCLE_PICK_<project>.md`: recommended SDLC model with rationale |
| `/feza-toolkit:full-package` | A complete documentation set (Mini, Standard or Full) plus a `PACKAGE_<project>.md` manifest |
| `/feza-toolkit:demo-script` | `DEMO_SCRIPT_<project>.md`: timed presentation flow and Q&A bank |
| `/feza-toolkit:glossary` | `GLOSSARY_<lang>.md`: bilingual Turkish-English glossary of 100+ terms |

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
