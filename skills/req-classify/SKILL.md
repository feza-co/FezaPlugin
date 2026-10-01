---
name: req-classify
description: >
  Ham requirement listesini Functional / Non-Functional / Constraint / Assumption /
  Out-of-Scope kategorilerine ayirir. ISO/IEC/IEEE 29148:2018 ve
  ISO/IEC 25010 ile uyumlu. Her ogrunden tek cumle gerekce + 25010 alt-etiket (NFR icin) +
  yeniden yazilmis "shall" formati. Ham liste BRIEF.md, ELICITATION_KIT cikti
  derlemesi, mulakat notlari veya kullanici argumaninda olabilir.
  Tetikleyici: "requirement classify", "FR/NFR ayir", "/feza-requirements:req-classify",
  "gereksinim siniflandir".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Requirement Classify

Karisik requirement listesini siniflar.

## Tetikleyici
- "/feza-requirements:req-classify"
- "FR/NFR ayir / siniflandir"
- "requirement classification"

## Adim 0 — Bagilami Topla
1. **Komut argumaninda liste varsa** direkt kullan
2. **`requirements.md`/`reqs.md`/`raw_reqs.md`** dosyalari ara
3. **`BRIEF.md`** icinde "Requirements", "Features", "Ozellikler" basliklari
4. **`ELICITATION_KIT_*.md`** ciktilarinin "sonuclar" bolumu
5. Hicbiri yoksa **TEK** soru: "Siniflanmasi istenen ham listeyi yapistir (her satir 1 madde)"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Cikti formati** (varsayilan: birlestirilmis tek dosya tablo formati) |
| 2 | **Kategori sayisi** (varsayilan 5: FR / NFR / Constraint / Assumption / Out-of-Scope) |

## Adim 2 — Bilgi Tabani
- `references/classification-rules.md` — her kategori icin tanim + ipucu kelimeleri + ornekler.
- `references/well-formed-requirements.md` (srs-generate kaynaklı; sync ile kopyalanır).

## Adim 3 — Uret

### Kategori Tanimlari (29148 uyumlu)

| Kategori | Tanim | Ipucu kelimeler |
|----------|------------------|------------------|
| **Functional Requirement (FR)** | "What the system must do — behavior" | shall do, perform, calculate, send, receive, display, store |
| **Non-Functional Requirement (NFR)** | Quality attributes (25010) | fast, secure, available, scalable + sayisal esik |
| **Constraint** | Tasarim kisiti — secim degil zorunluluk | must use, regulatory, legal, hardware-bound |
| **Assumption** | Varsayim — degisirse plan etkilenir | "assumes", "given that", baglam |
| **Out-of-Scope** | Yapilmayacaklar | "not", "excludes", "future version" |

### Adim 1 — Liste Normalizasyonu

Ham listeyi temizle:
- Tekrarlari kaldir
- Bos satir/baslik kaldir
- Cok cumlelik girisi parcala (singular kurali)

### Adim 2 — Siniflandirma Tablosu

Her madde icin:

| # | Orjinal Madde | Kategori | Yeniden Yazim (shall format) | Gerekce | 25010 (NFR ise) |
|---|---------------|----------|-------------------------------|---------|-------------------|
| 1 | "Sistem hizli olmali" | NFR | "Sistem ana sayfayi 2 saniye icinde yukleyecektir" | "Hizli" olculmez; sayisal esik gerekli | Performance Efficiency |
| 2 | "Kullanicilar uye olabilir" | FR | "Sistem kullanicilarin e-posta + parola ile uyelik yapmasini saglayacaktir" | Aktor + eylem + nesne | – |
| 3 | "Postgres kullanmaliyiz" | Constraint | "Sistem PostgreSQL 14+ uzerinde calismalidir" | Teknoloji secimi zorunlu | – |
| 4 | "Internet hep ulasilabilir" | Assumption | "Kullanici cihazinda surekli internet baglantisi vardir" | Plan baglamlanir | – |
| 5 | "Mobil app v2'de" | Out-of-Scope | – | Bu sürum kapsam disi | – |
| 6 | "AES-256 ile sifreleme yapmali ve KVKK uyumlu olmali" | NFR (BÖLÜNDÜ) | "Sistem depolanan parolari AES-256 ile sifreleyecektir" + "Sistem KVKK kurallarina uyacaktir" | Singular ihlali — ikiye bolundu | Security + Constraint |

### Adim 3 — Ozet Tablo

| Kategori | Adet |
|----------|------|
| Functional | X |
| Non-Functional | Y |
| Constraint | Z |
| Assumption | W |
| Out-of-Scope | V |
| **TOPLAM** | N |

### Adim 4 — NFR'leri 25010 Karakteristigine Dagit

| 25010 Karakteristik | NFR sayisi |
|---------------------|------------|
| Functional Suitability | 0 |
| Performance Efficiency | 3 |
| Compatibility | 1 |
| Interaction Capability | 2 |
| Reliability | 1 |
| Security | 4 |
| Maintainability | 0 |
| Flexibility | 0 |
| Safety | 0 |

→ Cok az kapsanan karakteristikler icin uyari: "Reliability tek NFR ile temsil edildi — eklemek isteyebilirsin."

### Adim 5 — Anti-Pattern Tarama

- Singular ihlali (ve / and / ayrica) → tablo "BOLUNDU" notuyla
- Yasak terim (hizli, kullanici dostu, esnek) → "Olculur hale getir" onerisi
- Ikili kategori ihtimali → "Bu hem FR hem Constraint olabilir; netlestir"

### Adim 6 — Sonraki Adim

Siniflanmis liste ile:
- `/feza-requirements:req-conflict-check` — cakisma kontrolu
- `/feza-requirements:user-story` — FR'leri user story'e cevir
- `/feza-requirements:srs-generate` — bu liste uzerinden tam SRS

## Adim 4 — Self-Check
- [ ] Her ham madde tablo'da temsil edildi mi?
- [ ] Her madde icin gerekce var mi?
- [ ] NFR'lerde 25010 etiketi var mi?
- [ ] Yeniden yazim "shall" / "-acaktir" formatinda mi?
- [ ] Yasak terim kalmadi mi?
- [ ] 25010 dagilim tablosu var mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-requirements (Gereksinim)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `REQ_CLASSIFIED_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Toplam adet + kategori dagilimi.
3. Kacinin yeniden yazimi gerekti / kacinda yasak terim vardi.
4. Kapsanmayan 25010 karakteristikleri.
5. Sonraki: `/feza-requirements:req-conflict-check` veya `/feza-requirements:srs-generate`.

## Sinirlar
- Max 3 soru.
- Bir maddeyi atlamak yok — hepsi tablo'da.
- Kategori secerken gerekce zorunlu.
- Yasak terimi kullanici cumlesinde gormezden gelme — yeniden yazimda duzelt.
- "Belki", "olabilir" gibi belirsiz dilleri spesifiklestir.
