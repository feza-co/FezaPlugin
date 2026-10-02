<!-- generated from shared/quality-gate.md — do not edit -->
# Gizli Kalite Kapısı (Quality Gate)

Bu prosedür, doküman üreten **tüm FezaPlugin skill'leri** tarafından dosya yazılmadan hemen önce uygulanır. Amaç, kullanıcıya yalnızca belirli bir kalite eşiğini geçmiş (ya da en iyi hâline getirilmiş) son dokümanı teslim etmektir.

Kapı **görünmezdir**: puan, kriter tablosu, revizyon notları ve tur sayısı kullanıcıya gösterilmez, hiçbir dosyaya yazılmaz.

## 1. İşleyiş

```
Taslak v1 (bellekte) → Puanla (100 üzerinden) → Eşik ≥ 85 ve engelleyici yok?
   ├─ Evet → Son dokümanı yaz
   └─ Hayır → Bulgulara göre revize et (v2) → tekrar puanla
              └─ en fazla 2 revizyon turu → en yüksek puanlı sürümü yaz
```

1. **Taslak v1** — Skill dokümanı tam hâliyle üretir ama dosyaya YAZMAZ; taslak yalnızca çalışma belleğinde tutulur.
2. **Kriter seti tespiti** — Dokümanın kriter seti, onu üreten paketin adıyla Bölüm 3'teki tablodan belirlenir.
3. **Puanlama** — Seçilen kriter setindeki her kriter 1-5 arasında puanlanır (Bölüm 2). Her puanın gerekçesi taslaktaki somut bir yere dayanır (bölüm no, gereksinim ID, tablo satırı).
4. **Engelleyici kontrolü** — Bölüm 4'teki engelleyicilerden biri varsa puan ne olursa olsun revizyon zorunludur.
5. **Revizyon yönergesi** — Puanı 4'ün altında kalan her kriter için tek cümlelik, uygulanabilir bir düzeltme yönergesi üretilir (ör. "QoS-PERF-002'ye sayısal eşik ekle: 1000 eşzamanlı kullanıcıda p95 ≤ 800 ms"). "İyileştir" gibi genel yönerge geçersizdir.
6. **Revizyon** — Yönergeler taslağa uygulanır; değişmeyen bölümler korunur. Revizyon yeni boşluk yaratmamalıdır (ID'ler silinmez, yeniden kullanılmaz).
7. **Tur sınırı** — En fazla **2 revizyon turu** (v1 → v2 → v3). Eşik yine geçilemezse en yüksek puanlı sürüm teslim edilir; kapatılamayan içerik eksikleri dokümanın **"Bilinen Boşluklar"** bölümüne içerik boşluğu olarak yazılır (puan veya kapı adı geçmeden; ör. "Performans eşikleri paydaştan teyit edilmedi").
8. **Teslim** — Yalnızca son sürüm dosyaya yazılır. Ara sürümler (v1, v2) dosya olarak saklanmaz.

## 2. Puanlama Formülü

- Her kriter: **1** (yok/yetersiz) · **3** (kısmen) · **5** (tam). 2 ve 4 ara değerlerdir.
- Toplam puan: `Puan = Σ (ağırlık_i × skor_i) / 5`, ağırlıklar yüzde olarak toplam 100.
- **Eşik: 85 / 100.** Kullanıcı ya da skill daha sıkı bir eşik tanımlayabilir; 85'in altına inilmez.
- Puan yuvarlanmaz; 84,6 eşiği geçmez.

## 3. Paket Bazlı Kriter Setleri

| Kriter seti | Dokümanlar (dosya öneki) |
|------|---------------------------|
| feza-requirements — Gereksinim | `SRS_`, `SRS_REVIEW_`, `USER_STORIES_`, `REQ_`, `ELICITATION_KIT_` ile başlayanlar |
| feza-pm — Proje Yönetimi | `LIFECYCLE_PICK_`, `SCOPE_`, `WBS_`, `ESTIMATES_`, `BUDGET_`, `ACTIVITIES_`, `RISK_REGISTER_`, `SWOT_`, `RACI_`, `STAKEHOLDERS_`, `COMM_PLAN_`, `COMPETITORS_` |
| feza-hci — HCI | `HCI_REVIEW_`, `HEURISTIC_`, `USABILITY_`, `COGNITIVE_`, `COLOR_AUDIT_`, `PERSONAS_`, `PROTOTYPE_`, `DESIGN_THINKING_`, `DESIGN_RATIONALE_` |
| feza-sqa — SQA | `SQA_PLAN_`, `TEST_PLAN_`, `METRICS_`, `INSPECTION_`, `TRACEABILITY_`, `CHANGE_`, `CR_`, `DEFECT_`, `DR_` |
| Bütünleşik paket raporu | Birden fazla çıktıyı tek dokümanda birleştiren raporlar (ör. `PACKAGE_`) |

Eşleşme yoksa en yakın kriter seti seçilir; emin olunamıyorsa paket kriter setleri yerine yalnızca **Bölüm 4 engelleyicileri + "Teslim formatı" kriteri** ile kontrol edilir.

### feza-requirements — Gereksinim (SRS, kullanıcı hikayeleri vb.)

| Kriter | Ağırlık | 1 | 3 | 5 |
|--------|---------|---|---|---|
| Outline tamlığı (ISO/IEC/IEEE 29148 + MSRS iskeleti) | %15 | Başlıkların < %50'si dolu | %50-90 dolu | Tüm zorunlu bölümler dolu |
| Bireysel iyi-form kriterleri (Necessary, Appropriate, Unambiguous, Complete, Singular, Verifiable, Feasible, Conforming) | %20 | Gereksinimlerin < %50'si uyumlu | %50-80 | > %80 uyumlu |
| Set kriterleri (Complete, Consistent, Affordable, Bounded) | %10 | Çelişki veya kapsam taşması var | Gerekçesiz TBD var | Çelişki yok, tüm TBD'ler gerekçeli |
| FR/NFR hacmi ve dağılımı | %10 | Hedefin altında | Hedefte ama dengesiz | Skill hacim hedefleri karşılanmış |
| ISO/IEC 25010:2023 NFR etiketleme | %10 | Etiket yok | Yarısı etiketli | Her NFR/QoS alt-karakteristik etiketli |
| Ölçülebilirlik (sayısal eşik/ölçüt) | %10 | Eşik yok | Kısmen | Her NFR'de ölçüt + koşul |
| Yasak terim taraması (dil rehberi) | %10 | ≥ 3 ihlal | 1-2 ihlal | 0 ihlal |
| Doğrulama yöntemi ataması | %5 | Yok | Yarısında | Her gereksinimde (Test/Inspection/Demonstration/Analysis) |
| İzlenebilirlik | %5 | Yok | Tek yönlü | Çift yönlü (kaynak ↔ gereksinim ↔ doğrulama) |
| Teslim formatı (references/output-conventions.md) | %5 | Kapak/özet/içindekiler yok | Kısmen | Tam (sade format istendiyse üst bilgi + Bilinen Boşluklar tam) |

### feza-pm — Proje Yönetimi (kapsam, WBS, tahmin, risk vb.)

| Kriter | Ağırlık | 1 | 3 | 5 |
|--------|---------|---|---|---|
| Standart yöntem uyumu (PMBOK Guide 7th ed., ISO 21502) | %20 | Yöntem belirsiz | Yöntem adı var, adımlar eksik | Yöntem adı + adımlar + standart atfı |
| Sayısal hesap doğruluğu (PERT, CPM, P×I, EVM) | %25 | Hesap yok | Formül ile sonuç tutarsız | Formül + girdiler + sonuç tutarlı |
| Tablo tamlığı | %15 | Boş hücreler yaygın | Yarısı dolu | Her satır dolu |
| Kanıt ve varsayım etiketleme | %10 | Kaynaksız iddialar | Kısmen etiketli | Her satır brief/kod/"Varsayım:" ile |
| Bilinen Boşluklar | %10 | Bölüm yok | Etiketli | Gerekçeli + önerilen çözümlü |
| Bağımlı çıktılarla tutarlılık (SCOPE → WBS → ESTIMATES → BUDGET) | %10 | Çelişkili | Kısmen | Tam tutarlı |
| Teslim formatı | %10 | Eksik | Kısmen | Tam |

### feza-hci — HCI (değerlendirme, heuristik, renk, persona vb.)

| Kriter | Ağırlık | 1 | 3 | 5 |
|--------|---------|---|---|---|
| Bulgu-ilke eşlemesi (Nielsen 1994 heuristikleri, Dix et al. ilkeleri, ISO 9241-110) | %20 | Eşleme yok | Yarısında | Her bulgu bir ilkeye eşlenmiş |
| Şiddet derecelendirmesi (0-4) | %20 | Yok | Kısmen | Her bulguda 0-4 |
| Somut aksiyon | %20 | "İyileştir" düzeyinde | Kısmen spesifik | Her bulguda uygulanabilir düzeltme |
| Erişilebilirlik eşiği (WCAG 2.1) | %15 | Yok | Bahsi geçiyor | AA kriter numaralarıyla, gerekiyorsa AAA |
| Konum kanıtı (ekran, bileşen, kod yolu) | %10 | Yok | Bazı bulgularda | Her bulguda |
| Olumlu gözlem dengesi | %5 | Yok | 1-2 | En az 3 |
| Teslim formatı | %10 | Eksik | Kısmen | Tam |

#### feza-hci engelleyicileri (arayüz üreten çıktılar)

`hci-execute` ve fix modu uygulanan değerlendirmelerde aşağıdaki eşiklerin hepsi sağlanmadan puan ne olursa olsun teslim yapılmaz; ağırlıklı puanlama korunur. Değerlendirme raporlarında manuel kontrol listesi işaretlenmeden teslim edilebilir denmez ve "0 ihlal = erişilebilir" ifadesi kullanılmaz.

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

Sayısal araçlarla ölçülemeyen kriter statik incelemeyle kontrol edilir ve gerekçesi `DESIGN_RATIONALE` dokümanının erişilebilirlik bölümüne kısa bir satırla yazılır; tam tanım ve makine okunur eşikler için feza-hci skill'lerindeki eşik dosyası geçerlidir.

### feza-sqa — SQA (SQA planı, test, inceleme, metrik vb.)

| Kriter | Ağırlık | 1 | 3 | 5 |
|--------|---------|---|---|---|
| Standart yapı uyumu (IEEE 730, ISO/IEC/IEEE 29119-3, IEEE 1028) | %20 | Yapı belirsiz | Kısmen | Standart başlık yapısı tam |
| Sayısal formüller (DRE, kusur yoğunluğu, kapsama) | %20 | Yok | Bahsi geçiyor | Doğru formül + hesap |
| İnceleme kontrol boyutları | %10 | Yok | Yarısı | Tümü |
| Şiddet matrisi | %10 | Yok | Kısmen | Critical/Major/Minor tanımlı ve tutarlı |
| İzlenebilirlik (Gereksinim → Test Case → Kusur) | %15 | Yok | Tek yön | Çift yönlü, üç halka |
| Standart atfı (IEEE 730, IEEE 1028, ISO/IEC/IEEE 12207) | %15 | Yok | Birine | İlgili tümüne |
| Teslim formatı | %10 | Eksik | Kısmen | Tam |

### Bütünleşik Paket Raporu

| Kriter | Ağırlık |
|--------|---------|
| Kapak + numaralı içindekiler | %5 |
| TR + EN özet | %5 |
| Tüm dahil edilen çıktıların temsili | %20 |
| Bölümler arası sayısal tutarlılık | %15 |
| Resmî, teknik dil ve ton | %10 |
| Kaynakça + metin içi atıf tutarlılığı | %10 |
| Gerekçesiz TBD kalmaması | %15 |
| Bilinen Boşluklar eksiksiz | %10 |
| Sonuç ve sonraki adımlar | %10 |

Bütünleşik paket raporu setinde her kriter yine 1-5 puanlanır (1 = yok, 3 = kısmen, 5 = tam).

## 4. Engelleyiciler (puandan bağımsız revizyon nedeni)

- Boş `TBD` (gerekçesiz) — format `TBD — [neden]` olmalı.
- Gereksinim/kriter metninde yasak terim (bkz. ilgili skill'in dil rehberi; ör. "kullanıcı dostu", "hızlı", "esnek" sayısal eşik olmadan).
- "Bilinen Boşluklar" bölümünün olmaması.
- Varsayılan teslim formatında kapak, özet veya içindekilerden birinin eksik olması (kullanıcı sade format istemediyse).
- Yinelenen veya yeniden kullanılmış ID (FR-001 iki kez vb.).
- Etiketsiz maliyet/ücret rakamı ("Varsayım: ..." etiketi olmadan).
- feza-hci arayüz çıktılarında E1-E29 eşiklerinden birinin sağlanmaması (bkz. feza-hci engelleyicileri).

## 5. Görünürlük Kuralları

- Kullanıcıya YALNIZCA son doküman (dosya) ve standart kısa rapor verilir (`references/output-conventions.md` → "Kullanıcıya Rapor").
- Puan, kriter tablosu, revizyon yönergeleri, tur sayısı ve "kalite kapısı" ifadesi sohbette ya da dosyada **yer almaz**.
- Ayrı bir puanlama dosyası (`*_GRADE_*.md`, `*_SCORE_*.md` vb.) **üretilmez**.
- **İstisna:** Kullanıcı açıkça "kalite puanını göster" (veya eşdeğeri: "show quality score") diye isterse, sohbette en fazla 3 satırlık özet verilebilir: toplam puan, en zayıf 2 kriter, yapılan revizyon tur sayısı. Bu özet de dosyaya yazılmaz.

## 6. Sınırlar

- Kapı kullanıcıya soru sormaz; eksik bilgi varsa revizyon "Varsayım: ..." veya `TBD — [neden]` ile kapatılır.
- Puanlama yalnızca taslağın kendisine dayanır; taslakta olmayan içerik "var" sayılmaz.
- Revizyon, kullanıcının verdiği bilgiyi değiştirmez; yalnızca biçim, tamlık ve ölçülebilirliği iyileştirir.
- Her kriterde gerekçe zorunludur; gerekçesiz puan geçersizdir.
