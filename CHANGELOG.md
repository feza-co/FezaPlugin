# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-10-01

Initial public release of FezaPlugin.

### Added

- 45 agent skills in six independently installable packages: `feza-requirements` (6),
  `feza-pm` (12), `feza-iso` (6), `feza-hci` (9), `feza-sqa` (7) and `feza-toolkit` (5).
- ISO/IEC/IEEE 29148 and IEEE 830 aligned SRS generation from source code or from a brief, with
  quality of service, compliance and optional AI/ML sections.
- Project management, ISO compliance, HCI/UX and software quality assurance document skills
  that chain their outputs (scope, WBS, estimates, budget, schedule, risk, test and traceability).
- `/feza-hci:hci-execute`, which designs and builds an HCI-compliant user interface end to end:
  user and task model, information architecture with ASCII wireframes, a token-based design
  system with computed WCAG 2.1 AA contrast and light and dark themes, working accessible and
  responsive screens in the detected UI stack (or dependency-free HTML, CSS and JavaScript), an
  internal heuristic, WCAG and cognitive load verification loop, and a design rationale document.
- Shared delivery format for every document: cover page, bilingual abstract, numbered table of
  contents, references, appendices and a "Known Gaps" section, with a plain format on request.
- Internal quality gate that checks and revises each draft before it is written.
- Manifests for Claude Code, Codex, Cursor and Gemini CLI, plus a generated root `skills/`
  directory for other Agent Skills clients.
- `scripts/sync.py` to distribute shared references, mirror skills and keep versions aligned,
  and `scripts/validate.py` for static checks, both run in CI.

[Unreleased]: https://github.com/feza-co/FezaPlugin/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/feza-co/FezaPlugin/releases/tag/v2.0.0
