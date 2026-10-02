# Uygulama ve Doğrulama Kontrol Listesi

Kaynaklar: WCAG 2.1 (W3C, 2018), Nielsen (1994) 10 kullanılabilirlik heuristiği, Dix, Finlay, Abowd, Beale (2004) kullanılabilirlik ilkeleri, ISO 9241-110:2020 etkileşim ilkeleri.

Bu liste iki kez kullanılır: **uygularken** kural olarak, **doğrularken** (gizli döngü) denetim listesi olarak.

Sayısal eşikler: `references/thresholds.md` (E1-E29). Bu listedeki maddeler eşiklerle çelişirse eşik dosyası geçerlidir.

## 1. WCAG 2.1 A + AA Kontrol Listesi (arayüz üretimi için seçilmiş)

| # | Kriter | Seviye | Uygulamada nasıl karşılanır | Statik kontrol |
|---|--------|--------|-----------------------------|----------------|
| W1 | 1.1.1 Non-text Content | A | Anlamlı görselde `alt`, dekoratifte `alt=""`; ikon düğmede erişilebilir ad | `<img>` ve ikon düğmeleri tara |
| W2 | 1.3.1 Info and Relationships | A | Landmark, başlık sırası, `label`/`fieldset`/`legend`, tablo başlıkları | Başlık ağacı, her `input` için `label` |
| W3 | 1.3.2 Meaningful Sequence | A | DOM sırası görsel sırayla aynı | CSS `order`/mutlak konum kullanımı |
| W4 | 1.3.4 Orientation | AA | Yön kilidi yok | `orientation` kilidi aranır |
| W5 | 1.3.5 Identify Input Purpose | AA | Kişisel veri alanlarında `autocomplete` | Ad, e-posta, telefon alanları |
| W6 | 1.4.1 Use of Color | A | Durum = renk + ikon + metin | Hata/başarı bileşenleri |
| W7 | 1.4.3 Contrast (Minimum) | AA | Metin 4.5:1, büyük metin 3:1 | Betikle tüm çiftler |
| W8 | 1.4.4 Resize Text | AA | `rem`, sabit yükseklikli metin kabı yok | %200 yakınlaştırma |
| W9 | 1.4.10 Reflow | AA | 320 px'de tek sütun, yatay kaydırma yok (tablo/harita hariç) | 320 px render ya da CSS incelemesi |
| W10 | 1.4.11 Non-text Contrast | AA | Giriş kenarı, odak halkası, anlamlı ikon 3:1 | Betikle |
| W11 | 1.4.12 Text Spacing | AA | Satır/harf aralığı arttırılınca kırpılma yok | Sabit `height` + `overflow: hidden` aranır |
| W12 | 1.4.13 Content on Hover or Focus | AA | Tooltip kapatılabilir (`Esc`), üzerine gelinebilir, kalıcı | Tooltip bileşeni |
| W13 | 2.1.1 Keyboard | A | Tüm işlevler klavyeyle; `div` tıklama yerine `button` | `onclick` olan etkileşimsiz öğe aranır |
| W14 | 2.1.2 No Keyboard Trap | A | Diyalogda odak döngüsü + `Esc` çıkışı | Diyalog bileşeni |
| W15 | 2.4.1 Bypass Blocks | A | "İçeriğe atla" bağlantısı | Sayfa başı |
| W16 | 2.4.2 Page Titled | A | Ekran başına benzersiz `title` | Her sayfa |
| W17 | 2.4.3 Focus Order | A | Mantıklı sekme sırası; pozitif `tabindex` yok | `tabindex="[1-9]"` aranır |
| W18 | 2.4.4 Link Purpose | A | "Buraya tıkla" yok; bağlam içeren bağlantı metni | Bağlantı metinleri |
| W19 | 2.4.6 Headings and Labels | AA | Açıklayıcı başlık ve etiket | Başlık metinleri |
| W20 | 2.4.7 Focus Visible | AA | `:focus-visible` stili | `outline: none` aranır |
| W21 | 2.5.3 Label in Name | A | Görünür etiket erişilebilir adın içinde | `aria-label` ile görünür metin karşılaştır |
| W22 | 3.1.1 Language of Page | A | `<html lang="tr">` (ya da içerik dili) | Kök öğe |
| W23 | 3.2.1 / 3.2.2 On Focus / On Input | A | Odak ya da seçim tek başına sayfa değiştirmez | `onchange` ile yönlendirme aranır |
| W24 | 3.2.3 / 3.2.4 Consistent Navigation / Identification | AA | Navigasyon ve aynı işlevli bileşenler her ekranda aynı | Ekranlar arası karşılaştırma |
| W25 | 3.3.1 Error Identification | A | Hatalı alan metinle belirtilir, `aria-invalid="true"` | Doğrulama kodu |
| W26 | 3.3.2 Labels or Instructions | A | Biçim ve zorunluluk önceden belirtilir | Form alanları |
| W27 | 3.3.3 Error Suggestion | AA | Düzeltme önerisi verilir | Hata metinleri |
| W28 | 3.3.4 Error Prevention (Legal, Financial, Data) | AA | Geri alınabilir, kontrol edilebilir ya da onaylı gönderim | Silme, ödeme, gönderim |
| W29 | 4.1.2 Name, Role, Value | A | Özel bileşende doğru rol ve durum (`aria-expanded`, `aria-pressed`) | Özel bileşenler |
| W30 | 4.1.3 Status Messages | AA | Toast ve durum mesajı `role="status"` / `aria-live="polite"`; acil hata `role="alert"` | Bildirim bileşeni |
| W31 | 2.5.5 Target Size | AAA (hedef) | Birincil eylem ≥ 44 × 44 CSS px; her etkileşimli hedef en az 24 × 24 CSS px (WCAG 2.2 SC 2.5.8) | Düğme, bağlantı, ikon boyutları |

### WCAG 2.2 ek maddeleri (E kodu eşlemesiyle)

| # | Kriter | Seviye | Uygulamada nasıl karşılanır | Statik kontrol | E |
|---|--------|--------|-----------------------------|----------------|---|
| W32 | 2.4.11 Focus Not Obscured (Minimum) | AA | Odaklanan öğe sabit/yapışkan katman altında tamamen gizlenmez; `scroll-padding` yeterli | Sabit başlık/alt çubuk yüksekliği ile `scroll-padding` karşılaştır | E14 |
| W33 | 2.5.8 Target Size (Minimum) | AA | 24 × 24 px altı hedefler arasında merkezden en az 24 px aralık (istisna) | Küçük/bitişik ikon düğmeleri | E15 |
| W34 | 1.4.12 Text Spacing | AA | Satır 1.5, harf 0.12em, kelime 0.16em, paragraf 2em artışında kırpılma yok | Sabit `height` + `overflow: hidden` aranır | E16 |
| W35 | 3.3.8 Accessible Authentication (Minimum) | AA | Parola/OTP yapıştırması engellenmez; `autocomplete` doğru; "göster" düğmesi var | `onpaste`/`preventDefault`, `autocomplete` değerleri | E17 |
| W36 | 2.5.7 Dragging Movements | AA | Sürükleme ile yapılan işlem için tek işaretçi alternatifi (ok tuşu/düğme) var | `draggable`, `dragstart`/`pointerdown` işleyicileri | E18 |
| W37 | 3.3.7 Redundant Entry | A | Aynı akışta daha önce verilen bilgi ikinci kez boş istenmez; otomatik doldur ya da seçtir | Adres/iletişim tekrarları | E19 |
| W38 | 3.2.6 Consistent Help | A | Yardım mekanizması (iletişim/SSS) sayfalar arasında aynı göreli sırada | Sayfa alt bilgisi/başlık sırası | E20 |
| W39 | forced-colors (yüksek karşıtlık) | — | Etkileşimli öğe sınırı ve odak göstergesi forced-colors altında görünür; sınır `border`/`outline` ile de verilir | Yalnız `background-color` ile çizilen sınır ve yalnız `box-shadow` odak | E21 |
| W40 | prefers-contrast: more | — | Tercih tanımlıysa metin ≥ 7:1, UI kenarlığı ≥ 4.5:1 | `@media (prefers-contrast: more)` kuralı ve renkleri | E22 |
| W41 | Saydam yüzey | — | Blur/yarı saydam yüzey yalnız geçici katmanda + `prefers-reduced-transparency` opak yedeği; metin en kötü zeminde ≥ 4.5:1 | `rgba`/`backdrop-filter` ve yedek araması | E23 |
| W42 | RTL | — | `dir=rtl` geçişinde yatay taşma yok; mantıksal yön özellikleri kullanılır | `margin-left` vb. fiziksel özellik araması | E24 |
| W43 | Metin genişlemesi | — | Metin %30 uzatılınca kırpılma/yatay kaydırma yok; kaplar içeriğe göre büyür | Sabit genişlik + `nowrap` kombinasyonu | E25 |
| W44 | Türkçe büyük/küçük harf | — | Kullanıcıya görünen metinde `text-transform:` / `.toUpperCase()` yok; `toLocaleUpperCase(locale)` | `uppercase` ve yerel ayarsız dönüşüm araması | E26 |
| W45 | Yerel biçim | — | Sayı/tarih/para `Intl.*` ile; elle `toFixed(2)+" TL"`, sabit `dd/MM/yyyy` yok | `toFixed`/para birleştirme/desen araması | E27 |

## 2. Heuristik Uygulama Listesi (Nielsen 1994 ↔ Dix et al. ↔ ISO 9241-110)

| # | Heuristik | Dix et al. ilkesi | ISO 9241-110 ilkesi | Uygulamada zorunlu karşılık |
|---|-----------|-------------------|---------------------|-----------------------------|
| H1 | Sistem durumunun görünürlüğü | Observability, Responsiveness | Self-descriptiveness | ≤ 100 ms görsel tepki; > 1 s işte yükleniyor durumu ve düğmede meşgul durumu; sonuç bildirimi; aktif navigasyon öğesi `aria-current="page"` |
| H2 | Sistem ile gerçek dünya uyumu | Familiarity, Task conformance | Conformity with user expectations | Kullanıcı dili, teknik jargon yok; tarih/sayı yerel biçimde; tanıdık metaforlar |
| H3 | Kullanıcı kontrolü ve özgürlüğü | Recoverability, Dialog initiative | Controllability | İptal ve geri her akışta; silmede geri al; çok adımlı akışta önceki adıma dönüş, veri korunur |
| H4 | Tutarlılık ve standartlar | Consistency, Generalizability | Conformity with user expectations | Aynı eylem aynı etiket/konum/stil; tek bileşen seti; platform kalıpları |
| H5 | Hata önleme | Predictability | Error robustness | Uygun giriş türü, kısıt ipucu, makul varsayılan, yıkıcı eylemde onay |
| H6 | Hatırlama yerine tanıma | Synthesizability, Familiarity | Self-descriptiveness | Görünür seçenekler, ikon + metin, son kullanılanlar, alan içi örnek |
| H7 | Esneklik ve kullanım verimliliği | Substitutivity, Customizability, Multithreading | Suitability for individualisation | Klavye kısayolları (opsiyonel, görünür belgelenmiş), toplu işlem, filtrenin URL'de korunması |
| H8 | Estetik ve minimalist tasarım | Task conformance | Suitability for the task | Ekran başına tek birincil eylem; görevle ilgisiz içerik yok; boşlukla gruplama |
| H9 | Hataları tanıma, teşhis ve kurtarma | Recoverability | Error robustness | Mesaj: ne oldu + neden + nasıl düzeltilir; alan yanında + özet; girdi korunur |
| H10 | Yardım ve dokümantasyon | Familiarity | Learnability | Bağlamsal ipucu, boş durumda yönlendirme, gerekiyorsa yardım bağlantısı |

## 3. Bileşen Durum Matrisi

Her etkileşimli bileşen için doldurulur. "—" uygulanamaz demektir; boş hücre bırakılmaz.

| Bileşen | default | hover | focus-visible | active | disabled | loading | empty | error | success |
|---------|---------|-------|---------------|--------|----------|---------|-------|-------|---------|
| Birincil düğme | Dolgu primary | primary-hover | Odak halkası | Hafif koyulaşma / 1 px içe | Düşük opaklık + `disabled` + neden ipucu | Spinner + "Kaydediliyor…" + `aria-busy`, çift gönderim engeli | — | — | Kısa onay ikonu ya da toast |
| İkincil düğme | Kenarlıklı | Yüzey tonu | Odak halkası | Koyulaşma | Aynı kural | Aynı kural | — | — | — |
| Metin alanı | `border-strong` | Kenar koyulaşır | Odak halkası | — | Yüzey tonu + `disabled` | Satır içi doğrulama göstergesi | Yer tutucu değil, görünür etiket | Kırmızı kenar + ikon + metin + `aria-invalid` | Onay ikonu (opsiyonel) |
| Onay kutusu / radyo | Yerel öğe, ≥ 44 px tıklanabilir etiket | Etiket vurgusu | Odak halkası | — | `disabled` | — | — | Grup düzeyi hata metni | — |
| Liste / tablo | Satırlar | Satır vurgusu | Satır içi odak | Seçili satır (renk + işaret) | — | İskelet (skeleton) satırlar | Boş durum kalıbı | Hata kalıbı + "Tekrar dene" | — |
| Diyalog | Kapalı | — | Açılışta ilk odaklanabilir öğe | — | — | İçerik yükleniyor | — | İçerik hata | Kapanır, odak tetikleyiciye döner |
| Navigasyon öğesi | Metin + ikon | Vurgu | Odak halkası | — | — | — | — | — | Aktif: `aria-current` + görsel işaret |
| Toast / bildirim | — | Duraklatma (opsiyonel) | Kapatma düğmesi odaklanabilir | — | — | — | — | `role="alert"` | `role="status"`, 5-10 s, geri al eylemi |

## 4. Bilişsel Yük Kontrolü

| # | Kontrol | Eşik | Kaynak |
|---|---------|------|--------|
| C1 | Bir gruptaki seçenek/öğe sayısı | ≤ 7 (fazlası gruplanır ya da aşamalı gösterilir) | Miller 1956 |
| C2 | Birincil navigasyon öğe sayısı | ≤ 5 mobil, ≤ 7 masaüstü | Miller 1956, Hick 1952 |
| C3 | Ekran başına birincil eylem | 1 | Nielsen H8 |
| C4 | Form adım başına alan | ≤ 7; daha fazlası mantıksal adımlara bölünür | Miller 1956 |
| C5 | Karar süresi | Seçenek sayısı arttıkça artar (Hick); sık seçenek öne, varsayılan önerilir | Hick 1952 |
| C6 | Gruplama | Grup içi boşluk < grup arası boşluk; ilişkili öğeler ortak zemin/kenarlıkta | Gestalt yakınlık, ortak bölge |
| C7 | Benzerlik | Aynı işlevli öğeler aynı görünür; farklı işlevler görsel olarak ayrışır | Gestalt benzerlik |
| C8 | Aşamalı gösterim | İleri seçenekler `details`/"Diğer seçenekler" altında | Progressive disclosure |
| C9 | Geri bildirim gecikmesi | Anlık tepki ≤ 100 ms; 1 s üstü ilerleme göstergesi; 10 s üstü ilerleme yüzdesi ya da iptal | Nielsen yanıt süresi sınırları |
| C10 | Hafıza yükü | Önceki ekrandan bilgi taşımayı gerektiren adım yok (özet/onay ekranında gösterilir) | Nielsen H6 |

## 5. Doğrulama Prosedürü (gizli döngü)

Sonuçlar kullanıcıya puan olarak gösterilmez; yalnız düzeltmeler uygulanır ve kapanmayanlar "Bilinen Boşluklar"a yazılır.

| Sıra | Ne yapılır | Araç |
|------|-----------|------|
| 1 | Otomatik doğrulamayı çalıştır: `node scripts/verify-ui.mjs <giriş sayfası>` | `scripts/verify-ui.mjs` |
| 2 | `report.json` sonuçlarını E1-E29'a göre oku (`results.E1..E29`); OK/FAIL/`ok:null` ve ihlalleri not et | `report.json` |
| 3 | Ekran görüntülerini Read ile aç; hizalama/taşma/hiyerarşi/boşluk tutarlılığını değerlendir | Read |
| 4 | Statik kriterler E9-E11, E19, E20, E26, E27'yi incele (birincil eylem, görev derinliği, durum kapsaması, tekrar giriş, tutarlı yardım, harf/yerel biçim); kaynak taraması için `node scripts/verify-ui.mjs --static <dizin>` çalıştır | Kod okuma, `--static` |
| 5 | İhlalleri düzelt ve yeniden çalıştır (en fazla 2 tur) | `scripts/verify-ui.mjs` |
| 6 | Çıkış kodu 2 ise statik kontrol; "Bilinen Boşluklar"a "otomatik render doğrulaması yapılamadı" yaz | Kod okuma |

Statik yardımcılar (düzeltme ve ek kontrol için): `outline: none`, `tabindex` > 0, `onclick` olan `div`/`span`, `label`'sız `input`, `alt`'sız `img` ve ham hex/px değerleri Grep ile taranır; `margin-left`/`text-align: left` gibi fiziksel yön özellikleri, `backdrop-filter`/`rgba` saydam yüzeyler, `text-transform`/`.toUpperCase()` ve `toFixed`/sabit tarih desenleri `--static` taramasıyla bulunur; heuristik listesi H1-H10, durum matrisi ve bilişsel yük C1-C10 kod okuma ile kontrol edilir; kontrast çiftleri `scripts/contrast.py` ile (açık ve koyu tema) doğrulanır.

### Severity ölçeği (Nielsen)

| Skor | Anlam | Eylem |
|------|-------|-------|
| 0 | Sorun değil | — |
| 1 | Kozmetik | Zaman kalırsa düzelt |
| 2 | Küçük kullanılabilirlik sorunu | **Düzelt** |
| 3 | Büyük kullanılabilirlik sorunu | **Düzelt** |
| 4 | Kullanımı engelleyen | **Düzelt**; kapanmazsa sohbet özetinde de açıkça belirtilir |

Herhangi bir WCAG A/AA ihlali en az severity 2 sayılır. Klavye ile tamamlanamayan birincil görev ve 4.5:1 altında gövde metni severity 4'tür.

### Tur kuralı

En fazla 2 düzeltme turu. Turdan sonra kalan severity ≥ 2 bulgu varsa `DESIGN_RATIONALE_<proje>.md` → "Bilinen Boşluklar" tablosuna severity, konum ve önerilen çözümle yazılır. E1-E13'ten biri FAIL ise severity'den bağımsız düzeltilir.

### Statik E kriterleri kontrol listesi

Otomatik/karma ölçümün kapsamadığı ya da onay gerektiren maddeler kod okuma ile işaretlenir:

- [ ] **E14 — odak örtülmesi:** Sabit/yapışkan başlık ya da alt çubuk, odaklanan öğeyi tamamen kapatmıyor; `scroll-padding-top/bottom` sabit katman yüksekliği kadar tanımlı (C43).
- [ ] **E15 — hedef aralığı:** 24 px altındaki hedefler 24 px çaplı daire kuralını sağlıyor; sağlamayanlar büyütülür ya da aralarına boşluk konur.
- [ ] **E16 — metin aralığı:** Metin kaplarında sabit yükseklik + `overflow: hidden` yok; satır/harf/kelime aralığı artışında içerik kırpılmıyor.
- [ ] **E17 — erişilebilir kimlik doğrulama:** Parola/OTP yapıştırması engellenmiyor; `autocomplete` değerleri doğru; "göster" düğmesi metinle ve `aria-pressed` ile sunuluyor.
- [ ] **E19 — tekrar giriş:** Aynı akışta daha önce girilen bilgi ikinci kez boş istenmiyor; mevcut değer otomatik dolduruluyor ya da seçtiriliyor.
- [ ] **E20 — tutarlı yardım:** Yardım/iletişim mekanizması birden çok sayfada aynı göreli sırada (ör. her zaman alt bilgide) duruyor.
- [ ] **E21 — forced-colors:** `forced-colors: active` altında her etkileşimli öğenin görünür sınırı (kenarlık>0 ya da `outline`) ve odak göstergesi (box-shadow değil, outline) var.
- [ ] **E22 — prefers-contrast: more:** Kural tanımlıysa metin ≥ 7:1, UI kenarlığı ≥ 4.5:1; tanımlı değilse bu bilgidir (`ok:null`).
- [ ] **E23 — saydam yüzey:** Blur/yarı saydam yüzey yalnız geçici katmanda (menü/tooltip); `@media (prefers-reduced-transparency: reduce)` altında opak yedek var; metin en kötü zeminde ≥ 4.5:1.
- [ ] **E24 — RTL:** `dir=rtl` geçişinde 320/390/1280 px'de yatay taşma yok; `margin-left`/`right`/`left`/`text-align: left|right`/`float` yerine mantıksal karşılıkları kullanılmış; kullanıcı verisi `dir="auto"`/`<bdi>` ile sarılmış.
- [ ] **E25 — metin genişlemesi:** Düğme/etiket/metin kaplarında sabit genişlik yok; metin %30 uzatılınca (aksanlı) kırpılmıyor ve yatay kaydırma üretmiyor.
- [ ] **E26 — Türkçe büyük/küçük harf:** Kullanıcıya görünen metinde `text-transform: uppercase/lowercase` ve `.toUpperCase()/.toLowerCase()` yok; gerekliyse `toLocaleUpperCase('tr-TR')` kullanılmış.
- [ ] **E27 — yerel biçim:** Sayı/tarih/para `Intl.NumberFormat`/`Intl.DateTimeFormat` ile biçimlenmiş; elle `toFixed(2)+" TL"`, `"₺"` birleştirme ya da sabit `dd/MM/yyyy` deseni yok.
