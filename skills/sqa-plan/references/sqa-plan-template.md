# SQA Plan Template (IEEE 730-2014 / ISO/IEC/IEEE 12207 uyumlu)

## Kalite Tanimlari

Kalite tek bir sekilde tanimlanmaz; plan, projenin hangi bakis acisini onceledigini yazar.

| # | Bakis acisi | Kaynak yaklasimi |
|---|-------------|------------------|
| 1 | Absence of Bugs — hata yoklugu | Savunmaci/mühendislik bakisi |
| 2 | Fitness to Use — kullanima uygunluk | Juran |
| 3 | Meeting Customer Requirements — musteri gereksinimlerine uyum | Crosby ("conformance to requirements") |
| 4 | Meeting Desired Requirements (acik + ima edilen) | ISO 9000, ISO/IEC 25010 |
| 5 | Customer Satisfaction — musteri memnuniyeti | ISO/IEC 25010 "quality in use" |

## Defect Terminology (IEEE 1044 ile uyumlu)

- Fault — kod/tasarimdaki kusur
- Failure — kusurun calisma aninda gorunur sonucu
- Bug — gunluk dilde fault/failure
- Non-Conformity — gereksinim/standarda uymama (ISO 9000)
- Anomaly — beklenenden sapma (IEEE 1044)
- Problem — kullanici/musteri tarafindan bildirilen sorun
- Finding — review/inspection/audit sirasinda tespit edilen bulgu (tarafsiz terim; kisiyi degil urunu isaret eder)

## Quality Hierarchy

- **Q** — Genel kalite felsefesi
- **QC** — Quality Control (urun denetimi)
- **QA** — Quality Assurance (surec guvencesi)
- **QM** — Quality Management
- **TQM** — Total Quality Management

## Yetenek Hedefi — ISO/IEC 33020 Süreç Yetenek Seviyeleri

SQA ve ilgili süreçler için hedef yetenek seviyesi ISO/IEC 33020 ölçüm çerçevesine göre belirlenir. Örnek senaryo: bir e-ticaret ödeme servisi.

| Seviye | Ad | Anlamı (özet) | Ödeme servisi örneği |
|--------|----|---------------|----------------------|
| 0 | Incomplete | Süreç uygulanmıyor ya da amacına ulaşmıyor | Değişiklikler doğrudan canlıya çıkıyor |
| 1 | Performed | Süreç amacına ulaşıyor | Çıkış öncesi test yapılıyor ama kayıt ve plan yok |
| 2 | Managed | Süreç planlanıyor, izleniyor; iş ürünleri kontrol altında | Kod incelemesi ve test planı var, sonuçları kayıtlı |
| 3 | Established | Süreç kurum standardından uyarlanıyor | Tanımlı PR süreci, CI kapıları, ortak Definition of Done |
| 4 | Predictable | Süreç nicel sınırlar içinde işletiliyor | Kusur yoğunluğu ve DRE kontrol sınırlarıyla izleniyor |
| 5 | Innovating | Süreç iş hedeflerine göre sürekli iyileştiriliyor | Kök neden analizinden çıkan iyileştirmeler ölçülerek yaygınlaştırılıyor |

Hedef seviye proje riskine göre gerekçelendirilir; kurum CMMI kullanıyorsa aşağıdaki tablo eşdeğer hedef için kullanılır.

## CMMI — Capability Maturity Model Integration (staged)

| Level | Name | Features | Typical process areas |
|-------|------|----------|-----------------------|
| 1 | Initial | Ad hoc, basari kisilere bagli | Kriz yonetimi |
| 2 | Managed | Temel proje yonetimi, tekrarlanabilir basari | Requirements Mgmt, Project Planning, Project Monitoring & Control, Supplier Agreement Mgmt, Process & Product QA, Configuration Mgmt |
| 3 | Defined | Surecler organizasyon genelinde tutarli | Organizational Process Focus/Definition, Training, Integrated Project Mgmt, Product Integration, Verification, Validation, Risk Mgmt |
| 4 | Quantitatively Managed | Metrik toplanir, surec nicel yonetilir | Organizational Process Performance, Quantitative Project Mgmt |
| 5 | Optimizing | Metrik analiz edilir, surec iyilestirilir | Causal Analysis & Resolution, Organizational Performance Mgmt |

## SQA Spans Lifecycle (ISO/IEC/IEEE 12207)

```
Requirements → Design → Coding → Testing → (Defect) → Maintenance
                                  +
              [Project Mgmt + Quality Mgmt + Configuration Mgmt — cross-cutting]
```

## Lifecycle Method Karsilastirma

| Method | Ne zaman | Avantaj | Dezavantaj |
|--------|----------|---------|------------|
| **Waterfall** | Tum gereksinimler basta belli | Denenmis yapi, kolay planlama | Degisiklik zor ve pahali, musteri sona kadar bekler |
| **Incremental** | Musteri sonu bekleyemez | Kismi urun erken cikar, kaynak verimli | Koordinasyon ve konfigurasyon yonetimi zor, tekrar test |
| **Cyclic / Iterative** | Gereksinimler basta belirsiz | Her cevrimde gereksinim sekillenir, musteri geri bildirimi | Bitis tarihi belirsiz, mimari buyumesi zor |

## IEEE 730-2014 SQA Süreç Alanları

IEEE 730-2014, SQA'yı üç etkinlik alanında tanımlar. Plan her alan için hangi görevlerin, kim tarafından, hangi kanıtla yapılacağını yazar.

| Alan | Görevler (özet) | Tipik kanıt |
|------|-----------------|-------------|
| **SQA process implementation** (SQA süreç uygulaması) | SQA sürecini kurmak; ilgili süreçlerle (proje yönetimi, konfigürasyon yönetimi, V&V) koordinasyon; SQA planlamasını belgelemek; planı uygulamak; SQA kayıtlarını yönetmek; kurumsal bağımsızlık ve nesnelliği değerlendirmek | SQAP, SQA kayıtları, bağımsızlık değerlendirmesi |
| **Product assurance** (ürün güvencesi) | Planların sözleşme ve standartlara uygunluğunu değerlendirmek; ürünlerin gereksinimlere uygunluğunu ve kabul edilebilirliğini değerlendirmek; yaşam döngüsü destek uygunluğunu değerlendirmek; ürünleri ölçmek | İnceleme raporları, test sonuçları, ürün metrikleri |
| **Process assurance** (süreç güvencesi) | Yaşam döngüsü süreçlerinin ve geliştirme ortamlarının uygunluğunu değerlendirmek; tedarikçi süreçlerinin uygunluğunu değerlendirmek; süreçleri ölçmek; personel beceri ve bilgisini değerlendirmek | Süreç denetim raporları, tedarikçi değerlendirmeleri, eğitim kayıtları |

Uygulama yolları: inceleme (review), teftiş (inspection, IEEE 1028), denetim (audit) ve test. Değişiklik kontrolü ve konfigürasyon yönetimi, SQA süreç uygulamasının koordinasyon görevine bağlanır.

## V&V Tanimi (IEEE 1012 / ISO/IEC/IEEE 12207)

- Verification: urunun dogru insa edildiginden emin olmak; her fazin ciktisi o fazin spesifikasyonuna gore kontrol edilir.
- Validation: dogru urunun insa edildiginden emin olmak; son urun hedeflenen kullanim amacina gore dogrulanir.

| Boyut | Verification | Validation |
|-------|---------------|------------|
| Sorulan | Did we build it right? | Did we build the right thing? |
| Karsilastirma | Faz spesifikasyonlari | Hedeflenen kullanim amaci |
| Tip | Agirlikla statik | Agirlikla dinamik |
| Method | Inspection, Audit, Review, Walkthrough | Unit/Integration/System/Acceptance Test |

## Independence Levels (IEEE 1012 bagimsizlik fikri)

| Method | Cost | Time | Quality | Independence |
|--------|------|------|---------|--------------|
| Self | Lowest | Lowest | Lowest | Lowest |
| A person in same project | Low | Low | Low | Low |
| A person in another department | Medium | Medium | Medium | Medium |
| Outsource to another company | High | High | High | High |

## SQA Defect Cost

Bir defect'in duzeltme maliyeti bulundugu faza gore katlanarak artar (Boehm, "Software Engineering Economics", 1981; NIST Planning Report 02-3, 2002). Goreli olcek:

| Faz | Goreli maliyet |
|-----|----------------|
| Requirements | 1 |
| Design | ~5 |
| Coding | ~10 |
| Testing | ~20 |
| Production / Maintenance | 30-100 |

Erken statik inceleme (inspection) maliyeti, ayni defect'in sonraki fazda bulunma maliyetinden cok dusuktur.

## Inspection Maliyet Ornegi (SaaS faturalama modulu)

Varsayimlar:
- Gereksinim fazinda 60 defect kacar.
- Bir defect'i gereksinim fazinda duzeltmek 0.5 saat, testte 10 saat (x20).

| Senaryo | Hesap | Toplam |
|---------|-------|--------|
| Inspection yok, defect'ler testte bulunur | 60 x 10 sa | **600 saat** |
| Gereksinim inspection'i (40 sa efor, %75 yakalama) | 40 + (45 x 0.5) + (15 x 10) | **212.5 saat** |

→ Inspection eforu dahil bile toplam maliyet yaklasik %65 duser. Kendi projenizde birim maliyetleri tarihsel veriyle degistirin (`/feza-sqa:metrics-plan`).

## SQA Plan Iskeleti (IEEE 730 tarzi)

1. Purpose
2. Reference Documents
3. Definitions and Acronyms
4. Quality Goals
5. Yetenek / Olgunluk Hedefi (ISO/IEC 33020 veya CMMI)
6. Surec Methodu
7. SQA Süreç Alanları (IEEE 730-2014: process implementation / product assurance / process assurance)
8. SQA Roles & Responsibilities (Independence)
9. SQA Aktiviteleri (lifecycle bazli)
10. Reviews / Audits / Inspections (IEEE 1028)
11. Testing Approach
12. Metrics (Pre-Process / In-Process / End-Process)
13. Defect Tracking
14. Tools
15. Risks
16. Schedule
17. Success Criteria

## Anti-Pattern'ler

- ✗ "SQA = Test" — test yalnızca ürün güvencesinin bir parçasıdır; süreç güvencesi ve SQA süreç uygulaması eksik kalır
- ✗ Independence Self birakmak ama yuksek kalite hedeflemek
- ✗ Yetenek/olgunluk hedefini gerekçesiz koymak
- ✗ Butun fazlari tek seferde test etme — erken inspection'i atlama
- ✗ Customer satisfaction'i metrik olarak atlama
