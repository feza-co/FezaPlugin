---
name: sqa-plan
description: >
  IEEE 730-2014 uyumlu Software Quality Assurance Plan uretir. SQA yapisi
  standardin uc etkinlik alanina dayanir: SQA process implementation,
  product assurance, process assurance; uygulama yollari Inspection/Review/
  Audit/Test. Quality definitions (Absence of Bugs / Fitness to Use /
  Customer Satisfaction), ISO/IEC 33020 yetenek seviyeleri (0-5) veya CMMI 1-5. Once
  SCOPE/SRS/STAKEHOLDERS dosyalarini okur. Tetikleyici: "SQA plan",
  "kalite plani", "/feza-sqa:sqa-plan", "IEEE 730".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# SQA Plan

IEEE 730-2014 uyumlu SQA Plan iskeleti.

## Tetikleyici
- "/feza-sqa:sqa-plan"
- "SQA plan / kalite plani"
- "IEEE 730 plan"

## Adim 0 — Bagilami Topla
1. **`SCOPE_*.md`** — proje boyutu, triple constraint
2. **`SRS_*.md`** — quality dimensions input
3. **`STAKEHOLDERS_*.md`** — QA roles
4. **`RACI_*.md`** (varsa) — sorumluluk
5. **`ISO25010_QUALITY_*.md`** (varsa) — kalite hedefleri
6. **`MEASUREMENT_PLAN_*.md`** (varsa) — metrik
7. Yoksa **TEK** soru: "SQA plani hangi proje icin? (kisa brief)"

## Adim 1 — Gri Nokta (max 3)

| # | Gri nokta |
|---|-----------|
| 1 | **Hedef yetenek seviyesi** (ISO/IEC 33020: 0-5; kurum CMMI kullaniyorsa CMMI seviyesi) |
| 2 | **Independence seviyesi** (Self/Same project/Department/Outsource) |
| 3 | **Surec methodu** (Waterfall/Incremental/Cyclic) |

## Adim 2 — Bilgi Tabani
- `references/sqa-plan-template.md` — IEEE 730-2014 iskeleti + uc SQA surec alani + ISO/IEC 33020 / CMMI tablolari.

## Adim 3 — Uret

### IEEE 730 Tarzi SQA Plan Iskeleti

```markdown
# Software Quality Assurance Plan

## 1. Purpose
SQA Plan'in amaci, kapsami, hedefler.

## 2. Reference Documents
- ISO/IEC 25010:2023, IEEE 730, IEEE 1028, ISO/IEC/IEEE 12207

## 3. Definitions and Acronyms
Quality terimleri: Faults, Failure, Bug, Non-Conformity, Anomaly, Problem, Finding

## 4. Quality Goals
Bes yaygin kalite tanimi (Crosby, Juran, ISO 9000 ve ISO/IEC 25010 yaklasimlari):
1. Absence of Bugs
2. Fitness to Use
3. Meeting Customer Requirements
4. Meeting Desired Requirements (Implicit + Explicit)
5. Customer Satisfaction

Bu projede oncelikli quality goal (1 cumle).

## 5. Yetenek / Olgunluk Hedefi

| Surec | Mevcut seviye (ISO/IEC 33020) | Hedef seviye | Gerekce |
|-------|-------------------------------|--------------|---------|
| Quality Assurance | 1 — Performed | 3 — Established | ... |
| Verification / Validation | ... | ... | ... |
| Configuration Management | ... | ... | ... |

Kurum CMMI kullaniyorsa hedef CMMI seviyesi ile birlikte yazilir (ör. "CMMI 3 — Defined").

## 6. Surec Methodu

Secilen: Waterfall / Incremental / Cyclic
**Gerekce:** ...

## 7. SQA Surec Alanlari (IEEE 730-2014)

### 7.1 SQA Process Implementation
- SQA surecinin kurulmasi ve bu planin (SQAP) belgelenmesi
- Proje yonetimi, konfigurasyon yonetimi ve V&V ile koordinasyon → `/feza-sqa:change-control`
- SQA kayitlarinin yonetimi (nerede, ne kadar sure, kim erisir)
- Kurumsal bagimsizlik ve nesnellik degerlendirmesi (Bolum 8)

### 7.2 Product Assurance
- Planlarin sozlesme ve standartlara uygunluk degerlendirmesi
- Urunlerin gereksinimlere uygunlugu: inceleme ve teftis (`/feza-sqa:inspection`), test (`/feza-sqa:test-plan`)
- Urun kabul edilebilirligi: kabul testi, kullanici dogrulamasi
- Urun olcumu: kusur yogunlugu, kapsama (`/feza-sqa:metrics-plan`)

### 7.3 Process Assurance
- Yasam dongusu sureclerinin uygunluk degerlendirmesi (kodlama standartlari, branch politikasi, kod incelemesi zorunlulugu, Definition of Done)
- Gelistirme ve test ortamlarinin uygunlugu
- Tedarikci / alt yuklenici sureclerinin uygunlugu
- Surec olcumu (DRE, inceleme verimi) ve personel beceri degerlendirmesi

### 7.4 Uygulanan Standartlar
- IEEE 730 (SQA), IEEE 1028 (Reviews and Audits), IEEE 1012 (V&V)
- ISO/IEC/IEEE 12207 (Yasam dongusu), ISO/IEC 25010:2023 (Kalite modeli), ISO/IEC/IEEE 29148 (Gereksinimler)

### 7.5 V&V Ozeti
- Verification: "Built it right" — statik (inspection, review, audit)
- Validation: "Right product" — dinamik (testing, UAT)

## 8. SQA Roles & Responsibilities

Independence seviyesi: Self / Same project / Department / Outsource
**Secilen:** ...

| Rol | Sorumluluk | Independence |
|-----|------------|--------------|
| QA Lead | Plan, denetim | Department |
| Test Engineer | Test execution | Same project |
| External Auditor | Compliance audit | Outsource |

## 9. SQA Aktiviteleri (lifecycle bazli)

| Phase | SQA Activities |
|-------|----------------|
| Requirements | Inspection (Conformance/Editorial/Completeness/Correctness/Accuracy/Clarity/Testability/Usability/Traceability), Walkthrough |
| Design | Inspection, technical review |
| Coding | Code review, static analysis, unit test |
| Testing | Test execution, defect tracking |
| Maintenance | Regression test, defect prevention |
| Cross-cutting | Project Mgmt, Quality Mgmt, Configuration Mgmt |

## 10. Reviews / Audits / Inspections

→ `/feza-sqa:inspection` IEEE 1028 detay

## 11. Testing Approach

→ `/feza-sqa:test-plan` referans

## 12. Metrics

→ `/feza-sqa:metrics-plan` referans

| Tip | Ornek |
|-----|-------|
| Pre-Process | Effort tahmini, defect tahmini |
| In-Process | Defect density, defect removal rate |
| End-Process | DRE (Defect Removal Efficiency), customer satisfaction |

## 13. Defect Tracking

→ `/feza-sqa:defect-report` referans

## 14. Tools
- Bug tracker: Jira / GitHub Issues
- CI/CD: GitHub Actions / Jenkins
- Static analysis: ESLint / SonarQube
- Test framework: ...

## 15. Risks
SQA-specific riskler:
- Coverage hedefini tutmama
- Inspection yorgunlugu
- Test data eksikligi

## 16. Schedule
Major SQA milestones (Project schedule'a entegre).

## 17. Success Criteria
- Kacinci defect customer'da bulundu (hedef: <10%)
- Test coverage (>80%)
- DRE (>85%)
- Customer satisfaction (post-release survey >4/5)
```

## Adim 4 — Self-Check
- [ ] 5 quality definition referans verildi mi?
- [ ] Hedef yetenek/olgunluk seviyesi gerekceli mi?
- [ ] IEEE 730-2014'un uc surec alani (process implementation / product assurance / process assurance) tam mi?
- [ ] Independence seviyesi belirtildi mi?
- [ ] Lifecycle bazli SQA aktiviteleri var mi?
- [ ] Diger FezaPlugin skill'leriyle linkler atilmis mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-sqa (SQA)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `SQA_PLAN_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Hedef yetenek seviyesi + Independence + method.
3. Eslenmis FezaPlugin skill sayisi.
4. Boslik.
5. Sonraki: `/feza-sqa:test-plan` veya `/feza-sqa:inspection`.

## Sinirlar
- Max 4 soru.
- IEEE 730 outline atlama.
- SQA = sadece test demek YASAK — uc surec alani tam.
- Independence belirtmeden bitirme.
