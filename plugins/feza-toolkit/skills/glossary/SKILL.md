---
name: glossary
description: >
  Gereksinim, proje yönetimi, ISO/IEC standartları, HCI ve SQA alanlarının ortak terim
  sözlüğünü üretir. Her terim için: TR-EN karşılık, tanım, standart/kaynak referansı
  (ör. ISO/IEC 25010:2023 §4.2, PMBOK 7), ilgili FezaPlugin skill'i (paket ad alanıyla),
  örnek kullanım. Alfabetik sıralı + kategorize. 85+ terim. Tetikleyici: "glossary",
  "sozluk", "/feza-toolkit:glossary", "terim sozluğü".
allowed-tools: Read, Write, AskUserQuestion
---

# Glossary

Gereksinim, PM, ISO, HCI ve SQA alanları için ortak terim sözlüğü (TR-EN).

## Tetikleyici
- "/feza-toolkit:glossary"
- "sozluk / glossary / terim sozluğü"

## Adim 0 — Bagilami Topla
Hicbir input gerekli değil — bu bir "knowledge dump" skill'i. Optional input:
- Belirli bir alan/paket icin (filtre)
- Belirli bir terim arama

## Adim 1 — Gri Nokta (max 1)

| # | Gri nokta |
|---|-----------|
| 1 | **Filtre** (tum alanlar / tek paket / belirli kategori) |

## Adim 2 — Bilgi Tabani
- `references/glossary-terms.md` — 85+ terim TR-EN karsiligi, her biri standart/kaynak referansli.

## Adim 3 — Uret

### Format (kısaltılmış — detay için `references/glossary-terms.md`)

```markdown
# FezaPlugin Glossary

> Kamuya acik standartlardan (ISO/IEC/IEEE, IEEE, W3C) ve yayinlanmis kaynaklardan (PMBOK Guide, Nielsen, Dix et al. vb.) derlenmistir.

## A
### <Terim> (Türkçe Karşılığı)
**Tanım:** ...
**Kaynak:** <standart/kaynak referansi, ör. ISO/IEC 25010:2023 §4.2, PMBOK 7>
**Skill:** /feza-pm:...
**Örnek:** ...
```

**Cikti üretirken:** `references/glossary-terms.md` dosyasından tüm terimler alfabetik sıralı olarak kopyalanır. Kullanıcı filtre (tek paket / tek kategori) istediyse o bölüm filtrelenir. Dokuman kalite kapisindan (`references/quality-gate.md`) gecer ve `references/output-conventions.md` teslim formatinda uretilir.

## Adim 4 — Self-Check
- [ ] 85+ terim mi?
- [ ] Alfabetik siralanmis mi?
- [ ] Her terim icin TR-EN var mi?
- [ ] Standart/kaynak referansi belirtildi mi?
- [ ] Iliskili FezaPlugin skill linki (paket ad alaniyla) var mi?
- [ ] 5 alan da (requirements, PM, ISO, HCI, SQA) temsil ediliyor mu?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle (bu doküman paket kriter setlerinden birine girmez) Bölüm 4 engelleyicileri ve "Teslim formatı" kriteriyle gizlice kontrol et.
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `GLOSSARY_<lang>.md` (default `GLOSSARY_TR.md`)

## Adim 6 — Rapor
1. Dosya yolu.
2. Toplam terim sayisi + alan dagilimi.
3. Kac terim standart/kaynak referansli.
4. Bos / TBD terim sayisi.

## Sinirlar
- Max 2 soru.
- Tanim olmadan terim ekleme.
- Standart/kaynak referansi yoksa "endustri pratigi" etiketi sart.
- Skill linki yoksa "kapsam disi" yaz.
