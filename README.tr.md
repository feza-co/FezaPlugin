# FezaPlugin

[![CI](https://github.com/feza-co/FezaPlugin/actions/workflows/ci.yml/badge.svg)](https://github.com/feza-co/FezaPlugin/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-informational.svg)](CHANGELOG.md)
[![Platforms](https://img.shields.io/badge/platforms-Claude%20Code%20%7C%20Codex%20%7C%20Cursor%20%7C%20Gemini%20CLI-555.svg)](docs/installation.md)

[English](README.md)

FezaPlugin, bir proje özetini (brief) ya da mevcut bir kod tabanını standartlara uygun yazılım
mühendisliği dokümanlarına dönüştüren 45 ajan skill'inden oluşan bir settir: gereksinim
spesifikasyonları, proje planları, ISO uyum değerlendirmeleri, UX değerlendirmeleri ve kalite
güvence planları; ayrıca HCI ilkelerinden tasarlanmış, erişilebilirliği denetlenmiş, çalışan
kullanıcı arayüzleri. Her skill deponuzda mevcut olanı okur, en fazla birkaç hedefli soru sorar ve
projenize eksiksiz, incelemeye hazır bir Markdown dokümanı yazar.

## Neden FezaPlugin

- **Standartlara uygun çıktı.** Dokümanlar ISO/IEC/IEEE 29148, IEEE 830, ISO/IEC 25010,
  ISO/IEC/IEEE 12207, ISO/IEC 29110, ISO/IEC/IEEE 15939, IEEE 730, IEEE 1028, PMBOK ve
  WCAG 2.1 ile uyumludur.
- **Önce bağlam, sonra soru.** Skill'ler bir şey sormadan önce README, manifest, kaynak kod ve
  önceki FezaPlugin çıktılarını tarar; soru sayısı küçük ve sabit bir sınırla tutulur.
- **Zincirleme iş akışı.** Çıktılar birbirini besler: kapsamdan WBS'e, WBS'ten tahmine,
  tahminden bütçe ve takvime; SRS'ten kullanıcı hikâyelerine, test planına ve izlenebilirlik
  matrisine.
- **Tutarlı teslim formatı.** Her doküman kapak sayfası, iki dilli özet, numaralı içindekiler,
  kaynakça ve "Bilinen Boşluklar" bölümüyle gelir; istenirse sade formatta üretilir.
- **Modüler paketler.** Ekibinizin ihtiyaç duyduğu paketleri kurun; her paket tek başına çalışır.
- **Çok platformlu.** Tek depo Claude Code, Codex, Cursor, Gemini CLI ve Agent Skills formatını
  destekleyen her istemciye hizmet verir.

## Paketler

| Paket | Skill | Odak |
|-------|------:|------|
| [`feza-requirements`](plugins/feza-requirements) | 6 | Gereksinim mühendisliği: SRS üretimi ve incelemesi, elicitation, sınıflandırma, çakışmalar, kullanıcı hikâyeleri |
| [`feza-pm`](plugins/feza-pm) | 12 | Proje yönetimi: kapsam, WBS, tahmin, bütçe, takvim, risk, RACI, paydaşlar, iletişim |
| [`feza-iso`](plugins/feza-iso) | 6 | ISO/IEC uyumu: 12207, 29110, 25010, 15939, 29148 |
| [`feza-hci`](plugins/feza-hci) | 9 | HCI ve UX: değerlendirmeler, heuristik denetim, kullanılabilirlik testi, erişilebilirlik, personalar, arayüz tasarımı ve kodlaması |
| [`feza-sqa`](plugins/feza-sqa) | 7 | Yazılım kalite güvencesi: SQA planı, test planı, metrikler, inceleme, izlenebilirlik, değişiklik ve kusur kontrolü |
| [`feza-toolkit`](plugins/feza-toolkit) | 5 | Paketler arası araçlar: menü, yaşam döngüsü seçimi, tam paket orkestrasyonu, demo senaryosu, sözlük |

> **Not:** `/feza-toolkit:full-package` diğer paketlerin skill'lerini çağırır. Eksiksiz bir doküman
> seti üretmek için altı paketin tamamını kurun.

## Skill'ler

Komutlar Claude Code ad alanını kullanır: `/<paket>:<skill>`. Diğer istemciler aynı skill'i adıyla
çağırır (ör. Codex'te `$srs-generate`) ya da istekten otomatik olarak seçer.

### feza-requirements

| Komut | Ürettiği |
|-------|----------|
| `/feza-requirements:srs-generate` | `SRS_<proje>_v0.1.md`: koddan ya da brief'ten ISO/IEC/IEEE 29148 ve IEEE 830 uyumlu SRS |
| `/feza-requirements:srs-review` | `SRS_REVIEW_<proje>.md`: mevcut SRS'in iyi-form kriterleri, ISO/IEC 25010 etiketleme ve iskelet tamlığına göre incelenmesi |
| `/feza-requirements:req-elicit` | `ELICITATION_KIT_<proje>.md`: paydaş rolüne göre görüşme, anket, çalıştay ve gözlem kitleri |
| `/feza-requirements:req-classify` | `REQ_CLASSIFIED_<proje>.md`: ham gereksinimlerin FR, NFR, kısıt, varsayım ve kapsam dışı olarak ayrılıp yeniden yazılması |
| `/feza-requirements:req-conflict-check` | `REQ_CONFLICT_<proje>.md`: çakışma ve bağımlılık matrisleri, uygulama sırası ve eskalasyon listesi |
| `/feza-requirements:user-story` | `USER_STORIES_<proje>.md`: Given-When-Then kriterli, puanlı ve MoSCoW öncelikli INVEST hikâyeleri |

### feza-pm

| Komut | Ürettiği |
|-------|----------|
| `/feza-pm:scope-statement` | `SCOPE_<proje>.md`: proje tanımı, hedefler, kapsam içi ve dışı, kısıtlar, varsayımlar |
| `/feza-pm:wbs` | `WBS_<proje>.md`: teslimatlarıyla üç seviyeli numaralı iş kırılım yapısı |
| `/feza-pm:estimate` | `ESTIMATES_<proje>.md`: parametrik, aşağıdan yukarı ve üç noktalı (PERT) tahminler |
| `/feza-pm:swot` | `SWOT_<proje>.md`: TOWS stratejileriyle SWOT matrisi |
| `/feza-pm:raci` | `RACI_<proje>.md`: yük özetiyle sorumluluk atama matrisi |
| `/feza-pm:budget` | `BUDGET_<proje>.md`: maliyet temel çizgisi, olasılık ve yönetim yedekleri, nakit akışı |
| `/feza-pm:activity-sequence` | `ACTIVITIES_<proje>.md`: aktivite bağımlılıkları ve CPM kritik yolu |
| `/feza-pm:risk-register` | `RISK_REGISTER_<proje>.md`: olasılık ve etki puanlaması, yanıt stratejileri ve sahipler |
| `/feza-pm:stakeholder-map` | `STAKEHOLDERS_<proje>.md`: paydaş analizi ve güç/ilgi ızgarası |
| `/feza-pm:comm-plan` | `COMM_PLAN_<proje>.md`: kim, neyi, ne zaman, hangi kanaldan alır |
| `/feza-pm:conflict-resolve` | Beş çatışma stratejisiyle sohbet içi rehberlik; isteğe bağlı `CONFLICT_LOG.md` |
| `/feza-pm:competitor-analysis` | `COMPETITORS_<proje>.md`: özellik, fiyat ve konumlandırma karşılaştırması |

### feza-iso

| Komut | Ürettiği |
|-------|----------|
| `/feza-iso:iso12207-audit` | `ISO12207_AUDIT_<proje>.md`: ISO/IEC/IEEE 12207:2017'ye göre süreç denetimi |
| `/feza-iso:iso29110-vse` | `ISO29110_VSE_<proje>.md`: ISO/IEC 29110 Entry Profile uygulanabilirlik ve boşluk analizi |
| `/feza-iso:iso25010-quality` | `ISO25010_QUALITY_<proje>.md`: Flexibility ve Safety dahil dokuz ISO/IEC 25010:2023 karakteristiğine göre ürün kalitesi puanlaması |
| `/feza-iso:iso15939-measure` | `MEASUREMENT_PLAN_<proje>.md`: ISO/IEC/IEEE 15939 ölçüm planı |
| `/feza-iso:iso29148-req` | `REQ_LAYERED_<proje>.md`: gereksinimlerin BRS, StRS, SyRS ve SRS katmanlarına yeniden yapılandırılması |
| `/feza-iso:complaints-to-compliance` | `COMPLAINTS_TO_COMPLIANCE_<proje>.md`: ekip şikâyetlerinin ISO/IEC/IEEE 12207 teknik yönetim süreçlerine eşlenmesi |

### feza-hci

| Komut | Ürettiği |
|-------|----------|
| `/feza-hci:hci-review` | `HCI_REVIEW_<proje>.md`: ekran, akış ya da ürünün bütünsel HCI değerlendirmesi |
| `/feza-hci:heuristic-eval` | `HEURISTIC_EVAL_<proje>.md`: 0-4 şiddet dereceli Nielsen heuristikleri ve WCAG 2.1 AA bulguları |
| `/feza-hci:usability-eval-plan` | `USABILITY_PLAN_<proje>.md`: yöntemler, katılımcılar, görevler, pilot ve metrikler |
| `/feza-hci:cognitive-load` | `COGNITIVE_LOAD_<proje>.md`: ekran ya da akışın bilişsel yük değerlendirmesi |
| `/feza-hci:color-audit` | `COLOR_AUDIT_<proje>.md`: palet uyumu, 60-30-10 dengesi ve WCAG kontrast oranları |
| `/feza-hci:design-thinking` | `DESIGN_THINKING_<proje>.md`: beş aşamalı tasarım odaklı düşünme yol haritası |
| `/feza-hci:prototype-plan` | `PROTOTYPE_PLAN_<proje>.md`: prototipleme stratejisi ve doğruluk düzeyi seçimleri |
| `/feza-hci:persona` | `PERSONAS_<proje>.md`: hedefler, sorun noktaları ve senaryolarla bir ila üç kullanıcı personası |
| `/feza-hci:hci-execute` | Çalışan arayüz dosyaları (tespit edilen stack ya da bağımlılıksız HTML, CSS ve JS) ve `DESIGN_RATIONALE_<proje>.md`: HCI ilkelerine uygun, baştan sona tasarlanıp kodlanmış arayüz |

### feza-sqa

| Komut | Ürettiği |
|-------|----------|
| `/feza-sqa:sqa-plan` | `SQA_PLAN_<proje>.md`: IEEE 730 yazılım kalite güvence planı |
| `/feza-sqa:test-plan` | `TEST_PLAN_<proje>.md`: test senaryolarıyla ISO/IEC/IEEE 29119-3 test planı |
| `/feza-sqa:metrics-plan` | `METRICS_PLAN_<proje>.md`: süreç öncesi, içi ve sonu metrikler (DRE, kusur yoğunluğu, boyut) |
| `/feza-sqa:inspection` | `INSPECTION_PLAN_<proje>.md`: IEEE 1028 inceleme prosedürü |
| `/feza-sqa:traceability-matrix` | `TRACEABILITY_<proje>.md`: ihtiyaçtan gereksinime, teste ve kusura çift yönlü matris |
| `/feza-sqa:change-control` | `CHANGE_CONTROL_<proje>.md` ya da tek bir değişiklik talebi: CCB akışı ve etki analizi |
| `/feza-sqa:defect-report` | Önem derecesi, öncelik ve yaşam döngüsüyle kusur raporu şablonu ya da tek kusur raporu |

### feza-toolkit

| Komut | Ürettiği |
|-------|----------|
| `/feza-toolkit:help` | Sohbette gösterilen skill menüsü |
| `/feza-toolkit:lifecycle-pick` | `LIFECYCLE_PICK_<proje>.md`: gerekçeli SDLC modeli önerisi |
| `/feza-toolkit:full-package` | Eksiksiz doküman seti (Mini, Standard ya da Full) ve `PACKAGE_<proje>.md` manifesti |
| `/feza-toolkit:demo-script` | `DEMO_SCRIPT_<proje>.md`: zamanlanmış sunum akışı ve soru-cevap bankası |
| `/feza-toolkit:glossary` | `GLOSSARY_<dil>.md`: 100+ terimlik iki dilli Türkçe-İngilizce sözlük |

## Hızlı Başlangıç

Tüm platformlar için ayrıntılı talimatlar [docs/installation.md](docs/installation.md) dosyasındadır.

### Claude Code

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-requirements@feza
/plugin install feza-pm@feza
```

`feza-requirements`, `feza-pm`, `feza-iso`, `feza-hci`, `feza-sqa` ve `feza-toolkit` paketlerinden
istediğinizi aynı şekilde kurun.

### Codex

```bash
codex plugin marketplace add feza-co/FezaPlugin
```

Ardından Codex'i açın, `/plugins` komutunu çalıştırın ve ihtiyacınız olan paketleri kurun.

### Cursor

Teams ve Enterprise çalışma alanları bu depoyu bir plugin marketplace olarak içe aktarabilir
(Dashboard, Plugins, Add Marketplace, Import from Repo). Yerel kullanım ve diğer seçenekler için
[docs/installation.md](docs/installation.md#cursor) dosyasına bakın.

### Gemini CLI

```bash
gemini extensions install https://github.com/feza-co/FezaPlugin
```

### Diğer Agent Skills istemcileri

```bash
npx skills add feza-co/FezaPlugin
npx skills add feza-co/FezaPlugin -s srs-generate   # tek bir skill
```

Windows'ta `--copy` ekleyin. `.agents/skills/` dizinini okuyan istemciler (GitHub Copilot, OpenCode
ve diğerleri) kökteki `skills/` dizininin bir kopyasını da kullanabilir; bkz.
[docs/installation.md](docs/installation.md).

## Nasıl çalışır

1. **Girdi keşfi.** Skill bir brief (`BRIEF.md`, `IDEA.md`, `README.md`), kod tabanı ve
   `SCOPE_*.md` ya da `SRS_*.md` gibi önceki çıktıları arar. Kullanılabilir bir şey bulamazsa
   yalnızca brief ister; kritik boşluklar için en fazla üç soru sorar, küçük boşlukları etiketli
   varsayım olarak kaydeder. Çıktı dili, `--lang=tr` ya da `--lang=en` verilmedikçe brief'in
   dilini izler (Türkçe ya da İngilizce).
2. **Üretim.** Doküman, skill'in talimatlarından ve skill'in `references/` klasöründeki başvuru
   malzemesinden (iskeletler, formüller, kontrol listeleri) hazırlanır.
3. **Kalite kapısı.** Hiçbir şey yazılmadan önce taslak, doküman türünün kriterlerine göre
   dahili olarak kontrol edilir ve gerekirse revize edilir; bu kontrol kullanıcıya gösterilmez ve
   çıktıda hiçbir puan yer almaz.
4. **Teslim formatı.** Son doküman kapak sayfası, özet, numaralı içindekiler, kaynakça ve
   "Bilinen Boşluklar" bölümüyle proje köküne yazılır. Sade format istenirse bunların yerine kısa
   bir üst bilgi kullanılır. Sohbetteki kısa özet dosyayı gösterir ve sıradaki skill'i önerir.

## Örnek akış

```text
/feza-pm:scope-statement          -> SCOPE_acme-portal.md
/feza-pm:wbs                      -> WBS_acme-portal.md        (SCOPE_* okur)
/feza-pm:estimate                 -> ESTIMATES_acme-portal.md  (WBS_* okur)
/feza-requirements:srs-generate   -> SRS_acme-portal_v0.1.md
/feza-requirements:user-story     -> USER_STORIES_acme-portal.md (SRS_* okur)
/feza-sqa:test-plan               -> TEST_PLAN_acme-portal.md   (SRS_* ve USER_STORIES_* okur)
/feza-sqa:traceability-matrix     -> TRACEABILITY_acme-portal.md
```

Ya da zincirin tamamını bir brief'ten üretmek için `/feza-toolkit:full-package` komutunu bir kez
çalıştırın.

## Depo yapısı

```text
FezaPlugin/
├── .claude-plugin/marketplace.json   Claude Code marketplace
├── .agents/plugins/marketplace.json  Codex marketplace
├── .cursor-plugin/marketplace.json   Cursor marketplace
├── gemini-extension.json             Gemini CLI uzantısı
├── plugins/<paket>/                  Her paketin tek kaynağı
│   ├── .claude-plugin/ .codex-plugin/ .cursor-plugin/   plugin manifestleri
│   └── skills/<skill>/SKILL.md + references/
├── shared/                           Ortak başvuru dosyaları; sync.py ile her skill'e kopyalanır
├── skills/                           Tüm skill'lerin üretilmiş düz kopyası (düzenlemeyin)
├── scripts/sync.py                   Ortak dosyaları kopyalar, skill'leri yansıtır, sürümleri eşitler
├── scripts/validate.py               CI'da çalışan statik kontroller
├── docs/                             Kurulum, mimari ve skill yazım kılavuzları
└── VERSION                           Tüm manifestler için tek sürüm
```

Ayrıntılar için [docs/architecture.md](docs/architecture.md) dosyasına bakın.

## Katkı

Katkılarınızı bekliyoruz. [CONTRIBUTING.md](CONTRIBUTING.md) ve
[docs/skill-authoring.md](docs/skill-authoring.md) dosyalarını okuyun, ardından şunu çalıştırın:

```bash
python scripts/sync.py
python scripts/validate.py
```

Lütfen [Davranış Kuralları](CODE_OF_CONDUCT.md)'na uyun. Güvenlik sorunlarını
[SECURITY.md](SECURITY.md) dosyasında anlatıldığı şekilde bildirin.

## Lisans

[MIT](LICENSE) © 2026 Feza
