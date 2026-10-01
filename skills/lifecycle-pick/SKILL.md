---
name: lifecycle-pick
description: >
  Projeye en uygun yazilim yasam dongu modelini onerir. ISO/IEC/IEEE 12207
  ve yaygin SDLC literaturune dayali karsilastirma: Waterfall / Incremental /
  Iterative + modern eklemeler (Agile/Scrum, Hybrid, V-Model). Proje karakteristiklerini
  (req netligi, takim deneyimi, musteri katilimi, sure kisiti, teknoloji
  riski) tartip skor cikarir + secilen modelin pros/cons'u + uyum onerileri.
  Tetikleyici: "lifecycle pick", "SDLC sec", "/feza-toolkit:lifecycle-pick",
  "yazilim yasam dongu modeli".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Lifecycle Pick

Proje karakteristiklerine gore SDLC modeli onerir.

## Tetikleyici
- "/feza-toolkit:lifecycle-pick"
- "SDLC / yasam dongu modeli sec"
- "Waterfall mi Agile mi"

## Adim 0 — Bagilami Topla
1. **`SCOPE_*.md`** — kapsam netligi
2. **`SRS_*.md`** — req netligi
3. **`STAKEHOLDERS_*.md`** — musteri katilimi
4. **`RISK_REGISTER_*.md`** — risk profili
5. **`ESTIMATES_*.md`** — sure
6. Yoksa **TEK** soru: "Proje brief + 5 anahtar soruyu cevapla: req netligi (1-5), musteri erisimi (1-5), takim deneyimi (1-5), tarih kisiti (1-5), teknoloji riski (1-5)"

## Adim 1 — Gri Nokta (max 3)

| # | Gri nokta |
|---|-----------|
| 1 | **Domain regulatif mi** (medikal/finans = Waterfall'a basili) |
| 2 | **Musteri bekleme toleransi** (sona kadar bekler mi) |
| 3 | **Takim buyuklugu** (Agile kucuk, Waterfall buyuk takimda da calisir) |

## Adim 2 — Bilgi Tabani
- `references/lifecycle-models.md` — klasik 3 model karsilastirmasi + modern eklemeler.

## Adim 3 — Uret

### Bolum 1 — Karakteristik Skor Tablosu

5 boyutta 1-5 skor (kullanıcıdan veya brief'ten cikarilir):

| Boyut | Skor | Aciklama |
|-------|------|----------|
| Requirements netligi | 4 | Cogu req baslangicta belli |
| Musteri erisimi | 2 | Sadece milestone'larda |
| Takim deneyimi | 3 | Karısık (junior + mid) |
| Tarih kisiti | 5 | Pazar lansman tarihi sabit |
| Teknoloji riski | 2 | Bilinen stack |

### Bolum 2 — Model Skor Hesabi

Her model icin uygunluk skoru (1-5):

| Model | Req=4 | Cust=2 | Team=3 | Time=5 | Tech=2 | Toplam |
|-------|-------|--------|--------|--------|--------|--------|
| **Waterfall** | 5 | 3 | 4 | 4 | 5 | 21 |
| Incremental | 4 | 4 | 3 | 3 | 4 | 18 |
| Cyclic / Iterative | 3 | 5 | 2 | 2 | 3 | 15 |
| Agile / Scrum | 2 | 5 | 2 | 3 | 4 | 16 |
| V-Model | 5 | 3 | 4 | 4 | 5 | 21 |
| Hybrid (Wat+Agile) | 4 | 4 | 3 | 4 | 4 | 19 |

### Bolum 3 — Onerilen Model

**Birincil:** Waterfall (skor: 21)

**Gerekce:**
- Req netligi yuksek → Waterfall'in en buyuk avantaji (degisiklik nadir)
- Tarih kisiti net → tek seferlik plan ile yonetilebilir
- Musteri erisimi sinirli → sona kadar bekleme problem degil
- Teknoloji riski dusuk → spike gerekmez

**Alternatif:** V-Model (skor: 21) — Waterfall'in test-merkezli versiyonu, regulatif gereksinim varsa tercih.

### Bolum 4 — Klasik 3 Model Karsilastirma Tablosu

| Method | When to Use | Avantaj | Dezavantaj |
|--------|-------------|---------|------------|
| **Waterfall** | Tum req'ler basta belli | Tried&proven, kolay PM, kolay configuration | Degisiklik zor+pahali, kaynak verimsiz, musteri sona kadar bekler |
| **Incremental** | Musteri sonu bekleyemez | Kismi product erken, verimli kaynak | PM zor, configuration mgmt zor, retest |
| **Cyclic / Iterative** | Req'ler belirsiz | Cycle sonunda req sekillenir, musteri feedback, daha iyi son urun | Bitis belirsiz, mimari buyume zor |

### Bolum 5 — Modern Eklemeler

#### Agile / Scrum
- 2-4 hafta sprint, daily standup, retro
- Backlog + Sprint backlog
- Product Owner + Scrum Master + Dev Team
- Velocity-based planning
- Uygun: req degisken + musteri erisimi var + kucuk takim

#### Kanban
- WIP limit, continuous flow
- Pull system
- Uygun: maintenance + support odakli

#### V-Model
- Waterfall'in V-sekli
- Her dev phase'in karsisinda test phase
- Uygun: regulatif (medikal/finans/aerospace)

#### Spiral
- Risk-driven
- Her dongu = planning + risk analysis + engineering + customer eval
- Uygun: yuksek riskli buyuk projeler

#### Hybrid (Water-Scrum-Fall)
- Plan/Req/Architecture: Waterfall
- Implementation: Scrum
- Release: Waterfall
- Uygun: regulatif disiplin + iteratif gelisim

### Bolum 6 — Secilen Model Detay Plani

```markdown
**Secilen:** <model>

## Phases / Sprints
[modele gore detay]

## Roller
[Waterfall: PM/Tech Lead/Dev/QA. Agile: PO/SM/Dev Team]

## Artefaktlar
[Waterfall: SRS/SDD/Test Plan. Agile: Product Backlog/Sprint Backlog/Burndown]

## Kadans
[Waterfall: phase milestones. Agile: 2-hafta sprint]

## Risk
[modele ozgu riskler]

## FezaPlugin Skill Uyumu
- Waterfall icin: /feza-pm:scope-statement, /feza-pm:wbs, /feza-requirements:srs-generate, /feza-sqa:test-plan, /feza-sqa:inspection
- Agile icin: /feza-requirements:user-story, /feza-pm:scope-statement (epic), /feza-pm:wbs (release backlog)
- Hybrid: ikisinin karisimi
```

### Bolum 7 — 4 Quadrant Karar Yardimcisi

```
                  Yuksek Req Netligi
                         |
          V-Model        |     Waterfall
        (regulatif)      |   (klassik plan)
                         |
   Kucuk ─────────────────────────────────── Buyuk
   Takim                                       Takim
                         |
        Agile/Scrum      |     Hybrid
        (start-up)       |  (Water-Scrum-Fall)
                         |
                  Dusuk Req Netligi
```

## Adim 4 — Self-Check
- [ ] 5 boyutta skor verildi mi?
- [ ] Tum modeller karsilastirmali tabloda mi?
- [ ] Waterfall / Incremental / Iterative klasik 3 modeli tabloda var mi?
- [ ] Birincil + alternatif var mi?
- [ ] FezaPlugin skill uyumu belirtildi mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `LIFECYCLE_PICK_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Onerilen model + alternatif.
3. En kritik 2 boyut.
4. Boslik.
5. Sonraki: Modele uygun FezaPlugin zinciri (Waterfall: srs-generate → wbs → ...; Agile: user-story → wbs).

## Sinirlar
- Max 4 soru.
- Tek model "her sey icin iyidir" deme — projeye gore kıs.
- Klasik 3 modeli (Waterfall / Incremental / Iterative) atlama; her zaman referans olarak goster.
- Diyagram cizme.
