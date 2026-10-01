# feza-iso

ISO/IEC compliance skills for [FezaPlugin](https://github.com/feza-co/FezaPlugin#readme). 6 skills.

ISO/IEC standards skills: 12207 process audit, 29110 VSE profile, 25010 product quality, 15939 measurement plan, 29148 layered requirements and complaint-to-process mapping.

## Skills

| Command | Produces |
|---------|----------|
| `/feza-iso:iso12207-audit` | `ISO12207_AUDIT_<project>.md`: process audit against ISO/IEC/IEEE 12207:2017 |
| `/feza-iso:iso29110-vse` | `ISO29110_VSE_<project>.md`: ISO/IEC 29110 Entry Profile applicability and gap analysis |
| `/feza-iso:iso25010-quality` | `ISO25010_QUALITY_<project>.md`: product quality scoring across the nine ISO/IEC 25010:2023 characteristics, including Flexibility and Safety |
| `/feza-iso:iso15939-measure` | `MEASUREMENT_PLAN_<project>.md`: ISO/IEC/IEEE 15939 measurement plan |
| `/feza-iso:iso29148-req` | `REQ_LAYERED_<project>.md`: requirements restructured into BRS, StRS, SyRS and SRS layers |
| `/feza-iso:complaints-to-compliance` | `COMPLAINTS_TO_COMPLIANCE_<project>.md`: team complaints mapped to ISO/IEC/IEEE 12207 technical management processes |

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
