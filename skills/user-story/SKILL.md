---
name: user-story
description: >
  User story uretir. Connextra format ("As a <role>, I want <goal>, so that
  <benefit>") + INVEST kriterleri (Independent / Negotiable / Valuable /
  Estimable / Small / Testable) + Given-When-Then acceptance criteria. Agile
  (Cohn, "User Stories Applied") ve INVEST (Wake) pratigine uygun. FR'lerden, brief'ten veya
  PERSONAS dosyasindan turetir. Her story icin story point tahmini (Fibonacci)
  + edge case'ler. Tetikleyici: "user story", "acceptance criteria",
  "/feza-requirements:user-story", "given when then".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# User Story

INVEST + Given-When-Then standardinda user story üretir.

## Tetikleyici
- "/feza-requirements:user-story"
- "user story / kullanici hikayesi"
- "acceptance criteria / Given-When-Then"

## Adim 0 — Bagilami Topla
1. **`SRS_*.md`** veya **`REQ_CLASSIFIED_*.md`** — FR'lerden turetilir
2. **`PERSONAS_*.md`** — "as a <role>" kismi icin
3. **`SCOPE_*.md`** — kapsam siniri
4. Yoksa **TEK** soru: "Hangi feature/akis icin user story uretelim? (FR ID listesi veya kisa aciklama)"

## Adim 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Story sayisi** (varsayilan: her FR'a 1 story; cok buyukse epic + sub-stories) |
| 2 | **Story point sistemi** (Fibonacci 1/2/3/5/8/13/21 — varsayilan) |

## Adim 2 — Bilgi Tabani
- `references/user-story-rules.md` — Connextra + INVEST + Given-When-Then + epic split kurallari.

## Adim 3 — Uret

### Story Format (Connextra + tam yapi)

```markdown
## US-001: Kullanici giris

**As a** registered user,
**I want to** log in with my email and password,
**so that** I can access my personalized dashboard.

### INVEST Kontrolu
- ☑ Independent: Bagimsiz, baska story'siz teslim edilebilir
- ☑ Negotiable: Detay (sosyal login? remember me?) gorusulebilir
- ☑ Valuable: Kullanici icin direkt deger
- ☑ Estimable: Takim tahmin edebilir
- ☑ Small: 1 sprint icinde tamamlanabilir
- ☑ Testable: Acceptance criteria sayilabilir

### Acceptance Criteria (Given-When-Then)

**AC1 — Basarili giris**
- **Given** kullanici registered ve onaylanmis
- **When** dogru email + sifre ile login butonuna basar
- **Then** dashboard'a yonlendirilir (≤ 2s)
- **And** session JWT 24h gecerli olur

**AC2 — Yanlis sifre**
- **Given** kullanici registered
- **When** yanlis sifre girer
- **Then** "Email veya sifre hatali" mesaji gosterilir (kullanici varlığını ima etmez)
- **And** session olusmaz
- **And** 5 yanlis denemeden sonra 15 dk hesap kilidi

**AC3 — Onaylanmamis email**
- **Given** kullanici registered ama email onaylamamis
- **When** dogru bilgilerle login dener
- **Then** "Email adresinizi onaylayin" sayfasina yonlendirilir
- **And** "Onay maili tekrar gonder" butonu gosterilir

### Edge Cases
- Cok yavas internet (2s threshold ne olur?)
- CAPS LOCK ON ile sifre
- Browser cookie disabled
- Eszamanli login (eski session'i sonlandir mi?)

### Story Point: 5 (Fibonacci)
**Gerekce:** Auth flow standart, ama lockout + email onay confirmation + edge case'ler 5 hak ediyor.

### Bagimliliklar
- depends-on: US-000 (kayit + email confirm)
- blocks: US-002 (parola sifirla), US-003 (profil)

### Iliski
- FR-001, FR-002 (SRS)
- Persona 1 (Ayse — Primary)
```

### Bolum 2 — Epic Splitting (cok buyuk story icin)

Eger story > 13 puan tahmin edilirse: **EPIC** olarak isaretle, alt-story'lere bol.

```
EPIC: Kullanici Authentication
├── US-001: Email + Sifre giris (5)
├── US-002: Sifre sifirla (3)
├── US-003: Email onayla (2)
├── US-004: Sosyal login (Google) (5)
└── US-005: MFA setup (8)
```

### Bolum 3 — Story Map

User journey + her ekran/akista hangi story:

```
[Anasayfa] → [Kayit] → [Email Onay] → [Login] → [Dashboard]
              US-000    US-003          US-001    US-006
```

### Bolum 4 — Backlog Tablosu

| ID | Story | Persona | Tahmin | Oncelik | Status |
|----|-------|---------|--------|---------|--------|
| US-001 | Email+sifre giris | Ayse | 5 | Must | Ready |
| US-002 | Sifre sifirla | Ayse | 3 | Should | Ready |
| ... |

Oncelik: **MoSCoW** (Must / Should / Could / Won't this time).

### Bolum 5 — Definition of Ready (DoR)

Story sprint'e alinmadan once:
- [ ] INVEST 6'sı da tamam
- [ ] AC en az 2 tane (happy + sad path)
- [ ] Tahmin yapildi
- [ ] Bagimliliklar belirlendi
- [ ] Persona referansli
- [ ] UI mockup varsa eklendi

### Bolum 6 — Definition of Done (DoD)

Story tamamlandi sayilmasi icin:
- [ ] Tum AC pas
- [ ] Unit test yazildi (coverage gate gecti)
- [ ] Integration test pas
- [ ] Code review onayi
- [ ] Dokuman guncel
- [ ] Demo edilebilir

## Adim 4 — Self-Check
- [ ] Her story Connextra formatinda mi?
- [ ] INVEST 6 madde her storede ✓ mu?
- [ ] AC en az 2 tane (happy + sad) mi?
- [ ] Edge case listesi var mi?
- [ ] Story point Fibonacci'den mi (1/2/3/5/8/13/21)?
- [ ] Persona referansli mi?
- [ ] Backlog tablosunda MoSCoW oncelik var mi?
- [ ] DoR ve DoD var mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-requirements (Gereksinim)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `USER_STORIES_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Story sayisi + toplam story point.
3. Epic / Story dagilimi.
4. MoSCoW dagilimi.
5. Sonraki: `/feza-pm:wbs` (story → wbs link) veya `/feza-pm:estimate` (point → time).

## Sinirlar
- Max 3 soru.
- Connextra format'i atla — "as a / want / so that" zorunlu.
- AC'siz story yazma.
- 13 puanin uzerine tek story koyma — epic'le.
- Persona referansi yoksa "End User" jenerik kullan, "User" yazma.
