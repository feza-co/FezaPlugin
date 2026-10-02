---
name: srs-review
description: >
  Mevcut bir SRS dokumanini ISO/IEC/IEEE 29148:2018 well-formed kriterleri +
  ISO/IEC 25010:2023 NFR etiketleme + 29148 outline tamlik acisindan puanlar.
  Her FR/NFR icin 8 bireysel kriter (Necessary/Appropriate/Unambiguous/Complete/Singular/
  Verifiable/Feasible/Conforming) + set kriterleri (Complete/Consistent/
  Affordable/Bounded). Bulgular severity-rated, somut iyilestirme onerili.
  Tetikleyici: "SRS review", "SRS denetle", "/feza-requirements:srs-review",
  "requirement quality check".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# SRS Review

Mevcut SRS'i 29148 + 25010 lensiyle puanlar.

## Tetikleyici
- "/feza-requirements:srs-review"
- "SRS denetle / review / kalite kontrol"
- "requirement quality check"

## Adim 0 — Bagilami Topla
1. **`SRS_*.md`** zorunlu — Glob ile bul; birden fazlaysa en yenisini sec.
2. Mevcut **`ISO25010_QUALITY_*.md`** (varsa) — onceki kalite skoru ile karsilastir.
3. **`SCOPE_*.md`** — kapsam ile uyum kontrolu.
4. SRS yoksa **TEK** soru: "Mevcut SRS yok. Once `/feza-requirements:srs-generate` calistirmami mi istersin?"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Skor formati** (varsayilan: 1-5 her kriter) |
| 2 | **Gecer notu** (varsayilan: 3.5/5 ortalamasi) |

## Adim 2 — Bilgi Tabani
- `references/srs-rubric.md` — 29148 well-formed + outline + 25010 NFR rubric.
- `references/well-formed-requirements.md` (srs-generate kaynaklı; sync ile kopyalanır).
- `references/srs-outline-29148.md` (srs-generate kaynaklı).
- `references/language-guidelines.md` (srs-generate kaynaklı) (yasak terimler).

## Adim 3 — Uret

### Bolum 1 — Yonetici Ozeti

| Boyut | Skor (1-5) |
|-------|-----------|
| Outline tamligi (29148) | 4.2 |
| FR kalitesi (well-formed) | 3.8 |
| NFR kalitesi + 25010 etiketleme | 3.2 |
| Dil kurallari (yasak terim, shall, singular) | 4.5 |
| Set butunlulugu (Complete/Consistent/Bounded) | 3.5 |
| Traceability (Verification atama) | 2.5 |
| **GENEL** | **3.62 / 5** |

**Verdict:** Gecer / Geliştirilmeli / Tekrar yaz

### Bolum 2 — Outline Tamlik (29148)

29148 outline'inin her bolumunun var olup olmadigi:

| Bolum | Var mi? | Kalite |
|-------|---------|--------|
| 1.1 Purpose | ✓ | Iyi |
| 1.2 Scope | ✓ | Eksik out-of-scope |
| 1.3 Product Overview | Kismen | 1.3.3 User Characteristics yok |
| 2.1 External Interfaces | ✓ | – |
| 2.2 Functional Requirements | ✓ | – |
| 2.3 NFR | Kismen | 25010 etiketsiz |
| 2.4 Constraints | ✗ | YOK |
| 3. Verification | ✗ | YOK — kritik |
| 4. Appendices | ✓ | – |

### Bolum 3 — FR Detay Denetimi

Her FR icin 8 bireysel kriter (well-formed-requirements.md'den):

| FR ID | Necessary | Appropriate | Unambiguous | Complete | Singular | Verifiable | Feasible | Conforming | Skor |
|-------|-----------|-------------|--------------|----------|----------|------------|----------|------------|------|
| FR-001 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 5/5 |
| FR-002 | ✓ | ✓ | ✗ | ✓ | ✗ | ? | ✓ | ✗ | 3/5 |
| FR-003 | ... |

Her ✗ icin kisa not: "Singular ihlali — '...ve...' iceriyor, iki ayri FR yap"

### Bolum 4 — NFR Detay + 25010 Etiketleme

| NFR ID | 25010 Karakteristik | Olculebilir esik var mi? | Skor |
|--------|---------------------|---------------------------|------|
| NFR-001 | Performance Efficiency | < 2s | 5 |
| NFR-002 | Security | TBD | 2 |
| NFR-003 | (etiketsiz) | – | 1 — etikete |

### Bolum 5 — Yasak Terim Tarama

Dil rehberindeki yasak terimleri (`kullanici dostu, hizli, esnek, modern, sagslam`) Grep ile tara:

| Terim | Adet | Konum |
|-------|------|-------|
| kullanici dostu | 2 | NFR-005, NFR-008 |
| hizli | 1 | NFR-001 (WAR — sayisal var ama yine de varsay) |
| esnek | 0 | – |

### Bolum 6 — Set Kriterleri

| Kriter | Durum | Aciklama |
|--------|-------|----------|
| Complete | Kismen | 4 TBD var |
| Consistent | ✓ | Cakisan req yok (manuel kontrol) |
| Affordable | ? | Estimate olmadan bilinmez |
| Bounded | ✓ | Scope dahilinde |

### Bolum 7 — Traceability + Verification

Her FR/NFR icin:
- Verification yontemi (Test/Inspection/Demonstration/Analysis) atanmis mi?
- Sonraki SDLC asamalarina link var mi?

Eksikse oran ver (orn: %40 verifikasyon yontem atamali).

### Bolum 8 — Top-5 Iyilestirme

En kritik 5 bulgu, oncelik sirali:
1. Verification bolumu yok — `srs-generate` ile yeniden uret veya elle ekle
2. NFR-003, NFR-005 25010 etiketsiz — ekle
3. FR-002 singular ihlali — ikiye bol
4. Constraints bolumu yok — ekle
5. ...

### Bolum 9 — Sonraki Adim Onerisi

- Bulgu sayisi azsa: kullanici elle duzeltir
- Bulgu yogunsa: `/feza-requirements:srs-generate` yeniden calistirilarak temiz baslangic

## Adim 4 — Self-Check
- [ ] 29148 outline tamlik tablosu var mi?
- [ ] Her FR icin 8 kriter ✓/✗ tablosu var mi?
- [ ] Her NFR icin 25010 etiketi kontrol edildi mi?
- [ ] Yasak terim tarama yapildi mi?
- [ ] Top-5 iyilestirme sirali mi?
- [ ] Genel skor hesaplandi mi (6 boyut ortalamasi)?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-requirements (Gereksinim)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `SRS_REVIEW_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Genel skor (X/5) + Verdict.
3. En kritik 2 bulgu.
4. Yasak terim sayisi.
5. Sonraki: `/feza-requirements:srs-generate` (revize) veya elle duzeltme.

## Sinirlar
- Max 3 soru.
- Tek FR/NFR'yi atlama — hepsini tara.
- Skor verirken neden zorunlu.
- Kullaniciyi yargilama — yapici dil.
