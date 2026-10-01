# Tarif: Form (veri girişi)

> Kalıp kimliği: `recipe-form` · İlgili ilkeler: Nielsen H5, H6, H9 · WCAG SC 1.3.1, 1.3.5, 3.3.1, 3.3.2, 3.3.3, 3.3.4 · ISO 9241-110 hata sağlamlığı

## 1. Amaç ve ne zaman kullanılır

Kullanıcının veri girdiği ya da düzenlediği her ekran: kayıt oluşturma, profil düzenleme, ayar formu, iletişim. Amaç hatasız ve tek seferde tamamlanan giriş (H5 hata önleme).

Kullan:
- Kullanıcı kalıcı bir varlık yaratacak ya da var olanı değiştirecekse.
- Alan sayısı tek ekrana sığıyorsa (≤ 7 alan).

Kullanma:
- Alan sayısı 7'yi aşıyorsa → mantıksal adımlara böl (sihirbaz; Miller) ve son adımda özet göster.
- Tek bir evet/hayır alanı varsa → satır içi onay ya da tek düğme yeterli.

## 2. ASCII yerleşim

### Mobil (360 px)

```text
+--------------------------------+
| < Geri   Yeni kayıt            |
| * zorunlu alan                 |
|                                |
| Ad Soyad *                     |
| [............................] |
|                                |
| E-posta *                      |
| [............................] |
| ornek@alanadi.com              |
| ! E-posta "@" içermeli.        |
|                                |
| > Diğer seçenekler             |
|                                |
| [Vazgeç]          [Kaydet]     |
+--------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+----------------------------------------------------------------------+
| < Geri   Yeni kayıt                                                  |
+----------------------------------------------------------------------+
| * zorunlu alan                                                       |
|                                                                      |
| Ad Soyad *                        E-posta *                          |
| [............................]    [............................]     |
|                                   ornek@alanadi.com                  |
|                                   ! E-posta "@" içermeli.            |
|                                                                      |
| > Diğer seçenekler                                                   |
|                                                                      |
|                                      [Vazgeç]          [Kaydet]      |
+----------------------------------------------------------------------+
```

Masaüstünde ilgisiz alanlar yine tek sütunda ya da en fazla iki dar sütunda gruplanır; sütun düzeni okuma sırasını bozmaz (SC 1.3.2, 2.4.3). Birincil eylem sağ altta, kolay erişimde (Fitts).

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | Görünür etiketler, zorunlu işareti, ipuçları, [Kaydet]/[Vazgeç] | Yer tutucu etiket yerine geçmez; etiket alan üstünde kalıcı |
| Yükleniyor | Var olan veri çekiliyorsa iskelet alanlar; gönderimde [Kaydet] meşgul: spinner + "Kaydediliyor…" | Çift gönderim engelli; `aria-busy="true"` |
| Boş | Düzenleme formunda alanlar boşsa yer tutucu örnek değer; yeni kayıtta alanlar boş | Boş zorunlu alan gönderimde hata verir; hata metni altta |
| Hata | Alan altında ikon + metin (ne + nasıl düzeltilir) + gönderimde üstte özet, özete bağlantı | `aria-invalid="true"`, `aria-describedby`; odak ilk hatalı alana |
| Başarı | Düğme kısa onay durumu + toast: "Kayıt kaydedildi" ve yönlendirme | `role="status"`; liste yeni kayıtla güncellenir |
| Devre dışı | Koşullu alanlar (ör. "Diğer" seçili değilken alt alanı) `disabled` + neden ipucu | Devre dışı alan `aria-disabled` ile bildirilir; `disabled` alan klavyeden atlanır |

## 4. Etkileşim kuralları

- **Doğrulama zamanlaması:** alandan çıkınca (blur) ve gönderimde. Yazarken agresif hata gösterilmez; kullanıcı suçlanmaz (H5, H9).
- **Hata gösterimi:** alan yanında (ikon + metin); gönderimde sayfa üstünde özet ve özetten ilgili alana bağlantı; odak özete ya da ilk hatalı alana (SC 3.3.1, 3.3.3).
- **Veri korunur:** hata sonrası girilen veri silinmez; yalnız işaretleme değişir.
- **Kaydetme:** gönderimde düğme meşgul duruma geçer, çift gönderim engellenir; sonuç toast ile bildirilir (H1).
- **Vazgeç:** ikincil stil, birincil eylemden ayrışık konumda; kaydedilmemiş değişiklik varsa çıkışta onay istenir (H3).
- **Onay gerektiren eylem:** form yıkıcı bir değişiklik yapacaksa (ör. "Tüm kayıtları sil") ek onay; onay düğmesi eylemi adlandırır ("Kayıtları sil", "Evet" değil).
- **Odak taşıma:** sayfa açılışında odak ilk alana; hata sonrası ilk hatalı alana; başarıda odak toast/başlığa taşınmaz, yönlendirme yapılır.
- **Giriş yardımları:** uygun `type`, `inputmode`, `autocomplete`; biçim örneği ipuçunda (SC 1.3.5, H5).
- **Kısıt ipucu:** kural varsa (ör. "En az 8 karakter") alan altında önceden yazılır.
- **Klavye:** `Enter` formu gönderir; `Tab` sırası görsel sırayla aynı; pozitif `tabindex` yok.

## 5. Erişilebilirlik notları

- **Landmark:** form `<form>` içinde, `main` içinde; başlık `h1`, bölüm başlıkları `h2`.
- **Etiket:** her alanın görünür `<label for>`; `placeholder` etiket yerine geçmez (SC 1.3.1, 3.3.2). Yardım ve hata metni `aria-describedby` ile bağlanır.
- **ARIA:** yerel öğe önce — `input`, `select`, `fieldset`/`legend`; özel bileşende rol ve durum (`aria-invalid`, `aria-expanded`) (SC 4.1.2).
- **Odak yönetimi:** odak görünür (`:focus-visible`, ≥ 3:1 halka); hata sonrası odak ilk hatalı alana taşınır (SC 2.4.7, 1.4.11, 2.4.3).
- **Canlı bölge:** satır içi doğrulama mesajı form içinde metin olarak; dinamik hata özeti `role="alert"`, başarı `role="status"` (SC 4.1.3).
- **Hedef boyut:** alan yüksekliği ≥ 44 px, komşu hedefler arası ≥ 8 px (SC 2.5.5 hedef).
- **Yazı boyutu:** alan gövdesi ≥ 16 px (mobil tarayıcıda giriş alanına odaklanınca otomatik yakınlaştırmayı önler (platform davranışı)).
- **Grup:** ilgili alanlar `<fieldset>` + `<legend>` ile gruplanır; zorunlu grup grup düzeyinde belirtilir.
- **Renk:** hata yalnız renkle değil, ikon + metinle de gösterilir (SC 1.4.1).

## 6. Sık yapılan hatalar

1. **Yer tutucuyu etiket yerine kullanmak.** Neden zararlı: kullanıcı yazmaya başlayınca etiket kaybolur, alanın ne olduğu unutulur; WCAG 3.3.2 ve H6 ihlali. Doğrusu: alan üstünde kalıcı `<label>`, yer tutucu yalnız örnek için.
2. **Yazarken anında hata göstermek.** Neden zararlı: kullanıcı daha yazarken kırmızı uyarı alır, suçlanmış hisseder (H9, ISO hata sağlamlığı). Doğrusu: blur ve gönderimde doğrula.
3. **Belirsiz düğme etiketi ("Gönder", "Tamam").** Neden zararlı: eylemin sonucu belirsiz, H2 tanıdıklık zayıf. Doğrusu: "Kaydet", "Siparişi tamamla".
4. **Hata özeti olmadan yalnız alan altı mesaj.** Neden zararlı: uzun formda hatalı alanlar gözden kaçar, ekran okuyucu kullanıcısı hepsini gezmek zorunda kalır (SC 3.3.1). Doğrusu: üstte özet + bağlantılar.
5. **Hata sonrası girilen veriyi temizlemek.** Neden zararlı: kullanıcı tekrar doldurmak zorunda, H3/veri korunur ilkesi ihlali. Doğrusu: veriyi koru, yalnız hatayı işaretle.
6. **Çift gönderimi engellememek.** Neden zararlı: mükerrer kayıt, ödeme formunda çift çekim (SC 3.3.4). Doğrusu: düğmeyi meşgul duruma al, çift tıklamayı engelle.
7. **Zorunlu alanı yalnız kırmızı yıldızla ve renkle belirtmek.** Neden zararlı: renk körü kullanıcı göremez (SC 1.4.1). Doğrusu: "*" + "* zorunlu alan" açıklaması ve metin.

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Başlık | Yeni kayıt | New record |
| Birincil düğme | Kaydet | Save |
| İkincil düğme | Vazgeç | Cancel |
| Alan etiketi | E-posta | Email |
| Zorunlu açıklama | * zorunlu alan | * required field |
| Yardımcı metin | Örnek: ornek@alanadi.com | Example: ornek@alanadi.com |
| Kısıt ipucu | Şifre en az 8 karakter içermeli. | Password must be at least 8 characters. |
| Hata metni | E-posta adresinde "@" işareti eksik. Örnek: ornek@alanadi.com | Your email is missing an "@" sign. Example: ornek@alanadi.com |
| Zorunlu alan hatası | Ad Soyad alanı boş. Lütfen adınızı ve soyadınızı girin. | Name is empty. Enter your first and last name. |
| Başarı bildirimi | Kayıt kaydedildi. | Record saved. |
| Yükleniyor durumu | Kaydediliyor… | Saving… |
| Kaydedilmemiş değişiklik onayı | Kaydedilmemiş değişiklikleriniz var. Sayfadan ayrılırsanız kaybolur. | You have unsaved changes. They will be lost if you leave this page. |
| Onay düğmesi (yıkıcı) | Kayıtları sil | Delete records |

Tarih/para: TR `1 Ekim 2026`, `1.250,00 TL`; EN `Oct 1, 2026`, `$1,250.00`.

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] Her alanda görünür `<label>` var; yer tutucu etiket yerine geçmiyor (SC 3.3.2).
- [ ] Doğrulama yalnız blur ve gönderimde tetikleniyor; yazarken agresif hata yok.
- [ ] Gönderimde üstte hata özeti ve özetten hatalı alana bağlantı var; odak ilk hatalı alana taşınıyor.
- [ ] Hata sonrası girilen veri korunuyor; alanlar temizlenmiyor.
- [ ] Gönderimde düğme meşgul durumda ve çift tıklama engelli; sonuç toast ile bildiriliyor.
- [ ] Ekranında tek birincil eylem var; düğme etiketleri eylem fiili + nesne.
- [ ] Tüm alanlar klavyeyle doldurulup gönderilebiliyor; odak görünür ve sıralı.
- [ ] Zorunlu alanlar renk dışında metin/işaretle belirtiliyor (SC 1.4.1).
