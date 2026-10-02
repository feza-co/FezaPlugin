---
name: persona
description: >
  User persona(lar) üretir. Cooper'ın goal-directed design yaklaşımı ve
  insan merkezli tasarım ilkeleriyle uyumlu: Goals, Pain Points, Behaviors,
  Tech Skills (cihaz/internet kullanım düzeyi), Scenarios, Quotes. Veri dayanağı
  etiketi (proto | niteliksel | istatistiksel) zorunlu; veri yoksa açıkça
  "varsayım" etiketli proto-persona modu ve doğrulama planı. Her personaya JTBD
  cümlesi + işlevsel/duygusal başarı kriterleri. Kapsayıcı tasarım kontrolü.
  Önce projedeki BRIEF/SCOPE/STAKEHOLDERS'ı okur. 1-3 persona üretir.
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
| 2 | **Veri dayanağı** (gerçek interview/survey/telemetri var mı → etiket; yoksa proto-persona modu) |

## Adım 2 — Bilgi Tabanı
- `references/persona-template.md` — şablon + örnek + iyi/kötü örnek karşılaştırması + JTBD ve kapsayıcılık kuralları.
- `references/output-conventions.md`.

## Adım 3 — Üret

### Persona Şablonu (her biri)

```markdown
## Persona <N>: <İsim, Yaş>

**Veri dayanağı:** proto | niteliksel | istatistiksel (n=<X>, <tarih>, <yöntem>)
**Bir cümle özet:** "<Rol> + <ana motivasyon> + <ana zorluk>"

### JTBD
> "<durum> olduğunda, <motivasyon/eylem> istiyorum, böylece <beklenen sonuç>."

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

### Başarı Kriterleri
- **İşlevsel:** <ölçülebilir, ürün davranışına bağlı>
- **Duygusal:** <gözlenebilir; ölçüsüz "mutlu olsun" değil>

### Senaryo (Scenario)
<2-4 cümle: bu persona ürünü nasıl bir bağlamda ilk kez kullanır?>

### Direkt Alıntı (Quote)
> "<Personayı tek cümlede özetleyen, içgörü içeren ifade>"

### Ürün İçin Özel Düşünmemiz Gereken
- <Bu persona için özel UI/akış kararı>
- <Hangi feature öncelik / hangi feature gereksiz>

### Kapsayıcılık Notu
- <Kimlik/isim alanı kalıbı dayatılmadı mı? Çeşitlilik ürünle gerekçeli mi? Yardımcı teknoloji ihtiyacı>
```

### Kalite Kriterleri

- Her persona **somut isim + yaş** ile (Anonim "Kullanıcı 1" değil); isim tek bir normatif kalıba
  zorlanmaz (bkz. Kapsayıcı Tasarım Kontrolü)
- Her personada veri dayanağı etiketi + JTBD cümlesi + işlevsel/duygusal başarı kriteri zorunlu
- Pain points ürün-spesifik (genel "zaman yok" değil)
- Quote tek cümle, çarpıcı
- Senaryo gerçek bir günden parça
- Demografi ürünle ilgili standart alanlara bağlı; gerekçesiz demografi yasak

### Persona Sayısı

- 1 persona = yetersiz (kullanıcı çeşitliliği görünmez)
- 2-3 persona = ideal (primary + secondary + edge)
- 4+ persona = dilution (her birine yeterli odak kalmaz)

→ Varsayılan: **3 persona** (Primary / Secondary / Anti-persona).

### Anti-persona

3. persona genelde **kimin için DEĞİL** olduğunu belirtir. Örn: "Bu uygulama 65+ yaş kullanıcılar için tasarlanmamıştır çünkü …"

### Veri Etiketleme (zorunlu)

Her personanın **başında** veri dayanağı etiketi bulunur. Etiketsiz persona yazılmaz.

| Etiket | Anlam | Ne zaman |
|--------|-------|----------|
| `proto` | Varsayıma dayalı; birincil veri yok | Brief/sektör bilgisinden çıkarım; gövde açıkça "**Varsayım:**" ile işaretlenir ve doğrulama planı eklenir |
| `niteliksel` | Mülakat/gözlem gibi nitel veriye dayalı | n ≥ 5 mülakat ya da eşdeğer nitel oturum |
| `istatistiksel` | Temsili anket/telemetri gibi nicel veriye dayalı | n ≥ 30 anket ya da temsili kullanım verisi |

- Etiket satırı: `Veri dayanağı: proto | niteliksel | istatistiksel (n=X, tarih, yöntem)`.
- `proto` etiketli persona **asla** "Validated" sayılmaz; raporda "doğrulanması önerilir" yazılır.

### Proto-persona Modu (veri yoksa)

Birincil veri yokken üretim durmaz; ama şeffaflık zorunludur:
- Persona başlığında ve özetinde `proto` etiketi + "**Varsayım**" ibaresi.
- Doğrulama planı zorunlu (en az 3 madde): hangi sorular sorulacak, kaç katılımcı (niteliksel için
  Nielsen & Landauer 1993 ile 5), hangi segmentten, hangi veri `niteliksel`/`istatistiksel` etiketine
  geçirir.
- Varsayım ile gözlem karıştırılmaz; varsayım cümleleri "Varsayım:" ön ekiyle yazılır (kanıt yoksa
  kesin ifade kullanılmaz).

### JTBD Cümlesi (her persona için zorunlu)

Kalıp: **"…olduğunda, … istiyorum, böylece …"**
- `<durum/bağlam> olduğunda, <motivasyon/eylem> istiyorum, böylece <beklenen sonuç>.`
- Örnek: "Müşteri iş tesliminden hemen sonra fatura istediğinde, tek ekrandan tutarı girip
  göndermek istiyorum, böylece akşam işi büyümeden bitirebileyim."
- JTBD cümlesi persona özetinden farklıdır: özet kim/niçin, JTBD bağlam/eylem/sonuç verir.

### Başarı Kriterleri (her persona için zorunlu)

| Tür | Yazım kuralı | Örnek |
|-----|--------------|-------|
| İşlevsel | Ölçülebilir, ürün davranışına bağlı | "İlk fatura < 3 dakikada oluşturulabilmeli" |
| Duygusal | Gözlenebilir ifade/davranış; "mutlu olsun" gibi ölçüsüz ifade yasak | "Hata yaptığında kaybolmadan düzeltebileceğine güvenmeli" |

### Kapsayıcı Tasarım Kontrolü (zorunlu)

- **İsim/kimlik alanları zorunlu kalıba sokulmaz:** isim, cinsiyet, yaş, engellilik durumu
  varsayılan tek bir normdan türetilmez; persona tam adı yalnız kapsayıcı çeşitliliği **bilinçli** ve
  kanıtlıysa konur. İsim alanı boş bırakılması gerekiyorsa "Ad (temsili)" yazılır.
  - Tek bir normatif isim/kimlik kalıbı dayatılmaz: farklı köken/alfabe/kısaltma ve unvanlar kabul edilir
    (ör. yalnız "Ayşe Yılmaz" değil; tekrar eden tek tip isim kalıbından kaçınılır).
- **Çeşitlilik:** cinsiyet, yaş, engellilik ve teknoloji erişimi personanın ürünle ilgili olduğu ölçüde
  çeşitlendirilir; tek segmenti tek kimliğe indirgemek yasaktır.
- **Kalıp yargı kontrolü:** meslek-cinsiyet, yaş-teknoloji, engellilik-yetkinsizlik gibi kalıplar
  yasak. Her özellik ürün davranışıyla gerekçelendirilir; gerekçesiz demografi (ör. hobi, renk)
  yazılmaz.
- **Erişilebilirlik:** engellilik yalnız "engel/olumsuzluk" olarak değil, yardımcı teknoloji kullanımı
  ve kapsayıcı ihtiyaç olarak yazılır; gerekiyorsa ayrı bir erişilebilirlik person/resegment notu.

## Adım 4 — Self-Check
- [ ] Her personada veri dayanağı etiketi (`proto | niteliksel | istatistiksel`) ve n/tarih/yöntem var mı?
- [ ] Veri yoksa `proto` etiketi + "Varsayım" ibaresi + doğrulama planı (≥ 3 madde) var mı?
- [ ] Her personada JTBD cümlesi ("…olduğunda, … istiyorum, böylece …") var mı?
- [ ] Her personada işlevsel ve duygusal başarı kriteri ayrı ayrı var mı (duygusal olan ölçüsüz değil mi)?
- [ ] Her persona somut isim + yaş ile mi (anonim "Kullanıcı 1" değil)?
- [ ] Kapsayıcı tasarım kontrolü uygulandı mı (kimlik kalıbı dayatılmadı, çeşitlilik ürünle gerekçeli, kalıp yargı yok)?
- [ ] Demografi standart alanlarla eksiksiz mi?
- [ ] Quote her birinde var mı?
- [ ] En az 2 persona var mı; Anti-persona var mı (3 persona varsa)?

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
3. Veri dayanağı durumu (proto / niteliksel / istatistiksel; proto ise doğrulama planı özeti).
4. Sonraki: `/feza-hci:design-thinking` (persona Define aşamasının çıktısıdır), `/feza-hci:hci-review` ya da bu personalar için arayüzü tasarlayıp kodlamak üzere `/feza-hci:hci-execute`.
5. Boşluk.

## Sınırlar
- Max 3 soru.
- 4'ten çok persona üretme.
- Stereotip / klişe yapma — kanıt olmadan kişilik atfetme.
- "Sevdiği renk mavi" gibi alakasız demografi atma — ürünle ilgili olanı yaz.
- `proto` etiketli persona için "Validated" etiketi YASAK.
- Veri dayanağı etiketi olmayan persona yazma; JTBD cümlesi ve işlevsel/duygusal başarı kriteri olmadan persona tamamlanmış sayılmaz.
