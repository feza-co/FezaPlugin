# Kullanılabilirlik Ölçüm Araçları ve Örneklem Kuralları

Kaynak künyeleri: Brooke 1996 (System Usability Scale, SUS), Lewis, Utesch & Maher 2013 (UMUX-Lite ve
SUB'a dönüşüm), Bangor, Kortum & Miller 2009 (SUS sıfat derecelendirmesi), Sauro & Lewis "Quantifying the
User Experience" (SUS derece ölçeği, benchmark), Rodden, Hutchinson & Fu 2010 (HEART çerçevesi),
Hart & Staveland 1988 ve Hart 2006 (NASA-TLX / Raw TLX), Nielsen & Landauer 1993, Virzi 1992,
Spool & Schroeder 2001.

> Kaynak künyesi verilmemiş hiçbir sayısal eşik bu belgede kullanılmaz. Bir aracın katsayı ya da sınır
> değerinden emin değilseniz sayı yazmaz, "için kaynağa bakın" notu bırakırsınız.

## 1. Görev Sonrası — SEQ (Single Ease Question)

- Her görev tamamlandıktan **hemen sonra** sorulan tek soru.
- Ölçek: 7'li (1 = çok zor, 7 = çok kolay).
- Soru kalıbı: "Bu görevi tamamlamak ne kadar kolay ya da zordu?" (1-7).
- Raporlama: görev başına ortalama + dağılım ve yanıt sayısı (n).
- Yorum: Sauro & Lewis'in derlemesinde görev düzeyi ortalama SEQ yaklaşık 5,5'tir ve altındaki değerler
  incelenmeye değerdir; kesin benchmark için kaynağa bakın.
- SEQ tek başına görev başarısını değil, algılanan kolaylığı ölçer; başarısızlık ve süre ile birlikte yorumlanır.

## 2. Oturum Sonu — UMUX-Lite

Zaman kısıtlıysa SUS yerine (ya da SUS'a ek) kullanılan 2 maddelik araç.

- Ölçek: 7'li (1 = kesinlikle katılmıyorum, 7 = kesinlikle katılıyorum).
- Maddeler (sıra ve ifade değiştirilmez):
  1. "Bu sistemin yetenekleri gereksinimlerimi karşılıyor."
  2. "Bu sistemi kullanmak kolay."
- Puan: `((madde1 + madde2) - 2) / 12 × 100` → 0-100.
- SUS'a dönüşüm: Lewis, Utesch & Maher 2013 regresyon modeli kullanılır; **katsayılar bu belgede
  verilmez** — dönüşüm için kaynağa bakın (Lewis, Utesch & Maher 2013).
- UMUX-Lite kısa olduğu için tek başına açık uçlu yorum sağlamaz; nitel bulgular ayrıca toplanır.

## 3. SUS Yorumlama (0-100)

SUS 0-100 arası bir puan üretir ama **yüzde değildir** (Sauro & Lewis); puanlar 0-100 ölçeğinde
yorumlanır. Ham madde metinleri ve ters madde hesabı `references/usability-test-protocol.md`'dedir.

### 3.1 Derece ölçeği (Sauro & Lewis, "Quantifying the User Experience")

| Derece | Yaklaşık SUS aralığı | Yüzdelik aralık |
|--------|----------------------|-----------------|
| A+ | 84,1 ve üzeri | 96-100 |
| A | 80,8 – 84,0 | 90-95 |
| A- | 78,9 – 80,7 | 85-89 |
| B+ | 77,2 – 78,8 | 80-84 |
| B | 74,1 – 77,1 | 70-79 |
| B- | 72,6 – 74,0 | 65-69 |
| C+ | 71,1 – 72,5 | 60-64 |
| C | 65,0 – 71,0 | 41-59 |
| C- | 62,7 – 64,9 | 35-40 |
| D | 51,7 – 62,6 | 15-34 |
| F | 51,7 altı | 0-14 |

Yüzdelik aralıklar Sauro & Lewis'in yayımlanmış eğri derece tablosundan (measuringu.com/interpret-sus-score,
Table 1; erişim: 2 Ekim 2026) alınmıştır ve yalnız derece satırına karşılık gelen aralıkları verir.

Referans noktası: derlenen çalışmalarda ortalama SUS yaklaşık 68'dir (Sauro & Lewis). Aralık sınırları
ilgili kaynağa göre teyit edilir.

### 3.2 Sıfat derecelendirmesi (Bangor, Kortum & Miller 2009)

SUS puanı şu sıfat kategorileriyle yorumlanabilir (ölçek sırası):

> En kötü düşünülebilir · Berbat · Zayıf · Kabul edilebilir (OK) · İyi · Mükemmel · En iyi düşünülebilir

Numeric sınır değerler bu belgede verilmez; kategori-puan eşlemesi için Bangor, Kortum & Miller 2009'a
bakın. Yaygın özet: "80 üzeri iyi, 51 altı zayıf" (Sauro & Lewis).

## 4. HEART Çerçevesi (Rodden, Hutchinson & Fu 2010)

Her plan hedef → sinyal → metrik zinciriyle en az bir HEART boyutu tanımlar. Bir boyut seçilemiyorsa
gerekçesi "Bilinen Boşluklar"a yazılır.

| Boyut | Amaç (Goal) | Sinyal (Signal) | Metrik (Metric) |
|-------|-------------|-----------------|-----------------|
| Happiness | Algılanan memnuniyet | Öznel puanlar | SUS / UMUX-Lite / SEQ ortalaması |
| Engagement | Kullanım derinliği | Kullanım sıklığı/yoğunluğu | Oturum başına görev sayısı |
| Adoption | Yeni kullanıcı benimsemesi | İlk kullanım | Yeni kullanıcı sayısı / ilk görevi tamamlama oranı |
| Retention | Geri dönme | Tekrar kullanım | Dönem içi dönen kullanıcı oranı |
| Task Success | Görevi bitirme | Başarı, süre, hata | Tamamlama oranı, görev süresi, hata oranı |

Metrikler ürün ölçeğinde tanımlanır; laboratuvar oturumundan gelen değerler yalnız Task Success ve
Happiness için doğrudan kullanılır, diğer boyutlar üretim telemetrisi ile izlenir.

## 5. Örneklem Kuralları

| Araştırma amacı | Önerilen katılımcı | Kaynak |
|-----------------|--------------------|--------|
| Niteliksel sorun keşfi | 5 | Nielsen & Landauer 1993; Virzi 1992 |
| Niceliksel metrik (oran / SUS güven aralığı) | ≥ 20 | Nielsen (NN/g, "Quantitative Studies: How Many Users to Test?", 2006) |
| Segment başına (birden çok kullanıcı sınıfı) | 3-4 | Nielsen |

- Niteliksel sayı (5) küçük örneklemle en sık sorunları bulmayı amaçlar; niteliksel bulgular oran
  olarak raporlanmaz.
- Niceliksel iddialar (ör. "%x tamamladı") ancak yeterli örneklemle (≥ 20) verilir; aksi hâlde n
  yazılır ve "yön göstergesi" olarak etiketlenir.
- Karmaşık ürün/sitede 5 katılımcı yetersiz kalabilir (Spool & Schroeder 2001); kapsam büyükse
  segment başına 3-4 kuralı uygulanır.
- Her segment için ayrı örneklem gerekir; segmentler birleştirilerek tek n hesabı yapılmaz.

## 6. NASA-TLX ve Raw TLX (yalnız karmaşık/kritik görevler)

- NASA-TLX altı alt ölçekten oluşur: Zihinsel talep, Fiziksel talep, Zaman baskısı, Performans, Çaba,
  Hayal kırıklığı (Hart & Staveland 1988).
- **Raw TLX**: ağırlıklandırma yapılmadan altı alt ölçeğin ortalaması; hızlı uygulama için önerilir
  (Hart 2006).
- Kullanım koşulu: **yalnız** görev karmaşık/kritik ve bilişsel yük ölçümü karar girdisi ise. Basit
  görevlerde kullanılmaz.
- Plan tablosunda her NASA-TLX satırı için bir **"gerekçe"** hücresi zorunludur: bu görevin neden
  bilişsel yük ölçümü gerektirdiği (ör. güvenlik/para ile ilgili çok adımlı işlem, yoğun veri girişi).
- Diğer öznel araçlarla (SUS/SEQ) karıştırılmaz; NASA-TLX görev düzeyi yükü, SUS oturum düzeyi
  algıyı ölçer.
