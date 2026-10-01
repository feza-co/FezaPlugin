---
name: conflict-resolve
description: >
  Verilen conflict senaryosu için tip tespiti + uygun çözüm stratejisi önerir.
  Thomas-Kilmann (1974) ve PMBOK Resolve Conflict yaklaşımına uygun 5 strateji: Avoiding,
  Smoothing, Compromising, Forcing, Collaborating. Argüman olarak senaryo bekler;
  yoksa kullanıcıdan tek soruyla alır. Diğer skill'lerden farklı: opsiyonel olarak
  CONFLICT_LOG.md'ye ekleme yapabilir, ama temel çıktı sohbette yorum.
  Tetikleyici: "conflict resolution", "çatışma çözümü", "/feza-pm:conflict-resolve",
  "anlaşmazlık".
allowed-tools: Read, Write, Glob, AskUserQuestion
---

# Conflict Resolve

## Tetikleyici
- "/feza-pm:conflict-resolve <senaryo>"
- "çatışma çözümü / conflict resolution"

## Adım 0 — Senaryoyu Topla

1. Komut argümanında senaryo varsa kullan.
2. Yoksa **TEK** `AskUserQuestion`:
   - **Soru:** "Çatışma senaryosunu kısa anlat: kim, ne, ne zaman, neden?"
   - **Header:** "Çatışma senaryosu"
   - Tek seçenek: "Şimdi yazacağım" + Other.

## Adım 1 — Gri Nokta (max 1)

| # | Gri nokta |
|---|-----------|
| 1 | **Çatışmanın aciliyeti** (acil karar şart mı, yoksa zaman var mı?) |

Diğer detay yoksa varsayım yap, etiketle.

## Adım 2 — Bilgi Tabanı
- `references/conflict-strategies.md` — 5 strateji + kazanç matrisi.

## Adım 3 — Üret

### Çıktı bölümleri

1. **Senaryonun yeniden yapılanması** (kullanıcının ifadesini berraklaştırma)
2. **Çatışma kaynağı tespiti** — yaygın sebep listesinden eşleştir:
   - High stress, ambiguous roles, multiple managers, unrealistic deadlines, poor planning, ambiguous priorities, communication, ego
3. **Önerilen strateji** — 1 ana + 1 alternatif:
   - **Avoiding (0-0)** — geri çekil, geçici/önemsiz
   - **Smoothing (0.5-0.5)** — uyum, ilişkiyi korumak öncelikli
   - **Compromising (0.5-0.5)** — orta yol, kimse tam tatmin değil
   - **Forcing (1-0)** — gücünü kullan, acil ve kritik
   - **Collaborating (0.9-0.9)** — kazan-kazan, en iyi ama zaman ister
4. **Uygulama adımları** (3-5 madde, tek cümle)
5. **Risk** — bu strateji yanlış uygulanırsa ne olur (kötü yönetilen çatışmanın sonuçları)

## Adım 4 — Self-Check
- [ ] Strateji önerisi gerekçeli mi (neden bu, neden diğeri değil)?
- [ ] "Yeni çatışmalar / düşük verim / toxic environment" risklerine uyarı var mı?
- [ ] Tek strateji önerme: 1 ana + 1 alternatif.

## Adım 5 — Çıktı

- **Sohbette** detaylı analiz (5 bölüm).
- **Opsiyonel** — kullanıcı isterse `CONFLICT_LOG.md` dosyasına ekleme yap (varsa append, yoksa create).

## Adım 6 — Rapor
1. Önerilen strateji.
2. Beklenen sonuç.
3. Tetiklenirse alternatif.
4. (varsa) log dosyasına yazıldı bilgisi.

## Sınırlar
- Max 2 soru.
- 5 stratejiden hepsini önerme; spesifik 1+1 öner.
- Tarafların lehine taraf tutma; objektif.
- Ad geçirilmişse koruma — anonim ifade.
