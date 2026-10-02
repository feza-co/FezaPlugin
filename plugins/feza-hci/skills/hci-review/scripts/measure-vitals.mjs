#!/usr/bin/env node
/**
 * measure-vitals.mjs — isteğe bağlı lab INP (Interaction to Next Paint) ölçümü.
 *
 * Kullanım:
 *     node scripts/measure-vitals.mjs <URL | yerel.html> [--json]
 *
 *   <URL>         http(s) adresi olduğu gibi kullanılır.
 *   yerel dosya   Dosyanın klasörü rastgele boş bir portta servis edilir.
 *   --json        stdout'a yalnızca JSON çıktı yazılır.
 *
 * Ne yapar:
 *   - Sayfayı Playwright Chromium ile yükler.
 *   - Sayfaya yüklenmeden önce bir PerformanceObserver `event` kaydı enjekte eder;
 *     performans girdilerinin `duration` alanı etkileşim başına gecikmedir.
 *   - Tanımlı etkileşimleri yapar (tıklama, Tab/Enter/Space klavye), ardından
 *     `event` girdilerinden EN KÖTÜ (en uzun) etkileşim süresini raporlar. Lab
 *     değeri alan INP'sine yaklaşık bir tahmindir; alan verisi yerine geçmez.
 *
 * Eşikler (web.dev/articles/inp — 2026-09 güncel): 75. yüzdelik dilim için
 *   INP ≤ 200 ms iyi, 200–500 ms iyileştirme gerekli, > 500 ms kritik/poor.
 *
 * Opsiyonel kontrol: araç yoksa ya da sayfa ölçülemezse çıkış kodu 2 DEĞİL,
 * `na` gerekçeli JSON ve çıkış 0 döner. Kalite kapısını ve diğer çıkış
 * kodlarını etkilemez.
 *
 * Bağımlılıklar: playwright. Repoya node_modules konmaz; verify-ui.mjs ile aynı
 * strateji: gerekirse ~/.cache/feza-ui-check (Windows: %LOCALAPPDATA%\feza-ui-check)
 * dizinine kurulur. FEZA_UI_CHECK_NO_INSTALL=1 ise kurulum denenmez.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const GOOD_MS = 200;
const POOR_MS = 500;
const MAX_INTERACTIONS = 8;

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

class ToolMissingError extends Error {}
class InputError extends Error {}

// --------------------------------------------------------------------------- #
// Bağımlılık yükleme (verify-ui.mjs ile aynı strateji)
// --------------------------------------------------------------------------- #

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

function tryResolveFromCache() {
  const dir = cacheDir();
  const pkgJson = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgJson)) return null;
  try {
    const require = createRequire(pkgJson);
    const pwEntry = require.resolve('playwright');
    return { pwEntry, pkgJson, dir };
  } catch {
    return null;
  }
}

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    /* önbellek yoluna geç */
  }

  const noInstall = process.env.FEZA_UI_CHECK_NO_INSTALL === '1';

  const cached = tryResolveFromCache();
  if (cached) {
    return await import(pathToFileURL(cached.pwEntry).href);
  }

  if (noInstall) {
    throw new ToolMissingError(
      'FEZA_UI_CHECK_NO_INSTALL=1; playwright ne doğrudan ne önbellekten çözülebildi.'
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
    runBin(npmBin(), ['install', '--prefix', dir, '--no-save', '--silent', 'playwright'], {
      cwd: dir,
      stdio: 'inherit',
      timeout: 590000,
    });
  } catch (err) {
    throw new ToolMissingError('npm install başarısız: ' + (err.message || err));
  }

  const require = createRequire(pkgJson);
  try {
    const pwEntry = require.resolve('playwright');
    return await import(pathToFileURL(pwEntry).href);
  } catch (err) {
    throw new ToolMissingError('playwright paketi çözülemedi: ' + (err.message || err));
  }
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
      throw new ToolMissingError('chromium kurulumu başarısız: ' + (err.message || err));
    }
    return await chromium.launch({ headless: true });
  }
}

// --------------------------------------------------------------------------- #
// Statik sunucu (yerel dosya girdisi için) — verify-ui.mjs ile aynı yaklaşım
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
    } catch {
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
        close: () => new Promise((done) => server.close(() => done())),
      });
    });
  });
}

// --------------------------------------------------------------------------- #
// Sayfa içi: PerformanceObserver `event` kaydı
// --------------------------------------------------------------------------- #

// page.addInitScript ile enjekte edilir; kendi kendine yeterli olmalı.
// Her `event` girdisi için interactionId ve hedef seçici saklanır; gruplama
// Node tarafında yapılır.
function installInpObserver() {
  window.__fezaInp = { entries: [] };
  function targetSelector(el) {
    if (!el || !el.tagName) return null;
    try {
      if (el.id) return '#' + el.id;
      const tag = el.tagName.toLowerCase();
      if (el.classList && el.classList.length) {
        return tag + '.' + Array.prototype.slice.call(el.classList).join('.');
      }
      return tag;
    } catch {
      return null;
    }
  }
  try {
    const obs = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        window.__fezaInp.entries.push({
          name: e.name,
          duration: typeof e.duration === 'number' ? e.duration : 0,
          interactionId: typeof e.interactionId === 'number' ? e.interactionId : 0,
          target: targetSelector(e.target),
        });
      }
    });
    // Eşik 0: hızlı etkileşimler de yakalanır; böylece hızlı sayfa `good` döner.
    obs.observe({ type: 'event', buffered: true, durationThreshold: 0 });
  } catch {
    /* `event` girdisi desteklenmiyorsa boş kalır (aşağıda na döner) */
  }
  // Ölçüm sırasında form/anchor gezinmesini engelle: aksi halde sayfa
  // yeniden yüklenir ve toplanan `event` girdileri kaybolur.
  try {
    document.addEventListener('submit', (e) => e.preventDefault(), true);
    document.addEventListener(
      'click',
      (e) => {
        const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
        if (a) e.preventDefault();
      },
      true
    );
  } catch {
    /* yok */
  }
}

function parseArgs(argv) {
  const args = { target: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') args.json = true;
    else if (a === '--help' || a === '-h') {
      process.stdout.write(
        'Kullanım: node scripts/measure-vitals.mjs <URL | yerel.html> [--json]\n' +
          '\nLab INP ölçümü: en kötü etkileşim süresi. ≤ 200 ms iyi, > 500 ms kritik.\n' +
          'Araç yoksa çıkış 2 değil; `na` JSON + çıkış 0 döner.\n'
      );
      process.exit(0);
    } else if (!args.target) args.target = a;
    else throw new InputError('Beklenmeyen argüman: ' + a);
  }
  if (!args.target) {
    throw new InputError('Hedef gerekli: node scripts/measure-vitals.mjs <URL | yerel.html>');
  }
  return args;
}

async function runInteractions(page) {
  const done = [];
  // Tıklanabilir öğeleri topla (görünür olanlar).
  const handles = await page.evaluate((max) => {
    const sel =
      'a[href], button, input:not([type=hidden]), select, textarea, summary, ' +
      '[role=button], [role=link], [role=tab], [tabindex]:not([tabindex="-1"])';
    const out = [];
    for (const el of Array.from(document.querySelectorAll(sel))) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) out.push(true);
      if (out.length >= max) break;
    }
    return out.length;
  }, MAX_INTERACTIONS);

  for (let i = 0; i < handles; i++) {
    try {
      const loc = page.locator(
        'a[href], button, input:not([type=hidden]), select, textarea, summary, ' +
          '[role=button], [role=link], [role=tab], [tabindex]:not([tabindex="-1"])'
      ).nth(i);
      await loc.scrollIntoViewIfNeeded({ timeout: 2000 }).catch(() => {});
      await loc.click({ timeout: 1500, noWaitAfter: true }).catch(async () => {
        await loc.focus({ timeout: 1000 }).catch(() => {});
      });
      done.push({ type: 'click', index: i });
    } catch {
      /* öğe tıklanamadıysa atla */
    }
    // Etkileşimin işlenmesine izin ver (INP bir sonraki boyamaya kadar olan blokaj).
    await page.waitForTimeout(120);
  }

  // Klavye etkileşimleri.
  await page.keyboard.press('Tab').catch(() => {});
  await page.waitForTimeout(80);
  await page.keyboard.press('Enter').catch(() => {});
  await page.waitForTimeout(80);
  await page.keyboard.press('Space').catch(() => {});
  await page.waitForTimeout(80);
  done.push({ type: 'keyboard', keys: ['Tab', 'Enter', 'Space'] });
  return done;
}

function verdictFor(inpMs) {
  if (inpMs === null || inpMs === undefined) return 'n/a';
  if (inpMs <= GOOD_MS) return 'good';
  if (inpMs <= POOR_MS) return 'needs-improvement';
  return 'poor';
}

// INP'ye girmeyen girdiler: interactionId yok (0) ya da hover/scroll türü.
// Bunlar hiçbir koşulda etkileşim sayılmaz.
const EXCLUDED_EVENT_NAMES = new Set([
  'hover',
  'pointerover',
  'pointerenter',
  'scroll',
]);

function isInpEvent(entry) {
  if (!entry || !(entry.interactionId > 0)) return false;
  if (EXCLUDED_EVENT_NAMES.has(entry.name)) return false;
  return true;
}

// interactionId'ye göre grupla; her etkileşimin en uzun `duration`'ı alınır.
// INP = en kötü (en uzun) etkileşim süresi. worst_events yalnız INP'ye giren
// girdileri gösterir (interactionId > 0 ve hover/scroll türü olmayanlar:
// ör. click/pointerdown/pointerup) — tip + süre + hedef seçici.
function computeInp(entries) {
  const groups = new Map();
  const qualifying = [];
  for (const entry of entries) {
    if (!isInpEvent(entry)) continue;
    const dur = Number.isFinite(entry.duration) ? entry.duration : 0;
    qualifying.push({
      type: entry.name,
      duration: dur,
      target: entry.target ?? null,
      interactionId: entry.interactionId,
    });
    const key = entry.interactionId;
    const current = groups.get(key);
    if (!current || dur > current.duration) {
      groups.set(key, { interactionId: key, name: entry.name, duration: dur });
    }
  }
  const interactions = [...groups.values()].sort((a, b) => b.duration - a.duration);
  const inp = interactions.length ? interactions[0].duration : null;
  const worstEvents = qualifying
    .sort((a, b) => b.duration - a.duration || a.type.localeCompare(b.type))
    .slice(0, 5);
  return { inp, worstEvents };
}

function output(payload, json) {
  if (json) {
    process.stdout.write(JSON.stringify(payload, null, 2) + '\n');
  } else {
    const lines = [];
    if (payload.na) {
      lines.push('Lab INP: n/a — ' + payload.na);
    } else {
      lines.push('Lab INP (en kötü etkileşim): ' + payload.inp_ms.toFixed(1) + ' ms [' + payload.verdict + ']');
      lines.push(
        'Eşikler: ≤ ' + GOOD_MS + ' ms iyi, ' + GOOD_MS + '–' + POOR_MS + ' ms iyileştirme gerekli, > ' + POOR_MS + ' ms kritik'
      );
      lines.push('Etkileşim sayısı: ' + payload.interactions.length);
      lines.push('Not: lab değeri alan INP yerine geçmez (bkz. web.dev/articles/inp).');
    }
    process.stdout.write(lines.join('\n') + '\n');
  }
}

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (err) {
    process.stderr.write('Girdi hatası: ' + err.message + '\n');
    return 1;
  }

  let playwright;
  try {
    playwright = await loadPlaywright();
  } catch (err) {
    if (err instanceof ToolMissingError) {
      output({ url: args.target, inp_ms: null, verdict: 'n/a', na: err.message, thresholds: { good_ms: GOOD_MS, poor_ms: POOR_MS } }, args.json);
      return 0;
    }
    throw err;
  }

  let browser = null;
  let staticServer = null;
  try {
    const target = args.target;
    let url;
    if (/^https?:\/\//i.test(target)) {
      url = target;
    } else {
      const abs = path.resolve(target);
      if (!fs.existsSync(abs)) throw new InputError('Girdi dosyası bulunamadı: ' + abs);
      staticServer = await startStaticServer(path.dirname(abs));
      url = staticServer.origin + '/' + path.basename(abs);
    }

    try {
      browser = await launchChromium(playwright);
    } catch (err) {
      if (err instanceof ToolMissingError) {
        output({ url, inp_ms: null, verdict: 'n/a', na: err.message, thresholds: { good_ms: GOOD_MS, poor_ms: POOR_MS } }, args.json);
        return 0;
      }
      throw err;
    }

    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
    });
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    await page.addInitScript(installInpObserver);

    let navOk = true;
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 20000 });
    } catch {
      navOk = false;
    }

    if (!navOk) {
      await context.close();
      output(
        { url, inp_ms: null, verdict: 'n/a', na: 'sayfa yüklenemedi', thresholds: { good_ms: GOOD_MS, poor_ms: POOR_MS } },
        args.json
      );
      return 0;
    }

    const interactions = await runInteractions(page);

    const data = await page.evaluate(() => (window.__fezaInp ? window.__fezaInp : null)).catch(() => null);
    await context.close();

    if (!data || !Array.isArray(data.entries)) {
      output(
        { url, inp_ms: null, verdict: 'n/a', na: "PerformanceObserver `event` girdisi yok (desteklenmiyor olabilir).", thresholds: { good_ms: GOOD_MS, poor_ms: POOR_MS } },
        args.json
      );
      return 0;
    }

    const { inp, worstEvents } = computeInp(data.entries);

    if (inp === null) {
      output(
        {
          url,
          inp_ms: null,
          verdict: 'n/a',
          na: "INP'ye giren etkileşim girdisi yok (interactionId'li `event` girdisi bulunamadı).",
          thresholds: { good_ms: GOOD_MS, poor_ms: POOR_MS },
          interactions,
          event_count: data.entries.length,
          worst_events: [],
        },
        args.json
      );
      return 0;
    }

    const payload = {
      url,
      inp_ms: inp,
      verdict: verdictFor(inp),
      thresholds: { good_ms: GOOD_MS, poor_ms: POOR_MS },
      interactions,
      event_count: data.entries.length,
      worst_events: worstEvents,
    };
    output(payload, args.json);
    return 0;
  } catch (err) {
    if (err instanceof InputError) {
      process.stderr.write('Girdi hatası: ' + err.message + '\n');
      return 1;
    }
    process.stderr.write('Ölçüm başarısız: ' + (err.message || err) + '\n');
    return 0; // opsiyonel kontrol; kalite kapısını bozmaz
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (staticServer) await staticServer.close().catch(() => {});
  }
}

main().then((code) => process.exit(code));
