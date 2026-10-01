---
name: full-package
description: >
  Tek bir komutla tum FezaPlugin dokuman iskeletini sirayla ureten ORCHESTRATOR skill.
  Brief'ten baslayip feza-requirements + feza-pm + feza-hci + feza-sqa (+ feza-iso)
  paketlerinin cekirdek skill'lerini mantikli sira ile calistirir, her birinin
  ciktisini bir sonrakinin input'u yapar. Tek tikla tum kurumsal doküman seti.
  Diger paketlerin kurulu olmasi gerekir.
  Tetikleyici: "full package", "tum paketi uret", "/feza-toolkit:full-package",
  "kurumsal teslim paketi", "all in one".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Full Package Orchestrator

Brief → komple proje paketi (15+ dosya) tek komutla.

## Tetikleyici
- "/feza-toolkit:full-package"
- "tum paketi uret / full package"
- "kurumsal teslim paketi"

## Adim 0 — Bagilami Topla
1. **`BRIEF.md`/`IDEA.md`/`README.md`** — proje fikri zorunlu
2. Onceki FezaPlugin ciktilari varsa not et (overwrite uyarisi)
3. Yoksa **TEK** soru: "Brief yok. Kisa proje fikrini paylas (proje adi + 2-3 cumle + 5-10 ana feature)"

## Adim 1 — Gri Nokta (max 4 — bu skill biraz daha sorabilir cunku coklu skill calistiracak)

| # | Gri nokta |
|---|-----------|
| 1 | **Paket boyutu** (Mini = 8 skill / Standard = 15 skill / Full = 28 skill) |
| 2 | **Lifecycle modeli** (Waterfall = full doc / Agile = story-heavy / Hybrid) |
| 3 | **Hedef kitle** (yonetim kurulu / startup MVP / kurumsal musteri) |
| 4 | **Dil** (Turkish / English) |

## Adim 2 — Bilgi Tabani
- `references/orchestration-pipelines.md` — 3 paket tipinin skill sirasi + bagimliliklar.

> **Onkosul:** Bu orkestrasyon birden fazla paketin skill'lerini kullanir. `feza-requirements`, `feza-pm`, `feza-hci`, `feza-sqa` (Full pakette `feza-iso`) ve `feza-toolkit` kurulu olmalidir; eksik paket varsa kullaniciya hangi paketin gerektigini soyle ve o adimi TBD olarak isaretle.

> **Kalite ve teslim formati:** Her dokuman kurumsal teslim formatinda (`references/output-conventions.md`: kapak, ozet, icindekiler, kaynakca; sablon `references/delivery-format.md`) uretilir ve yazilmadan once gizli kalite kapisindan (`references/quality-gate.md`) gecer: taslak → uretici paketin kriter setiyle gizli puanlama (puan kullaniciya gosterilmez) → gerekirse en fazla 2 tur revizyon → teslim. `PACKAGE_<proje>.md` manifesti **Butunlesik paket raporu** kriter setiyle kontrol edilir.
- Skip varsayilani: tum paket Standard.

## Adim 3 — Calisma Plani

Skill cagri sirasi (Standard pipeline):

```
1.  /feza-toolkit:lifecycle-pick      → LIFECYCLE_PICK_*.md
2.  /feza-pm:scope-statement     → SCOPE_*.md
3.  /feza-pm:stakeholder-map     → STAKEHOLDERS_*.md
4.  /feza-hci:persona             → PERSONAS_*.md (3 persona)
5.  /feza-requirements:srs-generate        → SRS_*.md (BRIEF mod)
6.  /feza-requirements:user-story          → USER_STORIES_*.md (FR'lerden)
7.  /feza-pm:wbs                 → WBS_*.md
8.  /feza-pm:estimate            → ESTIMATES_*.md (PERT)
9.  /feza-pm:activity-sequence   → ACTIVITIES_*.md (CPM)
10. /feza-pm:budget              → BUDGET_*.md
11. /feza-pm:swot                → SWOT_*.md
12. /feza-pm:risk-register       → RISK_REGISTER_*.md
13. /feza-pm:raci                → RACI_*.md
14. /feza-pm:comm-plan           → COMM_PLAN_*.md
15. /feza-sqa:test-plan           → TEST_PLAN_*.md
```

Full paket (28+) ek olarak: /feza-hci:hci-review, /feza-hci:heuristic-eval, /feza-hci:color-audit, /feza-hci:design-thinking, /feza-hci:prototype-plan, /feza-iso:iso25010-quality, /feza-iso:iso15939-measure, /feza-sqa:traceability-matrix, /feza-sqa:sqa-plan, /feza-sqa:defect-report.

Mini paket (8): /feza-toolkit:lifecycle-pick, /feza-pm:scope-statement, /feza-requirements:srs-generate, /feza-pm:wbs, /feza-pm:estimate, /feza-pm:swot, /feza-pm:risk-register, /feza-sqa:test-plan.

## Adim 4 — Calistirma Stratejisi

**Onemli:** Bu bir orchestrator olarak Claude'a "su sirayla cagir" diyemiyor (Claude tools direkt skill chain calismaz). Bu yuzden iki secenek:

### Secenek A — Manuel Sira ile Manifesto

Kullaniciya tek bir **CALISTIRMA_KOMUTLARI.md** dosyasi cikar, ardisik komutlari listele:
- "Asagidaki komutlari sira ile yapistir, her biri bir sonrakine bagimli"
- Komut listesi
- Her komut sonrasi beklenen cikti

### Secenek B — Inline Uretim (Recommended)

Bu skill, tum cikti dosyalarini **kendisi olusturur** — diger skill'leri "cagirmak" yerine, onlarin reference dosyalarini okuyup direkt bu skill icinde tum dosyalari yazar.

Adim adim:
1. `BRIEF.md`'i oku
2. Her hedef cikti icin ilgili skill'in `SKILL.md` ve `references/` dosyalarini oku
3. O skill'in mantiki ile cikti dosyasini olustur
4. Bir sonraki cikti, oncekinin uzerine kurulur (zincir)

→ **Secenek B kullanilir** — kullaniciya ardisik komut yazmak yerine tek seferde tam paket.

## Adim 5 — Paket Olustur

### Paket Tipine Gore Sira

#### Mini Paket (8 dosya, ~30 dk)
1. LIFECYCLE_PICK
2. SCOPE
3. SRS (BRIEF mod)
4. WBS
5. ESTIMATES
6. SWOT
7. RISK_REGISTER
8. TEST_PLAN

#### Standard Paket (15 dosya)
Yukarisi + STAKEHOLDERS + PERSONAS + USER_STORIES + ACTIVITIES + BUDGET + RACI + COMM_PLAN

#### Full Paket (28+ dosya)
Yukarisi + HCI_REVIEW + HEURISTIC_EVAL + COLOR_AUDIT + DESIGN_THINKING + PROTOTYPE_PLAN + ISO25010_QUALITY + ISO15939_MEASURE + TRACEABILITY + SQA_PLAN + INSPECTION_PLAN + DEFECT_REPORT_TEMPLATE + REQ_LAYERED + ISO12207_AUDIT

### Pipeline Yurutme

Her adimda:
1. Onceki ciktilari `Glob` ile dogrula (hala mi var)
2. Skill referans dosyalarini oku
3. Ciktiyi taslak olarak olustur, `references/quality-gate.md` ile gizlice puanla ve gerekirse revize et (en fazla 2 tur)
4. Dosyaya yaz (`references/output-conventions.md` teslim formatina uygun)
5. Bir sonrakine gec

### Hata Yonetimi

- Bir adim basarisiz olursa: not dus, devam et (onceki adimlar saglamsa)
- Eksik bilgi varsa: TBD ile devam, "Bilinen Bosluklar" not et
- Sonunda kullaniciya hangi adimlar tam, hangileri TBD belirt

## Adim 6 — Konsolide Manifest (en sonda)

`PACKAGE_<proje>.md` dosyasi olustur — paketin **icindekiler** + sonraki adim onerileri:

```markdown
# Paket — <Proje Adi>

> FezaPlugin Full Package — <Standard/Mini/Full>
> Uretildi: <tarih>

## Iceren Dosyalar (X adet)

| # | Dosya | Skill | Paket | Boyut |
|---|-------|-------|------|-------|
| 1 | LIFECYCLE_PICK_X.md | lifecycle-pick | feza-toolkit | 4KB |
| 2 | SCOPE_X.md | scope-statement | feza-pm | 3KB |
| 3 | ... |

## Onerilen Sonraki Adimlar
- Bos olan TBD'leri elle doldur
- `/feza-requirements:srs-review` ile SRS'i denetle (skor)
- `/feza-sqa:traceability-matrix` ile zinciri kontrol et

## Bilinen Bosluklar (skill bazinda)
[her dosya icin TBD sayisi]
```

## Adim 7 — Self-Check
- [ ] Brief okundu mu?
- [ ] Paket tipi (Mini/Standard/Full) belirlendi mi?
- [ ] Pipeline siraya gore mi calisti?
- [ ] Her cikti dosyaya yazildi mi?
- [ ] Bagimli skill'ler oncekinin ciktisini kullandi mi?
- [ ] Manifest (`PACKAGE_*.md`) olusturuldu mu?

## Adim 8 — Yaz
- Coklu dosya: tum pipeline ciktilari
- Ek olarak: `PACKAGE_<proje>.md` (manifest)

## Adim 9 — Rapor (max 8 satir, normal'den biraz uzun)
1. Manifest yolu.
2. Paket tipi + dosya sayisi.
3. Toplam karakter / KB.
4. TBD sayisi (skill bazinda dagilim).
5. Kapsanan paketler (feza-requirements / feza-pm / feza-hci / feza-sqa / feza-iso sayisi).
6. Kacinda standart/kaynak referansi var.
7. Onerilen sonraki adim listesi.
8. Calistirma sure tahmini (gercek kullaniciya).

## Sinirlar
- Max 4 soru (paket tipi + lifecycle + hedef + dil).
- Skip dahil — kullanici tum sorulari pas gecerse Standard + Hybrid + Kurumsal + Auto-detected dil.
- Bir skill basarisiz olursa pipeline'i durdurma — devam et + sonunda hangileri eksik raporla.
- Manifest olmadan bitirme.
- Hicbir paket temsilsiz olamaz (en azindan feza-requirements + feza-pm zorunlu Mini'de bile).
