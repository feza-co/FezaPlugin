---
name: heuristic-eval
description: >
  Nielsen 10 Heuristic + Dix et al. prensipleri + WCAG 2.1 AA üzerinden ekran/akış
  için sistematik heuristic evaluation üretir. Her bulguya severity rating (0-4)
  atar, sıralı tablo çıkarır. Nielsen (1994) ve Dix et al. "Human-Computer Interaction" temelli. Önce projedeki
  UI dosyalarını tarar, yoksa brief'ten ekranı kurgular.
  Tetikleyici: "heuristic evaluation", "Nielsen 10", "heuristik denetim",
  "/feza-hci:heuristic-eval".
  Fix modu: "--fix", "--fix=all", "düzelt", "bulguları düzelt", "fix it", "apply fixes" — bulguları UI dosyalarına uygular ve verify-ui ile doğrular.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion
---

# Heuristic Evaluation

10 Nielsen heuristik + 13 Dix et al. prensibi + WCAG eşikleriyle severity-rated denetim.

## Tetikleyici
- "/feza-hci:heuristic-eval"
- "Nielsen 10 / heuristic evaluation"
- "heuristik denetim / inceleme"
- Fix modu: `--fix`, `--fix=all`, "düzelt", "bulguları düzelt", "fix it", "apply fixes"

## Adım 0 — Bağlamı Topla
1. UI dosyaları (Glob): `*.html`, `*.tsx`, `*.jsx`, `*.vue`, `*.svelte`, `templates/**`, `pages/**`, `components/**`
2. CSS/tasarım sistemi: `*.css`, `tailwind.config.*`, `tokens.json`
3. `BRIEF.md`/`SCOPE_*.md` — kullanıcı bağlamı
4. `HCI_REVIEW_*.md` (varsa) — önceki holistic bulgular
5. UI bulunmadıysa **TEK** soru: "Hangi ekran/akış inceleneceğini söyler misin?"

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Severity skalası** (varsayılan: Nielsen 0-4) |
| 2 | **Tek ekran mı / akış mı?** (akışsa: hangi adımlar) |

## Adım 2 — Bilgi Tabanı
- `references/heuristics.md` — Nielsen 10 + Dix et al. mapping + severity rubric.
- `references/evidence-rubric.md` — kanıt türleri, severity ankrajları, ikinci geçiş ve kapsam şeffaflığı (ortak standart).
- `references/ux-writing.md` — H2 (gerçek dünya ile eşleşme) ve H9 (hata kurtarma) bulgularında mikro-metin ölçütü olarak kullanılır.
- `references/output-conventions.md`.

## Adım 3 — Üret

### Severity Skalası

Severity ölçeği (Nielsen 1994, 0-4) ve somut ankrajları `references/evidence-rubric.md` §2'dedir;
ölçek burada tekrar edilmez, dosyaya atıf verilir. Özet: 4 = görev tamamlanamıyor / WCAG A-AA erişim
engeli, 3 = ciddi gecikme veya birden çok grubu etkileme, 2 = sürtünme, 1 = kozmetik, 0 = sorun değil.

### Bulgu Tablosu (zorunlu format)

| # | Heuristic | Bulgu | Konum (dosya/ekran) | Severity | Önerilen Düzeltme | Kanıt türü | Kanıt |
|---|-----------|-------|---------------------|----------|-------------------|------------|-------|
| H1 | H1: Visibility of system status | Form kaydedilirken yükleme göstergesi yok | `pages/profile.tsx` | 3 | Spinner + "Kaydediliyor..." metni ekle | DOM seçici | `#profile form button[type="submit"]` — tıklama sonrası durum değişmiyor |
| H2 | H2: Match real world | "Cancel" yerine "Abort" kullanılmış | `components/Modal.tsx` | 2 | "Vazgeç" / "Cancel" yap | ekran görüntüsü | `screens/modal.png` — buton metni "Abort" |
| ... |

Kanıt türü, `references/evidence-rubric.md` §1'deki dört değerden biri olmalıdır: ekran görüntüsü |
DOM seçici | erişilebilirlik ağacı | verify-ui kodu. Severity 3-4 bulgular için DOM seçici veya
verify-ui kodu zorunludur; yalnız görsel tahmine dayalı bulgu en fazla severity 2 alır.

### İkinci Geçiş

Severity ≥ 3 bulgular `references/evidence-rubric.md` §4'e göre bağımsız bir ikinci geçişte, ilk puan
gizlenerek yalnız bulgu metni + kanıtla yeniden puanlanır. İki puan farklıysa bulgu "elle
doğrulanmalı" işaretlenir, raporda ayrı listelenir ve nihai severity iki puanın büyüğü olur.

H2 ve H9 mikro-metin bulguları yazılırken `references/ux-writing.md` §5 tablosundaki kötü→iyi örneğe benzer somut **"önerilen metin"** verilir (TR, gerekiyorsa EN karşılığıyla); "daha net yaz" gibi soyut öneri kabul edilmez. Örnek: butondaki "Tamam" → "Değişiklikleri kaydet" (H2); "Yanlış şifre girdiniz." → "Şifre eşleşmedi. Yeniden deneyin ya da şifrenizi sıfırlayın." (H9).

### Heuristic'lerin Tümü Taranır

10 Nielsen heuristic'in **HER BİRİ** için en az bir gözlem yap (uygulanabilir değilse "Kapsamlı tarama yapıldı, bu ekranda ihlal yok" yaz). Toplam bulgu ≥ **15**.

### Severity Dağılımı

Her seviyenin sayısı bir özet kutuda gösterilir:
```
Catastrophic (4): X
Major (3): Y
Minor (2): Z
Cosmetic (0-1): W
```

### Rapor Şablonu Ekleri (zorunlu)

- **Elle doğrulanmalı** — ikinci geçişte puanı farklı çıkan (severity ≥ 3) bulguların listesi
  (`references/evidence-rubric.md` §4).
- **Otomatik doğrulanamayanlar** — zorunlu manuel kontrol listesi (`references/evidence-rubric.md` §5),
  `- [ ]` biçiminde: okuma sırasının anlamı, alternatif metin kalitesi, karmaşık bileşen klavye akışı,
  ekran okuyucuyla deneme, hata mesajlarının anlamı. Manuel maddeler işaretlenmeden rapor "teslim
  edilebilir" sayılmaz; "0 ihlal = erişilebilir" gibi ifadeler kullanılmaz.

## Adım 4 — Self-Check
- [ ] 10 heuristic'in her biri tarandı mı?
- [ ] Her bulgu severity skorlu mu?
- [ ] Her bulguda kanıt türü (ekran görüntüsü / DOM seçici / erişilebilirlik ağacı / verify-ui kodu) belirtildi mi?
- [ ] Severity 3-4 bulgularda DOM seçici veya verify-ui kodu kanıtı var mı?
- [ ] Severity ≥ 3 bulgular ikinci geçişte yeniden puanlandı mı; farklı puanlar "Elle doğrulanmalı" listesinde mi ve "Otomatik doğrulanamayanlar" manuel kontrol listesi işaretlendi mi?
- [ ] Her bulgu somut konum belirtiyor mu (dosya/ekran)?
- [ ] Düzeltme önerisi spesifik mi (genel "iyileştir" değil)?
- [ ] Toplam ≥ 15 bulgu mu?
- [ ] WCAG ihlali varsa AA seviyesi referansıyla işaretli mi?
- [ ] Fix modu istendiyse: değişecek dosya listesi tek mesajla gösterildi, yalnız UI dosyaları değişti, verify-ui çalıştı, "Uygulanan düzeltmeler" tablosu eklendi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-hci (HCI)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `HEURISTIC_EVAL_<proje>.md`

## Adım 6 — Rapor (max 5 satır)
1. Dosya yolu.
2. Toplam bulgu + severity dağılımı.
3. En kritik 2 bulgu (severity 4).
4. Kullanılan input.
5. Sonraki: bulguları uygulamak için `/feza-hci:hci-execute`; kullanıcılarla doğrulamak için `/feza-hci:usability-eval-plan` veya `/feza-hci:color-audit`.

## Adım 7 — Fix Modu (yalnızca tetikleyiciyle)

Tetikleyici yoksa bu adım atlanır; yalnızca rapor verilir.
Tetikleyici: `--fix`, `--fix=all` ya da "düzelt", "bulguları düzelt", "fix it", "apply fixes".
Prosedür: `references/fix-mode.md`. Eşikler: `references/thresholds.md`. Doğrulama:
`node <skill-klasörü>/scripts/verify-ui.mjs <sayfa.html | URL>` (mutlak yol; script kullanıcı projesine kopyalanmaz).
Severity zaten Nielsen 0-4'tür; eşik doğrudan uygulanır (varsayılan ≥ 2, `--fix=all` ile tümü).
Bulgu tablosundaki konum dosya + seçici/satır değilse bulgu düzeltilmez, "Elle düzeltilmeli" olarak işaretlenir.
Değerlendirme raporunun sonuna "Uygulanan düzeltmeler" tablosu eklenir; rapor yeniden yazılmaz.

## Sınırlar
- Max 3 soru.
- Hiçbir heuristic'i atlama.
- Fix modu dışında hiçbir dosya değiştirilmez; fix modu tetiklenirse yalnız UI dosyaları değişir.
- Severity vermeden bulgu yazma.
- Sadece Nielsen'la sınırlı kalma — Dix et al. prensiplerini de eşleştir.
