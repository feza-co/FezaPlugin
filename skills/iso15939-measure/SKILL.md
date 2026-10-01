---
name: iso15939-measure
description: >
  ISO/IEC/IEEE 15939:2017 uyumlu ölçüm planı üretir. Standardın ölçüm bilgi
  modelini kullanır: Information Need → Measurable Concept (ISO/IEC 25010
  alt karakteristikleri veya süreç kavramları) → Measurement Construct (base
  measure, derived measure, indicator, decision criteria). Plan, standardın
  dört etkinliğine göre düzenlenir: Establish and sustain commitment / Plan /
  Perform / Evaluate. Her gösterge metrik uygunluk kontrol listesinden geçer.
  Tetikleyici: "15939 measurement", "ölçüm planı", "/feza-iso:iso15939-measure",
  "metric plan".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# ISO/IEC/IEEE 15939 — Measurement Plan

Bilgi ihtiyaçlarından karar ölçütlerine kadar izlenebilir bir ölçüm planı üretir.

## Tetikleyici
- "/feza-iso:iso15939-measure"
- "15939 measurement / ölçüm süreci"
- "metric plan / kalite ölçüm"

## Adım 0 — Bağlamı Topla

1. **`SRS_*.md`** öncelikli (NFR ve QoS gereksinimlerinden ölçülebilir kavramlar çıkar)
2. **`ISO25010_QUALITY_*.md`** (varsa) — öncelikli kalite karakteristikleri
3. **`STAKEHOLDERS_*.md`** — bilgi ihtiyacı sahipleri ve karar vericiler
4. **`SCOPE_*.md`**, **`RISK_REGISTER_*.md`** — hedefler ve riskler (bilgi ihtiyaçlarının kaynağı)
5. Brief yoksa **TEK** soru: "Hangi ürün/süreç ölçülecek ve bu ölçümle hangi kararlar verilecek?"

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Ölçüm kapsamı** (yalnız ürün kalitesi / ürün + süreç / proje takvim ve maliyeti) |
| 2 | **Gösterge sayısı hedefi** (varsayılan: 8-12; karar vericilerin izleyebileceği düzey) |

## Adım 2 — Bilgi Tabanı
- `references/15939-process.md` — ölçüm bilgi modeli, dört etkinlik, bilgi ihtiyacı önceliklendirme, metrik uygunluk kontrol listesi, kaçınılacak durumlar ve örnek vaka (e-fatura entegrasyon platformu).

## Adım 3 — Üret

### Bölüm 1 — Ölçüm Taahhüdü (Establish and sustain measurement commitment)

Kapsam, sponsor, ölçüm sorumlusu, kaynaklar ve kullanılacak araçlar tablo olarak. Taahhüdün nasıl sürdürüleceği (gözden geçirme toplantısı, raporlama ritmi) yazılır.

### Bölüm 2 — Bilgi İhtiyacı Kataloğu

| ID | Paydaş | Bilgi ihtiyacı | Bağlı karar | Kaynak (hedef/risk/gereksinim) | Öncelik |
|----|--------|----------------|-------------|--------------------------------|---------|

Önceliklendirme ölçütleri: karar bağlantısı, risk bağlantısı, zamanlama, veri edinme maliyeti (`references/15939-process.md` Bölüm 3). Plana alınmayan ihtiyaçlar gerekçesiyle "Bilinen Boşluklar"a yazılır.

### Bölüm 3 — Measurement Construct Tabloları

Plana alınan her gösterge için:

| Yapı taşı | Değer |
|-----------|-------|
| Information need | IN-x |
| Measurable concept | ISO/IEC 25010:2023 alt karakteristiği veya süreç kavramı |
| Entity / Attribute | ... |
| Base measure(s) | ad, birim, ölçüm yöntemi, ölçek tipi |
| Derived measure | formül |
| Indicator | ... |
| Analysis model | eşik / trend / karşılaştırma |
| Decision criteria | değer aralığı → aksiyon → sorumlu |
| Information product | rapor / pano / karar notu |

Sayısal eşikler kullanıcıdan gelmediyse "Varsayım: ..." etiketiyle yazılır.

### Bölüm 4 — Metrik Uygunluk Kontrol Listesi

Her construct için K1-K7 kontrolleri (`references/15939-process.md` Bölüm 4) tablo halinde: Evet / Hayır / Kanıt. "Hayır" olan construct revize edilir ya da gerekçeyle çıkarılır.

### Bölüm 5 — Gösterge Özeti

| Gösterge | Bilgi ihtiyacı | Ölçülebilir kavram | Toplama yöntemi | Sıklık | Veri sorumlusu |
|----------|----------------|---------------------|-----------------|--------|----------------|

Toplam gösterge sayısı hedef aralığın dışındaysa gerekçe yazılır.

### Bölüm 6 — Uygulama (Perform the measurement process)

- Veri toplama takvimi ve otomasyon düzeyi
- Veri saklama yeri ve saklama süresi
- Veri doğrulama kuralları (eksik, aykırı, çift kayıt)
- Raporlama: hangi bilgi ürünü, kime, hangi kanaldan, ne sıklıkta

### Bölüm 7 — Değerlendirme (Evaluate measurement)

- Bilgi ürünlerinin kararları etkileyip etkilemediğinin değerlendirilmesi
- Ölçüm sürecinin değerlendirme ölçütleri (veri zamanında geldi mi, göstergeler yorumlanabildi mi)
- Gözden geçirme sıklığı ve iyileştirme kaydı

## Adım 4 — Self-Check
- [ ] Dört etkinlik (Commitment / Plan / Perform / Evaluate) ayrı bölümler halinde var mı?
- [ ] Her gösterge bir bilgi ihtiyacına ve bir karara bağlı mı?
- [ ] Her construct'ta base measure, derived measure, indicator ve decision criteria dolu mu?
- [ ] Metrik uygunluk kontrol listesi her construct için uygulandı mı?
- [ ] Gösterge sayısı hedef aralıkta mı (değilse gerekçeli mi)?
- [ ] Her base measure için veri sorumlusu atanmış mı?
- [ ] Eşikler kaynaklı ya da "Varsayım:" etiketli mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-iso (ISO uyumu)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `MEASUREMENT_PLAN_<proje>.md`

## Adım 6 — Rapor
1. Dosya yolu.
2. Bilgi ihtiyacı ve gösterge sayısı.
3. Ölçüm kapsamı.
4. Boşluk.
5. Sonraki: `/feza-iso:iso25010-quality` ile kalite karakteristiği önceliklendirme veya `/feza-sqa:metrics-plan`.

## Sınırlar
- Max 3 soru.
- Gösterge sayısını gerekçesiz olarak 12'nin üzerine çıkarma.
- Karar ölçütü olmayan gösterge listeleme.
- Bilgi ihtiyacına bağlanmayan ölçü ekleme.
