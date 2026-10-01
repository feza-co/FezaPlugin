---
name: prototype-plan
description: >
  Prototip stratejisi planı üretir. Endüstride yerleşik UI tasarım ve
  prototipleme pratiğine dayalı: Sketch → Wireframe → Mockup → Prototype
  sıralaması, low-fi vs hi-fi seçimi, ne zaman ne için, hangi araçla. Önce
  projedeki mevcut tasarımı (varsa) tarar, yoksa BRIEF/SCOPE'tan ihtiyacı
  çıkarır. Constantine & Lockwood notunu hatırlatır: "prototip ürün değildir".
  Tetikleyici: "prototype plan", "prototip planı", "wireframe", "mockup",
  "/feza-hci:prototype-plan".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Prototype Plan

Yerleşik UX pratiğine göre prototip stratejisi.

## Tetikleyici
- "/feza-hci:prototype-plan"
- "prototype / prototip planı"
- "wireframe / mockup planı"

## Adım 0 — Bağlamı Topla
1. `BRIEF.md`/`SCOPE_*.md` — neyi prototipliyoruz
2. `PERSONAS_*.md` — kullanıcı profili
3. `DESIGN_THINKING_*.md` (varsa) — hangi aşamadayız
4. Mevcut tasarım dosyaları: `*.fig`, `design/`, `mockups/`
5. Hiç yoksa **TEK** soru: "Neyi prototipliyoruz? (ekran/akış/tüm uygulama)"

## Adım 1 — Gri Nokta (max 3)

| # | Gri nokta |
|---|-----------|
| 1 | **Hedef kitle** (ekip içi gözden geçirme / sponsor demosu / kullanıcı testi) |
| 2 | **Süre kısıtı** (5 iş günü / 1 sprint / 1 ay) |
| 3 | **Mevcut araçlar** (Figma / Penpot / Balsamiq / kağıt) |

## Adım 2 — Bilgi Tabanı
- `references/prototype-fidelity.md` — fidelity ladder + araç eşlemesi + ne zaman hangi seviye.
- `references/output-conventions.md`.

## Adım 3 — Üret

### Bölüm 1 — Prototip Hedefi (neden prototip?)

| Hedef | Açıklama |
|-------|----------|
| Belirsizlik azaltma | Risk yönetimi aracı |
| Teknik fizibilite | Run-time issue test |
| Gereksinim yakalama | Kullanıcı "görür", reaksiyon verir |
| Usability sınama | Bizim odağımız |

→ Bu projede hangi hedefler öncelikli, sırala.

### Bölüm 2 — Fidelity Ladder

Yaygın kabul gören sıralama:

```
Sketch → Wireframe → Mockup → Prototype
(low-fi)                    (hi-fi)
```

Her seviyenin: **ne zaman + ne için + araç + süre**.

| Seviye | Ne zaman | Ne için | Araç | Süre |
|--------|----------|---------|------|------|
| Sketch | Kavramsallaştırma, ilk vizualizasyon | Hızlı fikir paylaşımı | Kağıt, dijital pen | 30 dk - 2 saat |
| Storyboard | Akış, senaryo | Kullanıcı yolculuğu | Comic strip, Storyboardthat | 2-4 saat |
| Wireframe | Yapı belirleme | Layout iskelet (color/font yok) | Balsamiq, Figma wireframe kit | 1-2 gün |
| Mockup | Görsel netleşme | Renk, tipografi, içerik | Figma, Penpot | 2-5 gün |
| Hi-fi Prototype | Etkileşim doğrulama | Click flow, animation | Figma prototype, Framer | 5-10 iş günü |
| Code prototype | Teknik fizibilite | Run-time, performance | Hedef teknoloji (React vb.) | 10+ iş günü |

### Bölüm 3 — Önerilen Yol Haritası

Bu projede hangi seviyelerden geçilecek + neden.

| # | Seviye | Süre | Çıktı | Sonraki adım |
|---|--------|------|-------|--------------|
| 1 | Sketch | 1 gün | 5-7 kağıt eskiz | İç gözden geçirme |
| 2 | Wireframe | 2 gün | 8-10 ekran iskeleti | Sponsor demo |
| 3 | Hi-fi Prototype | 5 iş günü | Clickable Figma | Kullanıcı testi (`/feza-hci:usability-eval-plan`) |

### Bölüm 4 — Düşük Maliyetli Araçlar

- **Index cards (3×5 inch)** — her kart bir ekran
- **Post-it'ler** — renk kodlu, gruplanır, duvara yapıştırılır
- **Whiteboard + ip/iplik** — ekran bağlantıları

→ Sponsor toplantısı öncesi 1 saatlik post-it session öner.

### Bölüm 5 — Constantine & Lockwood Uyarısı

Çıktıda mutlaka bir yerde:

> "Prototip = öğrenme aracı, ürün değil. Constantine & Lockwood: 'Software is the only engineering field that throws together prototypes and then attempts to sell them as delivered goods.' Bu projede prototip seviyesi → kod transition'ı net olarak ayrı planlanmalı."

### Bölüm 6 — Test Planı (kısa)

Her seviye sonunda nasıl test edilir:
- Sketch sonrası → ekip içi 30 dk review
- Wireframe sonrası → 2-3 kullanıcıyla informal feedback
- Hi-fi sonrası → tam usability test (`/feza-hci:usability-eval-plan`)

## Adım 4 — Self-Check
- [ ] Fidelity ladder tüm seviyeleri var mı?
- [ ] Yol haritası süre ile sıralı mı?
- [ ] Constantine & Lockwood notu var mı?
- [ ] Düşük maliyetli araç alternatifi belirtildi mi?
- [ ] Her seviye için test yöntemi var mı?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-hci (HCI)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `PROTOTYPE_PLAN_<proje>.md`

## Adım 6 — Rapor
1. Dosya yolu.
2. Önerilen toplam süre + seviye sayısı.
3. Hedef kitle.
4. Sonraki: kod prototipi ya da çalışan arayüz için `/feza-hci:hci-execute`; test fazına geçince `/feza-hci:usability-eval-plan`.
5. Boşluk.

## Sınırlar
- Max 4 soru.
- Tek seviyeyle yetinme — en az 3 seviye öner.
- Hi-fi'ye direkt zıplamayı önerme — low-fi'den geç.
- Kullanıcı zaten Figma kullanıyorsa Balsamiq önerme — mevcut araç önemli.
