---
name: req-elicit
description: >
  Stakeholder rolune gore gereksinim eliciation soru paketi uretir.
  ISO/IEC/IEEE 29148:2018 ve BABOK v3 ile uyumlu 4 yontem: Interview
  (Closed/Open-ended/Probing/Strategic), Questionnaire (good design rules),
  Workshop, Observation. E-ticaret siparis sureci ornegiyle soru modelleri
  sunar. Once STAKEHOLDERS_*.md ve PERSONAS_*.md varsa onlara gore role
  bazli kisiselletir; yoksa kullaniciya rol listesi sorar. Tetikleyici:
  "elicitation", "stakeholder soru", "requirement gathering",
  "/feza-requirements:req-elicit", "muulakat sorulari".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Requirements Elicitation

Rol bazli, sektor pratigine uygun elicitation soru bankasi.

## Tetikleyici
- "/feza-requirements:req-elicit"
- "elicitation / requirement gathering"
- "stakeholder mulakat sorulari"

## Adim 0 — Bagilami Topla
1. **`STAKEHOLDERS_*.md`** ve **`PERSONAS_*.md`** — varsa role bazli kisiselletir
2. **`SCOPE_*.md`/`BRIEF.md`** — proje domain
3. Yoksa **TEK** soru: "Hangi rolle (kullanici, sponsor, admin, regulator, vs.) icin elicitation sorulari hazirlayalim? + proje brief 1 cumle"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Yontem secimi** (Interview / Questionnaire / Workshop / Observation / Hepsi — varsayilan: hepsi karisik paket) |
| 2 | **Mulakat sayisi/zaman** (planlamayi etkiler) |

## Adim 2 — Bilgi Tabani
- `references/elicitation-methods.md` — 4 yontem detay + soru tipleri + good questionnaire kurallari + siparis sureci ornegi.

## Adim 3 — Uret

### Bolum 1 — Yontem Secimi Karari

| Yontem | Ne zaman uygun | Bu projede uygun mu |
|--------|-----------------|----------------------|
| Interview | 1-1 derinlikli, az stakeholder | Sponsor + key users |
| Questionnaire | Cok stakeholder, sayisal veri | Genis kullanici tabani |
| Workshop | Cok aktor, hizli konsensus | Cross-functional team |
| Observation | Mevcut surec varsa | End user davranisi |

→ Bu projede onerilen kombinasyon: <X>

### Bolum 2 — Interview Soru Paketi (rol bazli)

#### Stakeholder: <Sponsor / Is Birimi Yoneticisi>

**4 Soru Tipi:**

##### Closed-Ended Sorular (sayisal/evet-hayir)
- Sistem gunde kac siparis alir (web + mobil + cagri merkezi)?
- Musteri en cok hangi 3 islemi yapiyor?
- Sistem yilda kac kullaniciya hizmet etmeli?

##### Open-Ended Sorular (acik fikir)
- Mevcut surecte sizi en cok ne zorluyor?
- Yeni sistemden 1 yil sonra ne beklersiniz?
- Bizim atlamis olabilecegimiz ne var?

##### Probing Sorular (derinlestirme)
- "X" derken tam olarak neyi kastediyorsunuz?
- Bunu son ne zaman yasadiniz?
- Bu olduktan sonra ne oldu?

##### Strategic Sorular (cozumsel)
- Siparis surecini nasil iyilestirebiliriz?
- Iade sayisini nasil dusurebiliriz?
- Musteri memnuniyetini nasil arttirabiliriz?

> Ornek (e-ticaret siparis sureci): "Siparis surecini nasil iyilestirebiliriz? Musterilerin siparis ettigi urunleri iade etme sayisini nasil azaltabiliriz?"

#### Stakeholder: <End User>

(Aynı 4 tipte sorular, role gore uyarlanmis)

#### Stakeholder: <Operator / Maintainer>

...

### Bolum 3 — Questionnaire Sablonu (iyi anket tasarimi kurallari)

Anket tasariminda yerlesik pratikler (bkz. Dillman, "Internet, Phone, Mail, and Mixed-Mode Surveys"):
- Tehdit icermeyen, ilgi cekici sorularla basla
- Maddeleri mantiksal bolumlere grupla
- Cevaplayiciyi yoracak kadar uzun anket hazirlama
- ...

#### Bolum A: Tanitim (1-2 soru)
- Anketin amaci 1 cumle
- Ne kadar surer

#### Bolum B: Profil (3-5 soru)
1. Rol / gorev tanimi
2. Yas grubu
3. Dijital arac kullanim sikligi (Hic / Ara sira / Gunluk)
4. Mevcut benzer sistem deneyimi
5. ...

#### Bolum C: Mevcut surec (5-7 soru)
- ...

#### Bolum D: Beklenti (5-7 soru)
- Likert (1-5) veya cok seçenekli

#### Bolum E: Acik geri bildirim (1-2 soru)
- "Onerileriniz neler"

### Bolum 4 — Workshop Plani

Eger workshop secildiyse:

| Adim | Sure | Aktivite | Cikti |
|------|------|----------|-------|
| 0:00 | 15 dk | Tanisma + amac | Anlasma |
| 0:15 | 30 dk | Mevcut surec haritasi | As-is map |
| 0:45 | 30 dk | Pain point brainstorming | Sorun listesi |
| 1:15 | 45 dk | Cozum ideation | Aday cozumler |
| 2:00 | 30 dk | Onceliklendirme (dot voting) | Top-5 |
| 2:30 | 15 dk | Aksiyon + sonraki adim | Aksiyon listesi |

### Bolum 5 — Observation Plani

Eger gozlem secildiyse:

| Boyut | Detay |
|-------|-------|
| Kim gozlenir | Rol + sayi |
| Nerede | Dogal is ortami |
| Sure | Kac saat / kac sezon |
| Yontem | Pasif / etnografik / shadowing |
| Kayit | Not / video / sesli |
| Etik | Onam formu, anonimlestirme |

### Bolum 6 — Konsolide Cikti

Tek bir Eliciation Kit dosyasi:
- Interview soru paketi (rol x rol)
- Questionnaire sablonu
- Workshop ajandasi (varsa)
- Observation rehberi (varsa)
- Sonuc derleme sablonu

## Adim 4 — Self-Check
- [ ] Her stakeholder rolu icin Interview sorusu var mi?
- [ ] 4 soru tipi (Closed/Open/Probing/Strategic) her rolde temsil edildi mi?
- [ ] Questionnaire iyi anket tasarimi kurallarina uyuyor mu?
- [ ] Profil bolumu 3-5 soruyla sinirli mi?
- [ ] Yontem secimi gerekceli mi?
- [ ] Sektorel bir ornek senaryo (siparis sureci vb.) referans verildi mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-requirements (Gereksinim)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `ELICITATION_KIT_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Yontem(ler) + rol sayisi + toplam soru sayisi.
3. Onerilen sira (Interview once → Questionnaire genel → Workshop konsensus).
4. Boslik.
5. Sonraki: `/feza-requirements:req-classify` (toplanan veri uzerinde) veya `/feza-requirements:srs-generate`.

## Sinirlar
- Max 3 soru.
- 4 soru tipi atlanmaz.
- Yonlendirici (leading) soru yazma — "Bu sistem cok mu yavas?" YASAK.
- Siparis sureci gibi bir sektorel ornegi referans olarak ekle.
