---
name: complaints-to-compliance
description: >
  "Complaints to Compliance" tekniği — ekibin gerçek şikayetlerini
  ISO/IEC/IEEE 12207:2017 6.3 Technical Management process'lerine eşler.
  Her şikayet için kim/rol → hangi 6.3 process ihlali → düzeltici aksiyon.
  8 process (Planning, Assessment, Decision, Risk, Configuration,
  Information, Measurement, QA) tam kapsanır. Kullanıcı şikayetleri komut
  argümanında veya CONFLICT_LOG.md'den okur. Tetikleyici: "complaints to
  compliance", "şikayetleri standarda eşle", "/feza-iso:complaints-to-compliance".
allowed-tools: Read, Write, Glob, AskUserQuestion
---

# Complaints to Compliance

Ekip şikayetlerini standart süreç ihlallerine çeviren pratik bir denetim tekniği: şikayet bir semptomdur, 12207 process'i ise kök neden kataloğudur.

## Tetikleyici
- "/feza-iso:complaints-to-compliance"
- "şikayetleri 12207'ye eşle"
- "complaints to compliance mapping"

## Adım 0 — Şikayetleri Topla
1. Komut argümanında varsa direkt kullan: `/feza-iso:complaints-to-compliance "Mobil Ekip Lideri: sahadaki sürümlerin API uyumu kayıtlı değil; Finans Kontrolörü: fiyat modeli değişikliğinden geç haberdar olduk"`
2. Yoksa **`CONFLICT_LOG.md`** ara (önceki `/feza-pm:conflict-resolve` çıktısı)
3. Yoksa **`COMM_PLAN_*.md`** içinde "Conflict Anticipation" notları
4. Yoksa **TEK** `AskUserQuestion`:
   - **Soru:** "Ekipten gelen şikayetleri/yakınmaları kısa anlat. (her satır: 'Rol: şikayet')"
   - **Header:** "Şikayet listesi"
   - Tek seçenek: "Şimdi yazacağım" + Other (free-text)

## Adım 1 — Gri Nokta (max 1)

| # | Gri nokta |
|---|-----------|
| 1 | **Çıktı dosyaya mı yazılsın, sohbette mi?** (varsayılan: dosya, kurumsal teslim formatı) |

## Adım 2 — Bilgi Tabanı
- `references/complaints-mapping.md` — 6.3'ün 8 süreci için eşleme kartları (amaç, belirti sinyalleri, örnek, düzeltici aksiyonlar), eşleme kuralları ve sinyal sözlüğü.
- (`references/12207-processes.md` da kullanılabilir; kaynağı iso12207-audit skill'i, sync ile kopyalanır)

## Adım 3 — Üret

Çıktıda kişi adı kullanılmaz; şikayet sahibi **rol** ile yazılır.

### Bölüm 1 — Şikayet Tablosu

Her şikayet için: rol → şikayet → birincil (kök neden) ve ikincil süreç → gerekçe → düzeltici aksiyon.

| # | Rol | Şikayet | Birincil 6.3 Süreci | İkincil | Gerekçe | Düzeltici Aksiyon | FezaPlugin Skill |
|---|-----|---------|---------------------|---------|---------|--------------------|------------------|
| 1 | Mobil Ekip Lideri | "Sahada üç uygulama sürümü var; hangisinin hangi API şemasıyla uyumlu olduğu kayıtlı değil." | **6.3.5 Configuration Management** | 6.3.6 | Yapılandırma öğeleri ve sürüm uyumluluğu tanımlanmamış | Sürüm uyumluluk matrisi + minimum desteklenen sürüm politikası | `/feza-sqa:change-control` |
| 2 | Finans Kontrolörü | "Fiyat modeli değişikliğini bir müşteri itirazından öğrendik." | **6.3.3 Decision Management** | 6.3.6 | Karar kaydı ve etkilenen birim listesi yok | Karar kaydı şablonu + eşik üstü kararlar için zorunlu paydaş listesi | – |
| 3 | Veri Mühendisi | "Şema değişiklikleri incelemeden üretime çıkıyor." | **6.3.8 Quality Assurance** | 6.3.5 | Veri değişiklikleri kalite kapısı dışında | Şema sözleşme testleri + CI uyumluluk kapısı | `/feza-sqa:sqa-plan` |
| ... |

### Bölüm 2 — Süreç Bazlı Özet

8 sürecin her biri için şikayet sayısı (birincil eşlemeye göre) ve en kritik şikayet:

| Süreç | Şikayet sayısı | En kritik şikayet |
|-------|----------------|-------------------|
| 6.3.1 Project Planning | <n> | <kısa alıntı> |
| 6.3.2 Project Assessment and Control | <n> | ... |
| 6.3.3 Decision Management | <n> | ... |
| 6.3.4 Risk Management | <n> | ... |
| 6.3.5 Configuration Management | <n> | ... |
| 6.3.6 Information Management | <n> | ... |
| 6.3.7 Measurement | <n> | ... |
| 6.3.8 Quality Assurance | <n> | ... |

Şikayet düşmeyen süreç "0 — şikayet yok" olarak bırakılır; silinmez.

### Bölüm 3 — Top-3 Yapısal Sorun

Birincil eşlemede en yoğun üç süreç; her biri için kök neden ve ölçülebilir hedef (ör. "sahada desteklenmeyen sürüm oranı ≤ %5").

### Bölüm 4 — 30/60/90 Gün Aksiyon Planı

| Dönem | Aksiyon | Sorumlu rol | Kapanış kanıtı |
|-------|---------|-------------|----------------|
| 0-30 | <en yoğun sürecin ilk aksiyonu> | <rol> | <belge / kayıt / CI kuralı> |
| 30-60 | ... | ... | ... |
| 60-90 | ... | ... | ... |

### Bölüm 5 — FezaPlugin Skill Önerileri

Zayıf süreçler için doğrudan eşleme:
- 6.3.1 → `/feza-pm:scope-statement`, `/feza-pm:wbs`, `/feza-pm:raci`
- 6.3.2 → `/feza-pm:activity-sequence` + aksiyon kaydı
- 6.3.4 → `/feza-pm:risk-register`
- 6.3.5 → `/feza-sqa:change-control`
- 6.3.6 → `/feza-pm:comm-plan`
- 6.3.7 → `/feza-iso:iso15939-measure`, `/feza-sqa:metrics-plan`
- 6.3.8 → `/feza-sqa:sqa-plan`

## Adım 4 — Self-Check
- [ ] Her şikayet birincil bir 6.3 sürecine eşlendi mi (gerekirse ikincil süreç)?
- [ ] Kişi adları rol adlarıyla değiştirildi mi?
- [ ] Eşleme gerekçeli mi?
- [ ] Düzeltici aksiyon somut mu (genel "iyileştir" değil)?
- [ ] 30/60/90 gün planı var mı?
- [ ] Process bazlı özet tablosu var mı?
- [ ] FezaPlugin skill önerileri eşlendi mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-iso (ISO Uyumu)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `COMPLAINTS_TO_COMPLIANCE_<proje>.md`

## Adım 6 — Rapor
1. Dosya yolu.
2. Şikayet sayısı + en yoğun 3 process.
3. Top-1 yapısal sorun.
4. 30/60/90 gün ilk aksiyon.
5. Sonraki: `/feza-iso:iso12207-audit` (tüm 30 process tarama) veya en yoğun process'in FezaPlugin karşılığı.

## Sınırlar
- Max 2 soru.
- Şikayet eşleme gerekçesiz olamaz.
- Düzeltici aksiyon "daha iyi yap" tarzı genel olamaz.
- Tarafları yargılamaktan kaçın — process odaklı kal.
- Katalogdaki örnekleri yalnızca etiketleme biçimi için kullan; çıktıya kullanıcının şikayetlerini yaz.
- Çıktıda kişi adı yer almaz; yalnızca rol.
