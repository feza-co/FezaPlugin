# Ekran Kalıpları (İndeks)

Sık kullanılan ekran tipleri için ayrı ayrı ekran tarifleri. Her tarif tek bir dosyada; hepsi aynı 8 bölümlü şablonu izler (amaç, ASCII yerleşim, zorunlu durumlar, etkileşim kuralları, erişilebilirlik notları, sık hatalar, örnek mikro metinler, kabul kontrolleri). Kalıp bir başlangıç noktasıdır; görev modeli farklı bir yapı gerektiriyorsa sapma gerekçesiyle rationale'e yazılır.

Kaynaklar: Nielsen (1994), ISO 9241-110:2020, WCAG 2.1, Dix et al. (2004), Miller (1956), Hick (1952), Gestalt algı ilkeleri.

Kullanım: ekran envanterindeki her ekran için uygun tarifi seç, dosyayı aç ve bölüm 3'teki zorunlu durumları gerçekten kodla (yalnız mutlu yol değil). Birden çok kalıp üst üste binerse (ör. liste içinde boş durum ve hata) ilgili tarifler birlikte uygulanır.

## 1. Tarif Dizini

| Kalıp | Dosya | Ne zaman |
|-------|-------|----------|
| Onboarding (ilk kullanım) | `references/recipe-onboarding.md` | Ürün ilk açıldığında; 1-4 adımda tek fayda anlatılan tanıtım akışı |
| Form (veri girişi) | `references/recipe-form.md` | Kayıt oluşturma, profil düzenleme, ayar formu; ≤ 7 alanlı tek ekran giriş |
| Liste / Detay | `references/recipe-list-detail.md` | Çok sayıda kaydı tarayıp birinde işlem yapma; mobilde tam ekran, masaüstünde iki bölge |
| Dashboard (özet ekran) | `references/recipe-data-dashboard.md` | 3-5 anahtar gösterge ve "dikkat gerekenler"in bir karara bağlandığı özet ekran |
| Boş Durum | `references/recipe-empty-state.md` | Liste/panel/arama sonucu boş olduğunda; neden boş + ilk eylem |
| Hata Ekranı ve Hata Durumu | `references/recipe-error.md` | Ağ/sunucu/bulunamadı hatalarında; tam sayfa ya da bölgesel hata |
| Kimlik Doğrulama (giriş/kayıt) | `references/recipe-auth.md` | Oturum açma, kayıt olma, parola sıfırlama; kimlik akışları |
| Ödeme (checkout) | `references/recipe-checkout.md` | Sepet onayı, adres/ödeme girişi, sipariş gönderimi; geri dönüşsüz işlem |
| Ayarlar | `references/recipe-settings.md` | Kullanıcı/uygulama tercihleri; bölümlere ayrılmış ayar grupları |
| Arama ve Filtre | `references/recipe-search-filter.md` | Sorgu girme, filtre uygulama, sonuç listeleme; durumun URL'de korunması |
| Mobil Navigasyon | `references/recipe-mobile-nav.md` | Küçük ekran navigasyon modeli; alt sekme çubuğu ya da başlık menüsü |

### Uygun tarif yoksa

En yakın kalıbı seç ve uyarlamayı açıkça kaydet: `DESIGN_RATIONALE` varsayımlarına `Varsayım: <ekran> için <tarif> uyarlandı` yaz. Hangi bölümlerin sapması gerektiğini (zorunlu durumlar, etkileşim) tek cümleyle gerekçelendir.

## 2. Ekranlar Arası Ortak Kurallar

| Kural | Gerekçe |
|-------|---------|
| Aynı başlık/navigasyon/altbilgi yapısı her ekranda | WCAG 3.2.3, H4 |
| Ekran başına tek `h1`, birincil eylem tek | H8 |
| Durum mesajları için tek bildirim bileşeni ve tek canlı bölge | H4, WCAG 4.1.3 |
| Mikro metin: fiil ile başlayan düğme etiketleri ("Kaydet", "Görevi sil"); "Tamam/Evet" yerine sonucu söyleyen etiket | H2, H6 |
| Logo, illüstrasyon ve marka görselleri işaretli placeholder; gerçek varlık sağlanınca değiştirilir | Kapsam sınırı |
