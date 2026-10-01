---
name: iso29110-vse
description: >
  ISO/IEC 29110 Entry Profile uygulanabilirlik ve gap analizi.
  ISO/IEC 29110 (TR 29110-1, 29110-4-1/5-1-1) ile uyumlu: VSE (Very Small Entities, ≤25 kişi)
  tanımı, Entry Profile (<6 person-months), 2 çekirdek process (PM + SI),
  Customer / PM / Work Team rolleri. Projenin VSE tanımına uyup uymadığını
  ölçer, eksik PM ve SI activity'lerini listeler. Tetikleyici: "29110 VSE",
  "small team standard", "/feza-iso:iso29110-vse", "küçük takım standardı".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# ISO/IEC 29110 — VSE Entry Profile

Küçük takımlar için "ışık" 12207 — uygulanabilirlik + gap raporu.

## Tetikleyici
- "/feza-iso:iso29110-vse"
- "29110 VSE / Entry Profile"
- "küçük takım standardı / lightweight ISO"

## Adım 0 — Bağlamı Topla

1. **Takım büyüklüğü:**
   - `git log --format='%an' | sort -u | wc -l` → katkıcı sayısı
   - `package.json` contributors / `CODEOWNERS`
   - `STAKEHOLDERS_*.md`
2. **Proje hacmi:**
   - `ESTIMATES_*.md` toplam person-month
   - Yoksa kaynak dosya sayısı + zihinden tahmini efor
3. **Mevcut PM çıktıları:** `SCOPE_*.md`, `WBS_*.md`, `ACTIVITIES_*.md`
4. **Mevcut SI çıktıları:** kod, test, README, CI/CD

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Hedef profil** (Entry / Basic / Intermediate / Advanced — varsayılan: Entry) |
| 2 | **Geliştirme yaklaşımı** (waterfall / iterative / incremental / evolutionary / agile) |

## Adım 2 — Bilgi Tabanı
- `references/29110-entry.md` — VSE tanımı, 2 process detay, 4 profil karşılaştırma.

## Adım 3 — Üret

### Bölüm 1 — VSE Uygunluk Kontrolü

| Kriter | Eşik | Proje | Sonuç |
|--------|------|-------|-------|
| Takım büyüklüğü | ≤ 25 kişi | <X> | ✓ / ✗ |
| Hedef profil için efor | Entry: <6pm; Basic: orta; Int.: büyük; Adv.: kompleks | <X person-months> | Hangi profil uygun |
| Operasyon süresi (Entry için) | < 3 yıl | – | Bilgi yok |

**Verdict:** Entry / Basic / Intermediate / Advanced için uygun mu?

### Bölüm 2 — Entry Profile Giriş Koşulları

1. **Team Assignment** — proje takımı + PM atanmış ve eğitilmiş mi?
2. **Development Cycle Documentation** — yaklaşım dokümante edilmiş mi (waterfall/iterative/incremental/evolutionary/agile)?

Her ikisi için ✓ / ✗ + kanıt.

### Bölüm 3 — Project Management (PM) Process Denetimi

| ID | Activity | Amaç | Durum | Kanıt | Aksiyon |
|----|----------|------|-------|-------|---------|
| PM.1 | Project Planning | Müşteri anlaşmasından kapsamlı plan | ✓/Kısmen/Yok | `SCOPE_*.md`, `WBS_*.md` | – / önerilen skill |
| PM.2 | Plan Execution | Planı uygula ve ilerlemeyi izle | ... | – | – |
| PM.3 | Assessment & Control | Performansı değerlendir, düzeltici aksiyon | ... | – | – |
| PM.4 | Project Closure | Ürünleri teslim et + müşteri kabulü | ... | – | – |

### Bölüm 4 — Software Implementation (SI) Process Denetimi

| ID | Activity | Amaç | Durum | Kanıt |
|----|----------|------|-------|-------|
| SI.1 | Implementation Initiation | Proje planını gözden geçir + ortam kur | ... | Proje repo'su, env setup |
| SI.2 | Requirements Analysis | Müşteri requirement'larını analiz + doğrula | ... | `SRS_*.md` |
| SI.3 | Component Design | Yazılım bileşenlerini ve interface'leri tasarla | ... | docs/design |
| SI.4 | Software Construction | Kod modülleri + unit test | ... | Kaynak kod + tests/ |
| SI.5 | Integration & Tests | Entegre et, test et | ... | CI pipeline |
| SI.6 | Product Delivery | Ürünü teslim et | ... | Release notes |

### Bölüm 5 — Roller

| Rol | Anlamı | Bu projede kim? |
|-----|--------|------------------|
| **Customer (CUS)** | Requirement bilgisi, onay otoritesi, kullanıcı ihtiyaçlarını temsil | <isim> |
| **Project Manager (PM)** | Liderlik, planlama, personel yönetimi, geliştirme bilgisi | <isim> |
| **Work Team (WT)** | Teknik beceri | <ekip> |

### Bölüm 6 — Essential Work Products

| Work Product | Var mı? | Hangi dosya |
|--------------|---------|-------------|
| Project Plan | ✓ / ✗ | `SCOPE_*.md` + `WBS_*.md` + `BUDGET_*.md` birleşimi |
| Requirements Specification | ✓ / ✗ | `SRS_*.md` |
| Software Design | ? | – |
| Software Components | ✓ | Kaynak kod |
| Test Cases & Procedures | ? | tests/ |
| Software Configuration | ? | git, branch policy |
| Project Repository | ✓ | git repo |
| Maintenance Documentation | ? | – |

### Bölüm 7 — 12207 ile Karşılaştırma

| Boyut | 12207 | 29110 Entry |
|-------|-------|-------------|
| Process sayısı | 30 | 2 (PM + SI) |
| Tasarım hedefi | Tüm organizasyonlar | VSE'lar (özel) |
| Tailoring | Manuel, uzmanlık gerekir | Pre-tailored |
| Karmaşıklık | Yüksek | Lightweight |
| Kapsam | Tüm sistem yaşam döngüsü | Yazılım odaklı |

## Adım 4 — Self-Check
- [ ] Takım büyüklüğü kontrol edildi mi?
- [ ] PM'in 4 activity'si tablo halinde mi?
- [ ] SI'nin 6 activity'si tablo halinde mi?
- [ ] Roller atandı mı (CUS / PM / WT)?
- [ ] Essential work products tablosu dolu mu?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-iso (ISO Uyumu)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `ISO29110_VSE_<proje>.md`

## Adım 6 — Rapor
1. Dosya yolu.
2. VSE uygunluk + önerilen profil.
3. PM uyum yüzdesi + SI uyum yüzdesi.
4. Top-3 boşluk.
5. Sonraki: `/feza-iso:iso12207-audit` (büyük standart isteniyorsa) veya `/feza-sqa:sqa-plan`.

## Sınırlar
- Max 3 soru.
- 12207 kapsamına girme — 29110 bilinçli olarak basit.
- Takım > 25 ise "VSE uygun değil" diye uyar, yine de gap raporu üret.
- Diyagram yok.
