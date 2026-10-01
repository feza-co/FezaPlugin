# Tasarım Sistemi Kuralları

Kaynaklar: WCAG 2.1 (W3C, 2018) SC 1.4.1, 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 2.3.3, 2.4.7; ISO 9241-110:2020 (etkileşim ilkeleri); Miller (1956); yaygın tipografi ve 8 pt ızgara pratiği.

## 1. Token Mimarisi

Tüm görsel kararlar **tek bir token kaynağında** tanımlanır; bileşenler yalnız anlamsal token'ları kullanır.

| Katman | Örnek | Kural |
|--------|-------|-------|
| Ham (primitive) | `--blue-600: #1D5FD1` | Yalnız token dosyasında; bileşende kullanılmaz |
| Anlamsal (semantic) | `--color-primary: var(--blue-600)` | Bileşenler bunu kullanır; tema değişince yalnız bu katman değişir |
| Bileşen (opsiyonel) | `--button-bg: var(--color-primary)` | Yalnız karmaşık bileşenlerde |

Stack'e göre tek kaynak:

| Stack | Token kaynağı |
|-------|---------------|
| Düz HTML/CSS (varsayılan) | `styles/tokens.css` (`:root` + `[data-theme="dark"]` + `@media (prefers-color-scheme: dark)`) |
| Tailwind | CSS değişkenleri `tokens.css` içinde; `tailwind.config.*` `theme.extend.colors` bu değişkenlere işaret eder (`primary: 'var(--color-primary)'`) |
| CSS-in-JS / React Native | Tek `theme.(ts|js)` nesnesi; açık/koyu iki varyant |
| Vue/Svelte | Global `tokens.css`, bileşen stilleri `var(--...)` kullanır |

## 2. Renk

### 2.1 Anlamsal roller (zorunlu set)

| Token | Rol |
|-------|-----|
| `--color-bg` | Sayfa zemini (dominant, ~%60) |
| `--color-surface` | Kart, panel, giriş alanı zemini (~%30 ile birlikte ikincil ton) |
| `--color-text` | Gövde metni |
| `--color-text-muted` | İkincil metin (yine ≥ 4.5:1) |
| `--color-primary` / `--color-primary-hover` | Birincil eylem, bağlantı, seçili durum (vurgu, ~%10) |
| `--color-on-primary` | Birincil zemin üzerindeki metin/ikon |
| `--color-border` | Dekoratif ayraç (kontrast şartı yok) |
| `--color-border-strong` | Giriş alanı, onay kutusu kenarı (≥ 3:1) |
| `--color-focus` | Odak halkası (≥ 3:1, hem zemin hem bileşene karşı) |
| `--color-danger`, `--color-success`, `--color-warning`, `--color-info` | Durum renkleri; her zaman ikon + metin önekiyle |

### 2.2 Harmoni ve 60-30-10

| Adım | Kural |
|------|-------|
| Harmoni seçimi | Monokromatik ya da analog: sakin, iş odaklı arayüz. Tamamlayıcı / bölünmüş tamamlayıcı: vurgunun zeminden belirgin ayrılması gereken ürünler. Triadik: canlı, eğlence odaklı ürünler. Seçim ve gerekçe rationale'e yazılır |
| 60-30-10 | %60 nötr zemin, %30 yüzey ve ikincil ton, %10 vurgu (birincil eylem). Nötr tonlar renk sayısına dahil edilmez; ana palet en fazla 3 renk |
| Vurgu disiplini | Ekran başına tek birincil eylem birincil renkte; ikincil eylemler kenarlıklı ya da metin düğme |
| Durum renkleri | Marka renginden ayrışık ton; kırmızı/yeşil çifti parlaklıkça da farklı olmalı (ör. koyu kırmızı vs orta yeşil) |

### 2.3 Kontrast eşikleri (WCAG 2.1 AA)

| İçerik | Eşik | Kriter |
|--------|------|--------|
| Normal metin (< 24 px, ya da < 18.66 px kalın) | ≥ 4.5:1 | SC 1.4.3 |
| Büyük metin (≥ 24 px, ya da ≥ 18.66 px kalın) | ≥ 3:1 | SC 1.4.3 |
| UI bileşeni sınırı, durum göstergesi, anlamlı ikon, odak halkası | ≥ 3:1 | SC 1.4.11 |
| Devre dışı (disabled) bileşen | Şart yok; yine de okunabilir tut ve `disabled`/`aria-disabled` ile bildir | SC 1.4.3 istisnası |
| Logo/marka adı | Şart yok | SC 1.4.3 istisnası |
| AAA hedefi (opsiyonel) | Normal 7:1, büyük 4.5:1 | SC 1.4.6 |

### 2.4 Kontrast formülü

Göreli parlaklık (relative luminance), sRGB kanal değeri `C` (0-1 aralığına bölünmüş 8 bit değer):

```text
C_lin = C / 12.92                       eğer C ≤ 0.04045
C_lin = ((C + 0.055) / 1.055) ^ 2.4     aksi hâlde

L = 0.2126 · R_lin + 0.7152 · G_lin + 0.0722 · B_lin

Kontrast oranı = (L_açık + 0.05) / (L_koyu + 0.05)      aralık: 1:1 ile 21:1
```

Oran yuvarlanmaz; 4.48:1 eşiği geçmez. Yarı saydam renkler önce zemin üzerine karıştırılarak (alpha compositing) opak renge çevrilir, sonra hesaplanır.

### 2.5 Hesap betiği (`scripts/contrast.py`)

Kontrast hesabı `scripts/contrast.py` ile yapılır. Yalnız Python standart kütüphanesini kullanır; 2.4'teki formülü birebir uygular, oranı yuvarlamaz (4.48:1 eşiği geçmez) ve yarı saydam renkleri zemine karıştırır.

```bash
# Tek çift; --min verilirse eşik altında çıkış kodu 1 olur
python scripts/contrast.py "#1B2430" "#FFFFFF" --min 4.5

# Tüm çiftler JSON'dan (ad, fg, bg, min); biri bile FAIL ise çıkış kodu 1
python scripts/contrast.py --pairs pairs.json

# Değerler token ise CSS'ten çöz (açık + koyu tema); --theme light|dark|both
python scripts/contrast.py --css styles/tokens.css --pairs pairs.json --theme both
```

`pairs.json` biçimi:

```json
[
  {"name": "text/bg", "fg": "var(--color-text)", "bg": "--color-bg", "min": 4.5},
  {"name": "border-strong/surface", "fg": "#79808C", "bg": "#F4F6F8", "min": 3.0}
]
```

`--css` verilmezse `fg`/`bg` doğrudan renk değeri olmalıdır. `--json` bayrağı sonucu JSON olarak yazdırır (verify-ui ve diğer araçlar okur). Geçersiz renk ya da çözülemeyen token çıkış kodu 2 verir.

`python3` yoksa `python` dene; Python yoksa formülü elle uygula ve hesap adımlarını rationale ekine yaz.

### 2.6 Örnek başlangıç paleti (hesaplanmış)

Marka kısıtı verilmediğinde başlangıç noktası olarak kullanılabilir. Değerler bu formülle hesaplanmıştır; değiştirilen her renk yeniden hesaplanır.

| Token | Açık tema | Koyu tema | Kritik çift | Açık oran | Koyu oran |
|-------|-----------|-----------|-------------|-----------|-----------|
| `--color-bg` | `#FFFFFF` | `#11161D` | — | — | — |
| `--color-surface` | `#F4F6F8` | `#1A212B` | — | — | — |
| `--color-text` | `#1B2430` | `#E8ECF1` | text / bg | 15.65:1 | 15.31:1 |
| `--color-text-muted` | `#4A5565` | `#A9B3C1` | muted / surface | 6.98:1 | 7.64:1 |
| `--color-primary` | `#1D5FD1` | `#7AA7F5` | primary / bg | 5.82:1 | 7.50:1 |
| `--color-primary-hover` | `#174EAE` | — | hover / bg | 7.67:1 | — |
| `--color-on-primary` | `#FFFFFF` | `#0B1420` | on-primary / primary | 5.82:1 | 7.64:1 |
| `--color-border-strong` | `#79808C` | `#6B7584` | border / bg | 3.98:1 | 3.89:1 |
| `--color-danger` | `#B42318` | `#F28B82` | danger / bg | 6.57:1 | 7.60:1 |
| `--color-success` | `#18794E` | `#5CC995` | success / bg | 5.41:1 | 8.86:1 |
| `--color-warning` (metin) | `#8A4B00` | `#F0B35A` | warning / bg | 6.80:1 | 9.77:1 |
| `--color-focus` | `#1D5FD1` | `#7AA7F5` | focus / bg | 5.82:1 | 7.50:1 |

Ek kontroller: `border-strong / surface` açık temada 3.67:1, koyu temada 3.47:1; `primary / surface` açık temada 5.37:1, koyu temada 6.69:1.

### 2.7 Renk körlüğü güvenliği

| Durum | Kural |
|-------|-------|
| Durum bildirimi | Renk + ikon + metin önek ("Hata:", "Kaydedildi:") — SC 1.4.1 |
| Grafik serileri | Renk + desen/işaretçi + doğrudan etiket |
| Bağlantılar | Metin içinde altı çizili ya da 3:1 parlaklık farkı + odakta/hover'da ek ipucu |
| Seçili durum | Renk + kalın kenarlık ya da onay işareti |
| Simülasyon | Protanopi, döteranopi, tritanopi için "bu bilgi gri tonlamada da ayırt edilir mi?" testi |

### 2.8 Koyu tema

- Saf siyah (`#000`) yerine koyu gri-mavi zemin; yükseklik, gölge yerine daha açık yüzey tonuyla anlatılır.
- Doygun renkler koyu temada açılır ve doygunluğu düşürülür (titreşim ve göz yorgunluğunu azaltır).
- Tüm çiftler koyu tema için ayrı hesaplanır; açık temadaki sonuç koyu tema için geçerli sayılmaz.
- Seçim önceliği: kullanıcının elle seçimi (`[data-theme]`, `localStorage` hata korumalı) > `prefers-color-scheme`.

## 3. Tipografi

| Kural | Değer |
|-------|-------|
| Yazı tipi | Marka fontu yoksa sistem yığını: `system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif` (Türkçe karakter desteği zorunlu) |
| Ölçek | Oranlı ölçek; varsayılan 1.25 (major third): 12, 14, 16, 20, 25, 31, 39 px |
| Gövde | ≥ 16 px (1rem); form alanlarında da 16 px (mobil tarayıcıda otomatik yakınlaştırmayı önler) |
| Satır yüksekliği | Gövde 1.5; başlık 1.2-1.3 (SC 1.4.12 kullanıcı geçersiz kılmasına dayanıklı) |
| Satır uzunluğu | 45-75 karakter (`max-width: 65ch`) |
| Birim | `rem`; yazı boyutu px ile kilitlenmez (SC 1.4.4, %200 büyütme) |
| Ağırlık | En fazla 3 ağırlık (400, 600, 700) |
| Hiyerarşi | Boyut + ağırlık + boşlukla; yalnız renkle değil |

## 4. Boşluk ve Izgara

| Token | Değer | Tipik kullanım |
|-------|-------|----------------|
| `--space-1` | 4 px | İkon-metin arası |
| `--space-2` | 8 px | Etiket-alan arası |
| `--space-3` | 12 px | Düğme iç boşluğu (dikey) |
| `--space-4` | 16 px | Kart iç boşluğu, mobil kenar boşluğu |
| `--space-5` | 24 px | Grup arası |
| `--space-6` | 32 px | Bölüm arası |
| `--space-7` | 48 px | Büyük bölüm arası |
| `--space-8` | 64 px | Sayfa üst/alt boşluğu (masaüstü) |

- Gestalt yakınlık: grup içi boşluk < gruplar arası boşluk (ör. 8 vs 24).
- Kırılımlar (mobil önce, `min-width`): 640, 1024, 1280 px. İçerik genişliği masaüstünde en fazla ~1200 px.
- Dokunma hedefi: en az 44 × 44 CSS px; komşu hedefler arasında en az 8 px.

## 5. Biçim: Köşe ve Gölge

| Token | Değer | Kullanım |
|-------|-------|----------|
| `--radius-sm` | 4 px | Giriş alanı, etiket |
| `--radius-md` | 8 px | Düğme, kart |
| `--radius-lg` | 16 px | Diyalog, alt sayfa |
| `--shadow-1` | `0 1px 2px rgb(0 0 0 / .08)` | Kart |
| `--shadow-2` | `0 4px 12px rgb(0 0 0 / .12)` | Açılır menü |
| `--shadow-3` | `0 12px 32px rgb(0 0 0 / .18)` | Diyalog |

Gölge tek başına sınır bilgisi taşımaz; etkileşimli öğenin sınırı `--color-border-strong` ile de görünür olmalı.

## 6. Hareket

| Kural | Değer |
|-------|-------|
| Süre | Mikro geri bildirim 100-150 ms; açılır/kapanır 200-300 ms; 500 ms'yi geçme |
| Eğri | Giriş `ease-out`, çıkış `ease-in` |
| Amaç | Yalnız durum değişimini ve uzamsal ilişkiyi anlatmak için (dekoratif hareket yok) |
| Azaltılmış hareket | `@media (prefers-reduced-motion: reduce)` altında animasyon ve geçişler kapatılır ya da ≤ 1 ms'ye indirilir; kaydırma `scroll-behavior: auto` |
| Yanıp sönme | Saniyede 3'ten fazla yanıp sönme yok (SC 2.3.1) |
| Otomatik hareket | 5 s'den uzun otomatik hareket durdurulabilir olmalı (SC 2.2.2) |

## 7. Odak Stili

```css
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}
```

- Odak halkası hem zemine hem bileşenin kendisine karşı ≥ 3:1.
- `outline: none` yalnız eşdeğer görünür stil sağlanırsa.
- Odak, yapışkan başlık ya da alt çubuk altında gizlenmez (`scroll-margin-top`).
