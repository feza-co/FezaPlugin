# Renk Kuralları

Kaynaklar: Itten renk çemberi, WCAG 2.1 (SC 1.4.1, 1.4.3, 1.4.11), Material Design dark theme rehberi.

## Color Wheel

- **Primary** (en içteki çember): Red, Yellow, Blue
- **Secondary** (orta): Green, Orange, Purple
- **Tertiary** (dış): Yellow-orange, Red-orange, Red-purple, Blue-purple, Blue-green, Yellow-green

## Color Harmonies

| Harmony | Tanım | Etki |
|---------|-------|------|
| **Analogous** | Çemberde yan yana 2-3 renk | Düşük kontrast, sakin, doğal |
| **Complementary** | Karşı karşıya 2 renk | Yüksek kontrast, dikkat çeker |
| **Split-complementary** | Bir renk + complementary'sinin iki yan komşusu | Komp. yumuşatılmış |
| **Triadic** | 120° eşit aralıklı 3 renk | Canlı, dengeli |
| **Monochromatic** | Tek hue'nin tone/shade'leri | Minimal, uyumlu |

## 60-30-10 Kuralı

- **%60 dominant** — sayfa zemini, geniş alanlar
- **%30 secondary** — destek, kart/blok arka planları
- **%10 accent** — CTA, vurgu

> Pratik kural: ana paleti 3 renkle sınırla; nötr tonlar (gri, beyaz, siyah) bu sayıya dahil edilmez.

## Renk-Duygu Eşlemesi (yaygın çağrışımlar)

| Renk | İlişkilendirme |
|------|-----------------|
| Mavi | Güven |
| Kırmızı | Aciliyet, tehlike |
| Yeşil | Doğa, başarı |
| Sarı | Uyarı, dikkat |
| Mor | Lüks, yaratıcılık |
| Turuncu | Enerji, dostluk |
| Siyah | Güç, sofistike |
| Beyaz | Saflık, sadelik |

> Kültürel farklılık var (örn. beyaz Doğu Asya'da yas) — hedef pazara göre yorumla.

## WCAG 2.1 Kontrast Eşikleri

| Seviye | Normal text | Large text (18pt+/14pt bold) | UI komponent / non-text |
|--------|-------------|-------------------------------|--------------------------|
| AA | ≥ 4.5:1 | ≥ 3:1 | ≥ 3:1 |
| AAA | ≥ 7:1 | ≥ 4.5:1 | – |

### Kontrast Hesaplama

```
L = 0.2126·R + 0.7152·G + 0.0722·B (gamma corrected)
Contrast = (L1 + 0.05) / (L2 + 0.05)
```

L1: aydınlık olan, L2: koyu olan.

## Color Coding Kuralı (WCAG 2.1 SC 1.4.1)

Arayüzleri renk körlüğünü dikkate alarak tasarla: bilgiyi yalnızca renkle iletme; renge ek olarak desen, etiket veya ikon kullan.

### Tipik durumlar

| Durum | Renk | + Görsel kanal |
|-------|------|-----------------|
| Error | Kırmızı | ❌ ikon + "Hata:" prefix |
| Success | Yeşil | ✓ ikon + "Başarılı:" |
| Warning | Sarı/Turuncu | ⚠ ikon + "Uyarı:" |
| Info | Mavi | ℹ ikon + "Bilgi:" |

## Color Blindness Tipleri

| Tip | Etkilenen | Dünya nüfusu | Tasarım önlemi |
|-----|-----------|--------------|-----------------|
| Protanopia | Kırmızı koni yok | %1 erkek | Kırmızı/yeşil ayrımı için ikon ekle |
| Deuteranopia | Yeşil koni yok | %6 erkek | Aynı |
| Tritanopia | Mavi koni yok | %0.01 | Mavi/sarı ayrımı için label ekle |
| Achromatopsia | Tüm renk algısı yok | < %0.01 | Yalnız tonal kontrast |

## Dark Mode

Koyu tema düşük ışıklı ortamlarda daha rahat olabilir ve göz yorgunluğunu azaltabilir; ancak kontrast ve doygunluk ayrıca ayarlanmalıdır.

### Dark mode yaparken kontrol
- Saturation azalt (parlak renkler dark'ta yorucu)
- Pure black (#000000) yerine #121212 (Material önerisi)
- Pure white (#fff) text yerine #e0e0e0 (eye strain azaltır)
- Aksent renkler için "luminosity" eşiği ayarla

## Feedback ve Validation Renkleri

- Form alanı border'ı kırmızı → input hatası
- Border yeşil / input check ikonu → başarılı doğrulama
- Progress bar: kırmızı → sarı → yeşil (task ilerlemesi)
