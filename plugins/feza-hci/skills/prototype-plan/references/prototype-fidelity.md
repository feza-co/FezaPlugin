# Prototype Fidelity

Kaynaklar: Constantine & Lockwood "Software for Use", Rettig 1994 "Prototyping for Tiny Fingers", Sharp, Rogers & Preece "Interaction Design", Buxton "Sketching User Experiences".

## Sıralama

```
Sketch → Storyboard → Wireframe → Mockup → Hi-fi Prototype → Code prototype
```

## Neden Prototip?

- Değerlendirme ve geri bildirim etkileşim tasarımının merkezindedir
- Fizibiliteyi ekip ve kullanıcılarla sına
- Paydaşlar dokümandan çok görüp dokunarak anlar
- Gereksinimleri doğrula
- Düşünmeyi teşvik eder
- Alternatifler arasında seçim yap
- **Risk yönetimi**

## Prototip Nedir?

- Bir dizi ekran eskizi
- Storyboard (çizgi roman benzeri sahneler)
- Tıklanabilir sunum dosyası
- Kullanımı canlandıran video
- Karton maket
- Sınırlı işlevli yazılım (hedef teknolojide)

## Constantine & Lockwood

> "Software is the only engineering field that throws together prototypes and then attempts to sell them as delivered goods."

→ Prototip ürün değildir. Sürüm 1.0'a prototipi sürmek ANTI-PATTERN.

## Fidelity Karşılaştırma

| Boyut | Low-fi | Hi-fi |
|-------|--------|-------|
| Maliyet | Düşük | Yüksek |
| Hız | Çok hızlı | Yavaş |
| Değiştirme kolaylığı | Yüksek | Düşük |
| Detay | Az | Çok |
| İnteraktivite | Yok / hayali | Tam |
| Geri bildirim | Konsept üzerine | Detay üzerine |

## Low-fi Araçları

- **Sketch** (kağıt, dijital pen) — el çizimi
- **Storyboard** — comic strip, scenario-based
- **Ofis malzemeleri** — index cards (3×5 inch), post-it'ler
- **Wireframe** — Balsamiq, low-fi Figma kit

## Sketching

Eskiz, kağıt üzerinde veya dijital bir araçta çizilen, konseptin temel temsilini veren el çizimidir.

**Ne zaman:** kavramsallaştırma + ilk görselleştirme
**Neden:** İnsanlar görsel öğrenir; görseller fikirleri sözden daha iyi anlatır.

## Storyboarding

Bir kullanıcının görevde nasıl ilerleyeceğini gösteren eskiz serisi.

**Avantaj:**
- Senaryo + akış aynı anda
- Erken aşamada kullanılır
- Kullanıcı/paydaşla etkili iletişim

**Şablon:** Çizgi roman panelleri — her panel bir adım, annotation ile.

## Ofis Malzemeleri

- Index cards: her kart = 1 ekran/sayfa
- Post-it'ler: renk kodlu, çiz, grupla, duvara yapıştır, iplikle bağla

## Wireframes

Arayüzün yalnızca temel öğelerini gösteren düşük sadakatli tasarım çıktıları; ürünün iskeleti ve planıdır.

**Ne zaman:**
- İlk ürün tasarım aşamaları
- Sayfa yapısını değerlendirmek
- İlişkili ekranların nasıl çalıştığını anlamak
- Ayrıntılı gereksinim dokümanı hazırlarken görsel destek

## Hi-fi Araçları

- **Figma** — endüstri standardı, collaborative
- **Penpot** — açık kaynak
- **Sketch** (Mac) — eskiden lider
- **Framer** — interaction-heavy
- **Adobe XD** — bakım modunda; yeni projede tercih edilmez

## Code Prototype

Bazen Figma yetersiz — gerçek kodla prototip:
- Performance test
- API entegrasyonu
- Karmaşık animasyon
- Cihaz davranışı (mobil sensörler)

**Risk:** kod prototipi v1.0'a dönüşür. Constantine & Lockwood uyarısına dikkat.

## Karar Matrisi

| Eğer şart | Önerilen seviye |
|-----------|-----------------|
| Kavram netleşmemiş | Sketch |
| Akış belli değil | Storyboard |
| Layout kararı | Wireframe |
| Görsel yön kararı | Mockup |
| Kullanıcı testi | Hi-fi prototype |
| Teknik fizibilite | Code prototype |

## Tipik Yol Haritası (yazılım projesi, takvim günü)

```
Gün 1-3:   Sketch + Storyboard (kavram + akış)
Gün 4-8:   Wireframe (yapı)
Gün 9-18:  Mockup → Hi-fi prototype (görsel + interaction)
Gün 19-23: Usability test
Gün 24+:   Iterate veya Code'a geç
```
