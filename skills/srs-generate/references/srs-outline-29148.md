# MSRS-Aligned SRS Outline (IEEE 830 + ISO/IEC/IEEE 29148:2018 + jam01 MSRS)

> Bu outline [jam01/SRS-Template (MSRS)](https://github.com/jam01/SRS-Template) yapisini temel alir,
> ISO/IEC 25010:2023 NFR etiketleme + ISO/IEC/IEEE 29148 iyi-form kriterleri (8 bireysel + 4 set) ile guclendirilmistir.
> Teslim formatinda bu iskeletin onune kapak, TR+EN ozet ve numarali icindekiler eklenir (bkz. `references/delivery-format.md`).

## Iskelet (5 ana bolum + AI/ML eklenebilir)

```
1. Introduction
2. Product Overview
3. Requirements
   3.1 External Interface Requirements
   3.2 Functional Requirements
   3.3 Quality of Service (QoS) Requirements
   3.4 Compliance Requirements
   3.5 Design and Implementation Constraints
   3.6 AI/ML Requirements (opsiyonel)
4. Verification
5. Appendixes
```

## Detay

### 1. Introduction

#### 1.1 Purpose
- Bu SRS in amaci, hedef kitlesi.

#### 1.2 Scope
- Urun adi.
- Ne yapacagi + ne yapmayacagi (in scope / out of scope).
- Is hedefleriyle hizalanma.

#### 1.3 Glossary
- Tum terimler tablo halinde.
- Kisaltmalar + akronimler.

#### 1.4 References
- Standartlar (ISO/IEC/IEEE 29148:2018, ISO/IEC 25010:2023, IEEE 730).
- Kurum dokumanlari, dis kaynaklar.
- Teslim formatinda bu bolum dokumanin kaynakcasidir: IEEE (varsayilan) veya APA, tek stil (bkz. `references/delivery-format.md`).

#### 1.5 Document Conventions
- "shall / should / may" kullanimi.
- Numaralandirma semasi (FR-XXX, QoS-PERF-XXX, CMP-XXX, CON-XXX).
- Versiyonlama, revizyon gecmisi.

### 2. Product Overview

#### 2.1 Context
- Sistem ekosistemdeki yeri.
- Diger sistemlerle etkilesim haritasi.

#### 2.2 Product Functions
- Ana fonksiyonlarin ozet listesi (ust seviye, madde madde).

#### 2.3 User Characteristics
- Kullanici siniflari (admin/user/guest).
- Alan bilgisi ve teknik beceri seviyesi (Yetersiz / Kismi / Yeterli olceginde).

#### 2.4 Constraints (ust seviye)
- Duzenleyici, donanim, ag, guvenlik kisitlari (ozet — detay 3.5 te).

#### 2.5 Assumptions and Dependencies
- Baglam varsayimlari.
- 3rd party bagimliliklar.

#### 2.6 Allocation of Functions
- Insan vs Sistem arasinda gorev paylasimi.

### 3. Requirements

#### 3.1 External Interface Requirements

##### 3.1.1 User Interfaces (UI)
##### 3.1.2 Hardware Interfaces
##### 3.1.3 Software Interfaces
##### 3.1.4 Communication Interfaces

#### 3.2 Functional Requirements (FR)

| ID | Baslik | Aciklama (shall ile) | Oncelik | Stakeholder |
|----|--------|----------------------|---------|--------------|
| FR-001 | Kimlik dogrulama | Sistem kullanicii SAML 2.0 uzerinden 3s icinde dogrulayacaktir. | Yuksek | Son kullanici |

#### 3.3 Quality of Service (QoS) Requirements — MSRS yenisi

NFR'ler 6 alt-bolume dagilmistir:

##### 3.3.1 Performance
| ID | 25010 Sub-char | Gereksinim | Olcut |
|----|----------------|-------------|-------|
| QoS-PERF-001 | Time Behaviour | Ana sayfa 25 Mbps de 2s icinde yuklenecektir. | <= 2s |
| QoS-PERF-002 | Capacity | 1000 eszamanli kullanici desteklenecektir. | >= 1000 |

##### 3.3.2 Security
| ID | 25010 Sub-char | Gereksinim | Olcut |
|----|----------------|-------------|-------|
| QoS-SEC-001 | Confidentiality | Parolalar AES-256 ile sifrelenir. | AES-256 |
| QoS-SEC-002 | Authenticity | TLS 1.3 zorunludur. | TLS 1.3 |

##### 3.3.3 Reliability
| ID | 25010 Sub-char | Gereksinim | Olcut |
|----|----------------|-------------|-------|
| QoS-REL-001 | Availability | %99.9 uptime is saatlerinde. | >= 99.9% |
| QoS-REL-002 | Recoverability | Hata sonrasi 30s icinde geri donus. | RTO < 30s |

##### 3.3.4 Availability (SLA / SLO)
- 99.9% / 99.95% / 99.99% (esik + olcum penceresi).
- Service Level Objectives (SLO).
- Service Level Indicators (SLI).

##### 3.3.5 Observability — MSRS yenisi
| ID | Gereksinim | Olcut |
|----|-------------|-------|
| QoS-OBS-001 | Her HTTP istegi structured log. | JSON, >= INFO |
| QoS-OBS-002 | Aktif kullanici Prometheus metrigi. | active_users gauge |
| QoS-OBS-003 | 5xx hatalari Sentry ye. | Tum 5xx |

##### 3.3.6 Usability / Interaction Capability (ISO 25010:2023)
| ID | Sub-char | Gereksinim |
|----|----------|-------------|
| QoS-UX-001 | Learnability | 30 dk egitim sonra ana akis. |
| QoS-UX-002 | Inclusivity | WCAG 2.1 AA kontrast. |

#### 3.4 Compliance Requirements — MSRS yenisi (AYRI BOLUM)

Regulatif/sozlesmesel zorunluluklar.

| ID | Duzenleyici | Gereksinim | Kanit |
|----|-------------|-------------|-------|
| CMP-001 | KVKK Madde 6 | Ozel nitelikli veri acik riza olmadan islenmez. | DPIA |
| CMP-002 | GDPR Article 17 | Silme talebi 30 gun icinde islenir. | Audit log |
| CMP-003 | ISO 27001 | Yillik penetrasyon testi. | Test raporu |

#### 3.5 Design and Implementation Constraints — MSRS yenisi (genisletilmis)

##### 3.5.1 Implementation
- Programlama dili, cati (Python 3.12+, FastAPI vs).
- Veritabani (PostgreSQL 16+).

##### 3.5.2 Installation and Deployment
- Hedef ortam (Linux, Docker, K8s).

##### 3.5.3 Build and Delivery (Continuous Delivery) — MSRS yenisi
- CI: GitHub Actions / GitLab CI.
- Otomatik test gecmeden merge YASAK.
- Production deploy sikligi tanimli (or. her sprint sonunda).

##### 3.5.4 Distribution
- Self-hosted on-prem / SaaS / hybrid.

##### 3.5.5 Maintainability
- Code review zorunlu.
- Test coverage >= %80.

##### 3.5.6 Reusability
- Mikroservis siniri.

##### 3.5.7 Portability (ISO/IEC 25010:2023 etiketi: Flexibility)
- Docker container — herhangi bir Linux host.

##### 3.5.8 Cost
- Hosting butce siniri.

##### 3.5.9 Deadlines
- Faz teslim tarihleri.

##### 3.5.10 Points of Contact (POCs)
- Tech Lead, PO, External vendors.

##### 3.5.11 Change Management
- /feza-sqa:change-control referansi + CCB.

#### 3.6 AI/ML Requirements (opsiyonel) — MSRS yenisi

> Sadece projede AI/ML bilesen varsa.

##### 3.6.1 Model Specifications
- Tip (LLM/classifier/regression), versiyon, latency hedef.

##### 3.6.2 Data Management
- Egitim verisi kaynak + lisans.
- PII anonimlestirme.
- Bias/fairness.

##### 3.6.3 Guardrails
- Input filtreleme (prompt injection).
- Output filtreleme (toxic, PII leak).
- Rate limiting.

##### 3.6.4 Ethics
- Transparency, fairness, accountability.
- Kullaniciya AI bildirimi.

##### 3.6.5 Human-in-the-Loop
- Hangi kararlar insan onayi.
- Override mekanizmasi.

##### 3.6.6 Lifecycle Management
- Retraining sikligi.
- Drift detection.
- A/B test.

### 4. Verification

| Req ID | Yontem | Test Case ID | Ortam |
|--------|--------|--------------|--------|
| FR-001 | Test | TC-001 | Staging |
| QoS-PERF-001 | Demonstration | TC-101 | Production-like |
| QoS-SEC-001 | Inspection | – | Code review |
| CMP-001 | Audit | – | DPIA review |

#### 4.1 Verification Methods
- Test, Inspection (IEEE 1028), Demonstration, Analysis.

#### 4.2 Verification Environments
- Local / Staging / Production-like / Production.

#### 4.3 Traceability Matrix
- Bi-directional — /feza-sqa:traceability-matrix.

### 5. Appendixes

- A: Glossary (extended)
- B: Analysis models
- C: TBD list
- D: Revision history
- E: Related artifacts

Teslim formatinda Bilinen Bosluklar (TBD listesi) ve opsiyonel Doküman Onayı / Sorumluluk Beyanı bu bolume eklenir.

---

## ISO 25010:2023 Sub-Characteristic Eslemesi

| Ana Karakteristik | Sub-characteristics |
|---------------------|----------------------|
| Functional Suitability | Completeness, Correctness, Appropriateness |
| Performance Efficiency | Time Behaviour, Resource Utilisation, Capacity |
| Compatibility | Co-existence, Interoperability |
| Interaction Capability | Recognizability, Learnability, Operability, Error Protection, Engagement, Inclusivity, Assistance, Self-descriptiveness |
| Reliability | Faultlessness, Availability, Fault Tolerance, Recoverability |
| Security | Confidentiality, Integrity, Non-repudiation, Accountability, Authenticity, Resistance |
| Maintainability | Modularity, Reusability, Analysability, Modifiability, Testability |
| Flexibility (eski Portability) | Adaptability, Scalability, Installability, Replaceability |
| Safety (yeni 2023) | Operational Constraint, Risk Identification, Fail Safe, Hazard Warning, Safe Integration |

## Dokuman Tipleri (ISO/IEC/IEEE 29148:2018, Madde 9)

| Tip | Adi | Amaci |
|-----|-----|-------|
| BRS | Business Requirements | Organizasyonel motivasyon |
| StRS | Stakeholder Requirements | Kullanici ihtiyaclari |
| SyRS | System Requirements | Teknik sistem |
| SRS | Software Requirements | Yazilim (varsayilan) |

## Uc Cekirdek Surec (ISO/IEC/IEEE 29148:2018, Madde 6)

1. Business or Mission Analysis
2. Stakeholder Needs and Requirements Definition
3. System Requirements Definition

## MSRS vs Klasik 29148 Farklari

| Boyut | Klasik 29148 | MSRS |
|-------|---------------|------|
| NFR yerlesimi | "Specific Requirements 2.3" | QoS — performance/security/reliability/availability/observability/usability ayri |
| Compliance | Constraints altinda | Ayri 3.4 bolumu |
| Observability | – | Yeni QoS sub-section |
| AI/ML | – | Ayri 3.6 bolumu (opsiyonel) |
| Continuous Delivery | – | Design constraints altinda |

## Yazim Kurallari

`well-formed-requirements.md` ve `language-guidelines.md` kurallari tum bolumlere uygulanir:
- Her gereksinim shall (TR: -acaktir/-ecektir).
- Yasak terimler yerine olculebilir esik.
- Singular: bir cumle = bir gereksinim.
- Bireysel: Necessary, Appropriate, Unambiguous, Complete, Singular, Verifiable, Feasible, Conforming.
- Set: Complete, Consistent, Affordable, Bounded.
