# Metrics Reference (ISO/IEC/IEEE 15939 + IEEE 1028 uyumlu)

## Ilke

> "You cannot manage what you cannot measure." — yaygin yonetim ilkesi; olcum sureci icin bkz. ISO/IEC/IEEE 15939.

## 3 Grup Metrik

### Pre-Process
- Inspection icin ne kadar efor gerekli?
- Kac defect bulmayi bekliyoruz?
- Inspection kullanmali miyiz? Evetse hangi derinlikte?

### In-Process
- Yeterince defect buluyor muyuz?
- Ne kadar efor harcaniyor?
- Materyalin kalitesi sonraki faza gecmeye yeterli mi?

### End-Process
- Inspection ne kadar verimliydi?
- Bir sonraki projede ne iyilestirilebilir?

## Inspection Effort Estimation

### Inputs
- **Size of Inspection Material:**
  - Sayfa sayisi (Requirements, Design)
  - Kod satiri (LOC / KLOC)
  - Karmasiklik (kod icin)
- **Historical Data:**
  - Onceki projelerin sonuclari
  - Benchmark degerleri

### Benchmarks (baslangic degerleri)

Varsayım: başlangıç değeri, kurum verisiyle değiştirin.

- Requirements: 10 pages/hr
- Design: 5 pages/hr
- Code: 0.150 KLOC/hr

## Effort Hesabi

```
Inputs needed:
- Size: Requirements 80p, Design 40p, Code 30 KLOC
- Benchmark inspection rates
- Number of inspectors (e.g. 5, yazar dahil)

Formuller:
Inspection meeting time = (Size / Rate) × Inspector count
Preparation time = (Size / Rate) × (Inspector count - 1)   (yazar prep yapmaz)
Overhead = (meeting + prep) × 10%

Total = meeting + prep + overhead
```

### Tam Hesap Ornegi (mobil bankacilik uygulamasi)

```
Phase     Size     Rate      # Insp   Meeting  Prep    Overhd  Total
Reqts     80p      10p/h     5        40       32       7.2     79.2
Design    40p      5p/h      5        40       32       7.2     79.2
Code      30KLOC   150L/h    5        1000     800      180     1980

Total = 2138.4 person-hours
      = 267 person-days (8 sa/gun)
      = 12.2 person-months (22 gun/ay)
```

Kodun tamamini incelemek pahali; kritik modullerde (odeme, kimlik dogrulama) orneklem al.

## Historical Data Ornegi

```
Year     Size (KLOC)  Effort (PM)  # of Defects
2022     110          28           260
2023     150          38           360
2024     240          59           530
Totals   500          125          1150

Eff/KLOC = 0.25 PM/KLOC
Def/KLOC = 2.3 Def/KLOC

For new project (80 KLOC):
- Effort = 80 × 0.25 = 20 PM
- Defects = 80 × 2.3 = 184
```

## In-Process Detay Metrikler

| Metrik | Birim |
|--------|-------|
| Pages/NCSL (LOC) inspected — Scheduled | adet |
| Pages/NCSL (LOC) inspected — Actual | adet |
| Number of Defects Found | adet |
| By severity (Critical / Major / Minor) | adet |
| By category/classification | adet |
| Defect Density | def/KLOC veya def/page |
| Time Spent on Inspection | hours |
| → Overview | hours |
| → Preparation | hours |
| → Inspection | hours |
| → Rework | hours |

## DRE Formulu (Defect Removal Efficiency)

```
            Fi
DRE = ----------- × 100
       Fi + Fa
```

- **Fi** = Faults found during Inspection (iceride bulunan)
- **Fa** = Total faults found After Inspection (sonra bulunan, system test + customer)

### DRE Yorumu
- DRE >= 85% → high-quality inspection
- DRE 70-85% → kabul, iyilestirme firsati
- DRE < 70% → inspection sureci sorunlu

## Cost Comparison (Inspection ROI ornegi)

Varsayimlar (kisi-gun): defect inspection'da duzeltilirse 0.5, system test'te 2.5, musteride 10. Gereksinim materyali 80 sayfa, 5 kisi, 100 defect mevcut, test %75 yakalar.

### Inspection olmadan
```
System test bulur : 75 × 2.5  = 187.5
Musteri bulur     : 25 × 10   = 250.0
                              --------
                              437.5 person-days
```

### Gereksinim inspection'i eklenirse (DRE %70)
```
Inspection eforu  : 79.2 sa            =   9.9 gun
Inspection fix    : 70 × 0.5           =  35.0
Kalan 30 defect:
  System test     : 22.5 × 2.5         =  56.25
  Musteri         : 7.5 × 10           =  75.0
                                       --------
                                       176.2 person-days
Net tasarruf: ~261 person-days (yaklasik %60)
```

→ Inspection kendini amorti eder.

## Severity Skalasi

| Severity | Tanim |
|----------|-------|
| **Critical** | Uygulanirsa sistemde buyuk bir hataya yol acar |
| **Major** | Uygulanirsa hataya yol acar veya sistemi kullanmayi zorlastirir |
| **Minor** | Kozmetik veya workaround mevcut |

(IEEE 1044 siniflandirmasi ile uyumlu.)

## Defect Density Hedefler (industry benchmarks)

| Phase | Hedef defect density |
|-------|----------------------|
| Requirements | < 1 def/page |
| Design | < 1.5 def/page |
| Code | < 5 def/KLOC |
| Production (escape) | < 0.5 def/KLOC |

## Anti-Pattern'ler

- ✗ DRE'yi tek seferde hesaplayip iyi saymak — quarterly trend gerek
- ✗ Vanity metrics (LOC, # of meetings)
- ✗ Hedefsiz metrik
- ✗ Inspection rate'i ihmal edip "1 saatte bitiririz" demek
- ✗ Historical data yok bahanesiyle metrik atlama — ilk projede tahmini benchmark kullan, gercek toplaninca refine et
