# FezaPlugin

[![CI](https://github.com/feza-co/FezaPlugin/actions/workflows/ci.yml/badge.svg)](https://github.com/feza-co/FezaPlugin/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.2.0-informational.svg)](CHANGELOG.md)
[![Platforms](https://img.shields.io/badge/platforms-Claude%20Code%20%7C%20Codex%20%7C%20Cursor%20%7C%20Gemini%20CLI-555.svg)](docs/installation.md)

[English](README.md)

FezaPlugin, bir proje özetini (brief) ya da mevcut bir kod tabanını standartlara uygun yazılım
mühendisliği dokümanlarına dönüştüren 39 ajan skill'inden oluşan bir settir: gereksinim
spesifikasyonları, proje planları, UX değerlendirmeleri ve kalite
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
| [`feza-hci`](plugins/feza-hci) | 9 | HCI ve UX: değerlendirmeler, heuristik denetim, kullanılabilirlik testi, erişilebilirlik, personalar, arayüz tasarımı ve kodlaması |
| [`feza-sqa`](plugins/feza-sqa) | 7 | Yazılım kalite güvencesi: SQA planı, test planı, metrikler, inceleme, izlenebilirlik, değişiklik ve kusur kontrolü |
| [`feza-toolkit`](plugins/feza-toolkit) | 5 | Paketler arası araçlar: menü, yaşam döngüsü seçimi, tam paket orkestrasyonu, demo senaryosu, sözlük |

> **Not:** `/feza-toolkit:full-package` diğer paketlerin skill'lerini çağırır. Eksiksiz bir doküman
> seti üretmek için beş paketin tamamını kurun.

## Skill'ler

Komutlar Claude Code ad alanını kullanır: `/<paket>:<skill>`. Diğer istemciler aynı skill'i adıyla
çağırır (ör. Codex'te `$srs-generate`) ya da istekten otomatik olarak seçer.

### feza-requirements

| Komut | Ne yapar | Çıktı |
|-------|----------|-------|
| `/feza-requirements:srs-generate` | Yazılım Gereksinim Spesifikasyonu (SRS) yazar: yazılımın ne yapması gerektiğini (fonksiyonel gereksinimler) ve bunu ne kadar iyi yapması gerektiğini (performans, güvenlik, güvenilirlik, erişilebilirlik süresi, gözlemlenebilirlik, kullanılabilirlik) ISO/IEC/IEEE 29148 ve IEEE 830'a göre tanımlayan doküman. Kod modunda gereksinimleri kaynak koddan, README'den, manifest dosyalarından ve API uçlarından çıkarır; brief modunda `BRIEF.md` ya da kısa bir proje fikrinden çalışır. Mod, kod tabanının büyüklüğüne göre seçilir. | `SRS_<proje>_v0.1.md` |
| `/feza-requirements:srs-review` | Mevcut bir `SRS_*.md` dosyasını ISO/IEC/IEEE 29148 kalite kriterlerine göre denetler. Her gereksinim gerekli, uygun, açık, eksiksiz, tekil, doğrulanabilir, uygulanabilir ve kurala uygun olup olmadığına; gereksinim seti bütün olarak tamlık ve tutarlılığa; fonksiyonel olmayan gereksinimler ISO/IEC 25010 etiketlemesine; doküman iskeleti eksik bölümlere göre kontrol edilir. Şiddet dereceli bulgular ve ilk 5 iyileştirme listesi verir. | `SRS_REVIEW_<proje>.md` |
| `/feza-requirements:req-elicit` | İnsanlardan gereksinim toplamak (elicitation) için gereken materyali ISO/IEC/IEEE 29148 ve BABOK v3'e uygun olarak hazırlar. Her paydaş rolü için görüşme soruları (kapalı, açık, derinleştirici, stratejik), anket, çalıştay planı ve gözlem planı üretir. Varsa `STAKEHOLDERS_*.md` ve `PERSONAS_*.md` dosyalarındaki rollere göre kişiselleştirir; yoksa rol listesini sorar. | `ELICITATION_KIT_<proje>.md` |
| `/feza-requirements:req-classify` | Ham bir gereksinim listesini (komuttan, bir gereksinim dosyasından, `BRIEF.md`'den ya da elicitation sonuçlarından) alır ve her maddeyi tek cümlelik gerekçesiyle fonksiyonel, fonksiyonel olmayan, kısıt, varsayım ya da kapsam dışı olarak ayırır. Her maddeyi "shall" kalıbında yeniden yazar, fonksiyonel olmayan gereksinimleri ISO/IEC 25010 kalite karakteristiğiyle etiketler ve belirsiz ifade gibi kötü kalıpları işaretler. | `REQ_CLASSIFIED_<proje>.md` |
| `/feza-requirements:req-conflict-check` | Bir gereksinim setini (`SRS_*.md` ya da `REQ_CLASSIFIED_*.md`) çakışmalar (doğrudan çelişki, örtük çakışma, ödünleşim, kaynak rekabeti) ve bağımlılıklar (depends-on, blocks, refines, supersedes) açısından analiz eder. Çakışan her çift için çözüm önerir, bağımlılık grafiğinden uygulama sırası çıkarır ve eskalasyon gerektiren çakışmaları listeler. | `REQ_CONFLICT_<proje>.md` |
| `/feza-requirements:user-story` | Gereksinimleri (`SRS_*.md`, `REQ_CLASSIFIED_*.md`) ya da bir özellik açıklamasını "<rol> olarak, <fayda> için <hedef> istiyorum" biçiminde çevik kullanıcı hikâyelerine dönüştürür; roller için `PERSONAS_*.md` kullanılır. Her hikâye INVEST kriterlerine göre kontrol edilir; Given-When-Then kabul kriterleri, uç durumlar, Fibonacci hikâye puanı ve MoSCoW önceliği alır. Dosyada ayrıca hikâye haritası, backlog, Definition of Ready ve Definition of Done bulunur. | `USER_STORIES_<proje>.md` |

### feza-pm

> **SRS gerekir.** Tüm feza-pm skill'leri mevcut bir Yazılım Gereksinim Spesifikasyonu (`/feza-requirements:srs-generate` ile üretilmiş, proje kökünde ya da `docs/` altında `SRS_*.md`) gerektirir ve bulamazsa durur. Önce `/feza-requirements:srs-generate` çalıştırın.

| Komut | Ne yapar | Çıktı |
|-------|----------|-------|
| `/feza-pm:scope-statement` | Projenin sınırlarını PMBOK kapsam yönetimine göre tanımlar: amaç, hedefler, ürün tanımı, başarı kriterleri, kapsam içi ve kapsam dışı tabloları, varsayımlar ve zaman, maliyet, kalite ve kapsam kısıtları; hepsi SRS'ten türetilir. | `SCOPE_<proje>.md` |
| `/feza-pm:wbs` | Proje işini İş Kırılım Yapısına (WBS) böler: her yaprağı somut bir teslimat olan, numaralı üç seviyeli bir hiyerarşi (1.0, 1.1, 1.1.1). Varsa `SCOPE_*.md` dosyasını kullanır. | `WBS_<proje>.md` |
| `/feza-pm:estimate` | Her WBS yaprağı için süre ve eforu üç yöntemi birlikte kullanarak tahmin eder: parametrik, aşağıdan yukarı ve üç noktalı PERT (iyimser, en olası ve kötümser değerler (O+4M+P)/6 ile ağırlıklandırılır). `WBS_*.md` üzerine kurulur. | `ESTIMATES_<proje>.md` |
| `/feza-pm:swot` | Projenin SWOT analizi: güçlü yönler, zayıf yönler, fırsatlar ve tehditler; her madde bir kanıt cümlesiyle desteklenir. Ayrıca matrisi somut stratejilere çeviren TOWS çapraz analizi içerir. | `SWOT_<proje>.md` |
| `/feza-pm:raci` | RACI sorumluluk matrisi kurar: satırlarda WBS kalemleri, sütunlarda roller ya da paydaşlar; her hücre Responsible, Accountable, Consulted ya da Informed olarak işaretlenir. Her satırda tek Accountable gibi kuralları kontrol eder ve her rolün yükünü özetler. `WBS_*.md` ve `STAKEHOLDERS_*.md` dosyalarını kullanır. | `RACI_<proje>.md` |
| `/feza-pm:budget` | Efor tahminlerini PMBOK maliyet planına çevirir: maliyet temel çizgisi (doğrudan ve dolaylı maliyetler), olasılık ve yönetim yedekleri ve ay bazında nakit akışı tablosu. `ESTIMATES_*.md` dosyasını kullanır; bilinmeyen ücretler etiketli varsayım olarak kaydedilir. | `BUDGET_<proje>.md` |
| `/feza-pm:activity-sequence` | WBS yapraklarını aktivitelere dönüştürür, bunları bitiş-başlangıç, başlangıç-başlangıç, bitiş-bitiş ya da başlangıç-bitiş bağımlılıklarıyla bağlar, ağ diyagramını tablo olarak gösterir ve proje süresini belirleyen en uzun aktivite zinciri olan kritik yolu (CPM) hesaplar. `WBS_*.md` ve `ESTIMATES_*.md` dosyalarını kullanır. | `ACTIVITIES_<proje>.md` |
| `/feza-pm:risk-register` | Proje risklerini kategoriye göre (teknik, takvim, maliyet, kaynak, dış, kalite) listeler: 1-5 arası olasılık ve etki, olasılık x etki skoru, yanıt stratejisi (kaçın, devret, azalt ya da kabul et; fırsatlar için kullan, paylaş ya da güçlendir), sahip, tetikleyici ve durum. `SWOT_*.md` içindeki tehditleri ve SRS'in kalite ve uyumluluk gereksinimlerini, dış arayüzlerini, varsayımlarını ve açık (TBD) maddelerini riske çevirir; varsa kapsam, tahmin ve kritik yol çıktılarını da kullanır. | `RISK_REGISTER_<proje>.md` |
| `/feza-pm:stakeholder-map` | Projeyi etkileyen ya da projeden etkilenen herkesi SRS'ten (kullanıcı sınıfları, paydaşlar, dış sistemler, uyumluluk muhatapları) ve `SCOPE_*.md`'den belirler, her birini analiz eder ve önerilen iletişim sıklığıyla dört kadranlı güç/ilgi ızgarasına (yakından yönet, memnun tut, bilgilendir, izle) yerleştirir. | `STAKEHOLDERS_<proje>.md` |
| `/feza-pm:comm-plan` | PMBOK iletişim yönetimine göre iletişim planı matrisi kurar: hangi paydaşın hangi bilgiyi, ne sıklıkla, hangi kanaldan ve kimden alacağı; ayrıca çatışma çıkması muhtemel noktalar. `STAKEHOLDERS_*.md` dosyasını kullanır. | `COMM_PLAN_<proje>.md` |
| `/feza-pm:conflict-resolve` | Bir ekip çatışması senaryosunu alır, çatışmanın türünü belirler ve beş Thomas-Kilmann / PMBOK stratejisiyle (kaçınma, yatıştırma, uzlaşma, zorlama, iş birliği) nasıl çözüleceğini önerir. Yanıt sohbette verilir ve isteğe bağlı olarak `CONFLICT_LOG.md` dosyasına eklenir. | Sohbet; isteğe bağlı `CONFLICT_LOG.md` |
| `/feza-pm:competitor-analysis` | Ürünü rakipleri ya da alternatifleriyle Porter'ın rekabet stratejisi çerçevesinde karşılaştırır: fiyat, hedef segment, çekirdek özellikler, teknoloji yığını, artı ve eksi yönleri kapsayan bir tablo, farklılaşma önerisi ve pazar boşluğu tablosu. | `COMPETITORS_<proje>.md` |

### feza-hci

| Komut | Ne yapar | Çıktı |
|-------|----------|-------|
| `/feza-hci:hci-review` | Bir ekranın, akışın ya da ürünün tamamının kullanıcı merkezli tasarım (ISO 9241-210), affordance ve Dix et al. HCI ilkeleri üzerinden bütünsel kullanılabilirlik değerlendirmesi. Arayüz dosyalarını (HTML, JSX, Vue, Svelte, şablonlar, CSS, tasarım token'ları) tarar ya da tarif edilen bir ekran veya mockup üzerinden çalışır; somut düzeltme adımlarıyla önceliklendirilmiş bulgular verir. `--fix` (ya da "düzelt") ile bulgularını arayüz dosyalarına uygular, sonucu `verify-ui` ile doğrular ve rapora uygulanan düzeltmeler tablosu ekler. | `HCI_REVIEW_<proje>.md` |
| `/feza-hci:heuristic-eval` | Sistematik heuristik değerlendirme: ekranları Nielsen'in 10 kullanılabilirlik heuristiğine, Dix et al. ilkelerine ve WCAG 2.1 AA erişilebilirlik kriterlerine göre inceler. Her bulgu 0 (sorun değil) ile 4 (kullanılabilirlik felaketi) arasında Nielsen şiddet derecesi alır; sonuçlar şiddet dağılımıyla birlikte sıralı bir tabloda verilir. Arayüz dosyalarından ya da tarif edilen bir ekrandan çalışır. `--fix` ile bulgularını arayüz dosyalarına uygular, sonucu `verify-ui` ile doğrular ve rapora uygulanan düzeltmeler tablosu ekler. | `HEURISTIC_EVAL_<proje>.md` |
| `/feza-hci:usability-eval-plan` | Gerçek kullanıcılarla bir kullanılabilirlik testi planlar: yöntemler (sorgulama, kullanıcı testleri, heuristik walkthrough), katılımcı sayısı ve gerekçesi, demografik form, test öncesi anket ve SUS (System Usability Scale) tabanlı test sonrası anket, test görevleri, pilot test, ortam ve metrikler. Varsa en kritik görevler önceki HCI değerlendirmesi ya da heuristik değerlendirme bulgularından alınır. | `USABILITY_PLAN_<proje>.md` |
| `/feza-hci:cognitive-load` | Bir ekranın ya da akışın ne kadar zihinsel çaba gerektirdiğini Bilişsel Karmaşıklık Kuramı (Kieras ve Polson) ve Sweller'in bilişsel yük kuramıyla değerlendirir. Altı boyutu (bilişsel yük, bilgi işleme, Gestalt algısal düzenleme, affordance, geri bildirim ve ileri bildirim, skeuomorfik ve düz tasarım) kontrol eder, her ekrana bir yük skoru verir ve aşırı yükü azaltma önerileri sunar. `--fix` ile bulgularını arayüz dosyalarına uygular, sonucu `verify-ui` ile doğrular ve rapora uygulanan düzeltmeler tablosu ekler. | `COGNITIVE_LOAD_<proje>.md` |
| `/feza-hci:color-audit` | Tasarım token'larından, CSS değişkenlerinden, Tailwind yapılandırmasından ya da stil dosyalarından çıkarılan (ya da sizin verdiğiniz) renk paletini denetler: renk uyumunu belirler, 60-30-10 dengesini kontrol eder, WCAG 2.1 AA kontrast oranlarını hesaplar, renk körlüğünü simüle eder, renk kodlamasını ve koyu temayı inceler ve düzeltilmiş bir palet önerir. `--fix` ile bulgularını arayüz dosyalarına uygular, sonucu `verify-ui` ile doğrular ve rapora uygulanan düzeltmeler tablosu ekler. | `COLOR_AUDIT_<proje>.md` |
| `/feza-hci:design-thinking` | Verilen bir problem ya da fırsat için Stanford d.school / IDEO modelini izleyen beş aşamalı bir tasarım odaklı düşünme yol haritası (Empathize, Define, Ideate, Prototype, Test) üretir; her aşama için amaç, aktiviteler, çıktılar, süre ve araç önerileri, ayrıca iterasyon notları ve işlenmiş bir örnek senaryo içerir. | `DESIGN_THINKING_<proje>.md` |
| `/feza-hci:prototype-plan` | Ürünün nasıl prototipleneceğini planlar: neden prototip yapılacağı, doğruluk merdiveni (eskiz, wireframe, mockup, prototip), düşük ya da yüksek doğruluğun ne zaman kullanılacağı, düşük maliyetli araçlar, kısa bir test planı ve prototipin ürün olmadığı hatırlatması. Mevcut tasarım dosyalarını, kapsamı ve personaları kullanır. | `PROTOTYPE_PLAN_<proje>.md` |
| `/feza-hci:persona` | Hedef kullanıcıların kurgusal ama kanıta dayalı profilleri olan bir ila üç kullanıcı personası oluşturur (goal-directed design yaklaşımı): demografi, hedefler, sorun noktaları, davranışlar, teknik beceri düzeyi, kullanım senaryosu ve alıntı; ayrıca bir anti-persona. Brief, kapsam ve paydaş dosyalarından beslenir ve varsayılan verileri etiketler. | `PERSONAS_<proje>.md` |
| `/feza-hci:hci-execute` | Rapor yerine çalışan bir kullanıcı arayüzü tasarlar ve kodlar: kullanıcı ve görev modeli (ISO 9241-210), bilgi mimarisi ve ASCII wireframe'ler, token tabanlı tasarım sistemi (WCAG 2.1 AA kontrast, açık ve koyu tema, 4/8 pt ızgara), ardından tespit edilen stack'te (React, Next.js, Vue, Svelte, Tailwind, düz HTML) ya da bağımlılıksız HTML, CSS ve JS ile erişilebilir, responsive ekranlar. Teslimden önce kendi çıktısını Nielsen heuristikleri, Dix et al., WCAG 2.1 AA ve bilişsel yük açısından denetleyip bulduklarını düzeltir; önceki HCI denetimlerinin bulgularını da uygulayabilir. Node.js varsa üretilen arayüzü Playwright ile gerçek tarayıcıda 320/390/768/1280 px'de yükler; axe-core (WCAG 2.1/2.2 A/AA), yatay kaydırma, dokunma hedefi, klavye/odak, reduced-motion + koyu tema ve %200 metin büyütme kontrollerini çalıştırır ve `.feza/ui-check/` altına ekran görüntüleri ile `report.json` yazar. | Arayüz dosyaları ve `DESIGN_RATIONALE_<proje>.md` |

> **Node.js 18+ isteğe bağlıdır.** Yalnızca `hci-execute`'un otomatik render doğrulaması ve fix modu için gerekir (Playwright ve axe-core ilk çalıştırmada kullanıcı önbelleğine kurulur). Node.js yoksa skill'ler statik kontrole düşer.

#### HCI çıktısını ölçme ve doğrulama (v2.2.0)

HCI değerlendirme skill'leri tek bir sayısal kabul setini paylaşır: **E1-E29**. Set
`shared/packages/feza-hci/thresholds.md` içinde yaşar ve her skill'e `references/thresholds.md`
olarak kopyalanır; `scripts/verify-ui.mjs` aynı sayıları kendi `THRESHOLDS` bloğunda tekrarlar ve
`scripts/validate.py` ikisi ayrılırsa derlemeyi düşürür. Her sonuç `report.json` içinde
`results.E<kod>` olarak `{ ok, value, threshold, method }` biçiminde yazılır; `method` değeri
`otomatik`, `karma` ya da `statik`tir. `ok: null` bir kriterin otomatik ölçülemediğini ve elle
incelenmesi gerektiğini gösterir (çıkış kodunu değiştirmez).

Bu sürümde eklenen **E14-E29** kriterleri:

| Kod | Kriter | Ölçüm |
|-----|--------|-------|
| E14 | Odak tamamen örtülmüyor (minimum) | otomatik |
| E15 | Hedef aralığı istisnası (24 px) | otomatik |
| E16 | Metin aralığı (satır 1.5, paragraf 2×, harf 0.12em, kelime 0.16em) | otomatik |
| E17 | Erişilebilir kimlik doğrulama (yapıştırma, autocomplete, "göster") | karma |
| E18 | Sürüklemeye alternatif | karma |
| E19 | Tekrar giriş | statik |
| E20 | Tutarlı yardım | statik |
| E21 | `forced-colors: active` sınır ve odak | otomatik |
| E22 | `prefers-contrast: more` (metin ≥ 7:1, kenarlık ≥ 4.5:1) | otomatik |
| E23 | Saydam yüzey ve opak yedek | karma |
| E24 | RTL taşması ve fiziksel yön özellikleri | otomatik |
| E25 | Metin genişlemesi (%30 uzatılmış, aksanlı) | otomatik |
| E26 | Türkçe harf dönüşümü (`uppercase` / `toUpperCase()`) | statik |
| E27 | Yerel biçim (elle biçim yerine `Intl.*`) | statik |
| E28 | Başlık/bölge yapısı (`ariaSnapshot()`) | otomatik |
| E29 | Aldatıcı tasarım: kabul/ret eşit belirginliği | karma |

> **Not (E29).** Yukarıdaki ölçüm türü tek kaynak `shared/packages/feza-hci/thresholds.md` dosyasını
> izler. Bu sürümde `verify-ui.mjs` E29'u otomatik ölçmez: `ok: null` olarak raporlanır. Kabul/ret
> eşit belirginliği ve ön-işaretli onay kutuları `deceptive-patterns.md` kontrol listesiyle elle
> incelenir.

`scripts/verify-ui.mjs` bir E kodunu şu bayraklarla doğrular (`--help`):

- `--profile wcag22aa|en301549` axe kural etiketlerini seçer; kurulu axe sürümünde `EN-301-549`
  etiketi yoksa profil `wcag22aa`ya düşer ve bunu `report.json.profile` içinde bildirir.
- `--static <dizin>` tarayıcı açmadan kaynak tarar (E23, E24 fiziksel yön, E26, E27).
- `--engines axe,ibm` IBM Equal Access'i ikinci, yalnız uyarı katmanı olarak çalıştırır (E1 axe'ta kalır).
- `--visual <baseline-dizin>` ve `--visual-max-diff N` ekran görüntülerini baseline ile karşılaştırır.
- `--aria-baseline <dosya>` E28 erişilebilirlik ağacı snapshot'ını kaydeder ya da farkını raporlar.
- `--fix` modu (dört değerlendirme skill'inde) bulguları arayüz dosyalarına uygular, doğrular ve
  **ihlal sayısını kesin azaltmayan ya da yeni bir ihlal türü doğuran değişikliği reddeder**; rapora
  `Önce | Sonra | Karar` sütunlu uygulanan düzeltmeler tablosu eklenir.

İlgili araçlar ve referanslar:

- `contrast.py --tokens <dosya.tokens.json> [--tokens-dark <dosya>]` DTCG tasarım token'larını okur
  (desteklenen alt küme: color, dimension, duration, cubicBezier, shadow, typography), alias'ları
  çözer ve eşdeğer `--css` dosyasıyla aynı oranları verir; `--apca` bağlayıcı olmayan APCA Lc sütunu ekler.
- `scripts/measure-vitals.mjs <URL | dosya.html>` isteğe bağlı lab INP (Interaction to Next Paint)
  ölçümü: ≤ 200 ms iyi, > 500 ms kritik. Bu bir lab tahminidir, alan INP'sinin yerine geçmez.
- Değerlendirme skill'leri bir **kanıt rubriği** (`references/evidence-rubric.md`) taşır: her bulgu
  bir kanıt türü taşır (ekran görüntüsü, DOM seçici, erişilebilirlik ağacı, verify-ui çıktısı);
  severity 3-4 için DOM seçici ya da verify-ui kanıtı zorunludur ve yalnız görsel tahmin en fazla
  severity 2 alır. Severity ≥ 3 bulgular bağımsız yeniden puanlanır; manuel kontrol listesi
  işaretlenmeden rapor "teslim edilebilir" sayılmaz. "0 ihlal = erişilebilir" iddiası yasaktır:
  otomatik araçlar WCAG'nin yalnız bir kısmını ölçer.
- Bir **aldatıcı tasarım sözlüğü** (`references/deceptive-patterns.md`) kalıpları (utançla ikna,
  engelleme, ön-seçim, ısrar, gizli maliyet, zor iptal, sahte aciliyet, metin karıştırma) tanım,
  örnek, düzeltme ve ilgili E koduyla verir.
- `usability-eval-plan` SEQ, UMUX-Lite, SUS yüzdelik/sıfat tablosu, HEART hedef-sinyal-metrik
  tablosu ve koşullu NASA-TLX ekler; `persona` zorunlu veri dayanağı etiketi ve JTBD cümleli
  proto-persona modu ekler; `cognitive-load` Hick-Hyman, Fitts ve ekran başına rakip öğe/renk
  sayılarını ekler.

> **Sınırlar.** Otomatik araçlar WCAG'nin yalnız bir kısmını ölçer; temiz bir çalıştırma
> erişilebilirliğin kanıtı değildir. Statik kriterler (E9-E11, E19, E20, E26, E27) `ok: null` ile
> raporlanır ve elle okunmalıdır.

### feza-sqa

| Komut | Ne yapar | Çıktı |
|-------|----------|-------|
| `/feza-sqa:sqa-plan` | Yazılım kalite güvencesi (SQA), hem ürünün hem de sürecin kalite hedeflerini karşılamasını sağlayan etkinlikler bütünüdür. Bu skill IEEE 730-2014 uyumlu bir SQA planı yazar: kalite hedefleri, yetenek ya da olgunluk hedefi (ISO/IEC 33020 seviye 0-5 ya da CMMI 1-5), üç SQA alanı (süreç uygulama, ürün güvencesi, süreç güvencesi), roller, yaşam döngüsü etkinlikleri, gözden geçirmeler, denetimler ve incelemeler, test yaklaşımı, metrikler, kusur takibi, araçlar, riskler, takvim ve başarı kriterleri. Kapsam, SRS, paydaş ve RACI dosyalarını okur. | `SQA_PLAN_<proje>.md` |
| `/feza-sqa:test-plan` | ISO/IEC/IEEE 29119-3 ve IEEE 829'a göre test planı ve test senaryoları yazar; senaryoları `SRS_*.md` içindeki fonksiyonel ve fonksiyonel olmayan gereksinimlerden ve varsa kullanıcı hikâyelerinin kabul kriterlerinden türetir. Test seviyelerini, yaklaşımı, geçti/kaldı kriterlerini, takvimi, ortamı, araçları ve riskleri kapsar; her test senaryosunun kimliği, gereksinim bağı, önceliği, türü (pozitif, negatif, sınır, NFR) ve beklenen sonucu vardır. | `TEST_PLAN_<proje>.md` |
| `/feza-sqa:metrics-plan` | Yazılım kalite metriklerini üç grupta planlar: süreç öncesi (efor ve kusur tahminleri, inceleme kararları), süreç içi (kusur bulma oranı, geliştirme sırasındaki kalite) ve süreç sonu (Kusur Giderme Verimliliği, DRE, ve süreç iyileştirme). ISO/IEC/IEEE 15939 ve IEEE 1028 ile uyumlu sayısal hedefler, toplama planı ve gösterge paneli belirler; proje boyutu SRS'ten ve tahminlerden alınır. | `METRICS_PLAN_<proje>.md` |
| `/feza-sqa:inspection` | İnceleme (inspection), bir iş ürününün en resmi akran gözden geçirme biçimidir. Skill Fagan yöntemine dayalı IEEE 1028 inceleme prosedürü yazar: altı adım (planlama, genel bakış, hazırlık, toplantı, yeniden çalışma, rapor), roller (moderatör, yazar, okuyucu, kayıtçı, inceleyiciler), dokuz boyutlu kontrol listesi, Critical/Major/Minor şiddet, çıkış kriterleri ve kullanıma hazır formlar (inceleme planı, kusur kaydı, özet). Walkthrough ya da denetimin ne zaman daha uygun olduğunu da açıklar; gereksinimler, tasarım, kod ya da test planları için kullanılabilir. | `INSPECTION_PLAN_<proje>.md` |
| `/feza-sqa:traceability-matrix` | Her paydaş ihtiyacını iş, paydaş, sistem ve yazılım gereksinimleri üzerinden tasarıma, koda, test senaryolarına ve kusurlara ileri, geri ve yatay yönde bağlayan bir gereksinim izlenebilirlik matrisi (RTM) kurar. Mevcut FezaPlugin çıktılarını (SCOPE, SRS, REQ_LAYERED, USER_STORIES, TEST_PLAN) birbirine bağlar, aşama bazında kapsama oranını hesaplar ve önerilen aksiyonlarla boşlukları listeler. | `TRACEABILITY_<proje>.md` |
| `/feza-sqa:change-control` | IEEE 730, PMBOK bütünleşik değişiklik kontrolü ve ISO/IEC/IEEE 12207 konfigürasyon yönetimiyle uyumlu bir değişiklik kontrol düzeni kurar: Değişiklik Kontrol Kurulu (CCB) yapısı, Proposed'dan Closed'a değişiklik talebi (CR) durumları, CR formu, etki analizi çalışma sayfası (kapsam, takvim, maliyet, kalite, paydaşlar, bağımlılıklar, risk), oylama protokolü, küçük değişiklikler için hızlı yol ve denetim izi. İstenirse yalnızca tek bir değişiklik talebi üretir. | `CHANGE_CONTROL_<proje>.md` ya da `CR_<id>_<proje>.md` |
| `/feza-sqa:defect-report` | IEEE 1044 terminolojisini (fault, failure, anomaly vb.) ve ISO/IEC/IEEE 29119-3 olay raporu yapısını kullanarak bir kusur raporu şablonu üretir ya da açıklamanızdan tek bir kusur raporu doldurur: önem derecesi ve öncelik (farkı açıklayan matrisle), yeniden üretme adımları, beklenen ve gerçek sonuç, ortam, test senaryosu ve gereksinime izlenebilirlik, kök neden kategorisi ve kusur yaşam döngüsü. Triyaj kuralları ve Jira / GitHub Issues alan eşlemesini de içerir. | `DEFECT_REPORT_TEMPLATE_<proje>.md` ya da `DR_<id>_<proje>.md` |

### feza-toolkit

| Komut | Ne yapar | Çıktı |
|-------|----------|-------|
| `/feza-toolkit:help` | FezaPlugin menüsünü gösterir: paketler, her skill'in dayandığı standart ya da yöntem, nasıl çağrılacağı ve önerilen ilk adım. Dosya yazmaz. | Sohbet |
| `/feza-toolkit:lifecycle-pick` | Bir yazılım geliştirme yaşam döngüsü (SDLC) modeli önerir. Projeyi gereksinim netliği, ekip deneyimi, müşteri katılımı, zaman baskısı ve teknoloji riski açısından puanlar; Waterfall, Incremental ve Iterative ile Agile/Scrum, Kanban, V-Model, Spiral ve Hybrid'i karşılaştırır; seçilen modelin artı ve eksilerini ve ayrıntılı planını (fazlar ya da sprintler, roller, artefaktlar, kadans, riskler) verir. Varsa kapsam, SRS, paydaş, risk ve tahmin dosyalarını okur. | `LIFECYCLE_PICK_<proje>.md` |
| `/feza-toolkit:full-package` | Tek bir proje brief'inden yola çıkarak diğer paketlerin çekirdek skill'lerini mantıklı bir sırayla çalıştıran ve her çıktıyı bir sonrakine girdi yapan orkestratör. Mini (8 dosya), Standard (15 dosya) ya da Full (24+ dosya) paket seçilir; çalışma, üretilen dosyaları, önerilen sonraki adımları ve bilinen boşlukları listeleyen bir `PACKAGE_<proje>.md` manifestiyle biter. Diğer tüm paketlerin kurulu olması gerekir. | Doküman seti ve `PACKAGE_<proje>.md` |
| `/feza-toolkit:demo-script` | Paydaşlar, yatırımcılar, müşteriler ya da yönetim kurulu için 10-15 dakikalık bir sunum hazırlar: zamanlanmış akış (açılış, problem, çözüm, canlı demo, mimari, PERT tahminleri, DRE ve risk skorları gibi sayısal kanıtlar, standart uyumu, kapanış) ve ROI, takvim, risk, güvenlik, ölçeklenebilirlik, rekabet ve benimseme konularında hazır cevaplı soru-cevap bankası. Rakamları mevcut FezaPlugin çıktılarından alır. | `DEMO_SCRIPT_<proje>.md` |
| `/feza-toolkit:glossary` | Gereksinim, proje yönetimi, ISO/IEC standartları, HCI ve SQA terimlerinden oluşan, alfabetik ve kategorize edilmiş iki dilli Türkçe-İngilizce sözlük üretir. Her madde karşılığı, tanımı, kaynak standart referansını, ilgili FezaPlugin skill'ini ve bir kullanım örneğini verir. Girdi gerektirmez; alana ya da terime göre filtrelenebilir. | `GLOSSARY_<lang>.md` |

## Hızlı Başlangıç

Tüm platformlar için ayrıntılı talimatlar [docs/installation.md](docs/installation.md) dosyasındadır.

### Claude Code

```text
/plugin marketplace add feza-co/FezaPlugin
/plugin install feza-requirements@feza
/plugin install feza-pm@feza
```

`feza-requirements`, `feza-pm`, `feza-hci`, `feza-sqa` ve `feza-toolkit` paketlerinden
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
/feza-requirements:srs-generate   -> SRS_acme-portal_v0.1.md
/feza-pm:scope-statement          -> SCOPE_acme-portal.md      (SRS_* okur)
/feza-pm:wbs                      -> WBS_acme-portal.md        (SRS_* ve SCOPE_* okur)
/feza-pm:estimate                 -> ESTIMATES_acme-portal.md  (WBS_* okur)
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
