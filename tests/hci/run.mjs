#!/usr/bin/env node
/**
 * run.mjs — fixture koşucusu.
 *
 * Her fixture'ı `verify-ui.mjs` ile çalıştırır, beklenen çıkış kodunu,
 * `ok:false` olan E kodlarını ve (beklenti verilmişse) `ok:null` kodlarını
 * `expected.json` ile karşılaştırır.
 *
 * Kullanım:
 *   node tests/hci/run.mjs [--expected <dosya>] [--only <desen>] [--jobs N]
 *
 *   --expected <dosya>  Beklenti dosyası (varsayılan: tests/hci/expected.json).
 *                       Mutasyon testi için bozulmuş bir kopya verilebilir.
 *   --only <desen>      Yalnız adı desene uyan fixture'lar (alt dizge ya da regex).
 *   --jobs N            Eşzamanlı fixture sayısı (varsayılan 2).
 *
 * Fixture listesi expected.json'dan türetilir. `mode: "static"` olan girdiler
 * `verify-ui.mjs --static <dizin>` ile çalıştırılır; diğerleri tek dosyadır.
 * Beklentide olup dosyası olmayan ya da tersi (dosyası olup beklentisi olmayan)
 * fixture hata sayılır.
 *
 * Çıkış kodları: 0 tümü uyumlu | 1 en az bir uyuşmazlık | 2 koşucu/girdi hatası
 * ya da verify-ui araç yok (çıkış 2) döndürdü.
 *
 * Bağımlılık yok (Node ESM, yalnız standart modüller).
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const STATIC_DIR = path.join(FIXTURES_DIR, 'static');
const DEFAULT_EXPECTED = path.join(__dirname, 'expected.json');
const VERIFY_UI = path.join(
  ROOT,
  'plugins',
  'feza-hci',
  'skills',
  'hci-execute',
  'scripts',
  'verify-ui.mjs'
);

const OK = 0;
const MISMATCH = 1;
const TOOL_ERROR = 2;

function parseArgs(argv) {
  const args = { expected: DEFAULT_EXPECTED, only: null, jobs: 2 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--expected') args.expected = argv[++i];
    else if (a.startsWith('--expected=')) args.expected = a.slice('--expected='.length);
    else if (a === '--only') args.only = argv[++i];
    else if (a.startsWith('--only=')) args.only = a.slice('--only='.length);
    else if (a === '--jobs') args.jobs = Number(argv[++i]);
    else if (a.startsWith('--jobs=')) args.jobs = Number(a.slice('--jobs='.length));
    else if (a === '--help' || a === '-h') {
      process.stdout.write(
        'Kullanım: node tests/hci/run.mjs [--expected <dosya>] [--only <desen>] [--jobs N]\n'
      );
      process.exit(0);
    } else {
      throw new Error('Beklenmeyen argüman: ' + a);
    }
  }
  if (!Number.isInteger(args.jobs) || args.jobs < 1) {
    throw new Error('--jobs pozitif bir tamsayı olmalı');
  }
  return args;
}

// expected.json: { "static": [...], "<dosya>.html" | "static/<ad>": { "exit", "fail", "null"?, "mode"?, "note"?, "args"? } }
// İsteğe bağlı "fixture" alanı olan girdiler, aynı dosyayı farklı bayraklarla
// çalıştıran "takma ad" koşullarıdır (1:1 dosya tutarlılık kontrolüne girmez).
function isFixtureEntry(value) {
  return value && typeof value === 'object' && !Array.isArray(value) && 'exit' in value;
}

// Girdi anahtarı "static/<ad>" biçimindeyse ya da mode:"static" ise statik koşulur.
function isStaticEntry(key, value) {
  return value.mode === 'static' || key.startsWith('static/');
}

// Takma ad girdisi: dosya adını `fixture` alanından alır; anahtar etiket olur.
function entryFile(key, value) {
  return value.fixture || key;
}

function loadExpected(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const obj = JSON.parse(raw);
  const entries = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'static') continue;
    if (isFixtureEntry(value)) entries.push({ file: key, expect: value });
  }
  if (entries.length === 0) throw new Error('expected.json içinde fixture girdisi yok');
  return entries;
}

function matchesOnly(file, only) {
  if (!only) return true;
  try {
    return new RegExp(only).test(file);
  } catch {
    return file.includes(only);
  }
}

function runVerify(target, isStatic, extraArgs) {
  return new Promise((resolve) => {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'feza-hci-fixture-'));
    const args = isStatic
      ? [VERIFY_UI, '--static', target, '--json', '--out', outDir, ...(extraArgs || [])]
      : [VERIFY_UI, target, '--json', '--out', outDir, ...(extraArgs || [])];
    const child = execFile(
      process.execPath,
      args,
      { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 },
      (err, stdout, stderr) => {
        let exit = 0;
        if (err) exit = typeof err.code === 'number' ? err.code : err.status || 1;
        let report = null;
        const reportPath = path.join(outDir, 'report.json');
        try {
          report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        } catch {
          // --json çıktısından okumayı dene.
          try {
            report = JSON.parse(stdout);
          } catch {
            report = null;
          }
        }
        resolve({ exit, report, stderr: String(stderr || '') });
      }
    );
    child.on('error', () => {
      resolve({ exit: TOOL_ERROR, report: null, stderr: 'verify-ui çalıştırılamadı' });
    });
  });
}

function sortCodes(a, b) {
  return Number(a.slice(1)) - Number(b.slice(1));
}

function actualFails(report) {
  if (!report || !report.results) return [];
  return Object.entries(report.results)
    .filter(([, r]) => r && r.ok === false)
    .map(([code]) => code)
    .sort(sortCodes);
}

function actualNulls(report) {
  if (!report || !report.results) return [];
  return Object.entries(report.results)
    .filter(([, r]) => r && r.ok === null)
    .map(([code]) => code)
    .sort(sortCodes);
}

function eqSets(a, b) {
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.length === sb.length && sa.every((x, i) => x === sb[i]);
}

// Beklenti ↔ dosya tutarlılığı: tek dosya fixture'ları ve statik dizinler.
function collectPresent() {
  const presentFiles = new Set();
  for (const f of fs.readdirSync(FIXTURES_DIR)) {
    if (f.toLowerCase().endsWith('.html')) presentFiles.add(f);
  }
  const presentStatic = new Set();
  if (fs.existsSync(STATIC_DIR)) {
    for (const name of fs.readdirSync(STATIC_DIR)) {
      if (fs.statSync(path.join(STATIC_DIR, name)).isDirectory()) {
        presentStatic.add('static/' + name);
      }
    }
  }
  return { presentFiles, presentStatic };
}

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (err) {
    process.stderr.write(err.message + '\n');
    process.exit(TOOL_ERROR);
  }

  if (!fs.existsSync(VERIFY_UI)) {
    process.stderr.write('verify-ui.mjs bulunamadı: ' + VERIFY_UI + '\n');
    process.exit(TOOL_ERROR);
  }

  let entries;
  try {
    entries = loadExpected(args.expected);
  } catch (err) {
    process.stderr.write('expected.json okunamadı: ' + err.message + '\n');
    process.exit(TOOL_ERROR);
  }

  // Beklenti ↔ dosya tutarlılığı.
  const { presentFiles, presentStatic } = collectPresent();
  const errors = [];
  const expectedFiles = new Set();
  const expectedStatic = new Set();
  for (const e of entries) {
    // Takma ad girdilerinin dosyası `fixture` alanından gelir; dosya kümesini
    // gerçek dosya adıyla besler.
    const target = entryFile(e.file, e.expect);
    if (isStaticEntry(target, e.expect)) expectedStatic.add(target);
    else expectedFiles.add(target);
  }
  for (const f of expectedFiles) {
    if (!presentFiles.has(f)) errors.push('Beklentide var, dosyası yok: ' + f);
  }
  for (const f of presentFiles) {
    if (!expectedFiles.has(f)) errors.push('Dosyası var, beklentisi yok: ' + f);
  }
  for (const d of expectedStatic) {
    if (!presentStatic.has(d)) errors.push('Beklentide var, dizini yok: ' + d);
  }
  for (const d of presentStatic) {
    if (!expectedStatic.has(d)) errors.push('Dizini var, beklentisi yok: ' + d);
  }

  const selected = entries
    .filter((e) => matchesOnly(e.file, args.only))
    .sort((a, b) => a.file.localeCompare(b.file));

  if (selected.length === 0) {
    process.stderr.write('Seçilen fixture yok (--only=' + args.only + ')\n');
    process.exit(TOOL_ERROR);
  }

  const started = Date.now();
  const results = new Array(selected.length);
  let cursor = 0;
  let sawToolMissing = false;

  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= selected.length) return;
      const entry = selected[i];
      const file = entryFile(entry.file, entry.expect);
      const isStatic = isStaticEntry(file, entry.expect);
      const target = isStatic
        ? path.join(FIXTURES_DIR, 'static', file.slice('static/'.length))
        : path.join(FIXTURES_DIR, file);
      const outcome = await runVerify(target, isStatic, entry.expect.args);
      if (outcome.exit === 2) sawToolMissing = true;
      const fails = actualFails(outcome.report);
      const nulls = actualNulls(outcome.report);
      const hasNullExpect = Object.prototype.hasOwnProperty.call(entry.expect, 'null');
      const exitOk = outcome.exit === entry.expect.exit;
      const failsOk = eqSets(fails, entry.expect.fail || []);
      const nullsOk = hasNullExpect ? eqSets(nulls, entry.expect.null || []) : true;
      results[i] = {
        file: entry.file,
        expectExit: entry.expect.exit,
        actualExit: outcome.exit,
        expectFail: (entry.expect.fail || []).join(',') || '-',
        actualFail: fails.join(',') || '-',
        expectNull: hasNullExpect ? (entry.expect.null || []).join(',') || '-' : '—',
        actualNull: nulls.join(',') || '-',
        exitOk,
        failsOk,
        nullsOk,
        ok: exitOk && failsOk && nullsOk,
      };
    }
  }

  const workers = Array.from({ length: Math.min(args.jobs, selected.length) }, () => worker());
  await Promise.all(workers);

  const durationMs = Date.now() - started;

  // Tablo
  const headers = ['Fixture', 'Bekl.exit', 'Gerç.exit', 'Bekl.fail', 'Gerç.fail', 'Bekl.null', 'Gerç.null', 'Durum'];
  const rows = results.map((r) => [
    r.file,
    String(r.expectExit),
    String(r.actualExit),
    r.expectFail,
    r.actualFail,
    r.expectNull,
    r.actualNull,
    r.ok ? 'OK' : 'UYUŞMAZLIK',
  ]);
  const widths = headers.map((h, c) =>
    Math.max(h.length, ...rows.map((row) => row[c].length))
  );
  const fmt = (row) => '  ' + row.map((c, i) => c.padEnd(widths[i])).join('  ');
  process.stdout.write(fmt(headers) + '\n');
  process.stdout.write('  ' + widths.map((w) => '-'.repeat(w)).join('  ') + '\n');
  for (const row of rows) process.stdout.write(fmt(row) + '\n');

  const failed = results.filter((r) => !r.ok);
  process.stdout.write('\n' + results.length + ' fixture, ' + failed.length + ' uyuşmazlık');
  if (errors.length) process.stdout.write(', ' + errors.length + ' yapı hatası');
  process.stdout.write(' — toplam süre ' + (durationMs / 1000).toFixed(1) + ' sn\n');

  for (const e of errors) process.stdout.write('HATA: ' + e + '\n');

  // Araç yoksa (verify-ui çıkış 2) kapı uygulanamaz; bu, uyuşmazlıktan önce gelir.
  if (sawToolMissing) process.exit(TOOL_ERROR);
  if (errors.length > 0 || failed.length > 0) process.exit(MISMATCH);
  process.exit(OK);
}

main().catch((err) => {
  process.stderr.write('Beklenmeyen hata: ' + (err && err.stack ? err.stack : err) + '\n');
  process.exit(TOOL_ERROR);
});
