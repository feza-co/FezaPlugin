#!/usr/bin/env node
/**
 * verify-ui.mjs — gerçek tarayıcıda render + otomatik erişilebilirlik doğrulaması.
 *
 * Kullanım:
 *     node scripts/verify-ui.mjs <URL | yerel.html> [--out DIR] [--json]
 *
 *   <URL>         http(s) adresi olduğu gibi kullanılır.
 *   yerel dosya   Dosyanın klasörü rastgele boş bir portta servis edilir; iş
 *                 bitince sunucu kapatılır.
 *   --out DIR     Çıktı klasörü. Varsayılan: <cwd>/.feza/ui-check/<YYYYMMDD-HHMMSS>/
 *   --json        stdout'a yalnızca report.json içeriği yazılır.
 *
 * Ne yapar:
 *   - 320/390/768/1280 px genişlikte tam sayfa ekran görüntüsü
 *   - axe-core taraması (wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa)
 *   - yatay kaydırma ve dokunma hedefi boyutu denetimi
 *   - klavye odak sırası, görünür odak ve odak tuzağı testi
 *   - reduced-motion + koyu tema geçişi ve hareket denetimi
 *   - %200 metin büyütmede reflow/kırpılma denetimi
 *
 * Çıkış kodları: 0 tümü OK | 1 en az bir FAIL | 2 araç yok ya da girdi hatası.
 *
 * Bağımlılıklar: playwright, @axe-core/playwright. Repoya node_modules konmaz;
 * gerekirse ~/.cache/feza-ui-check (Windows: %LOCALAPPDATA%\feza-ui-check)
 * dizinine kurulur. FEZA_UI_CHECK_NO_INSTALL=1 ise kurulum denenmez.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

// THRESHOLDS-BEGIN
const THRESHOLDS = {
  "E1_axe_serious_critical_max": 0,
  "E2_text_contrast_min": 4.5,
  "E2_large_text_contrast_min": 3.0,
  "E3_ui_contrast_min": 3.0,
  "E4_primary_target_min_px": 44,
  "E4_any_target_min_px": 24,
  "E5_reflow_width_px": 320,
  "E6_visible_focus": true,
  "E7_focus_order": true,
  "E12_max_animation_s": 0.01,
  "E12_max_transition_s": 0.3,
  "E13_zoom_percent": 200
};
// THRESHOLDS-END

const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const VIEWPORTS = [320, 390, 768, 1280];
const INTERACTIVE_SELECTOR =
  'a[href], button, input:not([type=hidden]), select, textarea, summary, ' +
  '[role=button], [role=link], [tabindex]:not([tabindex="-1"])';
const PRIMARY_SELECTOR =
  '[data-primary], .btn-primary, .button--primary, [class*="primary"]';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

// --------------------------------------------------------------------------- #
// Hata tipleri / yardımcılar
// --------------------------------------------------------------------------- #

class ToolMissingError extends Error {}
class InputError extends Error {}

function fatal(code, message) {
  process.stderr.write(message.endsWith('\n') ? message : message + '\n');
  process.exit(code);
}

function missingToolMessage(detail) {
  return [
    'Otomatik render doğrulaması yapılamadı: Playwright kurulamadı ya da bulunamadı.',
    'Automated render check unavailable: Playwright could not be installed or found.',
    detail ? 'Ayrıntı / detail: ' + detail : '',
  ]
    .filter(Boolean)
    .join('\n');
}

function pickAxe(mod) {
  if (mod && typeof mod.AxeBuilder === 'function') return mod.AxeBuilder;
  if (mod && mod.default && typeof mod.default.AxeBuilder === 'function') {
    return mod.default.AxeBuilder;
  }
  if (mod && typeof mod.default === 'function') return mod.default;
  throw new ToolMissingError('@axe-core/playwright içinde AxeBuilder bulunamadı.');
}

function cacheDir() {
  if (process.platform === 'win32') {
    const base =
      process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
    return path.join(base, 'feza-ui-check');
  }
  return path.join(os.homedir(), '.cache', 'feza-ui-check');
}

function npmBin() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function npxBin() {
  return process.platform === 'win32' ? 'npx.cmd' : 'npx';
}

// Windows'ta .cmd sarmalayıcıları cmd.exe üzerinden çalıştırılır (shell:true
// kullanmadan, DEP0190 uyarısını önlemek için).
function runBin(bin, args, opts) {
  if (process.platform === 'win32') {
    const comspec = process.env.ComSpec || 'cmd.exe';
    return execFileSync(comspec, ['/d', '/s', '/c', bin, ...args], {
      ...opts,
      shell: false,
    });
  }
  return execFileSync(bin, args, { ...opts, shell: false });
}

// --------------------------------------------------------------------------- #
// Bağımlılık yükleme
// --------------------------------------------------------------------------- #

function tryResolveFromCache() {
  const dir = cacheDir();
  const pkgJson = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgJson)) return null;
  try {
    const require = createRequire(pkgJson);
    const pwEntry = require.resolve('playwright');
    const axeEntry = require.resolve('@axe-core/playwright');
    return { pwEntry, axeEntry, pkgJson, dir };
  } catch {
    return null;
  }
}

async function loadDeps() {
  // 1) Doğrudan çözülmeyi dene.
  try {
    const pw = await import('playwright');
    const axeMod = await import('@axe-core/playwright');
    return { playwright: pw, AxeBuilder: pickAxe(axeMod) };
  } catch {
    /* önbellek yoluna geç */
  }

  const noInstall = process.env.FEZA_UI_CHECK_NO_INSTALL === '1';

  // 2) Önbellekte zaten kuruluysa oradan çöz (kurulum denemesi sayılmaz).
  const cached = tryResolveFromCache();
  if (cached) {
    const pw = await import(pathToFileURL(cached.pwEntry).href);
    const axeMod = await import(pathToFileURL(cached.axeEntry).href);
    return { playwright: pw, AxeBuilder: pickAxe(axeMod) };
  }

  if (noInstall) {
    throw new ToolMissingError(
      'FEZA_UI_CHECK_NO_INSTALL=1; bağımlılıklar ne doğrudan ne önbellekten çözülebildi.'
    );
  }

  const dir = cacheDir();
  fs.mkdirSync(dir, { recursive: true });
  const pkgJson = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgJson)) {
    fs.writeFileSync(
      pkgJson,
      JSON.stringify({ name: 'feza-ui-check-deps', private: true }, null, 2)
    );
  }

  try {
    runBin(
      npmBin(),
      [
        'install',
        '--prefix',
        dir,
        '--no-save',
        '--silent',
        'playwright',
        '@axe-core/playwright',
      ],
      { cwd: dir, stdio: 'inherit', timeout: 590000 }
    );
  } catch (err) {
    throw new ToolMissingError('npm install başarısız: ' + (err.message || err));
  }

  const require = createRequire(pkgJson);
  let pw;
  let axeMod;
  try {
    const pwEntry = require.resolve('playwright');
    const axeEntry = require.resolve('@axe-core/playwright');
    pw = await import(pathToFileURL(pwEntry).href);
    axeMod = await import(pathToFileURL(axeEntry).href);
  } catch (err) {
    throw new ToolMissingError('paketler çözülemedi: ' + (err.message || err));
  }
  return { playwright: pw, AxeBuilder: pickAxe(axeMod) };
}

async function launchChromium(playwrightMod) {
  const pw = playwrightMod.default || playwrightMod;
  const chromium = pw.chromium || playwrightMod.chromium;
  if (!chromium) {
    throw new ToolMissingError('playwright.chromium bulunamadı (CJS/ESM uyumsuzluğu).');
  }
  try {
    return await chromium.launch({ headless: true });
  } catch (firstErr) {
    if (process.env.FEZA_UI_CHECK_NO_INSTALL === '1') {
      throw new ToolMissingError('Chromium yok: ' + (firstErr.message || firstErr));
    }
    const dir = cacheDir();
    try {
      runBin(npxBin(), ['playwright', 'install', 'chromium'], {
        cwd: dir,
        stdio: 'inherit',
        timeout: 590000,
      });
    } catch (err) {
      throw new ToolMissingError(
        'chromium kurulumu başarısız: ' + (err.message || err)
      );
    }
    return await chromium.launch({ headless: true });
  }
}

// --------------------------------------------------------------------------- #
// Statik sunucu (yerel dosya girdisi için)
// --------------------------------------------------------------------------- #

function startStaticServer(rootDir) {
  const root = path.resolve(rootDir);
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let rel = decodeURIComponent(url.pathname);
      if (rel === '/' || rel === '') rel = '/index.html';
      const filePath = path.join(root, rel);
      if (!filePath.startsWith(root)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      fs.createReadStream(filePath).pipe(res);
    } catch (err) {
      res.writeHead(500);
      res.end('Server error');
    }
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({
        server,
        origin: 'http://127.0.0.1:' + port,
        close: () =>
          new Promise((done) => {
            server.close(() => done());
          }),
      });
    });
  });
}

// --------------------------------------------------------------------------- #
// Çıktı klasörü / zaman damgası
// --------------------------------------------------------------------------- #

function timestamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return (
    d.getFullYear() +
    p(d.getMonth() + 1) +
    p(d.getDate()) +
    '-' +
    p(d.getHours()) +
    p(d.getMinutes()) +
    p(d.getSeconds())
  );
}

function makeOutDir(argOut) {
  const dir =
    argOut ||
    path.join(process.cwd(), '.feza', 'ui-check', timestamp());
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function parseArgs(argv) {
  const args = { target: null, out: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') {
      args.out = argv[++i];
    } else if (a.startsWith('--out=')) {
      args.out = a.slice('--out='.length);
    } else if (a === '--json') {
      args.json = true;
    } else if (a === '--help' || a === '-h') {
      process.stdout.write(
        'Kullanım: node scripts/verify-ui.mjs <URL | yerel.html> [--out DIR] [--json]\n'
      );
      process.exit(0);
    } else if (!args.target) {
      args.target = a;
    } else {
      throw new InputError('Beklenmeyen argüman: ' + a);
    }
  }
  if (!args.target) {
    throw new InputError(
      'Hedef gerekli: node scripts/verify-ui.mjs <URL | yerel.html> [--out DIR]'
    );
  }
  return args;
}

// --------------------------------------------------------------------------- #
// Sayfa içi: dokunma hedefleri
// --------------------------------------------------------------------------- #

// page.evaluate içine gömülen; kendi kendine yeterli olmalı (dış değişken yok).
function collectTargetsInPage({ selector: interactiveSelector, primary: primarySelector }) {
  const isInlineLink = (el) => {
    if (el.tagName.toLowerCase() !== 'a') return false;
    let node = el;
    while (node && node !== document.body) {
      const disp = getComputedStyle(node).display;
      if (disp && disp !== 'contents') {
        return disp.startsWith('inline') && disp !== 'inline-block';
      }
      node = node.parentElement;
    }
    return false;
  };

  const describe = (el) => {
    let sel = el.tagName.toLowerCase();
    if (el.id) sel += '#' + el.id;
    const cls =
      typeof el.className === 'string' && el.className.trim()
        ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
        : '';
    sel += cls;
    return sel;
  };

  const results = [];
  const seen = new Set();
  const all = Array.from(document.querySelectorAll(interactiveSelector));
  for (const el of all) {
    if (seen.has(el)) continue;
    seen.add(el);
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const visible =
      rect.width > 0 &&
      rect.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none' &&
      Number(style.opacity) > 0;
    if (!visible) continue;

    const primary =
      el.matches(primarySelector) ||
      (el.tagName.toLowerCase() === 'button' &&
        el.getAttribute('type') === 'submit') ||
      (el.tagName.toLowerCase() === 'input' &&
        el.getAttribute('type') === 'submit');
    const inline = isInlineLink(el);
    results.push({
      selector: describe(el),
      w: Math.round(rect.width * 100) / 100,
      h: Math.round(rect.height * 100) / 100,
      primary,
      inline,
    });
  }
  return results;
}

async function collectTargets(page, selector, primary) {
  return await page.evaluate(collectTargetsInPage, {
    selector,
    primary,
  });
}

// --------------------------------------------------------------------------- #
// Sayfa içi: klavye / odak
// --------------------------------------------------------------------------- #

function focusSnapshotInPage() {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) {
    return { tag: el ? el.tagName.toLowerCase() : 'none', focused: false };
  }
  const style = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const hasOutline =
    style.outlineStyle !== 'none' && parseFloat(style.outlineWidth || '0') > 0;
  const hasShadow = style.boxShadow && style.boxShadow !== 'none';
  const tabindexAttr = el.getAttribute('tabindex');
  let descriptor = el.tagName.toLowerCase();
  if (el.id) descriptor += '#' + el.id;
  if (typeof el.className === 'string' && el.className.trim()) {
    descriptor += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
  }
  return {
    tag: el.tagName.toLowerCase(),
    descriptor,
    focused: true,
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    outlineStyle: style.outlineStyle,
    outlineWidth: style.outlineWidth,
    boxShadow: hasShadow ? style.boxShadow : 'none',
    hasVisibleFocus: hasOutline || hasShadow,
    tabindex: tabindexAttr === null ? null : Number(tabindexAttr),
  };
}

function tagFocusablesInPage(selector) {
  const els = Array.from(document.querySelectorAll(selector)).filter((el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return (
      r.width > 0 &&
      r.height > 0 &&
      s.visibility !== 'hidden' &&
      s.display !== 'none' &&
      el.tabIndex >= 0 &&
      !el.disabled
    );
  });
  const resting = [];
  els.forEach((el, i) => {
    el.setAttribute('data-focus-id', String(i));
    const s = getComputedStyle(el);
    resting.push({
      id: i,
      outlineStyle: s.outlineStyle,
      outlineWidth: s.outlineWidth,
      boxShadow: s.boxShadow,
    });
  });
  document.body.setAttribute('data-focus-total', String(els.length));
  return { total: els.length, resting };
}

// --------------------------------------------------------------------------- #
// Sayfa içi: hareket (animation/transition)
// --------------------------------------------------------------------------- #

function collectMotionInPage() {
  const maxAnimation = { value: 0, selector: null, name: null };
  const maxTransition = { value: 0, selector: null, property: null };
  const all = document.querySelectorAll('*');
  for (const el of all) {
    const s = getComputedStyle(el);
    const aName = s.animationName;
    const aDur = s.animationDuration || '0s';
    const tDur = s.transitionDuration || '0s';
    let sel = el.tagName.toLowerCase();
    if (el.id) sel += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
    }

    if (aName && aName !== 'none') {
      for (const part of aDur.split(',')) {
        const v = parseFloat(part.trim());
        if (!Number.isNaN(v) && v > maxAnimation.value) {
          maxAnimation.value = v;
          maxAnimation.selector = sel;
          maxAnimation.name = aName;
        }
      }
    }
    if (tDur && tDur !== 'none') {
      const props = (s.transitionProperty || '').split(',').map((x) => x.trim());
      const parts = tDur.split(',');
      parts.forEach((part, i) => {
        const v = parseFloat(part.trim());
        if (!Number.isNaN(v) && v > maxTransition.value) {
          maxTransition.value = v;
          maxTransition.selector = sel;
          maxTransition.property = props[i] || s.transitionProperty || '*';
        }
      });
    }
  }
  return { maxAnimation, maxTransition };
}

// --------------------------------------------------------------------------- #
// Sayfa içi: reflow / metin kırpılma
// --------------------------------------------------------------------------- #

function reflowInPage() {
  const de = document.documentElement;
  const horizontalScroll = de.scrollWidth > de.clientWidth;

  const clipped = [];
  const candidates = document.querySelectorAll('body *');
  for (const el of candidates) {
    const s = getComputedStyle(el);
    if (s.overflow === 'hidden' || s.overflowY === 'hidden') {
      if (
        el.scrollHeight > el.clientHeight + 2 &&
        el.clientHeight > 0 &&
        el.textContent &&
        el.textContent.trim().length > 0
      ) {
        // Yalnızca yatay taşma yerine dikey kırpılmayı da yakala.
        let sel = el.tagName.toLowerCase();
        if (el.id) sel += '#' + el.id;
        if (typeof el.className === 'string' && el.className.trim()) {
          sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
        }
        clipped.push({
          selector: sel,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
        });
      }
    }
  }
  return { horizontalScroll, clipped };
}

// --------------------------------------------------------------------------- #
// axe-core çalıştırma ve E kodu eşlemesi
// --------------------------------------------------------------------------- #

function mapAxeToE(ruleId) {
  if (ruleId === 'color-contrast') return 'E2';
  if (
    ruleId === 'label' ||
    ruleId === 'select-name' ||
    ruleId === 'input-button-name'
  ) {
    return 'E8';
  }
  return null;
}

function summarizeAxeResult(result) {
  const violations = (result.violations || []).map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    criterion: v.helpUrl || '',
    nodes: (v.nodes || []).map((n) => {
      const t = n.target;
      return Array.isArray(t) ? t.join(' ') : String(t);
    }),
    eCode: mapAxeToE(v.id),
  }));
  const seriousCritical = violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );
  return { violations, seriousCritical };
}

async function runAxe(page, AxeBuilder) {
  const result = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
  return summarizeAxeResult(result);
}

// --------------------------------------------------------------------------- #
// Geçiş (viewport) çalıştırma
// --------------------------------------------------------------------------- #

async function capturePass(context, url, outDir, AxeBuilder, label, opts = {}) {
  const colorScheme = opts.colorScheme || 'light';
  const reducedMotion = opts.reducedMotion || 'no-preference';
  const page = await context.newPage();
  const passes = [];
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    // Yazı tipleri/animasyonlar otursun.
    await page.waitForTimeout(300);

    for (const width of VIEWPORTS) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(150);

      const shotName = label + '-' + width + '.png';
      const shotPath = path.join(outDir, shotName);
      await page.screenshot({ path: shotPath, fullPage: true });

      let axe = { violations: [], seriousCritical: [] };
      try {
        axe = await runAxe(page, AxeBuilder);
      } catch (err) {
        axe = {
          violations: [],
          seriousCritical: [],
          error: String(err && err.message ? err.message : err),
        };
      }

      const horizontal = await page.evaluate(() => {
        const de = document.documentElement;
        return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth };
      });
      const horizontalScroll = horizontal.scrollWidth > horizontal.clientWidth;

      const targets = await collectTargets(
        page,
        INTERACTIVE_SELECTOR,
        PRIMARY_SELECTOR
      );

      passes.push({
        name: label,
        viewport: width,
        colorScheme,
        reducedMotion,
        screenshot: shotName,
        axe: axe.violations,
        axeError: axe.error || null,
        horizontalScroll,
        horizontal,
        targets,
      });
    }
  } finally {
    await page.close();
  }
  return passes;
}

// --------------------------------------------------------------------------- #
// Klavye testi (1280 px, açık tema)
// --------------------------------------------------------------------------- #

async function keyboardTest(context, url) {
  const result = {
    steps: [],
    visibleFocusIssues: [],
    tabindexPositive: [],
    orderIssues: [],
    traps: [],
    totalFocusables: 0,
    reachedFocusables: 0,
    unreached: [],
  };
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);

    const info = await page.evaluate(tagFocusablesInPage, INTERACTIVE_SELECTOR);
    result.totalFocusables = info.total;
    const restingById = new Map(info.resting.map((r) => [r.id, r]));

    await page.evaluate(() => {
      if (document.body) document.body.focus();
    });

    const maxSteps = info.total + 5;
    const visitedCounts = new Map();
    let prev = null;
    const visitedIds = new Set();

    for (let i = 0; i < maxSteps; i++) {
      await page.keyboard.press('Tab');
      const snap = await page.evaluate(focusSnapshotInPage);
      if (!snap || !snap.focused) {
        break;
      }
      result.steps.push(snap);

      // Görünür odak denetimi: odak stili, odaksız stilden farklı olmalı.
      const fid = await page.evaluate(() => {
        const el = document.activeElement;
        return el && el.getAttribute ? el.getAttribute('data-focus-id') : null;
      });
      if (fid !== null && fid !== undefined) {
        const id = Number(fid);
        visitedIds.add(id);
        visitedCounts.set(id, (visitedCounts.get(id) || 0) + 1);
        const resting = restingById.get(id);
        const sameOutline =
          resting &&
          resting.outlineStyle === snap.outlineStyle &&
          resting.outlineWidth === snap.outlineWidth;
        const sameShadow =
          resting && (resting.boxShadow || 'none') === (snap.boxShadow || 'none');
        const styleChanged = !(sameOutline && sameShadow);
        if (!snap.hasVisibleFocus && !styleChanged) {
          result.visibleFocusIssues.push({
            selector: snap.descriptor,
            reason: 'görünür odak stili yok',
          });
        }
      }

      // tabindex > 0 ihlali.
      if (snap.tabindex !== null && snap.tabindex > 0) {
        result.tabindexPositive.push({
          selector: snap.descriptor,
          tabindex: snap.tabindex,
        });
      }

      // Sıra: önceki öğeden 40 px'den fazla YUKARI zıplama (aynı satır değilse).
      if (prev) {
        const sameRow = Math.abs(snap.top - prev.top) <= 8;
        if (!sameRow && prev.top - snap.top > 40) {
          result.orderIssues.push({
            from: prev.descriptor,
            to: snap.descriptor,
            dy: Math.round(prev.top - snap.top),
          });
        }
      }
      prev = snap;
    }

    // Odak tuzağı: aynı öğe 3 kez arka arkaya.
    let streak = 0;
    let lastKey = null;
    for (const step of result.steps) {
      const key = step.descriptor + '@' + Math.round(step.top);
      if (key === lastKey) {
        streak++;
        if (streak >= 3) {
          result.traps.push({ selector: step.descriptor, reason: 'arka arkaya 3 kez' });
          break;
        }
      } else {
        streak = 1;
        lastKey = key;
      }
    }

    // Ulaşılamayan odaklanabilir öğeler.
    result.reachedFocusables = visitedIds.size;
    if (
      info.total > 0 &&
      visitedIds.size < info.total &&
      result.steps.length >= maxSteps
    ) {
      for (let i = 0; i < info.total; i++) {
        if (!visitedIds.has(i)) result.unreached.push(i);
      }
      if (result.unreached.length > 0) {
        result.traps.push({
          reason: 'bazı öğelere ulaşılamadan döngü',
          count: result.unreached.length,
        });
      }
    }
  } finally {
    await page.close();
  }
  return result;
}

// --------------------------------------------------------------------------- #
// Hareket / metin büyütme testleri
// --------------------------------------------------------------------------- #

async function motionTest(context, url) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(300);
    const raw = await page.evaluate(collectMotionInPage);
    return raw;
  } finally {
    await page.close();
  }
}

async function zoomTest(context, url) {
  const page = await context.newPage();
  const result = { zoom: [], clipped: [], horizontalScroll: false };
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);

    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    await page.waitForTimeout(200);
    const at1280 = await page.evaluate(reflowInPage);
    result.zoom.push({ viewport: 1280, ...at1280 });

    await page.setViewportSize({ width: 640, height: 800 });
    await page.waitForTimeout(200);
    const at640 = await page.evaluate(reflowInPage);
    result.zoom.push({ viewport: 640, ...at640 });

    result.horizontalScroll = at1280.horizontalScroll || at640.horizontalScroll;
    result.clipped = [
      ...at1280.clipped.map((c) => ({ viewport: 1280, ...c })),
      ...at640.clipped.map((c) => ({ viewport: 640, ...c })),
    ];
  } finally {
    await page.close();
  }
  return result;
}

// --------------------------------------------------------------------------- #
// Sonuç değerlendirme (E kodları)
// --------------------------------------------------------------------------- #

function evaluateResults(report) {
  const results = {};

  // E1: axe serious/critical
  const seriousCritical = [];
  const e2FromAxe = [];
  const e8FromAxe = [];
  for (const pass of report.passes) {
    for (const v of pass.axe) {
      if (v.impact === 'serious' || v.impact === 'critical') {
        seriousCritical.push({ id: v.id, impact: v.impact, viewport: pass.viewport });
        if (v.eCode === 'E2') e2FromAxe.push({ id: v.id, viewport: pass.viewport });
        if (v.eCode === 'E8') e8FromAxe.push({ id: v.id, viewport: pass.viewport });
      }
    }
    if (pass.axeError) seriousCritical.push({ id: 'axe-error', viewport: pass.viewport });
  }
  results.E1 = {
    ok: seriousCritical.length <= THRESHOLDS.E1_axe_serious_critical_max,
    value: seriousCritical.length,
    threshold: THRESHOLDS.E1_axe_serious_critical_max,
    violations: seriousCritical,
  };

  // E2: renk kontrastı (axe color-contrast üzerinden)
  const e2Nodes = [];
  for (const pass of report.passes) {
    for (const v of pass.axe) {
      if (v.eCode === 'E2') {
        e2Nodes.push({ id: v.id, viewport: pass.viewport, nodes: v.nodes });
      }
    }
  }
  results.E2 = {
    ok: e2Nodes.length === 0,
    value: e2Nodes.length,
    threshold: THRESHOLDS.E2_text_contrast_min,
    violations: e2Nodes,
  };

  // E3: etkileşim öğesi kontrastı — axe ile ayrı kural yok; burada yalnız
  // 4.5 altı normalize edilmiş axe bulgusu bilgi olarak raporlanır.
  results.E3 = {
    ok: true,
    value: 0,
    threshold: THRESHOLDS.E3_ui_contrast_min,
    note: 'axe color-contrast dışındaki non-text kontrast otomatik ölçülmedi.',
  };

  // E4: dokunma hedefleri
  const targetViolations = [];
  for (const pass of report.passes) {
    for (const t of pass.targets) {
      if (t.inline) continue; // satır içi metin bağlantıları muaf (SC 2.5.8)
      if (t.primary) {
        if (t.w < THRESHOLDS.E4_primary_target_min_px || t.h < THRESHOLDS.E4_primary_target_min_px) {
          targetViolations.push({
            selector: t.selector,
            w: t.w,
            h: t.h,
            primary: true,
            viewport: pass.viewport,
            reason: 'birincil eylem < 44x44',
          });
        }
      }
      if (t.w < THRESHOLDS.E4_any_target_min_px || t.h < THRESHOLDS.E4_any_target_min_px) {
        targetViolations.push({
          selector: t.selector,
          w: t.w,
          h: t.h,
          primary: t.primary,
          viewport: pass.viewport,
          reason: 'hedef < 24x24',
        });
      }
    }
  }
  report.passes.forEach((pass) => {
    pass.targets = pass.targets.map((t) => ({
      ...t,
      ok:
        t.inline ||
        ((!t.primary ||
          (t.w >= THRESHOLDS.E4_primary_target_min_px &&
            t.h >= THRESHOLDS.E4_primary_target_min_px)) &&
          t.w >= THRESHOLDS.E4_any_target_min_px &&
          t.h >= THRESHOLDS.E4_any_target_min_px),
    }));
  });
  results.E4 = {
    ok: targetViolations.length === 0,
    value: targetViolations.length,
    threshold: THRESHOLDS.E4_any_target_min_px,
    violations: targetViolations,
  };

  // E5: reflow / yatay kaydırma
  const scrollViolations = report.passes
    .filter((p) => p.viewport <= THRESHOLDS.E5_reflow_width_px && p.horizontalScroll)
    .map((p) => ({ viewport: p.viewport, scrollWidth: p.horizontal.scrollWidth, clientWidth: p.horizontal.clientWidth }));
  const zoomScroll = report.zoom && report.zoom.horizontalScroll;
  results.E5 = {
    ok: scrollViolations.length === 0 && !zoomScroll,
    value: scrollViolations.length + (zoomScroll ? 1 : 0),
    threshold: THRESHOLDS.E5_reflow_width_px,
    violations: scrollViolations,
  };

  // E6: görünür odak
  const kb = report.keyboard || { visibleFocusIssues: [] };
  results.E6 = {
    ok: (kb.visibleFocusIssues || []).length === 0,
    value: (kb.visibleFocusIssues || []).length,
    threshold: THRESHOLDS.E6_visible_focus,
    violations: kb.visibleFocusIssues || [],
  };

  // E7: odak sırası + tabindex + tuzak
  const orderProblems =
    (kb.orderIssues || []).length +
    (kb.tabindexPositive || []).length +
    (kb.traps || []).length;
  results.E7 = {
    ok: orderProblems === 0,
    value: orderProblems,
    threshold: THRESHOLDS.E7_focus_order,
    violations: {
      orderIssues: kb.orderIssues || [],
      tabindexPositive: kb.tabindexPositive || [],
      traps: kb.traps || [],
    },
  };

  // E8: etiketler (axe label / *-name)
  const e8Nodes = [];
  for (const pass of report.passes) {
    for (const v of pass.axe) {
      if (v.eCode === 'E8') e8Nodes.push({ id: v.id, viewport: pass.viewport, nodes: v.nodes });
    }
  }
  results.E8 = {
    ok: e8Nodes.length === 0,
    value: e8Nodes.length,
    threshold: 0,
    violations: e8Nodes,
  };

  // E12: hareket
  const motion = report.motion || {};
  const maxAnim = (motion.maxAnimation && motion.maxAnimation.value) || 0;
  const maxTrans = (motion.maxTransition && motion.maxTransition.value) || 0;
  const animFail = maxAnim > THRESHOLDS.E12_max_animation_s;
  const transFail = maxTrans > THRESHOLDS.E12_max_transition_s;
  results.E12 = {
    ok: !animFail && !transFail,
    value: Math.max(maxAnim, maxTrans),
    threshold: THRESHOLDS.E12_max_transition_s,
    violations: {
      animation: animFail ? motion.maxAnimation : null,
      transition: transFail ? motion.maxTransition : null,
    },
  };

  // E13: metin büyütme
  const clipped = (report.zoom && report.zoom.clipped) || [];
  results.E13 = {
    ok: !(report.zoom && report.zoom.horizontalScroll) && clipped.length === 0,
    value: clipped.length + (report.zoom && report.zoom.horizontalScroll ? 1 : 0),
    threshold: THRESHOLDS.E13_zoom_percent,
    violations: clipped,
  };

  return results;
}

// --------------------------------------------------------------------------- #
// Rapor yazma / konsol özeti
// --------------------------------------------------------------------------- #

function printSummary(report) {
  const lines = [];
  lines.push('UI doğrulama raporu — ' + report.target);
  lines.push('İhlal sütunu: FAIL olan E kodlarında bulgu sayısı.');
  const order = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E12', 'E13'];
  for (const code of order) {
    const r = report.results[code];
    if (!r) continue;
    const status = r.ok ? 'OK  ' : 'FAIL';
    lines.push(
      '  ' + status + ' ' + code.padEnd(4) + ' ihlal: ' + String(r.value).padEnd(4) +
        ' eşik: ' + r.threshold
    );
  }
  lines.push('Genel: ' + (report.ok ? 'OK' : 'FAIL'));
  lines.push('report.json: ' + path.join(report.__outDir, 'report.json'));
  process.stdout.write(lines.join('\n') + '\n');
}

// --------------------------------------------------------------------------- #
// Ana akış
// --------------------------------------------------------------------------- #

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (err) {
    fatal(2, 'Girdi hatası: ' + err.message);
  }

  let staticServer = null;
  let browser = null;
  let report = null;
  try {
    const target = args.target;
    let servedRoot = null;
    let url;

    if (/^https?:\/\//i.test(target)) {
      url = target;
    } else {
      const abs = path.resolve(target);
      if (!fs.existsSync(abs)) throw new InputError('Girdi dosyası bulunamadı: ' + abs);
      servedRoot = path.dirname(abs);
      staticServer = await startStaticServer(servedRoot);
      const rel = path.basename(abs);
      url = staticServer.origin + '/' + rel;
    }

    const outDir = makeOutDir(args.out);

    let deps;
    try {
      deps = await loadDeps();
    } catch (err) {
      if (err instanceof ToolMissingError) {
        fatal(2, missingToolMessage(err.message));
      }
      throw err;
    }

    try {
      browser = await launchChromium(deps.playwright);
    } catch (err) {
      fatal(2, missingToolMessage(err.message || String(err)));
    }

    const startedAt = new Date().toISOString();

    // 1. geçiş: açık tema, hareketsizlik tercihi yok.
    const lightCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
    });
    const lightPasses = await capturePass(
      lightCtx,
      url,
      outDir,
      deps.AxeBuilder,
      'light',
      { colorScheme: 'light', reducedMotion: 'no-preference' }
    );
    await lightCtx.close();

    // 2. geçiş: reduced motion + koyu tema.
    const darkCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'dark',
      reducedMotion: 'reduce',
    });
    const darkPasses = await capturePass(
      darkCtx,
      url,
      outDir,
      deps.AxeBuilder,
      'dark-reduced',
      { colorScheme: 'dark', reducedMotion: 'reduce' }
    );

    // Klavye testi (1280, açık tema).
    const kbCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
    });
    let keyboard;
    try {
      keyboard = await keyboardTest(kbCtx, url);
    } finally {
      await kbCtx.close();
    }

    // Hareket testi: reduced motion context'inde ölç (emülasyon).
    let motion;
    try {
      motion = await motionTest(darkCtx, url);
    } catch (err) {
      motion = { error: String(err.message || err), maxAnimation: { value: 0 }, maxTransition: { value: 0 } };
    }

    // Zoom testi (kendi açık tema context'i).
    let zoom;
    const zoomCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
    });
    try {
      zoom = await zoomTest(zoomCtx, url);
    } catch (err) {
      zoom = { zoom: [], clipped: [], horizontalScroll: false, error: String(err.message || err) };
    } finally {
      await zoomCtx.close();
    }

    await darkCtx.close();

    report = {
      target: target,
      url,
      startedAt,
      thresholds: THRESHOLDS,
      passes: [...lightPasses, ...darkPasses],
      keyboard,
      motion,
      zoom,
      results: null,
      ok: false,
      __outDir: outDir,
    };
    report.results = evaluateResults(report);
    report.ok = Object.values(report.results).every((r) => r.ok);

    const reportForDisk = { ...report };
    delete reportForDisk.__outDir;
    fs.writeFileSync(
      path.join(outDir, 'report.json'),
      JSON.stringify(reportForDisk, null, 2)
    );

    if (args.json) {
      process.stdout.write(JSON.stringify(reportForDisk, null, 2) + '\n');
    } else {
      printSummary(report);
    }

    process.exitCode = report.ok ? 0 : 1;
  } catch (err) {
    if (err instanceof InputError || err instanceof ToolMissingError) {
      fatal(2, err instanceof ToolMissingError ? missingToolMessage(err.message) : 'Girdi hatası: ' + err.message);
    }
    fatal(2, 'Beklenmeyen hata: ' + (err && err.stack ? err.stack : err));
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        /* yut */
      }
    }
    if (staticServer) {
      try {
        await staticServer.close();
      } catch {
        /* yut */
      }
    }
  }
}

main();
