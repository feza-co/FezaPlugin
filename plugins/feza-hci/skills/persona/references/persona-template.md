# Persona Template & Örnekler

Kaynak çerçeve: Cooper "The Inmates Are Running the Asylum" / "About Face" (goal-directed personas), Nielsen Norman Group persona rehberi.

## Tam İskelet

```markdown
> **Personas** — <Proje>
> Validation: <Validated (n=X) | Provisional (varsayım)>
> Üretildi: <tarih>
> Üretici: FezaPlugin · /feza-hci:persona

# Persona 1: <İsim>, <Yaş> (Primary)

**Özet:** "..."

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

## Senaryo
<2-4 cümle>

## Quote
> "..."

## Ürün İçin
- ...

---

# Persona 2: <İsim>, <Yaş> (Secondary)
...

---

# Persona 3: <İsim>, <Yaş> (Anti-persona)

> Bu kişi ürünümüzün hedef kullanıcısı DEĞİL. Şu nedenlerle:
> - ...

(devam — minimum demografi + pain point)
```

## İYİ Persona Örneği

Örnek ürün: küçük işletmeler için mobil ön muhasebe/fatura uygulaması.

```
## Persona 1: Elif Demir, 34 (Primary)

**Özet:** "Tek kişilik grafik tasarım stüdyosunun sahibi; faturaları ve tahsilatları
telefondan hızlıca yönetmek ister, muhasebe terimleri onu yavaşlatır."

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

## Persona Sayısı Kuralları

| Persona sayısı | Ne zaman uygun |
|----------------|-----------------|
| 1 | Çok dar segment, MVP odak |
| 2-3 | **Tipik** — Primary + Secondary (+Anti) |
| 4 | İki ayrı pazar segmenti hedefliyorsa |
| 5+ | Dilution — odak kaybı; SAKIN |

## Validation Seviyeleri

| Etiket | Anlam | Ne zaman |
|--------|-------|----------|
| **Validated Persona** | Gerçek araştırmaya dayalı | n ≥ 5 mülakat veya n ≥ 30 anket |
| **Provisional Persona** | Varsayıma dayalı | Brief/sektör bilgisinden çıkarım |

> Provisional → Validated geçişi: 5 mülakat ile geçerli sayılabilir (Nielsen, 1993).
