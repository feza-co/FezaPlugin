# Traceability Rules (ISO/IEC/IEEE 29148 + IEEE 829)

## ISO 29148 Bi-Directional Traceability

### Upward Traceability
Her gereksinim ust gereksinimlere, nihayetinde paydas ihtiyaclarina ve is hedeflerine geri izlenebilmelidir.

- SR (software) → SyR (system) → StR (stakeholder) → BR (business) → Stakeholder Need

### Downward Traceability
Sistem gereksinimleri, tahsis (allocation) yoluyla sistem elemanlarina, yazilima ve donanima ait turetilmis gereksinimlere iner.

- BR → StR → SyR → SR → Design → Code → Test

### Horizontal Traceability
Gereksinimler mimari elemanlara, tasarim kararlarina, dogrulama yontemlerine ve test case'lere baglanir.

- Aynı seviyede: FR-008 ↔ FR-009 (related)
- Çapraz: NFR-003 (Security) ↔ Design (PasswordHasher) ↔ Test (AUTH-25)

## Tam Traceability Zinciri

```
Stakeholder Need (N-XXX)
    ↓ traces-to
Business Requirement (BR-XXX)         — 29148 Business Requirements Specification katmani
    ↓ refines-as
Stakeholder Requirement (StR-XXX)     — `/feza-pm:stakeholder-map` + `/feza-hci:persona`
    ↓ allocated-to
System Requirement (SyR-XXX)
    ↓ implemented-by
Software Requirement (SR-XXX / FR-XXX / NFR-XXX)  — `/feza-requirements:srs-generate`
    ↓ designed-as
Design Element (Component, Module)
    ↓ coded-in
Code (file, function)
    ↓ tested-by
Test Case (TC-XXX)                    — `/feza-sqa:test-plan`
    ↓ may-find
Defect (DR-XXX)                       — `/feza-sqa:defect-report`
```

## ISO 29148 Bi-Directional Validation Sorulari

Tum traceability'leri dogrulamak icin sor:
- Her SR upward bir StR'a baglaniyor mu?
- Her StR downward bir veya daha cok SR'a allocate ediliyor mu?
- Her TC bir SR'a baglaniyor mu?
- Her code element bir SR'a baglaniyor mu?
- Her DR bir TC'ye baglaniyor mu?

Cevap "hayir" ise → orphan (sahipsiz). Gap.

## Coverage Hesabi

```
Coverage(phase) = atanmis_sayi / toplam_sayi × 100
```

Her phase icin:

| Phase | Total | Mapped | Coverage |
|-------|-------|--------|----------|
| Need → BR | N1 | M1 | M1/N1 % |
| BR → StR | ... | ... | ... |
| StR → SyR | ... | ... | ... |
| SyR → SR | ... | ... | ... |
| SR → Design | ... | ... | ... |
| Design → Code | ... | ... | ... |
| SR → TC | ... | ... | ... |

Hedef: ≥ %95 her phase, < %95 = gap analizinde acik

## Tracking Tools

Manuel:
- Markdown tablo (kucuk projeler)
- Excel/Google Sheets (orta)

Tool destekli:
- Jira "Issue Links" (Epic → Story → Subtask → Test)
- Azure DevOps Test Plans
- DOORS (enterprise)
- ReqIF format

## Gap Tipleri

### Orphan Requirement
SR var, üst seviyede StR yok → "neden bu req var?" cevap yok.

### Dead Requirement
SR var, ne design ne TC var → unimplemented + untested.

### Untested Requirement
SR var, design ve code var, **TC yok** → kritik (release riski).

### Unrequired Code
Code var, hiç bir SR'a bağlanmaz → gold-plating veya scope creep.

### Unbounded Defect
DR var, TC'ye baglı değil → regression imkansız (ayni hata tekrar olur).

## Trace Linking Notation

| Notation | Anlam |
|----------|-------|
| `traces-to` | Aynı seviye, bilgi paylaşımı |
| `derived-from` | Üst seviyeden türetildi |
| `refines` | Üst seviyeyi detaylandiriyor |
| `allocated-to` | Üst seviye, alt seviyeye dağıtıldı |
| `implemented-by` | Code/design olarak gerceklestirildi |
| `verified-by` | Test ile dogrulanir |
| `validated-by` | UAT/stakeholder review ile dogrulanir |
| `conflicts-with` | Cakisma var (`/feza-requirements:req-conflict-check`) |
| `supersedes` | Eski version'in yerine geçer |

## Master Matrix Sablonu

```markdown
| Need | BR | StR | SyR | SR | Design | Code | TC | Defect | Coverage |
|------|----|----|----|----|--------|------|----|----|----|
| N-001 | BR-001 | StR-002 | SyR-005 | FR-008 | RegisterForm | register.ts | AUTH-12, AUTH-13 | DR-022 | Tam |
| N-002 | BR-002 | StR-007 | SyR-009 | NFR-003 | PasswordHasher | hash.ts | AUTH-25 | – | Tam |
| – | BR-006 | – | – | – | – | – | – | – | **Orphan BR** |
| ... | ... | ... | ... | SR-022 | – | – | – | – | **Untested** |
```

## Anti-Pattern'ler

- ✗ Sadece Req-Test eslemesi yapip BR'yi atlamak
- ✗ Coverage hesaplamadan matrix sunmak
- ✗ Orphan'lari raporlamadan bitirmek
- ✗ Defect'i TC'ye baglamadan kapatmak
- ✗ Diyagram cizmek (Diyagram üretilmez; tablo ve ASCII yeterli.)
- ✗ Tek yonlu (sadece downward) trace
