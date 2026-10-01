# Change Control Process Reference

## Standartlar

- **IEEE 730** — SQA = Change Control + Processes/Procedures + V&V + Standards/Templates
- **ISO/IEC/IEEE 12207:2017 — 6.3.5 Configuration Management Process**
  > "Control versions, changes, and releases so the team always works on the correct product."
  > Activities: Plan / Configuration Identification / Configuration Change Mgmt / Release Control / Status Accounting / Evaluation
- **ISO/IEC/IEEE 15288** — Systems engineering analog
- **PMBOK** — Integrated Change Control

## CR State Machine (ASCII)

```
                ┌─────────┐
                │ Proposed│
                └────┬────┘
                     │ CCB Chair atar
                     v
                ┌─────────────┐
                │ Under Review│
                └────┬────┬───┘
                     │    │
              Approve│    │Reject
                     v    v
            ┌────────────┐ ┌──────────┐
            │ Approved   │ │ Rejected │
            │ (or Defer) │ └──────────┘
            └────┬───────┘
                 │
                 v
            ┌─────────────┐
            │ Implementing│
            └────┬────────┘
                 │
                 v
            ┌──────────┐
            │ Verified │
            └────┬─────┘
                 │
                 v
            ┌────────┐
            │ Closed │
            └────────┘
```

## CR Form Şablonu Tam (kopyala-yapıştır kullanımlık)

```markdown
# CR-<XXX>

## Header
- CR ID:
- Date Submitted:
- Submitter:
- Priority: [Critical / High / Medium / Low]
- State: Proposed
- Target Release:

## 1. Description
**Title:**
**Detail:**
**Affected Items:**

## 2. Justification
**Business Reason:**
**Customer Impact:**

## 3. Impact Analysis
### 3.1 Scope
### 3.2 Schedule
### 3.3 Cost
### 3.4 Quality (25010 mapping)
### 3.5 Stakeholder
### 3.6 Dependency (traceability link)
### 3.7 Risk

## 4. CCB Decision
**Votes:**
**Decision:**
**Conditions:**
**Decided Date:**

## 5. Implementation
**Owner:**
**Branch:**
**PR:**

## 6. Verification
**Tests added/updated:**
**Acceptance:** [Pass / Fail]

## 7. Closure
**Released in:**
**Documentation updated:** [Yes / No]
**Stakeholder notified:** [Yes / No]
**Lessons learned:**
```

## Threshold Matrix

| Buyukluk | Tahmini Effort | Onay yolu | Maks sure |
|----------|----------------|-----------|------------|
| Trivial | < 0.25 gun | Developer + code review | Saat |
| Small | < 1 gun | PM tek onay | 1 gun |
| Medium | 1-5 gun | Mini-CCB (PM + Tech Lead) | 2-3 gun |
| Large | > 5 gun | Tam CCB | 1 hafta |
| Architectural | Mimariyi degistirir | Tam CCB + Sponsor | 2 hafta |

## CCB Voting Protokolu

### Standart kararname

**Approve sarti:**
- PM ☑
- Sponsor (büyük CR) ☑
- Tech Lead VEYA QA Lead ☑
- Hicbir ret yok

**Reject sarti:**
- Tek bir CCB üyesi reddi yeterli (gerekce zorunlu)

**Conditional Approve:**
- Onay var ama belirli kosullar (orn: "Test coverage 80%+ olursa onaylandı")

**Deferred:**
- Sonraki sürüme erteleniyor (sebep: zaman, oncelik, baska CR'ye baglilik)

## Impact Analysis Boyutlari (CCB checklist)

| Boyut | Sorulacak |
|-------|-----------|
| **Scope** | Scope statement etkileniyor mu? |
| **Schedule** | Critical path etkilenir mi? Yeni tarih? |
| **Cost** | Reserve'e duser mi yoksa ek bütçe mi? |
| **Quality** | Hangi 25010 karakteristigi etkilenir? |
| **Stakeholder** | Kim etkilenir? Iletisim plani? |
| **Dependency** | Hangi req/test/design (`traceability-matrix` referansli)? |
| **Risk** | Yapma riski + yapmama riski |

## Audit Trail Zorunlulugu

CR sahipligi degisirse:
```
[CR-001 created by Developer, 2026-05-05 14:32]
[CR-001 assigned to CCB Chair, 2026-05-05 14:35]
[CR-001 state: Proposed → Under Review, 2026-05-05 14:35]
[Impact analysis added by Tech Lead, 2026-05-06 10:15]
[Vote: CCB Chair Approve, Tech Lead Approve, QA Lead Conditional]
[CR-001 state: Under Review → Approved (conditional), 2026-05-07 11:00]
[Implementation started by Developer on branch feature/CR-001, 2026-05-08]
[Tests AUTH-89, AUTH-90 added, 2026-05-10]
[CR-001 state: Implementing → Verified, 2026-05-11]
[Released in v1.2.0, 2026-05-12]
[CR-001 state: Verified → Closed, 2026-05-12]
```

ISO 12207 audit'te bu trail gerekir.

## Metrikleri (`/feza-sqa:metrics-plan` ile)

- CR cycle time (Proposed → Closed)
- CR approval rate (Approved / Total)
- CR rework rate
- Scope creep yüzdesi (toplam CR effort / planned effort)
- CR severity dagilim (Critical / High / Medium / Low yüzdeleri)
- Reddetme gerekce kategorileri (out-of-scope, unaffordable, low value)

## Anti-Pattern'ler

- ✗ Tek developer'in büyük CR'i kendi onaylayip implement etmesi
- ✗ Impact analiz olmadan onay
- ✗ Voting record tutmamak (audit fail)
- ✗ Verified atlanip Closed (regression riski)
- ✗ Reddetmeyi gerekcesiz birakmak
- ✗ CCB toplanma sıklığı belirsiz (ad-hoc cok cok)
- ✗ "Acil" bahanesiyle process atlama (ozel express track varsa kullan, yoksa atlama)
