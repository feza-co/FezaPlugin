# Installation

FezaPlugin ships six packages from one repository:

| Package | Skills |
|---------|-------:|
| `feza-requirements` | 6 |
| `feza-pm` | 12 |
| `feza-iso` | 6 |
| `feza-hci` | 9 |
| `feza-sqa` | 7 |
| `feza-toolkit` | 5 |

Install only what you need. `/feza-toolkit:full-package` calls skills from the other packages,
so install all six packages if you plan to use it.

- [Claude Code](#claude-code)
- [Codex](#codex)
- [Cursor](#cursor)
- [Gemini CLI](#gemini-cli)
- [Other Agent Skills clients](#other-agent-skills-clients)
- [Updating and removing](#updating-and-removing)
- [Troubleshooting](#troubleshooting)

## Claude Code

The repository is a Claude Code plugin marketplace named `feza`
(`.claude-plugin/marketplace.json`). Each package is a separate plugin under `plugins/`.

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-requirements@feza
/plugin install feza-pm@feza
/plugin install feza-iso@feza
/plugin install feza-hci@feza
/plugin install feza-sqa@feza
/plugin install feza-toolkit@feza
```

Skills are then available as `/feza-<package>:<skill>`, for example
`/feza-requirements:srs-generate`. Run `/feza-toolkit:help` to list them.

Local development from a clone:

```bash
claude --plugin-dir ./plugins/feza-pm
claude plugin validate .
```

Claude Code copies an installed plugin into its plugin cache. Files outside a plugin directory are
not copied, which is why every skill carries its own copies of the shared references (see
[architecture.md](architecture.md)).

## Codex

The repository provides a Codex marketplace at `.agents/plugins/marketplace.json`, and each
package has a Codex manifest at `plugins/<package>/.codex-plugin/plugin.json`.

```bash
codex plugin marketplace add feza-co/FezaPlugin
```

Open Codex, run `/plugins`, choose the `feza` marketplace and install the packages you need.
Invoke a skill by name, for example `$srs-generate`, or describe the task and let Codex select the
skill.

Without the plugin system, copy skill folders into a skills directory Codex scans:

```bash
mkdir -p ~/.agents/skills
cp -r skills/srs-generate ~/.agents/skills/
```

Project-level skills can live in `.agents/skills/` at the root of your repository.

## Cursor

Each package has a Cursor manifest at `plugins/<package>/.cursor-plugin/plugin.json`, and the
repository has a Cursor marketplace file at `.cursor-plugin/marketplace.json`
(`pluginRoot: plugins`).

- **Teams and Enterprise:** in the Cursor dashboard open Plugins, choose Add Marketplace, then
  Import from Repo and enter `https://github.com/feza-co/FezaPlugin`.
- **Cursor Marketplace:** public marketplace listing is not yet available. This section will be
  updated when it is.
- **Local plugin:** copy a package into Cursor's local plugin directory and restart Cursor:

  ```bash
  mkdir -p ~/.cursor/plugins/local
  cp -r plugins/feza-pm ~/.cursor/plugins/local/
  ```

- **Skills only:** Cursor also reads skills from `.agents/skills/`, `.cursor/skills/` and
  `~/.cursor/skills/`. Copy individual folders from the root `skills/` directory there.

## Gemini CLI

The repository root is a Gemini CLI extension (`gemini-extension.json`). Its skills come from the
generated root `skills/` directory, which contains all 45 skills.

```bash
gemini extensions install https://github.com/feza-co/FezaPlugin
```

For development from a clone:

```bash
gemini extensions link .
```

## Other Agent Skills clients

Any client that supports the [Agent Skills](https://agentskills.io/specification) format can use
the root `skills/` directory.

With the `skills` CLI:

```bash
npx skills add feza-co/FezaPlugin                    # all skills
npx skills add feza-co/FezaPlugin -s srs-generate    # one skill
npx skills add feza-co/FezaPlugin -a <agent>         # target a specific agent
```

On Windows add `--copy` so files are copied instead of linked.

Manual installation: copy the skill folders you need from `skills/` into the directory your client
scans, for example:

| Client | Project directory | User directory |
|--------|-------------------|----------------|
| Shared convention | `.agents/skills/` | `~/.agents/skills/` |
| GitHub Copilot | `.github/skills/` or `.agents/skills/` | `~/.copilot/skills/` |
| OpenCode | `.opencode/skills/` or `.agents/skills/` | see the OpenCode documentation |

Always copy the whole skill folder, including `references/`.

## Updating and removing

- **Claude Code:** `/plugin marketplace update feza`, then reinstall or update the plugins from
  `/plugin`. Remove a package with `/plugin uninstall <package>@feza`.
- **Codex:** use `/plugins` to update or remove packages.
- **Gemini CLI:** `gemini extensions update feza` and `gemini extensions uninstall feza`.
- **Copied skills:** replace or delete the copied folders.

## Troubleshooting

- **A skill cannot find `references/...`:** make sure the whole skill folder was copied,
  including `references/`. Every skill is self-contained.
- **`full-package` reports a missing package:** install all six packages.
- **Commands do not appear in Claude Code:** run `/plugin` to confirm the plugins are enabled, then
  restart the session.
