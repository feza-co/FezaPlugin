# Test Plan & Test Case Template (ISO/IEC/IEEE 29119-3 ve IEEE 829 uyumlu)

## Minimum Test Case Alanlari

```
TC ID (ex: PAY-01)
Req (ex: FR-001)
Priority (High / Medium / Low)
Type (Positive / Negative / Boundary / NFR)
Brief Description
Expected Result
```

## Test Plan Workflow (29119-2 test sureci ile uyumlu)

```
Test Plan
  ↓
Test Design Specifications
  ↓
Test Cases — All the fields in the template and more
  ↓
Traceability to Requirements
  ↓
Schedule — When/What
  ↓
Execute — Run Test Cases
  ↓
Results — Run/Pass/Fail
  ↓
Defects (Traceability to Test Cases)
  ↓
History
```

## Roller ve Sorumluluklar

1. Identify Roles and Responsibilities
2. Become Familiar with Requirements and Design
3. Write a Test Plan
4. Write Test Design Specifications
5. Have Test Plan and Design Spec. Reviewed and Approved
6. Write Test Cases
7. Prepare the Test Environment
8. Prepare the Test Tools
9. Prepare the Test Data

## Test Levels

| Seviye | Kim yazar / koşar | Hedef |
|--------|-------------------|-------|
| **Unit** | Developer | Tek fonksiyon/modul |
| **Integration** | Developer + Test | Bilesenler arasi |
| **System** | Test team | Uctan uca, tum sistem |
| **Acceptance / UAT** | Customer | Kabul kosullarini saglar mi |

## Test Approach

| Tip | Aciklama |
|-----|----------|
| **Static** | Kod calistirmadan analiz (review, inspection, lint) — `/feza-sqa:inspection` |
| **Dynamic** | Kod calistirilarak test (functional, NFR) |
| **Functional** | Ne yapiyor (FR) |
| **Non-functional** | Nasil yapiyor (NFR — performans, guvenlik, vs.) |
| **Positive** | Happy path |
| **Negative** | Sad path, hata durumu |
| **Boundary** | Sinir degerler (0, max, max+1) |
| **Equivalence partition** | Class temsilcisi |
| **Smoke** | Hizli sanity check |
| **Regression** | Eski calisan'in hala calistigini dogrula |

## Priority ve Type Etiketleri

Priority:
- **High** — kritik fonksiyon, release blocker
- **Medium** — onemli, workaround var
- **Low** — kozmetik / nadir durum

Type:
- **Positive** — happy path
- **Negative** — hata durumu
- **Boundary** — edge case
- **Performance / Security** — NFR test

## Test Case Sablon (zenginlestirilmis)

```markdown
| Alan | Aciklama |
|------|----------|
| TC ID | Proje prefix + sira (orn: PAY-01) |
| Req | Hangi FR/NFR'a baglanir (orn: FR-003) |
| Priority | High / Medium / Low |
| Type | Positive / Negative / Boundary / Performance / Security |
| Brief Description | Tek cumle |
| Pre-condition | Test oncesi gereken durum |
| Test Data | Kullanilacak veri |
| Steps | Numarali, atomik adimlar |
| Expected Result | Olculebilir, spesifik beklenti |
| Actual Result | Test sonrasi doldurulur |
| Status | Not Run / Pass / Fail / Blocked |
| Defect ID | Fail ise ilgili defect ID |
| Tester | Kim kosturdu |
| Date | Ne zaman |
```

## Iyi Test Case Ornegi

```
TC ID: AUTH-01
Req: FR-001
Priority: High
Type: Positive
Brief Description: Successful login with valid credentials
Pre-condition: User "test@example.com" registered, email confirmed, password "P@ssw0rd!"
Test Data: email=test@example.com, password=P@ssw0rd!
Steps:
  1. Navigate to /login
  2. Enter email "test@example.com"
  3. Enter password "P@ssw0rd!"
  4. Click "Login" button
Expected Result:
  - User redirected to /dashboard within 2 seconds
  - JWT cookie set with 24h expiry, HttpOnly flag
  - "Welcome, Test User" displayed in header
Actual Result: [doldurulacak]
Status: Not Run
Defect ID: -
```

## Kotu Test Case Ornegi (yapma)

```
TC ID: TC1
Req: -
Priority: -
Brief Description: Login test
Steps: Login
Expected Result: Works
```

Eksikler: Req traceability yok, priority yok, steps belirsiz, expected result olculmez.

## Test Pyramid (best practice)

```
        /\
       /  \
      / E2E\        ← Az (10-20%)
     /------\
    /  Integ \      ← Orta (20-30%)
   /----------\
  /    Unit    \    ← Cok (60-70%)
 /--------------\
```

## Pass/Fail Criteria Ornegi

- Critical defect: 0
- Major defect: ≤ 3 (release decision)
- Minor defect: ≤ 10
- Test coverage: ≥ 80%
- All happy path TC'ler PASS
- All NFR TC'ler PASS

## Anti-Pattern'ler

- ✗ Req traceability'siz TC
- ✗ "Works correctly" gibi olculmez Expected Result
- ✗ Pre-condition belirtmeden test
- ✗ Tek bir step'te 5 farkli aksiyon ("login + add to cart + checkout")
- ✗ Negative path'i ignore etmek
- ✗ NFR'lere sifir TC
