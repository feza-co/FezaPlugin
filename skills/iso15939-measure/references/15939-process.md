# ISO/IEC/IEEE 15939:2017 — Ölçüm Süreci Başvuru Notu

Kaynak: ISO/IEC/IEEE 15939:2017 *Systems and software engineering — Measurement process*. Ölçülebilir kavramlar için ISO/IEC 25010:2023 kalite modeli kullanılabilir. Terimler standardın İngilizce adlarıyla verilir, Türkçe karşılıkları parantezdedir.

## 1. Ölçüm Bilgi Modeli (Measurement Information Model)

Standart, bir bilgi ihtiyacından karar verilebilir bir bilgi ürününe giden yolu şu yapı taşlarıyla tanımlar:

| Yapı taşı | Tanım (özet) | Doldurulacak alan |
|-----------|--------------|-------------------|
| **Information need** (bilgi ihtiyacı) | Hedefleri, riskleri ve sorunları yönetmek için gereken içgörü | Kimin, hangi kararı vermek için neyi bilmesi gerekiyor? |
| **Measurable concept** (ölçülebilir kavram) | Varlıkların nitelikleri ile bilgi ihtiyacı arasındaki soyut ilişki | Ör. ISO/IEC 25010 alt karakteristiği, süreç verimliliği, takvim uyumu |
| **Entity / Attribute** (varlık / nitelik) | Ölçülen nesne ve onun ölçülebilir özelliği | Ör. "fatura gönderim işi" / "işlem süresi" |
| **Base measure** (temel ölçü) | Tek bir niteliğin bir ölçüm yöntemiyle elde edilen değeri | Ad, birim, ölçüm yöntemi, ölçek tipi |
| **Derived measure** (türetilmiş ölçü) | İki veya daha fazla ölçünün bir ölçüm fonksiyonuyla birleşimi | Formül, girdiler |
| **Indicator** (gösterge) | Bir analiz modeline göre türetilen, karar için yorumlanan değer | Analiz modeli (eşik, trend, karşılaştırma) |
| **Decision criteria** (karar ölçütleri) | Göstergenin hangi değerinde hangi aksiyonun alınacağı | Eşik → aksiyon → sorumlu |
| **Information product** (bilgi ürünü) | Bilgi ihtiyacını karşılayan gösterge ve yorumlar | Rapor, pano, karar notu |

Bir bilgi ihtiyacından göstergeye kadar doldurulmuş bu zincire **measurement construct** (ölçüm yapısı) denir. Ölçüm planındaki her gösterge bir measurement construct ile belgelenir.

## 2. Ölçüm Süreci Etkinlikleri

| # | Etkinlik | Amaç | Bu skill'deki çıktı |
|---|----------|------|---------------------|
| 1 | **Establish and sustain measurement commitment** (ölçüm taahhüdünü oluştur ve sürdür) | Ölçümün kapsamını, sorumluluklarını ve kaynaklarını yönetimle kabul ettirmek | Kapsam, sponsor, ölçüm sorumlusu, kaynak ve araç kararı |
| 2 | **Plan the measurement process** (ölçüm sürecini planla) | Bilgi ihtiyaçlarını belirlemek, önceliklendirmek, measurement construct'ları seçmek; toplama, analiz ve raporlama prosedürlerini tanımlamak | Bilgi ihtiyacı kataloğu, construct tabloları, veri toplama ve raporlama planı |
| 3 | **Perform the measurement process** (ölçüm sürecini uygula) | Veriyi toplamak, saklamak, doğrulamak, analiz etmek ve bilgi ürünlerini iletmek | Toplama takvimi, veri doğrulama kuralları, raporlama ritmi |
| 4 | **Evaluate measurement** (ölçümü değerlendir) | Bilgi ürünlerinin ve ölçüm sürecinin kendisinin işe yarayıp yaramadığını değerlendirmek, iyileştirmek | Değerlendirme ölçütleri, gözden geçirme sıklığı, iyileştirme kaydı |

Etkinlikler bir döngü oluşturur: değerlendirme sonuçları bir sonraki planlamaya girdi olur.

## 3. Bilgi İhtiyacı Önceliklendirme

Bilgi ihtiyaçları paydaş bazında toplanır ve şu sorularla önceliklendirilir:

| Ölçüt | Soru |
|-------|------|
| Karar bağlantısı | Bu bilgi hangi kararı değiştirebilir? |
| Risk bağlantısı | İlgili bir proje riski ya da regülasyon gereği var mı? |
| Zamanlama | Bilgiye ne zaman ihtiyaç var (sürüm öncesi, aylık, olay anında)? |
| Maliyet | Gerekli veri bugün mevcut mu, yoksa yeni araç gerekir mi? |

Öncelik puanı yüksek olan ihtiyaçlar plana alınır; diğerleri "Bilinen Boşluklar"a gerekçesiyle yazılır.

## 4. Metrik Uygunluk Kontrol Listesi

Her measurement construct plana alınmadan önce aşağıdaki kontrolden geçer. Bir maddenin "Hayır" olması construct'ın revize edilmesi ya da gerekçeyle çıkarılması anlamına gelir.

| # | Kontrol | Kanıt |
|---|---------|-------|
| K1 | Bilgi ihtiyacı ve karar sahibi açıkça adlandırılmış mı? | Paydaş + karar |
| K2 | Ölçüm yöntemi tekrarlanabilir mi (iki kişi aynı veriden aynı değeri elde eder mi)? | Yöntem tanımı |
| K3 | Veri kaynağı mevcut ve erişilebilir mi; değilse edinme maliyeti biliniyor mu? | Sistem / log / araç adı |
| K4 | Türetme fonksiyonu ve birimler tutarlı mı? | Formül |
| K5 | Analiz modeli ve karar ölçütleri tanımlı mı (eşik → aksiyon)? | Karar tablosu |
| K6 | Gösterge, istenmeyen davranışı ödüllendirmeye açık mı (ör. kapatılan kayıt sayısını şişirmek)? Açıksa dengeleyici gösterge eklenmiş mi? | Dengeleyici gösterge |
| K7 | Toplama sıklığı karar ritmiyle uyumlu mu? | Takvim |

Plan, toplam gösterge sayısını karar verenlerin gerçekten izleyebileceği düzeyde tutar (tipik olarak 8-12); sayı bu aralığın dışındaysa gerekçe yazılır.

## 5. Planlama Sırasında Kaçınılacak Durumlar

| Durum | Önerilen yaklaşım |
|-------|-------------------|
| Veri kolay bulunduğu için seçilen ölçü | Önce bilgi ihtiyacı, sonra veri (K1) |
| Karar ölçütü olmayan gösterge | Eşik → aksiyon → sorumlu tablosu (K5) |
| Tek başına yorumlanamayan ölçü | Referans değer, trend ya da hedefle birlikte sun |
| Tek boyutlu gösterge | Dengeleyici gösterge ekle (K6) |
| Sorumlusu olmayan veri toplama | Her base measure için veri sorumlusu |

## 6. Örnek Vaka — E-Fatura Entegrasyon Platformu

**Bağlam:** Orta ölçekli şirketlerin ERP sistemlerinden e-fatura ve e-irsaliye gönderen bir entegrasyon platformu. Ay sonu ve dönem kapanışlarında gönderim hacmi normal günlerin yaklaşık beş katına çıkar. Ürün ekibi, bir sonraki dönem kapanışından önce ölçüm planı oluşturmak istiyor.

### 6.1 Taahhüt (Etkinlik 1)

| Alan | Karar |
|------|-------|
| Kapsam | Gönderim hattı, müşteri portalı, destek süreci |
| Sponsor | Ürün Direktörü |
| Ölçüm sorumlusu | Platform Ekip Lideri |
| Araçlar | Mevcut uygulama logları, gözlemlenebilirlik platformu, destek bilet sistemi |

### 6.2 Bilgi İhtiyaçları (Etkinlik 2)

| ID | Paydaş | Bilgi ihtiyacı | Karar |
|----|--------|----------------|-------|
| IN-1 | Platform Ekip Lideri | Gönderim hattı dönem kapanışı yükünü süre hedefi içinde işleyebiliyor mu? | Kapanıştan önce kapasite artırımı yapılsın mı? |
| IN-2 | Müşteri Destek Yöneticisi | Reddedilen faturaların ne kadarı müşteri hatasından, ne kadarı platformdan kaynaklanıyor? | Doğrulama kuralları mı, müşteri eğitimi mi önceliklendirilsin? |
| IN-3 | Ürün Direktörü | Yeni portal akışı faturayı düzeltme süresini kısalttı mı? | Eski akış kapatılsın mı? |

### 6.3 Measurement Construct — IN-1

| Yapı taşı | Değer |
|-----------|-------|
| Measurable concept | Performance Efficiency → Time behaviour (ISO/IEC 25010:2023) |
| Entity / Attribute | Fatura gönderim işi / kuyruğa giriş ile alıcıya iletim arasındaki süre |
| Base measure 1 | `t_kuyruk` — kuyruğa giriş zaman damgası (log) |
| Base measure 2 | `t_iletim` — alıcı sistemden alındı onayı zaman damgası (log) |
| Derived measure | İşlem süresi = `t_iletim − t_kuyruk` (saniye) |
| Indicator | Saatlik p95 işlem süresi ve hedefi aşan iş oranı |
| Analysis model | p95 değeri hedefle ve önceki kapanış dönemiyle karşılaştırılır |
| Decision criteria | p95 ≤ 120 sn: aksiyon yok · 120-300 sn: kuyruk işçisi sayısını artır · > 300 sn veya hedefi aşan oran > %5: olay yönetimi başlat ve müşterilere bilgi ver |
| Information product | Kapanış dönemi panosu + kapanış sonrası değerlendirme notu |

> Varsayım: 120 sn ve 300 sn eşikleri başlangıç değeridir; ilk iki kapanış döneminin verisiyle gözden geçirilir.

### 6.4 Gösterge Özeti

| Gösterge | Bilgi ihtiyacı | 25010 / süreç kavramı | Toplama | Sıklık | Sorumlu |
|----------|----------------|------------------------|---------|--------|---------|
| p95 gönderim süresi | IN-1 | Time behaviour | Log, otomatik | Saatlik (kapanışta 5 dk) | Platform Ekip Lideri |
| Kuyruk birikim eğimi | IN-1 | Capacity | Metrik sistemi | 5 dk | Platform Ekip Lideri |
| Platform kaynaklı ret oranı | IN-2 | Functional correctness | Ret kodları sınıflandırması | Günlük | Destek Yöneticisi |
| Müşteri kaynaklı ret oranı | IN-2 | Dengeleyici gösterge | Ret kodları sınıflandırması | Günlük | Destek Yöneticisi |
| Medyan düzeltme süresi | IN-3 | Interaction capability → Operability | Portal olay kayıtları | Haftalık | Ürün Direktörü |

### 6.5 Değerlendirme (Etkinlik 4)

Her kapanış döneminden sonra: göstergeler kararları gerçekten etkiledi mi, veri kalitesi sorunu yaşandı mı, eşikler gerçekçi mi? Sonuçlar bir sonraki planlama döngüsüne iyileştirme kaydı olarak girer.

## 7. Çıktı Şablonu

```markdown
# 1. Ölçüm Taahhüdü (Establish and sustain measurement commitment)
[kapsam, sponsor, ölçüm sorumlusu, kaynaklar, araçlar]

# 2. Ölçüm Planı (Plan the measurement process)
## 2.1 Bilgi İhtiyacı Kataloğu ve Önceliklendirme
## 2.2 Measurement Construct Tabloları (her gösterge için)
## 2.3 Metrik Uygunluk Kontrol Listesi Sonuçları
## 2.4 Veri Toplama, Saklama ve Raporlama Prosedürleri

# 3. Uygulama (Perform the measurement process)
[toplama takvimi, veri doğrulama kuralları, raporlama ritmi ve kanalları]

# 4. Değerlendirme (Evaluate measurement)
[değerlendirme ölçütleri, gözden geçirme sıklığı, iyileştirme kaydı]

# Bilinen Boşluklar
```
