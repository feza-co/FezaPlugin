---
name: iso12207-audit
description: >
  Bir projeyi ISO/IEC/IEEE 12207:2017 process kataloguna göre denetler.
  Standarda uygun 4 grup, 30 process: 6.1 Agreement (2), 6.2 Organizational
  Project-Enabling (6), 6.3 Technical Management (8), 6.4 Technical (14). Her
  process için "uygulanıyor / kısmen / yok" + kanıt + eksik aksiyon önerisi.
  Mevcut FezaPlugin çıktılarını (SCOPE, RISK_REGISTER, COMM_PLAN vs.) kanıt olarak
  toplar. Tetikleyici: "12207 audit", "12207 uyum", "lifecycle process audit",
  "/feza-iso:iso12207-audit".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# ISO/IEC/IEEE 12207 Audit

Projeyi 12207 process'lerine eşler ve uyum raporu çıkarır.

## Tetikleyici
- "/feza-iso:iso12207-audit"
- "12207 audit / uyum / compliance"
- "lifecycle process denetimi"

## Adım 0 — Bağlamı Topla

Glob ile şu kanıt dosyalarını ara:
- **FezaPlugin çıktıları:** `SCOPE_*.md`, `WBS_*.md`, `ESTIMATES_*.md`, `BUDGET_*.md`, `RISK_REGISTER_*.md`, `COMM_PLAN_*.md`, `STAKEHOLDERS_*.md`, `RACI_*.md`, `SRS_*.md`, `ACTIVITIES_*.md`, `HCI_REVIEW_*.md`, `HEURISTIC_EVAL_*.md`, `USABILITY_PLAN_*.md`
- **Repo kanıtları:** `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE`, `.github/workflows/`, `tests/`, `docs/`, `CODE_OF_CONDUCT.md`
- **Konfig:** `.gitignore`, `package.json`, manifest dosyaları, `Dockerfile`, `docker-compose.yml`

Her process için kanıt eşlemesi otomatik yap (referans dosyasında tablo var).

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Denetim derinliği** (sadece 6.3 + 6.4 / hepsi 30 process / sadece 6.3) |
| 2 | **Skor formatı** (uygulanıyor/kısmen/yok ✓ — yoksa 1-5 olgunluk skoru) |

Brief'te aksi belirtilmediyse: **TÜM 30 process** + **3 seviyeli durum**.

## Adım 2 — Bilgi Tabanı
- `references/12207-processes.md` — 30 process tam katalog + amaç + outcome + kanıt eşleme.
- `references/output-conventions.md`.

## Adım 3 — Üret

### Bölüm 1 — Yönetici Özeti
- Toplam process sayısı: 30
- Uygulanan: X (%)
- Kısmen: Y (%)
- Yok: Z (%)
- Olgunluk seviyesi: <CMMI tarzı 1-5 ya da kategori>

### Bölüm 2 — Grup Bazlı Tablo

#### 6.1 Agreement Processes (2)

| Process | Durum | Kanıt | Eksik Aksiyon |
|---------|-------|-------|---------------|
| 6.1.1 Acquisition | Yok | – | TBD |
| 6.1.2 Supply | Yok | – | TBD |

#### 6.2 Organizational Project-Enabling (6)
... (her process satırı)

#### 6.3 Technical Management (8) — **EN KRİTİK**

| Process | Durum | Kanıt | Eksik Aksiyon |
|---------|-------|-------|---------------|
| 6.3.1 Project Planning | ✓ Uygulanıyor | `SCOPE_*.md`, `WBS_*.md` | – |
| 6.3.2 Assessment & Control | Kısmen | `RISK_REGISTER_*.md` var, ama periyodik statü raporu yok | Statü raporu şablonu ekle |
| 6.3.3 Decision Management | Yok | – | ADR (Architecture Decision Records) klasörü oluştur |
| 6.3.4 Risk Management | ✓ | `RISK_REGISTER_*.md` | – |
| 6.3.5 Configuration Management | Kısmen | `.gitignore` var, branch stratejisi yok | Branching policy yaz |
| 6.3.6 Information Management | Yok | – | `docs/` klasörü + meeting notes düzeni |
| 6.3.7 Measurement | Yok | – | `/feza-iso:iso15939-measure` çalıştır |
| 6.3.8 Quality Assurance | Kısmen | Test var ama SQA Plan yok | `/feza-sqa:sqa-plan` (yol haritasında) |

#### 6.4 Technical Processes (14)

| Process | Durum | Kanıt |
|---------|-------|-------|
| 6.4.1 Business or Mission Analysis | ✓ | `SCOPE_*.md` Project Definition |
| 6.4.2 Stakeholder Needs & Reqs | ✓ | `STAKEHOLDERS_*.md` + `SRS_*.md` 1.3.3 |
| 6.4.3 System/Software Requirements | ✓ | `SRS_*.md` |
| 6.4.4 Architecture Definition | ? | TBD — `docs/architecture.md` yoksa eksik |
| 6.4.5 Design Definition | ? | TBD — SDD yok |
| 6.4.6 System Analysis | Yok | – |
| 6.4.7 Implementation | ✓ | Kaynak kod var |
| 6.4.8 Integration | Kısmen | CI/CD var mı? |
| 6.4.9 Verification | Kısmen | Test paketi var, formal verification yok |
| 6.4.10 Transition | Yok | Deploy planı yok |
| 6.4.11 Validation | Yok | UAT yok |
| 6.4.12 Operation | – | Operasyon başlamamış |
| 6.4.13 Maintenance | – | – |
| 6.4.14 Disposal | – | – |

### Bölüm 3 — Top-5 Boşluk

En kritik 5 process (6.3 ve 6.4'e öncelik) + her biri için 1 cümle aksiyon:
1. ...
2. ...

### Bölüm 4 — Önerilen Yol Haritası
- 7 gün içinde: ...
- 1 ay içinde: ...
- 3 ay içinde: ...

### Bölüm 5 — Diğer FezaPlugin Skill'leriyle İlişki

Eksik process'ler için doğrudan skill önerileri:
- 6.3.4 yoksa → `/feza-pm:risk-register`
- 6.3.7 yoksa → `/feza-iso:iso15939-measure`
- 6.4.2 yoksa → `/feza-pm:stakeholder-map`
- 6.4.3 yoksa → `/feza-requirements:srs-generate`
- vs.

## Adım 4 — Self-Check
- [ ] 30 process'in HER BİRİ tabloda var mı?
- [ ] Her satırda durum + kanıt veya TBD?
- [ ] Top-5 boşluk listelendi mi?
- [ ] FezaPlugin skill önerileri eşlendi mi?
- [ ] Yönetici özeti yüzde olarak veriliyor mu?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-iso (ISO Uyumu)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `ISO12207_AUDIT_<proje>.md`

## Adım 6 — Rapor (max 5 satır)
1. Dosya yolu.
2. Olgunluk yüzdesi (uygulanan / 30).
3. Top-3 boşluk.
4. Kullanılan kanıt sayısı.
5. Sonraki: hangi FezaPlugin skill'i çalıştırılmalı.

## Sınırlar
- Max 3 soru.
- Hiçbir process'i atlama — yoksa "Yok" yaz, listede tut.
- Kanıt olmadan "Uygulanıyor" deme.
- Diyagram çizme.
