# Tarif: Mobil Alt Menü (alt sekme çubuğu)

> Kalıp kimliği: `recipe-mobile-nav` · İlgili ilkeler: Nielsen H1, H4, H5, H6; WCAG 2.1 SC 1.3.1, 1.4.1, 1.4.10, 2.4.1, 2.4.3, 4.1.2; WCAG 2.2 SC 2.4.11; ISO 9241-110 (tutarlılık, kontrol edilebilirlik)

## 1. Amaç ve ne zaman kullanılır

Mobil cihazlarda birincil gezinmeyi ekranın altına sabitleyen sekme çubuğu ile sekmeler ve geri davranışını tanımlar. Amaç, başparmak erişim alanında (Fitts) en fazla 5 hedef sunmak ve kullanıcının nerede olduğunu (H1) her ekranda tutarlı biçimde göstermektir (H4).

Kullanılır: 3-5 üst düzey bölümü olan mobil öncelikli uygulamalar. Alt çubuk ana gezinme; içerik içi ikincil gezinme (sekmeler) içerik başlığının altında ayrı tutulur. Etkin sekme daima metin + ikon + `aria-current="page"` ile üçlü olarak belirtilir (SC 1.4.1, 4.1.2).

## 2. ASCII yerleşim

### Mobil (360 px)

Alt çubuk (aktif sekme: Ana):
```text
+--------------------------------+
| [Logo]            Profil ☰     |
+--------------------------------+
|                                |
|        İçerik alanı            |
|                                |
+--------------------------------+
| Ana   Ara   Ekle   Bildirimler |
|  ●     ○      ○          ○     |
+--------------------------------+
```

İçerik içi sekmeler (üst sekme):
```text
+------------------------------------+
| <h1> Bildirimler                   |
| [Tümü] [Okunmadı] [Arşiv]          | <- etkin: Okunmadı
|------------------------------------|
| ...                                |
+------------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+--------------------------------------------------------------------+
| [Logo]  Ana  Ara  Ekle  Bildirimler  Profil   |  arama             |
+--------------------------------------------------------------------+
|                                                                    |
|          İçerik alanı                                              |
+--------------------------------------------------------------------+
```

Masaüstünde alt çubuk kaldırılır; aynı 5 hedef üst gezinmeye dönüşür. Etiketler ve sıra korunur (H4, SC 3.2.3).

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | 3-5 hedef, ikon + metin, etkin sekme işaretli | Etkin sekme metin + ikon + `aria-current="page"` |
| Yükleniyor | Sekme hedefleri sabit; içerik iskelesi yüklenir | Gezinme hiç bloklanmaz; kullanıcı sekmeler arası geçebilir (H1) |
| Boş | Sekme hedefi içeriği boşsa `references/recipe-empty-state.md` boş durumu | Alt çubuk boş durumda da görünür kalır |
| Hata | İçerik hatası bölgesel; alt çubuk çalışır kalır | Gezinme hatadan etkilenmez (Dix: robustness) |
| Başarı | Sekme geçişinde başlık ve içerik güncellenir; `title` değişir | Aktif işaret anında güncellenir (H1) |
| Devre dışı | Yetkisiz sekme varsa görünür ama devre dışı + neden ipucu | Gizlemek yerine devre dışı bırak; neden metinle (H9) |

## 4. Etkileşim kuralları

- **Sekme sayısı:** 3-5 hedef; daha fazlası "Daha fazla" altına toplanır (Miller, C2). Etiketler kısa ve tutarlı.
- **Geri davranışı:** Geri tuşu/bağlantısı aynı sekme içinde önceki ekrana, sekme kökündeyse önceki sekmeye döner; çıkış onayı istenmez (H3).
- **Sekme durumu korunur:** Sekme değişince her sekmenin kaydırma konumu ve iç durumu korunur; geri dönünce kayıp olmaz (H3, H6).
- **Odak taşıma:** Sekme geçişinde odak yeni bölümün `h1`'ine taşınır; canlı bölge yeni bölüm adını duyurur (SC 2.4.3, 4.1.3).
- **Onay gerektiren eylem:** Yoktur; gezinme geri alınabilir.
- **Kaydedilmemiş değişiklik:** Bir sekmede kaydedilmemiş form varsa sekme değişiminde uyarı gösterilir (H3).
- **Klavye:** Gerçek sekme kalıbı kullanılıyorsa `Tab` çubuğa, `←/→` sekmeler arası, `Enter/Space` seçer (SC 2.1.1).
- **Yapışkan çubuk:** Alt çubuk `position: sticky/fixed`; içeriğin alt kısmı çubuk altında gizlenmez (güvenli alan boşluğu) (SC 2.4.11).

## 5. Erişilebilirlik notları

- **Landmark'lar:** Alt çubuk `nav` + `aria-label="Ana gezinme"`; header'daki profil menüsü ayrı `nav`/menü. İçerik `main` (SC 1.3.1).
- **Başlık yapısı:** Ekran başına tek `h1`; içerik içi sekmeler yeni `h1` değil, bölüm `h2`'leri.
- **ARIA:** Gerçek sekme kalıbı için `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, `aria-controls`; ya da bağlantı listesi (`nav > ul > li > a`). Etkin öğe `aria-current="page"` (SC 4.1.2).
- **Odak yönetimi:** Sekme geçişinde odak başlığa; yapışkan çubuk odağı gizlemez (`scroll-margin`) (SC 2.4.11).
- **Canlı bölge:** Sekme değişiminde yeni bölüm adı `role="status"` (kibar) ile duyurulur (SC 4.1.3).
- **Kontrast ve durum:** Etkin sekme renk + kalın ağırlık + dolu ikon + `aria-current`; yalnız renkle ayrım yok (SC 1.4.1).
- **Reflow:** 320 px'de 5 etiket sığmıyorsa etiketler kısalır, hedefler ≥ 44 px kalır; yatay kaydırma yok (SC 1.4.10, 2.5.5).
- **Dokunma hedefi:** Her sekme ≥ 44 × 44 px; komşu hedefler arası ≥ 8 px.

## 6. Sık yapılan hatalar

1. **Etkin sekmeyi yalnız renkle göstermek** → Renk körü kullanıcı ve ekran okuyucu aktif sekmeyi bilemez → Metin + ikon + `aria-current="page"` (SC 1.4.1, 4.1.2).
2. **5'ten fazla hedef koymak** → Etiketler sığmaz, bilişsel yük ve yanlış dokunma artar → 3-5 hedef; fazlası ikincil menüye (Miller, C2).
3. **Sekme geçişinde kaydırma konumunun kaybolması** → Kullanıcı listede kaldığı yeri bulamaz → Her sekmenin konumu korunur (H3).
4. **Etiketsiz yalnız ikon sekme** → Anlam belirsiz, tanıma zorlaşır → Her sekmede görünür metin etiketi (H6).
5. **Yapışkan alt çubuğun son içeriği örtmesi** → Kullanıcı alttaki öğeye erişemez → İçerik altına çubuk yüksekliği kadar güvenli boşluk (SC 2.4.11).
6. **Sekme geçişinde odağın gereksiz yere sayfa başına taşınması** → Sekme değişince odak nerede belirsiz kalır → Odak yeni başlığa, kaydırma konumu korunarak (SC 2.4.3).
7. **Sekmenin sayfa yeniden yükleyerek durum kaybetmesi** → Kaydedilmemiş form veya filtre silinir → SPA geçişi ya da durum koruması; `beforeunload` uyarısı (H3).
8. **Masaüstünde alt çubuğun gereksiz kalması / farklı sıralama** → Tutarlılık bozulur → Aynı hedefler üst gezinmeye taşınır, sıra korunur (H4, SC 3.2.3).
9. **Geri davranışının sekme geçmişini atlayıp uygulamadan çıkarması** → Kullanıcı yanlışlıkla uygulamadan çıkar → Geri önce sekme içi, sonra sekme kökü sırasına uyar (H3).

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Sekme etiketi | Ana | Home |
| Sekme etiketi | Bildirimler | Alerts |
| Sekme etiketi | Profil | Profile |
| Gezinme erişilebilir adı | Ana gezinme | Main navigation |
| İçerik içi sekme | Okunmadı | Unread |
| Devre dışı sekme ipucu | Bu bölüm için yetkiniz yok. | You do not have access to this section. |
| Kaydedilmemiş değişiklik uyarısı | Kaydedilmemiş değişiklikler var. Ayrılmak istiyor musunuz? | You have unsaved changes. Leave anyway? |
| Yükleniyor | Bölüm yükleniyor… | Loading section… |
| Başarı (bölüm değişimi) | Bildirimler bölümündesiniz. | You are in the Alerts section. |
| Boş durum | Bu bölümde henüz içerik yok. | There is no content in this section yet. |
| Hata | Bu bölüm yüklenemedi. Tekrar deneyin. | This section could not load. Try again. |

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] Alt çubukta 3-5 hedef var; her hedefte görünür metin etiketi ve ikon bulunuyor.
- [ ] Etkin sekme metin + ikon + `aria-current="page"` ile üçlü olarak belirtiliyor.
- [ ] Sekme geçişinde kaydırma konumu ve iç durum korunuyor.
- [ ] Alt çubuk `nav` + erişilebilir ad ile işaretli; içerik altında çubuğu örtmeyen boşluk var.
- [ ] Geri davranışı önce sekme içi, sonra sekme kökü sırasına uyuyor; çıkış onayı istemiyor.
- [ ] 320 px'de hedefler ≥ 44 px ve yatay kaydırma yok; masaüstünde aynı hedefler üst gezinmede, sıra korunuyor.
- [ ] Sekme geçişi `Esc`/klavye ile çalışıyor; odak yapışkan çubuk altında gizlenmiyor.
