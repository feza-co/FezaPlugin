# Tarif: Arama, Filtre ve Sıralama

> Kalıp kimliği: `recipe-search-filter` · İlgili ilkeler: Nielsen H1, H3, H6, H7, H9; WCAG 2.1 SC 1.3.1, 1.4.1, 2.4.3, 3.3.1, 4.1.3; ISO 9241-110 (kendini açıklayıcılık, kontrol edilebilirlik)

## 1. Amaç ve ne zaman kullanılır

Kullanıcının geniş bir veri kümesinden ilgisini çeken öğeleri bulmasını sağlayan arama, filtre ve sıralama denetimleri ile sonuç listesi. Amaç, kullanıcının aradığı şeyi hatırlamak zorunda kalmadan tanımasını (H6) ve uyguladığı her kısıtın görünür kalmasını sağlamaktır.

Kullanılır: liste/arama ekranları, ürün/kayıt koleksiyonları. Filtre ve sıralama durumu URL'de korunur; paylaşılabilir ve geri/ileri tuşlarıyla geri yüklenebilir (H7, H3). Arama kutusu ve filtre çubuğu liste başlığının hemen altında tek bölgede toplanır.

## 2. ASCII yerleşim

### Mobil (360 px)

```text
+------------------------------------+
| Ara                                |
| [Ara....................] [X]      |
| [Filtre (2) v]   [Sırala: Yeni v]  |
| Etkin: Fiyat 0-500 TL  x           |
|         Marka: A  x                |
|------------------------------------|
| 24 sonuç                           |
| Ürün A                249,00 TL  > |
| Ürün B                480,00 TL  > |
| Ürün C                120,00 TL  > |
|------------------------------------|
| [Daha fazla yükle]                 |
+------------------------------------+
```

Filtre paneli (açılır alt sayfa):
```text
+------------------------------------+
| Filtreler                    [X]   |
| Fiyat                              |
| [0........] - [500........]        |
| Marka                              |
| [ ] Marka A   [ ] Marka B          |
| [Filtreleri temizle] [Uygula]      |
+------------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+--------------------------------------------------------------------+
| Ara                                                                 |
| [Ara..............................]  [Sırala: Yeni v]              |
+----------------+---------------------------------------------------+
| Filtreler (2)  | 24 sonuç                                          |
| Fiyat          | Ürün A                              249,00 TL   >  |
| [0..]-[500..]  | Ürün B                              480,00 TL   >  |
| Marka          | Ürün C                              120,00 TL   >  |
| [ ] Marka A    | ...                                               |
| [ ] Marka B    | [Daha fazla yükle]                                |
| [Temizle]      |                                                   |
+----------------+---------------------------------------------------+
```

Masaüstünde filtre paneli sol sütunda sabit; sonuç sayısı ve sıralama içerik başlığında. Etkin filtreler ("çipleri") başlığın altında görünür.

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | Arama kutusu odaklanabilir, sıralama varsayılanı, tam sonuç listesi | Sonuç sayısı görünür ("24 sonuç") |
| Yükleniyor | İskelet satırlar; arama düğmesi/alanı `aria-busy` | ≤ 100 ms tepki; sonuç gecikirse iskelet (H1) |
| Boş | "Bu aramayla sonuç yok" + sorguyu tekrarla + "Filtreleri temizle" | Boş durum nedenini söyler (`references/recipe-empty-state.md`) |
| Hata | "Sonuçlar yüklenemedi" + "Tekrar dene" + girdi korunur | Mesaj ne + neden + nasıl (SC 3.3.1) |
| Başarı | Sonuç sayısı güncellenir; `role="status"` ile duyuru | "24 sonuç bulundu" kibarca duyurulur |
| Devre dışı | "Filtreleri uygula" hiçbir filtre değişmemişse devre dışı; temizlenecek filtre yoksa gizlenmez, devre dışı bırakılır | Devre dışı neden metinle belirtilir |

## 4. Etkileşim kuralları

- **Doğrulama zamanlaması:** Arama, yazma durduktan sonra (debounce) çalışır; sayı aralığı doğrulaması alandan çıkışta ("blur").
- **Geri al:** "Filtreleri temizle" tek eylemle tüm filtreleri kaldırır; her filtre çipi tek tek de kaldırılabilir.
- **Onay gerektiren eylem:** Yoktur; tüm filtre işlemleri geri alınabilir.
- **Odak taşıma:** Filtre paneli açılınca odak ilk denetime; kapanınca tetikleyiciye döner. Sonuç güncellenince odak listede kaldığı yerde kalır (H3).
- **Kaydedilmemiş değişiklik:** Yoktur; filtre durumu URL'de yaşar, çıkışta kayıp olmaz.
- **Sonuç yerleşimi:** Sıralama değişince sonuç başlığı `tabindex="-1"` ile odaklanabilir olur ama odak otomatik taşınmaz; değişiklik canlı bölgede duyurulur.
- **Çip davranışı:** Etkin filtre çipi metin + kaldırma düğmesi içerir; kaldırma düğmesinin erişilebilir adı "Fiyat 0-500 TL filtresini kaldır".
- **"Daha fazla yükle":** Sonsuz kaydırma yerine düğme tercih edilir; düğme sonrası odak yeni içeriğe taşınmaz, duyuru yapılır.

## 5. Erişilebilirlik notları

- **Landmark'lar:** Arama ve filtre denetimleri `search` bölgesi (form) içinde; sonuç listesi `main`; masaüstü filtre paneli `aside` (SC 1.3.1).
- **Başlık yapısı:** Tek `h1` ("Ara" / sonuç başlığı); filtre paneli `h2`.
- **ARIA:** Yerel `input[type=search]` + `<label>`; canlı sonuç sayısı `role="status"` (kibar). Etkin filtre çipleri gerçek liste (`ul`) + kaldırma düğmeleri.
- **Odak yönetimi:** Sonuçlar AJAX ile gelince odak kullanıcının bıraktığı yerde kalır; sayfa başına zorla taşınmaz.
- **Canlı bölge:** Sonuç sayısı değişimi kibarca duyurulur, her tuş vuruşunda değil (SC 4.1.3).
- **Kontrast ve durum:** Seçili filtre/aktif sıralama renk + işaret + `aria-pressed`/`aria-current` (SC 1.4.1).
- **Klavye:** Filtre paneli `Esc` ile kapanır; listeyle klavye etkileşimi (ok tuşları opsiyonel, sekme zorunlu) (SC 2.1.1).
- **Dokunma hedefi:** Filtre çipleri ve düğmeler ≥ 44 × 44 px.

## 6. Sık yapılan hatalar

1. **Uygulanan filtrelerin görünmemesi** → Kullanıcı neden az sonuç çıktığını anlamaz → Etkin filtreler metin çipi olarak başlık altında, sayısıyla gösterilir (H1, H6).
2. **Filtre durumunun URL'de korunmaması** → Paylaşılamaz, geri tuşu filtreyi kaybeder → Durum sorgu dizesinde tutulur (H7, H3).
3. **Boş sonuçta yalnız "Sonuç yok" yazısı** → Kullanıcı nasıl ilerleyeceğini bilmez → Neden boş + "Filtreleri temizle" + sorgu önerisi (H10, SC 3.3.3).
4. **Her tuş vuruşunda canlı bölgenin konuşması** → Ekran okuyucu kullanıcısı boğulur → Sonuç sayısı debounce sonrası, kibar bölgeyle duyurulur (SC 4.1.3).
5. **Sıralama değişince listenin başına odak zorla taşınması** → Kullanıcı konumunu kaybeder → Odak korunur; yalnız sayı ve sıralama metni duyurulur.
6. **Arama kutusunun etiketsiz, yalnız yer tutuculu olması** → Etiket kaybolur, tanıma zorlaşır → Görünür `<label>` veya `aria-label` ile birlikte; yer tutucu örnek verir (SC 3.3.2).
7. **"Temizle" ve "Uygula" belirsizliği (ne temizlenir?)** → Kullanıcı yanlış şeyi sıfırlar → "Filtreleri temizle" gibi nesne belirten etiketler (H2).
8. **Sonsuz kaydırmanın altbilgiyi erişilmez kılması** → Klavye kullanıcısı altbilgiye inemez → "Daha fazla yükle" düğmesi tercih edilir (SC 2.1.1).

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Arama düğmesi | Ara | Search |
| Filtre uygulama düğmesi | Filtreleri uygula | Apply filters |
| Filtre temizleme düğmesi | Filtreleri temizle | Clear filters |
| Sıralama etiketi | Sırala | Sort by |
| Sıralama seçeneği | En yeni | Newest |
| Arama alanı etiketi | Ara | Search |
| Sonuç sayısı | 24 sonuç | 24 results |
| Boş durum | Bu aramayla sonuç yok. Filtreleri temizleyip yeniden deneyin. | No results for this search. Clear filters and try again. |
| Hata | Sonuçlar yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin. | Results could not load. Check your connection and try again. |
| Yükleniyor | Sonuçlar aranıyor… | Searching… |
| Etkin filtre çipi | Fiyat: 0-500 TL [kaldır] | Price: $0-$500 [remove] |
| Biçim hatası (aralık) | En düşük fiyat en yüksekten büyük olamaz. Aralığı düzeltin. | Minimum price cannot exceed maximum. Adjust the range. |

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] Etkin filtreler başlık altında metin çipi olarak görünüyor ve sayısı belirtiliyor.
- [ ] Filtre ve sıralama durumu URL'de korunuyor; geri/ileri tuşlarıyla geri yükleniyor.
- [ ] Boş sonuç durumunda neden + "Filtreleri temizle" eylemi sunuluyor.
- [ ] Sonuç sayısı değişimi `role="status"` ile kibarca, debounce sonrası duyuruluyor.
- [ ] Arama alanının görünür etiketi var; yalnız yer tutucuya dayanmıyor.
- [ ] Filtre paneli `Esc` ile kapanıyor ve odak tetikleyiciye dönüyor.
- [ ] Sonuçlar klavyeyle gezilebiliyor; sonsuz kaydırma yerine "Daha fazla yükle" var.
