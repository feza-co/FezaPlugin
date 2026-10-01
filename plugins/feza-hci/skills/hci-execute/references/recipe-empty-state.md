# Tarif: Boş Durum

> Kalıp kimliği: `recipe-empty-state` · İlgili ilkeler: Nielsen H1, H3, H6, H10 · WCAG SC 1.1.1, 1.4.1, 4.1.3 · ISO 9241-110 kendini açıklayıcılık

## 1. Amaç ve ne zaman kullanılır

Bir liste, panel ya da arama sonucu gösterilecek içerik olmadığında gösterilen durum. Boş durum hiçbir zaman tamamen boş alan değildir; nedeni ve atılacak ilk adımı anlatır (H10 yardım, H6 tanıma).

Kullan:
- Liste/panel ilk kez açıldı ve henüz veri yoksa (ilk kullanım).
- Kullanıcı tüm öğeleri tamamladı/sildi ve geriye bir şey kalmadıysa.
- Arama/filtre sonucu boş döndüyse.
- Kullanıcının o içeriği görme yetkisi yoksa.

Kullanma:
- İçerik yükleniyor ama henüz gelmediyse → bu yükleme durumudur (iskelet), boş değil.
- Hata oluştuysa → `references/recipe-error.md` hata durumu kullanılır; boşluk "hiç yok" demektir, hata "gelmedi" demektir.

## 2. ASCII yerleşim

### Mobil (360 px)

```text
+--------------------------------+
| Görevler              [+ Yeni] |
|--------------------------------|
|                                |
|        [ikon, alt=""]          |
|                                |
|   Henüz görev eklemediniz.     |
|   Görevler burada listelenir;  |
|   tarih ve önceliğe göre       |
|   sıralanır.                   |
|                                |
|      [İlk görevi ekle]         |
|                                |
+--------------------------------+
| Ana    Görevler    Profil      |
+--------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+----------------------------------------------------------------------+
| Görevler                                           [+ Yeni]         |
+----------------------------------------------------------------------+
|                                                                      |
|                          [ikon, alt=""]                              |
|                                                                      |
|                    Henüz görev eklemediniz.                          |
|            Görevler burada listelenir; tarih ve önceliğe            |
|                             göre sıralanır.                          |
|                                                                      |
|                       [İlk görevi ekle]                              |
|                                                                      |
+----------------------------------------------------------------------+
```

İçerik dikey ve yatay ortalanır; metin genişliği 45-75 karakterle sınırlı (`max-width: 65ch`). Birincil eylem tek ve görünür.

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | Boş durum ikon, başlık, açıklama, birincil eylem | İkon süs ise `alt=""`; başlık `h2` (sayfa `h1`'inin altında) |
| Yükleniyor | Uygulanmaz — yükleniyor durumu boş durumdan önce gelir; iskelet satırlar gösterilir | "Veri gelmedi" ile "veri yok" karıştırılmaz |
| Boş | Bu tarifin öznesi (ilk kullanım / temizlendi / sonuç yok / yetki yok varyantları) | Varyant seçimi nedene göre; mesaj kuralı değişir |
| Hata | Uygulanmaz — hata durumu için `references/recipe-error.md` kullanılır; boş durumda hata metni gösterilmez | İkisi aynı anda görünmez |
| Başarı | Uygulanmaz — boş durum bir sonuç ekranı değildir | İşlem başarısı toast ile bildirilir; liste dolduysa boş durum kaybolur |
| Devre dışı | Kullanıcının yetkisi yoksa birincil eylem gösterilmez (devre dışı değil, hiç yok) | Yetki yok varyantında eylem yerine "kimden istenir" bilgisi |

## 4. Etkileşim kuralları

- **Varyant seçimi:** nedeni doğru yansıt (aşağıdaki mesaj kuralı tablosu); yanlış varyant kullanıcıyı yanıltır.
- **Tek birincil eylem:** ilk kullanımda "İlk görevi ekle"; filtre sonucu boşta "Filtreyi temizle"; yetki yokta eylem yok.
- **Kullanıcı temizledi varyantı:** olumlu onay ver ("Tüm görevler tamamlandı"); yeniden doldurma çağrısı yapma (H1).
- **Filtre sonucu boş:** sorguyu tekrarla ("«rapor» için sonuç yok"), filtreyi temizle ya da aramayı düzelt önerisi sun (H3, H9).
- **Yetki yok:** nedeni ve kimden isteneceğini yaz; erişim talep etme yolu varsa bağlantı ver.
- **Odak:** boş durum göründüğünde odak değişmez (kullanıcı akışın ortasında değilse); yeni boş durum oluştuysa (ör. silme sonrası) `aria-live` ile duyurulur.
- **Geçiş:** veri gelince boş durum kaybolur ve gerçek içerik görünür; iskelet→içerik sıçraması olmaz.
- **Geri al:** boş duruma yol açan silme geri alınabilirse [Geri al] toast'u sunulur (H3).
- **Klavye:** birincil eylem `Tab` ile erişilebilir; görsel sıra ile sekme sırası aynıdır.

## 5. Erişilebilirlik notları

- **Landmark:** boş durum, ait olduğu bölgenin (`section`) içinde; `main` dışında yüzen bir katman değil.
- **Başlık yapısı:** mesaj başlığı `h2`; sayfada zaten tek `h1` var; başlık sırası atlanmaz (SC 1.3.1, 2.4.6).
- **ARIA:** dekoratif ikon `alt=""` / `aria-hidden="true"`; mesaj metin olarak DOM'da (SC 1.1.1). Yeni oluşan boş durum `role="status"`/`aria-live="polite"` (SC 4.1.3).
- **Renk:** boş durum bilgisi yalnız ikon rengiyle değil, metinle de iletilir (SC 1.4.1).
- **Odak yönetimi:** görünür odak korunur; birincil eylem düğmesi `:focus-visible` halkalı (SC 2.4.7).
- **Hedef boyut:** birincil eylem ≥ 44 × 44 px (SC 2.5.5).
- **Metin:** ikon altındaki açıklama gövde boyutunda (≥ 16 px), yeterli kontrastta (≥ 4.5:1) (SC 1.4.3, 1.4.4).
- **Uzun içerik:** %200 yakınlaştırma ve 320 px'de metin kırpılmaz, ortalanmış blok yatay kaydırma çıkarmaz (SC 1.4.4, 1.4.10).

**Mesaj kuralı tablosu:**

| Varyant | Neden boş | İlk eylem |
|---------|-----------|-----------|
| İlk kullanım | Henüz öğe yok | Ne görüleceğini açıkla + "İlk görevi ekle" |
| Kullanıcı temizledi | Tüm öğeler tamamlandı/silindi | Olumlu onay; zorunlu eylem yok |
| Arama/filtre sonucu yok | Sorgu/filtre eşleşmedi | Sorguyu tekrarla + "Filtreyi temizle" |
| Yetki yok | Kullanıcının erişimi yok | Neden + kimden isteneceği |

## 6. Sık yapılan hatalar

1. **Boş alanı hiç doldurmamak.** Neden zararlı: kullanıcı hata mı, yükleme mi, gerçekten boş mu anlayamaz; H10 yardım yok. Doğrusu: neden + ilk eylem içeren boş durum.
2. **Yükleme durumunu boş durum sanmak.** Neden zararlı: veri gelmek üzereyken "kayıt yok" göstermek yanıltır, kullanıcı yanlış eylem yapar (H1). Doğrusu: yüklemede iskelet, içerik yoksa boş durum.
3. **Hata durumunda boş durum göstermek.** Neden zararlı: "hiç kayıt yok" demek yerine "yüklenemedi" denmeli; kullanıcı kaybın kalıcı olduğunu sanır (H9). Doğrusu: hata kalıbı + [Tekrar dene].
4. **Birden çok birincil eylem koymak.** Neden zararlı: odağı dağıtır, H8 minimalist tasarımı bozar. Doğrusu: tek birincil eylem, gerekirse ikincil metin bağlantısı.
5. **Kullanıcı temizledi durumunda yeniden doldurma baskısı ("Hemen ekle!").** Neden zararlı: tamamlama duygusunu bozar, H1 geri bildirimi yanlış verir. Doğrusu: olumlu onay, zorunlu eylem yok.
6. **Filtre sonucu boşta filtreyi hatırlamamak.** Neden zararlı: kullanıcı neden boş olduğunu anlamaz, H6 tanımayı bozar. Doğrusu: sorguyu tekrarla + temizleme eylemi.
7. **Dekoratif ikona `alt` metni ya da anlamsız açıklama koymak.** Neden zararlı: ekran okuyucu gereksiz tekrar okur (SC 1.1.1). Doğrusu: süs ikon `alt=""`.

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Başlık (ilk kullanım) | Henüz görev eklemediniz. | You have no tasks yet. |
| Açıklama (ilk kullanım) | Görevler burada listelenir; tarih ve önceliğe göre sıralanır. | Tasks are listed here, ordered by date and priority. |
| Birincil düğme | İlk görevi ekle | Add your first task |
| Başlık (temizlendi) | Tüm görevler tamamlandı. | All tasks are complete. |
| Açıklama (temizlendi) | Yeni görev eklediğinizde burada görünecek. | New tasks will appear here. |
| Başlık (sonuç yok) | "Rapor" için sonuç yok. | No results for "Report". |
| Öneri (sonuç yok) | Farklı bir sözcük deneyin ya da filtreyi temizleyin. | Try a different word or clear the filter. |
| Düğme (filtreyi temizle) | Filtreyi temizle | Clear filter |
| Başlık (yetki yok) | Bu listeyi görme yetkiniz yok. | You do not have access to this list. |
| Açıklama (yetki yok) | Erişim için proje yöneticinizden izin isteyin. | Ask your project manager for access. |
| Canlı bölge | Liste boş. | The list is empty. |

Para/tarih: TR `1 Ekim 2026`, `1.250,00 TL`; EN `Oct 1, 2026`, `$1,250.00`.

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] Boş durumda her zaman mesaj metni ve (uygunsa) tek birincil eylem var; tamamen boş alan yok.
- [ ] Doğru varyant kullanılıyor: ilk kullanım / temizlendi / sonuç yok / yetki yok.
- [ ] Yükleme ve hata durumları boş durumla karıştırılmıyor; ayrı durumlar kodlanmış.
- [ ] Filtre sonucu boş mesajı sorguyu tekrarlıyor ve temizleme eylemi sunuyor.
- [ ] Dekoratif ikon `alt=""`, mesaj metin olarak DOM'da; yeni boş durum `aria-live` ile duyuruluyor.
- [ ] Birincil eylem ≥ 44 px ve klavyeyle erişilebilir; odak görünür.
- [ ] %200 yakınlaştırma ve 320 px'de metin kırpılmıyor, yatay kaydırma yok.
