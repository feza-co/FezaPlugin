# ISO/IEC/IEEE 29148:2018 — 4 Doküman Tipi 

## Hiyerarşi

```
BRS  (Business Requirements Specification)
 ↓
StRS (Stakeholder Requirements Specification)
 ↓
SyRS (System Requirements Specification)
 ↓
SRS  (Software Requirements Specification)
```

## Doküman Tipleri (29148 tanımına uygun)

### 1. BRS — Business Requirements Specification

Kurumsal motivasyon, iş süreçleri, operasyonel politikalar, misyon ve hedefler; iş yönetiminin bakış açısıyla.

İçerik:
- Organizasyon vizyonu / misyonu
- İş hedefleri (revenue, market share, compliance)
- İş süreçleri (mevcut + hedef)
- Operasyonel politikalar
- Yasal/regülatif gereksinimler
- Üst seviye business rules

ID prefix: **BR-XXX**

### 2. StRS — Stakeholder Requirements Specification

Kullanıcı ihtiyaçları, operasyonel kavramlar ve senaryolar; paydaşların bakış açısıyla ve yaşam döngüsünün tüm aşamalarını kapsayacak şekilde.

İçerik:
- Stakeholder listesi (user, operator, maintainer, regulator)
- Her stakeholder için ihtiyaç
- Operasyonel senaryolar (kullanım hikayeleri)
- Use cases (üst seviye)
- Acceptance criteria
- Yaşam döngüsü her aşamasından gereksinimler

ID prefix: **StR-XXX**

### 3. SyRS — System Requirements Specification

Fonksiyon, performans, arayüz, kalite nitelikleri ve doğrulama yaklaşımını içeren teknik sistem gereksinimleri.

İçerik:
- Sistem boundary (içerde/dışarda)
- Functional requirements (sistem seviyesi)
- Performance requirements (sayısal)
- Interface requirements (HW/SW/Communication)
- Quality attributes (25010)
- Verification approach

ID prefix: **SyR-XXX**

### 4. SRS — Software Requirements Specification

İşlevsellik, arayüz, performans, tasarım kısıtları ve standart uyumunu kapsayan ayrıntılı yazılım gereksinimleri.

İçerik:
- 29148 outline (Section 1-4) — `srs-generate` skill'inde detayda
- ID prefix: **SR-XXX** (veya FR-/NFR-)

## Üç Çekirdek Süreç 

| Süreç | Çıktı |
|-------|-------|
| Business or Mission Analysis | BRS |
| Stakeholder Needs & Reqs Definition | StRS |
| System Requirements Definition | SyRS + SRS |

## Bi-Directional Traceability 

29148'in en kritik özelliği. **3 yön:**

### Upward Traceability
Her requirement parent'a bağlanır:
- SR → SyR → StR → BR

### Downward Traceability
Sistem requirement'ları sub-element'lere allocate edilir:
- SyR → SR (yazılım) + HwR (donanım) + …

### Horizontal Traceability
Requirement → architecture → design decision → verification → test case

## Transformation Kuralları (mevcut SRS → 4 katman)

### Bir requirement BRS'e gider eğer:
- Spesifik teknoloji içermez
- İş hedefi/politika ifade eder
- "Şirket istiyor ki…", "Yasaya uymalıyız…"
- Yıllık planda yer alır

### Bir requirement StRS'e gider eğer:
- Spesifik kullanıcı sınıfı için yazılmış
- Operasyonel senaryo içerir
- "Müşteri sepetini kaydeder", "Depo görevlisi sevkiyatı onaylar"
- Use case formundadır

### Bir requirement SyRS'e gider eğer:
- Sistem boundary'sini etkiler
- HW/SW/Communication interface tanımlar
- Performance/capacity hedefi (numerik)
- Implementation-independent

### Bir requirement SRS'e gider eğer:
- Spesifik yazılım davranışı
- Algoritma, veri yapısı, API endpoint
- Yazılım specific design constraint
- Coding standard / compliance

## Validation vs Verification 

| | Validation | Verification |
|---|---|---|
| Soru | "Are we building the RIGHT system?" | "Are we building the system RIGHT?" |
| Karşılaştırma | Stakeholder needs | Documented specs |
| Yöntemler | Stakeholder walkthroughs, prototypes, UAT, business value assessment | Requirements reviews, design inspections, code analysis, functional testing |
| Bağlantı | StRS / BRS | SyRS / SRS |

## Çıktı Format Seçenekleri

### Seçenek A — Tek Konsolide Dosya

`REQ_LAYERED_<proje>.md`:
```markdown
# 1. BRS
[tablo]

# 2. StRS
[tablo + scenarios]

# 3. SyRS
[tablo]

# 4. SRS
[mevcut SRS, yeniden ID'lenmiş]

# 5. Traceability Matrix
[BR ↔ StR ↔ SyR ↔ SR]

# 6. V&V Plan
[her requirement için yöntem]
```

### Seçenek B — 4 Ayrı Dosya
- `BRS_<proje>.md`
- `StRS_<proje>.md`
- `SyRS_<proje>.md`
- `SRS_<proje>.md` (revize)
- `TRACEABILITY_<proje>.md`

Hangisi seçilir: kullanıcıya sor (gri nokta) veya proje boyutuna göre karar (büyükse B, küçükse A).

## Iyi-Form Kriterleri (`references/well-formed-requirements.md`'den)

Her requirement HER KATMANDA aşağıdaki kriterlere uymalı:

Bireysel: Necessary, Appropriate, Unambiguous, Complete, Singular, Verifiable, Feasible, Conforming
Set: Complete, Consistent, Affordable, Bounded
