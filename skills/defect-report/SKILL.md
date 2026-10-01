---
name: defect-report
description: >
  Defect raporu sablonu uretir. IEEE 1044 uyumlu defect terminolojisi
  (Fault / Failure / Bug / Non-Conformity / Anomaly / Problem / Finding) +
  severity skalasi (Critical / Major / Minor) + ISO/IEC/IEEE 29119-3 incident
  raporu yapisi ve defect lifecycle. Her
  defect: ID, severity, priority, reproducibility, environment, steps,
  expected vs actual, screenshots, root cause analysis hint, traceability
  to TC + Req. Tetikleyici: "defect report", "bug report", "/feza-sqa:defect-report",
  "hata raporu".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Defect Report

Defect kayit + raporlama sablonu.

## Tetikleyici
- "/feza-sqa:defect-report"
- "defect / bug report / hata raporu"

## Adim 0 — Bagilami Topla
1. **`TEST_PLAN_*.md`** — TC'lerden defect baglar
2. **`SRS_*.md`** — req traceability
3. **`SQA_PLAN_*.md`** — defect process
4. Komut argumaninda defect aciklamasi varsa direkt kullan
5. Yoksa **TEK** soru: "Bug/defect aciklamasini paylas (1-2 cumle yeter)"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Bug tracker** (Jira / GitHub Issues / Linear / sadece markdown) |
| 2 | **Severity vs Priority** (varsayilan ikisi de takip — ayri kavramlar) |

## Adim 2 — Bilgi Tabani
- `references/defect-template.md` — sablon + IEEE 1044 terminoloji + severity/priority matrix + lifecycle.

## Adim 3 — Uret

### Bolum 1 — Defect Terminolojisi (IEEE 1044 / ISO 9000)

```
Fault
Failure
Bug
Non-Conformity
Anomaly
Problem
Finding
```

Bu skill'in default terimi: **Defect** (industry standard). **Finding** etiketi, review/inspection/audit bulgulari icin desteklenir.

### Bolum 2 — Defect Form (ana sablon)

```markdown
# DR-<XXX>

## Header
- **Defect ID:** DR-001
- **Title:** Tek cumle ozet (50 karakter altinda)
- **Reported by:** <isim>
- **Reported date:** 2026-05-05
- **Status:** New / Assigned / In Progress / Fixed / Verified / Closed / Rejected / Deferred / Duplicate

## Severity (IEEE 1044 siniflandirmasi ile uyumlu)
- **Critical** — major defect in the system, hard blocker
- **Major** — defect or makes system difficult to use
- **Minor** — cosmetic or workaround available
- **Trivial** — gerçekten küçük (örn. typo)

**Bu defect:** Major

## Priority (urgency — kac süre içinde fix)
- **P1** — Acil, < 24 saat
- **P2** — Yüksek, < 1 sprint
- **P3** — Orta, < 1 sürüm
- **P4** — Dusuk, backlog

**Bu defect:** P2

## Description
<2-3 cumle aciklama: ne oldu, beklenen ne idi>

## Environment
- OS: Windows 11 Pro 24H2
- Browser: Chrome 130.0.6723.92
- App version: v0.4.2 (build 4521)
- DB: PostgreSQL 16
- Network: Stable, 50 Mbps
- User role: Standard end user
- Device: Desktop, 1920×1080

## Reproduction
- **Reproducibility:** Always / Sometimes / Once / Cannot reproduce
- **Pre-condition:** User registered, email confirmed, has 2 items in cart

### Steps to Reproduce
1. Login as test@example.com
2. Navigate to /checkout
3. Click "Apply Coupon"
4. Enter coupon code "SUMMER25"
5. Click "Apply"

### Expected Result
- Coupon applied, %25 indirim toplam fiyatta gosterilir

### Actual Result
- "Invalid coupon" hatasi gosterilir, console'da `TypeError: Cannot read properties of undefined (reading 'discount')`

### Attachments
- screenshot-cart.png
- console-log.txt
- HAR network trace

## Traceability
- **Failed TC:** AUTH-37 (Coupon application happy path)
- **Related Req:** FR-024 (Apply coupon), NFR-005 (Form validation)
- **Related CR:** CR-012 (Coupon system added)

## Root Cause Analysis (yapildikten sonra doldurulur)
- **Root cause:** Coupon discount field not present in some legacy promo records
- **Category:** Logic error / Null handling
- **Phase introduced:** Coding (sprint 7)
- **Could have been caught:** Inspection (Critical findings list'de bulunmadı)

## Fix
- **Owner:** <developer>
- **Branch:** bugfix/DR-001
- **PR:** #58
- **Estimated fix:** 2 hours
- **Actual fix:** 1.5 hours

## Verification
- **Verified by:** <QA>
- **Verified date:** 2026-05-06
- **Tests added:**
  - AUTH-37 (existing — now passes)
  - AUTH-38 (new — null discount edge case)

## Closure
- **Released in:** v0.4.3
- **Notes:** Backport to v0.3.x not needed (introduced in v0.4)
```

### Bolum 3 — Severity vs Priority Matrix (KRITIK)

| | P1 (Acil) | P2 (Yuksek) | P3 (Orta) | P4 (Dusuk) |
|---|---|---|---|---|
| **Critical** | ✓ Tipik | Nadiren | – | – |
| **Major** | Demo varsa | ✓ Tipik | – | – |
| **Minor** | – | – | ✓ Tipik | Cogu |
| **Trivial** | – | – | – | ✓ Tipik |

> Severity = teknik etki; Priority = acelelik. **Ayri kavramlar.** Düşük severity yüksek priority olabilir (örn. typo CEO demosunda).

### Bolum 4 — Defect Lifecycle

```
[New] -> [Assigned] -> [In Progress] -> [Fixed] -> [Verified] -> [Closed]
   |          |             |               |
   v          v             v               v
[Rejected] [Deferred]   [Won't Fix]     [Re-opened]
                                            |
                                            v
                                       [Assigned] (loop)
```

| State | Aciklama |
|-------|----------|
| New | Henüz triaj yapilmadi |
| Assigned | Developer'a atandi |
| In Progress | Fix yapiliyor |
| Fixed | Kod yazildi, PR merged |
| Verified | QA verified |
| Closed | Production'a girdi |
| Rejected | Defect değil, tekrar üretilemedi |
| Deferred | Sonraki sürüm |
| Duplicate | Mevcut DR ile ayni |
| Won't Fix | Bilinçli karar (cost > benefit) |
| Re-opened | Verified sonrasi tekrar göründü |

### Bolum 5 — Triage Kuralı

Yeni defect haftalik (veya gunluk Critical icin) triage:
- Severity + Priority belirle
- Assign to developer
- Sprint'e dahil et veya backlog

### Bolum 6 — Root Cause Categories

| Category | Aciklama |
|----------|----------|
| Logic error | Algoritma yanlis |
| Null/undefined handling | Eksik nullcheck |
| Boundary condition | Sınır değer hatasi |
| Concurrency | Race condition, deadlock |
| Configuration | Yanlis env var, secret eksik |
| Data | Bozuk/eksik test/production data |
| Integration | 3rd party API change |
| Performance | Slow query, memory leak |
| Security | XSS, SQL injection, auth bypass |
| Usability | UI confusion, accessibility |

### Bolum 7 — Defect Metrikleri (`/feza-sqa:metrics-plan` ile)

| Metrik | Hedef |
|--------|-------|
| **DRE** (`/metrics-plan`) | ≥ 85% |
| Mean time to fix (Critical) | < 24h |
| Mean time to fix (Major) | < 1 hafta |
| Defect escape rate (production'a kacan) | < %5 |
| Reopen rate (re-opened / total fixed) | < %10 |
| Defect aging (en eski açık defect süresi) | < 30 gun |

### Bolum 8 — Bug Tracker Entegrasyon

#### Jira icin
- Issue Type: Bug
- Custom fields: Severity, Priority, Reproducibility, Found in version
- Workflow: Defect lifecycle
- Linked to: Test Plan story, FR/NFR

#### GitHub Issues icin
- Labels: `bug`, `severity:critical|major|minor|trivial`, `priority:p1|p2|p3|p4`
- Template: `.github/ISSUE_TEMPLATE/bug_report.md`
- Linked PR: closes #XX

## Adim 4 — Self-Check
- [ ] Defect Form 7+ bolum (Header / Severity / Priority / Description / Environment / Repro / Traceability / RCA / Fix / Verification / Closure) tam mi?
- [ ] Severity vs Priority ayrımı net mi?
- [ ] Reproducibility belirtildi mi?
- [ ] Traceability (TC + Req) baglandi mi?
- [ ] Defect lifecycle state'leri tam mi?
- [ ] Root cause kategorize mi?
- [ ] Metrik baglar belirtildi mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-sqa (SQA)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz

İki mod:
- **Sablon olusturma**: `DEFECT_REPORT_TEMPLATE_<proje>.md` (yeni proje icin)
- **Tek defect**: `DR_<id>_<proje>.md` (somut bir bug raporu)

## Adim 6 — Rapor
1. Dosya yolu.
2. Kullanildi mi (sablon mu / somut DR mi).
3. Severity + Priority.
4. Boslik / kayip alan.
5. Sonraki: `/feza-sqa:traceability-matrix` (defect-TC link) veya `/feza-sqa:metrics-plan` (DRE).

## Sinirlar
- Max 3 soru.
- Severity vermeden DR yazma.
- Reproduction steps olmadan kapatma.
- Traceability (TC + Req ID) atlanmaz.
- "Fix" olmadan "Closed" status YASAK.
- Severity ve Priority ayri kavramlar — karistirma.
