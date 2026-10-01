# Contributing to FezaPlugin

Thank you for your interest in improving FezaPlugin. This guide explains how the repository is
organised and what a good contribution looks like.

## Ground rules

- Be respectful and follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Open an issue before large changes (new skills, new packages, format changes) so the approach
  can be agreed first. Small fixes can go straight to a pull request.
- Keep pull requests focused: one skill or one concern per pull request.

## Development setup

You need Python 3.10 or later. No third-party packages are required.

```bash
git clone https://github.com/feza-co/FezaPlugin.git
cd FezaPlugin
python scripts/sync.py
python scripts/validate.py
```

To try a package locally in Claude Code:

```bash
claude --plugin-dir ./plugins/feza-pm
```

See [docs/installation.md](docs/installation.md) for local setups on other platforms.

## Where to edit

| You want to change | Edit | Do not edit |
|--------------------|------|-------------|
| A skill | `plugins/<package>/skills/<skill>/` | `skills/<skill>/` (generated mirror) |
| Shared conventions, quality gate, delivery format | `shared/*.md` | `references/<shared file>.md` copies inside skills |
| A reference borrowed from another skill | the source skill's `references/` | the copy (it starts with a "generated from" comment) |
| The release version | `VERSION` | `version` fields in manifests |

After any edit, run `python scripts/sync.py` and commit the regenerated files together with your
change. CI runs `python scripts/sync.py --check` and fails if generated files are out of date.

## Adding a skill

1. Pick the package the skill belongs to and create `plugins/<package>/skills/<skill-name>/SKILL.md`.
2. Follow [docs/skill-authoring.md](docs/skill-authoring.md) for the frontmatter, structure,
   quality gate step and delivery format.
3. Add the skill to `PACKAGES` in `scripts/validate.py`, to the package README, to the skill
   tables in `README.md` and `README.tr.md`, and to the `help` skill.
4. If the skill needs a reference file from another skill, add an entry to
   `CROSS_SKILL_REFERENCES` in `scripts/sync.py`. Never point to files outside the skill folder.
5. Run `python scripts/sync.py` and `python scripts/validate.py`; both must finish without errors.
6. Add an entry under `## [Unreleased]` in [CHANGELOG.md](CHANGELOG.md).

## Commit messages

- Use the imperative mood in plain English: "Add risk heat map to risk-register".
- Keep the subject line under 72 characters; explain the reason in the body when it is not obvious.

## Pull request checklist

- [ ] `python scripts/sync.py --check` passes
- [ ] `python scripts/validate.py` passes
- [ ] README tables, package README and `help` skill are updated when skills change
- [ ] CHANGELOG entry added under `[Unreleased]`

## Versioning

FezaPlugin follows [Semantic Versioning](https://semver.org/). All packages share the single
version in `VERSION`.

- **MAJOR:** breaking changes, such as renamed skills, packages or output file names.
- **MINOR:** new skills or new optional capabilities.
- **PATCH:** fixes and wording improvements within existing skills.

## License

By contributing you agree that your contributions are licensed under the [MIT License](LICENSE).
