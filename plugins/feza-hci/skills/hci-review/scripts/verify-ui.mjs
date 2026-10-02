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
 *   - yatay kaydırma ve dokunma hedefi boyutu denetimi (E4/E5)
 *   - klavye odak sırası, görünür odak, odak tuzağı ve odak örtülmesi (E6/E7/E14)
 *   - reduced-motion + koyu tema geçişi ve hareket denetimi (E12)
 *   - %200 metin büyütmede reflow/kırpılma denetimi (E13)
 *   - UI bileşeni kenarlık/dolgu/ikon kontrastı (E3)
 *   - hedef aralığı istisnası (E15), metin aralığına dayanıklılık (E16)
 *   - erişilebilir kimlik doğrulama (E17, karma) ve sürükleme tespiti (E18, karma)
 *
 * Sonuçlar `report.json` -> `results.E<kod>` altında `{ ok, value, threshold, method }`
 * taşır; `method` = otomatik | karma | statik. `ok: null` iken `na` gerekçesi bulunur
 * ve kriter elle doğrulanmalıdır (çıkış kodunu bozmaz). `report.ok`, `ok === false`
 * olan sonuç yoksa true olur (null başarısız sayılmaz).
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
  "E13_zoom_percent": 200,
  "E14_focus_obscured_points": 5,
  "E15_target_spacing_px": 24,
  "E16_line_height": 1.5,
  "E16_paragraph_spacing_em": 2,
  "E16_letter_spacing_em": 0.12,
  "E16_word_spacing_em": 0.16,
  "E22_text_contrast_min": 7.0,
  "E22_ui_contrast_min": 4.5,
  "E23_text_contrast_min": 4.5,
  "E25_expansion_ratio": 1.3
};
// THRESHOLDS-END

// Uyum profilleri: axe `runOnly` etiketleri. wcag22aa varsayılandır.
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const AXE_TAGS_EN301549 = ['EN-301-549'];
const PROFILES = ['wcag22aa', 'en301549'];
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

// Önbelleğe tüm temel + istenen ek paketleri kurar. npm tek seferde kurulan
// paket listesini `--no-save` ile budadığı için ekler her zaman temel paketlerle
// birlikte kurulur.
const BASE_DEPS = ['playwright', '@axe-core/playwright'];
const OPTIONAL_DEPS = {
  ibm: ['accessibility-checker-engine'],
  visual: ['pixelmatch', 'pngjs'],
};

function installDeps(optionalKeys, dir) {
  const packages = [...BASE_DEPS];
  for (const key of optionalKeys) {
    for (const p of OPTIONAL_DEPS[key] || []) {
      if (!packages.includes(p)) packages.push(p);
    }
  }
  const pkgJson = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgJson)) {
    fs.writeFileSync(
      pkgJson,
      JSON.stringify({ name: 'feza-ui-check-deps', private: true }, null, 2)
    );
  }
  runBin(npmBin(), ['install', '--prefix', dir, '--no-save', '--silent', ...packages], {
    cwd: dir,
    stdio: 'inherit',
    timeout: 590000,
  });
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
    let axeCoreEntry = null;
    try {
      axeCoreEntry = require.resolve('axe-core');
    } catch {
      /* axe-core doğrudan yoksa sürüm bilgisi atlanır */
    }
    return { pwEntry, axeEntry, axeCoreEntry, pkgJson, dir };
  } catch {
    return null;
  }
}

function loadAxeCore(entry) {
  if (!entry) return null;
  try {
    const mod = createRequire(entry)(entry);
    return mod && mod.default ? mod.default : mod;
  } catch {
    return null;
  }
}

async function loadOptionalDep(name) {
  // Önbellekten piksel karşılaştırma bağımlılıklarını çözmeyi dener; yoksa kurmaz.
  const dir = cacheDir();
  const pkgJson = path.join(dir, 'package.json');
  if (fs.existsSync(pkgJson)) {
    try {
      const require = createRequire(pkgJson);
      return await import(pathToFileURL(require.resolve(name)).href);
    } catch {
      /* doğrudan çözmeyi dene */
    }
  }
  try {
    return await import(name);
  } catch {
    return null;
  }
}

async function loadDeps(optionalKeys = []) {
  // 1) Doğrudan çözülmeyi dene.
  try {
    const pw = await import('playwright');
    const axeMod = await import('@axe-core/playwright');
    let axeCore = null;
    try {
      axeCore = (await import('axe-core')).default;
    } catch {
      /* sürüm bilgisi atlanır */
    }
    return { playwright: pw, AxeBuilder: pickAxe(axeMod), axeCore };
  } catch {
    /* önbellek yoluna geç */
  }

  const noInstall = process.env.FEZA_UI_CHECK_NO_INSTALL === '1';

  // 2) Önbellekte zaten kuruluysa oradan çöz (kurulum denemesi sayılmaz).
  const cached = tryResolveFromCache();
  if (cached) {
    const pw = await import(pathToFileURL(cached.pwEntry).href);
    const axeMod = await import(pathToFileURL(cached.axeEntry).href);
    const axeCore = loadAxeCore(cached.axeCoreEntry);
    return { playwright: pw, AxeBuilder: pickAxe(axeMod), axeCore };
  }

  if (noInstall) {
    throw new ToolMissingError(
      'FEZA_UI_CHECK_NO_INSTALL=1; bağımlılıklar ne doğrudan ne önbellekten çözülebildi.'
    );
  }

  const dir = cacheDir();
  fs.mkdirSync(dir, { recursive: true });

  try {
    installDeps(optionalKeys, dir);
  } catch (err) {
    throw new ToolMissingError('npm install başarısız: ' + (err.message || err));
  }

  const pkgJson = path.join(dir, 'package.json');
  const require = createRequire(pkgJson);
  let pw;
  let axeMod;
  let axeCore = null;
  try {
    const pwEntry = require.resolve('playwright');
    const axeEntry = require.resolve('@axe-core/playwright');
    pw = await import(pathToFileURL(pwEntry).href);
    axeMod = await import(pathToFileURL(axeEntry).href);
    try {
      axeCore = loadAxeCore(require.resolve('axe-core'));
    } catch {
      /* sürüm bilgisi atlanır */
    }
  } catch (err) {
    throw new ToolMissingError('paketler çözülemedi: ' + (err.message || err));
  }
  return { playwright: pw, AxeBuilder: pickAxe(axeMod), axeCore };
}

// Profil çözümleme: axe sürümünde EN-301-549 etiketi var mı diye bakılır;
// yoksa wcag22aa'ya düşülür ve gerekçe rapora yazılır.
function resolveProfile(requested, axeCore) {
  const axeVersion = axeCore && axeCore.version ? axeCore.version : null;
  const hasEnTag = (() => {
    if (!axeCore || typeof axeCore.getRules !== 'function') return false;
    try {
      return axeCore.getRules(AXE_TAGS_EN301549).length > 0;
    } catch {
      return false;
    }
  })();
  const enRuleCount = (() => {
    if (!hasEnTag) return 0;
    try {
      return axeCore.getRules(AXE_TAGS_EN301549).length;
    } catch {
      return 0;
    }
  })();

  if (requested === 'en301549') {
    if (hasEnTag) {
      return {
        requested,
        applied: 'en301549',
        tags: AXE_TAGS_EN301549,
        fallbackReason: null,
        axeVersion,
        enRuleCount,
      };
    }
    return {
      requested,
      applied: 'wcag22aa',
      tags: AXE_TAGS,
      fallbackReason: axeVersion
        ? 'kurulu axe-core ' + axeVersion + " sürümünde EN-301-549 etiketi yok"
        : 'axe-core sürümü/etiketi doğrulanamadı',
      axeVersion,
      enRuleCount: 0,
    };
  }
  return {
    requested: 'wcag22aa',
    applied: 'wcag22aa',
    tags: AXE_TAGS,
    fallbackReason: null,
    axeVersion,
    enRuleCount,
  };
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
  const args = {
    target: null,
    out: null,
    json: false,
    static: false,
    profile: 'wcag22aa',
    ariaBaseline: null,
    engines: ['axe'],
    visual: null,
    visualMaxDiff: 100,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--static') {
      args.static = true;
    } else if (a === '--out') {
      args.out = argv[++i];
    } else if (a.startsWith('--out=')) {
      args.out = a.slice('--out='.length);
    } else if (a === '--json') {
      args.json = true;
    } else if (a === '--profile') {
      args.profile = argv[++i];
    } else if (a.startsWith('--profile=')) {
      args.profile = a.slice('--profile='.length);
    } else if (a === '--aria-baseline') {
      args.ariaBaseline = argv[++i];
    } else if (a.startsWith('--aria-baseline=')) {
      args.ariaBaseline = a.slice('--aria-baseline='.length);
    } else if (a === '--engines') {
      args.engines = String(argv[++i] || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a.startsWith('--engines=')) {
      args.engines = a
        .slice('--engines='.length)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a === '--visual') {
      args.visual = argv[++i];
    } else if (a.startsWith('--visual=')) {
      args.visual = a.slice('--visual='.length);
    } else if (a === '--visual-max-diff') {
      args.visualMaxDiff = Number(argv[++i]);
    } else if (a.startsWith('--visual-max-diff=')) {
      args.visualMaxDiff = Number(a.slice('--visual-max-diff='.length));
    } else if (a === '--help' || a === '-h') {
      process.stdout.write(
        'Kullanım: node scripts/verify-ui.mjs <URL | yerel.html> [--out DIR] [--json]\n' +
        '        node scripts/verify-ui.mjs --static <dizin> [--out DIR] [--json]\n' +
        '\n' +
        'Bayraklar:\n' +
        '  --profile wcag22aa|en301549  axe etiket profili (varsayılan wcag22aa).\n' +
        '                               en301549: EN-301-549 etiketi kurulu axe\n' +
        "                               sürümünde yoksa wcag22aa'ya düşer ve raporlanır.\n" +
        '  --aria-baseline <dosya>      E28 erişilebilirlik ağacı snapshot tabanı;\n' +
        '                               yoksa oluşturulur, varsa farkı raporlanır (bilgi).\n' +
        '  --engines axe,ibm            İkinci motor (IBM Equal Access) yalnız uyarı\n' +
        '                               katmanı; E1 ve çıkış kodunu etkilemez.\n' +
        '  --visual <baseline-dizin>    Viewport ekran görüntülerini piksel\n' +
        '                               karşılaştırmasıyla baseline ile kıyaslar (bilgi).\n' +
        '  --visual-max-diff N          Piksel fark toleransı (varsayılan 100).\n' +
        '\n' +
        'E1–E29 kriterlerini otomatik/karma olarak ölçer. --static ile tarayıcı\n' +
        'açmadan kaynak taraması yapılır (E23, E24 fiziksel yön, E26, E27). Sonuçlar\n' +
        'report.json -> results.E<kod> altında { ok, value, threshold, method }\n' +
        'taşır; method = otomatik | karma | statik. ok: null ise ilgili kriter elle\n' +
        'doğrulanmalıdır (na gerekçesiyle). Çıkış: 0 geçti, 1 ihlal, 2 araç yok ya da\n' +
        'girdi hatası.\n'
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
  if (!PROFILES.includes(args.profile)) {
    throw new InputError(
      'Geçersiz profil: ' + args.profile + ' (geçerli: ' + PROFILES.join('|') + ')'
    );
  }
  if (args.visual !== null && !args.visual) {
    throw new InputError('--visual için baseline dizini gerekli');
  }
  if (!Number.isFinite(args.visualMaxDiff) || args.visualMaxDiff < 0) {
    throw new InputError('--visual-max-diff negatif olmayan bir sayı olmalı');
  }
  const knownEngines = ['axe', 'ibm'];
  const unknown = args.engines.filter((e) => !knownEngines.includes(e));
  if (unknown.length > 0) {
    throw new InputError(
      'Bilinmeyen motor: ' + unknown.join(',') + ' (geçerli: axe,ibm)'
    );
  }
  if (!args.engines.includes('axe')) args.engines.unshift('axe');
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
      left: Math.round(rect.left * 100) / 100,
      top: Math.round(rect.top * 100) / 100,
      cx: Math.round((rect.left + rect.width / 2) * 100) / 100,
      cy: Math.round((rect.top + rect.height / 2) * 100) / 100,
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
// Sayfa içi: E3 — UI bileşeni kontrastı (kenarlık / dolgu / ikon)
// --------------------------------------------------------------------------- #

const UI_COMPONENT_SELECTOR =
  'button, input:not([type=hidden]), select, textarea, [role=button], ' +
  '[role=checkbox], [role=switch], a.btn';

function collectUiContrastInPage(selector) {
  const parseColor = (str) => {
    const m = String(str || '').match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map((s) => parseFloat(s.trim()));
    if (p.length < 3 || p.some((v) => Number.isNaN(v))) return null;
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const composite = (top, bottom) => {
    const a = top.a;
    return {
      r: top.r * a + bottom.r * (1 - a),
      g: top.g * a + bottom.g * (1 - a),
      b: top.b * a + bottom.b * (1 - a),
      a: 1,
    };
  };
  const luminance = (c) => {
    const lin = (v) => {
      const x = v / 255;
      return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  };
  const contrast = (a, b) => {
    const l1 = luminance(a);
    const l2 = luminance(b);
    const hi = Math.max(l1, l2);
    const lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
  };
  const describe = (el) => {
    let sel = el.tagName.toLowerCase();
    if (el.id) sel += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
    }
    return sel;
  };
  // İlk opak ata zeminini bul; aradaki yarı saydam katmanları bindir.
  const neighborBackground = (el) => {
    const stack = [];
    let node = el.parentElement;
    while (node) {
      const c = parseColor(getComputedStyle(node).backgroundColor);
      if (c && c.a > 0) {
        stack.push(c);
        if (c.a >= 1) break;
      }
      node = node.parentElement;
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = stack.length - 1; i >= 0; i--) bg = composite(stack[i], bg);
    return bg;
  };

  const results = [];
  const skipped = [];
  const icons = [];
  const els = Array.from(document.querySelectorAll(selector));

  for (const el of els) {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const visible =
      rect.width > 0 &&
      rect.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none' &&
      Number(style.opacity) > 0;
    if (!visible) continue;

    const tag = el.tagName.toLowerCase();
    const type = (el.getAttribute('type') || '').toLowerCase();
    // Yerel (appearance:auto) onay kutusu/radyo tarayıcı çizimindedir; atla.
    if (
      (tag === 'input' && (type === 'checkbox' || type === 'radio')) &&
      style.appearance === 'auto'
    ) {
      skipped.push(describe(el));
      continue;
    }

    const neighbor = neighborBackground(el);

    // Kenarlık: 4 kenarın en düşük oranlısı (yalnız görünür kenarlar).
    // Tamamen saydam (alpha 0) kenarlık görünür sınır oluşturmaz; forced-colors
    // altında sistem renkli sınıra dönüşen şeffaf kenarlık bu yüzden atlanır.
    const sideRatios = [];
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      const w = parseFloat(style['border' + side + 'Width'] || '0');
      const st = style['border' + side + 'Style'];
      if (!(w > 0) || st === 'none' || st === 'hidden') continue;
      const bc = parseColor(style['border' + side + 'Color']);
      if (!bc) continue;
      if (bc.a === 0) continue; // tamamen saydam: görünür sınır yok
      const opaque = bc.a >= 1 ? bc : composite(bc, neighbor);
      sideRatios.push({ side: side.toLowerCase(), ratio: contrast(opaque, neighbor) });
    }
    let borderMin = null;
    for (const s of sideRatios) {
      if (borderMin === null || s.ratio < borderMin.ratio) borderMin = s;
    }

    // Dolgu: bileşenin kendi zemini komşu zeminden farklıysa sınır oluşturur.
    const fillC = parseColor(style.backgroundColor);
    let fillRatio = null;
    if (fillC && fillC.a > 0) {
      const fillOpaque = fillC.a >= 1 ? fillC : composite(fillC, neighbor);
      fillRatio = contrast(fillOpaque, neighbor);
    }

    const hasBoundary = borderMin !== null || (fillRatio !== null && fillRatio > 1);
    if (!hasBoundary) continue; // yalnız metinsel görünüm — atla

    let boundaryRatio = null;
    let boundaryPart = null;
    if (borderMin !== null) {
      boundaryRatio = borderMin.ratio;
      boundaryPart = 'border-' + borderMin.side;
    }
    // Bileşen tanımlayıcı oranı = max(kenarlık-min, dolgu-vs-komşu). Dolgu
    // komşuyla aynıysa (oran 1) sınır oluşturmaz; kenarlık belirleyicidir.
    if (fillRatio !== null && (boundaryRatio === null || fillRatio > boundaryRatio)) {
      boundaryRatio = fillRatio;
      boundaryPart = 'fill';
    }

    results.push({
      selector: describe(el),
      ratio: boundaryRatio,
      part: boundaryPart,
    });

    // Metinsiz svg ikonlar: fill/stroke (currentColor çözümlü) vs bileşen zemini.
    const componentBg =
      fillC && fillC.a >= 1
        ? fillC
        : fillC && fillC.a > 0
          ? composite(fillC, neighbor)
          : neighbor;
    for (const svg of Array.from(el.querySelectorAll('svg'))) {
      if (svg.textContent && svg.textContent.trim().length > 0) continue;
      const ss = getComputedStyle(svg);
      const color = parseColor(ss.color) || { r: 0, g: 0, b: 0, a: 1 };
      const candidates = [];
      const norm = (v) => (v === 'currentcolor' ? ss.color : v);
      const fill = norm(ss.fill);
      if (fill && fill !== 'none') {
        const c = parseColor(fill);
        if (c) candidates.push({ part: 'icon-fill', c });
      }
      const stroke = norm(ss.stroke);
      if (stroke && stroke !== 'none') {
        const c = parseColor(stroke);
        if (c) candidates.push({ part: 'icon-stroke', c });
      }
      for (const cand of candidates) {
        // Bazı durumlarda parse renksiz kalırsa currentColor'a düş.
        const col = cand.c.a === 0 ? color : cand.c;
        const opaque = col.a >= 1 ? col : composite(col, componentBg);
        const ratio = contrast(opaque, componentBg);
        icons.push({ selector: describe(el) + ' > svg', ratio, part: cand.part });
      }
    }
  }
  return { results, skipped, icons };
}

// --------------------------------------------------------------------------- #
// Sayfa içi: E14 — odak örtülmesi (fixed/sticky katman)
// --------------------------------------------------------------------------- #

function focusObscuredProbeInPage() {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return null;

  const describe = (node) => {
    let sel = node.tagName ? node.tagName.toLowerCase() : '?';
    if (node.id) sel += '#' + node.id;
    if (typeof node.className === 'string' && node.className.trim()) {
      sel += '.' + node.className.trim().split(/\s+/).slice(0, 2).join('.');
    }
    return sel;
  };
  const isFixedAncestor = (node) => {
    let n = node;
    while (n && n !== document.documentElement) {
      const pos = getComputedStyle(n).position;
      if (pos === 'fixed' || pos === 'sticky') return true;
      n = n.parentElement;
    }
    return false;
  };

  const inset = 1;
  const pts = [
    [rect.left + inset, rect.top + inset],
    [rect.right - inset, rect.top + inset],
    [rect.left + inset, rect.bottom - inset],
    [rect.right - inset, rect.bottom - inset],
    [rect.left + rect.width / 2, rect.top + rect.height / 2],
  ];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const obscured = [];
  let probed = 0;
  for (const [x, y] of pts) {
    const cx = Math.min(Math.max(x, 0), vw - 1);
    const cy = Math.min(Math.max(y, 0), vh - 1);
    // Sınırlandıktan sonra nokta hâlâ odak öğesinin üzerinde değilse atla.
    if (cx < rect.left || cx > rect.right || cy < rect.top || cy > rect.bottom) {
      continue;
    }
    probed++;
    const top = document.elementFromPoint(cx, cy);
    const related = top && (top === el || el.contains(top));
    if (!related && top && isFixedAncestor(top)) {
      obscured.push({ x: Math.round(cx), y: Math.round(cy), by: describe(top) });
    }
  }
  return {
    descriptor: describe(el),
    probed,
    obscuredCount: obscured.length,
    obscured,
  };
}

// --------------------------------------------------------------------------- #
// Sayfa içi: E16 — metin aralığına dayanıklılık
// --------------------------------------------------------------------------- #

function textSpacingOverflowInPage() {
  const de = document.documentElement;
  const horizontalScroll = de.scrollWidth > de.clientWidth;
  const clipped = [];
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    const hidesX = s.overflowX === 'hidden' || s.overflowX === 'clip';
    const hidesY = s.overflowY === 'hidden' || s.overflowY === 'clip';
    if (!hidesX && !hidesY) continue;
    if (!el.textContent || el.textContent.trim().length === 0) continue;
    const overflowY = hidesY && el.scrollHeight > el.clientHeight + 1 && el.clientHeight > 0;
    const overflowX = hidesX && el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0;
    if (overflowY || overflowX) {
      let sel = el.tagName.toLowerCase();
      if (el.id) sel += '#' + el.id;
      if (typeof el.className === 'string' && el.className.trim()) {
        sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
      }
      clipped.push(sel);
    }
  }
  return { horizontalScroll, clipped };
}

// --------------------------------------------------------------------------- #
// Sayfa içi: E17 — erişilebilir kimlik doğrulama
// --------------------------------------------------------------------------- #

function authAuditInPage() {
  const describe = (el) => {
    let sel = el.tagName.toLowerCase();
    if (el.id) sel += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
    }
    return sel;
  };
  const looksOtp = (el) => {
    const ac = (el.getAttribute('autocomplete') || '').toLowerCase();
    if (ac === 'one-time-code') return true;
    const hint = (el.id + ' ' + (el.getAttribute('name') || '') + ' ' + (el.getAttribute('inputmode') || '')).toLowerCase();
    return /otp|one-?time|verification|dogrulama|kod|\bcode\b|token/.test(hint);
  };
  const inputs = Array.from(document.querySelectorAll('input'));
  const passwordFields = inputs.filter((el) => (el.getAttribute('type') || '').toLowerCase() === 'password');
  const otpFields = inputs.filter((el) => looksOtp(el) && (el.getAttribute('type') || 'text').toLowerCase() !== 'password');
  const usernameFields = inputs.filter((el) => {
    const type = (el.getAttribute('type') || 'text').toLowerCase();
    if (type === 'password' || type === 'hidden') return false;
    const hint = (el.id + ' ' + (el.getAttribute('name') || '')).toLowerCase();
    return /user(name)?|login|kullanici|kullanıcı/.test(hint);
  });
  const present = passwordFields.length > 0 || otpFields.length > 0;
  if (!present) return { present: false };

  const autocompleteIssues = [];
  for (const f of passwordFields) {
    const ac = (f.getAttribute('autocomplete') || '').toLowerCase();
    if (ac !== 'current-password' && ac !== 'new-password') {
      autocompleteIssues.push({ selector: describe(f), kind: 'password', autocomplete: ac || null });
    }
  }
  for (const f of otpFields) {
    const ac = (f.getAttribute('autocomplete') || '').toLowerCase();
    if (ac !== 'one-time-code') {
      autocompleteIssues.push({ selector: describe(f), kind: 'otp', autocomplete: ac || null });
    }
  }
  for (const f of usernameFields) {
    const ac = (f.getAttribute('autocomplete') || '').toLowerCase();
    if (ac !== 'username') {
      autocompleteIssues.push({ selector: describe(f), kind: 'username', autocomplete: ac || null });
    }
  }

  // Yapıştırma engeli: paste olayı preventDefault ediliyorsa ihlal.
  const pasteIssues = [];
  for (const f of passwordFields.concat(otpFields)) {
    let prevented = false;
    try {
      const dt = new DataTransfer();
      dt.setData('text/plain', 'a1b2c3');
      const evt = new ClipboardEvent('paste', {
        bubbles: true,
        cancelable: true,
        clipboardData: dt,
      });
      const notPrevented = f.dispatchEvent(evt);
      prevented = !notPrevented || evt.defaultPrevented;
    } catch {
      prevented = false;
    }
    if (prevented) pasteIssues.push({ selector: describe(f) });
  }

  // "Göster" düğmesi: parola alanının bulunduğu formda var mı?
  const showWarnings = [];
  for (const f of passwordFields) {
    const form = f.closest('form') || document;
    const buttons = Array.from(form.querySelectorAll('button, [role=button], input[type=button]'));
    const hasShow = buttons.some((b) => {
      const text = (b.textContent || '') + ' ' + (b.getAttribute('aria-label') || '') + ' ' + (b.getAttribute('value') || '');
      return /g[oö]ster|show|gizle|hide/i.test(text);
    });
    if (!hasShow) {
      showWarnings.push({ selector: describe(f), reason: 'parola alanı yakınında "göster" düğmesi yok' });
    }
  }

  return {
    present: true,
    passwordFields: passwordFields.map(describe),
    otpFields: otpFields.map(describe),
    usernameFields: usernameFields.map(describe),
    pasteIssues,
    autocompleteIssues,
    showWarnings,
  };
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

async function runAxe(page, AxeBuilder, tags) {
  const result = await new AxeBuilder({ page })
    .withTags(tags || AXE_TAGS)
    .analyze();
  return summarizeAxeResult(result);
}

// --------------------------------------------------------------------------- #
// Geçiş (viewport) çalıştırma
// --------------------------------------------------------------------------- #

async function capturePass(context, url, outDir, AxeBuilder, label, opts = {}) {
  const colorScheme = opts.colorScheme || 'light';
  const reducedMotion = opts.reducedMotion || 'no-preference';
  const axeTags = opts.axeTags || AXE_TAGS;
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
        axe = await runAxe(page, AxeBuilder, axeTags);
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

      let uiContrast = { results: [], skipped: [], icons: [] };
      try {
        uiContrast = await page.evaluate(collectUiContrastInPage, UI_COMPONENT_SELECTOR);
      } catch (err) {
        uiContrast = { results: [], skipped: [], icons: [], error: String(err && err.message ? err.message : err) };
      }

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
        uiContrast,
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
  const focusObscured = [];
  const focusPartial = [];
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

      // E14: odak örtülmesi (fixed/sticky katman).
      try {
        const probe = await page.evaluate(focusObscuredProbeInPage);
        if (probe && probe.probed > 0) {
          const threshold = THRESHOLDS.E14_focus_obscured_points;
          if (probe.obscuredCount >= threshold && probe.obscuredCount >= probe.probed) {
            focusObscured.push({
              selector: probe.descriptor,
              obscured: probe.obscuredCount,
              probed: probe.probed,
              points: probe.obscured,
            });
          } else if (probe.obscuredCount > 0) {
            focusPartial.push({
              selector: probe.descriptor,
              obscured: probe.obscuredCount,
              probed: probe.probed,
            });
          }
        }
      } catch {
        /* ölçüm başarısızsa atla */
      }

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
  result.focusObscured = focusObscured;
  result.focusPartial = focusPartial;
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
// E16 — metin aralığına dayanıklılık (1280 px)
// --------------------------------------------------------------------------- #

async function textSpacingTest(context, url) {
  const page = await context.newPage();
  const result = { baseline: null, applied: null, violations: [], horizontalScroll: false, na: null };
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);

    const baseline = await page.evaluate(textSpacingOverflowInPage);
    result.baseline = baseline;

    await page.addStyleTag({
      content:
        '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; ' +
        'word-spacing: 0.16em !important } p { margin-bottom: 2em !important }',
    });
    await page.waitForTimeout(200);
    const applied = await page.evaluate(textSpacingOverflowInPage);
    result.applied = applied;
    result.horizontalScroll = applied.horizontalScroll && !baseline.horizontalScroll;

    const baselineSet = new Set(baseline.clipped);
    result.violations = applied.clipped.filter((s) => !baselineSet.has(s));
  } finally {
    await page.close();
  }
  return result;
}

// --------------------------------------------------------------------------- #
// E17 — erişilebilir kimlik doğrulama (karma)
// --------------------------------------------------------------------------- #

async function authTest(context, url) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);
    return await page.evaluate(authAuditInPage);
  } finally {
    await page.close();
  }
}

// --------------------------------------------------------------------------- #
// E18 — sürükleme tespiti (karma; onay statik)
// --------------------------------------------------------------------------- #

async function dragTest(context, url) {
  const page = await context.newPage();
  const result = { candidates: [], cdpAvailable: true };
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(200);

    let session = null;
    try {
      session = await context.newCDPSession(page);
      await session.send('DOM.enable');
      const doc = await session.send('DOM.getDocument', { depth: -1 });
      const rootNodeId = doc.root.nodeId;
      const events = ['dragstart', 'pointerdown', 'mousedown', 'touchstart'];
      const nodes = await session.send('DOM.querySelectorAll', {
        nodeId: rootNodeId,
        selector: '*',
      });
      const seen = new Set();
      for (const nodeId of nodes.nodeIds || []) {
        if (result.candidates.length > 200) break;
        let objectId = null;
        try {
          const resolved = await session.send('DOM.resolveNode', { nodeId });
          objectId = resolved.object && resolved.object.objectId;
        } catch {
          continue;
        }
        if (!objectId) continue;
        let listeners = [];
        try {
          const res = await session.send('DOMDebugger.getEventListeners', { objectId });
          listeners = res.listeners || [];
        } catch {
          continue;
        }
        for (const l of listeners) {
          if (events.includes(l.type) && !seen.has(nodeId)) {
            seen.add(nodeId);
            result.candidates.push({ nodeId, type: l.type });
          }
        }
      }
    } catch (err) {
      result.cdpAvailable = false;
      result.cdpError = String(err && err.message ? err.message : err);
    } finally {
      if (session) {
        try {
          await session.detach();
        } catch {
          /* yut */
        }
      }
    }

    // draggable="true" öğeleri (CDP olmasa da yakalanır).
    const draggables = await page.evaluate(() =>
      Array.from(document.querySelectorAll('[draggable="true"]')).map((el) => {
        let sel = el.tagName.toLowerCase();
        if (el.id) sel += '#' + el.id;
        if (typeof el.className === 'string' && el.className.trim()) {
          sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
        }
        return sel;
      })
    );
    result.draggables = draggables;
  } finally {
    await page.close();
  }
  return result;
}

// --------------------------------------------------------------------------- #
// E21 — forced-colors (görünür sınır + odak göstergesi)
// --------------------------------------------------------------------------- #

// forced-colors altında etkileşimli öğe sınırı: kenarlık (genişlik>0, stil≠none)
// ya da outline. box-shadow forced-colors'ta silindiği için sayılmaz.
// Yerel (appearance:auto) onay kutusu/radyo tarayıcı çiziminde olduğundan E3
// ile aynı kural uygulanır: sınır kontrolünden muaf, `skipped` listesine yazılır
// (odak göstergesi kontrolü sürer). appearance:none özelleştirmeleri denetlenir.
function forcedColorsBoundaryInPage(selector) {
  const describe = (el) => {
    let sel = el.tagName.toLowerCase();
    if (el.id) sel += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
    }
    return sel;
  };
  const items = [];
  const skipped = [];
  for (const el of document.querySelectorAll(selector)) {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (
      !(r.width > 0 && r.height > 0) ||
      s.visibility === 'hidden' ||
      s.display === 'none' ||
      Number(s.opacity) === 0
    ) {
      continue;
    }
    const tag = el.tagName.toLowerCase();
    const type = (el.getAttribute('type') || '').toLowerCase();
    const nativeChoice =
      tag === 'input' &&
      (type === 'checkbox' || type === 'radio') &&
      (s.appearance === 'auto' ||
        s.webkitAppearance === 'checkbox' ||
        s.webkitAppearance === 'radio');
    if (nativeChoice) {
      skipped.push(describe(el));
      continue;
    }
    let border = false;
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      const w = parseFloat(s['border' + side + 'Width'] || '0');
      const st = s['border' + side + 'Style'];
      if (w > 0 && st !== 'none' && st !== 'hidden') {
        border = true;
        break;
      }
    }
    const outline =
      s.outlineStyle !== 'none' && parseFloat(s.outlineWidth || '0') > 0;
    items.push({
      selector: describe(el),
      boundary: border || outline,
      border,
      outline,
      appearance: s.appearance,
    });
  }
  return { items, skipped };
}

async function forcedColorsTest(context, url) {
  const page = await context.newPage();
  const out = {
    total: 0,
    boundary: [],
    focus: [],
    skipped: [],
    focusables: 0,
    focusChecked: [],
  };
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);

    const items = await page.evaluate(
      forcedColorsBoundaryInPage,
      INTERACTIVE_SELECTOR
    );
    out.total = items.items.length;
    out.skipped = items.skipped;
    out.boundary = items.items
      .filter((i) => !i.boundary)
      .map((i) => ({ selector: i.selector, reason: 'görünür sınır yok' }));

    // Odak göstergesi: Tab ile gezinirken HER odaklanan öğede outline görünür
    // olmalı (forced-colors box-shadow'u siler). Bu döngü, sınır kontrolünden
    // muaf tutulan yerel checkbox/radio öğelerini de kapsar; yani onlar için
    // odak göstergesi kontrolü sürer.
    const info = await page.evaluate(tagFocusablesInPage, INTERACTIVE_SELECTOR);
    out.focusables = info.total;
    await page.evaluate(() => {
      if (document.body) document.body.focus();
    });
    const maxSteps = info.total + 3;
    for (let i = 0; i < maxSteps; i++) {
      await page.keyboard.press('Tab');
      const snap = await page.evaluate(focusSnapshotInPage);
      if (!snap || !snap.focused) break;
      out.focusChecked.push(snap.descriptor);
      const outlineVisible =
        snap.outlineStyle !== 'none' && parseFloat(snap.outlineWidth || '0') > 0;
      if (!outlineVisible) {
        out.focus.push({
          selector: snap.descriptor,
          reason: 'forced-colors altında odak göstergesi yok',
        });
      }
    }
  } finally {
    await page.close();
  }
  return out;
}

// --------------------------------------------------------------------------- #
// E22 — prefers-contrast: more (metin + UI kenarlık kontrastı)
// --------------------------------------------------------------------------- #

function contrastMoreAuditInPage(uiSelector) {
  const parseColor = (str) => {
    const m = String(str || '').match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map((s) => parseFloat(s.trim()));
    if (p.length < 3 || p.some((v) => Number.isNaN(v))) return null;
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const composite = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a),
    g: top.g * top.a + bottom.g * (1 - top.a),
    b: top.b * top.a + bottom.b * (1 - top.a),
    a: 1,
  });
  const luminance = (c) => {
    const lin = (v) => {
      const x = v / 255;
      return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  };
  const contrast = (a, b) => {
    const l1 = luminance(a);
    const l2 = luminance(b);
    const hi = Math.max(l1, l2);
    const lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
  };
  const describe = (el) => {
    let sel = el.tagName.toLowerCase();
    if (el.id) sel += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
    }
    return sel;
  };
  const effectiveBg = (el) => {
    const stack = [];
    let node = el.parentElement;
    while (node) {
      const c = parseColor(getComputedStyle(node).backgroundColor);
      if (c && c.a > 0) {
        stack.push(c);
        if (c.a >= 1) break;
      }
      node = node.parentElement;
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = stack.length - 1; i >= 0; i--) bg = composite(stack[i], bg);
    // Öğenin kendi zemini varsa onu da ekle.
    const own = parseColor(getComputedStyle(el).backgroundColor);
    if (own && own.a > 0) bg = composite(own.a >= 1 ? own : own, bg);
    return bg;
  };

  // @media (prefers-contrast: ...) kuralı tanımlı mı?
  let hasRule = false;
  try {
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      const walk = (list) => {
        for (const rule of Array.from(list || [])) {
          const txt = rule.cssText || '';
          const media = rule.media ? rule.media.mediaText : '';
          if (/prefers-contrast/i.test(media) || /prefers-contrast/i.test(txt)) {
            hasRule = true;
          }
          if (rule.cssRules) walk(rule.cssRules);
        }
      };
      walk(rules);
    }
  } catch {
    /* yut */
  }

  const text = [];
  for (const el of Array.from(document.querySelectorAll('body *'))) {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (
      !(r.width > 0 && r.height > 0) ||
      s.visibility === 'hidden' ||
      s.display === 'none'
    ) {
      continue;
    }
    let hasText = false;
    for (const n of Array.from(el.childNodes)) {
      if (n.nodeType === 3 && n.nodeValue && n.nodeValue.trim()) hasText = true;
    }
    if (!hasText) continue;
    const fg = parseColor(s.color);
    if (!fg) continue;
    const bg = effectiveBg(el);
    const opaque = fg.a >= 1 ? fg : composite(fg, bg);
    text.push({ selector: describe(el), ratio: contrast(opaque, bg) });
  }

  const ui = [];
  for (const el of Array.from(document.querySelectorAll(uiSelector))) {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (
      !(r.width > 0 && r.height > 0) ||
      s.visibility === 'hidden' ||
      s.display === 'none'
    ) {
      continue;
    }
    const neighbor = effectiveBg(el);
    let min = null;
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      const w = parseFloat(s['border' + side + 'Width'] || '0');
      const st = s['border' + side + 'Style'];
      if (!(w > 0) || st === 'none' || st === 'hidden') continue;
      const bc = parseColor(s['border' + side + 'Color']);
      if (!bc) continue;
      const opaque = bc.a >= 1 ? bc : composite(bc, neighbor);
      const ratio = contrast(opaque, neighbor);
      if (min === null || ratio < min) min = ratio;
    }
    if (min !== null) ui.push({ selector: describe(el), ratio: min });
  }

  return { hasRule, text, ui };
}

async function contrastMoreTest(context, url) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);
    return await page.evaluate(contrastMoreAuditInPage, UI_COMPONENT_SELECTOR);
  } finally {
    await page.close();
  }
}

// --------------------------------------------------------------------------- #
// E24 — dir=rtl geçişi (yatay taşma)
// --------------------------------------------------------------------------- #

async function rtlTest(context, url) {
  const page = await context.newPage();
  const result = { viewports: [], rtlOverflow: [] };
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(200);
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(120);
      const ltr = await page.evaluate(() => {
        const de = document.documentElement;
        return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth };
      });
      await page.evaluate(() => {
        document.documentElement.setAttribute('dir', 'rtl');
      });
      await page.waitForTimeout(120);
      const rtl = await page.evaluate(() => {
        const de = document.documentElement;
        return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth };
      });
      await page.evaluate(() => {
        document.documentElement.removeAttribute('dir');
      });
      result.viewports.push({ width, ltr, rtl });
      // RTL'e özgü taşma: rtl'de taşıyor ama ltr'de taşmıyor, ya da RTL daha geniş.
      const rtlScroll = rtl.scrollWidth > rtl.clientWidth;
      const ltrScroll = ltr.scrollWidth > ltr.clientWidth;
      if (rtlScroll && (!ltrScroll || rtl.scrollWidth > ltr.scrollWidth)) {
        result.rtlOverflow.push({
          viewport: width,
          rtl: rtl.scrollWidth,
          ltr: ltr.scrollWidth,
          clientWidth: rtl.clientWidth,
        });
      }
    }
  } finally {
    await page.close();
  }
  return result;
}

// --------------------------------------------------------------------------- #
// E25 — sahte yerelleştirme (%E25_expansion_ratio genişleme + aksan)
// --------------------------------------------------------------------------- #

function fakeLocalizeInPage(ratio) {
  const ACCENT_MAP = {
    a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', c: 'ç', s: 'ş', g: 'ğ', n: 'ñ',
    y: 'ý', z: 'ž', d: 'ð', t: 'ţ', r: 'ř',
    A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú', C: 'Ç', S: 'Ş', G: 'Ğ', N: 'Ñ',
    Y: 'Ý', Z: 'Ž', D: 'Ð', T: 'Ţ', R: 'Ř',
  };
  const accent = (str) =>
    str
      .split('')
      .map((ch) => (ACCENT_MAP[ch] !== undefined ? ACCENT_MAP[ch] : ch))
      .join('');
  let changed = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const value = node.nodeValue;
    if (!value || value.trim().length < 2) continue;
    const target = Math.ceil(value.length * ratio);
    let expanded = accent(value);
    while (expanded.length < target) expanded += '·';
    node.nodeValue = '[' + expanded + ']';
    changed++;
  }
  return changed;
}

function overflowAuditInPage() {
  const describe = (el) => {
    let sel = el.tagName.toLowerCase();
    if (el.id) sel += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
    }
    return sel;
  };
  const de = document.documentElement;
  const horizontalScroll = de.scrollWidth > de.clientWidth;
  const clipped = [];
  for (const el of Array.from(document.querySelectorAll('body *'))) {
    const s = getComputedStyle(el);
    const hidesX = s.overflowX === 'hidden' || s.overflowX === 'clip';
    const hidesY = s.overflowY === 'hidden' || s.overflowY === 'clip';
    if (!hidesX && !hidesY) continue;
    if (!el.textContent || el.textContent.trim().length === 0) continue;
    const overflowX =
      hidesX && el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0;
    const overflowY =
      hidesY && el.scrollHeight > el.clientHeight + 1 && el.clientHeight > 0;
    if (overflowX || overflowY) clipped.push(describe(el));
  }
  return { horizontalScroll, clipped };
}

async function expansionTest(context, url) {
  const page = await context.newPage();
  const result = { viewports: [], violations: [], horizontalScroll: false };
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(200);
    const baseline = new Map();
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(120);
      const b = await page.evaluate(overflowAuditInPage);
      baseline.set(width, b);
    }
    const changed = await page.evaluate(fakeLocalizeInPage, THRESHOLDS.E25_expansion_ratio);
    result.changed = changed;
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(120);
      const a = await page.evaluate(overflowAuditInPage);
      const b = baseline.get(width);
      const newScroll = a.horizontalScroll && !b.horizontalScroll;
      const baseClip = new Set(b.clipped);
      const newClip = a.clipped.filter((s) => !baseClip.has(s));
      result.viewports.push({ width, ...a });
      if (newScroll) {
        result.horizontalScroll = true;
        result.violations.push({ viewport: width, kind: 'yatay kaydırma' });
      }
      for (const s of newClip) {
        result.violations.push({ viewport: width, selector: s, kind: 'metin kırpılması' });
      }
    }
  } finally {
    await page.close();
  }
  return result;
}

// --------------------------------------------------------------------------- #
// E12 (genişleme) — reduce altında transform animasyonu / parallax
// --------------------------------------------------------------------------- #

async function motionReduceAuditInPage() {
  const out = { transformAnimations: [], parallax: [] };
  const describe = (el) => {
    let sel = el.tagName.toLowerCase();
    if (el.id) sel += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      sel += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
    }
    return sel;
  };
  for (const el of Array.from(document.querySelectorAll('*'))) {
    let anims = [];
    try {
      anims = el.getAnimations();
    } catch {
      anims = [];
    }
    for (const a of anims) {
      let frames = [];
      try {
        frames = a.effect.getKeyframes();
      } catch {
        frames = [];
      }
      const usesTransform = frames.some(
        (f) => f.transform && f.transform !== 'none'
      );
      if (usesTransform && a.playState === 'running') {
        out.transformAnimations.push({
          selector: describe(el),
          name: a.animationName || null,
        });
      }
    }
  }

  // Parallax: kaydırmada transform değişimi. scroll olayı asenkron işlendiği için
  // kısa bir bekleme ardından yeniden okunur.
  const els = Array.from(document.querySelectorAll('body *')).slice(0, 3000);
  const before = els.map((el) => getComputedStyle(el).transform);
  const y0 = window.scrollY;
  window.scrollTo(0, document.documentElement.scrollHeight);
  await new Promise((r) => setTimeout(r, 120));
  els.forEach((el, i) => {
    const t = getComputedStyle(el).transform;
    const b = before[i];
    if (t !== b && (t !== 'none' || b !== 'none')) {
      out.parallax.push({ selector: describe(el) });
    }
  });
  window.scrollTo(0, y0);
  return out;
}

async function motionAuditTest(context, url) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(300);
    return await page.evaluate(motionReduceAuditInPage);
  } finally {
    await page.close();
  }
}

// --------------------------------------------------------------------------- #
// E28 — başlık/bölge yapısı (erişilebilirlik ağacı)
// --------------------------------------------------------------------------- #

// ariaSnapshot() çıktısını satır bazında yorumlar. Satır biçimi:
//   - main:
//     - heading "Başlık" [level=1]
//     - button "Kaydet"
//     - link:
const ARIA_INTERACTIVE_ROLES = [
  'button', 'link', 'textbox', 'searchbox', 'checkbox', 'radio', 'combobox',
  'listbox', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option',
  'slider', 'spinbutton', 'switch', 'tab', 'treeitem',
];

// Diyalog kabukları kendi başlık hiyerarşisine sahiptir; alt ağaçlarındaki
// başlıklar sayfa h1 sayımına ve seviye-atlama kontrolüne katılmaz.
const DIALOG_ROLES = ['dialog', 'alertdialog'];

function parseAriaSnapshot(text) {
  const headings = [];
  const interactive = [];
  let mainCount = 0;
  const lines = String(text || '').split('\n');
  // Erişilebilirlik ağacı girinti ile iç içe geçer; diyalog alt ağacını
  // ayırt edebilmek için aktif rol yığınını girintiyle birlikte tutarız.
  const stack = [];
  for (const raw of lines) {
    const indent = (/^(\s*)/.exec(raw)[1] || '').length;
    const line = raw.replace(/^\s*-\s*/, '');
    const m = /^([a-zA-Z]+)\b(.*)$/.exec(line);
    if (!m) continue;
    const role = m[1].toLowerCase();
    const rest = m[2] || '';
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
    const inDialog = stack.some((s) => DIALOG_ROLES.includes(s.role));
    if (role === 'heading') {
      if (!inDialog) {
        const lm = /\[level=(\d+)\]/.exec(rest);
        headings.push({
          name: /"([^"]*)"/.exec(rest) ? /"([^"]*)"/.exec(rest)[1] : '',
          level: lm ? Number(lm[1]) : 0,
        });
      }
    } else if (role === 'main') {
      mainCount++;
    } else if (ARIA_INTERACTIVE_ROLES.includes(role)) {
      const named = /"[^"]*"/.test(rest);
      if (!named) {
        interactive.push({ role, line: raw.trim() });
      }
    }
    stack.push({ indent, role });
  }
  return { headings, interactive, mainCount };
}

function analyzeAriaStructure(text) {
  const parsed = parseAriaSnapshot(text);
  const violations = [];
  const h1s = parsed.headings.filter((h) => h.level === 1);
  if (h1s.length !== 1) {
    violations.push({
      kind: 'h1-count',
      detail: 'tam olarak bir h1 beklenirken ' + h1s.length + ' bulundu',
    });
  }
  let prev = 0;
  for (const h of parsed.headings) {
    if (h.level > prev + 1 && h.level > 0) {
      violations.push({
        kind: 'heading-skip',
        detail:
          'başlık seviyesi atlaması: h' + prev + " → h" + h.level +
          (h.name ? ' ("' + h.name + '")' : ''),
      });
    }
    prev = h.level;
  }
  if (parsed.mainCount < 1) {
    violations.push({ kind: 'main-missing', detail: 'main landmark bulunamadı' });
  } else if (parsed.mainCount > 1) {
    violations.push({
      kind: 'main-duplicate',
      detail: parsed.mainCount + ' main landmark bulundu (bir beklenir)',
    });
  }
  for (const item of parsed.interactive) {
    violations.push({
      kind: 'unnamed-interactive',
      detail: 'adı boş etkileşimli öğe: ' + item.role + ' (' + item.line + ')',
    });
  }
  return { violations, parsed };
}

async function ariaSnapshotTest(context, url) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);
    let text = null;
    let method = null;
    try {
      if (
        page.locator &&
        typeof page.locator === 'function' &&
        typeof page.locator('body').ariaSnapshot === 'function'
      ) {
        text = await page.locator('body').ariaSnapshot();
        method = 'ariaSnapshot';
      }
    } catch {
      text = null;
    }
    // Yedek yol yok: page.accessibility.snapshot() çıktısı ayrıştırılamadığı
    // için E28 sessizce geçmemeli; ariaSnapshot API yoksa ok:null döneriz.
    return { available: text !== null, snapshot: text, method };
  } finally {
    await page.close();
  }
}

// --aria-baseline: dosya yoksa oluştur, varsa satır farkı çıkar.
function computeAriaBaseline(snapshotText, baselinePath) {
  const result = { path: baselinePath, status: 'none', added: [], removed: [] };
  try {
    if (!fs.existsSync(baselinePath)) {
      fs.mkdirSync(path.dirname(path.resolve(baselinePath)), { recursive: true });
      fs.writeFileSync(baselinePath, snapshotText);
      result.status = 'baseline-created';
      return result;
    }
    const prev = fs.readFileSync(baselinePath, 'utf8');
    if (prev === snapshotText) {
      result.status = 'no-change';
      return result;
    }
    const prevLines = prev.split('\n');
    const nextLines = snapshotText.split('\n');
    const prevSet = new Set(prevLines);
    const nextSet = new Set(nextLines);
    result.added = nextLines.filter((l) => !prevSet.has(l));
    result.removed = prevLines.filter((l) => !nextSet.has(l));
    result.status = 'changed';
  } catch (err) {
    result.status = 'error';
    result.error = String(err && err.message ? err.message : err);
  }
  return result;
}

async function ariaBaselineTest(context, url, baselinePath) {
  const page = await context.newPage();
  const out = { available: false, method: null, path: baselinePath };
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);
    let text = null;
    try {
      if (
        page.locator &&
        typeof page.locator('body').ariaSnapshot === 'function'
      ) {
        text = await page.locator('body').ariaSnapshot();
        out.method = 'ariaSnapshot';
      }
    } catch {
      text = null;
    }
    if (text === null && page.accessibility && page.accessibility.snapshot) {
      text = JSON.stringify(await page.accessibility.snapshot(), null, 2);
      out.method = 'accessibility.snapshot';
    }
    if (text === null) return out;
    out.available = true;
    Object.assign(out, computeAriaBaseline(text, baselinePath));
  } finally {
    await page.close();
  }
  return out;
}

// --------------------------------------------------------------------------- #
// İsteğe bağlı ikinci motor: IBM Equal Access (yalnız uyarı katmanı)
// --------------------------------------------------------------------------- #

// Paket: accessibility-checker-engine (npm). Tarayıcıda `ace.js` enjekte edilir
// ve `new ace.Checker().check(document, ['IBM_Accessibility'])` çağrılır.
function resolveIbmEngine() {
  const dir = cacheDir();
  const entry = path.join(dir, 'node_modules', 'accessibility-checker-engine', 'ace.js');
  return fs.existsSync(entry) ? entry : null;
}

function installIbmEngine() {
  const dir = cacheDir();
  fs.mkdirSync(dir, { recursive: true });
  installDeps(['ibm'], dir);
}

async function ibmEngineTest(context, url) {
  const entry = resolveIbmEngine();
  if (!entry) {
    if (process.env.FEZA_UI_CHECK_NO_INSTALL === '1') {
      return {
        status: 'n/a',
        reason:
          'accessibility-checker-engine kurulu değil ve FEZA_UI_CHECK_NO_INSTALL=1',
      };
    }
    try {
      installIbmEngine();
    } catch (err) {
      return {
        status: 'n/a',
        reason:
          'accessibility-checker-engine kurulamadı: ' +
          String(err && err.message ? err.message : err),
      };
    }
  }
  const src = resolveIbmEngine();
  if (!src) {
    return { status: 'n/a', reason: 'accessibility-checker-engine ace.js bulunamadı' };
  }
  let aceSrc;
  try {
    aceSrc = fs.readFileSync(src, 'utf8');
  } catch (err) {
    return {
      status: 'n/a',
      reason: 'ace.js okunamadı: ' + String(err && err.message ? err.message : err),
    };
  }
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);
    await page.addScriptTag({ content: aceSrc });
    const { results, summary } = await page.evaluate(async () => {
      /* global ace */
      const checker = new ace.Checker();
      const r = await checker.check(document, ['IBM_Accessibility']);
      return {
        results: r.results || [],
        summary:
          (r.report && r.report.summary && r.report.summary.counts) || null,
      };
    });
    // value = [level, status]; yalnız level=VIOLATION ve status=FAIL gerçek ihlaldir.
    const violations = results
      .filter(
        (x) =>
          Array.isArray(x.value) && x.value[0] === 'VIOLATION' && x.value[1] === 'FAIL'
      )
      .map((x) => ({
        ruleId: x.ruleId,
        path: x.path ? x.path.dom : null,
        message: x.message,
        snippet: x.snippet,
      }));
    const recommendations = results.filter(
      (x) =>
        Array.isArray(x.value) &&
        (x.value[0] === 'RECOMMENDATION' ||
          x.value[0] === 'WARNING' ||
          x.value[1] === 'POTENTIAL')
    ).length;
    return {
      status: 'ok',
      version: 'accessibility-checker-engine@' + ibmEngineVersion(),
      violations,
      violationCount: summary ? summary.violation : violations.length,
      counts: summary,
      otherFindings: recommendations,
      rulesChecked: results.length,
    };
  } catch (err) {
    return {
      status: 'n/a',
      reason: 'IBM motoru çalıştırılamadı: ' + String(err && err.message ? err.message : err),
    };
  } finally {
    await page.close();
  }
}

function ibmEngineVersion() {
  const pkg = path.join(
    cacheDir(),
    'node_modules',
    'accessibility-checker-engine',
    'package.json'
  );
  try {
    return JSON.parse(fs.readFileSync(pkg, 'utf8')).version || 'unknown';
  } catch {
    return 'unknown';
  }
}

// --------------------------------------------------------------------------- #
// İsteğe bağlı görsel karşılaştırma (pixelmatch + pngjs)
// --------------------------------------------------------------------------- #

function installVisualDeps() {
  const dir = cacheDir();
  fs.mkdirSync(dir, { recursive: true });
  installDeps(['visual'], dir);
}

async function loadVisualDeps() {
  let pixelmatchMod = await loadOptionalDep('pixelmatch');
  let pngjsMod = await loadOptionalDep('pngjs');
  if (!pixelmatchMod || !pngjsMod) {
    if (process.env.FEZA_UI_CHECK_NO_INSTALL === '1') {
      return { status: 'n/a', reason: 'pixelmatch/pngjs yok ve FEZA_UI_CHECK_NO_INSTALL=1' };
    }
    try {
      installVisualDeps();
    } catch (err) {
      return {
        status: 'n/a',
        reason:
          'pixelmatch/pngjs kurulamadı: ' +
          String(err && err.message ? err.message : err),
      };
    }
    pixelmatchMod = await loadOptionalDep('pixelmatch');
    pngjsMod = await loadOptionalDep('pngjs');
  }
  if (!pixelmatchMod || !pngjsMod) {
    return { status: 'n/a', reason: 'pixelmatch/pngjs yüklenemedi' };
  }
  const pixelmatch =
    pixelmatchMod.default || pixelmatchMod.pixelmatch || pixelmatchMod;
  const PNG = pngjsMod.PNG || (pngjsMod.default && pngjsMod.default.PNG);
  if (typeof pixelmatch !== 'function' || !PNG) {
    return { status: 'n/a', reason: 'pixelmatch/PNG API bulunamadı' };
  }
  return { status: 'ok', pixelmatch, PNG };
}

// Tek ekran görüntüsünü baseline ile karşılaştırır; baseline yoksa oluşturur.
function compareVisualPair({ pixelmatch, PNG, shotPath, baselinePath, diffPath, maxDiffPixels }) {
  if (!fs.existsSync(baselinePath)) {
    fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
    fs.copyFileSync(shotPath, baselinePath);
    return { status: 'baseline-created', diffPixels: 0 };
  }
  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(shotPath));
  if (img1.width !== img2.width || img1.height !== img2.height) {
    return {
      status: 'size-mismatch',
      baseline: { w: img1.width, h: img1.height },
      current: { w: img2.width, h: img2.height },
      diffPixels: null,
      ok: false,
    };
  }
  const diff = new PNG({ width: img1.width, height: img1.height });
  const diffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    img1.width,
    img1.height,
    { threshold: 0.1 }
  );
  if (diffPixels > 0) {
    fs.mkdirSync(path.dirname(diffPath), { recursive: true });
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
  }
  return {
    status: diffPixels === 0 ? 'identical' : 'different',
    diffPixels,
    ok: diffPixels <= maxDiffPixels,
  };
}

async function runVisualComparison(report, outDir, baselineDir, maxDiffPixels) {
  const deps = await loadVisualDeps();
  if (deps.status !== 'ok') {
    return { status: 'n/a', reason: deps.reason };
  }
  const results = [];
  let anyFail = false;
  const passes = report.passes || [];
  for (const pass of passes) {
    if (!pass.screenshot) continue;
    const shotPath = path.join(outDir, pass.screenshot);
    const baselinePath = path.join(baselineDir, pass.screenshot);
    const diffName = 'diff-' + pass.name + '-' + pass.viewport + '.png';
    const diffPath = path.join(outDir, diffName);
    let cmp;
    try {
      cmp = compareVisualPair({
        pixelmatch: deps.pixelmatch,
        PNG: deps.PNG,
        shotPath,
        baselinePath,
        diffPath,
        maxDiffPixels,
      });
    } catch (err) {
      cmp = {
        status: 'error',
        error: String(err && err.message ? err.message : err),
      };
    }
    if (cmp.ok === false) anyFail = true;
    results.push({
      pass: pass.name,
      viewport: pass.viewport,
      baseline: path.relative(outDir, baselinePath).split(path.sep).join('/'),
      diff: cmp.diffPixels ? diffName : null,
      ...cmp,
    });
  }
  return {
    status: 'ok',
    baselineDir,
    maxDiffPixels,
    results,
    // Bilgi amaçlı; çıkış kodunu bozmaz.
    anyFail,
  };
}

// --------------------------------------------------------------------------- #
// Statik mod — tarayıcı açmadan kaynak taraması (E23, E24 statik, E26, E27)
// --------------------------------------------------------------------------- #

const STATIC_SCAN_EXTS = new Set([
  '.html', '.htm', '.css', '.js', '.mjs', '.cjs', '.jsx', '.tsx', '.ts', '.vue', '.svelte',
]);
const STATIC_SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', 'out', 'coverage', '.next', '.nuxt', '.cache', '__pycache__',
]);

function stripComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');
}

function walkSourceFiles(dir) {
  const files = [];
  const walk = (d) => {
    let entries;
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.isDirectory()) {
        if (STATIC_SKIP_DIRS.has(e.name)) continue;
        if (e.name.startsWith('.')) continue;
        walk(path.join(d, e.name));
      } else if (e.isFile()) {
        if (!STATIC_SCAN_EXTS.has(path.extname(e.name).toLowerCase())) continue;
        if (/\.min\./.test(e.name)) continue;
        files.push(path.join(d, e.name));
      }
    }
  };
  walk(dir);
  return files;
}

function relPath(root, file) {
  return path.relative(root, file).split(path.sep).join('/');
}

// Alpha bileşeni 1'den küçük mü? ("0.5", ".5", "50%" biçimleri desteklenir.)
function alphaBelow1(raw) {
  if (!raw) return false;
  const tok = raw.trim();
  if (!tok) return false;
  if (tok.endsWith('%')) {
    const a = parseFloat(tok) / 100;
    return Number.isFinite(a) && a < 1;
  }
  const a = parseFloat(tok);
  return Number.isFinite(a) && a < 1;
}

// Zemin değerinde alpha<1 olan bir renk var mı? Yalnız 4 bileşenli
// (alpha içeren) rgba()/hsla() ve eğik çizgili (/) rgb()/hsl() biçimleri
// yarı saydam sayılır; son kanalı 0 olan opak rgb(255,0,0) gibi değerler sayılmaz.
function hasTransparentBackground(body) {
  const bgRe = /background(?:-color)?\s*:\s*([^;}]+)/gi;
  let bg;
  while ((bg = bgRe.exec(body)) !== null) {
    const val = bg[1];
    const fnRe = /\b(rgba?|hsla?)\(([^)]*)\)/gi;
    let f;
    while ((f = fnRe.exec(val)) !== null) {
      const inner = f[2];
      if (inner.includes('/')) {
        const aTok = inner.split('/')[1];
        if (aTok && alphaBelow1(aTok.trim().split(/\s+/).pop())) return true;
      }
      const parts = inner.split(',').map((s) => s.trim()).filter(Boolean);
      if (parts.length >= 4 && alphaBelow1(parts[parts.length - 1])) return true;
    }
  }
  return false;
}

function normalizeSelector(sel) {
  return sel.trim().replace(/\s+/g, ' ');
}

function selectorParts(sel) {
  return sel.split(',').map(normalizeSelector).filter(Boolean);
}

// Blok öncesi metinden asıl CSS seçiciyi ayıklar: önceki kural/@media
// kalıntılarını ve HTML başlığını (ilk blok) atar.
function extractSelector(block) {
  let before = block.slice(0, block.indexOf('{'));
  before = before.slice(before.lastIndexOf('{') + 1);
  before = before.slice(before.lastIndexOf('}') + 1);
  if (before.includes('<')) {
    const gt = before.lastIndexOf('>');
    if (gt !== -1) before = before.slice(gt + 1);
  }
  return normalizeSelector(before);
}

// @media (prefers-reduced-transparency: reduce) bloklarındaki opak yedek
// seçicilerini toplar; karşılaştırma seçici bazındadır (global değil).
function extractReducedTransparencySelectors(text) {
  const set = new Set();
  const markerRe = /@media[^{]*prefers-reduced-transparency\s*:\s*reduce[^{]*\{/gi;
  let m;
  while ((m = markerRe.exec(text)) !== null) {
    const start = markerRe.lastIndex;
    let depth = 1;
    let i = start;
    while (i < text.length && depth > 0) {
      const ch = text[i];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      i++;
    }
    const inner = text.slice(start, i - 1);
    for (const block of inner.match(/[^{}]+\{[^{}]*\}/g) || []) {
      const sel = extractSelector(block);
      for (const p of selectorParts(sel)) set.add(p);
    }
  }
  return set;
}

function scanE23(files, root) {
  const candidates = [];
  const fallbackSelectors = new Set();
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const text = stripComments(raw);
    // Yorumlardaki "prefers-reduced-transparency" atıfları yedeği saymaz;
    // yalnız gerçek CSS kuralı (yorumdan arındırılmış metin) yedek kabul edilir.
    for (const s of extractReducedTransparencySelectors(text)) fallbackSelectors.add(s);
    // Yarı saydam zemin / backdrop-filter içeren seçici bloklarını yakala.
    const blocks = text.match(/[^{}]+\{[^{}]*\}/g) || [];
    for (const block of blocks) {
      const body = block.slice(block.indexOf('{') + 1);
      const backdrop = /(?:-webkit-)?backdrop-filter\s*:\s*(?!none\b)[^;}]+/i.test(body);
      const semiTransparent = hasTransparentBackground(body);
      if (backdrop || semiTransparent) {
        candidates.push({ file: relPath(root, file), selector: extractSelector(block) });
      }
    }
  }
  // Yedek seçici bazında aranır: aday seçicinin kendi opak yedeği yoksa ihlaldir.
  const violations = candidates.filter((c) =>
    !selectorParts(c.selector).some((p) => fallbackSelectors.has(p))
  );
  const warnings = candidates.map((c) => ({
    file: c.file,
    selector: c.selector,
    reason: 'saydam/blur yüzey üstü metnin en kötü zemine göre kontrastı elle doğrulanmalı (≥ 4.5:1)',
  }));
  return {
    candidates,
    hasReducedTransparency: fallbackSelectors.size > 0,
    violations,
    warnings,
  };
}

function scanE24Static(files, root) {
  const findings = [];
  const push = (file, line, rule, suggestion) =>
    findings.push({ file: relPath(root, file), line, rule, suggestion });
  for (const file of files) {
    const text = stripComments(fs.readFileSync(file, 'utf8'));
    text.split('\n').forEach((raw, i) => {
      const line = i + 1;
      if (/\b(margin|padding|border)-(left|right)\s*:/.test(raw)) {
        push(file, line, raw.trim(), 'margin-inline / padding-inline / border-inline kullan');
      }
      if (/(^|[;{\s])(left|right)\s*:/.test(raw) && !/-(left|right)\s*:/.test(raw)) {
        push(file, line, raw.trim(), 'inset-inline-start / inset-inline-end kullan');
      }
      if (/text-align\s*:\s*(left|right)\b/.test(raw)) {
        push(file, line, raw.trim(), 'text-align: start / end kullan');
      }
      if (/\bfloat\s*:\s*(left|right)\b/.test(raw)) {
        push(file, line, raw.trim(), 'mantıksal akış / flex kullan');
      }
    });
  }
  return findings;
}

function scanE26(files, root) {
  const violations = [];
  for (const file of files) {
    const text = stripComments(fs.readFileSync(file, 'utf8'));
    text.split('\n').forEach((raw, i) => {
      if (/text-transform\s*:\s*(uppercase|lowercase)\b/.test(raw)) {
        violations.push({
          file: relPath(root, file),
          line: i + 1,
          rule: raw.trim(),
          suggestion: 'Türkçe i/İ için metni doğrudan yerelleştirilmiş hâliyle yaz; uppercase/lowercase dönüşümü yapma',
        });
      }
      // Lookbehind yok: `toLocaleUpperCase(` deseni zaten \.toUpperCase\s*\( ile eşleşmez,
      // bu yüzden `userLocale.toUpperCase()` gibi adlar da doğru biçimde yakalanır.
      if (/\.toUpperCase\s*\(/.test(raw) || /\.toLowerCase\s*\(/.test(raw)) {
        violations.push({
          file: relPath(root, file),
          line: i + 1,
          rule: raw.trim(),
          suggestion: "toLocaleUpperCase('tr-TR') / toLocaleLowerCase('tr-TR') kullan",
        });
      }
    });
  }
  return violations;
}

function scanE27(files, root) {
  const violations = [];
  for (const file of files) {
    const text = stripComments(fs.readFileSync(file, 'utf8'));
    text.split('\n').forEach((raw, i) => {
      const line = i + 1;
      if (/\.toFixed\s*\(/.test(raw) && /(TL|₺|%|\$|€|USD|EUR|TRY)/.test(raw)) {
        violations.push({
          file: relPath(root, file),
          line,
          rule: raw.trim(),
          suggestion: 'Intl.NumberFormat kullan (style: currency/percent)',
        });
      }
      if (/["'`]\s*(?:TL|₺)\s*["'`]/.test(raw) || /\+\s*["'`][^"'`]*\bTL\b[^"'`]*["'`]/.test(raw)) {
        violations.push({
          file: relPath(root, file),
          line,
          rule: raw.trim(),
          suggestion: 'Para birimini elle birleştirme; Intl.NumberFormat kullan',
        });
      }
      if (/\bdd[./]MM[./]yyyy\b|\bMM[./]dd[./]yyyy\b|\bGG[./]AA[./]YYYY\b/.test(raw)) {
        violations.push({
          file: relPath(root, file),
          line,
          rule: raw.trim(),
          suggestion: 'Sabit tarih deseni yerine Intl.DateTimeFormat kullan',
        });
      }
    });
  }
  return violations;
}

function runStatic(dir) {
  const root = path.resolve(dir);
  if (!fs.existsSync(root)) throw new InputError('Statik dizin bulunamadı: ' + root);
  const files = walkSourceFiles(root);
  const startedAt = new Date().toISOString();

  const e23 = scanE23(files, root);
  const e24 = scanE24Static(files, root);
  const e26 = scanE26(files, root);
  const e27 = scanE27(files, root);

  const results = {};
  results.E23 = {
    ok: e23.violations.length === 0,
    value: e23.violations.length,
    threshold: THRESHOLDS.E23_text_contrast_min,
    method: 'karma',
    violations: e23.violations,
    warnings: e23.warnings,
    hasReducedTransparency: e23.hasReducedTransparency,
    na: e23.candidates.length === 0 ? 'saydam/blur yüzey bulunamadı' : undefined,
  };
  results.E24 = {
    ok: true,
    value: e24.length,
    threshold: null,
    method: 'statik',
    static: e24,
    warnings: e24,
    na: e24.length
      ? 'fiziksel yön özellikleri bulundu (bilgi); dinamik RTL geçişi tarayıcı modu ile ölçülür'
      : 'fiziksel yön özelliği bulunamadı',
  };
  results.E26 = {
    ok: e26.length === 0,
    value: e26.length,
    threshold: 0,
    method: 'statik',
    violations: e26,
  };
  results.E27 = {
    ok: e27.length === 0,
    value: e27.length,
    threshold: 0,
    method: 'statik',
    violations: e27,
  };

  const report = {
    target: dir,
    mode: 'static',
    startedAt,
    thresholds: THRESHOLDS,
    scannedFiles: files.length,
    results,
    ok: !Object.values(results).some((r) => r.ok === false),
  };
  return report;
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
    method: 'otomatik',
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
    method: 'otomatik',
    violations: e2Nodes,
  };

  // E3: UI bileşeni kontrastı — getComputedStyle ile kenarlık/dolgu/ikon
  // çiftleri; oran yuvarlanmaz, 2.999 FAIL.
  const e3Violations = [];
  const e3Skipped = [];
  let e3Min = null;
  for (const pass of report.passes) {
    const ui = pass.uiContrast || { results: [], icons: [], skipped: [] };
    for (const s of ui.skipped || []) e3Skipped.push(s);
    for (const comp of ui.results || []) {
      if (e3Min === null || comp.ratio < e3Min) e3Min = comp.ratio;
      if (comp.ratio < THRESHOLDS.E3_ui_contrast_min) {
        e3Violations.push({
          selector: comp.selector,
          ratio: comp.ratio,
          part: comp.part,
          viewport: pass.viewport,
        });
      }
    }
    for (const icon of ui.icons || []) {
      if (e3Min === null || icon.ratio < e3Min) e3Min = icon.ratio;
      if (icon.ratio < THRESHOLDS.E3_ui_contrast_min) {
        e3Violations.push({
          selector: icon.selector,
          ratio: icon.ratio,
          part: icon.part,
          viewport: pass.viewport,
        });
      }
    }
  }
  results.E3 = {
    ok: e3Violations.length === 0,
    value: e3Min === null ? null : e3Min,
    threshold: THRESHOLDS.E3_ui_contrast_min,
    method: 'otomatik',
    violations: e3Violations,
    skipped: e3Skipped,
    na: e3Min === null ? 'ölçülebilir UI bileşeni sınırı/dolgu/ikon bulunamadı' : undefined,
  };

  // E4: dokunma hedefleri (E15 aralık istisnası ile ilişkili)
  // Önce E15: 24 px altı hedeflerin aralık istisnasını sağlayıp sağlamadığı.
  const e15Violations = [];
  const e15Excepted = new Map(); // viewport -> Set(selector)
  for (const pass of report.passes) {
    const targets = pass.targets || [];
    const small = targets.filter(
      (t) => !t.inline && (t.w < THRESHOLDS.E15_target_spacing_px || t.h < THRESHOLDS.E15_target_spacing_px)
    );
    const excepted = new Set();
    const r = THRESHOLDS.E15_target_spacing_px / 2;
    for (const a of small) {
      let intersects = false;
      for (const b of targets) {
        if (b === a) continue;
        if (b.left === undefined) continue;
        // Dairenin merkezi (a.cx,a.cy); B dikdörtgeniyle kesişim.
        const nearestX = Math.max(b.left, Math.min(a.cx, b.left + b.w));
        const nearestY = Math.max(b.top, Math.min(a.cy, b.top + b.h));
        const dx = a.cx - nearestX;
        const dy = a.cy - nearestY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const bSmall =
          b.w < THRESHOLDS.E15_target_spacing_px || b.h < THRESHOLDS.E15_target_spacing_px;
        let hit = dist < r;
        if (!hit && bSmall) {
          const cdx = a.cx - b.cx;
          const cdy = a.cy - b.cy;
          if (Math.sqrt(cdx * cdx + cdy * cdy) < THRESHOLDS.E15_target_spacing_px) hit = true;
        }
        if (hit) {
          intersects = true;
          break;
        }
      }
      if (intersects) {
        e15Violations.push({
          selector: a.selector,
          w: a.w,
          h: a.h,
          viewport: pass.viewport,
          reason: '24 px aralık istisnası sağlanmıyor',
        });
      } else {
        excepted.add(a.selector);
      }
    }
    e15Excepted.set(pass.viewport, excepted);
  }

  const targetViolations = [];
  for (const pass of report.passes) {
    const excepted = e15Excepted.get(pass.viewport) || new Set();
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
        if (excepted.has(t.selector)) continue; // E15 istisnası sağlandı
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
    const excepted = e15Excepted.get(pass.viewport) || new Set();
    pass.targets = pass.targets.map((t) => ({
      ...t,
      excepted: excepted.has(t.selector),
      ok:
        t.inline ||
        ((!t.primary ||
          (t.w >= THRESHOLDS.E4_primary_target_min_px &&
            t.h >= THRESHOLDS.E4_primary_target_min_px)) &&
          (excepted.has(t.selector) ||
            (t.w >= THRESHOLDS.E4_any_target_min_px &&
              t.h >= THRESHOLDS.E4_any_target_min_px))),
    }));
  });
  results.E4 = {
    ok: targetViolations.length === 0,
    value: targetViolations.length,
    threshold: THRESHOLDS.E4_any_target_min_px,
    method: 'otomatik',
    violations: targetViolations,
  };

  // E15: hedef aralığı istisnası
  results.E15 = {
    ok: e15Violations.length === 0,
    value: e15Violations.length,
    threshold: THRESHOLDS.E15_target_spacing_px,
    method: 'otomatik',
    violations: e15Violations,
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
    method: 'otomatik',
    violations: scrollViolations,
  };

  // E6: görünür odak
  const kb = report.keyboard || { visibleFocusIssues: [] };
  results.E6 = {
    ok: (kb.visibleFocusIssues || []).length === 0,
    value: (kb.visibleFocusIssues || []).length,
    threshold: THRESHOLDS.E6_visible_focus,
    method: 'otomatik',
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
    method: 'otomatik',
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
    method: 'otomatik',
    violations: e8Nodes,
  };

  // E9-E11, E19-E21, E24, E26-E29: statik kriterler (script ölçmez).
  results.E9 = { ok: null, value: null, threshold: null, method: 'statik', na: 'ekran başına birincil eylem elle incelenir' };
  results.E10 = { ok: null, value: null, threshold: null, method: 'statik', na: 'görev derinliği elle incelenir' };
  results.E11 = { ok: null, value: null, threshold: null, method: 'statik', na: 'durum kapsaması elle incelenir' };
  results.E19 = { ok: null, value: null, threshold: null, method: 'statik', na: 'tekrar giriş elle incelenir' };
  results.E20 = { ok: null, value: null, threshold: null, method: 'statik', na: 'tutarlı yardım elle incelenir' };
  results.E23 = { ok: null, value: null, threshold: THRESHOLDS.E23_text_contrast_min, method: 'karma', na: 'saydam yüzey denetimi statik modda (--static) yapılır' };
  results.E26 = { ok: null, value: null, threshold: null, method: 'statik', na: 'Türkçe büyük/küçük harf elle incelenir (--static ile taranır)' };
  results.E27 = { ok: null, value: null, threshold: null, method: 'statik', na: 'yerel biçim elle incelenir (--static ile taranır)' };
  results.E29 = { ok: null, value: null, threshold: null, method: 'statik', na: 'eşit belirginlik elle incelenir' };

  // E12: hareket — reduce altında transform tabanlı animasyon/parallax yok.
  const motion = report.motion || {};
  const maxAnim = (motion.maxAnimation && motion.maxAnimation.value) || 0;
  const maxTrans = (motion.maxTransition && motion.maxTransition.value) || 0;
  const animFail = maxAnim > THRESHOLDS.E12_max_animation_s;
  const transFail = maxTrans > THRESHOLDS.E12_max_transition_s;
  const motionAudit = report.motionAudit || {};
  const transformAnims = motionAudit.transformAnimations || [];
  const parallax = motionAudit.parallax || [];
  const transformFail = transformAnims.length > 0 || parallax.length > 0;
  results.E12 = {
    ok: !animFail && !transFail && !transformFail,
    value: Math.max(maxAnim, maxTrans),
    threshold: THRESHOLDS.E12_max_transition_s,
    method: 'otomatik',
    violations: {
      animation: animFail ? motion.maxAnimation : null,
      transition: transFail ? motion.maxTransition : null,
      transformAnimations: transformAnims,
      parallax,
    },
  };

  // E13: metin büyütme
  const clipped = (report.zoom && report.zoom.clipped) || [];
  results.E13 = {
    ok: !(report.zoom && report.zoom.horizontalScroll) && clipped.length === 0,
    value: clipped.length + (report.zoom && report.zoom.horizontalScroll ? 1 : 0),
    threshold: THRESHOLDS.E13_zoom_percent,
    method: 'otomatik',
    violations: clipped,
  };

  // E14: odak örtülmesi
  const obscured = kb.focusObscured || [];
  const partial = kb.focusPartial || [];
  results.E14 = {
    ok: obscured.length === 0,
    value: obscured.length,
    threshold: THRESHOLDS.E14_focus_obscured_points,
    method: 'otomatik',
    violations: obscured,
    partial,
  };

  // E16: metin aralığına dayanıklılık
  const ts = report.textSpacing || {};
  const tsv = ts.violations || [];
  results.E16 = {
    ok: tsv.length === 0 && !ts.horizontalScroll,
    value: tsv.length + (ts.horizontalScroll ? 1 : 0),
    threshold: THRESHOLDS.E16_line_height,
    method: 'otomatik',
    violations: tsv,
  };

  // E17: erişilebilir kimlik doğrulama (karma)
  const auth = report.auth || {};
  if (!auth.present) {
    results.E17 = {
      ok: null,
      value: null,
      threshold: null,
      method: 'karma',
      na: 'sayfada parola/OTP alanı yok',
    };
  } else {
    const autocompleteIssues = auth.autocompleteIssues || [];
    const pasteIssues = auth.pasteIssues || [];
    const failed = autocompleteIssues.length + pasteIssues.length;
    results.E17 = {
      ok: failed === 0,
      value: failed,
      threshold: 0,
      method: 'karma',
      violations: { pasteIssues, autocompleteIssues },
      warnings: auth.showWarnings || [],
    };
  }

  // E18: sürükleme (karma; onay statik)
  const drag = report.drag || {};
  const dragCandidates = (drag.candidates || []).length + (drag.draggables || []).length;
  if (dragCandidates === 0) {
    results.E18 = { ok: true, value: 0, threshold: null, method: 'karma', candidates: [] };
  } else {
    results.E18 = {
      ok: null,
      value: dragCandidates,
      threshold: null,
      method: 'karma',
      candidates: drag.candidates || [],
      draggables: drag.draggables || [],
      na: 'sürükleme işleyicileri bulundu; tek işaretçi alternatifi elle doğrulanmalı',
    };
  }

  // E21 — forced-colors: etkileşimli öğe sınırı + odak göstergesi.
  const fc = report.forcedColors || {};
  if (fc.emulation === false) {
    results.E21 = {
      ok: null,
      value: null,
      threshold: null,
      method: 'otomatik',
      na: 'forced-colors emülasyonu desteklenmiyor',
    };
  } else {
    const fcBoundary = fc.boundary || [];
    const fcFocus = fc.focus || [];
    results.E21 = {
      ok: fcBoundary.length === 0 && fcFocus.length === 0,
      value: fcBoundary.length + fcFocus.length,
      threshold: 0,
      method: 'otomatik',
      violations: { boundary: fcBoundary, focus: fcFocus },
      skipped: fc.skipped || [],
      total: fc.total || 0,
      na: (fc.total || 0) === 0 ? 'etkileşimli öğe bulunamadı' : undefined,
    };
  }

  // E22 — prefers-contrast: more: metin ≥ E22_text_contrast_min, kenarlık ≥ E22_ui_contrast_min.
  const cm = report.contrastMore || {};
  if (cm.emulation === false) {
    results.E22 = {
      ok: null,
      value: null,
      threshold: THRESHOLDS.E22_text_contrast_min,
      method: 'otomatik',
      na: 'prefers-contrast emülasyonu desteklenmiyor',
    };
  } else if (cm.hasRule === false) {
    results.E22 = {
      ok: null,
      value: null,
      threshold: THRESHOLDS.E22_text_contrast_min,
      method: 'otomatik',
      na: 'prefers-contrast kuralı yok',
    };
  } else {
    const textViol = (cm.text || []).filter(
      (t) => t.ratio < THRESHOLDS.E22_text_contrast_min
    );
    const uiViol = (cm.ui || []).filter(
      (u) => u.ratio < THRESHOLDS.E22_ui_contrast_min
    );
    results.E22 = {
      ok: textViol.length === 0 && uiViol.length === 0,
      value: textViol.length + uiViol.length,
      threshold: THRESHOLDS.E22_text_contrast_min,
      method: 'otomatik',
      violations: { text: textViol, ui: uiViol },
    };
  }

  // E24 — RTL: dir=rtl geçişinde yatay taşma yok (fiziksel yön statik modda).
  const rtl = report.rtl || {};
  if (rtl.emulation === false) {
    results.E24 = {
      ok: null,
      value: null,
      threshold: null,
      method: 'otomatik',
      na: 'RTL geçişi uygulanamadı',
    };
  } else {
    const overflow = rtl.rtlOverflow || [];
    results.E24 = {
      ok: overflow.length === 0,
      value: overflow.length,
      threshold: 0,
      method: 'otomatik',
      violations: overflow,
    };
  }

  // E25 — sahte yerelleştirme: %30 genişlemede yatay kaydırma/kırpma yok.
  const exp = report.expansion || {};
  if (exp.emulation === false) {
    results.E25 = {
      ok: null,
      value: null,
      threshold: THRESHOLDS.E25_expansion_ratio,
      method: 'otomatik',
      na: 'metin genişlemesi uygulanamadı',
    };
  } else {
    const violations = exp.violations || [];
    results.E25 = {
      ok: violations.length === 0 && !exp.horizontalScroll,
      value: violations.length,
      threshold: THRESHOLDS.E25_expansion_ratio,
      method: 'otomatik',
      violations,
    };
  }

  // E28 — başlık/bölge yapısı (erişilebilirlik ağacı).
  const aria = report.ariaStructure || {};
  if (!aria.available) {
    results.E28 = {
      ok: null,
      value: null,
      threshold: null,
      method: 'otomatik',
      na: 'ariaSnapshot API yok',
    };
  } else {
    const violations = aria.violations || [];
    results.E28 = {
      ok: violations.length === 0,
      value: violations.length,
      threshold: 0,
      method: 'otomatik',
      violations,
      method_detail: aria.method || null,
    };
  }

  return results;
}

// --------------------------------------------------------------------------- #
// Rapor yazma / konsol özeti
// --------------------------------------------------------------------------- #

function printSummary(report) {
  const lines = [];
  lines.push('UI doğrulama raporu — ' + report.target);
  lines.push('İhlal sütunu: FAIL olan E kodlarında bulgu sayısı.');
  const order = [
    'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12',
    'E13', 'E14', 'E15', 'E16', 'E17', 'E18', 'E19', 'E20', 'E21', 'E22', 'E23',
    'E24', 'E25', 'E26', 'E27', 'E28', 'E29',
  ];
  for (const code of order) {
    const r = report.results[code];
    if (!r) continue;
    const status = r.ok === null ? 'N/A ' : r.ok ? 'OK  ' : 'FAIL';
    const value = r.value === null || r.value === undefined ? '-' : String(r.value);
    lines.push(
      '  ' + status + ' ' + code.padEnd(4) + ' ihlal: ' + value.padEnd(4) +
        ' eşik: ' + (r.threshold === null ? '-' : r.threshold) + ' [' + r.method + ']'
    );
  }
  if (report.profile) {
    lines.push(
      'Profil: ' + report.profile.applied + ' (istenen: ' + report.profile.requested + ')' +
        (report.profile.fallbackReason ? ' — ' + report.profile.fallbackReason : '')
    );
    if (report.profile.axeVersion) {
      lines.push('axe-core: ' + report.profile.axeVersion);
    }
  }
  if (report.visual && report.visual.status === 'ok') {
    const diffs = (report.visual.results || []).filter(
      (r) => r.diffPixels && r.diffPixels > report.visual.maxDiffPixels
    ).length;
    lines.push('Görsel karşılaştırma: ' + diffs + ' geçiş eşiği aştı (bilgi).');
  }
  lines.push('Genel: ' + (report.ok ? 'OK' : 'FAIL'));
  if (report.__outDir) {
    lines.push('report.json: ' + path.join(report.__outDir, 'report.json'));
  }
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

  // Statik mod: tarayıcı açmadan kaynak taraması (E23, E24 fiziksel, E26, E27).
  if (args.static) {
    try {
      const outDir = makeOutDir(args.out);
      const report = runStatic(args.target);
      report.__outDir = outDir;
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
      if (err instanceof InputError) fatal(2, 'Girdi hatası: ' + err.message);
      fatal(2, 'Beklenmeyen hata: ' + (err && err.stack ? err.stack : err));
    }
    return;
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

    const optionalDeps = [];
    if (args.engines.includes('ibm')) optionalDeps.push('ibm');
    if (args.visual) optionalDeps.push('visual');

    let deps;
    try {
      deps = await loadDeps(optionalDeps);
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

    // Profil çözümleme: axe etiketleri ve EN-301-549 desteği.
    const profile = resolveProfile(args.profile, deps.axeCore);

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
      { colorScheme: 'light', reducedMotion: 'no-preference', axeTags: profile.tags }
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
      { colorScheme: 'dark', reducedMotion: 'reduce', axeTags: profile.tags }
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

    // E16 — metin aralığına dayanıklılık (kendi açık tema context'i).
    let textSpacing;
    const tsCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
    });
    try {
      textSpacing = await textSpacingTest(tsCtx, url);
    } catch (err) {
      textSpacing = { violations: [], horizontalScroll: false, error: String(err.message || err) };
    } finally {
      await tsCtx.close();
    }

    // E17 — erişilebilir kimlik doğrulama.
    let auth;
    const authCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
    });
    try {
      auth = await authTest(authCtx, url);
    } catch (err) {
      auth = { present: false, error: String(err.message || err) };
    } finally {
      await authCtx.close();
    }

    // E18 — sürükleme tespiti (kendi context'i; CDP gerekir).
    let drag;
    const dragCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
    });
    try {
      drag = await dragTest(dragCtx, url);
    } catch (err) {
      drag = { candidates: [], draggables: [], error: String(err.message || err) };
    } finally {
      await dragCtx.close();
    }

    // E21 — forced-colors emülasyonu (korunmuş renk yok; sınır + odak).
    let forcedColors;
    try {
      const fcCtx = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        forcedColors: 'active',
      });
      try {
        forcedColors = await forcedColorsTest(fcCtx, url);
      } finally {
        await fcCtx.close();
      }
    } catch (err) {
      forcedColors = { emulation: false, error: String(err.message || err) };
    }

    // E22 — prefers-contrast: more.
    let contrastMore;
    try {
      const cmCtx = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        contrast: 'more',
      });
      try {
        contrastMore = await contrastMoreTest(cmCtx, url);
      } finally {
        await cmCtx.close();
      }
    } catch (err) {
      contrastMore = { emulation: false, error: String(err.message || err) };
    }

    // E24 — dir=rtl geçişi.
    let rtl;
    try {
      const rtlCtx = await browser.newContext({
        viewport: { width: 390, height: 800 },
      });
      try {
        rtl = await rtlTest(rtlCtx, url);
      } finally {
        await rtlCtx.close();
      }
    } catch (err) {
      rtl = { emulation: false, error: String(err.message || err) };
    }

    // E25 — sahte yerelleştirme (%E25 genişleme + aksan).
    let expansion;
    try {
      const expCtx = await browser.newContext({
        viewport: { width: 320, height: 800 },
      });
      try {
        expansion = await expansionTest(expCtx, url);
      } finally {
        await expCtx.close();
      }
    } catch (err) {
      expansion = { emulation: false, error: String(err.message || err) };
    }

    // E12 genişleme — reduce altında transform animasyonu / parallax.
    let motionAudit;
    try {
      const maCtx = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        reducedMotion: 'reduce',
      });
      try {
        motionAudit = await motionAuditTest(maCtx, url);
      } finally {
        await maCtx.close();
      }
    } catch (err) {
      motionAudit = { transformAnimations: [], parallax: [], error: String(err.message || err) };
    }

    // E28 — erişilebilirlik ağacı (başlık/bölge yapısı).
    let ariaStructure;
    try {
      const aCtx = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        colorScheme: 'light',
      });
      try {
        ariaStructure = await ariaSnapshotTest(aCtx, url);
        if (ariaStructure.available) {
          const analysis = analyzeAriaStructure(ariaStructure.snapshot);
          ariaStructure.violations = analysis.violations;
        } else {
          ariaStructure.violations = [];
        }
      } finally {
        await aCtx.close();
      }
    } catch (err) {
      ariaStructure = {
        available: false,
        violations: [],
        error: String(err.message || err),
      };
    }

    // --aria-baseline: E28 snapshot tabanı (bilgi amaçlı).
    let ariaDiff = null;
    if (args.ariaBaseline) {
      try {
        const bCtx = await browser.newContext({
          viewport: { width: 1280, height: 800 },
          colorScheme: 'light',
        });
        try {
          ariaDiff = await ariaBaselineTest(bCtx, url, args.ariaBaseline);
        } finally {
          await bCtx.close();
        }
      } catch (err) {
        ariaDiff = {
          available: false,
          status: 'error',
          error: String(err.message || err),
          path: args.ariaBaseline,
        };
      }
    }

    report = {
      target: target,
      url,
      startedAt,
      thresholds: THRESHOLDS,
      passes: [...lightPasses, ...darkPasses],
      keyboard,
      motion,
      motionAudit,
      zoom,
      textSpacing,
      auth,
      drag,
      forcedColors,
      contrastMore,
      rtl,
      expansion,
      ariaStructure,
      profile,
      axeVersion: profile.axeVersion,
      engines: null,
      warnings: {},
      ariaDiff,
      visual: null,
      results: null,
      ok: false,
      __outDir: outDir,
    };

    // İsteğe bağlı ikinci motor: IBM Equal Access (yalnız uyarı katmanı).
    const engineStatuses = {
      axe: { status: 'ok', version: profile.axeVersion },
    };
    if (args.engines.includes('ibm')) {
      let ibm;
      try {
        const ibmCtx = await browser.newContext({
          viewport: { width: 1280, height: 800 },
          colorScheme: 'light',
        });
        try {
          ibm = await ibmEngineTest(ibmCtx, url);
        } finally {
          await ibmCtx.close();
        }
      } catch (err) {
        ibm = {
          status: 'n/a',
          reason: 'IBM motoru çalıştırılamadı: ' + String(err.message || err),
        };
      }
      engineStatuses.ibm = ibm;
      if (ibm.status === 'ok') {
        report.warnings.ibm = {
          violations: ibm.violations,
          violationCount: ibm.violationCount,
          otherFindings: ibm.otherFindings,
          version: ibm.version,
        };
      }
    }
    report.engines = engineStatuses;

    report.results = evaluateResults(report);
    report.ok = !Object.values(report.results).some((r) => r.ok === false);

    // İsteğe bağlı görsel karşılaştırma (bilgi amaçlı; çıkış kodunu bozmaz).
    if (args.visual) {
      try {
        report.visual = await runVisualComparison(
          report,
          outDir,
          args.visual,
          args.visualMaxDiff
        );
      } catch (err) {
        report.visual = {
          status: 'n/a',
          reason: String(err && err.message ? err.message : err),
        };
      }
    }

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
