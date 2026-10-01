<!-- generated from plugins/feza-iso/skills/iso12207-audit/references/12207-processes.md — do not edit -->
# ISO/IEC/IEEE 12207:2017 — 30 Process Kataloğu

Kaynak: ISO/IEC/IEEE 12207:2017 (süreç amaçları standarttan özetlenmiştir) ve ISO/IEC/IEEE 15288 ile uyumlu süreç yapısı.

## 6.1 Agreement Processes (2)

| ID | Process | Amaç | Tipik Kanıt |
|----|---------|------|-------------|
| 6.1.1 | Acquisition | Dış sağlayıcıdan ürün/hizmet edinme | RFP, kontrat, SOW |
| 6.1.2 | Supply | Müşteriye ürün/hizmet sağlama | Contract, delivery doc |

## 6.2 Organizational Project-Enabling (6)

| ID | Process | Amaç | Tipik Kanıt |
|----|---------|------|-------------|
| 6.2.1 | Life Cycle Model Mgmt | Yaşam döngüsü modelleri tanımla | LCM doc, methodology guide |
| 6.2.2 | Infrastructure Mgmt | Geliştirme/test ortamları | IT infra docs, env setup |
| 6.2.3 | Portfolio Mgmt | Proje portföyü yönetimi | Portfolio dashboard |
| 6.2.4 | Human Resource Mgmt | Beceri ve eğitim | Training records, RACI |
| 6.2.5 | Quality Mgmt | Org seviyesi kalite | QMS doc, ISO 9001 cert |
| 6.2.6 | Knowledge Mgmt | Kurumsal bilgi paylaşımı | Wiki, lessons learned |

## 6.3 Technical Management Processes (8) — **EN KRİTİK**

| ID | Process | Amaç (özet) | Activities | Tipik Kanıt | FezaPlugin Skill |
|----|---------|----------------------|------------|-------------|----------------|
| 6.3.1 | Project Planning | Plan what will be done, by whom, when, with which resources | Define project, plan, activate | `SCOPE_*.md`, `WBS_*.md`, `BUDGET_*.md` | `/feza-pm:scope-statement`, `/feza-pm:wbs` |
| 6.3.2 | Project Assessment & Control | Check whether the project is on track and take action when it is not | Plan assess, assess, control | Statü raporu, `ACTIVITIES_*.md` | `/feza-pm:activity-sequence` |
| 6.3.3 | Decision Management | Make important project decisions in a structured, documented, team-approved way | Prepare, analyze, make and manage | ADR (Architecture Decision Record), meeting minutes | – |
| 6.3.4 | Risk Management | Identify problems before they happen and reduce their impact | Plan, manage profile, analyze, treat, monitor | `RISK_REGISTER_*.md`, `SWOT_*.md` | `/feza-pm:risk-register`, `/feza-pm:swot` |
| 6.3.5 | Configuration Management | Control versions, changes, and releases so the team always works on the correct product | Plan, identify, change mgmt, release control, status accounting, evaluation | `.git`, branch policy, release notes | – |
| 6.3.6 | Information Management | Generate, obtain, confirm, transform, retain, retrieve, disseminate and dispose of information | Prepare, perform | `docs/`, meeting minutes folder | `/feza-pm:comm-plan` |
| 6.3.7 | Measurement | Collect, analyze, and report objective data and information | Prepare, perform | Metrik dashboard | `/feza-iso:iso15939-measure` |
| 6.3.8 | Quality Assurance | Independent assurance of products, processes meet requirements | Plan, evaluate, treat | SQA Plan, audit reports | `/feza-sqa:sqa-plan` (yol haritası) |

## 6.4 Technical Processes (14)

| ID | Process | Amaç | Hangi soru? | Kanıt | FezaPlugin Skill |
|----|---------|------|-------------|-------|----------------|
| 6.4.1 | Business or Mission Analysis | Define the problem or opportunity, characterize the solution space | What problem exists? | `SCOPE_*.md` Project Definition | `/feza-pm:scope-statement` |
| 6.4.2 | Stakeholder Needs & Reqs | Identify all stakeholders and capture their needs | What do people need? | `STAKEHOLDERS_*.md`, `PERSONAS_*.md`, SRS 1.3.3 | `/feza-pm:stakeholder-map`, `/feza-hci:persona` |
| 6.4.3 | System/Software Requirements | Transform stakeholder needs into a precise technical specification | What exactly must the system do? | `SRS_*.md` | `/feza-requirements:srs-generate`, `/feza-iso:iso29148-req` |
| 6.4.4 | Architecture Definition | Generate and evaluate system architecture alternatives | How do we structure it? | `docs/architecture.md`, ADR | – |
| 6.4.5 | Design Definition | Provide sufficient detail to enable implementation | How do we build each piece? | SDD doc | – |
| 6.4.6 | System Analysis | Provide rigorous data for technical decision-making | What does the analysis tell us? | Analysis reports, simulations | – |
| 6.4.7 | Implementation | Realize a specified system element | How do we code it? | Kaynak kod, commit history | – |
| 6.4.8 | Integration | Synthesize implemented elements into realized system | How do parts fit together? | CI pipeline, integration tests | – |
| 6.4.9 | Verification | Provide objective evidence that system fulfills requirements (Did we build it RIGHT?) | Does it meet specs? | Test suite, test reports | – |
| 6.4.10 | Transition | Establish the capability for system to provide services in operational env | How do we go live? | Deployment runbook | – |
| 6.4.11 | Validation | Provide objective evidence that system in use fulfills business objectives (Did we build the RIGHT system?) | Does it meet user needs? | UAT, acceptance reports | `/feza-hci:usability-eval-plan` |
| 6.4.12 | Operation | Deliver service to end users | Is it serving users? | Monitoring dashboard, ops logs | – |
| 6.4.13 | Maintenance | Sustain capability of system to deliver service | Is it staying alive? | Maintenance log, patch records | – |
| 6.4.14 | Disposal | End the existence of a system entity | When and how do we retire? | EOL plan, data migration | – |

## Verification vs Validation (ayrım)

> **Verification** = "Did we build it RIGHT?" — specs ile uyum
> **Validation** = "Did we build the RIGHT system?" — kullanıcı ihtiyacıyla uyum

İkisini karıştırma.

## Olgunluk Skoru Hesabı

Her process için:
- ✓ Uygulanıyor (kanıt var) = 1.0 puan
- Kısmen (kanıt eksik/yetersiz) = 0.5 puan
- Yok = 0 puan
- Uygulanamaz (proje aşaması) = formülden çıkar

Toplam puan / uygulanabilir process sayısı × 100 = uyum yüzdesi.

CMMI-tarzı yorumlama:
- 0-20%: Initial / Ad hoc
- 21-40%: Managed
- 41-60%: Defined
- 61-80%: Quantitatively Managed
- 81-100%: Optimizing
