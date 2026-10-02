---
name: cognitive-load
description: >
  Cognitive Complexity Theory (CCT) ile bir ekran/akışın bilişsel yükünü
  değerlendirir. Kieras & Polson (1985) ve Sweller'in bilişsel yük kuramına
  dayalı 6 ana terim: Cognitive Load, Information Processing, Perceptual Organization (Gestalt),
  Affordances, Feedback & Feedforward, Skeuomorphism vs Flat Design. Her ekran
  için yük skoru + azaltma önerileri.
  Tetikleyici: "cognitive load", "bilişsel yük", "complexity theory",
  "/feza-hci:cognitive-load".
  Fix modu: "--fix", "--fix=all", "düzelt", "bulguları düzelt", "fix it", "apply fixes" — bulguları UI dosyalarına uygular ve verify-ui ile doğrular.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion
---

# Cognitive Load

CCT'nin 6 temel terimi üzerinden ekran/akış denetimi.

## Tetikleyici
- "/feza-hci:cognitive-load"
- "cognitive load / bilişsel yük analizi"
- "cognitive complexity"
- Fix modu: `--fix`, `--fix=all`, "düzelt", "bulguları düzelt", "fix it", "apply fixes"

## Adım 0 — Bağlamı Topla
1. UI dosyaları (Glob).
2. `BRIEF.md`/`SCOPE_*.md` — kullanıcı sınıfı (CCT yüksek/düşük complexity)
3. `HCI_REVIEW_*.md` (varsa) — önceki bulgular.
4. UI yoksa **TEK** soru: "Hangi ekran/akış? (dosya yolu veya kısa tanım)"

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Kullanıcı uzmanlık seviyesi** (yeni / orta / expert) |
| 2 | **Kullanım sıklığı** (günlük / aylık / nadir) |

Yeni kullanıcı + nadir kullanım → bilişsel yük tolerans **DÜŞÜK**.
Expert + günlük → tolerans **YÜKSEK** (efficiency tercih edilebilir).

## Adım 2 — Bilgi Tabanı
- `references/cct-terms.md` — 6 terim + Gestalt prensipleri + uygulama örnekleri.
- `references/evidence-rubric.md` — kanıt türleri, severity ankrajları, ikinci geçiş ve kapsam şeffaflığı (ortak standart).
- `references/output-conventions.md`.

## Adım 3 — Üret

### CCT 6 Terim Kontrolü

Her terim için: **Tespit + Skor (1-5) + Öneri**.

| # | Terim | Tespit | Skor | Kanıt türü | Kanıt | Öneri |
|---|-------|--------|------|------------|-------|-------|
| 1 | Cognitive Load | Ekranda 18 ayrı interaktif öğe — Miller's 7±2 ihlali | 4 | DOM seçici | `main form` — 18 `input, button, select` | Gruplama (Gestalt) ile 5 bölüme ayır |
| 2 | Information Processing | Form alanları sıralaması iş akışıyla uyumsuz | 3 | erişilebilirlik ağacı | `ariaSnapshot()` — alan sırası görev sırasıyla uyuşmuyor | Sıralamayı user journey'e göre yeniden düzenle |
| 3 | Perceptual Organization (Gestalt) | Yakınlık (proximity) prensibi ihlali — ilgili öğeler dağınık | 3 | ekran görüntüsü | `screens/form-1280.png` — ilgili kontroller arasında geniş boşluk | İlgili kontroller fiziksel olarak yakınlaştır |
| 4 | Affordances | "Sepete ekle" butonu link gibi görünüyor (underline) | 3 | DOM seçici | `button.add-to-cart` — arka plan/kenarlık yok | Buton stilinde yap (background, border, padding) |
| 5 | Feedback | Kayıt sonrası ekran sessiz | 4 | verify-ui kodu | `E11 FAIL` — başarı durumu yok | Toast notification + redirect sonrası onay |
| 6 | Feedforward | Disabled butonun NEDEN disabled olduğu görünmez | 2 | DOM seçici | `button[disabled]` — açıklama öğesi yok | Tooltip ile sebep göster |

Kanıt türü `references/evidence-rubric.md` §1'deki dört değerden biridir. CCT skoru (1-5),
`references/fix-mode.md` eşleme tablosuyla Nielsen 0-4 ölçeğine çevrilir; Nielsen ölçeğinin somut
ankrajları `references/evidence-rubric.md` §2'dedir. Nielsen eşdeğeri ≥ 3 (CCT 4-5) bulgular için DOM
seçici veya verify-ui kodu zorunludur; yalnız görsel tahmine dayalı bulgu en fazla CCT 3'tür.

### İkinci Geçiş

Nielsen eşdeğeri ≥ 3 (CCT 4-5) bulgular `references/evidence-rubric.md` §4'e göre bağımsız bir ikinci
geçişte, ilk puan gizlenerek yalnız bulgu metni + kanıtla yeniden puanlanır. İki puan farklıysa bulgu
"elle doğrulanmalı" işaretlenir, raporda ayrı listelenir ve nihai puan iki puanın büyüğü olur.

### Yük Skoru Toplam

- 6-12: Düşük yük (iyi)
- 13-20: Orta yük (kabul)
- 21-30: Yüksek yük (acil revize)

### Skeuomorphism vs Flat Design Notu

Kullanıcı uzmanlık seviyesine göre:
- Yeni kullanıcı + cross-cultural → Skeuomorphic ipuçları yardımcı (gerçek dünya benzetmesi).
- Expert + sık kullanım → Flat tercih edilebilir (verimlilik).

Mevcut tasarımın kategorisini tespit et + uygunluğunu yorumla.

### Cognitive Overload Azaltma Önerileri (bilişsel aşırı yükü azaltma)

Tek bir "Aksiyon Listesi" çıkar:
1. Gruplama (proximity, similarity)
2. Progressive disclosure (her şeyi tek anda gösterme)
3. Recognition over recall
4. Affordance tutarlılığı
5. Feedback gecikmesini < 1s tut
6. Feedforward (gelecek aksiyon ipucu) ekle

## Adım 4 — Self-Check
- [ ] 6 CCT terimin her biri tarandı mı?
- [ ] Her birine skor verildi mi?
- [ ] Toplam skor hesaplandı mı?
- [ ] Skeuomorphism/Flat değerlendirmesi var mı?
- [ ] Azaltma önerileri sıralı mı?
- [ ] Her bulguda kanıt türü (ekran görüntüsü / DOM seçici / erişilebilirlik ağacı / verify-ui kodu) belirtildi mi?
- [ ] Nielsen eşdeğeri ≥ 3 bulgularda DOM seçici veya verify-ui kodu kanıtı var mı?
- [ ] Nielsen eşdeğeri ≥ 3 bulgular ikinci geçişte yeniden puanlandı mı; farklı puanlar "Elle doğrulanmalı" listesinde mi ve "Otomatik doğrulanamayanlar" manuel kontrol listesi işaretlendi mi?
- [ ] Fix modu istendiyse: değişecek dosya listesi tek mesajla gösterildi, yalnız UI dosyaları değişti, verify-ui çalıştı, "Uygulanan düzeltmeler" tablosu eklendi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-hci (HCI)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `COGNITIVE_LOAD_<proje>.md`

### Rapor Şablonu Ekleri (zorunlu)

- **Elle doğrulanmalı** — ikinci geçişte puanı farklı çıkan (Nielsen eşdeğeri ≥ 3) bulguların listesi
  (`references/evidence-rubric.md` §4).
- **Otomatik doğrulanamayanlar** — `references/evidence-rubric.md` §5'teki zorunlu manuel kontrol
  listesi (`- [ ]` biçiminde): okuma sırasının anlamı, alternatif metin kalitesi, karmaşık bileşen
  klavye akışı, ekran okuyucuyla deneme, hata mesajlarının anlamı. Manuel maddeler işaretlenmeden
  rapor "teslim edilebilir" sayılmaz; "0 ihlal = erişilebilir" gibi ifadeler kullanılmaz.

## Adım 6 — Rapor
1. Dosya yolu.
2. Toplam yük skoru + kategori (düşük/orta/yüksek).
3. En kritik 2 terim.
4. Bilinen boşluk.
5. Sonraki: azaltma önerilerini uygulamak için `/feza-hci:hci-execute`; ya da `/feza-hci:heuristic-eval` / `/feza-hci:hci-review`.

## Adım 7 — Fix Modu (yalnızca tetikleyiciyle)

Tetikleyici yoksa bu adım atlanır; yalnızca rapor verilir.
Tetikleyici: `--fix`, `--fix=all` ya da "düzelt", "bulguları düzelt", "fix it", "apply fixes".
Prosedür: `references/fix-mode.md`. Eşikler: `references/thresholds.md`. Doğrulama:
`node <skill-klasörü>/scripts/verify-ui.mjs <sayfa.html | URL>` (mutlak yol; script kullanıcı projesine kopyalanmaz).
CCT terim skoru (1-5), `references/fix-mode.md` eşleme tablosuyla Nielsen 0-4 ölçeğine çevrilir; eşik uygulanır.
Yapısal yeniden tasarım (ekran bölme, akış değiştirme) fix modu kapsamı dışıdır: "Elle düzeltilmeli" yazılır ve `/feza-hci:hci-execute` önerilir.
Her düzeltme `references/fix-mode.md` §6'daki **doğrulama kapısından** geçer: ihlal sayısı kesin azalmazsa
ya da yeni bir E kodu `ok:false` olursa değişiklik geri alınır ve "reddedildi" yazılır (araç yoksa "doğrulanmadı").
Değerlendirme raporunun sonuna "Uygulanan düzeltmeler" tablosu eklenir; rapor yeniden yazılmaz.

## Sınırlar
- Max 3 soru.
- 6 terimin hepsini eksiksiz tara.
- Skoru sözel verme — sayı.
- Gestalt prensiplerini açıkça referansla (proximity, similarity, closure, continuity, figure-ground).
- Fix modu dışında hiçbir dosya değiştirilmez; fix modu tetiklenirse yalnız UI dosyaları değişir.
