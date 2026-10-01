---
name: activity-sequence
description: >
  WBS yapraklarını sıralayıp aktivite ağı + kritik yol (CPM) üretir. PMBOK
  Schedule Management uyumlu: Define Activities → Sequence Activities
  (FS/SS/FF/SF dependency tipleri) → Network Diagram (tablo formatında) → Critical
  Path Method (en uzun yol). Önce cwd'de WBS_*.md ve ESTIMATES_*.md varsa onları
  kullanır. Tetikleyici: "activity sequence", "kritik yol", "CPM", "network diagram",
  "/feza-pm:activity-sequence", "aktivite sıralaması".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Activity Sequence + CPM

WBS yapraklarını aktiviteye çevirir, bağımlılıklarla sıralar, kritik yolu hesaplar.

## Tetikleyici

- "/feza-pm:activity-sequence"
- "activity sequencing / aktivite sıralaması"
- "CPM / kritik yol / critical path"
- "network diagram"

## Adım 0 — Bağlamı Topla

1. **`WBS_*.md`** zorunlu (yapraklar = aktiviteler).
2. **`ESTIMATES_*.md`** öncelikli (PERT E süreleri buradan).
3. Yoksa **TEK** soru: "Önce `/feza-pm:wbs` ve `/feza-pm:estimate` çalıştırılmalı. Yine de devam mı?"

## Adım 1 — Gri Nokta Tespiti

EN FAZLA 2 SORU:

| # | Gri nokta |
|---|-----------|
| 1 | **Paralel çalışılabilir aktiviteler** (FE/BE ayrı kişiler mi?) |
| 2 | **Sabit milestone'lar / external deadline'lar** |

## Adım 2 — Bilgi Tabanı

- `references/cpm-method.md` — bağımlılık tipleri + CPM hesabı.
- `references/output-conventions.md`.

## Adım 3 — Üret

### Activity Tablosu

| Activity ID | Aktivite | Süre (gün, PERT E) | Predecessors | Dep Tipi | Resource |
|-------------|----------|---------------------|--------------|----------|----------|
| A | Setup proje iskeleti | 1 | – | – | Tech Lead |
| B | DB şeması | 2 | A | FS | BE Dev |
| C | API Auth | 3 | B | FS | BE Dev |
| D | Login UI | 2 | A | FS | FE Dev |
| E | Login E2E entegrasyon | 1 | C, D | FS | Tech Lead |
| ... |

### Bağımlılık Tipleri

- **FS (Finish-to-Start)** — A bitmeden B başlayamaz (en yaygın)
- **SS (Start-to-Start)** — A başlamadan B başlayamaz
- **FF (Finish-to-Finish)** — A bitmeden B bitmez
- **SF (Start-to-Finish)** — nadir; A başlamadan B bitemez

### Network Diagram (tablo formatında)

```
START → A → B → C → E → END
            ↓       ↑
            D ──────┘
```

Diyagram üretilmez; tablo ve ASCII yeterli. Öncelikleri tablo + minimal ASCII ile göster.

### CPM Hesabı

Her aktivite için Forward Pass (ES, EF) ve Backward Pass (LS, LF) hesapla:

| ID | Süre | ES | EF | LS | LF | Slack | Kritik mi? |
|----|------|----|----|----|----|-------|------------|
| A | 1 | 0 | 1 | 0 | 1 | 0 | ✓ |
| B | 2 | 1 | 3 | 1 | 3 | 0 | ✓ |
| ... |

- **ES** = Earliest Start = max(predecessor EFs)
- **EF** = ES + Duration
- **LF** = min(successor LSs)
- **LS** = LF − Duration
- **Slack** = LS − ES = LF − EF
- **Critical Path** = Slack=0 olan aktivitelerin zinciri

### Çıktı

- Aktivite tablosu
- Bağımlılık tablosu
- CPM hesap tablosu
- **Kritik yol metni** (örn: "A → B → C → E, toplam süre: 7 gün")
- Toplam proje süresi
- Risk altındaki aktiviteler (slack < 2 gün)

## Adım 4 — Self-Check

- [ ] Her aktivitenin predecessor'u tanımlı mı (ilk aktivite hariç)?
- [ ] Döngü YOK mu (A→B→A)?
- [ ] CPM forward+backward pass tutarlı mı (proje toplam süresi her iki yönde aynı)?
- [ ] Kritik yol açıkça belirtildi mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Dosyaya Yaz

- Dosya: `ACTIVITIES_<proje>.md`
- Konum: cwd

## Adım 6 — Kullanıcıya Rapor

1. Dosya yolu.
2. Toplam proje süresi + kritik yol.
3. Slack < 2 gün olan aktivite sayısı (risk altındakiler).
4. Bilinen boşluk sayısı.
5. Sonraki adım: "Sırada `/feza-pm:risk-register` (kritik yoldakiler yüksek riskli)."

## Sınırlar

- Max 3 soru.
- Diyagram çizme — tablo + minimal ASCII (3-4 ok).
- Kritik yol için tahmin yapma → CPM mekanik hesap.
