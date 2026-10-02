# Skill authoring guide

This guide describes how to write or change a FezaPlugin skill so that it works on every supported
platform and passes `scripts/validate.py`.

## Folder layout

```text
plugins/<package>/skills/<skill-name>/
├── SKILL.md
└── references/
    ├── <your-reference>.md         written by you
    ├── output-conventions.md       generated from shared/ (do not edit)
    ├── delivery-format.md          generated from shared/ (do not edit)
    ├── input-discovery.md          generated from shared/ (do not edit)
    └── quality-gate.md             generated from shared/ (do not edit)
```

Skills of a package can also receive package-scoped generated files from
`shared/packages/<package>/` (for example every feza-pm skill gets `references/srs-gate.md`).

Generated files start with `<!-- generated from ... — do not edit -->`. Edit the source and run
`python scripts/sync.py`.

## Frontmatter

`SKILL.md` must start with YAML frontmatter that follows the
[Agent Skills specification](https://agentskills.io/specification):

```yaml
---
name: risk-register
description: >
  Builds a risk register with category, probability x impact score, response strategy and
  owner. Reads SWOT_*.md, SCOPE_*.md and ESTIMATES_*.md when present.
  Triggers: "risk register", "risk analysis", "/feza-pm:risk-register".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---
```

| Field | Rule |
|-------|------|
| `name` | Required. Same as the folder name. Lowercase letters, digits and single hyphens (`^[a-z0-9]+(-[a-z0-9]+)*$`), at most 64 characters, unique across all packages. |
| `description` | Required. 1 to 1024 characters. Say what the skill produces, which inputs it reads and the phrases that should trigger it. |
| `allowed-tools` | Optional. Honoured by Claude Code; other clients may ignore it, so never rely on it for safety. |
| `license`, `compatibility`, `metadata` | Optional, as defined by the specification. Other keys produce a validator warning. |

Keep `SKILL.md` under 500 lines; move templates, formulas and long checklists into `references/`.

## Body structure

Use the same step structure as existing skills so that behaviour is predictable:

1. **Triggers**: commands and phrases that start the skill.
2. **Step 0, gather context**: which files to look for (`BRIEF.md`, `SCOPE_*.md`, source code and
   so on), following `references/input-discovery.md`.
3. **Step 1, critical gaps**: a short table of the questions worth asking, with a hard limit
   (normally at most three).
4. **Step 2, knowledge base**: the `references/` files to read before generating.
5. **Step 3, generate**: the document skeleton and the rules for each section.
6. **Step 4, self-check**: a checklist.
7. **Quality gate and delivery format**: the mandatory section below.
8. **Write**: the output file name (see `references/output-conventions.md`) and location.
9. **Report**: the short chat summary and the suggested next skill.
10. **Limits**: question limits, what the skill must not do.

## Quality gate and delivery format (required for document skills)

Every skill that writes a document must include this flow before its write step:

```markdown
## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Draft the full document; do not write the file yet.
2. Score the draft with `references/quality-gate.md` using the criteria set of its package.
3. Revise up to two times if the threshold is not met or a blocking issue exists.
4. Write the final version in the delivery format of `references/output-conventions.md`
   (template: `references/delivery-format.md`).
5. Never show scores, criteria tables or revision notes to the user.
```

Existing skills contain the Turkish wording of this section; copy it from a skill in the same
package and name the criteria set after the package (feza-requirements, feza-pm, feza-iso, feza-hci, feza-sqa,
or "Bütünleşik paket raporu" for integrated package reports). Conversational skills that do not write files, such as `help` and
`conflict-resolve`, do not need it.

## References and paths

- Refer to bundled files only as `references/<file>.md`, relative to the skill folder.
- Never use `../`, `shared/` or another skill's folder in a path. Different platforms install
  skills in different places, and only the skill folder is guaranteed to be present.
- Scripts live one level below the skill root and are referred to as `scripts/<name>`, for example
  `scripts/verify-ui.mjs`.
- If your skill needs a reference file that another skill owns, add an entry to
  `CROSS_SKILL_REFERENCES` in `scripts/sync.py`:

  ```python
  ("srs-generate", "well-formed-requirements.md", "your-skill"),
  ```

  and refer to it as `references/well-formed-requirements.md`.

## Scripts inside a skill

A skill may ship small helper scripts under its own `scripts/` folder. The rules are:

- The folder sits exactly one level below the skill root (`plugins/<package>/skills/<skill>/scripts/`)
  and a script is referred to as `scripts/x.mjs` or `scripts/x.py`. Scripts must not reach outside
  the skill folder.
- A script uses only the standard library of its runtime, or a dependency installed at run time
  into a temporary user cache (for example Playwright and axe-core for `verify-ui.mjs`). The
  repository never contains `node_modules` or a vendored dependency tree.
- A script exits with `0` when every check passes, `1` when it finds a problem, and `2` when the
  check cannot run (a missing tool or an invalid input), so a caller can tell a finding from an
  unavailable check.
- Scripts shared between skills are copied by `scripts/sync.py` via the `CROSS_SKILL_SCRIPTS` list;
  never copy a script between skill folders by hand.
- `scripts/validate.py` checks every `scripts/<name>` reference made by a skill.

## Shared fix mode

The fix-mode instructions are written once in `shared/packages/feza-hci/fix-mode.md`. The
`PACKAGE_SHARED_SCOPE` table in `scripts/sync.py` distributes that file to the four evaluation
skills (`hci-review`, `heuristic-eval`, `cognitive-load`, `color-audit`) as
`references/fix-mode.md`, and only to them. To give a new evaluation skill fix mode, add it to the
scope, then add a "Fix Modu" step to its `SKILL.md` and the trigger phrases to its `description`.
Fix mode applies findings to UI files only, defaults to severity ≥ 2, accepts `--fix=all`, verifies
the result with `verify-ui` and adds an applied-fixes table to the report.

## Adding an acceptance criterion (E code)

The HCI acceptance criteria are one numbered set, **E1-E29**, defined in the feza-hci package. To
add or change a criterion, keep all four definitions in step in a single change:

1. **`shared/packages/feza-hci/thresholds.md`** — the human-readable row in the E table and, when
   the criterion has a numeric threshold, the machine-readable value in the `json` block. This file
   is the single source; every feza-hci skill receives it as `references/thresholds.md`.
2. **`plugins/feza-hci/skills/hci-execute/scripts/verify-ui.mjs`** — the same numeric value inside
   the `// THRESHOLDS-BEGIN` … `// THRESHOLDS-END` block, plus the measurement code that writes
   `results.E<code>` as `{ ok, value, threshold, method }`.
3. **`shared/quality-gate.md`** — the matching row in the "feza-hci engelleyicileri" table, and the
   `E1-E29` reference in the blockers list. `scripts/validate.py` compares the thresholds file, the
   `THRESHOLDS` block and the quality-gate rows and fails on any drift.
4. **The fixture pair** — `tests/hci/fixtures/<code>-fail.html` and `<code>-pass.html` (or a
   `tests/hci/fixtures/static/<code>-fail|pass/` directory for a `--static` criterion), with the
   expected exit code and FAIL/null codes added to `tests/hci/expected.json`. Run
   `node tests/hci/run.mjs` and confirm the pair behaves as expected.

Do not invent new numbers: code numbers are fixed by the table in `thresholds.md`. State the
measurement mode (`otomatik`, `karma` or `statik`) honestly; a criterion that cannot be measured
automatically is reported with `ok: null` and checked by hand.

## Cross-links between skills

Refer to other skills with their full command, `/feza-<package>:<skill>`, for example "Next:
`/feza-pm:estimate`". The validator checks that every such command exists. If a skill depends on a
skill from another package, say so in its description and in the package README.

## Writing style

- Formal, technical tone; no emoji.
- Tables over long lists.
- Every claim is backed by the brief, the code or an explicit `Varsayım:` (assumption) label.
- Placeholders use `TBD — <reason>`; a bare `TBD` is not allowed.
- Requirement-like statements must be measurable; avoid vague words such as "fast",
  "user-friendly" or "flexible" without a threshold.

## Before opening a pull request

```bash
python scripts/sync.py
python scripts/sync.py --check
python scripts/validate.py
```

All three must finish without errors. Then update the package README, the skill tables in
`README.md` and `README.tr.md`, the `help` skill and `CHANGELOG.md`.
