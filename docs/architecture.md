# Architecture

This document describes how the FezaPlugin repository is organised, how generated files are
produced and how a skill turns input into a delivered document.

## Design goals

1. **One source of truth.** Every skill exists once, under `plugins/<package>/skills/<skill>/`.
2. **Self-contained skills.** A skill never refers to files outside its own folder. Plugin
   installers copy only the plugin directory, and many clients load single skill folders, so
   anything a skill needs must live inside it.
3. **No symbolic links.** Shared content is copied by a script, not linked, so the repository works
   the same on Windows, macOS and Linux.
4. **Drift is a CI failure.** Generated files are committed, and CI fails if they differ from what
   the sources would produce.

## Repository layout

```text
FezaPlugin/
├── .claude-plugin/marketplace.json     Claude Code marketplace (name: feza)
├── .agents/plugins/marketplace.json    Codex marketplace
├── .cursor-plugin/marketplace.json     Cursor marketplace (pluginRoot: plugins)
├── gemini-extension.json               Gemini CLI extension (uses root skills/)
├── VERSION                             Single version for all manifests
├── shared/                             Source of shared reference files
│   └── packages/<package>/             Shared files for one package only
├── plugins/
│   └── <package>/
│       ├── .claude-plugin/plugin.json
│       ├── .codex-plugin/plugin.json
│       ├── .cursor-plugin/plugin.json
│       ├── README.md
│       └── skills/<skill>/
│           ├── SKILL.md
│           └── references/             Skill references plus generated copies
├── skills/                             Generated flat mirror of every skill
├── scripts/
│   ├── sync.py                         Generates copies, mirror and versions
│   └── validate.py                     Static checks
├── docs/
└── .github/                            CI, issue and pull request templates
```

## Packages and namespaces

| Package | Namespace | Skills |
|---------|-----------|-------:|
| `feza-requirements` | `/feza-requirements:<skill>` | 6 |
| `feza-pm` | `/feza-pm:<skill>` | 12 |
| `feza-iso` | `/feza-iso:<skill>` | 6 |
| `feza-hci` | `/feza-hci:<skill>` | 9 |
| `feza-sqa` | `/feza-sqa:<skill>` | 7 |
| `feza-toolkit` | `/feza-toolkit:<skill>` | 5 |

Skill names are unique across packages, which allows the flat root `skills/` mirror and
name-based invocation in clients without namespaces.

## Platform manifests

| Platform | Catalog | Per-package manifest | Skills location |
|----------|---------|----------------------|-----------------|
| Claude Code | `.claude-plugin/marketplace.json` | `plugins/<pkg>/.claude-plugin/plugin.json` | `plugins/<pkg>/skills/` (default) |
| Codex | `.agents/plugins/marketplace.json` | `plugins/<pkg>/.codex-plugin/plugin.json` | `"skills": "./skills/"` |
| Cursor | `.cursor-plugin/marketplace.json` | `plugins/<pkg>/.cursor-plugin/plugin.json` | `"skills": "./skills/"` |
| Gemini CLI | none (one extension per repository) | `gemini-extension.json` | root `skills/` |
| Agent Skills clients | none | none | root `skills/` |

Marketplace entries in the Claude Code catalog do not carry a version; the plugin manifest is
authoritative.

## The sync flow

`python scripts/sync.py` performs four steps:

1. **Shared references.** Every file in `shared/` is copied into every skill's `references/`
   folder. Each copy starts with `<!-- generated from shared/<file> — do not edit -->`.
   Files in `shared/packages/<package>/` are copied only into the skills of that package (for
   example `shared/packages/feza-pm/srs-gate.md`, the SRS requirement of every feza-pm skill).
2. **Cross-skill references.** Some skills reuse a reference file owned by another skill, for
   example `srs-review` reads `well-formed-requirements.md` from `srs-generate`. These pairs are
   listed explicitly in `CROSS_SKILL_REFERENCES` in `scripts/sync.py`, and the file is copied into
   the consumer's `references/` folder with the same generated header.
3. **Root mirror.** Every `plugins/<package>/skills/<skill>/` folder is copied to `skills/<skill>/`,
   and `skills/README.md` marks the directory as generated. Stale files are removed.
4. **Versions.** The `version` field of every plugin manifest and of `gemini-extension.json`, and
   the version badge in both READMEs, are set from `VERSION`.

`python scripts/sync.py --check` performs the same computation without writing and exits with
status 1 if anything differs. CI runs it on every push and pull request.

```text
shared/*.md ──────────────┐
                          ├──> plugins/<pkg>/skills/<skill>/references/   (generated copies)
other skill's references ─┘                    │
                                               └──> skills/<skill>/       (generated mirror)
VERSION ──> plugin.json x 18, gemini-extension.json, README badges
```

## Validation

`python scripts/validate.py` checks:

- the package map: each package contains exactly the expected skills;
- frontmatter: `name` equals the folder name, matches `^[a-z0-9]+(-[a-z0-9]+)*$` and is at most
  64 characters; `description` is 1 to 1024 characters;
- references: every `references/<file>.md` a skill mentions exists inside that skill;
- self-containment: no `../`, `shared/` or other-skill paths inside skills;
- cross-links: every `/feza-<package>:<skill>` command names an existing skill in that package;
- manifests: valid JSON, consistent names, versions, licence and marketplace entries;
- generated files: every `references/` copy and every file in the `skills/` mirror matches its source;
- banned terms: legacy names that must not appear anywhere in the repository.

The script uses relative paths from the repository root and only the Python standard library.

## Skill execution model

Every document-producing skill follows the same pipeline, defined by the shared references:

1. **Input discovery** (`references/input-discovery.md`): look for a brief, the codebase and
   earlier FezaPlugin outputs; ask for a brief only if nothing usable exists; ask at most three
   questions about critical gaps; detect the output language.
2. **Generation**: draft the document in memory using the skill's own references.
3. **Quality gate** (`references/quality-gate.md`): score the draft against the criteria set of
   the package that produced it (feza-requirements, feza-pm, feza-iso, feza-hci, feza-sqa, or integrated
   package report), fix blocking issues, and revise up to two times when the draft is below the
   threshold. The gate is internal: scores, criteria tables and revision notes are never shown to
   the user or written to files.
4. **Delivery** (`references/output-conventions.md`, `references/delivery-format.md`): write the
   final version with a cover page, abstract, numbered table of contents, references, appendices
   and a "Known Gaps" section, or a short header in plain format, then post a short summary in chat.

Conversational skills (`help`, `conflict-resolve`) do not produce documents and skip the gate.
