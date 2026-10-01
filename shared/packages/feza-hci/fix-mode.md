# Fix Modu (ortak prosedür)

feza-hci değerlendirme skill'leri için değerlendirme bulgularını arayüz dosyalarına uygulayan ortak prosedür. Bu dosya, ilgili skill'lerin `references/fix-mode.md` kopyasına dağıtılır ve skill kökünden göreli okunur.

## 1. Kapsam

Bu prosedür şu dört skill için geçerlidir: `heuristic-eval`, `color-audit`, `cognitive-load`, `hci-review`.

Fix modu **değerlendirmeyi değiştirmez**. Skill önce normal akışıyla denetimi yapar, bulguları ve severity derecelerini üretir, değerlendirme raporunu yazar; fix modu bu raporun **ardından** çalışır ve bulguları arayüz dosyalarına uygular. Denetim adımları (bilgi tabanı, üretim, kalite kapısı) aynen korunur.

Tasarımı sıfırdan kuran ya da bir ekranı yeniden yapan `hci-execute` bu kapsamda değildir; onun kendi akışı ve "bulgu uygulama" modu vardır.

## 2. Tetikleyici

Fix modu yalnızca açık bir tetikleyiciyle çalışır:

- Argüman: `--fix` (varsayılan eşik) ya da `--fix=all` (tüm severity seviyeleri).
- Doğal dil: "düzelt", "uygula", "bulguları düzelt", "fix it", "apply fixes" ve eşdeğerleri.

Tetikleyici yoksa skill **yalnızca raporlar**; hiçbir UI dosyasına yazmaz. Tetikleyici varlığı raporun yazılmasını engellemez: değerlendirme raporu yine üretilir, düzeltmeler ondan sonra uygulanır.

## 3. Ön koşullar

1. **Değerlendirme raporu önce yazılmış olmalı.** Kaynak rapor: `HEURISTIC_EVAL_<proje>.md`, `HCI_REVIEW_<proje>.md`, `COLOR_AUDIT_<proje>.md` ya da `COGNITIVE_LOAD_<proje>.md`. Rapor yoksa önce normal denetim akışını tamamla; fix modu tek başına bulgu üretmez.
2. **Bulgu konumlandırılabilmeli.** Her bulgu bir kod/stil dosyasında dosya + seçici (CSS kuralı, bileşen adı) ya da dosya + satır ile gösterilebilmelidir.
3. **Konumlandırılamayan bulgu düzeltilmez.** Böyle bir bulgu raporda `Elle düzeltilmeli` olarak işaretlenir ve gerekçesi (ör. "hangi bileşende olduğu belirsiz") yazılır.

## 4. Güvenlik kuralları

### 4.1 Çalışma ağacı kontrolü

Düzeltmeye başlamadan önce `git status --porcelain` çalıştır. Çıktı **boş değilse** (kaydedilmemiş değişiklik var) kullanıcıyı uyar ve `AskUserQuestion` ile onay al. Onay yoksa hiçbir düzeltme yapılmaz; yalnızca rapor bırakılır.

### 4.2 Yalnızca arayüz dosyalarına dokunulur

Değiştirilebilecek dosyalar:

- İşaretleme/stil: `.html`, `.htm`, `.css`, `.scss`, `.sass`, `.less`, `.jsx`, `.tsx`, `.vue`, `.svelte`
- Stil token dosyaları: `tokens.css`, `tailwind.config.*`, `theme.*`
- `.js` / `.ts` **yalnızca** dosya açıkça bir bileşen/şablon ise (JSX döndürüyor ya da değişiklik yalnızca sınıf/stil değeriyle sınırlıysa)

Değiştirilmesi **yasak**: iş mantığı, API/veri katmanı, test dosyaları (`*.test.*`, `*.spec.*`, `__tests__/`), yapılandırma ve bağımlılık dosyaları. Emin olunamıyorsa dosyaya dokunma, bulguyu `Elle düzeltilmeli` yaz.

### 4.3 Severity eşiği

Varsayılan: **severity ≥ 2** düzeltilir; 0-1 yalnızca raporlanır. `--fix=all` ile tüm seviyeler düzeltilir. Skill'lerin kendi ölçekleri Nielsen 0-4'e şöyle eşlenir:

| Skill | Kendi ölçeği | Nielsen 0-4 |
|-------|--------------|-------------|
| heuristic-eval | Nielsen 0-4 | aynen |
| hci-review | Critical / High / Medium / Low | 4 / 3 / 2 / 1 |
| color-audit | Metin kontrastı FAIL (WCAG 2.1 SC 1.4.3) ya da UI bileşeni/odak < 3:1 (SC 1.4.11) | 3 |
| color-audit | Durum bilgisinin yalnız renkle verilmesi (SC 1.4.1) | 3 |
| color-audit | Yalnız AAA'da kalan çift (SC 1.4.6), 60-30-10 ya da harmoni sapması | 1 |
| cognitive-load | CCT terim skoru 5 | 4 |
| cognitive-load | CCT terim skoru 4 | 3 |
| cognitive-load | CCT terim skoru 3 | 2 |
| cognitive-load | CCT terim skoru 1-2 | 1 |

### 4.4 Değişiklik planı onayı

Düzeltmeden önce değişecek dosya listesini **TEK mesajla** göster: her satır `dosya → bulgu ID'leri → kısa değişiklik`. Ardından uygula. Kullanıcı itiraz ederse durdur.

### 4.5 Yasaklar

Yeni bağımlılık eklenmez; dosya silinmez; dosya taşınmaz.

## 5. Düzeltme yöntemi

- **En küçük değişiklik.** Mevcut kod stiline ve biçimine uy; ilgisiz satırları yeniden biçimlendirme.
- **Bir bulgu = bir ya da birkaç ilişkili düzenleme.** Bir bulguyu kapatmak için gereken en dar düzenlemeyi yap; kapsamı genişletme.
- **Token önceliği.** Bileşende kullanılabilir bir token varsa ham değer yerine token kullan.
- **Renk tutarlılığı (color-audit).** Renkler tek tek kullanım yerlerinde değil **TOKEN seviyesinde** düzeltilir: değer tek yerde değişir, kullanım yerleri token'a bağlanır. Token katmanı yoksa önce bir katman oluşturmayı öner (`styles/tokens.css` ya da mevcut tema dosyası) ve `AskUserQuestion` ile onay al; onay yoksa rengi yalnız raporla.
- **Değer tahmin edilmez.** Yeni renk değeri `scripts/contrast.py` ile hesaplanır; elle tutulan bir oran kullanılmaz.

## 6. Doğrulama

1. Düzeltmelerden sonra render doğrulamasını çalıştır. Script bu skill'in kendi klasöründedir (`scripts/verify-ui.mjs`); kullanıcının proje kökünde çalıştırılırken skill klasöründeki dosyanın **mutlak yolu** verilir: `node <skill-klasörü>/scripts/verify-ui.mjs <sayfa.html | URL>`. Script kullanıcı projesine kopyalanmaz.
2. Eşikleri `references/thresholds.md` dosyasındaki E1-E13 kontrollerine göre oku. Statik kriterler (E9 birincil eylem, E10 görev derinliği, E11 durum kapsaması) script'te ölçülmez; düzeltilen ekranlarda elle kontrol edilir.
3. Çıkış kodu yorumu:
   - `0` → doğrulandı.
   - `1` → kalan ihlalleri düzelt ve yeniden çalıştır; **en fazla 2 tur**.
   - `2` → araç yok. Statik kontrol yap (HTML/CSS okuma, sınıf-stil eşlemesi) ve rapora `Otomatik render doğrulaması yapılamadı` yaz.
4. Çıktı klasörü (varsayılan `.feza/`) oluştuysa, kullanıcının `.gitignore` dosyasına eklemesini öner.

## 7. Rapor

Mevcut değerlendirme rapor dosyası **korunur**: silinmez, sıfırdan yeniden yazılmaz. Raporun sonuna `## Uygulanan düzeltmeler` bölümü eklenir:

| Bulgu ID | Dosya | Önce | Sonra | Doğrulama |
|----------|-------|------|-------|-----------|
| H1 | `pages/profile.tsx` | Yükleme geri bildirimi yok | Spinner + "Kaydediliyor..." | `verify-ui OK` |

Doğrulama sütunu şu değerlerden birini alır: `verify-ui OK`, `verify-ui FAIL (<kod>)`, `statik`, `Elle düzeltilmeli — <neden>`.

Tablonun ardından düzeltilmeyen bulgular kısa bir liste olarak yazılır (severity < eşik ya da konumlandırılamayan), her biri gerekçesiyle. Değerlendirme raporu kullanıcıya görünürdür; yalnızca gizli kalite kapısı puanı gizli kalır ve rapora yazılmaz.

## 8. Sohbet özeti

En fazla 4 satır:

1. Kaç bulgu düzeltildi / kaçı elle bırakıldı.
2. Değişen dosya sayısı.
3. Doğrulama sonucu (`verify-ui OK` / `FAIL` / `Otomatik render doğrulaması yapılamadı`).
4. Rapor yolu.

## 9. Sınırlar

- **Davranışı değiştiren düzeltme yapılmaz.** Örneğin form akışını yeniden yazma, doğrulama mantığını değiştirme, yeni etkileşim ekleme bu kapsam dışıdır.
- Böyle bir bulgu `Elle düzeltilmeli` olarak işaretlenir ve kullanıcıya `/feza-hci:hci-execute` skill'inin **bulgu uygulama** modu önerilir.
- Fix modu yeni bulgu üretmez; yalnızca mevcut değerlendirme raporundaki bulguları uygular.
- Puan, kontrol listesi skoru ve tur sayısı düzeltme sırasında da kullanıcıya gösterilmez.
