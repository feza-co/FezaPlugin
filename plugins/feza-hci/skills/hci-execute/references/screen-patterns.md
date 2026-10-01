# Ekran Kalıpları

Sık kullanılan ekran tipleri için yapı, zorunlu durumlar ve HCI gerekçesi. Kalıp bir başlangıç noktasıdır; görev modeli farklı bir yapı gerektiriyorsa sapma gerekçesiyle rationale'e yazılır.

Kaynaklar: Nielsen (1994), ISO 9241-110:2020, WCAG 2.1, Dix et al. (2004), Miller (1956), Hick (1952), Gestalt algı ilkeleri.

## 1. Onboarding (ilk kullanım)

```text
+--------------------------------+
| [Logo placeholder]      [Atla] |
|                                |
|  Adım 1 / 3                    |
|  ● ○ ○                         |
|  <Başlık: tek fayda cümlesi>   |
|  <1-2 cümle açıklama>          |
|                                |
|  [Geri]            [Devam]     |
+--------------------------------+
```

| Kural | HCI gerekçesi |
|-------|---------------|
| En fazla 3-4 adım; her adım tek fayda | Bilişsel yük (Miller); minimalist tasarım (H8) |
| "Adım n / N" metni + görsel ilerleme | Sistem durumu (H1); ilerleme yalnız noktalarla değil metinle de (WCAG 1.4.1) |
| "Atla" her adımda görünür; "Geri" ilk adım dışında | Kullanıcı kontrolü (H3), ISO 9241-110 kontrol edilebilirlik |
| Kayıt/izin istemeyi değer gösterildikten sonraya bırak | Görev uygunluğu (Dix: task conformance) |
| Onboarding sonradan Yardım'dan yeniden açılabilir | Yardım (H10) |
| Otomatik ilerleyen karusel yok | WCAG 2.2.2; kullanıcı inisiyatifi (Dix: dialog initiative) |

Zorunlu durumlar: adım geçişinde odak yeni başlığa taşınır; son adımda birincil eylem görevin ilk ekranına götürür.

## 2. Form (veri girişi)

```text
+--------------------------------+
| <h1> Yeni kayıt                |
| * zorunlu alanlar              |
| Ad Soyad *                     |
| [............................] |
| E-posta *                      |
| [............................] |
| ornek@alan.com                 |  <- ipucu (aria-describedby)
| ! Hata: E-posta "@" içermeli.  |  <- hata (ikon + metin)
| > Diğer seçenekler             |  <- details (aşamalı gösterim)
| [Vazgeç]          [Kaydet]     |
+--------------------------------+
```

| Kural | HCI gerekçesi |
|-------|---------------|
| Tek sütun; etiket alanın üstünde, her zaman görünür (yer tutucu etiket yerine geçmez) | Tanıma (H6); WCAG 3.3.2, 1.3.1 |
| Zorunlu alan metinle belirtilir; isteğe bağlı az ise "(isteğe bağlı)" yazılır | Hata önleme (H5) |
| Uygun `type`, `inputmode`, `autocomplete`; biçim örneği ipucunda | H5; WCAG 1.3.5 |
| Doğrulama alandan çıkınca (blur) ve gönderimde; yazarken agresif hata yok | H5, H9; kullanıcıyı erken suçlamama |
| Hata: alan yanında (ne + nasıl düzeltilir) + gönderimde üstte özet, özetten alana bağlantı; odak özete ya da ilk hatalı alana | H9; WCAG 3.3.1, 3.3.3 |
| Gönderimde düğme meşgul durumda, çift gönderim engelli; sonuç toast + yönlendirme | H1; ISO 9241-110 hata toleransı |
| Girilen veri hata sonrası korunur; kaydedilmemiş değişiklikte çıkış uyarısı | H3, H9 |
| ≤ 7 alan; fazlası mantıksal adımlara (sihirbaz) bölünür, adım özeti son ekranda | Miller; H6 |
| "Vazgeç" ikincil stil, birincil eylemden ayrışık konumda | H4; Fitts yasası gereği birincil eylem kolay erişimde |

## 3. Liste / Detay

```text
Mobil:                               Masaüstü (≥ 1024 px):
+------------------------+           +-----------+--------------------+
| Görevler      [+ Yeni] |           | Liste     | Detay              |
| [Ara......] [Filtre v] |           | > Öğe 1   | <h2> Öğe 1         |
| Öğe 1           Bugün >|           |   Öğe 2   | Alanlar...         |
| Öğe 2             Dün >|           |   Öğe 3   | [Düzenle] [Sil]    |
+------------------------+           +-----------+--------------------+
```

| Kural | HCI gerekçesi |
|-------|---------------|
| Liste satırı: birincil bilgi solda/üstte, ikincil bilgi soluk metinde (yine ≥ 4.5:1) | Görsel hiyerarşi (H8); WCAG 1.4.3 |
| Tüm satır tıklanabilir, ≥ 44 px yükseklik; satırın tek bir bağlantı/düğme öğesi var | Dokunma hedefi; WCAG 2.1.1 |
| Arama ve filtre durumu görünür ("3 filtre etkin", "Temizle"); URL'de korunur | H1, H3, H7 |
| Uzun listede sayfalama ya da "Daha fazla yükle"; sonsuz kaydırma yalnız altbilgiye erişim korunursa | Kontrol edilebilirlik; klavye kullanıcısı için altbilgiye erişim |
| Detaydan geri dönüşte liste konumu ve filtre korunur | H3, H6 |
| Silme: onay diyaloğu ya da (tercihen) anında sil + "Geri al" toast'u | H3, H5; WCAG 3.3.4 |
| Seçili/aktif öğe renk + işaret + `aria-current` | WCAG 1.4.1, 4.1.2 |

Zorunlu durumlar: yükleniyor (iskelet satırlar), boş (kalıp 5), filtre sonucu boş ("Bu filtreyle sonuç yok" + "Filtreyi temizle"), hata (kalıp 6).

## 4. Dashboard (özet ekran)

```text
+----------------------------------------------+
| <h1> Genel bakış          Son güncelleme 2 dk |
| +----------+ +----------+ +----------+        |
| | Açık     | | Bu hafta | | Geciken  |        |
| | 12       | | 5 bitti  | | 2 !      |        |
| +----------+ +----------+ +----------+        |
| <h2> Dikkat gerekenler                        |
| - Geciken: Rapor hazırla  [Aç]                |
| <h2> Son etkinlik                             |
+----------------------------------------------+
```

| Kural | HCI gerekçesi |
|-------|---------------|
| En fazla 3-5 anahtar gösterge; her biri bir karara ya da eyleme bağlanır | Miller; H8; görev uygunluğu |
| Gösterge kartında etiket + değer + bağlam (karşılaştırma, birim, dönem) | H2; sayı tek başına anlam taşımaz |
| "Son güncelleme" zamanı ve yenile eylemi | H1, Dix: observability |
| Eşik aşımı renk + ikon + metinle ("2 geciken") | WCAG 1.4.1 |
| Grafiklerde doğrudan etiket, desen/işaretçi ve metin özeti ya da veri tablosu alternatifi | WCAG 1.1.1, 1.4.1 |
| Kartlar tıklanınca ilgili filtrelenmiş listeye gider | H7; tanıma |
| Mobilde kartlar tek sütun; öncelik sırası korunur | WCAG 1.4.10 |

## 5. Boş Durum

```text
+--------------------------------+
|        [ikon, alt=""]          |
|   Henüz görev eklemediniz.     |
|   Görevler burada listelenir;  |
|   tarih ve önceliğe göre       |
|   sıralanır.                   |
|      [İlk görevi ekle]         |
+--------------------------------+
```

| Tür | Mesaj kuralı | HCI gerekçesi |
|-----|--------------|---------------|
| İlk kullanım | Ne görüleceğini açıkla + tek birincil eylem | H10 yardım; H6 tanıma |
| Kullanıcı temizledi | Olumlu onay ("Tüm görevler tamamlandı") | H1 |
| Arama/filtre sonucu yok | Sorguyu tekrarla + filtreyi temizle / aramayı düzelt önerisi | H9, H3 |
| Yetki yok | Neden + kimden istenir | H9 |

Boş durum hiçbir zaman tamamen boş alan değildir; dekoratif ikon `alt=""`, mesaj metin olarak.

## 6. Hata Ekranı ve Hata Durumu

```text
+--------------------------------+
| ! Bağlantı kurulamadı          |  <- role="alert" (dinamikse)
| Görevler yüklenemedi. İnternet |
| bağlantınızı kontrol edip      |
| tekrar deneyin. Girdiğiniz     |
| veriler kaybolmadı.            |
| [Tekrar dene]   [Ana sayfa]    |
| Hata kodu: NET-01 (destek için)|
+--------------------------------+
```

| Kural | HCI gerekçesi |
|-------|---------------|
| Mesaj üç parça: ne oldu, neden (biliniyorsa), ne yapılabilir | H9; ISO 9241-110 hata toleransı |
| Suçlayıcı ya da teknik dil yok ("Geçersiz giriş", "Error 500" tek başına yok); teknik kod ikincil | H2, H9 |
| En az bir kurtarma eylemi (Tekrar dene) + bir çıkış (Ana sayfa / Geri) | H3; Dix: recoverability |
| Kullanıcı verisinin korunduğu belirtilir | Güven; H3 |
| Bölgesel hata tüm sayfayı kırmaz; yalnız ilgili bileşen hata durumuna geçer | Dix: robustness |
| 404: aranan şey bulunamadı + arama + ana sayfa bağlantısı | H3, H10 |
| Dinamik hata `role="alert"`; tam sayfa hata `h1` başlığıyla ve anlamlı `title` ile | WCAG 4.1.3, 2.4.2 |

## 7. Ekranlar Arası Ortak Kurallar

| Kural | Gerekçe |
|-------|---------|
| Aynı başlık/navigasyon/altbilgi yapısı her ekranda | WCAG 3.2.3, H4 |
| Ekran başına tek `h1`, birincil eylem tek | H8 |
| Durum mesajları için tek bildirim bileşeni ve tek canlı bölge | H4, WCAG 4.1.3 |
| Mikro metin: fiil ile başlayan düğme etiketleri ("Kaydet", "Görevi sil"); "Tamam/Evet" yerine sonucu söyleyen etiket | H2, H6 |
| Logo, illüstrasyon ve marka görselleri işaretli placeholder; gerçek varlık sağlanınca değiştirilir | Kapsam sınırı |
