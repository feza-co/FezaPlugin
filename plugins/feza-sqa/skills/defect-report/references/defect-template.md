# Defect Reference (IEEE 1044 + ISO/IEC/IEEE 29119-3)

## Defect Terminolojisi (IEEE 1044 / ISO 9000)

```
Fault
Failure
Bug
Non-Conformity
Anomaly
Problem
Finding
```

Endustride en yaygin: **Defect** ve **Bug**. Review/inspection/audit ciktilari icin tarafsiz terim: **Finding** (kisiyi degil urunu isaret eder).

## Defect vs Bug vs Failure (clarification)

| Terim | Anlam |
|-------|-------|
| **Defect** | Yazilim icindeki potansiyel hata kaynagi (statik) |
| **Fault** | Defect ile esanlamli, daha akademik |
| **Failure** | Defect'in calisma aninda manifest olmasi (dinamik) |
| **Bug** | Defect'in informal terimi |
| **Anomaly** | Beklenmeyen davranis (henuz defect mi degil mi belirsiz) |
| **Non-conformity** | Spec'ten sapma (defect olabilir) |
| **Problem** | Genel sikinti (kullanici perspektifi) |
| **Finding** | Inspection bulgusu (defect olabilir veya iyilestirme onerisi) |

## Severity Skalasi (IEEE 1044 uyumlu)

| Seviye | Tanim |
|--------|-------|
| **Critical** | Sistemde buyuk bir hataya yol acar — kullanimi engeller |
| **Major** | Hataya yol acar veya sistemi kullanmayi zorlastirir — ozellik kullanilamaz |
| **Minor** | Kozmetik / workaround mevcut |
| **Trivial** | Çok kucuk (typo gibi) |

## Priority Skalasi (yaygin endustri standardi)

| Seviye | Aciklama | Hedef fix sure |
|--------|----------|------------------|
| **P1 — Critical / Hotfix** | Production'da major impact, hemen | < 24h |
| **P2 — High** | Sprint icinde mutlaka | < 1 hafta |
| **P3 — Medium** | Sürüm icinde | < 1 sürüm |
| **P4 — Low** | Backlog, fırsat oldukca | Açık uçlu |

## Severity ≠ Priority (KRITIK)

İki ayrı kavram:
- **Severity** = Teknik etki (sistemin ne kadar bozuldugu)
- **Priority** = Aciliyet (ne kadar hizli düzeltilmeli)

Tipik kombinasyonlar:

| Senaryo | Severity | Priority |
|---------|----------|----------|
| Login tamamen çalışmıyor | Critical | P1 |
| Cart'ta indirim yanlış hesaplanıyor | Critical | P1 |
| Profil resmi yuklenirken bazen 5s | Major | P2 |
| Footer'da typo "Privacy Polciy" | Trivial | P3 |
| **Footer typo CEO demosunda görünüyor** | Trivial | **P1** ← yüksek priority |
| Edge: maks 1000 char + emoji | Minor | P4 |
| Security: XSS injection | Critical | P1 |

## Reproducibility Skalasi

| Etiket | Aciklama |
|--------|----------|
| **Always** | Her seferinde tekrar uretilir |
| **Sometimes** | Rastgele, %50+ |
| **Once** | Bir kez gözlendi |
| **Cannot reproduce** | Tekrar üretilemiyor |

> Cannot reproduce → triage'da kapatılır ama **trace** tutulur (sonra tekrar gorulurse referans).

## Defect Lifecycle State'leri

| State | Onceki state | Sonraki state |
|-------|--------------|---------------|
| New | – | Assigned / Rejected / Duplicate / Deferred |
| Assigned | New | In Progress / Rejected / Deferred |
| In Progress | Assigned | Fixed |
| Fixed | In Progress | Verified / Re-opened |
| Verified | Fixed | Closed |
| Closed | Verified | Re-opened (regression) |
| Rejected | New / Assigned | (terminal) |
| Deferred | New / Assigned | Assigned (re-evaluate) |
| Duplicate | New | (terminal — link to original) |
| Won't Fix | New / Assigned | (terminal) |
| Re-opened | Closed / Verified | Assigned |

## Root Cause Categories

| Category | Ornek |
|----------|-------|
| Logic error | If branch yanlis kosul |
| Null/undefined handling | Null check eksik |
| Boundary condition | Off-by-one |
| Concurrency | Race condition |
| Configuration | Yanlis env var |
| Data | Test data eksik / bozuk |
| Integration | 3rd party API breaking change |
| Performance | N+1 query, memory leak |
| Security | XSS / SQLi / auth bypass |
| Usability | Confusion, a11y violation |
| Documentation | Yanlis api doc |

## Defect Form (markdown sablonu)

```markdown
# DR-<XXX>: <kisa baslik>

## Header
- ID:
- Reported by:
- Date:
- Status:
- Severity:
- Priority:

## Description

## Environment
- OS:
- Browser/Client:
- App version:
- Backend version:
- Network:

## Reproduction
- Reproducibility:
- Pre-condition:
- Steps:
  1.
  2.
  3.
- Expected:
- Actual:
- Attachments:

## Traceability
- Failed TC:
- Related Req:
- Related CR:

## Root Cause
- Cause:
- Category:
- Phase introduced:
- Could have been caught at:

## Fix
- Owner:
- Branch:
- PR:
- Estimated:
- Actual:

## Verification
- Verified by:
- Date:
- Tests added/updated:

## Closure
- Released in:
- Notes:
```

## GitHub Issue Template (`.github/ISSUE_TEMPLATE/bug_report.md`)

```markdown
---
name: Bug Report
about: Report a defect
title: '[BUG] '
labels: bug
assignees: ''
---

## Severity
- [ ] Critical
- [ ] Major
- [ ] Minor
- [ ] Trivial

## Environment
- OS:
- Browser:
- App version:

## Steps to Reproduce
1.
2.
3.

## Expected Behavior


## Actual Behavior


## Screenshots / Logs
```

## Defect Metrikleri (`/feza-sqa:metrics-plan` ile)

| Metrik | Hesap | Hedef |
|--------|-------|-------|
| **DRE** (Defect Removal Efficiency) | Fi / (Fi + Fa) × 100 | ≥ 85% |
| MTTR — Mean Time To Repair (Critical) | mean(close_date - open_date) for Critical | < 24h |
| MTTR (Major) | – | < 1 hafta |
| MTTR (Minor) | – | < 1 sürüm |
| Reopen rate | reopened / fixed | < %10 |
| Escape rate | production-found / total | < %5 |
| Aging | mean age of open defects | < 30 gun |
| Critical aging | en eski Critical açık | 0 (acilen kapat) |

## Anti-Pattern'ler

- ✗ Severity ve Priority'yi karistirma
- ✗ Reproduction steps belirsiz
- ✗ Environment bilgisi yok ("Calismiyor" demek yetmez)
- ✗ Traceability (TC + Req) eksik
- ✗ Fixed → Closed direkt (Verified atlanmis)
- ✗ "Will fix later" demek (Deferred state'e geç)
- ✗ Duplicate'i kapatip original'a link vermemek
- ✗ Re-opened'in eski rapora link tutmamasi
- ✗ Root cause yazmadan close (lessons learned imkansiz)
