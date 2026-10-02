# Tasarım Sistemi Kuralları

Kaynaklar: WCAG 2.1 (W3C, 2018) SC 1.4.1, 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 2.3.3, 2.4.7; WCAG 2.2 (W3C, 2023) SC 2.4.11, 2.5.7, 2.5.8, 3.3.8; ISO 9241-110:2020 (etkileşim ilkeleri); Miller (1956); yaygın tipografi ve 8 pt ızgara pratiği.

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
| Satır aralığına dayanıklılık | Metin kaplarında sabit `height` yok; satır 1.5, harf 0.12em, kelime 0.16em ve paragraf 2em artışında içerik kırpılmaz/taşmaz. `overflow: hidden` yerine akışı bırak (E16, SC 1.4.12) |
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
- Hedef aralığı (E15, SC 2.5.8): 24 × 24 px altındaki hedeflerin merkezinden 24 px çaplı bir daire başka bir hedefle kesişmez; sağlanamıyorsa hedef büyütülür. Satır içi metin bağlantıları muaftır.
- Sabit/yapışkan katman (E14, SC 2.4.11): sabit başlık ve alt çubuk yüksekliği kadar `scroll-padding-top` / `scroll-padding-bottom` tanımlanır (W3C tekniği C43); odaklanan öğe bu katmanların altında tamamen gizlenmez.

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

## 8. Erişilebilir Kimlik Doğrulama ve İşaretçi Alternatifleri

| Kural | Değer / davranış |
|-------|------------------|
| Yapıştırma (E17, SC 3.3.8) | Parola ve OTP alanlarında `paste` engellenmez; parola yöneticisi çalışır. Kopyala-yapıştır kısıtı yok |
| `autocomplete` değerleri | Parola: `current-password` / `new-password`; kullanıcı adı/e-posta: `username` / `email`; OTP: `one-time-code` |
| Şifre görünürlüğü | "Şifreyi göster" düğmesi metinle sunulur ve `aria-pressed` ile durumu bildirir; varsayılan gizli |
| Bilişsel test yasağı (E17) | Kullanıcıdan parolayı ezberleyip yazmasını gerektiren bilişsel test yok (ör. hesaplama); kimlik bilgisi girişi ya da yapıştırma serbest |
| Sürükleme alternatifi (E18, SC 2.5.7) | Sürükle-bırak ile yapılan her işlem (sıralama, taşıma, kaydırıcı) için tek işaretçi alternatifi sunulur: ok tuşlarıyla taşıma ya da "yukarı/aşağı taşı" düğmeleri. `draggable` öğelerine klavye erişimi de sağlanır |

## 9. Tasarım Token'ları (DTCG)

Bu bölüm §1'deki token mimarisinin makine okunabilir karşılığını tanımlar; §1'deki katman/rol kuralları geçerlidir.

Kanıtlanmış standart: **Design Tokens Community Group Format Module 2025.10** "first stable version" (designtokens.org, 2025-10). Dönüştürme aracı olarak Style Dictionary **5.3+** DTCG 2025.10'u destekler (doğrulanmış sürüm bilgisi; daha eski sürümlerde bu biçim desteklenmez).

### 9.1 İsteğe bağlı `tokens.tokens.json` çıktısı

Varsayılan teslimde token kaynağı `styles/tokens.css`'tir (§1). İstenirse **aynı değerleri taşıyan** bir DTCG dosyası da üretilir:

- Dosya adı: `styles/tokens.tokens.json` (`<ad>.tokens.json` kalıbı `color-audit` ve `contrast.py --tokens` tarafından tanınır).
- `tokens.css` ile değerler **birebir aynı** olmalı; biri değişirse ikisi birlikte güncellenir.
- Zorunlu değil; üretildiyse `DESIGN_RATIONALE_<proje>.md` §4 token tablosunda belirtilir.

### 9.2 Biçim kuralları

| Öğe | Kural |
|-----|-------|
| Grup vs token | `$value` taşıyan düğüm **token**'dır; diğerleri **grup**. Grup adları rol ağacını (§1) yansıtır: `color`, `dimension`, `duration`, `shadow`, `typography` |
| `$type` kalıtımı | Tür grup düzeyinde bir kez yazılır, token'lar kalıtır (ör. `color` grubunda `$type: "color"`) |
| Adlandırma | Yol parçaları §1 ve §2.1'deki rollerle eşleşir: `color.text`, `color.text-muted`, `color.primary`, `color.on-primary`, `color.border-strong`, `color.focus`, `color.danger`, `color.success`, `color.warning`, `color.info`; CSS karşılığı `--color-text`, `--color-text-muted`, … |
| Alias | Anlamsal token ham token'a `{color.blue-600}` biçimiyle bağlanır (§1'deki `var()` zincirinin DTCG karşılığı) |
| Açıklama | Anlamı belirsiz token'da `$description` yazılır |
| Kullanımdan kaldırma | Eskiyen token `$deprecated` ile işaretlenir; `contrast.py --tokens` bu token'ı uyarı olarak bildirir |

```json
{
  "color": {
    "$type": "color",
    "primary": { "$value": "#1D5FD1", "$description": "Birincil eylem" },
    "text": { "$value": "#1B2430" },
    "interactive": { "$value": "{color.primary}" },
    "legacy-accent": { "$value": "#8A4B00", "$deprecated": "use color.danger instead" }
  }
}
```

### 9.3 Desteklenen alt küme

| Tür | Durum |
|-----|-------|
| `color` | Desteklenir; `#RRGGBB[AA]` string ya da DTCG yapısal renk nesnesi (`colorSpace`, `components`, `alpha`, `hex`) |
| `dimension`, `duration`, `cubicBezier`, `shadow`, `typography` | Desteklenir (ayrıştırılır; kontrast hesabına girmez) |
| Diğer türler (`fontFamily` vb.) | **Kapsam dışı**: ayrıştırılır, hesaba girmez |

`color` dışı türler kontrast hesabına girmez; `contrast.py --tokens` yalnız renk token'larını çiftlere çözer.

### 9.4 Kontrast doğrulaması

```bash
# DTCG dosyasından çözerek (tek tema)
python scripts/contrast.py --tokens styles/tokens.tokens.json --pairs pairs.json --json

# Açık + koyu tema
python scripts/contrast.py --tokens light.tokens.json --tokens-dark dark.tokens.json --pairs pairs.json
```

`pairs.json` içinde `fg`/`bg` için `{color.text}`, `color.text` ya da `--color-text` biçimleri kabul edilir. Alias zinciri döngüsüz çözülür; döngü ya da derinlik aşımında betik çıkış kodu 2 ile anlaşılır hata verir. Renk değerleri `contrast.py --css` ile aynı oranları vermelidir (bkz. `tests/hci/tokens/`).

### 9.5 Style Dictionary ile dönüştürme (doğrulanmış sürümler)

Style Dictionary **5.3+** DTCG 2025.10 biçimini okuyup platform çıktısına (CSS değişkenleri, JS/TS nesnesi) dönüştürebilir. Bu, `tokens.css` ile DTCG dosyasının tek kaynaktan üretilmesini sağlar. Ayrıntı ve alternatif akış: `references/tokens-dtcg.md`.

## 10. Tasarım Dili: Hareket, Köşe, Container Queries

Bu bölüm §5 (biçim) ve §6 (hareket) kurallarını genişletir; çelişki olursa §5-§6 esastır.

### 10.1 Hareket token'ları

| Kategori | Süre | Kullanım |
|----------|------|----------|
| İşlevsel | 100-300 ms | Durum geri bildirimi, hover/focus, açılır-kapanır, giriş-çıkış; §6'daki "mikro geri bildirim" ve "açılır/kapanır" aralığının token karşılığı |
| İfade edici | 300-500 ms | Yalnız geçiş/karşılama gibi anlatısal, seyrek hareket; 500 ms'yi geçmez |

- `prefers-reduced-motion: reduce` altında **ifade edici hareket kapatılır** (0 ms ya da anlık); işlevsel hareket ≤ 1 ms'ye indirilir (§6, E12).
- Hareket amacı yalnız durum değişimini ve uzamsal ilişkiyi anlatmaktır; dekoratif/parallax hareket yasaktır (E12, SC 2.3.3).
- Örnek token'lar: `duration.functional-fast: 150ms`, `duration.functional: 250ms`, `duration.expressive: 400ms`; eğri `cubicBezier.ease-out: [0, 0, 0.2, 1]`.

### 10.2 Köşe yarıçapı ölçeği (5 kademe)

| Token | Değer | Tipik kullanım |
|-------|-------|----------------|
| `--radius-1` | 4 px | Etiket, küçük rozet, giriş alanı |
| `--radius-2` | 8 px | Düğme, küçük kart |
| `--radius-3` | 12 px | Kart, panel |
| `--radius-4` | 16 px | Diyalog, alt sayfa, büyük yüzey |
| `--radius-5` | 24 px | Kahraman bölüm, tam yuvarlak kapsayıcı |

Kademe **amaca göre** seçilir; tüm yüzeyler aynı yarıçapı almaz (bkz. §10.4 "şablon izleri"). §5'teki `--radius-sm/md/lg` bu ölçeğe karşılık gelir (sm=1, md=2, lg=4).

### 10.3 Container queries (kart ve tablo)

Bileşen, görünümünü **kendi kapsayıcısının** genişliğine göre uyarlar; pencere genişliğine göre değil. Bu, aynı kart/tablo bileşeninin dar sütunda ve geniş alanda doğru davranmasını sağlar.

```css
.card-host { container-type: inline-size; container-name: card; }

@container card (min-width: 28rem) {
  .card { grid-template-columns: 8rem 1fr; }
}

/* Tablo: dar kapsayıcıda kart görünümü */
.table-host { container-type: inline-size; }

@container (max-width: 40rem) {
  .table thead { display: none; }
  .table tr { display: block; border: 1px solid var(--color-border); border-radius: var(--radius-3); }
  .table td::before { content: attr(data-label) ": "; font-weight: 600; }
}
```

- Container query desteklenmiyorsa makul bir tek sütun/akış yedeği bırak (progressive enhancement).
- Kırılımlar (§4) sayfa düzeyi; container query bileşen düzeyidir — ikisi birlikte kullanılır.

### 10.4 "Şablon izleri" öz-denetimi

Aşağıdakilerden biri varsa tasarım **kalıplaşmış** demektir; gerekçesiz tekrar düzeltilir (Self-Check maddesi):

- [ ] Her bölümde **aynı gölge** ve aynı yüzey kullanılmış mı? (Yükseklik hiyerarşisi yoksa düzleştirilmiş demektir.)
- [ ] Her başlığın üstünde **büyük harfli küçük etiket** (eyebrow/overline) var mı? (Her yerde tekrarı şablon izidir.)
- [ ] Tüm köşeler **tekdüze yarıçap** mı? (§10.2 kademeleri amaca göre kullanılmalı.)
- [ ] Her bölüm **ortalanmış** mı? (Hizalama bilgi hiyerarşisi taşımalı.)
- [ ] Aynı **ikon-başlık-metin kart üçlüsü** tekrar tekrar mı? (İçerik türü farklıysa sunum da farklılaşmalı.)
- [ ] Aynı **dekoratif vurgu** (aynı renk bloğu/çizgi/parıltı) her bölümde mi?
- [ ] Bölümler yalnızca **metin değiştirilerek** mi çoğaltılmış? (Bilgi yoğunluğu ve ritim farklılaşmalı.)
- [ ] **Dolu/boş durum** aynı iskeletle mi? (Boş durumun kendi yönlendirmesi olmalı — §2.1 `--color-text-muted`, `implementation-checklist.md` boş durum.)

Bir öğe birden çok bölümde tekrarlanıyorsa gerekçesi `DESIGN_RATIONALE_<proje>.md` §5 tasarım kararları tablosuna yazılır.
