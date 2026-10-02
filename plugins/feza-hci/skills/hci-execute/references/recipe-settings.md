# Tarif: Ayarlar (profil / bildirimler / tehlikeli eylemler)

> Kalıp kimliği: `recipe-settings` · İlgili ilkeler: Nielsen H1, H3, H4, H5, H8, H9; WCAG 2.1 SC 1.3.1, 1.4.1, 2.4.3, 3.3.1, 3.3.4, 4.1.3; ISO 9241-110 (kontrol edilebilirlik, uygunluk)

## 1. Amaç ve ne zaman kullanılır

Kullanıcının profil bilgilerini, bildirim tercihlerini ve hesap düzeyindeki eylemleri yönettiği ekran. Amaç, sık değişen tercihleri az sürtünmeyle kaydetmek ve geri döndürülemez "tehlikeli" eylemleri görsel ve bilişsel olarak ayrı tutmaktır.

Üç alt bölge:

- **Profil:** Ad, iletişim, dil/yerel biçim. Değişiklikler kaydet düğmesiyle toplanır.
- **Bildirim tercihleri:** Kanal bazlı (e-posta, uygulama içi, SMS) açma/kapama; her satır bağımsız kaydedilir.
- **Tehlikeli eylemler:** Hesap silme gibi geri döndürülemez işlemler; ayrı bölge, ayrı başlık, adlandırılmış onay.

## 2. ASCII yerleşim

### Mobil (360 px)

Sekmeler: Profil · Bildirimler · Tehlikeli.
```text
+----------------------------------+
| Ayarlar                          |
| [Profil] Bildirimler  Tehlikeli  |
|----------------------------------|
| <h1> Profil                      |
| Ad Soyad                         |
| [..............................] |
| E-posta                          |
| [..............................] |
| Dil                              |
| [Türkçe (TR)  v]                 |
| [Değişiklikleri kaydet]          |
|----------------------------------|
| <h2> Tehlikeli eylemler          |
| Hesap silme geri alınamaz.       |
| [Hesabı sil]                     |
+----------------------------------+
```

Silme onayı (diyalog):
```text
+----------------------------------+
| Hesabı sil                       |
| Bu işlem geri alınamaz. Tüm      |
| verileriniz kalıcı olarak        |
| silinir. Onaylamak için          |
| "hesabımı sil" yazın.            |
| [..............................] |
| [Vazgeç]      [Hesabı sil]       |
+----------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+----------------------------------------------------------+
| Ayarlar                                                   |
| +----------------+  +----------------------------------+  |
| | Profil         |  | <h1> Bildirimler                 |  |
| | Bildirimler    |  | E-posta bildirimleri   [ ]       |  |
| | Tehlikeli      |  | Uygulama içi           [x]       |  |
| |                |  | SMS bildirimleri       [ ]       |  |
| |                |  | Her değişiklik anında kaydedilir |  |
| +----------------+  +----------------------------------+  |
+----------------------------------------------------------+
```

Masaüstünde sol dikey sekmeler, sağda içerik. Tehlikeli eylemler bölümü ayrı sekmede ve `--color-danger` ile ayrışır.

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | Mevcut değerler dolu, kaydet düğmesi, bildirim anahtarları | Varsayılanlar gerçek durumu yansıtır; yanıltıcı varsayılan yok |
| Yükleniyor | Ayarlar iskelesi; anahtarlar geçici olarak `aria-busy` | Kaydetme sırasında düğme meşgul durumda (H1) |
| Boş | Uygulanmaz — ayarlar her hesapta tanımlı; "üçüncü taraf bağlantısı yok" gibi bölgeler boş durum metni alır | Boş bölge "Bağlı uygulama yok. [Bağla]" metniyle |
| Hata | Alan yanında mesaj + üstte özet; kaydetme hatasında "Tekrar dene" | Değerler korunur; mesaj ne + neden + nasıl düzeltilir (SC 3.3.3) |
| Başarı | "Değişiklikler kaydedildi" `role="status"` bildirimi | Anlık kaydedilen anahtarlarda sessiz onay + toast |
| Devre dışı | E-posta gibi kilitli alanlar `readonly` + neden söyleyen yardımcı metin | Kilit nedeni ("E-posta değişikliği destek ekibiyle yapılır") metinle; alan odaklanabilir kalır, kopyalanabilir |

## 4. Etkileşim kuralları

- **Doğrulama zamanlaması:** Profil alanları blur'da ve kaydetmede; bildirim anahtarları anında uygulanır ve kaydedilir.
- **Geri al:** Bildirim anahtarı değişikliği 5-10 s içinde "Geri al" toast'ı ile geri alınabilir (H3).
- **Onay gerektiren eylem:** Yalnız hesap silme. Adlandırılmış onay istenir; onay düğmesi "Hesabı sil" der, "Evet" demez (WCAG 3.3.4). Kullanıcıdan "hesabımı sil" yazması istenerek yanlış tıklama önlenir (H5).
- **Odak taşıma:** Diyalog açılınca odak ilk odaklanabilir öğeye; kapanınca tetikleyiciye döner (SC 2.1.2, 2.4.3).
- **Kaydedilmemiş değişiklik:** Profil formunda değişiklik varken sekme/ekran değiştirilirse "Kaydedilmemiş değişiklikler var" uyarısı.
- **Devre dışı bağımlılık:** Ana bildirim kapalıysa alt kanallar devre dışı ve neden metinle belirtilir.
- **Hesap silme sonrası:** Oturum sonlandırılır ve giriş ekranına "Hesabınız silindi" mesajıyla yönlendirilir.

## 5. Erişilebilirlik notları

- **Landmark'lar:** Ayarlar sekmeleri `nav`; içerik `main`; tehlikeli bölge `section` + `aria-labelledby`.
- **Başlık yapısı:** Tek `h1` ("Ayarlar"); her bölge kendi `h2`'si ("Profil", "Bildirimler", "Tehlikeli eylemler").
- **ARIA:** Sekmeler gerçek sekme kalıbında (`role="tablist"`/`tab`/`tabpanel`, `aria-selected`, ok tuşları) ya da bağlantı listesi; yerel öğe önce. Bildirim anahtarları yerel `input[type=checkbox]` + görünür etiket. Diyalog `role="dialog"` + `aria-modal` (SC 4.1.2).
- **Odak yönetimi:** Diyalogda odak döngüsü ve `Esc` ile kapanış; kapanışta odak tetikleyiciye döner (SC 2.1.2).
- **Canlı bölge:** Kaydetme onayı `role="status"`; silme hatası `role="alert"` (SC 4.1.3).
- **Kontrast ve durum:** Tehlikeli bölge başlığı ve düğme `--color-danger` + ikon + metin; yalnız renkle ayrım yok (SC 1.4.1).
- **Dokunma hedefi:** Anahtar, sekme ve düğmeler ≥ 44 × 44 px; komşu hedefler arası ≥ 8 px.
- **Klavye:** Tüm ayarlar klavyeyle değiştirilebilir; anahtar `Space` ile çalışır (yerel öğe).

## 6. Sık yapılan hatalar

1. **Tehlikeli eylemin normal kaydet düğmesiyle aynı görsel ağırlıkta olması** → Kullanıcı yanlışlıkla hesabını siler → Ayrı bölge, `--color-danger`, farklı stil ve adlandırılmış onay (H4, H5).
2. **Onay diyaloğunda "Evet / Tamam" düğmesi** → Kullanıcı neyi onayladığını kestiremez → "Hesabı sil" eylemi adlandırır; ikincil düğme "Vazgeç" (H2, WCAG 3.3.4).
3. **Değişikliklerin sürpriz biçimde otomatik kaydolması (kaydet düğmesi varken)** → Kullanıcı kaydedip kaydetmediğinden emin olamaz → Profil formunda açık kaydet düğmesi; anahtarlarda anında kaydet + onay.
4. **Bildirim anahtarının yalnız renkle "açık/kapalı" görünmesi** → Renk körü kullanıcı durumu göremez → Anahtar konumu + metin etiket + `checked` durumu (SC 1.4.1).
5. **Devre dışı alanın nedenini söylememesi** → Kullanıcı neden değiştiremediğini anlamaz, destek yükü artar → Devre dışı nedeni alanın yanında metinle (H9).
6. **Hesap silmede kullanıcıdan çok uzun/gizli bir onay metni istenmesi** → Bitmek bilmeyen akış, terk → Kısa ve net "hesabımı sil" yazımı yeterli; kaybedilecek şeyler açıkça listelenir.
7. **Kaydedilmemiş değişiklik uyarısının yokluğu** → Kullanıcı sekme değiştirince emeği kaybolur → `beforeunload` ve sekme değişiminde uyarı (H3).
8. **Sekme kalıbında ok tuşlarının çalışmaması** → Klavye kullanıcısı sekmeler arası geçemez → Gerçek sekme kalıbı ya da bağlantı listesi kullan (SC 2.1.1).
9. **Başarı bildiriminin yalnız görsel olması** → Ekran okuyucu kaydı duymaz → `role="status"` canlı bölge (SC 4.1.3).

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Kaydet düğmesi | Değişiklikleri kaydet | Save changes |
| Tehlikeli düğme | Hesabı sil | Delete account |
| Onay diyaloğu ikincil düğme | Vazgeç | Cancel |
| Sekme etiketi | Bildirimler | Notifications |
| Alan etiketi (dil) | Dil | Language |
| Yardımcı metin (kilit) | E-posta değişikliği destek ekibiyle yapılır. | Email changes are handled by support. |
| Hata (kaydetme) | Değişiklikler kaydedilemedi. Bağlantınızı kontrol edip yeniden deneyin. | Changes could not be saved. Check your connection and try again. |
| Başarı | Değişiklikler kaydedildi. | Changes saved. |
| Bildirim anahtarı etiketi | E-posta bildirimleri | Email notifications |
| Geri al toast'u | Bildirim tercihi güncellendi. [Geri al] | Preference updated. [Undo] |
| Tehlikeli bölge açıklaması | Hesap silme geri alınamaz. Tüm verileriniz kalıcı olarak silinir. | Deleting your account is permanent. All your data is erased. |
| Yükleniyor | Kaydediliyor… | Saving… |

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] **E20:** Yardım/iletişim mekanizması (destek bağlantısı, SSS) bu ekran ile diğer sayfalarda aynı göreli sırada duruyor (SC 3.2.6).
- [ ] **E20:** Yardım bağlantısı ekran genişliğine göre yeniden sıralanırken göreli konumunu koruyor (mobilde de aynı bölgede).
- [ ] Tehlikeli eylemler ayrı bölgede, farklı görsel ağırlıkta ve adlandırılmış onayla korunuyor.
- [ ] Hesap silme onayında düğme "Hesabı sil" diyor ve kaybedilecek veriler listeleniyor.
- [ ] Bildirim anahtarları anında kaydediliyor ve 5-10 s "Geri al" toast'ı sunuyor.
- [ ] Profil formunda kaydedilmemiş değişiklik varken çıkış uyarısı gösteriliyor.
- [ ] Diyalog `Esc` ile kapanıyor, odak tetikleyiciye dönüyor ve odak diyalog içinde döngüde kalıyor.
- [ ] Başarı bildirimi `role="status"`, kritik hata `role="alert"` canlı bölgesiyle duyuruluyor.
- [ ] Devre dışı alanlar nedenini metinle belirtiyor; tüm ayarlar yalnız klavyeyle değiştirilebiliyor.
