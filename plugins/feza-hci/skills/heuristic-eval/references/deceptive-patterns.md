<!-- generated from shared/packages/feza-hci/deceptive-patterns.md — do not edit -->
# Aldatıcı Tasarım Kalıpları (tek kaynak)

Bu dosya, feza-hci paketindeki üretim ve değerlendirme skill'lerinin aldatıcı tasarım
denetiminde kullandığı **tek kaynaktır**. `heuristic-eval`, `hci-review` ve `hci-execute`
skill'lerine `references/deceptive-patterns.md` olarak kopyalanır; değişiklik yalnızca
burada yapılır ve depo eşitleme betiği (kök `sync.py`) ile dağıtılır.

> **Bu bölüm hukuki tavsiye değildir.** Aşağıdaki mevzuat atıfları yalnızca tasarım
> denetiminde bağlam sağlar; uyumluluk kararı hukuk uzmanına bırakılır.

## 1. Amaç

Aldatıcı tasarım (dark pattern), kullanıcının bilinçli kararını engelleyen, saptıran ya da
gizlice yönlendiren arayüz kararıdır. Kullanıcı yine de işlemi tamamlayabilir; sorun,
tamamlamanın kullanıcının **gerçek niyetine** değil tasarımın yönlendirmesine dayanmasıdır.
Bu dosya kalıpları tanımlar, TR örnek verir, düzeltmeyi ve ilgili E kodunu bağlar.

İlgili ilkeler: Nielsen H3 (kullanıcı kontrolü ve özgürlüğü), H5 (hata önleme), ISO 9241-110
(kontrol edilebilirlik, uygunluk). Bağlayıcı sayısal kriter: **E29** (aldatıcı tasarım: eşit
belirginlik); kalıpların çoğu ayrıca E9, E2, E19, E3, E10 ile kesişir.

## 2. Kalıplar

Her kalıp şu dört parçayla verilir: tanım, TR örnek, düzeltme, ilgili E kodu.

### 2.1 Confirmshaming (utançla ikna)

- **Tanım:** Reddetme seçeneği, kullanıcıyı suçlayan ya da küçük düşüren bir dille yazılır;
  böylece kullanıcı kabul etmeye "zorlanır".
- **Örnek (TR):** "Hayır, fırsatları kaçırmak ve geride kalmak istemiyorum."
- **Düzeltme:** Ret metni nötr ve kısa: "Şimdi değil" / "İstemiyorum". Ret, kabul kadar
  görünür olur. Suçlayıcı çerçeveleme kullanılmaz (H2, H9).
- **İlgili E kodu:** E29, E9, E2 (ret, kabulün belirginliğinde olmalı).

### 2.2 Obstruction (engelleme / sürtünme)

- **Tanım:** Kullanıcının gerçekten yapmak istediği eylem gereksiz biçimde zorlaştırılır ya
  da uzatılır; istenmeyen eylem kolaylaştırılır.
- **Örnek (TR):** "Hesabımı kapat" bağlantısı yalnız 4 seviye derindeki bir SSS sayfasında,
  kabul düğmesi ise ilk ekranda.
- **Düzeltme:** Kritik eylem (iptal, kapatma, silme) doğrudan erişilebilir olur; ek adım ve
  yönlendirme kaldırılır (H3, E10).
- **İlgili E kodu:** E29, E10.

### 2.3 Preselection (ön-seçim)

- **Tanım:** Kullanıcının yararına olmayan bir seçenek (pazarlama izni, ek ürün, abonelik)
  varsayılan olarak **işaretli** gelir; kullanıcı yalnız işareti kaldırmayı hatırlarsa
  kaçınır.
- **Örnek (TR):** Kayıt formunda "Kampanya e-postaları almak istiyorum" kutusu işaretli
  gelir.
- **Düzeltme:** Onay kutuları boş gelir; kabul **açık eylem** gerektirir. Ön-işaretli onay
  yasaktır (E19, H5).
- **İlgili E kodu:** E29, E19.

### 2.4 Nagging (ısrar)

- **Tanım:** Kullanıcı reddettikten sonra aynı istek (bildirim, izin, abonelik, değerlendirme)
  tekrar tekrar sorulur.
- **Örnek (TR):** Kullanıcı "Şimdi değil" dedikten sonra her ekran geçişinde bildirim izni
  penceresi yeniden açılır.
- **Düzeltme:** Ret kalıcı saygı görür; yeniden sormak için kullanıcının açık eylemi gerekir
  (ör. Ayarlar'dan "Yeniden sor"). Reddedilen istek için makul bir bekleme süresi tanımlanır
  (H3).
- **İlgili E kodu:** E29, E10.

### 2.5 Hidden costs (gizli maliyet)

- **Tanım:** Kargo, hizmet, işlem ya da otomatik eklenen kalem gibi ek ücretler son adımda ya
  da ödeme anında ortaya çıkar; toplam fiyat önceden net değildir.
- **Örnek (TR):** Sepette "1.250 TL" görünür; ödeme adımında kargo + hizmet bedeliyle
  "1.399 TL" tahsil edilir.
- **Düzeltme:** Tam toplam (varsa kargo/vergi dahil) en baştan görünür; sonradan eklenen her
  tutar özette vurgulanır ve canlı bölgeyle duyurulur (H1, E11, SC 4.1.3).
- **İlgili E kodu:** E29, E11.

### 2.6 Hard to cancel / Roach motel (zor iptal)

- **Tanım:** Giriş kolay, çıkış zor; abonelik iptali telefondan, e-postadan ya da çok adımlı
  akıştan yapılırken kayıt tek tıkla olur.
- **Örnek (TR):** "Abone ol" tek düğme; "Aboneliği iptal et" yalnız çağrı merkezi numarasıyla.
- **Düzeltme:** **İptal adım sayısı ≤ kayıt adım sayısı.** İptal, kayıtla aynı kanaldan ve
  aynı erişilebilirlik düzeyinde sunulur; gereksiz onay/ısrarlı teklif eklenmez (E10, H3).
- **İlgili E kodu:** E29, E10, E19.

### 2.7 Fake urgency and scarcity (sahte aciliyet ve sahte kıtlık)

- **Tanım:** Gerçek olmayan süre ya da stok baskısıyla ("son 2 kişi!", sürekli sıfırlanan
  geri sayım) hızlı karara zorlama.
- **Örnek (TR):** Her sayfa yüklemesinde "Bu fiyat 09:59'da bitiyor" sayacı baştan başlar.
- **Düzeltme:** Aciliyet yalnız **doğru** bilgiyle gösterilir; sabit/yalan sayaç kaldırılır.
  Gerçek kampanya bitişi mutlak tarih-saat olarak verilir (H1, E11).
- **İlgili E kodu:** E29, E11.

### 2.8 Visual interference / trick wording (görsel karıştırma)

- **Tanım:** Kabul eylemi büyük, doygun ve vurgulu; ret eylemi küçük, soluk ve gizlenmiş
  olur. Aynı kalıbın metin karıştırma biçimi (trick wording) ise çift olumsuz, belirsiz ya da
  yanıltıcı etiket kullanır.
- **Örnek (TR):** "Kabul et" 44 px dolgulu mavi düğme; "Reddet" 11 px soluk gri bağlantı.
  Ya da "Devam etmemeyi seçmezseniz onaylamış sayılırsınız."
- **Düzeltme:** Kabul ve ret **aynı boyut sınıfında** ve **E2 kontrastında** sunulur; ikisi de
  görünür ve odaklanabilir olur. Etiketler tek olumlu cümleyle yazılır (H2, E9, E2, SC 3.3.4).
- **İlgili E kodu:** E29, E2, E9.

## 3. Değişmez kurallar

Bu üç kural tüm ekran ve tariflerde **engelleyicidir** (E29):

1. **İptal adım sayısı ≤ kayıt adım sayısı.** Abonelik/üyelik çıkışı, girişinden daha zor
   olamaz.
2. **Ret = kabul görünürlüğü.** Reddetme seçeneği, kabul ile aynı **boyut sınıfında** ve E2
   kontrastını sağlayacak şekilde sunulur; hiçbiri gizli, soluk ya da küçültülmüş olamaz.
3. **Ön-işaretli onay kutusu yok.** Pazarlama/izleme/ek ürün onayları boş gelir.

## 4. Kontrol soruları (NN/g temelli; yalnız evet/hayır)

Bu liste Nielsen Norman Group'un aldatıcı tasarım yazılarındaki soru yaklaşımından
uyarlanmıştır (genel atıf; alıntı değildir). Her soruya **hayır** yanıtı bir bulgudur.

- [ ] Kabul ve ret seçenekleri aynı görsel ağırlıkta mı?
- [ ] Ret seçeneği en az kabul kadar kolay bulunuyor mu?
- [ ] Hiçbir onay kutusu ön-işaretli değil mi?
- [ ] Abonelik iptali en fazla kayıt kadar adım gerektiriyor mu?
- [ ] Toplam fiyat ve ek ücretler ödeme öncesi tam görünüyor mu?
- [ ] Aciliyet/kıtlık bilgisi gerçek ve doğrulanabilir mi?
- [ ] Reddedilen istek yeniden sormadan önce bekleme/kullanıcı eylemi gerektiriyor mu?
- [ ] Buton ve bağlantı metinleri tek olumlu, belirsizlikten uzak cümleler mi?

## 5. Kaynaklar

- Brignull, H. — *deceptive.design* (eski adıyla darkpatterns.org) aldatıcı tasarım
  sözlüğü: confirmshaming, roach motel, hidden costs, nagging, preselection.
- Mathur, A. ve ark. (2019). "Dark Patterns at Scale: Findings from a Crawling Study of
  11K Shopping Websites." *Proceedings of the ACM on Human-Computer Interaction (CSCW)*.
- Gray, C. M. ve ark. (2018). "The Dark (Patterns) Side of UX Design." *CHI '18*.
- Avrupa Birliği, Dijital Hizmetler Tüzüğü — DSA, Tüzük (AB) 2022/2065, **Madde 25**
  (çevrimiçi arayüzlerde aldatıcı tasarım yasakları). *(Bu bölüm hukuki tavsiye değildir.)*
- Nielsen Norman Group — aldatıcı tasarım kalıpları üzerine genel yazılar (yalnız genel
  atıf; doğrudan alıntı yapılmaz, sayfa numarası/isim uydurulmaz).

URL verilmedi; kaynaklar yalnızca ad ve sürümle anılır. Yukarıdaki kaynaklar dışında
kaynaksız istatistik kullanılmaz.
