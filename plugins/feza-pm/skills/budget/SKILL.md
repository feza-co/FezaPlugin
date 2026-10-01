---
name: budget
description: >
  Bütçe planı üretir. PMBOK Cost Management uyumlu: cost baseline,
  Management Reserve, Contingency Reserve, ay-bazlı cash-flow tablosu. Önce
  ESTIMATES_*.md'yi (efor → para), yoksa WBS_*.md'yi kullanır; SRS'teki maliyet
  kısıtları üst sınırdır. Referans alınacak bir SRS (SRS_*.md) zorunludur; yoksa çalışmaz ve /feza-requirements:srs-generate'e yönlendirir. Saatlik ücret bilinmiyorsa
  varsayım yapar ve etiketler.
  Tetikleyici: "bütçe oluştur", "budget plan", "cost baseline",
  "/feza-pm:budget", "maliyet planı".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Budget

Cost baseline + reserves + cash-flow.

## Tetikleyici

- "/feza-pm:budget"
- "bütçe / maliyet planı"
- "budget plan / cost baseline"

## Adım 0 — SRS Kapısı ve Bağlam

1. **SRS kapısı (zorunlu):** `references/srs-gate.md` kurallarını uygula. Geçerli SRS yoksa DUR: dosya üretme, brief isteme, proje dizinini (README, kod, manifest, git) okuma; kullanıcıyı `/feza-requirements:srs-generate`'e yönlendir.
2. **`ESTIMATES_*.md`** öncelikli (efor saatleri buradan).
3. Yoksa `WBS_*.md` → kaba parametric tahmin.
4. SRS'in kısıt bölümündeki bütçe/maliyet ve süre kısıtları baseline için üst sınırdır; aşılıyorsa Bilinen Boşluklar'a yaz.
5. ESTIMATES ve WBS yoksa **TEK** `AskUserQuestion`:
   - **Soru:** "Bütçe için süre tahmini gerekiyor. Önce `/feza-pm:estimate` çalıştırmamı mı istersin?"
   - Recommended: önce estimate. Kullanıcı reddederse SRS'in FR'leri üzerinden en kaba tahmini yap ve uyarı düş.

## Adım 1 — Gri Nokta Tespiti

EN FAZLA 3 SORU:

| # | Gri nokta | Neden kritik |
|---|-----------|--------------|
| 1 | **Saatlik ücret(ler)** (junior/mid/senior, lokal piyasa) | Para çevirimi |
| 2 | **Para birimi** (USD / EUR / TRY) | Tutar formatı |
| 3 | **Reserve politikası** (Contingency %5 / %10 / %15) | Risk tamponu |

Cevapsızsa varsayım: **Mid-level $40/saat (TR piyasası), Contingency %10, Management %5.**

## Adım 2 — Bilgi Tabanı

- `references/budget-template.md` — formüller + örnek tablo.
- `references/output-conventions.md`.

## Adım 3 — Üret

### Cost Baseline = Direct Costs + Indirect Costs

| Kategori | Açıklama | Hesap |
|----------|----------|-------|
| Direct Labor | Geliştirici saatleri × saatlik ücret | Σ (saat × ücret) |
| Direct Materials | Lisanslar, donanım, cloud kredisi | Sayım |
| Indirect (overhead) | Ofis, idari, yönetim | Direct'in %15-25'i (varsayım) |

### Reserves

- **Contingency Reserve** (bilinen risklere karşı) — Cost Baseline'ın %5-15'i.
- **Management Reserve** (bilinmeyen riskler) — toplam bütçenin %5-10'u.

### Cash-Flow Tablosu (ay bazlı)

| Ay | Aktiviteler | Maliyet | Birikimli |
|----|-------------|---------|-----------|
| M1 | Setup + Auth | $X | $X |
| M2 | Catalog + UI | $Y | $X+Y |
| ... |

## Adım 4 — Self-Check

- [ ] Direct + Indirect + Reserves toplandı mı?
- [ ] Para birimi her satırda var mı?
- [ ] Saatlik ücret etiketli mi (gerçek mi varsayım mı)?
- [ ] Cash-flow toplam = total budget mu?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Dosyaya Yaz

- Dosya: `BUDGET_<proje>.md`
- Konum: cwd

## Adım 6 — Kullanıcıya Rapor

1. Dosya yolu.
2. Toplam bütçe + reserve oranı.
3. Saatlik ücret kaynağı (gerçek / varsayım).
4. Bilinen boşluk sayısı.
5. Sonraki adım: "Sırada `/feza-pm:risk-register` veya `/feza-pm:activity-sequence`."

## Sınırlar

- Para tutarlarını uydurma — varsayım kullanırsan etiketle.
- Asla "ucuz / pahalı" yazma → sayı.
- Diyagram yok.
