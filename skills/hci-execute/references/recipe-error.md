# Tarif: Hata Ekranı ve Hata Durumu

> Kalıp kimliği: `recipe-error` · İlgili ilkeler: Nielsen H2, H3, H9 · WCAG SC 2.4.2, 3.3.1, 3.3.3, 4.1.3 · ISO 9241-110 hata sağlamlığı, kurtarılabilirlik

## 1. Amaç ve ne zaman kullanılır

Bir işlem başarısız olduğunda (ağ hatası, sunucu hatası, bulunamadı, yetki yok, doğrulama hatası) kullanıcıya ne olduğunu, nedenini ve ne yapabileceğini anlatan durum. Amaç kullanıcıyı suçlamadan kurtarmak (H9, Dix recoverability).

Kullan:
- Tam sayfa hata: istenen kaynak yüklenemedi (ağ/kimlik/veri).
- Bölgesel hata: tek bir bileşen/panel yüklenemedi, sayfanın geri kalanı çalışıyor.
- 404/bulunamadı: istenen kayıt ya da yol yok.

Kullanma:
- Doğrulama hatası (form alanı) → `references/recipe-form.md` alan içi mesajı; bu tarif yalnız sayfa/bölge düzeyi hatalar içindir.
- Boş sonuç → `references/recipe-empty-state.md`; hata ile boşluk karıştırılmaz.

## 2. ASCII yerleşim

### Mobil (360 px)

```text
+--------------------------------+
| ! Bağlantı kurulamadı          |
| Görevler yüklenemedi. İnternet |
| bağlantınızı kontrol edip      |
| tekrar deneyin. Girdiğiniz     |
| veriler kaybolmadı.            |
|                                |
| [Tekrar dene]  [Ana sayfa]     |
|                                |
| Hata kodu: NET-01              |
| (destek için)                  |
+--------------------------------+
```

Dinamik hata (sayfa içi, `role="alert"`):

```text
+--------------------------------+
| ! Liste güncellenemedi.        |
| Bağlantınızı kontrol edip      |
| tekrar deneyin.  [Tekrar dene] |
+--------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+----------------------------------------------------------------------+
|                                                                      |
|                     ! Bağlantı kurulamadı                            |
|                                                                      |
|           Görevler yüklenemedi. İnternet bağlantınızı                |
|           kontrol edip tekrar deneyin. Girdiğiniz                    |
|           veriler kaybolmadı.                                        |
|                                                                      |
|                 [Tekrar dene]        [Ana sayfa]                     |
|                                                                      |
|           Hata kodu: NET-01 (destek için)                            |
+----------------------------------------------------------------------+
```

Tam sayfa hata içeriği ortalanır; teknik kod ikincil (soluk, küçük) ve destek için ayrı satırda. Bölgesel hata, sayfa yerleşimini bozmadan ilgili panelin içinde kalır.

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|-----------|
| Varsayılan | Hata başlığı, üç parçalı mesaj, [Tekrar dene] + çıkış eylemi, hata kodu | Başlık `h1` (tam sayfa); mesaj: ne + neden + ne yapılabilir |
| Yükleniyor | [Tekrar dene] düğmesi meşgul: spinner + "Deneniyor…" | `aria-busy="true"`; çift deneme engelli |
| Boş | Uygulanmaz — hata durumu boş durum değildir; içerik yoksa `references/recipe-empty-state.md` gösterilir | Boş ve hata mesajı birlikte görünmez |
| Hata | Bu tarifin öznesi; dinamik hata `role="alert"`, tam sayfa `h1` + anlamlı `title` | Bölgesel hata tüm sayfayı kırmaz (Dix robustness) |
| Başarı | Yeniden deneme başarılıysa hata durumu kaybolur, içerik görünür; `role="status"` ile "Yeniden bağlandı" | Başarıda yeni sayfa yüklenmez, yerinde geçiş yapılır |
| Devre dışı | [Tekrar dene] yinelenen başarısızlıkta kısa süre devre dışı + bekleme ipucu | Art arda sınırsız deneme engellenir; `disabled` + "30 sn sonra tekrar denenebilir" |

## 4. Etkileşim kuralları

- **Mesaj yapısı:** ne oldu + neden (biliniyorsa) + ne yapılabilir. Teknik yığın izi kullanıcıya gösterilmez.
- **Kurtarma:** en az bir kurtarma eylemi ([Tekrar dene]) + bir çıkış ([Ana sayfa]/[Geri]) (H3).
- **Tekrar deneme:** otomatik sınırsız yeniden deneme yok; kullanıcı tetikler ya da geri sayımlı sınırlı deneme (H3, kontrol).
- **Veri güvencesi:** girdi/veri kaybı yoksa bunu açıkça yaz ("Girdiğiniz veriler kaybolmadı") — güven için.
- **Bölgesel hata:** yalnız ilgili bileşen hata durumuna geçer; sayfanın geri kalanı kullanılabilir kalır.
- **Odak taşıma:** tam sayfa hatada odak hata `h1`'ine; dinamik hatada odak taşınmaz, canlı bölge duyurur.
- **Onay gerektiren eylem:** hata sayfasında yıkıcı eylem (ör. "Verileri sıfırla") varsa onay istenir; onay düğmesi eylemi adlandırır.
- **404:** aranan şey bulunamadı + arama alanı + [Ana sayfa] bağlantısı (H3, H10).
- **Klavye:** `Esc` çıkış eylemine değil, bağlama göre kapatmaya (bölgesel hata); tam sayfada yalnız iki eylem, sekme sırası basit.

## 5. Erişilebilirlik notları

- **Landmark:** tam sayfa hata `main` içinde; bölgesel hata ait olduğu `region` içinde kalır.
- **Başlık yapısı:** tam sayfa hata `h1` ve anlamlı sayfa `title`; bölgesel hata `h2` (SC 2.4.2, 1.3.1).
- **ARIA:** dinamik hata `role="alert"` (acil, kesintili duyuru); tam sayfa hata yerel başlık yapısıyla. Tek canlı bölge kullan (H4).
- **Odak yönetimi:** tam sayfa hatada odak `h1`'e (`tabindex="-1"`); bölgesel hata odağı çalmaz, `role="alert"` duyurur (SC 2.4.3, 4.1.3).
- **Renk:** hata yalnız kırmızıyla değil, "!" ikonu + "Hata:"/"Bağlantı kurulamadı" metniyle de iletilir (SC 1.4.1).
- **Kontrast:** hata metni ve teknik kod okunur kontrastta; kod ikincil ton yine ≥ 4.5:1 (SC 1.4.3).
- **Hedef boyut:** [Tekrar dene] ve çıkış eylemi ≥ 44 × 44 px (SC 2.5.5).
- **Kod dili:** "Error 500" tek başına anlam taşımaz; kullanıcı dilinde mesaj + ikincil teknik kod (H2).

## 6. Sık yapılan hatalar

1. **Teknik hata kodunu tek başına göstermek ("Error 500").** Neden zararlı: kullanıcı ne olduğunu ve ne yapacağını anlamaz (H2, H9). Doğrusu: kullanıcı dilinde üç parçalı mesaj + kod ikincil.
2. **Kullanıcıyı suçlayan dil ("Geçersiz giriş yaptınız").** Neden zararlı: güveni zedeler, hatanın nedenini ve çözümünü söylemez (H9). Doğrusu: ne + neden + nasıl düzeltilir.
3. **Kurtarma eylemi sunmamak.** Neden zararlı: kullanıcı çıkmazda kalır (H3, Dix recoverability). Doğrusu: [Tekrar dene] + çıkış eylemi.
4. **Bölgesel bir hatayı tüm sayfayı kaplayan hata yapmak.** Neden zararlı: çalışan bölümleri de devre dışı bırakır (Dix robustness). Doğrusu: yalnız ilgili bileşen hata durumuna geçer.
5. **Sınırsız otomatik yeniden deneme.** Neden zararlı: sunucuyu yorar, kullanıcıya yükleniyor yanılsaması verir, kontrolü elinden alır (H3). Doğrusu: kullanıcı tetikler ya da sınırlı deneme.
6. **Veri kaybı olduğunu gizlemek ya da yanlış biçimde "kaybolmadı" demek.** Neden zararlı: güveni yıkar. Doğrusu: yalnız gerçekten korunuyorsa belirt.
7. **Dinamik hatayı `role="alert"` olmadan göstermek.** Neden zararlı: ekran okuyucu kullanıcısı hatayı fark etmez (SC 4.1.3). Doğrusu: acil hata `role="alert"`, nazik durum `role="status"`.

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| Başlık (ağ) | Bağlantı kurulamadı | Could not connect |
| Gövde (ağ) | Görevler yüklenemedi. İnternet bağlantınızı kontrol edip tekrar deneyin. Girdiğiniz veriler kaybolmadı. | Tasks could not be loaded. Check your internet connection and try again. Your input was not lost. |
| Birincil düğme | Tekrar dene | Try again |
| İkincil düğme | Ana sayfa | Go to home |
| Yükleniyor metni | Deneniyor… | Retrying… |
| Başlık (404) | Sayfa bulunamadı | Page not found |
| Gövde (404) | Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. | The page you are looking for may have been moved or removed. |
| Arama ipucu (404) | Aradığınızı yazın | Search for what you need |
| Bölgesel hata | Liste güncellenemedi. Bağlantınızı kontrol edip tekrar deneyin. | The list could not be updated. Check your connection and try again. |
| Başarı (yeniden bağlandı) | Yeniden bağlandı. | Reconnected. |
| Teknik kod | Hata kodu: NET-01 (destek için) | Error code: NET-01 (for support) |
| Sınırlı deneme | 30 saniye sonra tekrar deneyebilirsiniz. | You can try again in 30 seconds. |

Tarih biçimi: TR `1 Ekim 2026`, EN `Oct 1, 2026`.

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] Her hata mesajı ne oldu + neden + ne yapılabilir üçlüsünü içeriyor; suçlayıcı dil yok.
- [ ] Her hatada en az bir kurtarma ([Tekrar dene]) ve bir çıkış eylemi var.
- [ ] Tam sayfa hata `h1` ve anlamlı `title`; dinamik hata `role="alert"` ile duyuruluyor.
- [ ] Bölgesel hata yalnız ilgili bileşeni etkiliyor; sayfanın kalanı kullanılabilir.
- [ ] Teknik hata kodu ikincil konumda ve kullanıcı dilindeki mesajın yerini almıyor.
- [ ] Hata durumu boş durumla karıştırılmıyor; ikisi aynı anda görünmüyor.
- [ ] Veri korunduğu bilgisi yalnız gerçekten doğruysa gösteriliyor.
- [ ] [Tekrar dene] düğmesi meşgul ve sınırlı deneme durumlarını yönetiyor; çift deneme engelli.
