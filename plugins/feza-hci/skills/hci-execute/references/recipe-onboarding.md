# Tarif: Onboarding (ilk kullanım)

> Kalıp kimliği: `recipe-onboarding` · İlgili ilkeler: Nielsen H1, H3, H8, H10 · WCAG SC 1.4.1, 2.2.2, 4.1.3 · ISO 9241-110 kontrol edilebilirlik, kendini açıklayıcılık

## 1. Amaç ve ne zaman kullanılır

Ürünün ilk açılışında ya da köklü bir özellik eklenişinde, kullanıcıya **tek seferde tek fayda** anlatan kısa akış. Amaç ürünü tanıtmak değil, kullanıcıyı ilk değerli göreve en kısa yoldan ulaştırmaktır (H8 minimalist tasarım, ISO 9241-110 görev uygunluğu).

Kullan:
- Ürün ilk kez açıldığında ve ana görev, kullanıcı arayüzü görmeden yapılamıyorsa.
- Yeni ve alışılmadık bir etkileşim modeli tanıtılacaksa (ör. sürükle-bırak, çok adımlı düzenleme).

Kullanma:
- Kullanıcı ürünü zaten kullanıyorsa (her açılışta tekrar gösterme).
- İçerik Yardım dokümanına girecek kadar ayrıntılıysa (bağlamsal ipucu + boş durum daha iyi).
- Kayıt ya da izin istemek için gerekçe olarak kullanılıyorsa (izin, değer gösterildikten **sonra** istenir).

Karar: kaç adım olacağı ve tema/marka kısıtı tasarım kararıdır — belirsizse şefe sor.

## 2. ASCII yerleşim

### Mobil (360 px)

```text
+--------------------------------+
| [Logo placeholder]      [Atla] |
+--------------------------------+
|  Adım 1 / 3                    |
|  ● ○ ○                         |
|                                |
|  [illüstrasyon, alt=""]        |
|                                |
|  Görevlerinizi tek yerde       |
|  toplayın                      |
|  1-2 cümle: ne yapar, ne işe   |
|  yarar. Tek fayda.             |
|                                |
|                                |
| [Geri]              [Devam]    |
+--------------------------------+
```

### Masaüstü (≥ 1024 px)

```text
+----------------------------------------------------------------------+
| [Logo placeholder]                                         [Atla]    |
+----------------------------------------------------------------------+
|                       |                                              |
|  [illüstrasyon, alt=""]|  Adım 1 / 3                                |
|                       |  ● ○ ○                                       |
|                       |                                              |
|                       |  Görevlerinizi tek yerde toplayın            |
|                       |  1-2 cümle: ne yapar, ne işe yarar.          |
|                       |  Tek fayda.                                  |
|                       |                                              |
|                       |                                              |
|                       |                         [Geri]     [Devam]   |
+----------------------------------------------------------------------+
```

Mobilde görsel üstte, metin altta tek sütun. Masaüstünde görsel solda (kolon ~%45), metin ve eylemler sağda; okuma sırası soldan sağa korunur (SC 1.3.2).

## 3. Zorunlu durumlar

| Durum | Ne görünür | Uygulama notu |
|-------|------------|---------------|
| Varsayılan | Adım başlığı, "Adım n / N", görsel ilerleme, [Geri]/[Devam], [Atla] | `h1` her adımda değişir; odak yeni başlığa taşınır |
| Yükleniyor | Son adımın [Devam] düğmesi meşgul: spinner + "Hazırlanıyor…" | `aria-busy="true"`, çift tıklama engelli; iskelet gerekmez (içerik statik) |
| Boş | Uygulanmaz — onboarding adımı her zaman bir fayda metni ve görsel taşır; içerik yoksa adım hiç üretilmez | Adım listesi boşsa akış doğrudan ana ekrana gider |
| Hata | Son adımda kurulum/adım kaydı başarısızsa satır içi hata + [Tekrar dene] | `role="alert"`; metin: ne oldu + nasıl düzeltilir; [Atla] görünür kalır |
| Başarı | Son adım tamamlanınca akış kapanır, hedef ekran açılır ve toast: "Kurulum tamamlandı" | `role="status"`, 5-10 s; onboarding bir daha otomatik açılmaz |
| Devre dışı | [Geri] ilk adımda devre dışı | `disabled` + nedeni görünür (ilk adımda geri dönülecek yer yok); [Devam] hiçbir adımda devre dışı kalmaz |

## 4. Etkileşim kuralları

- **Adım sayısı:** en fazla 3-4; her adım tek fayda. Daha fazlası gerekiyorsa akış bölünür ya da içerik Yardım'a taşınır (Miller; H8).
- **İlerleme:** hem "Adım n / N" metni hem görsel işaretçi; ilerleme yalnız noktalarla anlatılmaz (SC 1.4.1).
- **Atla:** her adımda görünür ve erişilebilir; atlama onboarding'i "tamamlandı" sayar, bir daha otomatik açılmaz.
- **Geri:** ilk adım dışında her adımda; geri dönünce girilen seçim/veri korunur.
- **Otomatik ilerleme yok:** karusel ya da zamanlayıcıyla kendi kendine geçiş yok (SC 2.2.2, kontrol edilebilirlik).
- **Odak taşıma:** adım değişince odak yeni `h1`'e (ya da akış bölgesinin başına) taşınır; canlı bölge "Adım n: <başlık>" duyurur.
- **Yıkıcı/geri dönüşsüz eylem yok:** onboarding yalnız bilgilendirir; izin isteme son adımda, fayda gösterildikten sonra.
- **Kaydedilmemiş değişiklik:** onboarding sonlandırılırsa seçimler kaydedilmiş kabul edilir; "kaydedilmemiş değişiklik" uyarısı yoktur.
- **Yeniden açma:** Yardım menüsünden (H10) yeniden başlatılabilir; bu, tamamlandı bayrağını değiştirmez.
- **Klavye:** `Tab` sırası başlık → içerik → [Geri] → [Devam]; `Enter` birincil eylemi tetikler; `Esc` akışı atlar.

## 5. Erişilebilirlik notları

- **Landmark:** akış tek `main` içinde, her adım için bir `<section>`; başlık hiyerarşisi atlanmaz (tek `h1`).
- **Başlık yapısı:** her adımın `h1`'i kısa ve adımı adlandırır ("Görevleriniz tek yerde"); başlık adı mikro metin ile aynıdır (SC 2.4.6).
- **ARIA:** yerel öğe önce — düğmeler `<button>`, ilerleme `<ol>` + `aria-current="step"`. Nokta göstergesi dekoratifse `aria-hidden="true"`; bilgi metinle de verilir (SC 1.4.1).
- **Odak yönetimi:** adım geçişinde odak `h1`'e taşınır; `tabindex="-1"` başlık; odak görünür kalır (SC 2.4.3, 2.4.7).
- **Canlı bölge:** adım değişimi `aria-live="polite"` ile duyurulur; hata `role="alert"` (SC 4.1.3).
- **Görseller:** illüstrasyon süs ise `alt=""`; anlam taşıyorsa `alt` metni başlığı tekrarlamaz, ekler (SC 1.1.1).
- **Hareket:** geçiş animasyonu 200-300 ms, `prefers-reduced-motion` altında anlık (SC 2.3.3).
- **Yeniden boyutlandırma:** %200 yakınlaştırmada metin kırpılmaz, yatay kaydırma çıkmaz (SC 1.4.4, 1.4.10).

## 6. Sık yapılan hatalar

1. **Onboarding'i her açılışta tekrar göstermek.** Neden zararlı: kullanıcıyı her seferinde engeller, H3 kontrol ilkesini çiğner. Doğrusu: "tamamlandı/atlandı" bayrağı sakla; yalnız Yardım'dan yeniden aç.
2. **Otomatik ilerleyen karusel.** Neden zararlı: okuma hızını kullanıcı belirleyemez, SC 2.2.2 ihlali; yavaş okuyan ve ekran okuyucu kullanan kişi yetişemez. Doğrusu: yalnız [Devam]/[Geri] ile ilerleme.
3. **İlerlemeyi sadece noktalarla göstermek.** Neden zararlı: kaç adım kaldığı belirsiz, renk körü kullanıcı için ayırt edilemez (SC 1.4.1). Doğrusu: "Adım n / N" metni + noktalar birlikte.
4. **"Atla"yı gizlemek ya da yalnız ilk adımda göstermek.** Neden zararlı: kullanıcı kontrolünü elinden alır (H3). Doğrusu: her adımda görünür [Atla].
5. **Onboarding içinde hesap açma/izin istemeyi ilk adıma koymak.** Neden zararlı: değer gösterilmeden bariyer çıkar, terk oranını artırır (görev uygunluğu). Doğrusu: izin/değer sonrası, gerekçesiyle.
6. **Adım geçişinde odağı taşımamak.** Neden zararlı: klavye ve ekran okuyucu kullanıcısı yeni içeriği bulamaz (SC 2.4.3). Doğrusu: odak yeni `h1`'e; canlı bölge duyurusu.

## 7. Örnek mikro-metinler

| Öğe | TR | EN |
|-----|----|----|
| İlerleme metni | Adım 2 / 3 | Step 2 of 3 |
| Birincil düğme | Devam | Continue |
| Son adım birincil düğme | Kurulumu tamamla | Finish setup |
| İkincil düğme | Geri | Back |
| Atlama düğmesi | Atla | Skip |
| Başlık (adım) | Görevlerinizi tek yerde toplayın | Keep all your tasks in one place |
| Yardımcı metin | Her görevi tarih ve önceliğe göre sıralayın. | Order each task by date and priority. |
| Hata metni | Kurulum kaydedilemedi. Bağlantınızı kontrol edip Tekrar dene'ye basın. | Setup could not be saved. Check your connection and select Retry. |
| Başarı bildirimi | Kurulum tamamlandı. Görevler ekranı açılıyor. | Setup complete. Opening your tasks. |
| Yükleniyor metni | Hazırlanıyor… | Preparing… |
| Yeniden açma (Yardım) | Tanıtımı yeniden başlat | Restart the tour |

Tarih biçimi: TR `1 Ekim 2026`, EN `Oct 1, 2026`.

## 8. Kabul kontrolleri

`references/thresholds.md` içindeki E1-E13 eşiklerine ek olarak bu ekrana özel kontroller:

- [ ] Akış en fazla 4 adım ve her adımda tek fayda cümlesi var (H8 doğrulaması).
- [ ] İlerleme hem metin hem görsel işaretçiyle gösteriliyor; "Adım n / N" ekran okuyucuya duyuruluyor.
- [ ] [Atla] her adımda görünür ve klavyeyle erişilebilir; [Geri] yalnız ilk adımda devre dışı.
- [ ] Hiçbir adım otomatik/zamanlayıcıyla ilerlemiyor (SC 2.2.2 kontrolü).
- [ ] Adım geçişinde odak yeni `h1`'e taşınıyor ve geçiş `aria-live="polite"` ile duyuruluyor.
- [ ] Onboarding yalnız bir kez otomatik açılıyor; Yardım'dan yeniden başlatılabiliyor.
- [ ] %200 yakınlaştırma ve 320 px genişlikte metin kırpılmıyor, yatay kaydırma yok.
- [ ] İllüstrasyonlar süs ise `alt=""`, anlamlıysa açıklayıcı `alt` taşıyor ve logo placeholder olarak işaretli.
