# Orchestration Pipelines

## Mini Paket (8 skill — hizli teslim)

```
1. lifecycle-pick      → LIFECYCLE_PICK_*.md     (no dep, brief'ten)
2. scope-statement     → SCOPE_*.md              (brief)
3. srs-generate        → SRS_*.md                (BRIEF mod)
4. wbs                 → WBS_*.md                (depends-on: SCOPE)
5. estimate            → ESTIMATES_*.md          (depends-on: WBS)
6. swot                → SWOT_*.md               (brief + SCOPE)
7. risk-register       → RISK_REGISTER_*.md      (depends-on: SWOT)
8. test-plan           → TEST_PLAN_*.md          (depends-on: SRS)
```

## Standard Paket (15 skill — standart teslim)

```
Mini'nin tum ciktilari +
9.  stakeholder-map    → STAKEHOLDERS_*.md       (brief)
10. persona            → PERSONAS_*.md           (brief + STAKEHOLDERS)
11. user-story         → USER_STORIES_*.md       (depends-on: SRS, PERSONAS)
12. activity-sequence  → ACTIVITIES_*.md         (depends-on: WBS, ESTIMATES)
13. budget             → BUDGET_*.md             (depends-on: ESTIMATES)
14. raci               → RACI_*.md               (depends-on: WBS, STAKEHOLDERS)
15. comm-plan          → COMM_PLAN_*.md          (depends-on: STAKEHOLDERS)
```

## Full Paket (24+ skill — kurumsal hazırlık)

```
Standard'in tum ciktilari +
feza-hci paketi (8 doküman skill'i; arayüz üreten hci-execute pakete dahil edilmez):
- hci-review, heuristic-eval, color-audit, design-thinking,
  prototype-plan, persona (zaten standard'da), cognitive-load,
  usability-eval-plan

feza-sqa paketi (7 skill):
- sqa-plan, traceability-matrix, inspection,
  metrics-plan, defect-report (template), change-control,
  test-plan (zaten standard'da)
```

Total Full ≈ 28 skill (bazilari ortak).

## Bagimlilik Grafigi

```
                    [BRIEF.md]
                         |
     +-------------------+-------------------+
     |                   |                   |
[lifecycle-pick]   [scope-statement]   [stakeholder-map]
                         |                   |
                      [wbs]              [persona]
                         |                   |
                     [estimate]         [user-story] (also from SRS)
                         |
                    [activity-sequence]
                         |
                     [budget]
                         |
                     [risk-register] ← [swot]
                         |
                     [raci] (also needs stakeholders)
                         |
                     [comm-plan]
                         |
                     [test-plan] ← [srs-generate] ← [BRIEF]
                         |
                     [traceability-matrix] (full)
```

## Dosya Yazim Sirasi (topological)

1. lifecycle-pick (no dep)
2. scope-statement (brief)
3. stakeholder-map (brief)
4. persona (brief + stakeholder)
5. srs-generate (brief, BRIEF mod)
6. user-story (srs + persona)
7. wbs (scope)
8. estimate (wbs)
9. activity-sequence (wbs + estimate)
10. budget (estimate)
11. swot (brief + scope)
12. risk-register (swot + scope)
13. raci (wbs + stakeholder)
14. comm-plan (stakeholder)
15. test-plan (srs)

(Full paket icin Standard sonrasi: hci-review, heuristic-eval, color-audit, design-thinking, prototype-plan, cognitive-load, usability-eval-plan, sqa-plan, traceability-matrix, inspection, metrics-plan, defect-report, change-control)

## Dil Tutarliligi

Tum paket dosyalari ayni dilde. Brief'in dilinden veya `--lang=` argumanindan secilir.

## Cikti Hacmi (Standard paket)

| Dosya | Tipik boyut |
|-------|-------------|
| LIFECYCLE_PICK | ~3 KB |
| SCOPE | ~3 KB |
| STAKEHOLDERS | ~2 KB |
| PERSONAS | ~5 KB |
| SRS | ~10-15 KB |
| USER_STORIES | ~8 KB |
| WBS | ~4 KB |
| ESTIMATES | ~5 KB |
| ACTIVITIES | ~4 KB |
| BUDGET | ~3 KB |
| SWOT | ~3 KB |
| RISK_REGISTER | ~5 KB |
| RACI | ~4 KB |
| COMM_PLAN | ~3 KB |
| TEST_PLAN | ~6 KB |
| **TOPLAM** | **~70 KB / 15 dosya** |

Full paket: ~130 KB, 24 dosya.

## Manifest (PACKAGE_*.md) Sablonu

```markdown
# <Proje> — FezaPlugin Full Package

> Tip: Standard / Mini / Full
> Uretildi: <tarih>
> Toplam dosya: X
> Toplam boyut: Y KB
> Brief kaynak: BRIEF.md / kullanıcı

## Iceren Dosyalar

| # | Dosya | Skill | Paket | Status |
|---|-------|-------|-------|--------|
| 1 | LIFECYCLE_PICK_X.md | lifecycle-pick | feza-toolkit | OK |
| ... |

## Paket Kapsami

| Paket | Sayi |
|-------|------|
| feza-requirements | 2 |
| feza-pm | 9 |
| ... |

## TBD Sayilari (skill bazinda)

| Skill | TBD |
|-------|-----|
| SRS | 3 |
| ... |

## Onerilen Sonraki Adimlar

1. Bos TBD'leri elle doldur (en cok SRS'de)
2. `/feza-requirements:srs-review` ile kalite skoru
3. `/feza-sqa:traceability-matrix` ile zinciri kontrol
4. `/feza-toolkit:demo-script` ile sunum hazırlığı

## Bilinen Sinirlar (full-package'in)

- Bu, brief'ten cikarilan ON HAZIRLIK paketidir
- Detay bazinda elle revize gerek
- Kod yazildiktan sonra `/feza-requirements:srs-generate KOD MOD` ile SRS yenilensin
```

## Kalite Kapisi ve Teslim Formati

Her doküman kalite kapisindan (`references/quality-gate.md`) gecer ve kurumsal teslim formatinda (`references/output-conventions.md`) uretilir. Bu adimlar ayri bir skill gerektirmez; pipeline'in standart parcasidir.

## Paket Gereksinimi

Pipeline farkli paketlerin skill'lerini cagirir; ilgili paketlerin (`feza-requirements`, `feza-pm`, `feza-hci`, `feza-sqa`, `feza-toolkit`) kurulu olmasi gerekir.

## Anti-Pattern'ler

- ✗ Her komutu tek tek calistirmak yerine full-package kullanmak
- ✗ Tum paket olduktan sonra TBD'leri ihmal etmek
- ✗ Pipeline'i ortada kesmek (bagimli skill'ler eksik kalir)
- ✗ Brief olmadan calistirmak (tum cikti TBD)
- ✗ Manifest olmadan bitirmek
