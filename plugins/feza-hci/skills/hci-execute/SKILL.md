---
name: hci-execute
description: >
  HCI ilkelerine tam uygun arayüzü baştan sona tasarlar ve gerçek, çalışan
  arayüz dosyaları olarak kodlar; rapor değil ürün çıktısı verir. Sıfırdan
  açılan bir projede ya da mevcut bir arayüzün yeniden yapımında kullanıcı ve
  görev modeli (ISO 9241-210), bilgi mimarisi ve ASCII wireframe, token tabanlı
  tasarım sistemi (WCAG 2.1 AA kontrast hesaplı, açık ve koyu tema, 4/8 pt
  ızgara), erişilebilir ve responsive ekranlar üretir; ardından Nielsen 10,
  Dix et al. ilkeleri, WCAG 2.1 AA ve bilişsel yük kontrolüyle kendi çıktısını
  gizlice denetleyip düzeltir. BRIEF/README, PERSONAS_/SCOPE_/USER_STORIES_ ve
  HEURISTIC_EVAL_/HCI_REVIEW_/COLOR_AUDIT_ dosyalarını okur, mevcut UI stack'ini
  (React, Next, Vue, Svelte, Tailwind, düz HTML) tespit eder; stack yoksa
  bağımlılıksız HTML + CSS + vanilla JS yazar. Yanında DESIGN_RATIONALE_<proje>.md
  teslim eder. Tetikleyici: "hci-execute", "HCI uyumlu tasarım yap", "arayüzü
  sıfırdan tasarla", "UI tasarla ve kodla", "design and build the UI",
  "/feza-hci:hci-execute".
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion
---

# HCI Execute

Diğer `feza-hci` skill'leri değerlendirir ve bulgu listeler; bu skill **tasarlar ve uygular**. Çıktı, HCI ilkelerine uygun, çalışan arayüz dosyaları ile kısa bir tasarım gerekçesi dokümanıdır.

| Mod | Ne zaman | Davranış |
|-----|----------|----------|
| **Sıfırdan** | Projede UI dosyası yok | Bilgi mimarisinden koda tüm akış |
| **Yeniden yapım** | UI var, kullanıcı yeniden yapılmasını istiyor | Mevcut ekranları envanterle, işlevleri koru, tasarım ve kodu yeniden kur |
| **Bulgu uygulama** | `HEURISTIC_EVAL_*`, `HCI_REVIEW_*`, `COLOR_AUDIT_*` ya da `COGNITIVE_LOAD_*` var | Bulguları severity sırasıyla uygula, her bulguyu bir değişikliğe bağla |

## Tetikleyici
- "/feza-hci:hci-execute"
- "hci-execute", "HCI uyumlu tasarım yap"
- "arayüzü sıfırdan tasarla", "UI tasarla ve kodla"
- "design and build the UI"

## Adım 0 — Bağlamı Topla

`references/input-discovery.md` sırasını izle.

1. **Brief:** `BRIEF.md`, `BRIEF_*.md`, `IDEA.md`, `README.md` (amaç, hedef kullanıcı, ana özellikler).
2. **Önceki FezaPlugin çıktıları:** `PERSONAS_*.md`, `SCOPE_*.md`, `USER_STORIES_*.md`, `SRS_*.md`, `DESIGN_THINKING_*.md`, `PROTOTYPE_PLAN_*.md`.
3. **Değerlendirme çıktıları (varsa bulgu uygulama modu):** `HEURISTIC_EVAL_*.md`, `HCI_REVIEW_*.md`, `COLOR_AUDIT_*.md`, `COGNITIVE_LOAD_*.md`.
4. **UI stack tespiti** (Glob/Grep):

| İpucu | Stack | Yazım biçimi |
|-------|-------|--------------|
| `package.json` içinde `next` | Next.js | `app/` ya da `pages/` altına route; bileşenler `components/` |
| `react` (next yok) | React | `src/components/`, `src/pages/` ya da mevcut yapı |
| `vue`, `*.vue` | Vue | SFC; mevcut `src/views/`, `src/components/` |
| `svelte`, `*.svelte` | Svelte/SvelteKit | `src/routes/`, `src/lib/components/` |
| `tailwind.config.*` | Tailwind | Token'lar `theme.extend` içine; CSS değişkenleriyle eşlenir |
| `*.html` ve paket yöneticisi yok | Düz HTML | Mevcut klasör yapısı korunur |
| Hiçbiri | **Varsayılan** | Bağımlılıksız semantik HTML + CSS custom properties + vanilla JS |

5. Mevcut stack'teki bileşen kütüphanesini (`shadcn`, `MUI`, `Vuetify` vb.) ve CSS yaklaşımını (modules, styled, utility) not et; yeni bağımlılık **ekleme**, mevcut olanı kullan.
6. Brief de yoksa **TEK** soru: "Ne inşa ediyoruz? (1-2 cümle: ürün, kullanıcı, ana iş)"

## Adım 1 — Gri Noktalar (en fazla 3 soru)

Bağlamdan cevaplanabilen soruyu sorma. `AskUserQuestion` ile tek seferde sor:

| # | Gri nokta | Neden kritik | Varsayılan (cevap yoksa) |
|---|-----------|--------------|--------------------------|
| 1 | **Hedef kullanıcı ve platform** (kim, mobil/masaüstü/ikisi, kullanım bağlamı) | Dokunma hedefi, yoğunluk, navigasyon kalıbı | Genel yetişkin kullanıcı, mobil önce responsive web |
| 2 | **Ana görevler** (kullanıcının en sık yaptığı 1-3 iş) | Bilgi mimarisi ve öncelik | Brief'teki ilk üç özellik |
| 3 | **Marka/ton kısıtı** (sabit renk, yazı tipi, resmî/samimi dil) | Palet ve mikro metin | Nötr, güven veren mavi birincil renk; resmî ama sade dil |

Gerisini akıllıca varsay; her varsayımı `Varsayım:` etiketiyle kaydet ve teslimde listele.

## Bilgi Tabanı (üretimden önce)

Üretime geçmeden oku:

- `references/design-system-rules.md` — token yapısı, kontrast formülü ve `scripts/contrast.py` kullanımı, renk, tipografi, boşluk, hareket kuralları.
- `references/implementation-checklist.md` — erişilebilirlik ve heuristik uygulama kontrol listesi, bileşen durum matrisi, doğrulama prosedürü.
- `references/screen-patterns.md` — ekran tarifleri indeksi; her ekran için ilgili `references/recipe-<ad>.md` (8 bölümlü tarif: yerleşim, zorunlu durumlar, etkileşim, erişilebilirlik, sık hatalar, mikro-metin, kabul kontrolleri).
- `references/ux-writing.md` — buton, form, hata, boş durum, onay, toast, yükleniyor ve izin metinleri; ton rehberi (TR 'siz', EN aktif çatı); mikro-metin kontrol listesi.
- `references/output-conventions.md`, `references/delivery-format.md`, `references/quality-gate.md`.

## Adım 2 — Kullanıcı ve Görev Modeli (ISO 9241-210)

Kullanıcı merkezli tasarımın dört etkinliğini sırayla uygula: kullanım bağlamını anla, kullanıcı gereksinimlerini belirle, tasarım çözümü üret, gereksinimlere karşı değerlendir (Adım 6).

1. **Kısa persona** — `PERSONAS_*.md` varsa birincil personayı oradan al. Yoksa `/feza-hci:persona` mantığıyla tek birincil persona çıkar (isim, rol, teknoloji düzeyi, hedef, en büyük engel, kullanım bağlamı) ve **Provisional** olarak etiketle.
2. **Birincil görevler** — en fazla 5 görev; her biri için sıklık (günlük/haftalık/nadir) ve kritiklik.
3. **Görev akışları** — her birincil görev için adım dizisi:

```text
G1 Kayıt oluştur: Liste → [Yeni] → Form (3 alan) → [Kaydet] → Geri bildirim (toast) → Liste (yeni kayıt üstte)
                                    └─ doğrulama hatası → alan içi mesaj → düzelt → [Kaydet]
```

4. **Başarı ölçütleri** — her görev için ölçülebilir hedef (ör. "G1 en fazla 4 etkileşimde tamamlanır", "hata sonrası kurtarma 1 adım").

## Adım 3 — Bilgi Mimarisi ve Wireframe

1. **Ekran envanteri** — tablo: ekran ID (S1..Sn), amaç, hizmet ettiği görev, giriş noktası, kullanılan kalıp, tarif. Her ekran için `references/screen-patterns.md` indeksinden uygun `references/recipe-<ad>.md` tarifini seç ve OKU. Uygun tarif yoksa en yakın kalıbı kullan ve `Varsayım: <ekran> için <tarif> uyarlandı` diye kaydet.
2. **Navigasyon modeli** — birincil gezinme en fazla 5-7 öğe (Miller); mobilde alt sekme çubuğu ya da başlık menüsü, masaüstünde yan ya da üst gezinme. Her ekranda kullanıcının nerede olduğu görünür (H1, H6).
3. **İçerik hiyerarşisi** — her ekran için birincil eylem tek ve görsel olarak baskın; ikincil eylemler ayrışık.
4. **ASCII wireframe** — her ekran için mobil (360 px) ve gerekiyorsa masaüstü (≥ 1024 px) iskeleti:

```text
+--------------------------------+
| [Logo placeholder]  Görevler ☰ |  <- header (banner)
+--------------------------------+
| Görevler            [+ Yeni]   |  <- h1 + birincil eylem
| [Ara............] [Filtre v]   |
|--------------------------------|
| [ ] Rapor hazırla    Bugün   > |
| [x] Toplantı notu    Dün     > |
|--------------------------------|
| Boş ise: "Henüz görev yok"     |
|          [İlk görevi ekle]     |
+--------------------------------+
| Ana   Görevler   Profil        |  <- nav (alt sekme)
+--------------------------------+
```

Seçilen tarifin "2. ASCII yerleşim" bölümü wireframe için başlangıç noktasıdır; sapma varsa gerekçesiyle rationale'e yazılır. Wireframe'ler `DESIGN_RATIONALE_<proje>.md` dokümanına girer; kod yazmadan önce yapı burada sabitlenir.

## Adım 4 — Tasarım Sistemi

Kurallar ve formül: `references/design-system-rules.md`. Token'lar kodda **tek yerde** tanımlanır (varsayılan: `styles/tokens.css`; Tailwind'de `tailwind.config.*` + CSS değişkenleri; CSS-in-JS'de tek `theme` dosyası). Bileşenlerde ham hex, px boşluk ya da yazı tipi değeri kullanılmaz.

| Alan | Zorunlu içerik |
|------|----------------|
| **Renk** | Harmoni seçimi ve gerekçesi; 60-30-10 dağılımı (nötr zemin / yüzey-ikincil / vurgu); anlamsal roller (`--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-primary`, `--color-on-primary`, `--color-border`, `--color-focus`, `--color-danger`, `--color-success`, `--color-warning`, `--color-info`) |
| **Kontrast** | Her metin/zemin ve UI/zemin çifti **hesaplanır** (tahmin edilmez): metin ≥ 4.5:1, büyük metin (≥ 24 px ya da ≥ 18.66 px kalın) ve UI bileşeni/odak göstergesi ≥ 3:1. Hesap `scripts/contrast.py` ile Bash üzerinden yapılır (`python scripts/contrast.py --css styles/tokens.css --pairs <çiftler.json>`); Python yoksa formül `references/design-system-rules.md` 2.4'e göre elle uygulanır |
| **Renk körlüğü** | Durum bilgisi asla yalnız renkle verilmez (ikon + metin önek); kırmızı/yeşil çiftleri parlaklık farkıyla da ayrışır |
| **Tema** | Açık ve koyu tema; `prefers-color-scheme` ile otomatik, `[data-theme]` ile elle seçim; koyu temada tüm çiftler yeniden hesaplanır |
| **Tipografi** | Sistem yazı tipi yığını (marka fontu verilmediyse); oranlı ölçek (ör. 1.25), gövde ≥ 16 px, satır yüksekliği gövdede 1.5, satır uzunluğu 45-75 karakter; `rem` birimi |
| **Boşluk** | 4/8 pt ızgara: 4, 8, 12, 16, 24, 32, 48, 64 |
| **Biçim** | Köşe yarıçapı 2-3 kademe; gölge 2-3 kademe (koyu temada kenarlık/yüzey tonuyla desteklenir) |
| **Hareket** | Süre 100-300 ms, anlamlı geçişler; `prefers-reduced-motion: reduce` altında animasyon kapatılır ya da anlık geçişe iner |
| **Bileşen durumları** | default, hover, focus-visible, active, disabled, loading, empty, error, success — her etkileşimli bileşen için `references/implementation-checklist.md` durum matrisi doldurulur |

## Adım 5 — Uygulama

Ekranları gerçek dosyalar olarak yaz. Mevcut stack varsa onun klasör yapısını, adlandırmasını ve bileşen kalıplarını izle. Stack yoksa varsayılan düzen:

```text
<proje kökü>/
├── index.html              S1 (giriş ekranı)
├── <ekran>.html            diğer ekranlar (ya da tek sayfa + hash yönlendirme)
├── styles/
│   ├── tokens.css          tek token kaynağı (açık + koyu tema)
│   ├── base.css            reset, tipografi, odak stili, reduced-motion
│   └── components.css      bileşenler ve durumları
├── scripts/
│   └── app.js              etkileşim, doğrulama, durum geri bildirimi
└── assets/
    └── logo-placeholder.svg
```

Projede zaten `index.html` ya da çakışan dosya varsa üzerine yazmadan önce sor ya da `ui/` alt klasörünü kullan.

### Zorunlu uygulama kuralları

| # | Kural | İlke |
|---|-------|------|
| 1 | Semantik HTML: `header`, `nav`, `main`, `footer`, `section`/`article`, başlık sırası atlanmadan (tek `h1`) | WCAG 1.3.1, 2.4.6 |
| 2 | Sayfa başında "İçeriğe atla" bağlantısı; `lang` ve anlamlı `title` | WCAG 2.4.1, 3.1.1, 2.4.2 |
| 3 | Her form alanında görünür `<label>`; yardım ve hata metni `aria-describedby` ile bağlı; zorunlu alan metinle belirtilir | WCAG 1.3.1, 3.3.2 |
| 4 | Tam klavye kullanımı: mantıklı sekme sırası, tuzak yok, özel bileşende ok tuşları, `Esc` ile diyalog kapanır ve odak geri döner | WCAG 2.1.1, 2.1.2, 2.4.3 |
| 5 | Görünür odak: `:focus-visible` için ≥ 2 px, ≥ 3:1 kontrastlı halka; `outline: none` yalnız yerine eşdeğer stil varsa | WCAG 2.4.7, 1.4.11 |
| 6 | ARIA yalnızca gerektiğinde: yerel öğe varsa (`button`, `dialog`, `details`) onu kullan; canlı bölge (`aria-live="polite"`) durum mesajları için | WCAG 4.1.2, 4.1.3 |
| 7 | Dokunma hedefi ≥ 44 × 44 CSS px (görsel küçük olsa da tıklanabilir alan) | WCAG 2.5.5 (AAA, burada hedef olarak benimsenir) |
| 8 | Mobil önce responsive: tek sütundan başla, `min-width` kırılımları; 320 px'de yatay kaydırma yok; %200 yazı büyütmede içerik kaybı yok | WCAG 1.4.10, 1.4.4 |
| 9 | Hata önleme: uygun `type`/`inputmode`/`autocomplete`, kısıt ipucu önceden; yıkıcı eylemde onay ya da geri al | Nielsen H5, WCAG 3.3.4 |
| 10 | Anlamlı hata mesajı: ne oldu + neden + nasıl düzeltilir; alanın yanında ve özet olarak; girilen veri korunur | Nielsen H9, WCAG 3.3.1, 3.3.3 |
| 11 | Sistem durumu: her eylemde ≤ 100 ms görsel tepki; 1 s'yi aşan işte yükleniyor durumu; sonuçta başarı/hata bildirimi | Nielsen H1 |
| 12 | Kullanıcı kontrolü: iptal, geri, geri al (silmede 5-10 s "Geri al" toast'u); kaydedilmemiş değişiklikte uyarı | Nielsen H3 |
| 13 | Tutarlılık: aynı eylem aynı etiket, aynı konum, aynı bileşen; platform kalıplarına uyum | Nielsen H4, Dix: consistency |
| 14 | Tanıma > hatırlama: görünür etiketler, son kullanılanlar, varsayılan değerler, ikonla birlikte metin | Nielsen H6 |
| 15 | Bilişsel yük: bir grupta 7±2 öğeyi aşma (Miller), seçenek sayısını sınırla (Hick), ilgili öğeleri yakınlık ve ortak zeminle grupla (Gestalt), ileri seçenekleri aşamalı göster (progressive disclosure) | Miller 1956, Hick 1952, Gestalt |
| 16 | Yardım: alan içi ipucu ve bağlamsal açıklama; boş durumda ilk eylemi öner | Nielsen H10 |
| 17 | Görseller: anlamlı görselde `alt`, süs görselinde `alt=""`; logo yerine işaretli placeholder | WCAG 1.1.1 |

Her ekran için seçilen `references/recipe-<ad>.md` tarifini uygula: "3. Zorunlu durumlar" tablosundaki her durumu (varsayılan, yükleniyor, boş, hata, başarı, devre dışı) **gerçekten** kodla, "4. Etkileşim kuralları" ve "5. Erişilebilirlik notları"nı izle, "6. Sık yapılan hatalar"dan kaçın, "8. Kabul kontrolleri"ni Adım 6'da E1-E13'e ek olarak işaretle. Örnek veri gerçekçi ve yerelleştirilmiş olsun; `Lorem ipsum` kullanma.

### Mikro-metin

Tüm arayüz metni (buton, form etiketi, hata, boş durum, onay, toast, yükleniyor, izin) `references/ux-writing.md` §2-§4'e göre yazılır. Kullanılan terimlerin **terim sözlüğü** `DESIGN_RATIONALE_<proje>.md` dosyasına eklenir ve tüm ekranlar bu sözlüğe uyar. Brief marka tonu verdiyse metin ona uyarlanır; ton uyarlaması netlik kurallarını (§2) gevşetmez.

## Adım 6 — Gizli Doğrulama Döngüsü

Kullanıcıya puan, kontrol listesi sonucu ya da tur sayısı **gösterme**. `references/quality-gate.md` mantığıyla çalışır; prosedürün ayrıntısı `references/implementation-checklist.md` → "Doğrulama Prosedürü".

```text
Uygulama v1 → verify-ui.mjs + görsel inceleme + statik kontroller
   → ihlal ya da severity ≥ 2 bulgu var mı?
      ├─ Hayır → Teslim
      └─ Evet → Düzelt → yeniden çalıştır → en fazla 2 tur
                └─ kapanmayanlar → DESIGN_RATIONALE "Bilinen Boşluklar"
```

1. **Render doğrulaması (önce):** `node scripts/verify-ui.mjs <giriş sayfası ya da yerel sunucu URL'si>` — script bu skill klasöründedir; kullanıcı projesinin kökünde çalıştırılırken skill klasöründeki dosyanın mutlak yolu verilir. 320/390/768/1280 px'de ekran görüntüsü, axe-core (WCAG 2.1 A/AA), yatay kaydırma, dokunma hedefi, klavye/odak testi, reduced-motion + koyu tema ikinci geçişi ve %200 metin büyütme yapar. Çıktı `.feza/ui-check/<zaman>/` altında (ekran görüntüleri + `report.json`); bu klasör teslimin parçası değildir, kullanıcıya `.feza/` dizinini `.gitignore`'a eklemesi önerilir. Çıkış kodu 0 = eşikler sağlandı, 1 = ihlal, 2 = araç yok. Projeye bağımlılık eklenmez; script gerekirse paketleri geçici kullanıcı önbelleğine kurar.
2. **Görsel inceleme:** ekran görüntülerini Read aracıyla aç; hizalama, taşma, görsel hiyerarşi, boşluk tutarlılığı ve koyu temada okunurluk sorunlarını bulgu olarak ekle.
3. **Sayısal eşikler:** `references/thresholds.md` E1-E13; sonuçlar `report.json` → `results` alanında. Statik kriterler (E9, E10, E11) elle kontrol edilir. E1-E13'ten biri FAIL ise severity'den bağımsız düzeltilir.
4. **Nielsen 10** — her heuristik için en az bir kontrol; bulgulara Nielsen 0-4 severity ver.
5. **Dix et al. ilkeleri** — öğrenilebilirlik (öngörülebilirlik, tutarlılık, aşinalık), esneklik (diyalog inisiyatifi, ikame edilebilirlik), sağlamlık (gözlenebilirlik, kurtarılabilirlik, yanıt verebilirlik, görev uygunluğu).
6. **WCAG 2.1 AA kontrol listesi** — `references/implementation-checklist.md` A ve AA maddeleri.
7. **Kontrast hesabı** — `scripts/contrast.py` ile `styles/tokens.css` içindeki her çift yeniden hesaplanır; açık ve koyu tema ayrı (`--theme light` / `--theme dark`); Python yoksa formül `references/design-system-rules.md` 2.4'e göre elle uygulanır.
8. **Bilişsel yük** — `/feza-hci:cognitive-load` mantığı: ekran başına etkileşimli öğe sayısı, grup sayısı, karar noktası, geri bildirim gecikmesi.
9. **Mikro-metin kontrolü** — `references/ux-writing.md` §6 listesi: belirsiz buton etiketi, suçlayıcı hata dili, terim tutarsızlığı, placeholder-etiket, eksik düzeltme yönergesi, yerel ayar biçimi. Her ihlal severity ≥ 2 sayılır.

**Düzeltme turu:** `report.json` ihlalleri ve görsel bulgular düzeltilir; script yeniden çalıştırılır. En fazla 2 tur.

**Araç yoksa (çıkış 2):** statik kontrole düşülür; DESIGN_RATIONALE "Bilinen Boşluklar" bölümüne "Otomatik render doğrulaması yapılamadı (Playwright/Node bulunamadı); statik kontrol yapıldı." yazılır.

Severity ≥ 2 her bulgu düzeltilir. 0-1 bulgular zaman kalırsa düzeltilir, kalmazsa "Bilinen Boşluklar"a yazılır.

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. `DESIGN_RATIONALE_<proje>.md` dokümanını yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-hci (HCI)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil). Bu skill'de "bulgu" yerine **tasarım kararı** okunur: her karar bir ilkeye (Nielsen, Dix et al., ISO 9241-110, WCAG) eşlenir, her kararın kod konumu verilir, kalan boşluklar 0-4 severity taşır.
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 7 — Teslim

### 7.1 Arayüz dosyaları
Adım 5'teki dosyalar, Adım 6 düzeltmeleri uygulanmış hâliyle. Her dosyanın başında tek satırlık amaç yorumu olabilir; gereksiz yorum yazma.

### 7.2 `DESIGN_RATIONALE_<proje>.md`

Konum: proje kökü. Teslim formatı: kapak, özet (TR + EN), numaralı içindekiler, aşağıdaki ana bölümler, kaynakça, ekler.

| # | Bölüm | İçerik |
|---|-------|--------|
| 1 | Bağlam ve kapsam | Mod (sıfırdan / yeniden yapım / bulgu uygulama), stack, üretilen ekranlar |
| 2 | Kullanıcı ve görev modeli | Persona özeti (Provisional/Validated), birincil görevler, akışlar, başarı ölçütleri |
| 3 | Bilgi mimarisi | Ekran envanteri, navigasyon modeli, ASCII wireframe'ler |
| 4 | Tasarım sistemi | Token tablosu (ad, açık değer, koyu değer, rol), kontrast tablosu (çift, oran, eşik, sonuç), tipografi ölçeği, boşluk ızgarası, hareket kuralları |
| 5 | Tasarım kararları | Tablo: karar, gerekçe, ilke (Nielsen/Dix/ISO 9241-110/WCAG), kod konumu (`dosya:satır` ya da seçici) |
| 6 | Erişilebilirlik beyanı | Hedef: WCAG 2.1 AA; karşılanan kriterler; doğrulama yöntemi (verify-ui render + axe / statik); bilinen sınırlamalar. Uygunluk "iddia" değil "hedef ve öz-denetim sonucu" olarak yazılır |
| 7 | Bulgu izlenebilirliği | Yalnız bulgu uygulama modunda: bulgu ID → yapılan değişiklik → dosya |
| 8 | Varsayımlar | Her biri `Varsayım:` etiketiyle |
| 9 | Kaynakça | Nielsen 1994; ISO 9241-210:2019; ISO 9241-110:2020; WCAG 2.1 (W3C, 2018); Dix, Finlay, Abowd, Beale 2004; Miller 1956; Hick 1952 — yalnız kullanılanlar |
| Ek | Bilinen Boşluklar | Kapanmayan bulgular (severity ile), placeholder varlıklar, gerçek kullanıcı testi yapılmadığı notu |

### 7.3 Sohbet özeti (en fazla 6 satır)
1. Üretilen arayüz dosyaları (kök klasör + dosya sayısı) ve rationale dosyasının yolu.
2. Stack ve mod.
3. Ekran sayısı ve kapsanan birincil görevler.
4. Erişilebilirlik hedefi ve doğrulama yöntemi (statik / render edildi).
5. Varsayım ve bilinen boşluk sayısı.
6. Sonraki: `/feza-hci:usability-eval-plan` (gerçek kullanıcılarla doğrula), bağımsız denetim için `/feza-hci:heuristic-eval`.

## Adım 8 — Self-Check
- [ ] Stack tespit edildi; yeni bağımlılık eklenmedi?
- [ ] Her birincil görevin uçtan uca akışı kodda çalışıyor?
- [ ] Token'lar tek dosyada; bileşenlerde ham renk/boşluk yok?
- [ ] Tüm renk çiftleri açık ve koyu temada hesaplandı, eşikleri geçiyor?
- [ ] Her etkileşimli bileşende durum matrisi tam (focus-visible, disabled, loading, error dahil)?
- [ ] Boş, yükleniyor ve hata durumları kodlandı?
- [ ] Klavyeyle tüm görevler tamamlanabiliyor; odak görünür ve sıralı?
- [ ] 320 px'de yatay kaydırma yok; dokunma hedefleri ≥ 44 px?
- [ ] `prefers-reduced-motion` ve `prefers-color-scheme` destekleniyor?
- [ ] Severity ≥ 2 bulgu kalmadı ya da Bilinen Boşluklar'a gerekçeli yazıldı?
- [ ] `scripts/verify-ui.mjs` çalıştı ve çıkış 0 verdi (ya da çıkış 2 Bilinen Boşluklar'a yazıldı)?
- [ ] Ekran görüntüleri görsel olarak incelendi?
- [ ] Her ekran bir tarife bağlandı; tarif yoksa varsayım kaydedildi?
- [ ] Mikro-metinler `references/ux-writing.md` §6 kontrol listesinden geçti?
- [ ] Logo ve marka varlıkları placeholder olarak işaretli?

## Sınırlar
- En fazla 3 soru (Adım 0'daki brief sorusu dahil değil).
- Logo, illüstrasyon ya da marka varlığı üretmez; işaretli placeholder koyar (`assets/logo-placeholder.svg`, `alt` metniyle).
- Gerçek kullanıcı testinin yerini tutmaz; doğrulama için `/feza-hci:usability-eval-plan` önerilir.
- Backend, kimlik doğrulama ya da veri kalıcılığı yazmaz; gerekiyorsa sahte veri ve açık bir `TBD — <neden>` arayüzü bırakır.
- Mevcut işlevleri yeniden yapımda kaldırmaz; kaldırma gerekiyorsa kullanıcıya sorar.
- Kontrast oranını tahmin etmez; hesaplar.
- Puan, kontrol listesi skoru ya da tur sayısı göstermez.
