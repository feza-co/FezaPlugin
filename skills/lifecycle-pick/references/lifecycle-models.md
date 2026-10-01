# Lifecycle Models Reference

## Klasik 3 Model Karsilastirmasi

| Method | When to Use | Advantages | Disadvantages |
|--------|-------------|------------|---------------|
| **Waterfall** | All the requirements are known at the beginning of project | Tried and proven, well known. Easy to project manage, only one activity at any given time. Easy to configuration manage, just one version of product | Difficult and costly to change previous steps (like requirements). Inefficient use of resources. Customer needs to wait until the end to start using product. |
| **Incremental** | Customer cannot wait until the end of project to start using at least some functionality | Customer can start partial product after first release. Efficient use of resources | Difficult to project manage. Difficult to configurations manage. Retest early release functionality in later releases. |
| **Iterative (Cyclic)** | All the requirements are not known at the beginning of project | The requirements take shape after each cycle. After the first cycle, the customers can see and give feedback to developers. The finished product is better suited to users | Not known when the final product will be finished. As the product grows with each cycle, the architecture may not support the growth |

## Modern Modeller

### Agile / Scrum
- **Sprint**: 2-4 hafta time-boxed iterasyon
- **Roller**: Product Owner (vision), Scrum Master (process), Dev Team (delivery)
- **Artefaktlar**: Product Backlog, Sprint Backlog, Burndown Chart
- **Etkinlikler**: Sprint Planning, Daily Standup, Sprint Review, Sprint Retro
- **Avantaj**: Hizli feedback, degisiklige aciklik, yuksek katilim
- **Dezavantaj**: Dokumantasyon az, planlama belirsiz, regulatif zor, takim disiplini gerek

### Kanban
- WIP (Work In Progress) limitleri
- Continuous flow (sprint yok)
- Pull-based (developer hazir oldukca isi alir)
- Avantaj: Maintenance + support icin ideal
- Dezavantaj: Tahmin zor, deadline'siz

### XP (Extreme Programming)
- Pair programming, TDD, continuous integration
- Onsite customer
- Refactoring + simple design
- Avantaj: Yuksek kalite, hizli adaptasyon
- Dezavantaj: Yorucu, tum takim XP yetkin olmali

### V-Model
- Waterfall'in V-sekli versionu
- Her dev phase'in karsisinda test phase var:
  - Req ↔ Acceptance Test
  - Design ↔ System Test
  - Detail Design ↔ Integration Test
  - Code ↔ Unit Test
- Avantaj: Erken test plani, regulatif uyum
- Dezavantaj: Waterfall'in dezavantajlari korunur

### Spiral
- Risk-driven
- 4 quadrant per iterasyon: Plan / Risk Analysis / Engineering / Customer Evaluation
- Avantaj: Buyuk + yuksek riskli proje icin
- Dezavantaj: Pahali, ileri uzmanlik gerek

### RUP (Rational Unified Process)
- 4 phase: Inception / Elaboration / Construction / Transition
- 9 disipline (Business Modeling, Req, Analysis & Design, ...)
- UML-heavy
- Avantaj: Yapilandirilmis, role bazli
- Dezavantaj: Aşırı sürec, yorucu

### Hybrid (Water-Scrum-Fall)
- Beginning: Waterfall (req, architecture)
- Middle: Scrum (implementation)
- End: Waterfall (release management)
- Avantaj: Regulatif uyum + iteratif gelisim
- Dezavantaj: Iki disiplin gerek, hibridin kotusu olabilir

## Skor Hesabi

5 boyut, 1-5 skor.

### Boyutlar
1. **Requirements netligi** (1=tamamen belirsiz, 5=tum req net)
2. **Musteri erisimi** (1=hic, 5=her gun)
3. **Takim deneyimi** (1=tamamen junior, 5=tum senior)
4. **Tarih kisiti** (1=esnek, 5=mutlak deadline)
5. **Teknoloji riski** (1=yepyeni, 5=bilinen stack)

### Model Skor Matrisi (her boyut icin model uygunlugu)

| Model | Req Netligi 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| Waterfall | 1 | 2 | 3 | 4 | 5 |
| Incremental | 2 | 3 | 4 | 4 | 4 |
| Iterative | 5 | 5 | 4 | 3 | 2 |
| Agile | 5 | 5 | 4 | 3 | 2 |
| V-Model | 1 | 2 | 3 | 4 | 5 |

| Model | Cust Erisim 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| Waterfall | 5 | 4 | 3 | 2 | 1 |
| Incremental | 3 | 4 | 4 | 5 | 5 |
| Iterative | 1 | 2 | 3 | 4 | 5 |
| Agile | 1 | 2 | 3 | 5 | 5 |
| V-Model | 5 | 4 | 3 | 2 | 1 |

| Model | Team Exp 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| Waterfall | 4 | 4 | 4 | 4 | 4 |
| Incremental | 2 | 3 | 3 | 4 | 4 |
| Iterative | 1 | 2 | 2 | 3 | 4 |
| Agile | 1 | 2 | 2 | 4 | 5 |
| V-Model | 4 | 4 | 4 | 4 | 4 |

| Model | Time 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| Waterfall | 2 | 3 | 4 | 4 | 4 |
| Incremental | 4 | 4 | 4 | 3 | 3 |
| Iterative | 5 | 4 | 3 | 2 | 2 |
| Agile | 5 | 4 | 4 | 3 | 3 |

| Model | Tech Risk 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| Waterfall | 1 | 2 | 3 | 4 | 5 |
| Incremental | 3 | 4 | 4 | 4 | 4 |
| Iterative | 4 | 4 | 4 | 3 | 3 |
| Agile | 5 | 5 | 4 | 4 | 4 |
| V-Model | 1 | 2 | 3 | 4 | 5 |
| Spiral | 5 | 5 | 4 | 3 | 2 |

## Klasik 3 Modelin Rolu

Waterfall / Incremental / Iterative uclusu, yasam dongu modelleri literaturunde (ISO/IEC/IEEE 12207 ve SWEBOK'un yasam dongusu bolumu) temel siniflandirmadir. Iterative model mantik olarak Agile'in atasidir. Karsilastirmalarda her zaman bu 3 modeli referans goster, modern Agile/V/Hybrid'i ek olarak ekle.

## SDLC Phase Esitlemesi

| Waterfall | Agile / Scrum |
|-----------|----------------|
| Requirements | Story refinement |
| Design | Sprint planning |
| Implementation | Sprint execution |
| Verification | Sprint review |
| Maintenance | Backlog grooming |

## Quadrant Karar Yardimcisi

```
                  Yuksek Req Netligi
                         |
          V-Model        |     Waterfall
        (regulatif)      |   (klassik plan)
                         |
   Kucuk ─────────────────────────────────── Buyuk
   Takim                                       Takim
                         |
        Agile/Scrum      |     Hybrid
        (start-up)       |  (Water-Scrum-Fall)
                         |
                  Dusuk Req Netligi
```

## Anti-Pattern'ler

- ✗ Waterfall'i "eski" ya da "kotu" gostermek — bazi projeler icin hala en iyi
- ✗ Agile'i her seye uygun gostermek — regulatif/buyuk takimda zor
- ✗ Hybrid'i her zaman "altin orta" yapmak — disiplin gerek, kotusu olabilir
- ✗ Klasik 3 modeli (Waterfall / Incremental / Iterative) karsilastirmadan atlamak
- ✗ Skor vermeden tek model onerme
