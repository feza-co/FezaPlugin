---
name: competitor-analysis
description: >
  Rakip analizi tablosu üretir. Porter (1980) rekabet stratejileri çerçevesiyle. Önce
  README'de "alternatives", manifest'te rakip kütüphaneler, BRIEF'te bilinen
  rakipler aranır. Bilinmeyenler için kullanıcıdan tek soruyla liste alınır.
  Tetikleyici: "rakip analizi", "competitor analysis", "/feza-pm:competitor-analysis",
  "alternatif ürünler".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Competitor Analysis

## Tetikleyici
- "/feza-pm:competitor-analysis"
- "rakip analizi / alternatif ürünler"
- "competitor / competitive landscape"

## Adım 0 — Bağlamı Topla
1. `BRIEF.md`/`README.md` "Alternatives", "Competitors", "Alternatifler", "Why us" bölümleri.
2. `package.json` benzer kütüphaneler.
3. `SCOPE_*.md` — pazar pozisyonu.
4. Hiç yoksa **TEK** `AskUserQuestion`:
   - **Soru:** "Bilinen 2-5 rakip ürün ya da alternatif çözüm söyler misin?"
   - **Header:** "Rakipler"
   - Tek seçenek: "Şimdi yazacağım" + Other.

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Karşılaştırma boyutları** (fiyat, özellik, hedef segment, teknoloji, vs. — varsayılan: 6'lı set) |
| 2 | **Hedef pazar segmenti** |

## Adım 2 — Bilgi Tabanı
- `references/competitor-template.md` — tablo formatı + farklılaşma çerçevesi.

## Adım 3 — Üret

### Karşılaştırma Tablosu (varsayılan 6 boyut)

| Boyut | Bizim Ürün | Rakip A | Rakip B | Rakip C |
|-------|------------|---------|---------|---------|
| **Fiyat** | $X/ay (planı) | ... | ... | ... |
| **Hedef Segment** | ... | ... | ... | ... |
| **Çekirdek Özellikler** | ... | ... | ... | ... |
| **Teknoloji Yığını** | ... | ... | ... | ... |
| **Eksi Yönleri** | ... | ... | ... | ... |
| **Artı Yönleri** | ... | ... | ... | ... |

### Farklılaşma Önerisi (Differentiation)

3 stratejiden 1'i:
- **Cost leadership** — daha ucuz
- **Differentiation** — özgün özellik / kalite
- **Niche** — küçük segmente derin odak

Hangisi seçildi + neden + nasıl operasyonelleştirilir.

### Pazar Boşluk Tablosu (Gap)

| Müşteri ihtiyacı | Mevcut çözümler ne sunuyor | Boşluk | Bizim cevabımız |
|------------------|---------------------------|--------|-----------------|
| ... | ... | ... | ... |

## Adım 4 — Self-Check
- [ ] En az 2 rakip var mı?
- [ ] Her boyutta her sütun dolu mu (TBD'ler etiketli)?
- [ ] Farklılaşma stratejisi seçildi ve gerekçeli mi?
- [ ] "Bizim ürün" sütununa abartı yok mu (ölçülebilir iddialar)?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `COMPETITORS_<proje>.md`

## Adım 6 — Rapor
1. Dosya yolu.
2. Kaç rakip × kaç boyut.
3. Önerilen farklılaşma stratejisi.
4. Boşluk sayısı.
5. Sonraki adım: "SWOT'taki Threats bölümü bu rakiplerden beslenebilir → `/feza-pm:swot` veya `/feza-pm:risk-register`."

## Sınırlar
- Max 3 soru.
- Rakip uydurma — kullanıcı vermediyse ve manifest'te ipucu yoksa "Bilinen rakip yok, varsayım: <pazar genel oyuncuları>" etiketle.
- Web search YOK (bu sürümde).
