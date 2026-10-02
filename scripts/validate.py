#!/usr/bin/env python3
"""Static validation for the FezaPlugin monorepo.

Checks:
  1. Package map      every package and skill is where it is expected to be
  2. Frontmatter      SKILL.md name/description follow the Agent Skills specification
  3. References       every `references/<file>.md` mentioned by a skill exists in that skill
  4. Self-containment no skill points outside its own folder (../, shared/, other skills)
  5. Cross-links      every /feza-<package>:<skill> command refers to a real skill
  6. Manifests        JSON is valid; plugin and marketplace manifests are consistent
  7. Generated files  references copies, script copies and the root skills/ mirror match their sources
  8. Banned terms     legacy names and terms that must not appear anywhere in the repo
  9. Script refs      every `scripts/<file>.(mjs|js|py|sh)` a skill mentions exists in that skill
 10. Thresholds       thresholds.md, verify-ui.mjs THRESHOLDS and the E1-E29 tables stay in sync

Paths are resolved relative to the repository root (the parent of scripts/).
Only the Python standard library is used. Exit code 0 = no errors, 1 = errors.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PLUGINS_DIR = ROOT / "plugins"

PACKAGES: dict[str, list[str]] = {
    "feza-requirements": ["srs-generate", "srs-review", "req-elicit", "req-classify", "req-conflict-check", "user-story"],
    "feza-pm": ["scope-statement", "wbs", "estimate", "swot", "raci", "budget", "activity-sequence",
                "risk-register", "stakeholder-map", "comm-plan", "conflict-resolve", "competitor-analysis"],
    "feza-hci": ["hci-review", "heuristic-eval", "usability-eval-plan", "cognitive-load", "color-audit",
                 "design-thinking", "prototype-plan", "persona", "hci-execute"],
    "feza-sqa": ["sqa-plan", "test-plan", "metrics-plan", "inspection", "traceability-matrix", "change-control",
                 "defect-report"],
    "feza-toolkit": ["help", "lifecycle-pick", "full-package", "demo-script", "glossary", "brief-grill"],
}

NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
ALLOWED_FRONTMATTER = {"name", "description", "license", "compatibility", "metadata", "allowed-tools"}
MAX_SKILL_LINES = 500
RESERVED_MARKETPLACE_NAMES = {"claude-plugins-official", "agent-skills", "claude-code-marketplace",
                              "claude-code-plugins", "claude-plugins", "anthropic-marketplace", "anthropic-plugins"}

# Banned terms. Stored in fragments so a plain repository-wide grep for the terms
# does not match this file itself. Matching is case-insensitive and anchored at a
# word start, so ordinary words that merely contain the letters do not match.
_BANNED_FRAGMENTS = [
    ("ho", "ca"), ("sev", "gi"), ("SE", r"NG ?\d"), ("sla", "yt"), ("we", r"ek ?\d"),
    ("ders-", "quiz"), ("grade-", "rubric"), ("turkish-", "academic"), ("öğ", "renci"),
    ("harf ", "notu"),
]
BANNED_RE = re.compile("|".join(r"\b" + a + b for a, b in _BANNED_FRAGMENTS), re.IGNORECASE)

SKIP_DIRS = {".git", ".claude", ".code-review-graph", "node_modules", "__pycache__", ".venv", "venv", "dist", "build"}
TEXT_SUFFIXES = {".md", ".json", ".py", ".mjs", ".js", ".cjs", ".yml", ".yaml", ".txt", ".toml", ".cfg", ".ini", ""}

REF_RE = re.compile(r"references/([A-Za-z0-9._-]+\.md)")
CROSSLINK_RE = re.compile(r"/(feza-[a-z]+):([a-z0-9-]+)")
GENERATED_PREFIX = "<!-- generated from "

# A `scripts/<file>` reference counts only when nothing alphanumeric, '/', '.' or
# '_' precedes it, so project paths like `styles/x.js` or `src/scripts/app.js` are
# ignored. `app.js` comes from the default project layout shown in a SKILL.md and
# belongs to the user's project, not to the skill.
SCRIPT_REF_RE = re.compile(r"(?<![A-Za-z0-9_./])scripts/([A-Za-z0-9._-]+\.(?:mjs|js|py|sh))")
SCRIPT_REF_ALLOWLIST = {"app.js"}

THRESHOLDS_MD = ROOT / "shared" / "packages" / "feza-hci" / "thresholds.md"
VERIFY_UI_MJS = ROOT / "plugins" / "feza-hci" / "skills" / "hci-execute" / "scripts" / "verify-ui.mjs"
QUALITY_GATE_MD = ROOT / "shared" / "quality-gate.md"
THRESHOLDS_BLOCK_RE = re.compile(r"// THRESHOLDS-BEGIN\s*const THRESHOLDS = (\{.*?\});\s*// THRESHOLDS-END", re.DOTALL)
E_ROW_RE = re.compile(r"^\|\s*E(\d+)\s*\|")


class Report:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []
        self.checks: dict[str, int] = {}

    def error(self, check: str, msg: str) -> None:
        self.errors.append(f"[{check}] {msg}")

    def warn(self, check: str, msg: str) -> None:
        self.warnings.append(f"[{check}] {msg}")

    def count(self, check: str, n: int = 1) -> None:
        self.checks[check] = self.checks.get(check, 0) + n


def rel(p: Path) -> str:
    return p.relative_to(ROOT).as_posix()


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8").replace("\r\n", "\n")


def repo_text_files() -> list[Path]:
    out = []
    for p in ROOT.rglob("*"):
        if not p.is_file() or any(part in SKIP_DIRS for part in p.relative_to(ROOT).parts):
            continue
        if p.suffix.lower() in TEXT_SUFFIXES or p.name in {"LICENSE", "VERSION", "CODEOWNERS"}:
            out.append(p)
    return sorted(out)


def parse_frontmatter(text: str) -> tuple[dict | None, str]:
    if not text.startswith("---\n"):
        return None, "file does not start with '---' frontmatter"
    end = text.find("\n---", 4)
    if end == -1:
        return None, "frontmatter is not closed with '---'"
    data: dict = {}
    key = None
    mode = None
    buf: list[str] = []

    def flush() -> None:
        if key is None:
            return
        if mode == ">":
            data[key] = " ".join(line for line in buf if line).strip()
        elif mode == "|":
            data[key] = "\n".join(buf).strip()
        elif mode == "map":
            data[key] = dict(buf_map)

    buf_map: dict[str, str] = {}
    for line in text[4:end].split("\n"):
        top = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if top:
            flush()
            key, value = top.group(1), top.group(2).strip()
            buf, buf_map = [], {}
            if value[:1] in (">", "|"):
                mode = value[0]
            elif value == "":
                mode = "map"
            else:
                mode = None
                data[key] = value.strip("'\"")
                key = None
        elif key is not None and mode in (">", "|"):
            buf.append(line.strip())
        elif key is not None and mode == "map":
            sub = re.match(r"^\s+([A-Za-z0-9_.-]+):\s*(.*)$", line)
            if sub:
                buf_map[sub.group(1)] = sub.group(2).strip("'\"")
    flush()
    return data, ""


def skill_dirs() -> dict[str, tuple[str, Path]]:
    found: dict[str, tuple[str, Path]] = {}
    for skill_md in sorted(PLUGINS_DIR.glob("*/skills/*/SKILL.md")):
        found[skill_md.parent.name] = (skill_md.parent.parent.parent.name, skill_md.parent)
    return found


def check_package_map(r: Report, skills: dict[str, tuple[str, Path]]) -> None:
    actual_pkgs = {p.name for p in PLUGINS_DIR.iterdir() if p.is_dir()} if PLUGINS_DIR.is_dir() else set()
    for pkg in sorted(actual_pkgs - PACKAGES.keys()):
        r.error("package-map", f"unexpected package directory plugins/{pkg}")
    for pkg, names in PACKAGES.items():
        if pkg not in actual_pkgs:
            r.error("package-map", f"missing package directory plugins/{pkg}")
            continue
        for d in sorted((PLUGINS_DIR / pkg / "skills").iterdir()):
            if d.is_dir() and d.name not in names:
                r.error("package-map", f"skill {d.name} is not listed for {pkg}")
        for name in names:
            r.count("package-map")
            if name not in skills:
                r.error("package-map", f"missing skill {pkg}/{name} (no SKILL.md)")
            elif skills[name][0] != pkg:
                r.error("package-map", f"skill {name} is in {skills[name][0]}, expected {pkg}")


def check_frontmatter(r: Report, skills: dict[str, tuple[str, Path]]) -> None:
    for name, (_pkg, d) in sorted(skills.items()):
        r.count("frontmatter")
        path = d / "SKILL.md"
        text = read(path)
        data, err = parse_frontmatter(text)
        if data is None:
            r.error("frontmatter", f"{rel(path)}: {err}")
            continue
        fm_name = data.get("name", "")
        if fm_name != name:
            r.error("frontmatter", f"{rel(path)}: name '{fm_name}' does not match folder '{name}'")
        if not NAME_RE.match(fm_name or "") or len(fm_name) > 64:
            r.error("frontmatter", f"{rel(path)}: name '{fm_name}' must match {NAME_RE.pattern} and be <= 64 chars")
        desc = data.get("description", "")
        if not isinstance(desc, str) or not 1 <= len(desc) <= 1024:
            r.error("frontmatter", f"{rel(path)}: description length {len(desc) if isinstance(desc, str) else 'n/a'} not in 1..1024")
        comp = data.get("compatibility")
        if isinstance(comp, str) and len(comp) > 500:
            r.error("frontmatter", f"{rel(path)}: compatibility longer than 500 chars")
        for k in sorted(set(data) - ALLOWED_FRONTMATTER):
            r.warn("frontmatter", f"{rel(path)}: non-standard frontmatter key '{k}'")
        lines = text.count("\n") + 1
        if lines > MAX_SKILL_LINES:
            r.warn("frontmatter", f"{rel(path)}: {lines} lines (recommended < {MAX_SKILL_LINES})")


def skill_text_lines(d: Path):
    for f in [d / "SKILL.md", *sorted((d / "references").glob("*.md"))]:
        if not f.is_file():
            continue
        for i, line in enumerate(read(f).split("\n"), 1):
            if line.startswith(GENERATED_PREFIX):
                continue
            yield f, i, line


def check_references(r: Report, skills: dict[str, tuple[str, Path]]) -> None:
    other_skill_re = re.compile(r"\b(" + "|".join(map(re.escape, sorted(skills, key=len, reverse=True))) + r")/(references|SKILL\.md)")
    for name, (_pkg, d) in sorted(skills.items()):
        for f, i, line in skill_text_lines(d):
            for m in REF_RE.finditer(line):
                r.count("references")
                if not (d / "references" / m.group(1)).is_file():
                    r.error("references", f"{rel(f)}:{i}: references/{m.group(1)} does not exist in skill '{name}'")
            if "../" in line or "..\\" in line:
                r.error("self-contained", f"{rel(f)}:{i}: relative path leaves the skill folder")
            if re.search(r"\bshared/[A-Za-z0-9._-]+", line):
                r.error("self-contained", f"{rel(f)}:{i}: points to shared/ (use references/ copies)")
            m2 = other_skill_re.search(line)
            if m2:
                r.error("self-contained", f"{rel(f)}:{i}: points into another skill folder '{m2.group(0)}'")
        r.count("self-contained")


def check_script_refs(r: Report, skills: dict[str, tuple[str, Path]]) -> None:
    """Every scripts/<file> a skill mentions must exist inside that skill."""
    for name, (_pkg, d) in sorted(skills.items()):
        for f, i, line in skill_text_lines(d):
            for m in SCRIPT_REF_RE.finditer(line):
                fname = m.group(1)
                r.count("script-refs")
                if fname in SCRIPT_REF_ALLOWLIST:
                    continue
                if not (d / "scripts" / fname).is_file():
                    r.error("script-refs", f"{rel(f)}:{i}: scripts/{fname} does not exist in skill '{name}'")


def _first_json_block(text: str) -> str | None:
    start = text.find("```json\n")
    if start == -1:
        return None
    start += len("```json\n")
    end = text.find("\n```", start)
    if end == -1:
        return None
    return text[start:end]


def _e_rows(text: str) -> dict[str, str]:
    rows: dict[str, str] = {}
    for line in text.split("\n"):
        if E_ROW_RE.match(line):
            norm = " ".join(line.split())
            rows[f"E{E_ROW_RE.match(line).group(1)}"] = norm
    return rows


def check_thresholds(r: Report) -> None:
    """thresholds.md, verify-ui.mjs THRESHOLDS and the E1-E29 tables must agree."""
    missing = [path for path in (THRESHOLDS_MD, VERIFY_UI_MJS, QUALITY_GATE_MD) if not path.is_file()]
    for path in missing:
        r.error("thresholds", f"{rel(path)} missing")
    if missing:
        return

    md_block = _first_json_block(read(THRESHOLDS_MD))
    if md_block is None:
        r.error("thresholds", f"{rel(THRESHOLDS_MD)}: no ```json block found")
        md_obj = None
    else:
        try:
            md_obj = json.loads(md_block)
        except json.JSONDecodeError as exc:
            r.error("thresholds", f"{rel(THRESHOLDS_MD)}: json block invalid ({exc})")
            md_obj = None

    m = THRESHOLDS_BLOCK_RE.search(read(VERIFY_UI_MJS))
    if m is None:
        r.error("thresholds", f"{rel(VERIFY_UI_MJS)}: THRESHOLDS-BEGIN/END block not found")
        mjs_obj = None
    else:
        try:
            mjs_obj = json.loads(m.group(1))
        except json.JSONDecodeError as exc:
            r.error("thresholds", f"{rel(VERIFY_UI_MJS)}: THRESHOLDS body invalid ({exc})")
            mjs_obj = None

    if isinstance(md_obj, dict) and isinstance(mjs_obj, dict):
        r.count("thresholds")
        for key in sorted(set(md_obj) | set(mjs_obj)):
            if key not in md_obj:
                r.error("thresholds", f"threshold '{key}' present in verify-ui.mjs but not in thresholds.md")
            elif key not in mjs_obj:
                r.error("thresholds", f"threshold '{key}' present in thresholds.md but not in verify-ui.mjs")
            elif md_obj[key] != mjs_obj[key]:
                r.error("thresholds", f"threshold '{key}' differs: thresholds.md={md_obj[key]!r} verify-ui.mjs={mjs_obj[key]!r}")

    md_rows = _e_rows(read(THRESHOLDS_MD))
    qg_rows = _e_rows(read(QUALITY_GATE_MD))
    if md_rows and qg_rows:
        r.count("thresholds")
        for code in sorted(set(md_rows) | set(qg_rows), key=lambda c: int(c[1:])):
            if code not in md_rows:
                r.error("thresholds", f"{code} row present in quality-gate.md but not in thresholds.md")
            elif code not in qg_rows:
                r.error("thresholds", f"{code} row present in thresholds.md but not in quality-gate.md")
            elif md_rows[code] != qg_rows[code]:
                r.error("thresholds", f"{code} row differs between thresholds.md and quality-gate.md")


def check_crosslinks(r: Report, files: list[Path]) -> None:
    for f in files:
        if f.suffix != ".md":
            continue
        for i, line in enumerate(read(f).split("\n"), 1):
            for m in CROSSLINK_RE.finditer(line):
                r.count("cross-links")
                pkg, skill = m.group(1), m.group(2)
                if pkg not in PACKAGES:
                    r.error("cross-links", f"{rel(f)}:{i}: unknown package in {m.group(0)}")
                elif skill not in PACKAGES[pkg]:
                    owner = next((p for p, s in PACKAGES.items() if skill in s), None)
                    hint = f" (skill lives in {owner})" if owner else ""
                    r.error("cross-links", f"{rel(f)}:{i}: {m.group(0)} does not exist{hint}")


def load_json(r: Report, path: Path) -> dict | None:
    try:
        data = json.loads(read(path))
    except (OSError, json.JSONDecodeError) as exc:
        r.error("manifests", f"{rel(path)}: invalid JSON ({exc})")
        return None
    if not isinstance(data, dict):
        r.error("manifests", f"{rel(path)}: top level must be an object")
        return None
    return data


def check_manifests(r: Report, files: list[Path]) -> None:
    version = read(ROOT / "VERSION").strip() if (ROOT / "VERSION").is_file() else None
    if not version or not re.match(r"^\d+\.\d+\.\d+$", version):
        r.error("manifests", "VERSION file missing or not semver")
    for f in files:
        if f.suffix == ".json":
            r.count("json")
            load_json(r, f)

    for pkg in PACKAGES:
        for d in (".claude-plugin", ".codex-plugin", ".cursor-plugin"):
            path = PLUGINS_DIR / pkg / d / "plugin.json"
            r.count("manifests")
            if not path.is_file():
                r.error("manifests", f"missing {rel(path)}")
                continue
            data = load_json(r, path)
            if data is None:
                continue
            if data.get("name") != pkg:
                r.error("manifests", f"{rel(path)}: name must be '{pkg}'")
            if data.get("version") != version:
                r.error("manifests", f"{rel(path)}: version {data.get('version')} != VERSION {version}")
            for field in ("description", "homepage", "repository"):
                if not data.get(field):
                    r.error("manifests", f"{rel(path)}: missing '{field}'")
            if data.get("license") != "MIT":
                r.error("manifests", f"{rel(path)}: license must be 'MIT'")
            if not isinstance(data.get("author"), dict) or not data["author"].get("name"):
                r.error("manifests", f"{rel(path)}: author.name required")
            if not isinstance(data.get("keywords"), list) or not data["keywords"]:
                r.error("manifests", f"{rel(path)}: keywords must be a non-empty list")
            if d != ".claude-plugin" and data.get("skills") != "./skills/":
                r.error("manifests", f"{rel(path)}: skills must be './skills/'")

    # Claude Code marketplace
    path = ROOT / ".claude-plugin" / "marketplace.json"
    data = load_json(r, path) if path.is_file() else None
    if data is None:
        r.error("manifests", "missing or invalid .claude-plugin/marketplace.json")
    else:
        r.count("manifests")
        if not data.get("name") or data["name"] in RESERVED_MARKETPLACE_NAMES or data["name"].startswith("anthropic"):
            r.error("manifests", f"{rel(path)}: missing or reserved marketplace name")
        if not (data.get("owner") or {}).get("name"):
            r.error("manifests", f"{rel(path)}: owner.name required")
        names = []
        for e in data.get("plugins", []):
            names.append(e.get("name"))
            src = e.get("source", "")
            if not isinstance(src, str) or not src.startswith("./") or ".." in src:
                r.error("manifests", f"{rel(path)}: plugin '{e.get('name')}' source must be a ./ relative path")
            elif not (ROOT / src).is_dir():
                r.error("manifests", f"{rel(path)}: plugin source {src} does not exist")
            if "version" in e:
                r.error("manifests", f"{rel(path)}: do not set version on marketplace entry '{e.get('name')}'")
        if sorted(names) != sorted(PACKAGES):
            r.error("manifests", f"{rel(path)}: plugins {sorted(names)} != packages {sorted(PACKAGES)}")

    # Codex marketplace
    path = ROOT / ".agents" / "plugins" / "marketplace.json"
    data = load_json(r, path) if path.is_file() else None
    if data is None:
        r.error("manifests", "missing or invalid .agents/plugins/marketplace.json")
    else:
        r.count("manifests")
        names = []
        for e in data.get("plugins", []):
            names.append(e.get("name"))
            src = (e.get("source") or {}).get("path", "")
            if not src.startswith("./") or not (ROOT / src).is_dir():
                r.error("manifests", f"{rel(path)}: plugin '{e.get('name')}' source.path invalid")
        if sorted(names) != sorted(PACKAGES):
            r.error("manifests", f"{rel(path)}: plugins {sorted(names)} != packages {sorted(PACKAGES)}")

    # Cursor marketplace
    path = ROOT / ".cursor-plugin" / "marketplace.json"
    data = load_json(r, path) if path.is_file() else None
    if data is None:
        r.error("manifests", "missing or invalid .cursor-plugin/marketplace.json")
    else:
        r.count("manifests")
        root = (data.get("metadata") or {}).get("pluginRoot", "")
        names = []
        for e in data.get("plugins", []):
            names.append(e.get("name"))
            if not (ROOT / root / e.get("source", "")).is_dir():
                r.error("manifests", f"{rel(path)}: plugin '{e.get('name')}' source not found under '{root}'")
        if sorted(names) != sorted(PACKAGES):
            r.error("manifests", f"{rel(path)}: plugins {sorted(names)} != packages {sorted(PACKAGES)}")

    # Gemini CLI extension
    path = ROOT / "gemini-extension.json"
    data = load_json(r, path) if path.is_file() else None
    if data is None:
        r.error("manifests", "missing or invalid gemini-extension.json")
    else:
        r.count("manifests")
        if not data.get("name"):
            r.error("manifests", f"{rel(path)}: name required")
        if data.get("version") != version:
            r.error("manifests", f"{rel(path)}: version {data.get('version')} != VERSION {version}")


def check_mirror(r: Report, skills: dict[str, tuple[str, Path]]) -> None:
    """Existence and content check of generated files, reusing sync.py's expected state."""
    for name in sorted(skills):
        if not (ROOT / "skills" / name / "SKILL.md").is_file():
            r.error("mirror", f"skills/{name}/SKILL.md missing (run python scripts/sync.py)")
    sys.dont_write_bytecode = True
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    try:
        import sync  # noqa: PLC0415 - sibling script, imported for its expected-state functions
    except Exception as exc:  # pragma: no cover - defensive
        r.error("mirror", f"cannot import scripts/sync.py ({exc})")
        return
    sdirs = sync.skill_dirs()
    plugin_files = sync.expected_plugin_files(sdirs)
    stale = sync.stale_generated_files(sdirs, plugin_files)
    mirror = sync.root_skill_tree(sdirs, plugin_files, stale)
    expected: dict[Path, bytes] = {p: t.encode("utf-8") for p, t in plugin_files.items()}
    expected.update(mirror)
    for path, data in sorted(expected.items()):
        r.count("mirror")
        current = path.read_bytes().replace(b"\r\n", b"\n") if path.is_file() else None
        if current is None:
            r.error("mirror", f"{rel(path)} missing (run python scripts/sync.py)")
        elif current != data:
            r.error("mirror", f"{rel(path)} differs from its source (run python scripts/sync.py)")
    for path in stale:
        r.error("mirror", f"{rel(path)} is a stale generated file (run python scripts/sync.py)")
    skills_root = ROOT / "skills"
    if skills_root.is_dir():
        for path in sorted(p for p in skills_root.rglob("*") if p.is_file()):
            if sync.is_ignored(path):
                continue
            if path not in mirror:
                r.error("mirror", f"{rel(path)} has no source under plugins/ (run python scripts/sync.py)")


def check_banned(r: Report, files: list[Path]) -> None:
    for f in files:
        r.count("banned-terms")
        try:
            text = read(f)
        except UnicodeDecodeError:
            continue
        for i, line in enumerate(text.split("\n"), 1):
            for m in BANNED_RE.finditer(line):
                r.error("banned-terms", f"{rel(f)}:{i}: '{m.group(0)}'")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--strict", action="store_true", help="treat warnings as errors")
    args = parser.parse_args()

    r = Report()
    skills = skill_dirs()
    files = repo_text_files()
    check_package_map(r, skills)
    check_frontmatter(r, skills)
    check_references(r, skills)
    check_script_refs(r, skills)
    check_crosslinks(r, files)
    check_manifests(r, files)
    check_mirror(r, skills)
    check_thresholds(r)
    check_banned(r, files)

    print(f"validate: {len(skills)} skills in {len(PACKAGES)} packages, {len(files)} text files scanned")
    for check, n in r.checks.items():
        print(f"  {check:<15} {n} item(s) checked")
    for w in r.warnings:
        print("WARNING " + w)
    for e in r.errors:
        print("ERROR   " + e)
    failed = bool(r.errors) or (args.strict and bool(r.warnings))
    print(f"validate: {len(r.errors)} error(s), {len(r.warnings)} warning(s) -> {'FAIL' if failed else 'OK'}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
