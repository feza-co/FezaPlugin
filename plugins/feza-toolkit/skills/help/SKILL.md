---
name: help
description: >
  FezaPlugin menüsü. Kullanıcı FezaPlugin'in ne yapabildiğini, hangi skill'lerin
  mevcut olduğunu, hangi standarda/alana dayandığını ve nasıl çağrılacağını öğrenmek istediğinde
  bu skill'i kullan. Tetikleyici ifadeler: "feza ne yapıyor", "yardım", "help",
  "hangi skill'ler var", "menü", "feza komutları", "what can feza do".
---

# FezaPlugin Help

FezaPlugin'de mevcut 39 skill'i, 5 paket altında kategorize biçimde sunar.

## Ne zaman tetiklenir
- "feza ne yapabilir / ne yapıyor"
- "hangi skill'ler var", "yardım", "help", "menü"
- "/feza-toolkit:help", "feza komutları"

## Adımlar
1. Aşağıdaki **Mevcut Skill Tablosu**'nu Markdown tablosu olarak sun.
2. Altına "Yakında" kutusu ekle.
3. Tek cümlelik adım önerisiyle bitir.

## Paketler
FezaPlugin 5 bağımsız pakettir. Her paket kendi ad alanıyla çağrılır; `full-package` gibi paketler arası çalışan skill'ler için ilgili diğer paketlerin de kurulu olması gerekir.

> **Not:** `/feza-toolkit:full-package` diğer paketlerin skill'lerini çağırır; tam paket üretimi için beş paketin tamamını kurun (`feza-requirements`, `feza-pm`, `feza-hci`, `feza-sqa`, `feza-toolkit`).

| Paket | Skill sayısı | Alan |
|-------|--------------|------|
| `feza-requirements` | 6 | Gereksinim mühendisliği |
| `feza-pm` | 12 | Proje yönetimi |
| `feza-hci` | 9 | İnsan-bilgisayar etkileşimi / UX, arayüz tasarımı ve kodlaması |
| `feza-sqa` | 7 | Yazılım kalite güvencesi |
| `feza-toolkit` | 5 | Yardımcı araçlar ve orkestrasyon |

## Mevcut Skill Tablosu (39 skill / 5 paket)

> Her doküman üretiminde kalite kapısı (`references/quality-gate.md`) otomatik çalışır; çıktılar `references/output-conventions.md` uyarınca kapak, özet, içindekiler ve kaynakça ile teslim formatında üretilir.

### feza-toolkit — Yardımcı araçlar
| Komut | Ne yapar | Dayanak |
|-------|----------|---------|
| `/feza-toolkit:help` | Bu menüyü gösterir. | — |
| `/feza-toolkit:lifecycle-pick` | Proje karakteristiklerine göre SDLC modeli önerir (Waterfall / Incremental / Iterative / Agile / V-Model / Hybrid). | ISO/IEC/IEEE 12207, Scrum Guide |
| `/feza-toolkit:full-package` | Brief'ten tüm doküman setini sırayla üretir (orkestrasyon). | Çok paketli |
| `/feza-toolkit:demo-script` | Paydaş / yatırımcı / müşteri sunumu için akış + Q&A bankası üretir. | Sunum pratiği |
| `/feza-toolkit:glossary` | 100+ terimlik TR-EN sözlük üretir. | ISO/IEC/IEEE 24765, PMBOK 7 |

### feza-requirements — Gereksinim Mühendisliği
| Komut | Ne yapar | Dayanak |
|-------|----------|---------|
| `/feza-requirements:srs-generate` | İki modlu (KOD/BRIEF) SRS üretir. Mod kararı için tek soru sorabilir. | ISO/IEC/IEEE 29148:2018, IEEE 830 |
| `/feza-requirements:srs-review` | Mevcut SRS'i well-formed (8 kriter) + 25010 NFR etiketleme + outline tamlık + yasak terim taraması ile puanlar. | ISO/IEC/IEEE 29148, ISO/IEC 25010 |
| `/feza-requirements:req-elicit` | Paydaş rolüne göre elicitation soru paketi (Interview 4 tip / Questionnaire / Workshop / Observation). | SWEBOK Ch.1, ISO/IEC/IEEE 29148 |
| `/feza-requirements:req-classify` | Ham listeyi FR / NFR (25010 etiketli) / Constraint / Assumption / Out-of-Scope'a ayırır + yeniden yazar. | ISO/IEC/IEEE 29148, ISO/IEC 25010 |
| `/feza-requirements:req-conflict-check` | Çakışma (4 tip) + bağımlılık (4 tip) matrisi + topological sort + eskalasyon listesi. | ISO/IEC/IEEE 29148 (analiz), SWEBOK |
| `/feza-requirements:user-story` | Connextra format + INVEST + Given-When-Then + Fibonacci point + MoSCoW + DoR/DoD. | Agile pratikleri (Cohn, Wake) |

### feza-pm — Proje Yönetimi

> Hepsi aynı desende: önce projedeki BRIEF/IDEA/SCOPE/README'yi okur, yoksa tek soruyla brief alır, kritik gri noktaları (max 3) sorar, sonra üretip dosyaya yazar.

| Komut | Ne yapar | Dayanak |
|-------|----------|---------|
| `/feza-pm:scope-statement` | Project Definition + Goals + In/Out Scope + Triple Constraint + Assumptions | PMBOK 7 (Scope), ISO 21502 |
| `/feza-pm:wbs` | 3 seviyeli numaralı Work Breakdown Structure | PMBOK 7, PMI Practice Standard for WBS |
| `/feza-pm:estimate` | Parametric + Bottom-up + **Three-point/PERT** (E, σ, %95 CI) | PMBOK 7 (Schedule/Cost) |
| `/feza-pm:swot` | SWOT matrisi + TOWS çapraz stratejiler | Stratejik planlama, PMBOK 7 (Planning) |
| `/feza-pm:raci` | RACI sorumluluk matrisi (R/A/C/I + yoğunluk özeti) | PMBOK 7 (Resources) |
| `/feza-pm:budget` | Cost baseline + Contingency + Management reserves + Cash-flow | PMBOK 7 (Cost) |
| `/feza-pm:activity-sequence` | Activity tablosu + bağımlılık tipleri (FS/SS/FF/SF) + CPM kritik yol | PMBOK 7 (Schedule) |
| `/feza-pm:risk-register` | Risk kaydı: kategori, olasılık × etki skoru, response stratejisi, owner | PMBOK 7 (Risk), ISO 31000 |
| `/feza-pm:stakeholder-map` | Paydaş analizi + Power/Interest grid | PMBOK 7 (Stakeholders) |
| `/feza-pm:comm-plan` | İletişim planı matrisi (kim, ne, ne zaman, hangi kanal) | PMBOK 7 (Communications) |
| `/feza-pm:conflict-resolve` | Çatışma tipi tespiti + 5 çözüm stratejisi (Avoid / Smooth / Compromise / Force / Collaborate) | Thomas-Kilmann, PMBOK 7 |
| `/feza-pm:competitor-analysis` | Rakip analizi tablosu (özellik, fiyat, konumlandırma) | Porter's Five Forces, pazar analizi pratiği |

### feza-hci — İnsan-Bilgisayar Etkileşimi
| Komut | Ne yapar | Dayanak |
|-------|----------|---------|
| `/feza-hci:hci-review` | Ekran/akış/proje için bütünsel HCI değerlendirmesi. `--fix` ile düzeltir; `--acr` ile VPAT 2.5 INT/EU yapısına uyumlu ACR (WCAG 2.2 A/AA) üretir. | ISO 9241-210, Dix et al. "Human-Computer Interaction" |
| `/feza-hci:heuristic-eval` | Nielsen 10 + Dix prensipleri + WCAG 2.1 AA ile kanıt türlü ve severity (0-4) puanlı bulgu tablosu; aldatıcı tasarım sözlüğünü de uygular. `--fix` ile düzeltir. | Nielsen 1994, WCAG 2.1 |
| `/feza-hci:usability-eval-plan` | Kullanılabilirlik değerlendirme planı: yöntemler, katılımcı formu, görevler, pilot, metrikler; SEQ + UMUX-Lite + HEART, koşullu NASA-TLX. | Nielsen 1993, ISO 9241-11 |
| `/feza-hci:cognitive-load` | Ekran/akışın bilişsel yükünü değerlendirir (Gestalt, feedback/feedforward); Hick-Hyman ve Fitts etkileşim maliyeti. `--fix` ile düzeltir. | Sweller, Miller 1956, Card-Moran-Newell |
| `/feza-hci:color-audit` | Renk paleti ve kontrast denetimi (uyum şemaları, 60-30-10, WCAG oranları, DTCG token desteği). `--fix` ile düzeltir. | WCAG 2.1 (1.4.3 / 1.4.11) |
| `/feza-hci:design-thinking` | 5 aşamalı Design Thinking yol haritası (Empathize → Test). | Stanford d.school, IDEO |
| `/feza-hci:prototype-plan` | Prototip stratejisi: Sketch → Wireframe → Mockup → Prototype, low-fi vs hi-fi seçimi. | Dix et al., Rettig 1994 |
| `/feza-hci:persona` | Kullanıcı persona(ları): hedefler, acı noktaları, davranışlar, teknoloji düzeyi, senaryo; zorunlu veri dayanağı etiketi ve JTBD cümlesi. | Cooper "The Inmates Are Running the Asylum" |
| `/feza-hci:hci-execute` | HCI ilkelerine uygun arayüzü baştan sona tasarlar ve çalışan dosyalar olarak kodlar; E1-E29 kabul setine göre gizli doğrulama yapar + `DESIGN_RATIONALE_<proje>.md`. | ISO 9241-210/110, Nielsen 1994, WCAG 2.1/2.2, Dix et al. |

> **E1-E29 kabul seti:** E1-E13 (axe ihlali, kontrast, dokunma hedefi, yeniden akış, odak, etiket, hareket, metin büyütme) 2.1.0'da eklendi. 2.2.0'da eklenen **E14-E29**: E14 odak örtülmesi, E15 hedef aralığı, E16 metin aralığı, E17 erişilebilir kimlik doğrulama, E18 sürükleme alternatifi, E19 tekrar giriş, E20 tutarlı yardım, E21 forced-colors, E22 prefers-contrast, E23 saydam yüzey, E24 RTL, E25 metin genişlemesi, E26 Türkçe harf dönüşümü, E27 yerel biçim, E28 başlık/bölge yapısı, E29 aldatıcı tasarım (eşit belirginlik). Eşikler feza-hci skill'lerindeki eşik dosyasında; doğrulama ilgili skill'in verify-ui betiğiyle yapılır. `--profile wcag22aa|en301549`, `--static <dizin>`, `--engines axe,ibm`, `--visual <dizin>`, `--aria-baseline <dosya>` bayrakları desteklenir. contrast betiği `--tokens`/`--apca`, measure-vitals betiği lab INP ölçer. Otomatik araçlar WCAG'nin bir kısmını ölçer; 0 ihlal erişilebilirlik kanıtı değildir.

### feza-sqa — Yazılım Kalite Güvencesi
| Komut | Ne yapar | Dayanak |
|-------|----------|---------|
| `/feza-sqa:sqa-plan` | Software Quality Assurance Plan: SQA süreç uygulaması, ürün güvencesi, süreç güvencesi; ISO/IEC 33020 yetenek hedefi. | IEEE 730-2014 |
| `/feza-sqa:test-plan` | Test Plan + Test Case şablonu (TC ID, izlenebilirlik, öncelik, beklenen sonuç). | ISO/IEC/IEEE 29119-3, IEEE 829 |
| `/feza-sqa:metrics-plan` | Pre-/In-/End-process metrik planı (DRE, defect density, boyut). | ISO/IEC/IEEE 15939, IEEE 1061 |
| `/feza-sqa:inspection` | 6 aşamalı inspection prosedürü (Plan / Overview / Prepare / Meeting / Rework / Report). | IEEE 1028, Fagan 1976 |
| `/feza-sqa:traceability-matrix` | Çift yönlü izlenebilirlik matrisi (Need → Req → Design → Code → Test → Defect). | ISO/IEC/IEEE 29148 |
| `/feza-sqa:change-control` | Change Request formu + CCB akışı + etki analizi şablonu. | ISO/IEC/IEEE 12207 §6.3.5, ISO 10007 |
| `/feza-sqa:defect-report` | Defect raporu şablonu: severity/priority, yaşam döngüsü. | IEEE 1044, ISTQB sözlüğü |

## Yakında
- Ek paketler: mimari ve DevOps odaklı skill'ler (yol haritasında; tarih verilmedi).

## Önerilen ilk adım
Projen için bir brief'in varsa `/feza-toolkit:full-package` ile tüm doküman setini üret; yoksa `/feza-pm:scope-statement` ile başla. Arayüzü doğrudan tasarlatıp kodlatmak için `/feza-hci:hci-execute`.
