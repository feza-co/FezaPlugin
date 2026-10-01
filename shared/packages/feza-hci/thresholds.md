# HCI Sayısal Kabul Kriterleri (E1-E13)

Bu eşiklerin **hepsi engelleyicidir**. Bir arayüz çıktısında bu kriterlerden biri bile sağlanmazsa, kalite kapısı puanı ne olursa olsun teslim yapılmaz; bulgu düzeltilir ve doğrulama yeniden çalıştırılır. Sayısal araçlarla ölçülemeyen kriterler "statik inceleme" ile kontrol edilir ve gerekçesi `DESIGN_RATIONALE` dokümanının erişilebilirlik bölümüne kısa bir satırla yazılır (bu satırda puan yazılmaz).

Bu dosya feza-hci paketindeki tüm skill'lere `references/thresholds.md` olarak kopyalanan tek kaynaktır. Eşikler değişirse yalnızca burası güncellenir.

## Eşik Tablosu

| # | Kriter | Eşik | Ölçüm |
|---|---|---|---|
| E1 | axe-core ihlali (serious + critical) | 0 | verify-ui |
| E2 | Metin kontrastı | ≥ 4.5:1 (büyük metin ≥ 3:1) | axe + contrast.py |
| E3 | UI bileşeni / grafik kontrastı | ≥ 3:1 | contrast.py |
| E4 | Dokunma hedefi | ≥ 44×44 CSS px (birincil eylemler); en az 24×24 her yerde (WCAG 2.2 SC 2.5.8) | verify-ui |
| E5 | Yeniden akış | 320px'de yatay kaydırma yok (WCAG 1.4.10) | verify-ui |
| E6 | Görünür odak | Tüm etkileşimli öğelerde | verify-ui klavye testi |
| E7 | Odak sırası | Görsel sırayla uyumlu, tuzak yok | verify-ui klavye testi |
| E8 | Form etiketleri | Her alanın erişilebilir adı var | axe |
| E9 | Birincil eylem | Ekran başına en fazla 1 birincil (vurgulu) eylem | statik inceleme |
| E10 | Görev derinliği | Birincil görevler en fazla 3 ekran/adım | görev akışı (Adım 2) |
| E11 | Durum kapsaması | Her asenkron işlemde yükleniyor + hata + başarı; her listede boş durum | statik inceleme |
| E12 | Hareket | `prefers-reduced-motion` altında animasyon kapalı/azaltılmış | verify-ui |
| E13 | Metin büyütme | %200 yakınlaştırmada içerik kaybı yok (WCAG 1.4.4) | verify-ui |

## Nasıl Ölçülür / Nasıl Düzeltilir

**E1 — axe-core ihlali (serious + critical).** Ölçen: `scripts/verify-ui.mjs` (axe-core taraması, etiketler wcag2a/2aa/21a/21aa/22aa). Düzeltme: raporlanan düğümü ele alın; rol, ad, durum ya da kontrast eksikliğini giderin. Kaynak WCAG serisi kurallar; eşik 0 ihlaldir.

**E2 — Metin kontrastı.** Ölçen: `scripts/verify-ui.mjs` (axe `color-contrast` kuralı) ve `scripts/contrast.py`. Kaynak WCAG 2.1 SC 1.4.3 (AA). Düzeltme: gövde metni ≥ 4.5:1, ≥ 24 px ya da ≥ 19 px kalın ("büyük metin") ≥ 3:1 olacak şekilde token rengini değiştirin.

**E3 — UI bileşeni / grafik kontrastı.** Ölçen: `scripts/contrast.py` (ön plan/zemin çiftleri). Kaynak WCAG 2.1 SC 1.4.11 (AA). Düzeltme: giriş kenarı, odak halkası ve anlamlı ikonların komşu renkle oranını ≥ 3:1 yapın.

**E4 — Dokunma hedefi.** Ölçen: `scripts/verify-ui.mjs` (tıklanabilir öğe boyutu). Kaynak WCAG 2.2 SC 2.5.5 (44×44, birincil eylemler) ve SC 2.5.8 (Minimum, 24×24 her yerde). Düzeltme: birincil düğmeyi ≥ 44×44, kalan tüm hedefleri ≥ 24×24 CSS px yapın; satır içi metin bağlantıları muaftır.

**E5 — Yeniden akış.** Ölçen: `scripts/verify-ui.mjs` (320 px viewport'ta yatay kaydırma). Kaynak WCAG 2.1 SC 1.4.10 (AA). Düzeltme: sabit genişlikleri kaldırın, tek sütuna akıtın; yalnızca veri tablosu/görsel gibi zorunlu iki boyutlu içerik muaf tutulur.

**E6 — Görünür odak.** Ölçen: `scripts/verify-ui.mjs` (klavye testi, odak stili karşılaştırması). Kaynak WCAG 2.1 SC 2.4.7 (AA). Düzeltme: `outline: none` kaldırın, `:focus-visible` stili tanımlayın.

**E7 — Odak sırası.** Ölçen: `scripts/verify-ui.mjs` (sekme sırası, pozitif `tabindex`, odak tuzağı). Kaynak WCAG 2.1 SC 2.4.3 (A). Düzeltme: pozitif `tabindex` kullanmayın, DOM sırasını görsel sıraya uydurun, diyalogda `Esc` çıkışı sağlayın.

**E8 — Form etiketleri.** Ölçen: `scripts/verify-ui.mjs` (axe `label` / `select-name` / `input-button-name`). Kaynak WCAG 2.1 SC 1.3.1, 3.3.2 ve 4.1.2 (A). Düzeltme: her alana görünür `label` ya da eşdeğer erişilebilir ad verin.

**E9 — Birincil eylem.** Ölçen: statik inceleme (kaynak Nielsen 1994 H8, ISO 9241-110 uygunluk ilkesi). Düzeltme: ekran başına en fazla bir vurgulu (birincil) eylem bırakın, kalanı ikincil stile indirin.

**E10 — Görev derinliği.** Ölçen: görev akışı (Adım 2) incelemesi (kaynak Nielsen 1994, ISO 9241-110). Düzeltme: birincil görevleri en fazla 3 ekran/adıma indirin; gereksiz ara adımları birleştirin.

**E11 — Durum kapsaması.** Ölçen: statik inceleme (kaynak WCAG 2.1 SC 4.1.3 ve 3.3.1). Düzeltme: her asenkron işleme yükleniyor, hata ve başarı durumu ekleyin; her listeye boş durum ekleyin.

**E12 — Hareket.** Ölçen: `scripts/verify-ui.mjs` (reduced-motion emülasyonu; animasyon/geçiş süresi). Kaynak WCAG 2.1 SC 2.3.3 (AAA, hareketle tetiklenen animasyon). Düzeltme: `@media (prefers-reduced-motion: reduce)` altında animasyonu kapatın ya da süreyi eşiğin altına indirin.

**E13 — Metin büyütme.** Ölçen: `scripts/verify-ui.mjs` (kök yazı boyutu %200; kırpılma ve yatay kaydırma). Kaynak WCAG 2.1 SC 1.4.4 (AA). Düzeltme: sabit yükseklik ve `overflow: hidden` kullanmayın, `rem` tabanlı ölçü kullanın.

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
  "E13_zoom_percent": 200
}
```

Yukarıdaki blok `scripts/verify-ui.mjs` içindeki THRESHOLDS nesnesiyle birebir aynı olmalıdır; depo doğrulayıcısı farkı hata olarak raporlar.

## report.json ile Eşleme

`scripts/verify-ui.mjs` çıktısındaki `report.json` → `results.E1..E13` alanları bu kriterleri taşır. Her alan `ok`, `value`, `threshold` (ve varsa `violations`) içerir. Statik kriterler (E9, E10, E11) script'te yer almaz; elle incelenir ve `DESIGN_RATIONALE` erişilebilirlik bölümüne gerekçesiyle yazılır.
