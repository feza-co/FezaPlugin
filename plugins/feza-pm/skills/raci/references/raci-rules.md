# RACI Kuralları (PMBOK — Plan Resource Management)

## Temel Tanımlar

| Harf | Açıklama | Sayı kuralı |
|------|----------|-------------|
| **R — Responsible** | İşi fiilen yapan | Satır başına ≥ 1 |
| **A — Accountable** | Hesap veren tek kişi (karar otoritesi) | Satır başına **TAM 1** |
| **C — Consulted** | Karar/yapım öncesi danışılan (iki yönlü) | Satır başına ≤ 3 |
| **I — Informed** | Sonuç sonrası bilgilendirilen (tek yönlü) | Satır başına ≤ 4 |

Bir kişi A ve R aynı anda olabilir → **A/R**.

## Tipik Roller (Yazılım Projesi)

- **Sponsor / Project Owner** — finansman/karar otoritesi (genelde A'lar burada toplanır kritik kararlarda)
- **Project Manager** — planlama, takip, raporlama
- **Tech Lead / Lead Developer** — teknik tasarım, mimari kararlar
- **Frontend Developer** — UI/UX implementasyon
- **Backend Developer** — API, veritabanı, business logic
- **DevOps / SRE** — CI/CD, deployment, monitoring
- **QA / Test Engineer** — test plan, test execution
- **UX/UI Designer** — wireframe, prototip, design system
- **Product Owner** — feature priorization (Agile)
- **External Stakeholder / Customer** — kabul, geri bildirim

## Yaygın Hatalar

1. **Birden fazla A** → karar otoritesi bulanıklaşır.
2. **Sıfır R** → işin sahibi yok.
3. **Herkes C** → toplantı yorgunluğu, hızlı karar imkânsız.
4. **A bir grup** ("Tüm takım") → sorumluluk dağılır → kimse sorumlu değil.
5. **Sponsor her satırda A** → mikroyönetim, A devredilmeli.
6. **C/I farkı atlanır** → C iki yönlü diyalog, I tek yönlü bildirim. Karıştırılmaz.

## Yoğunluk Özeti Tablosu

Her sütun için:
- Toplam R sayısı
- Toplam A sayısı
- Toplam C sayısı
- Toplam I sayısı

Beklenen pattern:
- A yoğunluğu: 1-2 kişide toplanmış olmalı (PM ve Sponsor).
- R yoğunluğu: dengeli dağılmalı (her geliştiriciye yakın sayı).
- C yoğunluğu: Lead/uzman rollerde yüksek normal.
- I yoğunluğu: Sponsor ve external stakeholder'da yüksek normal.

## Örnek (SaaS projesi mini-WBS)

| WBS | Aktivite | Sponsor | PM | Tech Lead | FE Dev | BE Dev | QA | UX |
|-----|----------|---------|----|-----------|--------|--------|----|----|
| 1.1 | Mimari karar | C | I | A/R | C | C | I | – |
| 1.2 | Login UI | I | A | C | R | I | C | C |
| 1.3 | Login API | I | A | C | I | R | C | – |
| 2.1 | Sprint planning | I | A/R | C | C | C | C | C |
| 3.1 | Production deploy | A | R | C | I | I | C | – |
| 3.2 | UAT | A | R | I | I | I | C | C |

Yoğunluk Özeti:
- Sponsor: 2A, 0R, 1C, 3I → tipik
- PM: 4A, 2R, 0C, 1I → planlama yoğun
- Tech Lead: 1A, 1R, 4C → teknik danışman pozisyonu
- FE Dev: 0A, 1R, 1C, 4I → tipik geliştirici dağılımı
