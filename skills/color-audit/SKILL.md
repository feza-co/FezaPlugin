---
name: color-audit
description: >
  Renk paleti denetimi. Yerleşik renk teorisi ve erişilebilirlik standartlarına dayalı: Color wheel
  (primary/secondary/tertiary), color harmonies (Analogous/Complementary/
  Split-complementary/Triadic/Monochromatic), 60-30-10 kuralı, contrast
  (WCAG 2.1 AA), color coding, dark mode, color blindness. Önce projedeki
  CSS/tailwind/tokens dosyalarından paleti çıkarır, yoksa kullanıcıdan alır.
  Tetikleyici: "color audit", "renk denetimi", "palette review",
  "/feza-hci:color-audit", "renk paleti".
  Fix modu: "--fix", "--fix=all", "düzelt", "bulguları düzelt", "fix it", "apply fixes" — bulguları UI dosyalarına uygular ve verify-ui ile doğrular.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion
---

# Color Audit

Renk paletini renk teorisi prensipleri + WCAG 2.1 AA'ya göre denetler.

## Tetikleyici
- "/feza-hci:color-audit"
- "renk denetimi / palette audit"
- "renk paleti analizi"
- Fix modu: `--fix`, `--fix=all`, "düzelt", "bulguları düzelt", "fix it", "apply fixes"

## Adım 0 — Bağlamı Topla
1. **Tasarım token dosyaları:** `tokens.json`, `*.tokens.*`, `figma-tokens.json`
2. **CSS değişkenleri:** `:root` blokları içinde `--color-*`, `--primary`
3. **Tailwind config:** `tailwind.config.js`/`.ts` `theme.colors`
4. **CSS dosyaları:** hex (`#abcdef`), `rgb()`, `hsl()` Grep ile çıkar
5. `BRIEF.md`/`SCOPE_*.md` — marka ipuçları
6. Hiç yoksa **TEK** soru: "Mevcut paleti listeler misin? (en az primary, secondary, background, text)"

## Adım 1 — Gri Nokta (max 3)

| # | Gri nokta |
|---|-----------|
| 1 | **Marka kısıtı** (sabit primary var mı?) |
| 2 | **Hedef hassasiyet** (color-blind oranı yüksek bir segment mi?) |
| 3 | **Dark mode hedefi** (zorunlu / opsiyonel / yok) |

## Adım 2 — Bilgi Tabanı
- `references/color-rules.md` — color wheel, harmonies, kontrast formülü, color blindness tipleri.
- `references/evidence-rubric.md` — kanıt türleri, severity ankrajları, ikinci geçiş ve kapsam şeffaflığı (ortak standart).
- `references/output-conventions.md`.

## Adım 3 — Üret

### 1. Mevcut Palet Tablosu

| İsim | Hex | Rol | Kontrast vs Beyaz | Kontrast vs Siyah |
|------|-----|-----|--------------------|--------------------|
| Primary | #1a73e8 | Brand, CTA | 4.61 ✓ AA | 4.55 ✓ AA |
| Secondary | #ea4335 | Tehlike/error | ... | ... |
| Background | #ffffff | Sayfa zemin | – | 21.0 |
| Text | #202124 | Body | – | 17.4 |

### 2. Color Harmony Tespiti

Mevcut palet 5 klasik harmoniden hangisi?
- **Analogous** (yan yana): düşük kontrast, sakin
- **Complementary** (karşı): yüksek kontrast, dikkat çeker
- **Split-complementary**: complementary'nin yumuşatılmışı
- **Triadic** (120° eşit): canlı, dengeli
- **Monochromatic** (tek hue tonları): minimal

Tespit edileni belirt + projeye uygunluğunu yorumla.

### 3. 60-30-10 Kuralı Kontrolü

Yaygın tasarım kuralı: **dominant rengin %60, secondary %30, accent %10** kullanılmalı.
- CSS/template'lerden tahmini kullanım oranını çıkar.
- Sapma varsa öner (ör. "Primary %45 kullanılıyor — daha baskın olmalı").

### 4. WCAG 2.1 AA Kontrast Tablosu

Her metin × arka plan kombinasyonu için:

| Çift | Kontrast | AA Normal (4.5:1) | AA Large (3:1) | AAA Normal (7:1) |
|------|----------|--------------------|-----------------|-------------------|
| Body text on bg | 4.7 | ✓ | ✓ | ✗ |
| Muted text on bg | 3.9 | ✗ FAIL | ✓ | ✗ |
| Button text on primary | 4.6 | ✓ | ✓ | ✗ |

**FAIL olan her çift için somut alternatif öner** (hex değer dahil).

### 4b. Bulgular Tablosu (kanıt ve severity)

Kontrast dışı bulgular (harmony, 60-30-10, color coding, dark mode) `references/evidence-rubric.md`
§2'deki severity ankrajlarıyla puanlanır ve kanıt türü ile yazılır:

| # | Bulgu | Konum | Severity | Kanıt türü | Kanıt | Önerilen Düzeltme |
|---|-------|-------|----------|------------|-------|-------------------|
| C1 | Muted text kontrastı 3.9:1 (AA normal fail) | `tokens.json` `--color-muted` | 3 | verify-ui kodu | `E2 FAIL, oran 3.9:1` | `--color-muted` → `#5f6368` (4.6:1) |
| C2 | Error durumu yalnız kırmızı ile iletiliyor | `components/Alert.tsx` | 2 | DOM seçici | `.alert-error` — ikon/etiket yok | İkon + "Hata:" prefix ekle |

Kanıt türü `references/evidence-rubric.md` §1'deki dört değerden biridir. Severity 3-4 için DOM seçici
veya verify-ui kodu zorunludur; yalnız görsel tahmine dayalı bulgu en fazla severity 2'dir.

### 4c. İkinci Geçiş

Severity ≥ 3 bulgular `references/evidence-rubric.md` §4'e göre bağımsız bir ikinci geçişte, ilk puan
gizlenerek yalnız bulgu metni + kanıtla yeniden puanlanır. İki puan farklıysa bulgu "elle
doğrulanmalı" işaretlenir, raporda ayrı listelenir ve nihai severity iki puanın büyüğü olur.

### 5. Color Blindness Simülasyonu

3 tip için zihinde simüle et:
- **Protanopia** (kırmızı duyarsız) — kırmızı/yeşil ayrımı zor
- **Deuteranopia** (yeşil duyarsız) — kırmızı/yeşil ayrımı zor
- **Tritanopia** (mavi duyarsız) — mavi/sarı ayrımı zor

**Öneri:** renge ek olarak ikon, pattern veya etiket kullan.

### 6. Color Coding Denetimi

WCAG 2.1 SC 1.4.1 (Use of Color) ilkesi: bilgiyi yalnızca renkle iletme.
- Error → kırmızı + ❌ ikon + "Hata:" prefix
- Success → yeşil + ✓ + "Başarılı:"
- Warning → sarı + ⚠ + "Uyarı:"

Kontrol et: sadece renk kullanılan yer var mı?

### 7. Dark Mode Kontrolü (varsa)

- Tüm renklerin dark karşılığı tanımlı mı?
- Kontrast dark mode'da hâlâ AA mı?
- Özellikle accent renklerinin "saturation" ayarı yapılmış mı?

### 8. Önerilen Düzeltilmiş Palet

FAIL'ları düzelten yeni tablo + gerekçe.

### 9. Elle doğrulanmalı

İkinci geçişte puanı farklı çıkan (severity ≥ 3) bulguların listesi (`references/evidence-rubric.md` §4).

### 10. Otomatik doğrulanamayanlar

`references/evidence-rubric.md` §5'teki zorunlu manuel kontrol listesi (`- [ ]` biçiminde): okuma
sırasının anlamı, alternatif metin kalitesi, karmaşık bileşen klavye akışı, ekran okuyucuyla deneme,
hata mesajlarının anlamı. Manuel maddeler işaretlenmeden rapor "teslim edilebilir" sayılmaz; "0 ihlal
= erişilebilir" gibi ifadeler kullanılmaz.

## Adım 4 — Self-Check
- [ ] Tüm metinler için kontrast hesaplandı mı?
- [ ] Color harmony tespit edildi mi?
- [ ] 60-30-10 kontrol edildi mi?
- [ ] Color blindness 3 tip için yorumlandı mı?
- [ ] FAIL'lar için somut hex önerisi var mı?
- [ ] Her bulguda kanıt türü (ekran görüntüsü / DOM seçici / erişilebilirlik ağacı / verify-ui kodu) belirtildi mi?
- [ ] Severity 3-4 bulgularda DOM seçici veya verify-ui kodu kanıtı var mı?
- [ ] Severity ≥ 3 bulgular ikinci geçişte yeniden puanlandı mı; farklı puanlar "Elle doğrulanmalı" listesinde mi ve "Otomatik doğrulanamayanlar" manuel kontrol listesi işaretlendi mi?
- [ ] Fix modu istendiyse: değişecek dosya listesi tek mesajla gösterildi, yalnız UI dosyaları değişti, verify-ui çalıştı, "Uygulanan düzeltmeler" tablosu eklendi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-hci (HCI)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `COLOR_AUDIT_<proje>.md`

## Adım 6 — Rapor
1. Dosya yolu.
2. Toplam renk + FAIL kombinasyon sayısı.
3. Tespit edilen harmony.
4. En kritik 2 düzeltme.
5. Sonraki: düzeltilmiş paleti token'lara ve arayüze uygulamak için `/feza-hci:hci-execute`; ya da `/feza-hci:hci-review` / `/feza-hci:heuristic-eval`.

## Adım 7 — Fix Modu (yalnızca tetikleyiciyle)

Tetikleyici yoksa bu adım atlanır; yalnızca rapor verilir.
Tetikleyici: `--fix`, `--fix=all` ya da "düzelt", "bulguları düzelt", "fix it", "apply fixes".
Prosedür: `references/fix-mode.md`. Eşikler: `references/thresholds.md`. Doğrulama:
`node <skill-klasörü>/scripts/verify-ui.mjs <sayfa.html | URL>` (mutlak yol; script kullanıcı projesine kopyalanmaz).
Düzeltme **TOKEN seviyesinde** yapılır: değer tek yerde değişir, kullanım yerleri token'a bağlanır.
Yeni renk değerleri `scripts/contrast.py` ile hesaplanır; elle tutulan oran kullanılmaz.
Token katmanı yoksa önce bir katman oluşturulması önerilir ve onay alınır; onay yoksa renk yalnız raporlanır.
Değerlendirme raporunun sonuna "Uygulanan düzeltmeler" tablosu eklenir; rapor yeniden yazılmaz.

## Sınırlar
- Max 4 soru.
- Hex değer uydurma — varsa palette'tan al, yoksa kullanıcıdan iste.
- WCAG 2.1 AA minimum, AAA önerisi.
- Renge ek olarak görsel kanal (ikon/pattern) eklemeden bitirme.
- Fix modu dışında hiçbir dosya değiştirilmez; fix modu tetiklenirse yalnız UI/token dosyaları değişir.
