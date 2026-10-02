# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.0] - 2026-10-02

### Removed

- **BREAKING:** The `feza-iso` package and its six skills (`iso12207-audit`, `iso29110-vse`,
  `iso25010-quality`, `iso15939-measure`, `iso29148-req`, `complaints-to-compliance`) are no
  longer shipped; the `/feza-iso:*` commands no longer exist.

### Added

- `brief-grill` skill in `feza-toolkit`: pins down a brief through a decision-tree interview. It
  asks one multiple-choice question at a time (never plain text) using the question tool, with
  2-4 concrete options plus a free-text escape, and keeps going until every branch of the tree is
  resolved (no total question limit). It discovers an existing `BRIEF.md`/`IDEA.md`/`docs/brief.md`
  or asks for the idea once, records each decision, treats "I don't know" as a labelled assumption
  and surfaces contradictions as a single question. Decisions and open assumptions are appended to
  the brief as a "Netleştirilmiş Kararlar" table and an "Açık Varsayımlar" list without rewriting
  the existing text. Adapted from the [grill-me-skill (Rob Mitt)](https://github.com/robmitt/grill-me-skill) approach.
  `feza-toolkit` now ships 6 skills (40 in total).

## [2.2.0] - 2026-10-02

### Added

- `scripts/verify-ui.mjs` now measures WCAG 2.2 criteria E14-E29 alongside the existing E1-E13 set
  and writes each result to `report.json` as `results.E<code>` with `{ ok, value, threshold,
  method }`, where `method` is `otomatik`, `karma` or `statik`. E14 focus not obscured, E15 target
  spacing, E16 text spacing, E17 accessible authentication, E18 dragging alternatives (detection
  only; the single-pointer alternative is confirmed by hand), E21 `forced-colors`, E22
  `prefers-contrast: more`, E23 transparent surfaces, E24 RTL, E25 text expansion and E28
  heading/landmark structure are measured automatically or as mixed checks. E24 and E26/E27 can also
  be scanned without a browser with `--static`, where a hit is a FAIL (the E24 static physical
  direction finding stays advisory). E12 (motion) was extended to catch `transform`-based
  animations and parallax under `reduce`. E19 redundant entry, E20 consistent help and E29 deceptive
  design are reported with `ok: null` and reviewed by hand.
- New `verify-ui.mjs` flags: `--profile wcag22aa|en301549` (axe rule tags, with a documented
  fallback when `EN-301-549` is unavailable), `--static <directory>` (browserless source scan for
  E23/E24/E26/E27), `--engines axe,ibm` (IBM Equal Access as an advisory-only second engine),
  `--visual <baseline-directory>` with `--visual-max-diff N`, and `--aria-baseline <file>` for the
  E28 accessibility-tree snapshot.
- `tests/hci/` fixture suite: a fail and pass page per E code, `bad.html`/`good.html` multi- and
  zero-violation pages, `expected.json` and `tests/hci/run.mjs`. A dedicated `hci-fixtures` CI job
  runs it with Playwright Chromium.
- Verified fix gate in the four evaluation skills: a fix is rejected and rolled back when it does
  not strictly reduce the violation count or when it introduces a new violation type, and the
  report gains a `Before | After | Decision` table.
- Evidence rubric (`shared/packages/feza-hci/evidence-rubric.md`) and deceptive design dictionary
  (`shared/packages/feza-hci/deceptive-patterns.md`), distributed to the evaluation skills by
  `PACKAGE_SHARED_SCOPE`.
- `hci-review --acr` writes an Accessibility Conformance Report (VPAT 2.5 INT/EU layout, WCAG 2.2
  A/AA); `hci-review/references/conformance-report.md` holds the template.
- `hci-review/scripts/measure-vitals.mjs` measures lab INP (good at or below 200 ms, critical above
  500 ms).
- `contrast.py --tokens` reads DTCG design tokens (color, dimension, duration, cubicBezier, shadow,
  typography) with alias resolution, and `--apca` adds an advisory APCA Lc column.
- `usability-eval-plan` adds SEQ, UMUX-Lite, the SUS percentile and adjective table, a HEART
  goal-signal-metric table and conditional NASA-TLX; `persona` adds a mandatory data-basis label,
  a proto-persona mode and a job-to-be-done statement; `cognitive-load` adds Hick-Hyman, Fitts and
  per-screen competing-item and colour counts.

### Changed

- `shared/quality-gate.md` and `verify-ui.mjs` use the E1-E29 scope; `scripts/validate.py` checks
  the thresholds file, the `THRESHOLDS` block and the quality-gate rows for E1-E29.
- `ux-writing.md` section 8 renames the deceptive-design table column to "E kodu / heuristik".

## [2.1.0] - 2026-10-01

### Added

- `hci-execute` renders the generated interface with `scripts/verify-ui.mjs` (Playwright and axe-core) at
  320, 390, 768 and 1280 px and checks accessibility violations, reflow, touch targets, keyboard focus,
  reduced motion with the dark theme and 200% text zoom; it writes screenshots and `report.json` to
  `.feza/ui-check/`. Node.js is optional; without it the skill falls back to a static check.
- `scripts/contrast.py` computes WCAG contrast ratios, including token pairs read from a CSS file for the
  light and dark themes.
- Measurable acceptance thresholds E1-E13 for HCI deliverables, used as blockers in the quality gate.
- Eleven screen recipes for `hci-execute` (auth, checkout, settings, search and filter, data dashboard,
  mobile navigation, onboarding, form, list/detail, empty state, error) in one eight-part template.
- UX writing guidelines with Turkish and English examples for buttons, errors, empty states, dialogs,
  toasts, loading text and permission requests.
- Fix mode for `heuristic-eval`, `color-audit`, `cognitive-load` and `hci-review`: with `--fix` they apply
  findings to UI files, verify them with `verify-ui` and add an applied-fixes table to the report.

### Changed

- Every `feza-pm` skill now requires an existing SRS (`SRS_*.md` in the project root or `docs/`,
  with purpose/scope, a requirements section and at least three identified functional
  requirements). Without one the skill stops and points to `/feza-requirements:srs-generate`;
  it no longer asks for a brief, offers an example scenario or reads README files, source code,
  manifests or git history. Outputs cite SRS requirement IDs and list the SRS as the first
  reference. The rule lives in `shared/packages/feza-pm/srs-gate.md`.
- `scripts/sync.py` copies files from `shared/packages/<package>/` into that package's skills only.
- `scripts/sync.py` mirrors skill scripts between skills (`CROSS_SKILL_SCRIPTS`) and can limit
  package-shared files to named skills (`PACKAGE_SHARED_SCOPE`); `scripts/validate.py` checks script
  references, scans `.mjs`/`.js` files for banned terms and checks threshold consistency.
- CI checks the syntax of skill scripts with `node --check` and `python -m py_compile`.

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

[Unreleased]: https://github.com/feza-co/FezaPlugin/compare/v2.3.0...HEAD
[2.3.0]: https://github.com/feza-co/FezaPlugin/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/feza-co/FezaPlugin/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/feza-co/FezaPlugin/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/feza-co/FezaPlugin/releases/tag/v2.0.0
