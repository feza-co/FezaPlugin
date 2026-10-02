<!-- generated from plugins/feza-hci/skills/hci-execute/references/ux-writing.md — do not edit -->
# UX Yazım Rehberi (Mikro Metin)

Arayüzde kullanıcının okuduğu her kelime: buton etiketi, form etiketi, hata mesajı, boş durum
metni, bildirim, izin isteği. İyi mikro metin göze çarpmaz ama kullanıcıyı doğru eyleme taşır;
kötü mikro metin görev tamamlanmasını sessizce düşürür.

Mini sözlük: **mikro metin** = tek bir görevi destekleyen kısa arayüz metni; **terim sözlüğü** =
üründe bir kavram için kilitlenmiş tek sözcük; **yerel ayar (locale)** = sayı, tarih ve para
biçiminin dile göre kuralları.

## 1. Amaç ve Kullanım

Bu dosya, mikro metnin üretildiği ve denetlendiği üç yere kaynaklık eder:

| Kullanan yer | Ne zaman | Bu dosyadan ne alır |
|--------------|----------|---------------------|
| `hci-execute` **Adım 5** (Uygulama) | Ekranlar koda yazılırken tüm metin üretilir | İlkeler (§2), Kalıplar (§3), Ton (§4) |
| `hci-execute` **Adım 6** (Gizli doğrulama) | Kod yazıldıktan sonra metin denetlenir | Mikro-metin kontrol listesi (§6) |
| `heuristic-eval` (**H2**, **H9**) | Bulgu listesi yazılırken | Kontrol listesi (§6), terim sözlüğü (§2.4) |
| `hci-review` (mikro-metin bulguları) | Tasarım incelemesi | Yasaklar tablosu (§5) |

Kullanım sırası: üretirken §2 ve §3 uygula, §4 ile tonu sabitle; teslim öncesi §6'yı madde madde
işaretle; itiraz edilebilir her karar (ör. bir düğme etiketi) bir ilkeye bağlanır.

Bu dosya **bağımsız bir skill değildir**; `hci-execute` ve değerlendirme skill'lerinin ortak
referansıdır. Çıktı dili Türkçe; örnekler TR + EN verilir.

## 2. İlkeler

### 2.1 Eylem odaklı fiil

Buton kullanıcının **ne yapacağını**, sonucu değil eylemi söyler. Belirsiz "Tamam", "Gönder",
"Evet", "Devam et" tek başına kullanılmaz; bağlamdan ne olacağı anlaşılmayan etiket, kullanıcıyı
okumaya ve tahmine zorlar (Nielsen H2, H6).

| Bağlam | Zayıf | Güçlü (TR) | Güçlü (EN) |
|--------|-------|------------|------------|
| Kaydetme | "Tamam" | "Değişiklikleri kaydet" | "Save changes" |
| Silme onayı | "Evet" | "Projeyi sil" | "Delete project" |
| İletişim formu | "Gönder" | "Mesajı gönder" | "Send message" |
| Üyelikten çıkma | "Onayla" | "Aboneliği iptal et" | "Cancel subscription" |

İstisna: etiketin zaten eylemi söylediği kısa bağlamlar ("Kaydet", "Sil") kabul edilir; sorun
anlamın düğmeden değil, bağlamdan çıkarılması gerektiğinde ortaya çıkar.

### 2.2 Kullanıcıyı suçlamayan hata dili

Hata, sistemin kullanıcıya verdiği bilgidir; kullanıcının kusurunu ilan etmez. "Yanlış şifre
girdiniz", "Hatalı işlem yaptınız", "Geçersiz giriş" suçlayıcıdır. Bunun yerine durum nötr
anlatılır ve çıkış yolu verilir (Nielsen H9; ISO 9241-110 hata toleransı).

| Suçlayıcı (TR) | Nötr (TR) | Nötr (EN) |
|----------------|-----------|-----------|
| "Yanlış şifre girdiniz." | "Şifre eşleşmedi. Yeniden deneyin ya da şifrenizi sıfırlayın." | "Password didn't match. Try again or reset it." |
| "Hatalı e-posta formatı." | "E-posta adresi '@' ve alan adı içermeli (ör. ad@site.com)." | "Email needs an '@' and a domain (e.g. name@site.com)." |

### 2.3 Ne oldu + neden + nasıl düzeltilir

Her hata ve engel mesajı üç parça taşır: **ne oldu** (gözlem), **neden** (biliniyorsa), **nasıl
düzeltilir** (somut adım). Üçüncü parça atlanırsa mesaj kullanıcıyı çıkmaz sokakta bırakır
(Nielsen H9; WCAG 3.3.1, 3.3.3).

| Yetersiz | Tam mesaj (TR) |
|----------|----------------|
| "Yükleme başarısız." | "Dosya yüklenemedi. Boyut 10 MB sınırını aşıyor. Daha küçük bir dosya seçin ya da sıkıştırın." |

İngilizce karşılığı: "Upload failed. The file exceeds the 10 MB limit. Choose a smaller file or
compress it."

### 2.4 Tutarlı terim sözlüğü

Bir kavram üründe **tek** sözcükle anılır; eş anlamlılar (görev/iş/madde, proje/çalışma/klasör)
kullanıcıdan iki kavramı ayırmasını ister ve bilişsel yükü artırır (Nielsen H4; Dix: consistency).
Terim sözlüğü teslim dosyasına eklenir ve tüm ekranlar ona uyar.

| Kavram | Tek terim (TR) | Tek terim (EN) | Kullanma |
|--------|----------------|----------------|----------|
| Yapılacak iş | "görev" | "task" | iş, madde, todo |
| Üst kap | "proje" | "project" | çalışma, klasör |
| Kayıt silme | "sil" | "delete" | kaldır, yok et |
| Ara verme | "duraklat" | "pause" | beklet, askıya al |

### 2.5 Kısa ve taranabilir metin

Önce anahtar bilgi, sonra ayrıntı. Cümleler kısa, paragraflar 1-3 cümle; gövde satır uzunluğu
45-75 karakter. Kullanıcı ekranı tarar, okumaz (Nielsen H8; Dix: observability — mesaj kısa
olduğunda sistem durumu daha hızlı algılanır).

| Uzun ve gömülü | Kısa ve taranabilir (TR) |
|----------------|--------------------------|
| "Tarafımızdan yapılan güncelleme neticesinde aşağıda listelenen öğeleriniz sistem tarafından başarıyla kaydedilmiş bulunmaktadır." | "3 görev kaydedildi." |

İngilizce: "3 tasks saved."

### 2.6 Sayı, tarih ve para biçimleri

Biçim **yerel ayara** göre verilir; sabit kodlanmış biçim kullanılmaz. `Intl.NumberFormat` ve
`Intl.DateTimeFormat` ile tarayıcının/kullanıcının yereline bırakılır (ISO 9241-110 öz-betimleyicilik:
sistem, kullanıcının beklediği biçimde konuşur).

| Tür | TR | EN (en-US) | JS |
|-----|----|------------|-----|
| Tarih | `1 Ekim 2026` | `Oct 1, 2026` | `Intl.DateTimeFormat(locale, {day:"numeric", month:"long", year:"numeric"})` |
| Saat | `14:30` | `2:30 PM` | `Intl.DateTimeFormat(locale, {hour:"2-digit", minute:"2-digit"})` |
| Para | `1.250,00 TL` | `$1,250.00` | `Intl.NumberFormat(locale, {style:"currency", currency:"TRY"})` |
| Yüzde | `%15` | `15%` | `Intl.NumberFormat(locale, {style:"percent"})` |
| Büyük sayı | `12.500` | `12,500` | `Intl.NumberFormat(locale)` |

Kısa örnek:

```js
const nf = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" });
nf.format(1250); // "₺1.250,00" (tarayıcı sürümüne göre "1.250,00 ₺" da olabilir)
```

Not: Bazı tarayıcılar TL simgesini konumlandırmada farklılık gösterir; biçimi elle kurma, araca
bırak ve ekranda gözle doğrula.

## 3. Kalıplar

Her kalıp: kural + TR/EN örnek. Ton ve biçim kuralları §4 ve §2.6 ile birlikte uygulanır.

### 3.1 Buton

Kural: Etiket bir eylem fiiliyle başlar; kısa (1-3 sözcük); aynı eylem her yerde aynı etiket.
Yıkıcı eylem etiketi sonucu söyler, "Evet" demez.

| Örnek | TR | EN |
|-------|----|----|
| Kaydet | "Kaydet" | "Save" |
| Yıkıcı | "Hesabı sil" | "Delete account" |
| Geri dön | "Vazgeç" | "Cancel" |

### 3.2 Form etiketi ve yardımcı metin

Kural: Etiket her zaman görünür ve alanın üstünde; yer tutucu (placeholder) etiket yerine
**kullanılmaz**. Yardımcı metin ne beklendiğini ve biçimi söyler (WCAG 3.3.2, 1.3.1; Nielsen H6).

| Öğe | TR | EN |
|-----|----|----|
| Etiket | "E-posta adresi" | "Email address" |
| Yardım (biçim) | "Kurumsal adresinizi kullanın (ad@sirket.com)" | "Use your work address (name@company.com)" |
| İsteğe bağlı alan | "Telefon (isteğe bağlı)" | "Phone (optional)" |

### 3.3 Satır içi doğrulama

Kural: Doğrulama, **alan terk edildiğinde (blur)** ya da **gönderimde** yapılır; kullanıcı hâlâ
yazarken değil. Yazarken tetiklenen hata kullanıcıyı ortada keser ve henüz bitmemiş girdiyi
"yanlış" ilan eder (Nielsen H5, H9).

| Zamanlama | TR | EN |
|-----------|----|----|
| Alan terk edilince | "Bu alan zorunlu." | "This field is required." |
| Gönderimde özet | "2 alan düzeltilmeli. İlk hataya git." | "2 fields need fixing. Go to the first error." |

### 3.4 Hata sayfaları (404, 500, çevrimdışı)

Kural: Bir cümlede durum, sonra çıkış yolu; kullanıcı verisinin korunduğu belirtilir. Teknik kod
ikincil olarak (destek için) verilir, başlık yapılmaz (Nielsen H9, H2; Dix: recoverability).

| Durum | TR | EN |
|-------|----|----|
| 404 | "Aradığınız sayfa bulunamadı. Adres değişmiş olabilir. Ana sayfaya dönün ya da arayın." | "We couldn't find that page. The link may have changed. Go home or search." |
| 500 | "Bir şeyler ters gitti ve sayfa yüklenemedi. Birkaç dakika sonra tekrar deneyin. Sorun sürerse destek hattına yazın." | "Something went wrong and the page didn't load. Try again in a few minutes. If it persists, contact support." |
| Çevrimdışı | "Bağlantı yok. İnternet bağlantınızı kontrol edip tekrar deneyin. Girdiğiniz veriler kaybolmadı." | "You're offline. Check your connection and retry. Your input was kept." |

### 3.5 Boş durum

Kural: Boş alan bırakılmaz; **neden boş** + **ilk eylem** verilir. Kullanıcının kendi eylemiyle
oluşan boşlukta (ör. tüm görevleri tamamladı) olumlu bir onay verilir (Nielsen H10, H6).

| Tür | TR | EN |
|-----|----|----|
| İlk kullanım | "Henüz görev yok. İlk görevinizi ekleyin; tarih ve önceliğe göre burada sıralanır." | "No tasks yet. Add your first one; it'll be sorted here by date and priority." |
| Filtre sonucu | "Bu filtreyle sonuç yok. Filtreyi temizleyin." | "No results for this filter. Clear the filter." |

### 3.6 Onay diyaloğu

Kural: Yıkıcı eylemde **başlık soruyu sorar**, **düğme eylemi adlandırır**. Onay düğmesi "Evet/
Tamam" olamaz; kaçış düğmesi "Vazgeç" olur ve eşit derecede görünür (Nielsen H5, H3; WCAG 3.3.4).

| Öğe | TR | EN |
|-----|----|----|
| Başlık (soru) | "'Rapor' projesi silinsin mi?" | "Delete the project 'Report'?" |
| Gövde | "Bu projedeki 12 görev de silinecek. Bu işlem geri alınamaz." | "This also deletes its 12 tasks. This can't be undone." |
| Onay düğmesi | "Projeyi sil" | "Delete project" |
| Kaçış düğmesi | "Vazgeç" | "Cancel" |

### 3.7 Başarı bildirimi (toast)

Kural: Ne olduğunu söyle; geri alınabiliyorsa "Geri al" sun. Toast kısa ömürlüdür, bu yüzden
tek satır olur; ayrıntı ekranda kalır (Nielsen H1, H3).

| Durum | TR | EN |
|-------|----|----|
| Kayıt | "Görev kaydedildi" | "Task saved" |
| Silme + geri al | "Proje silindi. Geri al" | "Project deleted. Undo" |

### 3.8 Yükleniyor metni

Kural: 1 s'yi aşan işte yükleniyor durumu **ne yapıldığını** söyler; belirsiz "Lütfen bekleyin"
yerine somut iş adı verilir. Uzun işte ilerleme/bekleme süresi belirtilir (Nielsen H1).

| Durum | TR | EN |
|-------|----|----|
| Kısa iş | "Kaydediliyor…" | "Saving…" |
| Uzun iş | "Görseller işleniyor — yaklaşık 30 saniye" | "Processing images — about 30 seconds" |

### 3.9 İzin ve çerez istekleri

Kural: Neden gerektiği söylenir; reddetme seçeneği kabul kadar kolay ve görünür. Ret,
zorlaştırılmış bir "daha sonra" bağlantısına gizlenmez (Nielsen H5, H3; ISO 9241-110 kontrol
edilebilirlik).

| Öğe | TR | EN |
|-----|----|----|
| Gerekçe | "Bildirimleri açın; süresi yaklaşan görevleri zamanında hatırlatalım." | "Turn on notifications so we can remind you about due tasks." |
| Ret | "Şimdi değil" | "Not now" |
| Kabul | "Bildirimleri aç" | "Turn on notifications" |

## 4. Ton Rehberi

- **Türkçe:** Varsayılan "siz" dili. Cümle başında büyük harfle "Siz" yazılmaz; nazik ama sade.
  "-iniz/-ınız" ekleri tutarlı kullanılır; bir ekranda "siz", başka ekranda "sen" karışmaz.
- **İngilizce:** Düz, aktif çatı, ikinci tekil şahıs ("you"). Edilgen yapıdan kaçın: "Your changes
  were saved" yerine "We saved your changes" ya da "Changes saved".
- **Marka tonu:** Brief'te ton verilmişse (resmî/samimi) ona uyarlanır; ancak netlik kuralları (§2)
  korunur. Samimi ton, belirsiz etiketi ya da suçlayıcı hatayı meşrulaştırmaz.
- **Yasaklar:** Hata mesajında ünlem, emoji, espri yok. Büyük harfle bağırma ("ÖDEME BAŞARISIZ")
  yok. Gereksiz neşe ("Oopsie!") hata anında kullanıcıyı küçümser.
- **Kişi ve zaman:** Sistem konuşurken birinci çoğul ("kaydettik") ya da edilgen ("kaydedildi")
  tercih edilir; ikisi karıştırılmaz.

| Doğru ton (TR) | Doğru ton (EN) |
|----------------|----------------|
| "Ödemeniz alınamadı. Kart bilgilerini kontrol edip tekrar deneyin." | "We couldn't process your payment. Check your card details and try again." |

## 5. Yapılmaması Gerekenler

| # | Bağlam | Kötü (TR) | İyi (TR) | Kötü (EN) | İyi (EN) | Neden |
|---|--------|-----------|----------|-----------|----------|-------|
| 1 | Buton | "Tamam" | "Değişiklikleri kaydet" | "OK" | "Save changes" | Belirsiz etiket; H2, H6 |
| 2 | Buton (yıkıcı onay) | "Evet" | "Hesabı sil" | "Yes" | "Delete account" | Eylem adlandırılmıyor; H5 |
| 3 | Buton (iptal) | "Hayır" | "Vazgeç" | "No" | "Cancel" | Kaçış yolu anlaşılmıyor; H3 |
| 4 | Hata | "Yanlış şifre girdiniz." | "Şifre eşleşmedi. Yeniden deneyin ya da sıfırlayın." | "You entered a wrong password." | "Password didn't match. Try again or reset it." | Suçlayıcı dil; H9 |
| 5 | Hata | "Error 0x80" | "Dosya okunamadı. Farklı bir dosya seçin." | "Error 0x80" | "Couldn't read the file. Choose another one." | Kod gösterimi; H2, H9 |
| 6 | Hata | "Geçersiz giriş" | "Tarih GG.AA.YYYY biçiminde olmalı." | "Invalid input" | "Date must be DD.MM.YYYY." | Neyin yanlış olduğu belirsiz; H9, WCAG 3.3.1 |
| 7 | Hata | "Bir hata oluştu." | "Kaydedilemedi çünkü bağlantı kesildi. Bağlantı gelince tekrar deneyin." | "An error occurred." | "Couldn't save because the connection dropped. Retry when you're back online." | Ne/neden/nasıl yok; H9 |
| 8 | Boş durum | "" (boş alan) | "Henüz görev yok. İlk görevinizi ekleyin." | "" (blank) | "No tasks yet. Add your first task." | Boş durum yönlendirmeli; H10 |
| 9 | Boş durum | "Sonuç yok." | "Bu aramada sonuç yok. Yazımı kontrol edin ya da filtreyi temizleyin." | "No results." | "No matches. Check the spelling or clear the filter." | Düzeltme yolu yok; H9 |
| 10 | Onay | "Emin misiniz?" | "'Rapor' projesi silinsin mi? 12 görev de silinecek." | "Are you sure?" | "Delete the project 'Report'? Its 12 tasks will go too." | Sonuç belirtilmiyor; H5 |
| 11 | Toast | "Başarılı!" | "Görev kaydedildi" | "Success!" | "Task saved" | Ne olduğu belirsiz; H1 |
| 12 | Toast | "İşlem tamamlandı" | "Proje silindi. Geri al" | "Done" | "Project deleted. Undo" | Kurtarma sunulmuyor; H3 |
| 13 | Yükleniyor | "Lütfen bekleyin…" | "Görseller işleniyor — yaklaşık 30 saniye" | "Please wait…" | "Processing images — about 30 seconds" | Ne yapıldığı belirsiz; H1 |
| 14 | Form etiketi | Placeholder'da "E-posta" | Görünür etiket "E-posta adresi" | Placeholder "Email" | Visible label "Email address" | Yazınca etiket kaybolur; WCAG 3.3.2, H6 |
| 15 | Yardımcı metin | "Doğru biçimde girin" | "Örnek: 05.10.2026" | "Enter a valid format" | "Example: 10/05/2026" | Biçim örneği yok; WCAG 3.3.3 |
| 16 | İzin isteği | "İzin vermelisiniz" | "Bildirimlere izin verin; hatırlatmaları zamanında gönderelim. İsterseniz sonra açabilirsiniz." | "You must allow this" | "Allow notifications so we can remind you on time. You can turn it on later." | Ret seçeneği yok/zorlanmış; H3 |
| 17 | İzin isteği | "Kabul et" + gizli "Daha sonra" | "Kabul et" ve eşit görünen "Şimdi değil" | "Accept" + hidden "Later" | "Accept" and an equally visible "Not now" | Karanlık kalıp; H3, H5 |
| 18 | Çift olumsuz | "Devam etmemeyi seçmezseniz…" | "Devam etmek için onaylayın." | "If you don't uncheck…" | "Confirm to continue." | Çift olumsuz; H2, bilişsel yük |
| 19 | Belirsiz zaman | "Yakında geliyor" | "Bu özellik 15 Ekim 2026'da açılacak" | "Coming soon" | "Available on Oct 15, 2026" | Belirsiz zaman; H1 |
| 20 | Jargon | "API çağrısı 429 döndü" | "Kısa sürede çok fazla istek geldi. Birkaç saniye bekleyip tekrar deneyin." | "API returned 429" | "Too many requests in a short time. Wait a few seconds and try again." | Teknik jargon; H2 |
| 21 | Terim tutarsızlığı | Aynı ekranda "görev / iş / madde" | Her yerde "görev" | "task / item / todo" | "task" everywhere | Terim tutarsızlığı; H4 |
| 22 | Yerel ayar | "10/01/2026" ve "$1,250.00" TR bağlamında | "1 Ekim 2026" ve "1.250,00 TL" | "01/10/2026" in EN context | "Oct 1, 2026" | Yerel biçim; ISO 9241-110 |

## 6. Mikro-Metin Kontrol Listesi

Adım 6 doğrulamasında ve değerlendirme skill'lerinde madde madde işaretlenir. Her madde ilgili
ilkeye bağlıdır.

- [ ] Buton etiketleri eylem bildiriyor; "Tamam/Evet/Gönder" gibi belirsiz etiket yok (Nielsen H2, H6).
- [ ] Yıkıcı onay düğmesi eylemi adlandırıyor, kaçış düğmesi "Vazgeç" (Nielsen H5; WCAG 3.3.4).
- [ ] Hiçbir hata mesajı kullanıcıyı suçlamıyor ("Yanlış şifre girdiniz" yok) (Nielsen H9; ISO 9241-110).
- [ ] Her hata mesajı ne oldu + neden + nasıl düzeltilir üçlüsünü içeriyor (Nielsen H9; WCAG 3.3.1).
- [ ] Terimler ürün genelinde tutarlı; eş anlamlı karışıklığı yok (Nielsen H4; Dix: consistency).
- [ ] Hiçbir yerde placeholder etiket yerine kullanılmıyor; görünür `<label>` var (WCAG 3.3.2, 1.3.1; Nielsen H6).
- [ ] Alan yardımcı metinleri biçim örneği veriyor (ör. "GG.AA.YYYY") (WCAG 3.3.3).
- [ ] Hata mesajları alanın yanında ve gönderimde özet olarak; düzeltme yönergesi var (WCAG 3.3.1, 3.3.3; Nielsen H9).
- [ ] Sayı, tarih, saat ve para biçimleri yerel ayara uygun, `Intl` ile üretiliyor (ISO 9241-110 öz-betimleyicilik).
- [ ] Boş durumlar neden boş olduğunu ve ilk eylemi söylüyor; tamamen boş alan yok (Nielsen H10).
- [ ] Başarı bildirimleri ne olduğunu söylüyor; geri alınabilir eylemde "Geri al" sunuluyor (Nielsen H1, H3).
- [ ] Yükleniyor metinleri 1 s'yi aşan işte ne yapıldığını belirtiyor (Nielsen H1; Dix: responsiveness).
- [ ] İzin/çerez istekleri gerekçe veriyor, reddetme seçeneği eşit görünüyor (Nielsen H3; ISO 9241-110 kontrol edilebilirlik).
- [ ] Hata mesajlarında ünlem, emoji, büyük harfle bağırma ve espri yok (Nielsen H2).
- [ ] Sayfa başlıkları ve başlık metinleri ekranın amacını açıkça tanımlıyor (WCAG 2.4.6).
- [ ] Teknik hata kodları başlık değil, ikincil destek bilgisi olarak veriliyor (Nielsen H2, H9).

## 7. Kaynaklar

- Nielsen, J. (1994). *Usability Heuristics* — H2 (match between system and real world),
  H4 (consistency and standards), H9 (help users recognize, diagnose, and recover from errors).
- W3C, *Web Content Accessibility Guidelines (WCAG) 2.1* — SC 1.3.1, 3.3.1, 3.3.2, 3.3.3, 3.3.4,
  2.4.6. WCAG 2.2 sürümünde ilgili maddeler geçerlidir.
- ISO 9241-110:2020 — Ergonomics of human-system interaction, Part 110: Interaction principles
  (öz-betimleyicilik / self-descriptiveness, hata toleransı / error tolerance, kontrol edilebilirlik).
- Material Design — Writing guidelines (ürün içi metin, hata ve boş durum yazımı).
- Apple Human Interface Guidelines — Writing (mikro metin, ton ve etiket kuralları).
- Intl.NumberFormat / Intl.DateTimeFormat — ECMAScript Internationalization API (standart yerleşik API).

URL verilmedi; kaynaklar yalnızca ad ve sürümle anılır. Yukarıdaki ilkeler dışında kaynaksız
istatistik kullanılmaz.

## 8. Aldatıcı tasarım yasakları

Mikro metin, aldatıcı kalıbın taşıyıcısı olabilir; aşağıdaki metin kararları yasaktır ve E29
kapsamında engelleyici bulgudur. Kalıpların tam tanımı, düzeltmeleri ve ilgili E kodları için
`references/deceptive-patterns.md` okunur.

| # | Bağlam | Yasak (TR) | Doğru (TR) | Neden | E kodu |
|---|--------|------------|------------|-------|--------|
| 1 | İzin/çerez ret metni | "Hayır, fırsatları kaçırıp geride kalmak istemiyorum." | "Şimdi değil" | Utançla ikna (confirmshaming) | E29, E2 |
| 2 | İzin/çerez ret metni | "Kabul et" büyük düğme + 11 px soluk "Reddet" bağlantısı | Kabul ve ret aynı boyut sınıfı ve E2 kontrastında | Görsel karıştırma | E29, E9, E2 |
| 3 | Pazarlama onayı | Ön-işaretli "Kampanya e-postaları almak istiyorum" | Boş gelen onay kutusu; kullanıcı açık eylemle işaretler | Ön-seçim | E29, E19 |
| 4 | Abonelik iptali | "Aboneliği iptal et" yalnız çağrı merkezi numarasıyla | İptal, kayıtla aynı kanaldan ve en fazla kayıt kadar adım | Zor iptal (roach motel) | E29, E10 |
| 5 | Sahte aciliyet | Her yüklemede sıfırlanan "Bu fiyat 09:59'da bitiyor" sayacı | Gerçek bitiş mutlak tarih-saatle ("15 Ekim 2026, 23:59") | Sahte aciliyet/kıtlık | E29, E11 |
| 6 | Gizli maliyet | Ödeme anında ortaya çıkan hizmet/kargo bedeli | Toplam (kargo/vergi dahil) en baştan görünür | Gizli maliyet | E29, E11 |
| 7 | Yeniden sorma | "Şimdi değil" sonrası her ekranda aynı pencere | Ret sonrası yeniden sorma için kullanıcı eylemi beklenir | Israr (nagging) | E29, E10 |
| 8 | Çift olumsuz | "Devam etmemeyi seçmezseniz onaylamış sayılırsınız." | "Devam etmek için onaylayın." | Metin karıştırma | E29, H2 |
