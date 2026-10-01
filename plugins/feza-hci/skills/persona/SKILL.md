---
name: persona
description: >
  User persona(lar) üretir. Cooper'ın goal-directed design yaklaşımı ve
  insan merkezli tasarım ilkeleriyle uyumlu: Goals, Pain Points, Behaviors,
  Tech Skills (cihaz/internet kullanım düzeyi), Scenarios, Quotes. Önce
  projedeki BRIEF/SCOPE/STAKEHOLDERS'ı okur. 1-3 persona üretir.
  Tetikleyici: "persona oluştur", "user persona", "kullanıcı persona",
  "/feza-hci:persona".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Persona

User persona(lar) üretir. Standart demografik alanlara ve insan merkezli tasarım (ISO 9241-210) ilkesine dayanır.

## Tetikleyici
- "/feza-hci:persona"
- "user persona / kullanıcı persona"
- "persona oluştur"

## Adım 0 — Bağlamı Topla
1. `BRIEF.md`/`SCOPE_*.md` — hedef kullanıcı bilgisi
2. `STAKEHOLDERS_*.md` — kullanıcı sınıfları
3. README'deki "Target Users / Hedef Kullanıcı" bölümleri
4. Hiç yoksa **TEK** soru: "Hedef kullanıcı kim? (1-2 cümle)"

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Persona sayısı** (1 / 2 / 3 — varsayılan: 2-3 farklı segment) |
| 2 | **Araştırma verisi var mı** (gerçek interview/survey verisi → kullan; yoksa "varsayım persona" etiketi) |

## Adım 2 — Bilgi Tabanı
- `references/persona-template.md` — şablon + örnek + iyi/kötü örnek karşılaştırması.
- `references/output-conventions.md`.

## Adım 3 — Üret

### Persona Şablonu (her biri)

```markdown
## Persona <N>: <İsim, Yaş>

**Bir cümle özet:** "<Rol> + <ana motivasyon> + <ana zorluk>"

### Demografi (standart alanlar)
- Yaş:
- Cinsiyet (relevant ise):
- Eğitim seviyesi:
- Meslek / rol:
- Lokasyon:
- Teknoloji kullanım düzeyi: ☐ Başlangıç ☐ Orta ☐ İleri
- İnternet kullanım düzeyi: ☐ Başlangıç ☐ Orta ☐ İleri
- Benzer ürünlere aşinalık:

### Hedefler (Goals)
1. <Birincil hedef>
2. <İkincil>
3. <Uzun vade>

### Pain Points
1. <Mevcut çözümlerin onu zorladığı şey>
2. <Sıkça karşılaştığı engel>

### Davranışlar (Behaviors)
- <Tipik kullanım örüntüsü>
- <Tercih ettiği kanal/cihaz>
- <Karar verme tarzı>

### Senaryo (Scenario)
<2-4 cümle: bu persona ürünü nasıl bir bağlamda ilk kez kullanır?>

### Direkt Alıntı (Quote)
> "<Personayı tek cümlede özetleyen, içgörü içeren ifade>"

### Ürün İçin Özel Düşünmemiz Gereken
- <Bu persona için özel UI/akış kararı>
- <Hangi feature öncelik / hangi feature gereksiz>
```

### Kalite Kriterleri

- Her persona **somut isim + yaş** ile (Anonim "Kullanıcı 1" değil)
- Pain points ürün-spesifik (genel "zaman yok" değil)
- Quote tek cümle, çarpıcı
- Senaryo gerçek bir günden parça
- Demografi ürünle ilgili standart alanlara bağlı

### Persona Sayısı

- 1 persona = yetersiz (kullanıcı çeşitliliği görünmez)
- 2-3 persona = ideal (primary + secondary + edge)
- 4+ persona = dilution (her birine yeterli odak kalmaz)

→ Varsayılan: **3 persona** (Primary / Secondary / Anti-persona).

### Anti-persona

3. persona genelde **kimin için DEĞİL** olduğunu belirtir. Örn: "Bu uygulama 65+ yaş kullanıcılar için tasarlanmamıştır çünkü …"

### Veri Etiketleme

- Gerçek araştırmaya dayalı persona → "**Validated Persona** (n=12 mülakat, 2026-Q1)"
- Brief/varsayıma dayalı → "**Provisional Persona** (varsayım, doğrulanması önerilir)"

Her personanın başına bu etiket koy.

## Adım 4 — Self-Check
- [ ] Her persona somut isim + yaş ile mi?
- [ ] Demografi standart alanlarla eksiksiz mi?
- [ ] Quote her birinde var mı?
- [ ] En az 2 persona var mı?
- [ ] Anti-persona var mı (3 persona varsa)?
- [ ] Validation etiketi var mı?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-hci (HCI)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `PERSONAS_<proje>.md`

## Adım 6 — Rapor (max 5 satır)
1. Dosya yolu.
2. Persona sayısı + tipi (Primary/Secondary/Anti).
3. Validation durumu (Validated / Provisional).
4. Sonraki: `/feza-hci:design-thinking` (persona Define aşamasının çıktısıdır), `/feza-hci:hci-review` ya da bu personalar için arayüzü tasarlayıp kodlamak üzere `/feza-hci:hci-execute`.
5. Boşluk.

## Sınırlar
- Max 3 soru.
- 4'ten çok persona üretme.
- Stereotip / klişe yapma — kanıt olmadan kişilik atfetme.
- "Sevdiği renk mavi" gibi alakasız demografi atma — ürünle ilgili olanı yaz.
- Provisional persona için "Validated" etiketi YASAK.
