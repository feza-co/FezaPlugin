# Tarif: Veri Panosu (KPI + yoğun tablo + grafik)

> Kalıp kimliği: `recipe-data-dashboard` · İlgili ilkeler: Nielsen H1, H2, H6, H7, H8; WCAG 2.1 SC 1.1.1, 1.3.1, 1.4.1, 1.4.3, 2.4.3, 4.1.3; ISO 9241-110 (kendini açıklayıcılık, göreve uygunluk)

## 1. Amaç ve ne zaman kullanılır

Tek bakışta durum anlayışı sağlayan özet göstergeler (KPI), karar verilmesi gereken durumlar ve bir grafik paneli ile yoğun bir veri tablosunu bir arada sunan ekran. `references/screen-patterns.md` indeksindeki Dashboard kalıbını genişletir: KPI'lar, dikkat gerektirenler ve grafiklerin yanına filtrelenebilir yoğun tablo ekler.

Kullanılır: yönetim/operasyon panoları, izleme ekranları. Amaç, sayı ile kararı yan yana getirmek; her göstergenin bir eyleme bağlanmasıdır (H8, görev uygunluğu). Grafikler hiçbir zaman tek anlam kaynağı değildir; metin özeti ve tablo alternatifi sunulur (SC 1.1.1, 1.4.1).

## 2. ASCII yerleşim

### Mobil (360 px)

```text
+------------------------------------+
| <h1> Genel bakış                   |
| Son güncelleme 14:02  [Yenile]     |
|------------------------------------|
| +----------------+ +-------------+ |
| | Açık iş        | | Geciken     | |
| | 12             | | 2 !         | |
| | Dün 9          | | Artış       | |
| +----------------+ +-------------+ |
|------------------------------------|
| <h2> Dikkat gerekenler             |
| - Geciken: Rapor    [Aç]           |
|------------------------------------|
| <h2> Haftalık tamamlanan           |
| [grafik]                           |
| "Bu hafta 5 iş tamamlandı."        |
| [Veriyi tablo olarak gör]          |
|------------------------------------|
| [Filtre v]  [Ara.......]           |
| İş        Durum   Süre   Gecikme   |
| Rapor     Açık    3 g    -         |
| Onay      Geciken 5 g    2 gün     |
+------------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+--------------------------------------------------------------------+
| <h1> Genel bakış              Son güncelleme 14:02  [Yenile]       |
+--------------------------------------------------------------------+
| +------------+ +------------+ +------------+ +------------+        |
| | Açık 12    | | Bitti 5    | | Geciken 2! | | Ort. süre  |        |
| | Dün 9      | | Hedef 8    | | Artış      | | 2,4 gün    |        |
+--------------------------------------------------------------------+
| <h2> Haftalık tamamlanan           | <h2> Dikkat gerekenler        |
| [ grafik + doğrudan etiket ]        | - Geciken: Onay  [Aç]         |
| "Bu hafta 5 iş tamamlandı."         | - Süre aşımı: Rapor [Aç]      |
| [Veriyi tablo olarak gör]           |                               |
+--------------------------------------------------------------------+
| [Filtre v] [Ara.......]  [CSV indir]                              |
| İş        Durum   Süre   Gecikme   Sorumlu                         |
| Rapor     Açık    3 g    -         A. Yılmaz                       |
| Onay      Geciken 5 g    2 gün     B. Demir                        |
+--------------------------------------------------------------------+
```

Masaüstünde KPI şeridi en üstte 3-5 kart; altında iki sütun (grafik + dikkat listesi), sonra tam genişlikte yoğun tablo. Mobilde her bölge alt alta, KPI kartları iki sütun.

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | 3-5 KPI kartı, dikkat listesi, grafik + metin özeti, tablo | Her KPI etiket + değer + bağlam (dönem/karşılaştırma) içerir |
| Yükleniyor | KPI ve tablo için iskelet; "Son güncelleme" güncellenir | Blok bazlı iskelet; tüm sayfa boş kalmaz (H1) |
| Boş | "Bu dönemde kayıt yok" + birincil eylem ("İlk kaydı oluştur") | Veri yoksa grafik boş durum metniyle değişir (`references/recipe-empty-state.md`) |
| Hata | Bölgesel hata: yalnız ilgili kart/tablo "Tekrar dene" gösterir | Tüm sayfa kırılmaz (Dix: robustness) |
| Başarı | Yenileme sonrası "Güncellendi 14:02" `role="status"` | Zaman damgası ve yenile eylemi görünür (H1) |
| Devre dışı | Tablo satır seçimi veri yokken devre dışı; "dışa aktar" veri yoksa devre dışı | Devre dışı neden metinle |

## 4. Etkileşim kuralları

- **Sıralama ve filtre:** Tabloda sütun başlıkları gerçek `<button>` ile sıralar; aktif sıra `aria-sort` ile bildirilir. Filtre durumu URL'de korunur (H7).
- **KPI → liste:** Karta tıklamak ilgili filtrelenmiş listeye götürür (tanıma > hatırlama).
- **Grafik alternatifi:** Her grafiğin yanında metin özeti ve "Veriyi tablo olarak gör" bağlantısı; tablo eşdeğeri gerçek `<table>`.
- **Odak taşıma:** Grafik/tablo filtre sonrası güncellenince odak korunur; sayfayı yenilemez.
- **Onay gerektiren eylem:** "CSV indir" ve filtreleme geri alınabilir; onay gerekmez.
- **Kaydedilmemiş değişiklik:** Yoktur; pano salt okunur görünüm.
- **Dışa aktarma:** Dışa aktarma bir kez çalışır ve `role="status"` ile "İndirme başladı" duyurulur.
- **Segment seçimi:** Dönem seçici (bugün/hafta/ay) yerel `<select>` veya radyo grubu; seçim değişince veri sessizce yeniden çekilir ve yenileme damgası güncellenir.

## 5. Erişilebilirlik notları

- **Landmark'lar:** KPI şeridi `section` + `aria-labelledby`; grafik ve tablo ayrı `section`; dışa aktarma/filtre araç çubuğu `toolbar` ya da `form` (SC 1.3.1).
- **Başlık yapısı:** Tek `h1` ("Genel bakış"); her bölge `h2` ("Dikkat gerekenler", "Haftalık tamamlanan", tablo başlığı).
- **Grafik:** Anlamlı grafik `<figure>` + `<figcaption>`; metin özeti ve tablo alternatifi zorunlu. Grafik kendisi `role="img"` + `aria-label` ya da `aria-hidden="true"` (özet metin varsa). Tek başına renk ayırt edici değil (SC 1.1.1, 1.4.1).
- **Tablo:** Gerçek `<table>` + `<caption>`, `<th scope="col|row">`; sıralanabilir başlıklar `<button>` + `aria-sort` (SC 1.3.1, 4.1.2).
- **Canlı bölge:** Yenileme ve dışa aktarma durumu `role="status"` (kibar); kritik veri hatası `role="alert"` (SC 4.1.3).
- **Kontrast:** Tablo sayıları ve durum etiketleri (renk + ikon + metin) ≥ 4.5:1; eşik aşımı yalnız renkle değil (SC 1.4.3, 1.4.1).
- **Reflow:** 320 px'de tablo yatay kaydırma yerine kart görünümüne dönüşür (izin verilen istisna içinde) (SC 1.4.10).
- **Dokunma hedefi:** KPI kartları, sıralama başlıkları ve satır eylemleri ≥ 44 × 44 px.

## 6. Sık yapılan hatalar

1. **Grafikte anlamın yalnız renkle taşınması** → Renk körü kullanıcı serileri ayıramaz → Renk + desen/işaretçi + doğrudan etiket + metin özeti (SC 1.4.1).
2. **Grafiğin metin/tablo alternatifinin olmaması** → Ekran okuyucu kullanıcısı veriyi hiç alamaz → `<figcaption>` özeti + "Veriyi tablo olarak gör" eşdeğeri (SC 1.1.1).
3. **Sayıların bağlamsız sunulması ("12")** → Karar verilemez, yorum kullanıcıya yüklenir → Etiket + değer + karşılaştırma/dönem (H2, C10).
4. **Sütun başlıklarının sıralama durumunu bildirmemesi** → Ekran okuyucu hangi sütunun aktif olduğunu bilmez → `<button>` + `aria-sort` (SC 4.1.2).
5. **Tüm sayfanın tek hata ile kırılması** → Bir veri kaynağı düşünce pano kullanılamaz olur → Bölgesel hata + "Tekrar dene" (Dix: robustness).
6. **KPI sayısının 3-5'i aşması** → Bilişsel yük artar, hiçbir gösterge öne çıkmaz → En fazla 5 KPI; fazlası ayrı görünüme (Miller, H8).
7. **"Son güncelleme" ve yenilemenin olmaması** → Verinin güncelliği bilinmez (H1) → Zaman damgası + yenile düğmesi her panoda görünür.
8. **Yoğun tabloda satır yüksekliğinin 44 px altına inmesi** → Dokunma ve okunabilirlik bozulur → Satırlar ≥ 44 px; gerekiyorsa yoğunluk seçeneği kullanıcıya bırakılır.
9. **Dışa aktarmanın sessizce çalışması** → Kullanıcı indirme başladı mı emin olamaz → `role="status"` duyurusu (SC 4.1.3).

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Yenileme düğmesi | Yenile | Refresh |
| Dışa aktarma düğmesi | CSV indir | Export CSV |
| Sıralama başlığı | Süre (sırala) | Duration (sort) |
| Grafik alternatifi bağlantısı | Veriyi tablo olarak gör | View data as table |
| Grafik metin özeti | Bu hafta 5 iş tamamlandı; geçen hafta 3. | 5 tasks completed this week; 3 last week. |
| KPI bağlam etiketi | Açık iş (dün: 9) | Open tasks (yesterday: 9) |
| Eşik aşımı etiketi | Geciken: 2 (artış) | Overdue: 2 (increase) |
| Boş durum | Bu dönemde kayıt yok. İlk kaydı oluşturun. | No records in this period. Create the first record. |
| Hata | Tablo yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin. | The table could not load. Check your connection and try again. |
| Yükleniyor | Güncelleniyor… | Updating… |
| Başarı | Güncellendi 1 Ekim 2026, 14:02. | Updated Oct 1, 2026, 14:02. |
| Devre dışı neden | Dışa aktarmak için önce veri gerekir. | Data is required to export. |

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] En fazla 5 KPI kartı var; her kart etiket + değer + bağlam (dönem/karşılaştırma) içeriyor.
- [ ] Her grafik `<figcaption>` metin özeti ve gerçek tablo alternatifiyle destekleniyor.
- [ ] Grafiklerde seriler renk + desen/işaretçi + doğrudan etiketle ayırt ediliyor (gri tonlamada da okunur).
- [ ] Tablo gerçek `<table>` + `<caption>` + `<th scope>` kullanıyor; sıralanabilir başlıklar `<button>` + `aria-sort` taşıyor.
- [ ] Panoda "Son güncelleme" zaman damgası ve yenile eylemi görünüyor.
- [ ] Bir bölgenin hata durumu tüm sayfayı kırmıyor; yalnız ilgili bölge "Tekrar dene" gösteriyor.
- [ ] 320 px'de tablo yatay kaydırma yerine kart görünümüne dönüşüyor; satırlar ≥ 44 px.
