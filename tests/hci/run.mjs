#!/usr/bin/env node
/**
 * run.mjs — Faz 2 fixture koşucusu.
 *
 * Her fixture'ı `verify-ui.mjs` ile çalıştırır, beklenen çıkış kodunu ve
 * `ok:false` olan E kodlarını `expected.json` ile karşılaştırır.
 *
 * Kullanım:
 *   node tests/hci/run.mjs [--expected <dosya>] [--only <desen>] [--jobs N]
 *
 *   --expected <dosya>  Beklenti dosyası (varsayılan: tests/hci/expected.json).
 *                       Mutasyon testi için bozulmuş bir kopya verilebilir.
 *   --only <desen>      Yalnız adı desene uyan fixture'lar (alt dizge ya da regex).
 *   --jobs N            Eşzamanlı fixture sayısı (varsayılan 2).
 *
 * Fixture listesi expected.json'dan türetilir. Beklentide olup dosyası olmayan
 * ya da tersi (dosyası olup beklentisi olmayan) fixture hata sayılır.
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

// expected.json: { "static": [...], "<dosya>.html": { "exit", "fail", "null"? , "note"? } }
function isFixtureEntry(value) {
  return value && typeof value === 'object' && !Array.isArray(value) && 'exit' in value;
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

function runVerify(file) {
  return new Promise((resolve) => {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'feza-hci-fixture-'));
    const child = execFile(
      process.execPath,
      [VERIFY_UI, file, '--json', '--out', outDir],
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

function actualFails(report) {
  if (!report || !report.results) return [];
  return Object.entries(report.results)
    .filter(([, r]) => r && r.ok === false)
    .map(([code]) => code)
    .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
}

function eqSets(a, b) {
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.length === sb.length && sa.every((x, i) => x === sb[i]);
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
  const expectedFiles = new Set(entries.map((e) => e.file));
  const presentFiles = fs
    .readdirSync(FIXTURES_DIR)
    .filter((f) => f.toLowerCase().endsWith('.html'));
  const errors = [];
  for (const f of expectedFiles) {
    if (!presentFiles.includes(f)) errors.push('Beklentide var, dosyası yok: ' + f);
  }
  for (const f of presentFiles) {
    if (!expectedFiles.has(f)) errors.push('Dosyası var, beklentisi yok: ' + f);
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
      const outcome = await runVerify(path.join(FIXTURES_DIR, entry.file));
      if (outcome.exit === 2) sawToolMissing = true;
      const fails = actualFails(outcome.report);
      const exitOk = outcome.exit === entry.expect.exit;
      const failsOk = eqSets(fails, entry.expect.fail || []);
      results[i] = {
        file: entry.file,
        expectExit: entry.expect.exit,
        actualExit: outcome.exit,
        expectFail: (entry.expect.fail || []).join(',') || '-',
        actualFail: fails.join(',') || '-',
        exitOk,
        failsOk,
        ok: exitOk && failsOk,
      };
    }
  }

  const workers = Array.from({ length: Math.min(args.jobs, selected.length) }, () => worker());
  await Promise.all(workers);

  const durationMs = Date.now() - started;

  // Tablo
  const headers = ['Fixture', 'Bekl.exit', 'Gerç.exit', 'Bekl.fail', 'Gerç.fail', 'Durum'];
  const rows = results.map((r) => [
    r.file,
    String(r.expectExit),
    String(r.actualExit),
    r.expectFail,
    r.actualFail,
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
