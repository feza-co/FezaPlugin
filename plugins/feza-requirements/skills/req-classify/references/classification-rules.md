# Classification Rules (ISO/IEC/IEEE 29148:2018)

## Functional Requirement (FR)

> ISO/IEC/IEEE 29148:2018 ile uyumlu tanim: bir fonksiyonel gereksinim, sistemin davranis olarak ne yapmasi gerektigini belirtir.

### Tanima Sinyalleri
- Aktor + eylem + nesne yapisi
- Ne yapilir? Ne uretilir? Ne hesaplanir?
- Spesifik bir input → output transformation

### Ipucu Kelimeler
- shall + (do, perform, calculate, send, receive, display, store, retrieve, validate, generate, allow, enable)
- "user can…", "system shall…"
- "kullanici…yapar", "sistem…goruntuler"

### Ornek
- "Sistem kullanicinin sifresini bcrypt ile hashlayarak kaydedecektir."
- "The system shall send a confirmation email within 30 seconds."

## Non-Functional Requirement (NFR)

> Genel tanim: HOW well sistem yapacak — quality attribute.

### Tanima Sinyalleri
- Quality dimension (25010 karakteristigi)
- Olculebilir esik
- "How well" bahsi (response time, uptime, security level)

### Ipucu Kelimeler
- fast, secure, available, scalable, maintainable, portable
- AMA mutlaka SAYISAL ESIK eslik etmeli — yoksa yeniden yazma gerek
- "shall maintain", "shall respond within", "shall support N users"

### 25010 Eslemesi (zorunlu)
Her NFR bir 25010 ana karakteristigine bagli olmali:
- Functional Suitability
- Performance Efficiency
- Compatibility
- Interaction Capability (eski Usability)
- Reliability
- Security
- Maintainability
- Flexibility (eski Portability; Scalability dahil)
- Safety (yeni 2023)

### Iyi vs Kotu

| Kotu | Iyi |
|------|-----|
| "Sistem hizli olmali" | "Sistem ana sayfayi 25 Mbps'de < 2 saniye yukleyecektir" |
| "Sistem guvenli olmali" | "Sistem TLS 1.3 ile veriyi sifreleyecektir" |
| "Cok kullanici desteklemeli" | "Sistem 1000 eszamanli kullaniciya hizmet verecektir" |

## Constraint

### Tanima Sinyalleri
- Tasarim tercihi degil — zorunluluk
- Teknoloji / platform / regulatif kurali
- "must use…", "shall comply with…"

### Tipler
- **Technical:** "PostgreSQL 14+ uzerinde calismalidir"
- **Regulatory:** "KVKK Madde 6 ile uyumlu olmalidir"
- **Hardware:** "iPhone 12 ve sonrasi modelde calismalidir"
- **Standards:** "IEEE 802.11ac uzerinde calismalidir"

### NFR'den Farki
- NFR: "fast, secure" — kalite hedefi
- Constraint: "PostgreSQL kullanmaliyiz" — secim hakki yok

## Assumption

### Tanima Sinyalleri
- Plan baglamlanir — yanlissa proje etkilenir
- Kontrol edilmeyen baglamsal varsayim
- "assumes", "given that", "we expect"

### Ornek
- "Kullanici cihazinda surekli internet baglantisi vardir."
- "Müşteri verilerini günlük olarak yedekleme süreci IT tarafından sağlanmaktadır."
- "Yıl içinde 3 yeni ofis açılması planlanıyor."

### Yonet
- Her assumption icin "Yanlissa ne olur?" dusunulmeli
- Risk register'da paralel risk olarak

## Out-of-Scope

### Tanima Sinyalleri
- "Bu sürümde yok"
- "Future version"
- "Excludes…"
- "Not in this release"

### Yonet
- Scope statement'ta da yer almali
- Reddediliyor mu, erteleniyor mu netlestir

## Ipucu Kelime Cetveli (hizli karar)

| Kelime / Kalip | Once tahmin |
|----------------|-------------|
| "shall + verb + obj" | FR |
| "shall + adj + numerical" | NFR |
| "must use X technology" | Constraint |
| "must comply with regulation" | Constraint |
| "assumes / given" | Assumption |
| "not / future / excludes" | Out-of-Scope |
| "fast / secure / scalable" (sayisal yok) | NFR — yeniden yazima muhtac |

## Anti-Pattern'ler

### Singular ihlali (en yaygin)
"Sistem hem hizli hem guvenli olmali" → 2 ayri NFR yap.

### NFR / Constraint karistirmasi
- "Sistem hızlı olmalı" = NFR (kalite hedefi)
- "Sistem MongoDB kullanmalı" = Constraint (zorunlu teknoloji)

### Implicit assumption gozardi
"Sistem her zaman online olmali" — assumption: kullanici hep online. Yazılı assumption'a cevirelim.

### Yasak terim (`language-guidelines.md`)
- kullanici dostu, hizli, esnek, modern, sagslam, robust
- olabilir, belki, muumkunse
- ve / and / or (singular ihlali)

## Cikti Sablonu

```markdown
> **Requirement Classification** — <Proje>
> Standart: ISO/IEC/IEEE 29148:2018 + ISO/IEC 25010:2023
> Toplam ham madde: N
> Üretildi: <tarih>

## Genel Ozet
[5 kategori sayisi]

## Detay Tablo
| # | Orijinal | Kategori | Yeniden Yazim | Gerekce | 25010 |
|---|----------|----------|----------------|---------|-------|

## NFR'lerin 25010 Dagilimi
[9 karakteristik tablosu]

## Anti-Pattern Bulgulari
[singular / yasak terim / belirsizlik tespitleri]

## Sonraki Adim
- /feza-requirements:req-conflict-check
- /feza-requirements:srs-generate
```
