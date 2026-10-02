---
name: traceability-matrix
description: >
  Bi-directional traceability matrisi uretir: Stakeholder Need -> BR -> StR ->
  SyR -> SR -> Design -> Code -> Test Case -> Defect. ISO/IEC/IEEE 29148 ve
  IEEE 829 izlenebilirlik uygulamalarina uyumlu. Upward / downward / horizontal
  3 yon. Mevcut FezaPlugin ciktilarini (SCOPE/SRS/USER_STORIES/
  TEST_PLAN) baglar. Coverage hesabi (her phase'e atama yuzdesi). Tetikleyici:
  "traceability matrix", "izlenebilirlik matrisi", "/feza-sqa:traceability-matrix",
  "RTM".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Traceability Matrix

Bi-directional + 3-yon (upward/downward/horizontal) izlenebilirlik.

## Tetikleyici
- "/feza-sqa:traceability-matrix"
- "izlenebilirlik / traceability"
- "RTM / requirement traceability matrix"

## Adim 0 — Bagilami Topla
Tum ilgili FezaPlugin ciktilarini Glob ile bul:
1. `SCOPE_*.md` — proje hedefleri (uppermost)
2. `STAKEHOLDERS_*.md`, `PERSONAS_*.md` — needs
3. `SRS_*.md` — req hierarchy
4. `USER_STORIES_*.md` — story to req
5. `WBS_*.md` — implementation
6. `TEST_PLAN_*.md` — test cases
7. `SRS_REVIEW_*.md` — verification mapping

Bilgi yetersiz → **TEK** soru: "Hangi seviyeden baslayalim? (Scope / SRS / Test)"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Matrix detay seviyesi** (sadece Req-Test mi / tam zincir mi) |
| 2 | **Coverage hedefi** (varsayilan: %100 her phase) |

## Adim 2 — Bilgi Tabani
- `references/traceability-rules.md` — 3 yon, ISO 29148 referans, gap detection.

## Adim 3 — Uret

### Bolum 1 — Tam Traceability Zinciri

```
Stakeholder Need
    ↓
Business Requirement (BR)
    ↓
Stakeholder Requirement (StR)
    ↓
System Requirement (SyR)
    ↓
Software Requirement (SR / FR / NFR)
    ↓
Design Element (Architecture / Component)
    ↓
Code (Module / Function)
    ↓
Test Case (TC)
    ↓
Defect (DR)
```

### Bolum 2 — Master Traceability Matrix

Tek buyuk tablo (proje boyutuna gore daraltilabilir):

| Need | BR | StR | SyR | SR | Design | Code | TC | Defect |
|------|----|----|----|----|--------|------|----|----|
| N-001 (Hizli kayit) | BR-001 | StR-002 | SyR-005 | FR-008 | comp/RegisterForm | src/auth/register.ts | AUTH-12, AUTH-13 | DR-022 |
| N-002 (Veri guvenligi) | BR-002 | StR-007 | SyR-009 | NFR-003 | crypto/PasswordHasher | src/auth/hash.ts | AUTH-25 | – |
| ... |

### Bolum 3 — Forward (Downward) Traceability

Her uppermost item icin downstream allocation:

#### N-001 (Hizli kullanici kaydi)
- BR-001 → StR-002 (Yeni kullanici 60s'de uye olur)
  - SyR-005 (Sistem 5 alanli form sunar)
    - FR-008 (Email + sifre + onay validation)
    - NFR-001 (Form yanit < 1s)
  - Design: components/RegisterForm.tsx
  - Code: src/pages/register.ts (45 satir)
  - TC: AUTH-12 (happy), AUTH-13 (sad), AUTH-14 (boundary)
  - Defect: DR-022 (Open — email regex hatasi)

### Bolum 4 — Backward (Upward) Traceability

Her code/test'in upstream parent'i:

| Code File | Implements | Tests |
|-----------|------------|-------|
| src/auth/register.ts | FR-008 (StR-002, BR-001, N-001) | AUTH-12, AUTH-13, AUTH-14 |
| src/auth/hash.ts | NFR-003 (StR-007, BR-002, N-002) | AUTH-25 |

### Bolum 5 — Horizontal Traceability

Ayni seviyedeki iliskiler:
- FR-008 ↔ FR-009 (uyelik akisinin paralel parcalari)
- NFR-001 ↔ NFR-002 (performans NFR'leri)
- TC-AUTH-12 ↔ TC-AUTH-13 (ayni FR'in happy/sad'i)

### Bolum 6 — Coverage Tablosu

| Phase | Toplam | Atanmis | Coverage |
|-------|--------|---------|----------|
| Stakeholder Needs → BR | 12 | 12 | %100 |
| BR → StR | 12 | 11 | %92 |
| StR → SyR | 18 | 18 | %100 |
| SyR → SR | 24 | 22 | %92 |
| SR → Design | 24 | 18 | %75 |
| Design → Code | 18 | 18 | %100 |
| SR → TC | 24 | 20 | %83 |
| TC → Defect (open) | 84 | 7 | – |

### Bolum 7 — Gap Analizi

Eksik baglantilar:
- BR-006: StR atamasi yok (orphan business req)
- SR-014, SR-019: Design atamasi yok (kod yazildi ama design doc eksik)
- SR-022: TC yok — **kritik**, test edilmiyor
- DR-022, DR-024: Test case'e baglanmamis (regression test eksik)

### Bolum 8 — Trace Dogrulama Sorulari

ISO 29148 bi-directional gereksinim:
- Her SR upward bir StR'a baglaniyor mu?
- Her StR downward bir SR'a allocate ediliyor mu?
- Her TC bir SR'a baglaniyor mu?
- Her DR bir TC'ye baglaniyor mu?
- Her code dosyasi bir SR'a baglaniyor mu?

### Bolum 9 — Onerilen Aksiyonlar

| # | Bulgu | Aksiyon | Sahip |
|---|-------|---------|-------|
| 1 | SR-022 TC yok | Test case yaz | QA Lead |
| 2 | BR-006 StR yok | Stakeholder elicitation eksik mi? | PM |
| 3 | SR-014 design yok | Design doc yaz veya design implicit mi belgele | Tech Lead |

## Adim 4 — Self-Check
- [ ] Tam zincir (Need -> Defect) tabloda mi?
- [ ] Forward / Backward / Horizontal 3 yon var mi?
- [ ] Coverage tablosu (her phase) hesaplandi mi?
- [ ] Gap analizi var mi?
- [ ] Aksiyonlar somut + sahip atamali mi?
- [ ] ISO 29148 bi-directional dogrulama yapildi mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-sqa (SQA)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `TRACEABILITY_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Toplam zincir adet + ortalama coverage.
3. Gap sayisi (her phase).
4. Top-3 aksiyon.
5. Sonraki: gap'lari kapatmak icin ilgili skill (eksik test → `/feza-sqa:test-plan`, eksik req → `/feza-requirements:srs-generate`).

## Sinirlar
- Max 3 soru.
- Sadece Req-Test eslemesi yapma — tam zincir hedef.
- Coverage'siz matrix verme.
- ISO 29148 bi-directional dogrulamasi olmadan bitirme.
- Diyagram yok.
