---
name: risk-register
description: >
  Risk Register tablosu üretir. PMBOK Risk Management uyumlu:
  ID, Kategori (Tech/Schedule/Cost/Resource/External/Quality), Açıklama, Olasılık
  (1-5), Etki (1-5), Skor (P×I), Response stratejisi (Avoid/Transfer/Mitigate/Accept
  pozitif için Exploit/Share/Enhance/Accept), Owner, Trigger, Status. SWOT_*.md'nin
  Threats'ını ve SRS'in kalite/kısıt gereksinimleri, dış arayüzleri, varsayımları ile
  açık (TBD) maddelerini riske çevirir. Referans alınacak bir SRS (SRS_*.md) zorunludur; yoksa çalışmaz ve /feza-requirements:srs-generate'e yönlendirir.
  Tetikleyici: "risk register", "risk listesi", "risk analizi",
  "/feza-pm:risk-register".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Risk Register

PMBOK Identify Risks ve Qualitative Risk Analysis süreçlerine uygun risk kaydı.

## Tetikleyici

- "/feza-pm:risk-register"
- "risk register / risk listesi / risk analizi"
- "qualitative risk analysis"

## Adım 0 — SRS Kapısı ve Bağlam

1. **SRS kapısı (zorunlu):** `references/srs-gate.md` kurallarını uygula. Geçerli SRS yoksa DUR: dosya üretme, brief isteme, proje dizinini (README, kod, manifest, git) okuma; kullanıcıyı `/feza-requirements:srs-generate`'e yönlendir.
2. **`SWOT_*.md`** öncelikli — Threats doğrudan riske çevrilir.
3. **`SCOPE_*.md`** — kapsam = risk yüzeyi.
4. **`ESTIMATES_*.md`** — yüksek varyanslı (σ büyük) aktiviteler riskli.
5. **`ACTIVITIES_*.md`** — kritik yoldaki aktiviteler yüksek riskli.
6. SRS'teki risk sinyalleri:
   - Kalite (QoS) ve uyumluluk gereksinimleri (performans, güvenlik, mevzuat)
   - Dış arayüzler ve üçüncü taraf bağımlılıkları
   - Varsayımlar (yanlış çıkma riski) ve `TBD`/açık maddeler

## Adım 1 — Gri Nokta Tespiti

EN FAZLA 2 SORU:

| # | Gri nokta |
|---|-----------|
| 1 | **Daha önce yaşanmış benzer risk** (lessons learned varsa) |
| 2 | **Risk toleransı** (low/medium/high — proje kritikliği) |

## Adım 2 — Bilgi Tabanı

- `references/risk-template.md` — kategori listesi + skor matrisi + response stratejileri.
- `references/output-conventions.md`.

## Adım 3 — Üret

### Risk Kategorileri

- **Technical** — teknoloji, mimari, performans
- **Schedule** — gecikme, bağımlılık
- **Cost** — bütçe aşımı
- **Resource** — insan kaynak, beceri eksikliği
- **External** — 3rd party, regülasyon, pazar
- **Quality** — kalite hedefi tutmama
- **Operational** — deployment, monitoring

### Risk Tablosu

| Risk ID | Kategori | Risk Açıklaması | Olasılık (1-5) | Etki (1-5) | Skor | Response Stratejisi | Aksiyon | Owner | Trigger | Status |
|---------|----------|-----------------|---------------|-----------|------|---------------------|---------|-------|---------|--------|
| R-001 | Technical | 3rd party API rate-limit'i öngörülenden düşük çıkar | 3 | 4 | 12 | Mitigate | Cache katmanı + queue ekle | Tech Lead | API >100 req/s | Open |
| R-002 | Schedule | UX tasarım onayı geç gelir | 4 | 3 | 12 | Avoid | Design sprint paraleline al | PM | 3. sprint sonunda onay yok | Open |

### Olasılık × Etki Matrisi

| | Etki 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Olasılık 5 | 5 | 10 | **15** | **20** | **25** |
| 4 | 4 | 8 | **12** | **16** | **20** |
| 3 | 3 | 6 | 9 | **12** | **15** |
| 2 | 2 | 4 | 6 | 8 | **10** |
| 1 | 1 | 2 | 3 | 4 | 5 |

- 1-5: Düşük (yeşil)
- 6-12: Orta (sarı)
- 13-25: Yüksek (kırmızı)

### Response Stratejileri

**Negatif riskler (Threats):**
- **Avoid** — riski tamamen ortadan kaldır (kapsamı değiştir)
- **Transfer** — sigorta, outsource, contract
- **Mitigate** — olasılığı veya etkisini azalt
- **Accept** — kabul et + contingency reserve ayır

**Pozitif riskler (Opportunities):**
- **Exploit** — kesinleştir, fırsatı yakala
- **Share** — partner ile birlikte değerlendir
- **Enhance** — olasılığı/etkisini artır
- **Accept** — pasif kabul

### Sayım hedefi

- En az **10 risk** (küçük projelerde 6).
- En az %20'si yüksek skorlu (skor ≥ 13).
- En az 1 pozitif risk (opportunity).

## Adım 4 — Self-Check

- [ ] Her risk kategorize mi?
- [ ] Her risk için P, I, Skor, Response, Owner, Trigger, Status dolu mu?
- [ ] En az 1 pozitif risk var mı?
- [ ] Skorlar P×I ile tutarlı mı (matematiksel kontrol)?
- [ ] "Olabilir / belki" gibi belirsiz dil yok mu — sayısal P/I kullanıldı mı?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Dosyaya Yaz

- Dosya: `RISK_REGISTER_<proje>.md`
- Konum: cwd
- Format: Risk tablosu + matriks görseli (tablo) + Top-5 risk özet listesi

## Adım 6 — Kullanıcıya Rapor

1. Dosya yolu.
2. Toplam risk sayısı + yüksek-skor sayısı.
3. Kullanılan input (SRS + SWOT/SCOPE/ESTIMATES/ACTIVITIES).
4. Top-3 risk başlıkları.
5. Sonraki adım: "Sırada `/feza-pm:comm-plan` veya kalan PM skill'lerinden biri."

## Sınırlar

- Max 3 soru.
- "Belki / mümkün" gibi sözcükler yerine sayısal P×I.
- 0 risk yazma (en az 6).
- Pozitif risk eklenmeden bitirme.
- Response stratejisi gerekçesiz olmasın.
