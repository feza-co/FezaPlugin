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
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# HCI Review

UI/akış için holistik HCI değerlendirmesi. Heuristic-eval'den farkı: sadece kuralları taramaz, **bütünsel deneyim** eleştirisi yapar (kim, hangi bağlamda, hangi görev).

## Tetikleyici
- "/feza-hci:hci-review"
- "HCI değerlendirmesi / review"
- "frontend / UI eleştir / revize öner"

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

| # | Bulgu | Etki | Önerilen Aksiyon | Referans |
|---|-------|------|------------------|-----------------|
| F1 | Login butonu görünür değil — kontrast 2.1 (WCAG AA fail) | Yüksek (erişilebilirlik) | Daha koyu primary kullan | WCAG 2.1 SC 1.4.3 |
| F2 | Sepet ikonu sayısal badge yok | Orta (visibility of system status) | Badge ekle | Nielsen H1 |
| ... |

5. **Olumlu noktalar** — Doğru yapılan 3-5 şey
6. **Sonraki adım önerileri** — `/feza-hci:heuristic-eval` (detay), `/feza-hci:usability-eval-plan` (test), `/feza-hci:color-audit`, `/feza-hci:hci-execute` (bulguları uygula)

### Kurallar

- En az **8 bulgu** üret.
- Her bulguda **etki seviyesi** (Critical / High / Medium / Low).
- Her bulguda **somut aksiyon önerisi** (genel "iyileştir" demek yok).
- En az **3 olumlu nokta** (denge için).
- "kullanıcı dostu / modern / temiz" gibi sözcükler YOK; ölçülebilir tespit.

## Adım 4 — Self-Check

- [ ] Bulgu sayısı ≥ 8 mi?
- [ ] Her bulguda etki + aksiyon var mı?
- [ ] Olumlu noktalar var mı?
- [ ] Bulgular kullanıcı sınıfına özelleştirildi mi (junior bir kullanıcıya farklı, expert'e farklı)?
- [ ] Yasak terimler yok mu?

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

## Sınırlar
- Max 4 soru.
- Tasarım çizme — markdown bulgu tablosu yeterli.
- "Beğendim/beğenmedim" yargısı yok — kanıt + standart referansı.
