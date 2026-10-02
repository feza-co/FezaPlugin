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
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion
---

# HCI Review

UI/akış için holistik HCI değerlendirmesi. Heuristic-eval'den farkı: sadece kuralları taramaz, **bütünsel deneyim** eleştirisi yapar (kim, hangi bağlamda, hangi görev).

## Tetikleyici
- "/feza-hci:hci-review"
- "HCI değerlendirmesi / review"
- "frontend / UI eleştir / revize öner"
- Fix modu: `--fix`, `--fix=all`, "düzelt", "bulguları düzelt", "fix it", "apply fixes"

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
- `references/ux-writing.md` — mikro-metin (etiket, hata, boş durum) bulgularında ölçüt.
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
| F1 | Login butonu görünür değil — kontrast 2.1 (WCAG AA fail) | Yüksek (erişilebilirlik) | Daha koyu primary kullan | verify-ui kodu | `E2 FAIL, oran 2.1:1` | WCAG 2.1 SC 1.4.3 |
| F2 | Sepet ikonu sayısal badge yok | Orta (visibility of system status) | Badge ekle | DOM seçici | `.cart-icon` — çocuk öğe yok | Nielsen H1 |
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
6. **Elle doğrulanmalı** — ikinci geçişte puanı farklı çıkan (severity ≥ 3) bulgular
7. **Otomatik doğrulanamayanlar** — `references/evidence-rubric.md` §5'teki zorunlu manuel kontrol listesi (`- [ ]` biçiminde): okuma sırasının anlamı, alternatif metin kalitesi, karmaşık bileşen klavye akışı, ekran okuyucuyla deneme, hata mesajlarının anlamı. Manuel maddeler işaretlenmeden rapor "teslim edilebilir" sayılmaz; "0 ihlal = erişilebilir" gibi ifadeler kullanılmaz.
8. **Sonraki adım önerileri** — `/feza-hci:heuristic-eval` (detay), `/feza-hci:usability-eval-plan` (test), `/feza-hci:color-audit`, `/feza-hci:hci-execute` (bulguları uygula)

### Kurallar

- En az **8 bulgu** üret.
- Her bulguda **etki seviyesi** (Critical / High / Medium / Low).
- Her bulguda **somut aksiyon önerisi** (genel "iyileştir" demek yok).
- En az **3 olumlu nokta** (denge için).
- "kullanıcı dostu / modern / temiz" gibi sözcükler YOK; ölçülebilir tespit.
- Mikro-metin bulgularında `references/ux-writing.md` ilkesine (§2) atıf verilir ve somut önerilen metin yazılır (TR, gerekiyorsa EN).

## Adım 4 — Self-Check

- [ ] Bulgu sayısı ≥ 8 mi?
- [ ] Her bulguda etki + aksiyon var mı?
- [ ] Her bulguda kanıt türü (ekran görüntüsü / DOM seçici / erişilebilirlik ağacı / verify-ui kodu) belirtildi mi?
- [ ] Severity 3-4 bulgularda DOM seçici veya verify-ui kodu kanıtı var mı?
- [ ] Severity ≥ 3 bulgular ikinci geçişte yeniden puanlandı mı; farklı puanlar "Elle doğrulanmalı" listesinde mi ve "Otomatik doğrulanamayanlar" manuel kontrol listesi işaretlendi mi?
- [ ] Olumlu noktalar var mı?
- [ ] Bulgular kullanıcı sınıfına özelleştirildi mi (junior bir kullanıcıya farklı, expert'e farklı)?
- [ ] Yasak terimler yok mu?
- [ ] Fix modu istendiyse: değişecek dosya listesi tek mesajla gösterildi, yalnız UI dosyaları değişti, verify-ui çalıştı, "Uygulanan düzeltmeler" tablosu eklendi?

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
Değerlendirme raporunun sonuna "Uygulanan düzeltmeler" tablosu eklenir; rapor yeniden yazılmaz.

## Sınırlar
- Max 4 soru.
- Tasarım çizme — markdown bulgu tablosu yeterli.
- "Beğendim/beğenmedim" yargısı yok — kanıt + standart referansı.
- Fix modu dışında hiçbir dosya değiştirilmez; fix modu tetiklenirse yalnız UI dosyaları değişir.
