---
name: comm-plan
description: >
  Communication Plan matrisi üretir. PMBOK Communications Management yaklaşımıyla
  (PMI: proje yöneticileri zamanlarının büyük bölümünü iletişime ayırır). Önce STAKEHOLDERS_*.md varsa
  kullanır, yoksa zihinden minimum çıkarır. CI/CD ipuçlarından (.github/workflows,
  webhook config) mevcut iletişim kanallarını tespit eder.
  Tetikleyici: "communication plan", "iletişim planı", "/feza-pm:comm-plan",
  "stakeholder communication".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Communication Plan

## Tetikleyici
- "/feza-pm:comm-plan"
- "iletişim planı / communication plan"

## Adım 0 — Bağlamı Topla
1. **`STAKEHOLDERS_*.md`** öncelikli (zorunluya yakın).
2. `BRIEF.md`/`README.md`.
3. `.github/workflows/*` (Slack/Teams webhook varsa kanal ipucu).
4. Yoksa **TEK** `AskUserQuestion`: "Önce `/feza-pm:stakeholder-map` çalıştırmamı mı istersin?"

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Mevcut araçlar** (Slack/Teams/Discord/Email) |
| 2 | **Toplantı kadansı** (standup sıklığı? sprint ritmi?) |

## Adım 2 — Üret

### Communication Matrix

| Kim (Stakeholder) | Ne (İçerik) | Ne sıklıkta | Hangi kanalla | Hangi formatta | Sorumlu |
|-------------------|-------------|-------------|---------------|----------------|---------|
| Sponsor | Statü raporu | 15 günde bir | Email | 1 sayfa özet (e-posta ekinde) | PM |
| Tüm takım | Standup | Günlük | Slack #standup | Bullet text | PM |
| Müşteri/Ürün Sahibi | Demo | Sprint sonu | Zoom | Canlı sunum + demo deck | Lead Dev |
| External | Newsletter | Aylık | Email | HTML | Marketing/PM |

### İletişim Türleri (PMBOK)

- **Push communication** — gönderici kaynaklı (email, raporlar)
- **Pull communication** — alıcı çekiyor (intranet, wiki)
- **Interactive communication** — çift yönlü (toplantı, telefon)

### Conflict Anticipation

Yaygın çatışma kaynakları: stres, belirsiz roller, multiple managers, gerçekçi olmayan deadline, zayıf planlama, belirsiz öncelikler, iletişim eksikliği, ego.
- Comm Plan bu sebeplerden hangilerini önlüyor? Plan sonunda kısa not.

### Stephen Covey notu (The 7 Habits of Highly Effective People, 1989)

"Önce anlamayı seç, sonra anlaşılmayı." → 1-1 toplantılar için "active listening" notu ekle.

## Adım 3 — Self-Check
- [ ] Her stakeholder en az 1 satırda var mı?
- [ ] Manage Closely kadranındakiler sprint içinde en az bir teması var mı?
- [ ] Format somut mu (demo deck? özet doküman? bullet?)?
- [ ] Push/Pull/Interactive dengesi var mı?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 4 — Yaz
- Dosya: `COMM_PLAN_<proje>.md`

## Adım 5 — Rapor
1. Dosya yolu. 2. Kaç satır × kaç stakeholder. 3. Input. 4. Boşluk. 5. Sonraki: `/feza-pm:raci` veya `/feza-pm:risk-register`.

## Sınırlar
- Max 3 soru. Diyagram yok. Email adresi/Slack handle uydurma.
