---
name: wbs
description: >
  Work Breakdown Structure üretir. PMBOK uyumlu 3 seviyeli
  numaralı kırılım (1.0 → 1.1 → 1.1.1), her yaprak için somut deliverable ve
  karşıladığı SRS gereksinim ID'leri. Önce SCOPE_*.md'yi, yoksa doğrudan SRS'i
  kullanır. Referans alınacak bir SRS (SRS_*.md) zorunludur; yoksa çalışmaz ve /feza-requirements:srs-generate'e yönlendirir. Kritik gri noktaları (max 2) sorar.
  Tetikleyici: "WBS oluştur", "work breakdown structure", "iş kırılımı çıkar",
  "/feza-pm:wbs", "deliverable kırılımı".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# WBS (Work Breakdown Structure)

3 seviyeli numaralı WBS üretir. Scope dosyası varsa onu kullanır, yoksa kapsamı SRS'ten kurar ve uyarır.

## Tetikleyici

- "/feza-pm:wbs"
- "WBS oluştur / yaz / çıkar"
- "iş kırılımı / deliverable kırılımı"
- "work breakdown structure"

## Adım 0 — SRS Kapısı ve Bağlam

1. **SRS kapısı (zorunlu):** `references/srs-gate.md` kurallarını uygula. Geçerli SRS yoksa DUR: dosya üretme, brief isteme, proje dizinini (README, kod, manifest, git) okuma; kullanıcıyı `/feza-requirements:srs-generate`'e yönlendir.
2. **`SCOPE_*.md`** dosyasını cwd'de Glob ile ara. Bulduysan oku; In Scope kalemleri WBS dallarının zeminidir.
3. Yoksa kapsamı doğrudan SRS'in fonksiyonel gereksinimlerinden kur ve "SCOPE dosyası yok, kapsam SRS'ten türetildi" notunu Bilinen Boşluklar'a yaz (rapor sonunda `/feza-pm:scope-statement` öner).
4. Her yaprak, karşıladığı FR ID'lerini parantez içinde gösterir.

## Adım 1 — Gri Nokta Tespiti

SCOPE/SRS'ten ARA, eksikse **EN FAZLA 2 SORU** (WBS basit bir araç, çok soru sorma):

| # | Gri nokta | Neden kritik |
|---|-----------|--------------|
| 1 | **Kırılım derinliği** (3 seviye standart, ama bazen 4 gerekir) | Yaprak granülaritesi |
| 2 | **Ana fazlar mı, ana modüller mi?** (Waterfall: faz; Agile: modül/feature) | Üst seviye etiketler |

Çıktıda 2. sorulmasa bile varsayılan: **Modül/Feature** odaklı (modern projelerde yaygın).

## Adım 2 — Bilgi Tabanı

- `references/wbs-template.md` — kuralları ve örnekleri.
- `references/output-conventions.md`.

## Adım 3 — Üret

3 seviye:

```
1.0 <Ana modül/faz>
  1.1 <Alt modül>
    1.1.1 <Aktivite/deliverable>
    1.1.2 ...
  1.2 ...
2.0 ...
```

Kurallar:
- En az **5 ana dal** (1.0–5.0).
- Her ana dal en az **2 alt dal**.
- Her alt dal en az **2 yaprak aktivite**.
- Toplam yaprak ≥ **20**, ≤ **80**.
- Her yaprak için **1 satır deliverable açıklaması** (somut çıktı: dosya, modül, dokümantasyon, vb.)
- **100% Rule:** ana dalların toplamı = projenin TÜMÜ; eksik bırakılmaz, fazlalık eklenmez.
- "Project Management" / "Documentation" / "Testing" gibi cross-cutting dallar genelde ayrı ana dallar olur.

## Adım 4 — Self-Check

- [ ] Toplam yaprak ≥ 20 mi?
- [ ] Her yaprak somut deliverable mı? (eylem değil, çıktı)
- [ ] Numaralama tutarlı mı (1.0, 1.1, 1.1.1)?
- [ ] In Scope item'ları kapsanıyor mu? Out of Scope DAHIL EDİLMEDİ mi?
- [ ] Cross-cutting dallar (PM, QA, Docs) var mı?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Dosyaya Yaz

- Dosya: `WBS_<proje>.md`
- Konum: cwd
- Format: Markdown nested liste + sonunda **özet tablo** (ana dal → yaprak sayısı)

## Adım 6 — Kullanıcıya Rapor

1. Dosya yolu.
2. Tek cümle: kaç ana dal, kaç yaprak.
3. Kullanılan input (SRS + varsa SCOPE_*.md).
4. Bilinen boşluk sayısı.
5. Sonraki adım: "Sırada `/feza-pm:estimate` — her yaprağa 3-point süre tahmini."

## Sınırlar

- Max 3 soru toplam (1 girdi seçimi + 2 gri).
- Diyagram üretilmez; tablo ve ASCII yeterli (nested liste).
- Yaprak sayısı 80'i geçmesin (okunabilirlik).
- Out of Scope item'ları WBS'e eklenmez.
