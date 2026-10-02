---
name: brief-grill
description: >
  Bir brief'i karar ağacı sorgusuyla (decision-tree interview) sabitler: fikrin tam olarak ne
  olduğunu ve tüm sınırlarını tek tek soru sorarak netleştirir (problem ve kimin problemi, hedef
  kullanıcı, çözümün ne olduğu / ne OLMADIĞI, temel özellikler, sınırlar, başarı ölçütleri,
  riskler, teslim biçimi). Her soru çoktan seçmeli soru aracıyla ve seferde TEK soru olarak
  sorulur; karar ağacının tüm dalları kapanana kadar sorgu sürer, ardından alınan kararlar
  `BRIEF.md` sonuna "Netleştirilmiş Kararlar" ve "Açık Varsayımlar" olarak işlenir. Tetikleyici:
  "brief grill", "fikri sorgula", "/feza-toolkit:brief-grill", "brief netleştir", "karar ağacı".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Brief Grill

Bir brief'teki fikri, karar ağacının her dalı kapanana kadar soru sorarak sabitler: ne yapılacağı,
ne yapılMAyacağı ve tüm sınırları yazılı hâle gelir.

## Tetikleyici
- "/feza-toolkit:brief-grill"
- "brief grill / fikri sorgula / brief netleştir"
- "karar ağacı ile brief'i sabitle"

## Temel İlke

Bu bir **belge üretme** skill'i değil, bir **mülakat** skill'idir. Çıktı iki katmanlıdır:
(1) sohbette kısa karar özeti, (2) `BRIEF.md` sonuna eklenen karar tablosu. Amaç, sonraki
skill'lerin (srs-generate, scope-statement, wbs ...) tahmin etmek zorunda kalmayacağı kadar
fikrin sınırlarını çizmektir. Belirsizlik kaldıysa iş bitmemiştir.

## Adım 0 — Bagilami Topla

Önce brief'i ara; **dosya/kod okunarak cevaplanabilecek hiçbir şey kullanıcıya sorulmaz** (Kural 5).

1. Mevcut brief keşfi: `references/input-discovery.md` prosedürünü **yalnızca dosya bulma** (Adım A/B) için
   uygula — brief/fikir dosyasını ve önceki FezaPlugin çıktılarını arar.
   > **Muafiyet:** `input-discovery.md`'deki "gri nokta toplu sorma" ve "MAX 3 / MAX 4 soru" sınırı
   > bu skill için **geçersizdir**; brief-grill'de her soru TEK TEK ve toplam sınır olmadan sorulur
   > (Kural 2, Kural 6).
   - Kök: `IDEA.md`, `BRIEF.md`, `FIKIR.md`, `PROJE.md`, `PROJECT.md`, `OVERVIEW.md`, `VIZYON.md`, `VISION.md`
   - `docs/`: `docs/idea.md`, `docs/brief.md`, `docs/overview.md`, `docs/vision.md`
   - `README.md` içinde "## Proje Fikri / ## Fikir / ## Açıklama / ## About / ## Overview" vb. bölümler
2. Bulunan ilk geçerli kaynak **kanonik brief** olur. Ayrıca varsa önceki FezaPlugin çıktılarını
   (`SCOPE_*.md`, `SRS_*.md`, `STAKEHOLDERS_*.md`) oku ve brief'i zenginleştirmek için kullan.
3. **Kanonik brief bulunduysa** → kanonik dosyayı (ör. `BRIEF.md` ya da `docs/brief.md`) hedef dosya
   olarak belirle; kullanıcıya tek serbest metin sorusu SORMAZ. Doğrudan Adım 1'e geç.
4. **Yalnızca `README.md` bölümü bulunduysa** → o bölümü içeren bir `BRIEF.md` oluştur
   (üstüne "> `README.md` içinden çıkarıldı" notu düş) ve onu hedef dosya yap.
5. **Hiçbir kaynak yoksa** → soru aracıyla **TEK** soru sor, kullanıcı fikri "Diğer" (serbest metin)
   alanına yazsın; yazılan metni `BRIEF.md` olarak kaydet ve hedef dosya yap. Örnek:
   - **Soru:** "Bu skill bir proje fikrini sorgulayacak. Fikri kısaca yazar mısın?"
   - **Seçenekler:** "Şimdi yazacağım" (Other ile proje adı + 1-2 cümle tanım),
     "Örnek senaryo üret" (ör. e-ticaret iade yönetimi üzerinden ilerle).
6. Dil tespiti: brief Türkçeyse mülakat ve özet Türkçe; İngilizceyse İngilizce; karışıksa
   kullanıcının son mesajının dili (`--lang=tr|en` varsa o ezer).

## Adım 1 — Karar Ağacını Kur

Kanonik brief'i okuyup **kök dalları** çıkar. Başlangıç listesi (brief'e göre budanır/genişler):

| # | Kök dal | Bu dal kapanınca cevaplanmış olur |
|---|---------|-----------------------------------|
| 1 | Problem ve kimin problemi | Hangi sorun, kim için, şu an nasıl çözülüyor |
| 2 | Hedef kullanıcı ve paydaşlar | Birincil kullanıcı, ikincil, karar verici |
| 3 | Çözümün ne olduğu / ne OLMADIĞI | Kapsam içi ve **kapsam dışı** net |
| 4 | Temel özellikler ve öncelik | Zorunlu / olmazsa olmaz vs. sonraki sürüm |
| 5 | Kısıtlar | Süre, bütçe, ekip, teknoloji/platform, veri ve gizlilik, yasal |
| 6 | Başarı ölçütleri | Ölçülebilir başarı göstergeleri |
| 7 | Riskler ve varsayımlar | Bilinen riskler + doğrulanmamış varsayımlar |
| 8 | Teslim biçimi | Ne teslim edilecek, hangi formatta, kime |

Her dal için brief metninde cevap ARA: bulunanı **kapalı** işaretle, bulunmayanı **açık** bırak.
Alt dallar cevaplardan doğar; ayrıntı ve bağımlılık sırası için `references/decision-tree.md`.

## Adım 2 — Sorgu Döngüsü (çekirdek)

Kararlar arasındaki bağımlılıkları tek tek çözerek ağacın her dalında ilerle. Döngü:

1. **Bağımlı karar önce gelir.** Açık dallardan, kendisine bağlı başka kararlar açan dalı seç.
2. Soruyu **çoktan seçmeli soru aracıyla** (`AskUserQuestion`) sor. Soru asla düz metin olarak
   yazılmaz. **[Kural 1]**
3. **Seferde TEK soru** sor; kullanıcı cevaplamadan sonraki soruya geçme. **[Kural 2]**
4. Soruya kullanıcının gerçekçi olarak seçeceği **2-4 somut seçenek** koy. Soru gerçekten ikili
   değilse genel "Evet/Hayır" seçenekleri koyma; kullanıcının **her zaman** serbest metin
   ("Diğer") hakkı vardır. Önerdiğin seçeneği ilk sıraya ve "(önerilen)" etiketiyle koy. **[Kural 3]**
5. Cevaptan sonra kararı **en fazla 1-2 cümleyle** onayla, hemen sonraki soruya geç. **[Kural 4]**
6. Cevabı alınca ağacı güncelle (Adım 3) ve döngüye devam et. **Toplam soru sınırı YOKTUR**;
   karar ağacının tüm dalları çözülene kadar sorgu sürer. **[Kural 6]**
7. Ton: fikrin her yönü amansızca sorgulanır; ortak anlayışa varılana kadar durulmaz. **[Kural 8]**
8. Dosya/kod okunarak cevaplanabilecek bir şey sorma — önce kendin araştır (Adım 0). **[Kural 5]**

### "Çözüldü" tanımı
Bir dal, **net bir seçim** ya da **ölçülebilir bir sınır** alındığında kapanır. Belirsiz ifadeler
("hızlı", "kolay", "iyi") çözülmüş sayılmaz; sayı, eşik ya da somut seçim iste.

### Kullanıcı "bilmiyorum" / "sen karar ver" derse
Önerdiğin seçeneği **varsayım** olarak kaydet ve dalı kapat. Varsayımlar özette ayrı listelenir.

### Çelişki
Yeni cevap önceki bir kararla çelişirse: çelişkiyi **tek** soruda göster ve hangisinin geçerli
olduğunu sor. Sessizce üzerine yazma.

## Adım 3 — Ağacı Güncelle

Her cevaptan sonra karar ağacını bellekte güncelle:
- Cevabın açtığı **yeni alt dalları** ekle.
- Cevabın kapattığı dalları **kapat**.
- Bağımlılığı olan dalları, önce gelen karar çözülmeden sorma.

## Adım 4 — Kapanış ve Özet

Karar ağacının **tüm dalları** kapandığında dur. Sohbette, alınan tüm kararların kısa özetini
ver (dal → karar). **[Kural 7]** Özetten sonra varsayımları ayrı listele.

## Adım 5 — Yaz

`BRIEF.md`'nin (ya da Adım 0'da belirlenen kanonik dosyanın) **sonuna** şu iki bölümü ekle.
Brief'in mevcut metnini silme, taşıma veya yeniden yazma — yalnızca sonuna ekle:

```markdown
## Netleştirilmiş Kararlar

| Dal | Karar | Gerekçe / Kaynak |
|-----|-------|------------------|
| Problem | ... | Kullanıcı |
| Kapsam dışı | ... | Varsayım |
| ... | ... | Dosya (SCOPE_*.md) |

## Açık Varsayımlar

- <varsayım 1> — kaynağı: sen karar ver
- <varsayım 2> — kaynak dosyada yok, önerilen seçenek varsayıldı
```

`Gerekçe / Kaynak` sütunu yalnızca şu üç değerden birini taşır: **Kullanıcı**, **Varsayım**,
**Dosya** (dosya adıyla).

## Adım 6 — Rapor

1. Hedef brief dosyası yolu.
2. Kapatılan dal sayısı / toplam dal sayısı.
3. Sorulan soru sayısı (sınır yok).
4. Varsayım sayısı.
5. Çelişki bulunup sorulduysa kaç tane.
6. Sonraki önerilen adım (ör. `/feza-requirements:srs-generate` ya da `/feza-pm:scope-statement`).

## Self-Check
- [ ] Brief mevcut kaynaklardan mı alındı, yoksa kullanıcıdan tek serbest metinle mi? (Kural 5)
- [ ] Her soru soru aracıyla ve seferde tek soru olarak mı soruldu? (Kural 1, 2)
- [ ] Her soruda 2-4 somut seçenek + serbest metin hakkı var mıydı? (Kural 3)
- [ ] Her cevaptan sonra 1-2 cümlelik onay verildi mi? (Kural 4)
- [ ] Karar ağacının tüm dalları kapandı mı; soru sınırına takılıp erken bitirilmedi mi? (Kural 6)
- [ ] Sohbette karar özeti verildi mi? (Kural 7)
- [ ] `BRIEF.md` sonuna "Netleştirilmiş Kararlar" + "Açık Varsayımlar" eklendi mi?
- [ ] Brief'in mevcut metni korundu mu (silinmedi/yeniden yazılmadı)?

## grill-me 8 kural → bu SKILL.md eşlemesi

| # | grill-me kuralı | Bu dosyada karşılığı |
|---|-----------------|----------------------|
| K1 | Soru her zaman çoktan seçmeli soru aracıyla | Adım 2, madde 2 |
| K2 | Seferde tek soru, cevap gelmeden ilerleme | Adım 2, madde 3 |
| K3 | 2-4 somut seçenek; zorlama Evet/Hayır yok; serbest metin hakkı | Adım 2, madde 4 |
| K4 | Cevap sonrası en fazla 1-2 cümle onay, hemen sonraki soru | Adım 2, madde 5 |
| K5 | Dosya/kod okunarak cevaplanabileceği sorma, önce araştır | Adım 0, giriş; Adım 2, madde 8 |
| K6 | Toplam soru sınırı yok; ağacın tüm dalları kapanana kadar sürer | Adım 2, madde 6 |
| K7 | Bitince tüm kararların kısa özeti | Adım 4 |
| K8 | Ton: fikrin her yönünü ortak anlayışa kadar sorgula | Adım 2, madde 7 |

## Ek kurallar (grill-me'de tanımsız — bu skill'e özgü)

| # | Ek kural | Nerede |
|---|----------|--------|
| E1 | Brief bulma: `input-discovery` mantığıyla YALNIZ dosya bul (Adım A/B); yoksa tek serbest metinle al ve `BRIEF.md` oluştur. Gri nokta toplu sorma ve MAX 3/4 soru sınırı burada geçersizdir (Kural 2, 6) | Adım 0 |
| E2 | Kök dallar listesi | Adım 1 |
| E3 | "Çözüldü" tanımı; "bilmiyorum" → varsayım; çelişki tek soruda | Adım 2 alt başlıkları |
| E4 | Çıktı: sohbet özeti + `BRIEF.md` sonuna karar tablosu + "Açık Varsayımlar" | Adım 4, Adım 5 |
| E5 | Soru aracı olmayan platformlarda numaralı liste, tek mesajda tek soru | Platform notu |
| E6 | Kaynak atfı (grill-me yaklaşımı) | Sınırlar |

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Bu skill yeni bir **bağımsız doküman üretmez**; yalnızca mevcut brief'in sonuna bir bölüm ekler.
Bu nedenle `references/quality-gate.md` puanlaması (Bölüm 2-3 kriter setleri) uygulanmaz. Bunun
yerine eklenen bölüm, teslimden önce şu kontrolle süzülür:

1. Karar tablosunda **boş hücre** kalmasın; her dal için ya karar ya "Varsayım" satırı olsun.
2. Her satırın `Gerekçe / Kaynak` değeri üç etiketten biri olsun (Kullanıcı / Varsayım / Dosya).
3. Ölçülebilir sınır isteyen dallarda ("başarı ölçütü", "kısıt") sayı/eşik yoksa satır varsayım
   olarak işaretlensin (Bölüm 4 engelleyici: kaynaksız kesin iddia yasak).
4. Brief'in mevcut metni değiştirilmemiş olsun; yalnızca ekleme yapılmış olsun.

Eklenen bölüm de `references/output-conventions.md` üst bilgi/sade format kurallarına bağlı
değildir (doküman değil, bölümdür); format yalnızca yukarıdaki Markdown şablonudur.

## Platform Notu (soru aracı olmayan istemciler)

Codex, Cursor, Gemini CLI gibi `AskUserQuestion` aracının bulunmadığı istemcilerde aynı kurallar
geçerlidir; tek fark sunum biçimidir:

- Seçenekler **numaralı liste** olarak verilir.
- **Tek mesajda tek soru** sorulur; kullanıcı cevaplamadan sonraki soruya geçilmez.
- Liste sonunda her zaman "Diğer (serbest metin)" satırı bulunur.

## Yaz
- Hedef dosya: Adım 0'da belirlenen kanonik brief (varsayılan `BRIEF.md`).
- Yalnızca **sonuna ekleme** yapılır: "## Netleştirilmiş Kararlar" + "## Açık Varsayımlar".

## Sınırlar
- Soru **sınırı yok**; ama aynı soruyu farklı kelimelerle iki kez sorma ve dosya/kod okunarak
  cevaplanabilecek bir şeyi sormayıp önce kendin araştır (Kural 5, 6).
- Soruyu asla düz metin olarak yazma; soru aracı yoksa numaralı liste kuralına geç.
- Seferde birden fazla soru sorma (Kural 2).
- Brief'in mevcut metnini silme/yeniden yazma; yalnızca sonuna ekle.
- Belirsiz ifadeyi ("hızlı", "kolay") çözülmüş sayma; sayı/eşik/seçim iste.
- Kaynaksız kesin istatistik yazma; her satır Kullanıcı / Varsayım / Dosya etiketli olmalı.
- Kaynak: grill yaklaşımı **[grill-me-skill (Rob Mitt)](https://github.com/robmitt/grill-me-skill)** yaklaşımından uyarlanmıştır.
