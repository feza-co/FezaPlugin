# Persona Template & Örnekler

Kaynak çerçeve: Cooper "The Inmates Are Running the Asylum" / "About Face" (goal-directed personas), Nielsen Norman Group persona rehberi.

## Tam İskelet

```markdown
> **Personas** — <Proje>
> Veri dayanağı: proto | niteliksel | istatistiksel (n=<X>, <tarih>, <yöntem>)
> Üretildi: <tarih>
> Üretici: FezaPlugin · /feza-hci:persona

# Persona 1: <İsim>, <Yaş> (Primary)

**Veri dayanağı:** proto | niteliksel | istatistiksel (n=<X>, <tarih>, <yöntem>)
**Özet:** "..."

## JTBD
> "<durum> olduğunda, <motivasyon/eylem> istiyorum, böylece <beklenen sonuç>."

## Demografi
| Alan | Değer |
|------|-------|
| Yaş | |
| Cinsiyet | |
| Eğitim | |
| Meslek | |
| Lokasyon | |
| Teknoloji düzeyi | Başlangıç / Orta / İleri |
| İnternet düzeyi | Başlangıç / Orta / İleri |
| Benzer ürün aşinalığı | Evet/Hayır |

## Hedefler
1. ...
2. ...

## Pain Points
- ...

## Davranışlar
- ...

## Başarı Kriterleri
- **İşlevsel:** ...
- **Duygusal:** ...

## Senaryo
<2-4 cümle>

## Quote
> "..."

## Ürün İçin
- ...

## Kapsayıcılık Notu
- <Kimlik kalıbı, çeşitlilik gerekçesi, yardımcı teknoloji>

---

# Persona 2: <İsim>, <Yaş> (Secondary)
...

---

# Persona 3: <İsim>, <Yaş> (Anti-persona)

> Bu kişi ürünümüzün hedef kullanıcısı DEĞİL. Şu nedenlerle:
> - ...

(devam — minimum demografi + pain point)
```

## Proto-persona Modu (veri yoksa)

Birincil veri yokken üretim durmaz; ama şeffaflık zorunludur. Aşağıdaki blok her `proto` personada
bulunur:

```markdown
**Veri dayanağı:** proto — Varsayım (birincil veri yok)
**Doğrulama planı**
1. Sorulacak sorular: <en kritik 3-5 varsayımı test eden sorular>
2. Katılımcı: niteliksel için 5 (Nielsen & Landauer 1993); segment başına 3-4
3. Segment: <hangi kullanıcı sınıfından>
4. Etiket yükseltmesi: <hangi veri toplanınca `niteliksel`/`istatistiksel`>
```

Kurallar:
- Varsayım cümleleri "**Varsayım:**" ön ekiyle yazılır; kanıtı olmayan kesin ifade kullanılmaz.
- `proto` persona hiçbir zaman "Validated" sayılmaz.

## İYİ Persona Örneği

Örnek ürün: küçük işletmeler için mobil ön muhasebe/fatura uygulaması.

```
## Persona 1: Elif Demir, 34 (Primary)

**Veri dayanağı:** niteliksel (n=6 mülakat, 2026-Q1)
**Özet:** "Tek kişilik grafik tasarım stüdyosunun sahibi; faturaları ve tahsilatları
telefondan hızlıca yönetmek ister, muhasebe terimleri onu yavaşlatır."

### JTBD
> "İşi teslim ettikten hemen sonra müşteri fatura istediğinde, tek ekrandan tutarı
> girip göndermek istiyorum, böylece akşam işi büyümeden bitirebileyim."

### Demografi
- Yaş: 34
- Eğitim: Lisans
- Meslek: Serbest grafik tasarımcı (şahıs işletmesi)
- Lokasyon: İzmir
- Teknoloji düzeyi: İleri
- İnternet düzeyi: İleri
- Benzer ürün aşinalığı: Evet (tablo programı + bir banka uygulaması kullanıyor)

### Hedefler
1. Müşteriye faturayı iş tesliminden sonraki 10 dakika içinde göndermek
2. Hangi faturaların ödenmediğini tek bakışta görmek
3. Vergi dönemi öncesi dökümü muhasebeciye zahmetsiz iletmek

### Pain Points
- Fatura şablonlarında zorunlu alanlar anlaşılmıyor, hata yapma korkusu var
- Ödeme gecikince müşteriyi hatırlatmak için ayrı mesaj yazmak gerekiyor
- Masaüstü yazılımlar telefondan kullanılamıyor

### Davranışlar
- Mobil-first (iş çıkışı toplantı aralarında, telefondan)
- Sesli not ve ekran görüntüsünü bilgi kaynağı olarak kullanır
- Hızlı karar verir, uzun form doldurmaktan kaçınır

### Başarı Kriterleri
- **İşlevsel:** İlk fatura 3 dakikadan kısa sürede oluşturulup gönderilebilmeli
- **Duygusal:** Hata yaptığında kaybolmadan düzeltebileceğine güvenmeli; "muhasebeciye
  sormam gerekecek" endişesi duymamalı

### Senaryo
"Cuma akşamı, bir logo projesini teslim etti. Müşteri aynı gün fatura istiyor.
Telefondan uygulamayı açıp son müşteriyi seçti, tutarı girdi, faturayı
paylaşım bağlantısıyla gönderdi; 2 dakikada işi bitirdi."

### Quote
> "Fatura kesmek tasarım yapmaktan uzun sürüyorsa bir şey yanlış."

### Ürün İçin
- İlk fatura < 3 dakikada oluşturulabilmeli
- Mobil tasarım birinci öncelik
- Zorunlu alanlar yanında kısa açıklama (feedforward) içermeli
- Vadesi gelen faturalar için otomatik hatırlatma kritik

### Kapsayıcılık Notu
- Temsili isim; kimlik kalıbı dayatılmadı
- Çeşitlilik: farklı meslek/yaş segmentleri ayrı personalarda temsil edilir
- Yardımcı teknoloji ihtiyacı: mülakatta bildirilmedi (varsayım yapılmadı)
```

## KÖTÜ Persona Örneği (yapma)

```
## Kullanıcı 1
- Sevdiği renk: Mavi
- Hobi: Kitap okumak
- Ürünümüzü kullanır çünkü kullanışlı
```

Neden kötü:
- Generic isim
- Demografi alakasız (sevdiği renk?)
- Hedef/pain yok
- "Kullanışlı" - yasak terim
- Quote yok
- Senaryo yok
- Veri dayanağı etiketi yok
- JTBD yok, başarı kriteri yok

## Kapsayıcı Tasarım Kontrolü

- **İsim/kimlik alanları zorunlu kalıba sokulmaz:** Tek bir normatif isim/kimlik kalıbı dayatılmaz;
  farklı köken, alfabe, kısaltma, unvan ve cinsiyet ifadeleri kabul edilir. Temsili isim kullanıldığında
  belirtilir ("Ad (temsili)").
- **Çeşitlilik:** cinsiyet, yaş, engellilik ve teknoloji erişimi ürünle ilgili olduğu ölçüde
  çeşitlendirilir; tek segmenti tek kimliğe indirgemek yasaktır.
- **Kalıp yargı kontrolü:** meslek-cinsiyet, yaş-teknoloji, engellilik-yetkinsizlik kalıpları yasak.
  Her özellik ürün davranışıyla gerekçelendirilir.
- **Erişilebilirlik:** engellilik yalnız olumsuzluk olarak değil, yardımcı teknoloji kullanımı ve
  kapsayıcı ihtiyaç olarak yazılır.

## Persona Sayısı Kuralları

| Persona sayısı | Ne zaman uygun |
|----------------|-----------------|
| 1 | Çok dar segment, MVP odak |
| 2-3 | **Tipik** — Primary + Secondary (+Anti) |
| 4 | İki ayrı pazar segmenti hedefliyorsa |
| 5+ | Dilution — odak kaybı; SAKIN |

## Veri Dayanağı Seviyeleri

| Etiket | Anlam | Ne zaman |
|--------|-------|----------|
| **proto** | Varsayıma dayalı (açıkça "Varsayım" etiketli) | Brief/sektör bilgisinden çıkarım; doğrulama planı zorunlu |
| **niteliksel** | Nitel araştırmaya dayalı | n ≥ 5 mülakat veya eşdeğer nitel oturum |
| **istatistiksel** | Nicel veriye dayalı | n ≥ 30 anket veya temsili kullanım verisi |

> proto → niteliksel geçişi: 5 mülakat ile geçerli sayılabilir (Nielsen & Landauer, 1993).
> Etiket yükseltmesi için toplanan veri raporda (n, tarih, yöntem) belgelenir.

## Anti-persona Örneği

```
## Persona 3: Mehmet Bey, 67 (Anti-persona)

> Bu kişi uygulamanın birincil hedefi DEĞİL.
>
> - Teknoloji düzeyi: Başlangıç
> - Yoğun ekranlarda ve küçük tipografide kaybolur
> - Telefon görüşmesi tercih eder (uygulama içi akış değil)
>
> Ürünü mobil-first + self-servis olarak tasarladığımız için bu segment
> v1.0 kapsamında değil. v2.0'da telefon destekli + sesli mod düşünülebilir.
```
