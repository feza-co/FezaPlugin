# SRS Review Rubric (29148 + 25010)

## Skor Skalasi (her kriter)

| Skor | Etiket | Anlam |
|------|--------|-------|
| 5 | Mukemmel | Tam karsilaniyor |
| 4 | Iyi | Kucuk eksik |
| 3 | Orta | Geliştirilmeli |
| 2 | Zayif | Ciddi eksik |
| 1 | Kritik | Yok / yanlis |

Gecer notu: **3.5/5 ortalama** (her boyut + genel).

## Boyut 1 — 29148 Outline Tamligi

Tum bolumler var mi:
- 1.1 Purpose
- 1.2 Scope (in + out)
- 1.3 Product Overview (Perspective + Functions + User Characteristics + Limitations)
- 1.4 Definitions, Acronyms, Abbreviations
- 1.5 References
- 1.6 Document Conventions
- 2.1 External Interface Requirements (User/HW/SW/Comm)
- 2.2 Functional Requirements
- 2.3 Non-Functional Requirements
- 2.4 Design Constraints
- 2.5 Software System Attributes
- 2.6 Supporting Information
- 3. Verification (Traceability)
- 4. Appendices

Skor = (var olan / 14) × 5

## Boyut 2 — FR Kalitesi (8 Bireysel Kriter)

`well-formed-requirements.md` ile ayni:
- Necessary, Appropriate, Unambiguous, Complete, Singular, Verifiable, Feasible, Conforming

Her FR icin 8 kriter ✓/✗. FR skoru = (gecer / 8) × 5. Genel FR skoru = ortalamasi.

## Boyut 3 — NFR Kalitesi + 25010 Etiketleme

Her NFR icin:
- 8 bireysel kriter (FR ile ayni)
- 25010 karakteristigi etiketli mi (Functional Suitability / Performance Efficiency / Compatibility / Interaction Capability / Reliability / Security / Maintainability / Flexibility / Safety)
- Olculebilir esik var mi (sayisal)

NFR skoru = ((bireysel × 0.5) + (etiket × 0.25) + (esik × 0.25)) × 5

## Boyut 4 — Dil Kurallari

`language-guidelines.md`'den:
- "shall" / "-acaktir" kullanimi
- Yasak terimler tarama (kullanici dostu, hizli, esnek, modern, robust, generally, etc.)
- Tek cumle kurali (her req tek cumle)
- Pozitif ifade tercihi
- Numaralandirma tutarliligi (FR-XXX, NFR-XXX)

Skor = ihlal sayisina gore:
- 0 ihlal = 5
- 1-2 = 4
- 3-5 = 3
- 6-10 = 2
- 11+ = 1

## Boyut 5 — Set Butunlulugu

Set kriterleri (well-formed):
- **Complete** — TBD/TBS/TBR sayisi (≤ 3 = 5; 4-7 = 3; 8+ = 1)
- **Consistent** — cakisma var mi (manuel kontrol; varsa req-conflict-check oner)
- **Affordable** — estimate var mi
- **Bounded** — scope disi req var mi

## Boyut 6 — Traceability + Verification

- Her FR/NFR icin Verification Method atamali (Test/Inspection/Demonstration/Analysis)
- Bolum 3 Traceability Matrix var mi
- Test Case ID rezervasyonu var mi

Skor = (atama orani × 5)

## Genel Skor

```
Genel = ortalamasi(6 boyut)
```

| Genel | Verdict |
|-------|---------|
| 4.5 - 5.0 | Paydasa teslime hazir |
| 3.5 - 4.4 | Gecer, kucuk revize |
| 2.5 - 3.4 | Gelistirilmeli |
| 1.5 - 2.4 | Buyuk revize gerek |
| < 1.5 | Tekrar yaz |

## Bulgu Severity (Top-N icin)

| Severity | Tanim |
|----------|-------|
| Critical | Outline'da temel bolum yok / Verification yok |
| High | Set kriteri ihlali / cok sayida well-formed ihlali |
| Medium | NFR etiketsiz / yasak terim |
| Low | Tutarsiz numaralandirma / tipo |

## Cikti Sablonu

```markdown
> **SRS Review** — <Proje>
> Standart: ISO/IEC/IEEE 29148:2018 + ISO/IEC 25010:2023
> Reviewed file: <SRS_*.md>
> Genel skor: X.X / 5
> Verdict: <Gecer / Geliştirilmeli / Tekrar yaz>

## Yonetici Ozeti
[6 boyut tablo]

## Outline Tamlik
[14 bolum tablo]

## FR Detay
[FR x 8 kriter tablo]

## NFR Detay
[NFR x 25010 etiket tablo]

## Yasak Terim Tarama
[terim x adet x konum]

## Set Kriterleri
[4 kriter]

## Traceability + Verification
[atama orani]

## Top-5 Iyilestirme
[severity-rated]

## Sonraki Adim
```
