---
name: req-conflict-check
description: >
  Requirement seti icindeki cakismalari ve bagimliliklari tespit eder. ISO/IEC/IEEE
  29148:2018 requirements analysis pratigine uyumlu. Cakisma tipleri (Direct contradiction /
  Implicit conflict / Trade-off / Resource competition) + bagimlilik tipleri
  (depends-on / blocks / refines / supersedes). Cakisan ciftler icin cozum
  onerisi (oncelik, birlestir, ayir, deferr). Tetikleyici: "requirement
  conflict", "cakisma kontrol", "/feza-requirements:req-conflict-check",
  "dependency check".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Requirement Conflict Check

Requirement seti icindeki cakismalari ve bagimliliklari cikarir.

## Tetikleyici
- "/feza-requirements:req-conflict-check"
- "cakisma / conflict kontrol"
- "dependency check"

## Adim 0 — Bagilami Topla
1. **`SRS_*.md`** veya **`REQ_CLASSIFIED_*.md`** zorunlu kaynak
2. **`SCOPE_*.md`** (varsa) — scope ile cakisma kontrolu
3. **`STAKEHOLDERS_*.md`** (varsa) — stakeholder bazli cakisma analizi
4. Yoksa **TEK** soru: "Hangi requirement seti uzerinden calisalim? (path)"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Cakisma cozme onceligi** (varsayilan: stakeholder gucu + business value) |
| 2 | **Trade-off icin tercih** (Time/Cost/Quality/Scope hangisi feda — `SCOPE_*.md`'den okur) |

## Adim 2 — Bilgi Tabani
- `references/conflict-types.md` — 4 cakisma tipi + 4 bagimlilik tipi + cozum stratejileri.

## Adim 3 — Uret

### Bolum 1 — Cakisma Tablosu

Tum requirement ciftleri tarsa (NxN matrix mantigi). Cakisanlari listele:

| # | Req A | Req B | Cakisma Tipi | Severity | Aciklama | Onerilen Cozum |
|---|-------|-------|---------------|----------|----------|------------------|
| C1 | NFR-001 (response < 2s) | NFR-005 (encryption AES-256 her istek) | Trade-off | High | Encryption response'i artirir | Cache + lazy decryption + dosyalar icin selective |
| C2 | FR-003 (auto-login) | NFR-007 (MFA zorunlu) | Direct contradiction | Critical | Auto-login MFA'yi devredisi birakir | Auto-login'i ilk MFA sonrasi 30 gun icin sinirla |
| C3 | FR-010 (kullanici hesabi siler) | Constraint-002 (KVKK 5 yil saklama) | Implicit conflict | High | Anonimlestirilmis veri 5 yil tutulmali | Soft delete + anonymize, 5 yil sonra hard delete |
| ... |

### Bolum 2 — Bagimlilik Matrisi

| # | Req A | Bagimlilik Tipi | Req B | Aciklama |
|---|-------|------------------|-------|----------|
| D1 | FR-005 (sepet) | depends-on | FR-002 (giris) | Sepet icin oturum gerekir |
| D2 | NFR-002 (uptime 99.9%) | refines | NFR-006 (DR plan) | DR uptime'i destekler |
| D3 | FR-008 (legacy import) | blocks | FR-009 (sema migration) | Import once cikmali |
| D4 | FR-015 (yeni search) | supersedes | FR-014 (eski search) | Yeni search FR-014'u kapatir |

### Bolum 3 — Stakeholder Bazli Cakisma

Hangi stakeholder hangi req'leri savunuyor — guc/ilgi catismasi:

| Cakisan Reqler | Stakeholder A | Stakeholder B | Cozum |
|-----------------|---------------|---------------|-------|
| NFR-001 vs NFR-005 | End User (hiz) | Compliance (sifreleme) | Compromise: cache + selective encrypt |
| FR-003 vs NFR-007 | Sponsor (UX) | Security | Sponsor onayli: 30 gun MFA-skip |

### Bolum 4 — Triple Constraint Trade-off (PMBOK uyumlu)

`SCOPE_*.md`'den triple constraint dengesini cek:
- Hangi 2 boyut oncelik (orn: Quality + Time)
- Hangisi feda (orn: Scope)
- Cakisan req cozumlerinde bu tercih dogrultusunda karar ver

### Bolum 5 — Bagimlilik Grafi (ASCII)

```
FR-002 (giris)
   │
   ├── FR-005 (sepet)
   │      └── FR-006 (odeme)
   │
   └── FR-007 (profil)
          └── FR-008 (siparis gecmisi)
```

(Diyagram üretilmez; tablo ve ASCII yeterli.)

### Bolum 6 — Topological Sort (Implementation Sirasi)

Bagimliliklara gore dogru implementation sirasi:

```
1. FR-002 (giris) → FR-007 (profil) → FR-008 (siparis gecmisi)
2. FR-002 → FR-005 (sepet) → FR-006 (odeme)
3. FR-009 (sema) bekler → FR-008 once tamamlanmali
```

### Bolum 7 — Cozulemeyen Cakismalar (Eskalasyon)

Karar verici onayina muhtac cakismalar:

| # | Cakisma | Karar verici |
|---|---------|--------------|
| C2 | Auto-login vs MFA | Sponsor + Security Lead |

### Bolum 8 — Sonraki Adim

- Cakisma > 0 ise: kararlari requirement metnine yansit, SRS'i guncelle
- Bagimlilik analizini `/feza-pm:wbs` ve `/feza-pm:activity-sequence`'a tasi
- Eskalasyon listesini stakeholder toplantisina goture

## Adim 4 — Self-Check
- [ ] Tum req cifti tarandi mi? (NxN mantik)
- [ ] Cakisanlar tipe gore etiketli mi (Direct/Implicit/Trade-off/Resource)?
- [ ] Severity atandi mi?
- [ ] Cozum somut mu (genel "uzlas" degil)?
- [ ] Bagimlilik matrisi var mi?
- [ ] Topological sort yapildi mi?
- [ ] Eskalasyon listesi acik mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-requirements (Gereksinim)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `REQ_CONFLICT_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Cakisma sayisi (Critical / High / Medium / Low).
3. Bagimlilik sayisi.
4. Eskalasyon sayisi.
5. Sonraki: `/feza-pm:wbs` (bagimlilik temelli) veya `/feza-requirements:srs-review` (cakisma sonrasi).

## Sinirlar
- Max 3 soru.
- Cakisma yoksa "Bu sette cakisma tespit edilmedi" yaz, bos birakma.
- Cozumu kullaniciya at (`stakeholder karar versin` dempayalalim) — somut oneri ver.
- Triple constraint olmadan trade-off cozme.
