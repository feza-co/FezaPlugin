# User Story Rules

## Connextra Format

Standart format (Mike Cohn / Connextra):

```
As a <persona / role>,
I want to <goal / desire>,
so that <benefit / value>.
```

### Iyi Ornek
"As a registered user, I want to log in with my email and password, so that I can access my personalized dashboard."

### Kotu Ornek
"As a user, I want a login page." — `so that` eksik (deger ifade etmemis).

## INVEST Kriterleri (Bill Wake, 2003)

Iyi bir user story:

| Harf | Kriter | Anlam |
|------|--------|-------|
| **I** | Independent | Mumkun oldugunca diger story'lerden bagimsiz |
| **N** | Negotiable | Detaylar konusulabilir, sabit "spec" degil |
| **V** | Valuable | Kullanici / musteri icin deger uretir |
| **E** | Estimable | Takim makul bir tahmin yapabilir |
| **S** | Small | Bir sprint icine sigar (genelde ≤ 13 puan) |
| **T** | Testable | Acceptance criteria sayilabilir / olculebilir |

## Acceptance Criteria — Given-When-Then (Gherkin / BDD)

### Sablon
```
Given <onkosul / context>
When <aksiyon / event>
Then <beklenen sonuc>
[And <ek sonuc>]
```

### Iyi Ornek
```
Given the user is registered and email is confirmed
When the user enters correct credentials
Then they are redirected to the dashboard within 2 seconds
And a JWT session is created with 24h validity
```

### Kurallar
- Her story icin minimum 2 AC (happy + sad path)
- Mumkun oldukca **olculebilir** (sayisal veya boolean)
- "olabilir / belki" gibi belirsizlik YOK
- Edge case'leri ayri AC'de yaz

## Edge Case Kontrol Listesi

Her story icin sor:
- Ne olur eger bos input?
- Ne olur eger maksimum sinir?
- Ne olur eger ag yavas / kesik?
- Ne olur eger eszamanli kullanici?
- Ne olur eger izin yok?
- Ne olur eger 3rd party hata?
- Ne olur eger kullanici geri butonuna basarsa?

## Story Point (Fibonacci)

Tahmin sistemi: 1, 2, 3, 5, 8, 13, 21, 40, ?

| Puan | Anlam |
|------|-------|
| 1 | Trivial — 1-2 saat |
| 2 | Çok küçük — yarım gün |
| 3 | Küçük — 1 gün |
| 5 | Orta — 2-3 gün |
| 8 | Buyuk — 5 is gunu |
| 13 | Çok buyuk — 7-8 is gunu (split şart) |
| 21+ | EPIC — kesinlikle bol |
| ? | Belirsiz — research spike gerek |

> Story > 13 = epic split zorunlu.

## Epic Splitting Stratejileri

### 1. Workflow steps
"Kayit -> Email onay -> Login -> Profil" → her adim ayri story.

### 2. Data variations
"Kullanici turleri: Free / Pro / Enterprise" → her tip ayri.

### 3. Operations (CRUD)
"Sepet" → Add / View / Update / Remove ayri story'ler.

### 4. Acceptance criteria split
Bir story'de cok AC varsa → her AC grubu ayri story.

### 5. Happy / Edge cases
Happy path bir story, complex edge case'ler ayri.

## MoSCoW Önceliklendirme

| Etiket | Anlam |
|--------|-------|
| **Must have** | Sürüm icin zorunlu |
| **Should have** | Onemli ama olmadan da çıkar |
| **Could have** | Iyi olur (nice-to-have) |
| **Won't have (this time)** | Bu sürümde yok, sonraki potansiyel |

## Definition of Ready (DoR)

Story sprint'e alinmadan once:
- INVEST 6'si tamam
- AC ≥ 2 (happy + sad)
- Tahmin yapildi
- Bagimliliklar belli
- Persona/rol referansli
- UI mockup (varsa) eklendi
- Acceptance test scriptleri taslak

## Definition of Done (DoD)

Story tamamlandi sayilmasi icin:
- Tum AC pas (sayisal/boolean)
- Unit test yazildi, coverage gate gecti
- Integration test pas
- Code review onaylandi (CODEOWNERS)
- Documentation guncel
- Demo edilebilir
- Production deploy uygun (CI green)

## Anti-Pattern'ler

### "As a user" jenerik kullanimi
"As a user, I want X" — hangi user? Persona ya da spesifik rol kullan.

### Implementation-driven story
"As a developer, I want a Redis cache" — kullanici degeri yok. Refactor task'ı, story değil.

### "Catch-all" story
"As a user, I want everything to work fast" — Spesifik degil, INVEST'in S+T'i fail.

### So that eksigi
"As a user, I want to login." — neden? deger ne? mutlaka so that yaz.

### AC sayisal degil
"Then it works fast" — sayi koy: "Then response < 500ms".

### Story 21+ puan
Bol — epic. Tek bir 21 puan'i iki sprint'e yaymaktan daha iyidir.

## Cikti Sablonu (her story icin)

```markdown
## US-XXX: <Kisa baslik>

**As a** <persona>,
**I want to** <goal>,
**so that** <benefit>.

### INVEST Kontrolu
- ☑ Independent / Negotiable / Valuable / Estimable / Small / Testable

### Acceptance Criteria
**AC1 — Happy path**
- Given ... / When ... / Then ...

**AC2 — Sad path**
- Given ... / When ... / Then ...

### Edge Cases
- ...

### Story Point: <N> (Fibonacci)
**Gerekce:** ...

### Bagimliliklar
- depends-on: US-YYY
- blocks: US-ZZZ

### Iliski
- FR-AAA, FR-BBB
- Persona <N>
```

## Backlog Tablo Sablonu

```markdown
| ID | Story | Persona | Puan | Oncelik | Status |
|----|-------|---------|------|---------|--------|
| US-001 | ... | Ayse | 5 | Must | Ready |
```
