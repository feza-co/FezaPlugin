---
name: iso29148-req
description: >
  Mevcut requirement setini ISO/IEC/IEEE 29148:2018 BRS/StRS/SyRS/SRS
  hiyerarşisine göre yeniden yapılandırır. standardın tanımladığı 4
  doküman tipi: Business Requirements Specification, Stakeholder Requirements
  Spec, System Requirements Spec, Software Requirements Spec. Her requirement'ı
  uygun katmana yerleştirir, traceability link'i kurar, well-formed kriterleri
  uygular. /feza-requirements:srs-generate'tan farkı: yeniden yapılandırma + 4 doküman
  ayrımı + traceability. Tetikleyici: "29148 reorganize", "requirement layering",
  "/feza-iso:iso29148-req".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# ISO/IEC/IEEE 29148 Requirement Layering

Mevcut requirement listesini 29148 4-katmanlı yapıya dönüştürür.

## Tetikleyici
- "/feza-iso:iso29148-req"
- "29148 reorganize / layering"
- "requirement katmanlama"

## Adım 0 — Bağlamı Topla
1. **`SRS_*.md`** öncelikli (yeniden yapılandıracağımız ana kaynak)
2. **`SCOPE_*.md`** — Business requirements için
3. **`STAKEHOLDERS_*.md`** + **`PERSONAS_*.md`** — Stakeholder requirements için
4. **`BRIEF.md`/`README.md`** — eksik bağlam
5. Hiç requirement dosyası yoksa **TEK** soru: "Mevcut SRS yok — önce `/feza-requirements:srs-generate` çalıştırmamı mı istersin?"

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Hedef katman** (4 katman birden / sadece eksik olanı / sadece SRS revize) |
| 2 | **Traceability formatı** (varsayılan: ID prefix — BR, StR, SyR, SR) |

## Adım 2 — Bilgi Tabanı
- `references/29148-layers.md` — 4 katman + transformation kuralları + iyi-form karakteristikleri.

## Adım 3 — Üret

### Bölüm 1 — 4 Katman Hiyerarşi

| Katman | Doküman | Bakış açısı | Sahip |
|--------|---------|-------------|-------|
| 1 | **BRS** — Business Requirements Specification | Organizasyonel motivasyon, iş süreçleri, hedefler | İş yönetimi |
| 2 | **StRS** — Stakeholder Requirements Specification | Kullanıcı ihtiyaçları, operasyonel senaryolar | Stakeholder'lar |
| 3 | **SyRS** — System Requirements Specification | Teknik sistem gereksinimleri (hardware + software + interface) | Sistem mühendisi |
| 4 | **SRS** — Software Requirements Specification | Detay yazılım gereksinimleri | Yazılım takımı |

### Bölüm 2 — Mevcut Setin Sınıflandırılması

Mevcut SRS'teki her requirement için: hangi katmana ait?

| Mevcut ID | Cümle (kısa) | Önerilen katman | Yeni ID | Gerekçe |
|-----------|--------------|-----------------|---------|---------|
| FR-001 | Sistem kullanıcıyı SAML ile doğrulayacaktır | SRS | SR-001 | Spesifik teknoloji + yazılım |
| FR-002 | Sistem müşterilerin sipariş vermesini sağlar | StRS | StR-005 | Stakeholder ihtiyacı |
| NFR-003 | Kurumsal bilgi güvenliği politikasına uyum | BRS | BR-002 | İş kuralı |
| NFR-004 | Yanıt < 2s | SyRS | SyR-008 | Sistem performans karakteristiği |

### Bölüm 3 — 3 Çekirdek Süreç

29148'in 3 ana process'i:
1. **Business or Mission Analysis** → BRS üretir
2. **Stakeholder Needs & Requirements Definition** → StRS üretir
3. **System Requirements Definition** → SyRS + SRS üretir

Her katman için bu süreç bağlamını açıkla.

### Bölüm 4 — 4 Katman Çıktıları

#### 4.1 BRS — Business Requirements Specification

| BR ID | Requirement | Kaynak | İlgili StR |
|-------|-------------|--------|-------------|
| BR-001 | Çevrimiçi sipariş tamamlama oranını artır | Sponsor | StR-001, StR-002 |

#### 4.2 StRS — Stakeholder Requirements Specification

| StR ID | Stakeholder | Need | Operational Scenario | İlgili SyR |
|--------|-------------|------|----------------------|-------------|
| StR-001 | Müşteri | Siparişi 5 dakikada tamamlayabilmek | Kampanya dönemi alışverişi | SyR-003, SyR-004 |

#### 4.3 SyRS — System Requirements Specification

| SyR ID | Requirement | Tip (Functional/Performance/Interface) | İlgili SR |
|--------|-------------|----------------------------------------|------------|
| SyR-001 | Sistem 1000 eşzamanlı kullanıcı destekleyecektir | Performance | SR-002 |

#### 4.4 SRS — Software Requirements Specification

(zaten var, sadece **revize** edilmiş hali — 29148 outline iskeletinde)

### Bölüm 5 — Bi-Directional Traceability Matrisi

29148'in en önemli özelliği. Her requirement için:

| BR ID | StR ID | SyR ID | SR ID |
|-------|--------|--------|-------|
| BR-001 | StR-001, StR-002 | SyR-001, SyR-003 | SR-001, SR-002, SR-005 |
| BR-002 | StR-005 | SyR-008 | SR-010, SR-011 |

**Upward traceability:** her SR bir StR'ya, her StR bir BR'ya bağlanmalı.
**Downward traceability**: SyR'lardan SR'lara allocation.
**Horizontal**: requirement → architecture → verification.

### Bölüm 6 — Well-Formed Kontrolü

Her katman için iyi-form kriterleri kontrol edilir:
- Necessary, Appropriate, Unambiguous, Complete, Singular, Verifiable, Feasible, Conforming
- Set seviyesinde: Complete (TBD yok), Consistent, Affordable, Bounded

(`references/well-formed-requirements.md`'den; srs-generate kaynaklı).

### Bölüm 7 — Validation vs Verification

> **Validation** = "Are we building the right system?" — stakeholder needs ile uyum
> **Verification** = "Are we building the system right?" — specs ile uyum

Her requirement'a doğrulama yöntemi eklenir.

## Adım 4 — Self-Check
- [ ] 4 katman tablosu var mı?
- [ ] Her mevcut requirement bir katmana atandı mı?
- [ ] Bi-directional traceability matrisi var mı?
- [ ] Well-formed kontrolü uygulandı mı?
- [ ] V&V atama var mı?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-iso (ISO Uyumu)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `REQ_LAYERED_<proje>.md` (alternatif: 4 ayrı dosya — `BRS_*.md`, `StRS_*.md`, `SyRS_*.md`, `SRS_*.md`)

## Adım 6 — Rapor
1. Dosya yolu(ları).
2. Katman dağılımı: kaç BR, kaç StR, kaç SyR, kaç SR.
3. Traceability gap'leri (parent'ı olmayan req'ler).
4. Well-formed ihlali sayısı.
5. Sonraki: `/feza-iso:iso25010-quality` (NFR'ler 25010 etiketli mi kontrol).

## Sınırlar
- Max 3 soru.
- Mevcut SRS yoksa direkt üretmeye geçme — önce srs-generate öner.
- Traceability matrisi olmadan bitirme.
- 4 katmandan birini boş bırakma — proje küçükse "Bu katman bu projede minimal: <neden>" yaz.
