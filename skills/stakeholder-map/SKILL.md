---
name: stakeholder-map
description: >
  Stakeholder analizi + Power/Interest grid üretir. PMBOK Stakeholder Management
  ve Communications Management uyumlu. Paydaşları SRS'in kullanıcı sınıfları,
  paydaş tanımları, dış sistemleri ve uyumluluk muhataplarından çıkarır; SCOPE_*.md
  varsa Stakeholder Snapshot'ı ekler. Referans alınacak bir SRS (SRS_*.md) zorunludur; yoksa çalışmaz ve /feza-requirements:srs-generate'e yönlendirir.
  Tetikleyici: "stakeholder map", "paydaş analizi", "power interest grid",
  "/feza-pm:stakeholder-map".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Stakeholder Map

## Tetikleyici

- "/feza-pm:stakeholder-map"
- "stakeholder analizi / paydaş analizi"
- "power interest grid"

## Adım 0 — SRS Kapısı ve Bağlam

1. **SRS kapısı (zorunlu):** `references/srs-gate.md` kurallarını uygula. Geçerli SRS yoksa DUR: dosya üretme, brief isteme, proje dizinini (README, kod, manifest, git) okuma; kullanıcıyı `/feza-requirements:srs-generate`'e yönlendir.
2. SRS: kullanıcı sınıfları, paydaşlar, dış sistemler/arayüzler, uyumluluk ve düzenleyici muhataplar.
3. `SCOPE_*.md` Stakeholder Snapshot.
4. SRS'te paydaş bilgisi yetersizse **TEK** `AskUserQuestion`: "Proje paydaşlarını listele (sponsor, ekip, dış paydaş)."

## Adım 1 — Gri Nokta Tespiti

EN FAZLA 2 SORU:

| # | Gri nokta |
|---|-----------|
| 1 | **Sponsor / karar vericisi** kim? |
| 2 | **Düzenleyici / regülatör** dahil mi (KVKK, BDDK, kurum içi BT güvenliği vb.)? |

## Adım 2 — Üret

### Stakeholder Listesi

| ID | İsim/Rol | Tip (İç/Dış) | Beklentisi | Etkisi (Power) | İlgisi (Interest) |
|----|----------|--------------|------------|----------------|-------------------|
| S1 | Sponsor (Ürün Sahibi) | Dış | Ürün hedefleri, kalite | 5 | 4 |
| S2 | PM | İç | Zamanında teslim | 4 | 5 |
| ... |

### Power/Interest Grid (4 kadran tablo)

|              | Düşük İlgi (1-3) | Yüksek İlgi (4-5) |
|--------------|------------------|--------------------|
| **Yüksek Etki (4-5)** | **Keep Satisfied** (S?, S?) | **Manage Closely** (S1, S2) |
| **Düşük Etki (1-3)** | **Monitor** (S?) | **Keep Informed** (S?) |

### İletişim Sıklığı Önerisi

| Kadran | Sıklık | Kanal |
|--------|--------|-------|
| Manage Closely | Sprint içinde birden çok | 1-1, sprint demo |
| Keep Satisfied | 15 günde bir | Statü raporu |
| Keep Informed | Aylık | Newsletter / email |
| Monitor | Quarterly | Open dashboard |

## Adım 3 — Self-Check
- [ ] En az 5 stakeholder var mı?
- [ ] Her biri 4 kadrandan birine yerleştirildi mi?
- [ ] Sponsor "Manage Closely" kadranında mı?
- [ ] Beklentiler somut mu (tek cümle)?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 4 — Yaz
- Dosya: `STAKEHOLDERS_<proje>.md`

## Adım 5 — Rapor
1. Dosya yolu. 2. Toplam paydaş + kadran dağılımı. 3. Input. 4. Boşluk. 5. Sonraki: `/feza-pm:comm-plan`.

## Sınırlar
- Max 3 soru. Diyagram yok. Gerçek isim varsa kullan; yoksa rol etiketi ("Sponsor", "Lead Dev").
