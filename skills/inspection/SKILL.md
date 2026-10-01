---
name: inspection
description: >
  IEEE 1028 standardina uygun inspection prosedurleri uretir. Fagan
  metoduna dayanan 6-asamali sablon: Plan / Overview /
  Prepare / Meeting / Rework / Report. Roller (Moderator / Author / Reader /
  Recorder / Inspectors), 9 boyutlu denetim cetveli (Conformance / Editorial /
  Completeness / Correctness / Accuracy / Clarity / Testability / Usability /
  Traceability), Critical/Major/Minor severity. Walkthrough vs Audit vs
  Inspection ayrımı. Tetikleyici: "inspection", "code review", "IEEE 1028",
  "/feza-sqa:inspection".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Inspection (IEEE 1028)

IEEE 1028 ve Fagan metoduna dayanan inspection plani.

## Tetikleyici
- "/feza-sqa:inspection"
- "inspection / code review / IEEE 1028"
- "walkthrough / audit"

## Adim 0 — Bagilami Topla
1. **`SQA_PLAN_*.md`** (varsa) — independence seviyesi
2. **`SRS_*.md`** / **`USER_STORIES_*.md`** / kaynak kod — denetlenecek material
3. **`STAKEHOLDERS_*.md`** — inspector havuzu
4. Yoksa **TEK** soru: "Ne denetlenecek? (Requirements / Design / Code / Test Plan)"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Review tipi** (Inspection / Walkthrough / Audit / Management Review) |
| 2 | **Material boyutu** (page / KLOC) |

## Adim 2 — Bilgi Tabani
- `references/inspection-process.md` — IEEE 1028 6-step + roller + 9 dim cetveli + Walkthrough/Audit/Inspection ayrımı.

## Adim 3 — Uret

### Bolum 1 — Review Tipi Karari (IEEE 1028)

| Tip | Purpose | Method | Participants | Performed on |
|-----|---------|--------|---------------|---------------|
| **Walkthrough** | Evaluate intermediate/end product, educate audience | Presentation | Author + Domain Engineers + Customer | Reqts / Design / Project Plan |
| **Audit** | Independent compliance evaluation | External team | External experts | Reqts / Architecture / Project Plan |
| **Inspection** | Detect & identify anomalies | Pre-meeting review + line-by-line | Moderator / Author / Reader / Recorder / Inspectors (NO management) | Reqts / Design / Code |
| **Management Review** | Monitor progress, status of plans | Status presentation | Management + PM | Plans, schedules |
| **Technical Review** | Evaluate technical soundness | Expert review | Tech leads | Design, Architecture |

→ Bu projede: **<secilen tip>**

### Bolum 2 — Inspection 6-Step

#### Step 1: Plan
- Moderator + Author **inspection team** secer
- Moderator zaman tahmini ve toplanti planlar
- Author **inspection material** dagitir

#### Step 2: Overview (Optional)
- Author material'a bir genel bakis sunar:
  - Format
  - Organization
  - Contents

#### Step 3: Prepare
- Inspectors material'i calisir, comment'lerini isaretler
- Moderator toplanti odasini reservasyona alir + inspection formlarini hazirlar

#### Step 4: Meeting
- Moderator preparation time'i kaydeder
- **Reader** inspection team'i material boyunca yonlendirir
- Inspectors bulgulari raporlar
- **Recorder** her bulgunun severity + category'sini kaydeder
- Moderator tartismalari kisa tutar

#### Step 5: Rework
- Author gerekli degisiklikleri yapar
- Moderator degisiklikleri inceler ve onaylar

#### Step 6: Report
- Moderator gerekli formlari doldurur ve QA Team'e teslim eder
- Moderator sonuc hakkinda Project Manager'i bilgilendirir

### Bolum 3 — Roller

| Rol | Sorumluluk |
|-----|------------|
| **Moderator** | Inspection'i yonetir, Time tracking, kararsiz tartismalari kontrol eder |
| **Author** | Material'i hazirlar ve overview verir; Meeting sirasinda dinler, Rework yapar |
| **Reader** | Material'i Meeting sirasinda yuksek sesle/yapilandirilmis sirayla okur, takım'i yonlendirir |
| **Recorder** | Bulgulari severity + category ile yazar |
| **Inspectors** | Material'i prepare safhasinda inceler, Meeting'te bulgulari raporlar |

> Kural: Inspection'a yonetim katilmaz — yonetici varsa baski yaratir (Fagan 1976; IEEE 1028).

### Bolum 4 — 9 Boyutlu Denetim Cetveli (IEEE 830 / ISO/IEC/IEEE 29148 nitelikleri temelli)

Material tipine gore (Requirements icin tipik):

#### 4.1 Conformance
- Document follows project standards?
- Dogru arac/format kullanilmis mi?
- Table of contents var mi?
- List of figures and tables var mi?

#### 4.2 Editorial
- Yazim denetimi yapildi mi?
- Section numaralari dogru mu?
- Figures/tables numarali dogru mu?
- Cross-references dogru mu?
- Language uygun seviyede mi?
- Sekiller baskida/PDF ciktisinda dogru gorunuyor mu?

#### 4.3 Completeness
- Document tasarim icin yeterli bilgi iceriyor mu?
- Her requirement icin priority belirtili mi?
- Tum interfaceler tanimli mi?
- Tum customer/system needs dahil mi?
- Tum performance objectives belirtili mi?
- Tum error condition'lar listed + behavior tanimli mi?
- Requirements project scope'u kapsiyor mu?
- Scope disinda requirement var mi?

#### 4.4 Correctness
- Cakisan requirement var mi?
- Error message'lar anlamli mi?
- Her requirement customer need'e uyuyor mu?

#### 4.5 Accuracy
- Her requirement need'i tam tanimliyor mu?
- Tum assumption + constraint belirtili mi?
- "Proper" / "sufficient" yerine **quantifiable** definitions kullaniliyor mu?

#### 4.6 Clarity
- Her requirement tek yorumla anlasilir mi?
- Her requirement net mi?

#### 4.7 Testability
- Her requirement test edilebilir mi?

#### 4.8 Usability
- Her requirement kullanilabilir bir fonksiyon mu?
- Otomatik doldurma, tarih secici, baglama duyarli yardim gibi insan faktorleri dusunuldu mu?

#### 4.9 Traceability
- Her requirement uniquely identified mi?
- Her requirement upstream need/objective'a traceable mi?

### Bolum 5 — Severity

| Severity | Tanim | Aksiyon |
|----------|-------|---------|
| **Critical** | If implemented, will cause a major defect in the system | Reinspect zorunlu |
| **Major** | Will cause a defect or make system difficult to use | Rework verification |
| **Minor** | Cosmetic / workaround available | Accept with no/minor rework |

### Bolum 6 — Acceptance Form (IEEE 1028 exit)

Inspection sonrasi karar:
- ☐ Accept with no, or at most minor, reworking
- ☐ Accept with rework verification
- ☐ Reinspect (kritik bulgu cok)

### Bolum 7 — Inspection Forms

#### Form A — Inspection Plan
```
Material: <SRS v0.1.md>
Phase: Requirements
Size: 25 pages
Inspectors: <isim listesi> (5 kisi)
Moderator: <isim>
Author: <isim>
Reader: <isim>
Recorder: <isim>
Estimated time: 5 × (25/10) = 12.5 person-hours (10 pg/hr)
Schedule: <tarih>
Meeting venue: <oda/zoom>
```

#### Form B — Defect Log
```
| # | Page/Line | Severity | Category | Finding | Owner | Status |
|---|-----------|----------|----------|---------|-------|--------|
| 1 | p.5, FR-002 | Major | Clarity | "checkout shall be fast" — quantify (ör. < 2 s p95) | Author | Open |
| 2 | p.7, FR-005 | Critical | Correctness | Conflicts with FR-003 | Author | Open |
```

#### Form C — Inspection Summary
```
Material: <name>
Total time: X person-hours
Defects: Critical: A, Major: B, Minor: C
Decision: Accept / Rework / Reinspect
```

### Bolum 8 — Bu Inspection icin Plan

Specifically:
- Material: <SRS / Design / Code path>
- Inspector havuzu: <names>
- Sure tahmini: <calc>
- Toplanti: <date/time>
- Cetvel: 9 boyutta hangileri uygulanacak (kod icin Editorial atlanir vb.)

## Adim 4 — Self-Check
- [ ] 6-step (Plan/Overview/Prepare/Meeting/Rework/Report) tam mi?
- [ ] 5 rol atandi mi?
- [ ] 9 boyut cetveli (relevant olanlar) var mi?
- [ ] Severity (Critical/Major/Minor) tanimli mi?
- [ ] Acceptance Form 3 secenek var mi?
- [ ] Inspection Forms (A/B/C) hazir mi?
- [ ] Walkthrough/Audit/Inspection farkı acik mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-sqa (SQA)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `INSPECTION_PLAN_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Material + tahmini effort + 5 rol.
3. Cetvel'den hangi boyutlar.
4. Boslik.
5. Sonraki: Inspection sonrasi `/feza-sqa:defect-report` veya `/feza-sqa:metrics-plan` (DRE hesabi).

## Sinirlar
- Max 3 soru.
- Yonetimi inspection'a koyma — IEEE 1028 / Fagan kurali.
- 6-step'den birini atla.
- Severity vermeden bulgu kaydetme.
- Walkthrough vs Inspection farkini karistirma.
