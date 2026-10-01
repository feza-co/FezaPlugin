# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 2.x     | Yes       |
| < 2.0   | No        |

## Scope

FezaPlugin consists of Markdown skill instructions, JSON manifests and Python maintenance scripts.
Relevant reports include, for example:

- Skill instructions that could cause an agent to run unexpected commands, read files outside the
  user's project or send data to external services.
- Problems in `scripts/sync.py` or `scripts/validate.py` that could write outside the repository.
- Manifest settings that grant broader tool access than a skill needs.

## Reporting a vulnerability

Please do not open a public issue for security problems.

Report privately through GitHub:
[Security tab, Report a vulnerability](https://github.com/feza-co/FezaPlugin/security/advisories/new).

Include a description of the issue, the affected skill or file, steps to reproduce and the
potential impact. We aim to acknowledge reports within five business days and to share a
remediation plan after triage. Please allow us reasonable time to release a fix before any
public disclosure.
