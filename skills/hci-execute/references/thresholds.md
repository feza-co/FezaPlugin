<!-- generated from shared/packages/feza-hci/thresholds.md — do not edit -->
# HCI Sayısal Kabul Kriterleri (E1-E29)

Bu eşiklerin **hepsi engelleyicidir**. Bir arayüz çıktısında bu kriterlerden biri bile sağlanmazsa, kalite kapısı puanı ne olursa olsun teslim yapılmaz; bulgu düzeltilir ve doğrulama yeniden çalıştırılır. Sayısal araçlarla ölçülemeyen kriterler "statik inceleme" ile kontrol edilir ve gerekçesi `DESIGN_RATIONALE` dokümanının erişilebilirlik bölümüne kısa bir satırla yazılır (bu satırda puan yazılmaz).

Bu dosya feza-hci paketindeki tüm skill'lere `references/thresholds.md` olarak kopyalanan tek kaynaktır. Eşikler değişirse yalnızca burası güncellenir.

## Eşik Tablosu

"Ölçüm" sütunu kriterin nasıl değerlendirildiğini gösterir: `otomatik` (araç ölçer), `karma` (araç tespit eder, onay elle) ya da `statik` (elle incelenir). "Araç" sütunu otomatik/karma kriterler için kullanılan betiği verir.

| # | Kriter | Eşik | Ölçüm | Araç |
|---|---|---|---|---|
| E1 | axe-core ihlali (serious + critical) | 0 | otomatik | verify-ui (axe) |
| E2 | Metin kontrastı | ≥ 4.5:1 (büyük metin ≥ 3:1) | otomatik | verify-ui (axe) + contrast.py |
| E3 | UI bileşeni / grafik kontrastı | ≥ 3.0:1 (yuvarlama yok; 2.999 FAIL) | otomatik | verify-ui (getComputedStyle) |
| E4 | Dokunma hedefi | ≥ 44×44 CSS px (birincil eylemler); en az 24×24 her yerde (WCAG 2.2 SC 2.5.8) | otomatik | verify-ui |
| E5 | Yeniden akış | 320px'de yatay kaydırma yok (WCAG 2.2 SC 1.4.10) | otomatik | verify-ui |
| E6 | Görünür odak | Tüm etkileşimli öğelerde | otomatik | verify-ui klavye testi |
| E7 | Odak sırası | Görsel sırayla uyumlu, tuzak yok | otomatik | verify-ui klavye testi |
| E8 | Form etiketleri | Her alanın erişilebilir adı var | otomatik | verify-ui (axe) |
| E9 | Birincil eylem | Ekran başına en fazla 1 birincil (vurgulu) eylem | statik | statik inceleme |
| E10 | Görev derinliği | Birincil görevler en fazla 3 ekran/adım | statik | görev akışı (Adım 2) |
| E11 | Durum kapsaması | Her asenkron işlemde yükleniyor + hata + başarı; her listede boş durum | statik | statik inceleme |
| E12 | Hareket | `reduce` altında `transform: scale/translate` tabanlı animasyon/parallax yok; yalnız opaklık (WCAG 2.2 SC 2.3.3) | otomatik | verify-ui |
| E13 | Metin büyütme | %200 yakınlaştırmada içerik kaybı yok (WCAG 2.2 SC 1.4.4) | otomatik | verify-ui |
| E14 | Focus Not Obscured (Min) | Odaklanan öğe sabit/yapışkan katman tarafından tamamen örtülmez; kısmi örtülme bilgidir (WCAG 2.2 SC 2.4.11) | otomatik | verify-ui klavye testi |
| E15 | Hedef aralığı istisnası | 24 px altı hedefin 24 px çaplı dairesi başka hedef/daireyle kesişmez (WCAG 2.2 SC 2.5.8) | otomatik | verify-ui |
| E16 | Metin aralığı | Satır 1.5, paragraf 2×, harf 0.12em, kelime 0.16em uygulanınca kırpılma/taşma yok (WCAG 2.2 SC 1.4.12) | otomatik | verify-ui |
| E17 | Erişilebilir kimlik doğrulama | Parola/OTP alanına yapıştırma çalışır, `autocomplete` doğru, "göster" düğmesi var (WCAG 2.2 SC 3.3.8) | karma | verify-ui |
| E18 | Sürükleme | Sürükleme işleyicisi bulunan her öğe için tek-işaretçi alternatifi var (tespit otomatik, onay statik) (WCAG 2.2 SC 2.5.7) | karma | verify-ui (CDP) |
| E19 | Tekrar giriş | Aynı akışta aynı bilgi ikinci kez boş istenmez (WCAG 2.2 SC 3.3.7) | statik | statik inceleme |
| E20 | Tutarlı yardım | Yardım mekanizması sayfalar arasında aynı göreli sırada (WCAG 2.2 SC 3.2.6) | statik | statik inceleme |
| E21 | forced-colors | `forced-colors: active` emülasyonunda etkileşimli öğe sınırı ve odak göstergesi görünür | otomatik | verify-ui |
| E22 | prefers-contrast: more | Emülasyonda metin kontrastı ≥ 7.0:1, kenarlık ≥ 4.5:1 | otomatik | verify-ui |
| E23 | Saydam yüzey | Saydam/blur yüzey üstü metin en kötü zemine göre ≥ 4.5:1; opak yedek tanımlı (`prefers-reduced-transparency`) | karma | verify-ui |
| E24 | RTL | `dir=rtl` geçişinde yatay taşma yok; fiziksel yön özelliği (`margin-left` vb.) statik bulgu | otomatik | verify-ui |
| E25 | Metin genişlemesi | %30 uzatılmış aksanlı metinde yatay kaydırma/kırpma yok | otomatik | verify-ui |
| E26 | Türkçe büyük/küçük harf | Kullanıcıya görünen metinde `text-transform: uppercase` / `.toUpperCase()` yok; `toLocaleUpperCase(locale)` | statik | statik inceleme |
| E27 | Yerel biçim | Elle sayı/tarih/para biçimi yok (`toFixed(2)+" TL"`, sabit `dd/MM/yyyy`); `Intl.*` kullanılır | statik | statik inceleme |
| E28 | Başlık/bölge yapısı | Tek `h1`, başlık seviyesi atlaması yok, `main` var, adı boş etkileşimli öğe yok | otomatik | verify-ui (ariaSnapshot) |
| E29 | Aldatıcı tasarım: eşit belirginlik | Kabul/ret ve kayıt/iptal eylemleri aynı boyut sınıfı ve E2 kontrastında; ön-işaretli onay kutusu yok | karma | verify-ui + statik inceleme |

## Nasıl Ölçülür / Nasıl Düzeltilir

**E1 — axe-core ihlali (serious + critical).** Ölçen: `scripts/verify-ui.mjs` (axe-core taraması, etiketler wcag2a/2aa/21a/21aa/22aa). Düzeltme: raporlanan düğümü ele al; rol, ad, durum ya da kontrast eksikliğini gider. Kaynak WCAG serisi kurallar; eşik 0 ihlaldir.

**E2 — Metin kontrastı.** Ölçen: `scripts/verify-ui.mjs` (axe `color-contrast` kuralı) ve `scripts/contrast.py`. Kaynak WCAG 2.2 SC 1.4.3 (AA). Düzeltme: gövde metni ≥ 4.5:1, ≥ 24 px ya da ≥ 19 px kalın ("büyük metin") ≥ 3:1 olacak şekilde token rengini değiştir.

**E3 — UI bileşeni / grafik kontrastı.** Ölçen: `scripts/verify-ui.mjs` (`getComputedStyle` ile kenarlık/dolgu/ikon çiftleri; en düşük oranlı kenar alınır, oran yuvarlanmaz). Kaynak WCAG 2.2 SC 1.4.11 (AA). Düzeltme: giriş kenarı, onay kutusu sınırı, odak halkası ve anlamlı ikonların komşu renkle oranını ≥ 3.0:1 yap; yalnız metin görünümündeki (ne kenarlık ne farklı dolgu) bileşenler ölçüm dışıdır.

**E4 — Dokunma hedefi.** Ölçen: `scripts/verify-ui.mjs` (tıklanabilir öğe boyutu). Kaynak WCAG 2.2 SC 2.5.5 (44×44, birincil eylemler) ve SC 2.5.8 (Minimum, 24×24 her yerde). Düzeltme: birincil düğmeyi ≥ 44×44, kalan tüm hedefleri ≥ 24×24 CSS px yap; satır içi metin bağlantıları ve E15 aralık istisnasını sağlayan hedefler muaftır.

**E5 — Yeniden akış.** Ölçen: `scripts/verify-ui.mjs` (320 px viewport'ta yatay kaydırma). Kaynak WCAG 2.2 SC 1.4.10 (AA). Düzeltme: sabit genişlikleri kaldır, tek sütuna akıt; yalnızca veri tablosu/görsel gibi zorunlu iki boyutlu içerik muaf tutulur.

**E6 — Görünür odak.** Ölçen: `scripts/verify-ui.mjs` (klavye testi, odak stili karşılaştırması). Kaynak WCAG 2.2 SC 2.4.7 (AA). Düzeltme: `outline: none` kaldır, `:focus-visible` stili tanımla.

**E7 — Odak sırası.** Ölçen: `scripts/verify-ui.mjs` (sekme sırası, pozitif `tabindex`, odak tuzağı). Kaynak WCAG 2.2 SC 2.4.3 (A). Düzeltme: pozitif `tabindex` kullanma, DOM sırasını görsel sıraya uydur, diyalogda `Esc` çıkışı sağla.

**E8 — Form etiketleri.** Ölçen: `scripts/verify-ui.mjs` (axe `label` / `select-name` / `input-button-name`). Kaynak WCAG 2.2 SC 1.3.1, 3.3.2 ve 4.1.2 (A). Düzeltme: her alana görünür `label` ya da eşdeğer erişilebilir ad ver.

**E9 — Birincil eylem.** Ölçen: statik inceleme (kaynak Nielsen 1994 H8, ISO 9241-110 uygunluk ilkesi). Düzeltme: ekran başına en fazla bir vurgulu (birincil) eylem bırak, kalanı ikincil stile indir.

**E10 — Görev derinliği.** Ölçen: görev akışı (Adım 2) incelemesi (kaynak Nielsen 1994, ISO 9241-110). Düzeltme: birincil görevleri en fazla 3 ekran/adıma indir; gereksiz ara adımları birleştir.

**E11 — Durum kapsaması.** Ölçen: statik inceleme (kaynak WCAG 2.2 SC 4.1.3 ve 3.3.1). Düzeltme: her asenkron işleme yükleniyor, hata ve başarı durumu ekle; her listeye boş durum ekle.

**E12 — Hareket.** Ölçen: `scripts/verify-ui.mjs` (reduced-motion emülasyonu; animasyon/geçiş süresi). Kaynak WCAG 2.2 SC 2.3.3 (AAA, hareketle tetiklenen animasyon). Düzeltme: `@media (prefers-reduced-motion: reduce)` altında `transform` tabanlı animasyonu kapat; durum değişimini yalnız `opacity` ile anlat.

**E13 — Metin büyütme.** Ölçen: `scripts/verify-ui.mjs` (kök yazı boyutu %200; kırpılma ve yatay kaydırma). Kaynak WCAG 2.2 SC 1.4.4 (AA). Düzeltme: sabit yükseklik ve `overflow: hidden` kullanma, `rem` tabanlı ölçü kullan.

**E14 — Focus Not Obscured (Min).** Ölçen: `scripts/verify-ui.mjs` (her Tab adımında odak öğesinin 4 köşesi + merkezi için `elementFromPoint`; nokta odak öğesine/çocuğuna değil, kendisi ya da atası `position: fixed|sticky` olan başka öğeye düşüyorsa örtülü; 5 noktanın hepsi örtülüyse FAIL, kısmi örtülme bilgi). Kaynak WCAG 2.2 SC 2.4.11 (AA). Düzeltme: sabit başlık/alt çubuk yüksekliği kadar `scroll-padding-top` / `scroll-padding-bottom` tanımla (W3C tekniği C43) ve gerekiyorsa `scroll-margin` ile destekle.

**E15 — Hedef aralığı istisnası.** Ölçen: `scripts/verify-ui.mjs` (24 px altı hedeflerin merkezinde 24 px çaplı daire; başka hedef dikdörtgeniyle ya da küçük hedef merkezine 24 px'den yakınsa kesişim). Kaynak WCAG 2.2 SC 2.5.8. Düzeltme: küçük hedefler arasında en az 24 px boşluk bırak ya da hedefi büyüt; satır içi metin bağlantıları muaftır.

**E16 — Metin aralığı.** Ölçen: `scripts/verify-ui.mjs` (1280 px'de taban; ardından satır 1.5, harf 0.12em, kelime 0.16em ve paragraf 2em enjekte edilir; metin içeren ve `overflow: hidden/clip` olan öğelerde kırpılma ya da belgesel yatay kaydırma). Kaynak WCAG 2.2 SC 1.4.12. Düzeltme: metin kaplarında sabit `height` kullanma, `overflow: hidden` yerine akışı bırak; `rem`/`em` tabanlı satır aralığı kullan.

**E17 — Erişilebilir kimlik doğrulama.** Ölçen: `scripts/verify-ui.mjs` (parola/OTP alanına `paste` olayı gönderip `defaultPrevented` kontrolü; `autocomplete` değeri; parola alanının formunda "göster" düğmesi). Kaynak WCAG 2.2 SC 3.3.8 (Minimum). Düzeltme: `paste` engelini kaldır; parola alanına `autocomplete="current-password"`/`"new-password"`, kullanıcı adına `"username"`, OTP alanına `"one-time-code"` ver; "Şifreyi göster" düğmesi ekle (yoksa yalnız uyarıdır).

**E18 — Sürükleme.** Ölçen: `scripts/verify-ui.mjs` (Chromium CDP `DOMDebugger.getEventListeners` ile `dragstart|pointerdown|mousedown|touchstart` dinleyicileri ve `draggable="true"` öğeleri; bulunanlar `candidates` olarak raporlanır). Kaynak WCAG 2.2 SC 2.5.7. Düzeltme: her sürükleme işlemi için tek işaretçi alternatifi (ok tuşları ya da düğmelerle taşıma) sun; tespit otomatik, onay statiktir.

**E19 — Tekrar giriş.** Ölçen: statik inceleme (kaynak WCAG 2.2 SC 3.3.7). Düzeltme: aynı akışta daha önce verilen bilgiyi yeniden boş isteme; otomatik doldur ya da kullanıcıya seçtir.

**E20 — Tutarlı yardım.** Ölçen: statik inceleme (kaynak WCAG 2.2 SC 3.2.6). Düzeltme: yardım mekanizmasını (iletişim, SSS bağlantısı) birden çok sayfada aynı göreli sırada tut.

**E21 — forced-colors.** Ölçen: `scripts/verify-ui.mjs` (`forcedColors: 'active'` emülasyonu; etkileşimli öğe sınırı ve odak göstergesi görünürlüğü). Kaynak WCAG 2.2 SC 1.4.11 ve Microsoft yüksek karşıtlık kılavuzu. Düzeltme: `forced-colors: active` altında sınırı `BorderColor`/`-ms-high-contrast` ile koru; yalnız `background-color` ile çizilen sınırları sistem renklerine bağla.

**E22 — prefers-contrast: more.** Ölçen: `scripts/verify-ui.mjs` (`contrast: 'more'` emülasyonunda metin ≥ 7.0:1, kenarlık ≥ 4.5:1). Kaynak WCAG 2.2 SC 1.4.6 (AAA hedefi) ve `prefers-contrast` ortam medyası. Düzeltme: `@media (prefers-contrast: more)` altında daha koyu metin ve daha belirgin kenarlık token'ları tanımla.

**E23 — Saydam yüzey.** Ölçen: `scripts/verify-ui.mjs` (saydam/blur yüzeylerin altındaki en kötü zeminle metin kontrastı; opak yedek varlığı). Kaynak WCAG 2.2 SC 1.4.3. Düzeltme: saydam yüzeyleri yalnız geçici katmanlarda (menü, tooltip) kullan; `@media (prefers-reduced-transparency: reduce)` altında opak zemin tanımla.

**E24 — RTL.** Ölçen: `scripts/verify-ui.mjs` (`dir=rtl` geçişinde yatay taşma; fiziksel yön özellikleri statik bulgu). Kaynak WCAG 2.2 SC 1.3.3/1.4.10 ve mantıksal özellik pratiği. Düzeltme: `margin-left` gibi fiziksel özellikler yerine `margin-inline`/`inset-inline-start` kullan.

**E25 — Metin genişlemesi.** Ölçen: `scripts/verify-ui.mjs` (%30 uzatılmış aksanlı metinde yatay kaydırma/kırpma). Kaynak WCAG 2.2 SC 1.4.10 (çeviri esnekliği). Düzeltme: sabit genişlikli metin kaplarını kaldır, düğme/etiket genişliğini içeriğe bırak.

**E26 — Türkçe büyük/küçük harf.** Ölçen: statik inceleme (kaynak WCAG 2.2 SC 3.1.1 ve Türkçe i/İ kuralı). Düzeltme: kullanıcıya görünen metinde `text-transform: uppercase` ve `.toUpperCase()` kullanma; `toLocaleUpperCase(locale)` tercih et.

**E27 — Yerel biçim.** Ölçen: statik inceleme (kaynak WCAG 2.2 SC 3.1.1, ISO 9241-110). Düzeltme: elle sayı/tarih/para biçimi yerine `Intl.NumberFormat` / `Intl.DateTimeFormat` kullan.

**E28 — Başlık/bölge yapısı.** Ölçen: `scripts/verify-ui.mjs` (Playwright `ariaSnapshot()` ile tek `h1`, atlanmayan başlık seviyesi, `main` varlığı, adı boş etkileşimli öğe yokluğu). Kaynak WCAG 2.2 SC 1.3.1, 2.4.6. Düzeltme: başlık hiyerarşisini düzelt, `main` ekle, etkileşimli öğelere erişilebilir ad ver.

**E29 — Aldatıcı tasarım: eşit belirginlik.** Ölçen: `scripts/verify-ui.mjs` (kabul/ret ve kayıt/iptal eylemlerinin boyut ve E2 kontrastı karşılaştırması; ön-işaretli onay kutusu tespiti) + statik inceleme. Kaynak WCAG 2.2 ilke bütünlüğü ve aldatıcı tasarım pratiği. Düzeltme: ret ve kabul seçeneklerini eşit görsel ağırlıkta sun; onay kutularını ön-işaretleme.

## Makine Okunur Eşikler

```json
{
  "E1_axe_serious_critical_max": 0,
  "E2_text_contrast_min": 4.5,
  "E2_large_text_contrast_min": 3.0,
  "E3_ui_contrast_min": 3.0,
  "E4_primary_target_min_px": 44,
  "E4_any_target_min_px": 24,
  "E5_reflow_width_px": 320,
  "E6_visible_focus": true,
  "E7_focus_order": true,
  "E12_max_animation_s": 0.01,
  "E12_max_transition_s": 0.3,
  "E13_zoom_percent": 200,
  "E14_focus_obscured_points": 5,
  "E15_target_spacing_px": 24,
  "E16_line_height": 1.5,
  "E16_paragraph_spacing_em": 2,
  "E16_letter_spacing_em": 0.12,
  "E16_word_spacing_em": 0.16,
  "E22_text_contrast_min": 7.0,
  "E22_ui_contrast_min": 4.5,
  "E23_text_contrast_min": 4.5,
  "E25_expansion_ratio": 1.3
}
```

Yukarıdaki blok `scripts/verify-ui.mjs` içindeki THRESHOLDS nesnesiyle birebir aynı olmalıdır; depo doğrulayıcısı farkı hata olarak raporlar.

## report.json ile Eşleme

`scripts/verify-ui.mjs` çıktısındaki `report.json` → `results.E1..E29` alanları bu kriterleri taşır. Her alan `ok`, `value`, `threshold`, `method` ve (varsa) `violations` içerir; `method` ∈ `otomatik | karma | statik`. `ok: null` geldiğinde `na` alanı gerekçeyi verir ve kriter elle doğrulanmalıdır (bu durum `report.ok`'u başarısız yapmaz, çıkış kodunu bozmaz). E9-E11, E19, E20, E26, E27 statik kriterlerdir; script bunları `ok: null` ile raporlar ve elle incelenmeleri gerekir. E21-E25 ve E28 sonraki fazlarda ölçülecektir; şimdilik `ok: null` + gerekçe ile yer tutar.
