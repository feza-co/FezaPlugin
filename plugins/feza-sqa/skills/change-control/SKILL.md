---
name: change-control
description: >
  Change Request (CR) formu + Change Control Board (CCB) akisi + impact
  analysis sablonu uretir. SQA'nin change control sutunu (IEEE 730) + PMBOK
  Integrated Change Control + ISO/IEC/IEEE 12207 6.3.5 Configuration
  Management process'ine uyumlu. CR
  durumlari (Proposed/Under Review/Approved/Rejected/Implementing/Verified/
  Closed), severity, impact analiz formu, voting protokolu. Tetikleyici:
  "change request", "change control", "CCB", "/feza-sqa:change-control",
  "degisiklik kontrol".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Change Control

CR formu + CCB akisi + impact analiz.

## Tetikleyici
- "/feza-sqa:change-control"
- "change control / CCB"
- "change request / degisiklik talebi"

## Adim 0 — Bagilami Topla
1. **`SCOPE_*.md`** — baseline kapsam
2. **`SRS_*.md`** — etkilenebilecek requirement
3. **`STAKEHOLDERS_*.md`**, **`RACI_*.md`** — CCB uyeleri
4. **`SQA_PLAN_*.md`** (varsa) — change control referans
5. Yoksa **TEK** soru: "Tek seferlik bir CR mi olusturacagiz, yoksa CCB ve genel akış mı?"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **CCB uyeleri** (PM + Tech Lead + QA + Sponsor varsayilan) |
| 2 | **Threshold** (kucuk degisiklik kim onaylar — varsayilan: < 1 gun PM tek; >= 1 gun CCB) |

## Adim 2 — Bilgi Tabani
- `references/change-control-process.md` — CR sablonu + impact analiz + CCB akisi.

## Adim 3 — Uret

### Bolum 1 — Change Control Board (CCB) Yapisi

| Rol | Sahip | Onay yetkisi |
|-----|-------|---------------|
| **CCB Chair** | PM | Karar oylamasi yonetir |
| **Tech Lead** | <isim> | Teknik impact degerlendirir |
| **QA Lead** | <isim> | Test impact + risk |
| **Sponsor / Product Owner** | <isim> | Business impact + buyutce yetkisi |
| **Configuration Manager** | <isim> | CR numaralandirma, audit trail |

CCB toplanma sıklığı: **Haftalik** (acil cr'ler ad-hoc).

### Bolum 2 — CR Durumlari (State Machine)

```
[Proposed] -> [Under Review] -> [Approved] -> [Implementing] -> [Verified] -> [Closed]
                |                  |                                            
                v                  v                                            
            [Rejected]         [Deferred]                                       
                                   |                                            
                                   v                                            
                               [Re-evaluate next sprint]                        
```

| State | Anlam |
|-------|-------|
| Proposed | Kullanici/team uyesi tarafindan acildi |
| Under Review | CCB Chair atadi, impact analysis yapiliyor |
| Approved | CCB onayladi |
| Rejected | CCB reddetti (gerekce zorunlu) |
| Deferred | Sonraki sürüme erteleniyor |
| Implementing | Geliştirme baslandi |
| Verified | Test pas |
| Closed | Production'a girdi + dogrulandı |

### Bolum 3 — CR Form (sablon)

```markdown
# Change Request — CR-XXX

## Header
- **CR ID:** CR-001
- **Date Submitted:** 2026-05-05
- **Submitter:** <isim, rol>
- **Priority:** Critical / High / Medium / Low
- **State:** Proposed
- **Target Release:** v1.2

## 1. Description
- **Title:** Tek cumle ozet
- **Detail:** 1-3 paragraf, neden gerekli + ne degisecek
- **Affected Items:** SR-XXX, Module Y, Test Z (mevcut traceability'den)

## 2. Justification
- **Business Reason:** Neden simdi
- **Customer Impact:** Yapilmazsa ne olur

## 3. Impact Analysis (CCB doldurur)

### 3.1 Scope Impact
- Scope statement etkileniyor mu? Hangi item?

### 3.2 Schedule Impact
- Estimated effort: X person-days
- Critical path etkilenir mi?
- Yeni tarih: ...

### 3.3 Cost Impact
- Estimated cost: $X
- Reserve'e dusuyor mu, ek finansman mı?

### 3.4 Quality Impact
- Risk: <new tech debt, test coverage drop, etc.>
- Hangi 25010 karakteristigi etkileniyor?

### 3.5 Stakeholder Impact
- Etkilenen kullanici sınıfı + iletişim plani

### 3.6 Dependency Impact
- Hangi req/test/design degisecek (`/feza-sqa:traceability-matrix` cikti referansli)

### 3.7 Risk
- Yapma riski + Yapmama riski

## 4. CCB Decision
- **Vote:** PM (Approve) / Tech Lead (Approve) / QA (Approve / Conditional) / Sponsor (Approve)
- **Decision:** Approved / Rejected / Deferred
- **Conditions:** (varsa)
- **Decided Date:** 2026-05-07

## 5. Implementation
- **Owner:** <developer>
- **Estimated complete:** 2026-05-12
- **Branch:** feature/CR-001
- **PR:** #42

## 6. Verification
- **Tests added/updated:** AUTH-89, AUTH-90
- **Acceptance:** ☐ Pass

## 7. Closure
- **Released in:** v1.2.0
- **Documentation updated:** ☑
- **Stakeholder notified:** ☑
- **Lessons learned:** (opsiyonel)
```

### Bolum 4 — Impact Analysis Worksheet

CCB CR'i degerlendirirken `/feza-sqa:traceability-matrix` ciktisini referans alarak:

| Etkilenen | Tip | Aciklama | Effort |
|-----------|-----|----------|--------|
| SR-008 | Modify | Login validation kuralı değişiyor | 0.5 gun |
| FR-009 | Add | Yeni şifre kuralı | 1 gun |
| AUTH-12 | Update | Test datası degişti | 0.25 gun |
| AUTH-13 | Update | Negative test eklendi | 0.25 gun |
| Components/Login.tsx | Modify | Yeni regex | 0.5 gun |
| docs/auth.md | Update | Doküman | 0.25 gun |
| **TOPLAM** | | | **2.75 gun** |

### Bolum 5 — Voting Protokolu

CCB uyeleri her CR'da:
- ☐ Approve
- ☐ Reject (gerekce zorunlu)
- ☐ Conditional Approve (kosullar zorunlu)
- ☐ Defer (sonraki sürüme)

**Kararname kuralı:** PM + Sponsor + (Tech Lead VEYA QA Lead) onayı zorunlu. Reddetme: tek bir uye yeterli.

### Bolum 6 — Threshold ve Express Track

Kalite oncelikli (PMBOK Integrated Change Control ile uyumlu) yaklasim:

| Buyukluk | Onay yolu | Sure |
|----------|-----------|------|
| Trivial (< 0.25 gun) | Tek developer + code review | Saat |
| Small (< 1 gun) | PM tek onay | 1 gun |
| Medium (1-5 gun) | Mini-CCB (PM + Tech Lead) | 2-3 gun |
| Large (> 5 gun) | Tam CCB | 1 hafta |
| Architectural | Tam CCB + Sponsor | 2 hafta |

### Bolum 7 — Audit Trail

Her CR icin:
- Submission timestamp
- State transition log (kim, ne zaman, hangi state'e)
- Vote history
- Final decision rationale

ISO 12207 6.3.5 Configuration Mgmt'in kanitidir. Audit'te talep edilir.

### Bolum 8 — CR Metrikleri (`/feza-sqa:metrics-plan` ile entegre)

| Metrik | Hedef |
|--------|-------|
| CR cycle time (Proposed → Closed) | < 2 hafta median |
| CR approval rate | > %70 (cok dusukse threshold yanlis) |
| CR rework rate (Verified'tan Implementing'e geri donus) | < %10 |
| Scope creep (toplam CR effort / planned effort) | < %15 |

## Adim 4 — Self-Check
- [ ] CR sablonu 7 bolum tam mi?
- [ ] Impact analysis 7 boyut (Scope/Schedule/Cost/Quality/Stakeholder/Dependency/Risk) mi?
- [ ] CCB rolleri + voting protokolu net mi?
- [ ] State machine ve gecisler tanimli mi?
- [ ] Threshold/Express Track tanimli mi?
- [ ] Audit trail gereksinimi belirtildi mi?
- [ ] Metrik var mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-sqa (SQA)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `CHANGE_CONTROL_<proje>.md` (sistem dokumani) veya `CR_<id>_<proje>.md` (tek CR)

## Adim 6 — Rapor
1. Dosya yolu.
2. CCB üyeleri sayisi.
3. State sayisi (8 default).
4. Boslik.
5. Sonraki: yeni CR cikinca bu sablon kullanilir; metrikleri `/feza-sqa:metrics-plan` izler.

## Sinirlar
- Max 3 soru.
- Tek kisilik onayla buyuk CR yapma — CCB'siz kapsam buyutme.
- Impact analiz olmadan onay verme.
- State'leri atlama (Approved'tan direkt Closed olamaz — Implementing + Verified zorunlu).
- Reddetme gerekcesini bos birakma.
