---
name: scope-statement
description: >
  Proje için Scope Statement üretir. PMBOK Guide kapsam yönetimi yaklaşımına
  uygun: amaç, hedefler, ürün tanımı, başarı kriterleri, In Scope / Out of Scope
  tabloları, varsayımlar ve Project Constraints (Time/Cost/Quality/Scope dörtlüsü).
  Kapsamı projenin SRS'inden türetir. Referans alınacak bir SRS (SRS_*.md) zorunludur; yoksa çalışmaz ve /feza-requirements:srs-generate'e yönlendirir. Kritik gri
  noktaları (max 3) sorar.
  Tetikleyici: "scope statement", "kapsam belirle", "scope çıkar", "proje kapsamı",
  "define scope", "in/out of scope", "/feza-pm:scope-statement".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Scope Statement

PMBOK kapsam yönetimi yaklaşımına göre projenin kapsam beyanını üretir. Sonraki tüm PM skill'lerinin (WBS, Estimate, Risk, vs.) zeminini atar.

## Tetikleyici

- "/feza-pm:scope-statement"
- "kapsam belirle / çıkar"
- "scope statement / project scope hazırla"
- "in scope / out of scope listesi"

## Adım 0 — SRS Kapısı ve Bağlam

1. **SRS kapısı (zorunlu):** `references/srs-gate.md` kurallarını uygula. Geçerli SRS yoksa DUR: dosya üretme, brief isteme, proje dizinini (README, kod, manifest, git) okuma; kullanıcıyı `/feza-requirements:srs-generate`'e yönlendir.
2. SRS'ten çıkar: proje adı, amaç (Introduction/Purpose), ürün tanımı (Product Overview), kullanıcı sınıfları, fonksiyonel gereksinimler (In Scope adayları), kısıtlar ve varsayımlar.
3. SRS'te açıkça kapsam dışı bırakılan maddeler Out of Scope adaylarıdır.

## Adım 1 — Gri Nokta Tespiti

SRS'ten ARA, eksikse **EN FAZLA 3 SORU** ile tek `AskUserQuestion`:

| # | Gri nokta | Neden kritik |
|---|-----------|--------------|
| 1 | **Birincil hedef** (ne sorunu çözüyor / kim için) | Goals bölümü için |
| 2 | **Bitiş tarihi / dönem** (çeyrek sonu? sürüm tarihi? sprint? açık uçlu?) | Time constraint için |
| 3 | **Out of Scope sınırı** (kesinlikle YAPMAYACAĞIN şey ne?) | Scope creep önlemi |

SRS'te varsa SORMA. Az önemli boşluklar için "TBD — açık" yaz veya akıllı varsayım yap.

## Adım 2 — Bilgi Tabanı

Şu referans dosyalarını oku:
- `references/scope-template.md` — başlık iskeleti ve örnekler.
- `references/output-conventions.md` — dosya adı, dil, ton.

## Adım 3 — Üret

`references/scope-template.md` iskeletini eksiksiz doldur:

1. **Project Definition** (Bir cümlede ne, kim için, neden)
2. **Goals** (3-5 ölçülebilir hedef)
3. **Product Description** (1-2 paragraf)
4. **Success Criteria** (kabul kriterleri, metrik bazlı)
5. **In Scope** (tablo: Item, Açıklama)
6. **Out of Scope** (tablo: Item, Neden hariç)
7. **Assumptions** (numaralı liste)
8. **Constraints** — PMBOK dörtlü kısıt çerçevesi:
   - **Time** (fast)
   - **Cost** (cheap)
   - **Quality** (good)
   - **Scope** (complete)
   - Üçgenden hangisi feda ediliyor? (klasik triple constraint)
9. **Stakeholder Snapshot** (kısa: ana 3-5 stakeholder, detaylı liste için `/feza-pm:stakeholder-map`)
10. **Bilinen Boşluklar**

## Adım 4 — Self-Check

- [ ] In Scope ve Out of Scope birbiriyle çelişmiyor mu?
- [ ] Goals ölçülebilir mi (sayı/tarih/yüzde)?
- [ ] Constraints'te triple constraint dengesi açıklanmış mı?
- [ ] "Project" tanımı PMBOK proje tanımı kriterlerine uygun mu? (temporary, unique product/service, definite start/end)

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Dosyaya Yaz

- Dosya: `SCOPE_<proje>.md`
- Konum: cwd

## Adım 6 — Kullanıcıya Rapor (max 5 satır)

1. Dosya yolu.
2. Tek cümle: kaç hedef, kaç in/out scope item.
3. Kullanılan input (SRS dosya adı + sürüm).
4. Bilinen boşluk sayısı.
5. Sonraki adım: "Sırada `/feza-pm:wbs` çalıştırılabilir — bu scope'u WBS'e çevirir."

## Sınırlar

- Max 3 soru toplam (yalnızca gri noktalar); SRS'te cevabı olanı sorma.
- Goals'da "hızlı / kolay / kullanıcı dostu" gibi ölçülemez sözcük yok.
- Scope dışı item'ları gerekçesiz bırakma (her satırda "Neden hariç").
