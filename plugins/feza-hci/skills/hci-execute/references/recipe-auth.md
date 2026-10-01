# Tarif: Kimlik Doğrulama (giriş / kayıt / şifre sıfırlama / 2FA)

> Kalıp kimliği: `recipe-auth` · İlgili ilkeler: Nielsen H1, H2, H5, H9; WCAG 2.1 SC 1.3.1, 1.4.1, 2.4.3, 3.3.1, 3.3.3, 4.1.3; WCAG 2.2 SC 3.3.7, 3.3.8; ISO 9241-110 (hata toleransı, kontrol edilebilirlik, göreve uygunluk)

## 1. Amaç ve ne zaman kullanılır

Kullanıcının kimliğini doğrulayan dört alt akışı tek tarifte toplar: giriş, kayıt, şifre sıfırlama ve iki adımlı doğrulama (2FA). Bu ekranlar oturumun kapısıdır; amaç kullanıcıyı en az sürtünmeyle içeri almak ve başarısızlıkta nedenini açıkça söyleyip kurtarma yolu sunmaktır (Nielsen H9).

- **Giriş:** Kimlik bilgisi zaten var; hızlı doğrulama.
- **Kayıt:** Yeni hesap; alan sayısı en aza indirilir, gereksiz bilgi sonraya bırakılır.
- **Şifre sıfırlama:** Kurtarma akışı; e-posta/telefon kanalıyla tek kullanımlık bağlantı.
- **2FA:** İkinci etken doğrulama; kod girişi ve "kod gelmedi" kurtarması.

Kullanma koşulu: akış güvenli bir bağlamda (HTTPS) çalışır ve gerçek kullanıcı doğrulaması sağlanır. Bu tarif, kimlik doğrulama **arayüzünü** tanımlar; sunucu tarafı güvenlik yapılandırmasını kapsamaz.

Alt akış seçimi: tek tarayıcı akışında adımlar arası geçişte alan değerleri korunur, tam sayfa yeniden yükleme yapılmaz.

## 2. ASCII yerleşim

### Mobil (360 px)

Giriş:
```text
+------------------------------------+
| [Logo]                             |
|                                    |
| Hoş geldiniz                       |
| E-posta                            |
| [..............................]   |
| Şifre                              |
| [..............................]   |
| [Giriş yap]                        |
| Şifrenizi mi unuttunuz?            |
| Hesabınız yok mu? [Kayıt olun]     |
+------------------------------------+
```

Kayıt:
```text
+------------------------------------+
| <- Geri            Adım 1 / 1       |
| Hesap oluştur                       |
| Ad Soyad                           |
| [..............................]    |
| E-posta                            |
| [..............................]    |
| Şifre                              |
| [..............................]    |
|  En az 10 karakter                  |
| [Hesap oluştur]                     |
| Zaten hesabınız var mı? [Giriş]     |
+------------------------------------+
```

Şifre sıfırlama:
```text
+------------------------------------+
| <- Giriş'e dön                       |
| Şifrenizi sıfırlayın                 |
| Kayıtlı e-postanızı girin; bir      |
| sıfırlama bağlantısı gönderelim.     |
| E-posta                             |
| [..............................]     |
| [Sıfırlama bağlantısı gönder]        |
+------------------------------------+
```

2FA:
```text
+------------------------------------+
| Kimlik doğrulama kodu                |
| Kodu 6 haneli olarak girin.          |
| [ _ _ _ _ _ _ ]                      |
| Kod gelmedi mi? [Yeniden gönder]     |
| [Doğrula]                            |
+------------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+----------------------------------------------------------------------+
| [Logo]                                                               |
|                         +--------------------------+                 |
|                         | Hoş geldiniz             |                 |
|                         | E-posta                  |                 |
|                         | [......................] |                 |
|                         | Şifre                    |                 |
|                         | [......................] |                 |
|                         | [Giriş yap]              |                 |
|                         | Şifrenizi mi unuttunuz?  |                 |
|                         +--------------------------+                 |
|                         Hesabınız yok mu? [Kayıt olun]               |
+----------------------------------------------------------------------+
```

Masaüstünde form en fazla 400-440 px genişlikte ortalanır; satır uzunluğu 45-75 karakteri aşmaz. 2FA kodu ilk yüklemede odaklanan tek alan olur.

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | Alanlar görünür etiketli, birincil eylem tek, yardımcı metin ipucu | Yer tutucu etiket yerine geçmez; `autocomplete` doğru değerlerle |
| Yükleniyor | Düğme meşgul durumda ("Giriş yapılıyor…"), spinner, alanlar salt okunur | Çift gönderim engellenir; ≤ 100 ms görsel tepki (H1) |
| Boş | Uygulanmaz — formda liste verisi yoktur; "hesap yok" durumu "Kayıt olun" bağlantısıyla karşılanır | Boş liste durumu bu ekranda oluşmaz |
| Hata | Alan yanında mesaj + gönderimde üstte özet; özetten alana bağlantı | Mesaj: ne oldu + neden + nasıl düzeltilir (SC 3.3.1, 3.3.3) |
| Başarı | Kayıt/sıfırlama sonrası yönlendirme + `role="status"` bildirimi | "Sıfırlama bağlantısı gönderildi" nötr metin; hesabın var olup olmadığını ifşa etmez |
| Devre dışı | Düğme `disabled` + neden ipucu (ör. zorunlu alanlar boş) | Devre dışı stil okunabilir kalır; neden metinle belirtilir |

## 4. Etkileşim kuralları

- **Doğrulama zamanlaması:** Alan bazlı doğrulama alandan çıkınca (blur) ve gönderimde; yazarken agresif hata gösterilmez. Şifre sıfırlama e-postasında biçim kontrolü gönderimde.
- **Hata sonrası veri korunur:** E-posta alanı hata sonrası temizlenmez; yalnız şifre alanı boşaltılır ve odağa alınır.
- **Şifre görünürlüğü:** "Şifreyi göster" düğmesi metinle sunulur, `aria-pressed` ile durumu bildirir; varsayılan gizli.
- **Geri al / geri dön:** Kayıt ve sıfırlama akışında "Geri" her adımda erişilebilir; girilen değerler akış içinde korunur (H3).
- **Odak taşıma:** Alt akış geçişinde odak yeni `h1`'e taşınır; hata özeti üretilirse odak özete ya da ilk hatalı alana gider.
- **Onay gerektiren eylem:** Yoktur; ancak çıkışta kaydedilmemiş form doldurulmuşsa tarayıcı `beforeunload` uyarısı verilir.
- **2FA kurtarma:** "Yeniden gönder" bağlantısı geri sayımla (ör. 30 s) sınırlanır; geri sayım metinle bildirilir, yalnız renkle değil.
- **Oturum süresi dolması:** Kullanıcı girişe yönlendirilirken "Oturumunuz sona erdi, yeniden giriş yapın" mesajı gösterilir; hedef adres korunur.

## 5. Erişilebilirlik notları

- **Landmark'lar:** Tek `main` form bölgesini sarar; logo ve gezinme `header` içinde. Kayıt/2FA alt akış ısrarla tek `main` kullanır.
- **Başlık yapısı:** Ekran başına tek `h1` ("Hoş geldiniz", "Hesap oluştur", "Kimlik doğrulama kodu"); başlık atlanmaz (SC 1.3.1).
- **ARIA:** Yerel öğe önce — `<form>`, `<label>`, `<input>`, `<button>` kullanılır. Canlı bölge yalnız durum bildirimi için (`role="status"` / `role="alert"`); gereksiz `aria-label` eklenmez (SC 4.1.2).
- **Odak yönetimi:** Alt akış geçişinde yeni başlığa odak taşınır; hata özeti bağlantıları gerçek sekme sırasına katılır (`tabindex` > 0 yok) (SC 2.4.3).
- **Canlı bölge:** Sıfırlama gönderim onayı `role="status"` (kibar); kimlik doğrulama hatası `role="alert"` (acil) (SC 4.1.3).
- **Kontrast ve durum:** Hata alanı kırmızı kenar + ikon + metin ("Hata: ...") ile belirtilir; yalnız renk yeterli değildir (SC 1.4.1).
- **Giriş amacı:** `autocomplete="email"`, `"current-password"`, `"new-password"`, `"one-time-code"` kullanılır (SC 1.3.5).
- **Kimlik doğrulama (SC 3.3.8):** Şifre yapıştırma ve parola yöneticisi engellenmez; şifre alanı `autocomplete="current-password"`, 2FA kodu `autocomplete="one-time-code"` taşır (Accessible Authentication (Minimum)).
- **Dokunma hedefi:** Düğmeler ve bağlantılar ≥ 44 × 44 px (hedef).

## 6. Sık yapılan hatalar

1. **Belirsiz düğme etiketi ("Tamam" / "Gönder")** → Kullanıcı ne olacağını kestiremez, hata riski artar → "Giriş yap", "Hesap oluştur", "Sıfırlama bağlantısı gönder", "Doğrula" gibi fiil + nesne kullan.
2. **Güvenlik gerekçesiyle belirsiz hata ("Kullanıcı adı veya şifre hatalı" yerine ayrım yok)** → Hangisinin yanlış olduğu bilinmediğinden düzeltme yolu kapalı görünür → Güvenlik gereği belirsizlik korunacaksa "E-posta veya şifre eşleşmiyor. Şifrenizi mi unuttunuz?" ile kurtarma yolu sunulur ve mesaj suçlayıcı olmaz (H9).
3. **Şifre alanına yapıştırmanın engellenmesi** → Parola yöneticisi kullanımını kırar, erişilebilirliği düşürür → `paste` engellenmez; "Şifreyi göster" erişilebilir kalır.
4. **Yer tutucunun etiket yerine kullanılması** → Alan doldurulunca etiket kaybolur, tanıma zorlaşır → Görünür `<label>` her zaman kalır (SC 3.3.2, H6).
5. **Doğrulamanın her tuş vuruşunda çalışması** → Kullanıcı daha yazarken suçlanmış hisseder → Doğrulama blur ve gönderimde; yalnız geçerlilik göstergesi sessizce değişir.
6. **Hata sonrası formun temizlenmesi** → Kullanıcı e-postayı yeniden yazar, terk oranı artar → Değerler korunur, yalnız hatalı alan odağa alınır (H3, H9).
7. **2FA kod alanına 6 ayrı kutunun etiketsiz olması** → Ekran okuyucu her kutuyu bağlamsız okur → Tek `input` + `inputmode="numeric"` + `autocomplete="one-time-code"` tercih edilir; çok kutu kullanılırsa grup `fieldset`/`legend` ile etiketlenir (SC 1.3.1).
8. **Sıfırlama sonucu hesabın varlığını ifşa etmesi ("Bu e-posta kayıtlı değil")** → Hesap numaralandırma saldırısına ve gereksiz bilgi sızmasına yol açar → Her durumda aynı nötr onay gösterilir.

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Giriş düğmesi | Giriş yap | Sign in |
| Kayıt düğmesi | Hesap oluştur | Create account |
| Şifre sıfırlama düğmesi | Sıfırlama bağlantısı gönder | Send reset link |
| 2FA doğrulama düğmesi | Doğrula | Verify code |
| Alan etiketi (e-posta) | E-posta | Email |
| Yardımcı metin (şifre kuralı) | En az 10 karakter kullanın. | Use at least 10 characters. |
| Biçim hatası | E-posta adresinde @ işareti eksik. Örnek: ad@alanadi.com | The email address is missing @. Example: name@domain.com |
| Kimlik hatası | E-posta veya şifre eşleşmiyor. Şifrenizi mi unuttunuz? | Email or password does not match. Forgot your password? |
| Yükleniyor | Giriş yapılıyor… | Signing in… |
| Başarı (sıfırlama) | Kayıtlıysa sıfırlama bağlantısını gönderdik. Gelen kutunuzu kontrol edin. | If the address exists, we sent a reset link. Check your inbox. |
| Boş durum (hesap yok) | Hesabınız yok mu? Kayıt olun | No account yet? Create one |
| 2FA kurtarma | Kod gelmedi mi? Yeniden gönder (30 s) | Didn't get a code? Resend (30 s) |

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] Alt akışların her birinde ekran başına tek `h1` var ve başlık sırası atlanmıyor.
- [ ] Şifre alanı hariç tüm alanlar hata sonrası değerini koruyor; şifre alanı boşaltılıp odağa alınıyor.
- [ ] E-posta ve şifre alanlarında uygun `autocomplete` değeri tanımlı (`email`, `current-password`, `new-password`, `one-time-code`).
- [ ] Sıfırlama gönderimi hesabın var olup olmadığını ifşa etmiyor; onay metni her durumda aynı.
- [ ] Form yalnız klavyeyle uçtan uca tamamlanabiliyor; odak görünür ve mantıklı sırada (SC 2.1.1, 2.4.7).
- [ ] Gönderim sırasında düğme meşgul durumda ve çift gönderim engelli; ≤ 100 ms görsel tepki var.
- [ ] 2FA yeniden gönder bağlantısı geri sayımla sınırlı ve geri sayım metinle bildiriliyor.
