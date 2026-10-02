---
name: hci-review
description: >
  Bir UI ekranının/akışının/projenin tamamının HCI lensiyle holistik
  değerlendirmesi. ISO 9241-210 (eski ISO 13407) user-centered design,
  affordance, usability ve Dix et al. "Human-Computer Interaction" prensipleri
  temelinde. Önce projedeki UI dosyalarını
  (HTML/JSX/Vue/Svelte/templates) tarar; yoksa BRIEF/IDEA/SCREEN açıklamasından
  okur. Kritik gri noktaları (max 3) sorar. Bulguları öncelik sırasına dizer
  ve önerileri somut adımlara çevirir. Tetikleyici: "HCI review", "HCI değerlendir",
  "frontend revize", "UI değerlendirmesi", "/feza-hci:hci-review".
  Fix modu: "--fix", "--fix=all", "düzelt", "bulguları düzelt", "fix it", "apply fixes" — bulguları UI dosyalarına uygular ve verify-ui ile doğrular.
  Uyum raporu: "--acr" — VPAT 2.5 INT/EU yapısına uyumlu ACR (WCAG 2.2 A/AA) üretir.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion
---

# HCI Review

UI/akış için holistik HCI değerlendirmesi. Heuristic-eval'den farkı: sadece kuralları taramaz, **bütünsel deneyim** eleştirisi yapar (kim, hangi bağlamda, hangi görev).

## Tetikleyici
- "/feza-hci:hci-review"
- "HCI değerlendirmesi / review"
- "frontend / UI eleştir / revize öner"
- Fix modu: `--fix`, `--fix=all`, "düzelt", "bulguları düzelt", "fix it", "apply fixes"
- Uyum raporu: `--acr`, "uyum raporu", "ACR", "erişilebilirlik uyum beyanı"

## Adım 0 — Bağlamı Topla

1. UI dosyalarını Glob ile bul:
   - `*.html`, `*.tsx`, `*.jsx`, `*.vue`, `*.svelte`
   - `templates/**/*.html`, `pages/**`, `components/**`, `views/**`
2. Tasarım sistemi varsa: `design-system/`, `tokens.json`, `*.figma.md`
3. CSS: `*.css`, `*.scss`, `tailwind.config.*`
4. `BRIEF.md`/`SCOPE_*.md` — hedef kullanıcı bilgisi
5. `STAKEHOLDERS_*.md` — kullanıcı sınıfları
6. UI bulunmadıysa **TEK** `AskUserQuestion`:
   - **Soru:** "Değerlendirmek için ekran/akış lazım. Hangi yolu istersin?"
   - **Header:** "Girdi yöntemi"
   - **Seçenek 1:** "Brief'te ekranı tanımlayacağım" — Other
   - **Seçenek 2:** "Bir mockup/wireframe yolunu vereceğim" — Other ile path

## Adım 1 — Gri Nokta Tespiti

EN FAZLA 3 SORU:

| # | Gri nokta | Neden kritik |
|---|-----------|--------------|
| 1 | **Hedef kullanıcı sınıfı** (computer-literacy: insufficient/partial/sufficient — standart demografik alanlara uygun) | Eleştirinin uyarlanması |
| 2 | **Birincil görev** (kullanıcı bu ekranda ne yapacak?) | Affordance ve flow değerlendirmesi |
| 3 | **Cihaz / bağlam** (mobile/desktop, ışık, gürültü, internet hızı) | Erişilebilirlik + performans yönü |

## Adım 2 — Bilgi Tabanı

- `references/hci-principles.md` — ISO 9241-210 + Dix et al. prensipleri + sezgisel kontrol listesi.
- `references/evidence-rubric.md` — kanıt türleri, severity ankrajları, ikinci geçiş ve kapsam şeffaflığı (ortak standart).
- `references/deceptive-patterns.md` — aldatıcı tasarım kalıpları (tek kaynak): tanım, TR örnek, düzeltme, ilgili E kodu.
- `references/ux-writing.md` — mikro-metin (etiket, hata, boş durum) bulgularında ölçüt.
- `references/conformance-report.md` — ACR şablonu (VPAT 2.5 INT/EU yapısı, WCAG 2.2 A/AA tam liste, terimler, kanıt kuralları).
- `references/screen-reader.md` — Guidepup ile NVDA/VoiceOver smoke test tarifi (headed, CI dışı, elle tetiklenir; isteğe bağlı).
- `references/output-conventions.md`.

## Adım 3 — Üret

### Çıktı bölümleri

1. **Bağlam** — Hangi ekran/akış, kim için, hangi görev
2. **Kullanıcı Modeli** — bilişsel/perseptüel/ergonomik kısıtlar
3. **Sezgisel İnceleme** — Dix et al.'in 3 ana çatısı:
   - **Learnability** (predictability, synthesizability, familiarity, generalizability, consistency)
   - **Flexibility** (dialog initiative, multithreading, task migratability, substitutivity, customizability)
   - **Robustness** (observability, recoverability, responsiveness, task conformance)
4. **Bulgular Tablosu** (öncelik sıralı):

| # | Bulgu | Etki | Önerilen Aksiyon | Kanıt türü | Kanıt | Referans |
|---|-------|------|------------------|------------|-------|----------|
| F1 | Login butonu görünür değil — kontrast 2.1 (WCAG AA fail) | High | Daha koyu primary kullan | verify-ui kodu | `E2 FAIL, oran 2.1:1` | WCAG 2.1 SC 1.4.3 |
| F2 | Sepet ikonu sayısal badge yok | Medium | Badge ekle | DOM seçici | `.cart-icon` — çocuk öğe yok | Nielsen H1 |
| ... |

Kanıt türü `references/evidence-rubric.md` §1'deki dört değerden biridir. Etki seviyesi
(Critical/High/Medium/Low) `references/evidence-rubric.md` §2'deki severity ankrajlarına göre verilir
(Critical/High → 4/3, Medium/Low → 2/1); severity 3-4 için DOM seçici veya verify-ui kodu zorunludur,
yalnız görsel tahmine dayalı bulgu en fazla Medium'dur.

### İkinci Geçiş

Etki seviyesi Critical/High (severity ≥ 3) bulgular `references/evidence-rubric.md` §4'e göre bağımsız
bir ikinci geçişte, ilk puan gizlenerek yalnız bulgu metni + kanıtla yeniden puanlanır. İki puan
farklıysa bulgu "elle doğrulanmalı" işaretlenir, raporda ayrı listelenir ve nihai severity iki puanın
büyüğü olur.

5. **Olumlu noktalar** — Doğru yapılan 3-5 şey
6. **Aldatıcı tasarım** — Çerez/izin/ödeme/abonelik/ayar ekranlarında bu bölüm **boş bırakılamaz**; `references/deceptive-patterns.md` §4 kontrol soruları yanıtlanır ve en az bir bulgu/teyit yazılır ("Kapsamlı tarama yapıldı, aldatıcı kalıp yok" kabul edilir). E29 engelleyicidir; ihlal severity ≥ 3 (Critical/High) alır.
7. **Elle doğrulanmalı** — ikinci geçişte puanı farklı çıkan (severity ≥ 3) bulgular
8. **Otomatik doğrulanamayanlar** — `references/evidence-rubric.md` §5'teki zorunlu manuel kontrol listesi (`- [ ]` biçiminde): okuma sırasının anlamı, alternatif metin kalitesi, karmaşık bileşen klavye akışı, ekran okuyucuyla deneme, hata mesajlarının anlamı. Manuel maddeler işaretlenmeden rapor "teslim edilebilir" sayılmaz; "0 ihlal = erişilebilir" gibi ifadeler kullanılmaz.
9. **Sonraki adım önerileri** — `/feza-hci:heuristic-eval` (detay), `/feza-hci:usability-eval-plan` (test), `/feza-hci:color-audit`, `/feza-hci:hci-execute` (bulguları uygula)

### Kurallar

- En az **8 bulgu** üret.
- Her bulguda **etki seviyesi** (Critical / High / Medium / Low).
- Her bulguda **somut aksiyon önerisi** (genel "iyileştir" demek yok).
- En az **3 olumlu nokta** (denge için).
- "kullanıcı dostu / modern / temiz" gibi sözcükler YOK; ölçülebilir tespit.
- Mikro-metin bulgularında `references/ux-writing.md` ilkesine (§2) atıf verilir ve somut önerilen metin yazılır (TR, gerekiyorsa EN).

## Adım 4 — Self-Check

- [ ] Bulgu sayısı ≥ 8 mi?
- [ ] Çerez/izin/ödeme/abonelik/ayar ekranlarında aldatıcı tasarım bölümü boş değil mi (E29; `references/deceptive-patterns.md` §4 soruları yanıtlandı mı)?
- [ ] Her bulguda etki + aksiyon var mı?
- [ ] Her bulguda kanıt türü (ekran görüntüsü / DOM seçici / erişilebilirlik ağacı / verify-ui kodu) belirtildi mi?
- [ ] Severity 3-4 bulgularda DOM seçici veya verify-ui kodu kanıtı var mı?
- [ ] Severity ≥ 3 bulgular ikinci geçişte yeniden puanlandı mı; farklı puanlar "Elle doğrulanmalı" listesinde mi ve "Otomatik doğrulanamayanlar" manuel kontrol listesi işaretlendi mi?
- [ ] Olumlu noktalar var mı?
- [ ] Bulgular kullanıcı sınıfına özelleştirildi mi (junior bir kullanıcıya farklı, expert'e farklı)?
- [ ] Yasak terimler yok mu?
- [ ] Fix modu istendiyse: değişecek dosya listesi tek mesajla gösterildi, yalnız UI dosyaları değişti, verify-ui çalıştı, "Uygulanan düzeltmeler" tablosu eklendi?
- [ ] `--acr` istendiyse: verify-ui `--profile` ile çalıştı, `report.json` otomatik satırları dolduruldu, kalan satırlar "Değerlendirilmedi" ve manuel kontrol listesine aktarıldı, kanıtsız "Destekliyor" satırı yok ve "hukuki uyum beyanı değildir" notu var mı?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-hci (HCI)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Dosyaya Yaz
- Dosya: `HCI_REVIEW_<proje>.md`
- Konum: cwd

## Adım 6 — Kullanıcıya Rapor (max 5 satır)
1. Dosya yolu.
2. Bulgu sayısı (Critical / High / Medium / Low dağılımı).
3. Kullanılan input.
4. Top-3 kritik bulgu başlığı.
5. Sonraki: "Detaylı kural denetimi için `/feza-hci:heuristic-eval`; bulguları arayüze uygulamak için `/feza-hci:hci-execute`."

## Adım 7 — Fix Modu (yalnızca tetikleyiciyle)

Tetikleyici yoksa bu adım atlanır; yalnızca rapor verilir.
Tetikleyici: `--fix`, `--fix=all` ya da "düzelt", "bulguları düzelt", "fix it", "apply fixes".
Prosedür: `references/fix-mode.md`. Eşikler: `references/thresholds.md`. Doğrulama:
`node <skill-klasörü>/scripts/verify-ui.mjs <sayfa.html | URL>` (mutlak yol; script kullanıcı projesine kopyalanmaz).
Severity ölçeği Nielsen'e şöyle eşlenir: Critical/High/Medium/Low → 4/3/2/1; varsayılan eşik ≥ 2, `--fix=all` ile tümü.
Bulgu konumu dosya + seçici/satır değilse bulgu düzeltilmez, "Elle düzeltilmeli" olarak işaretlenir.
Her düzeltme `references/fix-mode.md` §6'daki **doğrulama kapısından** geçer: ihlal sayısı kesin azalmazsa
ya da yeni bir E kodu `ok:false` olursa değişiklik geri alınır ve "reddedildi" yazılır (araç yoksa "doğrulanmadı").
Değerlendirme raporunun sonuna "Uygulanan düzeltmeler" tablosu eklenir; rapor yeniden yazılmaz.

## Adım 8 — Uyum Raporu / ACR (yalnızca `--acr` ile)

Tetikleyici: `--acr`, "uyum raporu", "ACR", "erişilebilirlik uyum beyanı". Tetikleyici yoksa atlanır.
Şablon ve terimler: `references/conformance-report.md`.

1. **Ölçümü çalıştır:** verify-ui'yi uyum profiliyle çalıştır —
   `node <skill-klasörü>/scripts/verify-ui.mjs <sayfa.html | URL> --profile wcag22aa|en301549 --out <dir>`
   (mutlak yol; script kullanıcı projesine kopyalanmaz). `en301549` profilinde axe sürümü `EN-301-549`
   etiketini desteklemiyorsa profil `wcag22aa`ya düşer; bunu rapora yaz. `report.json` alanı `profile`
   kullanılan profili taşır. E28 başlık/bölge yapısı `ariaSnapshot()` ile ölçülür; `--aria-baseline <dosya>`
   verilirse farkı rapora ekle.
2. **Otomatik satırları doldur:** `references/conformance-report.md` §5–§6 tablolarındaki her SC için,
   ilgili `report.json → results.E<kod>` sonucunu "Kanıt" sütununa yaz. Bir SC ancak **o SC'ye özgü**
   bir E kodu `ok: true` ise (ya da E1 içinde SC'ye özgü axe kuralı — ör. `image-alt` → 1.1.1 —
   report.json'daki kural kimliğiyle eşleşip `ok: true` ise) "Destekliyor" olur; yalnızca genel
   `E1 ok: true` bir SC'yi "Destekliyor" yapmaz. SC'ye özgü ölçüm yoksa satır "Kısmen / destekleyici
   kanıt" notuyla işaretlenir ve manuel kontrol listesine aktarılır. `ok: false` olanlar "Desteklemiyor" yapılır.
3. **Kalanı "Değerlendirilmedi" bırak:** otomatik kanıtı olmayan, statik/karma ya da manuel satırlar
   "Değerlendirilmedi" olarak kalır ve raporun "Otomatik doğrulanamayanlar" manuel kontrol listesine
   (`references/evidence-rubric.md` §5) aktarılır. Statik/karma bir kriter "Destekliyor" yazılacaksa
   "elle doğrulandı: <kim/ne zaman>" notu zorunludur; kanıtsız "Destekliyor" yasaktır.
4. **Kapsam ve uygulanamazlar:** kriter ürün kapsamı dışındaysa (ör. medya yoksa 1.2.x) "Uygulanamaz"
   + gerekçe yaz. Türkiye için yalnız Genelgesi 2025/10'un WCAG 2.2'ye atfı yazılır; seviye ve TS EN
   numarası yazılmaz.
5. **Dosyaya yaz:** `ACR_<ürün>_<tarih>.md` (ör. `ACR_myapp_2026-10-02.md`) — değerlendirme raporunun
   yanına, cwd'ye. Rapor adı ürün ve ISO tarih içerir.
6. **Not:** "Bu rapor hukuki uyum beyanı değildir" ifadesi rapora konur; "0 ihlal = erişilebilir" yazılmaz.

## Adım 9 — İsteğe bağlı: Performans (INP) ve WCAG 3 etiketi

Bu bölüm **isteğe bağlıdır**, varsayılan kapalıdır; tetiklenmezse atlanır ve kalite kapısını/çıkış kodunu bozmaz.

### Performans (INP)

Tetikleyici: kullanıcı "INP", "performans", "etkileşim gecikmesi" isterse ya da verilen sayfa yoğun istemci tarafı JS içeriyorsa.

`node <skill-klasörü>/scripts/measure-vitals.mjs <sayfa.html | URL> [--json]` — lab INP ölçümü:
sayfa Playwright ile yüklenir, tanımlı etkileşimler (tıklama + Tab/Enter/Space) yapılır ve
`PerformanceObserver` `event` girdilerinden **en kötü** etkileşim süresi alınır. Eşikler
(web.dev/articles/inp): ≤ 200 ms **iyi**, 200–500 ms **iyileştirme gerekli**, > 500 ms **kritik**.
Bu bir lab tahminidir; alan INP'sinin yerine geçmez. Araç yoksa ya da ölçüm yapılamazsa script
çıkış 2 değil, `na` gerekçeli JSON ve çıkış 0 döner. Sonuç bulgu tablosuna eklenirse kanıt türü
"verify-ui kodu" yerine "INP ölçümü" olarak yazılır ve ilgili bulgu en fazla severity 3 alır
(alanda doğrulanmadan 4 verilmez).

### WCAG 3 etiketi (taslak standart, bağlayıcı değil)

İstenirse her bulguya **isteğe bağlı** bir WCAG 3 sonuç etiketi eklenir: **Physical harm / Risk /
Barrier / Friction** (W3C WCAG 3.0 Working Draft, 10 September 2026, §4.1.1). Bu etiketler
**taslak standarttır ve bağlayıcı değildir**; uyum beyanında kullanılmaz, yalnız bulgunun
kullanıcı etkisini sınıflandırmaya yardımcı olur. Etiket verilmezse bulgu tablosunda "-" yazılır.
Eşleme örnekleri: fiziksel erişimi engelleyen şey (Physical harm), A/AA ihlaliyle erişim engeli
(Barrier), görevi zorlaştıran sürtünme (Friction), hataya açık/kayıp riski (Risk).

Bulgular tablosuna istenirse iki isteğe bağlı sütun eklenebilir: **INP (ms)** ve **WCAG 3 etiketi**.

## Sınırlar
- Max 4 soru.
- Tasarım çizme — markdown bulgu tablosu yeterli.
- "Beğendim/beğenmedim" yargısı yok — kanıt + standart referansı.
- Fix modu dışında hiçbir dosya değiştirilmez; fix modu tetiklenirse yalnız UI dosyaları değişir.
