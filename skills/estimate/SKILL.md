---
name: estimate
description: >
  WBS yapraklarına süre + efor tahmini üretir. PMBOK Time Management
  ve Cost Management yaklaşımıyla 3 yöntem birlikte: Parametric,
  Bottom-up, Three-point (PERT) — her aktivite için Optimistic / Most Likely /
  Pessimistic + ağırlıklı ortalama (O+4M+P)/6. WBS_*.md'yi okur; SRS'in kalite ve
  kısıt gereksinimlerini efor çarpanı olarak kullanır. Referans alınacak bir SRS (SRS_*.md) zorunludur; yoksa çalışmaz ve /feza-requirements:srs-generate'e yönlendirir.
  Tetikleyici: "estimate", "tahmin et", "süre tahmini", "PERT", "three-point",
  "/feza-pm:estimate", "efor tahmini".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Estimate

WBS yapraklarına 3 yöntemli tahmin üretir.

## Tetikleyici

- "/feza-pm:estimate"
- "tahmin et / süre tahmini / efor tahmini"
- "PERT / three-point estimate"

## Adım 0 — SRS Kapısı ve Bağlam

1. **SRS kapısı (zorunlu):** `references/srs-gate.md` kurallarını uygula. Geçerli SRS yoksa DUR: dosya üretme, brief isteme, proje dizinini (README, kod, manifest, git) okuma; kullanıcıyı `/feza-requirements:srs-generate`'e yönlendir.
2. **`WBS_*.md`** dosyasını cwd'de Glob ile ara. Bulduysan oku, yapraklarını çıkar.
3. SRS'in kalite (QoS: performans, güvenlik, erişilebilirlik vb.) ve kısıt bölümleri ilgili yaprakların eforunu artıran faktörlerdir; etkilediği yaprakta ID'siyle belirt.
4. WBS yoksa **TEK** `AskUserQuestion`:
   - **Soru:** "Tahmin için WBS gerekiyor. Önce `/feza-pm:wbs` çalıştırılsın mı, yoksa WBS'i SRS'in gereksinimlerinden minimum kurup direkt tahmin mi üreteyim?"
   - **Header:** "Estimate girdisi"
   - **Seçenek 1:** "Önce WBS üret (Recommended)" — durdur, yönlendir.
   - **Seçenek 2:** "SRS'ten direkt tahmin" — WBS'i SRS'in FR'lerinden minimum kur, Bilinen Boşluklar'a not düş, devam et.

## Adım 1 — Gri Nokta Tespiti

EN FAZLA 3 SORU ile tek `AskUserQuestion`:

| # | Gri nokta | Neden kritik |
|---|-----------|--------------|
| 1 | **Takım büyüklüğü** (1 kişi / 3 kişi / 5+) | Bottom-up ölçek için |
| 2 | **Deneyim seviyesi** (junior / mid / senior karışımı) | Parametric çarpan için |
| 3 | **Süre birimi** (saat / gün / sprint) | Çıktı tutarlılığı |

SRS/WBS'ten net çıkıyorsa SOR**MA**. Az önemli olanlar için varsayım yap (ör. "varsayılan: gün, 8 saat = 1 gün").

## Adım 2 — Bilgi Tabanı

- `references/estimation-methods.md` — 3 yöntemin formülleri ve örnekleri.
- `references/output-conventions.md`.

## Adım 3 — Üret

Her WBS yaprağı için aşağıdaki tabloyu doldur:

| WBS ID | Aktivite | O (Optimistic) | M (Most Likely) | P (Pessimistic) | **PERT (E)** | Std Dev (σ) | Parametric | Bottom-up | Notlar |
|--------|----------|----------------|-----------------|-----------------|--------------|-------------|------------|-----------|--------|
| 1.1.1 | Kayıt formu UI | 2 | 4 | 8 | **4.33** | 1.0 | 4 (3 sayfa × 1.5 gün) | 4 (UI:1.5 + state:1 + validation:1.5) | Junior dev |

### Formüller

- **PERT (Three-Point) Expected Duration:** `E = (O + 4M + P) / 6`
- **Standard Deviation:** `σ = (P - O) / 6`
- **Variance:** `σ² = ((P - O) / 6)²`

### Toplam ve Roll-Up

- Her ana WBS dalı için alt yapraklar toplanır.
- Proje toplamı için **PERT toplam = Σ Eᵢ**, **toplam σ = √(Σ σᵢ²)**.
- Tek %95 güven aralığı: `Toplam E ± 2σ`.

### Parametric kullanımı

Parametrik tahmin = istatistiksel/algoritmik. Tipik formüller:
- UI sayfası: 1.5 gün × sayfa sayısı
- API endpoint (CRUD): 0.5 gün × endpoint
- DB tablosu (model + migration + seed): 0.5 gün × tablo

### Bottom-up kullanımı

Aktiviteyi 2-4 alt görevde kır, her birine ayrı süre, topla. WBS'in 4. seviyesi gibi.

## Adım 4 — Self-Check

- [ ] Her yaprağa 3 değer (O/M/P) atandı mı?
- [ ] PERT formülü doğru mu? (O + 4M + P) / 6
- [ ] σ formülü doğru mu? (P − O) / 6
- [ ] Roll-up tablosu var mı (her ana dal + proje toplamı)?
- [ ] %95 güven aralığı hesaplandı mı?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Dosyaya Yaz

- Dosya: `ESTIMATES_<proje>.md`
- Konum: cwd
- Format: detay tablo + roll-up tablo + 3 paragraf yorum

## Adım 6 — Kullanıcıya Rapor

1. Dosya yolu.
2. Toplam efor (E) + güven aralığı.
3. Kullanılan input.
4. Bilinen boşluk sayısı.
5. Sonraki adım: "Sırada `/feza-pm:budget` (parasal çevirim) veya `/feza-pm:activity-sequence` (CPM)."

## Sınırlar

- Max 4 soru (1 girdi + 3 gri).
- Hayali rakam koyma → Junior/Mid/Senior değerleri yoksa "Varsayım: Mid-level developer, 8h/gün" notu.
- σ ile sayısal güven hesaplaması yap; "tahminen 10-15 iş günü" gibi gevşek dil yok.
- Saatlik ücret çevirimi BU SKILL'DE yok; o `/feza-pm:budget`'ta.
