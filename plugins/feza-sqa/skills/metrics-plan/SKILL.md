---
name: metrics-plan
description: >
  SQA metrik plani uretir. ISO/IEC/IEEE 15939 ve IEEE 1028 ile uyumlu 3 grup
  metrik: Pre-Process (effort tahmini, defect tahmini, inspection karari),
  In-Process (defect bulma orani, calismakta olan kalite), End-Process
  (DRE, surec iyilestirme). Olculmeyen sey yonetilmez ilkesine uygun,
  sayisal hedefli, historical data destekli plan.
  Tetikleyici: "metrics plan", "sqa metrik", "/feza-sqa:metrics-plan",
  "DRE", "defect density".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Metrics Plan

Inspection ve test surecini 3 asamada (oncesi / sirasi / sonrasi) olcen SQA metrik plani.

## Tetikleyici
- "/feza-sqa:metrics-plan"
- "SQA metric / kalite metrik plani"
- "DRE / defect density / inspection metric"

## Adim 0 — Bagilami Topla
1. **`SQA_PLAN_*.md`** (varsa) — quality goal'a metrik baglar
2. **`SRS_*.md`** — KLOC tahmini icin
3. **`ESTIMATES_*.md`** (varsa) — effort tahmini icin
4. Yoksa **TEK** soru: "Proje boyutu kabaca? (KLOC veya feature sayisi)"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Historical data var mi** (gecmis projelerden DRE / defect density) |
| 2 | **Inspection benchmarks** (10 pages/hr Req, 5 pg/hr Design, 0.150 KLOC/hr Code — baslangic degeri, tarihsel veriyle override edilir) |

## Adim 2 — Bilgi Tabani
- `references/metrics-types.md` — 3 metrik grubu + DRE formulu + sayisal ornekler.

## Adim 3 — Uret

### Bolum 1 — Felsefe

> "You cannot manage what you cannot measure." (yaygin yonetim ilkesi; olcum temeli: ISO/IEC/IEEE 15939)

Bu plan 3 grup metrige ayrilir; her biri farkli bir soru cevaplar.

### Bolum 2 — PRE-PROCESS Metrics

Inspection'a baslamadan once tahmin amacli.

| Metrik | Soru | Hesap |
|--------|------|-------|
| Effort estimate | Inspection icin ne kadar efor? | Size / benchmark rate |
| Defect estimate | Kac defect bekliyoruz? | Size × historical defect density |
| Inspection ROI | Inspection yapalim mi? | Beklenen savings vs cost |

#### Inspection Benchmark Rates (Varsayım: başlangıç değeri, kurum verisiyle değiştirin)

| Phase | Rate |
|-------|------|
| Requirements | 10 pages/hr |
| Design | 5 pages/hr |
| Code | 0.150 KLOC/hr |

#### Effort Hesabi (ornek: mobil bankacilik uygulamasi)

```
Phase     Size     Rate      # Insp   Meeting  Prep    Overhd  Total (person-hours)
Reqts     80p      10p/h     5        40       32       7.2     79.2
Design    40p      5p/h      5        40       32       7.2     79.2
Code      30KLOC   150L/h    5        1000     800      180     1980
                                                              ------
                                                       Total: 2138.4 person-hours
                                                              = 267 person-days (8 sa/gun)
                                                              = 12.2 person-months (22 gun/ay)
```

Formul:
```
Inspection meeting = (Size / Benchmark rate) × Inspector count
Preparation = (Size / Benchmark rate) × (Inspector count - 1)   (yazar prep yapmaz)
Overhead = (meeting + prep) × 10% (scheduling, distribution, communication)
```

Not: Kodun tamami icin tam inspection genelde gerceksiz; riskli/kritik moduller icin orneklem al.

#### Historical Defect Density (ornek)

```
Year     Size (KLOC)  Effort (PM)  # of Defects
2022     110          28           260
2023     150          38           360
2024     240          59           530
Totals   500          125          1150

Eff/KLOC = 0.25 PM/KLOC
Def/KLOC = 2.3 Def/KLOC
```

Yeni proje 80 KLOC tahmin:
- Effort = 80 × 0.25 = 20 PM
- Defects = 80 × 2.3 = 184 def

### Bolum 3 — IN-PROCESS Metrics

Inspection sirasinda izleme.

| Metrik | Soru |
|--------|------|
| Pages/NCSL inspected (Scheduled vs Actual) | Plana gore mi gidiyoruz? |
| # of Defects Found (by severity Crit/Maj/Min) | Yeterince defect buluyor muyuz? |
| Defect by category | Hangi tip defect yogun? |
| Defect Density (def / page veya def / KLOC) | Material kalitesi yeterli mi? |
| Time spent | Overview / Preparation / Inspection / Rework |

### Bolum 4 — END-PROCESS Metrics

Sonrasinda iyileştirme amacli.

| Metrik | Soru |
|--------|------|
| Totals/Actuals of In-Process metrics | Plan vs gerceklesen |
| **Defect Removal Efficiency (DRE)** | Inspection ne kadar etkili? |
| Cost of defects (faza gore) | Inspection maliyeti haklı mi cikarldi? |

#### DRE Formulu (Defect Removal Efficiency)

```
            Fi
DRE = ----------- × 100
       Fi + Fa

Fi = Faults found during Inspection
Fa = Total faults found After Inspection
```

Hedef: **DRE >= %85** (high-quality inspection).

### Bolum 5 — Bu Projede Plan

Proje brief'inden cikarilan rakamlarla:

```
PRE-PROCESS:
- Tahmini KLOC: 50
- Tahmini Effort: 50 × 0.25 = 12.5 PM
- Tahmini Defect: 50 × 2.3 = 115
- Inspection Effort: ~ 150 person-hours

IN-PROCESS Hedefler:
- Inspection rate: 10 pg/hr (req), 5 (design), 0.150 (code)
- Defect density: < 5 def/KLOC kabul edilir
- Severity dagilim: Crit < 5%, Maj < 30%, Min < 65%

END-PROCESS Hedefler:
- DRE: >= 85%
- Defect escape rate (production'a kaçan): < 5%
- Customer-found defect: < 10
```

### Bolum 6 — Metrik Toplama Plani

| Metrik | Toplama Yontemi | Sıklık | Sahip |
|--------|-----------------|--------|-------|
| Inspection effort | Time tracking sheet | Inspection sonrasi | Moderator |
| Defect density | Bug tracker | Phase sonu | QA Lead |
| DRE | Production + inspection log | Quarterly | QA Lead |
| Customer-found defect | Support ticket | Aylik | Product Manager |

### Bolum 7 — Dashboard

Onerilen gorsel:
- Burndown / defect arrival rate
- DRE trend (quarterly)
- Severity dagilimi (pie)
- Phase bazli defect cost

### Bolum 8 — 15939 Uyumu

Bu metrik set'i ISO/IEC/IEEE 15939 measurement construct yapisiyla hizalanir:
- Bilgi ihtiyaci → measurement construct (urun, surec ve proje kavramlari)
- Bu plan: SQA process odakli bir uygulama
- Her metrige sayisal hedef ve toplama yontemi baglanir

## Adim 4 — Self-Check
- [ ] 3 grup metrik (Pre/In/End) tam mi?
- [ ] DRE formulu Fi / (Fi + Fa) olarak dogru mu?
- [ ] Inspection benchmark rates (10/5/0.150) referansli mi?
- [ ] Historical data ornegi var mi?
- [ ] Bu proje icin sayisal hedefler var mi?
- [ ] Toplama plani (kim/ne sıklıkta) var mi?
- [ ] 15939 uyumu belirtildi mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-sqa (SQA)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `METRICS_PLAN_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Pre/In/End metrik sayilari.
3. Tahmini DRE hedefi.
4. Boslik.
5. Sonraki: `/feza-sqa:inspection` (metrigi besleyen pratik).

## Sinirlar
- Max 3 soru.
- DRE formulu disinda kafa formul uretme.
- Vanity metrics ekleme.
- Hedefsiz metrik atma — her metrige sayi ver.
