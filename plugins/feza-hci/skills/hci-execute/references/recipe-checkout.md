# Tarif: Ödeme Akışı (sepet → adres → ödeme → onay)

> Kalıp kimliği: `recipe-checkout` · İlgili ilkeler: Nielsen H1, H3, H5, H8, H9; WCAG 2.1 SC 1.4.1, 2.4.3, 3.3.1, 3.3.3, 3.3.4, 4.1.3; ISO 9241-110 (kontrol edilebilirlik, hata toleransı)

## 1. Amaç ve ne zaman kullanılır

Kullanıcının sepetindeki ürünleri adres ve ödeme bilgisiyle tamamlayıp siparişi onaylamasını sağlayan çok adımlı akış. Amaç, kararın geri döndürülemez olduğu son adıma kadar kullanıcıya tam görünürlük ve geri dönüş özgürlüğü sağlamaktır (H3, WCAG 3.3.4).

Kalıcı adım göstergesi (1 Sepet · 2 Adres · 3 Ödeme · 4 Onay) her ekranda görünür. Adımlar arası ileri-geri geçişte girilen veri korunur; kullanıcı önceki adıma dönüp düzeltebilir. Kapsam: 4 adım; ödeme sağlayıcısı entegrasyonu arayüz düzeyinde tanımlanır, gerçek tahsilat kapsam dışıdır.

## 2. ASCII yerleşim

### Mobil (360 px)

```text
+------------------------------------+
| Sipariş                            |
| 1 Sepet > 2 Adres > 3 Ödeme > 4 Onay|
| (aktif: 3 Ödeme)                   |
|------------------------------------|
| <h1> Ödeme                         |
| [Kart] (Seçili)   [Havale]         |
| Kart numarası                      |
| [....................]             |
| Son kullanma    CVV                |
| [....]          [....]             |
|------------------------------------|
| Ara toplam       1.250,00 TL       |
| Kargo               49,90 TL       |
| Toplam           1.299,90 TL       |
|------------------------------------|
| [Siparişi tamamla]                 |
| [< Adrese dön]                     |
+------------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+----------------------------------------------------------------+
| Sipariş                                                        |
| 1 Sepet > 2 Adres > 3 Ödeme > 4 Onay  (aktif: 3 Ödeme)         |
+----------------------------------------------------------------+
| +-----------------------------+  +---------------------------+ |
| | <h1> Ödeme                  |  | Sipariş özeti             | |
| | [Kart] (Seçili) [Havale]    |  | Ürün A      2 x 500       | |
| | Kart numarası               |  | Ürün B      1 x 250       | |
| | [.......................]   |  | -------------             | |
| | Son kullanma [......]       |  | Ara toplam   1.250,00 TL  | |
| | CVV [....]                  |  | Kargo           49,90 TL  | |
| | [Siparişi tamamla]          |  | Toplam       1.299,90 TL  | |
| +-----------------------------+  +---------------------------+ |
+----------------------------------------------------------------+
```

Masaüstünde form solda, sipariş özeti sağda sabit sütunda; özet adımlar arası görünür kalır. Onay adımında birincil eylem "Siparişi tamamla" tek ve baskındır.

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | Adım göstergesi + aktif adım içeriği + sipariş özeti | Özet her adımda görünür; adım göstergesi metinle ("3 Ödeme") |
| Yükleniyor | Tutar/sağlayıcı verisi için iskelet; düğme meşgul ("Sipariş oluşturuluyor…") | ≤ 100 ms tepki; 1 s üstü işte ilerleme durumu (H1) |
| Boş | Sepet boşsa 2. adıma geçilemez; "Sepetiniz boş" + "Alışverişe başla" | Boş sepette adım göstergesi "1 Sepet"te kalır |
| Hata | Alan yanında kısıt mesajı + üstte özet; sağlayıcı hatasında "Tekrar dene" + "Vazgeç" | Mesaj: ne oldu + neden + nasıl düzeltilir (SC 3.3.3) |
| Başarı | Teşekkür ekranı + sipariş numarası + "Siparişi takip et" | Sipariş numarası kopyalanabilir; ödeme bir kez yapılır |
| Devre dışı | "Siparişi tamamla" zorunlu alanlar tamamlanmadan devre dışı | Devre dışı neden metinle; yalnız renkle değil |

## 4. Etkileşim kuralları

- **Adım geçişi:** İleri geçiş yalnız mevcut adım geçerliyse; geri geçiş her zaman serbest ve veriyi korur (H3).
- **Doğrulama zamanlaması:** Adres ve ödeme alanları blur'da ve geçiş/ gönderimde doğrulanır; kart numarası biçimi yazarken maskelenir, hata blur'da.
- **Geri al:** Sipariş tamamlandıktan sonra iptal yalnız sipariş yönetiminden; onay öncesi tüm adımlar geri alınabilir.
- **Onay gerektiren eylem:** "Siparişi tamamla" geri döndürülemez; düğme son onay ekranında eylem adını taşır, özet tutar/adres gösterilir (WCAG 3.3.4).
- **Odak taşıma:** Adım değişince odak yeni `h1`'e; hata özeti çıkarsa odak özete ya da ilk hatalı alana (SC 2.4.3).
- **Kaydedilmemiş değişiklik:** Kullanıcı akıştan çıkarsa "Bilgileriniz kaydedilsin mi?" seçeneği; "Sepete dön" veriyi kaybetmez.
- **Çift gönderim:** Gönderim sırasında düğme `aria-busy` ve devre dışı; çift sipariş oluşmaz (H5).
- **Tutar değişimi:** Kargo/tutar adım ilerlerken değişirse özet güncellenir ve bir kez `role="status"` ile duyurulur.

## 5. Erişilebilirlik notları

- **Landmark'lar:** Adım göstergesi `nav` + `ol` olarak; form `main`; sipariş özeti `aside` (SC 1.3.1).
- **Başlık yapısı:** Ekran başına tek `h1` ("Ödeme"); özet paneli `h2`.
- **ARIA:** Adım göstergesi gerçek liste olarak işaretlenir; aktif adım `aria-current="step"` ile bildirilir. Sipariş özeti canlı bölgeye bağlanır (`role="status"`, kibar) (SC 4.1.3).
- **Odak yönetimi:** Adım geçişinde odak başlığa; hata özetinde bağlantılar sekme sırasına katılır.
- **Kontrast ve durum:** Seçili ödeme yöntemi yerel radyo (`input type="radio"`) grubu olarak işaretlenir; seçim yerel radyonun `checked` durumu + görsel işaretle belirtilir (ek ARIA gerekmez); hata yalnız renkle değil ikon + metinle (SC 1.4.1).
- **Giriş amacı:** Adres alanları `autocomplete` ("street-address", "postal-code", "cc-number", "cc-exp") (SC 1.3.5).
- **Dokunma hedefi:** Adım bağlantıları ve yöntem seçicileri ≥ 44 × 44 px.
- **Klavye:** Tüm akış klavyeyle tamamlanır; adım göstergesindeki geri bağlantısı da odaklanabilir (SC 2.1.1).

## 6. Sık yapılan hatalar

1. **Adım göstergesinin yalnız renkli noktalarla verilmesi** → Renk körü kullanıcı ve ekran okuyucu nerede olduğunu anlamaz → Metin ("3 Ödeme") + `aria-current="step"` ekle (SC 1.4.1, 4.1.2).
2. **Geri dönüşte verinin kaybolması** → Kullanıcı adres düzeltmek için geri gidince kart bilgisi silinir, akış baştan başlar → Adımlar arası durum bellekte/oturumda tutulur (H3, H6).
3. **Özet panelinin yalnız son adımda görünmesi** → Kullanıcı hangi ürün/tutar için ödediğini hatırlamak zorunda kalır → Özet tüm adımlarda görünür (H6, C10).
4. **"Onayla" gibi belirsiz final düğmesi** → Kullanıcı ne olacağını bilmez, yanlış tıklama riski artar → "Siparişi tamamla" gibi eylemi adlandıran etiket (H2, WCAG 3.3.4).
5. **Tutarın sessizce değişmesi (kargo, vergi)** → Kullanıcı ödeme anında fark eder, güven sarsılır → Değişiklik `role="status"` ile duyurulur ve özette vurgulanır (H1, SC 4.1.3).
6. **Kart alanlarında yapıştırmanın engellenmesi** → Parola/ödeme yöneticisi kırılır → Yapıştırma serbest; yalnız biçim maskesi uygulanır.
7. **Çift gönderimin engellenmemesi** → İki sipariş oluşur, ödeme iki kez çekilebilir → Düğme meşgul durumda ve devre dışı (H5, ISO hata toleransı).
8. **Boş sepette ileri geçişe izin verilmesi** → Kullanıcı boş sipariş göndermeye çalışır, hata alır → Boş durumda birincil eylem "Alışverişe başla", ileri düğmesi kapalı.

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Birincil düğme (final) | Siparişi tamamla | Place order |
| İleri düğmesi | Ödemeye geç | Continue to payment |
| Geri düğmesi | Adrese dön | Back to address |
| Adım etiketi | 3 Ödeme | 3 Payment |
| Alan etiketi (kart) | Kart numarası | Card number |
| Yardımcı metin (güvenlik) | Kart bilgileriniz şifreli iletilir. | Your card details are sent encrypted. |
| Biçim hatası (kart) | Kart numarası 16 haneli olmalı. Örnek: 1234 5678 9012 3456 | Card number must be 16 digits. Example: 1234 5678 9012 3456 |
| Ödeme hatası | Ödeme tamamlanamadı. Kart bilgilerinizi kontrol edip yeniden deneyin. | Payment failed. Check your card details and try again. |
| Yükleniyor | Sipariş oluşturuluyor… | Creating your order… |
| Başarı | Siparişiniz alındı. Numara: 48213. | Your order is placed. Number: 48213. |
| Boş durum (sepet) | Sepetiniz boş. Alışverişe başlayın. | Your cart is empty. Start shopping. |
| Tutar güncellemesi | Kargo ücreti eklendi: 49,90 TL. | Shipping added: $49.90. |
| Devre dışı neden | Siparişi tamamlamak için kart bilgilerini girin. | Enter your card details to place the order. |

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] Adım göstergesi tüm adımlarda görünür, metin içeriyor ve aktif adım `aria-current="step"` taşıyor.
- [ ] Adımlar arası geri dönüşte adres ve ödeme bilgileri korunuyor.
- [ ] Sipariş özeti (ürün, adet, ara toplam, kargo, toplam) her adımda görünüyor.
- [ ] Final düğme eylemi adlandırıyor ("Siparişi tamamla") ve onay ekranı tutar/adresi gösteriyor.
- [ ] Gönderim sırasında düğme meşgul ve devre dışı; çift sipariş oluşmuyor.
- [ ] Boş sepette ileri geçiş engelli ve "Alışverişe başla" birincil eylemi sunuluyor.
- [ ] Adres ve kart alanlarında uygun `autocomplete` tanımlı; akış yalnız klavyeyle tamamlanabiliyor.
