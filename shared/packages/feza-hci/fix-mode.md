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

## 6. Doğrulama (doğrulama kapısı)

Düzeltmeler körü körüne uygulanmaz; her düzeltme (ya da ilişkili düzeltme grubu) bir **doğrulama
kapısından** geçer. Kapı, düzeltmenin ihlali gerçekten azalttığını kanıtlar ve gerilemeyi (regresyonu)
engeller.

1. **Önce taban (baseline) ölçümü al.** Düzeltmeye başlamadan önce ilgili sayfayı doğrula ve
   `ok:false` kriterlerdeki **toplam ihlal sayısını** ve `ok:false` **E kodu kümesini** kaydet. Script
   bu skill'in kendi klasöründedir (`scripts/verify-ui.mjs`); kullanıcının proje kökünde çalıştırılırken
   skill klasöründeki dosyanın **mutlak yolu** verilir:
   `node <skill-klasörü>/scripts/verify-ui.mjs <sayfa.html | URL> --json --out <geçici dizin>`.
   Script kullanıcı projesine kopyalanmaz. `report.json` içindeki `results.<E>` alanlarından
   `ok:false` olanları ve `violations` uzunluklarını toplayarak ihlal sayısını hesapla.
2. **Düzeltmeyi uygula**, sonra aynı ölçümü **yeniden** çalıştır.
3. **Kapı kararı.** Aşağıdaki koşullardan biri sağlanıyorsa düzeltme **reddedilir**:
   - Toplam ihlal sayısı **kesin olarak azalmadıysa** (aynı kaldı ya da arttı), ya da
   - Önce olmayan **yeni bir ihlal türü** ortaya çıktıysa (yeni bir E kodu `ok:false` oldu).
   Reddedilen düzeltme geri alınır: ilgili dosya(lar) `git checkout -- <dosya>` ile eski hâline
   döndürülür ya da uygulanan yama geri alınır. Karar raporda `reddedildi` olarak listelenir.
   Aksi hâlde karar `kabul` olur.
4. **Eşikler.** `references/thresholds.md` dosyasındaki E1-E29 kontrollerine göre oku. Statik kriterler
   (E9 birincil eylem, E10 görev derinliği, E11 durum kapsaması, E19, E20) script'te ölçülmez;
   düzeltilen ekranlarda elle kontrol edilir ve doğrulama sütununa `statik` yazılır.
5. **Çıkış kodu yorumu:**
   - `0` → tüm ihlaller kapandı; doğrulandı.
   - `1` → kalan ihlaller var. Kapı kararına göre ilerle; **en fazla 2 tur**.
   - `2` → araç yok. **Doğrulama kapısı uygulanamaz**: düzeltmeler `doğrulanmadı` olarak işaretlenir
     (kabul/reddedildi kararı verilemez), statik kontrol yapılır (HTML/CSS okuma, sınıf-stil eşlemesi)
     ve rapora `Otomatik render doğrulaması yapılamadı` yazılır.
6. Çıktı klasörü (varsayılan `.feza/`) oluştuysa, kullanıcının `.gitignore` dosyasına eklemesini öner.

## 7. Rapor

Mevcut değerlendirme rapor dosyası **korunur**: silinmez, sıfırdan yeniden yazılmaz. Raporun sonuna `## Uygulanan düzeltmeler` bölümü eklenir:

| Bulgu ID | Dosya | Önce | Sonra | Önce ihlal | Sonra ihlal | Karar | Doğrulama |
|----------|-------|------|-------|------------|-------------|-------|-----------|
| H1 | `pages/profile.tsx` | Yükleme geri bildirimi yok | Spinner + "Kaydediliyor..." | 3 | 1 | kabul | `verify-ui OK` |
| H2 | `pages/checkout.tsx` | Kontrast 3.1:1 | Token güncellendi | 1 | 1 | reddedildi | `git checkout --` |

- **Önce ihlal / Sonra ihlal** — §6'daki tanıma göre `ok:false` kriterlerdeki toplam ihlal sayısı.
- **Karar** — `kabul` ya da `reddedildi` (§6.3 kapı kuralı: azalma yoksa ya da yeni ihlal türü
  doğduysa reddedilir ve değişiklik geri alınır). Araç yoksa kapı uygulanamaz; bu satırlar
  `doğrulanmadı` olarak işaretlenir ve Karar sütununa `doğrulanmadı` yazılır.
- **Doğrulama** sütunu şu değerlerden birini alır: `verify-ui OK`, `verify-ui FAIL (<kod>)`, `statik`,
  `Elle düzeltilmeli — <neden>`.

Tablonun ardından düzeltilmeyen bulgular kısa bir liste olarak yazılır (severity < eşik ya da konumlandırılamayan), her biri gerekçesiyle. Değerlendirme raporu kullanıcıya görünürdür; yalnızca gizli kalite kapısı puanı gizli kalır ve rapora yazılmaz.

## 8. Sohbet özeti

En fazla 4 satır:

1. Kaç bulgu düzeltildi (kabul) / kaçı reddedildi / kaçı elle bırakıldı.
2. Değişen dosya sayısı.
3. Doğrulama sonucu (`verify-ui OK` / `FAIL` / `Otomatik render doğrulaması yapılamadı`).
4. Rapor yolu.

## 9. Sınırlar

- **Davranışı değiştiren düzeltme yapılmaz.** Örneğin form akışını yeniden yazma, doğrulama mantığını değiştirme, yeni etkileşim ekleme bu kapsam dışıdır.
- Böyle bir bulgu `Elle düzeltilmeli` olarak işaretlenir ve kullanıcıya `/feza-hci:hci-execute` skill'inin **bulgu uygulama** modu önerilir.
- Fix modu yeni bulgu üretmez; yalnızca mevcut değerlendirme raporundaki bulguları uygular.
- Puan, kontrol listesi skoru ve tur sayısı düzeltme sırasında da kullanıcıya gösterilmez.
