# Tarif: Liste / Detay

> Kalıp kimliği: `recipe-list-detail` · İlgili ilkeler: Nielsen H1, H3, H6, H7 · WCAG SC 1.4.1, 1.4.3, 2.1.1, 3.3.4 · ISO 9241-110 kontrol edilebilirlik

## 1. Amaç ve ne zaman kullanılır

Bir varlık koleksiyonunu (görev, sipariş, kayıt, mesaj) tarayıp tek bir öğeyi açıp işlem yapma. En sık kullanılan üretkenlik kalıbı; liste ana çalışma yüzeyi, detay işlem yüzeyidir (H7 esneklik, H6 tanıma).

Kullan:
- Aynı türden çok sayıda kayıt varsa ve kullanıcı bunların birinde işlem yapacaksa.
- Toplu işlem (çoklu seçim) gerekiyorsa.

Kullanma:
- Kayıt sayısı çok azsa (ör. 1-2 ayar) → form ya da ayar ekranı kullan.
- Öğeler ilişkili ve karşılaştırmalıysa → tablo ya da dashboard daha uygun.

## 2. ASCII yerleşim

### Mobil (360 px)

```text
+--------------------------------+
| Görevler              [+ Yeni] |
| [Ara..........] [Filtre v]     |
|--------------------------------|
| Rapor hazırla          Bugün > |
| Toplantı notu           Dün  > |
| Fatura öde         1 Ekim 2026>|
| 3 filtre etkin  [Temizle]      |
+--------------------------------+
| Ana    Görevler    Profil      |
+--------------------------------+
```

Detay (mobil): liste ekranı yerine tam ekran detay açılır; `< Geri` liste konumuna döner.

### Masaüstü (≥ 1024 px)

```text
+-------------------------------+--------------------------------------+
| Görevler           [+ Yeni]   | < Geri   Rapor hazırla               |
| [Ara.......] [Filtre v]       |                                      |
|-------------------------------| Durum: Açık    Son tarih: 1 Ekim 2026|
| > Rapor hazırla      Bugün    | Açıklama...                          |
|   Toplantı notu       Dün     |                                      |
|   Fatura öde      1 Ekim 2026 | [Düzenle]              [Görevi sil]  |
| 3 filtre etkin   [Temizle]    |                                      |
+-------------------------------+--------------------------------------+
```

Masaüstünde iki bölge: sol liste (sabit genişlik), sağ detay. Seçili satır hem renk hem işaretle vurgulanır; ok tuşlarıyla liste içinde gezinilir (SC 1.4.1, 2.4.3).

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | Liste satırları, arama/filtre, birincil [Yeni], satır detayı | Birincil bilgi önde, ikincil soluk metinde (yine ≥ 4.5:1) |
| Yükleniyor | İskelet satırlar (liste), detayda iskelet bloklar | Yerleşim zıplamasın diye satır yüksekliği korunur; `aria-busy` |
| Boş | `references/recipe-empty-state.md`: neden boş + ilk eylem [İlk görevi ekle] | Filtre kaynaklıysa "Bu filtreyle sonuç yok" + [Filtreyi temizle] |
| Hata | `references/recipe-error.md`: liste yüklenemedi + [Tekrar dene] + [Ana sayfa] | Bölgesel hata tüm sayfayı kırmaz; detay yüklenemezse yalnız detay hata durumuna geçer |
| Başarı | Silme sonrası toast: "Görev silindi" + [Geri al] (5-10 s) | Satır listeden çıkar; geri alınca eski konumda döner |
| Devre dışı | Toplu işlem düğmeleri seçim yokken devre dışı | `disabled` + neden ("Önce öğe seçin"); seçiliyken "3 seçili" görünür |

## 4. Etkileşim kuralları

- **Satır tıklaması:** tüm satır tıklanabilir, ≥ 44 px yükseklik; satırın tek etkileşim öğesi bir bağlantı/düğmedir (iç içe tıklama yok).
- **Seçili durum:** seçili satır renk + işaret + `aria-current="true"` ile bildirilir; çoklu seçim gerekiyorsa liste `role="listbox"`, satırlar `role="option"` + `aria-selected` taşır (masaüstünde).
- **Arama/filtre:** durum görünür ("3 filtre etkin", [Temizle]); URL'de korunur (paylaşılabilir, geri dönüşte kaybolmaz) (H1, H7).
- **Uzun liste:** sayfalama ya da "Daha fazla yükle"; sonsuz kaydırma yalnız altbilgiye erişim korunuyorsa (klavye kullanıcısı).
- **Geri dönüş:** detaydan listeye dönünce liste konumu, filtre ve kaydırma yeri korunur (H3, H6).
- **Silme:** tercihen anında sil + [Geri al] toast'u; onay gerekiyorsa onay düğmesi eylemi adlandırır ("Görevi sil", "Evet" değil) (H3, SC 3.3.4).
- **Odak taşıma:** liste içi gezinme ok tuşlarıyla (roving tabindex); detay açılınca odak detay `h2`'ye; kapatınca oda gelen satıra döner.
- **Kaydedilmemiş değişiklik:** detayda düzenlenmiş veri varsa liste satırına dönerken uyarı.
- **Klavye:** satırda `Enter`/`Space` detayı açar; `Esc` detayı kapatır ve odağı geri verir.

## 5. Erişilebilirlik notları

- **Landmark:** liste `main` içinde, `section`/`ul`; masaüstü iki bölge `region` rolüyle etiketlenir (`aria-labelledby`).
- **Başlık yapısı:** `h1` ekran başlığı; detay başlığı `h2`; başlık sırası atlanmaz (SC 1.3.1, 2.4.6).
- **ARIA:** liste `<ul>`/`<li>`; satır bağlantısı `<a>` ya da `<button>`. Seçili durum `aria-current="true"` ile bildirilir; çoklu seçim gerekiyorsa liste `role="listbox"`, satırlar `role="option"` + `aria-selected` taşır. Sıralama/gezinme için ok tuşu yönetimi (SC 4.1.2).
- **Odak yönetimi:** odak görünür; detay açılıp kapandığında odak anlamlı yere döner (SC 2.4.3, 2.4.7).
- **Canlı bölge:** sonuç sayısı değişince (`aria-live="polite"`): "12 görev bulundu"; silme geri-al toast'u `role="status"` (SC 4.1.3).
- **Kontrast:** ikincil (soluk) metin yine ≥ 4.5:1; seçili satır renk dışında işaret de taşır (SC 1.4.3, 1.4.1).
- **Hedef boyut:** satır ve düğmeler ≥ 44 × 44 px; komşu hedefler arası ≥ 8 px (SC 2.5.5).
- **Reflow:** 320 px'de liste tek sütun; tablo yatay kaydırması gerekirse tablo hariç (SC 1.4.10).

## 6. Sık yapılan hatalar

1. **Satır içinde birden çok tıklanabilir alan (satır + iç düğme).** Neden zararlı: yanlış hedefe tıklama, dokunmada yanlış eylem; H5 ve hedef boyutu ihlali. Doğrusu: tüm satır tek bağlantı; eylemler detayda ya da ayrı menüde.
2. **Filtre/arama durumunu URL'de tutmamak.** Neden zararlı: geri tuşuyla dönüşte filtre kaybolur, kullanıcı işi baştan yapar (H3, H7). Doğrusu: durumu URL parametrelerinde sakla.
3. **Detaydan dönüşte liste konumunu sıfırlamak.** Neden zararlı: kullanıcı kaydırma yerini kaybeder, H6 tanımayı bozar. Doğrusu: konum, kaydırma ve filtre korunur.
4. **Silmede onay diyaloğu zorunlu kılmak (geri al yokken).** Neden zararlı: her silmede ek sürtünme; yanlış onayda telafi yok (H3). Doğrusu: anında sil + [Geri al], ya da onay + geri al.
5. **Sonsuz kaydırmada altbilgiye erişimi engellemek.** Neden zararlı: klavye/ekran okuyucu kullanıcısı sayfa sonuna ulaşamaz. Doğrusu: sayfalama ya da "Daha fazla yükle" düğmesi.
6. **Seçili satırı yalnız renkle belirtmek.** Neden zararlı: SC 1.4.1 ihlali. Doğrusu: renk + işaret/kenarlık + programatik durum.
7. **İkincil bilgiyi 4.5:1 altında soluk yazmak.** Neden zararlı: okunamaz, SC 1.4.3 ihlali. Doğrusu: soluk ton yine eşiği geçer.

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Başlık | Görevler | Tasks |
| Birincil düğme | Yeni görev | New task |
| Detay eylemi | Düzenle | Edit |
| Yıkıcı eylem | Görevi sil | Delete task |
| Arama yer tutucu | Görev ara | Search tasks |
| Filtre düğmesi | Filtrele | Filter |
| Filtre durumu | 3 filtre etkin | 3 filters active |
| Filtre temizle | Temizle | Clear filters |
| Boş durum (filtre) | Bu filtreyle sonuç yok. | No results for this filter. |
| Silme geri al | Görev silindi. | Task deleted. |
| Geri al düğmesi | Geri al | Undo |
| Sonuç sayısı | 12 görev bulundu | 12 tasks found |
| Devre dışı toplu işlem | Önce öğe seçin | Select items first |

Tarih biçimi: TR `1 Ekim 2026`, EN `Oct 1, 2026`.

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] Her satır tek bir etkileşim öğesi; satır yüksekliği ≥ 44 px.
- [ ] Arama ve filtre durumu görünür ve URL'de korunuyor; [Temizle] çalışıyor.
- [ ] Detaydan dönüşte liste konumu ve filtre bozulmuyor.
- [ ] Silme sonrası [Geri al] toast'u 5-10 s görünüyor ve geri alınabiliyor.
- [ ] Yükleniyor (iskelet), boş (filtre dahil) ve hata durumları gerçekten kodlanmış.
- [ ] Seçili satır renk dışında işaret ve programatik durumla belirtiliyor.
- [ ] Klavyeyle liste gezinme, detay açma (`Enter`) ve kapatma (`Esc`) çalışıyor; odak geri dönüyor.
- [ ] 320 px'de yatay kaydırma yok; sayfalama/ürün yükleme ile altbilgiye erişim var.
