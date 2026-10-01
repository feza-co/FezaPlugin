---
name: test-plan
description: >
  Test Plan + Test Case sablonu uretir. ISO/IEC/IEEE 29119-3 ve IEEE 829
  uyumlu: TC ID, Req traceability, Priority (High/Medium/Low) + Type
  (Positive/Negative/Boundary/NFR), Brief Description, Expected Result. Test
  Plan + Test Design Spec + Test Case + Schedule + Run/Pass/Fail + Defect
  traceability + History yapisi. Once SRS_*.md'den FR ve NFR'leri okuyup her
  birine TC turetir. Tetikleyici: "test plan", "test case",
  "/feza-sqa:test-plan", "test sablonu".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Test Plan + Test Cases

ISO/IEC/IEEE 29119-3 ve IEEE 829 yapisinda Test Plan + TC.

## Tetikleyici
- "/feza-sqa:test-plan"
- "test plan / test case"
- "test sablonu / test scenarios"

## Adim 0 — Bagilami Topla
1. **`SRS_*.md`** zorunlu — TC'ler FR ve NFR'lere bagli
2. **`USER_STORIES_*.md`** (varsa) — story AC'leri TC'ye direkt cevrilir
3. **`SCOPE_*.md`** — kapsam siniri
4. **`HEURISTIC_EVAL_*.md`** (varsa) — UI test senaryolari
5. Yoksa **TEK** soru: "Test edilecek requirement'lar nerede?"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **TC ID prefix** (varsayilan: proje kodundan, orn. PAY-01) |
| 2 | **Test seviyesi** (Unit / Integration / System / Acceptance — varsayilan: Hepsi) |

## Adim 2 — Bilgi Tabani
- `references/test-plan-template.md` — 29119-3 uyumlu sablon + test seviyeleri.

## Adim 3 — Uret

### Bolum 1 — Test Plan

```markdown
# Test Plan — <Proje>

## 1. Introduction
- Amac, kapsam, hedefler

## 2. Roles and Responsibilities
- Identify Roles and Responsibilities
- Become Familiar with Requirements and Design
- Write a Test Plan
- Write Test Design Specifications
- Have Test Plan and Design Spec. Reviewed and Approved
- Write Test Cases
- Prepare the Test Environment
- Prepare the Test Tools
- Prepare the Test Data

## 3. Test Levels
- Unit (Developer) — birim test
- Integration (Developer + Test) — bilesenler arasi
- System (Test team) — uctan uca
- Acceptance (Customer / UAT) — kabul

## 4. Test Approach
- Static (review, inspection — `/feza-sqa:inspection`)
- Dynamic (functional, non-functional)

## 5. Pass/Fail Criteria
- Unit test coverage >= 80%
- Critical defect: 0
- Major defect: <= 3 (release decision)

## 6. Test Schedule
- Sprint 1: Auth tests
- Sprint 2: Catalog tests
- ...

## 7. Test Environment
- Staging URL, test DB, mock services

## 8. Test Tools
- Jest / pytest / JUnit (unit)
- Cypress / Playwright (E2E)
- k6 / JMeter (performance)
- OWASP ZAP (security)

## 9. Risks
- Test data eksikligi
- Environment instability
- Coverage tutmama
```

### Bolum 2 — Test Design Specification

Her FR/NFR icin:
- Test objective
- Test approach (positive / negative / boundary / load)
- Required test data
- Setup/teardown

### Bolum 3 — Test Case Tablosu

| TC ID | Req | Priority | Type | Brief Description | Pre-condition | Steps | Expected Result | Actual | Status |
|-------|-----|----------|------|-------------------|---------------|-------|------------------|--------|--------|
| PAY-01 | FR-001 | High | Positive | Pay with valid card | Cart has 1 item | 1. Open /checkout 2. Enter valid card 3. Submit | Order confirmation shown < 3s, payment captured | – | Not Run |
| PAY-02 | FR-001 | Medium | Negative | Pay with expired card | Cart has 1 item | 1. /checkout 2. Expired card 3. Submit | Error "Card expired", no charge, cart kept | – | Not Run |
| PAY-03 | NFR-001 | High | Performance | Checkout page load under 2s | – | 1. Hard refresh /checkout @ 25Mbps | Page interactive < 2s | – | Not Run |
| PAY-04 | NFR-005 | High | Security | Card data never stored in plain text | Order created | 1. Inspect payment table | Only token + last4 stored | – | Not Run |

### Priority ve Type Skalasi

Priority (is etkisine gore):
- **High**: Kritik is akisi, release blocker
- **Medium**: Onemli ama workaround'u var
- **Low**: Kozmetik / nadir durum

Type (testin dogasi):
- **Positive**: Happy path
- **Negative**: Hata / gecersiz girdi yolu
- **Boundary**: Sinir degerler
- **Performance / Security**: NFR temelli

### Bolum 4 — Workflow (ISO/IEC/IEEE 29119-2 test sureci)

```
Test Plan
   ↓
Test Design Specifications
   ↓
Test Cases (this template)
   ↓
Schedule (When/What)
   ↓
Execute (Run Test Cases)
   ↓
Results (Run/Pass/Fail)
   ↓
Defects (Traceability to Test Cases)
   ↓
History
```

### Bolum 5 — Traceability

Her TC bir Req'a bagli, her Defect bir TC'a bagli. Bu zincir zorunlu.

→ Bu chain yi `/feza-sqa:traceability-matrix` skill'i derler.

### Bolum 6 — TC Kapsama Hedefi

| Kategori | Min coverage |
|----------|--------------|
| Critical FR | %100 (1 happy + 1 sad min) |
| Major FR | %100 (1 happy min) |
| Minor FR | %80 |
| NFR | %100 (her NFR icin min 1 test) |

### Bolum 7 — Defect to TC Bagi

Defect → traceability to TC → traceability to Req. Defect raporu icin: `/feza-sqa:defect-report`.

## Adim 4 — Self-Check
- [ ] Her FR'a en az 1 happy + 1 sad TC mi?
- [ ] Her NFR'a en az 1 TC mi?
- [ ] TC ID prefix tutarli mi?
- [ ] Priority (High/Medium/Low) ve Type her TC'da var mi?
- [ ] Steps numarali mi?
- [ ] Expected Result olculebilir / spesifik mi?
- [ ] Pre-condition tanimli mi?
- [ ] Traceability (Req ID) zorunlu doldurulmus mu?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-sqa (SQA)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `TEST_PLAN_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Toplam TC sayisi (Positive / Negative / Boundary / NFR dagilim).
3. FR coverage yuzdesi.
4. Boslik.
5. Sonraki: `/feza-sqa:traceability-matrix` veya `/feza-sqa:metrics-plan`.

## Sinirlar
- Max 3 soru.
- Req traceability olmadan TC yazma.
- Expected Result genel "calisir" demek YASAK — sayisal/spesifik.
- Bir FR'a 0 TC kalamaz.
- Diyagram yok.
