# Glossary Terms — TR-EN Sozluk

FezaPlugin'in kapsadigi alanlar (gereksinim, proje yonetimi, ISO/IEC standartlari, HCI, SQA) icin standart ve yayin referansli terimler.

> Bu dosya `glossary` skill tarafindan dosyaya yazilirken kaynak olarak kullanilir.

## A

### Acceptance Criteria (Kabul Kriterleri)
**Tanım:** Bir user story'nin "Done" sayilmasi icin gereken kosullar; genelde Given-When-Then formatinda.
**Kaynak:** Cohn, "User Stories Applied" (2004); BDD/Gherkin pratigi
**Skill:** `/feza-requirements:user-story`
**Örnek:** "Given user logged in, When clicks logout, Then session ends."

### Activity Diagram (Aktivite Diyagramı)
**Tanım:** UML davranis diyagrami; sistem akisini ve aktiviteleri gosterir.
**Kaynak:** OMG UML 2.5.1 §15
**Skill:** UML modelleme kapsam disi; akis tablo formati `/feza-pm:activity-sequence`'de
**Örnek:** E-ticaret sepet-odeme akisi

### Agile
**Tanım:** Hizli adaptasyona yonelik iteratif yazilim gelistirme yaklasimi.
**Kaynak:** Agile Manifesto (2001); Scrum Guide 2020
**Skill:** `/feza-toolkit:lifecycle-pick`
**Variants:** Scrum, XP, Kanban

### Audit
**Tanım:** Bir bagimsiz ekibin yazilim urun ve sureclerinin standartlara uyumunu degerlendirmesi.
**Kaynak:** IEEE 1028-2008 §8; ISO/IEC/IEEE 12207:2017
**Skill:** `/feza-iso:iso12207-audit`, `/feza-sqa:inspection`
**Note:** Inspection ile karistirma — Audit external team yapar.

## B

### BRS (Business Requirements Specification)
**Tanım:** 29148'in 4 dokuman tipinden biri; organizasyonel motivasyon, is sürecleri ve hedefleri yonetim perspektifinden tanimlar.
**Kaynak:** ISO/IEC/IEEE 29148:2018 §9.3
**Skill:** `/feza-iso:iso29148-req`

### Bug
**Tanım:** Defect'in informal terimi; yazilimda istenmeyen davranis.
**Kaynak:** IEEE 1044-2009; ISTQB Glossary
**Skill:** `/feza-sqa:defect-report`

## C

### CCB (Change Control Board)
**Tanım:** Change Request'leri inceleyen ve onaylayan/reddeden komite.
**Kaynak:** ISO/IEC/IEEE 12207:2017 §6.3.5; ISO 10007
**Skill:** `/feza-sqa:change-control`

### CMM (Capability Maturity Model)
**Tanım:** Organizasyonel yazilim sureclerinin olgunlugunu 5 seviyede degerlendiren model (CMMI): Initial / Managed / Defined / Quantitatively Managed / Optimizing. Eski CMM v1.1 surumunde seviye 2 Repeatable idi.
**Kaynak:** CMMI for Development v2.0 (ISACA); SEI CMM v1.1 (1993)
**Skill:** `/feza-sqa:sqa-plan`

### Cognitive Complexity Theory (Bilişsel Karmasıklık Teorisi)
**Tanım:** Kullanicilarin bilgiyi nasıl algilayip işlediğini açıklayan psikolojik cerceve.
**Kaynak:** Kieras & Polson (1985); Card, Moran & Newell (1983)
**Skill:** `/feza-hci:cognitive-load`

### Compatibility (Uyumluluk)
**Tanım:** ISO 25010 9 karakteristikten biri; co-existence + interoperability alt-karakterli.
**Kaynak:** ISO/IEC 25010:2023 §4.2.3
**Skill:** `/feza-iso:iso25010-quality`

### Configuration Management (Konfigurasyon Yönetimi)
**Tanım:** Versiyon, degisiklik ve sürüm kontrolüyle takimin her zaman dogru urunde calistigini saglayan process.
**Kaynak:** ISO/IEC/IEEE 12207:2017 §6.3.5; ISO 10007
**Skill:** `/feza-sqa:change-control`

### Connextra Format
**Tanım:** User story sablonu: "As a <role>, I want <goal>, so that <benefit>."
**Kaynak:** Connextra (2001); Cohn (2004)
**Skill:** `/feza-requirements:user-story`

### Constraint (Kisit)
**Tanım:** Tasarim ve gelistirmeyi sinirlandiran zorunlu sart (teknoloji, regulasyon, donanim).
**Kaynak:** ISO/IEC/IEEE 29148:2018 §5.2.8
**Skill:** `/feza-requirements:req-classify`

### CPM (Critical Path Method)
**Tanım:** En uzun aktivite zincirini hesaplayarak proje tamamlanma suresini bulan yontem.
**Kaynak:** PMBOK Guide 7th ed. (Schedule); Kelley & Walker (1959)
**Skill:** `/feza-pm:activity-sequence`

### Critical (Severity)
**Tanım:** Sistemde major defect yaratan veya kullanim engelleyen hata seviyesi.
**Kaynak:** IEEE 1044-2009 (severity siniflandirmasi)
**Skill:** `/feza-sqa:defect-report`, `/feza-sqa:inspection`

## D

### Defect
**Tanım:** Yazilim icindeki potansiyel hata kaynagi; manifest oldugunda failure olur.
**Kaynak:** IEEE 1044-2009; ISO/IEC/IEEE 24765
**Skill:** `/feza-sqa:defect-report`

### Defect Density
**Tanım:** Birim boyut basina defect sayisi (def/KLOC veya def/page).
**Kaynak:** IEEE 982.1; ISO/IEC/IEEE 15939
**Skill:** `/feza-sqa:metrics-plan`

### Definition of Done (DoD)
**Tanım:** Bir user story / feature'in "tamam" sayilmasi icin gereken standart kriterler listesi.
**Kaynak:** Scrum Guide 2020
**Skill:** `/feza-requirements:user-story`

### Definition of Ready (DoR)
**Tanım:** Bir user story'nin sprint'e alınmadan once saglamasi gereken kosullar.
**Kaynak:** Agile pratigi (Scrum Guide'da zorunlu degil; yaygin uygulama)
**Skill:** `/feza-requirements:user-story`

### Design Thinking
**Tanım:** Empathize-Define-Ideate-Prototype-Test 5 asamalı kullanici odakli problem cozme yaklasimi.
**Kaynak:** Stanford d.school 5 asama modeli; IDEO
**Skill:** `/feza-hci:design-thinking`

### DRE (Defect Removal Efficiency)
**Tanım:** Bir aşamada yakalanan defect'lerin toplama orani: Fi / (Fi + Fa) × 100.
**Kaynak:** Jones, "Applied Software Measurement" (2008)
**Skill:** `/feza-sqa:metrics-plan`

## E

### Elicitation (Gereksinim Toplama)
**Tanım:** Stakeholder'lardan gereksinim toplama süreci. 4 yontem: Interview / Questionnaire / Workshop / Observation.
**Kaynak:** SWEBOK v3 Ch.1 §3; ISO/IEC/IEEE 29148:2018 §6.2
**Skill:** `/feza-requirements:req-elicit`

### Estimate
**Tanım:** Effort, sure veya maliyet tahmini. Yontemler: Expert Judgment / Parametric / Bottom-up / Three-Point (PERT).
**Kaynak:** PMBOK Guide 7th ed. (Schedule/Cost)
**Skill:** `/feza-pm:estimate`

## F

### Failure
**Tanım:** Defect'in calisma aninda manifest olmasi (dynamic).
**Kaynak:** ISO/IEC/IEEE 24765; IEEE 1044-2009
**Skill:** `/feza-sqa:defect-report`

### Feedback (HCI)
**Tanım:** Kullanici aksiyonu sonrasi sistem yaniti.
**Kaynak:** Norman, "The Design of Everyday Things" (2013); Dix et al., HCI
**Skill:** `/feza-hci:cognitive-load`

### Feedforward (HCI)
**Tanım:** Kullanici aksiyonu oncesi gelecek sonuc hakkinda ipucu.
**Kaynak:** Djajadiningrat et al. (2002); Norman (2013)
**Skill:** `/feza-hci:cognitive-load`

### Finding (Bulgu)
**Tanım:** Inspection/review sirasinda kayda gecen, henuz defect olarak siniflandirilmamis bulgu; tarafsiz ve suclayici olmayan terim.
**Kaynak:** IEEE 1028-2008 (review bulgusu terimi)
**Skill:** `/feza-sqa:inspection`, `/feza-sqa:defect-report`

### Flexibility (ISO/IEC 25010:2023)
**Tanım:** Eski Portability karakteristiginin 2023'te yeniden adlandirilmis ve genisletilmis hali — urunun degisen baglam ve yuklere uyum kapasitesi (Adaptability, Scalability, Installability, Replaceability).
**Kaynak:** ISO/IEC 25010:2023
**Skill:** `/feza-iso:iso25010-quality`

### Functional Suitability
**Tanım:** ISO 25010 ana karakteristik — sistem fonksiyonlarinin specified gereksinimleri karsilamasi.
**Kaynak:** ISO/IEC 25010:2023 §4.2.1
**Skill:** `/feza-iso:iso25010-quality`

## G

### Gestalt Principles
**Tanım:** Kullaniclarin gorsel ogeleri nasil grupladigini aciklayan psikoloji prensipleri (Proximity / Similarity / Closure / Continuity / Figure-Ground / Common Fate / Symmetry).
**Kaynak:** Wertheimer (1923); Dix et al., HCI
**Skill:** `/feza-hci:cognitive-load`

### Given-When-Then
**Tanım:** Acceptance criteria yazma formati (Gherkin / BDD).
**Kaynak:** North (2006); Cucumber/Gherkin dokumantasyonu
**Skill:** `/feza-requirements:user-story`

## H

### Heuristic (Sezgisel)
**Tanım:** Tasarim degerlendirmesinde kullanilan pratik kural. Nielsen 10, Alan Dix 13.
**Kaynak:** Nielsen (1994); Dix et al., HCI
**Skill:** `/feza-hci:heuristic-eval`

## I

### IEEE 730
**Tanım:** Software Quality Assurance Plans standard.
**Kaynak:** IEEE 730-2014
**Skill:** `/feza-sqa:sqa-plan`

### IEEE 1028
**Tanım:** Software Reviews and Audits standardi (Walkthrough / Audit / Inspection / Management Review / Technical Review).
**Kaynak:** IEEE 1028-2008
**Skill:** `/feza-sqa:inspection`

### Inspection
**Tanım:** IEEE 1028 review tipi — defect detect etmek icin yapilandirilmis line-by-line review (NO management).
**Kaynak:** IEEE 1028-2008 §6; Fagan (1976)
**Skill:** `/feza-sqa:inspection`

### Interaction Capability (önceden Usability)
**Tanım:** ISO 25010:2023'te yeniden adlandirilan karakteristik — kullanicinin urunu kullanma capacity'si. 8 sub-char.
**Kaynak:** ISO/IEC 25010:2023 §4.2.4
**Skill:** `/feza-iso:iso25010-quality`, `/feza-hci:hci-review`

### INVEST
**Tanım:** Iyi user story kriterleri: Independent / Negotiable / Valuable / Estimable / Small / Testable.
**Kaynak:** Wake (2003); Cohn (2004)
**Skill:** `/feza-requirements:user-story`

### ISO 13407
**Tanım:** Human-Centered Design Processes standardi (eski; yerini ISO 9241-210 aldi).
**Kaynak:** ISO 13407:1999 (yerini ISO 9241-210 aldi)
**Skill:** `/feza-hci:hci-review`

### ISO/IEC 25010:2023
**Tanım:** Software Product Quality Model — 9 karakteristik.
**Kaynak:** ISO/IEC 25010:2023
**Skill:** `/feza-iso:iso25010-quality`

### ISO/IEC 29110
**Tanım:** Very Small Entities (≤25 kisi) icin yazilim muhendisligi rehberi. Entry / Basic / Intermediate / Advanced profilleri.
**Kaynak:** ISO/IEC 29110-4-1; 29110-5-1-2
**Skill:** `/feza-iso:iso29110-vse`

### ISO/IEC/IEEE 12207
**Tanım:** Software Lifecycle Processes standardi — 30 process (4 grup).
**Kaynak:** ISO/IEC/IEEE 12207:2017
**Skill:** `/feza-iso:iso12207-audit`

### ISO/IEC/IEEE 15939
**Tanım:** Measurement Process standardi — 4 etkinlik (Establish and sustain commitment / Plan / Perform / Evaluate) ve olcum bilgi modeli (information need → base/derived measure → indicator).
**Kaynak:** ISO/IEC/IEEE 15939:2017
**Skill:** `/feza-iso:iso15939-measure`

### ISO/IEC/IEEE 29148
**Tanım:** Requirements Engineering standardi — 4 doküman tipi (BRS/StRS/SyRS/SRS) + bi-directional traceability.
**Kaynak:** ISO/IEC/IEEE 29148:2018
**Skill:** `/feza-requirements:srs-generate`, `/feza-iso:iso29148-req`

## K

### KLOC (Thousand Lines of Code)
**Tanım:** Yazilim boyut metrigi; 1 KLOC = 1000 satir kod.
**Kaynak:** IEEE 1045-1992 (yazilim uretkenlik metrikleri)
**Skill:** `/feza-sqa:metrics-plan`

## L

### Learnability
**Tanım:** Alan Dix prensibi — kullanicinin sistemi ne kadar hizli ogrenebildigi.
**Kaynak:** Dix et al., HCI (learnability principles); ISO 9241-11
**Skill:** `/feza-hci:heuristic-eval`

## M

### Maintainability
**Tanım:** ISO 25010 karakteristik — yazilimin degisiklik, hata duzeltme, iyilestirmelere ne kadar uyum sagladigi.
**Kaynak:** ISO/IEC 25010:2023 §4.2.7
**Skill:** `/feza-iso:iso25010-quality`

### MoSCoW
**Tanım:** Onceliklendirme metodu: Must have / Should have / Could have / Won't have.
**Kaynak:** DSDM Agile Project Framework (Clegg & Barker, 1994)
**Skill:** `/feza-requirements:user-story`

## N

### Nielsen 10 Heuristics
**Tanım:** Jakob Nielsen'in 10 usability sezgisel kurali (Visibility, Match, Control, Consistency, Prevention, Recognition, Flexibility, Aesthetic, Help-error, Help-doc).
**Kaynak:** Nielsen (1994), "10 Usability Heuristics for User Interface Design"
**Skill:** `/feza-hci:heuristic-eval`

### NFR (Non-Functional Requirement)
**Tanım:** Sistemin nasil davrandigini tanimlayan kalite niteligi gereksinimi (performance, security, usability, vs.).
**Kaynak:** ISO/IEC/IEEE 29148:2018 §5.2.5; ISO/IEC 25010:2023
**Skill:** `/feza-requirements:srs-generate`, `/feza-requirements:req-classify`

## P

### Parametric Estimate
**Tanım:** Tarihsel verilere ve istatistiksel iliskilere dayanan tahmin yontemi.
**Kaynak:** PMBOK Guide 7th ed. (Estimating); Boehm, COCOMO II (2000)
**Skill:** `/feza-pm:estimate`

### Persona
**Tanım:** Hedef kullanicinin temsilî profili: demografi + goals + pain points + senaryo + quote.
**Kaynak:** Cooper, "The Inmates Are Running the Asylum" (1999)
**Skill:** `/feza-hci:persona`

### PERT (Program Evaluation Review Technique)
**Tanım:** 3-point estimation: E = (O + 4M + P) / 6, σ = (P - O) / 6.
**Kaynak:** Malcolm et al. (1959); PMBOK Guide 7th ed.
**Skill:** `/feza-pm:estimate`

### Power/Interest Grid
**Tanım:** Stakeholder'lari guc ve ilgi boyutlarinda 4 kadrana yerlestiren matris.
**Kaynak:** Mendelow (1991); PMBOK Guide 7th ed. (Stakeholders)
**Skill:** `/feza-pm:stakeholder-map`

### Priority (defect)
**Tanım:** Defect'in ne kadar acil duzeltilmesi gerektiği (P1-P4); severity'den ayri kavram.
**Kaynak:** IEEE 1044-2009
**Skill:** `/feza-sqa:defect-report`

### Prototype
**Tanım:** Final urune yaklasik bir model; low-fi (sketch/wireframe) -> mid-fi (mockup) -> hi-fi (clickable).
**Kaynak:** Dix et al., HCI; Rettig (1994)
**Skill:** `/feza-hci:prototype-plan`

## Q

### RACI
**Tanım:** Sorumluluk matrisi: Responsible (yapan) / Accountable (hesap veren tek kisi) / Consulted (danisilan) / Informed (bilgilendirilen).
**Kaynak:** PMBOK Guide 7th ed. (Resources); PMI Practice Guide
**Skill:** `/feza-pm:raci`

### Reliability
**Tanım:** ISO 25010 karakteristik — sistemin belirli kosullarda calismaya devam etme yetenegi.
**Kaynak:** ISO/IEC 25010:2023 §4.2.5
**Skill:** `/feza-iso:iso25010-quality`

### Risk Register
**Tanım:** Riskleri tablo halinde yonetme dosyasi: ID / Kategori / Aciklama / Olasilik / Etki / Skor / Response / Owner.
**Kaynak:** PMBOK Guide 7th ed. (Risk); ISO 31000:2018
**Skill:** `/feza-pm:risk-register`

## S

### Safety (ISO/IEC 25010:2023)
**Tanım:** 2023'te eklenen yeni urun kalite karakteristigi — tanimli kosullarda insan hayati, saglik, mulk veya cevre icin kabul edilemez risk olusturmama (Operational Constraint, Risk Identification, Fail Safe, Hazard Warning, Safe Integration).
**Kaynak:** ISO/IEC 25010:2023
**Skill:** `/feza-iso:iso25010-quality`

### SCOPE
**Tanım:** Project Scope Statement — proje neyi içerir / icermez tanimi.
**Kaynak:** PMBOK Guide 7th ed. (Scope); ISO 21502:2020
**Skill:** `/feza-pm:scope-statement`

### Severity (defect)
**Tanım:** Defect'in teknik etkisi (Critical / Major / Minor / Trivial); priority'den ayri.
**Kaynak:** IEEE 1044-2009
**Skill:** `/feza-sqa:defect-report`

### shall (modal verb)
**Tanım:** 29148 standardinda zorunlu yetenek ifade eden modal fiil. "should" oneri, "may" izin.
**Kaynak:** ISO/IEC/IEEE 29148:2018 §5.2.4
**Skill:** `/feza-requirements:srs-generate`

### Singular (well-formed)
**Tanım:** Bir requirement'in tek bir yetenek/kisit ifade etmesi gerekligi kurali.
**Kaynak:** ISO/IEC/IEEE 29148:2018 §5.2.5
**Skill:** `/feza-requirements:srs-generate`, `/feza-requirements:srs-review`

### SMART
**Tanım:** Hedef yazma kriterleri: Specific / Measurable / Achievable / Relevant / Time-bound.
**Kaynak:** Doran (1981), Management Review
**Skill:** `/feza-pm:scope-statement`

### SoW (Statement of Work)
**Tanım:** Müsteri ile saglanan resmi calisma kapsami dökümani.
**Kaynak:** PMBOK Guide 7th ed. (Procurement)
**Skill:** `/feza-pm:scope-statement`

### Spiral Model
**Tanım:** Boehm'in risk-driven SDLC modeli; her dongude risk analizi.
**Kaynak:** Boehm (1988), IEEE Computer
**Skill:** `/feza-toolkit:lifecycle-pick`

### SRS (Software Requirements Specification)
**Tanım:** Yazilim gereksinim spesifikasyonu — 29148'in 4. doküman tipi.
**Kaynak:** ISO/IEC/IEEE 29148:2018 §9.5; IEEE 830-1998
**Skill:** `/feza-requirements:srs-generate`, `/feza-requirements:srs-review`

### Story Point
**Tanım:** Agile tahmin birimi (Fibonacci: 1/2/3/5/8/13/21).
**Kaynak:** Cohn, "Agile Estimating and Planning" (2005)
**Skill:** `/feza-requirements:user-story`

### SWOT
**Tanım:** Strengths / Weaknesses / Opportunities / Threats analiz matrisi.
**Kaynak:** Humphrey (1960s, SRI); PMBOK Guide 7th ed. (Planning)
**Skill:** `/feza-pm:swot`

## T

### TC (Test Case)
**Tanım:** Tek bir test senaryosu kaydi; ID + Req + Priority + Steps + Expected.
**Kaynak:** ISO/IEC/IEEE 29119-3:2021
**Skill:** `/feza-sqa:test-plan`

### TBD (To Be Determined)
**Tanım:** Henuz belirlenmemis bilgi placeholder'i. 29148 set'inde sayisi sınırlı tutulmali.
**Kaynak:** ISO/IEC/IEEE 29148:2018 §5.2.6
**Skill:** Tum FezaPlugin skill'leri

### Test Plan
**Tanım:** Test stratejisi, kapsami, takvimi, kaynaklari belgeleyen doküman.
**Kaynak:** ISO/IEC/IEEE 29119-3:2021; IEEE 829-2008
**Skill:** `/feza-sqa:test-plan`

### Three-Point Estimate
**Tanım:** Bkz. PERT.
**Kaynak:** PMBOK Guide 7th ed. (Estimating)

### TOWS Matrix
**Tanım:** SWOT'tan turetilmis cross-strategy matrisi: SO / ST / WO / WT.
**Kaynak:** Weihrich (1982), Long Range Planning
**Skill:** `/feza-pm:swot`

### Traceability
**Tanım:** Need → BR → StR → SyR → SR → Design → Code → Test → Defect zincirinin izlenebilirligi.
**Kaynak:** ISO/IEC/IEEE 29148:2018 §5.2.8
**Skill:** `/feza-sqa:traceability-matrix`

### Triple Constraint
**Tanım:** Time / Cost / Quality / Scope dortlusu — biri esnemeden digerleri korunamaz.
**Kaynak:** PMBOK Guide 6th ed. (Scope/Time/Cost); Atkinson (1999)
**Skill:** `/feza-pm:scope-statement`

## U

### UAT (User Acceptance Testing)
**Tanım:** Son kullanici tarafindan kabul testi; validation faaliyeti.
**Kaynak:** ISTQB Glossary; ISO/IEC/IEEE 29119
**Skill:** `/feza-sqa:test-plan`

### Use Case
**Tanım:** Sistem ile aktor arasindaki etkilesim senaryosu.
**Kaynak:** Jacobson (1992); OMG UML 2.5.1 §18
**Skill:** UML modelleme kapsam disi; tablo formatlari diger skill'lerde

### User Story
**Tanım:** Connextra format'inda kullanici perspektifinden yazilan gereksinim.
**Kaynak:** Cohn (2004); Connextra (2001)
**Skill:** `/feza-requirements:user-story`

## V

### Validation
**Tanım:** "Are we building the right system?" — stakeholder needs ile uyum kontrolü; dynamic.
**Kaynak:** ISO/IEC/IEEE 12207:2017 §6.4.13; IEEE 1012-2016
**Skill:** `/feza-sqa:test-plan` (UAT)

### Verification
**Tanım:** "Are we building the system right?" — specs ile uyum kontrolü; mostly static.
**Kaynak:** ISO/IEC/IEEE 12207:2017 §6.4.12; IEEE 1012-2016
**Skill:** `/feza-sqa:inspection`, `/feza-requirements:srs-review`

### V-Model
**Tanım:** Waterfall'in V-sekli versiyonu — her dev fazinin karsisinda test fazi.
**Kaynak:** Forsberg & Mooz (1991); ISO/IEC/IEEE 12207 yasam dongusu yorumu
**Skill:** `/feza-toolkit:lifecycle-pick`

### VSE (Very Small Entity)
**Tanım:** ISO 29110 tanimi — ≤25 kisilik organizasyon/proje.
**Kaynak:** ISO/IEC 29110-1
**Skill:** `/feza-iso:iso29110-vse`

## W

### Walkthrough
**Tanım:** IEEE 1028 review tipi — author'in sundugu, domain engineer + customer'in dahil oldugu egitici review.
**Kaynak:** IEEE 1028-2008 §6
**Skill:** `/feza-sqa:inspection`

### Waterfall
**Tanım:** Sıralı fazlara ayrilmis SDLC modeli; her faz once tamamlanir, sonraki baslar.
**Kaynak:** Royce (1970), "Managing the Development of Large Software Systems"
**Skill:** `/feza-toolkit:lifecycle-pick`

### WBS (Work Breakdown Structure)
**Tanım:** Projeyi hierarchic deliverable'lara böler — 100% rule.
**Kaynak:** PMBOK Guide 7th ed. (Scope); PMI Practice Standard for WBS (3rd ed.)
**Skill:** `/feza-pm:wbs`

### WCAG (Web Content Accessibility Guidelines)
**Tanım:** Web erisilebilirlik standardi (W3C); A / AA / AAA seviyeleri.
**Kaynak:** W3C WCAG 2.1 (2018)
**Skill:** `/feza-hci:color-audit`, `/feza-hci:heuristic-eval`

### Well-Formed Requirement
**Tanım:** 29148'in 8 bireysel kriterine uyan requirement: Necessary, Appropriate, Unambiguous, Complete, Singular, Verifiable, Feasible, Conforming.
**Kaynak:** ISO/IEC/IEEE 29148:2018 §5.2.5
**Skill:** `/feza-requirements:srs-generate`, `/feza-requirements:srs-review`